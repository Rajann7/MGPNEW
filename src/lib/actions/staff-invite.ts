"use server";

import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/service";
import { getRolePreset } from "@/lib/admin/role-presets";
import { logAdminAction } from "@/lib/admin/audit";
import { ROLE_LABELS } from "@/config";
import type { ActionResult, InternalRole, StaffProfile } from "@/types";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Tokens are 32 random bytes → 64 hex chars (see inviteStaff). */
function isValidTokenShape(token: string): boolean {
  return /^[a-f0-9]{64}$/i.test(token);
}

export interface InvitePreview {
  email: string;
  internalRole: InternalRole;
  roleLabel: string;
  inviterName: string | null;
  inviterRole: InternalRole | null;
  expiresAt: string;
  preview: { label: string; granted: boolean }[];
}

// ============================================================
// getInviteByToken — public (pre-auth) lookup for the acceptance page.
// Returns only safe invite metadata + a permission preview. Never returns
// the token hash or any secret.
// ============================================================

export async function getInviteByToken(
  token: string
): Promise<ActionResult<InvitePreview>> {
  if (!isValidTokenShape(token)) {
    return { success: false, error: "INVITE_INVALID" };
  }

  const admin = createServiceClient();
  const { data: invite } = await admin
    .from("staff_invites")
    .select(
      "id, email, internal_role, invited_by_staff_id, status, expires_at"
    )
    .eq("invite_token_hash", hashToken(token))
    .maybeSingle();

  if (!invite) return { success: false, error: "INVITE_INVALID" };
  if (invite.status === "accepted")
    return { success: false, error: "INVITE_ACCEPTED" };
  if (invite.status === "revoked")
    return { success: false, error: "INVITE_REVOKED" };
  if (new Date(invite.expires_at).getTime() < Date.now())
    return { success: false, error: "INVITE_EXPIRED" };

  let inviterName: string | null = null;
  let inviterRole: InternalRole | null = null;
  if (invite.invited_by_staff_id) {
    const { data: inviter } = await admin
      .from("staff_profiles")
      .select("full_name, internal_role")
      .eq("id", invite.invited_by_staff_id)
      .maybeSingle();
    inviterName = inviter?.full_name ?? null;
    inviterRole = (inviter?.internal_role as InternalRole) ?? null;
  }

  const role = invite.internal_role as InternalRole;
  return {
    success: true,
    data: {
      email: invite.email,
      internalRole: role,
      roleLabel: ROLE_LABELS[role] ?? role,
      inviterName,
      inviterRole,
      expiresAt: invite.expires_at,
      preview: getRolePreset(role).preview,
    },
  };
}

function validatePassword(pw: string): string | null {
  if (pw.length < 12) return "Password must be at least 12 characters.";
  if (!/[0-9]/.test(pw)) return "Password must include at least 1 number.";
  if (!/[^A-Za-z0-9]/.test(pw))
    return "Password must include at least 1 symbol.";
  return null;
}

// ============================================================
// acceptStaffInvite — creates the staff auth user + profile + seeded
// permissions from the role preset, marks the invite accepted. Single-use.
// Public (pre-auth): authorization comes from possession of the valid,
// unexpired, unaccepted token only.
// ============================================================

