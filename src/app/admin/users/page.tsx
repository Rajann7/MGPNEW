import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { UserListClient } from "@/components/admin/UserListClient";
import { listUsers } from "@/lib/actions/admin/users";

export const metadata: Metadata = {
  title: "Users — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const result = await listUsers({});

  return (
    <AdminShell
      title="Users"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/users")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <UserListClient
        initialItems={result.success ? result.data.items : []}
        initialTotal={result.success ? result.data.total : 0}
      />
    </AdminShell>
  );
}
