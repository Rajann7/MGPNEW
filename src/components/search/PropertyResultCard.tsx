import Link from "next/link";
import type { PublicPropertyCard } from "@/lib/actions/public-search";
import {
  formatPropertyPrice,
  labelize,
  locationLabel,
} from "@/lib/search/format";
import { CompareButton } from "@/components/compare/CompareButton";

/** Search result card — visual language ported from the old project's PropertyCard. */
export function PropertyResultCard({
  property,
  showCompare = true,
}: {
  property: PublicPropertyCard;
  showCompare?: boolean;
}) {
  if (!property.slug) return null;

  const facts = [
    property.bedrooms ? `${property.bedrooms} BHK` : null,
    property.area_value
      ? `${property.area_value} ${property.area_unit ?? "sq ft"}`
      : null,
    property.property_type.replace(/_/g, " "),
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/property/${property.slug}`}
      className="group block overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow hover:shadow-card"
      draggable={false}
    >
      <div className="relative aspect-[16/10] bg-surface-muted flex items-center justify-center">
        {showCompare && (
          <CompareButton
            item={{
              id: property.id,
              kind: "property",
              slug: property.slug,
              title: property.title,
              price: formatPropertyPrice(property),
              location: locationLabel(
                property.city_text,
                property.locality_text
              ),
              facts,
            }}
          />
        )}
        <svg
          className="h-8 w-8 text-ink-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>

      <div className="p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-brand">
            {formatPropertyPrice(property)}
          </p>
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-ink-soft capitalize">
            {labelize(property.poster_role)}
          </span>
        </div>
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-ink">
          {property.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
          {locationLabel(property.city_text, property.locality_text)}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {property.bedrooms ? <Fact>{property.bedrooms} BHK</Fact> : null}
          {property.area_value ? (
            <Fact>
              {property.area_value} {property.area_unit ?? "sq ft"}
            </Fact>
          ) : null}
          <Fact capitalize>{property.property_type.replace(/_/g, " ")}</Fact>
        </div>
      </div>
    </Link>
  );
}

function Fact({
  children,
  capitalize,
}: {
  children: React.ReactNode;
  capitalize?: boolean;
}) {
  return (
    <span
      className={`rounded-full bg-surface-muted px-2 py-0.5 text-[11px] text-ink-soft ${capitalize ? "capitalize" : ""}`}
    >
      {children}
    </span>
  );
}
