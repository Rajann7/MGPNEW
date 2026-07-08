"use client";

import { cn } from "@/lib/cn";
import type { Purpose } from "@/lib/search/config";
import { SEARCH_TABS } from "@/lib/search/config";

interface Props {
  selected: Purpose;
  onChange: (p: Purpose) => void;
}

/** Horizontally-scrollable search tabs — ported from the old project's search screen design. */
export function SearchTabs({ selected, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Property search type"
      className="-mx-1 flex gap-1 overflow-x-auto pb-1 scrollbar-none"
    >
      {SEARCH_TABS.map((tab) => {
        const active = tab.purpose === selected;
        return (
          <button
            key={tab.purpose}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.purpose)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand text-white shadow-soft"
                : "bg-surface-muted text-ink-soft hover:bg-brand-soft hover:text-brand"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
