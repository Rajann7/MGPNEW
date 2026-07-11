"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building,
  Search,
  ChevronLeft,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useCity } from "@/components/location/CityProvider";
import type { Profile } from "@/types";

/**
 * Batch 4 detail/profile chrome — matches the MGP DESIGN exactly:
 * Desktop (md+): CONDENSED header — brand + city pill + search field + auth
 *   (NO mega-menu nav row — Batch 4 screens don't show it).
 * Mobile (<md): CONTEXTUAL header — back button + page title + optional actions.
 * NO site footer on these screens (design has none — footer verified absent).
 */
export function DetailHeader({
  profile,
  title,
  actions,
  showCityPill = true,
}: {
  profile: Profile | null;
  title: string;
  actions?: React.ReactNode;
  /** The property detail screen (d-prop) desktop header omits the city pill —
   * brand + search + avatar only. Defaults to true so other detail screens
   * (e.g. project detail) keep their existing chrome unchanged. */
  showCityPill?: boolean;
}) {
  const router = useRouter();
  const { openAuth } = useAuthModal();
  const { city } = useCity();
  const [q, setQ] = useState("");
  const cityName = city?.name ?? "All Gujarat";
  const dashboardRoute = profile
    ? `/dashboard/${profile.public_role}`
    : "/login";
  const initial = profile?.full_name?.charAt(0).toUpperCase() ?? "U";

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search"
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto max-w-[1440px]">
        {/* ── Desktop condensed header (md+) ── */}
        <form
          onSubmit={submitSearch}
          className="hidden items-center gap-6 px-6 py-3.5 md:flex"
        >
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <Building className="h-[17px] w-[17px]" />
              </span>
              <span className="whitespace-nowrap text-[16px] font-semibold text-ink">
                My Gujarat Property
              </span>
            </Link>
            {showCityPill && (
              <>
                <span className="h-6 w-px bg-border" aria-hidden="true" />
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-[13px] font-medium text-ink-soft">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {cityName}
                  <ChevronDown className="h-3 w-3 text-ink-muted" />
                </span>
              </>
            )}
          </div>

          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-border bg-surface-subtle px-3.5 py-2.5">
            <Search className="h-4 w-4 flex-shrink-0 text-ink-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search locality, project, landmark…"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </label>

          <div className="flex flex-shrink-0 items-center gap-3">
            {profile ? (
              <>
                <Link
                  href={dashboardRoute}
                  className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-surface-muted"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white"
                >
                  {initial}
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth()}
                  className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-surface-muted"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openAuth()}
                  className="rounded-[10px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </form>

        {/* ── Mobile contextual header (<md) ── */}
        <div className="flex h-14 items-center gap-1 px-2 md:hidden">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] text-ink hover:bg-surface-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink">
            {title}
          </h2>
          {actions && (
            <div className="flex flex-shrink-0 items-center gap-1">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
