"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SEARCH_TABS,
  PROPERTY_TYPES,
  BUDGET_PRESETS,
  BUDGET_LABEL,
  showsBhk,
  type Purpose,
} from "@/lib/search/config";
import { cn } from "@/lib/utils/cn";
import { useCity, GUJARAT_CITIES } from "@/components/location/CityProvider";

/**
 * Home hero + search (ported from the original My Gujarat Property project on
 * user request: trust pill, radial/gradient backdrop, headline, tabbed search
 * card, budget/BHK/type selectors, quick-city chips, trust badges). Fully wired
 * to the current /search page — tabs map to `tab`, budget to min_price/max_price,
 * over the REAL search config (no truncated sample lists).
 */
export function HomeHeroSearch() {
  const router = useRouter();
  const { city: selectedCity, setCity } = useCity();
  const [purpose, setPurpose] = useState<Purpose>("buy");
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBhk, setSelectedBhk] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const hasBhk = showsBhk(purpose);
  const propTypes = PROPERTY_TYPES[purpose] ?? []; // full real set (no truncation)
  const budgetPresets = BUDGET_PRESETS[purpose] ?? [];
  const budgetLabel = BUDGET_LABEL[purpose];
  const cityChips = GUJARAT_CITIES.slice(0, 9);

  function handleTabChange(p: Purpose) {
    setPurpose(p);
    setSelectedType("");
    setSelectedBhk("");
    setSelectedBudget("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ tab: purpose });
    const q = query.trim();
    if (q) params.set("q", q);
    if (selectedBhk) params.set("bhk", selectedBhk);
    if (selectedType) params.set("type", selectedType);
    if (selectedCity?.slug) params.set("city", selectedCity.slug);
    if (selectedBudget) {
      const [min, max] = selectedBudget.split("|");
      if (min) params.set("min_price", min);
      if (max) params.set("max_price", max);
    }
    router.push(`/search?${params.toString()}`);
  }

  const trustBadges = [
    { color: "#16A34A", bg: "#DCFCE7", label: "Verified Listings" },
    { color: "var(--brand)", bg: "var(--brand-soft)", label: "Direct Owner & Broker" },
    { color: "#E8600A", bg: "#FFF7ED", label: "All Gujarat Locations" },
    { color: "#7C3AED", bg: "#F5F3FF", label: "Secure Contact" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 1px 1px,rgba(15,123,108,0.05) 1px,transparent 0) 0 0/28px 28px," +
          "linear-gradient(145deg,#e6f4f1 0%,#f0f9ff 52%,#fff8f0 100%)",
        paddingTop: "clamp(20px,3.5vw,52px)",
        paddingBottom: "clamp(16px,3vw,44px)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(15,123,108,0.07) 0%,transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(232,96,10,0.05) 0%,transparent 70%)" }}
      />

      {/* ── Centered content column ── */}
      <div className="relative mx-auto flex max-w-[960px] flex-col items-center px-4 text-center sm:px-6">

        {/* Trust label — elegant on mobile, pill on sm+ */}
        <div className="mb-4 flex justify-center sm:mb-5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand sm:hidden">
            <span className="h-1 w-1 rounded-full bg-brand/60" />
            India&apos;s Most Trusted Gujarat Property Platform
            <span className="h-1 w-1 rounded-full bg-brand/60" />
          </p>
          <div className="hidden items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 shadow-sm sm:inline-flex">
            <span className="rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              GUJARAT
            </span>
            <span className="text-[13px] font-semibold text-[#4a5159]">
              India&apos;s Most Trusted Gujarat Property Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="mb-2 font-bold leading-[1.2] sm:mb-3"
          style={{ fontSize: "clamp(28px, 5.2vw, 46px)" }}
        >
          <span className="block text-[#1a1d21] sm:hidden">Find Your Perfect</span>
          <span
            className="block sm:hidden"
            style={{
              background: "linear-gradient(135deg,#0f7b6c 0%,#34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Property in Gujarat
          </span>
          <span className="hidden whitespace-nowrap text-[#1a1d21] sm:inline">
            Find Your Perfect Property{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#0f7b6c 0%,#34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in Gujarat
            </span>
          </span>
        </h1>

        <p className="mb-5 max-w-[420px] text-[13px] text-[#4a5159] sm:mb-6 sm:text-[15px]">
          Buy, Rent, Sell &amp; Discover Properties Across Gujarat
        </p>

        {/* ── Search card ── */}
        <form
          onSubmit={onSubmit}
          className="w-full overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: "0 6px 32px rgba(15,123,108,0.13),0 2px 10px rgba(0,0,0,0.06)" }}
        >
          {/* Purpose tabs */}
          <div
            className="flex overflow-x-auto border-b border-[#e6e8eb] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Search type"
          >
            {SEARCH_TABS.map((t) => {
              const active = t.purpose === purpose;
              return (
                <button
                  key={t.purpose}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTabChange(t.purpose)}
                  className={cn(
                    "whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-all",
                    active
                      ? "border-brand font-semibold text-brand"
                      : "border-transparent font-medium text-[#8a929c] hover:text-[#1a1d21]"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Search fields */}
          <div className="flex flex-col sm:flex-row sm:items-stretch">

            {/* Location */}
            <div className="flex flex-1 items-center gap-3 border-b border-[#e6e8eb] px-4 py-3 text-left sm:border-b-0 sm:border-r">
              <svg
                className="h-4 w-4 shrink-0 text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8a929c]">
                  Location
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={selectedCity ? selectedCity.name : "City, area or project…"}
                  aria-label="Search location"
                  className="w-full bg-transparent text-sm font-medium text-[#1a1d21] outline-none placeholder:text-[#8a929c]"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="border-b border-[#e6e8eb] px-4 py-3 text-left sm:border-b-0 sm:border-r sm:min-w-[130px]">
              <div className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8a929c]">
                Property Type
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Property type"
                className="w-full cursor-pointer bg-transparent text-sm font-medium text-[#1a1d21] outline-none"
              >
                <option value="">All Types</option>
                {propTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div
              className={cn(
                "border-b border-[#e6e8eb] px-4 py-3 text-left sm:min-w-[130px]",
                hasBhk ? "sm:border-b-0 sm:border-r" : "sm:border-b-0"
              )}
            >
              <div className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8a929c]">
                {budgetLabel}
              </div>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                aria-label="Budget"
                className="w-full cursor-pointer bg-transparent text-sm font-medium text-[#1a1d21] outline-none"
              >
                <option value="">Any Budget</option>
                {budgetPresets.map((bp) => (
                  <option key={bp.label} value={`${bp.min ?? ""}|${bp.max ?? ""}`}>
                    {bp.label}
                  </option>
                ))}
              </select>
            </div>

            {/* BHK */}
            {hasBhk && (
              <div className="border-b border-[#e6e8eb] px-4 py-3 text-left sm:min-w-[120px] sm:border-b-0 sm:border-r">
                <div className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8a929c]">
                  BHK / Size
                </div>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  aria-label="BHK"
                  className="w-full cursor-pointer bg-transparent text-sm font-medium text-[#1a1d21] outline-none"
                >
                  <option value="">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="4+">4+ BHK</option>
                </select>
              </div>
            )}

            {/* Search button */}
            <div className="flex items-center p-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-hover active:scale-[0.98] sm:w-auto"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx={11} cy={11} r={8} />
                  <line x1={21} y1={21} x2={16.65} y2={16.65} />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* City quick chips */}
          {cityChips.length > 0 && (
            <div className="border-t border-[#e6e8eb] bg-[#fafafa] px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-[#8a929c]">
                  Quick:
                </span>
                <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                  {cityChips.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setCity(selectedCity?.slug === c.slug ? null : c)}
                      className={cn(
                        "whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        selectedCity?.slug === c.slug
                          ? "border-brand bg-brand-soft text-brand"
                          : "border-[#e6e8eb] bg-white text-[#4a5159] hover:border-brand/40 hover:text-[#1a1d21]"
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-5 sm:gap-2">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#1a1d21] shadow-sm sm:px-3.5 sm:py-1.5 sm:text-xs"
            >
              <span
                className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold sm:h-4 sm:w-4 sm:text-[9px]"
                style={{ background: b.bg, color: b.color }}
              >
                ✓
              </span>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
