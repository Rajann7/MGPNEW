import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { expandSearchTerms } from "@/lib/search/config";

// ============================================================
// Public Search / Detail Data Layer
// Reads ONLY from public-safe views (public_properties_view,
// public_projects_view, public_requirements_view,
// public_broker_profiles_view, public_builder_profiles_view).
// No private tables. No select *. No unbounded reads.
// Used by: /search, /property/[slug], /project/[slug],
//          /broker/[slug], /builder/[slug], sitemap.ts
// ============================================================

export const PAGE_SIZE = 20;
export const MAX_PAGE = 500; // hard cap to prevent unbounded deep pagination

export type SearchEntity = "property" | "project" | "requirement" | "all";

export type SearchSort =
  | "newest"
  | "price_low_to_high"
  | "price_high_to_low"
  | "rent_low_to_high"
  | "rent_high_to_low"
  | "area_high_to_low";

export interface SearchParams {
  q?: string;
  purpose?: string;
  entity?: SearchEntity;
  category?: string;
  type?: string;
  city?: string;
  district?: string;
  taluka?: string;
  area?: string;
  locality?: string;
  budget_min?: number;
  budget_max?: number;
  price_min?: number;
  price_max?: number;
  rent_min?: number;
  rent_max?: number;
  area_min?: number;
  area_max?: number;
  bedrooms?: number;
  /** Comma-separated BHK selections from the search UI, e.g. "1,2,4+". */
  bhk?: string;
  /** `furnishing_status` enum value (unfurnished/semi_furnished/fully_furnished). */
  furnishing?: string;
  posted_by?: string;
  sort?: SearchSort;
  page?: number;
}

const ALLOWED_ENTITIES: SearchEntity[] = [
  "property",
  "project",
  "requirement",
  "all",
];
const ALLOWED_SORTS: SearchSort[] = [
  "newest",
  "price_low_to_high",
  "price_high_to_low",
  "rent_low_to_high",
  "rent_high_to_low",
  "area_high_to_low",
];
const ALLOWED_POSTED_BY = ["owner", "broker", "builder"];

/** Parses and safely clamps raw searchParams (strings from URL) into typed, bounded values. */
export function parseSearchParams(
  raw: Record<string, string | string[] | undefined>
): SearchParams {
  const str = (k: string): string | undefined => {
    const v = raw[k];
    const s = Array.isArray(v) ? v[0] : v;
    return s && s.trim() !== "" ? s.trim() : undefined;
  };
  const num = (k: string): number | undefined => {
    const s = str(k);
    if (!s) return undefined;
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  };

  const entity = str("entity");
  const sort = str("sort");
  const postedBy = str("posted_by");
  const page = num("page");

  return {
    q: str("q")?.slice(0, 120),
    purpose: str("purpose")?.slice(0, 40),
    entity:
      entity && ALLOWED_ENTITIES.includes(entity as SearchEntity)
        ? (entity as SearchEntity)
        : "all",
    category: str("category")?.slice(0, 40),
    type: str("type")?.slice(0, 60),
    city: str("city")?.slice(0, 80),
    district: str("district")?.slice(0, 80),
    taluka: str("taluka")?.slice(0, 80),
    area: str("area")?.slice(0, 80),
    locality: str("locality")?.slice(0, 80),
    budget_min: num("budget_min"),
    budget_max: num("budget_max"),
    price_min: num("price_min"),
    price_max: num("price_max"),
    rent_min: num("rent_min"),
    rent_max: num("rent_max"),
    area_min: num("area_min"),
    area_max: num("area_max"),
    bedrooms: num("bedrooms"),
    bhk: str("bhk")?.slice(0, 40),
    furnishing: str("furnishing")?.slice(0, 40),
    posted_by:
      postedBy && ALLOWED_POSTED_BY.includes(postedBy) ? postedBy : undefined,
    sort:
      sort && ALLOWED_SORTS.includes(sort as SearchSort)
        ? (sort as SearchSort)
        : "newest",
    page: page && page > 0 ? Math.min(Math.floor(page), MAX_PAGE) : 1,
  };
}

