import Link from "next/link";
import { ShieldCheck, Building, MapPin, ChevronRight } from "lucide-react";
import type { PublicProjectCard } from "@/lib/actions/public-search";
import { formatProjectPrice, labelize, locationLabel } from "@/lib/search/format";

/**
 * "Featured projects" — Batch 3 · Screen 1 white project cards.
 * REAL published projects only. The RERA chip shows ONLY when the row is
 * actually rera_registered (never a fake badge). Empty → honest state.
 */
export function HomeFeaturedProjects({
  items,
}: {
  items: PublicProjectCard[];
}) {
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-[22px] font-semibold text-ink">
          Featured projects
        </h2>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface-subtle px-6 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
            <Building className="h-5 w-5 text-brand" />
          </span>
          <div className="text-sm font-semibold text-ink">
            No projects listed yet
          </div>
          <p className="max-w-xs text-[13px] text-ink-soft">
            RERA-registered builder projects will appear here once approved.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-ink">Featured projects</h2>
        <Link
          href="/search?entity=project"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-hover"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const href = p.slug ? `/project/${p.slug}` : "/search?entity=project";
          const initials = p.project_name
            .split(/\s+/)
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <Link
              key={p.id}
              href={href}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
            >
              <div className="relative flex h-[150px] items-center justify-center bg-[repeating-linear-gradient(45deg,#f4f4f5,#f4f4f5_10px,#e9e9ec_10px,#e9e9ec_20px)]">
                <span className="rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] text-ink-muted">
                  project render
                </span>
                {p.rera_registered && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-[3px] text-[11px] font-medium text-brand shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                    <ShieldCheck className="h-[11px] w-[11px]" />
                    RERA Registered
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[7px] p-3.5">
                <div className="text-[17px] font-semibold text-ink">
                  {formatProjectPrice(p)}
                </div>
                <div className="line-clamp-1 text-[13px] font-medium text-ink">
                  {p.project_name}
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-muted">
                  <MapPin className="h-3 w-3" />
                  {locationLabel(p.city_text, p.locality_text)}
                </div>
                <div className="flex items-center gap-2 border-t border-surface-muted pt-2">
                  <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-semibold text-brand">
                    {initials}
                  </span>
                  <span className="text-xs text-ink-muted">
                    {labelize(p.project_type)} project
                    {p.construction_status
                      ? ` · ${labelize(p.construction_status)}`
                      : ""}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
