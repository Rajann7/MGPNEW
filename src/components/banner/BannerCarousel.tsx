"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SponsoredLabel } from "./SponsoredLabel";
import type { PublicBanner } from "@/lib/banner/types";

const CITY_KEY = "mgp.city";

/**
 * Homepage "Top picks" sponsored carousel (Housing.com style). Each slide = a
 * platform-built project card (left) + the advertiser's creative image (right),
 * linking to the real project. City-first priority; horizontal scroll-snap with
 * arrows + native swipe + autoplay; renders nothing when there are no ads.
 */
/** Read the visitor's selected city (name) from localStorage — used only for
 *  city-first ordering, so a null default during SSR is safe. */
function readStoredCity(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CITY_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed?.name ?? parsed?.slug ?? raw;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

export function BannerCarousel({ banners }: { banners: PublicBanner[] }) {
  const [city] = useState<string | null>(readStoredCity);
  const trackRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const n = (i + el.children.length) % el.children.length;
    idxRef.current = n;
    const card = el.children[n] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }
  function scrollBy(dir: 1 | -1) { goTo(idxRef.current + dir); }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        let best = 0, bestDist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - el.scrollLeft);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        idxRef.current = best;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || banners.length <= 1) return;
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", resume);
    el.addEventListener("pointercancel", resume);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    const timer = setInterval(() => {
      if (paused) return;
      const next = idxRef.current + 1 >= el.children.length ? 0 : idxRef.current + 1;
      goTo(next);
    }, 4500);
    return () => {
      clearInterval(timer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resume);
      el.removeEventListener("pointercancel", resume);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [banners.length]);

  const ordered = useMemo(() => {
    const rank = (b: PublicBanner) => {
      if (city && b.cities.some((c) => c.toLowerCase() === city.toLowerCase())) return 0;
      if (city && b.project_city && b.project_city.toLowerCase() === city.toLowerCase()) return 0;
      if (b.gujarat_wide) return 1;
      return 2;
    };
    return [...banners].map((b, i) => ({ b, i })).sort((a, z) => rank(a.b) - rank(z.b) || a.i - z.i).map((x) => x.b);
  }, [banners, city]);

  if (ordered.length === 0) return null;

  return (
    <section className="border-b border-border bg-surface-subtle py-6" aria-label="Sponsored top picks">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Top picks</h2>
            <p className="text-xs text-ink-muted">Explore top living options with us</p>
          </div>
          {ordered.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous" className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-ink hover:bg-surface-muted">‹</button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Next" className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-ink hover:bg-surface-muted">›</button>
            </div>
          )}
        </div>

        <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
          {ordered.map((b) => <TopPickCard key={b.id} b={b} />)}
        </div>
      </div>
    </section>
  );
}

function TopPickCard({ b }: { b: PublicBanner }) {
  const desktop = b.desktop_image_url || b.mobile_image_url || "";
  const mobile = b.mobile_image_url || desktop;
  const place = [b.project_locality, b.project_city].filter(Boolean).join(", ");
  const viewProjects = b.city_slug ? `/search?entity=project&city=${b.city_slug}` : "/search?entity=project";

  return (
    <div className="flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft sm:w-[760px] sm:flex-row">
      {/* Project card — below image on mobile, left on desktop */}
      <div className="order-2 flex flex-col justify-between gap-3 p-4 sm:order-1 sm:w-[40%] sm:shrink-0">
        <div>
          {b.advertiser_name && <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{b.advertiser_name}</p>}
          <Link href={viewProjects} className="text-[11px] font-medium text-brand hover:underline">View Projects</Link>
          <Link href={b.destination_url} className="mt-2 block line-clamp-2 text-base font-semibold text-ink hover:text-brand">{b.project_title}</Link>
          {place && <p className="mt-0.5 text-xs text-ink-muted">{place}</p>}
          {b.price_label && <p className="mt-2 text-sm font-semibold text-ink">{b.price_label}</p>}
          {b.bhk_label && <p className="text-xs text-ink-muted">{b.bhk_label}</p>}
        </div>
        <Link href={b.destination_url} className="inline-flex justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">
          {b.cta_label || "Contact"}
        </Link>
      </div>

      {/* Creative — top on mobile (full width), right on desktop */}
      <Link href={b.destination_url} className="relative order-1 block overflow-hidden bg-surface-muted sm:order-2 sm:flex-1" aria-label={b.project_title} draggable={false}>
        <picture>
          {b.mobile_image_url && <source media="(max-width: 640px)" srcSet={mobile} />}
          <img src={desktop} alt={b.project_title} loading="lazy" draggable={false}
            className="block h-44 w-full max-w-full select-none object-cover sm:h-full sm:min-h-[260px]" />
        </picture>
        <SponsoredLabel className="absolute right-2 top-2" />
      </Link>
    </div>
  );
}
