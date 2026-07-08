import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicBuilderBySlug,
  getPublicProjectsByBuilder,
} from "@/lib/actions/public-search";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { PublicProfileHeader } from "@/components/profile/PublicProfileHeader";
import { ProfileContactButton } from "@/components/profile/ProfileContactButton";
import { StatTiles } from "@/components/profile/ProfileBlocks";
import { BuilderProjectTabs } from "@/components/profile/BuilderProjectTabs";
import { ReportModal } from "@/components/detail/ReportModal";
import { SeoJsonLd } from "@/components/detail/SeoJsonLd";
import { labelize } from "@/lib/search/format";
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
  const builder = await getPublicBuilderBySlug(slug);
  if (!builder)
    return { title: "Builder Profile Not Available", robots: NOINDEX };

  const name = builder.company_name || builder.display_name || "Builder";
  return {
    title: `${name} | Builder Projects`,
    description: safeDescription(
      undefined,
      `View projects by ${name} on My Gujarat Property.`
    ),
    alternates: { canonical: canonicalUrl(`/builder/${slug}`) },
    robots: INDEXABLE,
  };
}

export default async function BuilderProfilePage({ params }: Props) {
  const { slug } = await params;
  const [profile, builder] = await Promise.all([
    getCurrentProfile(),
    getPublicBuilderBySlug(slug),
  ]);

  if (!builder) notFound();

  const projects = await getPublicProjectsByBuilder(builder.profile_id);
  const name = builder.company_name || builder.display_name || "Builder";

  const completed = projects.filter(
    (p) => p.construction_status === "completed" || p.construction_status === "ready_to_move"
  );
  const active = projects.filter((p) => !completed.includes(p));
  const cities = Array.from(
    new Set(projects.map((p) => p.city_text).filter((x): x is string => Boolean(x)))
  );
  const statTiles = [
    { value: `${projects.length}`, label: "Projects" },
    { value: `${cities.length || "—"}`, label: "Cities" },
    {
      value: builder.rera_registered ? "RERA" : "—",
      label: builder.rera_registered ? "Registered company" : "RERA not on file",
      muted: !builder.rera_registered,
    },
  ];

  return (
    <DetailShell profile={profile} title={name}>
      <SeoJsonLd
        id="builder-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Builders", path: "/search" },
          { name, path: `/builder/${slug}` },
        ])}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Builders", href: "/search" },
            { name },
          ]}
        />

        <PublicProfileHeader
          name={name}
          roleLabel="Builder / Developer"
          isVerified={builder.verification_status === "verified"}
        />

        {builder.company_type && (
          <p className="mt-1 text-sm text-zinc-500">
            {labelize(builder.company_type)}
            {cities.length ? ` · ${cities.join(", ")}` : ""}
          </p>
        )}

        <div className="mt-5">
          <ProfileContactButton
            label="Contact builder"
            currentPath={`/builder/${slug}`}
            isLoggedIn={Boolean(profile)}
          />
        </div>

        <StatTiles tiles={statTiles} />

        {builder.rera_registered && (
          <p className="mt-4 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            RERA registered company. Please independently verify project-level
            RERA details.
          </p>
        )}

        <BuilderProjectTabs active={active} completed={completed} about={null} />

        <div className="mt-8 border-t border-zinc-100 pt-4">
          <ReportModal
            targetType="user"
            targetId={builder.profile_id}
            isLoggedIn={Boolean(profile)}
            currentPath={`/builder/${slug}`}
            entityNoun="profile"
          />
        </div>
      </div>
    </DetailShell>
  );
}
