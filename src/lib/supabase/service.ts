import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin/service client — uses service role key.
 * SERVER-SIDE ONLY. NEVER import in client components or expose to browser.
 * Use only in trusted server-side code: cron jobs, webhooks, admin actions.
 */
export function createServiceClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Set it in .env.local (server-side only)."
    );
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
