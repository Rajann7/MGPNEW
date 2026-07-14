import Link from "next/link";
import type { PublicRequirementCard } from "@/lib/actions/public-search";
import {
  formatBudgetRange,
  labelize,
  locationLabel,
} from "@/lib/search/format";

/**
 * Requirements are scoped-public (see brain.md Prompt 05 decision): the card
 * never shows the poster's contact/identity. It links to the scoped-visibility
 * Requirement Detail (B4-S03), which itself gates the full view + proposal to
 * verified brokers/builders and shows a locked teaser to everyone else.
 * Visual language matches PropertyResultCard/ProjectResultCard.
 */
export function RequirementResultCard({
  requirement,
}: {
  requirement: PublicRequirementCard;
}) {
  const budget =
    requirement.rent_min || requirement.rent_max
      ? `${formatBudgetRange(requirement.rent_min, requirement.rent_max)}/month`
      : formatBudgetRange(requirement.budget_min, requirement.budget_max);

  return (
    <Link
      href={`/requirement/${requirement.slug ?? requirement.id}`}
      className="block rounded-card border border-dashed border-border bg-surface-muted/60 p-3.5 transition-colors hover:border-brand/40">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-brand">{budget}</p>
        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-ink-soft">
          Requirement
        </span>
      </div>
      <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-ink">
        {requirement.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
        {locationLabel(
          requirement.city_text,
          requirement.preferred_localities_text
        )}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Fact capitalize>{labelize(requirement.category)}</Fact>
        <Fact capitalize>Posted by {labelize(requirement.poster_role)}</Fact>
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
