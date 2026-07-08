# docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md

# My Gujarat Property — Architecture, Tech Stack, Database, Supabase, RLS And System Design

This document defines the technical architecture for **My Gujarat Property**.

It covers the recommended tech stack, app architecture, route architecture, database design, Supabase Auth, PostgreSQL schema planning, RLS strategy, storage strategy, provider boundaries, migrations, caching, performance, security, deployment and verification expectations.

Claude must read this file before implementing project setup, auth, database, RLS, providers, dashboards, search, payments, uploads, admin modules or production deployment.

---

## 1. Purpose

This document exists to make sure the project is built on a clear, secure, scalable and maintainable architecture.

It defines:

* frontend framework
* backend/server architecture
* database provider
* auth provider
* RLS strategy
* role-based access design
* admin/staff permission model
* database tables and relationships
* migration rules
* storage buckets
* provider integrations
* server/client boundaries
* validation strategy
* caching strategy
* indexing strategy
* performance strategy
* deployment architecture
* rollback architecture
* security boundaries
* logging/audit architecture
* testing and verification expectations

This file is not a code implementation file, but it is a mandatory architecture guide for implementation prompts.

---

## 2. Architecture Goals

The architecture must support:

* Gujarat-focused real estate marketplace
* mobile-first public website
* role-aware dashboards
* secure auth
* strict RLS
* public/private data separation
* owner/broker/builder workflows
* Super Admin/admin/staff workflows
* property/project/requirement systems
* leads/CRM/proposals/messages
* subscription/payment/GST system
* ads/promotions
* notification system
* SEO/CMS/legal pages
* media upload/storage/CDN
* scalable search
* scalable admin queues
* provider setup-required states
* deployment/rollback safety
* 1 lakh live users target
* future growth without rebuilding core architecture

The architecture must avoid shortcuts that create future security, data or performance problems.

---

## 3. Recommended Tech Stack

## 3.1 Frontend Framework

Recommended:

* **Next.js 15**
* **React 19**
* **TypeScript**
* **App Router**
* **Server Components**
* **Server Actions**
* **Route Handlers**
* **Suspense/loading boundaries**
* **Error boundaries**
* **typed server action responses**

Reasons:

* SEO-friendly public pages
* server-rendered public content
* secure server-side data access
* role-aware layouts
* scalable route structure
* modern caching/revalidation
* good deployment ecosystem

---

## 3.2 Styling And UI

Recommended:

* Tailwind CSS
* CSS variables/design tokens
* role-aware layout components
* responsive utility classes
* mobile-first components
* accessible headless primitives where needed
* icon library with tree-shaking
* custom components for marketplace cards/forms/modals/bottom sheets

UI must follow:

* premium Apple-style clean design
* white-first layout
* light borders
* soft shadows
* real estate marketplace feel
* no copied templates
* no horizontal scroll
* no overlap
* no critical text wrapping
* dashboard tables to cards on mobile

---

## 3.3 Backend / Server Layer

Use Next.js server-side capabilities:

* Server Components for public read pages where safe
* Server Actions for mutations
* Route Handlers for webhooks and provider callbacks
* server-only utilities for secure operations
* typed validation and typed responses
* middleware for route-level auth where useful
* Supabase server client for DB/Auth
* service role only in trusted server code

Backend rules:

* all sensitive actions must be server-authorized
* frontend-only checks are not enough
* RLS must protect data even if API route has bug
* provider secrets must be server-only
* payment/webhook verification must happen server-side

---

## 3.4 Database

Recommended:

* Supabase PostgreSQL
* Supabase Auth
* Supabase RLS
* SQL migrations
* PostgreSQL indexes
* PostgreSQL functions/triggers only where justified
* public-safe views for public pages
* audit log tables
* provider/event log tables
* soft delete fields
* status enums/check constraints where useful

Database must be designed for:

* role-based access
* public/private separation
* search/filter performance
* admin queue performance
* leads/CRM scaling
* payment idempotency
* notification delivery tracking
* media metadata tracking
* audit history

---

## 3.5 Authentication

Recommended:

* Supabase Auth

Public users:

* mobile OTP login/register
* roles:

  * Owner
  * Broker/Agent
  * Builder/Developer

Admin/staff users:

* separate login
* email/Google only
* invite-only
* no public mobile OTP
* no public create account
* noindex routes

OTP provider:

* setup-required until configured
* no fake OTP sent
* rate limits required

---

## 3.6 Storage

Recommended:

* Cloudflare R2 for media storage
* Cloudflare CDN for public media
* private bucket for sensitive/private files
* public bucket for approved public media
* signed URLs for private documents
* media metadata in database
* media variants where configured
* image optimization pipeline where configured

Storage provider remains `SETUP_REQUIRED` until configured.

No fake upload success.

---

## 3.7 Payments

Recommended:

* Razorpay
* server-side order creation
* verified webhook
* idempotency
* invoice generation after verified success only
* payment logs
* billing records
* GST-ready invoice system

Payment provider remains `SETUP_REQUIRED` until configured.

No fake payment success.

---

## 3.8 External Providers

Provider areas:

* OTP
* SMS
* email
* WhatsApp free link
* WhatsApp Business API
* Razorpay
* Google Maps Embed/API
* Cloudflare R2
* Cloudflare CDN
* Cloudflare Turnstile
* analytics
* error tracking
* monitoring
* cron/background jobs
* media processing
* file scanning
* PDF generation
* GeoIP
* web push
* Search Console

Provider rules:

* real providers only when configured and tested
* missing providers show setup-required/fallback
* no fake sent/paid/uploaded/delivered/active provider state
* `.env.example` updated for env variables
* secrets never exposed

---

## 4. High-Level System Architecture

The system should be layered like this:

```txt id="architecture-layers"
Browser / Mobile Web
        ↓
Next.js App Router UI
        ↓
Server Components / Client Components
        ↓
Server Actions / Route Handlers / Middleware
        ↓
Validation / Authorization / Rate Limits
        ↓
Supabase Server Client / Provider Adapters
        ↓
PostgreSQL + RLS / Storage / External Providers
        ↓
Audit Logs / Notifications / Background Jobs / Monitoring
```

Key rule:

* UI should improve experience.
* Server actions enforce rules.
* RLS protects data.
* Audit logs record sensitive actions.
* Providers are real or setup-required.
* Manual verification confirms behavior.

---

## 5. App Folder Architecture

Recommended structure:

```txt id="folder-structure"
app/
  (public)/
    page.tsx
    search/
    properties/
    projects/
    profiles/
    blog/
    help/
    legal/
  (auth)/
    login/
    register/
  (dashboard)/
    owner/
    broker/
    builder/
  (admin)/
    admin/
    staff/
  api/
    webhooks/
    providers/
    cron/
components/
  ui/
  layout/
  public/
  auth/
  dashboard/
  admin/
  forms/
  media/
  search/
  billing/
  notifications/
lib/
  supabase/
  auth/
  db/
  rls/
  permissions/
  validation/
  providers/
  payments/
  media/
  notifications/
  seo/
  security/
  performance/
  utils/
server/
  actions/
  queries/
  services/
  jobs/
  webhooks/
types/
  database/
  domain/
  api/
  roles/
  providers/
  billing/
supabase/
  migrations/
  seed/
docs/
prompts/
```

Actual implementation can adjust names, but separation must remain clear.

---

## 6. Route Architecture

## 6.1 Public Routes

Public routes may include:

