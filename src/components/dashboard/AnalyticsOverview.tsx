import { Home, MessageCircle, CalendarClock, CheckCircle2, Eye } from "lucide-react";
import { getMyProperties } from "@/lib/actions/properties";
import { getLeadCounts } from "@/lib/actions/leads";
import { listMySiteVisits } from "@/lib/actions/site-visits";
import {
  StatCardGradientGrid,
  type StatCardItem,
} from "@/components/dashboard/StatCardGradient";

/**
 * Real analytics overview shared by Owner (B6-S13) and Broker (B7-S15).
 * Every number is a live count from the user's own rows (listings / leads /
 * site visits). There is NO view/impression tracking table yet, so the
 * "Views & impressions" panel shows an HONEST setup-required state — never a
 * fabricated view count (CLAUDE.md: no fake analytics).
 */
async function loadAnalyticsStats(): Promise<StatCardItem[]> {
  const [propertiesResult, leadCounts, siteVisitsResult] = await Promise.all([
    getMyProperties(1, 1),
    getLeadCounts(),
    listMySiteVisits(),
  ]);

  const totalListings = propertiesResult.success
    ? propertiesResult.data.total
    : null;
  const totalLeads = leadCounts.success ? leadCounts.data.total : null;
  const openLeads = leadCounts.success ? leadCounts.data.open : null;
  const newThisWeek = leadCounts.success ? leadCounts.data.newThisWeek : null;

  const visits = siteVisitsResult.success ? siteVisitsResult.data.items : null;
  const nowMs = Date.now();
  const upcomingVisits =
    visits === null
      ? null
      : visits.filter(
          (v) =>
            (v.status === "scheduled" ||
              v.status === "accepted" ||
              v.status === "rescheduled") &&
            v.scheduled_at &&
            new Date(v.scheduled_at).getTime() > nowMs
        ).length;
  const completedVisits =
    visits === null ? null : visits.filter((v) => v.status === "completed").length;

  const stats: StatCardItem[] = [
    {
      label: "Total Listings",
      value: totalListings === null ? "—" : String(totalListings),
      note: totalListings === null ? "Couldn't load" : "All statuses",
      icon: Home,
    },
    {
      label: "Total Leads",
      value: totalLeads === null ? "—" : String(totalLeads),
      note:
        totalLeads === null
          ? "Couldn't load"
          : newThisWeek && newThisWeek > 0
            ? `${newThisWeek} new this week`
            : "No new leads this week",
      icon: MessageCircle,
      highlight: true,
    },
    {
      label: "Open Leads",
      value: openLeads === null ? "—" : String(openLeads),
      note:
        openLeads === null
          ? "Couldn't load"
          : openLeads > 0
            ? "Awaiting your response"
            : "All caught up",
      icon: MessageCircle,
    },
    {
      label: "Upcoming Visits",
      value:
        upcomingVisits === null
          ? "—"
          : upcomingVisits > 0
            ? String(upcomingVisits)
            : "—",
      note:
        upcomingVisits === null
          ? "Couldn't load"
          : upcomingVisits > 0
            ? "Scheduled ahead"
            : "None scheduled",
      icon: CalendarClock,
    },
    {
      label: "Completed Visits",
      value:
        completedVisits === null
          ? "—"
          : completedVisits > 0
            ? String(completedVisits)
            : "—",
      note:
        completedVisits === null
          ? "Couldn't load"
          : completedVisits > 0
            ? "Marked done"
            : "None yet",
      icon: CheckCircle2,
    },
  ];

  return stats;
}

export async function AnalyticsOverview() {
  const stats = await loadAnalyticsStats();

  return (
    <div className="space-y-5">
      <StatCardGradientGrid stats={stats} />

      {/* Honest setup-required panel — no fake view counts. */}
      <section className="rounded-2xl border border-dashed border-border bg-surface p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg text-muted">
            <Eye className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                Views &amp; impressions
              </h3>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                Not tracked yet
              </span>
            </div>
            <p className="mt-1 max-w-prose text-xs leading-relaxed text-muted">
              Listing view and impression analytics aren&apos;t instrumented on
              this build yet, so no numbers are shown here — we never display a
              fabricated view count. Once view tracking is enabled, per-listing
              views, search impressions and contact-reveal rates will appear in
              this panel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
