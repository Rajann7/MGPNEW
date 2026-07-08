"use client";

import { cn } from "@/lib/cn";

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface Props {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  className?: string;
}

/** Selected filter chips row — shown on search results page. Ported from old project's search screen. */
export function FilterChips({
  filters,
  onRemove,
  onClearAll,
  className,
}: Props) {
  if (filters.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {filters.map((f) => (
        <span
          key={f.key}
          className="flex items-center gap-1 rounded-full border border-brand/30 bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"
        >
          {f.label}: {f.value}
          <button
            type="button"
            aria-label={`Remove ${f.label} filter`}
            onClick={() => onRemove(f.key)}
            className="ml-0.5 rounded-full hover:text-brand-hover"
          >
            ×
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-ink-muted underline hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}
