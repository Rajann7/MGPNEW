import { Metadata } from "next";
import { Users } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";

export const metadata: Metadata = {
  title: "Agents / Team",
  robots: { index: false, follow: false },
};

export default async function BuilderAgentsPage() {
  const profile = await requireRole("builder");

  return (
    <DashboardShellV2
      title="Agents / Team"
      navItems={getBuilderNav("/dashboard/builder/agents")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/agents")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <DashboardPlaceholderPanel
        icon={Users}
        status="coming_soon"
        title="Team Management Coming Soon"
        description="Adding agents and assigning permissions to your team will be available in a later phase. No invitations are sent yet."
      />
    </DashboardShellV2>
  );
}
