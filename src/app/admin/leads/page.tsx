import { Metadata } from "next";
import Link from "next/link";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { getAdminLeads } from "@/lib/actions/admin/leads";
import { CrmStageBadge } from "@/components/leads/CrmStageBadge";
import { INTEREST_TYPES } from "@/lib/leads/inquiry-config";
import type { CrmStage } from "@/types";

export const metadata: Metadata = {
  title: "Leads — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STAGE_TABS = [
  { label: "All", value: "" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Interested", value: "interested" },
  { label: "Site Visit", value: "site_visit" },
  { label: "Converted", value: "converted" },
  { label: "Closed", value: "closed" },
] as const;

function interestLabel(value: string | null): string | null {
  if (!value) return null;
  return INTEREST_TYPES.find((t) => t.value === value)?.label ?? null;
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const { stage = "" } = await searchParams;
  const result = await getAdminLeads(stage || undefined);
  const items = result.success ? result.data.items : [];
  const total = result.success ? result.data.total : 0;

  return (
    <AdminShell
      title="Leads"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/leads")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <p className="text-sm text-zinc-500">
        All enquiries across the platform ({total} in this view). Contact
        details are visible in the lead participants&apos; dashboards only.
      </p>

      {/* Stage tabs */}
      <div className="mt-4 flex flex-wrap gap-1 border-b border-zinc-200">
        {STAGE_TABS.map((tab) => {
          const isActive = tab.value === stage;
          return (
            <Link
              key={tab.value}
              href={
                tab.value ? `/admin/leads?stage=${tab.value}` : "/admin/leads"
              }
              className={`rounded-t-lg border border-b-0 px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-zinc-200 bg-white text-brand"
                  : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-4">
        {items.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-zinc-700">No leads</p>
            <p className="mt-1 text-xs text-zinc-400">
              No leads in this stage. Real inquiries only — nothing is faked.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {lead.target_title}
                      {lead.target_city ? ` · ${lead.target_city}` : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      From: {lead.requester_name} → To: {lead.receiver_name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400 capitalize">
                      {lead.target_type} · Source:{" "}
                      {lead.source.replaceAll("_", " ")} ·{" "}
                      {new Date(lead.created_at).toLocaleDateString("en-IN")}
                    </p>
                    {interestLabel(lead.interest_type) && (
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Wants: {interestLabel(lead.interest_type)}
                      </p>
                    )}
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-300">
                      {lead.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <CrmStageBadge stage={lead.crm_stage as CrmStage} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
