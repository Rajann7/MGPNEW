import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Edit Property",
  robots: { index: false, follow: false },
};

export default async function EditBrokerPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("broker");
  const { id } = await params;

  return (
    <DashboardShellV2
      title="Edit Property"
      navItems={getBrokerNav("/dashboard/broker/properties")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/properties")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <h1 className="text-xl font-bold text-ink mb-2">Edit Property</h1>
      <p className="text-sm text-ink-soft mb-4">Property ID: {id}</p>
      <Alert tone="info">Edit form coming in next phase.</Alert>
      <div className="mt-4">
        <Button href="/dashboard/broker/properties" variant="outline">
          ← My Listings
        </Button>
      </div>
    </DashboardShellV2>
  );
}
