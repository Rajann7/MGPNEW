# prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md

# My Gujarat Property — Prompt 04: Property, Project And Requirement System

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 4 (detail pages), 5 (posting wizards), 8 (unit inventory)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-04/05/08.md`, and `docs/06` "Design Add-Ons". Locked: **Post Property = 9 steps**, Post Project = 10 (RERA gate), **Requirements need approval (Pending state)**, On-Hold unit status, override base price, featured-slot chip.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

This phase implements the core marketplace creation and management foundation for:

* Properties
* Projects
* Requirements

This phase must respect role rules:

* Owner can post property and requirement.
* Broker/Agent can post property and requirement.
* Builder/Developer can post project only.
* Builder cannot post normal property listings.
* Owner/Broker cannot post projects.
* Guests cannot create anything without auth.
* Admin approval is required before public publish.
* Pause/resume does not require reapproval.
* Edit/update after submit/publish requires approval where applicable.
* No hidden contact leak.
* No fake listing/project/requirement data.
* No fake approval.
* No fake RERA.
* No fake media upload success.
* No fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Prompt Number: 04
Phase: Property, Project And Requirement System
Type: Implementation Prompt
Matching Verification Prompt: prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
Previous Verification Prompt: prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

---

## 2. Phase Purpose

The purpose of this phase is to build the foundation for the core marketplace entities:

1. Property listings
2. Builder projects
3. Buyer/renter requirements

This includes:

* database tables
* RLS policies
* server actions/API routes
* validation
* type-wise dynamic forms
* role-based creation gates
* draft workflow
* submit for approval workflow
* approval status fields
* pause/resume/delete behavior
* owner/broker/builder dashboard management foundation
* location fields foundation
* media metadata placeholders
* public-safe views
* contact privacy fields
* admin moderation queue foundation placeholder
* no fake data
* docs updates
* tests/checks
* handoff to manual verification prompt

This phase creates the core data foundation used by search, detail pages, dashboards, admin moderation, leads and billing in later phases.

---

## 3. Required Docs To Read First

Before editing, read:

```txt id="required-docs"
CLAUDE.md
brain.md
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
prompts/00_PROMPT_USAGE_RULES.md
prompts/01_PROJECT_SETUP_BASELINE.md
prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect existing property/project/requirement code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/
app/
src/app/dashboard/
app/dashboard/
src/app/properties/
app/properties/
src/app/projects/
app/projects/
src/app/requirements/
app/requirements/
src/components/forms/
components/forms/
src/components/property/
components/property/
src/components/project/
components/project/
src/components/requirement/
components/requirement/
src/lib/auth/
lib/auth/
src/lib/permissions/
lib/permissions/
src/lib/db/
lib/db/
src/lib/validators/
lib/validators/
src/lib/supabase/
lib/supabase/
src/types/
types/
supabase/migrations/
```

Search for existing:

* property tables
* project tables
* requirement tables
* form components
* validation schemas
* server actions
* route handlers
* RLS policies
* media tables
* location tables
* approval status fields
* fake listing data
* fake project data
* fake requirements
* role bypass
* hidden contact exposure
* dashboard management pages

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Property System Foundation

* property table/schema
* property type fields
* property create/edit/draft forms
* owner/broker creation permission
* builder denied normal property posting
* submit for approval
* draft/pending/approved/rejected/paused/deleted statuses
* public-safe view
* RLS policies
* dashboard management foundation

### 5.2 Project System Foundation

* project table/schema
* builder-only project creation
* project category fields
* towers/wings/unit inventory foundation
* project media metadata placeholder
* project one-video rule foundation
* brochure/floor plan metadata placeholder
* RERA fields foundation
* submit for approval
* public-safe view
* RLS policies
* builder dashboard management foundation

### 5.3 Requirement System Foundation

* requirement table/schema
* owner/broker creation permission
* builder access to matching requirements later, not create unless product explicitly allows
* requirement type/purpose fields
* budget/location/preference fields
* submit for approval
* public-safe or scoped view depending privacy
* RLS policies
* dashboard management foundation

### 5.4 Dynamic Forms

* type-wise fields
* purpose-wise fields
* irrelevant fields hidden
* required validations enforced
* mobile-friendly step forms
* save draft
* preview if feasible
* safe disabled/setup-required states

### 5.5 Moderation/Approval Foundation

* statuses
* submit for approval
* need changes/rejected reason fields
* admin moderation placeholder/table fields
* no full admin UI unless existing/in scope
* admin approval implemented later in Prompt 07 if not now

### 5.6 Docs Updates

Update required docs after implementation.

---

## 6. Out Of Scope For This Phase

Do not implement full:

* public search/detail SEO
* broker/builder public profiles
* leads/inquiries/contact reveal
* CRM/messages/proposals/site visits
* full admin moderation UI
* full billing/subscription/payment
* Razorpay
* media upload storage/R2/CDN
* real image processing
* real video upload processing
* full location admin hierarchy
* ads/promotions
* notification delivery
* analytics
* PWA
* AI recommendations/search
* Google Maps API
* WhatsApp API

This phase may create data fields/placeholders needed later, but provider-backed features must remain setup-required or deferred.

---

## 7. Hard Role Rules

Claude must enforce:

```txt id="hard-role-rules"
Owner → can create property + requirement
Broker → can create property + requirement
Builder → can create project only
Guest → cannot create property/project/requirement
Admin/Staff → moderation later, not public creation as user unless explicitly impersonation-safe later
```

Forbidden:

* Owner posting project
* Broker posting project
* Builder posting normal property
* Guest creating listing
* Public direct API creating listing
* Client-only role protection
* Direct URL bypass
* Fake role override

Role checks must be server-side and RLS-backed.

---

## 8. Core Entity Statuses

Use consistent statuses.

### 8.1 Draft/Publishing Status

```txt id="entity-statuses"
draft
submitted
under_review
need_changes
approved
published
rejected
paused
expired
deleted
archived
```

### 8.2 Approval Status

```txt id="approval-statuses"
draft
pending
under_review
need_changes
approved
rejected
```

### 8.3 Visibility Status

```txt id="visibility-statuses"
private
public
hidden
paused
expired
deleted
```

Rules:

* draft is private to owner/uploader
* submitted/pending not public
* approved/published may be public
* rejected not public
* paused not public or clearly unavailable depending product rule
* deleted soft-deleted first
* expired hidden/noindex later
* public views must only include approved/published safe data

---

## 9. Property Categories And Types

Property must support these broad categories:

```txt id="property-categories"
residential
commercial
industrial
land_plot
pg_hostel_room
business
```

Property types may include:

### Residential

```txt id="residential-property-types"
flat_apartment
tenament
bungalow
villa
row_house
farm_house
penthouse
studio
independent_house
```

### Commercial

```txt id="commercial-property-types"
shop
office
showroom
commercial_land
commercial_building
co_working_space
warehouse_commercial
```

### Industrial

```txt id="industrial-property-types"
industrial_shed
factory
warehouse
industrial_land
industrial_plot
cold_storage
manufacturing_unit
```

### Land / Plot

```txt id="land-plot-property-types"
residential_plot
commercial_plot
industrial_plot
agricultural_land
non_agricultural_land
farm_land
open_land
```

### PG / Hostel / Room

```txt id="pg-hostel-room-types"
pg
hostel
room
shared_room
single_room
paying_guest
```

### Business

```txt id="business-property-types"
running_business
franchise
hotel_restaurant_business
shop_business
office_business
industrial_business
```

Do not include PG/hostel/room as project type.

---

## 10. Property Purposes

Property purposes:

```txt id="property-purposes"
sell
rent
lease
pg
business_sale
```

UI labels may include:

* Sell
* Rent
* Lease
* PG/Hostel
* Business Sale

Rules:

* purpose controls fields
* rent fields hidden for sell
* sale price hidden for pure rent
* PG fields only for PG/hostel/room category
* business fields only for business category

---

## 11. Property Common Fields

Suggested property fields:

* `id`
* `owner_profile_id`
* `created_by_profile_id`
* `public_role`
* `title`
* `slug`
* `purpose`
* `category`
* `property_type`
* `description`
* `price`
* `rent_amount`
* `deposit_amount`
* `maintenance_amount`
* `price_negotiable`
* `area_value`
* `area_unit`
* `built_up_area`
* `carpet_area`
* `plot_area`
* `land_area`
* `bedrooms`
* `bathrooms`
* `balconies`
* `floor_number`
* `total_floors`
* `furnishing_status`
* `property_age`
* `possession_status`
* `available_from`
* `ownership_type`
* `facing`
* `parking`
* `amenities`
* `country_id`
* `state_id`
* `district_id`
* `taluka_id`
* `city_id`
* `village_id`
* `area_id`
* `locality_id`
* `society_id`
* `building_name`
* `landmark`
* `address_line`
* `pin_code`
* `latitude`
* `longitude`
* `map_visibility`
* `contact_visibility`
* `status`
* `approval_status`
* `visibility_status`
* `admin_review_note`
* `rejection_reason`
* `need_changes_reason`
* `submitted_at`
* `approved_at`
* `published_at`
* `paused_at`
* `expires_at`
* `deleted_at`
* `created_at`
* `updated_at`

Actual schema may use JSON fields for dynamic attributes if documented.

---

## 12. Property Dynamic Field Rules

Show fields based on category/type.

Examples:

### Flat / Apartment

Required/important:

* BHK
* bathrooms
* balconies
* floor number
* total floors
* built-up area
* carpet area
* society/building
* furnishing
* parking
* lift
* amenities

### Bungalow / Villa / Row House

Required/important:

* plot area
* built-up area
* bedrooms
* bathrooms
* floors
* parking
* garden/open space
* road width if relevant
* furnishing

### Plot / Land

Required/important:

* plot area/land area
* dimensions
* road width
* NA/agriculture status
* boundary wall
* corner plot
* facing
* ownership/title type
* zoning where applicable

### Shop / Office / Showroom

Required/important:

* carpet/built-up area
* floor
* frontage
* road width
* parking
* washroom
* power load where applicable
* suitable business type

### Industrial Shed / Warehouse

Required/important:

* plot area
* built-up area
* height
* power load
* road access
* loading/unloading
* crane facility
* fire safety
* industrial estate/location

### PG / Hostel / Room

Required/important:

* room type
* occupancy
* food included
* gender allowed
* deposit
* monthly rent
* rules
* facilities
* available beds

### Business

Required/important:

* business type
* monthly revenue estimate if allowed
* asking price
* assets included
* lease/rent details
* staff count
* reason for sale
* license/compliance note

Do not force irrelevant fields.

Server validation must match dynamic form.

---

## 13. Project Categories And Types

Project categories:

```txt id="project-categories"
residential
commercial
industrial
land_plot
township
mixed_use
society
industrial_zone
```

Project types may include:

```txt id="project-types"
apartment_project
villa_project
plotting_project
commercial_project
industrial_project
township_project
mixed_use_project
society_project
industrial_zone_project
```

Forbidden project types:

```txt id="forbidden-project-types"
pg
hostel
room
paying_guest
single_room
shared_room
```

Builders only.

---

## 14. Project Purposes

Project purposes:

```txt id="project-purposes"
sell
rent
lease
```

Rules:

* project sell/rent allowed depending category
* project cannot be PG/hostel/room
* project contact visible to logged-in user according to later detail/contact rules
* project promotion/ads later require RERA checks where applicable

---

## 15. Project Common Fields

Suggested project fields:

* `id`
* `builder_profile_id`
* `created_by_profile_id`
* `project_name`
* `slug`
* `project_type`
* `category`
* `purpose`
* `short_description`
* `description`
* `price_min`
* `price_max`
* `price_visible`
* `total_area_value`
* `total_area_unit`
* `total_towers`
* `total_wings`
* `total_floors`
* `total_units`
* `available_units`
* `unit_configurations`
* `construction_status`
* `possession_date`
* `launch_date`
* `phase_name`
* `rera_registered`
* `rera_number`
* `rera_status`
* `rera_valid_until`
* `rera_disclaimer_required`
* `amenities`
* `specifications`
* `country_id`
* `state_id`
* `district_id`
* `taluka_id`
* `city_id`
* `village_id`
* `area_id`
* `locality_id`
* `society_id`
* `landmark`
* `address_line`
* `pin_code`
* `latitude`
* `longitude`
* `map_visibility`
* `status`
* `approval_status`
* `visibility_status`
* `admin_review_note`
* `rejection_reason`
* `need_changes_reason`
* `submitted_at`
* `approved_at`
* `published_at`
* `paused_at`
* `expires_at`
* `deleted_at`
* `created_at`
* `updated_at`

---

## 16. Project Unit Inventory Foundation

This phase may implement foundation tables or JSON fields.

Possible table:

```txt id="project-units-table"
project_units
```

Suggested fields:

* `id`
* `project_id`
* `wing_name`
* `tower_name`
* `floor_number`
* `unit_number`
* `unit_type`
* `bhk`
* `area_value`
* `area_unit`
* `carpet_area`
* `built_up_area`
* `price`
* `price_visible`
* `availability_status`
* `floor_plan_media_id`
* `created_at`
* `updated_at`

Availability statuses:

```txt id="unit-availability-statuses"
available
booked
sold
on_hold
not_released
hidden
```

Rules:

* no fake scarcity
* no fake sold/booked status
* builder owns project
* public unit display later only after approval
* unit data may be private until published

If not fully implemented, document as `PARTIAL`/`NOT_STARTED`.

---

## 17. Project Media Foundation Rules

This phase should prepare metadata/placeholders only unless media system already exists.

Project media rules:

* multiple images later
* one video max
* brochure PDF allowed
* floor plans allowed
* progress images later
* 360/Matterport/iframe URL later
* no fake upload success
* no public private media
* media storage setup-required until Prompt 10

Fields/foundation may include:

* cover media ID
* video media ID
* brochure media ID
* floor plan media IDs
* virtual tour URL
* media count
* media status

Do not implement real R2/CDN upload in this phase unless already completed.

---

## 18. Requirement Categories

Requirement categories should align with property/project search needs.

Requirement purposes:

```txt id="requirement-purposes"
buy
rent
lease
pg
business_buy
```

Requirement categories:

```txt id="requirement-categories"
residential
commercial
industrial
land_plot
pg_hostel_room
business
project
```

Rules:

* Owner/Broker can create requirements
* Builder may view matching buying requirements later
* Builder does not create buyer requirement unless future product explicitly allows
* requirement contact privacy enforced
* requirement may be public-safe or scoped depending product rule
* no hidden contact leak

---

## 19. Requirement Common Fields

Suggested requirement fields:

* `id`
* `created_by_profile_id`
* `public_role`
* `title`
* `slug`
* `purpose`
* `category`
* `requirement_type`
* `description`
* `budget_min`
* `budget_max`
* `rent_min`
* `rent_max`
* `area_min`
* `area_max`
* `area_unit`
* `bedrooms_min`
* `bedrooms_max`
* `preferred_floor`
* `furnishing_preference`
* `possession_timeline`
* `preferred_amenities`
* `country_id`
* `state_id`
* `district_id`
* `taluka_id`
* `city_id`
* `village_id`
* `area_id`
* `locality_id`
* `preferred_locations`
* `contact_visibility`
* `status`
* `approval_status`
* `visibility_status`
* `admin_review_note`
* `rejection_reason`
* `need_changes_reason`
* `submitted_at`
* `approved_at`
* `published_at`
* `paused_at`
* `expires_at`
* `deleted_at`
* `created_at`
* `updated_at`

---

## 20. Location Hierarchy Foundation

All entities should support Gujarat/India hierarchy.

Use fields or foreign keys for:

```txt id="location-hierarchy"
country
state
district
taluka
city_or_village
area
locality
society
building
landmark
address
pin_code
latitude
longitude
```

Rules:

* do not implement full location admin in this phase unless already available
* use existing location tables if present
* otherwise use safe nullable fields/string foundation and document future Prompt 11 work
* no fake map provider
* no fake IP city detection
* no huge location import without approval
* missing location request workflow later
* map provider setup-required if used

---

## 21. Contact Privacy Fields

Entities should have contact privacy foundation.

Possible contact visibility values:

```txt id="contact-visibility-values"
hidden
show_after_login
show_after_approval
show_to_verified_users
public
```

Rules:

* default should protect contact
* hidden contact not included in public-safe views
* contact reveal system later Prompt 08
* inquiry/contact action later must require auth
* no phone/email in public card/detail payload
* logged-in project contact behavior handled later detail/leads phase
* do not expose contact through metadata/schema

This phase should store visibility preference only, not reveal logic.

---

## 22. Form UX Requirements

Forms must be:

* mobile-first
* step-based if long
* role-aware
* type-aware
* purpose-aware
* save draft capable if feasible
* validation-driven
* server-validated
* clear required indicators
* loading state
* error state
* setup-required state for media/location provider gaps
* preview/submit flow where feasible
* no irrelevant fields
* no hidden required fields
* double-submit protected
* unsaved-change warning if feasible

If full step form is too large, implement safe first version and mark advanced UX `PARTIAL`.

---

## 23. Form Steps Recommendation

Property form steps:

```txt id="property-form-steps"
1. Purpose And Type
2. Location
3. Property Details
4. Pricing
5. Media Placeholder
6. Contact Visibility
7. Preview And Submit
```

Project form steps:

```txt id="project-form-steps"
1. Project Type
2. Location
3. Project Details
4. Units/Wings/Floors
5. RERA And Timeline
6. Media Placeholder
7. Preview And Submit
```

Requirement form steps:

```txt id="requirement-form-steps"
1. Requirement Type
2. Preferred Location
3. Budget And Area
4. Preferences
5. Contact Privacy
6. Preview And Submit
```

Use current UI conventions.

---

## 24. Validation Requirements

Validation must be server-side and client-side where possible.

Validate:

* role
* ownership
* title length
* slug safety
* purpose enum
* category enum
* type enum
* price/rent numeric ranges
* area numeric ranges
* location required fields
* status transitions
* media counts if implemented
* project one-video max if media implemented
* RERA fields format if provided
* contact visibility enum
* dynamic required fields
* no unsafe HTML/scripts
* no hidden contact in public fields if possible

Invalid data should not be saved as submitted/published.

---

## 25. Status Transition Rules

Allowed transitions:

```txt id="status-transitions"
draft → submitted
submitted → under_review
under_review → need_changes
under_review → approved
under_review → rejected
need_changes → submitted
approved → published
published → paused
paused → published
published → expired
published → deleted
draft → deleted
rejected → deleted
```

Rules:

* normal user can create draft
* normal user can submit own draft
* normal user can edit own draft
* editing published/approved item should create approval-needed state or mark pending review
* normal user cannot approve own item
* admin/staff approval later
* pause/resume by owner/uploader does not require approval
* delete should soft delete
* hard delete only later Super Admin/retention

---

## 26. Approval Workflow Foundation

For each entity:

* user creates draft
* user submits
* status becomes submitted/pending
* item not public until approved
* admin/staff later reviews
* need changes stores reason
* rejected stores reason
* approved/published stores timestamp/staff later
* edit after approval triggers review if significant
* pause/resume allowed without reapproval
* delete soft-deletes

Full admin UI in Prompt 07.

This phase may create admin moderation queue placeholders/fields.

---

## 27. Slug Rules

Slug rules:

* unique per entity type
* generated from title/project name
* safe characters only
* avoid exposing private data
* collision handled
* stable after publish if possible
* changing slug later creates redirect in SEO phase
* draft can have temporary slug

Do not include phone/email/private address in slug.

---

## 28. Public-Safe Views

Create public-safe views for published entities.

Possible views:

```txt id="public-safe-views"
public_properties_view
public_projects_view
public_requirements_view
```

Public-safe views must include only approved/published safe fields.

Exclude:

* contact phone
* contact email
* hidden address details
* private owner profile fields
* draft/pending/rejected/paused/deleted items
* admin notes
* rejection reasons
* private media
* billing/plan data
* internal moderation fields
* exact private location if hidden
* private documents

If requirements are not intended fully public, use scoped public-safe view or no public view.

---

## 29. RLS Requirements

RLS must enforce:

### Properties

* owner/broker can create own property
* builder cannot create property
* user can read/update own property
* public can read only published public-safe view
* wrong user cannot update/delete
* admin/staff moderation later permission-scoped
* deleted/private rows hidden

### Projects

* builder can create own project
* owner/broker cannot create project
* builder can read/update own project
* public can read only published public-safe view
* wrong builder cannot update/delete
* admin/staff moderation later permission-scoped

### Requirements

* owner/broker can create own requirement
* builder cannot create requirement unless explicitly allowed later
* user can read/update own requirement
* public/scoped view only approved safe data
* wrong user cannot update/delete
* matching access later role-scoped

### Supporting Tables

* project units scoped to builder/project owner
* media metadata scoped to owner/entity
* moderation notes private
* RLS enabled on private tables

Frontend checks are not security.

---

## 30. Permission Helper Requirements

Add/update helpers:

```txt id="permission-helper-requirements"
canCreateProperty(profile)
canCreateProject(profile)
canCreateRequirement(profile)
canEditProperty(profile, property)
canEditProject(profile, project)
canEditRequirement(profile, requirement)
canSubmitForApproval(profile, entity)
canPauseResume(profile, entity)
canSoftDelete(profile, entity)
```

Rules:

* server-side use required
* helpers must match docs
* invalid role denied
* direct URL/API bypass denied

---

## 31. Routes To Implement Or Prepare

Use existing route conventions.

Possible routes:

```txt id="entity-routes"
dashboard/properties
dashboard/properties/new
dashboard/properties/[id]/edit
dashboard/projects
dashboard/projects/new
dashboard/projects/[id]/edit
dashboard/requirements
dashboard/requirements/new
dashboard/requirements/[id]/edit
```

Role-specific route alternatives are fine:

```txt id="role-specific-routes"
dashboard/owner/properties
dashboard/broker/properties
dashboard/builder/projects
dashboard/owner/requirements
dashboard/broker/requirements
```

Rules:

* guest denied
* wrong role denied
* builder property routes denied
* owner/broker project routes denied
* forms mobile-friendly
* placeholder dashboard routes safe if full dashboard later

---

## 32. Server Actions / API Routes

Implement safe server functions for:

* create property draft
* update property draft
* submit property
* pause/resume property
* soft delete property
* create project draft
* update project draft
* submit project
* pause/resume project
* soft delete project
* create requirement draft
* update requirement draft
* submit requirement
* pause/resume requirement
* soft delete requirement

Each must:

* require auth
* check role
* validate input
* check ownership
* check status transition
* use server-side DB access
* return safe typed errors
* not expose private data
* audit if audit table exists
* update timestamps

---

## 33. Subscription/Billing Gate Placeholder

Later billing phase requires active plan before posting.

For this phase:

* create plan gate hook/helper placeholder if useful
* do not implement Razorpay
* if no subscription system, mark posting gate `PARTIAL` or `SETUP_REQUIRED`
* show disabled/upgrade placeholder only if product wants gate visible
* do not fake active plan
* do not fake payment success

If product requires plan before posting immediately, implement safe placeholder:

* check plan helper returns setup-required/not implemented
* allow dev/admin override only if documented
* do not block core schema if billing not ready unless user requires

---

## 34. Verification Gate Placeholder

Verification may be required for certain actions later.

For this phase:

* include verification status fields
* do not fake verified
* do not show verified badge
* do not block all creation unless product requires
* document verification gate later
* RERA gate later for promotion/ads

---

## 35. RERA Foundation Rules

For projects:

* RERA registered yes/no
* RERA number field
* RERA status
* RERA valid until
* disclaimer flag
* RERA proof media later private
* RERA required for promotion/ads later if applicable

Rules:

* no fake RERA status
* no fake verified RERA badge
* no public proof document
* user should verify official RERA independently
* admin verification later

---

## 36. Media Placeholder Rules

Media system comes later, but forms may show placeholders.

Allowed:

* media section UI saying upload will be configured in media phase
* local file input disabled/setup-required if storage not ready
* media metadata fields if needed
* cover image placeholder if no upload

Not allowed:

* fake uploaded images
* fake brochure link
* fake video upload
* fake R2/CDN URL
* private file public URL
* project multiple videos beyond one-video rule

If media upload already exists, enforce:

* type validation
* ownership
* project one-video max
* private/public storage rules
* no fake success

---

## 37. Location Placeholder Rules

Location system full hierarchy later Prompt 11.

This phase should:

* collect basic location fields
* use existing city/locality data if available
* validate required location fields
* not fake map
* not fake nearby
* not fake IP location
* not require maps API
* keep data model ready for hierarchy

If location backend missing:

* use text/select foundation
* mark location hierarchy `PARTIAL`
* update docs

---

## 38. Dashboard Management Foundation

Entity management pages should show real own data only.

Allowed:

* “My Properties”
* “My Projects”
* “My Requirements”
* draft/pending/published status
* edit
* submit
* pause/resume
* delete
* create new
* empty state

Not allowed:

* fake counts
* fake analytics
* fake leads
* fake views
* fake approval
* wrong-user items
* hidden contact leak

If dashboard shell not complete, use safe foundation pages.

---

## 39. Public Detail/Search Dependency

Do not build full public detail/search in this phase.

However:

* public-safe views should support later search/detail
* slugs should be ready
* statuses should be ready
* no private fields in public-safe view
* `/search` may still show placeholder until Prompt 05
* detail pages may be placeholder or not created

Do not show public unpublished items.

---

## 40. Admin Moderation Dependency

Do not build full admin moderation UI unless already present.

But schema should support:

* approval status
* submitted timestamp
* review note
* need changes reason
* rejection reason
* approved by staff ID later
* approved timestamp
* moderation audit later

Admin moderation implemented in Prompt 07.

---

## 41. Audit Event Requirements

If audit foundation exists, log:

* property created
* property updated
* property submitted
* property paused/resumed
* property deleted
* project created
* project updated
* project submitted
* project paused/resumed
* project deleted
* requirement created
* requirement updated
* requirement submitted
* requirement paused/resumed
* requirement deleted

No private contact/secrets in logs.

If audit not implemented, document `PARTIAL`.

---

## 42. Security And Privacy Rules

Must protect:

* private profile data
* hidden contact
* draft/pending/rejected listings
* private addresses
* admin notes
* moderation reasons
* media placeholders/private media
* builder project internal data
* requirement contact details

Must not:

* expose hidden phone/email
* show private fields in public view
* allow wrong role creation
* allow wrong owner update
* publish without approval
* show fake approval
* show fake verification
* show fake RERA

---

## 43. Input Sanitization

Sanitize and validate text fields:

* title
* description
* address
* landmark
* building name
* business details
* amenities/custom fields
* admin notes if any

Prevent:

* unsafe HTML
* script injection
* malicious URLs
* contact info placed in public fields if product wants contact hidden
* spammy content where possible

If contact details in description are not allowed, validate or flag for moderation.

---

## 44. Error Handling

Use safe errors:

```txt id="safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
VALIDATION_ERROR
ENTITY_NOT_FOUND
INVALID_STATUS_TRANSITION
APPROVAL_REQUIRED
SETUP_REQUIRED
MEDIA_PROVIDER_SETUP_REQUIRED
LOCATION_DATA_SETUP_REQUIRED
SUBSCRIPTION_GATE_SETUP_REQUIRED
UNKNOWN_ERROR
```

Do not expose:

* SQL errors
* stack traces
* service role errors
* provider secrets
* private data

---

## 45. UI States Required

Every form/list page should include:

* loading
* empty
* validation error
* server error
* unauthorized
* forbidden/wrong role
* setup-required
* draft saved
* submitting
* submitted for approval
* need changes
* rejected
* paused
* deleted

No blank broken page.

---

## 46. Responsive Requirements

Forms and management pages must work at:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Check:

* no horizontal scroll
* form fields stack
* buttons tappable
* stepper usable
* dropdowns not clipped
* sticky submit not covering fields
* tables become cards
* status badges readable
* delete/submit actions not too close accidentally

Full manual verification prompt will test these.

---

## 47. Accessibility Requirements

Forms must have:

* labels
* required indicators
* helper text
* error text
* keyboard navigation
* focus visible
* readable contrast
* accessible status badges
* aria labels for icon buttons
* large tap targets
* confirm dialogs for destructive actions

---

## 48. Performance Requirements

Implementation must avoid:

* unbounded reads
* huge dashboard lists
* loading all entities without pagination
* N+1 profile/entity queries
* heavy client bundles
* loading maps/media providers
* fake analytics
* full location hierarchy load at once

Add indexes and pagination foundation.

---

## 49. Migration Requirements

If DB changes are made, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_property_project_requirement_system.sql
```

