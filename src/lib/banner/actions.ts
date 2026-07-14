"use server";

import { revalidatePath } from "next/cache";
import { getCurrentProfile, getCurrentStaffProfile } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { bannerFeatures, isBannerEligibleRole, DURATION_OPTIONS } from "./config";

export type BannerResult = { ok: true; message: string; id?: string } | { ok: false; message: string };

type Admin = ReturnType<typeof createServiceClient>;

interface BannerInput {
  id?: string;
  project_id: string;                       // the listed project being promoted
  gujarat_wide: boolean;
  cities: { slug: string; name: string }[];
  duration_days: number;
  desktop_image_url?: string | null;
  desktop_image_path?: string | null;
  mobile_image_url?: string | null;
  mobile_image_path?: string | null;
}

/** Advertiser context guard — signed in + an eligible business role (builder). */
async function advertiserCtx() {
  if (!bannerFeatures.enabled) return { ok: false as const, error: "Banner ads are not available." };
  const profile = await getCurrentProfile();
  if (!profile) return { ok: false as const, error: "Please sign in." };
  if (!isBannerEligibleRole(profile.public_role)) return { ok: false as const, error: "Your role cannot create banner ads." };
  return { ok: true as const, profile, admin: createServiceClient() };
}

/** Staff/admin guard (reused for moderation). */
async function staffCtx() {
  const staff = await getCurrentStaffProfile();
  if (!staff) return { ok: false as const, error: "Admin access required." };
  return { ok: true as const, staff, admin: createServiceClient() };
}

/** Best-effort audit trail for staff moderation actions. */
async function auditModeration(
  admin: Admin,
  staff: { id: string; internal_role: string },
  action: string, entityId: string, note?: string
) {
  try {
    await admin.from("admin_audit_logs").insert({
      actor_staff_profile_id: staff.id,
      actor_internal_role: staff.internal_role,
      action,
      module: "moderation",
      target_type: "banner_ad",
      target_id: entityId,
      metadata_safe: note ? { reason: note } : {},
    });
  } catch { /* best-effort */ }
}

/** Validate shared fields. Returns null when ok. */
function validateInput(input: BannerInput): string | null {
  if (!input.project_id) return "Select a project to promote.";
  if (!DURATION_OPTIONS.includes(input.duration_days as never)) return "Choose a valid duration.";
  if (bannerFeatures.cityTargeting) {
    if (!input.gujarat_wide && input.cities.length === 0) return "Select at least one city or choose Gujarat-wide.";
  }
  return null;
}

/**
 * Resolve the promoted project, enforcing ownership + that it is a PUBLISHED
 * (public) project. Returns the snapshot the banner card/links derive from.
 */
async function resolveProject(
  admin: Admin,
  profileId: string, projectId: string
): Promise<{ ok: true; title: string } | { ok: false; message: string }> {
  const { data } = await admin.from("projects")
    .select("id,builder_profile_id,project_name,status")
    .eq("id", projectId).maybeSingle();
  if (!data || data.builder_profile_id !== profileId) return { ok: false, message: "Project not found in your listings." };
  if (data.status !== "published") {
    return { ok: false, message: "The project must be live (published) before you can advertise it." };
  }
  return { ok: true, title: data.project_name as string };
}

async function syncTargets(admin: Admin, adId: string, cities: { slug: string; name: string }[]) {
  await admin.from("banner_ad_targets").delete().eq("ad_id", adId);
  if (cities.length) {
    await admin.from("banner_ad_targets").insert(cities.map((c) => ({ ad_id: adId, city_slug: c.slug, city_name: c.name })));
  }
}

/** Build the persisted column patch. Title/destination are derived from the
 *  project, not advertiser free-text. */
function patchFrom(input: BannerInput, project: { title: string }) {
  return {
    project_id: input.project_id,
    title: project.title,
    cta_label: "Contact",
    destination_url: `/project/${input.project_id}`,
    gujarat_wide: !!input.gujarat_wide,
    duration_days: input.duration_days,
    desktop_image_url: input.desktop_image_url ?? null,
    desktop_image_path: input.desktop_image_path ?? null,
    mobile_image_url: input.mobile_image_url ?? null,
    mobile_image_path: input.mobile_image_path ?? null,
  };
}

