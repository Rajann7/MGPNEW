import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { NotificationListClient } from "@/components/notifications/NotificationListClient";
import { listNotifications } from "@/lib/actions/notifications";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function OwnerNotificationsPage() {
  const profile = await requireRole("owner");
  const result = await listNotifications(50);

  return (
    <DashboardShellV2
      title="Notifications"
      navItems={getOwnerNav("/dashboard/owner/notifications")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner/notifications")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
    >
      <NotificationListClient
        items={result.success ? result.data.items : []}
        unreadCount={result.success ? result.data.unreadCount : 0}
      />
    </DashboardShellV2>
  );
}
