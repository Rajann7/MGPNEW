import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { VerificationStatusPanel } from "@/components/dashboard/VerificationStatusPanel";

export const metadata: Metadata = {
  title: "Verification",
  robots: { index: false, follow: false },
};

export default async function OwnerVerificationPage() {
  const profile = await requireRole("owner");

  return (
    <DashboardShellV2
      title="Verification"
      navItems={getOwnerNav("/dashboard/owner/verification")}
      mobileBackHref="/dashboard/owner"
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/verification")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <VerificationStatusPanel status={profile.verification_status} />
    </DashboardShellV2>
  );
}
