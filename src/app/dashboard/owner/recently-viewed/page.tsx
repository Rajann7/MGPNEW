import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, History } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { ClearHistoryButton } from "@/components/public/ClearHistoryButton";
import { Alert } from "@/components/ui/Alert";
import { listRecentlyViewed } from "@/lib/actions/saved";

export const metadata: Metadata = {
  title: "Recently Viewed",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const HREF: Record<string, (slug: string) => string | null> = {
  property: (s) => `/property/${s}`,
  project: (s) => `/project/${s}`,
  requirement: () => null,
};

/**
 * B6-S12 — Owner Recently Viewed. Real history from recently_viewed_items
 * (RLS: own rows only), enriched with real titles. Honest empty state.
 */
export default async function OwnerRecentlyViewedPage() {
  const profile = await requireRole("owner");
  const res = await listRecentlyViewed();
  const items = res.success ? res.data.items : [];

  return (
    <DashboardShellV2
      title="Recently Viewed"
      breadcrumb={["Dashboard", "Recently Viewed"]}
      mobileBackHref="/dashboard/owner"
      navItems={getOwnerNav("/dashboard/owner/recently-viewed")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/recently-viewed")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/recently-viewed")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      {!res.success ? (
        <Alert tone="danger">
          Couldn&apos;t load your history. Check your connection and retry.
        </Alert>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
          <History className="mb-3 h-9 w-9 text-muted" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink">Nothing viewed yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            Listings and projects you open will show up here so you can jump back
            to them.
          </p>
          <Link
            href="/search"
            className="mt-4 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
          >
            Browse listings
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted">{items.length} recently viewed</p>
            <ClearHistoryButton />
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((it) => {
              const href =
                it.available && it.slug ? HREF[it.item_type]?.(it.slug) : null;
              const inner = (
                <>
                  <span className="h-[52px] w-16 flex-shrink-0 rounded-[10px] bg-[repeating-linear-gradient(45deg,var(--color-bg),var(--color-bg)_8px,var(--color-border)_8px,var(--color-border)_16px)]" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">
                      {it.title}
                    </div>
                    <div className="truncate text-xs text-muted capitalize">
                      {it.cityText ??
                        (it.available ? it.item_type : "No longer available")}
                    </div>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0 text-muted" />
                </>
              );
              const cls =
                "flex items-center gap-3 rounded-2xl border border-border bg-surface p-3";
              return href ? (
                <li key={it.id}>
                  <Link href={href} className={`${cls} transition-colors hover:bg-bg`}>
                    {inner}
                  </Link>
                </li>
              ) : (
                <li key={it.id} className={`${cls} cursor-default opacity-70`}>
                  {inner}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </DashboardShellV2>
  );
}
