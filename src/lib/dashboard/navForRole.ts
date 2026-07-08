import {
  getOwnerNav,
  getBrokerNav,
  getBuilderNav,
  getMobileTabs,
} from "@/components/dashboard/navConfig";
import type { SidebarNavItem } from "@/components/dashboard/DashboardSidebar";
import type { MobileTabItem } from "@/components/dashboard/DashboardMobileTabBar";

const ROLE_LABEL: Record<"owner" | "broker" | "builder", string> = {
  owner: "Owner",
  broker: "Broker / Agent",
  builder: "Builder / Developer",
};

export function getNavForRole(
  role: "owner" | "broker" | "builder",
  activeHref: string
): SidebarNavItem[] {
  if (role === "owner") return getOwnerNav(activeHref);
  if (role === "broker") return getBrokerNav(activeHref);
  return getBuilderNav(activeHref);
}

export function getMobileTabsForRole(
  role: "owner" | "broker" | "builder",
  activeHref: string
): MobileTabItem[] {
  return getMobileTabs(role, activeHref);
}

export function getRoleLabel(role: "owner" | "broker" | "builder"): string {
  return ROLE_LABEL[role];
}
