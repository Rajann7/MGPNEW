import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getNavForRole,
  getMobileTabsForRole,
  getRoleLabel,
} from "@/lib/dashboard/navForRole";
import { LeadDetailClient } from "@/components/leads/LeadDetailClient";
import {
  getLeadDetail,
  getLeadNotes,
  getLeadFollowups,
  getLeadTimeline,
  getPossibleDuplicateLeads,
} from "@/lib/actions/leads";
import { getContactRevealStatus } from "@/lib/actions/contact";
import { createServiceClient } from "@/lib/supabase/service";
import type { SiteVisit } from "@/types";

export const metadata: Metadata = {
  title: "Lead Detail",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireAuth();

  const detail = await getLeadDetail(id);
  if (!detail.success) {
    if (detail.error === "NOT_PARTICIPANT")
      redirect("/unauthorized?reason=not_participant");
    notFound();
  }

  const [notesResult, followupsResult, timelineResult, contactResult, duplicatesResult] =
    await Promise.all([
      getLeadNotes(id),
      getLeadFollowups(id),
      getLeadTimeline(id),
      getContactRevealStatus(id),
      getPossibleDuplicateLeads(id),
    ]);

  const admin = createServiceClient();
  const { data: siteVisits } = await admin
    .from("site_visits")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const activeHref = `/dashboard/${profile.public_role}/leads`;

  return (
    <DashboardShellV2
      title="Lead Detail"
      navItems={getNavForRole(profile.public_role, activeHref)}
      mobileTabs={getMobileTabsForRole(profile.public_role, activeHref)}
      userName={profile.display_name ?? profile.full_name}
      userRole={getRoleLabel(profile.public_role)}
      mobileBackHref={activeHref}
      hideMobileTabBar
    >
      <LeadDetailClient
        lead={detail.data.lead}
        isReceiver={detail.data.isReceiver}
        initialNotes={notesResult.success ? notesResult.data.items : []}
        initialFollowups={
          followupsResult.success ? followupsResult.data.items : []
        }
        initialTimeline={
          timelineResult.success ? timelineResult.data.items : []
        }
        initialContactRequest={
          contactResult.success ? contactResult.data.contactRequest : null
        }
        initialRevealedMobile={
          contactResult.success ? contactResult.data.revealedMobile : null
        }
        initialRevealedEmail={
          contactResult.success ? contactResult.data.revealedEmail : null
        }
        initialSiteVisits={(siteVisits ?? []) as SiteVisit[]}
        initialDuplicateFlags={
          duplicatesResult.success ? duplicatesResult.data.items : []
        }
      />
    </DashboardShellV2>
  );
}
