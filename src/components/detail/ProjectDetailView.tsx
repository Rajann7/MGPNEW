import Link from "next/link";
import { ShieldCheck, ChevronRight, FileText, Building2 } from "lucide-react";

/** Hero band for the project detail screen (design Batch 4 · d-proj).
 * No real cover-photo pipeline is wired yet, so this uses the same light
 * neutral "photo not added" placeholder convention as DetailGallery
 * elsewhere in the app (never a fake photo, and never a plain dark box that
 * could be mistaken for a broken image) — a light zinc background with a
 * centered icon, and text sits on its own dark scrim strip at the bottom
 * for legibility once a real cover photo is wired in behind it. */
export function ProjectHero({
  projectName,
  builderInitial,
  builderName,
  location,
  reraLabel,
  priceRange,
  possessionLabel,
  overflowMenu,
}: {
  projectName: string;
  builderInitial: string;
  builderName: string | null;
  location: string;
  reraLabel: string | null;
  priceRange: string;
  possessionLabel: string | null;
  /** Share/Save/Report menu, rendered as a floating circular button over the
   * hero's top-right corner — keeps it out of the way of the title/price
   * text at every width instead of sitting in its own empty row below the
   * hero (which looked disconnected and cramped on narrow screens). */
  overflowMenu?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 sm:min-h-[220px]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Building2 className="h-12 w-12 text-zinc-300 sm:h-16 sm:w-16" aria-hidden="true" />
      </div>
      {overflowMenu && (
        <div className="absolute right-2.5 top-2.5 z-10 sm:right-3.5 sm:top-3.5 [&_button]:bg-black/35 [&_button]:text-white [&_button]:backdrop-blur-sm [&_button:hover]:bg-black/50">
          {overflowMenu}
        </div>
      )}
      <div className="relative bg-gradient-to-t from-black/75 via-black/50 to-transparent p-4 pt-10 text-white sm:p-6 sm:pt-14">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-bold ring-2 ring-white/30 sm:h-14 sm:w-14">
              {builderInitial}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-lg font-bold sm:text-[22px]">
                  {projectName}
                </h1>
                {reraLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    {reraLabel}
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-white/80 sm:text-sm">
                {location}
                {builderName ? ` · by ${builderName}` : ""}
              </p>
            </div>
          </div>
          <div className="hidden flex-shrink-0 text-right sm:block">
            <p className="text-lg font-bold">{priceRange}</p>
            {possessionLabel && (
              <p className="text-xs text-white/80">Possession {possessionLabel}</p>
            )}
          </div>
        </div>
        <div className="mt-3 sm:hidden">
          <p className="text-base font-bold">{priceRange}</p>
          {possessionLabel && (
            <p className="text-xs text-white/80">Possession {possessionLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const STAGES = ["Foundation", "Structure", "Finishing", "Handover"] as const;

const STATUS_MAP: Record<string, { index: number; percent: number }> = {
  pre_launch: { index: 0, percent: 10 },
  under_construction: { index: 1, percent: 40 },
  nearing_possession: { index: 2, percent: 75 },
  ready_to_move: { index: 3, percent: 100 },
  completed: { index: 3, percent: 100 },
};

/** Horizontal construction-progress timeline driven by the project's real
 * construction_status — hidden when that field isn't set (no fake progress). */
export function ConstructionProgress({
  status,
}: {
  status: string | null | undefined;
}) {
  const mapped = status ? STATUS_MAP[status] : null;
  if (!mapped) return null;
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-900">
        Construction progress
      </h2>
      <div className="rounded-2xl border border-zinc-100 bg-white p-4">
        <div className="flex items-center">
          {STAGES.map((stage, i) => {
            const done = i < mapped.index;
            const current = i === mapped.index;
            return (
              <div key={stage} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                      done
                        ? "bg-brand text-white"
                        : current
                          ? "bg-brand-soft text-brand ring-2 ring-brand"
                          : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      done || current ? "text-zinc-900" : "text-zinc-400"
                    }`}
                  >
                    {stage}
                    {current ? ` ${mapped.percent}%` : ""}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <span
                    className={`mx-1.5 h-0.5 flex-1 rounded-full ${
                      i < mapped.index ? "bg-brand" : "bg-zinc-100"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Brochure card (design Batch 4 sidebar). No brochure file pipeline is wired
 * yet, so this is always an honest "Setup Required" state — never a fake
 * download link. */
export function BrochureCard() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
          <FileText className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-zinc-700">Project brochure</p>
          <p className="text-[11px] text-zinc-500">
            Not uploaded by the builder yet.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BuilderMiniCard({
  slug,
  name,
  projectCount,
}: {
  slug: string | null;
  name: string | null;
  projectCount: number | null;
}) {
  if (!slug || !name) return null;
  const initial = name.charAt(0).toUpperCase();
  return (
    <Link
      href={`/builder/${slug}`}
      className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-3.5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900">{name}</p>
        <p className="text-xs text-zinc-500">
          {projectCount != null ? `${projectCount} projects · ` : ""}View microsite
        </p>
      </div>
      <ChevronRight className="h-4 w-4 flex-shrink-0 text-zinc-400" />
    </Link>
  );
}

export function reraLabel(
  registered: boolean,
  number: string | null
): string | null {
  return registered && number ? "RERA Registered" : null;
}
