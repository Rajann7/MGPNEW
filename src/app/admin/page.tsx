import { Metadata } from "next";
import Link from "next/link";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { isSuperAdmin } from "@/lib/permissions";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { getModerationCounts } from "@/lib/actions/admin/moderation";
import { getStaffCount } from "@/lib/actions/admin/staff";
import { getUserCounts } from "@/lib/actions/admin/users";

export const metadata: Metadata = {
  title: "Admin Dashboard — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  const [moderation, staffCount, userCount] = await Promise.all([
    getModerationCounts(),
    getStaffCount(),
    getUserCounts(),
  ]);

  // Failed count query renders "—" — never a fake zero.
  const pendingTotal = moderation.success
    ? String(
        moderation.data.properties +
          moderation.data.projects +
          moderation.data.requirements
      )
    : "—";

  return (
    <AdminShell
      title="Admin Dashboard"
      navItems={getAdminNav(staff, permissionsByModule, "/admin")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-zinc-500">
            {staff.full_name} ·{" "}
            <span className="capitalize">
              {staff.internal_role.replace(/_/g, " ")}
            </span>
          </p>
        </div>
        {isSuperAdmin(staff) && (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
            Super Admin — Full Access
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Link href="/admin/moderation/properties">
          <Card interactive className="text-center">
            <p className="text-xs font-medium text-zinc-500">
              Pending Properties
            </p>
            <p className="text-2xl font-bold text-zinc-900 mt-1">
              {moderation.success ? moderation.data.properties : "—"}
            </p>
          </Card>
        </Link>
        <Link href="/admin/moderation/projects">
          <Card interactive className="text-center">
            <p className="text-xs font-medium text-zinc-500">
              Pending Projects
            </p>
            <p className="text-2xl font-bold text-zinc-900 mt-1">
              {moderation.success ? moderation.data.projects : "—"}
            </p>
          </Card>
        </Link>
        <Link href="/admin/moderation/requirements">
          <Card interactive className="text-center">
            <p className="text-xs font-medium text-zinc-500">
              Pending Requirements
            </p>
            <p className="text-2xl font-bold text-zinc-900 mt-1">
              {moderation.success ? moderation.data.requirements : "—"}
            </p>
          </Card>
        </Link>
        <Card className="text-center">
          <p className="text-xs font-medium text-zinc-500">
            Total Moderation Queue
          </p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">
            {pendingTotal}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <Link href="/admin/users">
          <Card interactive>
            <p className="text-xs font-medium text-zinc-500">
              Registered Users
            </p>
            <p className="text-2xl font-bold text-zinc-900 mt-1">
              {userCount.success ? userCount.data.total : "—"}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Owner / Broker / Builder accounts
            </p>
          </Card>
        </Link>
        <Link href="/admin/staff">
          <Card interactive>
            <p className="text-xs font-medium text-zinc-500">Active Staff</p>
            <p className="text-2xl font-bold text-zinc-900 mt-1">
              {staffCount.success
                ? `${staffCount.data.active} / ${staffCount.data.total}`
                : "—"}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Active out of total invited
            </p>
          </Card>
        </Link>
      </div>

      <Card muted>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Setup-Required Modules
        </p>
        <p className="text-sm text-zinc-500">
          Billing/Payments, Providers, CMS/SEO, Support tickets, Reports/Fraud,
          and System Health are honest placeholders this phase — no fake data or
          actions. See each module for details.
        </p>
      </Card>
    </AdminShell>
  );
}
