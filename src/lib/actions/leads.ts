"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  isLeadParticipant,
  isLeadReceiver,
  isValidCrmStage,
} from "@/lib/permissions/communication-permissions";
import { logCrmEvent } from "@/lib/crm/events";
import { createNotification } from "@/lib/notifications/create";
import { normalizeMobile } from "@/lib/validators/auth";
import { INTEREST_VALUES } from "@/lib/leads/inquiry-config";
import type {
  ActionResult,
  Lead,
  LeadTargetType,
  LeadSource,
  LeadNote,
  LeadFollowup,
  CrmEvent,
  LeadStatus,
  CrmStage,
} from "@/types";

const TARGET_TABLE: Record<LeadTargetType, string> = {
  property: "properties",
  project: "projects",
  requirement: "requirements",
};

const TARGET_TITLE_COL: Record<LeadTargetType, string> = {
  property: "title",
  project: "project_name",
  requirement: "title",
};

const TARGET_OWNER_COL: Record<LeadTargetType, string> = {
  property: "owner_profile_id",
  project: "builder_profile_id",
  requirement: "created_by_profile_id",
};

export interface LeadTargetSummary {
  id: string;
  title: string;
  cityText: string | null;
  slug: string | null;
}

async function getTargetSummary(
  targetType: LeadTargetType,
  targetId: string
): Promise<LeadTargetSummary | null> {
  const admin = createServiceClient();
  const table = TARGET_TABLE[targetType];
  const titleCol = TARGET_TITLE_COL[targetType];
  const selectCols: string = `id, ${titleCol}, city_text, slug`;
  const { data } = await admin
    .from(table)
    .select(selectCols)
    .eq("id", targetId)
    .is("deleted_at", null)
    .maybeSingle();
  if (!data) return null;
  const row = data as unknown as Record<string, unknown>;
  return {
    id: row.id as string,
    title: (row[titleCol] as string) ?? "Untitled",
    cityText: (row.city_text as string) ?? null,
    slug: (row.slug as string) ?? null,
  };
}

async function getProfileSafeName(profileId: string): Promise<string> {
  const admin = createServiceClient();
  const { data } = await admin
    .from("profiles")
    .select("display_name, full_name")
    .eq("id", profileId)
    .maybeSingle();
  return data?.display_name ?? data?.full_name ?? "User";
}

// ============================================================
// createInquiry — enquiry form flow (property/project) +
// create_or_get_lead (requirement proposals, unchanged)
// ============================================================

/** Extra enquiry-form fields (property/project inquiries only). */
export interface InquiryFormInput {
  name?: string;
  phoneSource?: "profile" | "alternate";
  altPhone?: string;
  interestType?: string;
}