```txt id="public-routes"
/
 /search
 /property/[slug]
 /project/[slug]
 /profile/[slug]
 /broker/[slug]
 /builder/[slug]
 /city/[citySlug]
 /city/[citySlug]/[typeSlug]
 /locality/[citySlug]/[localitySlug]
 /blog
 /blog/[slug]
 /help
 /support
 /contact
 /about
 /pricing
 /terms
 /privacy
 /cookie-policy
 /refund-policy
 /cancellation-policy
 /listing-policy
 /advertising-policy
 /verification-policy
 /payment-policy
 /disclaimer
 /grievance
```

Public route rules:

* no private data
* no hidden contact leak
* approved public content only
* SEO-safe
* cache-safe
* no fake counts
* no admin links exposed publicly
* login/register popup for protected actions

---

## 6.2 Public Auth Routes / Components

Auth may be popup-based with routes for fallback.

Possible routes:

```txt id="auth-routes"
 /login
 /register
 /auth/callback
 /auth/verify
```

Rules:

* public user auth is mobile OTP
* registration roles only Owner/Broker/Builder
* no admin/staff public registration
* missing OTP provider shows setup-required
* OTP not logged
* original action redirect preserved

---

## 6.3 Dashboard Routes

Owner dashboard:

```txt id="owner-dashboard-routes"
 /dashboard/owner
 /dashboard/owner/profile
 /dashboard/owner/properties
 /dashboard/owner/requirements
 /dashboard/owner/leads
 /dashboard/owner/messages
 /dashboard/owner/site-visits
 /dashboard/owner/saved
 /dashboard/owner/analytics
 /dashboard/owner/billing
 /dashboard/owner/verification
 /dashboard/owner/notifications
 /dashboard/owner/support
 /dashboard/owner/settings
```

Broker dashboard:

```txt id="broker-dashboard-routes"
 /dashboard/broker
 /dashboard/broker/profile
 /dashboard/broker/properties
 /dashboard/broker/requirements
 /dashboard/broker/requirement-feed
 /dashboard/broker/proposals
 /dashboard/broker/leads
 /dashboard/broker/crm
 /dashboard/broker/messages
 /dashboard/broker/site-visits
 /dashboard/broker/analytics
 /dashboard/broker/billing
 /dashboard/broker/verification
 /dashboard/broker/notifications
 /dashboard/broker/support
 /dashboard/broker/settings
```

Builder dashboard:

```txt id="builder-dashboard-routes"
 /dashboard/builder
 /dashboard/builder/profile
 /dashboard/builder/projects
 /dashboard/builder/units
 /dashboard/builder/leads
 /dashboard/builder/requirements
 /dashboard/builder/agents
 /dashboard/builder/permissions
 /dashboard/builder/ads
 /dashboard/builder/analytics
 /dashboard/builder/billing
 /dashboard/builder/verification
 /dashboard/builder/notifications
 /dashboard/builder/support
 /dashboard/builder/settings
```

Dashboard route rules:

* require login
* require correct role
* direct URL bypass blocked
* RLS protects records
* no dashboard data globally cached
* footer hidden on dashboards/features
* mobile responsive
* module disabled/setup-required state when incomplete

---

## 6.4 Admin / Staff Routes

Possible route structure:

```txt id="admin-routes"
 /admin
 /admin/login
 /admin/dashboard
 /admin/users
 /admin/staff
 /admin/roles-permissions
 /admin/properties
 /admin/projects
 /admin/requirements
 /admin/leads
 /admin/verification
 /admin/reports
 /admin/support
 /admin/billing
 /admin/payments
 /admin/plans
 /admin/trials
 /admin/coupons
 /admin/ads
 /admin/notifications
 /admin/providers
 /admin/locations
 /admin/seo
 /admin/cms
 /admin/blog
 /admin/legal
 /admin/audit
 /admin/security
 /admin/system-health
 /admin/feature-flags
 /admin/maintenance
```

Admin route rules:

* separate auth
* noindex
* no public create account
* invite-only staff
* permission-scoped
* sensitive actions audited
* direct URL bypass blocked
* admin tables paginated
* mobile cards layout
* secrets never shown raw

---

## 7. Server / Client Boundary

## 7.1 Server-Only Code

Server-only code includes:

* Supabase service role usage
* provider secrets
* Razorpay secret
* webhook verification
* private document signed URL generation
* admin/staff permission checks
* RLS-sensitive queries
* payment order creation
* invoice generation
* provider status test calls
* cron jobs
* audit log writes
* security event writes
* private media operations
* data export/delete requests

Server-only code must not be imported into client components.

---

## 7.2 Client-Safe Code

Client components may handle:

* UI interaction
* popups
* drawers
* bottom sheets
* form state
* upload progress UI
* copy buttons
* galleries
* carousels
* maps display if provider configured
* theme toggle
* filter UI
* optimistic UI where safe
* local guest saved/recent state where allowed

Client code must not contain:

* service role key
* provider secrets
* hidden contact data before reveal
* private document URLs
* payment secret
* raw private user data
* admin private data
* staff secrets
* server-only functions

---

## 8. Data Access Pattern

Use layered data access.

Recommended:

```txt id="data-access-pattern"
UI Component
  ↓
Server Component / Server Action
  ↓
Validation
  ↓
Authorization / Permission Check
  ↓
Query Service / Mutation Service
  ↓
Supabase Client
  ↓
PostgreSQL + RLS
```

Rules:

* do not query database directly from random UI components without pattern
* use reusable query/service functions
* use typed returns
* separate public-safe queries from private queries
* separate admin queries from user queries
* validate inputs before DB access
* check auth/role/ownership before mutation
* rely on RLS as final protection

---

## 9. Validation Architecture

Validation must exist on server side.

Recommended:

* TypeScript types
* validation schemas
* safe parsing
* typed errors
* common validation utilities
* per-module validation files

Validate:

* mobile number
* email
* role
* name
* property type
* project type
* purpose
* price
* budget
* area
* location IDs
* address
* pin code
* RERA number
* GSTIN
* URLs
* iframe URLs
* uploaded files
* payment plan ID
* coupon code
* proposal data
* message data
* CMS slug/meta
* admin action reason
* provider setting values
* feature flag values

Client validation improves UX.

Server validation enforces safety.

---

## 10. Error Architecture

Use typed safe errors.

Allowed user-facing error types:

* `UNAUTHORIZED`
* `FORBIDDEN`
* `NOT_FOUND`
* `VALIDATION_ERROR`
* `RATE_LIMITED`
* `SETUP_REQUIRED`
* `PROVIDER_UNAVAILABLE`
* `PAYMENT_PENDING`
* `PAYMENT_FAILED`
* `PAYMENT_VERIFICATION_REQUIRED`
* `UPLOAD_FAILED`
* `APPROVAL_REQUIRED`
* `SUBSCRIPTION_REQUIRED`
* `VERIFICATION_REQUIRED`
* `FEATURE_DISABLED`
* `SERVER_ERROR`

Do not expose:

* SQL error
* stack trace
* provider secret
* raw payment payload
* raw webhook payload
* RLS internals
* internal file path
* private data existence
* service role details

---

## 11. Database Design Principles

Database must support marketplace complexity.

Principles:

1. Normalize core entities.
2. Use status fields for workflows.
3. Use audit logs for sensitive actions.
4. Use soft delete for important records.
5. Use indexes for frequent filters.
6. Use public-safe views for public pages.
7. Use RLS for sensitive tables.
8. Use enums/check constraints where useful.
9. Avoid storing secrets in database.
10. Store provider metadata, not secret values.
11. Keep payment states immutable/auditable.
12. Keep invoice numbering safe.
13. Keep private document metadata private.
14. Keep public media separate from private media.
15. Keep role permissions explicit.
16. Keep notification logs separate from notifications.
17. Keep admin notes internal.
18. Keep user-facing legal consent records.
19. Keep retention/soft-delete strategy clear.
20. Keep migrations reversible where possible.

