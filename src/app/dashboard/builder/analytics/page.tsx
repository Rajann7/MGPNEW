import { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { BuilderAnalyticsOverview } from "@/components/dashboard/BuilderAnalyticsOverview";
import { StatCardGradientSkeletonGrid } from "@/components/dashboard/StatCardGradient";

export const metadata: Metadata = {
  title: "Project Analytics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B8-S19 — Builder Project Analytics (real project/unit/lead/visit counts; honest view state). */
export default async function BuilderAnalyticsPage() {
  const profile = await requireRole("builder");
  return (
    <DashboardShellV2
      title="Project Analytics"
      breadcrumb={["Dashboard", "Analytics"]}
      mobileDrawerNav={getBuilderNav("/dashboard/builder/analytics")}
      navItems={getBuilderNav("/dashboard/builder/analytics")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/analytics")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <Suspense fallback={<StatCardGradientSkeletonGrid />}>
        <BuilderAnalyticsOverview />
      </Suspense>
    </DashboardShellV2>
  );
}
