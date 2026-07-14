import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** B7-S22 — Broker Settings (real language preference + honest channel status). */
export default async function BrokerSettingsPage() {
  const profile = await requireRole("broker");
  return (
    <DashboardShellV2
      title="Settings"
      breadcrumb={["Dashboard", "Settings"]}
      mobileDrawerNav={getBrokerNav("/dashboard/broker/settings")}
      navItems={getBrokerNav("/dashboard/broker/settings")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/settings")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
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
          verification: "/dashboard/broker/verification",
          billing: "/dashboard/broker/billing",
        }}
      />
    </DashboardShellV2>
  );
}
