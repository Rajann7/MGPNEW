import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare R2 CDN domain will be added here in Phase 10 (Media/Storage)
    // Example: { hostname: "cdn.mygujaratproperty.com" }
    remotePatterns: [],
  },
  // Security headers will be hardened in Phase 13 (Security)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Admin routes must not be indexed
        source: "/admin/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
