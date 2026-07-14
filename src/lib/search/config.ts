import { PROPERTY_TYPES_BY_CATEGORY } from "@/lib/validators/property";
import { PROJECT_TYPES } from "@/lib/validators/project";
import { REQUIREMENT_CATEGORIES } from "@/lib/validators/requirement";

export type Purpose =
  "buy" | "rent" | "commercial" | "land" | "projects" | "pg" | "requirements";

export interface SearchTab {
  purpose: Purpose;
  label: string;
  placeholder: string;
  emptyTitle: string;
  emptyHint: string;
}

export const SEARCH_TABS: SearchTab[] = [
  {
    purpose: "buy",
    label: "Buy",
    placeholder: "Search city, locality, society, project or property ID",
    emptyTitle: "No properties found",
    emptyHint: "Try changing budget, BHK or locality.",
  },
  {
    purpose: "rent",
    label: "Rent",
    placeholder: "Search rentals by city, area, society or landmark",
    emptyTitle: "No rentals found",
    emptyHint: "Try changing rent range or move-in preference.",
  },
  {
    purpose: "commercial",
    label: "Commercial",
    placeholder: "Search shops, offices, showrooms or commercial spaces",
    emptyTitle: "No commercial spaces found",
    emptyHint: "Try changing business type or area.",
  },
  {
    purpose: "land",
    label: "Land / Plots",
    placeholder: "Search plots, land, village, survey area or locality",
    emptyTitle: "No land or plots found",
    emptyHint: "Try changing area, location or budget.",
  },
  {
    purpose: "projects",
    label: "Projects",
    placeholder: "Search projects, builders or RERA number",
    emptyTitle: "No projects found",
    emptyHint: "Try changing city, builder or possession date.",
  },
  {
    purpose: "pg",
    label: "PG / Hostel",
    placeholder: "Search PG, hostel, co-living or area",
    emptyTitle: "No PG / hostel options found",
    emptyHint: "Try changing sharing type or locality.",
  },
  {
    purpose: "requirements",
    label: "Requirements",
    placeholder: "Search buyer requirements by city, budget or property type",
    emptyTitle: "No matching requirements found",
    emptyHint: "Try changing city or property type.",
  },
];

export function getTabConfig(purpose: Purpose): SearchTab {
  return SEARCH_TABS.find((t) => t.purpose === purpose) ?? SEARCH_TABS[0];
}

// ---------------------------------------------------------------------------
// Search "Type" filter options — sourced 1:1 from the canonical enums, NOT a
// hand-typed sample (CLAUDE.md "DESIGN LISTS ARE SAMPLES — BUILD THE COMPLETE
// REAL SET"). Every option value is already a canonical enum value, so it maps
// straight through to the real column filter (no dead options). Each tab shows
// the COMPLETE set for its scope category (see TAB_SCOPE): buy/rent →
// residential, commercial → commercial, land → land_plot, pg → pg_hostel_room,
// projects → project_type enum, requirements → requirement category enum.
// If a canonical enum grows, these lists grow automatically.
// ---------------------------------------------------------------------------

// Human labels for canonical enum values. Any value missing here falls back to
// a title-cased version of the enum value, so a new enum member is never hidden.
const TYPE_LABELS: Record<string, string> = {
  // residential (property_type)
  flat_apartment: "Flat / Apartment",
  tenament: "Tenament",
  bungalow: "Bungalow",
  villa: "Villa",
  row_house: "Row House",
  farm_house: "Farm House",
  penthouse: "Penthouse",
  studio: "Studio",
  independent_house: "Independent House",
  // commercial (property_type)
  shop: "Shop",
  office: "Office Space",
  showroom: "Showroom",
  commercial_land: "Commercial Land",
  commercial_building: "Commercial Building",
  co_working_space: "Co-working Space",
  warehouse_commercial: "Warehouse (Commercial)",
  // land_plot (property_type)
  residential_plot: "Residential Plot",
  commercial_plot: "Commercial Plot",
  industrial_plot: "Industrial Plot",
  agricultural_land: "Agricultural Land",
  non_agricultural_land: "NA Land",
  farm_land: "Farm Land",
  open_land: "Open Land",
  // pg_hostel_room (property_type)
  pg: "Paying Guest (PG)",
  hostel: "Hostel",
  room: "Room",
  shared_room: "Shared Room",
  single_room: "Single Room",
  paying_guest: "Co-living / PG",
  // project_type
  apartment_project: "Apartment Project",
  villa_project: "Villa Project",
  plotting_project: "Plotted Development",
  commercial_project: "Commercial Project",
  industrial_project: "Industrial Project",
  township_project: "Township",
  mixed_use_project: "Mixed-use Project",
  society_project: "Society Project",
  industrial_zone_project: "Industrial Zone",
  // requirement category
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  land_plot: "Land / Plot",
  pg_hostel_room: "PG / Hostel / Room",
  business: "Business",
  project: "Project",
};

