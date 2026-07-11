"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  isLeadReceiver,
  isLeadRequester,
} from "@/lib/permissions/communication-permissions";
import { logCrmEvent } from "@/lib/crm/events";
import { createNotification } from "@/lib/notifications/create";
import type { ActionResult, Lead, ContactRequest } from "@/types";

const TARGET_TABLE: Record<string, string> = {
  property: "properties",
  project: "projects",
  requirement: "requirements",
};

/**
 * Reveal decision by contact_visibility. Projects have no contact_visibility
 * column — product rule: project contact is always visible to any logged-in
 * user (per docs/06 project system memory), so projects auto-reveal.
 */
async function decideAutoApproval(
  lead: Lead,
  requesterVerified: boolean
): Promise<"auto" | "manual" | "never"> {
  if (lead.target_type === "project") return "auto";

  const admin = createServiceClient();
  const table = TARGET_TABLE[lead.target_type];
  const { data } = await admin
    .from(table)
    .select("contact_visibility")
    .eq("id", lead.target_id)
    .maybeSingle();
  const visibility = data?.contact_visibility as string | undefined;

  if (!visibility || visibility === "hidden") return "never";
  if (visibility === "show_after_login" || visibility === "public")
    return "auto";
  if (visibility === "show_to_verified_users")
    return requesterVerified ? "auto" : "manual";
  return "manual"; // show_after_approval
}

// ============================================================
// requestContactReveal — requester only
// ============================================================

export async function requestContactReveal(
  leadId: string
): Promise<ActionResult<{ contactRequestId: string; autoApproved: boolean }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) return { success: false, error: "LEAD_NOT_FOUND" };
  if (!isLeadRequester(profile, lead as Lead))
    return { success: false, error: "NOT_PARTICIPANT" };

  const { data: existing } = await admin
    .from("contact_requests")
    .select("*")
    .eq("lead_id", leadId)
    .maybeSingle();
  if (
    existing &&
    ["approved", "pending_owner_response", "requested"].includes(
      existing.status
    )
  ) {
    return {
      success: true,
      data: {
        contactRequestId: existing.id,
        autoApproved: existing.status === "approved",
      },
    };
  }

  const decision = await decideAutoApproval(
    lead as Lead,
    profile.verification_status === "verified"
  );
  if (decision === "never") {
    return { success: false, error: "CONTACT_REVEAL_NOT_AUTHORIZED" };
  }

  const now = new Date().toISOString();
  const payload = {
    lead_id: leadId,
    requester_profile_id: (lead as Lead).requester_profile_id,
    receiver_profile_id: (lead as Lead).receiver_profile_id,
    status: decision === "auto" ? "approved" : "pending_owner_response",
    reveal_status: decision === "auto" ? "revealed_to_requester" : "pending",
    revealed_at: decision === "auto" ? now : null,
  };

  const { data: contactRequest, error } = existing
    ? await admin
        .from("contact_requests")
        .update(payload)
        .eq("id", existing.id)
        .select("id")
        .single()
    : await admin
        .from("contact_requests")
        .insert(payload)
        .select("id")
        .single();

  if (error || !contactRequest)
    return { success: false, error: "UNKNOWN_ERROR" };

  await admin
    .from("leads")
    .update({
      status: decision === "auto" ? "contact_shared" : "contact_requested",
      last_activity_at: now,
    })
    .eq("id", leadId);

  await logCrmEvent({
    entityType: "lead",
    entityId: leadId,
    eventType: "contact_requested",
    actorProfileId: profile.id,
  });

  if (decision === "auto") {
    await logCrmEvent({
      entityType: "lead",
      entityId: leadId,
      eventType: "contact_approved",
      actorProfileId: profile.id,
      metadataSafe: { auto: true },
    });
  } else {
    await createNotification({
      recipientProfileId: (lead as Lead).receiver_profile_id,
      type: "contact_requested",
      title: "Contact reveal requested",
      body: `${profile.display_name ?? profile.full_name} requested your contact details.`,
      targetType: "lead",
      targetId: leadId,
    });
  }

  return {
    success: true,
    data: {
      contactRequestId: contactRequest.id,
      autoApproved: decision === "auto",
    },
  };
}

