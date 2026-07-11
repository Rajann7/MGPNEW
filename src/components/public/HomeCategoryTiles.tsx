import Link from "next/link";
import { Building2, Store, LandPlot, Building, BedDouble } from "lucide-react";

/**
 * "Browse by category" — rebuilt 1:1 to Batch 3 · Screen 1A: centered tile
 * (44px brand-soft icon square + label only, no description), 5-up desktop grid.
 * Links are real /search category routes.
 */
const TILES = [
  {
    label: "Residential",
    Icon: Building2,
    href: "/search?category=residential",
  },
  { label: "Commercial", Icon: Store, href: "/search?category=commercial" },
  { label: "Plots & Land", Icon: LandPlot, href: "/search?category=plot" },
  { label: "Projects", Icon: Building, href: "/search?entity=project" },
  { label: "PG / Co-living", Icon: BedDouble, href: "/search?category=pg" },
];

export function HomeCategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-[22px] font-semibold text-ink">
        Browse by category
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {TILES.map(({ label, Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-[#C4E0D9] hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
              <Icon className="h-5 w-5 text-brand" />
            </span>
            <span className="text-[13px] font-medium text-ink">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
