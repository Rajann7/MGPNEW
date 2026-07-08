import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSafeRedirectUrl } from "@/lib/validators/auth";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const next = searchParams.get("next") ?? "/dashboard";

  // Handle OAuth error
  if (error) {
    console.error("[auth/callback] OAuth error:", error);
    return NextResponse.redirect(new URL(`/login?error=oauth_failed`, origin));
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("[auth/callback] Code exchange error:", exchangeError.code);
      return NextResponse.redirect(
        new URL(`/login?error=session_failed`, origin)
      );
    }

    // Safe redirect: internal paths only
    const safeNext = isSafeRedirectUrl(next) ? next : "/dashboard";
    return NextResponse.redirect(new URL(safeNext, origin));
  }

  // No code or error — redirect to login
  return NextResponse.redirect(new URL("/login", origin));
}
