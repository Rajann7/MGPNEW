"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Shared error states — pixel-matched to Batch 1 "Error, forbidden & setup
 * states". A failed query must render one of these, never a fake zero or a
 * normal empty state.
 */

/** Inline banner: red tint, safe one-line message, optional Retry. */
export function InlineErrorBanner({
  message,
  onRetry,
  retryLabel = "Retry",
  className,
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 dark:border-red-900/50 dark:bg-red-950/40",
        className
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" aria-hidden />
      <span className="flex-1 text-[13px] text-red-900 dark:text-red-200">{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-[10px] border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:bg-transparent dark:hover:bg-red-900/30"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

/** Card error state: centered icon circle, safe copy, reload/retry action. */
export function ErrorStateCard({
  title = "Something went wrong",
  description = "We couldn't load this right now. No technical details are shown here.",
  actionLabel = "Reload page",
  onAction,
  className,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border border-zinc-100 bg-white p-6 text-center dark:border-white/10 dark:bg-transparent",
        className
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
        <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden />
      </span>
      <div className="text-sm font-semibold text-ink">{title}</div>
      <div className="text-xs text-ink-muted">{description}</div>
      <button
        type="button"
        onClick={onAction ?? (() => window.location.reload())}
        className="mt-1.5 rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/20 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/5"
      >
        {actionLabel}
      </button>
    </div>
  );
}
