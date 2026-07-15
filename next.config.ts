import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit reads its bundled .afm font metrics via __dirname-relative
  // requires at runtime — bundling it breaks that path resolution. Keeping
  // it external (real `require`) fixes ENOENT on Helvetica.afm etc.
  serverExternalPackages: ["pdfkit"],
  // DEV ONLY: allow the dev server to be opened from a phone/other device on
  // the same Wi-Fi (LAN IP) instead of only localhost. Without this, Next 16
  // blocks /_next/* dev resources (HMR + client bundles) for non-localhost
  // origins, so the page never hydrates and clicks/onClick handlers do nothing.
  // Wildcards cover the usual private ranges so a new DHCP IP keeps working.
  // Ignored entirely in production builds.
  allowedDevOrigins: [
    "10.109.225.250",
    "10.*.*.*",
    "192.168.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "*.local",
  ],
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
