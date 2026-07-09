"use client";

import { useState } from "react";
import type { PublicProjectCard } from "@/lib/actions/public-search";
import { ProjectResultCard } from "@/components/search/ProjectResultCard";
import { EmptyState } from "@/components/ui/EmptyState";

/** Builder microsite project tabs (design Batch 4 · Screen 5): Active / Completed / About.
 * Active vs Completed is split on real `construction_status`. */
export function BuilderProjectTabs({
  active,
  completed,
  about,
}: {
  active: PublicProjectCard[];
  completed: PublicProjectCard[];
  about: string | null;
}) {
  const tabs = [
    {
      key: "active",
      shortLabel: `Active (${active.length})`,
      label: `Active projects (${active.length})`,
    },
    {
      key: "completed",
      shortLabel: `Completed (${completed.length})`,
      label: `Completed (${completed.length})`,
    },
    { key: "about", shortLabel: "About", label: "About" },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("active");

  const grid = (items: PublicProjectCard[], emptyTitle: string) =>
    items.length === 0 ? (
      <EmptyState title={emptyTitle} description="Nothing to show here yet." />
    ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectResultCard key={p.id} project={p} showCompare={false} />
        ))}
      </div>
    );

  return (
    <div id="profile-listings" className="mt-8 scroll-mt-20">
      <div
        role="tablist"
        aria-label="Builder projects"
        className="flex justify-center gap-0.5 border-b border-zinc-100 sm:gap-1"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap px-2 py-2 text-xs font-medium transition-colors sm:px-3.5 sm:text-sm ${
              tab === t.key
                ? "border-b-2 border-brand text-brand"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <span className="sm:hidden">{t.shortLabel}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "active" && grid(active, "No active projects yet")}
        {tab === "completed" && grid(completed, "No completed projects yet")}
        {tab === "about" && (
          <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-600">
            {about?.trim() ||
              "This builder hasn't added a company description yet."}
          </p>
        )}
      </div>
    </div>
  );
}
