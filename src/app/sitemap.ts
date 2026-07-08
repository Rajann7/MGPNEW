import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config";
import {
  getAllPublicPropertySlugs,
  getAllPublicProjectSlugs,
  getAllPublicBrokerSlugs,
  getAllPublicBuilderSlugs,
} from "@/lib/actions/public-search";

/**
 * Public-safe sitemap — only approved/published slugs from public-safe views.
 * No draft/pending/rejected/paused/deleted rows, no admin/dashboard routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = APP_CONFIG.url.replace(/\/$/, "");

  const [properties, projects, brokers, builders] = await Promise.all([
    getAllPublicPropertySlugs(),
    getAllPublicProjectSlugs(),
    getAllPublicBrokerSlugs(),
    getAllPublicBuilderSlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/legal/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/legal/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${base}/property/${p.slug}`,
    lastModified: p.published_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/project/${p.slug}`,
    lastModified: p.published_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const brokerEntries: MetadataRoute.Sitemap = brokers.map((b) => ({
    url: `${base}/broker/${b.public_slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const builderEntries: MetadataRoute.Sitemap = builders.map((b) => ({
    url: `${base}/builder/${b.public_slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    ...staticEntries,
    ...propertyEntries,
    ...projectEntries,
    ...brokerEntries,
    ...builderEntries,
  ];
}