---

## 12. Core Database Domains

The database should cover these domains:

1. auth/profile/roles
2. staff/admin permissions
3. location hierarchy
4. properties
5. projects
6. project units/inventory
7. requirements
8. matching/proposals
9. leads/CRM
10. messages
11. site visits
12. saved items/searches/recent views
13. verification/trust
14. media/storage
15. billing/subscriptions/plans
16. payments/webhooks/invoices/GST
17. ads/promotions
18. notifications/delivery logs
19. support/help tickets
20. reports/fraud
21. CMS/blog/legal/SEO
22. provider settings/status
23. feature flags/settings
24. audit logs/security events
25. analytics/events/aggregates
26. cron/jobs/dead letters
27. privacy/data requests
28. deployment/system health records where needed

---

## 13. Suggested Database Table Groups

Actual table names may change during implementation, but the architecture must cover these objects.

---

# 13A. Auth, Profiles And Roles

## 13A.1 `profiles`

Purpose:

* public user profile metadata
* owner/broker/builder common profile fields
* contact privacy settings
* verification status summary
* onboarding/profile completion

Possible fields:

* `id`
* `auth_user_id`
* `role`
* `full_name`
* `email`
* `mobile`
* `mobile_verified_at`
* `email_verified_at`
* `avatar_media_id`
* `status`
* `verification_status`
* `profile_completion_percent`
* `contact_visibility`
* `preferred_language`
* `theme_preference`
* `created_at`
* `updated_at`
* `deleted_at`

Security:

* user can read/update own private profile
* public view exposes only safe fields
* hidden contact not public
* admin/staff scoped access

---

## 13A.2 `owner_profiles`

Purpose:

* owner-specific fields
* owner privacy settings

Possible fields:

* `id`
* `profile_id`
* `display_name`
* `public_slug`
* `privacy_level`
* `created_at`
* `updated_at`

---

## 13A.3 `broker_profiles`

Purpose:

* broker/agent profile fields
* public broker page

Possible fields:

* `id`
* `profile_id`
* `agency_name`
* `license_or_registration`
* `office_address`
* `service_areas`
* `experience_years`
* `public_slug`
* `bio`
* `verification_status`
* `created_at`
* `updated_at`

---

## 13A.4 `builder_profiles`

Purpose:

* builder/developer business profile
* public builder microsite

Possible fields:

* `id`
* `profile_id`
* `company_name`
* `company_slug`
* `office_address`
* `company_logo_media_id`
* `website_url`
* `business_registration`
* `rera_developer_id`
* `verification_status`
* `created_at`
* `updated_at`

---

## 13A.5 `role_change_requests`

Purpose:

* user requested role change
* admin approval
* warning/impact tracking

Possible fields:

* `id`
* `profile_id`
* `from_role`
* `to_role`
* `reason`
* `status`
* `impact_summary`
* `reviewed_by`
* `reviewed_at`
* `review_note`
* `created_at`

Security:

* user can create/view own requests
* admin/staff can review with permission
* role changes require audit

---

# 13B. Staff, Admin And Permissions

## 13B.1 `staff_profiles`

Purpose:

* internal staff/admin/Super Admin profile
* invite-only account mapping

Possible fields:

* `id`
* `auth_user_id`
* `staff_role`
* `full_name`
* `email`
* `status`
* `last_login_at`
* `invited_by`
* `invited_at`
* `created_at`
* `updated_at`

---

## 13B.2 `staff_permissions`

Purpose:

* granular permission system

Possible fields:

* `id`
* `staff_profile_id`
* `module`
* `can_read`
* `can_write`
* `can_approve`
* `can_reject`
* `can_export`
* `can_bulk_action`
* `can_view_sensitive`
* `can_view_private_documents`
* `can_manage_payments`
* `can_refund`
* `can_manage_providers`
* `can_manage_feature_flags`
* `created_at`
* `updated_at`

---

## 13B.3 `staff_invites`

Purpose:

* invite-only staff onboarding

Possible fields:

* `id`
* `email`
* `staff_role`
* `permissions_snapshot`
* `token_hash`
* `expires_at`
* `accepted_at`
* `invited_by`
* `status`
* `created_at`

Security:

* invite token hashed
* no public staff registration
* Super Admin/admin permission required

---

# 13C. Location System

## 13C.1 `countries`

Usually India only, but architecture supports country.

Fields:

* `id`
* `name`
* `slug`
* `code`
* `is_active`

## 13C.2 `states`

Gujarat primary.

Fields:

* `id`
* `country_id`
* `name`
* `slug`
* `code`
* `is_active`

## 13C.3 `districts`

Fields:

* `id`
* `state_id`
* `name`
* `slug`
* `is_active`

## 13C.4 `talukas`

Fields:

* `id`
* `district_id`
* `name`
* `slug`
* `is_active`

## 13C.5 `cities_villages`

Fields:

* `id`
* `taluka_id`
* `district_id`
* `name`
* `slug`
* `type`
* `is_active`

## 13C.6 `areas`

Fields:

* `id`
* `city_village_id`
* `name`
* `slug`
* `is_active`

## 13C.7 `localities`

Fields:

* `id`
* `area_id`
* `city_village_id`
* `name`
* `slug`
* `is_active`

## 13C.8 `societies_buildings`

Fields:

* `id`
* `locality_id`
* `name`
* `slug`
* `type`
* `is_active`

## 13C.9 `missing_location_requests`

Purpose:

* allow users to request missing location
* admin/city manager approval

Fields:

* `id`
* `requested_by`
* `requested_level`
* `parent_location_id`
* `requested_name`
* `notes`
* `status`
* `reviewed_by`
* `reviewed_at`
* `created_at`

---

# 13D. Properties

## 13D.1 `properties`

Purpose:

* normal property listings by owners/brokers

Possible fields:

* `id`
* `owner_profile_id`
* `posted_by_role`
* `title`
* `slug`
* `purpose`
* `category`
* `property_type`
* `property_subtype`
* `status`
* `approval_status`
* `visibility_status`
* `price`
* `price_unit`
* `price_negotiable`
* `rent_amount`
* `deposit_amount`
* `maintenance_amount`
* `brokerage_amount`
* `area_value`
* `area_unit`
* `built_up_area`
* `carpet_area`
* `plot_area`
* `bedrooms`
* `bathrooms`
* `balconies`
* `floor_number`
* `total_floors`
* `wing`
* `furnishing`
* `parking`
* `age_of_property`
* `construction_status`
* `possession_status`
* `ownership_type`
* `facing`
* `amenities`
* `description`
* `country_id`
* `state_id`
* `district_id`
* `taluka_id`
* `city_village_id`
* `area_id`
* `locality_id`
* `society_building_id`
* `landmark`
* `address_line`
* `pin_code`
* `latitude`
* `longitude`
* `contact_visibility`
* `contact_preference`
* `published_at`
* `expires_at`
* `created_at`
* `updated_at`
* `deleted_at`

Status examples:

* `draft`
* `pending_approval`
* `need_changes`
* `rejected`
* `published`
* `paused`
* `expired`
* `deleted`

Rules:

* owner/broker only
* builder denied unless future approved rule changes
* public only sees approved/published
* edit/update requires reapproval
* pause/resume may not require approval
* hidden contact protected

---

## 13D.2 `property_type_details`

Purpose:

* type-specific fields that do not belong in all properties

Possible fields:

* `id`
* `property_id`
* `detail_key`
* `detail_value`
* `created_at`

Alternative:

* separate typed tables if needed for complex types

Rule:

* must not show irrelevant fields in UI
* validation must enforce required type-specific fields

---

## 13D.3 `property_approval_events`

