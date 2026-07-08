import Link from "next/link";
import { getTabConfig, type Purpose } from "@/lib/search/config";

interface Props {
  purpose: Purpose;
  cityName?: string;
  hasFilters?: boolean;
  onRequestLocation?: () => void;
}

/**
 * Purpose-aware empty state — Batch 3 §4 "never a dead end". Recovery actions:
 * clear filters, browse all, and "Request this location" (opens the
 * missing-location capture modal). No fake results shown.
 */
export function SearchEmptyState({
  purpose,
  cityName,
  hasFilters,
  onRequestLocation,
}: Props) {
  const tab = getTabConfig(purpose);
  const cityLabel = cityName ? ` in ${cityName}` : " in Gujarat";

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
        <svg
          className="h-8 w-8 text-ink-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <h2 className="text-base font-semibold text-ink">
        {tab.emptyTitle}
        {cityLabel}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{tab.emptyHint}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters && (
          <Link
            href={`/search?tab=${purpose}`}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Clear filters
          </Link>
        )}
        <Link
          href="/search"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          Browse all properties
        </Link>
        {onRequestLocation && (
          <button
            type="button"
            onClick={onRequestLocation}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Request this location
          </button>
        )}
      </div>
    </div>
  );
}
