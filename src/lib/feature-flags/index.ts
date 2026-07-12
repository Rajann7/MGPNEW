// ============================================================
// My Gujarat Property — Feature Flag Convention (baseline)
// Full backend-enforced feature flags will be added in later phases.
//
// VP-P04 rule: feature flags and Plans must NOT be able to
// reactivate constitutionally removed capabilities (REM-004/007).
// Removed-capability flags are hard-coded to false — no env var,
// plan entitlement or admin setting can turn them back on.
// ============================================================

/**
 * Environment-level feature flags.
 * All flags default to false (disabled) when env var is not set.
 * Backend enforcement required for sensitive features — do not rely on
 * frontend flag checks alone for security-critical behavior.
 */
export const FEATURE_FLAGS = {
  /** Cloudflare Turnstile bot protection on forms */
  turnstileEnabled:
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== undefined &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== "",

  /**
   * REMOVED (REM-004): Maps is constitutionally removed.
   * Hard-off — deliberately NOT derived from any environment variable.
   */
  mapsEnabled: false,

  /**
   * REMOVED (REM-007): WhatsApp delivery is constitutionally removed.
   * Hard-off — deliberately NOT derived from any environment variable.
   */
  whatsappEnabled: false,
} as const;
