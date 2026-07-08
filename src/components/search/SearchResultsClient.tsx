"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { QuickFilters } from "./QuickFilters";
import { type ActiveFilter } from "./FilterChips";
import { MobileFilterSheet, type MobileFilterState } from "./MobileFilterSheet";
import { SortDropdown } from "./SortDropdown";
import { SaveSearchButton } from "./SaveSearchButton";
import { SearchEmptyState } from "./SearchEmptyState";
import { PropertyResultCard } from "./PropertyResultCard";
import { ProjectResultCard } from "./ProjectResultCard";
import { RequirementResultCard } from "./RequirementResultCard";
import { SearchPagination } from "./SearchPagination";
import { RequestLocationModal } from "./RequestLocationModal";
import { SearchShellHeader } from "./SearchShellHeader";
import { List, Map as MapIcon, MapPinned, SlidersHorizontal, X } from "lucide-react";
import type { Profile } from "@/types";
import {
  PROPERTY_TYPES,
  FURNISHING_FILTER_OPTIONS,
  BUDGET_PRESETS,
  BUDGET_LABEL,
  showsBhk,
  showsFurnishing,
  parsePurpose,
  TAB_SCOPE,
  type Purpose,
  type SortValue,
} from "@/lib/search/config";
import type { SearchResults } from "@/lib/actions/public-search";
import type { CityOption } from "@/components/location/CityProvider";

interface Props {
  results: SearchResults;
  cities: CityOption[];
  profile: Profile | null;
}

const POSTED_BY_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "owner", label: "Owner" },
  { value: "broker", label: "Broker" },
  { value: "builder", label: "Builder" },
];

const SCOPE_TABS: { key: Purpose; label: string }[] = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "commercial", label: "Commercial" },
  { key: "land", label: "Land / Plots" },
  { key: "projects", label: "Projects" },
  { key: "pg", label: "PG / Hostel" },
  { key: "requirements", label: "Requirements" },
];

/**
 * Client-side search results wrapper — ported from the old project's search
 * screen (same layout/interaction design), rewired to the real public-safe
 * data layer (`searchPublicListings`) and the real entity/category/purpose
 * schema (see TAB_SCOPE in src/lib/search/config.ts).
 *
 * Tab selection uses the `tab` URL param (Purpose: buy/rent/commercial/land/
 * projects/pg/requirements) which the server page maps to real entity/
 * category/purpose scope — kept separate from the backend's own `purpose`
 * enum (sell/rent/lease/pg/business_sale) to avoid name collisions.
 */
