import Link from "next/link";
import { cn } from "@/lib/cn";

export interface StatusTab {
  key: string;
  label: string;
  count: number;
}

/**
 * Plain server-rendered filter tabs (Batch 6 · 2A/2C "All/Live/Pending/
 * Rejected/Paused/Expired"). Each tab is a real link (?status=key) — no
 * client JS needed. Desktop uses underline tabs; mobile uses rounded pill
 * chips (matches the two reference layouts exactly).
 */
export function StatusTabs({
  tabs,
  activeKey,
  baseHref,
}: {
  tabs: StatusTab[];
  activeKey: string;
  baseHref: string;
}) {
  return (
    <>
      {/* Desktop: underline tabs */}
      <div
        role="tablist"
        className="hidden sm:flex items-center gap-1 overflow-x-auto mb-4 border-b border-border"
      >
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Link
              key={tab.key}
              href={
                tab.key === "all" ? baseHref : `${baseHref}?status=${tab.key}`
              }
              role="tab"
              aria-selected={active}
              className={cn(
                "shrink-0 px-3.5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                active
                  ? "border-brand text-brand"
                  : "border-transparent text-ink-muted hover:text-ink-soft"
              )}
            >
              {tab.label} ({tab.count})
            </Link>
          );
        })}
      </div>

      {/* Mobile: pill chips */}
      <div
        role="tablist"
        className="sm:hidden flex items-center gap-2 overflow-x-auto mb-4 -mx-4 px-4 pb-1"
      >
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Link
              key={tab.key}
              href={
                tab.key === "all" ? baseHref : `${baseHref}?status=${tab.key}`
              }
              role="tab"
              aria-selected={active}
              className={cn(
                "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors",
                active
                  ? "bg-brand-soft border-brand/30 text-brand"
                  : "border-border text-ink-muted"
              )}
            >
              {tab.label} ({tab.count})
            </Link>
          );
        })}
      </div>
    </>
  );
}
