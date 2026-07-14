import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { SiteVisitsClient } from "@/components/dashboard/SiteVisitsClient";
import { Alert } from "@/components/ui/Alert";
import { buildSiteVisitRows } from "@/lib/dashboard/site-visit-rows";

export const metadata: Metadata = {
  title: "Site Visits",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B7-S13 — Broker Site Visits. Same real, RLS-scoped list as the Owner screen
 * (shared enrichment + actions), mounted in the Broker shell.
 */
export default async function BrokerSiteVisitsPage() {
  const profile = await requireRole("broker");
  const { ok, rows } = await buildSiteVisitRows(profile.id);

  return (
    <DashboardShellV2
      title="Site Visits"
      breadcrumb={["Dashboard", "Site Visits"]}
      mobileDrawerNav={getBrokerNav("/dashboard/broker/site-visits")}
      navItems={getBrokerNav("/dashboard/broker/site-visits")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/site-visits")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      {!ok ? (
        <Alert tone="danger">
          Couldn&apos;t load your site visits. Check your connection and retry.
        </Alert>
      ) : (
        <SiteVisitsClient
          items={rows}
          emptyHint="When you request a visit on a listing or a buyer books one on yours, it appears here."
        />
      )}
    </DashboardShellV2>
  );
}
