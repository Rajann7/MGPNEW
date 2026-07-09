import { cn } from "@/lib/cn";

export type LeadStageBucket = "new" | "contacted" | "visited" | "closed";

const STAGE_CONFIG: Record<LeadStageBucket, { label: string; className: string; dot: string }> = {
  new: {
    label: "New",
    className: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:border-amber-500/20",
    dot: "bg-amber-600",
  },
  contacted: {
    label: "Contacted",
    className: "text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-500/10 dark:border-green-500/20",
    dot: "bg-green-600",
  },
  visited: {
    label: "Visited",
    className: "text-blue-800 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-500/10 dark:border-blue-500/20",
    dot: "bg-blue-600",
  },
  closed: {
    label: "Closed",
    className: "text-zinc-600 bg-zinc-100 border-zinc-200 dark:text-zinc-300 dark:bg-white/5 dark:border-white/10",
    dot: "bg-zinc-400",
  },
};

/** Real per-lead CRM-stage pixel-matched to the reference design (Batch 6 · 4A/4B). */
export function LeadStageBadge({ bucket }: { bucket: LeadStageBucket }) {
  const cfg = STAGE_CONFIG[bucket];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11px] font-medium border shrink-0",
        cfg.className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

/** Maps the real crm_stage field to one of the 4 buckets the design shows. */
export function bucketForCrmStage(stage: string): LeadStageBucket {
  if (stage === "new") return "new";
  if (stage === "site_visit") return "visited";
  if (["converted", "lost", "closed"].includes(stage)) return "closed";
  return "contacted";
}
