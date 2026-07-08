import Link from "next/link";
import { ShieldCheck, Building } from "lucide-react";
import type { PublicProjectCard } from "@/lib/actions/public-search";
import { formatProjectPrice, labelize, locationLabel } from "@/lib/search/format";

/**
 * "Featured projects" — dark project cards per the finished design.
 * REAL published projects only. The RERA-Registered chip shows ONLY when the row
 * is actually rera_registered (never a fake badge). Empty → honest state.
 */
export function HomeFeaturedProjects({
  items,
}: {
  items: PublicProjectCard[];
}) {
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[1120px] px-4 pt-10 sm:px-6">
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
    <section className="mx-auto max-w-[1120px] px-4 pt-10 sm:px-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[22px] font-semibold text-ink">Featured projects</h2>
        <Link
          href="/search?entity=project"
          className="text-[13px] font-semibold text-brand hover:text-brand-hover"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const href = p.slug ? `/project/${p.slug}` : "/search?entity=project";
          return (
            <Link
              key={p.id}
              href={href}
              className="group overflow-hidden rounded-2xl bg-[#1C1C1E] text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            >
              <div className="relative flex h-[150px] items-center justify-center bg-[repeating-linear-gradient(45deg,#2C2C2E,#2C2C2E_10px,#242426_10px,#242426_20px)]">
                <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/45">
                  render coming soon
                </span>
                {p.rera_registered && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#3B4FC0]">
                    <ShieldCheck className="h-[11px] w-[11px]" />
                    RERA Registered
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-white/55">
                  New Project
                </div>
                <div className="mt-1.5 line-clamp-1 text-[16px] font-semibold">
                  {p.project_name}
                </div>
                <div className="mt-0.5 text-[13px] text-white/65">
                  {locationLabel(p.city_text, p.locality_text)}
                </div>
                <div className="mt-3 text-[17px] font-semibold">
                  {formatProjectPrice(p)}
                </div>
                <div className="mt-0.5 text-[12.5px] text-white/60">
                  {labelize(p.project_type)} project
                </div>
                <span className="mt-3.5 block w-full rounded-[10px] bg-white py-2.5 text-center text-[13px] font-semibold text-[#1C1C1E] transition-colors group-hover:bg-brand-soft">
                  View project
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
