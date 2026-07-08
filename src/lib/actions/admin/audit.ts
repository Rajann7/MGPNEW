"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaff } from "@/lib/auth/session";
import { canViewAuditLog } from "@/lib/permissions";
import type { ActionResult, AdminAuditLog } from "@/types";

// ============================================================
// listAuditLogs — Super Admin / audit_manager only, paginated
// ============================================================

export async function listAuditLogs(
  page = 1,
  limit = 30
): Promise<ActionResult<{ items: AdminAuditLog[]; total: number }>> {
  const staff = await requireStaff();
  if (!canViewAuditLog(staff, null)) {
    return { success: false, error: "PERMISSION_DENIED" };
  }

  const admin = createServiceClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await admin
    .from("admin_audit_logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[listAuditLogs] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return {
    success: true,
    data: { items: (data ?? []) as AdminAuditLog[], total: count ?? 0 },
  };
}
