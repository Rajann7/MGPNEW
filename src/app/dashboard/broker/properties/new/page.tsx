import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";

export const metadata: Metadata = {
  title: "Post Property — Broker",
  robots: { index: false, follow: false },
};

export default async function BrokerNewPropertyPage() {
  const profile = await requireRole("broker");

  return (
    <DashboardShellV2
      title="Post a Property"
      navItems={getBrokerNav("/dashboard/broker/properties")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/properties")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Post a Property</h1>
        <p className="text-sm text-ink-soft">
          Submit for admin approval to publish.
        </p>
      </div>
      <PropertyForm mode="create" />
    </DashboardShellV2>
  );
}
