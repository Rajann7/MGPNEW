"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getCurrentProfile } from "@/lib/auth/session";
import type {
  ActionResult,
  SavedItem,
  SavedItemType,
  SavedSearch,
  RecentlyViewedItem,
} from "@/types";

const TARGET_TABLE: Record<string, string> = {
  property: "properties",
  project: "projects",
  requirement: "requirements",
  broker_profile: "broker_profiles",
  builder_profile: "builder_profiles",
};

const TARGET_TITLE_COL: Record<string, string> = {
  property: "title",
  project: "project_name",
  requirement: "title",
  broker_profile: "agency_name",
  builder_profile: "company_name",
};

// ============================================================
// saveItem / unsaveItem
// ============================================================

export async function saveItem(
  itemType: SavedItemType,
  itemId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_items")
    .upsert(
      { profile_id: profile.id, item_type: itemType, item_id: itemId },
      { onConflict: "profile_id,item_type,item_id", ignoreDuplicates: true }
    );

  if (error) {
    console.error("[saveItem] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return { success: true, data: null };
}

export async function unsaveItem(
  itemType: SavedItemType,
  itemId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("profile_id", profile.id)
    .eq("item_type", itemType)
    .eq("item_id", itemId);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

// ============================================================
// listSavedItems — with safe entity summary, unavailable-state safe
// ============================================================

export interface SavedItemRow extends SavedItem {
  title: string;
  cityText: string | null;
  available: boolean;
  slug: string | null;
}

export async function listSavedItems(
  itemType?: SavedItemType
): Promise<ActionResult<{ items: SavedItemRow[] }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  let query = supabase
    .from("saved_items")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });
  if (itemType) query = query.eq("item_type", itemType);

  const { data, error } = await query;
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const admin = createServiceClient();
  const entityByKey = await batchLoadEntities(admin, data as SavedItem[]);

  const items: SavedItemRow[] = (data as SavedItem[]).map((saved) => {
    const titleCol = TARGET_TITLE_COL[saved.item_type];
    const row = entityByKey.get(`${saved.item_type}:${saved.item_id}`) ?? null;
    return {
      ...saved,
      title: row
        ? ((row[titleCol] as string) ?? "Untitled")
        : "No longer available",
      cityText: row ? ((row.city_text as string) ?? null) : null,
      slug: row ? ((row.slug as string) ?? null) : null,
      available: Boolean(row),
    };
  });

  return { success: true, data: { items } };
}

/** Batch-loads entity rows (title/city_text/slug) across mixed item types, no N+1. */
async function batchLoadEntities(
  admin: ReturnType<typeof createServiceClient>,
  rows: { item_type: string; item_id: string }[]
): Promise<Map<string, Record<string, unknown>>> {
  const idsByType: Record<string, string[]> = {};
  for (const row of rows) {
    (idsByType[row.item_type] ??= []).push(row.item_id);
  }

  const entityByKey = new Map<string, Record<string, unknown>>();
  await Promise.all(
    Object.keys(idsByType).map(async (itemType) => {
      const table = TARGET_TABLE[itemType];
      const titleCol = TARGET_TITLE_COL[itemType];
      const ids = Array.from(new Set(idsByType[itemType]));
      if (!table || ids.length === 0) return;
      const { data: entities } = await admin
        .from(table)
        .select(`id, ${titleCol}, city_text, slug`)
        .in("id", ids)
        .is("deleted_at", null);
      for (const entity of (entities ?? []) as unknown as Record<
        string,
        unknown
      >[]) {
        entityByKey.set(`${itemType}:${entity.id}`, entity);
      }
    })
  );
  return entityByKey;
}

// ============================================================
// Saved Searches
// ============================================================

