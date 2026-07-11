"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  mobileSchema,
  otpSchema,
  registrationSchema,
  adminLoginSchema,
  normalizeMobile,
  isSafeRedirectUrl,
} from "@/lib/validators/auth";
import { getDashboardRoute as getDashboardRouteForRole } from "@/lib/auth/session";
import type { ActionResult, RegistrationData } from "@/types";

const OTP_PROVIDER = process.env.OTP_PROVIDER ?? "";
const IS_DEV = process.env.NODE_ENV === "development";
const DEV_MOCK_OTP = "123456";

const OTP_MAX_ATTEMPTS = 5;
const OTP_LOCKOUT_MINUTES = 15;
const ADMIN_MAX_ATTEMPTS = 3;
const ADMIN_LOCKOUT_MINUTES = 30;
const MOBILE_CHECK_MAX_ATTEMPTS = 15;
const MOBILE_CHECK_WINDOW_MINUTES = 15;

// ============================================================
// Server-side rate-limit ledger (auth_login_attempts table).
// Client-side attempt counters are UX only — this is the real gate.
// ============================================================

type AttemptType = "otp_verify" | "admin_password" | "mobile_check";

async function getRecentFailedAttempts(
  admin: ReturnType<typeof createServiceClient>,
  identifier: string,
  attemptType: AttemptType,
  windowMinutes: number
): Promise<number> {
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count } = await admin
    .from("auth_login_attempts")
    .select("id", { count: "exact", head: true })
    .eq("identifier", identifier)
    .eq("attempt_type", attemptType)
    .eq("succeeded", false)
    .gte("created_at", since);
  return count ?? 0;
}

async function recordAttempt(
  admin: ReturnType<typeof createServiceClient>,
  identifier: string,
  attemptType: AttemptType,
  succeeded: boolean
): Promise<void> {
  try {
    await admin
      .from("auth_login_attempts")
      .insert({ identifier, attempt_type: attemptType, succeeded });
  } catch {
    // Non-blocking — a logging failure must not affect auth flow.
  }
}

// ============================================================
// checkMobileExists — does this mobile exist in profiles?
// ============================================================

