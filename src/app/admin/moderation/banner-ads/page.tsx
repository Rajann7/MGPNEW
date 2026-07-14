import { Metadata } from "next";
import Link from "next/link";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { getAdminBanners } from "@/lib/banner/queries";
import { BannerStatusBadge } from "@/components/banner/BannerStatusBadge";
import { BannerModerationActions } from "@/components/banner/BannerModerationActions";

export const metadata: Metadata = {
  title: "Banner Ad Moderation — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const FILTERS = [
  { key: "pending", label: "Pending" },
  { key: "active", label: "Active" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

export default async function BannerModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const sp = await searchParams;
  const filter: Filter = (FILTERS.some((f) => f.key === sp.filter) ? sp.filter : "pending") as Filter;
  const ads = await getAdminBanners(filter);

  return (
    <AdminShell
      title="Banner Ad Moderation"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/moderation/banner-ads")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`/admin/moderation/banner-ads?filter=${f.key}`}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "border-brand bg-brand-soft text-brand"
                : "border-border bg-surface text-ink-soft hover:border-brand/40 hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <p className="mb-4 text-xs text-ink-muted">
        Approve, request changes or reject promoted banner ads. A reason is
        required for reject / request-changes and every action is logged.
      </p>

      {ads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
          <p className="text-sm font-semibold text-ink">Nothing in this queue</p>
          <p className="mt-1 text-xs text-ink-muted">No {filter === "all" ? "" : filter} banner ads right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => (
            <div key={ad.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start gap-3">
                {ad.desktop_image_url || ad.mobile_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ad.desktop_image_url || ad.mobile_image_url || ""} alt="" className="h-16 w-28 shrink-0 rounded object-cover" />
                ) : (
                  <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded bg-surface-muted text-[10px] text-ink-muted">No image</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-ink">{ad.title}</h3>
                    <BannerStatusBadge status={ad.status} endDate={ad.end_date} />
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {ad.advertiser_name ? `${ad.advertiser_name} · ` : ""}
                    {ad.gujarat_wide ? "Gujarat-wide" : (ad.targets?.map((t) => t.city_name).join(", ") || "No city")}
                    {` · ${ad.duration_days} days`}
                  </p>
                  {ad.project && (
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Project: <span className="text-ink-soft">{ad.project.title}</span>
                      {ad.project.city_text ? ` — ${ad.project.city_text}` : ""}
                    </p>
                  )}
                  {ad.rejection_reason && (
                    <p className="mt-1 text-xs text-danger">Reason on file: {ad.rejection_reason}</p>
                  )}
                </div>
              </div>
              <BannerModerationActions id={ad.id} status={ad.status} isPaused={ad.is_paused} />
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
