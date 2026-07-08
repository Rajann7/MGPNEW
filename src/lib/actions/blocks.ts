"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult, ReportCategory, MessageThread } from "@/types";

// ============================================================
// blockUser
// ============================================================

export async function blockUser(
  blockedProfileId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (blockedProfileId === profile.id)
    return { success: false, error: "VALIDATION_ERROR" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("user_blocks")
    .upsert(
      { blocker_profile_id: profile.id, blocked_profile_id: blockedProfileId },
      {
        onConflict: "blocker_profile_id,blocked_profile_id",
        ignoreDuplicates: true,
      }
    );
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  // Mark any shared thread as blocked so sendMessage stops working immediately.
  const admin = createServiceClient();
  const { data: threads } = await admin
    .from("message_threads")
    .select("id")
    .or(
      `and(participant_a_profile_id.eq.${profile.id},participant_b_profile_id.eq.${blockedProfileId}),and(participant_a_profile_id.eq.${blockedProfileId},participant_b_profile_id.eq.${profile.id})`
    );
  if (threads && threads.length > 0) {
    await admin
      .from("message_threads")
      .update({ is_blocked: true })
      .in(
        "id",
        threads.map((t: Pick<MessageThread, "id">) => t.id)
      );
  }

  return { success: true, data: null };
}

export async function unblockUser(
  blockedProfileId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("user_blocks")
    .delete()
    .eq("blocker_profile_id", profile.id)
    .eq("blocked_profile_id", blockedProfileId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// reportUserOrMessage
// ============================================================

export async function reportUserOrMessage(
  targetType:
    "message" | "thread" | "user" | "property" | "project" | "requirement",
  targetId: string,
  category: ReportCategory,
  description?: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase.from("user_reports").insert({
    reporter_profile_id: profile.id,
    target_type: targetType,
    target_id: targetId,
    category,
    description: description?.trim().slice(0, 1000) || null,
    status: "pending",
  });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}
