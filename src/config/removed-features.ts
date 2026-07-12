// ============================================================
// Runtime guard for constitutionally removed features (Phase 4).
// Static enforcement: scripts/scan-legacy.mjs (npm run scan:legacy).
// Runtime enforcement: call assertFeatureNotRemoved() before any
// dynamic channel/feature dispatch (e.g. notification channels).
// ============================================================

/** REM-001..009 registry (File 01 §29). */
export const REMOVED_FEATURES = [
  "maps",
  "geolocation",
  "whatsapp",
  "push",
  "non_otp_sms",
  "site_visit",
  "reveal_number",
  "builder_agent",
  "inquiry_type_selection",
  "legacy_public_roles", // buyer/tenant/agency/real-estate-group
] as const;

export type RemovedFeature = (typeof REMOVED_FEATURES)[number];

const REMOVED_CHANNELS = new Set([
  "whatsapp",
  "push",
  "sms_marketing",
  "sms_utility",
]);

/** Throws when code attempts to use a removed feature identifier. */
export function assertFeatureNotRemoved(feature: string): void {
  if ((REMOVED_FEATURES as readonly string[]).includes(feature)) {
    throw new Error(
      `[REMOVED_FEATURE] "${feature}" is constitutionally removed (REM-001..009) and must not execute.`
    );
  }
}

/**
 * Notification channels: only in-app and email are permitted
 * (SMS exists solely inside the OTP flow, never as a notification channel).
 */
export function assertNotificationChannelAllowed(channel: string): void {
  if (REMOVED_CHANNELS.has(channel)) {
    throw new Error(
      `[REMOVED_FEATURE] Notification channel "${channel}" is removed (REM-007). Allowed: in_app, email.`
    );
  }
  if (channel !== "in_app" && channel !== "email") {
    throw new Error(
      `[REMOVED_FEATURE] Unknown notification channel "${channel}". Allowed: in_app, email.`
    );
  }
}
