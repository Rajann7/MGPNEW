import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicPropertyBySlug,
  getSimilarProperties,
} from "@/lib/actions/public-search";
import { isItemSaved, trackRecentlyViewed } from "@/lib/actions/saved";
import { getMyInquiryForTarget } from "@/lib/actions/leads";
import { maskMobile } from "@/lib/leads/inquiry-config";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { DetailGallery } from "@/components/detail/DetailGallery";
import { DetailCTABar } from "@/components/detail/DetailCTABar";
import { ReportModal } from "@/components/detail/ReportModal";
import { ShareButton } from "@/components/detail/ShareButton";
import {
  KeyFacts,
  AmenitiesSection,
  LocationSection,
} from "@/components/detail/DetailSections";
import { PropertyResultCard } from "@/components/search/PropertyResultCard";
import { SeoJsonLd } from "@/components/detail/SeoJsonLd";
import {
  canonicalUrl,
  safeDescription,
  breadcrumbJsonLd,
  NOINDEX,
  INDEXABLE,
} from "@/lib/seo";
import {
  formatPropertyPrice,
  formatArea,
  labelize,
  locationLabel,
} from "@/lib/search/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublicPropertyBySlug(slug);
  if (!property) return { title: "Listing Not Available", robots: NOINDEX };

  const location = locationLabel(property.city_text, property.locality_text);
  const title = `${property.title} | ${location}`;
  return {
    title,
    description: safeDescription(
      property.description,
      `${labelize(property.property_type)} for ${property.purpose === "sell" ? "sale" : labelize(property.purpose)} in ${location}.`
    ),
    alternates: { canonical: canonicalUrl(`/property/${slug}`) },
    robots: INDEXABLE,
    openGraph: { title, type: "website" },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const [profile, property] = await Promise.all([
    getCurrentProfile(),
    getPublicPropertyBySlug(slug),
  ]);
  if (!property) notFound();

  const location = locationLabel(property.city_text, property.locality_text);
  const [saved, existingInquiry, similar] = await Promise.all([
    isItemSaved("property", property.id),
    profile
      ? getMyInquiryForTarget("property", property.id)
      : Promise.resolve(null),
    getSimilarProperties({
      excludeId: property.id,
      city: property.city_text,
      purpose: property.purpose,
    }),
  ]);
  if (profile) void trackRecentlyViewed("property", property.id);

  const floorFact =
    property.floor_number != null
      ? property.total_floors != null
        ? `${property.floor_number} of ${property.total_floors}`
        : `${property.floor_number}`
      : null;
  const keyFacts = [
    { label: "Bedrooms", value: property.bedrooms ? `${property.bedrooms} BHK` : null },
    { label: "Bathrooms", value: property.bathrooms ? `${property.bathrooms}` : null },
    {
      label: "Area",
      value:
        formatArea(property.area_value, property.area_unit) ??
        formatArea(property.carpet_area, property.area_unit) ??
        formatArea(property.built_up_area, property.area_unit),
    },
    { label: "Floor", value: floorFact },
    {
      label: "Furnishing",
      value: property.furnishing_status ? labelize(property.furnishing_status) : null,
    },
    { label: "Facing", value: property.facing ? labelize(property.facing) : null },
    { label: "Parking", value: property.parking ? labelize(property.parking) : null },
    {
      label: "Possession",
      value: property.possession_status ? labelize(property.possession_status) : null,
    },
  ];

  return (
    <DetailShell profile={profile} title={property.title}>
      <SeoJsonLd
        id="property-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
          { name: property.title, path: `/property/${slug}` },
        ])}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Search", href: "/search" },
            { name: property.title },
          ]}
        />

        <div className="mt-3">
          <DetailGallery mediaCount={property.media_count ?? 0} />
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-brand-soft text-brand text-xs font-medium capitalize">
              {property.purpose === "sell" ? "Buy" : labelize(property.purpose)}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium">
              {labelize(property.property_type)}
            </span>
            {property.price_negotiable && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium">
                Negotiable
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            {property.title}
          </h1>
          <p className="text-sm text-zinc-500">{location}</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-zinc-900">
              {formatPropertyPrice(property)}
            </span>
            <ShareButton title={property.title} />
          </div>
        </div>

        <KeyFacts items={keyFacts} />

        <div className="mt-5">
          <DetailCTABar
            viewer={{
              isLoggedIn: Boolean(profile),
              publicRole: profile?.public_role ?? null,
              fullName: profile?.full_name ?? null,
              mobileMasked: maskMobile(profile?.mobile),
            }}
            entityLabel="property"
            currentPath={`/property/${slug}`}
            targetType="property"
            targetId={property.id}
            initiallySaved={saved}
            existingInquiry={existingInquiry}
          />
        </div>

        {property.description && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-zinc-900">
              Description
            </h2>
            <p className="whitespace-pre-line text-sm text-zinc-600">
              {property.description}
            </p>
          </section>
        )}

        <AmenitiesSection amenities={property.amenities} />

        <LocationSection
          parts={[
            property.building_name,
            property.landmark,
            property.locality_text,
            property.city_text,
            property.pin_code,
          ]}
        />

        {similar.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">
              Similar properties
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyResultCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 border-t border-zinc-100 pt-4">
          <ReportModal
            targetType="property"
            targetId={property.id}
            isLoggedIn={Boolean(profile)}
            currentPath={`/property/${slug}`}
          />
        </div>
      </div>
    </DetailShell>
  );
}
