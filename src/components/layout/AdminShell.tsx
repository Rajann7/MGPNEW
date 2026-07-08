import { AdminSidebar, type AdminNavItem } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { AdminMobileDrawer, AdminMenuButton } from "./AdminMobileDrawer";

export function AdminShell({
  title,
  navItems,
  staffName,
  staffRole,
  children,
}: {
  title: string;
  navItems: AdminNavItem[];
  staffName: string;
  staffRole: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Desktop: fixed graphite sidebar. Mobile: contextual header + drawer,
          NO bottom nav (locked design 3F — admin is desktop-primary). */}
      <AdminSidebar
        navItems={navItems}
        staffName={staffName}
        staffRole={staffRole}
      />
      <AdminMobileDrawer
        navItems={navItems}
        staffName={staffName}
        staffRole={staffRole}
      />
      <div className="lg:pl-[230px]">
        <AdminTopbar title={title} leading={<AdminMenuButton />} />
        <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
