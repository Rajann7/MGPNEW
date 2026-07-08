import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  disabledReason?: string;
}

export function AdminSidebar({
  navItems,
  staffName,
  staffRole,
}: {
  navItems: AdminNavItem[];
  staffName: string;
  staffRole: string;
}) {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[230px] flex-col justify-between border-r border-zinc-200 bg-white px-4 py-6 z-20">
      <div className="flex flex-col gap-1 min-h-0 flex-1">
        <Link
          href="/admin"
          className="flex items-center gap-2 px-2 pb-6 shrink-0"
          aria-label="Admin panel home"
        >
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
        </Link>

        <nav
          className="flex flex-col gap-1 overflow-y-auto min-h-0"
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
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-500 hover:bg-zinc-100 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          View public site
        </Link>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-50">
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
  );
}
