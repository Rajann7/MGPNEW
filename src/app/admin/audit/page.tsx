import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { canViewAuditLog } from "@/lib/permissions";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { listAuditLogs } from "@/lib/actions/admin/audit";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Audit Log — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  if (!canViewAuditLog(staff, permissionsByModule["audit_logs"] ?? null)) {
    redirect("/unauthorized?reason=permission_denied");
  }

  const result = await listAuditLogs();
  const items = result.success ? result.data.items : [];

  return (
    <AdminShell
      title="Audit Log"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/audit")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      {items.length === 0 ? (
        <EmptyState
          title="No audit events yet"
          description="Internal actions (approvals, staff changes, user status changes) will appear here as they happen."
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="flex flex-col divide-y divide-zinc-100">
            {items.map((log) => (
              <div key={log.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-zinc-900">
                    {log.action.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Module: {log.module}
                  {log.target_type && ` · Target: ${log.target_type}`}
                  {log.actor_internal_role &&
                    ` · Actor role: ${log.actor_internal_role.replace(/_/g, " ")}`}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AdminShell>
  );
}
