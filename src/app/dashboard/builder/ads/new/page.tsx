import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { getAdvertisableProjects } from "@/lib/banner/queries";
import { GUJARAT_CITIES } from "@/components/location/CityProvider";
import { BannerAdForm } from "@/components/banner/BannerAdForm";

export const metadata: Metadata = {
  title: "New Banner Ad",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** Create a banner ad — real published project options + full Gujarat city list. */
export default async function NewBannerAdPage() {
  const profile = await requireRole("builder");
  const projects = await getAdvertisableProjects(profile.id);

  return (
    <DashboardShellV2
      title="New Banner Ad"
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
      <BannerAdForm authUid={profile.auth_user_id} projects={projects} cities={GUJARAT_CITIES} />
    </DashboardShellV2>
  );
}
