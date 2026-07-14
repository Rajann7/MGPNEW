import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { NotificationListClient } from "@/components/notifications/NotificationListClient";
import { listNotifications } from "@/lib/actions/notifications";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BuilderNotificationsPage() {
  const profile = await requireRole("builder");
  const result = await listNotifications(50);

  return (
    <DashboardShellV2
      title="Notifications"
      navItems={getBuilderNav("/dashboard/builder/notifications")}
      mobileDrawerNav={getBuilderNav("/dashboard/builder/notifications")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/notifications")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <NotificationListClient
        items={result.success ? result.data.items : []}
        unreadCount={result.success ? result.data.unreadCount : 0}
        role="builder"
      />
    </DashboardShellV2>
  );
}
