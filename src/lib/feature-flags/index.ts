// ============================================================
// My Gujarat Property — Feature Flag Convention (baseline)
// Full backend-enforced feature flags will be added in later phases.
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

  /** Google Maps integration (embed or API mode) */
  mapsEnabled:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== undefined &&
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "",

  /** WhatsApp click / business API */
  whatsappEnabled:
    process.env.WHATSAPP_MODE !== undefined && process.env.WHATSAPP_MODE !== "",
} as const;
