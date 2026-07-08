-- ============================================================
-- Fix: recently_viewed_items was missing a DELETE RLS policy, so
-- the "Clear history" action (clearRecentlyViewed) and the >30-item
-- trim in trackRecentlyViewed silently deleted 0 rows under the user
-- client. Add an own-rows DELETE policy. Idempotent.
-- ============================================================

drop policy if exists "recently_viewed_items: own delete" on public.recently_viewed_items;

create policy "recently_viewed_items: own delete"
  on public.recently_viewed_items for delete
  using (profile_id = mgp_get_my_profile_id());
