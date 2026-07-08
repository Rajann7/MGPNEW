import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { VerificationStatusPanel } from "@/components/dashboard/VerificationStatusPanel";

export const metadata: Metadata = {
  title: "Verification",
  robots: { index: false, follow: false },
};

export default async function BrokerVerificationPage() {
  const profile = await requireRole("broker");

  return (
    <DashboardShellV2
      title="Verification"
      navItems={getBrokerNav("/dashboard/broker/verification")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/verification")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <VerificationStatusPanel
        status={profile.verification_status}
        roleNote="Broker/agency registration and RERA agent details verification will be reviewed by the platform team once the workflow is enabled."
      />
    </DashboardShellV2>
  );
}
