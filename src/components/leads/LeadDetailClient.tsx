"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { CrmStageBadge } from "./CrmStageBadge";
import {
  updateLeadStage,
  addLeadNote,
  createFollowup,
  completeFollowup,
  closeLead,
  dismissDuplicateLeadFlag,
  mergeDuplicateLeads,
} from "@/lib/actions/leads";
import {
  requestContactReveal,
  approveContactReveal,
  rejectContactReveal,
} from "@/lib/actions/contact";
import {
  createOrGetThreadForLead,
  sendMessage,
  listMessages,
  markThreadRead,
  reportThread,
  getThreadReportStatus,
} from "@/lib/actions/messages";
import {
  requestSiteVisit,
  respondSiteVisit,
  cancelSiteVisit,
  submitSiteVisitFeedback,
  disputeSiteVisitOutcome,
  markSiteVisitOutcome,
} from "@/lib/actions/site-visits";
import type { LeadRow, DuplicateLeadFlag } from "@/lib/actions/leads";
import { CLOSE_REASONS } from "@/lib/leads/close-reasons";
import type {
  LeadNote,
  LeadFollowup,
  CrmEvent,
  ContactRequest,
  SiteVisit,
  Message,
  CrmStage,
} from "@/types";

const CRM_STAGES: CrmStage[] = [
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
];

const REPORT_CATEGORIES = [
  "spam",
  "fraud",
  "abuse",
  "harassment",
  "contact_abuse",
  "other",
] as const;

