"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult } from "@/types";

const VALID_TARGET_TYPES = new Set(["broker_profile", "builder_profile"]);
const VALID_ROLES = new Set([
  "owner_director",
  "authorized_signatory",
  "marketing_head",
  "other",
]);

/**
 * Submit a "claim this profile" request (design Batch 4 · Screen 7).
 * Auth-required — no fake success for guests. Document upload isn't wired
 * (Cloudflare R2 not configured yet, per API_PROVIDER_STATUS.md), so this
 * only records the requester's role + a free-text note; a real review
 * queue row is created either way, never a fake "approved" state.
 */
export async function submitProfileClaim(input: {
  targetType: string;
  targetProfileId: string;
  claimedRole: string;
  proofNote?: string;
}): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  if (!VALID_TARGET_TYPES.has(input.targetType))
    return { success: false, error: "Invalid claim target." };
  if (!VALID_ROLES.has(input.claimedRole))
    return { success: false, error: "Please choose your role." };
  if (profile.id === input.targetProfileId)
    return { success: false, error: "OWN_PROFILE" };

  const proofNote = (input.proofNote ?? "").trim().slice(0, 1000) || null;

  const supabase = await createClient();

  const { data: dupe } = await supabase
    .from("profile_claim_requests")
    .select("id")
    .eq("requester_profile_id", profile.id)
    .eq("target_type", input.targetType)
    .eq("target_profile_id", input.targetProfileId)
    .eq("status", "pending")
    .maybeSingle();
  if (dupe) return { success: false, error: "ALREADY_REQUESTED" };

  const { error } = await supabase.from("profile_claim_requests").insert({
    requester_profile_id: profile.id,
    target_type: input.targetType,
    target_profile_id: input.targetProfileId,
    claimed_role: input.claimedRole,
    proof_note: proofNote,
    status: "pending",
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  return { success: true, data: null };
}
