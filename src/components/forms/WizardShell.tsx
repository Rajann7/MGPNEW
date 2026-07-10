import { DashboardShellV2 } from "@/components/dashboard/DashboardShellV2";
import type { SidebarNavItem } from "@/components/dashboard/DashboardSidebar";
import type { MobileTabItem } from "@/components/dashboard/DashboardMobileTabBar";

/**
 * Canonical posting-wizard shell (design Batch 5 §7-11): the wizard lives
 * inside the same role-specific Dashboard sidebar/topbar context as the
 * rest of the dashboard on desktop (not a stripped-down breadcrumb bar),
 * while mobile keeps the wizard's own compact contextual header (rendered
 * by the wizard form itself) instead of the dashboard's mobile chrome — no
 * dashboard bottom tab bar on the posting flow (§13).
 */
export function WizardShell({
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
    <DashboardShellV2
      title={title}
      navItems={navItems}
      mobileTabs={mobileTabs}
      userName={userName}
      userRole={userRole}
      hideMobileTabBar
      hideTopbarOnMobile
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </DashboardShellV2>
  );
}
