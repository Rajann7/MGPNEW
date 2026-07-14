"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
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
      preferred_locations: data.preferred_locations,
      bedroom_options: data.bedroom_options,
      loan_preapproved: data.loan_preapproved,
      broker_contact_preference: data.broker_contact_preference,
      preferred_contact_time: data.preferred_contact_time ?? null,
      current_step: data.current_step ?? 1,
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
      preferred_locations: data.preferred_locations,
      bedroom_options: data.bedroom_options,
      loan_preapproved: data.loan_preapproved,
      broker_contact_preference: data.broker_contact_preference,
      preferred_contact_time: data.preferred_contact_time ?? null,
      ...(data.current_step ? { current_step: data.current_step } : {}),
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
): Promise<ActionResult<{ display_id: string | null }>> {
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

  // Duplicate/spam protection (Batch 5 §231-232): block a second ACTIVE
  // requirement from the same user with identical purpose+category+city.
  if (existing.status === "draft") {
    const { data: dupes } = await supabase
      .from("requirements")
      .select("id")
      .eq("created_by_profile_id", profile.id)
      .neq("id", requirementId)
      .eq("purpose", parsed.data.purpose)
      .eq("category", parsed.data.category)
      .ilike("city_text", parsed.data.city_text ?? "")
      .in("status", ["submitted", "under_review", "approved", "published"])
      .is("deleted_at", null)
      .limit(1);
    if (dupes && dupes.length > 0)
      return { success: false, error: "DUPLICATE_REQUIREMENT" };
  }

  // Conditional transition — duplicate rapid submits match 0 rows and cannot
  // double-transition or double-count usage (Batch 5 §129, §236, §334).
  const { data: transitioned, error } = await supabase
    .from("requirements")
    .update({
      status: "submitted",
      approval_status: "pending",
      // Resubmitting a published/paused requirement re-hides it while
      // pending re-review — admin approval flips it back to "public".
      visibility_status: "private",
      submitted_at: new Date().toISOString(),
      title: parsed.data.title,
      city_text: parsed.data.city_text ?? null,
      contact_visibility: parsed.data.contact_visibility,
    })
    .eq("id", requirementId)
    .eq("status", existing.status)
    .select("id, display_id")
    .maybeSingle();

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  if (!transitioned)
    return { success: false, error: "INVALID_STATUS_TRANSITION" };

  // Only a first submission (from draft) consumes a post entitlement (§313).
  if (gate.reason === "ok" && existing.status === "draft")
    await incrementUsage(
      profile.id,
      profile.public_role,
      "requirement_posts_limit"
    );
  return {
    success: true,
    data: { display_id: transitioned.display_id ?? null },
  };
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

/** Ownership-checked full-row fetch — powers the real Edit page (any editable status, not just drafts). */
export async function getMyRequirementById(
  requirementId: string
): Promise<ActionResult<Partial<Requirement>>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("id", requirementId)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    console.error("[getMyRequirementById] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  if (!data) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (data.created_by_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  return { success: true, data };
}

/** Most recent unsubmitted requirement draft — Batch 5 draft resume card. */
export async function getMyLatestRequirementDraft(): Promise<
  ActionResult<Partial<Requirement> | null>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("created_by_profile_id", profile.id)
    .eq("status", "draft")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getMyLatestRequirementDraft] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return { success: true, data: data ?? null };
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

// ============================================================
// Public Requirement Detail (B4-S03) — scoped-visibility fetch
//   Locked audience rule (CLAUDE.md §3A conflict #1 +
//   20260704120000_requirement_audience_verified_pro_only.sql):
//   the FULL requirement (description, requester, proposal entry) is
//   visible to VERIFIED brokers/builders and the owner-of-record only.
//   Guests / ineligible users see a minimal locked teaser.
// ============================================================

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Stable human display code derived from the real id (no fake sequence). */
function requirementDisplayCode(id: string): string {
  const n = parseInt(id.replace(/-/g, "").slice(0, 8), 16) % 9000;
  return `REQ-${n + 1000}`;
}

