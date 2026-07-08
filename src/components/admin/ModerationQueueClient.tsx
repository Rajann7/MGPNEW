"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { EntityStatusBadge } from "@/components/ui/EntityStatusBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  approveEntity,
  rejectEntity,
  requestEntityChanges,
  type ModerationEntityType,
  type ModerationRow,
} from "@/lib/actions/admin/moderation";

export function ModerationQueueClient({
  entityType,
  initialItems,
  canApprove,
  canReject,
}: {
  entityType: ModerationEntityType;
  initialItems: ModerationRow[];
  canApprove: boolean;
  canReject: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [reasonModal, setReasonModal] = useState<{
    id: string;
    mode: "reject" | "changes";
  } | null>(null);
  const [reasonText, setReasonText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApprove(id: string) {
    setError(null);
    startTransition(async () => {
      const result = await approveEntity(entityType, id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    });
  }

  function handleReasonSubmit() {
    if (!reasonModal) return;
    if (reasonText.trim().length < 5) {
      setError("Reason must be at least 5 characters.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const action =
        reasonModal.mode === "reject" ? rejectEntity : requestEntityChanges;
      const result = await action(
        entityType,
        reasonModal.id,
        reasonText.trim()
      );
      if (!result.success) {
        setError(result.error);
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== reasonModal.id));
      setReasonModal(null);
      setReasonText("");
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Queue is empty"
        description="No items are pending review right now."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {error && <Alert tone="danger">{error}</Alert>}

      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {item.title}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {item.submitted_by_name ?? "Unknown submitter"} ·{" "}
                {item.city_text ?? "No city"} ·{" "}
                {item.submitted_at
                  ? new Date(item.submitted_at).toLocaleDateString()
                  : "Not submitted"}
              </p>
              <div className="mt-1.5">
                <EntityStatusBadge status={item.status} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {canApprove && (
                <Button
                  size="sm"
                  variant="primary"
                  disabled={isPending}
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </Button>
              )}
              {canReject && (
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={isPending}
                  onClick={() => {
                    setReasonModal({ id: item.id, mode: "changes" });
                    setReasonText("");
                  }}
                >
                  Request Changes
                </Button>
              )}
              {canReject && (
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isPending}
                  onClick={() => {
                    setReasonModal({ id: item.id, mode: "reject" });
                    setReasonText("");
                  }}
                >
                  Reject
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}

      {reasonModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 pb-4 sm:pb-0"
          onClick={() => setReasonModal(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-zinc-900 mb-1">
              {reasonModal.mode === "reject"
                ? "Reject listing"
                : "Request changes"}
            </h3>
            <p className="text-xs text-zinc-500 mb-3">
              A reason is required and will be recorded in the audit log.
            </p>
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              rows={4}
              placeholder="Explain why…"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReasonModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant={
                  reasonModal.mode === "reject" ? "destructive" : "primary"
                }
                size="sm"
                loading={isPending}
                onClick={handleReasonSubmit}
              >
                {reasonModal.mode === "reject" ? "Reject" : "Send"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
