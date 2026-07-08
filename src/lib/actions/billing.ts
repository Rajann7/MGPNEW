"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  getActiveSubscription,
  isSubscriptionActive,
} from "@/lib/billing/subscription";
import { getUsageSummary } from "@/lib/billing/gates";
import { isValidGstinFormat } from "@/lib/billing/gst";
import { isRazorpayConfigured } from "@/lib/razorpay/client";
import type {
  ActionResult,
  Plan,
  Subscription,
  Invoice,
  Payment,
  GstProfile,
  Trial,
} from "@/types";

/** Error code returned when the billing schema hasn't been applied yet. */
const SETUP = { success: false as const, error: "SETUP_REQUIRED" as const };

function isMissingTable(code?: string): boolean {
  return code === "42P01" || code === "PGRST205" || code === "PGRST205";
}

// ============================================================
// get_public_plans — active + public plans, optional role filter
// (uses anon client → RLS already restricts to active+public rows)
// ============================================================

export async function getPublicPlans(
  role?: string
): Promise<ActionResult<{ plans: Plan[]; razorpayConfigured: boolean }>> {
  const supabase = await createClient();
  let query = supabase
    .from("plans")
    .select("*")
    .eq("is_active", true)
    .eq("is_public", true)
    .order("display_order")
    .order("price_amount");
  if (role) query = query.eq("role", role);
  const { data, error } = await query;
  if (error) {
    if (isMissingTable(error.code)) return SETUP;
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return {
    success: true,
    data: {
      plans: (data ?? []) as Plan[],
      razorpayConfigured: isRazorpayConfigured(),
    },
  };
}

// ============================================================
// get_current_subscription (+ usage) — own only
// ============================================================

export interface CurrentBilling {
  subscription: Subscription | null;
  planName: string | null;
  active: boolean;
  enforced: boolean;
  usage: { featureKey: string; used: number; limit: number | null }[];
}

export async function getCurrentBilling(
  role?: string
): Promise<ActionResult<CurrentBilling>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const r = role ?? profile.public_role;

  try {
    const sub = await getActiveSubscription(profile.id, r);
    const summary = await getUsageSummary(profile.id, r);
    return {
      success: true,
      data: {
        subscription: sub,
        planName: summary.planName,
        active: isSubscriptionActive(sub),
        enforced: summary.enforced,
        usage: summary.rows,
      },
    };
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (isMissingTable(code)) return SETUP;
    return { success: false, error: "UNKNOWN_ERROR" };
  }
}

// ============================================================
// getMyInvoices / getMyPayments — own only (RLS-scoped)
// ============================================================

export async function getMyInvoices(): Promise<
  ActionResult<{ items: Invoice[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error)
    return isMissingTable(error.code)
      ? SETUP
      : { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as Invoice[] } };
}

export async function getMyPayments(): Promise<
  ActionResult<{ items: Payment[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error)
    return isMissingTable(error.code)
      ? SETUP
      : { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as Payment[] } };
}

// ============================================================
// GST profile — own read/upsert
// ============================================================

export async function getGstProfile(): Promise<
  ActionResult<{ profile: GstProfile | null }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gst_profiles")
    .select("*")
    .eq("profile_id", profile.id)
    .maybeSingle();
  if (error)
    return isMissingTable(error.code)
      ? SETUP
      : { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { profile: (data as GstProfile) ?? null } };
}

