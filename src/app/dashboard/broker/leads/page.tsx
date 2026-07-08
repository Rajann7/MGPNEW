import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { LeadListClient } from "@/components/leads/LeadListClient";
import { LeadKanbanBoard } from "@/components/leads/LeadKanbanBoard";
import {
  getMyLeadsAsReceiver,
  getMyLeadsAsRequester,
} from "@/lib/actions/leads";

export const metadata: Metadata = {
  title: "Leads / CRM",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BrokerLeadsPage() {
  const profile = await requireRole("broker");
  const [received, sent] = await Promise.all([
    getMyLeadsAsReceiver(),
    getMyLeadsAsRequester(),
  ]);

  return (
    <DashboardShellV2
      title="Leads / CRM"
      navItems={getBrokerNav("/dashboard/broker/leads")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/leads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Leads Received
          </h2>
          {/* Kanban pipeline on desktop (design Batch 7, lg+); list on mobile */}
          <div className="hidden lg:block">
            <LeadKanbanBoard
              items={received.success ? received.data.items : []}
              basePath="/dashboard/leads"
            />
          </div>
          <div className="lg:hidden">
            <LeadListClient
              items={received.success ? received.data.items : []}
              basePath="/dashboard/leads"
            />
          </div>
        </div>
        {sent.success && sent.data.items.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 mb-3">
              My Inquiries
            </h2>
            <LeadListClient
              items={sent.data.items}
              basePath="/dashboard/leads"
            />
          </div>
        )}
      </div>
    </DashboardShellV2>
  );
}
