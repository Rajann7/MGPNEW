import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Requirement",
  robots: { index: false, follow: false },
};

export default async function EditBrokerRequirementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("broker");
  const { id } = await params;

  return (
    <DashboardShellV2
      title="Edit Requirement"
      navItems={getBrokerNav("/dashboard/broker/requirements")}
      mobileBackHref="/dashboard/broker/requirements"
      hideMobileTabBar
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/requirements")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <h1 className="text-xl font-bold text-ink mb-2">Edit Requirement</h1>
      <p className="text-sm text-ink-soft mb-4">Requirement ID: {id}</p>
      <Alert tone="info">Edit form coming in next phase.</Alert>
      <div className="mt-4">
        <Button href="/dashboard/broker/requirements" variant="outline">
          ← My Requirements
        </Button>
      </div>
    </DashboardShellV2>
  );
}