// ============================================================
// approveContactReveal / rejectContactReveal — receiver only
// ============================================================

export async function approveContactReveal(
  contactRequestId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: cr } = await admin
    .from("contact_requests")
    .select("*")
    .eq("id", contactRequestId)
    .maybeSingle();
  if (!cr) return { success: false, error: "ENTITY_NOT_FOUND" };
  if ((cr as ContactRequest).receiver_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !["requested", "pending_owner_response"].includes(
      (cr as ContactRequest).status
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const now = new Date().toISOString();
  const { error } = await admin
    .from("contact_requests")
    .update({
      status: "approved",
      reveal_status: "revealed_to_requester",
      revealed_at: now,
    })
    .eq("id", contactRequestId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await admin
    .from("leads")
    .update({ status: "contact_shared", last_activity_at: now })
    .eq("id", (cr as ContactRequest).lead_id);
  await logCrmEvent({
    entityType: "lead",
    entityId: (cr as ContactRequest).lead_id,
    eventType: "contact_approved",
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: (cr as ContactRequest).requester_profile_id,
    type: "contact_approved",
    title: "Contact details shared",
    body: "The owner approved your contact request.",
    targetType: "lead",
    targetId: (cr as ContactRequest).lead_id,
  });

  return { success: true, data: null };
}

export async function rejectContactReveal(
  contactRequestId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: cr } = await admin
    .from("contact_requests")
    .select("*")
    .eq("id", contactRequestId)
    .maybeSingle();
  if (!cr) return { success: false, error: "ENTITY_NOT_FOUND" };
  if ((cr as ContactRequest).receiver_profile_id !== profile.id)
    return { success: false, error: "FORBIDDEN" };
  if (
    !["requested", "pending_owner_response"].includes(
      (cr as ContactRequest).status
    )
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("contact_requests")
    .update({ status: "rejected", reveal_status: "denied" })
    .eq("id", contactRequestId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await admin
    .from("leads")
    .update({
      status: "contact_denied",
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", (cr as ContactRequest).lead_id);
  await logCrmEvent({
    entityType: "lead",
    entityId: (cr as ContactRequest).lead_id,
    eventType: "contact_rejected",
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: (cr as ContactRequest).requester_profile_id,
    type: "contact_rejected",
    title: "Contact request declined",
    targetType: "lead",
    targetId: (cr as ContactRequest).lead_id,
  });

  return { success: true, data: null };
}

// ============================================================
// Batch 4 — listing-level explicit contact reveal
// (masked-until-reveal; spec §7-8, §44-46, §251-252)
// ============================================================

export type RevealTargetType =
  "property" | "project" | "broker_profile" | "builder_profile";

/** Batch 4 §44 masked display format: `+91 98XXX XXX45`. Never the full
 * number — only first two and last two digits survive. */
function maskPhoneDisplay(mobile: string | null | undefined): string | null {
  if (!mobile) return null;
  const digits = mobile.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return null;
  return `+91 ${digits.slice(0, 2)}XXX XXX${digits.slice(-2)}`;
}

/** Resolves the contact owner + visibility policy for a reveal target from
 * PUBLIC-SAFE views only — a non-public entity resolves to null, so drafts /
 * pending / removed listings can never be revealed against. */
async function resolveRevealTarget(
  targetType: RevealTargetType,
  targetId: string
): Promise<{ ownerProfileId: string; visibility: string } | null> {
  const admin = createServiceClient();
  switch (targetType) {
    case "property": {
      const { data } = await admin
        .from("public_properties_view")
        .select("owner_profile_id, contact_visibility")
        .eq("id", targetId)
        .maybeSingle();
      return data?.owner_profile_id
        ? {
            ownerProfileId: data.owner_profile_id,
            visibility: data.contact_visibility ?? "show_after_login",
          }
        : null;
    }
    case "project": {
      const { data } = await admin
        .from("public_projects_view")
        .select("builder_profile_id")
        .eq("id", targetId)
        .maybeSingle();
      // Projects have no contact_visibility column — product rule: builder
      // contact is visible to any logged-in viewer (docs/06), via explicit
      // reveal only.
      return data?.builder_profile_id
        ? {
            ownerProfileId: data.builder_profile_id,
            visibility: "show_after_login",
          }
        : null;
    }
    case "broker_profile": {
      const { data } = await admin
        .from("public_broker_profiles_view")
        .select("profile_id")
        .eq("profile_id", targetId)
        .maybeSingle();
      return data?.profile_id
        ? { ownerProfileId: data.profile_id, visibility: "show_after_login" }
        : null;
    }
    case "builder_profile": {
      const { data } = await admin
        .from("public_builder_profiles_view")
        .select("profile_id")
        .eq("profile_id", targetId)
        .maybeSingle();
      return data?.profile_id
        ? { ownerProfileId: data.profile_id, visibility: "show_after_login" }
        : null;
    }
  }
}

function policyBasisFor(
  visibility: string,
  viewerVerified: boolean
): "public" | "show_after_login" | "show_to_verified_users" | null {
  if (visibility === "public") return "public";
  if (visibility === "show_after_login") return "show_after_login";
  if (visibility === "show_to_verified_users")
    return viewerVerified ? "show_to_verified_users" : null;
  return null; // hidden / show_after_approval handled separately
}

export interface ListingContactState {
  /** Masked display value (`+91 98XXX XXX45`) — null when the owner has no
   * usable mobile on file. NEVER the full number. */
  masked: string | null;
  /** Full number ONLY when this viewer already completed an explicit reveal
   * (idempotent re-show after refresh, spec §252). */
  revealedPhone: string | null;
  /** What the Reveal button should do for this viewer. */
  policy:
    | "eligible"
    | "needs_login"
    | "needs_verified"
    | "needs_enquiry_approval"
    | "hidden";
}

/** Initial-render contact state for detail pages. The full number is
 * included only when this viewer already has a persisted reveal event —
 * before that, only the masked value ever reaches the client (spec §46). */
export async function getListingContactState(
  targetType: RevealTargetType,
  targetId: string
): Promise<ListingContactState> {
  const [profile, target] = await Promise.all([
    getCurrentProfile(),
    resolveRevealTarget(targetType, targetId),
  ]);
  if (!target) return { masked: null, revealedPhone: null, policy: "hidden" };

  const admin = createServiceClient();
  const { data: ownerRow } = await admin
    .from("profiles")
    .select("mobile")
    .eq("id", target.ownerProfileId)
    .maybeSingle();
  const masked = maskPhoneDisplay(ownerRow?.mobile);
  if (!masked) return { masked: null, revealedPhone: null, policy: "hidden" };

  if (!profile) return { masked, revealedPhone: null, policy: "needs_login" };

  // Already revealed by this viewer? Re-show without a new event.
  const { data: existingEvent } = await admin
    .from("contact_reveal_events")
    .select("id")
    .eq("requester_profile_id", profile.id)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();
  if (existingEvent) {
    return {
      masked,
      revealedPhone: ownerRow?.mobile ?? null,
      policy: "eligible",
    };
  }

  if (target.visibility === "hidden")
    return { masked, revealedPhone: null, policy: "hidden" };
  if (target.visibility === "show_after_approval")
    return { masked, revealedPhone: null, policy: "needs_enquiry_approval" };
  if (
    target.visibility === "show_to_verified_users" &&
    profile.verification_status !== "verified"
  )
    return { masked, revealedPhone: null, policy: "needs_verified" };
  return { masked, revealedPhone: null, policy: "eligible" };
}

/**
 * Explicit server-authorised Reveal (spec §45):
 * auth → target validation → self-reveal block → visibility policy →
 * persist immutable reveal event (idempotent) → return full number →
 * notify contact owner on first reveal.
 */
export async function revealListingContact(
  targetType: RevealTargetType,
  targetId: string
): Promise<ActionResult<{ phone: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const target = await resolveRevealTarget(targetType, targetId);
  if (!target) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (target.ownerProfileId === profile.id)
    return { success: false, error: "SELF_ACTION" }; // spec §10

  const admin = createServiceClient();

  // Policy check. show_after_approval is honoured through an approved
  // lead-based contact request (the existing Prompt-08 flow) — spec §45.6.
  let basis = policyBasisFor(
    target.visibility,
    profile.verification_status === "verified"
  );
  if (!basis) {
    if (target.visibility === "hidden")
      return { success: false, error: "CONTACT_HIDDEN" };
    if (target.visibility === "show_to_verified_users")
      return { success: false, error: "VERIFICATION_REQUIRED" };
    // show_after_approval
    const { data: approved } = await admin
      .from("contact_requests")
      .select(
        "id, lead_id, leads!inner(target_type, target_id, requester_profile_id)"
      )
      .eq("requester_profile_id", profile.id)
      .eq("status", "approved")
      .eq("leads.target_type", targetType)
      .eq("leads.target_id", targetId)
      .limit(1)
      .maybeSingle();
    if (!approved) return { success: false, error: "NEEDS_ENQUIRY_APPROVAL" };
    basis = "approved_contact_request" as never;
  }

  const { data: ownerRow } = await admin
    .from("profiles")
    .select("mobile")
    .eq("id", target.ownerProfileId)
    .maybeSingle();
  if (!ownerRow?.mobile)
    return { success: false, error: "CONTACT_UNAVAILABLE" };

  // Idempotent, race-safe persist: unique(requester,target) makes concurrent
  // reveals collapse into one event (spec §251-252).
  const { error: insertError, data: inserted } = await admin
    .from("contact_reveal_events")
    .insert({
      requester_profile_id: profile.id,
      contact_owner_profile_id: target.ownerProfileId,
      target_type: targetType,
      target_id: targetId,
      policy_basis: basis,
    })
    .select("id")
    .maybeSingle();

  if (insertError && insertError.code !== "23505") {
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  if (inserted) {
    // First reveal only: notify the contact owner (spec §45.10). Failure to
    // notify must not fail the reveal itself.
    await createNotification({
      recipientProfileId: target.ownerProfileId,
      type: "contact_revealed",
      title: "Your contact number was viewed",
      body: `${profile.display_name ?? profile.full_name ?? "A member"} viewed your contact number.`,
      targetType:
        targetType === "broker_profile" || targetType === "builder_profile"
          ? undefined
          : targetType,
      targetId:
        targetType === "broker_profile" || targetType === "builder_profile"
          ? undefined
          : targetId,
    }).catch(() => undefined);
  }

  return { success: true, data: { phone: ownerRow.mobile } };
}

// ============================================================
// getContactRevealStatus — for the lead detail page
// ============================================================

export async function getContactRevealStatus(leadId: string): Promise<
  ActionResult<{
    contactRequest: ContactRequest | null;
    revealedMobile: string | null;
    revealedEmail: string | null;
  }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (
    !lead ||
    (!isLeadRequester(profile, lead as Lead) &&
      !isLeadReceiver(profile, lead as Lead))
  ) {
    // Same error for "no such lead" and "not a participant" — avoids
    // leaking which lead IDs exist to a non-participant caller.
    return { success: false, error: "NOT_PARTICIPANT" };
  }

  const { data: cr } = await admin
    .from("contact_requests")
    .select("*")
    .eq("lead_id", leadId)
    .maybeSingle();

  let revealedMobile: string | null = null;
  let revealedEmail: string | null = null;

  const isRevealedToRequester =
    cr &&
    ["revealed_to_requester", "revealed_to_both"].includes(
      (cr as ContactRequest).reveal_status
    );
  if (isRevealedToRequester && isLeadRequester(profile, lead as Lead)) {
    const { data: receiverProfile } = await admin
      .from("profiles")
      .select("mobile, email")
      .eq("id", (lead as Lead).receiver_profile_id)
      .single();
    revealedMobile = receiverProfile?.mobile ?? null;
    revealedEmail = receiverProfile?.email ?? null;
  }

  return {
    success: true,
    data: {
      contactRequest: (cr as ContactRequest) ?? null,
      revealedMobile,
      revealedEmail,
    },
  };
}