export async function updateGstProfile(input: {
  legalName?: string;
  gstin?: string;
  address?: string;
  city?: string;
  stateCode?: string;
  pinCode?: string;
  isB2b?: boolean;
  invoiceEmail?: string;
}): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const gstin = input.gstin?.trim().toUpperCase() || null;
  // GSTIN required only if B2B invoice requested; validate format when present.
  if (input.isB2b && !gstin) {
    return {
      success: false,
      error: "GST_PROFILE_INVALID",
      fieldErrors: { gstin: ["GSTIN is required for B2B invoices"] },
    };
  }
  if (gstin && !isValidGstinFormat(gstin)) {
    return {
      success: false,
      error: "GST_PROFILE_INVALID",
      fieldErrors: { gstin: ["Enter a valid 15-character GSTIN"] },
    };
  }

  const admin = createServiceClient();
  const payload = {
    profile_id: profile.id,
    legal_name: input.legalName?.trim().slice(0, 200) || null,
    gstin,
    address: input.address?.trim().slice(0, 500) || null,
    city: input.city?.trim().slice(0, 100) || null,
    state_code: input.stateCode?.trim().slice(0, 2) || null,
    pin_code: input.pinCode?.trim().slice(0, 10) || null,
    is_b2b: Boolean(input.isB2b),
    invoice_email: input.invoiceEmail?.trim().slice(0, 200) || null,
  };
  const { error } = await admin
    .from("gst_profiles")
    .upsert(payload, { onConflict: "profile_id" });
  if (error)
    return isMissingTable(error.code)
      ? SETUP
      : { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// start_trial — one trial per profile+role, real dates, no auto-charge
// ============================================================

const TRIAL_DAYS = 14;

export async function startTrial(): Promise<ActionResult<{ endsAt: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!["owner", "broker", "builder"].includes(profile.public_role))
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const admin = createServiceClient();

  // Already used?
  const { data: existing, error: exErr } = await admin
    .from("trials")
    .select("id, status")
    .eq("profile_id", profile.id)
    .eq("role", profile.public_role)
    .maybeSingle();
  if (exErr && isMissingTable(exErr.code)) return SETUP;
  if (existing) return { success: false, error: "TRIAL_NOT_ELIGIBLE" };

  // Any active paid subscription already?
  const activeSub = await getActiveSubscription(
    profile.id,
    profile.public_role
  );
  if (isSubscriptionActive(activeSub))
    return { success: false, error: "TRIAL_NOT_ELIGIBLE" };

  const now = new Date();
  const ends = new Date(now);
  ends.setDate(ends.getDate() + TRIAL_DAYS);

  // Find the role's paid plan to trial (fallback to free plan features).
  const { data: trialPlan } = await admin
    .from("plans")
    .select("id, billing_cycle")
    .eq("role", profile.public_role)
    .eq("is_active", true)
    .neq("billing_cycle", "free")
    .order("price_amount")
    .limit(1)
    .maybeSingle();

  const { error: tErr } = await admin.from("trials").insert({
    profile_id: profile.id,
    role: profile.public_role,
    plan_id: trialPlan?.id ?? null,
    status: "active",
    started_at: now.toISOString(),
    ends_at: ends.toISOString(),
  });
  if (tErr)
    return isMissingTable(tErr.code)
      ? SETUP
      : { success: false, error: "UNKNOWN_ERROR" };

  // Create/refresh the subscription as trialing (source=trial).
  const existingSub = await getActiveSubscription(
    profile.id,
    profile.public_role
  );
  if (existingSub) {
    await admin
      .from("subscriptions")
      .update({
        status: "trialing",
        source: "trial",
        plan_id: trialPlan?.id ?? existingSub.plan_id,
        trial_end_at: ends.toISOString(),
        current_period_end: ends.toISOString(),
      })
      .eq("id", existingSub.id);
  } else {
    await admin.from("subscriptions").insert({
      profile_id: profile.id,
      role: profile.public_role,
      plan_id: trialPlan?.id ?? null,
      status: "trialing",
      source: "trial",
      trial_end_at: ends.toISOString(),
      current_period_start: now.toISOString(),
      current_period_end: ends.toISOString(),
    });
  }

  await admin.from("billing_audit_logs").insert({
    actor_type: "user",
    actor_id: profile.id,
    action: "trial_started",
    entity_type: "trial",
    metadata_safe: { role: profile.public_role, days: TRIAL_DAYS },
  });

  return { success: true, data: { endsAt: ends.toISOString() } };
}

export async function getMyTrial(): Promise<
  ActionResult<{ trial: Trial | null }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trials")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("role", profile.public_role)
    .maybeSingle();
  if (error && isMissingTable(error.code)) return SETUP;
  return { success: true, data: { trial: (data as Trial) ?? null } };
}

// ============================================================
// cancel_subscription — own, cancel at period end (no data deletion)
// ============================================================

export async function cancelSubscription(): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const sub = await getActiveSubscription(profile.id, profile.public_role);
  if (!sub) return { success: false, error: "SUBSCRIPTION_NOT_FOUND" };

  const { error } = await admin
    .from("subscriptions")
    .update({
      cancel_at_period_end: true,
      cancelled_at: new Date().toISOString(),
    })
    .eq("id", sub.id);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await admin.from("subscription_events").insert({
    subscription_id: sub.id,
    event_type: "cancel_requested",
    from_status: sub.status,
    to_status: sub.status,
    actor_type: "user",
    actor_id: profile.id,
  });
  await admin.from("billing_audit_logs").insert({
    actor_type: "user",
    actor_id: profile.id,
    action: "subscription_cancel_requested",
    entity_type: "subscription",
    entity_id: sub.id,
  });
  return { success: true, data: null };
}

// ============================================================
// request_refund — foundation: records a request only (manual review).
// No provider refund executed here (REFUND_NOT_SUPPORTED for auto path).
// ============================================================

export async function requestRefund(
  paymentId: string,
  reason: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!reason || reason.trim().length < 5)
    return { success: false, error: "VALIDATION_ERROR" };

  const admin = createServiceClient();
  const { data: payment } = await admin
    .from("payments")
    .select("id, profile_id, amount, status")
    .eq("id", paymentId)
    .maybeSingle();
  if (!payment) return { success: false, error: "SETUP_REQUIRED" };
  if (payment.profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (!["captured", "verified"].includes(payment.status))
    return { success: false, error: "REFUND_NOT_SUPPORTED" };

  const { error } = await admin.from("refunds").insert({
    payment_id: paymentId,
    profile_id: profile.id,
    amount: payment.amount,
    reason: reason.trim().slice(0, 1000),
    status: "requested",
    requested_by: profile.id,
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await admin.from("billing_audit_logs").insert({
    actor_type: "user",
    actor_id: profile.id,
    action: "refund_requested",
    entity_type: "payment",
    entity_id: paymentId,
  });
  return { success: true, data: null };
}