Migration must include:

* purpose
* phase: Prompt 04
* tables created/changed
* views created/changed
* RLS policies
* indexes
* functions/triggers if any
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 50. Suggested Tables

Possible tables:

```txt id="suggested-tables"
properties
projects
project_units
requirements
entity_media_links
entity_status_events
entity_moderation_notes
```

Use existing project conventions.

Do not create duplicate tables if existing equivalents exist.

---

## 51. Suggested Indexes

Add indexes for:

### Properties

* owner profile
* status
* approval status
* visibility status
* city/locality
* purpose
* category
* property type
* price/rent
* created/published date
* slug
* deleted_at

### Projects

* builder profile
* status
* approval status
* visibility status
* city/locality
* category
* project type
* purpose
* RERA status
* possession date
* slug
* deleted_at

### Requirements

* created by profile
* status
* approval status
* city/locality
* purpose
* category
* budget
* created date
* expiry date

### Project Units

* project ID
* unit type
* availability status
* floor/wing/tower

---

## 52. RLS Test Expectations

Implementation should allow these tests later:

* guest cannot insert property/project/requirement
* owner can insert property
* owner can insert requirement
* owner cannot insert project
* broker can insert property
* broker can insert requirement
* broker cannot insert project
* builder can insert project
* builder cannot insert property
* builder cannot insert requirement unless product later changes
* user can update own draft
* user cannot update another user’s entity
* user cannot approve own entity
* public can read only published public-safe views
* public cannot read draft/pending/rejected/private rows
* admin/staff future moderation permission scoped

