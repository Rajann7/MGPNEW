import {
  LayoutGrid,
  Home,
  ClipboardList,
  Building2,
  Inbox,
  UserCircle,
  Bookmark,
  Heart,
  Bell,
  Wallet,
  ShieldCheck,
  LifeBuoy,
  FileText,
  Megaphone,
  Users,
  Globe,
  MessageSquare,
  MessageCircle,
  Search,
  Plus,
  CalendarClock,
  History,
  Settings,
  BarChart3,
} from "lucide-react";
import type { SidebarNavItem } from "./DashboardSidebar";
import type { MobileTabItem } from "./DashboardMobileTabBar";

/**
 * Owner desktop sidebar (Batch 6 · Screen 1A design + Verification/Profile/
 * Support restored per owner request). Site Visits / Analytics / Settings
 * have no live route yet so they're honestly disabled ("Coming soon")
 * rather than linking nowhere.
 */
export function getOwnerNav(
  activeHref: string,
  badges?: { properties?: number; leads?: number }
): SidebarNavItem[] {
  return [
    {
      label: "Overview",
      href: "/dashboard/owner",
      icon: LayoutGrid,
      active: activeHref === "/dashboard/owner",
    },
    {
      label: "My Properties",
      href: "/dashboard/owner/properties",
      icon: Home,
      active: activeHref.startsWith("/dashboard/owner/properties"),
      badge: badges?.properties,
    },
    {
      label: "My Requirements",
      href: "/dashboard/owner/requirements",
      icon: ClipboardList,
      active: activeHref.startsWith("/dashboard/owner/requirements"),
    },
    {
      label: "Leads",
      href: "/dashboard/owner/leads",
      icon: Inbox,
      active: activeHref === "/dashboard/owner/leads",
      badge: badges?.leads,
      badgeVariant: "danger",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      active: activeHref.startsWith("/dashboard/messages"),
    },
    {
      label: "Site Visits",
      href: "/dashboard/owner/site-visits",
      icon: CalendarClock,
      active: activeHref === "/dashboard/owner/site-visits",
    },
    {
      label: "Saved",
      href: "/dashboard/owner/saved",
      icon: Heart,
      active: activeHref === "/dashboard/owner/saved",
    },
    {
      label: "Analytics",
      href: "/dashboard/owner/analytics",
      icon: BarChart3,
      active: activeHref === "/dashboard/owner/analytics",
    },
    {
      label: "Billing",
      href: "/dashboard/owner/billing",
      icon: Wallet,
      active: activeHref === "/dashboard/owner/billing",
    },
    {
      label: "Settings",
      href: "/dashboard/owner/settings",
      icon: Settings,
      active: activeHref === "/dashboard/owner/settings",
    },
    {
      label: "Verification",
      href: "/dashboard/owner/verification",
      icon: ShieldCheck,
      active: activeHref === "/dashboard/owner/verification",
      dividerBefore: true,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserCircle,
      active: activeHref === "/profile",
    },
    { label: "Support", href: "/support", icon: LifeBuoy },
  ];
}

/**
 * Full mobile-drawer module list for Owner (Batch 6 · Screen 1D) — a
 * superset of the desktop sidebar. Badge counts are real counts passed in
 * by the page (never fabricated); items with no live route yet are marked
 * disabled ("Coming soon") rather than linking nowhere.
 */
