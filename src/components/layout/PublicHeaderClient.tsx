"use client";

import { useMemo, useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  Search,
  Home,
  Building,
  Building2,
  MapPin,
  KeyRound,
  User,
} from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { CitySelector } from "@/components/public/CitySelector";
import { NotificationBell } from "@/components/dashboard/NotificationBell";
import { Logo } from "@/components/layout/Logo";
import { logout } from "@/lib/auth/actions";
import { ROLE_LABELS } from "@/config";
import { useCity, GUJARAT_CITIES } from "@/components/location/CityProvider";
import type { Profile } from "@/types";

interface Props {
  profile: Profile | null;
}

// Mobile drawer nav (MGP DESIGN Batch 1 · 3B) — icon per item, first is active.
const DRAWER_NAV = [
  { key: "buy", label: "Buy", href: "/search?purpose=buy", Icon: Home },
  { key: "rent", label: "Rent", href: "/search?purpose=rent", Icon: KeyRound },
  {
    key: "projects",
    label: "Projects",
    href: "/search?entity=project",
    Icon: Building,
  },
  { key: "cities", label: "Cities", href: "/search", Icon: MapPin },
];

// City name → slug lookup used by the header's inline autosuggest, tolerant
// of common transliterations (kept in sync with HomeHeroSearch).
const CITY_TRANSLIT: Record<string, string> = {
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

export function PublicHeaderClient({ profile }: Props) {
  const router = useRouter();
  const { openAuth: openAuthModal } = useAuthModal();
  const { city: selectedCity, setCity } = useCity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [logoutPending, startLogout] = useTransition();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Header search — typeable with city autosuggest (same behavior as the
  // hero search card), not a plain link straight to /search.
  const [headerQuery, setHeaderQuery] = useState("");
  const [headerSuggestOpen, setHeaderSuggestOpen] = useState(false);
  const headerBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerSuggestions = useMemo(() => {
    const raw = headerQuery.trim().toLowerCase();
    if (!raw) return [];
    const needle = CITY_TRANSLIT[raw] ?? raw;
    return GUJARAT_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.name.toLowerCase().includes(raw)
    ).slice(0, 5);
  }, [headerQuery]);

  function goToSearch(cityOverride?: { name: string; slug: string }) {
    const params = new URLSearchParams();
    const q = headerQuery.trim();
    if (q) params.set("q", q);
    const city = cityOverride ?? selectedCity ?? undefined;
    if (city?.slug) params.set("city", city.slug);
    setHeaderSuggestOpen(false);
    router.push(`/search${params.toString() ? `?${params}` : ""}`);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function openAuth() {
    // Header Login/Register intent → dashboard after auth (no `next`) per CLAUDE.md §13.
    setMobileMenuOpen(false);
    openAuthModal();
  }

  function handleLogout() {
    startLogout(async () => {
      await logout("/");
    });
  }

  function handlePost() {
    // Guest → register popup; signed-in → their dashboard hub (post CTA lives there).
    setMobileMenuOpen(false);
    if (!profile) openAuthModal();
    else router.push(`/dashboard/${profile.public_role}`);
  }

  const isGuest = !profile;
  const dashboardRoute = profile
    ? `/dashboard/${profile.public_role}`
    : "/login";
  const notificationsRoute = profile
    ? `/dashboard/${profile.public_role}/notifications`
    : "/login";
  const avatarInitial = profile?.full_name?.charAt(0).toUpperCase() ?? "U";
  const displayName = profile?.display_name || profile?.full_name || "";

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur">
        {/* ── Desktop / tablet row ── */}
        <div className="mx-auto hidden max-w-7xl items-center gap-4 px-4 sm:px-6 md:flex lg:px-8">
          <div className="flex h-16 w-full items-center gap-4">
            {/* Brand + divider + city */}
            <div className="flex flex-shrink-0 items-center gap-3">
              <Logo />
              <span
                className="hidden h-5 w-px flex-shrink-0 bg-zinc-200 md:block"
                aria-hidden="true"
              />
              <div className="hidden flex-shrink-0 md:block">
                <CitySelector className="text-sm" />
              </div>
            </div>

            {/* Search box — typeable with city autosuggest, grows to fill
                remaining space (matches the hero search card's behavior
                instead of just linking straight to /search). */}
            <div className="relative mx-6 min-w-0 flex-1 lg:mx-10">
              <div className="flex w-full items-center gap-2 rounded-[10px] border border-zinc-200 bg-zinc-50 px-3 py-2.5 transition-all focus-within:border-brand/50 focus-within:bg-white hover:border-brand/40 hover:bg-white">
                <Search className="h-[15px] w-[15px] flex-shrink-0 text-zinc-400" />
                <input
                  value={headerQuery}
                  onChange={(e) => {
                    setHeaderQuery(e.target.value);
                    setHeaderSuggestOpen(true);
                  }}
                  onFocus={() => setHeaderSuggestOpen(true)}
                  onBlur={() => {
                    headerBlurTimer.current = setTimeout(
                      () => setHeaderSuggestOpen(false),
                      120
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToSearch();
                  }}
                  placeholder="Search locality, project, builder…"
                  aria-label="Search properties and projects"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </div>
              {headerSuggestOpen && headerSuggestions.length > 0 && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 rounded-xl border border-zinc-200 bg-white p-1.5 text-left shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                  onMouseDown={() => {
                    if (headerBlurTimer.current)
                      clearTimeout(headerBlurTimer.current);
                  }}
                >
                  <div className="px-3 pb-1 pt-2 text-[10px] font-semibold tracking-[0.06em] text-zinc-400">
                    CITIES
                  </div>
                  {headerSuggestions.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setHeaderQuery("");
                        goToSearch(c);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-800 hover:bg-zinc-50"
                    >
                      <Building2 className="h-[15px] w-[15px] flex-shrink-0 text-brand" />
                      {c.name}, Gujarat
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification bell — real DB-backed dropdown, signed-in users only */}
            {!isGuest && <NotificationBell />}

            {/* Auth controls */}
            {isGuest ? (
              <button
                type="button"
                onClick={openAuth}
                className="flex-shrink-0 whitespace-nowrap rounded-[10px] bg-[#1C1C1E] px-[18px] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-black"
              >
                Login / Register
              </button>
            ) : (
              <div className="relative flex-shrink-0" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg border border-transparent px-2.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-200 hover:bg-zinc-50"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  aria-label="Open profile menu"
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    {avatarInitial}
                  </div>
                  <span className="hidden max-w-[110px] truncate lg:block">
                    {displayName}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                </button>

                {profileMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
                    role="menu"
                    aria-label="Profile menu"
                  >
                    <div className="border-b border-zinc-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {profile.full_name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {ROLE_LABELS[profile.public_role]}
                      </p>
                    </div>
                    <Link
                      href={dashboardRoute}
                      role="menuitem"
                      className="flex items-center px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      role="menuitem"
                      className="flex items-center px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Profile &amp; Settings
                    </Link>
                    <Link
                      href="/support"
                      role="menuitem"
                      className="flex items-center px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Support
                    </Link>
                    <div className="mt-1 border-t border-zinc-100 pt-1">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={logoutPending}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        {logoutPending ? "Signing out…" : "Logout"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile row (city sits under the brand name per design) ── */}
        <div className="flex items-center gap-2 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-zinc-200 text-zinc-800 transition-colors hover:bg-zinc-50"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>

          {/* Brand mark */}
          <Link
            href="/"
            aria-label="Home"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand text-[12px] font-bold text-white"
          >
            MG
          </Link>

          {/* Brand name + city under it */}
          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <Link
              href="/"
              className="truncate text-sm font-semibold leading-tight text-zinc-900"
            >
              My Gujarat Property
            </Link>
            <CitySelector variant="inline" />
          </div>

          {!isGuest && <NotificationBell />}

          {isGuest && (
            <button
              type="button"
              onClick={openAuth}
              className="flex-shrink-0 whitespace-nowrap rounded-[10px] bg-[#1C1C1E] px-3.5 py-2.5 text-[12.5px] font-semibold text-white"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* ─── Mobile drawer ─── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Left-side drawer — ported from MGP DESIGN Batch 1 · 3B */}
          <nav
            id="mobile-nav"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            className="fixed bottom-0 left-0 top-0 z-50 flex w-80 max-w-[85vw] flex-col bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5">
              <span className="text-sm font-semibold text-zinc-900">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] text-zinc-500 transition-colors hover:bg-zinc-100"
                aria-label="Close navigation menu"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
              {DRAWER_NAV.map((item, i) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    "flex items-center gap-3 rounded-[10px] px-3 py-3 text-sm font-medium transition-colors " +
                    (i === 0
                      ? "bg-brand-soft text-brand"
                      : "text-zinc-600 hover:bg-zinc-100")
                  }
                >
                  <item.Icon
                    className={
                      "h-[17px] w-[17px] " +
                      (i === 0 ? "text-brand" : "text-zinc-400")
                    }
                  />
                  {item.label}
                </Link>
              ))}

              {/* Owner/Broker/Builder promo */}
              <div className="my-3 rounded-2xl bg-brand-soft p-3.5">
                <div className="text-[13px] font-semibold text-brand">
                  Are you an Owner, Broker or Builder?
                </div>
                <button
                  type="button"
                  onClick={handlePost}
                  className="mt-2.5 rounded-[10px] bg-brand px-3 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  Post property free
                </button>
              </div>

              <div className="my-1 h-px bg-zinc-100" />

              {isGuest ? (
                <div className="flex gap-2 p-1">
                  <button
                    type="button"
                    onClick={openAuth}
                    className="flex-1 rounded-[10px] border border-zinc-300 px-3 py-2.5 text-[13px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={openAuth}
                    className="flex-1 rounded-[10px] bg-brand px-3 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-hover"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  <Link
                    href={dashboardRoute}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                  >
                    <Home className="h-[17px] w-[17px] text-zinc-400" />
                    Dashboard
                  </Link>
                  <Link
                    href={notificationsRoute}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                  >
                    <Bell className="h-[17px] w-[17px] text-zinc-400" />
                    Notifications
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                  >
                    <User className="h-[17px] w-[17px] text-zinc-400" />
                    Profile &amp; Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutPending}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    {logoutPending ? "Signing out…" : "Logout"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4 border-t border-zinc-100 px-4 py-3.5 text-[11px] text-zinc-400">
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-zinc-700"
              >
                About
              </Link>
              <Link
                href="/legal/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-zinc-700"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-zinc-700"
              >
                Privacy
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-zinc-700"
              >
                RERA Info
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
