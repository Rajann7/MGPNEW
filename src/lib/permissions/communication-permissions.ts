import type {
  Profile,
  Lead,
  Proposal,
  MessageThread,
  SiteVisit,
} from "@/types";

// ============================================================
// Lead Participant Checks
// ============================================================

export function isLeadParticipant(
  profile: Profile | null,
  lead: Pick<Lead, "requester_profile_id" | "receiver_profile_id">
): boolean {
  if (!profile) return false;
  return (
    lead.requester_profile_id === profile.id ||
    lead.receiver_profile_id === profile.id
  );
}

export function isLeadReceiver(
  profile: Profile | null,
  lead: Pick<Lead, "receiver_profile_id">
): boolean {
  if (!profile) return false;
  return lead.receiver_profile_id === profile.id;
}

export function isLeadRequester(
  profile: Profile | null,
  lead: Pick<Lead, "requester_profile_id">
): boolean {
  if (!profile) return false;
  return lead.requester_profile_id === profile.id;
}

// ============================================================
// Proposal Participant Checks
// ============================================================

export function isProposalParticipant(
  profile: Profile | null,
  proposal: Pick<Proposal, "proposer_profile_id" | "recipient_profile_id">
): boolean {
  if (!profile) return false;
  return (
    proposal.proposer_profile_id === profile.id ||
    proposal.recipient_profile_id === profile.id
  );
}

// ============================================================
// Message Thread Participant Checks
// ============================================================

export function isThreadParticipant(
  profile: Profile | null,
  thread: Pick<
    MessageThread,
    "participant_a_profile_id" | "participant_b_profile_id"
  >
): boolean {
  if (!profile) return false;
  return (
    thread.participant_a_profile_id === profile.id ||
    thread.participant_b_profile_id === profile.id
  );
}

// ============================================================
// Site Visit Participant Checks
// ============================================================

export function isSiteVisitParticipant(
  profile: Profile | null,
  visit: Pick<SiteVisit, "requester_profile_id" | "host_profile_id">
): boolean {
  if (!profile) return false;
  return (
    visit.requester_profile_id === profile.id ||
    visit.host_profile_id === profile.id
  );
}

// ============================================================
// Lead Status Transitions
// ============================================================

const LEAD_STAGE_ORDER = [
  "new",
  "contacted",
  "interested",
  "follow_up",
  "site_visit",
  "proposal",
  "negotiation",
  "converted",
  "lost",
  "closed",
] as const;

export function isValidCrmStage(
  stage: string
): stage is (typeof LEAD_STAGE_ORDER)[number] {
  return (LEAD_STAGE_ORDER as readonly string[]).includes(stage);
}

// ============================================================
// Proposal Status Transitions
// ============================================================

const PROPOSAL_TRANSITIONS: Record<string, string[]> = {
  draft: ["sent"],
  sent: ["viewed", "shortlisted", "withdrawn", "expired"],
  viewed: ["shortlisted", "withdrawn", "expired"],
  shortlisted: ["negotiation", "withdrawn", "expired"],
  negotiation: ["accepted", "rejected"],
  accepted: ["archived"],
  rejected: ["archived"],
  withdrawn: ["archived"],
  expired: ["archived"],
  archived: [],
};

export function canTransitionProposal(from: string, to: string): boolean {
  return PROPOSAL_TRANSITIONS[from]?.includes(to) ?? false;
}

// ============================================================
// Site Visit Status Transitions
// ============================================================

const SITE_VISIT_TRANSITIONS: Record<string, string[]> = {
  requested: ["accepted", "rejected", "expired"],
  accepted: ["scheduled", "completed", "no_show", "cancelled"],
  scheduled: ["rescheduled", "completed", "no_show", "cancelled"],
  rescheduled: ["completed", "cancelled", "no_show"],
  completed: [],
  no_show: [],
  rejected: [],
  cancelled: [],
  expired: [],
};

export function canTransitionSiteVisit(from: string, to: string): boolean {
  return SITE_VISIT_TRANSITIONS[from]?.includes(to) ?? false;
}
