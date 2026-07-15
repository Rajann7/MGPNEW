"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  isSiteVisitParticipant,
  canTransitionSiteVisit,
} from "@/lib/permissions/communication-permissions";
import { logCrmEvent } from "@/lib/crm/events";
import { createNotification } from "@/lib/notifications/create";
import type { ActionResult, Lead, SiteVisit } from "@/types";

// ============================================================
// requestSiteVisit — requester only
// ============================================================

export async function requestSiteVisit(
  leadId: string,
  meetingNote?: string,
  meetingLocationType: "at_property" | "office" | "other" = "at_property"
): Promise<ActionResult<{ siteVisitId: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };

  const l = lead as Lead;
  if (l.requester_profile_id !== profile.id)
    return { success: false, error: "NOT_PARTICIPANT" };
  if (l.target_type === "requirement")
    return { success: false, error: "VALIDATION_ERROR" };

  // Duplicate-request guard: block a second open request on the same lead.
  const { data: openVisit } = await admin
    .from("site_visits")
    .select("id")
    .eq("lead_id", leadId)
    .in("status", ["requested", "accepted", "scheduled", "rescheduled"])
    .maybeSingle();
  if (openVisit) return { success: false, error: "DUPLICATE_REQUEST" };

  const { data: siteVisit, error } = await admin
    .from("site_visits")
    .insert({
      lead_id: leadId,
      property_id: l.target_type === "property" ? l.target_id : null,
      project_id: l.target_type === "project" ? l.target_id : null,
      requester_profile_id: l.requester_profile_id,
      host_profile_id: l.receiver_profile_id,
      meeting_location_type: meetingLocationType,
      meeting_note: meetingNote?.trim().slice(0, 500) || null,
      status: "requested",
    })
    .select("id")
    .single();

  if (error || !siteVisit) return { success: false, error: "UNKNOWN_ERROR" };

  await admin
    .from("leads")
    .update({
      status: "site_visit_requested",
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", leadId);
  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisit.id,
    eventType: "site_visit_requested",
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: l.receiver_profile_id,
    type: "site_visit_requested",
    title: "Site visit requested",
    body: `${profile.display_name ?? profile.full_name} requested a site visit.`,
    targetType: "site_visit",
    targetId: siteVisit.id,
  });

  return { success: true, data: { siteVisitId: siteVisit.id } };
}

// ============================================================
// respondSiteVisit — host only (accept/reject, optional schedule)
// ============================================================

export async function respondSiteVisit(
  siteVisitId: string,
  action: "accept" | "reject",
  scheduledAt?: string,
  rejectReason?: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (action === "reject" && (!rejectReason || rejectReason.trim().length < 1))
    return { success: false, error: "VALIDATION_ERROR" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if ((visit as SiteVisit).host_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  const newStatus =
    action === "accept" ? (scheduledAt ? "scheduled" : "accepted") : "rejected";
  if (!canTransitionSiteVisit((visit as SiteVisit).status, newStatus)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("site_visits")
    .update({
      status: newStatus,
      scheduled_at: scheduledAt ?? (visit as SiteVisit).scheduled_at,
      reject_reason:
        action === "reject"
          ? rejectReason!.trim().slice(0, 500)
          : (visit as SiteVisit).reject_reason,
    })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await admin
    .from("leads")
    .update({
      status:
        newStatus === "scheduled"
          ? "site_visit_scheduled"
          : "site_visit_requested",
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", (visit as SiteVisit).lead_id);

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: `site_visit_${newStatus}`,
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: (visit as SiteVisit).requester_profile_id,
    type:
      newStatus === "scheduled"
        ? "site_visit_scheduled"
        : "site_visit_requested",
    title: action === "accept" ? "Site visit accepted" : "Site visit rejected",
    targetType: "site_visit",
    targetId: siteVisitId,
  });

  return { success: true, data: null };
}

// ============================================================
// rescheduleSiteVisit — either participant
// ============================================================

export async function rescheduleSiteVisit(
  siteVisitId: string,
  newScheduledAt: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isSiteVisitParticipant(profile, visit as SiteVisit))
    return { success: false, error: "NOT_PARTICIPANT" };
  if (!canTransitionSiteVisit((visit as SiteVisit).status, "rescheduled")) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("site_visits")
    .update({ status: "rescheduled", scheduled_at: newScheduledAt })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: "site_visit_rescheduled",
    actorProfileId: profile.id,
  });

  const otherId =
    (visit as SiteVisit).requester_profile_id === profile.id
      ? (visit as SiteVisit).host_profile_id
      : (visit as SiteVisit).requester_profile_id;
  await createNotification({
    recipientProfileId: otherId,
    type: "site_visit_rescheduled",
    title: "Site visit rescheduled",
    targetType: "site_visit",
    targetId: siteVisitId,
  });

  return { success: true, data: null };
}

