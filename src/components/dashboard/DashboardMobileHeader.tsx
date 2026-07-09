"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { cn } from "@/lib/cn";

export interface MobileDrawerNavItem {
  label: string;
  href: string;
  /** Pre-rendered icon element — icon components (functions) can't cross the server→client boundary. */
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  badge?: number;
  dividerBefore?: boolean;
}

/**
 * Mobile-only app header (hamburger + brand + bell) with a slide-in drawer
 * that carries the full per-role module list (with real badge counts) plus
 * profile + logout. Root dashboard screens have no back button — the
 * hamburger is the primary nav affordance here (Batch 6 · Screen 1C/1D).
 */
export function DashboardMobileHeader({
  title,
  navItems,
  userName,
  userRole,
  userCity,
}: {
  title: string;
  navItems: MobileDrawerNavItem[];
  userName: string;
  userRole: string;
  userCity?: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-10 flex items-center justify-between gap-3 h-16 px-4 border-b border-border bg-surface/90 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-ink/5 dark:hover:bg-white/10 text-ink-soft transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <h1 className="text-sm font-semibold text-ink truncate">{title}</h1>
        </div>
        <NotificationBell />
      </header>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-[300px] max-w-[85vw] bg-surface flex flex-col transition-transform duration-200",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigation"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-border shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center text-sm font-semibold shrink-0">
                {userName.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink truncate">
                  {userName}
                </p>
                <p className="text-xs text-ink-muted truncate">
                  {userRole}
                  {userCity ? ` · ${userCity}` : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink-soft transition-colors shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
            {navItems.map((item, i) => {
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
                      {item.label}
                    </span>
                  </div>
                );
              }
              return (
                <div key={item.label ?? i} className="contents">
                  {divider}
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-colors",
                      item.active
                        ? "bg-brand-soft text-brand font-medium"
                        : "text-ink-soft hover:bg-ink/5 dark:hover:bg-white/10"
                    )}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.icon}
                    <span className="flex-1 truncate">{item.label}</span>
                    {!!item.badge && item.badge > 0 && (
                      <span className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-brand text-white text-[11px] font-semibold flex items-center justify-center">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="px-3 py-3 border-t border-border shrink-0">
            <LogoutButton
              redirectTo="/"
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-red-600 hover:bg-red-500/10 transition-colors"
            >
              Log out
            </LogoutButton>
          </div>
        </aside>
      </div>
    </>
  );
}
