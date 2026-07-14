import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getMyBanner, getAdvertisableProjects } from "@/lib/banner/queries";
import { GUJARAT_CITIES } from "@/components/location/CityProvider";
import { BannerAdForm } from "@/components/banner/BannerAdForm";

export const metadata: Metadata = {
  title: "Edit Banner Ad",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** Edit an editable banner ad (draft / needs_changes / rejected). */
export default async function EditBannerAdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireRole("builder");
  const ad = await getMyBanner(profile.id, id);
  if (!ad) notFound();

  const projects = await getAdvertisableProjects(profile.id);

  return (
    <DashboardShellV2
      title="Edit Banner Ad"
      navItems={getBuilderNav("/dashboard/builder/ads")}
      mobileBackHref="/dashboard/builder/ads"
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/ads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <Link
        href="/dashboard/builder/ads"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Banner ads
      </Link>
      {!["draft", "needs_changes", "rejected"].includes(ad.status) ? (
        <div className="max-w-md rounded-card border border-border bg-surface p-5 shadow-soft">
          <p className="text-sm font-semibold text-ink">This ad can no longer be edited</p>
          <p className="mt-1 text-sm text-ink-muted">
            Only drafts, or ads that need changes / were rejected, can be edited.
            This ad is currently <span className="font-medium">{ad.status.replace(/_/g, " ")}</span>.
          </p>
        </div>
      ) : (
        <BannerAdForm authUid={profile.auth_user_id} projects={projects} cities={GUJARAT_CITIES} initial={ad} />
      )}
    </DashboardShellV2>
  );
}