// ============================================================
// cancelSiteVisit — either participant
// ============================================================

export async function cancelSiteVisit(
  siteVisitId: string,
  reason?: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isSiteVisitParticipant(profile, visit as SiteVisit))
    return { success: false, error: "NOT_PARTICIPANT" };
  if (!canTransitionSiteVisit((visit as SiteVisit).status, "cancelled")) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("site_visits")
    .update({
      status: "cancelled",
      cancel_reason: reason?.trim().slice(0, 500) || null,
    })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: "site_visit_cancelled",
    actorProfileId: profile.id,
  });
  const otherId =
    (visit as SiteVisit).requester_profile_id === profile.id
      ? (visit as SiteVisit).host_profile_id
      : (visit as SiteVisit).requester_profile_id;
  await createNotification({
    recipientProfileId: otherId,
    type: "site_visit_cancelled",
    title: "Site visit cancelled",
    targetType: "site_visit",
    targetId: siteVisitId,
  });

  return { success: true, data: null };
}

// ============================================================
// markSiteVisitOutcome — host only, real completion/no-show only
// ============================================================

export async function markSiteVisitOutcome(
  siteVisitId: string,
  outcome: "completed" | "no_show"
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if ((visit as SiteVisit).host_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (!canTransitionSiteVisit((visit as SiteVisit).status, outcome)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("site_visits")
    .update({ status: outcome })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: `site_visit_${outcome}`,
    actorProfileId: profile.id,
  });
  return { success: true, data: null };
}

// ============================================================
// submitSiteVisitFeedback — either participant, only after
// completed/no_show; one submission per participant slot kept
// simple as a single shared feedback field this phase.
// ============================================================

export async function submitSiteVisitFeedback(
  siteVisitId: string,
  rating: number,
  comment?: string
): Promise<ActionResult<null>> {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isSiteVisitParticipant(profile, visit as SiteVisit))
    return { success: false, error: "NOT_PARTICIPANT" };
  if (!["completed", "no_show"].includes((visit as SiteVisit).status))
    return { success: false, error: "INVALID_STATUS_TRANSITION" };

  const { error } = await admin
    .from("site_visits")
    .update({
      feedback_rating: rating,
      feedback_comment: comment?.trim().slice(0, 1000) || null,
      feedback_submitted_by: profile.id,
      feedback_submitted_at: new Date().toISOString(),
    })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: "site_visit_feedback_submitted",
    actorProfileId: profile.id,
    metadataSafe: { rating },
  });
  return { success: true, data: null };
}

// ============================================================
// disputeSiteVisitOutcome — either participant, flags a
// conflicting/disputed outcome for Admin/Support review. This
// only records the dispute; resolution happens in Admin
// (Batch 11 Support queue), never auto-resolved here.
// ============================================================

export async function disputeSiteVisitOutcome(
  siteVisitId: string,
  reason: string
): Promise<ActionResult<null>> {
  if (!reason || reason.trim().length < 5)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: visit } = await admin
    .from("site_visits")
    .select("*")
    .eq("id", siteVisitId)
    .maybeSingle();
  if (!visit) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isSiteVisitParticipant(profile, visit as SiteVisit))
    return { success: false, error: "NOT_PARTICIPANT" };
  if (!["completed", "no_show"].includes((visit as SiteVisit).status))
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  if ((visit as SiteVisit).dispute_reason)
    return { success: false, error: "ALREADY_DISPUTED" };

  const { error } = await admin
    .from("site_visits")
    .update({
      dispute_reason: reason.trim().slice(0, 1000),
      disputed_by: profile.id,
      disputed_at: new Date().toISOString(),
    })
    .eq("id", siteVisitId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "site_visit",
    entityId: siteVisitId,
    eventType: "site_visit_disputed",
    actorProfileId: profile.id,
  });
  const otherId =
    (visit as SiteVisit).requester_profile_id === profile.id
      ? (visit as SiteVisit).host_profile_id
      : (visit as SiteVisit).requester_profile_id;
  await createNotification({
    recipientProfileId: otherId,
    type: "site_visit_disputed",
    title: "Site visit outcome disputed",
    targetType: "site_visit",
    targetId: siteVisitId,
  });
  return { success: true, data: null };
}

// ============================================================
// listMySiteVisits — both sides
// ============================================================

export async function listMySiteVisits(): Promise<
  ActionResult<{ items: SiteVisit[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_visits")
    .select("*")
    .or(
      `requester_profile_id.eq.${profile.id},host_profile_id.eq.${profile.id}`
    )
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as SiteVisit[] } };
}
