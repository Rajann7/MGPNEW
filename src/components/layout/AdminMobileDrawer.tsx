import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import type { AdminNavItem } from "./AdminSidebar";
import { cn } from "@/lib/cn";
import { AdminDrawerBehavior } from "./AdminDrawerBehavior";

/**
 * Hamburger that toggles the drawer. Rendered inside the contextual header;
 * targets the drawer checkbox by id, so it does not need to be a DOM sibling of
 * the panel (which lives at the shell root to avoid the header's backdrop-filter
 * containing block clamping the fixed panel to header height).
 */
export function AdminMenuButton() {
  return (
    <label
      htmlFor="admin-drawer"
      aria-label="Open menu"
      role="button"
      tabIndex={0}
      className="lg:hidden w-11 h-11 -ml-2 flex items-center justify-center rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
    >
      <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
    </label>
  );
}

/**
 * Admin mobile navigation (Batch 1 · shell 3F): contextual header hamburger +
 * left drawer over a dimmed overlay. Admin is desktop-primary — there is NO
 * bottom nav on mobile (locked design rule); the drawer is the only mobile nav.
 *
 * Implemented as a pure-CSS checkbox toggle (no client JS) so this stays a
 * Server Component and Lucide icon components can be passed in navItems without
 * crossing a client serialization boundary.
 */
export function AdminMobileDrawer({
  navItems,
  staffName,
  staffRole,
}: {
  navItems: AdminNavItem[];
  staffName: string;
  staffRole: string;
}) {
  return (
    <div className="contents lg:hidden">
      <input type="checkbox" id="admin-drawer" className="peer sr-only" />
      <AdminDrawerBehavior />

      {/* Overlay (tap to close) */}
      <label
        htmlFor="admin-drawer"
        aria-label="Close menu"
        className="lg:hidden fixed inset-0 z-40 bg-zinc-900/45 opacity-0 pointer-events-none transition-opacity peer-checked:opacity-100 peer-checked:pointer-events-auto"
      />

      {/* Drawer panel */}
      <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-[0_12px_32px_rgba(0,0,0,.2)] flex flex-col px-4 py-4 -translate-x-full transition-transform duration-200 peer-checked:translate-x-0">
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-100">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white text-sm font-bold">
              M
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                Admin Panel
              </p>
              <p className="text-[11px] text-zinc-400 truncate">
                Internal — not public
              </p>
            </div>
          </div>
          <label
            htmlFor="admin-drawer"
            aria-label="Close menu"
            role="button"
            tabIndex={0}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
          </label>
        </div>

        <nav
          className="flex flex-col gap-1 overflow-y-auto min-h-0 flex-1"
          aria-label="Admin navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.disabled) {
              return (
                <span
                  key={item.label}
                  title={item.disabledReason ?? "No permission for this module"}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 opacity-60 cursor-not-allowed"
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                  item.active
                    ? "bg-zinc-900 text-white font-medium"
                    : "text-zinc-600 hover:bg-zinc-100"
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

        <div className="pt-2 mt-2 border-t border-zinc-100">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-500 hover:bg-zinc-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            View public site
          </Link>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-50 mt-1">
            <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {staffName.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 truncate">
                {staffName}
              </p>
              <p className="text-xs text-zinc-400 truncate capitalize">
                {staffRole.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
