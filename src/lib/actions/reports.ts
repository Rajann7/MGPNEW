"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { REPORT_CATEGORY_VALUES } from "@/lib/reports/config";
import type { ActionResult } from "@/types";

const VALID_CATEGORIES = REPORT_CATEGORY_VALUES;
const VALID_TARGET_TYPES = new Set(["property", "project", "requirement", "user"]);
const DAILY_CAP = 10;

/**
 * Submit a content report (Batch 4 · screen 8). Auth-required — `user_reports`
 * RLS + FK require a real reporter profile, so guests must log in first (honest;
 * no fake success). Rate-limited: no duplicate pending report of the same target,
 * and a per-user daily cap. Reports land in the moderation queue (status=pending).
 */
export async function submitReport(input: {
  targetType: string;
  targetId: string;
  category: string;
  description?: string;
}): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  if (!VALID_TARGET_TYPES.has(input.targetType))
    return { success: false, error: "Invalid report target." };
  if (!VALID_CATEGORIES.has(input.category))
    return { success: false, error: "Please choose a reason." };
  const description = (input.description ?? "").trim().slice(0, 1000) || null;

  const supabase = await createClient();

  // Rate limit: reject a duplicate pending report of the same target by this user.
  const { data: dupe } = await supabase
    .from("user_reports")
    .select("id")
    .eq("reporter_profile_id", profile.id)
    .eq("target_type", input.targetType)
    .eq("target_id", input.targetId)
    .eq("status", "pending")
    .maybeSingle();
  if (dupe) return { success: false, error: "ALREADY_REPORTED" };

  // Rate limit: per-user daily cap.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("user_reports")
    .select("id", { count: "exact", head: true })
    .eq("reporter_profile_id", profile.id)
    .gte("created_at", since);
  if ((count ?? 0) >= DAILY_CAP)
    return { success: false, error: "RATE_LIMITED" };

  const { error } = await supabase.from("user_reports").insert({
    reporter_profile_id: profile.id,
    target_type: input.targetType,
    target_id: input.targetId,
    category: input.category,
    description,
    status: "pending",
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  return { success: true, data: null };
}
