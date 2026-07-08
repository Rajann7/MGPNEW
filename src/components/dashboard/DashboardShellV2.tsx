import { DashboardSidebar, type SidebarNavItem } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import {
  DashboardMobileTabBar,
  type MobileTabItem,
} from "./DashboardMobileTabBar";

export function DashboardShellV2({
  title,
  navItems,
  mobileTabs,
  userName,
  userRole,
  children,
}: {
  title: string;
  navItems: SidebarNavItem[];
  mobileTabs: MobileTabItem[];
  userName: string;
  userRole: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        navItems={navItems}
        userName={userName}
        userRole={userRole}
      />
      <div className="lg:pl-[220px]">
        <DashboardTopbar title={title} />
        <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      <DashboardMobileTabBar items={mobileTabs} />
    </div>
  );
}
