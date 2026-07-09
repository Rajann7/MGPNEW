"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  canCreateRequirement,
  canEditRequirement,
  canSubmitForApproval,
  canPauseResume,
  canSoftDelete,
} from "@/lib/permissions/entity-permissions";
import {
  RequirementDraftSchema,
  RequirementSubmitSchema,
} from "@/lib/validators/requirement";
import { checkPostingGate, incrementUsage } from "@/lib/billing/gates";
import type { ActionResult, Requirement } from "@/types";

// ============================================================
// Create requirement draft (owner/broker only)
// ============================================================

export async function createRequirementDraft(
  formData: unknown
): Promise<ActionResult<{ id: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!canCreateRequirement(profile))
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const parsed = RequirementDraftSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const supabase = await createClient();
  const profileId = profile.id;
  const data = parsed.data;

  const { data: row, error } = await supabase
    .from("requirements")
    .insert({
      created_by_profile_id: profileId,
      public_role: profile.public_role,
      title: data.title,
      purpose: data.purpose,
      category: data.category,
      requirement_type: data.requirement_type ?? null,
      description: data.description ?? null,
      budget_min: data.budget_min ?? null,
      budget_max: data.budget_max ?? null,
      rent_min: data.rent_min ?? null,
      rent_max: data.rent_max ?? null,
      area_min: data.area_min ?? null,
      area_max: data.area_max ?? null,
      area_unit: data.area_unit ?? null,
      bedrooms_min: data.bedrooms_min ?? null,
      bedrooms_max: data.bedrooms_max ?? null,
      preferred_floor: data.preferred_floor ?? null,
      furnishing_preference: data.furnishing_preference ?? null,
      possession_timeline: data.possession_timeline ?? null,
      preferred_amenities: data.preferred_amenities,
      city_text: data.city_text ?? null,
      preferred_localities_text: data.preferred_localities_text ?? null,
      contact_visibility: data.contact_visibility,
      status: "draft",
      approval_status: "draft",
      visibility_status: "private",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createRequirementDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { id: row.id } };
}

// ============================================================
// Update requirement draft
// ============================================================

export async function updateRequirementDraft(
  requirementId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("requirements")
    .select("id, created_by_profile_id, status, deleted_at")
    .eq("id", requirementId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (
    !canEditRequirement(
      profile,
      existing as Pick<
        Requirement,
        "created_by_profile_id" | "status" | "deleted_at"
      >
    )
  ) {
    return { success: false, error: "FORBIDDEN" };
  }

  const parsed = RequirementDraftSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  const { error } = await supabase
    .from("requirements")
    .update({
      title: data.title,
      purpose: data.purpose,
      category: data.category,
      requirement_type: data.requirement_type ?? null,
      description: data.description ?? null,
      budget_min: data.budget_min ?? null,
      budget_max: data.budget_max ?? null,
      rent_min: data.rent_min ?? null,
      rent_max: data.rent_max ?? null,
      area_min: data.area_min ?? null,
      area_max: data.area_max ?? null,
      area_unit: data.area_unit ?? null,
      bedrooms_min: data.bedrooms_min ?? null,
      bedrooms_max: data.bedrooms_max ?? null,
      preferred_floor: data.preferred_floor ?? null,
      furnishing_preference: data.furnishing_preference ?? null,
      possession_timeline: data.possession_timeline ?? null,
      preferred_amenities: data.preferred_amenities,
      city_text: data.city_text ?? null,
      preferred_localities_text: data.preferred_localities_text ?? null,
      contact_visibility: data.contact_visibility,
    })
    .eq("id", requirementId);

  if (error) {
    console.error("[updateRequirementDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: null };
}

// ============================================================
// Submit requirement for approval
// ============================================================

export async function submitRequirementForApproval(
  requirementId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("requirements")
    .select("id, created_by_profile_id, status, deleted_at")
    .eq("id", requirementId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.created_by_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSubmitForApproval(
      profile,
      existing as { status: Requirement["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const parsed = RequirementSubmitSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  // Billing posting gate (Prompt 09). Enforced only when BILLING_GATES_ENFORCED
  // is on; otherwise returns allowed with reason "gates_not_enforced".
  const gate = await checkPostingGate(
    profile.id,
    profile.public_role,
    "requirement"
  );
  if (!gate.allowed) {
    return {
      success: false,
      error:
        gate.reason === "limit_exceeded"
          ? "LIMIT_EXCEEDED"
          : "SUBSCRIPTION_REQUIRED",
    };
  }

  const { error } = await supabase
    .from("requirements")
    .update({
      status: "submitted",
      approval_status: "pending",
      submitted_at: new Date().toISOString(),
      title: parsed.data.title,
      city_text: parsed.data.city_text ?? null,
      contact_visibility: parsed.data.contact_visibility,
    })
    .eq("id", requirementId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  if (gate.reason === "ok")
    await incrementUsage(
      profile.id,
      profile.public_role,
      "requirement_posts_limit"
    );
  return { success: true, data: null };
}

// ============================================================
// Pause / resume requirement
// ============================================================

export async function pauseResumeRequirement(
  requirementId: string,
  action: "pause" | "resume"
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("requirements")
    .select("id, created_by_profile_id, status, deleted_at")
    .eq("id", requirementId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.created_by_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canPauseResume(
      profile,
      existing as { status: Requirement["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const newStatus = action === "pause" ? "paused" : "published";
  const newVisibility = action === "pause" ? "paused" : "public";

  const { error } = await supabase
    .from("requirements")
    .update({
      status: newStatus,
      visibility_status: newVisibility,
      paused_at: action === "pause" ? new Date().toISOString() : null,
    })
    .eq("id", requirementId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Soft delete requirement
// ============================================================

export async function softDeleteRequirement(
  requirementId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("requirements")
    .select("id, created_by_profile_id, status, deleted_at")
    .eq("id", requirementId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.created_by_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSoftDelete(
      profile,
      existing as { status: Requirement["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await supabase
    .from("requirements")
    .update({
      status: "deleted",
      visibility_status: "deleted",
      deleted_at: new Date().toISOString(),
    })
    .eq("id", requirementId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Get own requirements (paginated)
// ============================================================

/** Ownership-checked single-requirement summary — powers the "View Proposals" page header. */
export async function getMyRequirementSummary(
  requirementId: string
): Promise<ActionResult<{ id: string; title: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requirements")
    .select("id, title, created_by_profile_id, deleted_at")
    .eq("id", requirementId)
    .maybeSingle();

  if (error || !data || data.deleted_at)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (data.created_by_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  return { success: true, data: { id: data.id, title: data.title } };
}

export async function getMyRequirements(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: Partial<Requirement>[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("requirements")
    .select(
      "id, title, slug, purpose, category, budget_min, budget_max, rent_min, rent_max, city_text, possession_timeline, status, approval_status, visibility_status, admin_review_note, rejection_reason, submitted_at, published_at, expires_at, created_at, updated_at",
      { count: "exact" }
    )
    .eq("created_by_profile_id", profile.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[getMyRequirements] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { items: data ?? [], total: count ?? 0 } };
}
