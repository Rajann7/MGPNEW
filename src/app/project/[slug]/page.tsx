import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicProjectBySlug,
  getPublicBuilderLinkByProfileId,
  getSimilarProjects,
  getPublicListingDirectPhone,
} from "@/lib/actions/public-search";
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
  AvailableUnits,
  MediaSetupState,
} from "@/components/detail/DetailSections";
import { ProjectResultCard } from "@/components/search/ProjectResultCard";
import { SeoJsonLd } from "@/components/detail/SeoJsonLd";
import { Alert } from "@/components/ui/Alert";
import {
  canonicalUrl,
  safeDescription,
  breadcrumbJsonLd,
  NOINDEX,
  INDEXABLE,
} from "@/lib/seo";
import {
  formatProjectPrice,
  labelize,
  locationLabel,
} from "@/lib/search/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) return { title: "Project Not Available", robots: NOINDEX };

  const location = locationLabel(project.city_text, project.locality_text);
  const title = `${project.project_name} | ${location}`;
  return {
    title,
    description: safeDescription(
      project.short_description,
      `${labelize(project.project_type)} in ${location}.`
    ),
    alternates: { canonical: canonicalUrl(`/project/${slug}`) },
    robots: INDEXABLE,
    openGraph: { title, type: "website" },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [profile, project] = await Promise.all([
    getCurrentProfile(),
    getPublicProjectBySlug(slug),
  ]);
  if (!project) notFound();

  const location = locationLabel(project.city_text, project.locality_text);
  const [builder, saved, existingInquiry, similar] = await Promise.all([
    getPublicBuilderLinkByProfileId(project.builder_profile_id),
    isItemSaved("project", project.id),
    profile
      ? getMyInquiryForTarget("project", project.id)
      : Promise.resolve(null),
    getSimilarProjects({ excludeId: project.id, city: project.city_text }),
  ]);
  if (profile) void trackRecentlyViewed("project", project.id);

  // Projects have no contact_visibility column — product rule (per
  // src/lib/actions/contact.ts decideAutoApproval): builder contact is
  // always visible to any logged-in viewer, so we resolve it the same way.
  const directPhone = project.builder_profile_id
    ? await getPublicListingDirectPhone(
        project.builder_profile_id,
        "show_after_login",
        { isLoggedIn: Boolean(profile), isVerified: true }
      )
    : null;

  const possession = project.possession_date
    ? new Date(project.possession_date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;
  const keyFacts = [
    {
      label: "Configurations",
      value: project.unit_configurations?.length
        ? undefined
        : project.category
          ? labelize(project.category)
          : null,
    },
    {
      label: "Possession",
      value: possession,
    },
    {
      label: "Status",
      value: project.construction_status
        ? labelize(project.construction_status)
        : null,
    },
    {
      label: "Total units",
      value: project.total_units ? `${project.total_units}` : null,
    },
    {
      label: "Towers",
      value: project.total_towers ? `${project.total_towers}` : null,
    },
    {
      label: "Floors",
      value: project.total_floors ? `${project.total_floors}` : null,
    },
  ];

  return (
    <DetailShell profile={profile} title={project.project_name}>
      <SeoJsonLd
        id="project-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
          { name: project.project_name, path: `/project/${slug}` },
        ])}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Search", href: "/search" },
            { name: project.project_name },
          ]}
        />

        <div className="mt-3">
          <DetailGallery mediaCount={project.media_count ?? 0} />
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-brand-soft text-brand text-xs font-medium">
              {labelize(project.project_type)}
            </span>
            {project.construction_status && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium">
                {labelize(project.construction_status)}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            {project.project_name}
          </h1>
          <p className="text-sm text-zinc-500">{location}</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-zinc-900">
              {formatProjectPrice(project)}
            </span>
            <DetailOverflowMenu
              title={project.project_name}
              currentPath={`/project/${slug}`}
              targetType="project"
              targetId={project.id}
              isLoggedIn={Boolean(profile)}
              initiallySaved={saved}
              entityNoun="project"
            />
          </div>
          {builder?.public_slug && (
            <Link
              href={`/builder/${builder.public_slug}`}
              className="text-xs text-brand hover:underline w-max"
            >
              By {builder.company_name || builder.display_name || "Builder"} →
            </Link>
          )}
        </div>

        {project.rera_registered && project.rera_number && (
          <div className="mt-4">
            <Alert tone="info">
              RERA Registered — {project.rera_number}. Please independently
              verify RERA registration and details before making any decision.
            </Alert>
          </div>
        )}

        <div className="mt-5">
          <DetailCTABar
            viewer={{
              isLoggedIn: Boolean(profile),
              publicRole: profile?.public_role ?? null,
              fullName: profile?.full_name ?? null,
              mobileMasked: maskMobile(profile?.mobile),
            }}
            entityLabel="project"
            currentPath={`/project/${slug}`}
            targetType="project"
            targetId={project.id}
            poster={{
              name: builder
                ? builder.company_name || builder.display_name || null
                : null,
              roleLabel: "Builder",
              // No real builder-verification signal is exposed on this join
              // yet — never fake the verified badge.
              verified: false,
            }}
            phone={directPhone}
            existingInquiry={existingInquiry}
          />
        </div>

        <KeyFacts items={keyFacts} />

        {project.short_description && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-zinc-900">
              About this project
            </h2>
            <p className="whitespace-pre-line text-sm text-zinc-600">
              {project.short_description}
            </p>
          </section>
        )}

        <AvailableUnits units={project.unit_configurations} />

        <AmenitiesSection amenities={project.amenities} />

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-zinc-900">
            Video &amp; virtual tour
          </h2>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <MediaSetupState
              title="Walkthrough video"
              note={
                project.virtual_tour_url
                  ? "Provided by builder."
                  : "Not uploaded by the builder yet."
              }
            />
            <MediaSetupState
              title="360° tour"
              note="Tour provider not configured — no fake embed shown."
            />
          </div>
        </section>

        <LocationSection
          parts={[
            project.landmark,
            project.locality_text,
            project.city_text,
            project.pin_code,
          ]}
        />

        {similar.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">
              Similar projects in {project.city_text ?? "Gujarat"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <ProjectResultCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