/** Create or update a draft (does not submit). */
export async function saveBannerDraft(input: BannerInput): Promise<BannerResult> {
  const s = await advertiserCtx();
  if (!s.ok) return { ok: false, message: s.error };
  const err = validateInput(input);
  if (err) return { ok: false, message: err };
  const project = await resolveProject(s.admin, s.profile.id, input.project_id);
  if (!project.ok) return { ok: false, message: project.message };

  const base = patchFrom(input, project);
  if (input.id) {
    const { data: existing } = await s.admin.from("banner_ads").select("status,advertiser_profile_id").eq("id", input.id).maybeSingle();
    if (!existing || existing.advertiser_profile_id !== s.profile.id) return { ok: false, message: "Ad not found." };
    if (!["draft", "needs_changes", "rejected"].includes(existing.status)) {
      return { ok: false, message: "This ad can no longer be edited." };
    }
    const { error } = await s.admin.from("banner_ads").update({ ...base, status: "draft", approval_status: "pending", rejection_reason: null }).eq("id", input.id);
    if (error) return { ok: false, message: "Could not save the draft." };
    await syncTargets(s.admin, input.id, input.cities);
    revalidatePath("/dashboard/builder/ads");
    return { ok: true, message: "Banner ad saved as draft.", id: input.id };
  }

  const { data, error } = await s.admin.from("banner_ads").insert({
    ...base,
    advertiser_profile_id: s.profile.id,
    advertiser_role: s.profile.public_role,
    advertiser_name: s.profile.display_name ?? s.profile.full_name,
    status: "draft",
    approval_status: "pending",
    payment_status: "not_required", // billing not wired — never faked
  }).select("id").single();
  if (error || !data) return { ok: false, message: "Could not create the ad." };
  await syncTargets(s.admin, data.id, input.cities);
  revalidatePath("/dashboard/builder/ads");
  return { ok: true, message: "Banner ad saved as draft.", id: data.id };
}

/** Submit an ad for admin review. Requires the required device images. */
export async function submitBanner(input: BannerInput): Promise<BannerResult> {
  const s = await advertiserCtx();
  if (!s.ok) return { ok: false, message: s.error };
  const err = validateInput(input);
  if (err) return { ok: false, message: err };
  if (bannerFeatures.desktopImageRequired && !input.desktop_image_url) return { ok: false, message: "Upload a desktop banner image." };
  if (bannerFeatures.mobileImageRequired && !input.mobile_image_url) return { ok: false, message: "Upload a mobile banner image." };

  // Persist latest values first (create/update draft), then move to pending.
  const saved = await saveBannerDraft(input);
  if (!saved.ok || !saved.id) return saved;

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + input.duration_days);
  const dates = { start_date: start.toISOString().slice(0, 10), end_date: end.toISOString().slice(0, 10) };

  if (bannerFeatures.approvalRequired) {
    const { error } = await s.admin.from("banner_ads").update({ status: "pending", approval_status: "pending", submitted_at: new Date().toISOString() }).eq("id", saved.id);
    if (error) return { ok: false, message: "Could not submit the ad." };
    revalidatePath("/dashboard/builder/ads");
    return { ok: true, message: "Banner ad submitted for review.", id: saved.id };
  }

  const { error } = await s.admin.from("banner_ads").update({ status: "active", approval_status: "approved", approved_at: new Date().toISOString(), ...dates }).eq("id", saved.id);
  if (error) return { ok: false, message: "Could not activate the ad." };
  revalidatePath("/dashboard/builder/ads");
  return { ok: true, message: "Banner ad is now active.", id: saved.id };
}

/** Advertiser pause / resume own ad. Resume only if still within dates. */
export async function setBannerPaused(input: { id: string; paused: boolean }): Promise<BannerResult> {
  const s = await advertiserCtx();
  if (!s.ok) return { ok: false, message: s.error };
  const { data: ad } = await s.admin.from("banner_ads").select("advertiser_profile_id,status,end_date").eq("id", input.id).maybeSingle();
  if (!ad || ad.advertiser_profile_id !== s.profile.id) return { ok: false, message: "Ad not found." };
  if (input.paused === false && ad.end_date && ad.end_date < new Date().toISOString().slice(0, 10)) {
    return { ok: false, message: "This ad has expired. Please renew it." };
  }
  const { error } = await s.admin.from("banner_ads").update({ is_paused: input.paused }).eq("id", input.id);
  if (error) return { ok: false, message: "Could not update the ad." };
  revalidatePath("/dashboard/builder/ads");
  revalidatePath("/");
  return { ok: true, message: input.paused ? "Ad paused." : "Ad resumed." };
}

