"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { requireStaffPermission } from "@/lib/auth/session";
import type { ActionResult } from "@/types";

export interface VerificationQueueRow {
  profileId: string;
  fullName: string;
  publicRole: "owner" | "broker" | "builder";
  verificationStatus: string;
  submittedAt: string | null;
}

// ============================================================
// listPendingVerifications — real profiles.verification_status query
// Full document upload/review workflow is a future phase — this is
// the honest foundation: real pending/under_review counts, no fake
// approval action yet (approval requires the document review UI).
// ============================================================

export async function listPendingVerifications(): Promise<
  ActionResult<{ items: VerificationQueueRow[] }>
> {
  await requireStaffPermission("verification", "can_read");
  const admin = createServiceClient();

  const { data, error } = await admin
    .from("profiles")
    .select("id, full_name, public_role, verification_status, updated_at")
    .in("verification_status", ["pending", "under_review", "need_changes"])
    .order("updated_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("[listPendingVerifications] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return {
    success: true,
    data: {
      items: (data ?? []).map((p) => ({
        profileId: p.id,
        fullName: p.full_name,
        publicRole: p.public_role,
        verificationStatus: p.verification_status,
        submittedAt: p.updated_at,
      })),
    },
  };
}