export async function acceptStaffInvite(
  token: string,
  fullName: string,
  password: string
): Promise<ActionResult<{ redirectTo: string }>> {
  if (!isValidTokenShape(token)) {
    return { success: false, error: "INVITE_INVALID" };
  }
  if (!fullName || fullName.trim().length < 2) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { fullName: ["Enter your full name"] },
    };
  }
  const pwError = validatePassword(password);
  if (pwError) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { password: [pwError] },
    };
  }

  const admin = createServiceClient();

  // Re-validate the invite server-side (never trust the client's earlier read).
  const { data: invite } = await admin
    .from("staff_invites")
    .select("id, email, internal_role, status, expires_at")
    .eq("invite_token_hash", hashToken(token))
    .maybeSingle();

  if (!invite) return { success: false, error: "INVITE_INVALID" };
  if (invite.status === "accepted")
    return { success: false, error: "INVITE_ACCEPTED" };
  if (invite.status === "revoked")
    return { success: false, error: "INVITE_REVOKED" };
  if (new Date(invite.expires_at).getTime() < Date.now())
    return { success: false, error: "INVITE_EXPIRED" };

  // Atomically claim the invite before doing any account creation — the
  // conditional `.eq("status", "pending")` means only one concurrent
  // request can win this update; a second submit of the same token sees
  // 0 rows affected and bails before creating a duplicate auth user.
  const { data: claimed, error: claimError } = await admin
    .from("staff_invites")
    .update({ status: "accepted", accepted_at: new Date().toISOString() })
    .eq("id", invite.id)
    .eq("status", "pending")
    .select("id");

  if (claimError || !claimed || claimed.length === 0) {
    return { success: false, error: "INVITE_ACCEPTED" };
  }

  const email = invite.email.trim().toLowerCase();
  const role = invite.internal_role as InternalRole;
  const inviteId = invite.id;

  // Puts the invite back to "pending" so the invitee can retry — used on
  // every failure path after the claim above already flipped it to accepted.
  async function releaseClaim() {
    await admin
      .from("staff_invites")
      .update({ status: "pending", accepted_at: null })
      .eq("id", inviteId);
  }

  // Guard: no existing staff account for this email.
  const { data: existingStaff } = await admin
    .from("staff_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existingStaff) {
    await releaseClaim();
    return { success: false, error: "INVITE_ALREADY_STAFF" };
  }

  // Create the auth user (email + password, email pre-confirmed for invite).
  const { data: authData, error: authError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName.trim(), internal_role: role },
    });

  if (authError || !authData.user) {
    console.error("[acceptStaffInvite] createUser error:", authError?.code);
    await releaseClaim();
    // Most common cause: an auth user already exists for this email.
    return { success: false, error: "INVITE_ACCOUNT_EXISTS" };
  }

  // Create the staff profile (active).
  const { data: staffRow, error: staffError } = await admin
    .from("staff_profiles")
    .insert({
      auth_user_id: authData.user.id,
      email,
      full_name: fullName.trim(),
      internal_role: role,
      staff_status: "active",
    })
    .select("id")
    .single();

  if (staffError || !staffRow) {
    console.error("[acceptStaffInvite] staff insert error:", staffError?.code);
    // Roll back the orphaned auth user (best effort).
    try {
      await admin.auth.admin.deleteUser(authData.user.id);
    } catch {
      /* logged upstream */
    }
    await releaseClaim();
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  // Seed permissions from the role preset (super_admin gets none — full via role).
  // Every row carries the FULL flag set: PostgREST bulk-insert unions the keys
  // across rows and would send NULL for any column a row omits, tripping the
  // NOT NULL constraints — so we start from an explicit all-false baseline.
  const grants = getRolePreset(role).grants;
  const PERM_BASELINE = {
    can_read: false,
    can_create: false,
    can_update: false,
    can_approve: false,
    can_reject: false,
    can_delete: false,
    can_export: false,
    can_bulk_action: false,
    can_view_sensitive: false,
  };
  const permissionRows = Object.entries(grants).map(([module, perms]) => ({
    staff_profile_id: staffRow.id,
    module,
    ...PERM_BASELINE,
    ...perms,
  }));
  if (permissionRows.length > 0) {
    const { error: permError } = await admin
      .from("staff_permissions")
      .insert(permissionRows);
    if (permError) {
      console.error("[acceptStaffInvite] permission seed error:", permError.code);
    }
  }

  // Invite was already atomically claimed (marked accepted) before account
  // creation began — nothing further to do here.

  // Best-effort audit (actor = the newly joined staff member).
  const actor = {
    id: staffRow.id,
    internal_role: role,
  } as StaffProfile;
  await logAdminAction({
    staff: actor,
    action: "accept_staff_invite",
    module: "staff",
    targetType: "staff_invite",
    targetId: invite.id,
    metadataSafe: { internal_role: role },
  });

  return {
    success: true,
    data: { redirectTo: "/admin/login?invited=1" },
  };
}
