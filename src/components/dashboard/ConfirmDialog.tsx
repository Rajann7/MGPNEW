"use client";

import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOverlay } from "@/components/ui/useOverlay";

/**
 * Generic destructive-action confirmation, pixel-matched to the reference
 * design (Batch 6 · 2B): icon circle, title, description, right-aligned
 * Cancel/Confirm — no header bar, no close X.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  isPending = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  // Shared overlay behavior: Escape (blocked while pending), scroll lock,
  // focus trap, focus restoration.
  const contentRef = useOverlay({
    open,
    onClose: onCancel,
    closeOnEscape: !isPending,
  });

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/45"
        aria-hidden="true"
        onClick={onCancel}
      />
      <div
        ref={contentRef}
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 w-full bg-surface shadow-[0_12px_32px_rgba(0,0,0,0.2)] rounded-t-[20px] sm:w-full sm:max-w-[380px] sm:rounded-2xl p-6"
      >
        <div className="flex justify-center pb-2 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-ink/20" />
        </div>
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            danger ? "bg-red-50 dark:bg-red-500/10" : "bg-brand-soft"
          )}
        >
          <AlertTriangle
            className={cn(
              "h-[19px] w-[19px]",
              danger ? "text-red-600" : "text-brand"
            )}
            aria-hidden="true"
          />
        </span>
        <p className="text-[15px] font-semibold text-ink mt-3.5">{title}</p>
        <p className="text-[13px] leading-[1.6] text-ink-soft mt-1.5">
          {description}
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-transparent border border-zinc-300 dark:border-white/15 rounded-[10px] px-3.5 py-2.5 hover:bg-zinc-50 dark:hover:bg-white/10"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={cn(
              "rounded-[10px] px-4 py-2.5 text-[13px] font-medium text-white disabled:opacity-60",
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-brand hover:bg-brand-hover"
            )}
          >
            {isPending ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
