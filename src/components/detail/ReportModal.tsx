"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useOverlay } from "@/components/ui/useOverlay";
import Link from "next/link";
import { Flag, X, Check, ChevronDown } from "lucide-react";
import { submitReport } from "@/lib/actions/reports";
import { REPORT_CATEGORIES } from "@/lib/reports/config";

interface Props {
  targetType: "property" | "project" | "requirement" | "user";
  targetId: string;
  isLoggedIn: boolean;
  currentPath: string;
  /** Noun shown in the trigger/labels, e.g. "listing" (default) or "profile". */
  entityNoun?: string;
  /** Controlled mode: when provided, hides the internal trigger button and
   * uses this open state instead (e.g. opened from the overflow menu). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in to report this listing.",
  ALREADY_REPORTED:
    "You've already reported this listing — it's with our moderation team.",
  RATE_LIMITED:
    "You've reached the daily report limit. Please try again tomorrow.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

/**
 * Batch 4 · screen 8 — Report content modal (desktop) / bottom sheet (mobile).
 * Auth-required (honest: guests see a login prompt, no fake success). Wired to the
 * real `submitReport` action → `user_reports` moderation queue.
 */
export function ReportModal({
  targetType,
  targetId,
  isLoggedIn,
  currentPath,
  entityNoun = "listing",
  open: controlledOpen,
  onOpenChange,
}: Props) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    if (!isControlled) setInternalOpen(v);
  };
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Shared overlay behavior: Escape, scroll lock, focus trap, restoration.
  const contentRef = useOverlay({
    open,
    onClose: close,
    closeOnEscape: !isPending,
  });

  function close() {
    setOpen(false);
    setError(null);
    setDone(false);
    setCategory("");
    setDescription("");
  }

  function submit() {
    if (!category) {
      setError("Please choose a reason.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const r = await submitReport({
        targetType,
        targetId,
        category,
        description,
      });
      if (!r.success) {
        setError(ERR[r.error] ?? r.error);
        return;
      }
      setDone(true);
    });
  }

  return (
    <>
      {!isControlled && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-700"
        >
          <Flag className="h-3.5 w-3.5" />
          Report this {entityNoun}
        </button>
      )}

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center">
            <div
              className="absolute inset-0 bg-[rgba(24,24,27,0.45)]"
              aria-hidden="true"
              onClick={close}
            />
            <div
              ref={contentRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Report this ${entityNoun}`}
              tabIndex={-1}
              className="relative z-10 w-full bg-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] rounded-t-[20px] sm:w-full sm:max-w-[400px] sm:rounded-[16px]"
            >
              {/* mobile grab handle */}
              <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
                <span className="h-1 w-9 rounded-full bg-[#d4d4d8]" />
              </div>
              <div className="flex items-center justify-between border-b border-[#f4f4f5] px-5 py-4">
                <span className="text-[15px] font-semibold text-[#18181b]">
                  Report this {entityNoun}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717a] hover:bg-[#f4f4f5]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {done ? (
                <div className="flex flex-col items-center gap-2.5 px-5 py-8 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F2EF]">
                    <Check className="h-6 w-6" color="#0F6B5C" />
                  </span>
                  <div className="text-[15px] font-semibold text-[#18181b]">
                    Report submitted
                  </div>
                  <p className="text-[13px] leading-[1.55] text-[#52525b]">
                    Thanks — our moderation team will review this listing.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 rounded-[10px] border border-[#d4d4d8] px-4 py-2.5 text-[13px] font-medium text-[#3f3f46] hover:border-[#a1a1aa]"
                  >
                    Done
                  </button>
                </div>
              ) : !isLoggedIn ? (
                <div className="flex flex-col gap-3 px-5 py-6 text-center">
                  <p className="text-[13px] leading-[1.55] text-[#52525b]">
                    Please log in to report this {entityNoun}. This helps us
                    keep reports accountable.
                  </p>
                  <Link
                    href={`/login?redirectTo=${encodeURIComponent(currentPath)}`}
                    className="rounded-[10px] bg-[#0F6B5C] py-3 text-sm font-medium text-white hover:bg-[#0C5648]"
                  >
                    Log in to report
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 px-5 py-4.5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="report-reason"
                      className="text-[13px] font-medium text-[#3f3f46]"
                    >
                      Reason *
                    </label>
                    <div className="relative">
                      <select
                        id="report-reason"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setError(null);
                        }}
                        className="w-full appearance-none rounded-[10px] border border-[#d4d4d8] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#18181b] outline-none focus:border-[#0F6B5C]"
                      >
                        <option value="">Choose a reason…</option>
                        {REPORT_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-3 h-[15px] w-[15px] text-[#71717a]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="report-details"
                      className="text-[13px] font-medium text-[#3f3f46]"
                    >
                      Details
                    </label>
                    <textarea
                      id="report-details"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={1000}
                      placeholder="What did you notice?"
                      className="w-full resize-y rounded-[10px] border border-[#d4d4d8] px-3 py-2.5 text-[13px] leading-[1.55] text-[#18181b] outline-none focus:border-[#0F6B5C]"
                    />
                  </div>

                  <div className="rounded-[10px] border border-[#f4f4f5] bg-[#fafafa] px-3 py-2 text-[11px] leading-[1.5] text-[#71717a]">
                    Reports go to the moderation queue. Duplicate and excessive
                    reports are rate-limited.
                  </div>

                  {error && (
                    <p className="text-xs text-[#DC2626]" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-[#3f3f46] hover:bg-[#f4f4f5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={isPending}
                      className="rounded-[10px] bg-[#0F6B5C] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#0C5648] disabled:opacity-60"
                    >
                      {isPending ? "Submitting…" : "Submit report"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
