-- ============================================================
-- My Gujarat Property — Property, Project And Requirement System
-- Phase: Prompt 04
-- Date: 2026-06-30
-- Tables: properties, projects, project_units, requirements,
--         entity_status_events, entity_moderation_notes
-- Views: public_properties_view, public_projects_view,
--        public_requirements_view
-- RLS: Enabled on all tables
-- Destructive: No (new tables only)
-- Backup required: No (new tables, no existing data)
-- Rollback: See commented DROP statements at bottom
-- ============================================================

-- ============================================================
-- ENUMS / DOMAIN VALUES
-- Implemented as text + check constraints for flexibility
-- ============================================================

-- ============================================================
-- TABLE: properties
-- Core property listing table
-- Private: owner contact, exact hidden address, admin notes
-- Public: only via public_properties_view (approved + published)
-- ============================================================

create table if not exists public.properties (
  id                       uuid primary key default gen_random_uuid(),

  -- Ownership
  owner_profile_id         uuid not null references public.profiles(id) on delete restrict,
  created_by_profile_id    uuid not null references public.profiles(id) on delete restrict,
  public_role              text not null check (public_role in ('owner', 'broker')),

  -- Identity
  title                    text not null check (char_length(title) between 5 and 200),
  slug                     text unique,
  description              text check (char_length(description) <= 5000),

  -- Classification
  purpose                  text not null check (purpose in ('sell', 'rent', 'lease', 'pg', 'business_sale')),
  category                 text not null check (category in (
                             'residential', 'commercial', 'industrial',
                             'land_plot', 'pg_hostel_room', 'business'
                           )),
  property_type            text not null,

  -- Pricing
  price                    numeric(14,2),
  rent_amount              numeric(14,2),
  deposit_amount           numeric(14,2),
  maintenance_amount       numeric(14,2),
  price_negotiable         boolean not null default false,

  -- Area
  area_value               numeric(12,4),
  area_unit                text check (area_unit in ('sq_ft', 'sq_m', 'sq_yd', 'acre', 'bigha', 'guntha', 'hectare')),
  built_up_area            numeric(12,4),
  carpet_area              numeric(12,4),
  plot_area                numeric(12,4),
  land_area                numeric(12,4),

  -- Residential details
  bedrooms                 smallint,
  bathrooms                smallint,
  balconies                smallint,
  floor_number             smallint,
  total_floors             smallint,
  furnishing_status        text check (furnishing_status in (
                             'unfurnished', 'semi_furnished', 'fully_furnished'
                           )),
  property_age             text check (property_age in (
                             'new_construction', 'under_1_year', '1_to_3_years',
                             '3_to_5_years', '5_to_10_years', 'above_10_years'
                           )),
  possession_status        text check (possession_status in (
                             'ready_to_move', 'under_construction', 'on_request'
                           )),
  available_from           date,
  ownership_type           text check (ownership_type in (
                             'freehold', 'leasehold', 'cooperative_society',
                             'power_of_attorney', 'other'
                           )),
  facing                   text check (facing in (
                             'north', 'south', 'east', 'west',
                             'north_east', 'north_west', 'south_east', 'south_west'
                           )),
  parking                  text check (parking in (
                             'none', 'open', 'covered', 'both'
                           )),
  amenities                jsonb not null default '[]'::jsonb,

  -- Dynamic / extra attributes (type-specific)
  extra_attributes         jsonb not null default '{}'::jsonb,

  -- Location (FK foundation — resolved in Prompt 11)
  country_id               uuid,
  state_id                 uuid,
  district_id              uuid,
  taluka_id                uuid,
  city_id                  uuid,
  village_id               uuid,
  area_id                  uuid,
  locality_id              uuid,
  society_id               uuid,
  building_name            text check (char_length(building_name) <= 200),
  landmark                 text check (char_length(landmark) <= 200),
  address_line             text check (char_length(address_line) <= 500),
  pin_code                 text check (pin_code ~ '^\d{6}$'),
  latitude                 numeric(10,7),
  longitude                numeric(10,7),
  map_visibility           text not null default 'hidden'
                             check (map_visibility in ('hidden', 'approximate', 'exact')),

  -- City text (for phase 04 before location hierarchy)
  city_text                text check (char_length(city_text) <= 100),
  locality_text            text check (char_length(locality_text) <= 100),

  -- Contact privacy
  contact_visibility       text not null default 'show_after_login'
                             check (contact_visibility in (
                               'hidden', 'show_after_login', 'show_after_approval',
                               'show_to_verified_users', 'public'
                             )),

  -- Media (metadata only — storage in Prompt 10/12)
  cover_media_id           uuid,
  media_count              smallint not null default 0,
  media_status             text not null default 'no_media'
                             check (media_status in (
                               'no_media', 'pending_upload', 'uploaded', 'processing', 'ready'
                             )),

  -- Workflow statuses
  status                   text not null default 'draft'
                             check (status in (
                               'draft', 'submitted', 'under_review', 'need_changes',
                               'approved', 'published', 'rejected', 'paused',
                               'expired', 'deleted', 'archived'
                             )),
  approval_status          text not null default 'draft'
                             check (approval_status in (
                               'draft', 'pending', 'under_review',
                               'need_changes', 'approved', 'rejected'
                             )),
  visibility_status        text not null default 'private'
                             check (visibility_status in (
                               'private', 'public', 'hidden', 'paused', 'expired', 'deleted'
                             )),

  -- Moderation
  admin_review_note        text,
  rejection_reason         text,
  need_changes_reason      text,
  reviewed_by_staff_id     uuid,

  -- Timestamps
  submitted_at             timestamptz,
  approved_at              timestamptz,
  published_at             timestamptz,
  paused_at                timestamptz,
  expires_at               timestamptz,
  deleted_at               timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create trigger properties_updated_at
  before update on public.properties
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: projects
-- Builder-only project listings
-- ============================================================

create table if not exists public.projects (
  id                       uuid primary key default gen_random_uuid(),

  -- Ownership (builder only)
  builder_profile_id       uuid not null references public.profiles(id) on delete restrict,
  created_by_profile_id    uuid not null references public.profiles(id) on delete restrict,

  -- Identity
  project_name             text not null check (char_length(project_name) between 3 and 200),
  slug                     text unique,
  short_description        text check (char_length(short_description) <= 300),
  description              text check (char_length(description) <= 10000),

  -- Classification
  project_type             text not null check (project_type in (
                             'apartment_project', 'villa_project', 'plotting_project',
                             'commercial_project', 'industrial_project', 'township_project',
                             'mixed_use_project', 'society_project', 'industrial_zone_project'
                           )),
  category                 text not null check (category in (
                             'residential', 'commercial', 'industrial', 'land_plot',
                             'township', 'mixed_use', 'society', 'industrial_zone'
                           )),
  purpose                  text not null check (purpose in ('sell', 'rent', 'lease')),

  -- Pricing
  price_min                numeric(14,2),
  price_max                numeric(14,2),
  price_visible            boolean not null default true,

  -- Scale
  total_area_value         numeric(12,4),
  total_area_unit          text check (total_area_unit in (
                             'sq_ft', 'sq_m', 'sq_yd', 'acre', 'bigha', 'guntha', 'hectare'
                           )),
  total_towers             smallint,
  total_wings              smallint,
  total_floors             smallint,
  total_units              integer,
  available_units          integer,
  unit_configurations      jsonb not null default '[]'::jsonb,

  -- Timeline
  construction_status      text check (construction_status in (
                             'pre_launch', 'under_construction', 'nearing_possession',
                             'ready_to_move', 'completed'
                           )),
  possession_date          date,
  launch_date              date,
  phase_name               text check (char_length(phase_name) <= 100),

  -- RERA
  rera_registered          boolean not null default false,
  rera_number              text check (char_length(rera_number) <= 100),
  rera_status              text check (rera_status in (
                             'not_registered', 'applied', 'registered', 'expired', 'cancelled'
                           )),
  rera_valid_until         date,
  rera_disclaimer_required boolean not null default true,

  -- Amenities
  amenities                jsonb not null default '[]'::jsonb,
  specifications           jsonb not null default '{}'::jsonb,

  -- Location (FK foundation)
  country_id               uuid,
  state_id                 uuid,
  district_id              uuid,
  taluka_id                uuid,
  city_id                  uuid,
  village_id               uuid,
  area_id                  uuid,
  locality_id              uuid,
  society_id               uuid,
  landmark                 text check (char_length(landmark) <= 200),
  address_line             text check (char_length(address_line) <= 500),
  pin_code                 text check (pin_code ~ '^\d{6}$'),
  latitude                 numeric(10,7),
  longitude                numeric(10,7),
  map_visibility           text not null default 'approximate'
                             check (map_visibility in ('hidden', 'approximate', 'exact')),

  -- City text (for phase 04)
  city_text                text check (char_length(city_text) <= 100),
  locality_text            text check (char_length(locality_text) <= 100),

  -- Media (metadata only)
  cover_media_id           uuid,
  video_media_id           uuid,
  brochure_media_id        uuid,
  floor_plan_media_ids     jsonb not null default '[]'::jsonb,
  virtual_tour_url         text,
  media_count              smallint not null default 0,

  -- Workflow statuses
  status                   text not null default 'draft'
                             check (status in (
                               'draft', 'submitted', 'under_review', 'need_changes',
                               'approved', 'published', 'rejected', 'paused',
                               'expired', 'deleted', 'archived'
                             )),
  approval_status          text not null default 'draft'
                             check (approval_status in (
                               'draft', 'pending', 'under_review',
                               'need_changes', 'approved', 'rejected'
                             )),
  visibility_status        text not null default 'private'
                             check (visibility_status in (
                               'private', 'public', 'hidden', 'paused', 'expired', 'deleted'
                             )),

  -- Moderation
  admin_review_note        text,
  rejection_reason         text,
  need_changes_reason      text,
  reviewed_by_staff_id     uuid,

  -- Timestamps
  submitted_at             timestamptz,
  approved_at              timestamptz,
  published_at             timestamptz,
  paused_at                timestamptz,
  expires_at               timestamptz,
  deleted_at               timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create trigger projects_updated_at
  before update on public.projects
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: project_units
-- Unit inventory foundation (builder-owned via project)
-- ============================================================

create table if not exists public.project_units (
  id                       uuid primary key default gen_random_uuid(),
  project_id               uuid not null references public.projects(id) on delete cascade,

  wing_name                text check (char_length(wing_name) <= 50),
  tower_name               text check (char_length(tower_name) <= 50),
  floor_number             smallint,
  unit_number              text check (char_length(unit_number) <= 50),
  unit_type                text check (char_length(unit_type) <= 50),
  bhk                      smallint,
  area_value               numeric(12,4),
  area_unit                text check (area_unit in (
                             'sq_ft', 'sq_m', 'sq_yd', 'acre', 'bigha', 'guntha', 'hectare'
                           )),
  carpet_area              numeric(12,4),
  built_up_area            numeric(12,4),
  price                    numeric(14,2),
  price_visible            boolean not null default true,
  availability_status      text not null default 'available'
                             check (availability_status in (
                               'available', 'booked', 'sold', 'on_hold',
                               'not_released', 'hidden'
                             )),
  floor_plan_media_id      uuid,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create trigger project_units_updated_at
  before update on public.project_units
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: requirements
-- Buyer/renter/lessee requirement listings
-- Owner and Broker only. Builder cannot post.
-- ============================================================

create table if not exists public.requirements (
  id                       uuid primary key default gen_random_uuid(),

  -- Ownership
  created_by_profile_id    uuid not null references public.profiles(id) on delete restrict,
  public_role              text not null check (public_role in ('owner', 'broker')),

  -- Identity
  title                    text not null check (char_length(title) between 5 and 200),
  slug                     text unique,
  description              text check (char_length(description) <= 3000),

  -- Classification
  purpose                  text not null check (purpose in (
                             'buy', 'rent', 'lease', 'pg', 'business_buy'
                           )),
  category                 text not null check (category in (
                             'residential', 'commercial', 'industrial', 'land_plot',
                             'pg_hostel_room', 'business', 'project'
                           )),
  requirement_type         text,

  -- Budget
  budget_min               numeric(14,2),
  budget_max               numeric(14,2),
  rent_min                 numeric(14,2),
  rent_max                 numeric(14,2),

  -- Area preferences
  area_min                 numeric(12,4),
  area_max                 numeric(12,4),
  area_unit                text check (area_unit in (
                             'sq_ft', 'sq_m', 'sq_yd', 'acre', 'bigha', 'guntha', 'hectare'
                           )),

  -- Property preferences
  bedrooms_min             smallint,
  bedrooms_max             smallint,
  preferred_floor          text check (char_length(preferred_floor) <= 100),
  furnishing_preference    text check (furnishing_preference in (
                             'any', 'unfurnished', 'semi_furnished', 'fully_furnished'
                           )),
  possession_timeline      text check (possession_timeline in (
                             'immediately', 'within_1_month', '1_to_3_months',
                             '3_to_6_months', '6_to_12_months', 'above_1_year', 'flexible'
                           )),
  preferred_amenities      jsonb not null default '[]'::jsonb,

  -- Location preferences
  country_id               uuid,
  state_id                 uuid,
  district_id              uuid,
  taluka_id                uuid,
  city_id                  uuid,
  village_id               uuid,
  area_id                  uuid,
  locality_id              uuid,
  preferred_locations      jsonb not null default '[]'::jsonb,

  -- City/locality text (for phase 04)
  city_text                text check (char_length(city_text) <= 100),
  preferred_localities_text text check (char_length(preferred_localities_text) <= 500),

  -- Contact privacy
  contact_visibility       text not null default 'show_after_login'
                             check (contact_visibility in (
                               'hidden', 'show_after_login', 'show_after_approval',
                               'show_to_verified_users', 'public'
                             )),

  -- Workflow statuses
  status                   text not null default 'draft'
                             check (status in (
                               'draft', 'submitted', 'under_review', 'need_changes',
                               'approved', 'published', 'rejected', 'paused',
                               'expired', 'deleted', 'archived'
                             )),
  approval_status          text not null default 'draft'
                             check (approval_status in (
                               'draft', 'pending', 'under_review',
                               'need_changes', 'approved', 'rejected'
                             )),
  visibility_status        text not null default 'private'
                             check (visibility_status in (
                               'private', 'public', 'hidden', 'paused', 'expired', 'deleted'
                             )),

  -- Moderation
  admin_review_note        text,
  rejection_reason         text,
  need_changes_reason      text,
  reviewed_by_staff_id     uuid,

  -- Timestamps
  submitted_at             timestamptz,
  approved_at              timestamptz,
  published_at             timestamptz,
  paused_at                timestamptz,
  expires_at               timestamptz,
  deleted_at               timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create trigger requirements_updated_at
  before update on public.requirements
  for each row execute function mgp_set_updated_at();

-- ============================================================
-- TABLE: entity_status_events
-- Audit log of status changes on entities
-- Private — no public access
-- ============================================================

create table if not exists public.entity_status_events (
  id               uuid primary key default gen_random_uuid(),
  entity_type      text not null check (entity_type in ('property', 'project', 'requirement')),
  entity_id        uuid not null,
  from_status      text,
  to_status        text not null,
  changed_by       uuid references public.profiles(id),
  changed_by_staff uuid,
  note             text,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- TABLE: entity_moderation_notes
-- Admin/staff moderation notes — strictly private
-- ============================================================

create table if not exists public.entity_moderation_notes (
  id               uuid primary key default gen_random_uuid(),
  entity_type      text not null check (entity_type in ('property', 'project', 'requirement')),
  entity_id        uuid not null,
  staff_id         uuid,
  note             text not null,
  action_taken     text,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- INDEXES: Properties
-- ============================================================

create index if not exists idx_properties_owner_profile_id on public.properties(owner_profile_id);
create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_approval_status on public.properties(approval_status);
create index if not exists idx_properties_visibility_status on public.properties(visibility_status);
create index if not exists idx_properties_purpose on public.properties(purpose);
create index if not exists idx_properties_category on public.properties(category);
create index if not exists idx_properties_property_type on public.properties(property_type);
create index if not exists idx_properties_city_id on public.properties(city_id);
create index if not exists idx_properties_locality_id on public.properties(locality_id);
create index if not exists idx_properties_price on public.properties(price);
create index if not exists idx_properties_rent_amount on public.properties(rent_amount);
create index if not exists idx_properties_published_at on public.properties(published_at);
create index if not exists idx_properties_slug on public.properties(slug);
create index if not exists idx_properties_deleted_at on public.properties(deleted_at) where deleted_at is null;

-- ============================================================
-- INDEXES: Projects
-- ============================================================

create index if not exists idx_projects_builder_profile_id on public.projects(builder_profile_id);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_approval_status on public.projects(approval_status);
create index if not exists idx_projects_visibility_status on public.projects(visibility_status);
create index if not exists idx_projects_purpose on public.projects(purpose);
create index if not exists idx_projects_category on public.projects(category);
create index if not exists idx_projects_project_type on public.projects(project_type);
create index if not exists idx_projects_city_id on public.projects(city_id);
create index if not exists idx_projects_rera_status on public.projects(rera_status);
create index if not exists idx_projects_possession_date on public.projects(possession_date);
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_deleted_at on public.projects(deleted_at) where deleted_at is null;

-- ============================================================
-- INDEXES: Requirements
-- ============================================================

create index if not exists idx_requirements_created_by_profile_id on public.requirements(created_by_profile_id);
create index if not exists idx_requirements_status on public.requirements(status);
create index if not exists idx_requirements_approval_status on public.requirements(approval_status);
create index if not exists idx_requirements_purpose on public.requirements(purpose);
create index if not exists idx_requirements_category on public.requirements(category);
create index if not exists idx_requirements_city_id on public.requirements(city_id);
create index if not exists idx_requirements_budget_min on public.requirements(budget_min);
create index if not exists idx_requirements_budget_max on public.requirements(budget_max);
create index if not exists idx_requirements_created_at on public.requirements(created_at);

-- ============================================================
-- INDEXES: Project Units
-- ============================================================

create index if not exists idx_project_units_project_id on public.project_units(project_id);
create index if not exists idx_project_units_availability_status on public.project_units(availability_status);

-- ============================================================
-- INDEXES: Entity Events
-- ============================================================

create index if not exists idx_entity_status_events_entity on public.entity_status_events(entity_type, entity_id);

-- ============================================================
-- RLS: Enable on all tables
-- ============================================================

alter table public.properties enable row level security;
alter table public.projects enable row level security;
alter table public.project_units enable row level security;
alter table public.requirements enable row level security;
alter table public.entity_status_events enable row level security;
alter table public.entity_moderation_notes enable row level security;

-- ============================================================
-- HELPER: get calling user's profile
-- ============================================================

create or replace function mgp_get_my_profile_id()
returns uuid
language sql
stable
as $$
  select id from public.profiles
  where auth_user_id = auth.uid()
    and account_status = 'active'
    and deleted_at is null
  limit 1;
$$;

create or replace function mgp_get_my_public_role()
returns text
language sql
stable
as $$
  select public_role from public.profiles
  where auth_user_id = auth.uid()
    and account_status = 'active'
    and deleted_at is null
  limit 1;
$$;

-- ============================================================
-- RLS POLICIES: properties
-- ============================================================

-- Public read: only published + approved + not deleted
create policy "properties_public_read"
  on public.properties
  for select
  using (
    visibility_status = 'public'
    and approval_status = 'approved'
    and deleted_at is null
    and status = 'published'
  );

-- Owner read: own rows
create policy "properties_owner_read"
  on public.properties
  for select
  using (
    owner_profile_id = mgp_get_my_profile_id()
  );

-- Owner/Broker insert only — Builder BLOCKED by check on public_role
create policy "properties_owner_broker_insert"
  on public.properties
  for insert
  with check (
    mgp_get_my_public_role() in ('owner', 'broker')
    and owner_profile_id = mgp_get_my_profile_id()
    and created_by_profile_id = mgp_get_my_profile_id()
    and public_role = mgp_get_my_public_role()
    -- Cannot insert as approved/published — must go through admin
    and approval_status = 'draft'
    and status = 'draft'
    and visibility_status = 'private'
  );

-- Update own rows — cannot self-approve
create policy "properties_owner_update"
  on public.properties
  for update
  using (
    owner_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    -- User cannot change approval fields
    approval_status in ('draft', 'pending')
    and visibility_status in ('private', 'paused')
    -- User cannot self-publish
    and status not in ('approved', 'published', 'under_review', 'rejected')
  );

-- Soft delete own rows
create policy "properties_owner_soft_delete"
  on public.properties
  for update
  using (
    owner_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  );

-- ============================================================
-- RLS POLICIES: projects
-- ============================================================

-- Public read: only published + approved + not deleted
create policy "projects_public_read"
  on public.projects
  for select
  using (
    visibility_status = 'public'
    and approval_status = 'approved'
    and deleted_at is null
    and status = 'published'
  );

-- Builder read: own rows
create policy "projects_builder_read"
  on public.projects
  for select
  using (
    builder_profile_id = mgp_get_my_profile_id()
  );

-- Builder-only insert
create policy "projects_builder_insert"
  on public.projects
  for insert
  with check (
    mgp_get_my_public_role() = 'builder'
    and builder_profile_id = mgp_get_my_profile_id()
    and created_by_profile_id = mgp_get_my_profile_id()
    and approval_status = 'draft'
    and status = 'draft'
    and visibility_status = 'private'
  );

-- Update own rows
create policy "projects_builder_update"
  on public.projects
  for update
  using (
    builder_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    approval_status in ('draft', 'pending')
    and visibility_status in ('private', 'paused')
    and status not in ('approved', 'published', 'under_review', 'rejected')
  );

-- ============================================================
-- RLS POLICIES: project_units
-- ============================================================

-- Builder read own project units
create policy "project_units_builder_read"
  on public.project_units
  for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- Public read only for published project units
create policy "project_units_public_read"
  on public.project_units
  for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.visibility_status = 'public'
        and p.approval_status = 'approved'
        and p.status = 'published'
        and p.deleted_at is null
    )
    and availability_status not in ('hidden', 'not_released')
  );

-- Builder insert units for own projects
create policy "project_units_builder_insert"
  on public.project_units
  for insert
  with check (
    mgp_get_my_public_role() = 'builder'
    and exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- Builder update own project units
create policy "project_units_builder_update"
  on public.project_units
  for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and p.builder_profile_id = mgp_get_my_profile_id()
    )
  );

-- ============================================================
-- RLS POLICIES: requirements
-- ============================================================

-- Owner/broker read own requirements
create policy "requirements_owner_read"
  on public.requirements
  for select
  using (
    created_by_profile_id = mgp_get_my_profile_id()
  );

-- Public read: published + approved + not deleted
create policy "requirements_public_read"
  on public.requirements
  for select
  using (
    visibility_status = 'public'
    and approval_status = 'approved'
    and deleted_at is null
    and status = 'published'
  );

-- Owner/Broker insert — Builder BLOCKED
create policy "requirements_owner_broker_insert"
  on public.requirements
  for insert
  with check (
    mgp_get_my_public_role() in ('owner', 'broker')
    and created_by_profile_id = mgp_get_my_profile_id()
    and public_role = mgp_get_my_public_role()
    and approval_status = 'draft'
    and status = 'draft'
    and visibility_status = 'private'
  );

-- Update own rows
create policy "requirements_owner_update"
  on public.requirements
  for update
  using (
    created_by_profile_id = mgp_get_my_profile_id()
    and deleted_at is null
  )
  with check (
    approval_status in ('draft', 'pending')
    and visibility_status in ('private', 'paused')
    and status not in ('approved', 'published', 'under_review', 'rejected')
  );

-- ============================================================
-- RLS POLICIES: entity_status_events
-- Private — only service role and own events
-- ============================================================

create policy "entity_status_events_private"
  on public.entity_status_events
  for select
  using (false);

-- ============================================================
-- RLS POLICIES: entity_moderation_notes
-- Strictly private — only service role
-- ============================================================

create policy "entity_moderation_notes_private"
  on public.entity_moderation_notes
  for select
  using (false);

-- ============================================================
-- VIEWS: Public-safe views
-- Only published + approved + not deleted rows
-- Exclude: contact, admin notes, rejection reasons, private addresses
-- ============================================================

create or replace view public.public_properties_view as
  select
    p.id,
    p.title,
    p.slug,
    p.purpose,
    p.category,
    p.property_type,
    p.price,
    p.rent_amount,
    p.deposit_amount,
    p.price_negotiable,
    p.area_value,
    p.area_unit,
    p.built_up_area,
    p.carpet_area,
    p.plot_area,
    p.bedrooms,
    p.bathrooms,
    p.balconies,
    p.floor_number,
    p.total_floors,
    p.furnishing_status,
    p.property_age,
    p.possession_status,
    p.available_from,
    p.facing,
    p.parking,
    p.amenities,
    p.city_id,
    p.locality_id,
    p.society_id,
    p.building_name,
    p.landmark,
    p.city_text,
    p.locality_text,
    p.pin_code,
    -- Approximate location only if map_visibility allows
    case when p.map_visibility = 'exact' then p.latitude else null end as latitude,
    case when p.map_visibility = 'exact' then p.longitude else null end as longitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.latitude::numeric, 2) else null end as approx_latitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.longitude::numeric, 2) else null end as approx_longitude,
    p.cover_media_id,
    p.media_count,
    p.contact_visibility,
    p.status,
    p.visibility_status,
    p.published_at,
    p.expires_at,
    p.created_at,
    p.updated_at,
    -- Owner public role (safe)
    p.public_role as poster_role,
    p.owner_profile_id
    -- EXCLUDED: admin_review_note, rejection_reason, need_changes_reason,
    --           address_line (full), mobile, email, exact private location
  from public.properties p
  where p.visibility_status = 'public'
    and p.approval_status = 'approved'
    and p.status = 'published'
    and p.deleted_at is null;

create or replace view public.public_projects_view as
  select
    p.id,
    p.project_name,
    p.slug,
    p.short_description,
    p.project_type,
    p.category,
    p.purpose,
    p.price_min,
    p.price_max,
    p.price_visible,
    p.total_area_value,
    p.total_area_unit,
    p.total_towers,
    p.total_wings,
    p.total_floors,
    p.total_units,
    p.available_units,
    p.unit_configurations,
    p.construction_status,
    p.possession_date,
    p.launch_date,
    p.phase_name,
    p.rera_registered,
    p.rera_number,
    p.rera_status,
    p.rera_disclaimer_required,
    p.amenities,
    p.city_id,
    p.locality_id,
    p.landmark,
    p.city_text,
    p.locality_text,
    p.pin_code,
    case when p.map_visibility = 'exact' then p.latitude else null end as latitude,
    case when p.map_visibility = 'exact' then p.longitude else null end as longitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.latitude::numeric, 2) else null end as approx_latitude,
    case when p.map_visibility in ('approximate', 'exact') then round(p.longitude::numeric, 2) else null end as approx_longitude,
    p.cover_media_id,
    p.media_count,
    p.virtual_tour_url,
    p.status,
    p.visibility_status,
    p.published_at,
    p.builder_profile_id
    -- EXCLUDED: admin_review_note, rejection_reason, brochure_media_id (private),
    --           floor_plan_media_ids if private, exact private location
  from public.projects p
  where p.visibility_status = 'public'
    and p.approval_status = 'approved'
    and p.status = 'published'
    and p.deleted_at is null;

