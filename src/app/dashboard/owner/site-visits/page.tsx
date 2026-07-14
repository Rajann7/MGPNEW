import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { SiteVisitsClient } from "@/components/dashboard/SiteVisitsClient";
import { Alert } from "@/components/ui/Alert";
import { buildSiteVisitRows } from "@/lib/dashboard/site-visit-rows";

export const metadata: Metadata = {
  title: "Site Visits",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B6-S08 — Owner Site Visits List. Real data via listMySiteVisits (RLS: rows
 * where the owner is requester OR host). Enriched server-side with the real
 * property/project title and the counterpart's display name — no fabricated
 * fields. Actions (Accept/Reject/Reschedule/Cancel) call the real site-visit
 * server actions, which enforce participant + status-transition rules.
 */
export default async function OwnerSiteVisitsPage() {
  const profile = await requireRole("owner");
  const { ok, rows } = await buildSiteVisitRows(profile.id);

  return (
    <DashboardShellV2
      title="Site Visits"
      breadcrumb={["Dashboard", "Site Visits"]}
      navItems={getOwnerNav("/dashboard/owner/site-visits")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/site-visits")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/site-visits")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      {!ok ? (
        <Alert tone="danger">
          Couldn&apos;t load your site visits. Check your connection and retry.
        </Alert>
      ) : (
        <SiteVisitsClient items={rows} />
      )}
    </DashboardShellV2>
  );
}
