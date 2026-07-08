import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { StaffManagementClient } from "@/components/admin/StaffManagementClient";
import { listStaff, listStaffInvites } from "@/lib/actions/admin/staff";
import { canManageStaffPermissions } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Staff — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  const [staffResult, invitesResult] = await Promise.all([
    listStaff(),
    listStaffInvites(),
  ]);

  const canManage = canManageStaffPermissions(
    staff,
    permissionsByModule["staff"] ?? null
  );

  return (
    <AdminShell
      title="Staff Management"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/staff")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <StaffManagementClient
        canManageStaff={canManage}
        initialStaff={staffResult.success ? staffResult.data.items : []}
        initialInvites={invitesResult.success ? invitesResult.data.items : []}
        currentStaffId={staff.id}
      />
    </AdminShell>
  );
}
