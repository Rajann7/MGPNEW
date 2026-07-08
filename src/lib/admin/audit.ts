import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import type { StaffProfile } from "@/types";

/**
 * Shared admin audit logging helper. Every internal moderation/staff/user
 * action must call this — never insert into admin_audit_logs directly, so
 * the "no secrets/OTP/raw docs in audit logs" rule stays enforced in one place.
 */
export async function logAdminAction(params: {
  staff: StaffProfile;
  action: string;
  module: string;
  targetType?: string;
  targetId?: string;
  targetProfileId?: string;
  beforeSnapshotSafe?: Record<string, unknown> | null;
  afterSnapshotSafe?: Record<string, unknown> | null;
  metadataSafe?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    const admin = createServiceClient();
    await admin.from("admin_audit_logs").insert({
      actor_staff_profile_id: params.staff.id,
      actor_internal_role: params.staff.internal_role,
      action: params.action,
      module: params.module,
      target_type: params.targetType ?? null,
      target_id: params.targetId ?? null,
      target_profile_id: params.targetProfileId ?? null,
      before_snapshot_safe: params.beforeSnapshotSafe ?? null,
      after_snapshot_safe: params.afterSnapshotSafe ?? null,
      metadata_safe: params.metadataSafe ?? null,
    });
  } catch (err) {
    // Audit logging must never block the primary action, but should be visible in server logs
    console.error("[logAdminAction] failed to write audit log:", err);
  }
}
