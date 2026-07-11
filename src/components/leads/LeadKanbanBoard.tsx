"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStage } from "@/lib/actions/leads";
import type { LeadRow } from "@/lib/actions/leads";
import type { CrmStage } from "@/types";

/**
 * T07-11 · Broker CRM Kanban (design Batch 7, desktop-only).
 * Real pipeline board over the full CrmStage enum (data authority). Native
 * HTML5 drag/drop → optimistic move → `updateLeadStage` (receiver-only server
 * action; persists crm_stage + logs stage_changed) → revert on failure.
 * Mobile falls back to the list (rendered by the page, not this component).
 */
const COLUMNS: { stage: CrmStage; label: string; tone: string }[] = [
  { stage: "new", label: "New", tone: "bg-blue-500" },
  { stage: "contacted", label: "Contacted", tone: "bg-indigo-500" },
  { stage: "interested", label: "Interested", tone: "bg-violet-500" },
  { stage: "follow_up", label: "Follow-up", tone: "bg-amber-500" },
  { stage: "site_visit", label: "Site Visit", tone: "bg-cyan-500" },
  { stage: "proposal", label: "Proposal", tone: "bg-teal-500" },
  { stage: "negotiation", label: "Negotiation", tone: "bg-orange-500" },
  { stage: "converted", label: "Converted", tone: "bg-brand" },
  { stage: "lost", label: "Lost", tone: "bg-rose-500" },
  { stage: "closed", label: "Closed", tone: "bg-zinc-400" },
];

export function LeadKanbanBoard({
  items,
  basePath,
}: {
  items: LeadRow[];
  basePath: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  // optimistic stage overrides keyed by leadId
  const [stageById, setStageById] = useState<Record<string, CrmStage>>(() =>
    Object.fromEntries(items.map((l) => [l.id, l.crm_stage]))
  );
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [dragOverStage, setDragOverStage] = useState<CrmStage | null>(null);
  const dragged = useRef<{ id: string; from: CrmStage } | null>(null);

  const columns = useMemo(() => {
    const map: Record<string, LeadRow[]> = {};
    for (const c of COLUMNS) map[c.stage] = [];
    for (const l of items) {
      const s = stageById[l.id] ?? l.crm_stage;
      (map[s] ??= []).push(l);
    }
    return map;
  }, [items, stageById]);

  function move(id: string, from: CrmStage, to: CrmStage) {
    if (from === to) return;
    setError(null);
    setStageById((prev) => ({ ...prev, [id]: to })); // optimistic
    setPendingIds((prev) => new Set(prev).add(id));
    startTransition(async () => {
      const res = await updateLeadStage(id, to);
      setPendingIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      if (!res.success) {
        // revert
        setStageById((prev) => ({ ...prev, [id]: from }));
        setError(
          res.error === "FORBIDDEN"
            ? "Only the lead owner can change its stage."
            : "Could not update the lead stage. Please try again."
        );
      } else {
        router.refresh(); // reconcile with server truth
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      <div className="flex gap-3 overflow-x-auto pb-2">
        {COLUMNS.map((col) => {
          const cards = columns[col.stage] ?? [];
          const isOver = dragOverStage === col.stage;
          return (
            <section
              key={col.stage}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverStage(col.stage);
              }}
              onDragLeave={() =>
                setDragOverStage((s) => (s === col.stage ? null : s))
              }
              onDrop={(e) => {
                e.preventDefault();
                setDragOverStage(null);
                const d = dragged.current;
                if (d) move(d.id, d.from, col.stage);
                dragged.current = null;
              }}
              className={[
                "flex w-[280px] flex-shrink-0 flex-col rounded-2xl border bg-zinc-50/60 p-2.5 transition-colors",
                isOver ? "border-brand bg-brand-soft/40" : "border-zinc-200",
              ].join(" ")}
              aria-label={`${col.label} column`}
            >
              <div className="mb-2 flex items-center gap-2 px-1">
                <span
                  className={`h-2 w-2 rounded-full ${col.tone}`}
                  aria-hidden
                />
                <span className="text-[13px] font-semibold text-zinc-800">
                  {col.label}
                </span>
                <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-500 ring-1 ring-zinc-200">
                  {cards.length}
                </span>
              </div>

              <div className="flex min-h-[80px] flex-col gap-2">
                {cards.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-zinc-300 px-3 py-6 text-center text-[11px] text-zinc-400">
                    Drop leads here
                  </div>
                ) : (
                  cards.map((lead) => (
                    <article
                      key={lead.id}
                      draggable
                      onDragStart={() => {
                        dragged.current = {
                          id: lead.id,
                          from: stageById[lead.id] ?? lead.crm_stage,
                        };
                      }}
                      onDragEnd={() => setDragOverStage(null)}
                      onClick={() => router.push(`${basePath}/${lead.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          router.push(`${basePath}/${lead.id}`);
                      }}
                      className={[
                        "cursor-grab rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing",
                        pendingIds.has(lead.id) ? "opacity-60" : "",
                      ].join(" ")}
                    >
                      <p className="truncate text-[13px] font-semibold text-zinc-900">
                        {lead.targetSummary?.title ?? "Listing unavailable"}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                        {lead.counterpartName} ·{" "}
                        {lead.targetSummary?.cityText ?? "—"}
                      </p>
                      <p className="mt-1 text-[10.5px] text-zinc-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