export async function saveSearch(
  title: string,
  queryParams: Record<string, unknown>,
  alertEnabled = false
): Promise<ActionResult<{ id: string }>> {
  if (!title || title.trim().length < 1)
    return { success: false, error: "VALIDATION_ERROR" };
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_searches")
    .insert({
      profile_id: profile.id,
      title: title.trim().slice(0, 120),
      query_params: queryParams,
      alert_enabled: alertEnabled,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { id: data.id } };
}

export async function deleteSavedSearch(
  id: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_searches")
    .delete()
    .eq("id", id)
    .eq("profile_id", profile.id);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: null };
}

export async function listSavedSearches(): Promise<
  ActionResult<{ items: SavedSearch[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_searches")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });
  if (error) return { success: false, error: "UNKNOWN_ERROR" };
  return { success: true, data: { items: (data ?? []) as SavedSearch[] } };
}

// ============================================================
// Recently Viewed
// ============================================================

const RECENTLY_VIEWED_MAX = 30;

export async function trackRecentlyViewed(
  itemType: "property" | "project" | "requirement",
  itemId: string
): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: true, data: null }; // guest — no-op, no fake tracking

  const supabase = await createClient();
  const { error } = await supabase.from("recently_viewed_items").upsert(
    {
      profile_id: profile.id,
      item_type: itemType,
      item_id: itemId,
      viewed_at: new Date().toISOString(),
    },
    { onConflict: "profile_id,item_type,item_id" }
  );
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  // Trim to max — delete oldest beyond the limit for this user.
  // Only fetch ids past the cutoff (offset RECENTLY_VIEWED_MAX), not the whole history.
  const { data: overflow } = await supabase
    .from("recently_viewed_items")
    .select("id")
    .eq("profile_id", profile.id)
    .order("viewed_at", { ascending: false })
    .range(RECENTLY_VIEWED_MAX, RECENTLY_VIEWED_MAX + 199);
  if (overflow && overflow.length > 0) {
    const idsToDelete = overflow.map((r) => r.id);
    await supabase.from("recently_viewed_items").delete().in("id", idsToDelete);
  }

  return { success: true, data: null };
}

export interface RecentlyViewedRow extends RecentlyViewedItem {
  title: string;
  cityText: string | null;
  available: boolean;
  slug: string | null;
}

export async function listRecentlyViewed(): Promise<
  ActionResult<{ items: RecentlyViewedRow[] }>
> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recently_viewed_items")
    .select("*")
    .eq("profile_id", profile.id)
    .order("viewed_at", { ascending: false })
    .limit(RECENTLY_VIEWED_MAX);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  const admin = createServiceClient();
  const entityByKey = await batchLoadEntities(
    admin,
    data as RecentlyViewedItem[]
  );

  const items: RecentlyViewedRow[] = (data as RecentlyViewedItem[]).map(
    (viewed) => {
      const titleCol = TARGET_TITLE_COL[viewed.item_type];
      const row =
        entityByKey.get(`${viewed.item_type}:${viewed.item_id}`) ?? null;
      return {
        ...viewed,
        title: row
          ? ((row[titleCol] as string) ?? "Untitled")
          : "No longer available",
        cityText: row ? ((row.city_text as string) ?? null) : null,
        slug: row ? ((row.slug as string) ?? null) : null,
        available: Boolean(row),
      };
    }
  );

  return { success: true, data: { items } };
}

/** Clear the signed-in user's entire recently-viewed history (design: "Clear history"). */
export async function clearRecentlyViewed(): Promise<ActionResult<null>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("recently_viewed_items")
    .delete()
    .eq("profile_id", profile.id);
  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath("/");
  return { success: true, data: null };
}

// ============================================================
// isItemSaved — cheap existence check for detail page CTA state
// ============================================================

export async function isItemSaved(
  itemType: SavedItemType,
  itemId: string
): Promise<boolean> {
  const profile = await getCurrentProfile();
  if (!profile) return false;

  const supabase = await createClient();
  const { data } = await supabase
    .from("saved_items")
    .select("id")
    .eq("profile_id", profile.id)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .maybeSingle();

  return Boolean(data);
}
