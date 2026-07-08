"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaffPermission } from "@/lib/auth/session";
import { logAdminAction } from "@/lib/admin/audit";
import type { ActionResult, Profile, AccountStatus, PublicRole } from "@/types";

// ============================================================
// listUsers — paginated, filterable public-user list
// ============================================================

export async function listUsers(params: {
  page?: number;
  limit?: number;
  role?: PublicRole;
  status?: AccountStatus;
  search?: string;
}): Promise<ActionResult<{ items: Profile[]; total: number }>> {
  await requireStaffPermission("users", "can_read");
  const admin = createServiceClient();
  const page = params.page ?? 1;
  const limit = Math.min(params.limit ?? 20, 50);
  const offset = (page - 1) * limit;

  let query = admin
    .from("profiles")
    .select(
      "id, public_role, full_name, display_name, email, mobile, account_status, verification_status, created_at, updated_at",
      { count: "exact" }
    );

  if (params.role) query = query.eq("public_role", params.role);
  if (params.status) query = query.eq("account_status", params.status);
  if (params.search && params.search.trim().length > 0) {
    const term = params.search.trim();
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,mobile.ilike.%${term}%`
    );
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[listUsers] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return {
    success: true,
    data: { items: (data ?? []) as Profile[], total: count ?? 0 },
  };
}

// ============================================================
// getUserDetail — profile + real entity counts + internal notes
// ============================================================

export async function getUserDetail(profileId: string): Promise<
  ActionResult<{
    profile: Profile;
    propertyCount: number;
    projectCount: number;
    requirementCount: number;
    notes: {
      id: string;
      note: string;
      created_at: string;
      staff_profile_id: string | null;
    }[];
  }>
> {
  await requireStaffPermission("users", "can_read");
  const admin = createServiceClient();

  const { data: profile, error } = await admin
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();
  if (error || !profile) return { success: false, error: "ENTITY_NOT_FOUND" };

  const [properties, projects, requirements, notes] = await Promise.all([
    admin
      .from("properties")
      .select("id", { count: "exact", head: true })
      .eq("owner_profile_id", profileId)
      .is("deleted_at", null),
    admin
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("builder_profile_id", profileId)
      .is("deleted_at", null),
    admin
      .from("requirements")
      .select("id", { count: "exact", head: true })
      .eq("created_by_profile_id", profileId)
      .is("deleted_at", null),
    admin
      .from("admin_internal_notes")
      .select("id, note, created_at, staff_profile_id")
      .eq("target_profile_id", profileId)
      .order("created_at", { ascending: false }),
  ]);

  return {
    success: true,
    data: {
      profile: profile as Profile,
      propertyCount: properties.count ?? 0,
      projectCount: projects.count ?? 0,
      requirementCount: requirements.count ?? 0,
      notes: notes.data ?? [],
    },
  };
}

// ============================================================
// suspend / ban / restore
// ============================================================

async function changeAccountStatus(
  profileId: string,
  newStatus: AccountStatus,
  reason: string,
  action: string
): Promise<ActionResult<null>> {
  if (!reason || reason.trim().length < 3) {
    return { success: false, error: "REASON_REQUIRED" };
  }

  const { staff } = await requireStaffPermission("users", "can_update");
  const admin = createServiceClient();

  const { data: existing, error: fetchErr } = await admin
    .from("profiles")
    .select("id, account_status, full_name")
    .eq("id", profileId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };

  const { error } = await admin
    .from("profiles")
    .update({ account_status: newStatus })
    .eq("id", profileId);
  if (error) {
    console.error(`[${action}] DB error:`, error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await admin.from("admin_internal_notes").insert({
    target_profile_id: profileId,
    staff_profile_id: staff.id,
    note: `${action}: ${reason.trim()}`,
  });

  await logAdminAction({
    staff,
    action,
    module: "users",
    targetType: "profile",
    targetId: profileId,
    targetProfileId: profileId,
    beforeSnapshotSafe: { account_status: existing.account_status },
    afterSnapshotSafe: { account_status: newStatus },
    metadataSafe: { reason: reason.trim() },
  });

  return { success: true, data: null };
}

export async function suspendUser(
  profileId: string,
  reason: string
): Promise<ActionResult<null>> {
  return changeAccountStatus(profileId, "suspended", reason, "suspend_user");
}

export async function banUser(
  profileId: string,
  reason: string
): Promise<ActionResult<null>> {
  return changeAccountStatus(profileId, "banned", reason, "ban_user");
}

export async function restoreUser(
  profileId: string,
  reason: string
): Promise<ActionResult<null>> {
  return changeAccountStatus(profileId, "active", reason, "restore_user");
}

// ============================================================
// addUserInternalNote
// ============================================================

export async function addUserInternalNote(
  profileId: string,
  note: string
): Promise<ActionResult<null>> {
  if (!note || note.trim().length < 2) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { note: ["Note cannot be empty"] },
    };
  }

  const { staff } = await requireStaffPermission("users", "can_update");
  const admin = createServiceClient();

  const { error } = await admin.from("admin_internal_notes").insert({
    target_profile_id: profileId,
    staff_profile_id: staff.id,
    note: note.trim(),
  });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logAdminAction({
    staff,
    action: "add_user_internal_note",
    module: "users",
    targetType: "profile",
    targetId: profileId,
    targetProfileId: profileId,
  });

  return { success: true, data: null };
}

// ============================================================
// getUserCounts — for admin dashboard (real counts, capped)
// ============================================================

export async function getUserCounts(): Promise<
  ActionResult<{ total: number }>
> {
  await requireStaffPermission("users", "can_read");
  const admin = createServiceClient();
  const { count } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true });
  return { success: true, data: { total: count ?? 0 } };
}
