"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  canCreateProject,
  canEditProject,
  canSubmitForApproval,
  canPauseResume,
  canSoftDelete,
} from "@/lib/permissions/entity-permissions";
import {
  ProjectDraftSchema,
  ProjectSubmitSchema,
} from "@/lib/validators/project";
import { checkPostingGate, incrementUsage } from "@/lib/billing/gates";
import type { ActionResult, Project } from "@/types";

// ============================================================
// Create project draft (builder only)
// ============================================================

export async function createProjectDraft(
  formData: unknown
): Promise<ActionResult<{ id: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!canCreateProject(profile))
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const parsed = ProjectDraftSchema.safeParse(formData);
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
    .from("projects")
    .insert({
      builder_profile_id: profileId,
      created_by_profile_id: profileId,
      project_name: data.project_name,
      project_type: data.project_type,
      category: data.category,
      purpose: data.purpose,
      short_description: data.short_description ?? null,
      description: data.description ?? null,
      price_min: data.price_min ?? null,
      price_max: data.price_max ?? null,
      price_visible: data.price_visible,
      total_area_value: data.total_area_value ?? null,
      total_area_unit: data.total_area_unit ?? null,
      total_towers: data.total_towers ?? null,
      total_wings: data.total_wings ?? null,
      total_floors: data.total_floors ?? null,
      total_units: data.total_units ?? null,
      available_units: data.available_units ?? null,
      unit_configurations: data.unit_configurations,
      construction_status: data.construction_status ?? null,
      possession_date: data.possession_date ?? null,
      launch_date: data.launch_date ?? null,
      phase_name: data.phase_name ?? null,
      rera_registered: data.rera_registered,
      rera_number: data.rera_number ?? null,
      rera_status: data.rera_status ?? null,
      rera_valid_until: data.rera_valid_until ?? null,
      rera_disclaimer_required: data.rera_disclaimer_required,
      amenities: data.amenities,
      specifications: data.specifications,
      city_text: data.city_text ?? null,
      locality_text: data.locality_text ?? null,
      landmark: data.landmark ?? null,
      address_line: data.address_line ?? null,
      pin_code: data.pin_code || null,
      map_visibility: data.map_visibility,
      virtual_tour_url: data.virtual_tour_url || null,
      status: "draft",
      approval_status: "draft",
      visibility_status: "private",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createProjectDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { id: row.id } };
}

// ============================================================
// Update project draft
// ============================================================

export async function updateProjectDraft(
  projectId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("projects")
    .select("id, builder_profile_id, status, deleted_at")
    .eq("id", projectId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (
    !canEditProject(
      profile,
      existing as Pick<Project, "builder_profile_id" | "status" | "deleted_at">
    )
  ) {
    return { success: false, error: "FORBIDDEN" };
  }

  const parsed = ProjectDraftSchema.safeParse(formData);
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
    .from("projects")
    .update({
      project_name: data.project_name,
      project_type: data.project_type,
      category: data.category,
      purpose: data.purpose,
      short_description: data.short_description ?? null,
      description: data.description ?? null,
      price_min: data.price_min ?? null,
      price_max: data.price_max ?? null,
      price_visible: data.price_visible,
      total_area_value: data.total_area_value ?? null,
      total_area_unit: data.total_area_unit ?? null,
      total_towers: data.total_towers ?? null,
      total_wings: data.total_wings ?? null,
      total_floors: data.total_floors ?? null,
      total_units: data.total_units ?? null,
      available_units: data.available_units ?? null,
      unit_configurations: data.unit_configurations,
      construction_status: data.construction_status ?? null,
      possession_date: data.possession_date ?? null,
      launch_date: data.launch_date ?? null,
      phase_name: data.phase_name ?? null,
      rera_registered: data.rera_registered,
      rera_number: data.rera_number ?? null,
      rera_status: data.rera_status ?? null,
      rera_valid_until: data.rera_valid_until ?? null,
      rera_disclaimer_required: data.rera_disclaimer_required,
      amenities: data.amenities,
      specifications: data.specifications,
      city_text: data.city_text ?? null,
      locality_text: data.locality_text ?? null,
      landmark: data.landmark ?? null,
      address_line: data.address_line ?? null,
      pin_code: data.pin_code || null,
      map_visibility: data.map_visibility,
      virtual_tour_url: data.virtual_tour_url || null,
    })
    .eq("id", projectId);

  if (error) {
    console.error("[updateProjectDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: null };
}

// ============================================================
// Submit project for approval
// ============================================================

export async function submitProjectForApproval(
  projectId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("projects")
    .select("id, builder_profile_id, status, deleted_at")
    .eq("id", projectId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.builder_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSubmitForApproval(
      profile,
      existing as { status: Project["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const parsed = ProjectSubmitSchema.safeParse(formData);
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
    "project"
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
    .from("projects")
    .update({
      status: "submitted",
      approval_status: "pending",
      submitted_at: new Date().toISOString(),
      project_name: parsed.data.project_name,
      city_text: parsed.data.city_text ?? null,
    })
    .eq("id", projectId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  if (gate.reason === "ok")
    await incrementUsage(
      profile.id,
      profile.public_role,
      "project_posts_limit"
    );
  return { success: true, data: null };
}

// ============================================================
// Pause / resume project
// ============================================================

export async function pauseResumeProject(
  projectId: string,
  action: "pause" | "resume"
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("projects")
    .select("id, builder_profile_id, status, deleted_at")
    .eq("id", projectId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.builder_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canPauseResume(
      profile,
      existing as { status: Project["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const newStatus = action === "pause" ? "paused" : "published";
  const newVisibility = action === "pause" ? "paused" : "public";

  const { error } = await supabase
    .from("projects")
    .update({
      status: newStatus,
      visibility_status: newVisibility,
      paused_at: action === "pause" ? new Date().toISOString() : null,
    })
    .eq("id", projectId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Soft delete project
// ============================================================

export async function softDeleteProject(
  projectId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("projects")
    .select("id, builder_profile_id, status, deleted_at")
    .eq("id", projectId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.builder_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSoftDelete(
      profile,
      existing as { status: Project["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await supabase
    .from("projects")
    .update({
      status: "deleted",
      visibility_status: "deleted",
      deleted_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Get own projects (paginated)
// ============================================================

export async function getMyProjects(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: Partial<Project>[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("projects")
    .select(
      "id, project_name, slug, project_type, category, purpose, price_min, price_max, city_text, construction_status, rera_registered, status, approval_status, visibility_status, submitted_at, published_at, created_at, updated_at",
      { count: "exact" }
    )
    .eq("builder_profile_id", profile.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[getMyProjects] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { items: data ?? [], total: count ?? 0 } };
}
