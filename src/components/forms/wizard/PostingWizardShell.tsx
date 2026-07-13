"use client";

import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { WizardSaveStatus } from "./WizardFooter";

/**
 * Canonical Batch 5 posting-wizard shell — 1:1 port of the design's
 * "Desktop shell (dashboard sidebar + wizard)" and "Mobile shell" frames
 * (MGP DESIGN · Batch 5). One shared shell for Property (9), Project (10)
 * and Requirement (7); only the active form panel content changes.
 *
 * Desktop (sm+): breadcrumb bar → stepped header (24px circles, brand
 * check = done, ringed number = current, grey = upcoming, 24×2 connectors,
 * "+N" overflow) → scrollable panel → footer (Back ghost · Save Draft
 * outline · Continue brand).
 * Mobile: 56px contextual header (back · centered title · Save Draft) →
 * "Step X of N" + 4px linear progress → content → sticky bottom bar
 * (Back flex-1 · Continue flex-2) with safe-area padding.
 */
export function PostingWizardShell({
  title,
  breadcrumbLabel,
  dashboardHref,
  steps,
  step,
  lastInputStep,
  isPending,
  saveStatus,
  canSaveDraft,
  submitLabel,
  errorSummary,
  serverError,
  onBack,
  onSaveDraft,
  onContinue,
  onSubmit,
  children,
}: {
  /** Mobile header title, e.g. "Post Property". */
  title: string;
  /** Breadcrumb trail leaf, e.g. "Post Property". */
  breadcrumbLabel: string;
  dashboardHref: string;
  steps: string[];
  step: number;
  lastInputStep: number;
  isPending: boolean;
  saveStatus: WizardSaveStatus;
  canSaveDraft: boolean;
  submitLabel: string;
  /** Field labels needing attention → design's red validation banner. */
  errorSummary: string[];
  serverError: string | null;
  onBack: () => void;
  onSaveDraft: () => void;
  onContinue: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  const total = steps.length;
  const percent = Math.round((step / total) * 100);

  // Desktop stepper window (design shows 6 nodes + "+3" overflow)
  const MAX_NODES = 6;
  const windowStart =
    step <= MAX_NODES ? 0 : Math.min(step - MAX_NODES, total - MAX_NODES);
  const visible = steps.slice(windowStart, windowStart + MAX_NODES);
  const remaining = total - (windowStart + MAX_NODES);

  const statusText =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
        ? "Saved"
        : saveStatus === "error"
          ? "Couldn't save"
          : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-zinc-50 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-zinc-200 sm:bg-white sm:shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      {/* ── Mobile contextual header (design mobile shell) ── */}
      <div className="flex h-14 flex-shrink-0 items-center border-b border-zinc-100 bg-white px-2 sm:hidden">
        {step > 1 ? (
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] hover:bg-zinc-100"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-900" />
          </button>
        ) : (
          <Link
            href={dashboardHref}
            aria-label="Back"
            className="flex h-11 w-11 items-center justify-center rounded-[10px] hover:bg-zinc-100"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-900" />
          </Link>
        )}
        <span className="flex-1 truncate text-center text-[15px] font-medium text-zinc-900">
          {title}
        </span>
        {canSaveDraft ? (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isPending}
            className="rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-brand disabled:opacity-50"
          >
            {saveStatus === "saving" ? "Saving…" : "Save Draft"}
          </button>
        ) : (
          <span className="w-11" aria-hidden="true" />
        )}
      </div>

      {/* ── Mobile Step X of N + linear progress ── */}
      <div className="flex-shrink-0 border-b border-zinc-100 bg-white px-4 py-3 sm:hidden">
        <div className="mb-1.5 flex justify-between text-xs font-medium text-zinc-700">
          <span>
            Step {step} of {total}
          </span>
          <span className="font-normal text-zinc-500">{steps[step - 1]}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* ── Desktop breadcrumb bar ── */}
      <div className="hidden flex-shrink-0 items-center gap-2 border-b border-zinc-100 bg-white px-5 py-3 text-xs text-zinc-500 sm:flex">
        <Link
          href={dashboardHref}
          className="font-medium text-brand hover:text-brand-hover"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="font-medium text-zinc-900">{breadcrumbLabel}</span>
      </div>

      {/* ── Desktop stepped header ── */}
      <div
        className="hidden flex-shrink-0 items-center overflow-x-auto border-b border-zinc-100 bg-white px-6 py-4 sm:flex"
        aria-label={`Step ${step} of ${total}: ${steps[step - 1]}`}
      >
        {visible.map((label, i) => {
          const n = windowStart + i + 1;
          const isDone = n < step;
          const isActive = n === step;
          return (
            <div key={label} className="flex flex-shrink-0 items-center">
              {i > 0 && (
                <span
                  className={cn(
                    "mx-2 h-0.5 w-6 flex-shrink-0",
                    isDone || isActive ? "bg-brand" : "bg-zinc-200"
                  )}
                  aria-hidden="true"
                />
              )}
              <div
                className="flex flex-shrink-0 items-center gap-1.5"
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-medium",
                      isActive
                        ? "border-[1.5px] border-brand text-brand shadow-[0_0_0_3px_#E7F2EF]"
                        : "border-[1.5px] border-zinc-200 text-zinc-400"
                    )}
                  >
                    {n}
                  </span>
                )}
                <span
                  className={cn(
                    "text-[11px]",
                    isActive
                      ? "font-semibold text-zinc-900"
                      : isDone
                        ? "font-medium text-brand"
                        : "font-medium text-zinc-400"
                  )}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
        {remaining > 0 && (
          <>
            <span className="mx-2 h-0.5 w-6 flex-shrink-0 bg-zinc-200" />
            <span className="flex-shrink-0 text-[11px] text-zinc-400">
              +{remaining}
            </span>
          </>
        )}
      </div>

      {/* ── Content panel ── */}
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4 sm:p-6">
        {errorSummary.length > 0 && (
          <div className="flex gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3">
            <AlertTriangle
              className="mt-px h-4 w-4 flex-shrink-0 text-red-600"
              aria-hidden="true"
            />
            <span className="text-xs leading-relaxed text-red-900">
              <strong className="font-semibold">
                {errorSummary.length} field{errorSummary.length > 1 ? "s" : ""}{" "}
                need attention
              </strong>{" "}
              — {errorSummary.join(", ")}.
            </span>
          </div>
        )}
        {serverError && (
          <div className="flex gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3">
            <AlertTriangle
              className="mt-px h-4 w-4 flex-shrink-0 text-red-600"
              aria-hidden="true"
            />
            <span className="text-xs leading-relaxed text-red-900">
              {serverError}
            </span>
          </div>
        )}
        {children}
      </div>

      {/* ── Desktop footer: Back ghost · Save Draft outline · Continue ── */}
      <div className="hidden flex-shrink-0 items-center gap-2 border-t border-zinc-100 bg-white px-6 py-3 sm:flex">
        {step > 1 ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>
        ) : (
          <Link
            href={dashboardHref}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        )}
        <div className="ml-auto flex items-center gap-2">
          {statusText && (
            <span
              className={cn(
                "text-xs",
                saveStatus === "error"
                  ? "font-medium text-red-600"
                  : "text-zinc-400"
              )}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </span>
          )}
          {canSaveDraft && step < lastInputStep && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isPending}
              className="rounded-[10px] border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-medium text-zinc-700 hover:border-zinc-400 disabled:opacity-50"
            >
              Save Draft
            </button>
          )}
          {step < lastInputStep ? (
            <button
              type="button"
              onClick={onContinue}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-brand px-4 py-2.5 text-xs font-medium text-white hover:bg-brand-hover disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Continue"}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-brand px-4 py-2.5 text-xs font-medium text-white hover:bg-brand-hover disabled:opacity-60"
            >
              {isPending ? "Submitting…" : submitLabel}
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile sticky bottom bar: Back flex-1 · Continue flex-2 ── */}
      <div
        className="sticky bottom-0 z-10 flex flex-shrink-0 gap-2 border-t border-zinc-200 bg-white px-4 pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] sm:hidden"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        {step > 1 ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="flex-1 rounded-[10px] py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
          >
            Back
          </button>
        ) : (
          <Link
            href={dashboardHref}
            className="flex flex-1 items-center justify-center rounded-[10px] py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Back
          </Link>
        )}
        {step < lastInputStep ? (
          <button
            type="button"
            onClick={onContinue}
            disabled={isPending}
            className="flex-[2] rounded-[10px] bg-brand py-3 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Continue"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="flex-[2] rounded-[10px] bg-brand py-3 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {isPending ? "Submitting…" : submitLabel}
          </button>
        )}
      </div>
    </div>
  );
}
