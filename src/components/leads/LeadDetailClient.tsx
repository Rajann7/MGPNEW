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
} from "@/lib/actions/messages";
import {
  requestSiteVisit,
  respondSiteVisit,
  cancelSiteVisit,
} from "@/lib/actions/site-visits";
import type { LeadRow } from "@/lib/actions/leads";
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
  const loadedThread = useRef(false);

  useEffect(() => {
    if (loadedThread.current) return;
    loadedThread.current = true;
    (async () => {
      const threadResult = await createOrGetThreadForLead(lead.id);
      if (threadResult.success) {
        setThreadId(threadResult.data.threadId);
        const msgResult = await listMessages(threadResult.data.threadId);
        if (msgResult.success) setMessages(msgResult.data.items);
        await markThreadRead(threadResult.data.threadId);
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
  function handleRequestSiteVisit() {
    startTransition(async () => {
      const result = await requestSiteVisit(lead.id);
      if (result.success) router.refresh();
    });
  }
  function handleRespondSiteVisit(id: string, action: "accept" | "reject") {
    startTransition(async () => {
      const result = await respondSiteVisit(id, action);
      if (result.success) router.refresh();
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

  const canRequestContact =
    lead.target_type !== "requirement" &&
    !isReceiver &&
    (!contactRequest || contactRequest.status === "rejected");
  const canRespondContact =
    isReceiver && contactRequest?.status === "pending_owner_response";

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger">{error}</Alert>}

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
        {isReceiver && (
          <div className="mt-4">
            <label className="text-xs font-medium text-zinc-500 block mb-1.5">
              CRM Stage
            </label>
            <select
              value={lead.crm_stage}
              onChange={(e) => handleStageChange(e.target.value as CrmStage)}
              disabled={isPending}
              className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
            >
              {CRM_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
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
                <div
                  key={v.id}
                  className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2"
                >
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
                className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2 mb-2"
              >
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
            ))}
        </Card>
      )}

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Messages
        </p>
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