export async function checkMobileExists(
  mobile: string
): Promise<ActionResult<{ exists: boolean }>> {
  const parsed = mobileSchema.safeParse({ mobile });
  if (!parsed.success) {
    return { success: false, error: "Invalid mobile number" };
  }

  const normalizedMobile = normalizeMobile(mobile);

  try {
    const admin = createServiceClient();

    const recentAttempts = await getRecentFailedAttempts(
      admin,
      normalizedMobile,
      "mobile_check",
      MOBILE_CHECK_WINDOW_MINUTES
    );
    if (recentAttempts >= MOBILE_CHECK_MAX_ATTEMPTS) {
      return {
        success: false,
        error: "Too many attempts. Please try again later.",
      };
    }
    await recordAttempt(admin, normalizedMobile, "mobile_check", false);

    const { data, error } = await admin
      .from("profiles")
      .select("id, account_status")
      .or(`mobile.eq.${normalizedMobile},mobile.eq.+91${normalizedMobile}`)
      .maybeSingle();

    if (error) {
      console.error("[checkMobileExists] DB error:", error.code);
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    }

    if (
      data?.account_status === "banned" ||
      data?.account_status === "deleted"
    ) {
      return {
        success: false,
        error: "Your account has been restricted. Please contact support.",
      };
    }

    return { success: true, data: { exists: !!data } };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

// ============================================================
// requestOtp — send OTP to mobile number
// DEV_ONLY: if OTP_PROVIDER=dev_mock and NODE_ENV=development,
// mock is used (OTP=123456). Never in production.
// ============================================================

export async function requestOtp(
  mobile: string,
  purpose: "login" | "register"
): Promise<ActionResult<{ sent: boolean; devMode?: boolean }>> {
  const parsed = mobileSchema.safeParse({ mobile });
  if (!parsed.success) {
    return { success: false, error: "Invalid mobile number" };
  }

  const normalizedMobile = normalizeMobile(mobile);

  // Production: never allow dev mock
  if (process.env.NODE_ENV === "production" && OTP_PROVIDER === "dev_mock") {
    return {
      success: false,
      error: "OTP_PROVIDER_SETUP_REQUIRED",
    };
  }

  // DEV_ONLY mock mode
  if (IS_DEV && OTP_PROVIDER === "dev_mock") {
    console.info(
      `[DEV_ONLY] Mock OTP for ${purpose}: mobile=${normalizedMobile}, OTP=${DEV_MOCK_OTP}`
    );
    return {
      success: true,
      data: { sent: true, devMode: true },
      message: `[DEV] OTP sent (mock). Use code: ${DEV_MOCK_OTP}`,
    };
  }

  // No provider configured
  if (!OTP_PROVIDER) {
    return {
      success: false,
      error: "OTP_PROVIDER_SETUP_REQUIRED",
    };
  }

  // Real provider integration — placeholder for future implementation
  // TODO: Integrate real SMS/OTP provider (Twilio, MSG91, etc.)
  return {
    success: false,
    error: "OTP_PROVIDER_SETUP_REQUIRED",
  };
}

// ============================================================
// verifyOtpAndLogin — verify OTP and log in existing user
// ============================================================

export async function verifyOtpAndLogin(
  mobile: string,
  otp: string,
  redirectTo?: string
): Promise<ActionResult<{ redirectTo: string; firstName: string }>> {
  const parsed = otpSchema.safeParse({ mobile, otp });
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString() ?? "otp";
      fieldErrors[key] = [issue.message];
    });
    return { success: false, error: "Validation error", fieldErrors };
  }

  const normalizedMobile = normalizeMobile(mobile);

  // Production: no mock
  if (process.env.NODE_ENV === "production" && OTP_PROVIDER === "dev_mock") {
    return { success: false, error: "OTP_PROVIDER_SETUP_REQUIRED" };
  }

  if (!IS_DEV || OTP_PROVIDER !== "dev_mock") {
    return { success: false, error: "OTP_PROVIDER_SETUP_REQUIRED" };
  }

  const admin = createServiceClient();

  // Server-side lockout — the true gate. Any client-shown attempt counter
  // is UX only; this is what actually blocks brute-forcing the OTP.
  const recentFailed = await getRecentFailedAttempts(
    admin,
    normalizedMobile,
    "otp_verify",
    OTP_LOCKOUT_MINUTES
  );
  if (recentFailed >= OTP_MAX_ATTEMPTS) {
    return {
      success: false,
      error: `Too many incorrect attempts. Please try again in ${OTP_LOCKOUT_MINUTES} minutes.`,
    };
  }

  // Verify OTP — real provider verification goes here.
  const isValid = otp === DEV_MOCK_OTP;

  if (!isValid) {
    await recordAttempt(admin, normalizedMobile, "otp_verify", false);
    return {
      success: false,
      error: "Invalid OTP. Please check and try again.",
    };
  }
  await recordAttempt(admin, normalizedMobile, "otp_verify", true);

  // Fetch the profile by mobile (tolerate both "+919000000001" and "9000000001" storage formats)
  const { data: profileData, error: profileError } = await admin
    .from("profiles")
    .select(
      "id, auth_user_id, account_status, public_role, full_name, display_name"
    )
    .or(`mobile.eq.${normalizedMobile},mobile.eq.+91${normalizedMobile}`)
    .maybeSingle();

  if (profileError || !profileData) {
    return {
      success: false,
      error: "Account not found. Please register first.",
    };
  }

  if (
    profileData.account_status === "suspended" ||
    profileData.account_status === "banned"
  ) {
    return {
      success: false,
      error: "Your account has been restricted. Please contact support.",
    };
  }

  // In production with real phone auth, session is created by supabase.auth.verifyOtp().
  // DEV_ONLY: establish a real session for the dev-mock path by minting a short-lived
  // password on the underlying auth user (server-side, service role only) and signing in
  // with it via the anon client so cookies are set. Never reachable outside IS_DEV + dev_mock.
  const devSessionResult = await establishDevSession(profileData.auth_user_id);
  if (!devSessionResult.success) {
    return { success: false, error: "Login failed. Please try again." };
  }

  // Record audit event (best effort)
  try {
    await admin.from("auth_audit_events").insert({
      profile_id: profileData.id,
      event_type: "login",
      metadata_safe: { method: "mobile_otp", dev_mode: IS_DEV },
    });
  } catch {
    // Audit failure is non-blocking
  }

  const safeRedirect = isSafeRedirectUrl(redirectTo ?? null)
    ? redirectTo!
    : getDashboardRouteForRole(profileData.public_role);

  const firstName = (profileData.display_name || profileData.full_name || "")
    .trim()
    .split(/\s+/)[0];

  return {
    success: true,
    data: { redirectTo: safeRedirect, firstName },
    message: "Logged in successfully",
  };
}

