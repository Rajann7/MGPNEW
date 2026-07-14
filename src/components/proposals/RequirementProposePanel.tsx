"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send, Check } from "lucide-react";
import { sendProposal } from "@/lib/actions/proposals";
import { InlineErrorBanner } from "@/components/ui/ErrorState";

/**
 * Single-requirement proposal entry for the Requirement Detail page (B4-S03).
 * Only rendered for eligible verified brokers/builders (server-decided).
 * Duplicate / self / eligibility protection is enforced again in sendProposal.
 */
export function RequirementProposePanel({
  requirementId,
}: {
  requirementId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function submit() {
    if (title.trim().length < 3) {
      setError("Enter a proposal title (min 3 characters).");
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await sendProposal(
        requirementId,
        title.trim(),
        message.trim() || undefined,
        priceOffer ? Number(priceOffer) : undefined
      );
      if (!res.success) {
        setError(
          res.error === "ROLE_NOT_ALLOWED"
            ? "Only verified brokers and builders can send proposals."
            : (res.fieldErrors?.requirement?.[0] ??
                "Could not send the proposal. Please try again.")
        );
        return;
      }
      setSent(true);
      router.refresh();
    });
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex items-center gap-2.5 rounded-xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm text-brand"
      >
        <Check className="h-4 w-4 shrink-0" aria-hidden />
        Proposal sent. You&rsquo;ll be notified when the poster responds.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden />
        Send Proposal
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="mb-3 text-sm font-semibold text-ink">Send a proposal</h3>
      {error && <InlineErrorBanner message={error} className="mb-3" />}
      <div className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="Proposal title (e.g. 3 BHK in Bodakdev, ready to move)"
          className="w-full rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand/50 dark:bg-transparent"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="Describe the matching property, key details and why it fits…"
          className="w-full resize-y rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand/50 dark:bg-transparent"
        />
        <input
          value={priceOffer}
          onChange={(e) => setPriceOffer(e.target.value.replace(/[^0-9]/g, ""))}
          inputMode="numeric"
          placeholder="Indicative price (₹, optional)"
          className="w-full rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand/50 dark:bg-transparent"
        />
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="rounded-[10px] px-4 py-2 text-sm font-medium text-ink-soft hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden />
            {isPending ? "Sending…" : "Send Proposal"}
          </button>
        </div>
      </div>
    </div>
  );
}
