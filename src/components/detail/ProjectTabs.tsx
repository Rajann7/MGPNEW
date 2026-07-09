"use client";

import { useState } from "react";

export interface ProjectTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Real tab switching (design Batch 4 tabs row) — every tab renders real
 * content, never a dead/no-op tab. */
export function ProjectTabs({ tabs }: { tabs: ProjectTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div className="mt-4">
      <div
        role="tablist"
        aria-label="Project details"
        className="flex gap-1 overflow-x-auto border-b border-zinc-100 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === activeTab?.id}
            onClick={() => setActive(t.id)}
            className={`flex-shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              t.id === activeTab?.id
                ? "border-brand text-brand"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-5">{activeTab?.content}</div>
    </div>
  );
}
