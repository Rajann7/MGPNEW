"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import {
  BHK_OPTIONS,
  PROPERTY_TYPES,
  BUDGET_PRESETS,
  FURNISHING_FILTER_OPTIONS,
  showsBhk,
  showsFurnishing,
  type Purpose,
} from "@/lib/search/config";
import type { CityOption } from "@/components/location/CityProvider";

export interface MobileFilterState {
  city?: string;
  bhk: string[];
  types: string[];
  minPrice?: number;
  maxPrice?: number;
  furnishing?: string;
  minArea?: number;
  maxArea?: number;
}

interface Props {
  open: boolean;
  purpose: Purpose;
  filters: MobileFilterState;
  cities: CityOption[];
  onClose: () => void;
  onApply: (f: MobileFilterState) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-sm font-semibold text-ink">{children}</h3>;
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
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-border bg-surface text-ink-soft"
      )}
    >
      {label}
    </button>
  );
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

const EMPTY: MobileFilterState = {
  bhk: [],
  types: [],
  city: "",
  furnishing: undefined,
  minArea: undefined,
  maxArea: undefined,
};

/**
 * Mobile filter bottom sheet — ported from the old project's search screen.
 * Selections are staged locally and committed only on "Apply Filters".
 * Sticky Apply button, outside-tap close, body scroll lock.
 */
export function MobileFilterSheet({
  open,
  purpose,
  filters,
  cities,
  onClose,
  onApply,
}: Props) {
  const [local, setLocal] = useState<MobileFilterState>(filters);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocal(filters);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
    // Re-seed only on open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (patch: Partial<MobileFilterState>) =>
    setLocal((prev) => ({ ...prev, ...patch }));

  const propertyTypes = PROPERTY_TYPES[purpose] ?? [];
  const budgetPresets = BUDGET_PRESETS[purpose] ?? [];
  const hasBhk = showsBhk(purpose);
  const hasFurnishing = showsFurnishing(purpose);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[250]",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={cn(
          "absolute bottom-0 left-0 right-0 flex max-h-[90vh] flex-col rounded-t-3xl bg-surface shadow-[0_-4px_32px_rgba(0,0,0,0.12)] transition-transform duration-300",
          "lg:bottom-auto lg:left-1/2 lg:right-auto lg:top-1/2 lg:max-h-[85vh] lg:w-[480px] lg:-translate-x-1/2 lg:rounded-2xl lg:shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
          open
            ? "translate-y-0 lg:-translate-y-1/2 lg:opacity-100"
            : "translate-y-full lg:-translate-y-1/2 lg:opacity-0"
        )}
      >
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-1 w-10 rounded-full bg-border-strong" />
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 pb-3 pt-1">
          <h2 className="text-base font-semibold text-ink">Filters</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocal({ ...EMPTY })}
              className="text-sm text-ink-muted underline"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-ink hover:bg-surface-muted"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-6">
          <div>
            <SectionTitle>City</SectionTitle>
            <select
              value={local.city ?? ""}
              onChange={(e) => set({ city: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="">All cities in Gujarat</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {hasBhk && (
            <div>
              <SectionTitle>BHK</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {BHK_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    active={local.bhk.includes(opt.value)}
                    onClick={() => set({ bhk: toggle(local.bhk, opt.value) })}
                  />
                ))}
              </div>
            </div>
          )}

          {hasFurnishing && (
            <div>
              <SectionTitle>Furnishing</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {FURNISHING_FILTER_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    active={local.furnishing === opt.value}
                    onClick={() =>
                      set({
                        furnishing:
                          local.furnishing === opt.value
                            ? undefined
                            : opt.value,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {propertyTypes.length > 0 && (
            <div>
              <SectionTitle>Property Type</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    active={local.types.includes(opt.value)}
                    onClick={() =>
                      set({ types: toggle(local.types, opt.value) })
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {budgetPresets.length > 0 && (
            <div>
              <SectionTitle>
                {purpose === "rent" || purpose === "pg"
                  ? "Monthly Rent"
                  : "Budget"}
              </SectionTitle>
              <div className="flex flex-wrap gap-2">
                {budgetPresets.map((p) => {
                  const active =
                    local.minPrice === p.min && local.maxPrice === p.max;
                  return (
                    <Chip
                      key={p.label}
                      label={p.label}
                      active={active}
                      onClick={() =>
                        set(
                          active
                            ? { minPrice: undefined, maxPrice: undefined }
                            : { minPrice: p.min, maxPrice: p.max }
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <SectionTitle>Area (sq ft)</SectionTitle>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={local.minArea ?? ""}
                onChange={(e) =>
                  set({
                    minArea: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                placeholder="Min"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <span className="shrink-0 text-xs text-ink-muted">to</span>
              <input
                type="number"
                min={0}
                value={local.maxArea ?? ""}
                onChange={(e) =>
                  set({
                    maxArea: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                placeholder="Max"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface px-4 py-3">
          <button
            type="button"
            onClick={() => onApply(local)}
            className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
