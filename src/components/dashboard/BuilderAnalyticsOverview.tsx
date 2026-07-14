import { Building2, LayoutGrid, KeyRound, MessageCircle, CalendarClock, Eye } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { getMyProjects } from "@/lib/actions/projects";
import { getLeadCounts } from "@/lib/actions/leads";
import { listMySiteVisits } from "@/lib/actions/site-visits";
import {
  StatCardGradientGrid,
  type StatCardItem,
} from "@/components/dashboard/StatCardGradient";

/**
 * B8-S19 — Builder Project Analytics. Every number is a live count from the
 * builder's own rows (projects / units / project-leads / site-visits). No
 * view/impression tracking table exists yet, so the "Views & impressions"
 * panel is an HONEST setup-required state — never a fabricated count.
 */
async function loadBuilderAnalytics(): Promise<{
  stats: StatCardItem[];
}> {
  const [projectsResult, leadCounts, siteVisitsResult] = await Promise.all([
    getMyProjects(1, 200),
    getLeadCounts(),
    listMySiteVisits(),
  ]);

  const projects = projectsResult.success ? projectsResult.data.items : null;
  const totalProjects = projectsResult.success ? projectsResult.data.total : null;
  const publishedProjects =
    projects === null
      ? null
      : projects.filter((p) => p.status === "published").length;

  // Real unit aggregate across this builder's projects (RLS-safe: filtered by
  // builder_profile_id via a service query scoped to the builder's own ids).
  let totalUnits: number | null = null;
  let availableUnits: number | null = null;
  let bookedUnits: number | null = null;
  if (projects && projects.length > 0) {
    const admin = createServiceClient();
    const projectIds = projects.map((p) => p.id).filter(Boolean) as string[];
    const { data: units, error } = await admin
      .from("project_units")
      .select("availability_status")
      .in("project_id", projectIds);
    if (!error && units) {
      totalUnits = units.length;
      availableUnits = units.filter(
        (u) => u.availability_status === "available"
      ).length;
      bookedUnits = units.filter((u) =>
        ["booked", "sold"].includes(u.availability_status as string)
      ).length;
    }
  } else if (projects) {
    totalUnits = 0;
    availableUnits = 0;
    bookedUnits = 0;
  }

  const totalLeads = leadCounts.success ? leadCounts.data.total : null;
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

  const dash = (n: number | null) => (n === null ? "—" : String(n));

  const stats: StatCardItem[] = [
    {
      label: "Total Projects",
      value: dash(totalProjects),
      note:
        totalProjects === null
          ? "Couldn't load"
          : publishedProjects && publishedProjects > 0
            ? `${publishedProjects} published`
            : "None published yet",
      icon: Building2,
    },
    {
      label: "Total Units",
      value: dash(totalUnits),
      note:
        totalUnits === null
          ? "Couldn't load"
          : totalUnits === 0
            ? "No inventory added"
            : "Across all projects",
      icon: LayoutGrid,
    },
    {
      label: "Available Units",
      value: dash(availableUnits),
      note:
        availableUnits === null
          ? "Couldn't load"
          : bookedUnits !== null
            ? `${bookedUnits} booked / sold`
            : "Ready to sell",
      icon: KeyRound,
      highlight: true,
    },
    {
      label: "Project Leads",
      value: dash(totalLeads),
      note:
        totalLeads === null
          ? "Couldn't load"
          : newThisWeek && newThisWeek > 0
            ? `${newThisWeek} new this week`
            : "No new leads this week",
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
  ];

  return { stats };
}

export async function BuilderAnalyticsOverview() {
  const { stats } = await loadBuilderAnalytics();

  return (
    <div className="space-y-5">
      <StatCardGradientGrid stats={stats} />

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
              Project page views and search impressions aren&apos;t instrumented
              on this build yet, so no numbers are shown here — we never display a
              fabricated view count. Once view tracking is enabled, per-project
              views, brochure downloads and enquiry conversion will appear here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