export async function createInquiry(
  targetType: LeadTargetType,
  targetId: string,
  source: LeadSource,
  message?: string,
  form?: InquiryFormInput
): Promise<ActionResult<{ leadId: string; reused: boolean }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (
    profile.account_status === "suspended" ||
    profile.account_status === "banned"
  ) {
    return { success: false, error: "FORBIDDEN" };
  }

  // Role rule: only Owner accounts can send property/project inquiries.
  // Brokers and builders are restricted (server-enforced, not just UI).
  // Requirement leads are exempt — that path backs broker proposals.
  if (targetType !== "requirement" && profile.public_role !== "owner") {
    return { success: false, error: "ROLE_RESTRICTED" };
  }

  const admin = createServiceClient();
  const table = TARGET_TABLE[targetType];
  const ownerCol = TARGET_OWNER_COL[targetType];

  const targetSelectCols: string = `id, ${ownerCol}, approval_status, visibility_status, deleted_at`;
  const { data: targetRaw } = await admin
    .from(table)
    .select(targetSelectCols)
    .eq("id", targetId)
    .maybeSingle();
  const target = targetRaw as unknown as Record<string, unknown> | null;

  if (!target || target.deleted_at)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (
    target.approval_status !== "approved" ||
    target.visibility_status !== "public"
  ) {
    return { success: false, error: "ENTITY_NOT_FOUND" };
  }

  const receiverProfileId = target[ownerCol] as string;
  if (receiverProfileId === profile.id) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { target: ["You cannot inquire about your own listing"] },
    };
  }

  // Duplicate prevention. Property/project: a second inquiry on the same
  // target is blocked outright (the UI shows the existing inquiry status).
  // Requirement: reuse the existing lead (proposal flow is idempotent).
  const { data: existing } = await admin
    .from("leads")
    .select("id, status")
    .eq("requester_profile_id", profile.id)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();

  if (existing) {
    if (targetType === "requirement") {
      return { success: true, data: { leadId: existing.id, reused: true } };
    }
    return { success: false, error: "DUPLICATE_INQUIRY" };
  }

  // Enquiry-form snapshot (property/project only). The requester consents to
  // sharing the chosen number with the receiver; the profile is never changed.
  let senderName: string | null = null;
  let profilePhone: string | null = null;
  let leadPhone: string | null = null;
  let phoneSource: "profile" | "alternate" = "profile";
  let alternateUsed = false;
  let interestType = "general";

  if (targetType !== "requirement") {
    senderName =
      (form?.name?.trim() || profile.full_name || "").slice(0, 120) || null;
    profilePhone = profile.mobile ?? null;
    leadPhone = profilePhone;
    if (form?.phoneSource === "alternate") {
      const norm = normalizeMobile(form.altPhone ?? "");
      if (!/^[6-9]\d{9}$/.test(norm)) {
        return {
          success: false,
          error: "VALIDATION_ERROR",
          fieldErrors: { altPhone: ["Enter a valid 10-digit mobile number"] },
        };
      }
      leadPhone = `+91${norm}`;
      phoneSource = "alternate";
      alternateUsed = true;
    }
    if (!leadPhone) {
      return {
        success: false,
        error: "VALIDATION_ERROR",
        fieldErrors: { phone: ["A contact number is required"] },
      };
    }
    if (form?.interestType && INTEREST_VALUES.includes(form.interestType)) {
      interestType = form.interestType;
    }
  }

  const { data: lead, error } = await admin
    .from("leads")
    .insert({
      target_type: targetType,
      target_id: targetId,
      requester_profile_id: profile.id,
      receiver_profile_id: receiverProfileId,
      source,
      status: "new",
      crm_stage: "new",
      requester_message: message?.trim().slice(0, 1000) || null,
      sender_name: senderName,
      profile_phone: profilePhone,
      lead_phone: leadPhone,
      phone_source: phoneSource,
      alternate_phone_used: alternateUsed,
      interest_type: interestType,
    })
    .select("id")
    .single();

  if (error) {
    // Race condition: unique constraint hit between our check and insert.
    if (error.code === "23505") {
      if (targetType === "requirement") {
        const { data: race } = await admin
          .from("leads")
          .select("id")
          .eq("requester_profile_id", profile.id)
          .eq("target_type", targetType)
          .eq("target_id", targetId)
          .single();
        if (race)
          return { success: true, data: { leadId: race.id, reused: true } };
      }
      return { success: false, error: "DUPLICATE_INQUIRY" };
    }
    // Missing columns → migration not applied yet. Honest setup-required state.
    if (error.code === "42703" || error.code === "PGRST204") {
      console.error(
        "[createInquiry] leads enquiry columns missing — apply 20260702090000_leads_inquiry_form_fields.sql"
      );
      return { success: false, error: "SETUP_REQUIRED" };
    }
    console.error("[createInquiry] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await logCrmEvent({
    entityType: "lead",
    entityId: lead.id,
    eventType: "lead_created",
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: receiverProfileId,
    type: "new_lead",
    title: "New inquiry received",
    body: `You have a new inquiry from ${profile.display_name ?? profile.full_name}.`,
    targetType: "lead",
    targetId: lead.id,
  });

  return { success: true, data: { leadId: lead.id, reused: false } };
}

