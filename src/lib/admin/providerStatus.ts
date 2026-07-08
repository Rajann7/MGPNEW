import "server-only";

export interface ProviderStatusRow {
  name: string;
  envVarName: string;
  configured: boolean;
}

/**
 * Reads only whether the env var is *present* — never its value.
 * "Configured" here means "credentials exist", not "verified working" —
 * we never claim ACTIVE without a real health check (none exists yet).
 */
export function getProviderStatusList(): ProviderStatusRow[] {
  const check = (name: string, envVarName: string): ProviderStatusRow => ({
    name,
    envVarName,
    configured: Boolean(process.env[envVarName]),
  });

  return [
    check("Supabase (Database + Auth + RLS)", "NEXT_PUBLIC_SUPABASE_URL"),
    check("OTP Provider", "OTP_API_KEY"),
    check("SMS Provider", "SMS_API_KEY"),
    check("Email Provider", "EMAIL_PROVIDER"),
    check("WhatsApp", "WHATSAPP_BUSINESS_TOKEN"),
    check("Razorpay Payments", "RAZORPAY_KEY_ID"),
    check("Google Maps", "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"),
    check("Cloudflare R2 / CDN", "CLOUDFLARE_API_TOKEN"),
    check("Cloudflare Turnstile", "TURNSTILE_SECRET_KEY"),
    check("Analytics", "ANALYTICS_PROVIDER"),
    check("Error Tracking", "ERROR_TRACKING_DSN"),
    check("Web Push", "WEB_PUSH_PRIVATE_KEY"),
    check("Cron Jobs", "CRON_SECRET"),
  ];
}
