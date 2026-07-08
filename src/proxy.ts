import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ============================================================
// Route groups
// ============================================================

/** Routes accessible only when authenticated (any role) */
const AUTH_REQUIRED_PATHS = ["/dashboard", "/profile", "/notifications"];

/** Routes accessible only by staff/admin */
const ADMIN_ONLY_PATHS = ["/admin"];

/** Routes to redirect to dashboard if already logged in */
const AUTH_PAGES = ["/login", "/register"];

/** True if `pathname` is exactly `base` or a sub-path of it (segment-boundary safe). */
function matchesPathPrefix(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

// ============================================================
// Middleware
// ============================================================

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Build Supabase server client for session reading
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session (required by @supabase/ssr)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ----- Admin routes guard -----
  if (ADMIN_ONLY_PATHS.some((p) => matchesPathPrefix(pathname, p))) {
    // Public (pre-auth) admin landing pages: staff login + token-based invite
    // acceptance. These must be reachable without a session. Authorization for
    // the invite page comes from possession of a valid token (checked server-side).
    if (
      matchesPathPrefix(pathname, "/admin/login") ||
      matchesPathPrefix(pathname, "/admin/invite")
    ) {
      return response;
    }

    // All other /admin/* routes require authentication
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Staff check is done in server components/actions, not middleware
    // (middleware cannot safely query DB without service role)
    return response;
  }

  // ----- Auth required routes guard -----
  if (AUTH_REQUIRED_PATHS.some((p) => matchesPathPrefix(pathname, p))) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // ----- Auth pages: redirect if already logged in -----
  if (AUTH_PAGES.some((p) => matchesPathPrefix(pathname, p))) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js)).*)",
  ],
};
