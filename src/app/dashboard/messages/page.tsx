import { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getNavForRole,
  getMobileTabsForRole,
  getRoleLabel,
} from "@/lib/dashboard/navForRole";
import { ThreadListClient } from "@/components/messages/ThreadListClient";
import { listThreads } from "@/lib/actions/messages";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const profile = await requireAuth();
  const result = await listThreads();

  return (
    <DashboardShellV2
      title="Messages"
      navItems={getNavForRole(profile.public_role, "/dashboard/messages")}
      mobileTabs={getMobileTabsForRole(
        profile.public_role,
        "/dashboard/messages"
      )}
      userName={profile.display_name ?? profile.full_name}
      userRole={getRoleLabel(profile.public_role)}
    >
      <ThreadListClient items={result.success ? result.data.items : []} />
    </DashboardShellV2>
  );
}
