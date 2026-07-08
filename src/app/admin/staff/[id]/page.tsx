import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/Card";
import { StaffPermissionEditor } from "@/components/admin/StaffPermissionEditor";
import { getStaffDetail } from "@/lib/actions/admin/staff";

export const metadata: Metadata = {
  title: "Staff Detail — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  const detail = await getStaffDetail(id);
  if (!detail.success) notFound();

  return (
    <AdminShell
      title={detail.data.staff.full_name}
      navItems={getAdminNav(staff, permissionsByModule, "/admin/staff")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="flex flex-col gap-4">
        <Card>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Staff Account
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-zinc-600">
              Email:{" "}
              <span className="font-medium text-zinc-900">
                {detail.data.staff.email}
              </span>
            </span>
            <span className="text-zinc-600">
              Role:{" "}
              <span className="font-medium text-zinc-900 capitalize">
                {detail.data.staff.internal_role.replace(/_/g, " ")}
              </span>
            </span>
            <span className="text-zinc-600">
              Status:{" "}
              <span className="font-medium text-zinc-900 capitalize">
                {detail.data.staff.staff_status}
              </span>
            </span>
            <span className="text-zinc-600">
              Last Login:{" "}
              <span className="font-medium text-zinc-900">
                {detail.data.staff.last_login_at
                  ? new Date(detail.data.staff.last_login_at).toLocaleString()
                  : "Never"}
              </span>
            </span>
          </div>
        </Card>

        <StaffPermissionEditor
          staffId={id}
          isSelf={id === staff.id}
          initialPermissions={detail.data.permissions}
        />
      </div>
    </AdminShell>
  );
}
