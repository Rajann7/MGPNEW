import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, MapPin, IndianRupee, Tag, Clock } from "lucide-react";
import { getRequirementDetail } from "@/lib/actions/requirements";
import { RequirementProposePanel } from "@/components/proposals/RequirementProposePanel";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { NOINDEX } from "@/lib/seo";
import { formatBudgetRange, labelize, locationLabel } from "@/lib/search/format";

interface Props {
  params: Promise<{ slug: string }>;
}

// Requirements are never public content → always noindex, and the route is
// already excluded from the sitemap (B4-S03 SEO rule).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const req = await getRequirementDetail(slug);
  if (!req) return { title: "Requirement Not Available", robots: NOINDEX };
  return {
    title: `${req.displayCode} · Property requirement | My Gujarat Property`,
    robots: NOINDEX,
  };
}

function budgetLabel(req: {
  purpose: string;
  budget_min: number | null;
  budget_max: number | null;
  rent_min: number | null;
  rent_max: number | null;
}): string {
  const isRent = req.purpose === "rent" || req.purpose === "lease" || req.purpose === "pg";
  return isRent
    ? `${formatBudgetRange(req.rent_min, req.rent_max)} /mo`
    : formatBudgetRange(req.budget_min, req.budget_max);
}

export default async function RequirementDetailPage({ params }: Props) {
  const { slug } = await params;
  const req = await getRequirementDetail(slug);
  if (!req) notFound();

  const typeLabel = [labelize(req.purpose), labelize(req.category)]
    .filter(Boolean)
    .join(" · ");
  const location = locationLabel(req.city_text, req.preferred_localities_text);
  const posted = new Date(req.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5 sm:py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Requirements", href: "/search?tab=requirements" },
          { name: req.displayCode },
        ]}
      />

      {/* Header */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-ink sm:text-xl">
            {req.title}
          </h1>
          <p className="mt-1 text-xs text-ink-muted">
            Posted {posted} · {req.displayCode}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium capitalize text-brand">
          {req.status === "published" ? "Active" : labelize(req.status)}
        </span>
      </div>

      {/* Facts grid */}
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Fact icon={Tag} label="Type" value={typeLabel || "—"} />
        <Fact icon={IndianRupee} label="Budget" value={budgetLabel(req)} />
        <Fact icon={MapPin} label="Location" value={location} />
        <Fact
          icon={Clock}
          label="Timeline"
          value={req.possession_timeline ? labelize(req.possession_timeline) : "Flexible"}
        />
      </dl>

      {req.eligible ? (
        <>
          {/* Description (full) */}
          {req.description && (
            <section className="mt-6">
              <h2 className="mb-1.5 text-sm font-semibold text-ink">
                Requirement details
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                {req.description}
              </p>
            </section>
          )}

          {/* Masked requester */}
          <section className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {req.requesterMaskedName.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">
                {req.requesterMaskedName}
              </p>
              <p className="text-xs text-ink-muted capitalize">
                {req.poster_role} · identity masked until proposal accepted
              </p>
            </div>
          </section>

          {/* Proposal entry / self-notice */}
          <section className="mt-4">
            {req.canPropose ? (
              <RequirementProposePanel requirementId={req.id} />
            ) : req.isOwnerOfRecord ? (
              <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink-muted">
                This is your requirement. Proposals from brokers and builders
                will appear in your dashboard.
              </p>
            ) : (
              <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink-muted">
                Only verified brokers and builders can send proposals.
              </p>
            )}
          </section>
        </>
      ) : (
        /* Locked teaser — guests + ineligible authenticated users */
        <section className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft">
            <Lock className="h-5 w-5 text-brand" aria-hidden />
          </span>
          <h2 className="mt-3 text-sm font-semibold text-ink">
            Login to view the full requirement
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs text-ink-muted">
            Requirements are visible to registered, verified Brokers and
            Builders only. Log in with a verified professional account to see
            the full details and send a proposal.
          </p>
          <Link
            href={`/login?redirectTo=${encodeURIComponent(`/requirement/${req.slug ?? req.id}`)}`}
            className="mt-4 inline-flex items-center justify-center rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
          >
            Login / Register
          </Link>
        </section>
      )}
    </main>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-ink">{value}</div>
    </div>
  );
}