// ============================================================
// verifyOtpAndRegister — verify OTP and create new user account
// ============================================================

export async function verifyOtpAndRegister(
  otp: string,
  registrationData: RegistrationData,
  redirectTo?: string
): Promise<ActionResult<{ redirectTo: string; firstName: string }>> {
  // Validate OTP format
  const otpParsed = otpSchema.safeParse({
    mobile: registrationData.mobile,
    otp,
  });
  if (!otpParsed.success) {
    return { success: false, error: "Invalid OTP format" };
  }

  // Validate registration data
  const regParsed = registrationSchema.safeParse(registrationData);
  if (!regParsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    regParsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString() ?? "form";
      fieldErrors[key] = [issue.message];
    });
    return { success: false, error: "Validation error", fieldErrors };
  }

  // Production: no mock
  if (process.env.NODE_ENV === "production" && OTP_PROVIDER === "dev_mock") {
    return { success: false, error: "OTP_PROVIDER_SETUP_REQUIRED" };
  }

  if (!IS_DEV || OTP_PROVIDER !== "dev_mock") {
    return { success: false, error: "OTP_PROVIDER_SETUP_REQUIRED" };
  }

  const normalizedMobile = normalizeMobile(registrationData.mobile);
  const admin = createServiceClient();

  // Server-side lockout — shares the same bucket/window as login OTP verify.
  const recentFailed = await getRecentFailedAttempts(
    admin,
    normalizedMobile,
    "otp_verify",
    OTP_LOCKOUT_MINUTES
  );
  if (recentFailed >= OTP_MAX_ATTEMPTS) {
    return {
      success: false,
      error: `Too many incorrect attempts. Please try again in ${OTP_LOCKOUT_MINUTES} minutes.`,
    };
  }

  const isValid = otp === DEV_MOCK_OTP;
  if (!isValid) {
    await recordAttempt(admin, normalizedMobile, "otp_verify", false);
    return {
      success: false,
      error: "Invalid OTP. Please check and try again.",
    };
  }
  await recordAttempt(admin, normalizedMobile, "otp_verify", true);

  // Check mobile not already registered
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("mobile", normalizedMobile)
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      error: "This mobile number is already registered. Please login.",
    };
  }

  // Create Supabase auth user
  // In production with real phone auth, user is created by Supabase phone OTP.
  // For dev_mock: we create the user via service role.
  const phone = `+91${normalizedMobile}`;

  const { data: authData, error: authError } =
    await admin.auth.admin.createUser({
      phone,
      phone_confirm: true,
      user_metadata: {
        full_name: regParsed.data.fullName,
        public_role: regParsed.data.role,
      },
    });

  if (authError || !authData.user) {
    console.error(
      "[verifyOtpAndRegister] Auth user creation error:",
      authError?.code
    );
    return { success: false, error: "Registration failed. Please try again." };
  }

  // Create profile + role profile via DB function
  const { data: profileId, error: profileError } = await admin.rpc(
    "create_user_profile",
    {
      p_auth_user_id: authData.user.id,
      p_public_role: regParsed.data.role,
      p_full_name: regParsed.data.fullName,
      p_display_name: regParsed.data.fullName,
      p_email: regParsed.data.email ?? null,
      p_mobile: normalizedMobile,
    }
  );

  if (profileError) {
    console.error(
      "[verifyOtpAndRegister] Profile creation error:",
      profileError.code
    );
    // Best effort: delete the orphaned auth user
    try {
      await admin.auth.admin.deleteUser(authData.user.id);
    } catch {
      // Log but continue
    }
    return {
      success: false,
      error: "Registration failed during profile setup. Please try again.",
    };
  }

  // DEV_ONLY: establish a real session for the newly registered dev-mock user.
  // Must check the result — silently continuing on failure meant a new
  // account was created with no session, so the client redirected to the
  // dashboard, got bounced by the auth middleware, and landed back on /login.
  const devSessionResult = await establishDevSession(authData.user.id);
  if (!devSessionResult.success) {
    // Roll back so the mobile number isn't stranded as a sessionless account.
    try {
      await admin.auth.admin.deleteUser(authData.user.id);
    } catch {
      /* logged upstream */
    }
    return {
      success: false,
      error:
        "Registration failed while starting your session. Please try again.",
    };
  }

  // Record consents
  try {
    const consents = [
      { consent_type: "terms", accepted: true },
      { consent_type: "privacy", accepted: true },
      { consent_type: "otp_data_notice", accepted: true },
      ...(regParsed.data.marketingOptIn
        ? [{ consent_type: "marketing", accepted: true }]
        : []),
    ];

    await admin.from("user_consents").insert(
      consents.map((c) => ({
        profile_id: profileId,
        consent_type: c.consent_type,
        policy_version: "1.0",
        accepted: c.accepted,
        source: "registration",
      }))
    );
  } catch {
    // Consent recording failure is non-blocking (log for audit)
  }

  // Record audit event
  try {
    await admin.from("auth_audit_events").insert({
      profile_id: profileId,
      event_type: "register",
      metadata_safe: { role: regParsed.data.role, dev_mode: IS_DEV },
    });
    await admin.from("auth_audit_events").insert({
      profile_id: profileId,
      event_type: "profile_created",
      metadata_safe: { role: regParsed.data.role },
    });
  } catch {
    // Audit failure is non-blocking
  }

  const safeRedirect = isSafeRedirectUrl(redirectTo ?? null)
    ? redirectTo!
    : getDashboardRouteForRole(regParsed.data.role);

  const firstName = (regParsed.data.fullName || "").trim().split(/\s+/)[0];

  return {
    success: true,
    data: { redirectTo: safeRedirect, firstName },
    message: "Account created successfully. Welcome to My Gujarat Property!",
  };
}