Purpose:

* moderation timeline

Fields:

* `id`
* `property_id`
* `action`
* `from_status`
* `to_status`
* `reason`
* `actor_staff_id`
* `created_at`

---

# 13E. Projects

## 13E.1 `projects`

Purpose:

* builder/developer projects

Possible fields:

* `id`
* `builder_profile_id`
* `project_name`
* `slug`
* `project_type`
* `project_subtype`
* `purpose`
* `status`
* `approval_status`
* `rera_status`
* `rera_number`
* `rera_verified_at`
* `rera_disclaimer_required`
* `description`
* `total_land_area`
* `total_units`
* `total_wings`
* `total_towers`
* `total_floors`
* `possession_date`
* `construction_status`
* `phase_status`
* `country_id`
* `state_id`
* `district_id`
* `taluka_id`
* `city_village_id`
* `area_id`
* `locality_id`
* `society_building_id`
* `landmark`
* `address_line`
* `pin_code`
* `latitude`
* `longitude`
* `contact_visibility_rule`
* `virtual_tour_url`
* `published_at`
* `expires_at`
* `created_at`
* `updated_at`
* `deleted_at`

Rules:

* builder only
* owner/broker cannot post projects
* no PG/hostel/room as project
* public only approved/published
* RERA/ad gates enforced
* logged-in users can see project contact per rules
* edit/update requires reapproval

---

## 13E.2 `project_wings`

Fields:

* `id`
* `project_id`
* `wing_name`
* `total_floors`
* `units_per_floor`
* `created_at`

## 13E.3 `project_units`

Fields:

* `id`
* `project_id`
* `wing_id`
* `floor_number`
* `unit_number`
* `unit_type`
* `bhk`
* `area_value`
* `area_unit`
* `price`
* `status`
* `created_at`
* `updated_at`

Unit statuses:

* `available`
* `booked`
* `sold`
* `hold`
* `not_released`

## 13E.4 `project_phases`

Fields:

* `id`
* `project_id`
* `phase_name`
* `start_date`
* `possession_date`
* `status`
* `created_at`

## 13E.5 `project_progress_updates`

Fields:

* `id`
* `project_id`
* `title`
* `description`
* `progress_percent`
* `media_id`
* `updated_by`
* `created_at`

---

# 13F. Requirements And Matching

## 13F.1 `requirements`

Purpose:

* owner/broker buying/renting requirements

Fields:

* `id`
* `profile_id`
* `posted_by_role`
* `title`
* `purpose`
* `requirement_type`
* `property_category`
* `preferred_property_types`
* `budget_min`
* `budget_max`
* `area_min`
* `area_max`
* `area_unit`
* `preferred_locations`
* `city_village_id`
* `locality_id`
* `urgency`
* `contact_preference`
* `privacy_level`
* `status`
* `approval_status`
* `expires_at`
* `created_at`
* `updated_at`
* `deleted_at`

Rules:

* owner/broker can post
* edit/update requires reapproval
* visibility scoped
* no fake matching

---

## 13F.2 `requirement_matches`

Purpose:

* matched listings/projects/profiles

Fields:

* `id`
* `requirement_id`
* `matched_entity_type`
* `matched_entity_id`
* `score`
* `score_explanation`
* `status`
* `created_at`

Rule:

* score must be explainable
* no fake AI/recommendation
* no private unauthorized data

---

## 13F.3 `proposals`

Fields:

* `id`
* `requirement_id`
* `sender_profile_id`
* `receiver_profile_id`
* `related_entity_type`
* `related_entity_id`
* `message`
* `offer_amount`
* `status`
* `viewed_at`
* `expires_at`
* `created_at`
* `updated_at`

Statuses:

* `sent`
* `viewed`
* `shortlisted`
* `accepted`
* `rejected`
* `negotiation`
* `withdrawn`
* `expired`

---

# 13G. Leads, CRM, Messages And Site Visits

## 13G.1 `leads`

Fields:

* `id`
* `source`
* `sender_profile_id`
* `receiver_profile_id`
* `assigned_agent_id`
* `related_entity_type`
* `related_entity_id`
* `requirement_id`
* `proposal_id`
* `status`
* `stage`
* `contact_revealed`
* `consent_logged`
* `duplicate_group_id`
* `created_at`
* `updated_at`

Stages:

* `new`
* `contacted`
* `interested`
* `follow_up`
* `site_visit`
* `converted`
* `lost`
* `closed`

---

## 13G.2 `lead_events`

Fields:

* `id`
* `lead_id`
* `event_type`
* `note`
* `actor_profile_id`
* `actor_staff_id`
* `metadata`
* `created_at`

---

## 13G.3 `lead_notes`

Fields:

* `id`
* `lead_id`
* `note`
* `created_by_profile_id`
* `created_by_staff_id`
* `visibility`
* `created_at`

---

## 13G.4 `message_threads`

Fields:

* `id`
* `thread_type`
* `related_entity_type`
* `related_entity_id`
* `lead_id`
* `proposal_id`
* `requirement_id`
* `created_at`
* `updated_at`

---

## 13G.5 `message_participants`

Fields:

* `id`
* `thread_id`
* `profile_id`
* `staff_id`
* `role_in_thread`
* `last_read_at`
* `created_at`

---

## 13G.6 `messages`

Fields:

* `id`
* `thread_id`
* `sender_profile_id`
* `sender_staff_id`
* `body`
* `status`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 13G.7 `message_attachments`

Fields:

* `id`
* `message_id`
* `media_id`
* `created_at`

---

## 13G.8 `site_visits`

Fields:

* `id`
* `lead_id`
* `requested_by_profile_id`
* `receiver_profile_id`
* `assigned_agent_id`
* `related_entity_type`
* `related_entity_id`
* `scheduled_at`
* `status`
* `cancel_reason`
* `reschedule_reason`
* `feedback`
* `created_at`
* `updated_at`

Statuses:

* `requested`
* `accepted`
* `rejected`
* `rescheduled`
* `cancelled`
* `completed`
* `no_show`

---

# 13H. Media And Storage

## 13H.1 `media_assets`

Purpose:

* metadata for uploaded files

Fields:

* `id`
* `owner_profile_id`
* `uploaded_by_staff_id`
* `bucket_type`
* `entity_type`
* `entity_id`
* `file_name`
* `file_type`
* `mime_type`
* `file_size_bytes`
* `storage_key`
* `public_url`
* `signed_url_required`
* `status`
* `is_cover`
* `sort_order`
* `width`
* `height`
* `duration_seconds`
* `created_at`
* `updated_at`
* `deleted_at`

Bucket types:

* `public`
* `private`

Statuses:

* `uploaded`
* `processing`
* `ready`
* `failed`
* `deleted`
* `quarantined`

---

## 13H.2 `media_variants`

Fields:

* `id`
* `media_asset_id`
* `variant_name`
* `format`
* `width`
* `height`
* `storage_key`
* `public_url`
* `file_size_bytes`
* `created_at`

---

## 13H.3 `media_processing_jobs`

Fields:

* `id`
* `media_asset_id`
* `job_type`
* `status`
* `attempt_count`
* `last_error`
* `created_at`
* `updated_at`

---

## 13H.4 `media_access_logs`

Purpose:

* private document access logs

Fields:

* `id`
* `media_asset_id`
* `accessed_by_profile_id`
* `accessed_by_staff_id`
* `access_reason`
* `created_at`

---

# 13I. Verification And Trust

## 13I.1 `verification_requests`

Fields:

* `id`
* `profile_id`
* `verification_type`
* `status`
* `submitted_at`
* `reviewed_by`
* `reviewed_at`
* `review_note`
* `expires_at`
* `created_at`
* `updated_at`