function titleCase(v: string): string {
  return v
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function toOptions(
  values: readonly string[]
): { value: string; label: string }[] {
  return values.map((v) => ({ value: v, label: TYPE_LABELS[v] ?? titleCase(v) }));
}

export const PROPERTY_TYPES: Record<
  Purpose,
  { value: string; label: string }[]
> = {
  buy: toOptions(PROPERTY_TYPES_BY_CATEGORY.residential),
  rent: toOptions(PROPERTY_TYPES_BY_CATEGORY.residential),
  commercial: toOptions(PROPERTY_TYPES_BY_CATEGORY.commercial),
  land: toOptions(PROPERTY_TYPES_BY_CATEGORY.land_plot),
  projects: toOptions(PROJECT_TYPES),
  pg: toOptions(PROPERTY_TYPES_BY_CATEGORY.pg_hostel_room),
  // Requirements filter by canonical requirement CATEGORY (the real filterable
  // column on public_requirements_view); the backend maps this to `category`.
  requirements: toOptions(REQUIREMENT_CATEGORIES),
};

export const BHK_OPTIONS = [
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4 BHK" },
  { value: "4+", label: "4+ BHK" },
];

export const PURPOSES_WITH_BHK: Purpose[] = [
  "buy",
  "rent",
  "projects",
  "requirements",
];

export function showsBhk(purpose: Purpose): boolean {
  return PURPOSES_WITH_BHK.includes(purpose);
}

export type BudgetPreset = { label: string; min?: number; max?: number };

export const BUDGET_PRESETS: Record<Purpose, BudgetPreset[]> = {
  buy: [
    { label: "Under ₹25L", max: 2500000 },
    { label: "₹25L – ₹50L", min: 2500000, max: 5000000 },
    { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
    { label: "Above ₹2Cr", min: 20000000 },
  ],
  rent: [
    { label: "Under ₹5K", max: 5000 },
    { label: "₹5K – ₹10K", min: 5000, max: 10000 },
    { label: "₹10K – ₹20K", min: 10000, max: 20000 },
    { label: "₹20K – ₹40K", min: 20000, max: 40000 },
    { label: "Above ₹40K", min: 40000 },
  ],
  commercial: [
    { label: "Under ₹10L", max: 1000000 },
    { label: "₹10L – ₹50L", min: 1000000, max: 5000000 },
    { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
    { label: "Above ₹1Cr", min: 10000000 },
  ],
  land: [
    { label: "Under ₹10L", max: 1000000 },
    { label: "₹10L – ₹50L", min: 1000000, max: 5000000 },
    { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
    { label: "Above ₹2Cr", min: 20000000 },
  ],
  projects: [
    { label: "Under ₹30L", max: 3000000 },
    { label: "₹30L – ₹75L", min: 3000000, max: 7500000 },
    { label: "₹75L – ₹1.5Cr", min: 7500000, max: 15000000 },
    { label: "Above ₹1.5Cr", min: 15000000 },
  ],
  pg: [
    { label: "Under ₹3K", max: 3000 },
    { label: "₹3K – ₹6K", min: 3000, max: 6000 },
    { label: "₹6K – ₹12K", min: 6000, max: 12000 },
    { label: "Above ₹12K", min: 12000 },
  ],
  requirements: [
    { label: "Under ₹25L", max: 2500000 },
    { label: "₹25L – ₹75L", min: 2500000, max: 7500000 },
    { label: "₹75L – ₹1.5Cr", min: 7500000, max: 15000000 },
    { label: "Above ₹1.5Cr", min: 15000000 },
  ],
};

export const BUDGET_LABEL: Record<Purpose, string> = {
  buy: "Budget",
  rent: "Monthly Rent",
  commercial: "Price / Rent",
  land: "Total Price",
  projects: "Starting Price",
  pg: "Monthly Rent",
  requirements: "Budget",
};

export function parsePurpose(raw: string | undefined): Purpose {
  const valid: Purpose[] = [
    "buy",
    "rent",
    "commercial",
    "land",
    "projects",
    "pg",
    "requirements",
  ];
  return valid.includes(raw as Purpose) ? (raw as Purpose) : "buy";
}

// ---------------------------------------------------------------------------
// Furnishing filter — residential buy/rent only
// Values match the `furnishing_status` enum on properties (Prompt 04 schema),
// NOT the old project's values — adapted deliberately, real data only.
// ---------------------------------------------------------------------------

export const FURNISHING_FILTER_OPTIONS = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi_furnished", label: "Semi-Furnished" },
  { value: "fully_furnished", label: "Furnished" },
];

export const PURPOSES_WITH_FURNISHING: Purpose[] = ["buy", "rent"];

export function showsFurnishing(purpose: Purpose): boolean {
  return PURPOSES_WITH_FURNISHING.includes(purpose);
}

// ---------------------------------------------------------------------------
// Sort options — limited to sorts the backend actually implements
// (src/lib/actions/public-search.ts SearchSort). No "relevance" — not
// implemented, so not shown (CLAUDE.md: don't show unimplemented sort).
// ---------------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_low_to_high", label: "Price: Low to High" },
  { value: "price_high_to_low", label: "Price: High to Low" },
  { value: "rent_low_to_high", label: "Rent: Low to High" },
  { value: "rent_high_to_low", label: "Rent: High to Low" },
  { value: "area_high_to_low", label: "Area: High to Low" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ---------------------------------------------------------------------------
// Search-tab -> real entity/category/purpose scope mapping.
// Our schema separates entity (property/project/requirement), category
// (residential/commercial/industrial/land_plot/pg_hostel_room/business) and
// purpose (sell/rent/lease/pg/business_sale) — the old project's tabs mixed
// all three into one `Purpose` value. This maps each tab to real query scope.
// ---------------------------------------------------------------------------

export interface SearchScope {
  entity: "property" | "project" | "requirement";
  category?: string;
  purpose?: string;
}

export const TAB_SCOPE: Record<Purpose, SearchScope> = {
  buy: { entity: "property", category: "residential", purpose: "sell" },
  rent: { entity: "property", category: "residential", purpose: "rent" },
  commercial: { entity: "property", category: "commercial" },
  land: { entity: "property", category: "land_plot" },
  projects: { entity: "project" },
  pg: { entity: "property", category: "pg_hostel_room", purpose: "pg" },
  requirements: { entity: "requirement" },
};

/**
 * Transliteration / typo-tolerant search (design Batch 3 add-on).
 * Maps common Gujarati/Hindi transliterations + frequent misspellings of Gujarat
 * cities to their canonical English names, so `/search?q=amdavad` or `q=baroda`
 * still matches Ahmedabad / Vadodara listings. Whole-word aliasing only.
 */
const CITY_ALIASES: Record<string, string> = {
  amdavad: "ahmedabad",
  amadavad: "ahmedabad",
  ahmdabad: "ahmedabad",
  ahemdabad: "ahmedabad",
  amdabad: "ahmedabad",
  baroda: "vadodara",
  vadodra: "vadodara",
  surrat: "surat",
  rajkott: "rajkot",
  bhavngar: "bhavnagar",
  jamngar: "jamnagar",
  junagad: "junagadh",
  gandhingar: "gandhinagar",
};

/**
 * Expand a raw search string into a small, sanitized set of candidate terms
 * (the original + any transliteration/typo-corrected variants). Each term is
 * stripped to `[a-z0-9 ]` so it is safe to interpolate into a PostgREST `.or()`
 * ilike filter. Returns [] for an empty/blank query.
 */
export function expandSearchTerms(raw: string | undefined | null): string[] {
  const base = (raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!base) return [];
  const terms = new Set<string>([base]);

  // whole-string alias
  if (CITY_ALIASES[base]) terms.add(CITY_ALIASES[base]);

  // per-word alias — rebuild the phrase with any aliased words substituted
  const words = base.split(" ");
  if (words.some((w) => CITY_ALIASES[w])) {
    terms.add(words.map((w) => CITY_ALIASES[w] ?? w).join(" "));
  }

  return Array.from(terms)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 5);
}
