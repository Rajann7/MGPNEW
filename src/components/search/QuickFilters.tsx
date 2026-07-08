"use client";

import { cn } from "@/lib/cn";
import {
  BHK_OPTIONS,
  PROPERTY_TYPES,
  showsBhk,
  type Purpose,
} from "@/lib/search/config";

interface Props {
  purpose: Purpose;
  selectedBhk: string[];
  selectedTypes: string[];
  onBhkChange: (bhk: string[]) => void;
  onTypeChange: (types: string[]) => void;
  /** Restricts which chip row(s) render — used when BHK and Type are shown under separate headings (desktop sidebar). Defaults to showing both. */
  showBhk?: boolean;
  showTypes?: boolean;
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-border bg-surface text-ink-soft hover:border-brand-soft hover:text-brand"
      )}
    >
      {label}
    </button>
  );
}

/** Quick filter chips below the search input — BHK, property type. Ported from old project's search screen. */
export function QuickFilters({
  purpose,
  selectedBhk,
  selectedTypes,
  onBhkChange,
  onTypeChange,
  showBhk = true,
  showTypes = true,
}: Props) {
  const hasBhk = showBhk && showsBhk(purpose);
  const propertyTypes = showTypes ? (PROPERTY_TYPES[purpose] ?? []) : [];

  function toggleBhk(val: string) {
    onBhkChange(
      selectedBhk.includes(val)
        ? selectedBhk.filter((b) => b !== val)
        : [...selectedBhk, val]
    );
  }

  function toggleType(val: string) {
    onTypeChange(
      selectedTypes.includes(val)
        ? selectedTypes.filter((t) => t !== val)
        : [...selectedTypes, val]
    );
  }

  if (!hasBhk && propertyTypes.length === 0) return null;

  return (
    <div className="space-y-2">
      {hasBhk && (
        <div className="-mx-0.5 flex flex-wrap gap-1.5">
          {BHK_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              active={selectedBhk.includes(opt.value)}
              onClick={() => toggleBhk(opt.value)}
            />
          ))}
        </div>
      )}
      {propertyTypes.length > 0 && (
        <div className="-mx-0.5 flex flex-wrap gap-1.5">
          {/* Full real property-type set for this purpose (no truncation). */}
          {propertyTypes.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              active={selectedTypes.includes(opt.value)}
              onClick={() => toggleType(opt.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
