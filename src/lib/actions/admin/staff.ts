"use server";

import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/service";
import { requireStaff, requireStaffPermission } from "@/lib/auth/session";
import { canManageStaffPermissions } from "@/lib/permissions";
import { logAdminAction } from "@/lib/admin/audit";
import type {
  ActionResult,
  StaffProfile,
  StaffPermission,
  StaffInvite,
  InternalRole,
} from "@/types";

const EMAIL_PROVIDER_CONFIGURED = Boolean(process.env.EMAIL_PROVIDER);
const INVITE_EXPIRY_DAYS = 7;

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// ============================================================
// listStaff — paginated staff list
// ============================================================

export async function listStaff(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: StaffProfile[]; total: number }>> {
  await requireStaffPermission("staff", "can_read");
  const admin = createServiceClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await admin
    .from("staff_profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[listStaff] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return {
    success: true,
    data: { items: (data ?? []) as StaffProfile[], total: count ?? 0 },
  };
}

// ============================================================
// listStaffInvites — pending/expired/revoked invites
// ============================================================

export async function listStaffInvites(): Promise<
  ActionResult<{ items: StaffInvite[] }>
> {
  await requireStaffPermission("staff", "can_read");
  const admin = createServiceClient();

  const { data, error } = await admin
    .from("staff_invites")
    .select(
      "id, email, internal_role, invited_by_staff_id, status, expires_at, accepted_at, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[listStaffInvites] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { items: (data ?? []) as StaffInvite[] } };
}

// ============================================================
// getStaffDetail — profile + permissions
// ============================================================

export async function getStaffDetail(
  staffId: string
): Promise<
  ActionResult<{ staff: StaffProfile; permissions: StaffPermission[] }>
> {
  await requireStaffPermission("staff", "can_read");
  const admin = createServiceClient();

  const { data: staff, error } = await admin
    .from("staff_profiles")
    .select("*")
    .eq("id", staffId)
    .single();

  if (error || !staff) return { success: false, error: "STAFF_NOT_FOUND" };

  const { data: permissions } = await admin
    .from("staff_permissions")
    .select("*")
    .eq("staff_profile_id", staffId);

  return {
    success: true,
    data: {
      staff: staff as StaffProfile,
      permissions: (permissions ?? []) as StaffPermission[],
    },
  };
}

// ============================================================
// inviteStaff — creates a hashed, expiring invite record
// No fake "email sent" — honest setup-required if no provider.
// ============================================================

export async function inviteStaff(
  email: string,
  internalRole: InternalRole
): Promise<
  ActionResult<{
    inviteId: string;
    emailSent: boolean;
    devInviteToken?: string;
  }>
> {
  const { staff } = await requireStaffPermission("staff", "can_manage_staff");
  if (
    !canManageStaffPermissions(staff, null) &&
    staff.internal_role !== "super_admin"
  ) {
    return { success: false, error: "PERMISSION_DENIED" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { email: ["Enter a valid email address"] },
    };
  }

  const admin = createServiceClient();

  // Only Super Admin can invite another Super Admin
  if (internalRole === "super_admin" && staff.internal_role !== "super_admin") {
    return { success: false, error: "PERMISSION_DENIED" };
  }

  const { data: existingStaff } = await admin
    .from("staff_profiles")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();
  if (existingStaff) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { email: ["A staff account already exists for this email"] },
    };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(
    Date.now() + INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: invite, error } = await admin
    .from("staff_invites")
    .insert({
      email: normalizedEmail,
      internal_role: internalRole,
      invited_by_staff_id: staff.id,
      invite_token_hash: tokenHash,
      status: "pending",
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (error || !invite) {
    console.error("[inviteStaff] DB error:", error?.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await logAdminAction({
    staff,
    action: "invite_staff",
    module: "staff",
    targetType: "staff_invite",
    targetId: invite.id,
    metadataSafe: {
      email: normalizedEmail,
      internal_role: internalRole,
      email_provider_configured: EMAIL_PROVIDER_CONFIGURED,
    },
  });

  // No email provider configured — do not fake "email sent".
  // In development, surface the raw token so the invite can be tested manually.
  return {
    success: true,
    data: {
      inviteId: invite.id,
      emailSent: false,
      devInviteToken:
        process.env.NODE_ENV !== "production" ? rawToken : undefined,
    },
    message: EMAIL_PROVIDER_CONFIGURED
      ? "Invite created."
      : "Invite created. Email provider is not configured (SETUP_REQUIRED) — share the invite link manually.",
  };
}

// ============================================================
// revokeStaffInvite
// ============================================================

export async function revokeStaffInvite(
  inviteId: string
): Promise<ActionResult<null>> {
  const { staff } = await requireStaffPermission("staff", "can_manage_staff");
  const admin = createServiceClient();

  const { error } = await admin
    .from("staff_invites")
    .update({ status: "revoked" })
    .eq("id", inviteId)
    .eq("status", "pending");

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logAdminAction({
    staff,
    action: "revoke_staff_invite",
    module: "staff",
    targetType: "staff_invite",
    targetId: inviteId,
  });
  return { success: true, data: null };
}

// ============================================================
// updateStaffPermissions — cannot self-grant
// ============================================================

export async function updateStaffPermissions(
  staffId: string,
  module: string,
  permissions: Partial<
    Omit<
      StaffPermission,
      "id" | "staff_profile_id" | "module" | "created_at" | "updated_at"
    >
  >
): Promise<ActionResult<null>> {
  const { staff } = await requireStaffPermission("staff", "can_manage_staff");

  if (staffId === staff.id) {
    return {
      success: false,
      error: "FORBIDDEN",
      fieldErrors: { self: ["You cannot change your own permissions"] },
    };
  }

  const admin = createServiceClient();

  const { data: targetStaff } = await admin
    .from("staff_profiles")
    .select("internal_role")
    .eq("id", staffId)
    .single();
  if (!targetStaff) return { success: false, error: "STAFF_NOT_FOUND" };

  // Admin (non-super) cannot grant permissions to a Super Admin target
  if (
    staff.internal_role !== "super_admin" &&
    targetStaff.internal_role === "super_admin"
  ) {
    return { success: false, error: "PERMISSION_DENIED" };
  }

  const { data: existing } = await admin
    .from("staff_permissions")
    .select("id")
    .eq("staff_profile_id", staffId)
    .eq("module", module)
    .maybeSingle();

  const payload = { ...permissions, created_by_staff_id: staff.id };

  const { error } = existing
    ? await admin
        .from("staff_permissions")
        .update(payload)
        .eq("id", existing.id)
    : await admin
        .from("staff_permissions")
        .insert({ staff_profile_id: staffId, module, ...payload });

  if (error) {
    console.error("[updateStaffPermissions] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await logAdminAction({
    staff,
    action: "update_staff_permissions",
    module: "staff",
    targetType: "staff_profile",
    targetId: staffId,
    afterSnapshotSafe: { module, ...permissions },
  });

  return { success: true, data: null };
}

// ============================================================
// disableStaff / enableStaff
// ============================================================

async function countActiveSuperAdmins(
  admin: ReturnType<typeof createServiceClient>
): Promise<number> {
  const { count } = await admin
    .from("staff_profiles")
    .select("id", { count: "exact", head: true })
    .eq("internal_role", "super_admin")
    .eq("staff_status", "active");
  return count ?? 0;
}

export async function disableStaff(
  staffId: string,
  reason: string
): Promise<ActionResult<null>> {
  if (!reason || reason.trim().length < 3) {
    return { success: false, error: "REASON_REQUIRED" };
  }

  const { staff } = await requireStaffPermission("staff", "can_manage_staff");

  if (staffId === staff.id) {
    return {
      success: false,
      error: "FORBIDDEN",
      fieldErrors: { self: ["You cannot disable your own account"] },
    };
  }

  const admin = createServiceClient();
  const { data: target } = await admin
    .from("staff_profiles")
    .select("internal_role, staff_status")
    .eq("id", staffId)
    .single();
  if (!target) return { success: false, error: "STAFF_NOT_FOUND" };

  if (target.internal_role === "super_admin") {
    const activeCount = await countActiveSuperAdmins(admin);
    if (activeCount <= 1) {
      return {
        success: false,
        error: "FORBIDDEN",
        fieldErrors: { staff: ["Cannot disable the only active Super Admin"] },
      };
    }
    if (staff.internal_role !== "super_admin") {
      return { success: false, error: "PERMISSION_DENIED" };
    }
  }

  const { error } = await admin
    .from("staff_profiles")
    .update({ staff_status: "disabled", disabled_at: new Date().toISOString() })
    .eq("id", staffId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logAdminAction({
    staff,
    action: "disable_staff",
    module: "staff",
    targetType: "staff_profile",
    targetId: staffId,
    metadataSafe: { reason: reason.trim() },
  });

  return { success: true, data: null };
}

export async function enableStaff(
  staffId: string
): Promise<ActionResult<null>> {
  const { staff } = await requireStaffPermission("staff", "can_manage_staff");
  const admin = createServiceClient();

  const { error } = await admin
    .from("staff_profiles")
    .update({ staff_status: "active", disabled_at: null })
    .eq("id", staffId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logAdminAction({
    staff,
    action: "enable_staff",
    module: "staff",
    targetType: "staff_profile",
    targetId: staffId,
  });
  return { success: true, data: null };
}

// ============================================================
// getStaffCount — for admin dashboard
// ============================================================

export async function getStaffCount(): Promise<
  ActionResult<{ active: number; total: number }>
> {
  await requireStaff();
  const admin = createServiceClient();
  const [active, total] = await Promise.all([
    admin
      .from("staff_profiles")
      .select("id", { count: "exact", head: true })
      .eq("staff_status", "active"),
    admin.from("staff_profiles").select("id", { count: "exact", head: true }),
  ]);
  return {
    success: true,
    data: { active: active.count ?? 0, total: total.count ?? 0 },
  };
}
