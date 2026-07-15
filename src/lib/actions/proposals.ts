"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  isProposalParticipant,
  canTransitionProposal,
} from "@/lib/permissions/communication-permissions";
import { logCrmEvent } from "@/lib/crm/events";
import { createNotification } from "@/lib/notifications/create";
import { createInquiry } from "./leads";
import type { ActionResult, Proposal } from "@/types";

// ============================================================
// sendProposal — broker/builder proposes against a requirement
// ============================================================

export async function sendProposal(
  requirementId: string,
  title: string,
  message?: string,
  priceOffer?: number,
  termsSummary?: string,
  availabilityNote?: string,
  validUntil?: string
): Promise<ActionResult<{ proposalId: string }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (profile.public_role !== "broker" && profile.public_role !== "builder") {
    return { success: false, error: "ROLE_NOT_ALLOWED" };
  }
  if (!title || title.trim().length < 3)
    return { success: false, error: "VALIDATION_ERROR" };

  const admin = createServiceClient();
  const { data: requirement } = await admin
    .from("requirements")
    .select(
      "id, created_by_profile_id, approval_status, visibility_status, deleted_at"
    )
    .eq("id", requirementId)
    .maybeSingle();

  if (!requirement || requirement.deleted_at)
    return { success: false, error: "ENTITY_NOT_FOUND" };
  if (
    requirement.approval_status !== "approved" ||
    requirement.visibility_status !== "public"
  ) {
    return { success: false, error: "ENTITY_NOT_FOUND" };
  }
  if (requirement.created_by_profile_id === profile.id) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: {
        requirement: ["You cannot propose to your own requirement"],
      },
    };
  }

  const { data: existing } = await admin
    .from("proposals")
    .select("id, status")
    .eq("proposer_profile_id", profile.id)
    .eq("requirement_id", requirementId)
    .not("status", "in", "(withdrawn,rejected,expired,archived)")
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: {
        requirement: [
          "You already have an active proposal for this requirement",
        ],
      },
    };
  }

  // Link a lead so messaging/timeline have a common anchor.
  const leadResult = await createInquiry(
    "requirement",
    requirementId,
    "requirement_detail_proposal",
    message
  );
  const leadId = leadResult.success ? leadResult.data.leadId : null;

  const { data: proposal, error } = await admin
    .from("proposals")
    .insert({
      proposer_profile_id: profile.id,
      recipient_profile_id: requirement.created_by_profile_id,
      target_type: "requirement",
      requirement_id: requirementId,
      lead_id: leadId,
      title: title.trim().slice(0, 200),
      message: message?.trim().slice(0, 2000) || null,
      price_offer: priceOffer ?? null,
      terms_summary: termsSummary?.trim().slice(0, 1000) || null,
      availability_note: availabilityNote?.trim().slice(0, 500) || null,
      valid_until: validUntil ?? null,
      status: "sent",
    })
    .select("id")
    .single();

  if (error || !proposal) {
    console.error("[sendProposal] DB error:", error?.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  await logCrmEvent({
    entityType: "proposal",
    entityId: proposal.id,
    eventType: "proposal_sent",
    actorProfileId: profile.id,
  });
  await createNotification({
    recipientProfileId: requirement.created_by_profile_id,
    type: "proposal_sent",
    title: "New proposal received",
    body: `${profile.display_name ?? profile.full_name} sent you a proposal.`,
    targetType: "proposal",
    targetId: proposal.id,
  });

  return { success: true, data: { proposalId: proposal.id } };
}

// ============================================================
// updateProposalStatus
// ============================================================

const RECIPIENT_ONLY_STATUSES = [
  "viewed",
  "shortlisted",
  "negotiation",
  "accepted",
  "rejected",
];
const PROPOSER_ONLY_STATUSES = ["withdrawn"];

export async function updateProposalStatus(
  proposalId: string,
  newStatus: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: proposal } = await admin
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .maybeSingle();
  if (!proposal) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isProposalParticipant(profile, proposal as Proposal))
    return { success: false, error: "NOT_PARTICIPANT" };

  if (
    RECIPIENT_ONLY_STATUSES.includes(newStatus) &&
    (proposal as Proposal).recipient_profile_id !== profile.id
  ) {
    return { success: false, error: "FORBIDDEN" };
  }
  if (
    PROPOSER_ONLY_STATUSES.includes(newStatus) &&
    (proposal as Proposal).proposer_profile_id !== profile.id
  ) {
    return { success: false, error: "FORBIDDEN" };
  }
  if (!canTransitionProposal((proposal as Proposal).status, newStatus)) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const { error } = await admin
    .from("proposals")
    .update({ status: newStatus })
    .eq("id", proposalId);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  await logCrmEvent({
    entityType: "proposal",
    entityId: proposalId,
    eventType: `proposal_${newStatus}`,
    actorProfileId: profile.id,
  });

  if (["accepted", "rejected"].includes(newStatus)) {
    await createNotification({
      recipientProfileId: (proposal as Proposal).proposer_profile_id,
      type:
        newStatus === "accepted" ? "proposal_accepted" : "proposal_rejected",
      title:
        newStatus === "accepted"
          ? "Your proposal was accepted"
          : "Your proposal was rejected",
      targetType: "proposal",
      targetId: proposalId,
    });
  } else if (newStatus === "viewed") {
    await createNotification({
      recipientProfileId: (proposal as Proposal).proposer_profile_id,
      type: "proposal_viewed",
      title: "Your proposal was viewed",
      targetType: "proposal",
      targetId: proposalId,
    });
  }

  return { success: true, data: null };
}

// ============================================================
// getProposalCountsByRequirement — real per-requirement received counts
// (owner dashboard requirement cards — never fabricated)
// ============================================================

