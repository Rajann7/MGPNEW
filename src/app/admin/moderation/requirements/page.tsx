import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { ModerationQueueClient } from "@/components/admin/ModerationQueueClient";
import { listModerationQueue } from "@/lib/actions/admin/moderation";
import { hasStaffPermission } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Requirement Moderation — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RequirementModerationPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const result = await listModerationQueue("requirement");

  const permission = permissionsByModule["requirements"] ?? null;

  return (
    <AdminShell
      title="Requirement Moderation"
      navItems={getAdminNav(
        staff,
        permissionsByModule,
        "/admin/moderation/requirements"
      )}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <ModerationQueueClient
        entityType="requirement"
        initialItems={result.success ? result.data.items : []}
        canApprove={hasStaffPermission(staff, permission, "can_approve")}
        canReject={hasStaffPermission(staff, permission, "can_reject")}
      />
    </AdminShell>
  );
}
