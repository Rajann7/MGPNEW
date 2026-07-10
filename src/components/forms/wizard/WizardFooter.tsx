"use client";

import { Button } from "@/components/ui/Button";

export type WizardSaveStatus = "idle" | "saving" | "saved" | "error";

/**
 * Canonical Batch 5 posting-wizard sticky footer, shared by the Property,
 * Project and Requirement wizards (§27-30): Back (ghost) · Save Draft
 * (secondary, with honest save status) · Continue / final Submit (primary).
 * Sticky bottom bar on mobile with safe-area padding; static on desktop.
 */
export function WizardFooter({
  step,
  lastInputStep,
  isPending,
  saveStatus,
  canSaveDraft,
  submitLabel,
  onBack,
  onSaveDraft,
  onContinue,
  onSubmit,
  backHref,
}: {
  step: number;
  lastInputStep: number;
  isPending: boolean;
  saveStatus: WizardSaveStatus;
  canSaveDraft: boolean;
  submitLabel: string;
  onBack: () => void;
  onSaveDraft: () => void;
  onContinue: () => void;
  onSubmit: () => void;
  /** Step 1 Back exits to the role dashboard listing context (§31). */
  backHref: string;
}) {
  const statusText =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
        ? "Saved"
        : saveStatus === "error"
          ? "Couldn't save"
          : null;

  return (
    <div
      className="sticky bottom-0 z-10 -mx-6 mt-8 flex items-center justify-between gap-2 border-t border-zinc-100 bg-white/95 px-6 pt-4 backdrop-blur sm:static sm:-mx-8 sm:bg-white sm:px-8 sm:pb-0 sm:backdrop-blur-none"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {step > 1 ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isPending}
        >
          ← Back
        </Button>
      ) : (
        <Button type="button" variant="ghost" href={backHref}>
          ← Back
        </Button>
      )}

      <div className="flex items-center gap-3">
        {statusText && (
          <span
            className={
              saveStatus === "error"
                ? "text-xs font-medium text-red-600"
                : "text-xs text-zinc-400"
            }
            role="status"
            aria-live="polite"
          >
            {statusText}
          </span>
        )}
        {canSaveDraft && step < lastInputStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isPending}
          >
            Save Draft
          </Button>
        )}
        {step < lastInputStep && (
          <Button type="button" onClick={onContinue} loading={isPending}>
            {isPending ? "Saving…" : "Continue →"}
          </Button>
        )}
        {step === lastInputStep && (
          <Button type="button" onClick={onSubmit} loading={isPending}>
            {isPending ? "Submitting…" : submitLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