Types:

* `owner`
* `broker`
* `builder`
* `business`
* `property`
* `project`
* `rera`
* `authority`
* `role_change`

Statuses:

* `draft`
* `submitted`
* `under_review`
* `need_changes`
* `rejected`
* `approved`
* `revoked`
* `expired`

---

## 13I.2 `verification_documents`

Fields:

* `id`
* `verification_request_id`
* `media_asset_id`
* `document_type`
* `status`
* `created_at`

Security:

* private bucket only
* signed URL
* staff permission required
* access logs

---

# 13J. Billing, Payments, Plans And Invoices

## 13J.1 `plans`

Fields:

* `id`
* `role`
* `name`
* `slug`
* `status`
* `price`
* `billing_cycle`
* `features`
* `limits`
* `gst_applicable`
* `created_at`
* `updated_at`

---

## 13J.2 `subscriptions`

Fields:

* `id`
* `profile_id`
* `plan_id`
* `status`
* `started_at`
* `expires_at`
* `grace_until`
* `cancelled_at`
* `created_at`
* `updated_at`

---

## 13J.3 `payments`

Fields:

* `id`
* `profile_id`
* `subscription_id`
* `provider`
* `provider_order_id`
* `provider_payment_id`
* `amount`
* `currency`
* `status`
* `verification_status`
* `raw_payload_redacted`
* `created_at`
* `updated_at`

Statuses:

* `created`
* `pending`
* `authorized`
* `captured`
* `failed`
* `cancelled`
* `refunded`

Rules:

* failed/pending does not activate plan
* success only after verified process
* raw payload must be redacted

---

## 13J.4 `payment_webhook_events`

Fields:

* `id`
* `provider`
* `provider_event_id`
* `event_type`
* `signature_verified`
* `processed_at`
* `processing_status`
* `payload_hash`
* `created_at`

Rules:

* unique provider event ID
* idempotency
* no raw secret payload logs

---

## 13J.5 `invoices`

Fields:

* `id`
* `profile_id`
* `payment_id`
* `invoice_number`
* `financial_year`
* `amount`
* `taxable_amount`
* `cgst`
* `sgst`
* `igst`
* `total_amount`
* `gstin`
* `billing_name`
* `billing_address`
* `status`
* `pdf_media_id`
* `issued_at`
* `created_at`

Rule:

* invoice only after verified payment
* sequential invoice numbering
* failed payment cannot waste invoice number

---

## 13J.6 `coupons`

Fields:

* `id`
* `code`
* `discount_type`
* `discount_value`
* `valid_from`
* `valid_until`
* `usage_limit`
* `per_user_limit`
* `status`
* `created_at`

---

## 13J.7 `trial_grants`

Fields:

* `id`
* `profile_id`
* `plan_id`
* `trial_start`
* `trial_end`
* `status`
* `created_by_staff_id`
* `created_at`

---

# 13K. Ads And Promotions

## 13K.1 `ads`

Fields:

* `id`
* `builder_profile_id`
* `project_id`
* `title`
* `status`
* `approval_status`
* `payment_status`
* `starts_at`
* `ends_at`
* `target_mode`
* `target_city_ids`
* `rera_checked`
* `created_at`
* `updated_at`

Display requires:

* approved
* paid where required
* active
* not expired
* project approved/published
* RERA compliance where applicable

---

## 13K.2 `ad_media`

Fields:

* `id`
* `ad_id`
* `media_asset_id`
* `device_type`
* `created_at`

Device types:

* `desktop`
* `tablet`
* `mobile`

---

## 13K.3 `ad_events`

Fields:

* `id`
* `ad_id`
* `event_type`
* `city_id`
* `profile_id`
* `session_hash`
* `ip_hash`
* `user_agent_hash`
* `created_at`

Events:

* `impression`
* `click`

Rules:

* no fake impressions/clicks
* fraud-aware
* privacy-safe

---

# 13L. Notifications

## 13L.1 `notifications`

Fields:

* `id`
* `recipient_profile_id`
* `recipient_staff_id`
* `type`
* `title`
* `body`
* `deep_link`
* `read_at`
* `created_at`

---

## 13L.2 `notification_preferences`

Fields:

* `id`
* `profile_id`
* `channel`
* `notification_type`
* `enabled`
* `quiet_hours_start`
* `quiet_hours_end`
* `created_at`
* `updated_at`

---

## 13L.3 `notification_delivery_logs`

Fields:

* `id`
* `notification_id`
* `channel`
* `provider`
* `status`
* `provider_event_id`
* `attempt_count`
* `last_error_safe`
* `created_at`
* `updated_at`

Channels:

* `in_app`
* `email`
* `sms`
* `whatsapp`
* `push`

No fake sent status.

---

# 13M. CMS, Blog, SEO And Legal

## 13M.1 `cms_pages`

Fields:

* `id`
* `slug`
* `title`
* `content`
* `status`
* `meta_title`
* `meta_description`
* `canonical_url`
* `noindex`
* `published_at`
* `created_at`
* `updated_at`

---

## 13M.2 `blog_posts`

Fields:

* `id`
* `slug`
* `title`
* `excerpt`
* `content`
* `category_id`
* `featured_media_id`
* `status`
* `meta_title`
* `meta_description`
* `published_at`
* `created_at`
* `updated_at`

---

## 13M.3 `seo_pages`

Fields:

* `id`
* `page_type`
* `slug`
* `city_id`
* `locality_id`
* `property_type`
* `title`
* `intro`
* `meta_title`
* `meta_description`
* `canonical_url`
* `noindex`
* `status`
* `created_at`
* `updated_at`

Rules:

* no fake counts
* no private data
* empty/thin pages noindex/hidden

---

## 13M.4 `redirects`

Fields:

* `id`
* `from_path`
* `to_path`
* `status_code`
* `is_active`
* `created_at`

Rule:

* prevent open redirects

---

# 13N. Support, Reports And Fraud

## 13N.1 `support_tickets`

Fields:

* `id`
* `profile_id`
* `category`
* `priority`
* `status`
* `assigned_staff_id`
* `subject`
* `created_at`
* `updated_at`

## 13N.2 `support_messages`

Fields:

* `id`
* `ticket_id`
* `sender_profile_id`
* `sender_staff_id`
* `message`
* `created_at`

## 13N.3 `reports`

Fields:

* `id`
* `reporter_profile_id`
* `target_type`
* `target_id`
* `category`
* `description`
* `status`
* `assigned_staff_id`
* `created_at`
* `updated_at`

## 13N.4 `fraud_events`

Fields:

* `id`
* `event_type`
* `profile_id`
* `target_type`
* `target_id`
* `severity`
* `metadata`
* `status`
* `created_at`

---

# 13O. Provider Settings And System

## 13O.1 `provider_settings`

Purpose:

* provider metadata only
* no secrets

Fields:

* `id`
* `provider_name`
* `provider_area`
* `status`
* `mode`
* `is_enabled`
* `last_tested_at`
* `last_test_result`
* `safe_error_code`
* `configured_by`
* `created_at`
* `updated_at`

Never store raw API secrets.

---

## 13O.2 `provider_health_checks`

Fields:

* `id`
* `provider_name`
* `status`
* `safe_error_code`
* `checked_at`
* `created_at`

---

## 13O.3 `feature_flags`

Fields:

* `id`
* `flag_key`
* `description`
* `is_enabled`
* `enabled_for_roles`
* `enabled_for_percentage`
* `environment`
* `created_at`
* `updated_at`

---

## 13O.4 `system_settings`

Fields:

* `id`
* `setting_key`
* `setting_value`
* `visibility`
* `updated_by`
* `updated_at`

No secrets.

