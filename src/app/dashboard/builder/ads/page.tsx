import { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";

export const metadata: Metadata = {
  title: "Ads / Promotions",
  robots: { index: false, follow: false },
};

export default async function BuilderAdsPage() {
  const profile = await requireRole("builder");

  return (
    <DashboardShellV2
      title="Ads / Promotions"
      navItems={getBuilderNav("/dashboard/builder/ads")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/ads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <DashboardPlaceholderPanel
        icon={Megaphone}
        status="coming_soon"
        title="Banner Ads Coming Soon"
        description="City-targeted banner promotions for your published projects will be available in a later phase. No ads are active — nothing is charged or shown publicly yet. All ads will carry a clear 'Sponsored' label and require plan eligibility once launched."
      />
    </DashboardShellV2>
  );
}