export function getOwnerDrawerNav(
  activeHref: string,
  badges?: { properties?: number; leads?: number }
): SidebarNavItem[] {
  return [
    {
      label: "Overview",
      href: "/dashboard/owner",
      icon: LayoutGrid,
      active: activeHref === "/dashboard/owner",
    },
    {
      label: "My Properties",
      href: "/dashboard/owner/properties",
      icon: Home,
      active: activeHref.startsWith("/dashboard/owner/properties"),
      badge: badges?.properties,
    },
    {
      label: "My Requirements",
      href: "/dashboard/owner/requirements",
      icon: ClipboardList,
      active: activeHref.startsWith("/dashboard/owner/requirements"),
    },
    {
      label: "Leads",
      href: "/dashboard/owner/leads",
      icon: Inbox,
      active: activeHref === "/dashboard/owner/leads",
      badge: badges?.leads,
      badgeVariant: "danger",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      active: activeHref.startsWith("/dashboard/messages"),
    },
    {
      label: "Site Visits",
      href: "/dashboard/owner/site-visits",
      icon: CalendarClock,
      active: activeHref === "/dashboard/owner/site-visits",
    },
    {
      label: "Saved",
      href: "/dashboard/owner/saved",
      icon: Heart,
      active: activeHref === "/dashboard/owner/saved",
    },
    {
      label: "Recently Viewed",
      href: "/dashboard/owner/recently-viewed",
      icon: History,
      active: activeHref === "/dashboard/owner/recently-viewed",
    },
    {
      label: "Analytics",
      href: "/dashboard/owner/analytics",
      icon: BarChart3,
      active: activeHref === "/dashboard/owner/analytics",
      dividerBefore: true,
    },
    {
      label: "Billing",
      href: "/dashboard/owner/billing",
      icon: Wallet,
      active: activeHref === "/dashboard/owner/billing",
    },
    {
      label: "Verification",
      href: "/dashboard/owner/verification",
      icon: ShieldCheck,
      active: activeHref === "/dashboard/owner/verification",
    },
    {
      label: "Settings",
      href: "/dashboard/owner/settings",
      icon: Settings,
      active: activeHref === "/dashboard/owner/settings",
    },
    { label: "Support", href: "/support", icon: LifeBuoy },
  ];
}

export function getBrokerNav(activeHref: string): SidebarNavItem[] {
  return [
    {
      label: "Overview",
      href: "/dashboard/broker",
      icon: LayoutGrid,
      active: activeHref === "/dashboard/broker",
    },
    {
      label: "My Listings",
      href: "/dashboard/broker/properties",
      icon: Home,
      active: activeHref.startsWith("/dashboard/broker/properties"),
    },
    {
      label: "My Requirements",
      href: "/dashboard/broker/requirements",
      icon: ClipboardList,
      active: activeHref.startsWith("/dashboard/broker/requirements"),
    },
    {
      label: "Leads / CRM",
      href: "/dashboard/broker/leads",
      icon: Inbox,
      active: activeHref === "/dashboard/broker/leads",
    },
    {
      label: "Proposals",
      href: "/dashboard/broker/proposals",
      icon: FileText,
      active: activeHref === "/dashboard/broker/proposals",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      active: activeHref.startsWith("/dashboard/messages"),
    },
    {
      label: "Site Visits",
      href: "/dashboard/broker/site-visits",
      icon: CalendarClock,
      active: activeHref === "/dashboard/broker/site-visits",
    },
    {
      label: "Saved Items",
      href: "/dashboard/broker/saved",
      icon: Bookmark,
      active: activeHref === "/dashboard/broker/saved",
    },
    {
      label: "Recently Viewed",
      href: "/dashboard/broker/recently-viewed",
      icon: History,
      active: activeHref === "/dashboard/broker/recently-viewed",
    },
    {
      label: "Notifications",
      href: "/dashboard/broker/notifications",
      icon: Bell,
      active: activeHref === "/dashboard/broker/notifications",
    },
    {
      label: "Analytics",
      href: "/dashboard/broker/analytics",
      icon: BarChart3,
      active: activeHref === "/dashboard/broker/analytics",
    },
    {
      label: "Billing",
      href: "/dashboard/broker/billing",
      icon: Wallet,
      active: activeHref === "/dashboard/broker/billing",
    },
    {
      label: "Verification",
      href: "/dashboard/broker/verification",
      icon: ShieldCheck,
      active: activeHref === "/dashboard/broker/verification",
    },
    {
      label: "Public Profile",
      href: "/dashboard/broker/public-profile",
      icon: Globe,
      active: activeHref === "/dashboard/broker/public-profile",
    },
    {
      label: "Settings",
      href: "/dashboard/broker/settings",
      icon: Settings,
      active: activeHref === "/dashboard/broker/settings",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserCircle,
      active: activeHref === "/profile",
    },
    { label: "Support", href: "/support", icon: LifeBuoy },
  ];
}

