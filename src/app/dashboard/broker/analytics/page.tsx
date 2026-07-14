import { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { StatCardGradientSkeletonGrid } from "@/components/dashboard/StatCardGradient";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B7-S15 — Broker Analytics (real listing/lead/visit counts; honest view state). */
export default async function BrokerAnalyticsPage() {
  const profile = await requireRole("broker");
  return (
    <DashboardShellV2
      title="Analytics"
      breadcrumb={["Dashboard", "Analytics"]}
      mobileDrawerNav={getBrokerNav("/dashboard/broker/analytics")}
      navItems={getBrokerNav("/dashboard/broker/analytics")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/analytics")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <Suspense fallback={<StatCardGradientSkeletonGrid />}>
        <AnalyticsOverview />
      </Suspense>
    </DashboardShellV2>
  );
}