// ============================================================
// getMyInquiryForTarget — the viewer's own inquiry on a listing
// (drives the "inquiry already sent" status on detail pages)
// ============================================================

export interface MyInquiryStatus {
  leadId: string;
  status: LeadStatus;
  crmStage: CrmStage;
  createdAt: string;
}

export async function getMyInquiryForTarget(
  targetType: LeadTargetType,
  targetId: string
): Promise<MyInquiryStatus | null> {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id, status, crm_stage, created_at")
    .eq("requester_profile_id", profile.id)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();

  if (!data) return null;
  return {
    leadId: data.id,
    status: data.status as LeadStatus,
    crmStage: data.crm_stage as CrmStage,
    createdAt: data.created_at,
  };
}

// ============================================================
// getMyLeadsAsReceiver — leads where I am the professional
// ============================================================

export interface LeadRow extends Lead {
  targetSummary: LeadTargetSummary | null;
  counterpartName: string;
}

export async function getMyLeadsAsReceiver(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: LeadRow[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("receiver_profile_id", profile.id)
    .order("last_activity_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[getMyLeadsAsReceiver] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  const items = await enrichLeads(data as Lead[], "requester");
  return { success: true, data: { items, total: count ?? 0 } };
}

// ============================================================
// getMyLeadsAsRequester — my own inquiry status (any role)
// ============================================================

export async function getMyLeadsAsRequester(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: LeadRow[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("requester_profile_id", profile.id)
    .order("last_activity_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const items = await enrichLeads(data as Lead[], "receiver");
  return { success: true, data: { items, total: count ?? 0 } };
}

async function enrichLeads(
  leads: Lead[],
  counterpartSide: "requester" | "receiver"
): Promise<LeadRow[]> {
  return Promise.all(
    leads.map(async (lead) => {
      const targetSummary = await getTargetSummary(
        lead.target_type,
        lead.target_id
      );
      const counterpartId =
        counterpartSide === "requester"
          ? lead.requester_profile_id
          : lead.receiver_profile_id;
      const counterpartName = await getProfileSafeName(counterpartId);
      return { ...lead, targetSummary, counterpartName };
    })
  );
}

// ============================================================
// getLeadDetail
// ============================================================

export async function getLeadDetail(
  leadId: string
): Promise<ActionResult<{ lead: LeadRow; isReceiver: boolean }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();

  if (error || !lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadParticipant(profile, lead as Lead))
    return { success: false, error: "NOT_PARTICIPANT" };

  const targetSummary = await getTargetSummary(
    (lead as Lead).target_type,
    (lead as Lead).target_id
  );
  const counterpartId = isLeadReceiver(profile, lead as Lead)
    ? (lead as Lead).requester_profile_id
    : (lead as Lead).receiver_profile_id;
  const counterpartName = await getProfileSafeName(counterpartId);

  return {
    success: true,
    data: {
      lead: { ...(lead as Lead), targetSummary, counterpartName },
      isReceiver: isLeadReceiver(profile, lead as Lead),
    },
  };
}

// ============================================================
// updateLeadStage — receiver-only
// ============================================================

export async function updateLeadStage(
  leadId: string,
  newStage: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (!isValidCrmStage(newStage))
    return { success: false, error: "VALIDATION_ERROR" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadReceiver(profile, lead as Lead))
    return { success: false, error: "FORBIDDEN" };

  const terminalStatuses = ["converted", "lost", "closed"];
  const update: Record<string, unknown> = {
    crm_stage: newStage,
    last_activity_at: new Date().toISOString(),
  };
  if (terminalStatuses.includes(newStage)) update.status = newStage;

  const { error } = await admin.from("leads").update(update).eq("id", leadId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "lead",
    entityId: leadId,
    eventType: "stage_changed",
    actorProfileId: profile.id,
    metadataSafe: { from: (lead as Lead).crm_stage, to: newStage },
  });

  return { success: true, data: null };
}

// ============================================================
// addLeadNote — participant only
// ============================================================

export async function addLeadNote(
  leadId: string,
  note: string,
  visibility: "private" | "shared" = "private"
): Promise<ActionResult<null>> {
  if (!note || note.trim().length < 1)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("requester_profile_id, receiver_profile_id")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadParticipant(profile, lead as Lead))
    return { success: false, error: "NOT_PARTICIPANT" };

  const { error } = await admin.from("lead_notes").insert({
    lead_id: leadId,
    author_profile_id: profile.id,
    visibility,
    note: note.trim().slice(0, 2000),
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "lead",
    entityId: leadId,
    eventType: "note_added",
    actorProfileId: profile.id,
  });
  return { success: true, data: null };
}

export async function getLeadNotes(
  leadId: string
): Promise<ActionResult<{ items: LeadNote[] }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("requester_profile_id, receiver_profile_id")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadParticipant(profile, lead as Lead))
    return { success: false, error: "NOT_PARTICIPANT" };

  // Own private notes + any shared notes are visible; other participant's private notes are not.
  const { data, error } = await admin
    .from("lead_notes")
    .select("*")
    .eq("lead_id", leadId)
    .or(
      `visibility.eq.shared,and(visibility.eq.private,author_profile_id.eq.${profile.id})`
    )
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as LeadNote[] } };
}

