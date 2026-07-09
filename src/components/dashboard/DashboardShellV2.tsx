import { DashboardSidebar, type SidebarNavItem } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { DashboardMobileHeader } from "./DashboardMobileHeader";
import {
  DashboardMobileTabBar,
  type MobileTabItem,
} from "./DashboardMobileTabBar";

/**
 * Pre-renders icon components to JSX here (a plain server module) before
 * crossing into the client DashboardSidebar/DashboardMobileHeader — icon
 * components (functions) can't be passed as data props across the
 * server→client boundary, only already-rendered elements can.
 */
function toRenderedIcon(navItems: SidebarNavItem[]) {
  return navItems.map((item) => {
    const Icon = item.icon;
    return {
      ...item,
      icon: <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />,
    };
  });
}

function toDrawerItems(navItems: SidebarNavItem[]) {
  return navItems.map((item) => {
    const Icon = item.icon;
    return {
      label: item.label,
      href: item.href,
      icon: <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />,
      active: item.active,
      disabled: item.disabled,
      badge: item.badge,
      dividerBefore: item.dividerBefore,
    };
  });
}

export function DashboardShellV2({
  title,
  breadcrumb,
  navItems,
  mobileTabs,
  userName,
  userRole,
  userCity,
  mobileDrawerNav,
  children,
}: {
  title: string;
  /** Breadcrumb trail, e.g. ["Dashboard", "Overview"]. Falls back to [title]. */
  breadcrumb?: string[];
  navItems: SidebarNavItem[];
  mobileTabs: MobileTabItem[];
  userName: string;
  userRole: string;
  userCity?: string | null;
  /**
   * Full per-role module list (with real badge counts) for the mobile
   * hamburger drawer. When provided, replaces the plain mobile topbar with
   * DashboardMobileHeader (Batch 6 · Screen 1C/1D). Omit to keep the
   * existing plain topbar-on-mobile behavior unchanged.
   */
  mobileDrawerNav?: SidebarNavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        navItems={toRenderedIcon(navItems)}
        userName={userName}
        userRole={userRole}
      />
      {/*
        Sidebar collapse state lives client-side only (DashboardSidebar sets
        the --mgp-sidebar-w CSS variable on <html>) so this content wrapper
        never needs the icon-bearing navItems/mobileTabs data itself — it
        stays a plain server component.
      */}
      <div className="lg:pl-[var(--mgp-sidebar-w,220px)] transition-[padding] duration-200">
        {mobileDrawerNav && (
          <DashboardMobileHeader
            title={title}
            navItems={toDrawerItems(mobileDrawerNav)}
            userName={userName}
            userRole={userRole}
            userCity={userCity}
          />
        )}
        <DashboardTopbar
          title={title}
          breadcrumb={breadcrumb ?? [title]}
          userName={userName}
          desktopOnly={!!mobileDrawerNav}
        />
        <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      <DashboardMobileTabBar items={mobileTabs} />
    </div>
  );
}
