import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicPropertyBySlug,
  getPublicListingImages,
  getSimilarProperties,
} from "@/lib/actions/public-search";
import { getListingContactState } from "@/lib/actions/contact";
import { isItemSaved, trackRecentlyViewed } from "@/lib/actions/saved";
import { getMyInquiryForTarget } from "@/lib/actions/leads";
import { maskMobile } from "@/lib/leads/inquiry-config";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { DetailGallery } from "@/components/detail/DetailGallery";
import { DetailCTABar } from "@/components/detail/DetailCTABar";
import { DetailOverflowMenu } from "@/components/detail/DetailOverflowMenu";
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
  const [saved, existingInquiry, similar, galleryImages] = await Promise.all([
    isItemSaved("property", property.id),
    profile
      ? getMyInquiryForTarget("property", property.id)
      : Promise.resolve(null),
    getSimilarProperties({
      excludeId: property.id,
      city: property.city_text,
      purpose: property.purpose,
    }),
    getPublicListingImages("property", property.id),
  ]);
  if (profile) void trackRecentlyViewed("property", property.id);

  // Masked-until-reveal (Batch 4 §7/§44): only the masked value reaches the
  // initial payload; the full number requires the explicit Reveal action.
  const contactState = await getListingContactState("property", property.id);

  const floorFact =
    property.floor_number != null
      ? property.total_floors != null
        ? `${property.floor_number} of ${property.total_floors} floors`
        : `Floor ${property.floor_number}`
      : null;
  const keyFacts = [
    { label: "Bedrooms", value: property.bedrooms ? `${property.bedrooms} BHK` : null },
    {
      label: "Bathrooms",
      value: property.bathrooms
        ? `${property.bathrooms} Bath${property.bathrooms > 1 ? "s" : ""}`
        : null,
    },
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

  const posterInfo = {
    // Real public-safe poster identity from public_properties_view (§43) —
    // display name / verified state are actual profile data, never invented.
    name: property.poster_display_name ?? null,
    roleLabel: labelize(property.poster_role ?? "owner"),
    verified: Boolean(property.poster_verified),
  };

  return (
    <DetailShell
      profile={profile}
      title={property.title}
      showCityPill={false}
      hideCompareTray
    >
      <SeoJsonLd
        id="property-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
          { name: property.title, path: `/property/${slug}` },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Search", href: "/search" },
            { name: property.title },
          ]}
        />

        <div className="mt-3 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
          <div className="min-w-0">
            <DetailGallery
              mediaCount={property.media_count ?? 0}
              images={galleryImages}
            />

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
              <p className="flex items-center gap-1 text-sm text-zinc-500">
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400"
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
                {location}
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <span className="text-2xl font-extrabold tracking-tight text-brand sm:text-[28px]">
                  {formatPropertyPrice(property)}
                </span>
                <DetailOverflowMenu
                  title={property.title}
                  currentPath={`/property/${slug}`}
                  targetType="property"
                  targetId={property.id}
                  isLoggedIn={Boolean(profile)}
                  initiallySaved={saved}
                />
              </div>
            </div>

            <KeyFacts items={keyFacts} />

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
                    <PropertyResultCard key={p.id} property={p} showCompare={false} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar contact card on lg+; DetailCTABar also renders the
              mobile sticky Call/Enquire bar internally (hidden on lg+). */}
          <div className="mt-5 lg:sticky lg:top-20 lg:mt-0">
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
              existingInquiry={existingInquiry}
              poster={posterInfo}
              contact={contactState}
              revealTargetType="property"
            />
          </div>
        </div>
      </div>
    </DetailShell>
  );
}
