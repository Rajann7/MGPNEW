import { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyRequirements } from "@/lib/actions/requirements";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { EntityListCard } from "@/components/dashboard/EntityListCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Requirements",
  robots: { index: false, follow: false },
};

export default async function OwnerRequirementsPage() {
  const profile = await requireRole("owner");
  const result = await getMyRequirements(1, 20);

  const items = result.success ? result.data.items : [];
  const total = result.success ? result.data.total : 0;

  return (
    <DashboardShellV2
      title="My Requirements"
      navItems={getOwnerNav("/dashboard/owner/requirements")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <DashboardPageHeader
        title="My Requirements"
        count={total}
        itemLabel="requirement"
        actionLabel="Post Requirement"
        actionHref="/dashboard/owner/requirements/new"
      />

      {!result.success && (
        <Alert tone="danger">
          Failed to load requirements. Please refresh.
        </Alert>
      )}

      {result.success && items.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No requirements yet"
          description="Tell brokers what you are looking for."
          actionLabel="Post Requirement"
          actionHref="/dashboard/owner/requirements/new"
        />
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((req) => (
            <EntityListCard
              key={req.id}
              status={(req.status ?? "draft") as EntityStatus}
              purpose={req.purpose ?? undefined}
              title={req.title ?? "Untitled"}
              subtitle={req.city_text ?? undefined}
              meta={
                req.budget_max
                  ? `Budget up to: ₹${Number(req.budget_max).toLocaleString("en-IN")}`
                  : req.rent_max
                    ? `Budget up to: ₹${Number(req.rent_max).toLocaleString("en-IN")}/mo`
                    : undefined
              }
              createdAt={req.created_at!}
              editHref={`/dashboard/owner/requirements/${req.id}/edit`}
            />
          ))}
        </div>
      )}
    </DashboardShellV2>
  );
}
