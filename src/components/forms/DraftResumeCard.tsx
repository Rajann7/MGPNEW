"use client";

import { useRouter } from "next/navigation";
import type { Property } from "@/types";

/** "Continue where you left off" re-entry card (design Batch 5 · 5A). The
 * "steps done" count is a real, derived measure from which fields are
 * actually filled — never a fabricated/stored fake progress number. */
export function DraftResumeCard({ draft }: { draft: Partial<Property> }) {
  const router = useRouter();

  const checks = [
    Boolean(draft.title && draft.title.length >= 5),
    Boolean(draft.property_type),
    Boolean(draft.price || draft.rent_amount),
    Boolean(draft.city_text),
    Boolean(
      draft.furnishing_status || draft.possession_status || draft.amenities?.length
    ),
    Boolean(draft.contact_visibility),
  ];
  const stepsDone = checks.filter(Boolean).length;
  const lastEdited = draft.updated_at
    ? new Date(draft.updated_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="mb-6 rounded-2xl border border-brand/20 bg-brand-soft/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">
            Draft saved — continue where you left off
          </p>
          <p className="mt-0.5 truncate text-sm text-zinc-600">
            {draft.title || "Untitled draft"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {stepsDone} of 6 sections filled
            {lastEdited ? ` · saved ${lastEdited}` : ""}
          </p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${(stepsDone / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => router.push(`?draft=${draft.id}`)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => router.push("?fresh=1")}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Start New
        </button>
      </div>
    </div>
  );
}
