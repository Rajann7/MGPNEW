import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getMyProperties } from "@/lib/actions/properties";
import { getMyRequirements } from "@/lib/actions/requirements";
import { getLeadCounts } from "@/lib/actions/leads";
import { getMyProposals } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { StatCardGradientGrid } from "@/components/dashboard/StatCardGradient";
import {
  ActionCardGrid,
  type ActionCardItem,
} from "@/components/dashboard/ActionCard";
import { AccountStatusCard } from "@/components/dashboard/AccountStatusCard";

export const metadata: Metadata = {
  title: "Broker Dashboard",
  robots: { index: false, follow: false },
};

const ACTIONS: ActionCardItem[] = [
  {
    title: "Post Property",
    description: "List properties for your clients",
    href: "/dashboard/broker/properties/new",
    status: "active",
  },
  {
    title: "My Listings",
    description: "View and manage your property listings",
    href: "/dashboard/broker/properties",
    status: "active",
  },
  {
    title: "Post Requirement",
    description: "Add client requirements to the feed",
    href: "/dashboard/broker/requirements/new",
    status: "active",
  },
  {
    title: "My Requirements",
    description: "View and manage posted requirements",
    href: "/dashboard/broker/requirements",
    status: "active",
  },
  {
    title: "Leads / CRM",
    description: "Track and manage your leads",
    href: "/dashboard/broker/leads",
    status: "active",
  },
  {
    title: "Proposals",
    description: "Send and track proposals to buyers/renters",
    href: "/dashboard/broker/proposals",
    status: "active",
  },
  {
    title: "Public Profile",
    description: "Your shareable broker profile page",
    href: "/dashboard/broker/public-profile",
    status: "active",
  },
  {
    title: "Profile Settings",
    description: "Update your broker profile",
    href: "/profile",
    status: "active",
  },
];

export default async function BrokerDashboardPage() {
  const profile = await requireRole("broker");

  const [propertiesResult, requirementsResult, leadCounts, proposalsResult] =
    await Promise.all([
      getMyProperties(1, 1),
      getMyRequirements(1, 1),
      getLeadCounts(),
      getMyProposals("sent", 1, 1),
    ]);
  const propertiesCount = propertiesResult.success
    ? propertiesResult.data.total
    : 0;
  const requirementsCount = requirementsResult.success
    ? requirementsResult.data.total
    : 0;
  const leadsTotal = leadCounts.success ? leadCounts.data.total : 0;
  const proposalsTotal = proposalsResult.success
    ? proposalsResult.data.total
    : 0;

  return (
    <DashboardShellV2
      title={`Welcome, ${profile.display_name ?? profile.full_name}`}
      navItems={getBrokerNav("/dashboard/broker")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <StatCardGradientGrid
        stats={[
          {
            label: "Properties",
            value: String(propertiesCount),
            note: propertiesCount === 0 ? "None posted yet" : "Total listed",
          },
          {
            label: "Requirements",
            value: String(requirementsCount),
            note: requirementsCount === 0 ? "None posted yet" : "Total posted",
          },
          {
            label: "Leads",
            value: String(leadsTotal),
            note: leadsTotal === 0 ? "None yet" : "Total received",
          },
          {
            label: "Proposals",
            value: String(proposalsTotal),
            note: proposalsTotal === 0 ? "None sent yet" : "Total sent",
          },
        ]}
      />

      <ActionCardGrid items={ACTIONS} />

      <AccountStatusCard
        role="Broker / Agent"
        accountStatus={profile.account_status}
        verificationStatus={profile.verification_status}
      />
    </DashboardShellV2>
  );
}
