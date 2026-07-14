import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { TeamClient } from "@/components/dashboard/TeamClient";
import { Alert } from "@/components/ui/Alert";
import { listTeamMembers } from "@/lib/actions/team";

export const metadata: Metadata = {
  title: "Agents / Team",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * B8-S12/S13/S14 — Builder Team, Invite & Permissions. Real roster from
 * builder_team_members (RLS: owner manages own). Invites create real rows with
 * a single-use token; email delivery is a Setup-Required provider gap, so the
 * invite link is surfaced for the builder to share manually (no fake "sent").
 */
export default async function BuilderAgentsPage() {
  const profile = await requireRole("builder");
  const res = await listTeamMembers();

  return (
    <DashboardShellV2
      title="Agents / Team"
      navItems={getBuilderNav("/dashboard/builder/agents")}
      mobileDrawerNav={getBuilderNav("/dashboard/builder/agents")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder/agents")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      {!res.success ? (
        <Alert tone="danger">
          Couldn&apos;t load your team. Please refresh.
        </Alert>
      ) : (
        <TeamClient initialMembers={res.data.items} />
      )}
    </DashboardShellV2>
  );
}
