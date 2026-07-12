import { z } from "zod";

// ============================================================
// Centralized environment validation (Phase 3 foundation).
// - serverEnv: validated once, server-only usage.
// - clientEnv: NEXT_PUBLIC_* only.
// Provider variables are optional by design: a missing provider
// must surface as "Setup Required" in the UI, never a fake success.
// ============================================================

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Required core (app cannot function without these)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Server-only, required for privileged operations
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Optional providers — absence means "Setup Required", never mocked-as-working
  OTP_PROVIDER: z.string().optional(),
  OTP_API_KEY: z.string().optional(),
  SMS_PROVIDER: z.string().optional(),
  SMS_API_KEY: z.string().optional(),
  EMAIL_PROVIDER: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  RAZORPAY_MODE: z.enum(["test", "live"]).optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

let cachedServerEnv: ServerEnv | null = null;

/**
 * Validates and returns server env. Throws with a readable message when a
 * required variable is missing/invalid — fail fast at the composition root,
 * not deep inside a request handler.
 */
export function getServerEnv(
  source: NodeJS.ProcessEnv = process.env
): ServerEnv {
  if (cachedServerEnv && source === process.env) return cachedServerEnv;
  const parsed = serverSchema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid server environment: ${issues}`);
  }
  if (source === process.env) cachedServerEnv = parsed.data;
  return parsed.data;
}

export function getClientEnv(
  source: NodeJS.ProcessEnv = process.env
): ClientEnv {
  const parsed = clientSchema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid client environment: ${issues}`);
  }
  return parsed.data;
}

/** Presence check used by "Setup Required" surfaces. Never reads values into UI. */
export function isProviderConfigured(
  envVarName: string,
  source: NodeJS.ProcessEnv = process.env
): boolean {
  return Boolean(source[envVarName]);
}
