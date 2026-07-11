"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, ChevronDown, Building2 } from "lucide-react";
import {
  PROPERTY_TYPES,
  BUDGET_PRESETS,
  BUDGET_LABEL,
  type Purpose,
} from "@/lib/search/config";
import { useCity, GUJARAT_CITIES } from "@/components/location/CityProvider";

type Tab = "buy" | "rent" | "projects";

const TABS: { key: Tab; label: string }[] = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "projects", label: "Projects" },
];

/**
 * Batch 3 · Screen 1 hero — ported 1:1 (headline, teal→grey gradient, tabbed
 * search card with location autosuggest, popular city chips). Search routes to
 * /search with real params. Autosuggest is transliteration-tolerant over the
 * REAL Gujarat city list (no fake localities).
 */
export function HomeHeroSearch() {
  const router = useRouter();
  const { city: selectedCity, setCity } = useCity();
  const [tab, setTab] = useState<Tab>("buy");
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const purpose: Purpose = tab === "rent" ? "rent" : "buy";
  const propTypes = PROPERTY_TYPES[purpose] ?? []; // full real set (no truncation)
  const budgetPresets = BUDGET_PRESETS[purpose] ?? [];
  const budgetLabel = BUDGET_LABEL[purpose];

  // transliteration-tolerant, real-city autosuggest
  const suggestions = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return [];
    const translit: Record<string, string> = {
      amdavad: "ahmedabad",
      ame: "ahmedabad",
      surat: "surat",
      vadodara: "vadodara",
      baroda: "vadodara",
      raj: "rajkot",
      gandhi: "gandhinagar",
      bhav: "bhavnagar",
      jam: "jamnagar",
    };
    const needle = translit[raw] ?? raw;
    return GUJARAT_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.name.toLowerCase().includes(raw)
    ).slice(0, 5);
  }, [query]);

  function go(cityOverride?: { name: string; slug: string }) {
    const params = new URLSearchParams();
    if (tab === "projects") params.set("entity", "project");
    else params.set("purpose", purpose);
    const q = query.trim();
    if (q) params.set("q", q);
    const city = cityOverride ?? selectedCity ?? undefined;
    if (city?.slug) params.set("city", city.slug);
    if (selectedType) params.set("type", selectedType);
    if (selectedBudget) {
      const [min, max] = selectedBudget.split("|");
      if (min) params.set("price_min", min);
      if (max) params.set("price_max", max);
    }
    router.push(`/search?${params.toString()}`);
  }

  const popularChips = GUJARAT_CITIES.slice(0, 6);

  return (
    <section
      className="px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14"
      style={{
        background:
          "linear-gradient(180deg, #E7F2EF 0%, var(--surface-subtle, #fafafa) 100%)",
      }}
    >
      <div className="mx-auto max-w-[920px] text-center">
        <h1 className="text-[30px] font-bold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[40px]">
          Find your next property in Gujarat
        </h1>
        <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.6] text-ink-soft sm:text-[16px]">
          Verified listings from owners, brokers and builders — across
          Ahmedabad, Surat, Vadodara, Rajkot and beyond.
        </p>

        {/* Search card */}
        <div
          className="relative mt-6 rounded-2xl border border-border bg-white text-left sm:mt-7"
          style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
        >
          {/* Tabs */}
          <div
            className="flex gap-0.5 px-4 pt-3"
            role="tablist"
            aria-label="Search type"
          >
            {TABS.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(t.key);
                    setSelectedType("");
                    setSelectedBudget("");
                  }}
                  className={
                    "cursor-pointer border-b-2 px-[18px] py-2.5 text-sm font-medium transition-colors " +
                    (active
                      ? "border-brand text-brand"
                      : "border-transparent text-ink-muted hover:text-ink")
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Fields */}
          <div className="flex flex-col items-stretch gap-3 border-t border-surface-muted p-4 sm:flex-row">
            {/* Location + autosuggest */}
            <div className="relative min-w-0 sm:flex-[2]">
              <div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-brand bg-white px-3.5 py-[11px] shadow-[0_0_0_3px_var(--brand-soft)]">
                <MapPin className="h-4 w-4 flex-shrink-0 text-brand" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpenSuggest(true);
                  }}
                  onFocus={() => setOpenSuggest(true)}
                  onBlur={() => {
                    blurTimer.current = setTimeout(
                      () => setOpenSuggest(false),
                      120
                    );
                  }}
                  placeholder={
                    selectedCity
                      ? selectedCity.name
                      : "City, locality or project…"
                  }
                  aria-label="Search location"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
              </div>
              {openSuggest && suggestions.length > 0 && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-xl border border-border bg-white p-1.5 text-left shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                  onMouseDown={() => {
                    if (blurTimer.current) clearTimeout(blurTimer.current);
                  }}
                >
                  <div className="px-3 pb-1 pt-2 text-[10px] font-semibold tracking-[0.06em] text-ink-muted">
                    CITIES
                  </div>
                  {suggestions.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setQuery("");
                        setOpenSuggest(false);
                        go(c);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-ink hover:bg-surface-muted"
                    >
                      <Building2 className="h-[15px] w-[15px] flex-shrink-0 text-brand" />
                      {c.name}, Gujarat
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type */}
            {tab !== "projects" && (
              <div className="relative min-w-0 sm:flex-1">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Property type"
                  className="w-full appearance-none rounded-[10px] border border-border-strong bg-white px-3.5 py-[11px] pr-9 text-sm text-ink outline-none hover:border-ink-muted"
                >
                  <option value="">All types</option>
                  {propTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink-muted" />
              </div>
            )}

            {/* Budget */}
            <div className="relative min-w-0 sm:flex-1">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                aria-label={budgetLabel}
                className="w-full appearance-none rounded-[10px] border border-border-strong bg-white px-3.5 py-[11px] pr-9 text-sm text-ink outline-none hover:border-ink-muted"
              >
                <option value="">Any budget</option>
                {budgetPresets.map((bp) => (
                  <option
                    key={bp.label}
                    value={`${bp.min ?? ""}|${bp.max ?? ""}`}
                  >
                    {bp.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink-muted" />
            </div>

            {/* Search */}
            <button
              type="button"
              onClick={() => go()}
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-[10px] bg-brand px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        {/* Popular city chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:mt-16">
          <span className="py-1.5 text-[13px] text-ink-muted">Popular:</span>
          {popularChips.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                setCity(c);
                router.push(`/search?city=${c.slug}`);
              }}
              className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
