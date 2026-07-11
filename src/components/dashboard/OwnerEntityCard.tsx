import type { LucideIcon } from "lucide-react";
import type { EntityStatus } from "@/types";
import { EntityRowActions } from "./EntityRowActions";
import { cn } from "@/lib/cn";

const STATUS_PILL: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  published: {
    label: "Live",
    className:
      "text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-500/10 dark:border-green-500/20",
    dot: "bg-green-600",
  },
  submitted: {
    label: "Pending",
    className:
      "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:border-amber-500/20",
    dot: "bg-amber-600",
  },
  under_review: {
    label: "Pending",
    className:
      "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:border-amber-500/20",
    dot: "bg-amber-600",
  },
  need_changes: {
    label: "Needs Changes",
    className:
      "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-500/10 dark:border-orange-500/20",
    dot: "bg-orange-600",
  },
  rejected: {
    label: "Rejected",
    className:
      "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-500/10 dark:border-red-500/20",
    dot: "bg-red-600",
  },
  paused: {
    label: "Paused",
    className:
      "text-zinc-600 bg-zinc-100 border-zinc-200 dark:text-zinc-300 dark:bg-white/5 dark:border-white/10",
    dot: "bg-zinc-500",
  },
  expired: {
    label: "Expired",
    className:
      "text-zinc-500 bg-zinc-100 border-zinc-200 dark:text-zinc-400 dark:bg-white/5 dark:border-white/10",
    dot: "bg-zinc-400",
  },
  draft: {
    label: "Draft",
    className:
      "text-zinc-600 bg-zinc-100 border-zinc-200 dark:text-zinc-300 dark:bg-white/5 dark:border-white/10",
    dot: "bg-zinc-500",
  },
};

function StatusPill({ status }: { status: EntityStatus }) {
  const pill = STATUS_PILL[status] ?? STATUS_PILL.draft;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11px] font-medium border shrink-0",
        pill.className
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", pill.dot)}
        aria-hidden="true"
      />
      {pill.label}
    </span>
  );
}

/** Diagonal-stripe "no photo" placeholder — matches the reference design exactly (never a fake photo). */
function PropertyThumbnail({ dimmed }: { dimmed?: boolean }) {
  return (
    <span
      className={cn(
        "w-24 h-[72px] rounded-[10px] shrink-0 bg-[repeating-linear-gradient(45deg,var(--color-ink-muted,#f4f4f5)_0,var(--color-ink-muted,#f4f4f5)_8px,transparent_8px,transparent_16px)] bg-ink/5 dark:bg-white/5",
        dimmed && "opacity-60"
      )}
      aria-hidden="true"
    />
  );
}

/** Requirement type icon in a brand-soft circle — dims to zinc when closed/paused. */
function RequirementIcon({
  icon: Icon,
  dimmed,
}: {
  icon: LucideIcon;
  dimmed?: boolean;
}) {
  return (
    <span
      className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
        dimmed ? "bg-ink/5 dark:bg-white/5" : "bg-brand-soft"
      )}
    >
      <Icon
        className={cn("w-5 h-5", dimmed ? "text-ink-muted" : "text-brand")}
        strokeWidth={2}
        aria-hidden="true"
      />
    </span>
  );
}

/**
 * Shared property/requirement row (desktop) / card (mobile) — Batch 6 ·
 * Screens 2A/2C (My Properties) and 3A/3B (My Requirements). Pixel-matched
 * to the reference design: thumbnail/type-icon, dot-status pill, one
 * "·"-separated meta line (real fields only), pill-radius (10px) actions.
 */
export function OwnerEntityCard({
  kind,
  entityId,
  status,
  title,
  metaParts,
  requirementIcon,
  viewHref,
  editHref,
  proposalsHref,
  showPauseResume,
  isPaused,
  showDelete,
  showRelist,
  entityLabel,
  relatedCount,
  pauseLabel,
  resumeLabel,
  pauseDanger,
  resumeFilled,
}: {
  kind: "property" | "requirement";
  entityId: string;
  status: EntityStatus;
  title: string;
  /** Real fields only, joined with " · " — e.g. [price, location, "37 leads", "expires in 41 days"]. */
  metaParts: (string | null | undefined)[];
  /** Requirements only — icon by purpose (e.g. Search for buy, KeyRound for rent). */
  requirementIcon?: LucideIcon;
  viewHref?: string;
  editHref?: string;
  proposalsHref?: string;
  showPauseResume: boolean;
  isPaused: boolean;
  showDelete: boolean;
  /** Properties only — "Relist" for expired listings. */
  showRelist?: boolean;
  entityLabel: string;
  relatedCount?: number;
  pauseLabel?: string;
  resumeLabel?: string;
  /** Style the "pause"-side action as danger red (requirements' "Close"). */
  pauseDanger?: boolean;
  /** Style the "resume"-side action as solid filled (properties' "Resume"). Requirements' "Reopen" stays outline. */
  resumeFilled?: boolean;
}) {
  const meta = metaParts.filter(Boolean).join(" · ");

  return (
    <div
      className={cn(
        "rounded-2xl border border-border p-3.5 flex items-center gap-3.5",
        isPaused ? "bg-ink/[0.02] dark:bg-white/[0.02]" : "bg-surface"
      )}
    >
      {kind === "property" && <PropertyThumbnail dimmed={isPaused} />}
      {kind === "requirement" && requirementIcon && (
        <RequirementIcon icon={requirementIcon} dimmed={isPaused} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3
            className={cn(
              "text-sm font-medium truncate",
              isPaused ? "text-ink-muted" : "text-ink"
            )}
          >
            {title}
          </h3>
          <StatusPill status={status} />
        </div>
        {meta && <p className="text-xs text-ink-muted mt-1">{meta}</p>}
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
        showRelist={showRelist}
        entityLabel={entityLabel}
        pauseLabel={pauseLabel}
        resumeLabel={resumeLabel}
        pauseDanger={pauseDanger}
        resumeFilled={resumeFilled}
      />
    </div>
  );
}
