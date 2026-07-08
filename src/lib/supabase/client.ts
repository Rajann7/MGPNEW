import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client — uses anon key only.
 * Safe for use in Client Components.
 * NEVER use service role key here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
