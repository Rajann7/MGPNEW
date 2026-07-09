"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Generic destructive-action confirmation — desktop modal / mobile bottom
 * sheet pair (design system rule: every destructive action gets one).
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
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/45"
        aria-hidden="true"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full bg-surface shadow-[0_12px_32px_rgba(0,0,0,0.2)] rounded-t-[20px] sm:w-full sm:max-w-[400px] sm:rounded-2xl"
      >
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-ink/20" />
        </div>
        <div className="flex items-start justify-between px-5 pt-5">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              danger
                ? "bg-red-500/10 text-red-600"
                : "bg-brand-soft text-brand"
            )}
          >
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-ink/5 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 pb-4.5 pt-3 flex flex-col gap-3">
          <span className="text-[15px] font-semibold text-ink">{title}</span>
          <p className="text-[13px] leading-[1.55] text-ink-soft">
            {description}
          </p>
          <p className="text-[11px] text-ink-muted">This action will be logged.</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10"
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
      </div>
    </div>,
    document.body
  );
}
