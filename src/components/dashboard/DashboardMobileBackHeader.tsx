import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";

/**
 * App-like contextual mobile header WITH a back button — required on every
 * mobile inner (non-root) dashboard screen per the design system rules.
 * Desktop keeps the breadcrumb topbar; this is mobile-only (`lg:hidden`).
 */
export function DashboardMobileBackHeader({
  title,
  backHref,
  actionHref,
  actionLabel,
}: {
  title: string;
  backHref: string;
  /** Compact "+" icon action on the right (e.g. Post Property) — replaces a full-width header button on mobile. */
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <header className="lg:hidden sticky top-0 z-10 flex items-center gap-3 h-16 px-4 border-b border-border bg-surface/90 backdrop-blur">
      <Link
        href={backHref}
        aria-label="Back"
        className="w-9 h-9 -ml-1.5 flex items-center justify-center rounded-xl hover:bg-ink/5 dark:hover:bg-white/10 text-ink-soft transition-colors shrink-0"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </Link>
      <h1 className="text-sm font-semibold text-ink truncate flex-1">
        {title}
      </h1>
      {actionHref && (
        <Link
          href={actionHref}
          aria-label={actionLabel ?? "Add"}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand text-white hover:bg-brand-hover transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
        </Link>
      )}
    </header>
  );
}