-- Requirements: scoped view — contact still protected
create or replace view public.public_requirements_view as
  select
    r.id,
    r.title,
    r.slug,
    r.purpose,
    r.category,
    r.requirement_type,
    -- Budget ranges only (not exact if they want privacy)
    r.budget_min,
    r.budget_max,
    r.rent_min,
    r.rent_max,
    r.area_min,
    r.area_max,
    r.area_unit,
    r.bedrooms_min,
    r.bedrooms_max,
    r.furnishing_preference,
    r.possession_timeline,
    r.preferred_amenities,
    r.city_id,
    r.locality_id,
    r.city_text,
    r.preferred_localities_text,
    r.contact_visibility,
    r.status,
    r.published_at,
    r.created_at,
    r.public_role as poster_role,
    r.created_by_profile_id
    -- EXCLUDED: description (may contain contact), exact preferred_locations JSON,
    --           admin notes, rejection reasons
  from public.requirements r
  where r.visibility_status = 'public'
    and r.approval_status = 'approved'
    and r.status = 'published'
    and r.deleted_at is null;

-- ============================================================
-- SLUG GENERATION HELPER
-- ============================================================

create or replace function mgp_slugify(input text)
returns text
language sql
immutable
as $$
  select lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(trim(input), '[^a-zA-Z0-9\s\-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
$$;

-- ============================================================
-- FUNCTION: Generate unique property slug
-- ============================================================

create or replace function mgp_generate_property_slug(p_title text, p_id uuid)
returns text
language plpgsql
as $$
declare
  base_slug text;
  candidate text;
  suffix    int := 0;
begin
  base_slug := mgp_slugify(p_title);
  candidate := base_slug || '-' || substring(p_id::text, 1, 8);
  return candidate;
end;
$$;

create or replace function mgp_generate_project_slug(p_name text, p_id uuid)
returns text
language plpgsql
as $$
declare
  base_slug text;
  candidate text;
begin
  base_slug := mgp_slugify(p_name);
  candidate := base_slug || '-' || substring(p_id::text, 1, 8);
  return candidate;
end;
$$;

create or replace function mgp_generate_requirement_slug(p_title text, p_id uuid)
returns text
language plpgsql
as $$
declare
  base_slug text;
  candidate text;
begin
  base_slug := mgp_slugify(p_title);
  candidate := base_slug || '-' || substring(p_id::text, 1, 8);
  return candidate;
end;
$$;

-- ============================================================
-- TRIGGER: Auto-set slug on insert (if null)
-- ============================================================

create or replace function mgp_auto_property_slug()
returns trigger
language plpgsql
as $$
begin
  if new.slug is null then
    new.slug := mgp_generate_property_slug(new.title, new.id);
  end if;
  return new;
end;
$$;

create trigger properties_auto_slug
  before insert on public.properties
  for each row execute function mgp_auto_property_slug();

create or replace function mgp_auto_project_slug()
returns trigger
language plpgsql
as $$
begin
  if new.slug is null then
    new.slug := mgp_generate_project_slug(new.project_name, new.id);
  end if;
  return new;
end;
$$;

create trigger projects_auto_slug
  before insert on public.projects
  for each row execute function mgp_auto_project_slug();

create or replace function mgp_auto_requirement_slug()
returns trigger
language plpgsql
as $$
begin
  if new.slug is null then
    new.slug := mgp_generate_requirement_slug(new.title, new.id);
  end if;
  return new;
end;
$$;

create trigger requirements_auto_slug
  before insert on public.requirements
  for each row execute function mgp_auto_requirement_slug();

-- ============================================================
-- ROLLBACK (commented — run manually if needed)
-- ============================================================

-- drop view if exists public.public_requirements_view;
-- drop view if exists public.public_projects_view;
-- drop view if exists public.public_properties_view;
-- drop table if exists public.entity_moderation_notes;
-- drop table if exists public.entity_status_events;
-- drop table if exists public.requirements;
-- drop table if exists public.project_units;
-- drop table if exists public.projects;
-- drop table if exists public.properties;
-- drop function if exists mgp_auto_requirement_slug();
-- drop function if exists mgp_auto_project_slug();
-- drop function if exists mgp_auto_property_slug();
-- drop function if exists mgp_generate_requirement_slug(text, uuid);
-- drop function if exists mgp_generate_project_slug(text, uuid);
-- drop function if exists mgp_generate_property_slug(text, uuid);
-- drop function if exists mgp_slugify(text);
-- drop function if exists mgp_get_my_public_role();
-- drop function if exists mgp_get_my_profile_id();