/** Renew an expired ad: re-submit for a fresh window. */
export async function renewBanner(input: { id: string }): Promise<BannerResult> {
  const s = await advertiserCtx();
  if (!s.ok) return { ok: false, message: s.error };
  const { data: ad } = await s.admin.from("banner_ads").select("*").eq("id", input.id).eq("advertiser_profile_id", s.profile.id).maybeSingle();
  if (!ad) return { ok: false, message: "Ad not found." };
  const next = bannerFeatures.approvalRequired
    ? { status: "pending", approval_status: "pending", is_paused: false, start_date: null, end_date: null, approved_at: null, submitted_at: new Date().toISOString() }
    : (() => { const st = new Date(); const en = new Date(); en.setDate(en.getDate() + (ad.duration_days || 7)); return { status: "active", approval_status: "approved", is_paused: false, approved_at: new Date().toISOString(), start_date: st.toISOString().slice(0, 10), end_date: en.toISOString().slice(0, 10) }; })();
  const { error } = await s.admin.from("banner_ads").update(next).eq("id", input.id);
  if (error) return { ok: false, message: "Could not renew the ad." };
  revalidatePath("/dashboard/builder/ads");
  return { ok: true, message: bannerFeatures.approvalRequired ? "Renewal submitted for review." : "Ad renewed and active." };
}

// ---------------------------------------------------------------------------
// Admin moderation — approve / reject / request changes / pause / resume.
// Reason is required for reject/needs-changes; every action is logged.
// ---------------------------------------------------------------------------
export async function moderateBanner(input: { id: string; action: "approve" | "reject" | "request_changes" | "pause" | "resume"; reason?: string }): Promise<BannerResult> {
  const s = await staffCtx();
  if (!s.ok) return { ok: false, message: s.error };
  if ((input.action === "reject" || input.action === "request_changes") && !input.reason?.trim()) {
    return { ok: false, message: "A reason is required." };
  }
  const { data: ad } = await s.admin.from("banner_ads").select("duration_days,start_date,end_date").eq("id", input.id).maybeSingle();
  if (!ad) return { ok: false, message: "Ad not found." };

  let patch: Record<string, unknown>;
  if (input.action === "approve") {
    const start = ad.start_date ?? new Date().toISOString().slice(0, 10);
    const end = ad.end_date ?? (() => { const e = new Date(); e.setDate(e.getDate() + (ad.duration_days || 7)); return e.toISOString().slice(0, 10); })();
    patch = { status: "active", approval_status: "approved", approved_at: new Date().toISOString(), approved_by: s.staff.id, rejection_reason: null, start_date: start, end_date: end, is_paused: false };
  } else if (input.action === "reject") {
    patch = { status: "rejected", approval_status: "rejected", rejection_reason: input.reason!.trim() };
  } else if (input.action === "request_changes") {
    patch = { status: "needs_changes", approval_status: "needs_changes", rejection_reason: input.reason!.trim() };
  } else if (input.action === "pause") {
    patch = { is_paused: true };
  } else {
    patch = { is_paused: false };
  }

  const { error } = await s.admin.from("banner_ads").update(patch).eq("id", input.id);
  if (error) return { ok: false, message: "Could not update the ad." };
  await auditModeration(s.admin, s.staff, `banner_ad.${input.action}`, input.id, input.reason);
  revalidatePath("/admin/moderation/banner-ads");
  revalidatePath("/");
  return {
    ok: true,
    message:
      input.action === "approve" ? "Banner approved and scheduled."
      : input.action === "reject" ? "Banner rejected."
      : input.action === "request_changes" ? "Changes requested."
      : input.action === "pause" ? "Banner paused." : "Banner resumed.",
  };
}
