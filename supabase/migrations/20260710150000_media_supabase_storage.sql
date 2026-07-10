-- ============================================================
-- My Gujarat Property — Media (Supabase Storage backend)
-- Date: 2026-07-10
-- Scope: real provider-backed media for Property/Project posting wizards.
--   User-approved deviation from CLAUDE.md's default Cloudflare R2 storage
--   to Supabase Storage (R2 not yet connected; Supabase Storage is live).
--   1. Generic polymorphic `media` table (properties/projects/project_units
--      already carry *_media_id / floor_plan_media_ids columns with no FK
--      target table — this creates that table).
--   2. Two storage buckets: `media-public` (photos/video/floor plans —
--      public read) and `media-private` (brochure PDFs — signed URL only,
--      never a public URL per CLAUDE.md §21).
--   3. RLS on `media` scoped to real entity ownership (not just uploader).
--   4. storage.objects RLS: folder-scoped to the uploader's auth uid
--      (standard, well-tested Supabase pattern) — real ownership of the
--      parent listing is enforced server-side in the `media` table RLS,
--      not by trusting the storage path alone.
-- Destructive: No — all additive.
-- Rollback: see commented DROPs at bottom.
-- ============================================================

create table if not exists public.media (
  id                   uuid primary key default gen_random_uuid(),
  owner_type           text not null check (owner_type in ('property', 'project', 'project_unit')),
  owner_id             uuid not null,
  uploader_profile_id  uuid not null references public.profiles(id) on delete cascade,
  kind                 text not null check (kind in ('image', 'video', 'pdf')),
  bucket               text not null check (bucket in ('media-public', 'media-private')),
  storage_path         text not null,
  mime_type            text not null,
  -- 10MB for public photos/video (Batch 5 §95), 25MB for private brochure PDFs.
  file_size_bytes      integer not null check (
                         file_size_bytes > 0
                         and file_size_bytes <= case
                           when bucket = 'media-public' then 10485760
                           else 26214400
                         end
                       ),
  width                smallint,
  height                smallint,
  sort_order           smallint not null default 0,
  is_cover             boolean not null default false,
  created_at           timestamptz not null default now(),
  unique (bucket, storage_path)
);

create index if not exists idx_media_owner on public.media(owner_type, owner_id, sort_order);
create index if not exists idx_media_uploader on public.media(uploader_profile_id);

alter table public.media enable row level security;

-- Owner can manage media on their OWN property/project (real ownership check,
-- not just "uploader_profile_id = me" — prevents inserting rows against
-- someone else's listing even if the storage path trick were bypassed).
create policy "media_owner_read"
  on public.media
  for select
  using (
    (owner_type = 'property' and exists (
      select 1 from public.properties p
      where p.id = owner_id and p.owner_profile_id = mgp_get_my_profile_id()
    ))
    or (owner_type = 'project' and exists (
      select 1 from public.projects pr
      where pr.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
    ))
    or (owner_type = 'project_unit' and exists (
      select 1 from public.project_units u
      join public.projects pr on pr.id = u.project_id
      where u.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
    ))
  );

-- Public read of PUBLIC-bucket media belonging to a publicly visible listing
-- (contact-safe: media rows never carry contact info, this is images/video only).
create policy "media_public_read"
  on public.media
  for select
  using (
    bucket = 'media-public'
    and (
      (owner_type = 'property' and exists (
        select 1 from public.properties p
        where p.id = owner_id and p.visibility_status = 'public'
      ))
      or (owner_type = 'project' and exists (
        select 1 from public.projects pr
        where pr.id = owner_id and pr.visibility_status = 'public'
      ))
    )
  );

create policy "media_owner_insert"
  on public.media
  for insert
  with check (
    uploader_profile_id = mgp_get_my_profile_id()
    and (
      (owner_type = 'property' and exists (
        select 1 from public.properties p
        where p.id = owner_id and p.owner_profile_id = mgp_get_my_profile_id()
      ))
      or (owner_type = 'project' and exists (
        select 1 from public.projects pr
        where pr.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
      ))
      or (owner_type = 'project_unit' and exists (
        select 1 from public.project_units u
        join public.projects pr on pr.id = u.project_id
        where u.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
      ))
    )
  );

create policy "media_owner_update"
  on public.media
  for update
  using (
    (owner_type = 'property' and exists (
      select 1 from public.properties p
      where p.id = owner_id and p.owner_profile_id = mgp_get_my_profile_id()
    ))
    or (owner_type = 'project' and exists (
      select 1 from public.projects pr
      where pr.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
    ))
  );

create policy "media_owner_delete"
  on public.media
  for delete
  using (
    (owner_type = 'property' and exists (
      select 1 from public.properties p
      where p.id = owner_id and p.owner_profile_id = mgp_get_my_profile_id()
    ))
    or (owner_type = 'project' and exists (
      select 1 from public.projects pr
      where pr.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
    ))
    or (owner_type = 'project_unit' and exists (
      select 1 from public.project_units u
      join public.projects pr on pr.id = u.project_id
      where u.id = owner_id and pr.builder_profile_id = mgp_get_my_profile_id()
    ))
  );

-- ------------------------------------------------------------
-- Storage buckets
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media-public', 'media-public', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media-private', 'media-private', false, 26214400,
  array['application/pdf']
)
on conflict (id) do nothing;

-- Folder-scoped to the uploader's own auth uid: {auth.uid()}/{ownerType}/{ownerId}/{filename}.
-- Real listing-ownership is enforced by the `media` table policies above and
-- by the server action that issues the path — this is defense in depth.
create policy "media_public_bucket_owner_write"
  on storage.objects
  for insert
  with check (
    bucket_id = 'media-public'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "media_public_bucket_owner_delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'media-public'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "media_private_bucket_owner_rw"
  on storage.objects
  for all
  using (
    bucket_id = 'media-private'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'media-private'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================================
-- ROLLBACK (manual)
-- drop policy if exists "media_private_bucket_owner_rw" on storage.objects;
-- drop policy if exists "media_public_bucket_owner_delete" on storage.objects;
-- drop policy if exists "media_public_bucket_owner_write" on storage.objects;
-- delete from storage.buckets where id in ('media-public', 'media-private');
-- drop table if exists public.media;
-- ============================================================
