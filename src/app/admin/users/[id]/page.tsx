import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { UserDetailClient } from "@/components/admin/UserDetailClient";
import { getUserDetail } from "@/lib/actions/admin/users";
import { hasStaffPermission } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "User Detail — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  const detail = await getUserDetail(id);
  if (!detail.success) notFound();

  const canUpdate = hasStaffPermission(
    staff,
    permissionsByModule["users"] ?? null,
    "can_update"
  );

  return (
    <AdminShell
      title={detail.data.profile.display_name ?? detail.data.profile.full_name}
      navItems={getAdminNav(staff, permissionsByModule, "/admin/users")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <UserDetailClient
        profile={detail.data.profile}
        propertyCount={detail.data.propertyCount}
        projectCount={detail.data.projectCount}
        requirementCount={detail.data.requirementCount}
        initialNotes={detail.data.notes}
        canUpdate={canUpdate}
      />
    </AdminShell>
  );
}
