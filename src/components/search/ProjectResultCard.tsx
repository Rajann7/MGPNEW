import Link from "next/link";
import type { PublicProjectCard } from "@/lib/actions/public-search";
import {
  formatProjectPrice,
  labelize,
  locationLabel,
} from "@/lib/search/format";
import { CompareButton } from "@/components/compare/CompareButton";

/** Search result card — visual language ported from the old project's PropertyCard. */
export function ProjectResultCard({
  project,
  showCompare = true,
}: {
  project: PublicProjectCard;
  /** The compare icon doesn't make sense on a single profile's own project
   * grid (builder microsite) — only on multi-listing search results. */
  showCompare?: boolean;
}) {
  if (!project.slug) return null;

  const facts = [
    labelize(project.project_type),
    project.possession_date
      ? `Possession ${new Date(project.possession_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`
      : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group block overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow hover:shadow-card"
      draggable={false}
    >
      <div className="relative aspect-[16/10] bg-surface-muted flex items-center justify-center">
        {showCompare && (
          <CompareButton
            item={{
              id: project.id,
              kind: "project",
              slug: project.slug,
              title: project.project_name,
              price: formatProjectPrice(project),
              location: locationLabel(project.city_text, project.locality_text),
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
          <path d="M3.75 21h16.5M4.5 3h15l-.75 18h-13.5L4.5 3zM9 8.25h6M9 12h6M9 15.75h6" />
        </svg>
        {project.rera_registered && project.rera_number && (
          <span className="absolute left-2 top-2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-semibold text-white">
            RERA
          </span>
        )}
      </div>

      <div className="p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-brand">
            {formatProjectPrice(project)}
          </p>
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-ink-soft">
            Project
          </span>
        </div>
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-ink">
          {project.project_name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
          {locationLabel(project.city_text, project.locality_text)}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Fact capitalize>{labelize(project.project_type)}</Fact>
          {project.possession_date && (
            <Fact>
              Possession{" "}
              {new Date(project.possession_date).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </Fact>
          )}
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
