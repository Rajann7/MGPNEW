import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicOwnerByProfileId,
  getPublicPropertiesByProfile,
} from "@/lib/actions/public-search";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { PublicProfileHeader } from "@/components/profile/PublicProfileHeader";
import { PrivacyNoticeBanner } from "@/components/profile/ProfileBlocks";
import { ReportModal } from "@/components/detail/ReportModal";
import { SeoJsonLd } from "@/components/detail/SeoJsonLd";
import { canonicalUrl, breadcrumbJsonLd, NOINDEX } from "@/lib/seo";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const owner = await getPublicOwnerByProfileId(id);
  if (!owner) return { title: "Profile Not Available", robots: NOINDEX };

  const name = owner.display_name || "Owner";
  return {
    title: `${name} | Owner Profile`,
    // Owner profiles are deliberately minimal (design "minimal by default")
    // — kept out of search indexing, unlike broker/builder profiles.
    alternates: { canonical: canonicalUrl(`/owner/${id}`) },
    robots: NOINDEX,
  };
}

export default async function OwnerProfilePage({ params }: Props) {
  const { id } = await params;
  const [profile, owner] = await Promise.all([
    getCurrentProfile(),
    getPublicOwnerByProfileId(id),
  ]);

  // No public row = private (default) owner or missing profile — real 404,
  // not a fake/empty page (design "minimal by default" enforced server-side).
  if (!owner) notFound();

  const properties = await getPublicPropertiesByProfile(owner.profile_id);
  const name = owner.display_name || "Owner";
  const memberSince = new Date(owner.created_at).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  return (
    <DetailShell
      profile={profile}
      title={name}
      showCityPill={false}
      hideCompareTray
    >
      <SeoJsonLd
        id="owner-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name, path: `/owner/${id}` },
        ])}
      />
      <div className="mx-auto max-w-sm px-2.5 py-6 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name }]} />

        <div className="mt-3 rounded-2xl border border-zinc-100 bg-white p-5">
          <PublicProfileHeader
            name={name}
            roleLabel="Owner"
            isVerified={owner.verification_status === "verified"}
          />
          <p className="mt-3 text-sm text-zinc-500">
            {properties.length} active listing
            {properties.length === 1 ? "" : "s"} · Member since {memberSince}
          </p>
        </div>

        <PrivacyNoticeBanner message="No phone or email is exposed publicly on this profile. Contact this owner only by sending an enquiry on one of their listings." />

        <div className="mt-6 border-t border-zinc-100 pt-4">
          <ReportModal
            targetType="user"
            targetId={owner.profile_id}
            isLoggedIn={Boolean(profile)}
            currentPath={`/owner/${id}`}
            entityNoun="profile"
          />
        </div>
      </div>
    </DetailShell>
  );
}
