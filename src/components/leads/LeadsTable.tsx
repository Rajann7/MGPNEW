import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { LeadAvatar } from "./LeadAvatar";
import { LeadStageBadge, bucketForCrmStage } from "./LeadStageBadge";
import type { LeadRow } from "@/lib/actions/leads";

function relativeDate(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7)
    return d.toLocaleDateString("en-IN", { weekday: "short" });
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/**
 * Real leads table (desktop grid) → mobile card list — pixel-matched to
 * the reference design (Batch 6 · 4A/4B), the "worked table → card pair"
 * reference transform. Every row links to the real lead detail page.
 */
export function LeadsTable({
  items,
  basePath,
}: {
  items: LeadRow[];
  basePath: string;
}) {
  return (
    <>
      {/* Desktop grid table */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[2fr_1.8fr_1fr_1fr_40px] gap-3 px-5 py-3 bg-ink/[0.02] dark:bg-white/[0.02] border-b border-border text-[11px] font-semibold tracking-wide text-ink-muted">
          <span>NAME</span>
          <span>PROPERTY</span>
          <span>STATUS</span>
          <span className="text-right">DATE</span>
          <span />
        </div>
        {items.map((lead) => {
          const bucket = bucketForCrmStage(lead.crm_stage);
          return (
            <Link
              key={lead.id}
              href={`${basePath}/${lead.id}`}
              className="grid grid-cols-[2fr_1.8fr_1fr_1fr_40px] gap-3 px-5 py-3.5 border-b border-border last:border-0 items-center hover:bg-ink/[0.02] dark:hover:bg-white/[0.03] transition-colors"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <LeadAvatar name={lead.counterpartName} isNew={bucket === "new"} />
                <span className="text-[13px] font-medium text-ink truncate">
                  {lead.counterpartName}
                </span>
              </span>
              <span className="text-[13px] text-ink-soft truncate">
                {lead.targetSummary?.title ?? "Listing unavailable"}
              </span>
              <span>
                <LeadStageBadge bucket={bucket} />
              </span>
              <span className="text-xs text-ink-muted text-right">
                {relativeDate(lead.created_at)}
              </span>
              <ChevronRight
                className="w-[15px] h-[15px] text-zinc-400 justify-self-end"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden flex flex-col gap-2.5">
        {items.map((lead) => {
          const bucket = bucketForCrmStage(lead.crm_stage);
          return (
            <Link
              key={lead.id}
              href={`${basePath}/${lead.id}`}
              className="bg-surface border border-border rounded-2xl p-3.5 flex items-center gap-3"
            >
              <LeadAvatar name={lead.counterpartName} isNew={bucket === "new"} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">
                  {lead.counterpartName}
                </p>
                <p className="text-xs text-ink-muted truncate">
                  {lead.targetSummary?.title ?? "Listing unavailable"} ·{" "}
                  {relativeDate(lead.created_at)}
                </p>
              </div>
              <LeadStageBadge bucket={bucket} />
              <ChevronRight
                className="w-[15px] h-[15px] text-zinc-400 shrink-0"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}

/** Empty state — pixel-matched copy and icon-circle from the reference design. */
export function LeadsEmptyState() {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 py-8 px-4">
      <span className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center">
        <MessageCircle className="w-[18px] h-[18px] text-brand" aria-hidden="true" />
      </span>
      <p className="text-[13px] font-semibold text-ink mt-1">No leads yet</p>
      <p className="text-xs text-ink-muted">
        Buyers can&apos;t enquire until they find you.
      </p>
    </div>
  );
}
