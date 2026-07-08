"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaffPermission } from "@/lib/auth/session";
import { logAdminAction } from "@/lib/admin/audit";
import type { ActionResult, EntityStatus } from "@/types";

export type ModerationEntityType = "property" | "project" | "requirement";

const TABLE_MAP: Record<ModerationEntityType, string> = {
  property: "properties",
  project: "projects",
  requirement: "requirements",
};

const TITLE_COLUMN: Record<ModerationEntityType, string> = {
  property: "title",
  project: "project_name",
  requirement: "title",
};

const OWNER_COLUMN: Record<ModerationEntityType, string> = {
  property: "owner_profile_id",
  project: "builder_profile_id",
  requirement: "created_by_profile_id",
};

const PENDING_APPROVAL_STATUSES = ["pending", "under_review", "need_changes"];

export interface ModerationRow {
  id: string;
  title: string;
  status: EntityStatus;
  approval_status: string;
  city_text: string | null;
  submitted_at: string | null;
  created_at: string;
  submitted_by_name: string | null;
}

// ============================================================
// listModerationQueue — pending/under_review/need_changes items
// ============================================================

export async function listModerationQueue(
  entityType: ModerationEntityType,
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: ModerationRow[]; total: number }>> {
  await requireStaffPermission(TABLE_MAP[entityType], "can_read");

  const admin = createServiceClient();
  const table = TABLE_MAP[entityType];
  const titleCol = TITLE_COLUMN[entityType];
  const ownerCol = OWNER_COLUMN[entityType];
  const offset = (page - 1) * limit;

  const selectCols: string = `id, ${titleCol}, status, approval_status, city_text, submitted_at, created_at, ${ownerCol}`;

  const { data, error, count } = await admin
    .from(table)
    .select(selectCols, { count: "exact" })
    .in("approval_status", PENDING_APPROVAL_STATUSES)
    .is("deleted_at", null)
    .order("submitted_at", { ascending: true, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(`[listModerationQueue:${entityType}] DB error:`, error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  const rows = (data ?? []) as unknown as Record<string, unknown>[];
  const ownerIds = Array.from(
    new Set(rows.map((r) => r[ownerCol] as string).filter(Boolean))
  );

  let namesById: Record<string, string> = {};
  if (ownerIds.length > 0) {
    const { data: profiles } = await admin
      .from("profiles")
      .select("id, display_name, full_name")
      .in("id", ownerIds);
    namesById = Object.fromEntries(
      (profiles ?? []).map((p) => [
        p.id,
        p.display_name ?? p.full_name ?? "Unknown",
      ])
    );
  }

  const items: ModerationRow[] = rows.map((r) => ({
    id: r.id as string,
    title: (r[titleCol] as string) ?? "Untitled",
    status: r.status as EntityStatus,
    approval_status: r.approval_status as string,
    city_text: r.city_text as string | null,
    submitted_at: r.submitted_at as string | null,
    created_at: r.created_at as string,
    submitted_by_name: namesById[r[ownerCol] as string] ?? null,
  }));

  return { success: true, data: { items, total: count ?? 0 } };
}

// ============================================================
// approveEntity — approve + publish
// ============================================================

export async function approveEntity(
  entityType: ModerationEntityType,
  entityId: string
): Promise<ActionResult<null>> {
  const { staff } = await requireStaffPermission(
    TABLE_MAP[entityType],
    "can_approve"
  );
  const admin = createServiceClient();
  const table = TABLE_MAP[entityType];

  const { data: existing, error: fetchErr } = await admin
    .from(table)
    .select("id, status, approval_status, deleted_at")
    .eq("id", entityId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.deleted_at) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!PENDING_APPROVAL_STATUSES.includes(existing.approval_status)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const now = new Date().toISOString();
  const { error } = await admin
    .from(table)
    .update({
      status: "published",
      approval_status: "approved",
      visibility_status: "public",
      approved_at: now,
      published_at: now,
      reviewed_by_staff_id: staff.id,
      rejection_reason: null,
      need_changes_reason: null,
    })
    .eq("id", entityId);

  if (error) {
    console.error(`[approveEntity:${entityType}] DB error:`, error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await admin.from("entity_status_events").insert({
    entity_type: entityType,
    entity_id: entityId,
    from_status: existing.status,
    to_status: "published",
    changed_by_staff: staff.id,
    note: "Approved and published by staff",
  });

  await logAdminAction({
    staff,
    action: "approve_entity",
    module: table,
    targetType: entityType,
    targetId: entityId,
    beforeSnapshotSafe: {
      status: existing.status,
      approval_status: existing.approval_status,
    },
    afterSnapshotSafe: { status: "published", approval_status: "approved" },
  });

  return { success: true, data: null };
}

// ============================================================
// rejectEntity — reject with mandatory reason
// ============================================================

export async function rejectEntity(
  entityType: ModerationEntityType,
  entityId: string,
  reason: string
): Promise<ActionResult<null>> {
  if (!reason || reason.trim().length < 5) {
    return { success: false, error: "REASON_REQUIRED" };
  }

  const { staff } = await requireStaffPermission(
    TABLE_MAP[entityType],
    "can_reject"
  );
  const admin = createServiceClient();
  const table = TABLE_MAP[entityType];

  const { data: existing, error: fetchErr } = await admin
    .from(table)
    .select("id, status, approval_status, deleted_at")
    .eq("id", entityId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.deleted_at) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!PENDING_APPROVAL_STATUSES.includes(existing.approval_status)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from(table)
    .update({
      status: "rejected",
      approval_status: "rejected",
      visibility_status: "hidden",
      rejection_reason: reason.trim(),
      reviewed_by_staff_id: staff.id,
    })
    .eq("id", entityId);

  if (error) {
    console.error(`[rejectEntity:${entityType}] DB error:`, error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await admin.from("entity_status_events").insert({
    entity_type: entityType,
    entity_id: entityId,
    from_status: existing.status,
    to_status: "rejected",
    changed_by_staff: staff.id,
    note: reason.trim(),
  });

  await admin.from("entity_moderation_notes").insert({
    entity_type: entityType,
    entity_id: entityId,
    staff_id: staff.id,
    note: reason.trim(),
    action_taken: "rejected",
  });

  await logAdminAction({
    staff,
    action: "reject_entity",
    module: table,
    targetType: entityType,
    targetId: entityId,
    beforeSnapshotSafe: {
      status: existing.status,
      approval_status: existing.approval_status,
    },
    afterSnapshotSafe: { status: "rejected", approval_status: "rejected" },
    metadataSafe: { reason: reason.trim() },
  });

  return { success: true, data: null };
}

// ============================================================
// requestEntityChanges — need_changes with mandatory reason
// ============================================================

export async function requestEntityChanges(
  entityType: ModerationEntityType,
  entityId: string,
  reason: string
): Promise<ActionResult<null>> {
  if (!reason || reason.trim().length < 5) {
    return { success: false, error: "REASON_REQUIRED" };
  }

  const { staff } = await requireStaffPermission(
    TABLE_MAP[entityType],
    "can_reject"
  );
  const admin = createServiceClient();
  const table = TABLE_MAP[entityType];

  const { data: existing, error: fetchErr } = await admin
    .from(table)
    .select("id, status, approval_status, deleted_at")
    .eq("id", entityId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.deleted_at) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!PENDING_APPROVAL_STATUSES.includes(existing.approval_status)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from(table)
    .update({
      status: "need_changes",
      approval_status: "need_changes",
      visibility_status: "private",
      need_changes_reason: reason.trim(),
      reviewed_by_staff_id: staff.id,
    })
    .eq("id", entityId);

  if (error) {
    console.error(`[requestEntityChanges:${entityType}] DB error:`, error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await admin.from("entity_status_events").insert({
    entity_type: entityType,
    entity_id: entityId,
    from_status: existing.status,
    to_status: "need_changes",
    changed_by_staff: staff.id,
    note: reason.trim(),
  });

  await admin.from("entity_moderation_notes").insert({
    entity_type: entityType,
    entity_id: entityId,
    staff_id: staff.id,
    note: reason.trim(),
    action_taken: "need_changes",
  });

  await logAdminAction({
    staff,
    action: "request_entity_changes",
    module: table,
    targetType: entityType,
    targetId: entityId,
    beforeSnapshotSafe: {
      status: existing.status,
      approval_status: existing.approval_status,
    },
    afterSnapshotSafe: {
      status: "need_changes",
      approval_status: "need_changes",
    },
    metadataSafe: { reason: reason.trim() },
  });

  return { success: true, data: null };
}

// ============================================================
// getModerationCounts — for admin dashboard overview (real counts)
// ============================================================

export async function getModerationCounts(): Promise<
  ActionResult<{ properties: number; projects: number; requirements: number }>
> {
  await requireStaffPermission("properties", "can_read");
  const admin = createServiceClient();

  const [properties, projects, requirements] = await Promise.all([
    admin
      .from("properties")
      .select("id", { count: "exact", head: true })
      .in("approval_status", PENDING_APPROVAL_STATUSES)
      .is("deleted_at", null),
    admin
      .from("projects")
      .select("id", { count: "exact", head: true })
      .in("approval_status", PENDING_APPROVAL_STATUSES)
      .is("deleted_at", null),
    admin
      .from("requirements")
      .select("id", { count: "exact", head: true })
      .in("approval_status", PENDING_APPROVAL_STATUSES)
      .is("deleted_at", null),
  ]);

  return {
    success: true,
    data: {
      properties: properties.count ?? 0,
      projects: projects.count ?? 0,
      requirements: requirements.count ?? 0,
    },
  };
}
