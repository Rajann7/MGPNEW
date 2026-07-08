import type { EntityStatus } from "@/types";

const STATUS_CONFIG: Record<
  EntityStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className:
      "bg-zinc-500/10 border-zinc-500/20 text-zinc-600 dark:text-zinc-300",
  },
  submitted: {
    label: "Submitted",
    className:
      "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-300",
  },
  under_review: {
    label: "Under Review",
    className:
      "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-300",
  },
  need_changes: {
    label: "Needs Changes",
    className:
      "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-300",
  },
  approved: {
    label: "Approved",
    className:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300",
  },
  published: {
    label: "Published",
    className:
      "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-300",
  },
  paused: {
    label: "Paused",
    className:
      "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-300",
  },
  expired: {
    label: "Expired",
    className:
      "bg-zinc-500/10 border-zinc-500/20 text-zinc-500 dark:text-zinc-400",
  },
  deleted: {
    label: "Deleted",
    className: "bg-red-500/10 border-red-500/20 text-red-400 dark:text-red-400",
  },
  archived: {
    label: "Archived",
    className:
      "bg-zinc-500/10 border-zinc-500/20 text-zinc-400 dark:text-zinc-400",
  },
};

export function EntityStatusBadge({ status }: { status: EntityStatus }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-zinc-500/10 border-zinc-500/20 text-zinc-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
