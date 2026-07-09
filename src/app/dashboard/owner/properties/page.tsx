import { Metadata } from "next";
import { Home } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyProperties } from "@/lib/actions/properties";
import { getLeadCountsByTarget } from "@/lib/actions/leads";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { StatusTabs, type StatusTab } from "@/components/dashboard/StatusTabs";
import { OwnerEntityCard } from "@/components/dashboard/OwnerEntityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Properties",
  robots: { index: false, follow: false },
};

const BASE_HREF = "/dashboard/owner/properties";

/** Mirrors canEditProperty's EDITABLE_STATUSES (src/lib/permissions/entity-permissions.ts). */
const EDITABLE_STATUSES: EntityStatus[] = [
  "draft",
  "submitted",
  "need_changes",
  "rejected",
  "published",
  "paused",
];

const STATUS_GROUPS: Record<string, EntityStatus[]> = {
  live: ["published"],
  pending: ["submitted", "under_review"],
  rejected: ["rejected"],
  paused: ["paused"],
  expired: ["expired"],
};

function matchesTab(status: EntityStatus, tab: string) {
  if (tab === "all") return true;
  return (STATUS_GROUPS[tab] ?? []).includes(status);
}

/** Real, honest status note — never a fabricated number. */
function statusNote(
  status: EntityStatus,
  expiresAt: string | null | undefined,
  rejectionReason: string | null | undefined
): string | undefined {
  if (status === "published" && expiresAt) {
    const days = Math.ceil(
      (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? `expires in ${days} day${days === 1 ? "" : "s"}` : undefined;
  }
  if (status === "submitted" || status === "under_review")
    return "under review, typically 24 hrs";
  if (status === "paused") return "hidden from search while paused";
  if (status === "rejected") return rejectionReason ?? "rejected — edit and resubmit";
  if (status === "expired") return "expired — repost to make it live again";
  return undefined;
}

export default async function OwnerPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [profile, params] = await Promise.all([
    requireRole("owner"),
    searchParams,
  ]);
  const activeTab = params.status ?? "all";

  const result = await getMyProperties(1, 100);
  const allItems = result.success ? result.data.items : [];

  const leadCountsResult = await getLeadCountsByTarget(
    "property",
    allItems.map((p) => p.id!).filter(Boolean)
  );
  const leadCounts = leadCountsResult.success ? leadCountsResult.data : {};

  const tabs: StatusTab[] = [
    { key: "all", label: "All", count: allItems.length },
    ...(["live", "pending", "rejected", "paused", "expired"] as const).map(
      (key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        count: allItems.filter((p) =>
          matchesTab((p.status ?? "draft") as EntityStatus, key)
        ).length,
      })
    ),
  ];

  const items = allItems.filter((p) =>
    matchesTab((p.status ?? "draft") as EntityStatus, activeTab)
  );

  return (
    <DashboardShellV2
      title="My Properties"
      breadcrumb={["Dashboard", "My Properties"]}
      mobileBackHref="/dashboard/owner"
      mobileBackAction={{
        href: "/dashboard/owner/properties/new",
        label: "Post Property",
      }}
      navItems={getOwnerNav("/dashboard/owner/properties")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/properties")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <div className="sm:bg-surface sm:border sm:border-border sm:rounded-2xl sm:overflow-hidden">
        <div className="sm:px-5 sm:pt-4">
          <DashboardPageHeader
            title="My Properties"
            count={result.success ? result.data.total : 0}
            itemLabel="property"
            itemLabelPlural="properties"
            actionLabel="Post Property"
            actionHref="/dashboard/owner/properties/new"
            hideActionOnMobile
            dense
          />
        </div>

        {!result.success && (
          <Alert tone="danger">Failed to load properties. Please refresh.</Alert>
        )}

        {result.success && allItems.length > 0 && (
          <div className="sm:px-5">
            <StatusTabs tabs={tabs} activeKey={activeTab} baseHref={BASE_HREF} />
          </div>
        )}

        {result.success && allItems.length === 0 && (
          <div className="sm:px-5 sm:pb-5">
            <EmptyState
              icon={Home}
              tone="brand"
              dashed
              title="You haven't posted a property yet"
              description="Posting is free and takes about 5 minutes."
              actionLabel="Post Property"
              actionHref="/dashboard/owner/properties/new"
            />
          </div>
        )}

        {result.success && allItems.length > 0 && items.length === 0 && (
          <div className="sm:px-5 sm:pb-5">
            <EmptyState
              icon={Home}
              title={`No ${activeTab} properties`}
              description="Try a different filter to see more of your listings."
            />
          </div>
        )}

        {items.length > 0 && (
        <div className="space-y-3 sm:px-5 sm:pb-5 sm:pt-1">
          {items.map((property) => {
            const status = (property.status ?? "draft") as EntityStatus;
            const isPaused = status === "paused";
            const leadCount = leadCounts[property.id!] ?? 0;
            const priceText = property.price
              ? `₹${Number(property.price).toLocaleString("en-IN")}`
              : property.rent_amount
                ? `₹${Number(property.rent_amount).toLocaleString("en-IN")}/mo`
                : undefined;
            const location = [property.locality_text, property.city_text]
              .filter(Boolean)
              .join(", ");

            return (
              <OwnerEntityCard
                key={property.id}
                kind="property"
                entityId={property.id!}
                status={status}
                title={property.title ?? "Untitled Property"}
                metaParts={[
                  priceText,
                  location || undefined,
                  leadCount > 0
                    ? `${leadCount} ${leadCount === 1 ? "lead" : "leads"}`
                    : undefined,
                  statusNote(status, property.expires_at, property.rejection_reason),
                ]}
                relatedCount={leadCount}
                viewHref={
                  status !== "paused" && property.slug
                    ? `/property/${property.slug}`
                    : undefined
                }
                editHref={
                  EDITABLE_STATUSES.includes(status)
                    ? `/dashboard/owner/properties/${property.id}/edit`
                    : undefined
                }
                showPauseResume={["published", "paused"].includes(status)}
                isPaused={isPaused}
                showDelete={status !== "under_review"}
                showRelist={status === "expired"}
                entityLabel="listing"
              />
            );
          })}
        </div>
        )}
      </div>
    </DashboardShellV2>
  );
}
