import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
}

export function DashboardSidebar({
  navItems,
  userName,
  userRole,
}: {
  navItems: SidebarNavItem[];
  userName: string;
  userRole: string;
}) {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[220px] flex-col justify-between border-r border-border bg-surface px-4 py-6 z-20">
      <div className="flex flex-col gap-1 min-h-0 flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 pb-6 shrink-0"
          aria-label="My Gujarat Property — home"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11l9-7 9 7" />
              <path d="M5 10v9h14v-9" />
              <path d="M10 19v-5h4v5" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-ink truncate">
            My Gujarat Property
          </span>
        </Link>

        <nav className="flex flex-col gap-1 overflow-y-auto min-h-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.disabled) {
              return (
                <span
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-ink-muted opacity-50 cursor-not-allowed"
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-colors",
                  item.active
                    ? "bg-brand-soft text-brand font-medium"
                    : "text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10"
                )}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-surface-subtle">
        <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold shrink-0">
          {userName.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink truncate">{userName}</p>
          <p className="text-xs text-ink-muted truncate">{userRole}</p>
        </div>
      </div>
    </aside>
  );
}
