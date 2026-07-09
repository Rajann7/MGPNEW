import { Search, ChevronRight } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { AvatarMenu } from "./AvatarMenu";
import { cn } from "@/lib/cn";

export function DashboardTopbar({
  title,
  breadcrumb,
  userName,
  desktopOnly,
}: {
  title: string;
  breadcrumb?: string[];
  userName: string;
  /** When a mobile-specific DashboardMobileHeader is rendered instead, hide this bar below lg. */
  desktopOnly?: boolean;
}) {
  const crumbs = breadcrumb ?? [title];

  return (
    <header
      className={cn(
        "sticky top-0 z-10 items-center justify-between gap-4 h-16 px-4 sm:px-6 border-b border-border bg-surface/90 backdrop-blur",
        desktopOnly ? "hidden lg:flex" : "flex"
      )}
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm min-w-0"
      >
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <ChevronRight
                className="w-3.5 h-3.5 text-ink-muted shrink-0"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "truncate",
                i === crumbs.length - 1
                  ? "font-semibold text-ink"
                  : "text-ink-muted"
              )}
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl bg-ink/5 dark:bg-white/10 text-ink-muted text-sm w-48">
          <Search className="w-4 h-4" aria-hidden="true" />
          <span className="truncate">Search…</span>
        </div>
        <NotificationBell />
        <AvatarMenu userName={userName} />
      </div>
    </header>
  );
}
