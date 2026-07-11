import type { InternalRole } from "@/types";

/**
 * Permission presets seeded when a staff invite is accepted, and used to build
 * the read-only "You'll have access to" preview on the Batch 2 screen-16 invite
 * acceptance page. The preview shown to the invitee is derived from the SAME
 * map that is seeded on accept, so what they see is exactly what they get.
 *
 * Super Admin is intentionally absent — Super Admin bypasses per-module
 * permission rows entirely in `requireStaffPermission` (full access via role).
 */

type PermissionGrant = {
  can_read?: boolean;
  can_create?: boolean;
  can_update?: boolean;
  can_approve?: boolean;
  can_reject?: boolean;
  can_delete?: boolean;
  can_export?: boolean;
  can_view_sensitive?: boolean;
};

export interface RolePreset {
  /** module → permission flags granted on accept */
  grants: Record<string, PermissionGrant>;
  /** human-readable preview rows (granted = has access) */
  preview: { label: string; granted: boolean }[];
}

const R: Partial<Record<InternalRole, RolePreset>> = {
  admin: {
    grants: {
      users: { can_read: true, can_update: true },
      verification: { can_read: true, can_approve: true, can_reject: true },
      support: { can_read: true, can_update: true },
    },
    preview: [
      { label: "Users — read & update", granted: true },
      { label: "Verification queue — review & approve", granted: true },
      { label: "Support tickets — read & respond", granted: true },
      {
        label: "Provider secrets & system settings — Super Admin only",
        granted: false,
      },
    ],
  },
  verification_manager: {
    grants: {
      verification: { can_read: true, can_approve: true, can_reject: true },
      properties: { can_read: true },
    },
    preview: [
      {
        label: "Verification queue — review & approve listings",
        granted: true,
      },
      { label: "Listings — read & flag", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  support_manager: {
    grants: {
      support: { can_read: true, can_update: true },
      users: { can_read: true },
    },
    preview: [
      { label: "Support tickets — read & respond", granted: true },
      { label: "Users — read", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  content_manager: {
    grants: {
      cms: { can_read: true, can_create: true, can_update: true },
    },
    preview: [
      { label: "CMS / pages — create & edit", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  seo_manager: {
    grants: { seo: { can_read: true, can_update: true } },
    preview: [
      { label: "SEO settings — read & edit", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  ads_manager: {
    grants: { ads: { can_read: true, can_approve: true, can_reject: true } },
    preview: [
      { label: "Ads & promotions — review & approve", granted: true },
      { label: "Billing, System — no access", granted: false },
    ],
  },
  billing_manager: {
    grants: { billing: { can_read: true } },
    preview: [
      { label: "Billing — read", granted: true },
      { label: "Payments, Ads, System — no access", granted: false },
    ],
  },
  payment_manager: {
    grants: { payments: { can_read: true } },
    preview: [
      { label: "Payments — read", granted: true },
      { label: "System settings — no access", granted: false },
    ],
  },
  city_manager: {
    grants: {
      locations: { can_read: true, can_create: true, can_update: true },
    },
    preview: [
      { label: "Locations — create & edit", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  user_manager: {
    grants: { users: { can_read: true, can_update: true } },
    preview: [
      { label: "Users — read & update", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  notification_manager: {
    grants: { notifications: { can_read: true, can_create: true } },
    preview: [
      { label: "Notifications — read & send", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  system_manager: {
    grants: { settings: { can_read: true } },
    preview: [
      { label: "System settings — read", granted: true },
      {
        label: "Provider secrets & security — Super Admin only",
        granted: false,
      },
    ],
  },
  security_manager: {
    grants: { security: { can_read: true } },
    preview: [
      { label: "Security overview — read", granted: true },
      { label: "Provider secrets — Super Admin only", granted: false },
    ],
  },
  reports_manager: {
    grants: { reports: { can_read: true, can_export: true } },
    preview: [
      { label: "Reports — read & export", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
  audit_manager: {
    grants: { audit: { can_read: true } },
    preview: [
      { label: "Audit log — read", granted: true },
      { label: "Billing, Ads, System — no access", granted: false },
    ],
  },
};

export function getRolePreset(role: InternalRole): RolePreset {
  return (
    R[role] ?? {
      grants: {},
      preview: [
        {
          label: "Full access — every admin module (Super Admin)",
          granted: role === "super_admin",
        },
      ],
    }
  );
}
