"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClipboardList } from "lucide-react";
import { sendProposal } from "@/lib/actions/proposals";
import type { MatchingRequirement } from "@/lib/actions/proposals";

export function RequirementProposeClient({
  items,
  emptyMessage,
}: {
  items: MatchingRequirement[];
  emptyMessage: string;
}) {
  const router = useRouter();
  const [proposingId, setProposingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function openProposeForm(id: string) {
    setProposingId(id);
    setTitle("");
    setMessage("");
    setError(null);
  }

  function handleSend() {
    if (!proposingId || title.trim().length < 3) {
      setError("Enter a title (min 3 characters).");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await sendProposal(
        proposingId,
        title.trim(),
        message.trim() || undefined
      );
      if (!result.success) {
        setError(result.fieldErrors?.requirement?.[0] ?? result.error);
        return;
      }
      setSentIds((prev) => [...prev, proposingId]);
      setProposingId(null);
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No requirements found"
        description={emptyMessage}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((r) => (
        <Card key={r.id}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {r.title}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {r.cityText ?? "—"} · {r.category}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                {r.matchedBecause}
              </p>
            </div>
            {sentIds.includes(r.id) ? (
              <span className="text-xs font-medium text-emerald-600">
                Proposal sent
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => openProposeForm(r.id)}
              >
                Send Proposal
              </Button>
            )}
          </div>
        </Card>
      ))}

      {proposingId && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 pb-4 sm:pb-0"
          onClick={() => setProposingId(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Send Proposal
            </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Proposal title"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm mb-2"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Message (optional)"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm"
            />
            {error && (
              <Alert tone="danger" className="mt-2">
                {error}
              </Alert>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProposingId(null)}
              >
                Cancel
              </Button>
              <Button size="sm" loading={isPending} onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
