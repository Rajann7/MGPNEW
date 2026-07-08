// Public-safe display formatting helpers for search/detail/profile pages.
// No business logic here — pure presentation.

const AREA_UNIT_LABELS: Record<string, string> = {
  sq_ft: "sq ft",
  sq_m: "sq m",
  sq_yd: "sq yd",
  acre: "acre",
  bigha: "bigha",
  guntha: "guntha",
  hectare: "hectare",
};

/** Formats an amount in Indian numbering (Lakh/Crore) with ₹ prefix. Returns null if amount is missing. */
export function formatINR(amount: number | null | undefined): string | null {
  if (amount === null || amount === undefined || Number.isNaN(amount))
    return null;
  if (amount >= 10000000)
    return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  if (amount >= 100000)
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatArea(
  value: number | null | undefined,
  unit: string | null | undefined
): string | null {
  if (!value) return null;
  const unitLabel = (unit && AREA_UNIT_LABELS[unit]) || unit || "";
  return `${value.toLocaleString("en-IN")} ${unitLabel}`.trim();
}

/** Property/project price line: sale price, rent, or a "price on request" fallback. No fake price shown. */
export function formatPropertyPrice(p: {
  purpose: string;
  price?: number | null;
  rent_amount?: number | null;
}): string {
  if (p.purpose === "rent" || p.purpose === "lease" || p.purpose === "pg") {
    const rent = formatINR(p.rent_amount ?? null);
    return rent ? `${rent}/month` : "Rent on request";
  }
  const price = formatINR(p.price ?? null);
  return price ?? "Price on request";
}

export function formatProjectPrice(p: {
  price_visible: boolean;
  price_min?: number | null;
  price_max?: number | null;
}): string {
  if (!p.price_visible) return "Price on request";
  const min = formatINR(p.price_min ?? null);
  const max = formatINR(p.price_max ?? null);
  if (min && max && p.price_min !== p.price_max) return `${min} – ${max}`;
  return min ?? max ?? "Price on request";
}

export function formatBudgetRange(
  min?: number | null,
  max?: number | null
): string {
  const minS = formatINR(min ?? null);
  const maxS = formatINR(max ?? null);
  if (minS && maxS) return `${minS} – ${maxS}`;
  if (minS) return `From ${minS}`;
  if (maxS) return `Up to ${maxS}`;
  return "Budget on request";
}

/** Safe title-casing for enum-like values (e.g. "row_house" -> "Row House"). */
export function labelize(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .split(/[_\s]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function locationLabel(
  city?: string | null,
  locality?: string | null
): string {
  return [locality, city].filter(Boolean).join(", ") || "Gujarat";
}
