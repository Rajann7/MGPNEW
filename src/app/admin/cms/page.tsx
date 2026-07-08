import { Metadata } from "next";
import { requireStaff, getStaffPermissionsByModule } from "@/lib/auth/session";
import { getAdminNav } from "@/lib/admin/navConfig";
import { AdminShell } from "@/components/layout/AdminShell";
import { DashboardPlaceholderPanel } from "@/components/dashboard/DashboardPlaceholderPanel";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "CMS / SEO / Locations — Admin — My Gujarat Property",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCmsPage() {
  const staff = await requireStaff();
  const permissionsByModule = await getStaffPermissionsByModule(staff.id);

  return (
    <AdminShell
      title="CMS / Blog / Legal / SEO / Locations"
      navItems={getAdminNav(staff, permissionsByModule, "/admin/cms")}
      staffName={staff.full_name}
      staffRole={staff.internal_role}
    >
      <DashboardPlaceholderPanel
        icon={Globe}
        status="coming_soon"
        title="CMS / SEO / Locations — Coming Soon"
        description="CMS pages, blog editor, legal page editor, SEO settings, redirect manager and missing-location review are planned for Prompt 11. No fake published content, legal approval, or sitemap status is shown."
      />
    </AdminShell>
  );
}
