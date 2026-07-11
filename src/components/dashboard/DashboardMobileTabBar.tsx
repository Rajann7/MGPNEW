import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface MobileTabItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  /** Center raised "Post" FAB — locked design (Batch 1 · 3E). */
  fab?: boolean;
}

/**
 * Locked dashboard mobile bottom nav (Batch 1 · shell 3E):
 * exactly 5 items — Home · Search · Post (raised center FAB) · Leads · Profile —
 * in the same order on every dashboard mobile screen, all roles.
 */
export function DashboardMobileTabBar({ items }: { items: MobileTabItem[] }) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-20 h-16 grid grid-cols-5 items-center border-t border-border bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      aria-label="Dashboard navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        if (item.fab) {
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              className="flex flex-col items-center -mt-6"
            >
              <span className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shadow-[0_4px_12px_rgba(15,107,92,.35)] border-[3px] border-surface">
                <Icon
                  className="w-[22px] h-[22px] text-white"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <span className="mt-0.5 text-[10px] font-medium text-ink-soft">
                {item.label}
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-[3px] transition-colors",
              item.active ? "text-brand" : "text-zinc-400 hover:text-ink-soft"
            )}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            <span
              className={cn(
                "text-[10px]",
                item.active ? "font-semibold" : "font-medium"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
