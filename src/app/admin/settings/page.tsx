import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { canManageFeatureFlags, canManageSystem } from "@/lib/permissions";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  const allowed =
    canManageFeatureFlags(
      staff,
      permissionsByModule["feature_flags"] ?? null
    ) || canManageSystem(staff, permissionsByModule["system_health"] ?? null);
  if (!allowed) {
    redirect("/unauthorized?reason=permission_denied");
  }

  return (
    <AdminShell
      title="Settings / Feature Flags"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/settings")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="flex flex-col gap-4">
        <DashboardPlaceholderPanel
          icon={Settings}
          status="coming_soon"
          title="Feature Flags — Coming Soon"
          description="Module enable/disable, maintenance mode and provider-mode toggles are planned for a later phase. No flag currently shows a fake enabled/disabled state."
        />
        <DashboardPlaceholderPanel
          status="coming_soon"
          title="System Health — Coming Soon"
          description="Uptime, background job status and database/storage usage views are planned for a later phase. No fake uptime or health metric is shown."
        />
      </div>
    </AdminShell>
  );
}
