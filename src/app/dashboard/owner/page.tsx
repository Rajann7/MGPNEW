import { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { canPostProperty, canPostRequirement } from "@/lib/permissions";
import { getMyProperties } from "@/lib/actions/properties";
import { getMyRequirements } from "@/lib/actions/requirements";
import { getLeadCounts } from "@/lib/actions/leads";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getOwnerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import { StatCardGradientGrid } from "@/components/dashboard/StatCardGradient";
import {
  ActionCardGrid,
  type ActionCardItem,
} from "@/components/dashboard/ActionCard";
import { AccountStatusCard } from "@/components/dashboard/AccountStatusCard";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  robots: { index: false, follow: false },
};

export default async function OwnerDashboardPage() {
  const profile = await requireRole("owner");

  const [propertiesResult, requirementsResult, leadCounts] = await Promise.all([
    getMyProperties(1, 1),
    getMyRequirements(1, 1),
    getLeadCounts(),
  ]);
  const propertiesCount = propertiesResult.success
    ? propertiesResult.data.total
    : 0;
  const requirementsCount = requirementsResult.success
    ? requirementsResult.data.total
    : 0;
  const leadsTotal = leadCounts.success ? leadCounts.data.total : 0;

  const actions: ActionCardItem[] = [
    ...(canPostProperty(profile)
      ? [
          {
            title: "Post Property",
            description: "List your property for sale or rent",
            href: "/dashboard/owner/properties/new",
            status: "active" as const,
          },
        ]
      : []),
    ...(canPostRequirement(profile)
      ? [
          {
            title: "Post Requirement",
            description: "Tell brokers what you are looking for",
            href: "/dashboard/owner/requirements/new",
            status: "active" as const,
          },
        ]
      : []),
    {
      title: "My Properties",
      description: "View and manage your property listings",
      href: "/dashboard/owner/properties",
      status: "active",
    },
    {
      title: "My Requirements",
      description: "View and manage posted requirements",
      href: "/dashboard/owner/requirements",
      status: "active",
    },
    {
      title: "Inquiries / Leads",
      description: "View inquiries from interested buyers",
      href: "/dashboard/owner/leads",
      status: "active",
    },
    {
      title: "Profile Settings",
      description: "Update your name, contact and preferences",
      href: "/profile",
      status: "active",
    },
  ];

  return (
    <DashboardShellV2
      title={`Welcome, ${profile.display_name ?? profile.full_name}`}
      navItems={getOwnerNav("/dashboard/owner")}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
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
          { label: "Views", value: "—", note: "Not tracked yet" },
        ]}
      />

      <ActionCardGrid items={actions} />

      <AccountStatusCard
        role="Owner"
        accountStatus={profile.account_status}
        verificationStatus={profile.verification_status}
      />
    </DashboardShellV2>
  );
}
