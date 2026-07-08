import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { LeadListClient } from "@/components/leads/LeadListClient";
import { LeadKanbanBoard } from "@/components/leads/LeadKanbanBoard";
import {
  getMyLeadsAsReceiver,
  getMyLeadsAsRequester,
} from "@/lib/actions/leads";

export const metadata: Metadata = {
  title: "Project Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BuilderLeadsPage() {
  const profile = await requireRole("builder");
  const [received, sent] = await Promise.all([
    getMyLeadsAsReceiver(),
    getMyLeadsAsRequester(),
  ]);

  return (
    <DashboardShellV2
      title="Project Leads"
      navItems={getBuilderNav("/dashboard/builder/leads")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/leads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Project Leads
          </h2>
          {/* Kanban pipeline on desktop (design Batch 7/8, lg+); list on mobile */}
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
