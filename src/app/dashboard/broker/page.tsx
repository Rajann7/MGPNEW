import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Home, FileText, MessageCircle, Send } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getMyProperties } from "@/lib/actions/properties";
import { getMyRequirements } from "@/lib/actions/requirements";
import {
  getMyLeadsAsReceiver,
  getLeadCounts,
  type LeadRow,
} from "@/lib/actions/leads";
import { getMyProposals } from "@/lib/actions/proposals";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import { getBrokerNav, getMobileTabs } from "@/components/dashboard/navConfig";
import {
  StatCardGradientGrid,
  StatCardGradientSkeletonGrid,
  type StatCardItem,
} from "@/components/dashboard/StatCardGradient";
import {
  ActionCardGrid,
  type ActionCardItem,
} from "@/components/dashboard/ActionCard";
import { AccountStatusCard } from "@/components/dashboard/AccountStatusCard";
import { InlineErrorBanner } from "@/components/ui/ErrorState";

export const metadata: Metadata = {
  title: "Broker Dashboard",
  robots: { index: false, follow: false },
};

const LEAD_STATUS_CHIP: Record<string, { text: string; dot: string }> = {
  new: { text: "bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  open: { text: "bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  contact_requested: { text: "bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  contacted: { text: "bg-green-500/10 text-green-700 dark:text-green-300", dot: "bg-green-500" },
  contact_shared: { text: "bg-green-500/10 text-green-700 dark:text-green-300", dot: "bg-green-500" },
  interested: { text: "bg-green-500/10 text-green-700 dark:text-green-300", dot: "bg-green-500" },
  site_visit_scheduled: { text: "bg-green-500/10 text-green-700 dark:text-green-300", dot: "bg-green-500" },
  converted: { text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300", dot: "bg-zinc-500" },
  closed: { text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300", dot: "bg-zinc-500" },
  lost: { text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300", dot: "bg-zinc-500" },
};
const DEFAULT_STATUS_CHIP = {
  text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
  dot: "bg-zinc-500",
};

function leadStatusLabel(status: string) {
  return status.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function greetingWord() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

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
    href: "/dashboard/messages",
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
  const firstName = (profile.display_name ?? profile.full_name).split(
    /\s+/
  )[0];

  return (
    <DashboardShellV2
      title="Overview"
      breadcrumb={["Dashboard", "Overview"]}
      navItems={getBrokerNav("/dashboard/broker")}
      mobileDrawerNav={getBrokerNav("/dashboard/broker")}
      mobileTabs={getMobileTabs("broker", "/dashboard/broker")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Broker / Agent"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-ink">
            Good {greetingWord()}, {firstName}
          </h2>
          <p className="text-sm text-ink-muted mt-0.5">
            Here&apos;s what&apos;s happening with your listings today.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/messages"
            className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-ink hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            View Leads
          </Link>
          <Link
            href="/dashboard/broker/properties/new"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand text-white hover:bg-brand-hover shadow-sm transition-colors"
          >
            Post Property
          </Link>
        </div>
      </div>

      <Suspense fallback={<StatCardGradientSkeletonGrid />}>
        <BrokerOverviewData />
      </Suspense>

      <ActionCardGrid items={ACTIONS} />

      <AccountStatusCard
        role="Broker / Agent"
        accountStatus={profile.account_status}
        verificationStatus={profile.verification_status}
      />
    </DashboardShellV2>
  );
}

async function loadBrokerOverviewData() {
  const [propertiesResult, requirementsResult, leadCounts, proposalsResult, recentLeadsResult] =
    await Promise.all([
      getMyProperties(1, 1),
      getMyRequirements(1, 1),
      getLeadCounts(),
      getMyProposals("sent", 1, 1),
      getMyLeadsAsReceiver(1, 5),
    ]);

  // Failed queries must render "—" with an honest note — never a fake zero.
  const propertiesCount = propertiesResult.success
    ? propertiesResult.data.total
    : null;
  const requirementsCount = requirementsResult.success
    ? requirementsResult.data.total
    : null;
  const leadsTotal = leadCounts.success ? leadCounts.data.total : null;
  const proposalsTotal = proposalsResult.success
    ? proposalsResult.data.total
    : null;

  const stats: StatCardItem[] = [
    {
      label: "Properties",
      value: propertiesCount === null ? "—" : String(propertiesCount),
      note:
        propertiesCount === null
          ? "Couldn't load"
          : propertiesCount === 0
            ? "None posted yet"
            : "Total listed",
      icon: Home,
    },
    {
      label: "Requirements",
      value: requirementsCount === null ? "—" : String(requirementsCount),
      note:
        requirementsCount === null
          ? "Couldn't load"
          : requirementsCount === 0
            ? "None posted yet"
            : "Total posted",
      icon: FileText,
    },
    {
      label: "Leads",
      value: leadsTotal === null ? "—" : String(leadsTotal),
      note:
        leadsTotal === null
          ? "Couldn't load"
          : leadsTotal === 0
            ? "None yet"
            : "Total received",
      icon: MessageCircle,
      highlight: true,
    },
    {
      label: "Proposals",
      value: proposalsTotal === null ? "—" : String(proposalsTotal),
      note:
        proposalsTotal === null
          ? "Couldn't load"
          : proposalsTotal === 0
            ? "None sent yet"
            : "Total sent",
      icon: Send,
    },
  ];

  const recentLeads = recentLeadsResult.success
    ? recentLeadsResult.data.items
    : null;

  return { stats, recentLeads };
}

async function BrokerOverviewData() {
  const { stats, recentLeads } = await loadBrokerOverviewData();

  return (
    <>
      <StatCardGradientGrid stats={stats} />
      <RecentLeadsSection leads={recentLeads} />
    </>
  );
}

function RecentLeadsSection({ leads }: { leads: LeadRow[] | null }) {
  // Query failure is shown as an honest error, never as "No leads yet".
  if (leads === null) {
    return (
      <div className="rounded-3xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-ink">Recent Leads</h3>
        </div>
        <div className="p-4 sm:p-5">
          <InlineErrorBanner message="Couldn't load recent leads. Check your connection." />
        </div>
      </div>
    );
  }
  return <RecentLeadsTable leads={leads} />;
}

function RecentLeadsTable({ leads }: { leads: LeadRow[] }) {
  return (
    <div className="rounded-3xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-ink">Recent Leads</h3>
        <Link
          href="/dashboard/messages"
          className="text-xs font-medium text-brand hover:underline"
        >
          View all
        </Link>
      </div>

      {leads.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 text-center">
          <p className="text-sm text-ink-muted">
            No leads yet. Once buyers inquire about your listings, they will
            show up here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <table className="w-full text-sm hidden sm:table">
            <thead>
              <tr className="text-left text-xs text-ink-muted border-b border-border">
                <th className="px-5 py-2.5 font-medium">Lead</th>
                <th className="px-5 py-2.5 font-medium">Property</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-5 py-3 text-ink">
                    {lead.counterpartName}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {lead.targetSummary?.title ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (LEAD_STATUS_CHIP[lead.status] ?? DEFAULT_STATUS_CHIP)
                          .text
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          (LEAD_STATUS_CHIP[lead.status] ?? DEFAULT_STATUS_CHIP)
                            .dot
                        }`}
                        aria-hidden="true"
                      />
                      {leadStatusLabel(lead.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-muted">
                    {new Date(lead.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-border">
            {leads.map((lead) => (
              <div key={lead.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-ink truncate">
                    {lead.counterpartName}
                  </p>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      (LEAD_STATUS_CHIP[lead.status] ?? DEFAULT_STATUS_CHIP)
                        .text
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        (LEAD_STATUS_CHIP[lead.status] ?? DEFAULT_STATUS_CHIP)
                          .dot
                      }`}
                      aria-hidden="true"
                    />
                    {leadStatusLabel(lead.status)}
                  </span>
                </div>
                <p className="text-xs text-ink-soft truncate mt-0.5">
                  {lead.targetSummary?.title ?? "—"}
                </p>
                <p className="text-[11px] text-ink-muted mt-1">
                  {new Date(lead.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
