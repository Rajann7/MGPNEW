import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StatCardItem {
  label: string;
  value: string;
  note?: string;
  icon?: LucideIcon;
  /** Fills the card brand-teal (used for the one "hero" stat, e.g. New Leads This Week). */
  highlight?: boolean;
  /** 0-100 usage percentage — renders a progress bar under the note (e.g. Plan Usage). */
  progressPercent?: number;
}

export function StatCardGradientGrid({ stats }: { stats: StatCardItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <StatCardGradient key={stat.label} {...stat} />
      ))}
    </div>
  );
}

export function StatCardGradientSkeletonGrid({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      role="status"
      aria-label="Loading dashboard statistics"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl p-4 sm:p-5 flex flex-col gap-2 bg-surface-subtle border border-border animate-pulse"
        >
          <div className="h-3.5 w-20 rounded bg-ink/10 dark:bg-white/10" />
          <div className="h-7 w-14 rounded bg-ink/10 dark:bg-white/10" />
          <div className="h-3 w-24 rounded bg-ink/10 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function StatCardGradient({
  label,
  value,
  note,
  icon: Icon,
  highlight,
  progressPercent,
}: StatCardItem) {
  return (
    <div
      className={cn(
        "rounded-3xl p-4 sm:p-5 flex flex-col gap-2",
        highlight
          ? "bg-gradient-to-b from-white/10 to-white/0 bg-brand text-white"
          : "bg-surface-subtle text-ink border border-border"
      )}
    >
      <p
        className={cn(
          "text-sm flex items-center gap-1.5",
          highlight ? "text-white/90" : "text-ink-soft"
        )}
      >
        {Icon && (
          <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
        )}
        {label}
      </p>
      <p className="text-2xl sm:text-3xl font-semibold">{value}</p>
      {note && (
        <p
          className={cn(
            "text-xs",
            highlight ? "text-white/70" : "text-ink-muted"
          )}
        >
          {note}
        </p>
      )}
      {typeof progressPercent === "number" && (
        <div className="h-1.5 rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden mt-1">
          <div
            className="h-full rounded-full bg-amber-500"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}
    </div>
  );
}