export interface PublicPropertyCard {
  id: string;
  title: string;
  slug: string | null;
  purpose: string;
  category: string;
  property_type: string;
  price: number | null;
  rent_amount: number | null;
  area_value: number | null;
  area_unit: string | null;
  bedrooms: number | null;
  city_text: string | null;
  locality_text: string | null;
  cover_media_id: string | null;
  poster_role: string;
  published_at: string | null;
}

export interface PublicProjectCard {
  id: string;
  project_name: string;
  slug: string | null;
  project_type: string;
  category: string;
  purpose: string;
  price_min: number | null;
  price_max: number | null;
  price_visible: boolean;
  possession_date: string | null;
  construction_status: string | null;
  rera_registered: boolean;
  rera_number: string | null;
  city_text: string | null;
  locality_text: string | null;
  cover_media_id: string | null;
  builder_profile_id: string;
  published_at: string | null;
}

export interface PublicRequirementCard {
  id: string;
  title: string;
  slug: string | null;
  purpose: string;
  category: string;
  requirement_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
  rent_min: number | null;
  rent_max: number | null;
  city_text: string | null;
  preferred_localities_text: string | null;
  poster_role: string;
  published_at: string | null;
}

export interface SearchResults {
  properties: PublicPropertyCard[];
  projects: PublicProjectCard[];
  requirements: PublicRequirementCard[];
  page: number;
  pageSize: number;
  hasMore: boolean;
}

const PROPERTY_COLUMNS =
  "id, title, slug, purpose, category, property_type, price, rent_amount, area_value, area_unit, bedrooms, city_text, locality_text, cover_media_id, poster_role, published_at";
const PROJECT_COLUMNS =
  "id, project_name, slug, project_type, category, purpose, price_min, price_max, price_visible, possession_date, construction_status, rera_registered, rera_number, city_text, locality_text, cover_media_id, builder_profile_id, published_at";
const REQUIREMENT_COLUMNS =
  "id, title, slug, purpose, category, requirement_type, budget_min, budget_max, rent_min, rent_max, city_text, preferred_localities_text, poster_role, published_at";

/**
 * Runs the public search across the requested entity view(s).
 * Bounded (LIMIT), server-side filtered, sort field allow-listed.
 * No raw user input reaches SQL — only through supabase-js query builder (parameterized).
 */
