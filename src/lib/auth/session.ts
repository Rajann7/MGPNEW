import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { redirect } from "next/navigation";
import type { Profile, StaffProfile, StaffPermission } from "@/types";

// ============================================================
// getCurrentUser — returns the authenticated Supabase auth user or null
// ============================================================

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// ============================================================
// getCurrentProfile — returns the user's profile row or null
// ============================================================

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !data) return null;
  return data as Profile;
}

// ============================================================
// getCurrentStaffProfile — returns the staff profile or null
// ============================================================

export async function getCurrentStaffProfile(): Promise<StaffProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("staff_profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !data) return null;
  return data as StaffProfile;
}

// ============================================================
// requireAuth — redirects to login if not authenticated
// ============================================================

export async function requireAuth(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

// ============================================================
// requireRole — redirects to unauthorized if wrong role
// ============================================================

export async function requireRole(
  role: "owner" | "broker" | "builder"
): Promise<Profile> {
  const profile = await requireAuth();

  if (
    profile.account_status === "suspended" ||
    profile.account_status === "banned"
  ) {
    redirect("/unauthorized?reason=account_restricted");
  }
  if (profile.account_status === "deleted") {
    redirect("/unauthorized?reason=account_deleted");
  }
  if (profile.public_role !== role) {
    redirect("/unauthorized?reason=wrong_role");
  }

  return profile;
}

// ============================================================
// requireAnyRole — accepts any of the listed public roles
// ============================================================

export async function requireAnyRole(
  roles: Array<"owner" | "broker" | "builder">
): Promise<Profile> {
  const profile = await requireAuth();

  if (
    profile.account_status === "suspended" ||
    profile.account_status === "banned"
  ) {
    redirect("/unauthorized?reason=account_restricted");
  }
  if (!roles.includes(profile.public_role)) {
    redirect("/unauthorized?reason=wrong_role");
  }

  return profile;
}

// ============================================================
// requireStaff — redirects to unauthorized if not a staff member
// ============================================================

export async function requireStaff(): Promise<StaffProfile> {
  const staff = await getCurrentStaffProfile();
  if (!staff) redirect("/unauthorized?reason=admin_denied");

  if (staff.staff_status === "disabled" || staff.staff_status === "suspended") {
    redirect("/unauthorized?reason=staff_disabled");
  }
  if (staff.staff_status === "deleted" || staff.staff_status === "invited") {
    redirect("/unauthorized?reason=staff_inactive");
  }

  return staff;
}

// ============================================================
// requireStaffPermission — checks specific module permission
// ============================================================

export async function requireStaffPermission(
  module: string,
  action: keyof Omit<
    StaffPermission,
    "id" | "staff_profile_id" | "module" | "created_at" | "updated_at"
  >
): Promise<{ staff: StaffProfile; permission: StaffPermission }> {
  const staff = await requireStaff();

  // Super admin has all permissions
  if (staff.internal_role === "super_admin") {
    const fullPermission: StaffPermission = {
      id: "super_admin",
      staff_profile_id: staff.id,
      module,
      can_read: true,
      can_create: true,
      can_update: true,
      can_approve: true,
      can_reject: true,
      can_delete: true,
      can_export: true,
      can_bulk_action: true,
      can_view_sensitive: true,
      can_manage_provider: true,
      can_manage_security: true,
      can_manage_payment: true,
      can_manage_staff: true,
      can_manage_feature_flags: true,
      can_manage_system: true,
    };
    return { staff, permission: fullPermission };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("staff_permissions")
    .select("*")
    .eq("staff_profile_id", staff.id)
    .eq("module", module)
    .single();

  if (error || !data || !data[action]) {
    redirect("/unauthorized?reason=permission_denied");
  }

  return { staff, permission: data as StaffPermission };
}

// ============================================================
// getStaffPermissions — returns all permissions for a staff member
// Used in admin layouts to build nav
// ============================================================

export async function getStaffPermissions(
  staffId: string
): Promise<StaffPermission[]> {
  const admin = createServiceClient();
  const { data } = await admin
    .from("staff_permissions")
    .select("*")
    .eq("staff_profile_id", staffId);

  return (data ?? []) as StaffPermission[];
}

// ============================================================
// getStaffPermissionsByModule — same data, keyed for nav lookups
// ============================================================

export async function getStaffPermissionsByModule(
  staffId: string
): Promise<Record<string, StaffPermission>> {
  const permissions = await getStaffPermissions(staffId);
  return Object.fromEntries(permissions.map((p) => [p.module, p]));
}

// ============================================================
// isPublicRole — type guard
// ============================================================

export function isPublicRole(
  role: string
): role is "owner" | "broker" | "builder" {
  return ["owner", "broker", "builder"].includes(role);
}

// ============================================================
// isInternalRole — type guard
// ============================================================

export function isInternalRole(role: string): boolean {
  const internalRoles = [
    "super_admin",
    "admin",
    "verification_manager",
    "support_manager",
    "content_manager",
    "seo_manager",
    "ads_manager",
    "billing_manager",
    "payment_manager",
    "city_manager",
    "user_manager",
    "notification_manager",
    "system_manager",
    "security_manager",
    "reports_manager",
    "audit_manager",
  ];
  return internalRoles.includes(role);
}

// ============================================================
// getDashboardRoute — returns the correct dashboard path by role
// ============================================================

export function getDashboardRoute(
  role: "owner" | "broker" | "builder"
): string {
  switch (role) {
    case "owner":
      return "/dashboard/owner";
    case "broker":
      return "/dashboard/broker";
    case "builder":
      return "/dashboard/builder";
    default:
      return "/dashboard";
  }
}
