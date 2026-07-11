import { labelize } from "@/lib/search/format";
import {
  Waves,
  Dumbbell,
  Baby,
  Trees,
  ShieldCheck,
  Zap,
  Car,
  ArrowUpDown,
  Gamepad2,
  Building2,
  DoorOpen,
  Fence,
  Sparkles,
  BedDouble,
  Bath,
  Ruler,
  Layers,
  Sofa,
  Compass,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

const KEY_FACT_ICONS: Record<string, LucideIcon> = {
  Bedrooms: BedDouble,
  Bathrooms: Bath,
  Area: Ruler,
  Floor: Layers,
  Furnishing: Sofa,
  Facing: Compass,
  Parking: Car,
  Possession: CalendarClock,
};

/** Key-facts chip row (design Batch 4 · d-prop), rendered directly under the
 * address line. Each chip is built only from a real, non-null field — no
 * hardcoded sample values (CLAUDE.md §3A "design lists are samples"). */
export function KeyFacts({
  items,
}: {
  items: { label: string; value: string | null | undefined }[];
}) {
  const shown = items.filter((i) => i.value != null && String(i.value).trim());
  if (shown.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {shown.map((i) => {
        const Icon = KEY_FACT_ICONS[i.label];
        return (
          <li
            key={i.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700"
          >
            {Icon && (
              <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            )}
            {i.value}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Amenity → icon lookup. Covers the canonical amenity strings used across
 * property/project/requirement forms (src/components/forms/ProjectForm.tsx,
 * RequirementForm.tsx) plus common real-estate amenities. Any amenity not
 * explicitly mapped still renders with a sensible default icon — no amenity
 * is ever dropped (CLAUDE.md "complete real option lists" rule).
 */
const AMENITY_ICON_MAP: Record<string, LucideIcon> = {
  "swimming pool": Waves,
  pool: Waves,
  gymnasium: Dumbbell,
  gym: Dumbbell,
  "children's play area": Baby,
  "childrens play area": Baby,
  "play area": Baby,
  "landscaped garden": Trees,
  garden: Trees,
  "24x7 security": ShieldCheck,
  security: ShieldCheck,
  "gated society": ShieldCheck,
  "power backup": Zap,
  "covered parking": Car,
  parking: Car,
  lift: ArrowUpDown,
  elevator: ArrowUpDown,
  "indoor games": Gamepad2,
  clubhouse: Building2,
  balcony: DoorOpen,
  fencing: Fence,
};

function amenityIcon(label: string): LucideIcon {
  return AMENITY_ICON_MAP[label.trim().toLowerCase()] ?? Sparkles;
}

/** Amenities as a 3-column icon+label grid (design Batch 4). Real values only. */
export function AmenitiesSection({
  amenities,
}: {
  amenities: string[] | null | undefined;
}) {
  const list = (amenities ?? []).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-900">Amenities</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((a) => {
          const Icon = amenityIcon(a);
          return (
            <div
              key={a}
              className="flex items-center gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-3 py-2.5"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 truncate text-xs font-medium text-zinc-700">
                {labelize(a)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Location section: no embedded map (removed per product decision) — the
 * real address is shown and tapping/clicking it opens the visitor's own
 * device maps app (Google Maps universal link, works on iOS/Android/desktop)
 * pointed at the real address text. No fake/broken embed is ever rendered. */
export function LocationSection({
  parts,
}: {
  parts: (string | null | undefined)[];
}) {
  const address = parts.filter((p) => p && String(p).trim()).join(", ");
  if (!address) return null;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-semibold text-zinc-900">Location</h2>
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3.5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-zinc-700">{address}</span>
          <span className="mt-0.5 block text-xs font-medium text-brand">
            Open in Maps →
          </span>
        </span>
      </a>
    </section>
  );
}

/** Available unit configurations for a project (design Batch 4 · Screen 2).
 * Reads the real `unit_configurations` jsonb; hidden when none. */
export function AvailableUnits({ units }: { units: unknown }) {
  const list = Array.isArray(units) ? (units as Record<string, unknown>[]) : [];
  if (list.length === 0) return null;
  const str = (v: unknown) => (v == null ? null : String(v));
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-semibold text-zinc-900">
        Available units
      </h2>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((u, i) => {
          const config =
            str(u.config) ?? str(u.type) ?? str(u.name) ?? `Unit ${i + 1}`;
          const area = str(u.area) ?? str(u.carpet_area) ?? str(u.size);
          const unit = str(u.area_unit) ?? "sq ft";
          const priceFrom = str(u.price_from) ?? str(u.price) ?? str(u.from);
          return (
            <div
              key={i}
              className="rounded-2xl border border-zinc-100 bg-white p-3.5"
            >
              <p className="text-sm font-semibold text-zinc-900">{config}</p>
              {area && (
                <p className="mt-0.5 text-xs text-zinc-500">
                  {area} {unit}
                </p>
              )}
              {priceFrom && (
                <p className="mt-1 text-sm font-bold text-brand">
                  from {priceFrom}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Honest provider-gated media state (design Batch 4: Video / 360° / Brochure
 * "Setup Required" — never a broken player or fake embed). */
export function MediaSetupState({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3">
      <svg
        className="h-5 w-5 shrink-0 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
      <div>
        <p className="text-xs font-semibold text-zinc-700">{title}</p>
        <p className="text-[11px] text-zinc-500">{note}</p>
      </div>
    </div>
  );
}