---

# 13P. Audit, Security And Privacy

## 13P.1 `audit_logs`

Fields:

* `id`
* `actor_profile_id`
* `actor_staff_id`
* `action`
* `target_type`
* `target_id`
* `old_value_safe`
* `new_value_safe`
* `reason`
* `ip_hash`
* `user_agent_hash`
* `created_at`

Rules:

* append-only
* no secrets
* high-risk actions required

---

## 13P.2 `security_events`

Fields:

* `id`
* `event_type`
* `profile_id`
* `staff_id`
* `severity`
* `ip_hash`
* `metadata_safe`
* `created_at`

---

## 13P.3 `rate_limit_events`

Fields:

* `id`
* `key_hash`
* `action`
* `count`
* `window_start`
* `window_end`
* `blocked`
* `created_at`

---

## 13P.4 `legal_consents`

Fields:

* `id`
* `profile_id`
* `consent_type`
* `policy_version`
* `accepted_at`
* `ip_hash`
* `user_agent_hash`

---

## 13P.5 `data_export_requests`

Fields:

* `id`
* `profile_id`
* `status`
* `requested_at`
* `completed_at`
* `export_media_id`

---

## 13P.6 `data_delete_requests`

Fields:

* `id`
* `profile_id`
* `status`
* `requested_at`
* `reviewed_by`
* `completed_at`
* `legal_hold_reason`

---

# 13Q. Jobs, Cron And Dead Letters

## 13Q.1 `background_jobs`

Fields:

* `id`
* `job_type`
* `status`
* `payload_safe`
* `attempt_count`
* `next_run_at`
* `last_error_safe`
* `created_at`
* `updated_at`

## 13Q.2 `dead_letters`

Fields:

* `id`
* `source`
* `event_type`
* `payload_hash`
* `safe_error`
* `status`
* `created_at`

---

## 14. Enum / Status Architecture

Use consistent statuses across modules.

## 14.1 Content Status

* `draft`
* `pending_approval`
* `need_changes`
* `rejected`
* `published`
* `paused`
* `expired`
* `deleted`

## 14.2 Verification Status

* `not_submitted`
* `draft`
* `submitted`
* `under_review`
* `need_changes`
* `rejected`
* `approved`
* `revoked`
* `expired`

## 14.3 Payment Status

* `created`
* `pending`
* `authorized`
* `captured`
* `failed`
* `cancelled`
* `refunded`

## 14.4 Subscription Status

* `inactive`
* `trialing`
* `active`
* `past_due`
* `grace`
* `expired`
* `cancelled`
* `blocked`

## 14.5 Provider Status

* `not_started`
* `setup_required`
* `configured_not_tested`
* `test_mode_only`
* `live_ready`
* `active`
* `disabled_by_flag`
* `fallback_active`
* `blocked`
* `failed`
* `degraded`

## 14.6 User Status

* `active`
* `pending_verification`
* `suspended`
* `banned`
* `deleted`

## 14.7 Admin Review Status

* `pending`
* `assigned`
* `under_review`
* `need_changes`
* `approved`
* `rejected`
* `escalated`
* `closed`

---

## 15. RLS Strategy

RLS must be designed from the beginning.

## 15.1 RLS Principles

1. Enable RLS on all sensitive tables.
2. Guest can access only approved public-safe data.
3. Authenticated user can access own private data.
4. Owner can manage own properties/requirements.
5. Broker can manage own properties/requirements/proposals.
6. Builder can manage own projects/agents/ads.
7. Builder agents see assigned data only.
8. Staff access is permission-scoped.
9. Super Admin access is allowed where intended.
10. Private documents require strict access.
11. Payment/billing records are owner/admin scoped.
12. Webhook events are server/admin only.
13. Audit logs are admin/audit scoped.
14. Provider settings are Super Admin/system scoped.
15. Public-safe views exclude private fields.
16. RLS must be tested with allowed and denied cases.
17. RLS is not disabled for convenience.
18. RLS changes require migration.
19. RLS failure blocks launch.

---

## 15.2 Public RLS Pattern

Public users may read:

* approved published public properties
* approved published public projects
* published CMS/blog/legal pages
* public-safe broker/builder profiles
* active public plans/pricing
* approved active ads
* public location hierarchy
* public SEO pages

Public users must not read:

* hidden phone
* private email
* private profile fields
* private address fields where not public
* leads
* messages
* requirements not public/allowed
* proposals
* payments
* invoices
* private documents
* verification documents
* audit logs
* staff/admin data
* provider settings
* feature flags
* webhook events
* raw notification logs
* internal notes

---

## 15.3 Authenticated User RLS Pattern

Authenticated public users can:

* read/update own profile
* read own dashboards
* manage own allowed listings
* manage own requirements
* view own leads
* view own messages
* view own notifications
* view own billing/invoices
* submit support/report
* submit verification
* access private documents they own where allowed

They cannot:

* access another user’s private data
* bypass role restrictions
* bypass listing ownership
* bypass approval
* bypass subscription gates
* bypass payment checks
* access admin/staff data

---

## 15.4 Staff/Admin RLS Pattern

Staff/admin access should combine:

* separate auth
* staff profile
* staff permission table
* server-side permission checks
* RLS policies or secure server-side access
* audit logs

Staff must be denied if:

* not assigned module
* lacking action permission
* lacking sensitive data permission
* lacking private document permission
* lacking export permission
* lacking payment/refund permission
* direct URL bypass attempted

Super Admin has broad access but still audited.

---

## 15.5 Service Role Pattern

Service role may be used for:

* trusted server-only admin operations
* webhooks
* background jobs
* cron
* provider callbacks
* controlled migrations
* server-side system tasks

Service role must not be used:

* in client components
* in public browser code
* in exposed bundles
* to bypass app permission checks casually
* for user-facing actions without explicit authorization

Service role access must be wrapped in safe server-only functions.

---

## 16. Public-Safe Views

Use public-safe views or carefully mapped queries for public pages.

Recommended public-safe views:

* `public_properties`
* `public_projects`
* `public_project_units_summary`
* `public_broker_profiles`
* `public_builder_profiles`
* `public_ads`
* `public_cms_pages`
* `public_blog_posts`
* `public_seo_pages`
* `public_locations`
* `public_pricing_plans`

Public-safe views must exclude:

* hidden contacts
* private email
* private phone
* private docs
* private notes
* internal moderation status except public status
* raw verification documents
* payment data
* private lead data
* admin fields
* provider config
* audit/security events

Views should include only fields required by public pages.

---

## 17. RLS Test Requirements

For each sensitive table, test:

* guest allowed case
* guest denied case
* correct owner allowed
* wrong owner denied
* correct role allowed
* wrong role denied
* staff with permission allowed
* staff without permission denied
* Super Admin allowed where intended
* private data denied publicly
* deleted/draft/rejected hidden
* public-safe view excludes private fields

RLS tests must be recorded in:

* `SECURITY_RLS_CHECKLIST.md`
* `MANUAL_VERIFICATION.md`
* `BUGS_AND_FIXES.md` if failed
* `CHANGELOG.md`
* `FEATURE_REGISTRY.md`

---

## 18. Migration Architecture

All DB changes must use SQL migrations.

Migration folder:

```txt id="migration-folder"
supabase/migrations/
```

Migration naming:

```txt id="migration-naming"
YYYYMMDDHHMMSS_phase_XX_short_description.sql
```

Example:

```txt id="migration-example"
20260629093000_phase_02_auth_roles_rls_foundation.sql
```

Migration header:

```sql id="migration-header"
-- Migration: YYYYMMDDHHMMSS_phase_XX_short_description.sql
-- Project: My Gujarat Property
-- Purpose:
-- Phase:
-- Related docs:
-- Tables changed:
-- RLS changed: Yes/No
-- Destructive changes: Yes/No
-- Backup required: Yes/No
-- Rollback notes:
-- Created by:
```

Every migration must include rollback notes.

Destructive migration requires user approval and backup.

---

## 19. Indexing Strategy

Indexes are required for:

* role lookups
* profile lookups
* ownership filters
* status filters
* city/locality search
* price/budget range
* type/purpose filters
* published_at sorting
* slug lookup
* admin queues
* verification queues
* leads CRM
* messages/unread counts
* notifications
* payment provider IDs
* webhook event IDs
* invoice number
* ad targeting
* audit logs
* location hierarchy
* support tickets
* reports
* media entity mapping

No unindexed heavy search/filter queries should ship.

No unbounded reads.

No N+1 patterns.

---

## 20. Caching Architecture

## 20.1 Cache Public Data Safely

Cacheable:

* homepage public sections
* public property/project search where safe
* public detail pages
* public SEO pages
* public CMS/legal pages
* public blog pages
* public location lists
* public pricing plans
* public approved ads with safe TTL

Do not cache globally:

* dashboards
* leads
* messages
* notifications
* billing
* invoices
* private profiles
* admin/staff pages
* private documents
* contact reveal state
* payment state
* provider settings with sensitive fields

---

## 20.2 Revalidation Strategy

Use targeted revalidation.

Examples:

* property approval/update → property detail/search/city tags
* project approval/update → project detail/search/city tags
* requirement update → requirement feed/dashboard tags
* profile update → public profile/dashboard tags
* lead update → related dashboard tags
* payment success → billing/subscription dashboard tags
* ad approval/pause → homepage/city ad tags
* CMS/legal update → page path/tag
* location update → location/search/SEO tags

Do not revalidate whole site unnecessarily.

---

## 21. Storage Architecture

Buckets:

* public media bucket
* private document bucket

Public bucket may contain:

* approved property images
* approved project images
* public project brochure if allowed
* public floor plans where allowed
* public profile images/logos
* approved banner ads
* public blog/CMS images

Private bucket must contain:

* verification documents
* identity/business/authority proof
* support private attachments
* report evidence where private
* private invoices if restricted
* private signed documents

Rules:

* private files never public
* signed URLs expire
* access logged
* staff permission required
* public CDN must not serve private files
* upload validation server-side
* media metadata tracked in DB
* orphan cleanup background job
* CDN purge on update/delete where needed

---

## 22. Provider Adapter Architecture

Use provider adapters.

Recommended structure:

```txt id="provider-adapter-structure"
lib/providers/
  otp/
  sms/
  email/
  whatsapp/
  razorpay/
  maps/
  storage/
  analytics/
  error-tracking/
  turnstile/
  geoip/
  pdf/
  media-processing/
```

Provider adapter rules:

* consistent interface
* server-only secrets
* setup-required detection
* safe error mapping
* retry behavior where needed
* idempotency where needed
* delivery/payment/upload logs
* no fake success
* provider status update
* audit provider setting changes

---

## 23. Payment Architecture

Payment flow:

```txt id="payment-flow"
User selects plan/add-on/ad
        ↓
Server validates role/plan/amount
        ↓
Server creates Razorpay order
        ↓
Client opens checkout with public key/order
        ↓
Payment attempted
        ↓
Webhook verifies signature
        ↓
Payment event processed idempotently
        ↓
Subscription/add-on/ad activated only after verified success
        ↓
Invoice generated
        ↓
Notification/email queued if provider configured
```

Rules:

* client amount not trusted
* server validates plan amount
* webhook signature mandatory
* idempotency mandatory
* failed/pending inactive
* invoice after verified success
* manual activation audited
* no fake payment success

---

## 24. Notification Architecture

Notification types:

* in-app
* email
* SMS
* WhatsApp
* push where enabled

In-app notifications are DB-backed.

External notification providers are setup-required until configured.

Notification flow:

```txt id="notification-flow"
Event occurs
  ↓
Create notification record
  ↓
User sees in-app notification
  ↓
External delivery job queued if provider/channel enabled
  ↓
Provider adapter sends
  ↓
Delivery log updated
  ↓
Failure retry/fallback
```

Rules:

* unread count real
* no fake delivered status
* provider failure safe
* preferences respected
* quiet hours/digest where implemented
* deep links safe
* role-scoped notifications

---

## 25. Audit Architecture

Audit logs required for:

* admin/staff actions
* role changes
* verification actions
* approval/rejection
* payment manual actions
* refund/credit note
* provider setting changes
* feature flag changes
* private document access
* contact reveal
* exports
* bulk actions
* deletes/restores
* high-risk security changes
* CMS/legal publish
* ad approval
* location approval

Audit logs must be append-only and safe.

No secrets in audit logs.

---

## 26. Rate Limit Architecture

Rate limits required for:

* OTP send
* OTP verify
* login attempts
* contact reveal
* inquiry submit
* proposal submit
* message send
* upload
* report submit
* support ticket create
* payment order create
* coupon apply
* provider test buttons
* search scraping risk
* admin login
* webhook retry

Rate limit keys may include:

* IP hash
* user ID
* mobile hash
* device/session hash
* action type

Do not store raw sensitive identifiers where avoidable.

---

## 27. Background Job Architecture

Background jobs should handle:

* media processing
* video thumbnail generation
* PDF generation
* notification sending
* failed provider retry
* webhook reconciliation
* invoice email sending
* sitemap generation
* listing expiry
* subscription/trial expiry
* ad expiry
* orphan media cleanup
* soft delete purge
* analytics aggregation
* fraud checks
* RERA recheck where implemented
* provider health checks

Rules:

* idempotent
* batched
* safe retry
* dead-letter queue
* logs redacted
* cron protected
* not blocking user requests

---

## 28. SEO Architecture

SEO architecture must support:

* static/dynamic metadata
* canonical URLs
* noindex logic
* sitemap generation
* robots.txt
* city/locality/type pages
* listing detail pages
* project detail pages
* public profiles
* CMS/legal/blog pages
* schema markup
* public-safe data only
* no fake counts
* empty/thin noindex/hidden
* admin/staff noindex
* redirect manager
* slug management
* sold/rented/expired handling
* sitemap split if large

SEO must not leak private data.

---

## 29. Internationalization / Localization Architecture

Language support should allow:

* English
* Hindi
* Gujarati
* transliteration search
* Indian currency formatting
* IST timezone
* Indian date formats
* Indian phone number handling
* NRI/ISD fallback where implemented
* Gujarati font support

Recommended:

* translation dictionary structure
* language preference in profile/session
* SEO language metadata where needed
* Noto Sans Gujarati or suitable Gujarati font
* server/client formatting utilities

Current scope may start with one language and architecture-ready localization, but missing localization must be tracked.

---

## 30. Security Architecture Summary

Security architecture includes:

* Supabase Auth
* role-aware app routes
* server-side authorization
* RLS
* public-safe views
* validation
* safe errors
* secret isolation
* provider adapter safety
* payment webhook verification
* private storage buckets
* signed URLs
* audit logs
* rate limits
* CSRF/XSS/SSRF/CORS safeguards
* security headers
* log redaction
* consent/privacy records
* direct URL bypass tests

Security cannot be postponed for production features.

---

## 31. Performance Architecture Summary

Performance architecture includes:

* server components where safe
* paginated queries
* indexed filters
* public-safe views
* no N+1
* no unbounded reads
* lazy dashboard modules
* admin pagination
* optimized images
* lazy videos/PDFs/maps
* CDN
* targeted revalidation
* provider timeouts
* background jobs
* monitoring
* load testing
* Core Web Vitals tracking