export async function searchPublicListings(
  params: SearchParams
): Promise<SearchResults> {
  const supabase = await createClient();
  const page = params.page && params.page > 0 ? params.page : 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE; // fetch one extra to detect hasMore

  const entity = params.entity ?? "all";
  const wantProperties = entity === "all" || entity === "property";
  const wantProjects = entity === "all" || entity === "project";
  const wantRequirements = entity === "all" || entity === "requirement";

  let properties: PublicPropertyCard[] = [];
  let projects: PublicProjectCard[] = [];
  let requirements: PublicRequirementCard[] = [];
  let hasMore = false;

  if (wantProperties) {
    let q = supabase
      .from("public_properties_view")
      .select(PROPERTY_COLUMNS)
      .range(from, to);
    if (params.q) {
      // Typo/transliteration-tolerant: match title OR city OR locality across
      // the expanded (sanitized) term set. Terms are `[a-z0-9 ]`-only → safe in .or().
      const terms = expandSearchTerms(params.q);
      if (terms.length) {
        const orClause = terms
          .flatMap((t) => [
            `title.ilike.*${t}*`,
            `city_text.ilike.*${t}*`,
            `locality_text.ilike.*${t}*`,
          ])
          .join(",");
        q = q.or(orClause);
      }
    }
    if (params.purpose) q = q.eq("purpose", params.purpose);
    if (params.category) q = q.eq("category", params.category);
    if (params.type) {
      const types = params.type
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 20);
      if (types.length === 1) q = q.eq("property_type", types[0]);
      else if (types.length > 1) q = q.in("property_type", types);
    }
    if (params.city) q = q.ilike("city_text", `%${params.city}%`);
    if (params.locality) q = q.ilike("locality_text", `%${params.locality}%`);
    if (params.bedrooms) q = q.eq("bedrooms", params.bedrooms);
    if (params.bhk) {
      // Only digits 1-4 or the literal "4+" are accepted — safe to interpolate into .or().
      const tokens = params.bhk
        .split(",")
        .map((t) => t.trim())
        .filter((t) => /^[1-4]$|^4\+$/.test(t))
        .slice(0, 10);
      const numeric = tokens.filter((t) => t !== "4+").map(Number);
      const hasPlus = tokens.includes("4+");
      if (hasPlus && numeric.length)
        q = q.or(`bedrooms.gte.4,bedrooms.in.(${numeric.join(",")})`);
      else if (hasPlus) q = q.gte("bedrooms", 4);
      else if (numeric.length === 1) q = q.eq("bedrooms", numeric[0]);
      else if (numeric.length > 1) q = q.in("bedrooms", numeric);
    }
    if (params.furnishing) q = q.eq("furnishing_status", params.furnishing);
    if (params.posted_by) q = q.eq("poster_role", params.posted_by);
    if (params.price_min !== undefined) q = q.gte("price", params.price_min);
    if (params.price_max !== undefined) q = q.lte("price", params.price_max);
    if (params.rent_min !== undefined)
      q = q.gte("rent_amount", params.rent_min);
    if (params.rent_max !== undefined)
      q = q.lte("rent_amount", params.rent_max);
    if (params.area_min !== undefined) q = q.gte("area_value", params.area_min);
    if (params.area_max !== undefined) q = q.lte("area_value", params.area_max);

    switch (params.sort) {
      case "price_low_to_high":
        q = q.order("price", { ascending: true, nullsFirst: false });
        break;
      case "price_high_to_low":
        q = q.order("price", { ascending: false, nullsFirst: false });
        break;
      case "rent_low_to_high":
        q = q.order("rent_amount", { ascending: true, nullsFirst: false });
        break;
      case "rent_high_to_low":
        q = q.order("rent_amount", { ascending: false, nullsFirst: false });
        break;
      case "area_high_to_low":
        q = q.order("area_value", { ascending: false, nullsFirst: false });
        break;
      default:
        q = q.order("published_at", { ascending: false, nullsFirst: false });
    }

    const { data } = await q;
    const rows = (data ?? []) as PublicPropertyCard[];
    if (rows.length > PAGE_SIZE) hasMore = true;
    properties = rows.slice(0, PAGE_SIZE);
  }

  if (wantProjects) {
    let q = supabase
      .from("public_projects_view")
      .select(PROJECT_COLUMNS)
      .range(from, to);
    if (params.q) {
      const terms = expandSearchTerms(params.q);
      if (terms.length) {
        const orClause = terms
          .flatMap((t) => [
            `project_name.ilike.*${t}*`,
            `city_text.ilike.*${t}*`,
            `locality_text.ilike.*${t}*`,
          ])
          .join(",");
        q = q.or(orClause);
      }
    }
    if (params.purpose) q = q.eq("purpose", params.purpose);
    if (params.category) q = q.eq("category", params.category);
    if (params.type) q = q.eq("project_type", params.type);
    if (params.city) q = q.ilike("city_text", `%${params.city}%`);
    if (params.locality) q = q.ilike("locality_text", `%${params.locality}%`);
    if (params.price_min !== undefined)
      q = q.gte("price_max", params.price_min);
    if (params.price_max !== undefined)
      q = q.lte("price_min", params.price_max);

    switch (params.sort) {
      case "price_low_to_high":
        q = q.order("price_min", { ascending: true, nullsFirst: false });
        break;
      case "price_high_to_low":
        q = q.order("price_max", { ascending: false, nullsFirst: false });
        break;
      default:
        q = q.order("published_at", { ascending: false, nullsFirst: false });
    }

    const { data } = await q;
    const rows = (data ?? []) as PublicProjectCard[];
    if (rows.length > PAGE_SIZE) hasMore = true;
    projects = rows.slice(0, PAGE_SIZE);
  }

  // Requirements are visible to VERIFIED Brokers & Builders only — never public,
  // never to guests (locked rule; RLS also enforces this via security_invoker
  // view). This app-layer gate makes the rule explicit and avoids querying at
  // all for anyone who isn't an active, verified broker/builder.
  let canSeeRequirements = false;
  if (wantRequirements) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: prof } = await supabase
        .from("profiles")
        .select("public_role, verification_status, account_status")
        .eq("auth_user_id", user.id)
        .maybeSingle();
      canSeeRequirements =
        !!prof &&
        (prof.public_role === "broker" || prof.public_role === "builder") &&
        prof.verification_status === "verified" &&
        prof.account_status === "active";
    }
  }

  if (wantRequirements && canSeeRequirements) {
    let q = supabase
      .from("public_requirements_view")
      .select(REQUIREMENT_COLUMNS)
      .range(from, to);
    if (params.q) q = q.ilike("title", `%${params.q}%`);
    if (params.purpose) q = q.eq("purpose", params.purpose);
    if (params.category) q = q.eq("category", params.category);
    if (params.city) q = q.ilike("city_text", `%${params.city}%`);
    if (params.posted_by) q = q.eq("poster_role", params.posted_by);
    if (params.budget_min !== undefined)
      q = q.gte("budget_max", params.budget_min);
    if (params.budget_max !== undefined)
      q = q.lte("budget_min", params.budget_max);

    q = q.order("published_at", { ascending: false, nullsFirst: false });

    const { data } = await q;
    const rows = (data ?? []) as PublicRequirementCard[];
    if (rows.length > PAGE_SIZE) hasMore = true;
    requirements = rows.slice(0, PAGE_SIZE);
  }

  return {
    properties,
    projects,
    requirements,
    page,
    pageSize: PAGE_SIZE,
    hasMore,
  };
}

