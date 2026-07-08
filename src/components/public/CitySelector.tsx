"use client";

import { useEffect, useRef, useState } from "react";
import { useCity } from "@/components/location/CityProvider";
import { cn } from "@/lib/utils/cn";

export function CitySelector({
  className = "",
  variant = "pill",
}: {
  className?: string;
  /** "pill" = bordered button (default); "inline" = green text under brand (mobile header). */
  variant?: "pill" | "inline";
}) {
  const { city, cities, setCity } = useCity();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const inline = variant === "inline";

  return (
    <div ref={ref} className={cn("relative", className)}>
      {inline ? (
        // Green "Ahmedabad ⌄" trigger shown under the brand name in the mobile header.
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={city ? `City: ${city.name}. Change city` : "Select city"}
          className="flex items-center gap-0.5 text-[11px] font-medium leading-tight text-brand hover:text-brand-hover"
        >
          <span className="max-w-[7.5rem] truncate">
            {city?.name ?? "All Gujarat"}
          </span>
          <svg
            className="h-3 w-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={city ? `City: ${city.name}. Change city` : "Select city"}
          className="flex items-center gap-1 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm text-ink hover:border-border-strong"
        >
          <svg
            className="h-4 w-4 shrink-0 text-brand"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx={12} cy={10} r={3} />
          </svg>
          <span className="hidden max-w-[6rem] truncate min-[380px]:inline">
            {city?.name ?? "All Gujarat"}
          </span>
          <svg
            className="h-4 w-4 shrink-0 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-card border border-border bg-surface p-2 shadow-card",
            inline ? "left-0" : "right-0 sm:left-0 sm:right-auto"
          )}
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-medium text-ink-muted">
              Gujarat · select city
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close city selector"
              className="rounded p-1 text-ink-muted hover:bg-surface-muted"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Gujarat city"
            aria-label="Search city"
            className="mb-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <ul className="max-h-56 overflow-y-auto">
            <li>
              <button
                type="button"
                onClick={() => {
                  setCity(null);
                  setOpen(false);
                  setQuery("");
                }}
                className={cn(
                  "w-full rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-muted",
                  !city && "font-medium text-brand"
                )}
              >
                All Gujarat
              </button>
            </li>
            {filtered.length === 0 ? (
              <li className="px-2 py-3 text-sm text-ink-muted">
                No matching city.
              </li>
            ) : (
              filtered.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setCity(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "w-full rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-muted",
                      city?.slug === c.slug && "font-medium text-brand"
                    )}
                  >
                    {c.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