/** "Meera Patel" -> "M****a P." — requester identity masked until accepted. */
function maskRequesterName(fullName: string | null | undefined): string {
  const name = (fullName ?? "").trim();
  if (!name) return "Requirement poster";
  const [first, ...rest] = name.split(/\s+/);
  const last = rest.length ? rest[rest.length - 1] : "";
  const maskedFirst =
    first.length <= 2
      ? `${first[0] ?? ""}*`
      : `${first[0]}****${first[first.length - 1]}`;
  return last ? `${maskedFirst} ${last[0].toUpperCase()}.` : maskedFirst;
}

export interface RequirementDetailView {
  id: string;
  slug: string | null;
  displayCode: string;
  title: string;
  status: string;
  purpose: string;
  category: string;
  requirement_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
  rent_min: number | null;
  rent_max: number | null;
  area_min: number | null;
  area_max: number | null;
  area_unit: string | null;
  bedrooms_min: number | null;
  bedrooms_max: number | null;
  possession_timeline: string | null;
  city_text: string | null;
  preferred_localities_text: string | null;
  /** Full text only when eligible; truncated teaser otherwise. */
  description: string | null;
  created_at: string;
  poster_role: string;
  requesterMaskedName: string;
  /** true → verified broker/builder or owner-of-record: full view + propose. */
  eligible: boolean;
  isOwnerOfRecord: boolean;
  canPropose: boolean;
}

/**
 * Fetch a published requirement for the public detail route (B4-S03).
 * Returns `null` only when no published/approved/public requirement matches
 * (route → notFound). Eligibility is decided by the DB's own RLS: an
 * eligible caller can read the base row through their session client; anyone
 * else only receives the teaser projection assembled with the service role.
 */
export async function getRequirementDetail(
  slugOrId: string
): Promise<RequirementDetailView | null> {
  const admin = createServiceClient();

  const base = admin
    .from("requirements")
    .select(
      "id, slug, title, status, purpose, category, requirement_type, budget_min, budget_max, rent_min, rent_max, area_min, area_max, area_unit, bedrooms_min, bedrooms_max, possession_timeline, city_text, preferred_localities_text, description, created_at, public_role, created_by_profile_id"
    )
    .eq("status", "published")
    .eq("approval_status", "approved")
    .eq("visibility_status", "public")
    .is("deleted_at", null);

  const { data: req } = await (UUID_RE.test(slugOrId)
    ? base.eq("id", slugOrId).maybeSingle()
    : base.eq("slug", slugOrId).maybeSingle());

  if (!req) return null;

  const profile = await getCurrentProfile();

  // Eligibility = the caller can read the base row under their OWN RLS.
  let eligible = false;
  if (profile) {
    const supabase = await createClient();
    const { data: full } = await supabase
      .from("requirements")
      .select("id")
      .eq("id", req.id)
      .maybeSingle();
    eligible = !!full;
  }

  const isOwnerOfRecord = profile?.id === req.created_by_profile_id;

  // Requester name (masked) via service role — never the raw identity.
  const { data: requester } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", req.created_by_profile_id)
    .maybeSingle();

  const teaserDescription = req.description
    ? req.description.slice(0, 120) + (req.description.length > 120 ? "…" : "")
    : null;

  return {
    id: req.id,
    slug: req.slug,
    displayCode: requirementDisplayCode(req.id),
    title: req.title,
    status: req.status,
    purpose: req.purpose,
    category: req.category,
    requirement_type: req.requirement_type,
    budget_min: req.budget_min,
    budget_max: req.budget_max,
    rent_min: req.rent_min,
    rent_max: req.rent_max,
    area_min: req.area_min,
    area_max: req.area_max,
    area_unit: req.area_unit,
    bedrooms_min: req.bedrooms_min,
    bedrooms_max: req.bedrooms_max,
    possession_timeline: req.possession_timeline,
    city_text: req.city_text,
    // exact preferred localities are eligible-only
    preferred_localities_text: eligible ? req.preferred_localities_text : null,
    description: eligible ? req.description : teaserDescription,
    created_at: req.created_at,
    poster_role: req.public_role,
    requesterMaskedName: maskRequesterName(requester?.full_name),
    eligible,
    isOwnerOfRecord,
    // brokers/builders can propose (not to their own requirement)
    canPropose:
      eligible &&
      !isOwnerOfRecord &&
      (profile?.public_role === "broker" || profile?.public_role === "builder"),
  };
}
