import { APP_CONFIG } from "@/config";

/** Builds an absolute canonical URL from a site-relative path. Never points at dashboard/admin/auth routes. */
export function canonicalUrl(path: string): string {
  const base = APP_CONFIG.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Robots directive for thin/unavailable/private pages — never indexed. */
export const NOINDEX = { index: false, follow: false } as const;

/** Robots directive for real, published, public-safe pages. */
export const INDEXABLE = { index: true, follow: true } as const;

/** Truncates a description safely for meta tags (no mid-word cuts where avoidable). */
export function safeDescription(
  text: string | null | undefined,
  fallback: string,
  max = 160
): string {
  const source = (text ?? "").trim() || fallback;
  if (source.length <= max) return source;
  const cut = source.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Minimal, safe BreadcrumbList JSON-LD. No reviews/ratings/fake data ever added here. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}
