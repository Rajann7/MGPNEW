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
// getContactRevealStatus — for the lead detail page
// ============================================================

export async function getContactRevealStatus(
  leadId: string
): Promise<
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