---

## 53. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* migration validation
* RLS tests
* form validation tests
* server action tests
* route guard tests

If script missing, document `NOT_CONFIGURED`.

If check fails, fix or log bug.

Do not mark PASS from implementation prompt alone.

---

## 54. Manual Smoke Checks If App Runs

If app can run, check:

* guest cannot access new forms
* owner can access property form
* owner can access requirement form
* owner denied project form
* broker can access property form
* broker can access requirement form
* broker denied project form
* builder can access project form
* builder denied property form
* builder denied requirement form
* form validation works
* save draft works if implemented
* submit for approval works if implemented
* own list shows own drafts only
* wrong user cannot edit direct URL
* no fake data
* no hidden contact public

Record results.

Full verification in matching manual prompt.

---

## 55. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Provider statuses likely:

* Supabase Database/RLS: updated if migrations applied
* Media storage/R2: `SETUP_REQUIRED` or `NOT_STARTED`
* Location provider/maps: `SETUP_REQUIRED` or `NOT_STARTED`
* Notification provider: `NOT_STARTED`
* Billing/Razorpay: `SETUP_REQUIRED` or `NOT_STARTED`

Do not mark provider active without testing.

---

## 56. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* property schema
* property form
* property role gate
* property draft
* property submit approval
* property pause/resume
* property soft delete
* project schema
* project form
* builder-only project gate
* project unit inventory foundation
* project RERA foundation
* project media placeholder
* project one-video rule foundation
* requirement schema
* requirement form
* requirement role gate
* requirement draft
* requirement submit approval
* location fields foundation
* contact visibility foundation
* public-safe property view
* public-safe project view
* requirement scoped/public-safe view
* RLS entity policies
* status transitions
* dashboard management foundation
* moderation foundation
* validation schemas
* setup-required media/location states

