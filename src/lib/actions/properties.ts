"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  canCreateProperty,
  canEditProperty,
  canSubmitForApproval,
  canPauseResume,
  canSoftDelete,
} from "@/lib/permissions/entity-permissions";
import {
  PropertyDraftSchema,
  PropertySubmitSchema,
} from "@/lib/validators/property";
import { checkPostingGate, incrementUsage } from "@/lib/billing/gates";
import type { ActionResult, Property } from "@/types";

// ============================================================
// Create property draft
// ============================================================

export async function createPropertyDraft(
  formData: unknown
): Promise<ActionResult<{ id: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!canCreateProperty(profile))
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const parsed = PropertyDraftSchema.safeParse(formData);
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
  const profileId = profile!.id;
  const data = parsed.data;

  const { data: row, error } = await supabase
    .from("properties")
    .insert({
      owner_profile_id: profileId,
      created_by_profile_id: profileId,
      public_role: profile.public_role,
      title: data.title,
      purpose: data.purpose,
      category: data.category,
      property_type: data.property_type,
      description: data.description ?? null,
      price: data.price ?? null,
      rent_amount: data.rent_amount ?? null,
      deposit_amount: data.deposit_amount ?? null,
      maintenance_amount: data.maintenance_amount ?? null,
      price_negotiable: data.price_negotiable,
      area_value: data.area_value ?? null,
      area_unit: data.area_unit ?? null,
      built_up_area: data.built_up_area ?? null,
      carpet_area: data.carpet_area ?? null,
      plot_area: data.plot_area ?? null,
      bedrooms: data.bedrooms ?? null,
      bathrooms: data.bathrooms ?? null,
      balconies: data.balconies ?? null,
      floor_number: data.floor_number ?? null,
      total_floors: data.total_floors ?? null,
      furnishing_status: data.furnishing_status ?? null,
      property_age: data.property_age ?? null,
      possession_status: data.possession_status ?? null,
      available_from: data.available_from ?? null,
      facing: data.facing ?? null,
      parking: data.parking ?? null,
      amenities: data.amenities,
      extra_attributes: data.extra_attributes,
      city_text: data.city_text ?? null,
      locality_text: data.locality_text ?? null,
      building_name: data.building_name ?? null,
      landmark: data.landmark ?? null,
      address_line: data.address_line ?? null,
      pin_code: data.pin_code || null,
      contact_visibility: data.contact_visibility,
      map_visibility: data.map_visibility,
      status: "draft",
      approval_status: "draft",
      visibility_status: "private",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createPropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { id: row.id } };
}

// ============================================================
// Update property draft
// ============================================================

