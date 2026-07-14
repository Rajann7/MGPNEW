import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { VerificationStatusPanel } from "@/components/dashboard/VerificationStatusPanel";

export const metadata: Metadata = {
  title: "Verification / RERA",
  robots: { index: false, follow: false },
};

export default async function BuilderVerificationPage() {
  const profile = await requireRole("builder");

  return (
    <DashboardShellV2
      title="Verification / RERA"
      navItems={getBuilderNav("/dashboard/builder/verification")}
      mobileBackHref="/dashboard/builder"
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/verification")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <VerificationStatusPanel
        status={profile.verification_status}
        roleNote="Company and RERA registration verification will be reviewed by the platform team once the workflow is enabled. Per-project RERA numbers are entered and shown separately on each project."
      />
    </DashboardShellV2>
  );
}
