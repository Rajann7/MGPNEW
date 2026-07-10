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
): Promise<ActionResult<{ id: string; updated_at?: string }>> {
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
      // Classification is optional while drafting (Step 1 saves before Step 2)
      purpose: data.purpose ?? null,
      category: data.category ?? null,
      property_type: data.property_type ?? null,
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
      preferred_contact_time: data.preferred_contact_time ?? null,
      current_step: data.current_step ?? 1,
      status: "draft",
      approval_status: "draft",
      visibility_status: "private",
    })
    .select("id, updated_at")
    .single();

  if (error) {
    console.error("[createPropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: { id: row.id, updated_at: row.updated_at } };
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
      purpose: data.purpose ?? null,
      category: data.category ?? null,
      property_type: data.property_type ?? null,
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
      preferred_contact_time: data.preferred_contact_time ?? null,
      ...(data.current_step ? { current_step: data.current_step } : {}),
    })
    .eq("id", propertyId);

  if (error) {
    console.error("[updatePropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: null };
}

// ============================================================
// Autosave property draft (debounced from the wizard)
// ============================================================

/**
 * Autosave with optimistic concurrency (Batch 5 §34-37): the client sends the
 * `updated_at` it last observed; if the row changed since (another tab /
 * slower earlier request landing late), the write is refused with CONFLICT and
 * the latest timestamp is returned — an older autosave can never overwrite
 * newer data. Creates the draft on first meaningful save when `propertyId`
 * is null (first-step persistence, §16-19). Never touches non-draft statuses.
 */
export async function autosavePropertyDraft(
  propertyId: string | null,
  formData: unknown,
  baseUpdatedAt: string | null
): Promise<
  ActionResult<{ id: string; updated_at: string | null; conflict?: boolean }>
> {
  if (!propertyId) {
    const created = await createPropertyDraft(formData);
    if (!created.success) return created;
    return {
      success: true,
      data: { id: created.data.id, updated_at: created.data.updated_at ?? null },
    };
  }

  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

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
  const { data: existing } = await supabase
    .from("properties")
    .select("id, owner_profile_id, status, deleted_at, updated_at")
    .eq("id", propertyId)
    .single();
  if (!existing) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (existing.owner_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  // Autosave must never mutate a submitted/under-review payload (§320)
  if (!["draft", "need_changes", "rejected"].includes(existing.status))
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  if (baseUpdatedAt && existing.updated_at !== baseUpdatedAt) {
    return {
      success: true,
      data: { id: existing.id, updated_at: existing.updated_at, conflict: true },
    };
  }

  const d = parsed.data;
  const { data: updated, error } = await supabase
    .from("properties")
    .update({
      title: d.title,
      purpose: d.purpose ?? null,
      category: d.category ?? null,
      property_type: d.property_type ?? null,
      description: d.description ?? null,
      price: d.price ?? null,
      rent_amount: d.rent_amount ?? null,
      deposit_amount: d.deposit_amount ?? null,
      maintenance_amount: d.maintenance_amount ?? null,
      price_negotiable: d.price_negotiable,
      area_value: d.area_value ?? null,
      area_unit: d.area_unit ?? null,
      built_up_area: d.built_up_area ?? null,
      carpet_area: d.carpet_area ?? null,
      plot_area: d.plot_area ?? null,
      bedrooms: d.bedrooms ?? null,
      bathrooms: d.bathrooms ?? null,
      balconies: d.balconies ?? null,
      floor_number: d.floor_number ?? null,
      total_floors: d.total_floors ?? null,
      furnishing_status: d.furnishing_status ?? null,
      property_age: d.property_age ?? null,
      possession_status: d.possession_status ?? null,
      available_from: d.available_from ?? null,
      facing: d.facing ?? null,
      parking: d.parking ?? null,
      amenities: d.amenities,
      extra_attributes: d.extra_attributes,
      city_text: d.city_text ?? null,
      locality_text: d.locality_text ?? null,
      building_name: d.building_name ?? null,
      landmark: d.landmark ?? null,
      address_line: d.address_line ?? null,
      pin_code: d.pin_code || null,
      contact_visibility: d.contact_visibility,
      map_visibility: d.map_visibility,
      preferred_contact_time: d.preferred_contact_time ?? null,
      ...(d.current_step ? { current_step: d.current_step } : {}),
    })
    .eq("id", propertyId)
    .eq("updated_at", existing.updated_at)
    .select("id, updated_at")
    .maybeSingle();

  if (error) {
    console.error("[autosavePropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  if (!updated) {
    // Row moved between our read and write — treat as conflict, not success
    return {
      success: true,
      data: { id: propertyId, updated_at: null, conflict: true },
    };
  }
  return {
    success: true,
    data: { id: updated.id, updated_at: updated.updated_at },
  };
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

  // Media minimum (Batch 5 §92, §104): at least 3 real uploaded photos are
  // required to submit — Draft can stay incomplete, but Submit cannot skip
  // this the way the old "Photo upload coming soon" placeholder silently did.
  const { count: photoCount } = await supabase
    .from("media")
    .select("id", { count: "exact", head: true })
    .eq("owner_type", "property")
    .eq("owner_id", propertyId)
    .eq("kind", "image");
  if ((photoCount ?? 0) < 3) {
    return {
      success: false,
      error: "MEDIA_REQUIRED",
      meta: { photoCount: photoCount ?? 0, photosRequired: 3 },
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
      meta: {
        used: "used" in gate ? gate.used : undefined,
        limit: "limit" in gate ? gate.limit : undefined,
        planName: "planName" in gate ? gate.planName : undefined,
      },
    };
  }

  // Conditional transition: the update only applies while the row is still in
  // the status we validated. A duplicate rapid submit sees status="submitted",
  // matches 0 rows, and cannot double-transition or double-count usage
  // (Batch 5 §129, §334).
  const { data: transitioned, error } = await supabase
    .from("properties")
    .update({
      status: "submitted",
      approval_status: "pending",
      // A resubmit (edit after publish) must re-hide the listing while
      // pending re-review — admin approval is what flips this back to
      // "public" (src/lib/actions/admin/moderation.ts).
      visibility_status: "private",
      submitted_at: new Date().toISOString(),
      // Apply the full latest form data (Batch 5 §128) — autosave already
      // wrote these on the last step transition, but a fast Preview→Submit
      // click can outrun a still-pending autosave, so Submit re-applies the
      // entire validated payload rather than a partial field subset.
      title: parsed.data.title,
      purpose: parsed.data.purpose,
      category: parsed.data.category,
      property_type: parsed.data.property_type,
      description: parsed.data.description ?? null,
      price: parsed.data.price ?? null,
      rent_amount: parsed.data.rent_amount ?? null,
      deposit_amount: parsed.data.deposit_amount ?? null,
      maintenance_amount: parsed.data.maintenance_amount ?? null,
      price_negotiable: parsed.data.price_negotiable,
      area_value: parsed.data.area_value ?? null,
      area_unit: parsed.data.area_unit ?? null,
      built_up_area: parsed.data.built_up_area ?? null,
      carpet_area: parsed.data.carpet_area ?? null,
      plot_area: parsed.data.plot_area ?? null,
      bedrooms: parsed.data.bedrooms ?? null,
      bathrooms: parsed.data.bathrooms ?? null,
      balconies: parsed.data.balconies ?? null,
      floor_number: parsed.data.floor_number ?? null,
      total_floors: parsed.data.total_floors ?? null,
      furnishing_status: parsed.data.furnishing_status ?? null,
      property_age: parsed.data.property_age ?? null,
      possession_status: parsed.data.possession_status ?? null,
      available_from: parsed.data.available_from ?? null,
      facing: parsed.data.facing ?? null,
      parking: parsed.data.parking ?? null,
      amenities: parsed.data.amenities,
      extra_attributes: parsed.data.extra_attributes,
      city_text: parsed.data.city_text ?? null,
      locality_text: parsed.data.locality_text ?? null,
      building_name: parsed.data.building_name ?? null,
      landmark: parsed.data.landmark ?? null,
      address_line: parsed.data.address_line ?? null,
      pin_code: parsed.data.pin_code || null,
      contact_visibility: parsed.data.contact_visibility,
      map_visibility: parsed.data.map_visibility,
      preferred_contact_time: parsed.data.preferred_contact_time ?? null,
    })
    .eq("id", propertyId)
    .eq("status", existing.status)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[submitPropertyForApproval] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  if (!transitioned)
    return { success: false, error: "INVALID_STATUS_TRANSITION" };

  // Resubmission of a previously published/paused listing does not consume a
  // new post entitlement (§313) — only first submissions count usage.
  if (gate.reason === "ok" && ["draft"].includes(existing.status))
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
// Relist an expired property
// ============================================================

/** Sends an expired listing back through real re-approval — never an instant fake republish. */
export async function relistProperty(
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
  if (existing.owner_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (existing.status !== "expired")
    return { success: false, error: "INVALID_STATUS_TRANSITION" };

  const { error } = await supabase
    .from("properties")
    .update({
      status: "submitted",
      approval_status: "pending",
      visibility_status: "private",
      submitted_at: new Date().toISOString(),
      expires_at: null,
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
      "id, title, slug, purpose, category, property_type, price, rent_amount, city_text, locality_text, status, approval_status, visibility_status, admin_review_note, rejection_reason, submitted_at, published_at, expires_at, created_at, updated_at",
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

/** Most recent unsubmitted draft for the current user, full row — powers
 * the wizard's "Continue where you left off" re-entry card (design Batch 5
 * · 5A). Real, DB-backed — no fake "steps done" count is fabricated; the
 * card computes completeness from real filled fields client-side. */
export async function getMyLatestPropertyDraft(): Promise<
  ActionResult<Partial<Property> | null>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_profile_id", profile.id)
    .eq("status", "draft")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getMyLatestPropertyDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return { success: true, data: data ?? null };
}

/** Ownership-checked full-row fetch — powers the real Edit page (any editable status, not just drafts). */
export async function getMyPropertyById(
  propertyId: string
): Promise<ActionResult<Partial<Property>>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    console.error("[getMyPropertyById] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  if (!data) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (data.owner_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  return { success: true, data };
}
