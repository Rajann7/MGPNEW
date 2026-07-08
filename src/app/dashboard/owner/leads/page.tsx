import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { LeadListClient } from "@/components/leads/LeadListClient";
import {
  getMyLeadsAsReceiver,
  getMyLeadsAsRequester,
} from "@/lib/actions/leads";

export const metadata: Metadata = {
  title: "Inquiries / Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function OwnerLeadsPage() {
  const profile = await requireRole("owner");
  const [received, sent] = await Promise.all([
    getMyLeadsAsReceiver(),
    getMyLeadsAsRequester(),
  ]);

  return (
    <DashboardShellV2
      title="Inquiries / Leads"
      navItems={getOwnerNav("/dashboard/owner/leads")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/leads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Inquiries Received
          </h2>
          <LeadListClient
            items={received.success ? received.data.items : []}
            basePath="/dashboard/leads"
          />
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
