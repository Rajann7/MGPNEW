import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { ProposalListClient } from "@/components/proposals/ProposalListClient";
import { RequirementProposeClient } from "@/components/proposals/RequirementProposeClient";
import {
  getMyProposals,
  getOpenRequirementsForBroker,
} from "@/lib/actions/proposals";

export const metadata: Metadata = {
  title: "Proposals",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BrokerProposalsPage() {
  const profile = await requireRole("broker");

  const [sent, received, openRequirements] = await Promise.all([
    getMyProposals("sent"),
    getMyProposals("received"),
    getOpenRequirementsForBroker(),
  ]);

  return (
    <DashboardShellV2
      title="Proposals"
      navItems={getBrokerNav("/dashboard/broker/proposals")}
      mobileBackHref="/dashboard/broker"
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/proposals")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">Received</h2>
          <ProposalListClient
            items={received.success ? received.data.items : []}
            direction="received"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">Sent</h2>
          <ProposalListClient
            items={sent.success ? sent.data.items : []}
            direction="sent"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Open Requirements — Send a Proposal
          </h2>
          <RequirementProposeClient
            items={openRequirements.success ? openRequirements.data.items : []}
            emptyMessage="No open requirements are posted yet."
          />
        </div>
      </div>
    </DashboardShellV2>
  );
}