export function LeadDetailClient({
  lead,
  isReceiver,
  initialNotes,
  initialFollowups,
  initialTimeline,
  initialContactRequest,
  initialRevealedMobile,
  initialRevealedEmail,
  initialSiteVisits,
  initialDuplicateFlags,
}: {
  lead: LeadRow;
  isReceiver: boolean;
  initialNotes: LeadNote[];
  initialFollowups: LeadFollowup[];
  initialTimeline: CrmEvent[];
  initialContactRequest: ContactRequest | null;
  initialRevealedMobile: string | null;
  initialRevealedEmail: string | null;
  initialSiteVisits: SiteVisit[];
  initialDuplicateFlags: DuplicateLeadFlag[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // --- Contact reveal (server actions trigger router.refresh() to re-fetch these) ---
  const contactRequest = initialContactRequest;
  const revealedMobile = initialRevealedMobile;
  const revealedEmail = initialRevealedEmail;

  function handleRequestContact() {
    startTransition(async () => {
      const result = await requestContactReveal(lead.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function handleApproveContact() {
    if (!contactRequest) return;
    startTransition(async () => {
      const result = await approveContactReveal(contactRequest.id);
      if (result.success) router.refresh();
    });
  }

  function handleRejectContact() {
    if (!contactRequest) return;
    startTransition(async () => {
      const result = await rejectContactReveal(contactRequest.id);
      if (result.success) router.refresh();
    });
  }

  // --- Stage (receiver only) ---
  function handleStageChange(stage: CrmStage) {
    startTransition(async () => {
      const result = await updateLeadStage(lead.id, stage);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  // --- Notes ---
  const [notes, setNotes] = useState(initialNotes);
  const [noteText, setNoteText] = useState("");
  function handleAddNote() {
    if (noteText.trim().length < 1) return;
    startTransition(async () => {
      const result = await addLeadNote(lead.id, noteText.trim(), "shared");
      if (result.success) {
        setNotes((prev) => [
          {
            id: crypto.randomUUID(),
            lead_id: lead.id,
            author_profile_id: null,
            author_staff_id: null,
            visibility: "shared",
            note: noteText.trim(),
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
        setNoteText("");
      }
    });
  }

  // --- Followups ---
  const [followups, setFollowups] = useState(initialFollowups);
  const [followupTitle, setFollowupTitle] = useState("");
  const [followupDue, setFollowupDue] = useState("");
  function handleAddFollowup() {
    if (followupTitle.trim().length < 1 || !followupDue) return;
    startTransition(async () => {
      const result = await createFollowup(
        lead.id,
        new Date(followupDue).toISOString(),
        followupTitle.trim()
      );
      if (result.success) {
        setFollowupTitle("");
        setFollowupDue("");
        router.refresh();
      }
    });
  }
  function handleCompleteFollowup(id: string) {
    startTransition(async () => {
      const result = await completeFollowup(id);
      if (result.success)
        setFollowups((prev) =>
          prev.map((f) => (f.id === id ? { ...f, status: "completed" } : f))
        );
    });
  }

  // --- Messages ---
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const loadedThread = useRef(false);

  useEffect(() => {
    if (loadedThread.current) return;
    loadedThread.current = true;
    (async () => {
      const threadResult = await createOrGetThreadForLead(lead.id);
      if (threadResult.success) {
        setThreadId(threadResult.data.threadId);
        const [msgResult, reportResult] = await Promise.all([
          listMessages(threadResult.data.threadId),
          getThreadReportStatus(threadResult.data.threadId),
          markThreadRead(threadResult.data.threadId),
        ]);
        if (msgResult.success) setMessages(msgResult.data.items);
        if (reportResult.success) setReportSubmitted(reportResult.data.reported);
      }
    })();
  }, [lead.id]);

  function handleSendMessage() {
    if (!threadId || messageText.trim().length < 1) return;
    startTransition(async () => {
      const result = await sendMessage(threadId, messageText.trim());
      if (result.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: result.data.messageId,
            thread_id: threadId,
            sender_profile_id: "me",
            body: messageText.trim(),
            status: "sent",
            created_at: new Date().toISOString(),
          },
        ]);
        setMessageText("");
      }
    });
  }

  // --- Site visits ---
  const [siteVisits, setSiteVisits] = useState(initialSiteVisits);
  const [rejectReasonDraft, setRejectReasonDraft] = useState<Record<string, string>>({});
  const [feedbackDraft, setFeedbackDraft] = useState<Record<string, { rating: number; comment: string }>>({});
  const [disputeDraft, setDisputeDraft] = useState<Record<string, string>>({});

  function handleRequestSiteVisit() {
    startTransition(async () => {
      const result = await requestSiteVisit(lead.id);
      if (!result.success) {
        setError(
          result.error === "DUPLICATE_REQUEST"
            ? "There is already an open site visit request for this lead."
            : result.error
        );
        return;
      }
      router.refresh();
    });
  }
  function handleRespondSiteVisit(id: string, action: "accept" | "reject") {
    if (action === "reject" && !rejectReasonDraft[id]?.trim()) {
      setError("A reason is required to reject a site visit.");
      return;
    }
    startTransition(async () => {
      const result = await respondSiteVisit(
        id,
        action,
        undefined,
        action === "reject" ? rejectReasonDraft[id] : undefined
      );
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }
  function handleCancelSiteVisit(id: string) {
    startTransition(async () => {
      const result = await cancelSiteVisit(id);
      if (result.success)
        setSiteVisits((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status: "cancelled" } : v))
        );
    });
  }
  function handleMarkOutcome(id: string, outcome: "completed" | "no_show") {
    startTransition(async () => {
      const result = await markSiteVisitOutcome(id, outcome);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }
  function handleSubmitFeedback(id: string) {
    const draft = feedbackDraft[id];
    if (!draft || draft.rating < 1) {
      setError("Select a rating before submitting feedback.");
      return;
    }
    startTransition(async () => {
      const result = await submitSiteVisitFeedback(id, draft.rating, draft.comment);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }
  function handleDisputeOutcome(id: string) {
    const reason = disputeDraft[id]?.trim();
    if (!reason || reason.length < 5) {
      setError("Describe the dispute (minimum 5 characters).");
      return;
    }
    startTransition(async () => {
      const result = await disputeSiteVisitOutcome(id, reason);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  // --- Close / Lost ---
  const [closeReason, setCloseReason] = useState<string>("");
  const [closeDetail, setCloseDetail] = useState("");
  const [showCloseForm, setShowCloseForm] = useState<"lost" | "closed" | null>(null);
  function handleCloseLead() {
    if (!showCloseForm || !closeReason) return;
    startTransition(async () => {
      const result = await closeLead(lead.id, showCloseForm, closeReason, closeDetail);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setShowCloseForm(null);
      router.refresh();
    });
  }

  // --- Duplicate leads ---
  const [duplicateFlags, setDuplicateFlags] = useState(initialDuplicateFlags);
  const [confirmMergeFlagId, setConfirmMergeFlagId] = useState<string | null>(null);
  function handleDismissDuplicate(flagId: string) {
    startTransition(async () => {
      const result = await dismissDuplicateLeadFlag(flagId);
      if (result.success)
        setDuplicateFlags((prev) => prev.filter((f) => f.id !== flagId));
    });
  }
  function handleMergeDuplicate(flagId: string) {
    startTransition(async () => {
      const result = await mergeDuplicateLeads(flagId);
      if (!result.success) {
        setError(result.error);
        setConfirmMergeFlagId(null);
        return;
      }
      setConfirmMergeFlagId(null);
      router.refresh();
    });
  }

  // --- Report thread ---
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportCategory, setReportCategory] = useState<string>("");
  const [reportDescription, setReportDescription] = useState("");
  function handleReportThread() {
    if (!threadId || !reportCategory) return;
    startTransition(async () => {
      const result = await reportThread(threadId, reportCategory, reportDescription);
      if (!result.success) {
        setError(
          result.error === "ALREADY_REPORTED"
            ? "You've already reported this conversation — it's with our moderation team."
            : result.error
        );
        return;
      }
      setReportSubmitted(true);
      setShowReportForm(false);
    });
  }

  const canRequestContact =
    lead.target_type !== "requirement" &&
    !isReceiver &&
    (!contactRequest || contactRequest.status === "rejected");
  const canRespondContact =
    isReceiver && contactRequest?.status === "pending_owner_response";

  const isClosed = ["converted", "lost", "closed", "spam", "blocked", "archived"].includes(
    lead.status
  );

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger">{error}</Alert>}

      {duplicateFlags.length > 0 && (
        <Card>
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
            Possible Duplicate Leads
          </p>
          <div className="flex flex-col gap-2">
            {duplicateFlags.map((f) => (
              <div key={f.id} className="bg-amber-50 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="text-zinc-800 truncate">{f.duplicateOfTargetTitle}</p>
                    <p className="text-[11px] text-zinc-500">{f.detectedReason}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/leads/${f.duplicateOfLeadId}`)}>
                      Compare
                    </Button>
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => setConfirmMergeFlagId(f.id)}>
                      Merge
                    </Button>
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => handleDismissDuplicate(f.id)}>
                      Dismiss
                    </Button>
                  </div>
                </div>
                {confirmMergeFlagId === f.id && (
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs bg-white rounded-lg px-3 py-2 border border-amber-200">
                    <span className="text-zinc-600">
                      This will move all notes, proposals, site visits and messages from
                      &quot;{f.duplicateOfTargetTitle}&quot; into this lead and archive it. This
                      action will be logged.
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="destructive" disabled={isPending} onClick={() => handleMergeDuplicate(f.id)}>
                        Confirm Merge
                      </Button>
                      <Button size="sm" variant="outline" disabled={isPending} onClick={() => setConfirmMergeFlagId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {lead.targetSummary?.title ?? "Listing unavailable"}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              With {lead.counterpartName} ·{" "}
              {lead.targetSummary?.cityText ?? "—"}
            </p>
          </div>
          <CrmStageBadge stage={lead.crm_stage} />
        </div>
        {lead.requester_message && (
          <p className="text-sm text-zinc-600 mt-3 bg-zinc-50 rounded-lg px-3 py-2">
            &quot;{lead.requester_message}&quot;
          </p>
        )}
        {lead.close_reason && (
          <p className="text-xs text-zinc-500 mt-3 bg-zinc-50 rounded-lg px-3 py-2">
            Closed as <span className="font-medium capitalize">{lead.status}</span> —{" "}
            {lead.close_reason.replace(/_/g, " ")}
            {lead.close_reason_detail && <>: {lead.close_reason_detail}</>}
          </p>
        )}
        {isReceiver && !isClosed && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                CRM Stage
              </label>
              <select
                value={lead.crm_stage}
                onChange={(e) => handleStageChange(e.target.value as CrmStage)}
                disabled={isPending}
                className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
              >
                {CRM_STAGES.filter((s) => !["lost", "closed"].includes(s)).map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => setShowCloseForm("lost")}>
                Mark Lost
              </Button>
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => setShowCloseForm("closed")}>
                Close Lead
              </Button>
            </div>
          </div>
        )}
        {showCloseForm && (
          <div className="mt-3 flex flex-col gap-2 bg-zinc-50 rounded-lg px-3 py-3">
            <p className="text-xs font-semibold text-zinc-600">
              Mark as {showCloseForm === "lost" ? "Lost" : "Closed"} — reason required
            </p>
            <select
              value={closeReason}
              onChange={(e) => setCloseReason(e.target.value)}
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
            >
              <option value="">Select a reason…</option>
              {CLOSE_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <textarea
              value={closeDetail}
              onChange={(e) => setCloseDetail(e.target.value)}
              placeholder="Additional detail (optional)"
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
              rows={2}
            />
            <div className="flex gap-2">
              <Button size="sm" disabled={isPending || !closeReason} onClick={handleCloseLead}>
                Confirm
              </Button>
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => setShowCloseForm(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Contact
        </p>
        {revealedMobile || revealedEmail ? (
          <div className="text-sm text-zinc-800">
            {revealedMobile && (
              <p>
                Mobile: <span className="font-medium">{revealedMobile}</span>
              </p>
            )}
            {revealedEmail && (
              <p>
                Email: <span className="font-medium">{revealedEmail}</span>
              </p>
            )}
          </div>
        ) : canRespondContact ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-zinc-600">
              This user requested your contact details.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={isPending}
                onClick={handleApproveContact}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={handleRejectContact}
              >
                Decline
              </Button>
            </div>
          </div>
        ) : canRequestContact ? (
          <Button size="sm" disabled={isPending} onClick={handleRequestContact}>
            Request Contact Number
          </Button>
        ) : contactRequest?.status === "pending_owner_response" ? (
          <p className="text-sm text-zinc-500">
            Waiting for the owner to approve your request.
          </p>
        ) : contactRequest?.status === "rejected" ? (
          <p className="text-sm text-zinc-500">Contact request was declined.</p>
        ) : (
          <p className="text-sm text-zinc-400">
            Contact is hidden until authorized.
          </p>
        )}
      </Card>

      {lead.target_type !== "requirement" && !isReceiver && (
        <Card>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Site Visit
          </p>
          {siteVisits.length === 0 ? (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={handleRequestSiteVisit}
            >
              Request Site Visit
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              {siteVisits.map((v) => (
                <div key={v.id} className="bg-zinc-50 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">
                      {v.status.replace(/_/g, " ")}
                    </span>
                    {["requested", "accepted", "scheduled"].includes(
                      v.status
                    ) && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleCancelSiteVisit(v.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                  {v.status === "rejected" && v.reject_reason && (
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Reason: {v.reject_reason}
                    </p>
                  )}
                  {["completed", "no_show"].includes(v.status) && (
                    <SiteVisitFeedbackAndDispute
                      visit={v}
                      draft={feedbackDraft[v.id] ?? { rating: 0, comment: "" }}
                      onDraftChange={(d) =>
                        setFeedbackDraft((prev) => ({ ...prev, [v.id]: d }))
                      }
                      disputeText={disputeDraft[v.id] ?? ""}
                      onDisputeTextChange={(t) =>
                        setDisputeDraft((prev) => ({ ...prev, [v.id]: t }))
                      }
                      onSubmitFeedback={() => handleSubmitFeedback(v.id)}
                      onSubmitDispute={() => handleDisputeOutcome(v.id)}
                      isPending={isPending}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-[11px] text-zinc-400 mt-2">
            For site visits, meet in safe/public conditions when possible,
            verify property details independently, and do not make payments
            outside trusted verified processes.
          </p>
        </Card>
      )}

      {isReceiver && siteVisits.some((v) => v.status === "requested") && (
        <Card>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Site Visit Requests
          </p>
          {siteVisits
            .filter((v) => v.status === "requested")
            .map((v) => (
              <div
                key={v.id}
                className="flex flex-col gap-2 text-sm bg-zinc-50 rounded-lg px-3 py-2 mb-2"
              >
                <div className="flex items-center justify-between">
                  <span>Requested</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleRespondSiteVisit(v.id, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleRespondSiteVisit(v.id, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
                <input
                  type="text"
                  value={rejectReasonDraft[v.id] ?? ""}
                  onChange={(e) =>
                    setRejectReasonDraft((prev) => ({ ...prev, [v.id]: e.target.value }))
                  }
                  placeholder="Reason if rejecting (required to reject)"
                  className="px-3 py-1.5 rounded-lg border border-zinc-300 text-xs"
                />
              </div>
            ))}
        </Card>
      )}

      {isReceiver &&
        siteVisits.some((v) =>
          ["accepted", "scheduled", "rescheduled", "completed", "no_show"].includes(v.status)
        ) && (
          <Card>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Upcoming / Completed Visits
            </p>
            {siteVisits
              .filter((v) =>
                ["accepted", "scheduled", "rescheduled", "completed", "no_show"].includes(v.status)
              )
              .map((v) => (
                <div key={v.id} className="bg-zinc-50 rounded-lg px-3 py-2 mb-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">{v.status.replace(/_/g, " ")}</span>
                    {["accepted", "scheduled", "rescheduled"].includes(v.status) && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isPending}
                          onClick={() => handleMarkOutcome(v.id, "completed")}
                        >
                          Mark Completed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isPending}
                          onClick={() => handleMarkOutcome(v.id, "no_show")}
                        >
                          No-show
                        </Button>
                      </div>
                    )}
                  </div>
                  {["completed", "no_show"].includes(v.status) && (
                    <SiteVisitFeedbackAndDispute
                      visit={v}
                      draft={feedbackDraft[v.id] ?? { rating: 0, comment: "" }}
                      onDraftChange={(d) =>
                        setFeedbackDraft((prev) => ({ ...prev, [v.id]: d }))
                      }
                      disputeText={disputeDraft[v.id] ?? ""}
                      onDisputeTextChange={(t) =>
                        setDisputeDraft((prev) => ({ ...prev, [v.id]: t }))
                      }
                      onSubmitFeedback={() => handleSubmitFeedback(v.id)}
                      onSubmitDispute={() => handleDisputeOutcome(v.id)}
                      isPending={isPending}
                    />
                  )}
                </div>
              ))}
          </Card>
        )}

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Messages
          </p>
          {threadId && !reportSubmitted && (
            <button
              type="button"
              className="text-[11px] text-zinc-400 hover:text-red-600"
              onClick={() => setShowReportForm((v) => !v)}
            >
              Report
            </button>
          )}
          {reportSubmitted && (
            <span className="text-[11px] text-zinc-400">Reported</span>
          )}
        </div>
        {showReportForm && (
          <div className="flex flex-col gap-2 bg-zinc-50 rounded-lg px-3 py-3 mb-3">
            <select
              value={reportCategory}
              onChange={(e) => setReportCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
            >
              <option value="">Select a reason…</option>
              {REPORT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Describe the issue (optional)"
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
              rows={2}
            />
            <div className="flex gap-2">
              <Button size="sm" variant="destructive" disabled={isPending || !reportCategory} onClick={handleReportThread}>
                Submit Report
              </Button>
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-3">
          {messages.length === 0 ? (
            <p className="text-sm text-zinc-400">No messages yet.</p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className="text-sm bg-zinc-50 rounded-lg px-3 py-2"
              >
                <p className="text-zinc-800">{m.body}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          />
          <Button
            size="sm"
            disabled={isPending || !threadId}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Follow-ups
        </p>
        <div className="flex flex-col gap-2 mb-3">
          {followups.length === 0 ? (
            <p className="text-sm text-zinc-400">No follow-ups scheduled.</p>
          ) : (
            followups.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="text-zinc-800">{f.title}</p>
                  <p className="text-[11px] text-zinc-400">
                    {new Date(f.due_at).toLocaleString()} · {f.status}
                  </p>
                </div>
                {f.status === "pending" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleCompleteFollowup(f.id)}
                  >
                    Complete
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={followupTitle}
            onChange={(e) => setFollowupTitle(e.target.value)}
            placeholder="Follow-up title"
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          />
          <input
            type="datetime-local"
            value={followupDue}
            onChange={(e) => setFollowupDue(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          />
          <Button size="sm" disabled={isPending} onClick={handleAddFollowup}>
            Add
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Notes
        </p>
        <div className="flex flex-col gap-2 mb-3">
          {notes.length === 0 ? (
            <p className="text-sm text-zinc-400">No notes yet.</p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="text-sm bg-zinc-50 rounded-lg px-3 py-2"
              >
                <p className="text-zinc-800">{n.note}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note…"
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          />
          <Button size="sm" disabled={isPending} onClick={handleAddNote}>
            Add
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Timeline
        </p>
        <div className="flex flex-col gap-2">
          {initialTimeline.length === 0 ? (
            <p className="text-sm text-zinc-400">No activity yet.</p>
          ) : (
            initialTimeline.map((e) => (
              <div
                key={e.id}
                className="text-xs text-zinc-500 flex justify-between"
              >
                <span className="capitalize">
                  {e.event_type.replace(/_/g, " ")}
                </span>
                <span>{new Date(e.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function SiteVisitFeedbackAndDispute({
  visit,
  draft,
  onDraftChange,
  disputeText,
  onDisputeTextChange,
  onSubmitFeedback,
  onSubmitDispute,
  isPending,
}: {
  visit: SiteVisit;
  draft: { rating: number; comment: string };
  onDraftChange: (d: { rating: number; comment: string }) => void;
  disputeText: string;
  onDisputeTextChange: (t: string) => void;
  onSubmitFeedback: () => void;
  onSubmitDispute: () => void;
  isPending: boolean;
}) {
  if (visit.feedback_submitted_at) {
    return (
      <div className="mt-2 text-[11px] text-zinc-500">
        Feedback: {visit.feedback_rating}/5
        {visit.feedback_comment && <> — {visit.feedback_comment}</>}
        {visit.dispute_reason ? (
          <p className="text-amber-600 mt-1">Disputed: {visit.dispute_reason}</p>
        ) : (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={disputeText}
              onChange={(e) => onDisputeTextChange(e.target.value)}
              placeholder="Dispute this outcome (reason)…"
              className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs"
            />
            <Button size="sm" variant="outline" disabled={isPending} onClick={onSubmitDispute}>
              Dispute
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onDraftChange({ ...draft, rating: n })}
            className={`w-6 h-6 rounded text-xs ${draft.rating >= n ? "bg-amber-400 text-white" : "bg-zinc-200 text-zinc-500"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={draft.comment}
        onChange={(e) => onDraftChange({ ...draft, comment: e.target.value })}
        placeholder="Feedback comment (optional)"
        className="px-3 py-1.5 rounded-lg border border-zinc-300 text-xs"
      />
      <div className="flex gap-2">
        <Button size="sm" disabled={isPending} onClick={onSubmitFeedback}>
          Submit Feedback
        </Button>
      </div>
      {visit.dispute_reason ? (
        <p className="text-[11px] text-amber-600">
          Disputed: {visit.dispute_reason}
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={disputeText}
            onChange={(e) => onDisputeTextChange(e.target.value)}
            placeholder="Dispute this outcome (reason)…"
            className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs"
          />
          <Button size="sm" variant="outline" disabled={isPending} onClick={onSubmitDispute}>
            Dispute
          </Button>
        </div>
      )}
    </div>
  );
}
