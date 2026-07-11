"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  /** Real count only — e.g. open leads, active listings. Omit if zero/unknown. */
  badge?: number;
  /** "danger" for urgent counts (e.g. new leads); defaults to brand teal. */
  badgeVariant?: "brand" | "danger";
  /** Renders a divider above this item (groups the drawer's extra modules). */
  dividerBefore?: boolean;
}

export interface RenderedNavItem extends Omit<SidebarNavItem, "icon"> {
  /** Pre-rendered icon element — icon components (functions) can't cross the server→client boundary. */
  icon: React.ReactNode;
}

/**
 * Collapse state lives here only (not lifted to a shared parent) so the
 * icon-bearing navItems never have to cross into a "use client" ancestor —
 * it drives a CSS variable on <html> that DashboardShellV2's plain server
 * component content wrapper reads via `lg:pl-[var(--mgp-sidebar-w,220px)]`.
 */
export function DashboardSidebar({
  navItems,
  userName,
  userRole,
}: {
  navItems: RenderedNavItem[];
  userName: string;
  userRole: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--mgp-sidebar-w",
      collapsed ? "76px" : "220px"
    );
    return () => {
      document.documentElement.style.removeProperty("--mgp-sidebar-w");
    };
  }, [collapsed]);

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed inset-y-0 left-0 flex-col justify-between border-r border-border bg-surface px-3 py-6 z-20 transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-[220px]"
      )}
    >
      <div className="flex flex-col gap-1 min-h-0 flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 pb-6 shrink-0"
          aria-label="My Gujarat Property — home"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
            <Building2 className="h-[17px] w-[17px]" aria-hidden="true" />
          </span>
          {!collapsed && (
            <span className="text-sm font-semibold text-ink truncate">
              My Gujarat Property
            </span>
          )}
        </Link>

        <nav className="flex flex-col gap-1 overflow-y-auto min-h-0">
          {navItems.map((item) => {
            const divider = item.dividerBefore && (
              <div
                key={`${item.label}-divider`}
                className="my-1 h-px bg-border"
                role="separator"
              />
            );
            if (item.disabled) {
              return (
                <div key={item.label} className="contents">
                  {divider}
                  <span
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-ink-muted opacity-50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {item.icon}
                    {!collapsed && item.label}
                  </span>
                </div>
              );
            }
            return (
              <div key={item.label} className="contents">
                {divider}
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-colors",
                    item.active
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10"
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!!item.badge && item.badge > 0 && (
                    <span
                      className={cn(
                        "shrink-0 min-w-[20px] h-5 px-1.5 rounded-full text-white text-[11px] font-semibold flex items-center justify-center",
                        item.badgeVariant === "danger"
                          ? "bg-red-500"
                          : "bg-brand"
                      )}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-surface-subtle">
        <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold shrink-0">
          {userName.charAt(0).toUpperCase()}
        </span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink truncate">{userName}</p>
            <p className="text-xs text-ink-muted truncate">{userRole}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-pressed={collapsed}
          className="w-6 h-6 shrink-0 flex items-center justify-center rounded-lg text-ink-muted hover:bg-ink/10 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform",
              collapsed && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
