"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { updateProposalStatus } from "@/lib/actions/proposals";
import { sendMessage } from "@/lib/actions/messages";
import type { ProposalDetail } from "@/lib/actions/proposals";
import type { Message } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-500",
  sent: "bg-blue-50 text-blue-700",
  viewed: "bg-cyan-50 text-cyan-700",
  shortlisted: "bg-violet-50 text-violet-700",
  negotiation: "bg-pink-50 text-pink-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
  withdrawn: "bg-zinc-100 text-zinc-500",
  expired: "bg-zinc-100 text-zinc-500",
  archived: "bg-zinc-100 text-zinc-400",
};

export function ProposalDetailClient({
  proposal,
  threadId,
  initialMessages,
}: {
  proposal: ProposalDetail;
  threadId: string | null;
  initialMessages: Message[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState("");

  function transition(status: string) {
    startTransition(async () => {
      const result = await updateProposalStatus(proposal.id, status);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

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

  const isRecipient = proposal.isRecipient;

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger">{error}</Alert>}

      <Card>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-zinc-900">{proposal.title}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isRecipient ? "From" : "To"} {proposal.counterpartName}
              {proposal.requirementTitle && (
                <> · Requirement: {proposal.requirementTitle}</>
              )}
              {proposal.requirementCityText && <> · {proposal.requirementCityText}</>}
            </p>
          </div>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_CLASS[proposal.status] ?? ""}`}
          >
            {proposal.status}
          </span>
        </div>

        {proposal.message && (
          <p className="text-sm text-zinc-600 mt-3 bg-zinc-50 rounded-lg px-3 py-2">
            &quot;{proposal.message}&quot;
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {proposal.price_offer !== null && (
            <div>
              <p className="text-[11px] text-zinc-400">Price Offer</p>
              <p className="text-sm font-medium text-zinc-900">
                ₹{proposal.price_offer.toLocaleString("en-IN")}
              </p>
            </div>
          )}
          {proposal.terms_summary && (
            <div>
              <p className="text-[11px] text-zinc-400">Terms</p>
              <p className="text-sm text-zinc-800">{proposal.terms_summary}</p>
            </div>
          )}
          {proposal.availability_note && (
            <div>
              <p className="text-[11px] text-zinc-400">Availability</p>
              <p className="text-sm text-zinc-800">{proposal.availability_note}</p>
            </div>
          )}
          {proposal.valid_until && (
            <div>
              <p className="text-[11px] text-zinc-400">Valid Until</p>
              <p className="text-sm text-zinc-800">
                {new Date(proposal.valid_until).toLocaleDateString()}
              </p>
            </div>
          )}
          <div>
            <p className="text-[11px] text-zinc-400">Sent</p>
            <p className="text-sm text-zinc-800">
              {new Date(proposal.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-400">Last Updated</p>
            <p className="text-sm text-zinc-800">
              {new Date(proposal.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {isRecipient &&
            ["sent", "viewed", "shortlisted"].includes(proposal.status) && (
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => transition("shortlisted")}>
                Shortlist
              </Button>
            )}
          {isRecipient && proposal.status === "shortlisted" && (
            <Button size="sm" variant="outline" disabled={isPending} onClick={() => transition("negotiation")}>
              Move to Negotiation
            </Button>
          )}
          {isRecipient && proposal.status === "negotiation" && (
            <>
              <Button size="sm" disabled={isPending} onClick={() => transition("accepted")}>
                Accept
              </Button>
              <Button size="sm" variant="destructive" disabled={isPending} onClick={() => transition("rejected")}>
                Reject
              </Button>
            </>
          )}
          {!isRecipient &&
            ["sent", "viewed", "shortlisted"].includes(proposal.status) && (
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => transition("withdrawn")}>
                Withdraw Proposal
              </Button>
            )}
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Messages
        </p>
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-3">
          {messages.length === 0 ? (
            <p className="text-sm text-zinc-400">No messages yet.</p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="text-sm bg-zinc-50 rounded-lg px-3 py-2">
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
            disabled={!threadId}
          />
          <Button size="sm" disabled={isPending || !threadId} onClick={handleSendMessage}>
            Send
          </Button>
        </div>
        {!threadId && (
          <p className="text-[11px] text-zinc-400 mt-2">
            Messaging is available once this proposal is linked to a lead.
          </p>
        )}
      </Card>
    </div>
  );
}