Use accurate statuses.

---

## 57. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 04
* summary
* changed files
* migration files
* RLS changes
* new routes
* provider status changes
* docs updated
* tests/checks run
* known issues
* rollback notes
* manual verification pending

---

## 58. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* wrong role can create entity
* guest can access form
* builder can create property
* owner/broker can create project
* wrong user can edit entity
* public can read draft
* public view leaks contact
* status transition invalid
* fake media upload
* fake RERA badge
* form validation missing
* mobile form broken
* build/typecheck failure
* migration missing
* RLS missing
* no rollback notes
* route dead
* duplicate entity tables

---

## 59. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 04 implementation status
* manual verification pending:

  * `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
* routes/forms needing verification
* RLS tests pending
* responsive tests pending
* setup-required providers
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 60. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* property RLS
* project RLS
* requirement RLS
* public-safe views
* role gate checks
* wrong owner denial
* hidden contact protection
* draft/pending public denial
* media placeholder safety
* RERA no-fake rule
* direct URL tests pending
* known issues

---

## 61. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* entity indexes
* pagination foundation
* dashboard list performance
* public-safe view performance
* no unbounded reads
* media provider not loaded
* maps provider not loaded
* build status
* future load test notes

---

## 62. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* migration path
* affected tables
* affected RLS policies
* backup requirement
* rollback notes
* route/component rollback
* feature flags/setup states
* data risk
* post-deploy verification checklist

DB migration rollback notes are mandatory.

---

## 63. Brain Update

Update `brain.md`.

Include:

* Prompt 04 implementation summary
* changed files
* migration files
* tables/views/policies created
* routes/forms created
* role gate status
* RLS status
* setup-required providers
* bugs/blockers
* checks run
* next prompt:

  * `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
