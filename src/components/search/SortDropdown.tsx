"use client";

import { SORT_OPTIONS, type SortValue } from "@/lib/search/config";

interface Props {
  value: SortValue;
  onChange: (v: SortValue) => void;
}

/** Ported from old project's search screen (values adapted to the real backend sort set). */
export function SortDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortValue)}
      aria-label="Sort results"
      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
