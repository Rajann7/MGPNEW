import "server-only";
import {
  searchPublicListings,
  type PublicPropertyCard,
  type PublicProjectCard,
} from "@/lib/actions/public-search";

/**
 * Homepage "Featured properties / projects" data — REAL published rows only,
 * from the public-safe views. No fake cards: if nothing is published yet the
 * section renders an honest empty state (handled in the components).
 * Bounded (4 properties / 3 projects) to match the Batch 3 design grids.
 */
export async function getHomeFeatured(): Promise<{
  properties: PublicPropertyCard[];
  projects: PublicProjectCard[];
}> {
  try {
    const [propRes, projRes] = await Promise.all([
      searchPublicListings({ entity: "property", sort: "newest" }),
      searchPublicListings({ entity: "project", sort: "newest" }),
    ]);
    return {
      properties: propRes.properties.slice(0, 4),
      projects: projRes.projects.slice(0, 3),
    };
  } catch {
    // Never crash the homepage on a data hiccup — show empty states instead.
    return { properties: [], projects: [] };
  }
}
