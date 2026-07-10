import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicBrokerBySlug,
  getPublicPropertiesByProfile,
} from "@/lib/actions/public-search";
import { getListingContactState } from "@/lib/actions/contact";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { PublicProfileHeader } from "@/components/profile/PublicProfileHeader";
import { ProfileContactButton } from "@/components/profile/ProfileContactButton";
import { StatTiles, AreaChips } from "@/components/profile/ProfileBlocks";
import { ReportModal } from "@/components/detail/ReportModal";
import { ClaimProfileCard } from "@/components/profile/ClaimProfileCard";
import { PropertyResultCard } from "@/components/search/PropertyResultCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SeoJsonLd } from "@/components/detail/SeoJsonLd";
import {
  canonicalUrl,
  safeDescription,
  breadcrumbJsonLd,
  NOINDEX,
  INDEXABLE,
} from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const broker = await getPublicBrokerBySlug(slug);
  if (!broker)
    return { title: "Broker Profile Not Available", robots: NOINDEX };

  const name = broker.agency_name || broker.display_name || "Broker";
  return {
    title: `${name} | Broker Profile`,
    description: safeDescription(
      undefined,
      `View properties listed by ${name} on My Gujarat Property.`
    ),
    alternates: { canonical: canonicalUrl(`/broker/${slug}`) },
    robots: INDEXABLE,
  };
}

export default async function BrokerProfilePage({ params }: Props) {
  const { slug } = await params;
  const [profile, broker] = await Promise.all([
    getCurrentProfile(),
    getPublicBrokerBySlug(slug),
  ]);

  if (!broker) notFound();

  const properties = await getPublicPropertiesByProfile(broker.profile_id);
  const name = broker.agency_name || broker.display_name || "Broker";

  // Masked-until-reveal (Batch 4 §124/§132): the broker's number is never in
  // the initial render — an explicit server-authorised Reveal is required.
  const contactState = await getListingContactState(
    "broker_profile",
    broker.profile_id
  );

  // Service areas = distinct real localities/cities from this broker's live listings.
  const areas = Array.from(
    new Set(
      properties
        .map((p) => p.locality_text || p.city_text)
        .filter((x): x is string => Boolean(x))
    )
  ).slice(0, 6);
  const statTiles = [
    { value: `${properties.length}`, label: "Active listings" },
    { value: `${areas.length}`, label: "Areas served" },
    { value: "Soon", label: "Reviews — never faked", muted: true },
  ];

  return (
    <DetailShell profile={profile} title={name} showCityPill={false} hideCompareTray>
      <SeoJsonLd
        id="broker-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Brokers", path: "/search" },
          { name, path: `/broker/${slug}` },
        ])}
      />
      <div className="max-w-5xl mx-auto px-2.5 sm:px-6 py-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Brokers", href: "/search" },
            { name },
          ]}
        />

        <PublicProfileHeader
          name={name}
          roleLabel="Broker / Agent"
          isVerified={broker.verification_status === "verified"}
        />

        <div className="mt-5">
          <ProfileContactButton
            label="Contact broker"
            currentPath={`/broker/${slug}`}
            isLoggedIn={Boolean(profile)}
            targetType="broker_profile"
            targetId={broker.profile_id}
            contact={contactState}
          />
        </div>

        <AreaChips areas={areas} />

        <StatTiles tiles={statTiles} />

        <div id="profile-listings" className="mt-8 scroll-mt-20">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Listed Properties
          </h2>
          {properties.length === 0 ? (
            <EmptyState
              title="No published listings yet"
              description="This broker has no approved public listings right now."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((p) => (
                <PropertyResultCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>

        <ClaimProfileCard
          targetType="broker_profile"
          targetProfileId={broker.profile_id}
          companyName={name}
          isLoggedIn={Boolean(profile)}
          currentPath={`/broker/${slug}`}
          isOwnProfile={profile?.id === broker.profile_id}
        />

        <div className="mt-8 border-t border-zinc-100 pt-4">
          <ReportModal
            targetType="user"
            targetId={broker.profile_id}
            isLoggedIn={Boolean(profile)}
            currentPath={`/broker/${slug}`}
            entityNoun="profile"
          />
        </div>
      </div>
    </DetailShell>
  );
}