// ============================================================
// adminLogin — email/password login for admin/staff
// ============================================================

export async function adminLogin(
  email: string,
  password: string,
  redirectTo?: string
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = adminLoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString() ?? "form";
      fieldErrors[key] = [issue.message];
    });
    return { success: false, error: "Validation error", fieldErrors };
  }

  const normalizedEmail = parsed.data.email.trim().toLowerCase();
  const admin = createServiceClient();

  // Server-side lockout — the true gate; any client-shown attempt counter is UX only.
  const recentFailed = await getRecentFailedAttempts(
    admin,
    normalizedEmail,
    "admin_password",
    ADMIN_LOCKOUT_MINUTES
  );
  if (recentFailed >= ADMIN_MAX_ATTEMPTS) {
    return {
      success: false,
      error: `Too many failed attempts. Locked for ${ADMIN_LOCKOUT_MINUTES} minutes.`,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    await recordAttempt(admin, normalizedEmail, "admin_password", false);
    // Record failed attempt audit (best effort, service role)
    try {
      await admin.from("auth_audit_events").insert({
        event_type: "admin_access_denied",
        metadata_safe: {
          reason: "invalid_credentials",
          email: parsed.data.email,
        },
      });
    } catch {
      // Non-blocking
    }
    return { success: false, error: "Invalid email or password." };
  }
  await recordAttempt(admin, normalizedEmail, "admin_password", true);

  // Verify the user is a registered staff member
  const { data: staffData, error: staffError } = await admin
    .from("staff_profiles")
    .select("id, staff_status, internal_role")
    .eq("auth_user_id", data.user.id)
    .single();

  if (staffError || !staffData) {
    // Sign out the non-staff user
    await supabase.auth.signOut();
    // Record audit event
    try {
      await admin.from("auth_audit_events").insert({
        event_type: "admin_access_denied",
        metadata_safe: { reason: "not_staff", email: parsed.data.email },
      });
    } catch {
      // Non-blocking
    }
    return {
      success: false,
      error: "Access denied. This account does not have admin access.",
    };
  }

  if (staffData.staff_status !== "active") {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "Your staff account is not active. Please contact a Super Admin.",
    };
  }

  // Update last login
  try {
    await admin
      .from("staff_profiles")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", staffData.id);

    await admin.from("auth_audit_events").insert({
      staff_profile_id: staffData.id,
      event_type: "staff_login",
      metadata_safe: { role: staffData.internal_role },
    });
  } catch {
    // Non-blocking
  }

  const safeRedirect = isSafeRedirectUrl(redirectTo ?? null)
    ? redirectTo!
    : "/admin";

  return {
    success: true,
    data: { redirectTo: safeRedirect },
    message: "Logged in successfully",
  };
}

