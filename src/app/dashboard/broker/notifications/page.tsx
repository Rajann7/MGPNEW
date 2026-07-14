import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { NotificationListClient } from "@/components/notifications/NotificationListClient";
import { listNotifications } from "@/lib/actions/notifications";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BrokerNotificationsPage() {
  const profile = await requireRole("broker");
  const result = await listNotifications(50);

  return (
    <DashboardShellV2
      title="Notifications"
      navItems={getBrokerNav("/dashboard/broker/notifications")}
      mobileBackHref="/dashboard/broker"
      mobileTabs={getMobileTabs("broker", "/dashboard/broker/notifications")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <NotificationListClient
        items={result.success ? result.data.items : []}
        unreadCount={result.success ? result.data.unreadCount : 0}
        role="broker"
      />
    </DashboardShellV2>
  );
}