* exact resume instruction

---

## 64. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/dashboard/properties/*
src/app/dashboard/projects/*
src/app/dashboard/requirements/*
src/app/dashboard/owner/properties/*
src/app/dashboard/broker/properties/*
src/app/dashboard/builder/projects/*
src/components/forms/PropertyForm.tsx
src/components/forms/ProjectForm.tsx
src/components/forms/RequirementForm.tsx
src/components/property/*
src/components/project/*
src/components/requirement/*
src/lib/validators/property.ts
src/lib/validators/project.ts
src/lib/validators/requirement.ts
src/lib/permissions/entity-permissions.ts
src/lib/actions/properties.ts
src/lib/actions/projects.ts
src/lib/actions/requirements.ts
src/types/entities.ts
supabase/migrations/*_property_project_requirement_system.sql
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
```

Actual paths may differ.

Only change needed files.

---

## 65. Expected Output From This Phase

At the end of Prompt 04 implementation, project should have:

* property creation foundation
* project creation foundation
* requirement creation foundation
* role gates
* validation schemas
* status workflows
* RLS policies
* public-safe views
* dashboard management foundation
* media/location placeholders
* contact visibility foundation
* docs updated
* checks run
* manual verification pending

---

## 66. Forbidden Outcomes

This phase must not leave:

* guest entity creation
* builder property creation
* owner/broker project creation
* wrong-user edit access
* public draft/pending rows
* hidden contact public
* fake approval
* fake listing data
* fake project data
* fake requirement data
* fake RERA badge
* fake upload success
* fake analytics/leads/views
* DB changes without migration
* RLS disabled
* no rollback notes
* build failure ignored
* docs outdated
* manual verification skipped

---

## 67. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* forms foundation created but advanced stepper partial
* media/location provider setup-required
* admin approval UI deferred
* RLS written but runtime test pending
* some entity types dynamic fields deferred but documented
* billing/plan gate placeholder only
* responsive verification pending

### `FAIL`

Use if:

* build fails
* RLS missing on private tables
* wrong role creation allowed
* public can read drafts/private rows
* hidden contact leaks
* fake data appears as real
* migration missing for DB changes
* service role exposed

### `BLOCKED`

Use if:

* Prompt 02 auth/RLS foundation failed
* Supabase setup prevents all meaningful DB work
* architecture conflict needs owner decision
* cannot inspect current code
* package/build baseline broken

### `SETUP_REQUIRED`

Use for:

* Supabase DB/env missing
* media storage missing
* location data missing
* billing provider missing
* maps provider missing
* notification provider missing

---

## 68. Final Response Required Format

Return final response in this structure:

```txt id="prompt-04-final-response-format"
Summary:
- what property/project/requirement foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Entities implemented:
- properties:
- projects:
- project units:
- requirements:

Role gates:
- owner:
- broker:
- builder:
- guest:
- admin/staff:

Forms/UI:
- property form:
- project form:
- requirement form:
- dashboard management:

RLS/Security:
- tables:
- policies:
- public-safe views:
- hidden contact:
- wrong owner/role protection:

Provider/setup-required:
- media:
- location:
- billing:
- maps:
- notifications:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- RLS:
- routes:

Manual verification:
- pending prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md

Next step:
- run prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

Do not say only “done”.

---

## 69. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

Do not start Prompt 05 until Prompt 04 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 70. Common Bugs To Watch For

Create/track bugs for:

* `BUG-ENTITY-GUEST-CREATE`
* `BUG-ENTITY-BUILDER-CREATE-PROPERTY`
* `BUG-ENTITY-OWNER-CREATE-PROJECT`
* `BUG-ENTITY-BROKER-CREATE-PROJECT`
* `BUG-ENTITY-WRONG-USER-EDIT`
* `BUG-ENTITY-PUBLIC-DRAFT-LEAK`
* `BUG-ENTITY-HIDDEN-CONTACT-LEAK`
* `BUG-ENTITY-FAKE-APPROVAL`
* `BUG-ENTITY-FAKE-RERA`
* `BUG-ENTITY-FAKE-MEDIA-UPLOAD`
* `BUG-ENTITY-INVALID-STATUS-TRANSITION`
* `BUG-ENTITY-FORM-VALIDATION-MISSING`
* `BUG-ENTITY-MOBILE-FORM-BROKEN`
* `BUG-ENTITY-RLS-MISSING`
* `BUG-ENTITY-MIGRATION-MISSING`
* `BUG-ENTITY-PUBLIC-SAFE-VIEW-LEAK`
* `BUG-ENTITY-BUILD-FAIL`
* `BUG-ENTITY-DUPLICATE-TABLES`
* `BUG-ENTITY-ROLLBACK-MISSING`

Use existing bug ID convention if available.

---

## 71. Quality Bar

This phase is successful when future phases can safely rely on:

* real entity tables
* role-gated creation
* draft/submission workflow
* approval-needed statuses
* public-safe views
* RLS protection
* own dashboard management foundation
* no public draft leak
* no hidden contact leak
* no fake listing/project/requirement data
* no fake media/RERA/approval
* docs accurately updated
* rollback documented
* verification prompt ready

---

## 72. Final Rule For Prompt 04

Implement the core marketplace entity foundation safely.

Owner and Broker can create property and requirement.

Builder can create project only.

Guests cannot create entities.

Public cannot see draft/pending/rejected/private entities.

Hidden contact must not leak.

Dynamic forms must hide irrelevant fields.

RLS must protect private tables.

DB changes require migrations.

Approval workflow must be real status-based.

Media/location/provider gaps must be setup-required, not fake.

Do not fake listings.

Do not fake projects.

Do not fake requirements.

Do not fake RERA.

Do not fake upload success.

Do not fake approval.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