// ============================================================
// Detail lookups (single row by slug, public-safe view only)
// ============================================================

export async function getPublicPropertyBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_properties_view")
    .select(
      "id, title, slug, description, purpose, category, property_type, price, rent_amount, deposit_amount, price_negotiable, area_value, area_unit, built_up_area, carpet_area, plot_area, bedrooms, bathrooms, balconies, floor_number, total_floors, furnishing_status, property_age, possession_status, available_from, facing, parking, amenities, city_text, locality_text, building_name, landmark, pin_code, approx_latitude, approx_longitude, cover_media_id, media_count, status, published_at, poster_role, owner_profile_id, contact_visibility"
    )
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

/**
 * Resolves the poster's real mobile number for direct display on the detail
 * page, honoring the listing's own contact_visibility choice — never a fake
 * or placeholder number. Returns null whenever the rule doesn't allow a
 * direct reveal (those cases keep using the existing lead-based reveal flow
 * instead, they are not treated as "no number").
 *   - hidden               -> never shown here
 *   - public                -> shown to everyone, including guests
 *   - show_after_login      -> shown once the viewer is logged in
 *   - show_to_verified_users-> shown once the viewer is a verified user
 *   - show_after_approval   -> not shown here (needs the lead approval flow)
 */
export async function getPublicListingDirectPhone(
  ownerProfileId: string,
  contactVisibility: string | null | undefined,
  viewer: { isLoggedIn: boolean; isVerified: boolean }
): Promise<string | null> {
  const visibility = contactVisibility ?? "show_after_login";
  const eligible =
    visibility === "public" ||
    (visibility === "show_after_login" && viewer.isLoggedIn) ||
    (visibility === "show_to_verified_users" &&
      viewer.isLoggedIn &&
      viewer.isVerified);
  if (!eligible) return null;

  const admin = createServiceClient();
  const { data } = await admin
    .from("profiles")
    .select("mobile")
    .eq("id", ownerProfileId)
    .maybeSingle();
  return data?.mobile ?? null;
}

export async function getPublicProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_projects_view")
    .select(
      "id, project_name, slug, short_description, project_type, category, purpose, price_min, price_max, price_visible, total_area_value, total_area_unit, total_towers, total_wings, total_floors, total_units, available_units, unit_configurations, construction_status, possession_date, launch_date, phase_name, rera_registered, rera_number, rera_status, rera_disclaimer_required, amenities, city_text, locality_text, landmark, pin_code, approx_latitude, approx_longitude, cover_media_id, media_count, virtual_tour_url, published_at, builder_profile_id"
    )
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getPublicBrokerBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_broker_profiles_view")
    .select(
      "id, profile_id, agency_name, business_city_id, verification_status, public_slug, display_name, avatar_media_id, city_id"
    )
    .eq("public_slug", slug)
    .maybeSingle();
  return data;
}

/** Public-safe owner profile — only returns a row when the owner has opted
 * into semi_public/public visibility (owner_profiles.privacy_level). Private
 * owners (the default) get null here, which the page turns into a real 404 —
 * "minimal by default" is enforced at the data layer, not just the UI. */
