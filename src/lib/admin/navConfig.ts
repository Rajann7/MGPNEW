import {
  LayoutGrid,
  Users,
  UserCog,
  ClipboardCheck,
  ShieldCheck,
  Inbox,
  LifeBuoy,
  Wallet,
  Plug,
  Settings,
  ScrollText,
  Globe,
} from "lucide-react";
import type { AdminNavItem } from "@/components/layout/AdminSidebar";
import type { StaffProfile, StaffPermission } from "@/types";

type ModuleKey =
  | "dashboard"
  | "users"
  | "staff"
  | "moderation"
  | "verification"
  | "leads"
  | "support"
  | "billing"
  | "providers"
  | "settings"
  | "audit_logs"
  | "cms";

function hasReadAccess(
  staff: StaffProfile,
  permissionsByModule: Record<string, StaffPermission>,
  module: string
): boolean {
  if (staff.internal_role === "super_admin") return true;
  return permissionsByModule[module]?.can_read ?? false;
}

export function getAdminNav(
  staff: StaffProfile,
  permissionsByModule: Record<string, StaffPermission>,
  activeHref: string
): AdminNavItem[] {
  const canAudit =
    staff.internal_role === "super_admin" ||
    staff.internal_role === "audit_manager";

  const items: (AdminNavItem & { moduleKey: ModuleKey })[] = [
    {
      moduleKey: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: LayoutGrid,
      active: activeHref === "/admin",
    },
    {
      moduleKey: "users",
      label: "Users",
      href: "/admin/users",
      icon: Users,
      active: activeHref.startsWith("/admin/users"),
    },
    {
      moduleKey: "staff",
      label: "Staff",
      href: "/admin/staff",
      icon: UserCog,
      active: activeHref.startsWith("/admin/staff"),
    },
    {
      moduleKey: "moderation",
      label: "Moderation",
      href: "/admin/moderation",
      icon: ClipboardCheck,
      active: activeHref.startsWith("/admin/moderation"),
    },
    {
      moduleKey: "verification",
      label: "Verification",
      href: "/admin/verification",
      icon: ShieldCheck,
      active: activeHref === "/admin/verification",
    },
    {
      moduleKey: "leads",
      label: "Leads",
      href: "/admin/leads",
      icon: Inbox,
      active: activeHref.startsWith("/admin/leads"),
    },
    {
      moduleKey: "support",
      label: "Support / Reports",
      href: "/admin/support",
      icon: LifeBuoy,
      active:
        activeHref === "/admin/support" ||
        activeHref === "/admin/reports" ||
        activeHref === "/admin/fraud",
    },
    {
      moduleKey: "billing",
      label: "Billing",
      href: "/admin/billing",
      icon: Wallet,
      active: activeHref === "/admin/billing",
    },
    {
      moduleKey: "providers",
      label: "Providers",
      href: "/admin/providers",
      icon: Plug,
      active: activeHref === "/admin/providers",
    },
    {
      moduleKey: "cms",
      label: "CMS / SEO",
      href: "/admin/cms",
      icon: Globe,
      active: activeHref === "/admin/cms",
    },
    {
      moduleKey: "settings",
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: activeHref === "/admin/settings",
    },
    {
      moduleKey: "audit_logs",
      label: "Audit Log",
      href: "/admin/audit",
      icon: ScrollText,
      active: activeHref === "/admin/audit",
    },
  ];

  return items.map((item) => {
    if (item.moduleKey === "dashboard") return { ...item, disabled: false };
    if (item.moduleKey === "audit_logs") {
      return {
        ...item,
        disabled: !canAudit,
        disabledReason: canAudit
          ? undefined
          : "Super Admin / Audit Manager only",
      };
    }
    if (item.moduleKey === "providers" || item.moduleKey === "settings") {
      const allowed =
        staff.internal_role === "super_admin" ||
        hasReadAccess(staff, permissionsByModule, item.moduleKey);
      return {
        ...item,
        disabled: !allowed,
        disabledReason: allowed ? undefined : "Super Admin only unless granted",
      };
    }
    const moduleName =
      item.moduleKey === "moderation" ? "properties" : item.moduleKey;
    const allowed = hasReadAccess(staff, permissionsByModule, moduleName);
    return {
      ...item,
      disabled: !allowed,
      disabledReason: allowed ? undefined : "No permission for this module",
    };
  });
}

export const PLACEHOLDER_ONLY_ROUTES = [
  "support",
  "billing",
  "providers",
  "cms",
  "settings",
] as const;
