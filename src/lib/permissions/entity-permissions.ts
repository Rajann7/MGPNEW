import type {
  Profile,
  Property,
  Project,
  Requirement,
  EntityStatus,
} from "@/types";

// ============================================================
// Entity Creation Permissions
// ============================================================

export function canCreateProperty(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    (profile.public_role === "owner" || profile.public_role === "broker") &&
    profile.account_status === "active"
  );
}

export function canCreateProject(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    profile.public_role === "builder" && profile.account_status === "active"
  );
}

export function canCreateRequirement(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    (profile.public_role === "owner" || profile.public_role === "broker") &&
    profile.account_status === "active"
  );
}

// ============================================================
// Entity Edit Permissions
// ============================================================

export function canEditProperty(
  profile: Profile | null,
  property: Pick<Property, "owner_profile_id" | "status" | "deleted_at">
): boolean {
  if (!profile) return false;
  if (property.deleted_at) return false;
  if (property.owner_profile_id !== profile.id) return false;
  // Can edit if draft, need_changes, or submitted (before under_review)
  return ["draft", "submitted", "need_changes"].includes(property.status);
}

export function canEditProject(
  profile: Profile | null,
  project: Pick<Project, "builder_profile_id" | "status" | "deleted_at">
): boolean {
  if (!profile) return false;
  if (project.deleted_at) return false;
  if (project.builder_profile_id !== profile.id) return false;
  return ["draft", "submitted", "need_changes"].includes(project.status);
}

export function canEditRequirement(
  profile: Profile | null,
  requirement: Pick<
    Requirement,
    "created_by_profile_id" | "status" | "deleted_at"
  >
): boolean {
  if (!profile) return false;
  if (requirement.deleted_at) return false;
  if (requirement.created_by_profile_id !== profile.id) return false;
  return ["draft", "submitted", "need_changes"].includes(requirement.status);
}

// ============================================================
// Submit for Approval
// ============================================================

const SUBMITTABLE_STATUSES: EntityStatus[] = ["draft", "need_changes"];

export function canSubmitForApproval(
  profile: Profile | null,
  entity: { status: EntityStatus; deleted_at: string | null }
): boolean {
  if (!profile) return false;
  if (entity.deleted_at) return false;
  return SUBMITTABLE_STATUSES.includes(entity.status);
}

// ============================================================
// Pause / Resume
// ============================================================

export function canPauseResume(
  profile: Profile | null,
  entity: { status: EntityStatus; deleted_at: string | null }
): boolean {
  if (!profile) return false;
  if (entity.deleted_at) return false;
  // Can pause published, can resume paused
  return ["published", "paused"].includes(entity.status);
}

// ============================================================
// Soft Delete
// ============================================================

export function canSoftDelete(
  profile: Profile | null,
  entity: { status: EntityStatus; deleted_at: string | null }
): boolean {
  if (!profile) return false;
  if (entity.deleted_at) return false;
  // Cannot delete under_review or approved (already in approval pipeline)
  return !["under_review"].includes(entity.status);
}
