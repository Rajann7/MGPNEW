import { Metadata } from "next";
import { Home } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyProperties } from "@/lib/actions/properties";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { EntityListCard } from "@/components/dashboard/EntityListCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import type { EntityStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Listings — Broker",
  robots: { index: false, follow: false },
};

export default async function BrokerPropertiesPage() {
  const profile = await requireRole("broker");
  const result = await getMyProperties(1, 20);
  const items = result.success ? result.data.items : [];
  const total = result.success ? result.data.total : 0;

  return (
    <DashboardShellV2
      title="My Listings"
      navItems={getBrokerNav("/dashboard/broker/properties")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/properties")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <DashboardPageHeader
        title="My Listings"
        count={total}
        itemLabel="property"
        itemLabelPlural="properties"
        actionLabel="Post Property"
        actionHref="/dashboard/broker/properties/new"
      />

      {!result.success && (
        <Alert tone="danger">Failed to load listings. Please refresh.</Alert>
      )}

      {result.success && items.length === 0 && (
        <EmptyState
          icon={Home}
          title="No listings yet"
          description="Post your first property listing."
          actionLabel="Post Property"
          actionHref="/dashboard/broker/properties/new"
        />
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((property) => (
            <EntityListCard
              key={property.id}
              status={(property.status ?? "draft") as EntityStatus}
              purpose={property.purpose ?? undefined}
              title={property.title ?? "Untitled"}
              subtitle={[property.locality_text, property.city_text]
                .filter(Boolean)
                .join(", ")}
              meta={
                property.price
                  ? `₹${Number(property.price).toLocaleString("en-IN")}`
                  : property.rent_amount
                    ? `₹${Number(property.rent_amount).toLocaleString("en-IN")}/mo`
                    : undefined
              }
              createdAt={property.created_at!}
              editHref={`/dashboard/broker/properties/${property.id}/edit`}
            />
          ))}
        </div>
      )}
    </DashboardShellV2>
  );
}
