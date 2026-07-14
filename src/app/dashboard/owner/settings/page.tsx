import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B6-S22 — Owner Settings (real language preference + honest channel status). */
export default async function OwnerSettingsPage() {
  const profile = await requireRole("owner");
  return (
    <DashboardShellV2
      title="Settings"
      breadcrumb={["Dashboard", "Settings"]}
      navItems={getOwnerNav("/dashboard/owner/settings")}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner/settings")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/settings")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
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
          verification: "/dashboard/owner/verification",
          billing: "/dashboard/owner/billing",
        }}
      />
    </DashboardShellV2>
  );
}
