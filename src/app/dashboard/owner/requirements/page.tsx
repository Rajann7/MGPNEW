import { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyRequirements } from "@/lib/actions/requirements";
import { getProposalCountsByRequirement } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { StatusTabs, type StatusTab } from "@/components/dashboard/StatusTabs";
import { OwnerEntityCard } from "@/components/dashboard/OwnerEntityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Requirements",
  robots: { index: false, follow: false },
};

const BASE_HREF = "/dashboard/owner/requirements";

function matchesTab(status: EntityStatus, tab: string) {
  if (tab === "all") return true;
  if (tab === "active") return status === "published";
  if (tab === "closed") return status === "paused";
  return false;
}

export default async function OwnerRequirementsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [profile, params] = await Promise.all([
    requireRole("owner"),
    searchParams,
  ]);
  const activeTab = params.status ?? "all";

  const [result, proposalCountsResult] = await Promise.all([
    getMyRequirements(1, 100),
    getProposalCountsByRequirement(),
  ]);
  const allItems = result.success ? result.data.items : [];
  const proposalCounts = proposalCountsResult.success
    ? proposalCountsResult.data
    : {};

  const tabs: StatusTab[] = [
    { key: "all", label: "All", count: allItems.length },
    ...(["active", "closed"] as const).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      count: allItems.filter((r) =>
        matchesTab((r.status ?? "draft") as EntityStatus, key)
      ).length,
    })),
  ];

  const items = allItems.filter((r) =>
    matchesTab((r.status ?? "draft") as EntityStatus, activeTab)
  );

  return (
    <DashboardShellV2
      title="My Requirements"
      breadcrumb={["Dashboard", "My Requirements"]}
      mobileBackHref="/dashboard/owner"
      mobileBackAction={{
        href: "/dashboard/owner/requirements/new",
        label: "Post Requirement",
      }}
      navItems={getOwnerNav("/dashboard/owner/requirements")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <DashboardPageHeader
        title="My Requirements"
        count={result.success ? result.data.total : 0}
        itemLabel="requirement"
        actionLabel="Post Requirement"
        actionHref="/dashboard/owner/requirements/new"
        hideActionOnMobile
      />

      {!result.success && (
        <Alert tone="danger">
          Failed to load requirements. Please refresh.
        </Alert>
      )}

      {result.success && allItems.length > 0 && (
        <StatusTabs tabs={tabs} activeKey={activeTab} baseHref={BASE_HREF} />
      )}

      {result.success && allItems.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          tone="brand"
          title="No requirements posted"
          description="Tell brokers and builders what you're looking for — they'll send proposals to you."
          actionLabel="Post Requirement"
          actionHref="/dashboard/owner/requirements/new"
        />
      )}

      {result.success && allItems.length > 0 && items.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title={`No ${activeTab} requirements`}
          description="Try a different filter to see more of your requirements."
        />
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((req) => {
            const status = (req.status ?? "draft") as EntityStatus;
            const isPaused = status === "paused";
            const proposalCount = proposalCounts[req.id!] ?? 0;
            const budgetText = req.budget_max
              ? `₹${Number(req.budget_min ?? 0).toLocaleString("en-IN")}–₹${Number(req.budget_max).toLocaleString("en-IN")}`
              : req.rent_max
                ? `₹${Number(req.rent_min ?? 0).toLocaleString("en-IN")}–₹${Number(req.rent_max).toLocaleString("en-IN")}/mo`
                : undefined;
            const closedNote =
              isPaused && req.updated_at
                ? `closed ${new Date(req.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
                : undefined;

            return (
              <OwnerEntityCard
                key={req.id}
                kind="requirement"
                entityId={req.id!}
                status={status}
                title={req.title ?? "Untitled"}
                metaParts={[
                  budgetText,
                  req.city_text ?? undefined,
                  isPaused ? closedNote : req.possession_timeline,
                  status === "published" || status === "paused"
                    ? `${proposalCount} ${proposalCount === 1 ? "proposal" : "proposals"} received`
                    : undefined,
                ]}
                relatedCount={proposalCount}
                proposalsHref={
                  status === "published" || status === "paused"
                    ? `/dashboard/owner/requirements/${req.id}/proposals`
                    : undefined
                }
                editHref={`/dashboard/owner/requirements/${req.id}/edit`}
                showPauseResume={["published", "paused"].includes(status)}
                isPaused={isPaused}
                showDelete={false}
                entityLabel="requirement"
                pauseLabel="Close"
                resumeLabel="Reopen"
              />
            );
          })}
        </div>
      )}
    </DashboardShellV2>
  );
}
