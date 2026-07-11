"use client";

import { useRouter } from "next/navigation";
import type { Project } from "@/types";

const TOTAL_STEPS = 10;

/** "Continue where you left off" re-entry card for the Project Wizard
 * (design Batch 5 · 5B / §40-41), mirroring the Property DraftResumeCard.
 * "N of 10 steps done" is the real, persisted `current_step`. */
export function ProjectDraftResumeCard({
  draft,
  continueHref,
  startNewHref,
}: {
  draft: Partial<Project>;
  continueHref?: string;
  startNewHref?: string;
}) {
  const router = useRouter();
  const stepsDone = Math.min(TOTAL_STEPS, Math.max(1, draft.current_step ?? 1));
  const lastEdited = draft.updated_at
    ? new Date(draft.updated_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  function handleContinue() {
    if (continueHref) router.push(continueHref);
    else router.push(`?draft=${draft.id}`);
  }
  function handleStartNew() {
    if (startNewHref) router.push(startNewHref);
    else router.push("?fresh=1");
  }

  return (
    <div className="mb-6 rounded-2xl border border-brand/20 bg-brand-soft/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">
            Draft saved — continue where you left off
          </p>
          <p className="mt-0.5 truncate text-sm text-zinc-600">
            {draft.project_name || "Untitled draft"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {stepsDone} of {TOTAL_STEPS} steps done
            {lastEdited ? ` · saved ${lastEdited}` : ""}
          </p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${(stepsDone / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleStartNew}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Start New
        </button>
      </div>
    </div>
  );
}
