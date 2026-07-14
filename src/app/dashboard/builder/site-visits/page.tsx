import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { SiteVisitsClient } from "@/components/dashboard/SiteVisitsClient";
import { Alert } from "@/components/ui/Alert";
import { buildSiteVisitRows } from "@/lib/dashboard/site-visit-rows";

export const metadata: Metadata = {
  title: "Site Visits",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B8-S11 — Builder Site Visits. Same real, RLS-scoped list as the Owner screen
 * (shared enrichment + actions), mounted in the Builder shell.
 */
export default async function BuilderSiteVisitsPage() {
  const profile = await requireRole("builder");
  const { ok, rows } = await buildSiteVisitRows(profile.id);

  return (
    <DashboardShellV2
      title="Site Visits"
      breadcrumb={["Dashboard", "Site Visits"]}
      mobileDrawerNav={getBuilderNav("/dashboard/builder/site-visits")}
      navItems={getBuilderNav("/dashboard/builder/site-visits")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/site-visits")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      {!ok ? (
        <Alert tone="danger">
          Couldn&apos;t load your site visits. Check your connection and retry.
        </Alert>
      ) : (
        <SiteVisitsClient
          items={rows}
          emptyHint="When a buyer books a visit on one of your projects, it appears here."
        />
      )}
    </DashboardShellV2>
  );
}
