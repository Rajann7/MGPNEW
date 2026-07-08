import type { Profile, StaffProfile, StaffPermission } from "@/types";

// ============================================================
// Public Role Permission Helpers
// ============================================================

export function canAccessOwnerDashboard(profile: Profile | null): boolean {
  if (!profile) return false;
  return profile.public_role === "owner" && profile.account_status === "active";
}

export function canAccessBrokerDashboard(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    profile.public_role === "broker" && profile.account_status === "active"
  );
}

export function canAccessBuilderDashboard(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    profile.public_role === "builder" && profile.account_status === "active"
  );
}

export function canPostProperty(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    (profile.public_role === "owner" || profile.public_role === "broker") &&
    profile.account_status === "active"
  );
}

export function canPostProject(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    profile.public_role === "builder" && profile.account_status === "active"
  );
}

export function canPostRequirement(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    (profile.public_role === "owner" || profile.public_role === "broker") &&
    profile.account_status === "active"
  );
}

export function canRevealContact(profile: Profile | null): boolean {
  if (!profile) return false;
  return profile.account_status === "active";
}

export function isAccountRestricted(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    profile.account_status === "suspended" ||
    profile.account_status === "banned"
  );
}

// ============================================================
// Staff Role Permission Helpers
// ============================================================

export function canAccessAdmin(staff: StaffProfile | null): boolean {
  if (!staff) return false;
  return staff.staff_status === "active";
}

export function canManageStaff(staff: StaffProfile | null): boolean {
  if (!staff) return false;
  return (
    staff.staff_status === "active" &&
    (staff.internal_role === "super_admin" || staff.internal_role === "admin")
  );
}

export function canViewSensitiveDocs(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_view_sensitive ?? false;
}

export function isSuperAdmin(staff: StaffProfile | null): boolean {
  if (!staff) return false;
  return (
    staff.internal_role === "super_admin" && staff.staff_status === "active"
  );
}

export function hasStaffPermission(
  staff: StaffProfile | null,
  permission: StaffPermission | null,
  action: keyof Omit<
    StaffPermission,
    "id" | "staff_profile_id" | "module" | "created_at" | "updated_at"
  >
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  if (!permission) return false;
  return permission[action] === true;
}

// ============================================================
// Admin/Staff High-Risk Permission Helpers (Prompt 07)
// ============================================================

/** Only Super Admin, or a staff member explicitly granted manage_staff on the "staff" module. */
export function canManageStaffPermissions(
  staff: StaffProfile | null,
  staffModulePermission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return staffModulePermission?.can_manage_staff ?? false;
}

/** Provider settings/secrets — Super Admin only unless explicitly granted. */
export function canManageProvider(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_manage_provider ?? false;
}

/** Security settings — Super Admin only unless explicitly granted. */
export function canManageSecurity(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_manage_security ?? false;
}

/** Payment/refund/reconciliation actions — Super Admin only unless explicitly granted. */
export function canManagePayment(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_manage_payment ?? false;
}

/** Feature flags / production config — Super Admin only unless explicitly granted. */
export function canManageFeatureFlags(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_manage_feature_flags ?? false;
}

/** System-level settings (maintenance mode, cron, etc.) — Super Admin only unless explicitly granted. */
export function canManageSystem(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  return permission?.can_manage_system ?? false;
}

/** Only Super Admin or a staff member with audit_logs.can_read may view the audit log. */
export function canViewAuditLog(
  staff: StaffProfile | null,
  permission: StaffPermission | null
): boolean {
  if (!staff || staff.staff_status !== "active") return false;
  if (staff.internal_role === "super_admin") return true;
  if (staff.internal_role === "audit_manager") return true;
  return permission?.can_read ?? false;
}
