import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getMyProjects } from "@/lib/actions/projects";
import { getLeadCounts } from "@/lib/actions/leads";
import { getMyProposals } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBuilderNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { StatCardGradientGrid } from "@/components/dashboard/StatCardGradient";
import {
  ActionCardGrid,
  type ActionCardItem,
} from "@/components/dashboard/ActionCard";
import { AccountStatusCard } from "@/components/dashboard/AccountStatusCard";

export const metadata: Metadata = {
  title: "Builder Dashboard",
  robots: { index: false, follow: false },
};

const ACTIONS: ActionCardItem[] = [
  {
    title: "Post Project",
    description: "List a new residential or commercial project",
    href: "/dashboard/builder/projects/new",
    status: "active",
  },
  {
    title: "My Projects",
    description: "View and manage your projects",
    href: "/dashboard/builder/projects",
    status: "active",
  },
  {
    title: "Project Leads",
    description: "View and manage project inquiries",
    href: "/dashboard/builder/leads",
    status: "active",
  },
  {
    title: "Banner Ads",
    description: "Promote your projects to targeted cities",
    href: "/dashboard/builder/ads",
    status: "coming_soon",
  },
  {
    title: "Public Profile",
    description: "Your shareable builder profile page",
    href: "/dashboard/builder/public-profile",
    status: "active",
  },
  {
    title: "Company Profile",
    description: "Update your builder profile and RERA info",
    href: "/profile",
    status: "active",
  },
  {
    title: "Verification / RERA",
    description: "Get builder and RERA verified",
    href: "/dashboard/builder/verification",
    status: "active",
  },
];

export default async function BuilderDashboardPage() {
  const profile = await requireRole("builder");

  const [projectsResult, leadCounts, proposalsResult] = await Promise.all([
    getMyProjects(1, 1),
    getLeadCounts(),
    getMyProposals("received", 1, 1),
  ]);
  // Failed queries render "—" with an honest note — never a fake zero.
  const projectsCount = projectsResult.success
    ? projectsResult.data.total
    : null;
  const leadsTotal = leadCounts.success ? leadCounts.data.total : null;
  const proposalsTotal = proposalsResult.success
    ? proposalsResult.data.total
    : null;

  return (
    <DashboardShellV2
      title={`Welcome, ${profile.display_name ?? profile.full_name}`}
      navItems={getBuilderNav("/dashboard/builder")}
      mobileTabs={getMobileTabs("builder", "/dashboard/builder")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Builder / Developer"
    >
      <StatCardGradientGrid
        stats={[
          {
            label: "Projects",
            value: projectsCount === null ? "—" : String(projectsCount),
            note:
              projectsCount === null
                ? "Couldn't load"
                : projectsCount === 0
                  ? "None posted yet"
                  : "Total listed",
          },
          { label: "Units", value: "—", note: "Not tracked yet" },
          {
            label: "Leads",
            value: leadsTotal === null ? "—" : String(leadsTotal),
            note:
              leadsTotal === null
                ? "Couldn't load"
                : leadsTotal === 0
                  ? "None yet"
                  : "Total received",
          },
          {
            label: "Proposals",
            value: proposalsTotal === null ? "—" : String(proposalsTotal),
            note:
              proposalsTotal === null
                ? "Couldn't load"
                : proposalsTotal === 0
                  ? "None received yet"
                  : "Total received",
          },
        ]}
      />

      <ActionCardGrid items={ACTIONS} />

      <AccountStatusCard
        role="Builder / Developer"
        accountStatus={profile.account_status}
        verificationStatus={profile.verification_status}
      />
    </DashboardShellV2>
  );
}
