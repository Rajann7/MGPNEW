import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { DetailShell } from "@/components/detail/DetailShell";
import {
  getPublicProjectBySlug,
  getPublicBuilderLinkByProfileId,
  getSimilarProjects,
} from "@/lib/actions/public-search";
import { getListingContactState } from "@/lib/actions/contact";
import { isItemSaved, trackRecentlyViewed } from "@/lib/actions/saved";
import { getMyInquiryForTarget } from "@/lib/actions/leads";
import { maskMobile } from "@/lib/leads/inquiry-config";
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
import {
  ProjectHero,
  ConstructionProgress,
  BrochureCard,
  BuilderMiniCard,
  reraLabel,
} from "@/components/detail/ProjectDetailView";
import { ProjectTabs, type ProjectTab } from "@/components/detail/ProjectTabs";
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
  formatArea,
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

  // Masked-until-reveal (Batch 4 §102): builder contact requires the
  // explicit Reveal action — no full number in the initial payload.
  const contactState = await getListingContactState("project", project.id);

  const possession = project.possession_date
    ? new Date(project.possession_date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;
  const builderName = builder
    ? builder.company_name || builder.display_name || null
    : null;
  const builderInitial = (builderName?.charAt(0) ?? "B").toUpperCase();

  const launchDate = project.launch_date
    ? new Date(project.launch_date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  const projectFacts = [
    { label: "Category", value: project.category ? labelize(project.category) : null },
    { label: "Purpose", value: project.purpose ? labelize(project.purpose) : null },
    {
      label: "Total area",
      value: formatArea(project.total_area_value, project.total_area_unit),
    },
    { label: "Towers", value: project.total_towers ? `${project.total_towers}` : null },
    { label: "Wings", value: project.total_wings ? `${project.total_wings}` : null },
    { label: "Floors", value: project.total_floors ? `${project.total_floors}` : null },
    { label: "Total units", value: project.total_units ? `${project.total_units}` : null },
    {
      label: "Available units",
      value: project.available_units ? `${project.available_units}` : null,
    },
    {
      label: "Status",
      value: project.construction_status
        ? labelize(project.construction_status)
        : null,
    },
    { label: "Possession", value: possession },
    { label: "Launch date", value: launchDate },
    { label: "Phase", value: project.phase_name },
  ];

  const overviewTab: React.ReactNode = (
    <>
      {project.short_description && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-zinc-900">
            About this project
          </h2>
          <p className="whitespace-pre-line text-sm text-zinc-600">
            {project.short_description}
          </p>
        </section>
      )}
      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-zinc-900">
          Project details
        </h2>
        <KeyFacts items={projectFacts} />
      </section>
      <div className="mt-6">
        <AvailableUnits units={project.unit_configurations} />
      </div>
      <ConstructionProgress status={project.construction_status} />
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
      {similar.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">
            Similar projects in {project.city_text ?? "Gujarat"}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {similar.map((p) => (
              <ProjectResultCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );

  const tabs: ProjectTab[] = [
    { id: "overview", label: "Overview", content: overviewTab },
    {
      id: "floor-plans",
      label: "Floor Plans",
      content: <AvailableUnits units={project.unit_configurations} />,
    },
    {
      id: "amenities",
      label: "Amenities",
      content: <AmenitiesSection amenities={project.amenities} />,
    },
    {
      id: "location",
      label: "Location",
      content: (
        <LocationSection
          parts={[
            project.landmark,
            project.locality_text,
            project.city_text,
            project.pin_code,
          ]}
        />
      ),
    },
    {
      id: "gallery",
      label: "Gallery",
      content: <DetailGallery mediaCount={project.media_count ?? 0} />,
    },
  ];

  return (
    <DetailShell
      profile={profile}
      title={project.project_name}
      showCityPill={false}
      hideCompareTray
    >
      <SeoJsonLd
        id="project-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
          { name: project.project_name, path: `/project/${slug}` },
        ])}
      />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <ProjectHero
          projectName={project.project_name}
          builderInitial={builderInitial}
          builderName={builderName}
          location={location}
          reraLabel={reraLabel(project.rera_registered, project.rera_number)}
          priceRange={formatProjectPrice(project)}
          possessionLabel={possession}
          overflowMenu={
            <DetailOverflowMenu
              title={project.project_name}
              currentPath={`/project/${slug}`}
              targetType="project"
              targetId={project.id}
              isLoggedIn={Boolean(profile)}
              initiallySaved={saved}
              entityNoun="project"
            />
          }
        />

        {project.rera_registered && project.rera_number && (
          <div className="mt-3">
            <Alert tone="info">
              RERA Registered — {project.rera_number}. Please independently
              verify RERA registration and details before making any decision.
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <ProjectTabs tabs={tabs} />
          </div>

          <div className="flex flex-col gap-4 lg:pt-4">
            {/* DOM order puts the cards before DetailCTABar so its internal
                mobile sticky-bar spacer lands last in the column — otherwise
                the fixed bottom bar overlaps/hides these cards on mobile
                scroll. `lg:order-*` restores the design's desktop order
                (enquiry card first) without affecting mobile stacking. */}
            <div className="lg:sticky lg:top-20 lg:flex lg:flex-col lg:gap-4">
              <div className="lg:order-2">
                <BrochureCard />
              </div>
              <div className="lg:order-3">
                <BuilderMiniCard
                  slug={builder?.public_slug ?? null}
                  name={builderName}
                  projectCount={null}
                />
              </div>
              <div className="lg:order-1">
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
                    name: builderName,
                    roleLabel: "Builder",
                    // No real builder-verification signal is exposed on this
                    // join yet — never fake the verified badge.
                    verified: false,
                  }}
                  contact={contactState}
                  revealTargetType="project"
                  existingInquiry={existingInquiry}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailShell>
  );
}