Performance cannot weaken security.

---

## 32. Deployment Architecture

Environments:

* local
* development
* staging
* production
* preview
* maintenance

Deployment requirements:

* `.env.example`
* no real secrets committed
* build passes
* lint/typecheck passes
* migrations reviewed
* RLS verified
* provider status checked
* manual verification
* backup before production
* rollback plan
* smoke test
* production provider mode check
* dev/test/mock disabled

Production launch requires final signoff.

---

## 33. Logging Architecture

Logs must be safe.

Do not log:

* OTP
* password
* access token
* refresh token
* service role key
* provider API key
* webhook secret
* Razorpay secret
* private document URL
* full signed URL
* hidden phone
* raw payment payload
* raw provider payload
* raw private user data
* database credentials

Log safe:

* event type
* safe ID
* status
* redacted phone/email
* safe error code
* timestamp
* retry count
* actor ID where internal and permission-protected

---

## 34. Testing Architecture

Testing should include:

* unit tests for validation/permissions/helpers
* integration tests for server actions
* RLS allow/deny tests
* E2E tests for critical flows
* payment webhook tests
* provider setup-required/failure tests
* upload validation tests
* responsive manual verification
* accessibility checks
* performance/load tests
* deployment smoke tests

Critical flows:

* guest search/detail/contact auth popup
* owner property post
* broker property/requirement/proposal
* builder project/ads
* admin moderation
* staff permission denial
* payment failed/pending/success
* hidden contact privacy
* private document access
* RLS wrong-owner denial

---

## 35. Architecture Decision Rules

Architecture decisions must be documented when changing:

* framework
* auth provider
* database
* RLS strategy
* payment provider
* storage provider
* provider mode
* route structure
* permission model
* role rules
* caching strategy
* deployment strategy
* migration strategy
* media processing architecture
* search architecture
* billing architecture

Document decisions in:

* `brain.md`
* `CHANGELOG.md`
* relevant detailed doc
* `FEATURE_REGISTRY.md`
* `DEPLOYMENT_ROLLBACK.md` if deployment impact
* `SECURITY_RLS_CHECKLIST.md` if security impact
* `PERFORMANCE_CHECKLIST.md` if performance impact

---

## 36. Architecture Anti-Patterns To Avoid

Do not:

* use frontend-only authorization
* fetch all rows and filter in JS
* expose hidden contact then hide with CSS
* cache user-private data as public
* use service role in client
* store provider secrets in DB
* trust client payment amount
* trust client payment success
* skip webhook signature
* store private docs in public bucket
* allow public admin registration
* let wrong role access route by URL
* create duplicate tables/routes/components
* add unbounded search
* show fake analytics
* show fake provider health
* show fake verified/RERA badge
* use raw provider errors in UI
* skip migrations for DB changes
* skip rollback notes
* disable RLS for performance
* write large unrelated monolith components
* create dashboard tables without pagination
* put heavy charts/maps in initial bundle
* use unsafe iframe/embed URLs
* ignore mobile layout

---

## 37. Current Architecture Status

As of this documentation generation stage:

| Area                         | Status                |
| ---------------------------- | --------------------- |
| Framework architecture       | `DOCUMENTED_BASELINE` |
| Next.js/React implementation | `NOT_STARTED`         |
| Supabase Auth                | `NOT_STARTED`         |
| Supabase DB                  | `NOT_STARTED`         |
| RLS                          | `NOT_STARTED`         |
| SQL migrations               | `NOT_STARTED`         |
| Public routes                | `NOT_STARTED`         |
| Dashboard routes             | `NOT_STARTED`         |
| Admin/staff routes           | `NOT_STARTED`         |
| Provider adapters            | `SETUP_REQUIRED`      |
| Razorpay                     | `SETUP_REQUIRED`      |
| R2/CDN                       | `SETUP_REQUIRED`      |
| Media processing             | `SETUP_REQUIRED`      |
| Background jobs              | `SETUP_REQUIRED`      |
| Search architecture          | `DOCUMENTED_BASELINE` |
| Caching architecture         | `DOCUMENTED_BASELINE` |
| Security architecture        | `DOCUMENTED_BASELINE` |
| Performance architecture     | `DOCUMENTED_BASELINE` |
| Deployment architecture      | `DOCUMENTED_BASELINE` |
| Manual verification          | `NOT_STARTED`         |
| Production readiness         | `NOT_STARTED`         |

---

## 38. Implementation Phase Mapping

Architecture applies to all phases.

| Phase    | Architecture Focus                                             |
| -------- | -------------------------------------------------------------- |
| Phase 01 | project setup, folder structure, env, baseline architecture    |
| Phase 02 | Supabase Auth, roles, RLS foundation, protected routes         |
| Phase 03 | public layout architecture, server/client UI split             |
| Phase 04 | property/project/requirement tables, forms, approval lifecycle |
| Phase 05 | search/detail/profile/SEO public-safe queries and caching      |
| Phase 06 | dashboard architecture and role-scoped private queries         |
| Phase 07 | admin/staff permissions, queues, audit architecture            |
| Phase 08 | leads/CRM/messages/site visits and scoped access               |
| Phase 09 | billing/payment/webhook/invoice/GST architecture               |
| Phase 10 | media/R2/CDN/private document storage architecture             |
| Phase 11 | location/SEO/CMS/legal architecture                            |
| Phase 12 | ads/notifications/provider architecture                        |
| Phase 13 | security/privacy/fraud/rate limit hardening                    |
| Phase 14 | performance/caching/deployment/load readiness                  |
| Phase 15 | final production provider/API/security/performance signoff     |

---

## 39. Architecture Verification Checklist

Before marking architecture-related implementation `PASS`, verify:

* [ ] relevant docs read
* [ ] route structure follows role boundaries
* [ ] server/client boundary safe
* [ ] DB changes have migrations
* [ ] RLS policies created where needed
* [ ] allowed/denied RLS checks done
* [ ] public-safe views exclude private fields
* [ ] hidden contact protected
* [ ] private documents protected
* [ ] service role not exposed
* [ ] provider secrets server-only
* [ ] setup-required states used where providers missing
* [ ] payment webhook safety handled where relevant
* [ ] unbounded reads avoided
* [ ] indexes added for frequent filters
* [ ] lists paginated
* [ ] media storage safe
* [ ] caching public/private safe
* [ ] audit logs added for sensitive actions
* [ ] rate limits added where relevant
* [ ] safe errors used
* [ ] docs updated
* [ ] manual verification updated
* [ ] bugs tracked
* [ ] no fake PASS

---

## 40. Current Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Created |
|        6 | `MANUAL_VERIFICATION.md`                                  | Created |
|        7 | `API_PROVIDER_STATUS.md`                                  | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Created |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Created |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Created |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Created |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Created |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Created |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Pending |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Pending |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Pending |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Pending |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Pending |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 41. Related Documents

This architecture document must stay aligned with:

* `CLAUDE.md`
* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`
* `docs/01_PROJECT_MASTER_AND_SCOPE.md`
* `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
* all later detailed docs
* all prompt files
* all SQL migrations
* all verification reports

---

## 42. Final Architecture Rule

Build My Gujarat Property as a real, secure, scalable and maintainable marketplace.

Architecture must protect users, data, payments, documents, contacts and platform trust.

Do not build shortcuts that create security leaks.

Do not create fake data or fake states.

Do not expose secrets.

Do not skip RLS.

Do not skip migrations.

Do not skip provider setup-required states.

Do not skip performance basics.

Do not skip manual verification.

A feature is architecture-complete only when its routes, data model, server logic, RLS, provider status, UI states, docs and verification all align.
