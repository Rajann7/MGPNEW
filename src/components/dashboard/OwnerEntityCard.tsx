import { ImageOff } from "lucide-react";
import type { EntityStatus } from "@/types";
import { EntityRowActions } from "./EntityRowActions";
import { cn } from "@/lib/cn";

const STATUS_PILL: Record<string, { label: string; className: string; dot: string }> = {
  published: {
    label: "Live",
    className: "bg-green-500/10 text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  submitted: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  under_review: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  need_changes: {
    label: "Needs Changes",
    className: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-700 dark:text-red-300",
    dot: "bg-red-500",
  },
  paused: {
    label: "Paused",
    className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
  expired: {
    label: "Expired",
    className: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400",
    dot: "bg-zinc-400",
  },
  draft: {
    label: "Draft",
    className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
};

function StatusPill({ status }: { status: EntityStatus }) {
  const pill = STATUS_PILL[status] ?? STATUS_PILL.draft;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0",
        pill.className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", pill.dot)} aria-hidden="true" />
      {pill.label}
    </span>
  );
}

/**
 * Shared property/requirement row (desktop) / card (mobile) — Batch 6 ·
 * Screens 2A/2C (My Properties) and 3A/3B (My Requirements). Thumbnail,
 * title + dot-status pill, one "·"-separated meta line (real fields only),
 * then wired actions.
 */
export function OwnerEntityCard({
  kind,
  entityId,
  status,
  title,
  metaParts,
  viewHref,
  editHref,
  proposalsHref,
  showPauseResume,
  isPaused,
  showDelete,
  entityLabel,
  relatedCount,
  pauseLabel,
  resumeLabel,
}: {
  kind: "property" | "requirement";
  entityId: string;
  status: EntityStatus;
  title: string;
  /** Real fields only, joined with " · " — e.g. [price, location, "37 leads", "expires in 41 days"]. */
  metaParts: (string | null | undefined)[];
  viewHref?: string;
  editHref?: string;
  proposalsHref?: string;
  showPauseResume: boolean;
  isPaused: boolean;
  showDelete: boolean;
  entityLabel: string;
  relatedCount?: number;
  pauseLabel?: string;
  resumeLabel?: string;
}) {
  const meta = metaParts.filter(Boolean).join(" · ");

  return (
    <div className="bg-surface rounded-2xl border border-border p-4 hover:border-border-strong transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {kind === "property" && (
            <div className="w-14 h-14 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center shrink-0">
              <ImageOff
                className="w-5 h-5 text-ink-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-ink truncate">
                {title}
              </h3>
              <StatusPill status={status} />
            </div>
            {meta && <p className="text-xs text-ink-soft mt-1">{meta}</p>}
          </div>
        </div>
        <EntityRowActions
          kind={kind}
          entityId={entityId}
          entityTitle={title}
          relatedCount={relatedCount}
          viewHref={viewHref}
          editHref={editHref}
          proposalsHref={proposalsHref}
          showPauseResume={showPauseResume}
          isPaused={isPaused}
          showDelete={showDelete}
          entityLabel={entityLabel}
          pauseLabel={pauseLabel}
          resumeLabel={resumeLabel}
        />
      </div>
    </div>
  );
}
