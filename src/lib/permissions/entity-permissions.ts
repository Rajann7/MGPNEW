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

const EDITABLE_STATUSES: EntityStatus[] = [
  "draft",
  "submitted",
  "need_changes",
  "rejected",
  "published",
  "paused",
];

export function canEditProperty(
  profile: Profile | null,
  property: Pick<Property, "owner_profile_id" | "status" | "deleted_at">
): boolean {
  if (!profile) return false;
  if (property.deleted_at) return false;
  if (property.owner_profile_id !== profile.id) return false;
  // Editing a rejected/published/paused listing routes it back through
  // approval on resubmit (rule: "edit after approval requires approval
  // again") — locked only while under_review, expired, or deleted.
  return EDITABLE_STATUSES.includes(property.status);
}

export function canEditProject(
  profile: Profile | null,
  project: Pick<Project, "builder_profile_id" | "status" | "deleted_at">
): boolean {
  if (!profile) return false;
  if (project.deleted_at) return false;
  if (project.builder_profile_id !== profile.id) return false;
  // Aligned with canSubmitForApproval (Batch 5 §188-189): editing a
  // published/paused/rejected project is allowed and routes back through
  // re-approval on resubmit — locked only while under_review/expired/deleted.
  return EDITABLE_STATUSES.includes(project.status);
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
  return EDITABLE_STATUSES.includes(requirement.status);
}

// ============================================================
// Submit for Approval
// ============================================================

const SUBMITTABLE_STATUSES: EntityStatus[] = [
  "draft",
  "need_changes",
  "rejected",
  "published",
  "paused",
];

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