export async function updatePropertyDraft(
  propertyId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("properties")
    .select("id, owner_profile_id, status, deleted_at")
    .eq("id", propertyId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (
    !canEditProperty(
      profile,
      existing as Pick<Property, "owner_profile_id" | "status" | "deleted_at">
    )
  ) {
    return { success: false, error: "FORBIDDEN" };
  }

  const parsed = PropertyDraftSchema.safeParse(formData);
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
    .from("properties")
    .update({
      title: data.title,
      purpose: data.purpose,
      category: data.category,
      property_type: data.property_type,
      description: data.description ?? null,
      price: data.price ?? null,
      rent_amount: data.rent_amount ?? null,
      deposit_amount: data.deposit_amount ?? null,
      maintenance_amount: data.maintenance_amount ?? null,
      price_negotiable: data.price_negotiable,
      area_value: data.area_value ?? null,
      area_unit: data.area_unit ?? null,
      built_up_area: data.built_up_area ?? null,
      carpet_area: data.carpet_area ?? null,
      plot_area: data.plot_area ?? null,
      bedrooms: data.bedrooms ?? null,
      bathrooms: data.bathrooms ?? null,
      balconies: data.balconies ?? null,
      floor_number: data.floor_number ?? null,
      total_floors: data.total_floors ?? null,
      furnishing_status: data.furnishing_status ?? null,
      property_age: data.property_age ?? null,
      possession_status: data.possession_status ?? null,
      available_from: data.available_from ?? null,
      facing: data.facing ?? null,
      parking: data.parking ?? null,
      amenities: data.amenities,
      extra_attributes: data.extra_attributes,
      city_text: data.city_text ?? null,
      locality_text: data.locality_text ?? null,
      building_name: data.building_name ?? null,
      landmark: data.landmark ?? null,
      address_line: data.address_line ?? null,
      pin_code: data.pin_code || null,
      contact_visibility: data.contact_visibility,
      map_visibility: data.map_visibility,
    })
    .eq("id", propertyId);

  if (error) {
    console.error("[updatePropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: null };
}

// ============================================================
// Submit property for approval
// ============================================================

export async function submitPropertyForApproval(
  propertyId: string,
  formData: unknown
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("properties")
    .select("id, owner_profile_id, status, deleted_at")
    .eq("id", propertyId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.owner_profile_id !== profile!.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSubmitForApproval(
      profile,
      existing as { status: Property["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  // Validate full submit requirements
  const parsed = PropertySubmitSchema.safeParse(formData);
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
    "property"
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
    .from("properties")
    .update({
      status: "submitted",
      approval_status: "pending",
      submitted_at: new Date().toISOString(),
      // Apply latest form data
      title: parsed.data.title,
      purpose: parsed.data.purpose,
      category: parsed.data.category,
      property_type: parsed.data.property_type,
      description: parsed.data.description ?? null,
      price: parsed.data.price ?? null,
      rent_amount: parsed.data.rent_amount ?? null,
      city_text: parsed.data.city_text ?? null,
      locality_text: parsed.data.locality_text ?? null,
      contact_visibility: parsed.data.contact_visibility,
    })
    .eq("id", propertyId);

  if (error) {
    console.error("[submitPropertyForApproval] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  if (gate.reason === "ok")
    await incrementUsage(
      profile.id,
      profile.public_role,
      "property_posts_limit"
    );
  return { success: true, data: null };
}

// ============================================================
// Pause / resume property
// ============================================================

export async function pauseResumeProperty(
  propertyId: string,
  action: "pause" | "resume"
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("properties")
    .select("id, owner_profile_id, status, deleted_at")
    .eq("id", propertyId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.owner_profile_id !== profile!.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canPauseResume(
      profile,
      existing as { status: Property["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const newStatus = action === "pause" ? "paused" : "published";
  const newVisibility = action === "pause" ? "paused" : "public";

  const { error } = await supabase
    .from("properties")
    .update({
      status: newStatus,
      visibility_status: newVisibility,
      paused_at: action === "pause" ? new Date().toISOString() : null,
    })
    .eq("id", propertyId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Soft delete property
// ============================================================

export async function softDeleteProperty(
  propertyId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: existing, error: fetchErr } = await supabase
    .from("properties")
    .select("id, owner_profile_id, status, deleted_at")
    .eq("id", propertyId)
    .single();

  if (fetchErr || !existing)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.owner_profile_id !== profile!.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !canSoftDelete(
      profile,
      existing as { status: Property["status"]; deleted_at: string | null }
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await supabase
    .from("properties")
    .update({
      status: "deleted",
      visibility_status: "deleted",
      deleted_at: new Date().toISOString(),
    })
    .eq("id", propertyId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// Get own properties (paginated)
// ============================================================

export async function getMyProperties(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: Partial<Property>[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("properties")
    .select(
      "id, title, slug, purpose, category, property_type, price, rent_amount, city_text, locality_text, status, approval_status, visibility_status, submitted_at, published_at, created_at, updated_at",
      { count: "exact" }
    )
    .eq("owner_profile_id", profile!.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[getMyProperties] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { items: data ?? [], total: count ?? 0 } };
}