// ============================================================
// createFollowup / completeFollowup
// ============================================================

export async function createFollowup(
  leadId: string,
  dueAt: string,
  title: string,
  note?: string
): Promise<ActionResult<null>> {
  if (!title || title.trim().length < 1)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("requester_profile_id, receiver_profile_id")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadParticipant(profile, lead as Lead))
    return { success: false, error: "NOT_PARTICIPANT" };

  const { error } = await admin.from("lead_followups").insert({
    lead_id: leadId,
    profile_id: profile.id,
    due_at: dueAt,
    title: title.trim().slice(0, 200),
    note: note?.trim().slice(0, 1000) || null,
    status: "pending",
  });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "lead",
    entityId: leadId,
    eventType: "followup_created",
    actorProfileId: profile.id,
  });
  return { success: true, data: null };
}

export async function completeFollowup(
  followupId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: followup } = await admin
    .from("lead_followups")
    .select("id, profile_id, lead_id")
    .eq("id", followupId)
    .maybeSingle();
  if (!followup) return { success: false, error: "ENTITY_NOT_FOUND" };
  if ((followup as LeadFollowup).profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };

  const { error } = await admin
    .from("lead_followups")
    .update({ status: "completed" })
    .eq("id", followupId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "lead",
    entityId: (followup as LeadFollowup).lead_id,
    eventType: "followup_completed",
    actorProfileId: profile.id,
  });
  return { success: true, data: null };
}

export async function getLeadFollowups(
  leadId: string
): Promise<ActionResult<{ items: LeadFollowup[] }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lead_followups")
    .select("*")
    .eq("lead_id", leadId)
    .eq("profile_id", profile.id)
    .order("due_at", { ascending: true });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as LeadFollowup[] } };
}

// ============================================================
// getLeadTimeline
// ============================================================

export async function getLeadTimeline(
  leadId: string
): Promise<ActionResult<{ items: CrmEvent[] }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("crm_events")
    .select("*")
    .eq("entity_type", "lead")
    .eq("entity_id", leadId)
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as CrmEvent[] } };
}

// ============================================================
// getLeadCounts — for dashboard overview (real counts)
// ============================================================

export async function getLeadCounts(): Promise<
  ActionResult<{ total: number; open: number }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const [total, open] = await Promise.all([
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("receiver_profile_id", profile.id),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("receiver_profile_id", profile.id)
      .not("status", "in", "(converted,lost,closed,spam,blocked,archived)"),
  ]);

  return {
    success: true,
    data: { total: total.count ?? 0, open: open.count ?? 0 },
  };
}