export function getBuilderNav(activeHref: string): SidebarNavItem[] {
  return [
    {
      label: "Overview",
      href: "/dashboard/builder",
      icon: LayoutGrid,
      active: activeHref === "/dashboard/builder",
    },
    {
      label: "My Projects",
      href: "/dashboard/builder/projects",
      icon: Building2,
      active: activeHref.startsWith("/dashboard/builder/projects"),
    },
    {
      label: "Project Leads",
      href: "/dashboard/builder/leads",
      icon: Inbox,
      active: activeHref === "/dashboard/builder/leads",
    },
    {
      label: "Matching Requirements",
      href: "/dashboard/builder/requirements",
      icon: ClipboardList,
      active: activeHref === "/dashboard/builder/requirements",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      active: activeHref.startsWith("/dashboard/messages"),
    },
    {
      label: "Site Visits",
      href: "/dashboard/builder/site-visits",
      icon: CalendarClock,
      active: activeHref === "/dashboard/builder/site-visits",
    },
    {
      label: "Banner Ads",
      href: "/dashboard/builder/ads",
      icon: Megaphone,
      active: activeHref === "/dashboard/builder/ads",
    },
    {
      label: "Analytics",
      href: "/dashboard/builder/analytics",
      icon: BarChart3,
      active: activeHref === "/dashboard/builder/analytics",
    },
    {
      label: "Agents / Team",
      href: "/dashboard/builder/agents",
      icon: Users,
      active: activeHref === "/dashboard/builder/agents",
    },
    {
      label: "Notifications",
      href: "/dashboard/builder/notifications",
      icon: Bell,
      active: activeHref === "/dashboard/builder/notifications",
    },
    {
      label: "Billing",
      href: "/dashboard/builder/billing",
      icon: Wallet,
      active: activeHref === "/dashboard/builder/billing",
    },
    {
      label: "Verification / RERA",
      href: "/dashboard/builder/verification",
      icon: ShieldCheck,
      active: activeHref === "/dashboard/builder/verification",
    },
    {
      label: "Public Profile",
      href: "/dashboard/builder/public-profile",
      icon: Globe,
      active: activeHref === "/dashboard/builder/public-profile",
    },
    {
      label: "Settings",
      href: "/dashboard/builder/settings",
      icon: Settings,
      active: activeHref === "/dashboard/builder/settings",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserCircle,
      active: activeHref === "/profile",
    },
    { label: "Support", href: "/support", icon: LifeBuoy },
  ];
}

/**
 * Locked dashboard mobile bottom nav (Batch 1 · shell 3E): exactly 5 items in a
 * fixed order — Home · Search · Post (raised center FAB) · Leads · Profile —
 * identical on every dashboard mobile screen for all roles. The full per-role
 * module list stays in the sidebar/drawer; this bar is the global quick-nav.
 */
export function getMobileTabs(
  role: "owner" | "broker" | "builder",
  activeHref: string
): MobileTabItem[] {
  const home = `/dashboard/${role}`;
  const leads = `/dashboard/${role}/leads`;
  const post =
    role === "builder"
      ? "/dashboard/builder/projects/new"
      : `/dashboard/${role}/properties/new`;
  return [
    {
      label: "Home",
      href: home,
      icon: Home,
      active: activeHref === home,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      active: activeHref.startsWith("/search"),
    },
    {
      label: "Post",
      href: post,
      icon: Plus,
      fab: true,
      active: activeHref.startsWith(post),
    },
    {
      label: "Leads",
      href: leads,
      icon: MessageCircle,
      active: activeHref === leads,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserCircle,
      active: activeHref === "/profile",
    },
  ];
}
