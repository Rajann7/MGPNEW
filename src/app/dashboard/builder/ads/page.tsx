import { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getMyBanners } from "@/lib/banner/queries";
import { bannerFeatures } from "@/lib/banner/config";
import { BannerStatusBadge } from "@/components/banner/BannerStatusBadge";
import { BannerListActions } from "@/components/banner/BannerListActions";

export const metadata: Metadata = {
  title: "Banner Ads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * Builder banner ads dashboard. Promote a PUBLISHED project on the homepage
 * "Top picks" carousel. Nothing goes live without team approval; payment is
 * provider-gated (Razorpay for ads not wired) — never faked.
 */
export default async function BuilderBannerAdsPage() {
  const profile = await requireRole("builder");
  const ads = await getMyBanners(profile.id);

  return (
    <DashboardShellV2
      title="Banner Ads"
      navItems={getBuilderNav("/dashboard/builder/ads")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/ads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-ink">Banner ads</h2>
          <p className="text-xs text-ink-muted">
            Promote your published projects on the city homepage. Nothing goes
            live without team approval.
          </p>
        </div>
        <Link
          href="/dashboard/builder/ads/new"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
        >
          <Plus className="h-4 w-4" /> Create banner ad
        </Link>
      </div>

      {!bannerFeatures.paymentRequired && (
        <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-700 dark:text-amber-300">
          Paid banner packages are <span className="font-semibold">Setup Required</span> —
          the Razorpay ads flow isn&apos;t enabled yet. Submitted ads go to admin
          review and run free once approved; no payment is taken or faked.
        </div>
      )}

      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
          <Megaphone className="mb-3 h-9 w-9 text-ink-muted" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink">No banner ads yet</p>
          <p className="mt-1 max-w-xs text-xs text-ink-muted">
            Create your first city-targeted banner ad to promote a published
            project.
          </p>
          <Link
            href="/dashboard/builder/ads/new"
            className="mt-4 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
          >
            Create banner ad
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => (
            <div key={ad.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  {ad.desktop_image_url || ad.mobile_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ad.desktop_image_url || ad.mobile_image_url || ""} alt="" className="h-12 w-20 shrink-0 rounded object-cover" />
                  ) : (
                    <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded bg-surface-muted text-[10px] text-ink-muted">No image</div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-ink">{ad.title}</h3>
                      <BannerStatusBadge status={ad.status} endDate={ad.end_date} />
                    </div>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {ad.gujarat_wide ? "Gujarat-wide" : (ad.targets?.map((t) => t.city_name).join(", ") || "No city")}
                      {ad.start_date && ad.end_date ? ` · ${ad.start_date} → ${ad.end_date}` : ` · ${ad.duration_days} days`}
                    </p>
                    {ad.rejection_reason && (ad.status === "rejected" || ad.status === "needs_changes") && (
                      <p className="mt-1 text-xs text-danger">Reason: {ad.rejection_reason}</p>
                    )}
                  </div>
                </div>
              </div>
              <BannerListActions id={ad.id} status={ad.status} endDate={ad.end_date} isPaused={ad.is_paused} />
            </div>
          ))}
        </div>
      )}

      {!bannerFeatures.analytics && (
        <p className="mt-5 text-xs text-ink-muted">Impression &amp; click analytics will appear here once tracking is enabled — no estimated or fake numbers are shown.</p>
      )}
    </DashboardShellV2>
  );
}