export function SearchResultsClient({ results, cities, profile }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const purpose = parsePurpose(sp.get("tab") ?? undefined);
  const scope = TAB_SCOPE[purpose];
  const isPropertyTab = scope.entity === "property";

  const city = sp.get("city") ?? "";
  const sort = (sp.get("sort") as SortValue) ?? "newest";
  const bhkParam = sp.get("bhk") ?? "";
  const typeParam = sp.get("type") ?? "";
  const minPriceParam = sp.get("min_price")
    ? parseInt(sp.get("min_price")!)
    : undefined;
  const maxPriceParam = sp.get("max_price")
    ? parseInt(sp.get("max_price")!)
    : undefined;
  const furnishingParam = sp.get("furnishing") ?? "";
  const postedByParam = sp.get("posted_by") ?? "";
  const minAreaParam = sp.get("min_area")
    ? parseInt(sp.get("min_area")!)
    : undefined;
  const maxAreaParam = sp.get("max_area")
    ? parseInt(sp.get("max_area")!)
    : undefined;
  const q = sp.get("q") ?? "";

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(q);
  const [view, setView] = useState<"list" | "map">("list");
  const [requestOpen, setRequestOpen] = useState(false);

  function renderCards() {
    if (scope.entity === "property")
      return results.properties.map((p) => (
        <PropertyResultCard key={p.id} property={p} />
      ));
    if (scope.entity === "project")
      return results.projects.map((p) => (
        <ProjectResultCard key={p.id} project={p} />
      ));
    return results.requirements.map((r) => (
      <RequirementResultCard key={r.id} requirement={r} />
    ));
  }

  const selectedBhk = bhkParam ? bhkParam.split(",") : [];
  const selectedTypes = typeParam ? typeParam.split(",") : [];

  function navigate(patch: Record<string, string | undefined>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    params.delete("page");
    startTransition(() => router.push(`/search?${params.toString()}`));
  }

  function handlePurposeChange(p: Purpose) {
    navigate({
      tab: p,
      type: undefined,
      bhk: undefined,
      furnishing: undefined,
      min_price: undefined,
      max_price: undefined,
    });
  }

  function handleBhkChange(vals: string[]) {
    navigate({ bhk: vals.join(",") || undefined });
  }

  function handleTypeChange(vals: string[]) {
    navigate({ type: vals.join(",") || undefined });
  }

  function handleFurnishingChange(val: string) {
    navigate({ furnishing: furnishingParam === val ? undefined : val });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ q: searchInput || undefined });
  }

  function handleSort(v: SortValue) {
    navigate({ sort: v === "newest" ? undefined : v });
  }

  function handleClearAll() {
    navigate({
      bhk: undefined,
      type: undefined,
      min_price: undefined,
      max_price: undefined,
      furnishing: undefined,
      min_area: undefined,
      max_area: undefined,
      q: undefined,
      city: undefined,
    });
    setSearchInput("");
  }

  const activeFilters: ActiveFilter[] = [];
  if (city) activeFilters.push({ key: "city", label: "City", value: city });
  if (q) activeFilters.push({ key: "q", label: "Search", value: q });
  if (postedByParam)
    activeFilters.push({
      key: "posted_by",
      label: "Posted by",
      value:
        POSTED_BY_OPTIONS.find((o) => o.value === postedByParam)?.label ??
        postedByParam,
    });
  if (selectedBhk.length)
    activeFilters.push({
      key: "bhk",
      label: "BHK",
      value: selectedBhk.join(", "),
    });
  if (selectedTypes.length) {
    const typeLabels = selectedTypes.map(
      (v) => PROPERTY_TYPES[purpose]?.find((t) => t.value === v)?.label ?? v
    );
    activeFilters.push({
      key: "type",
      label: "Type",
      value: typeLabels.join(", "),
    });
  }
  if (minPriceParam || maxPriceParam) {
    const budgetLabel = [
      minPriceParam ? `₹${(minPriceParam / 100000).toFixed(0)}L` : "",
      maxPriceParam ? `₹${(maxPriceParam / 100000).toFixed(0)}L` : "",
    ]
      .filter(Boolean)
      .join(" – ");
    activeFilters.push({ key: "budget", label: "Budget", value: budgetLabel });
  }
  if (furnishingParam) {
    const fl =
      FURNISHING_FILTER_OPTIONS.find((o) => o.value === furnishingParam)
        ?.label ?? furnishingParam;
    activeFilters.push({ key: "furnishing", label: "Furnishing", value: fl });
  }
  if (minAreaParam || maxAreaParam) {
    const areaLabel = [
      minAreaParam ? `${minAreaParam} sq ft` : "",
      maxAreaParam ? `${maxAreaParam} sq ft` : "",
    ]
      .filter(Boolean)
      .join(" – ");
    activeFilters.push({ key: "area", label: "Area", value: areaLabel });
  }

  const hasFilters = activeFilters.length > 0;
  const flatParams: Record<string, string | undefined> = {
    tab: purpose,
    q,
    city,
    bhk: bhkParam,
    type: typeParam,
    furnishing: furnishingParam,
    min_price: minPriceParam?.toString(),
    max_price: maxPriceParam?.toString(),
    min_area: minAreaParam?.toString(),
    max_area: maxAreaParam?.toString(),
    sort,
  };

  const items =
    scope.entity === "property"
      ? results.properties
      : scope.entity === "project"
        ? results.projects
        : results.requirements;

  const sheetFilters: MobileFilterState = {
    city,
    bhk: selectedBhk,
    types: selectedTypes,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    furnishing: furnishingParam || undefined,
    minArea: minAreaParam,
    maxArea: maxAreaParam,
  };

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Batch 3 · Screen 2 — condensed/contextual search header (no mega-menu). */}
      <SearchShellHeader
        profile={profile}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSubmit={handleSearch}
        onToggleMap={() => setView((v) => (v === "map" ? "list" : "map"))}
      />

      {/* Secondary filter bar — directly below the header. */}
      <div className="sticky top-[57px] z-20 border-b border-border bg-surface md:top-[61px]">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-4 py-2.5 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Scope pills (Buy/Rent/Projects/…) — entity switch */}
          {SCOPE_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => handlePurposeChange(t.key)}
              className={cn(
                "flex-shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                purpose === t.key
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-surface text-ink-soft hover:border-brand/40"
              )}
            >
              {t.label}
            </button>
          ))}

          <span className="mx-1 h-5 w-px flex-shrink-0 bg-border" />

          {/* Active filter chips */}
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                if (f.key === "budget")
                  navigate({ min_price: undefined, max_price: undefined });
                else if (f.key === "area")
                  navigate({ min_area: undefined, max_area: undefined });
                else navigate({ [f.key]: undefined });
              }}
              className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#C4E0D9] bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand"
            >
              {f.value}
              <X className="h-3 w-3" />
            </button>
          ))}

          {/* More filters (opens the full filter sheet) */}
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-soft hover:border-ink-muted"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            More filters
            {hasFilters && (
              <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] text-white">
                {activeFilters.length}
              </span>
            )}
          </button>

          <span className="ml-auto flex-shrink-0" />

          {/* Map view / List toggle (right) — honest map fallback */}
          <div className="hidden flex-shrink-0 overflow-hidden rounded-full border border-border-strong sm:flex">
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
                view === "list"
                  ? "bg-brand text-white"
                  : "bg-surface text-ink-soft hover:bg-surface-muted"
              )}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              aria-pressed={view === "map"}
              title="Map view — pins arrive once maps are enabled"
              className={cn(
                "flex items-center gap-1.5 border-l border-border-strong px-3 py-1.5 text-xs font-medium transition-colors",
                view === "map"
                  ? "bg-brand text-white"
                  : "bg-surface text-ink-soft hover:bg-surface-muted"
              )}
            >
              <MapIcon className="h-3.5 w-3.5" /> Map view
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6">
        <div className="flex gap-6">
          {/* Desktop filter sidebar (280px, Batch 3) */}
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-[120px] rounded-card border border-border bg-surface p-4 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Filters</h2>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs text-ink-muted underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    City
                  </p>
                  <select
                    value={city}
                    onChange={(e) =>
                      navigate({ city: e.target.value || undefined })
                    }
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none"
                  >
                    <option value="">All cities</option>
                    {cities.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {isPropertyTab && showsBhk(purpose) && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      BHK
                    </p>
                    <QuickFilters
                      purpose={purpose}
                      selectedBhk={selectedBhk}
                      selectedTypes={[]}
                      onBhkChange={handleBhkChange}
                      onTypeChange={() => {}}
                      showTypes={false}
                    />
                  </div>
                )}

                {(BUDGET_PRESETS[purpose]?.length ?? 0) > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      {BUDGET_LABEL[purpose] ?? "Budget"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {BUDGET_PRESETS[purpose].map((p) => {
                        const active =
                          minPriceParam === p.min && maxPriceParam === p.max;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() =>
                              navigate({
                                min_price: active
                                  ? undefined
                                  : p.min?.toString(),
                                max_price: active
                                  ? undefined
                                  : p.max?.toString(),
                              })
                            }
                            aria-pressed={active}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                              active
                                ? "border-brand bg-brand-soft text-brand"
                                : "border-border bg-surface text-ink-soft hover:border-brand-soft hover:text-brand"
                            )}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isPropertyTab && showsFurnishing(purpose) && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Furnishing
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {FURNISHING_FILTER_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleFurnishingChange(opt.value)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                            furnishingParam === opt.value
                              ? "border-brand bg-brand-soft text-brand"
                              : "border-border bg-surface text-ink-soft hover:border-brand-soft hover:text-brand"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {PROPERTY_TYPES[purpose]?.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Type
                    </p>
                    <QuickFilters
                      purpose={purpose}
                      selectedBhk={[]}
                      selectedTypes={selectedTypes}
                      onBhkChange={() => {}}
                      onTypeChange={handleTypeChange}
                      showBhk={false}
                    />
                  </div>
                )}

                {/* Posted by — real filter (posted_by → poster_role). */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Posted by
                  </p>
                  <div className="inline-flex rounded-full bg-surface-muted p-1">
                    {POSTED_BY_OPTIONS.map((o) => (
                      <button
                        key={o.value || "all"}
                        type="button"
                        onClick={() =>
                          navigate({ posted_by: o.value || undefined })
                        }
                        aria-pressed={postedByParam === o.value}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          postedByParam === o.value
                            ? "bg-surface text-ink shadow-sm"
                            : "text-ink-muted hover:text-ink"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[15px] font-semibold text-ink">
                {items.length} result{items.length === 1 ? "" : "s"}{" "}
                <span className="font-normal text-ink-soft">
                  {city ? `in ${city}` : "in Gujarat"}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <SaveSearchButton profile={profile} />
                <SortDropdown value={sort} onChange={handleSort} />
              </div>
            </div>

            {isPending && (
              <div className="mb-4 text-sm text-ink-muted">Loading…</div>
            )}

            {items.length === 0 && !isPending && (
              <SearchEmptyState
                purpose={purpose}
                cityName={city || undefined}
                hasFilters={hasFilters}
                onRequestLocation={() => setRequestOpen(true)}
              />
            )}

            {items.length > 0 && view === "list" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {renderCards()}
              </div>
            )}

            {items.length > 0 && view === "map" && (
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col gap-3 lg:w-[42%]">
                  {renderCards()}
                </div>
                {/* Honest map fallback pane — real map lands with the maps provider. */}
                <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-card border border-border bg-[repeating-linear-gradient(0deg,#eef1ee,#eef1ee_40px,#e6ebe6_40px,#e6ebe6_41px),repeating-linear-gradient(90deg,#eef1ee,#eef1ee_40px,#e6ebe6_40px,#e6ebe6_41px)]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm">
                      <MapPinned className="h-6 w-6 text-brand" />
                    </span>
                    <div className="text-sm font-semibold text-ink">
                      Map is not available yet
                    </div>
                    <p className="max-w-xs text-xs leading-[1.5] text-ink-soft">
                      Precise map pins arrive once maps are enabled. Meanwhile all{" "}
                      {items.length} result{items.length === 1 ? "" : "s"} are shown
                      in the list — nothing is hidden.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className="mt-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand"
                    >
                      Back to list
                    </button>
                  </div>
                </div>
              </div>
            )}

            {items.length > 0 && (
              <SearchPagination
                page={results.page}
                hasMore={results.hasMore}
                searchParams={flatParams}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFilterSheet
        open={filterSheetOpen}
        purpose={purpose}
        cities={cities}
        filters={sheetFilters}
        onClose={() => setFilterSheetOpen(false)}
        onApply={(f) => {
          setFilterSheetOpen(false);
          navigate({
            city: f.city || undefined,
            bhk: f.bhk.join(",") || undefined,
            type: f.types.join(",") || undefined,
            min_price: f.minPrice?.toString(),
            max_price: f.maxPrice?.toString(),
            furnishing: f.furnishing || undefined,
            min_area: f.minArea?.toString(),
            max_area: f.maxArea?.toString(),
          });
        }}
      />

      <RequestLocationModal
        open={requestOpen}
        defaultLocation={city || ""}
        onClose={() => setRequestOpen(false)}
      />
    </div>
  );
}
