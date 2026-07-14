import { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { StatCardGradientSkeletonGrid } from "@/components/dashboard/StatCardGradient";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B6-S13 — Owner Analytics (real listing/lead/visit counts; honest view state). */
export default async function OwnerAnalyticsPage() {
  const profile = await requireRole("owner");
  return (
    <DashboardShellV2
      title="Analytics"
      breadcrumb={["Dashboard", "Analytics"]}
      navItems={getOwnerNav("/dashboard/owner/analytics")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/analytics")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/analytics")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <Suspense fallback={<StatCardGradientSkeletonGrid />}>
        <AnalyticsOverview />
      </Suspense>
    </DashboardShellV2>
  );
}