export async function getPublicOwnerByProfileId(profileId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_owner_profiles_view")
    .select("profile_id, display_name, avatar_media_id, city_id, verification_status, created_at")
    .eq("profile_id", profileId)
    .maybeSingle();
  return data;
}

export async function getPublicBuilderBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_builder_profiles_view")
    .select(
      "id, profile_id, company_name, company_type, rera_registered, business_city_id, verification_status, public_slug, display_name, avatar_media_id, city_id"
    )
    .eq("public_slug", slug)
    .maybeSingle();
  return data;
}

/** Resolves a poster's profile_id to their published public slug + display name, for safe uploader links on detail pages. */
export async function getPublicBrokerLinkByProfileId(profileId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_broker_profiles_view")
    .select("public_slug, agency_name, display_name")
    .eq("profile_id", profileId)
    .maybeSingle();
  return data as {
    public_slug: string;
    agency_name: string | null;
    display_name: string | null;
  } | null;
}

export async function getPublicBuilderLinkByProfileId(profileId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_builder_profiles_view")
    .select("public_slug, company_name, display_name")
    .eq("profile_id", profileId)
    .maybeSingle();
  return data as {
    public_slug: string;
    company_name: string | null;
    display_name: string | null;
  } | null;
}

/** Approved+published properties for a given profile (broker). Bounded. */
export async function getPublicPropertiesByProfile(
  profileId: string,
  limit = 24
) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_properties_view")
    .select(PROPERTY_COLUMNS)
    .eq("owner_profile_id", profileId)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as PublicPropertyCard[];
}

/** Approved+published projects for a given builder profile. Bounded. */
export async function getPublicProjectsByBuilder(
  builderProfileId: string,
  limit = 24
) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_projects_view")
    .select(PROJECT_COLUMNS)
    .eq("builder_profile_id", builderProfileId)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as PublicProjectCard[];
}

/** Similar published properties — same city, same purpose, excluding the current
 * listing. Bounded. Used by the detail-page "Similar properties" section. */
export async function getSimilarProperties(opts: {
  excludeId: string;
  city: string | null;
  purpose: string | null;
  limit?: number;
}): Promise<PublicPropertyCard[]> {
  const supabase = await createClient();
  let q = supabase
    .from("public_properties_view")
    .select(PROPERTY_COLUMNS)
    .neq("id", opts.excludeId);
  if (opts.city) q = q.eq("city_text", opts.city);
  if (opts.purpose) q = q.eq("purpose", opts.purpose);
  const { data } = await q
    .order("published_at", { ascending: false })
    .limit(opts.limit ?? 3);
  return (data ?? []) as PublicPropertyCard[];
}

/** Similar published projects — same city, excluding the current project. Bounded. */
export async function getSimilarProjects(opts: {
  excludeId: string;
  city: string | null;
  limit?: number;
}): Promise<PublicProjectCard[]> {
  const supabase = await createClient();
  let q = supabase
    .from("public_projects_view")
    .select(PROJECT_COLUMNS)
    .neq("id", opts.excludeId);
  if (opts.city) q = q.eq("city_text", opts.city);
  const { data } = await q
    .order("published_at", { ascending: false })
    .limit(opts.limit ?? 3);
  return (data ?? []) as PublicProjectCard[];
}

// ============================================================
// Sitemap helpers — bounded lists of published slugs only
// ============================================================

export async function getAllPublicPropertySlugs(limit = 5000) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_properties_view")
    .select("slug, published_at")
    .not("slug", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as { slug: string; published_at: string | null }[];
}

export async function getAllPublicProjectSlugs(limit = 5000) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_projects_view")
    .select("slug, published_at")
    .not("slug", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as { slug: string; published_at: string | null }[];
}

export async function getAllPublicBrokerSlugs(limit = 5000) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_broker_profiles_view")
    .select("public_slug")
    .not("public_slug", "is", null)
    .limit(limit);
  return (data ?? []) as { public_slug: string }[];
}

export async function getAllPublicBuilderSlugs(limit = 5000) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("public_builder_profiles_view")
    .select("public_slug")
    .not("public_slug", "is", null)
    .limit(limit);
  return (data ?? []) as { public_slug: string }[];
}
