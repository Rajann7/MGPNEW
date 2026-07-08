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

export const PROPERTY_TYPES: Record<
  Purpose,
  { value: string; label: string }[]
> = {
  buy: [
    { value: "flat", label: "Flat / Apartment" },
    { value: "house", label: "Independent House" },
    { value: "villa", label: "Villa" },
    { value: "bungalow", label: "Bungalow" },
    { value: "row-house", label: "Row House" },
    { value: "penthouse", label: "Penthouse" },
    { value: "studio", label: "Studio" },
    { value: "farm-house", label: "Farm House" },
    { value: "plot", label: "Plot" },
    { value: "residential-land", label: "Residential Land" },
  ],
  rent: [
    { value: "flat", label: "Flat / Apartment" },
    { value: "house", label: "Independent House" },
    { value: "villa", label: "Villa" },
    { value: "room", label: "Room" },
    { value: "shared-room", label: "Shared Room" },
  ],
  commercial: [
    { value: "shop", label: "Shop" },
    { value: "office", label: "Office Space" },
    { value: "showroom", label: "Showroom" },
    { value: "warehouse", label: "Warehouse" },
    { value: "industrial-shed", label: "Industrial Shed" },
    { value: "factory", label: "Factory" },
    { value: "co-working", label: "Co-working Space" },
    { value: "restaurant-space", label: "Restaurant / Cafe Space" },
    { value: "clinic-space", label: "Clinic / Medical Space" },
    { value: "godown", label: "Godown" },
    { value: "commercial-land", label: "Commercial Land" },
  ],
  land: [
    { value: "residential-plot", label: "Residential Plot" },
    { value: "commercial-plot", label: "Commercial Plot" },
    { value: "industrial-land", label: "Industrial Land" },
    { value: "agricultural-land", label: "Agricultural Land" },
    { value: "farm-land", label: "Farm Land" },
    { value: "na-land", label: "NA Land" },
    { value: "open-land", label: "Open Land" },
    { value: "investment-land", label: "Investment Land" },
  ],
  projects: [
    { value: "residential-project", label: "Residential Project" },
    { value: "commercial-project", label: "Commercial Project" },
    { value: "township", label: "Township" },
    { value: "plotted-development", label: "Plotted Development" },
  ],
  pg: [
    { value: "boys-pg", label: "Boys PG" },
    { value: "girls-pg", label: "Girls PG" },
    { value: "co-living", label: "Co-living" },
    { value: "student-hostel", label: "Student Hostel" },
    { value: "working-hostel", label: "Working Hostel" },
  ],
  requirements: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land / Plot" },
    { value: "pg", label: "PG / Hostel" },
  ],
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
