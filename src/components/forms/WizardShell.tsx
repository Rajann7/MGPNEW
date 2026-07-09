import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

/**
 * Dedicated posting-wizard shell (design Batch 5 · 5A/5B/5C) — the design's
 * own screens show NO site header/footer and NO persistent dashboard nav on
 * this flow, just a slim breadcrumb + the wizard's own stepped progress. So
 * this replaces `DashboardShellV2` here (not the full sidebar/topbar/mobile
 * tab bar chrome used by the rest of the dashboard) rather than reusing it.
 */
export function WizardShell({
  title,
  dashboardHref,
  dashboardLabel,
  children,
}: {
  title: string;
  dashboardHref: string;
  dashboardLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop breadcrumb bar — PropertyForm renders its own compact
       * mobile contextual header (back / title / Save Draft) instead of
       * duplicating chrome at narrow widths. */}
      <header className="hidden border-b border-border bg-surface sm:block">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
            <Link
              href={dashboardHref}
              className="shrink-0 text-ink-muted hover:text-ink"
            >
              {dashboardLabel}
            </Link>
            <span className="text-ink-muted" aria-hidden="true">
              /
            </span>
            <span className="truncate font-medium text-ink">{title}</span>
          </nav>
          <LogoutButton
            redirectTo="/"
            className="shrink-0 text-xs font-medium text-ink-soft hover:text-ink px-3 py-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
