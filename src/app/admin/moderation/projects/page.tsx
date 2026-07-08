import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { ModerationQueueClient } from "@/components/admin/ModerationQueueClient";
import { listModerationQueue } from "@/lib/actions/admin/moderation";
import { hasStaffPermission } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Project Moderation — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ProjectModerationPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);
  const result = await listModerationQueue("project");

  const permission = permissionsByModule["projects"] ?? null;

  return (
    <AdminShell
      title="Project Moderation"
      navItems={getAdminNav(
        staff,
        permissionsByModule,
        "/admin/moderation/projects"
      )}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <ModerationQueueClient
        entityType="project"
        initialItems={result.success ? result.data.items : []}
        canApprove={hasStaffPermission(staff, permission, "can_approve")}
        canReject={hasStaffPermission(staff, permission, "can_reject")}
      />
    </AdminShell>
  );
}