// ============================================================
// logout — ends the session
// ============================================================

export async function logout(redirectTo?: string): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const safeRedirect = isSafeRedirectUrl(redirectTo ?? null)
    ? redirectTo!
    : "/";
  revalidatePath("/", "layout");
  redirect(safeRedirect);
}

// ============================================================
// Helpers
// ============================================================

// ============================================================
// establishDevSession — DEV_ONLY: mint a real Supabase session
// cookie for a phone-verified dev-mock login/register.
// Hard-blocked outside IS_DEV + OTP_PROVIDER=dev_mock.
// ============================================================

async function establishDevSession(
  authUserId: string
): Promise<ActionResult<{ ok: true }>> {
  if (process.env.NODE_ENV === "production" || OTP_PROVIDER !== "dev_mock") {
    return { success: false, error: "OTP_PROVIDER_SETUP_REQUIRED" };
  }

  const admin = createServiceClient();

  const { data: userData, error: userError } =
    await admin.auth.admin.getUserById(authUserId);
  if (userError || !userData.user) {
    return { success: false, error: "Login failed" };
  }

  // Random per call — never derived from a guessable formula (authUserId is
  // not a secret and must not be sufficient to compute a valid password).
  const devPassword = `dev-${crypto.randomUUID()}`;

  // Always sign in via email+password, even for mobile-only accounts — this
  // Supabase project's phone+password grant is unreliable, while email+password
  // works. The synthetic address is DEV_ONLY internal plumbing, never shown to
  // the user and unrelated to the profiles.email field they fill in themselves.
  // `||` (not `??`) — Supabase returns "" (not null) for phone-only accounts,
  // and "" would otherwise slip past a nullish-coalescing fallback.
  const signInEmail =
    userData.user.email || `dev-mock-${authUserId}@internal.mgptest.dev`;

  const { error: updateError } = await admin.auth.admin.updateUserById(
    authUserId,
    {
      email: signInEmail,
      email_confirm: true,
      password: devPassword,
    }
  );
  if (updateError) {
    return { success: false, error: "Login failed" };
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: signInEmail,
    password: devPassword,
  });
  if (signInError) {
    return { success: false, error: "Login failed" };
  }

  return { success: true, data: { ok: true } };
}