export async function getProposalCountsByRequirement(): Promise<
  ActionResult<Record<string, number>>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposals")
    .select("requirement_id")
    .eq("recipient_profile_id", profile.id)
    .not("status", "in", "(withdrawn,archived)");

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.requirement_id] = (counts[row.requirement_id] ?? 0) + 1;
  }
  return { success: true, data: counts };
}

// ============================================================
// getMyProposals — sent (proposer) or received (recipient)
// ============================================================

export async function getMyProposals(
  direction: "sent" | "received",
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: Proposal[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const column =
    direction === "sent" ? "proposer_profile_id" : "recipient_profile_id";
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("proposals")
    .select("*", { count: "exact" })
    .eq(column, profile.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return {
    success: true,
    data: { items: (data ?? []) as Proposal[], total: count ?? 0 },
  };
}

// ============================================================
// getProposalDetail — full detail for sender/recipient
// ============================================================

export interface ProposalDetail extends Proposal {
  requirementTitle: string | null;
  requirementCityText: string | null;
  counterpartName: string;
  isRecipient: boolean;
}

export async function getProposalDetail(
  proposalId: string
): Promise<ActionResult<ProposalDetail>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const admin = createServiceClient();
  const { data: proposal } = await admin
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .maybeSingle();
  if (!proposal) return { success: false, error: "ENTITY_NOT_FOUND" };
  if (!isProposalParticipant(profile, proposal as Proposal))
    return { success: false, error: "NOT_PARTICIPANT" };

  const p = proposal as Proposal;
  const isRecipient = p.recipient_profile_id === profile.id;

  let requirementTitle: string | null = null;
  let requirementCityText: string | null = null;
  if (p.requirement_id) {
    const { data: requirement } = await admin
      .from("requirements")
      .select("title, city_text")
      .eq("id", p.requirement_id)
      .maybeSingle();
    requirementTitle = requirement?.title ?? null;
    requirementCityText = requirement?.city_text ?? null;
  }

  const counterpartId = isRecipient
    ? p.proposer_profile_id
    : p.recipient_profile_id;
  const { data: counterpart } = await admin
    .from("profiles")
    .select("display_name, full_name")
    .eq("id", counterpartId)
    .maybeSingle();

  // Recipient viewing a "sent" proposal auto-transitions to "viewed" — real
  // status change, not a fake read-receipt.
  if (isRecipient && p.status === "sent") {
    await admin
      .from("proposals")
      .update({ status: "viewed" })
      .eq("id", proposalId);
    p.status = "viewed";
    await logCrmEvent({
      entityType: "proposal",
      entityId: proposalId,
      eventType: "proposal_viewed",
      actorProfileId: profile.id,
    });
  }

  return {
    success: true,
    data: {
      ...p,
      requirementTitle,
      requirementCityText,
      counterpartName: counterpart?.display_name ?? counterpart?.full_name ?? "User",
      isRecipient,
    },
  };
}

// ============================================================
// getMatchingRequirements — builder-only, simple transparent match
// ============================================================

export interface MatchingRequirement {
  id: string;
  title: string;
  cityText: string | null;
  category: string;
  budgetMin: number | null;
  budgetMax: number | null;
  matchedBecause: string;
}

export async function getMatchingRequirements(): Promise<
  ActionResult<{ items: MatchingRequirement[]; hasPublishedProjects: boolean }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (profile.public_role !== "builder")
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const admin = createServiceClient();

  const { data: myProjects } = await admin
    .from("projects")
    .select("city_text, category")
    .eq("builder_profile_id", profile.id)
    .eq("approval_status", "approved")
    .is("deleted_at", null);

  const cities = Array.from(
    new Set((myProjects ?? []).map((p) => p.city_text).filter(Boolean))
  ) as string[];
  const categories = Array.from(
    new Set((myProjects ?? []).map((p) => p.category).filter(Boolean))
  ) as string[];

  if (cities.length === 0) {
    return {
      success: true,
      data: { items: [], hasPublishedProjects: false },
    };
  }

  const { data: requirements } = await admin
    .from("requirements")
    .select("id, title, city_text, category, budget_min, budget_max")
    .eq("approval_status", "approved")
    .eq("visibility_status", "public")
    .eq("requirement_type", "project")
    .in("city_text", cities)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(50);

  const items: MatchingRequirement[] = (requirements ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    cityText: r.city_text,
    category: r.category,
    budgetMin: r.budget_min,
    budgetMax: r.budget_max,
    matchedBecause: categories.includes(r.category)
      ? `Same city (${r.city_text}) and category (${r.category}) as your projects`
      : `Same city (${r.city_text}) as your projects`,
  }));

  return { success: true, data: { items, hasPublishedProjects: true } };
}

// ============================================================
// getOpenRequirementsForBroker — simple transparent browse list
// (no matching logic — brokers see all open public requirements)
// ============================================================

export async function getOpenRequirementsForBroker(
  page = 1,
  limit = 20
): Promise<ActionResult<{ items: MatchingRequirement[]; total: number }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };
  if (profile.public_role !== "broker")
    return { success: false, error: "ROLE_NOT_ALLOWED" };

  const admin = createServiceClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await admin
    .from("requirements")
    .select("id, title, city_text, category, budget_min, budget_max", {
      count: "exact",
    })
    .eq("approval_status", "approved")
    .eq("visibility_status", "public")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const items: MatchingRequirement[] = (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    cityText: r.city_text,
    category: r.category,
    budgetMin: r.budget_min,
    budgetMax: r.budget_max,
    matchedBecause: "Open requirement on the platform",
  }));

  return { success: true, data: { items, total: count ?? 0 } };
}
