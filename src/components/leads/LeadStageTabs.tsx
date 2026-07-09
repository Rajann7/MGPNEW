import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LeadStageTab {
  key: string;
  label: string;
  count: number;
}

/**
 * Pixel-matched to the reference design (Batch 6 · 4A/4B): a segmented
 * pill control on desktop (bg zinc-100, active = white + shadow), and a
 * row of outline pill chips on mobile (active = brand-soft).
 */
export function LeadStageTabs({
  tabs,
  activeKey,
  baseHref,
  variant,
}: {
  tabs: LeadStageTab[];
  activeKey: string;
  baseHref: string;
  variant: "segmented" | "chips";
}) {
  if (variant === "segmented") {
    return (
      <div className="hidden sm:inline-flex bg-zinc-100 dark:bg-white/5 rounded-full p-1 gap-0.5">
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Link
              key={tab.key}
              href={tab.key === "all" ? baseHref : `${baseHref}?stage=${tab.key}`}
              className={cn(
                "text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors",
                active
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {tab.label} ({tab.count})
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="sm:hidden flex items-center gap-2 overflow-x-auto -mx-4 px-4">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Link
            key={tab.key}
            href={tab.key === "all" ? baseHref : `${baseHref}?stage=${tab.key}`}
            className={cn(
              "shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-colors",
              active
                ? "bg-brand-soft border-brand/30 text-brand"
                : "border-border text-ink-soft"
            )}
          >
            {tab.label} ({tab.count})
          </Link>
        );
      })}
    </div>
  );
}
