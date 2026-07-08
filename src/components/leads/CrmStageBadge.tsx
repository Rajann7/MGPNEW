import type { CrmStage } from "@/types";

const STAGE_CONFIG: Record<CrmStage, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  },
  contacted: {
    label: "Contacted",
    className: "bg-cyan-500/10 border-cyan-500/20 text-cyan-600",
  },
  interested: {
    label: "Interested",
    className: "bg-violet-500/10 border-violet-500/20 text-violet-600",
  },
  follow_up: {
    label: "Follow-up",
    className: "bg-amber-500/10 border-amber-500/20 text-amber-600",
  },
  site_visit: {
    label: "Site Visit",
    className: "bg-orange-500/10 border-orange-500/20 text-orange-600",
  },
  proposal: {
    label: "Proposal",
    className: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600",
  },
  negotiation: {
    label: "Negotiation",
    className: "bg-pink-500/10 border-pink-500/20 text-pink-600",
  },
  converted: {
    label: "Converted",
    className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
  },
  lost: {
    label: "Lost",
    className: "bg-red-500/10 border-red-500/20 text-red-500",
  },
  closed: {
    label: "Closed",
    className: "bg-zinc-500/10 border-zinc-500/20 text-zinc-500",
  },
};

export function CrmStageBadge({ stage }: { stage: CrmStage }) {
  const config = STAGE_CONFIG[stage] ?? {
    label: stage,
    className: "bg-zinc-500/10 border-zinc-500/20 text-zinc-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
