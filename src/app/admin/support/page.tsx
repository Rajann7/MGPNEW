import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";
import { LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "Support / Reports — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  return (
    <AdminShell
      title="Support / Reports / Fraud"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/support")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <div className="flex flex-col gap-4">
        <DashboardPlaceholderPanel
          icon={LifeBuoy}
          status="setup_required"
          title="Support tickets — Setup Required"
          description="No support ticket table exists yet. This module will show real tickets, categories, assignment and internal replies once the full support system is built (a later phase). No fake tickets or replies are shown."
        />
        <DashboardPlaceholderPanel
          status="coming_soon"
          title="Reports / Fraud queue — Coming Soon"
          description="Reported listing/project/profile queue (spam, fraud, wrong info, duplicate, illegal content, contact abuse, payment abuse, harassment) is planned for a later phase. No fake reports are shown."
        />
      </div>
    </AdminShell>
  );
}
