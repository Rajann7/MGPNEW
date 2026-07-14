/** Builder team member permission flags (B8-S14). Real, stored in
 *  builder_team_members.permissions jsonb. */
export const TEAM_PERMISSIONS = [
  { key: "manage_leads", label: "Manage leads", hint: "View & update project leads / CRM" },
  { key: "manage_projects", label: "Manage projects", hint: "Edit project details & status" },
  { key: "manage_units", label: "Manage units", hint: "Edit unit inventory & availability" },
  { key: "manage_proposals", label: "Manage proposals", hint: "Respond to buyer requirements" },
  { key: "view_analytics", label: "View analytics", hint: "See project performance stats" },
] as const;

export type TeamPermissionKey = (typeof TEAM_PERMISSIONS)[number]["key"];
export const TEAM_PERMISSION_KEYS = TEAM_PERMISSIONS.map((p) => p.key) as TeamPermissionKey[];
export type TeamPermissions = Record<TeamPermissionKey, boolean>;
