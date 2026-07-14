import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { RequirementForm } from "@/components/forms/RequirementForm";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";

export const metadata: Metadata = {
  title: "Post Requirement — Broker",
  robots: { index: false, follow: false },
};

export default async function BrokerNewRequirementPage() {
  const profile = await requireRole("broker");

  return (
    <DashboardShellV2
      title="Post a Requirement"
      navItems={getBrokerNav("/dashboard/broker/requirements")}
      mobileBackHref="/dashboard/broker/requirements"
      hideMobileTabBar
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Post a Requirement</h1>
      </div>
      <RequirementForm mode="create" dashboardRole="broker" />
    </DashboardShellV2>
  );
}
