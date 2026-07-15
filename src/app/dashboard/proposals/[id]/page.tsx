import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getNavForRole,
  getMobileTabsForRole,
  getRoleLabel,
} from "@/lib/dashboard/navForRole";
import { ProposalDetailClient } from "@/components/proposals/ProposalDetailClient";
import { getProposalDetail } from "@/lib/actions/proposals";
import { createOrGetThreadForLead, listMessages } from "@/lib/actions/messages";

export const metadata: Metadata = {
  title: "Proposal Detail",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireAuth();

  const detail = await getProposalDetail(id);
  if (!detail.success) {
    if (detail.error === "NOT_PARTICIPANT")
      redirect("/unauthorized?reason=not_participant");
    notFound();
  }

  let threadId: string | null = null;
  let initialMessages: Awaited<ReturnType<typeof listMessages>> | null = null;
  if (detail.data.lead_id) {
    const threadResult = await createOrGetThreadForLead(detail.data.lead_id);
    if (threadResult.success) {
      threadId = threadResult.data.threadId;
      initialMessages = await listMessages(threadId);
    }
  }

  const activeHref = `/dashboard/${profile.public_role}/proposals`;

  return (
    <DashboardShellV2
      title="Proposal Detail"
      navItems={getNavForRole(profile.public_role, activeHref)}
      mobileTabs={getMobileTabsForRole(profile.public_role, activeHref)}
      userName={profile.display_name ?? profile.full_name}
      userRole={getRoleLabel(profile.public_role)}
      mobileBackHref={activeHref}
      hideMobileTabBar
    >
      <ProposalDetailClient
        proposal={detail.data}
        threadId={threadId}
        initialMessages={
          initialMessages?.success ? initialMessages.data.items : []
        }
      />
    </DashboardShellV2>
  );
}
