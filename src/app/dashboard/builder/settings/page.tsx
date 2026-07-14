import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B8-S27 — Builder Settings (real language preference + honest channel status). */
export default async function BuilderSettingsPage() {
  const profile = await requireRole("builder");
  return (
    <DashboardShellV2
      title="Settings"
      breadcrumb={["Dashboard", "Settings"]}
      mobileBackHref="/dashboard/builder"
      navItems={getBuilderNav("/dashboard/builder/settings")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/settings")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <SettingsClient
        currentLanguage={profile.language_preference}
        accountStatus={profile.account_status}
        verificationStatus={profile.verification_status}
        memberSince={new Date(profile.created_at).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })}
        quickLinks={{
          verification: "/dashboard/builder/verification",
          billing: "/dashboard/builder/billing",
        }}
      />
    </DashboardShellV2>
  );
}
