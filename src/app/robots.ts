import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config";

/**
 * SEO guidance only — NOT an access control mechanism. Private/dashboard/admin
 * routes are protected server-side (see src/proxy.ts + requireRole/requireStaff);
 * disallow entries here only reduce noise for well-behaved crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/admin",
        "/profile",
        "/login",
        "/unauthorized",
        "/api/",
      ],
    },
    sitemap: `${APP_CONFIG.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
