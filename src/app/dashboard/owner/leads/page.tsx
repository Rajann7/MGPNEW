import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { LeadListClient } from "@/components/leads/LeadListClient";
import { LeadsTable, LeadsEmptyState } from "@/components/leads/LeadsTable";
import { LeadStageTabs, type LeadStageTab } from "@/components/leads/LeadStageTabs";
import { bucketForCrmStage, type LeadStageBucket } from "@/components/leads/LeadStageBadge";
import { Alert } from "@/components/ui/Alert";
import {
  getMyLeadsAsReceiver,
  getMyLeadsAsRequester,
} from "@/lib/actions/leads";

export const metadata: Metadata = {
  title: "Inquiries / Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const BASE_HREF = "/dashboard/owner/leads";
const BUCKETS: LeadStageBucket[] = ["new", "contacted", "visited", "closed"];

export default async function OwnerLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const [profile, params, received, sent] = await Promise.all([
    requireRole("owner"),
    searchParams,
    getMyLeadsAsReceiver(1, 100),
    getMyLeadsAsRequester(),
  ]);
  const activeStage = params.stage ?? "all";

  const allItems = received.success ? received.data.items : [];
  const tabs: LeadStageTab[] = [
    { key: "all", label: "All", count: allItems.length },
    ...BUCKETS.map((bucket) => ({
      key: bucket,
      label: bucket.charAt(0).toUpperCase() + bucket.slice(1),
      count: allItems.filter((l) => bucketForCrmStage(l.crm_stage) === bucket)
        .length,
    })),
  ];
  const items =
    activeStage === "all"
      ? allItems
      : allItems.filter((l) => bucketForCrmStage(l.crm_stage) === activeStage);

  return (
    <DashboardShellV2
      title="Leads"
      breadcrumb={["Dashboard", "Leads"]}
      mobileBackHref="/dashboard/owner"
      navItems={getOwnerNav("/dashboard/owner/leads")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/leads")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <div className="sm:bg-surface sm:border sm:border-border sm:rounded-2xl sm:overflow-hidden mb-6">
        <div className="hidden sm:flex items-center gap-3 px-5 py-3.5 border-b border-border">
          <h2 className="text-[17px] font-semibold text-ink flex-1">Leads</h2>
          <LeadStageTabs
            tabs={tabs}
            activeKey={activeStage}
            baseHref={BASE_HREF}
            variant="segmented"
          />
        </div>
        <div className="sm:hidden mb-3">
          <LeadStageTabs
            tabs={tabs}
            activeKey={activeStage}
            baseHref={BASE_HREF}
            variant="chips"
          />
        </div>

        {!received.success && (
          <div className="sm:p-5">
            <Alert tone="danger">
              Couldn&apos;t load leads. Check your connection.
            </Alert>
          </div>
        )}

        {received.success && items.length === 0 && <LeadsEmptyState />}

        {items.length > 0 && <LeadsTable items={items} basePath="/dashboard/leads" />}
      </div>

      {sent.success && sent.data.items.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-ink mb-3">
            My Inquiries
          </h2>
          <LeadListClient items={sent.data.items} basePath="/dashboard/leads" />
        </div>
      )}
    </DashboardShellV2>
  );
}
