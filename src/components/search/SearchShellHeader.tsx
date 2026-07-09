"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building, Search, ChevronLeft, ChevronDown, MapPin } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useCity } from "@/components/location/CityProvider";
import type { Profile } from "@/types";

/**
 * Batch 3 · Screen 2 search-page header — ported 1:1.
 * Desktop (md+): CONDENSED header — brand + city pill + query field + Login/Register
 *   (NO mega-menu nav row — that lives only on the home screen).
 * Mobile (<md): CONTEXTUAL header — back button + query field + map icon.
 * No global site header/footer on this screen (per the STRICT 1:1 screen rule).
 */
export function SearchShellHeader({
  profile,
  searchInput,
  onSearchInputChange,
  onSubmit,
}: {
  profile: Profile | null;
  searchInput: string;
  onSearchInputChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const router = useRouter();
  const { openAuth } = useAuthModal();
  const { city } = useCity();
  const cityName = city?.name ?? "All Gujarat";
  const dashboardRoute = profile ? `/dashboard/${profile.public_role}` : "/login";
  const initial = profile?.full_name?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto max-w-[1440px]">
        {/* ── Desktop condensed header (md+) ── */}
        <form
          onSubmit={onSubmit}
          className="hidden items-center gap-6 px-6 py-3.5 md:flex"
        >
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link href="/" aria-label="Home" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <Building className="h-[17px] w-[17px]" />
              </span>
              <span className="whitespace-nowrap text-[16px] font-semibold text-ink">
                My Gujarat Property
              </span>
            </Link>
            <span className="h-6 w-px bg-border" aria-hidden="true" />
            <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-[13px] font-medium text-ink-soft">
              <MapPin className="h-3.5 w-3.5 text-brand" />
              {cityName}
              <ChevronDown className="h-3 w-3 text-ink-muted" />
            </span>
          </div>

          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-border bg-surface-subtle px-3.5 py-2.5">
            <Search className="h-4 w-4 flex-shrink-0 text-ink-muted" />
            <input
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
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
        <form
          onSubmit={onSubmit}
          className="flex h-14 items-center px-2 md:hidden"
        >
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] text-ink hover:bg-surface-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-border bg-surface-subtle px-3 py-2.5">
            <Search className="h-[15px] w-[15px] flex-shrink-0 text-ink-muted" />
            <input
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              placeholder="Search…"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted"
            />
          </label>
        </form>
      </div>
    </header>
  );
}
