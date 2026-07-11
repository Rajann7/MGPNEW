import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Home, MessageCircle, CalendarClock, BarChart3 } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { canPostProperty } from "@/lib/permissions";
import { getMyProperties } from "@/lib/actions/properties";
import {
  getMyLeadsAsReceiver,
  getLeadCounts,
  type LeadRow,
} from "@/lib/actions/leads";
import { listMySiteVisits } from "@/lib/actions/site-visits";
import { getCurrentBilling } from "@/lib/actions/billing";
import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import {
  getOwnerNav,
  getOwnerDrawerNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import {
  StatCardGradientGrid,
  StatCardGradientSkeletonGrid,
  type StatCardItem,
} from "@/components/dashboard/StatCardGradient";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  robots: { index: false, follow: false },
};

const LEAD_STATUS_CHIP: Record<string, { text: string; dot: string }> = {
  new: {
    text: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  open: {
    text: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  contact_requested: {
    text: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  contacted: {
    text: "bg-green-500/10 text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  contact_shared: {
    text: "bg-green-500/10 text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  interested: {
    text: "bg-green-500/10 text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  site_visit_scheduled: {
    text: "bg-green-500/10 text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  converted: {
    text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
  closed: {
    text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
  lost: {
    text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
};
const DEFAULT_STATUS_CHIP = {
  text: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
  dot: "bg-zinc-500",
};

function leadStatusLabel(status: string) {
  return status.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export default async function OwnerDashboardPage() {
  const profile = await requireRole("owner");

  const [propertiesResult, leadCounts] = await Promise.all([
    getMyProperties(1, 1),
    getLeadCounts(),
  ]);
  const propertiesCount = propertiesResult.success
    ? propertiesResult.data.total
    : 0;
  const leadsOpen = leadCounts.success ? leadCounts.data.open : 0;

  const firstName = (profile.display_name ?? profile.full_name).split(/\s+/)[0];

  return (
    <DashboardShellV2
      title="Overview"
      breadcrumb={["Dashboard", "Overview"]}
      navItems={getOwnerNav("/dashboard/owner", {
        properties: propertiesCount,
        leads: leadsOpen,
      })}
      mobileDrawerNav={getOwnerDrawerNav("/dashboard/owner", {
        properties: propertiesCount,
        leads: leadsOpen,
      })}
      mobileTabs={getMobileTabs("owner", "/dashboard/owner")}
      userName={profile.display_name ?? profile.full_name}
      userRole="Owner"
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
            href="/dashboard/owner/leads"
            className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-ink hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            View Leads
          </Link>
          {canPostProperty(profile) && (
            <Link
              href="/dashboard/owner/properties/new"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand text-white hover:bg-brand-hover shadow-sm transition-colors"
            >
              Post Property
            </Link>
          )}
        </div>
      </div>

      <Suspense fallback={<StatCardGradientSkeletonGrid />}>
        <OwnerOverviewData />
      </Suspense>
    </DashboardShellV2>
  );
}

function greetingWord() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

async function loadOwnerOverviewData() {
  const [
    propertiesResult,
    leadCounts,
    recentLeadsResult,
    siteVisitsResult,
    billingResult,
  ] = await Promise.all([
    getMyProperties(1, 1),
    getLeadCounts(),
    getMyLeadsAsReceiver(1, 5),
    listMySiteVisits(),
    getCurrentBilling("owner"),
  ]);

  const activeListings = propertiesResult.success
    ? propertiesResult.data.total
    : 0;
  const newLeadsThisWeek = leadCounts.success ? leadCounts.data.newThisWeek : 0;
  const notContacted = leadCounts.success ? leadCounts.data.open : 0;

  const nowMs = Date.now();
  const upcomingVisits = siteVisitsResult.success
    ? siteVisitsResult.data.items.filter(
        (v) =>
          (v.status === "scheduled" || v.status === "accepted") &&
          v.scheduled_at &&
          new Date(v.scheduled_at).getTime() > nowMs
      ).length
    : 0;

  const propertyUsage = billingResult.success
    ? billingResult.data.usage.find(
        (row) => row.featureKey === "property_posts_limit"
      )
    : undefined;

  const usagePercent =
    propertyUsage && propertyUsage.limit
      ? (propertyUsage.used / propertyUsage.limit) * 100
      : undefined;

  const stats: StatCardItem[] = [
    {
      label: "Active Listings",
      value: String(activeListings),
      note: activeListings === 0 ? "None posted yet" : "Total listed",
      icon: Home,
    },
    {
      label: "New Leads This Week",
      value: String(newLeadsThisWeek),
      note:
        notContacted > 0
          ? `${notContacted} not yet contacted`
          : "All caught up",
      icon: MessageCircle,
      highlight: true,
    },
    {
      label: "Site Visits Scheduled",
      value: upcomingVisits > 0 ? String(upcomingVisits) : "—",
      note: upcomingVisits > 0 ? "Upcoming" : "No visits scheduled yet",
      icon: CalendarClock,
    },
    propertyUsage
      ? {
          label: "Plan Usage",
          value: `${propertyUsage.used} / ${propertyUsage.limit ?? "∞"}`,
          note: "Listings used",
          icon: BarChart3,
          progressPercent: usagePercent,
        }
      : {
          label: "Plan Usage",
          value: "—",
          note: "Setup Required",
          icon: BarChart3,
        },
  ];

  const recentLeads = recentLeadsResult.success
    ? recentLeadsResult.data.items
    : [];

  return { stats, recentLeads };
}

async function OwnerOverviewData() {
  const { stats, recentLeads } = await loadOwnerOverviewData();

  return (
    <>
      <StatCardGradientGrid stats={stats} />
      <RecentLeadsSection leads={recentLeads} />
    </>
  );
}

function RecentLeadsSection({ leads }: { leads: LeadRow[] }) {
  return (
    <div className="rounded-3xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-ink">Recent Leads</h3>
        <Link
          href="/dashboard/owner/leads"
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
                  <td className="px-5 py-3 text-ink">{lead.counterpartName}</td>
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
