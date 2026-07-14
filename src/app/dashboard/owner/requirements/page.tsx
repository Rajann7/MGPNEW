import { Metadata } from "next";
import { Search, KeyRound, FileText } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyRequirements } from "@/lib/actions/requirements";
import { getProposalCountsByRequirement } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { OwnerEntityCard } from "@/components/dashboard/OwnerEntityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus, RequirementPurpose } from "@/types";

export const metadata: Metadata = {
  title: "My Requirements",
  robots: { index: false, follow: false },
};

/** Purpose icon — matches the reference design (Search for buy/business, KeyRound for rent/lease/pg). */
function requirementIconFor(purpose: RequirementPurpose | null | undefined) {
  return purpose === "rent" || purpose === "lease" || purpose === "pg"
    ? KeyRound
    : Search;
}

export default async function OwnerRequirementsPage() {
  const profile = await requireRole("owner");

  const [result, proposalCountsResult] = await Promise.all([
    getMyRequirements(1, 100),
    getProposalCountsByRequirement(),
  ]);
  const items = result.success ? result.data.items : [];
  const proposalCounts = proposalCountsResult.success
    ? proposalCountsResult.data
    : {};

  return (
    <DashboardShellV2
      title="My Requirements"
      breadcrumb={["Dashboard", "My Requirements"]}
      navItems={getOwnerNav("/dashboard/owner/requirements")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/requirements")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <div className="sm:bg-surface sm:border sm:border-border sm:rounded-2xl sm:overflow-hidden">
        <div className="sm:px-5 sm:py-4 sm:border-b sm:border-border">
          <DashboardPageHeader
            title="My Requirements"
            count={result.success ? result.data.total : 0}
            itemLabel="requirement"
            actionLabel="Post Requirement"
            actionHref="/dashboard/owner/requirements/new"
            hideActionOnMobile
            dense
          />
        </div>

        {!result.success && (
          <Alert tone="danger">
            Failed to load requirements. Please refresh.
          </Alert>
        )}

        {result.success && items.length === 0 && (
          <div className="sm:px-5 sm:pb-5 sm:pt-4">
            <EmptyState
              icon={FileText}
              tone="brand"
              dashed
              compact
              hideActionIcon
              title="No requirements posted"
              description="Tell brokers and builders what you're looking for — they'll send proposals to you."
              actionLabel="Post Requirement"
              actionHref="/dashboard/owner/requirements/new"
            />
          </div>
        )}

        {items.length > 0 && (
          <div className="space-y-3 sm:px-5 sm:pb-5 sm:pt-4">
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
                  requirementIcon={requirementIconFor(req.purpose)}
                  metaParts={[
                    budgetText,
                    isPaused ? closedNote : req.city_text ?? undefined,
                    !isPaused ? req.possession_timeline : undefined,
                    `${proposalCount} ${proposalCount === 1 ? "proposal" : "proposals"} received`,
                  ]}
                  relatedCount={proposalCount}
                  proposalsHref={
                    !isPaused
                      ? `/dashboard/owner/requirements/${req.id}/proposals`
                      : undefined
                  }
                  editHref={
                    !isPaused
                      ? `/dashboard/owner/requirements/${req.id}/edit`
                      : undefined
                  }
                  showPauseResume={["published", "paused"].includes(status)}
                  isPaused={isPaused}
                  showDelete={false}
                  entityLabel="requirement"
                  pauseLabel="Close"
                  resumeLabel="Reopen"
                  pauseDanger
                  resumeFilled={false}
                />
              );
            })}
          </div>
        )}
      </div>
    </DashboardShellV2>
  );
}
