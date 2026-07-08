import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { CityProvider } from "@/components/location/CityProvider";
import { AuthModalProvider } from "@/components/auth/AuthModalProvider";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { CompareTray } from "@/components/compare/CompareTray";
import {
  parseSearchParams,
  searchPublicListings,
  type SearchParams,
} from "@/lib/actions/public-search";
import { parsePurpose, TAB_SCOPE } from "@/lib/search/config";
import { GUJARAT_CITIES } from "@/components/location/CityProvider";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { safeDescription, canonicalUrl } from "@/lib/seo";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function str(v: string | string[] | undefined): string | undefined {
  const s = Array.isArray(v) ? v[0] : v;
  return s && s.trim() !== "" ? s.trim() : undefined;
}

/** Converts the search screen's tab-based URL (tab/bhk/type/furnishing/min_price/max_price/min_area/max_area) into real backend SearchParams, using the tab -> entity/category/purpose scope map. */
function buildSearchParams(
  raw: Record<string, string | string[] | undefined>
): SearchParams {
  const tab = parsePurpose(str(raw.tab));
  const scope = TAB_SCOPE[tab];
  const isRentLike = scope.purpose === "rent" || scope.purpose === "pg";
  const minPrice = str(raw.min_price);
  const maxPrice = str(raw.max_price);

  return parseSearchParams({
    q: raw.q,
    entity: scope.entity,
    category: scope.category,
    purpose: scope.purpose,
    type: raw.type,
    bhk: raw.bhk,
    furnishing: raw.furnishing,
    posted_by: raw.posted_by,
    city: raw.city,
    price_min: isRentLike ? undefined : minPrice,
    price_max: isRentLike ? undefined : maxPrice,
    rent_min: isRentLike ? minPrice : undefined,
    rent_max: isRentLike ? maxPrice : undefined,
    area_min: raw.min_area,
    area_max: raw.max_area,
    sort: raw.sort,
    page: raw.page,
  });
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const raw = await searchParams;
  const tab = parsePurpose(str(raw.tab));
  const city = str(raw.city);
  const hasFilters = Boolean(
    str(raw.q) ||
    city ||
    raw.bhk ||
    raw.type ||
    raw.furnishing ||
    raw.min_price ||
    raw.max_price
  );

  const title = `${tab.charAt(0).toUpperCase() + tab.slice(1)} Properties${city ? ` in ${city}` : ""}`;

  return {
    title,
    description: safeDescription(
      city ? `Browse verified properties in ${city}, Gujarat.` : undefined,
      "Search properties, projects and requirements across Gujarat on My Gujarat Property."
    ),
    alternates: { canonical: canonicalUrl("/search") },
    // Thin/empty/unfiltered search pages should not be indexed — only real,
    // filtered results with content are worth ranking (SEO thin-content rule).
    robots: hasFilters
      ? { index: false, follow: true }
      : { index: false, follow: false },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const [profile, raw] = await Promise.all([getCurrentProfile(), searchParams]);
  const params = buildSearchParams(raw);
  const results = await searchPublicListings(params);

  // The Search screen has its OWN header (SearchShellHeader) — NO site
  // mega-menu header and NO footer (STRICT 1:1 screen rule). We wrap only the
  // providers the screen needs.
  return (
    <CityProvider>
      <AuthModalProvider>
        <CompareProvider>
          <SearchResultsClient
            results={results}
            cities={GUJARAT_CITIES}
            profile={profile}
          />
          <CompareTray />
        </CompareProvider>
      </AuthModalProvider>
    </CityProvider>
  );
}
