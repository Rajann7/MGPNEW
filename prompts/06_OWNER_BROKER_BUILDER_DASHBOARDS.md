# prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md

# My Gujarat Property — Prompt 06: Owner, Broker And Builder Dashboards

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 6 (owner), 7 (broker + CRM Kanban), 8 (builder + agents/ads)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-06/07/08.md`, and `docs/05` "Design Add-Ons". Locked: bottom nav Home·Search·Post(FAB)·Leads·Profile; drawer = full module list; Kanban desktop-only; "For client" broker requirements; featured/ad-wallet/seats meters.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

This phase implements the authenticated public-user dashboard layer for:

* Owner
* Broker / Agent
* Builder / Developer

This phase must respect all existing auth, role, RLS, entity and public-safe rules.

Do not build admin/staff dashboard here.

Do not fake dashboard stats.

Do not fake leads.

Do not fake analytics.

Do not fake billing/payment.

Do not fake notifications.

Do not fake verification.

Do not expose hidden contact.

Do not allow wrong-role dashboard access.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
Prompt Number: 06
Phase: Owner, Broker And Builder Dashboards
Type: Implementation Prompt
Matching Verification Prompt: prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
Previous Verification Prompt: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement secure, useful, role-aware dashboards for authenticated public users.

This phase should implement:

* dashboard shell
* role-aware navigation
* owner dashboard
* broker dashboard
* builder dashboard
* dashboard overview pages
* entity management links
* property/project/requirement management cards
* profile/settings pages
* verification section placeholder/foundation
* billing/subscription placeholder/foundation
* leads/CRM placeholder/foundation
* notifications center foundation
* support/help/ticket entry foundation
* saved items/recently viewed placeholder/foundation
* analytics widgets using real data only
* no fake stats
* no fake counts
* no fake leads
* no fake payment/billing
* no fake verification
* route guards
* RLS-safe data loading
* responsive dashboard UI
* docs updates
* tests/checks
* handoff to manual verification prompt

Dashboards should make all major modules reachable, but unfinished modules must show safe `SETUP_REQUIRED`, `COMING_SOON`, `NOT_STARTED` or `NO_DATA` states instead of fake data.

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
prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect existing dashboard/layout/auth/entity code.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/dashboard/
app/dashboard/
src/app/dashboard/owner/
app/dashboard/owner/
src/app/dashboard/broker/
app/dashboard/broker/
src/app/dashboard/builder/
app/dashboard/builder/
src/components/dashboard/
components/dashboard/
src/components/layout/
components/layout/
src/components/auth/
components/auth/
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
src/lib/actions/
lib/actions/
src/lib/dashboard/
lib/dashboard/
src/lib/supabase/
lib/supabase/
src/types/
types/
supabase/migrations/
```

Search for existing:

* dashboard shell
* owner dashboard
* broker dashboard
* builder dashboard
* sidebar
* mobile bottom nav
* dashboard cards
* property/project/requirement management pages
* profile/settings pages
* notification components
* billing placeholders
* verification placeholders
* support/help routes
* analytics widgets
* fake data
* fake counts
* fake leads
* public footer inside dashboard
* wrong role access
* RLS bypass

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Shared Dashboard Shell

* authenticated dashboard layout
* role-aware sidebar/topbar/mobile nav
* dashboard header
* profile menu
* logout
* notification bell/center foundation
* support/help entry
* settings link
* responsive dashboard layout
* no public footer in dashboard
* no admin/staff links

### 5.2 Owner Dashboard

* owner overview
* my properties
* my requirements
* saved items placeholder
* inquiries/leads placeholder
* billing placeholder
* verification/profile section
* notifications
* support/help
* settings/profile

### 5.3 Broker Dashboard

* broker overview
* my properties
* my requirements
* leads/CRM placeholder
* proposals placeholder
* saved items placeholder
* billing placeholder
* verification/profile section
* notifications
* support/help
* settings/profile

### 5.4 Builder Dashboard

* builder overview
* my projects
* project leads placeholder
* matching requirements placeholder
* ads/promotions placeholder
* agents/team placeholder
* billing placeholder
* verification/RERA section
* notifications
* support/help
* settings/profile

### 5.5 Dashboard Data

* real counts only
* real own entity data only
* no fake analytics
* no fake leads
* no fake notifications
* no fake billing
* no fake verification

### 5.6 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not implement full:

* admin/staff dashboard
* full admin moderation
* full leads/CRM/messages
* full billing/payment/Razorpay
* full media upload/R2/CDN
* full ads/promotions workflow
* full notification delivery
* full support ticket system
* full verification workflow
* full analytics dashboard
* full saved items/recently viewed sync
* full builder agents/team permissions
* full CMS/blog/legal
* advanced PWA/offline

This phase can create clickable placeholders/foundations for these modules.

---

## 7. Hard Role Access Rules

Dashboard access must be role-specific.

```txt id="role-dashboard-rules"
Owner → /dashboard/owner
Broker → /dashboard/broker
Builder → /dashboard/builder
Guest → denied/login required
Admin/Staff → separate internal admin routes, not public dashboard
```

Rules:

* owner cannot access broker dashboard
* owner cannot access builder dashboard
* broker cannot access owner dashboard
* broker cannot access builder dashboard
* builder cannot access owner dashboard
* builder cannot access broker dashboard
* public user cannot access admin/staff
* admin/staff should not be shown public dashboard links
* direct URL bypass must be denied server-side

Client-only hiding is not security.

---

## 8. Dashboard Route Structure

Use existing conventions.

Possible shared routes:

```txt id="dashboard-routes-shared"
/dashboard
/dashboard/profile
/dashboard/settings
/dashboard/notifications
/dashboard/support
/dashboard/billing
/dashboard/verification
```

Possible owner routes:

```txt id="owner-dashboard-routes"
/dashboard/owner
/dashboard/owner/properties
/dashboard/owner/properties/new
/dashboard/owner/requirements
/dashboard/owner/requirements/new
/dashboard/owner/leads
/dashboard/owner/saved
/dashboard/owner/billing
/dashboard/owner/verification
/dashboard/owner/settings
/dashboard/owner/support
```

Possible broker routes:

```txt id="broker-dashboard-routes"
/dashboard/broker
/dashboard/broker/properties
/dashboard/broker/properties/new
/dashboard/broker/requirements
/dashboard/broker/requirements/new
/dashboard/broker/leads
/dashboard/broker/crm
/dashboard/broker/proposals
/dashboard/broker/saved
/dashboard/broker/billing
/dashboard/broker/verification
/dashboard/broker/settings
/dashboard/broker/support
```

Possible builder routes:

```txt id="builder-dashboard-routes"
/dashboard/builder
/dashboard/builder/projects
/dashboard/builder/projects/new
/dashboard/builder/leads
/dashboard/builder/requirements
/dashboard/builder/ads
/dashboard/builder/agents
/dashboard/builder/billing
/dashboard/builder/verification
/dashboard/builder/settings
/dashboard/builder/support
```

Do not create duplicate/conflicting routes if existing route structure differs.

---

## 9. Dashboard Redirect Rules

Route `/dashboard` should redirect based on authenticated public role:

```txt id="dashboard-redirect-rules"
owner → /dashboard/owner
broker → /dashboard/broker
builder → /dashboard/builder
guest → login/auth
admin/staff → internal admin route or unauthorized, depending auth separation
unknown role → unauthorized/setup-required
suspended/banned → restricted state
```

Redirect must be server-side or safely guarded.

Avoid redirect loops.

---

## 10. Shared Dashboard Shell Requirements

Dashboard shell should include:

* role-aware sidebar/topbar
* mobile-friendly navigation
* current role label
* profile menu
* logout
* notification entry
* support/help entry
* settings link
* main content area
* loading state
* unauthorized state
* setup-required state
* no public footer
* no public admin link
* no fake data

Shell must not expose:

* private fields to wrong user
* admin/staff links
* service role/provider secrets
* hidden contact
* fake counts

---

## 11. Mobile Dashboard Navigation

Mobile dashboard must support:

* bottom nav or drawer
* role-specific nav items
* no horizontal scroll
* large tap targets
* sticky nav not covering content
* current page highlight
* profile/logout accessible
* support/help accessible
* create/post CTA accessible
* no admin link
* no clutter

Tables should become cards on mobile.

---

## 12. Owner Dashboard Requirements

Owner dashboard overview may show real-only data:

* my properties count
* my requirements count
* pending approval count
* published count
* paused count
* saved items count if implemented
* inquiries/leads count if implemented
* billing status if implemented/setup-required
* verification status if implemented

If data is not implemented:

* show no data/setup-required/coming later
* do not fake count

Owner modules:

```txt id="owner-modules"
Overview
My Properties
Post Property
My Requirements
Post Requirement
Inquiries / Leads
Saved Items
Recently Viewed
Notifications
Billing / Plan
Verification
Profile
Settings
Support / Help
```

Owner must not see:

* project posting as allowed action
* builder ads module as active
* broker CRM as active unless future role change
* admin modules

---

## 13. Broker Dashboard Requirements

Broker dashboard overview may show real-only data:

* my properties count
* my requirements count
* pending approval count
* published count
* paused count
* leads count if implemented
* CRM follow-ups if implemented
* proposal count if implemented
* billing status if implemented/setup-required
* verification status if implemented

Broker modules:

```txt id="broker-modules"
Overview
My Properties
Post Property
My Requirements
Post Requirement
Leads / CRM
Proposals
Saved Items
Recently Viewed
Notifications
Billing / Plan
Verification
Public Profile
Profile
Settings
Support / Help
```

Broker must not see:

* project posting as allowed action
* builder agents/team as active
* admin modules

---

## 14. Builder Dashboard Requirements

Builder dashboard overview may show real-only data:

* my projects count
* pending approval projects count
* published projects count
* paused projects count
* project leads count if implemented
* matching requirements count if implemented
* ads count if implemented
* agents count if implemented
* billing status if implemented/setup-required
* verification/RERA status if implemented

Builder modules:

```txt id="builder-modules"
Overview
My Projects
Post Project
Project Leads
Matching Requirements
Ads / Promotions
Agents / Team
Notifications
Billing / Plan
Verification / RERA
Public Profile
Profile
Settings
Support / Help
```

Builder must not see:

* normal property posting as allowed action
* owner/broker requirement posting as active unless product later approves
* admin modules

---

## 15. Entity Management Requirements

Dashboards should link to entity management pages from Prompt 04.

### Owner

* view own properties
* create property
* edit own property
* submit for approval
* pause/resume own property
* soft delete own property
* view own requirements
* create requirement
* edit/submit/pause/delete own requirement

### Broker

* view own properties
* create property
* edit/submit/pause/delete own property
* view own requirements
* create requirement
* edit/submit/pause/delete own requirement

### Builder

* view own projects
* create project
* edit/submit/pause/delete own project
* project units foundation if implemented

Rules:

* only own data
* real statuses
* no fake rows
* pagination foundation
* mobile cards
* safe empty states

---

## 16. Dashboard Overview Cards

Overview cards can show:

* real own property/project/requirement counts
* real status counts
* setup-required provider states
* upcoming module placeholders
* verification status
* billing setup-required
* support link

Must not show:

* fake views
* fake leads
* fake inquiries
* fake revenue
* fake conversion rate
* fake plan active
* fake verification
* fake notification count
* fake charts
* fake analytics

If metric is not implemented, show:

```txt id="safe-metric-states"
No data yet
Coming in later phase
Setup required
Not configured
```

---

## 17. Analytics Widget Rules

Analytics must be real only.

Allowed if real data exists:

* property count
* project count
* requirement count
* pending approval count
* published count
* paused count
* draft count
* profile completeness percentage if computed from real fields
* plan usage if real billing/limit data exists

Not allowed unless implemented and verified:

* views
* impressions
* leads
* conversions
* revenue
* click-through rate
* inquiries
* proposal acceptance
* ad performance
* traffic chart

If analytics provider/table missing, do not show fake chart.

---

## 18. Leads/CRM Placeholder Rules

Full leads/CRM is Prompt 08.

In this phase:

* link/module can exist
* page can show setup/coming-soon/no-data state
* no fake leads
* no fake CRM pipeline
* no fake follow-ups
* no fake unread lead count
* no fake inquiry success
* no hidden contact reveal

If real leads tables already exist, show real own data only.

---

## 19. Billing/Plan Placeholder Rules

Full billing/payment is Prompt 09.

In this phase:

* billing module can exist
* show setup-required/not configured
* show current plan only if real
* show invoice/payment history only if real
* no fake active plan
* no fake invoice
* no fake payment success
* no fake Razorpay state
* no fake trial/coupon
* no posting gate fake pass

If billing is not implemented, mark `SETUP_REQUIRED` or `NOT_STARTED`.

---

## 20. Verification Placeholder Rules

Full verification workflow may be later/admin dependent.

In this phase:

* show real verification status from profile if available
* show request verification CTA placeholder if workflow not implemented
* no fake verified badge
* no fake document approval
* no fake RERA verification
* no legal guarantee
* show disclaimer that verification is not legal guarantee
* builder verification/RERA section separate

If verification status is `verified`, ensure it is real DB status.

---

## 21. Notification Foundation Rules

Full notifications are Prompt 12.

In this phase:

* notification entry can exist
* unread badge only if real DB-backed count exists
* empty/no-data state if not implemented
* setup-required state if provider missing
* no fake notifications
* no fake unread count
* no private data leak
* role-specific deep links only if routes exist

If notification table not implemented, hide badge or show no-data/setup.

---

## 22. Support / Help Foundation

Dashboard must include support/help entry.

Allowed:

* link to support/help page if exists
* support placeholder page
* setup-required ticket system
* help content placeholder
* contact/admin support safe text

Not allowed:

* fake ticket submission
* fake support replies
* fake SLA
* hidden contact leak
* personal support number unless approved public support contact

Full support ticket system later.

---

## 23. Saved Items / Recently Viewed Placeholder

Full saved/recently viewed system later.

In this phase:

* module can exist
* show empty/setup-required state
* no fake saved items
* no fake recently viewed
* no fake local sync
* guest saved data not shown in dashboard unless synced
* future login sync documented

---

## 24. Profile And Settings Requirements

Dashboard should allow profile/settings foundation.

Profile/settings may include:

* full name
* display name
* avatar placeholder
* email
* mobile
* role label
* city/location preference
* language preference
* notification preferences placeholder
* privacy settings placeholder
* theme preference if implemented
* logout
* account status

Rules:

* user can edit own safe fields
* role cannot be directly changed without request workflow
* email/mobile verification status must be real
* profile image upload setup-required if media not ready
* no private profile shown publicly
* no role escalation

---

## 25. Role Change Request Foundation

If implemented from Prompt 02 or now:

* user can request role change
* warning shown
* admin approval required
* user cannot directly change role
* request status shown
* no fake approval
* no auto-upgrade to builder/broker without approval

If not implemented, show setup/coming-soon.

---

## 26. Builder Agents / Team Placeholder

Full agents/team permissions may be later.

Builder dashboard may include:

* Agents/Team module card
* setup-required/coming-soon page
* no fake agents
* no fake permissions
* no fake invite sent
* no provider email fake
* no public access

If implemented partially:

* builder owns team
* invite requires email provider or setup-required
* permissions server-side
* no service role client exposure

---

## 27. Ads / Promotions Placeholder

Full ads/promotions are Prompt 12.

Builder dashboard may include:

* Ads/Promotions card
* select project later
* setup-required/coming-soon state
* no fake ad banners
* no fake impressions/clicks
* no fake active ad
* no fake payment
* no fake sponsored placement
* RERA/disclaimer note

If real ads not implemented, do not show active ads.

---

## 28. Public Profile Link Rules

Broker/builder dashboards may link to public profile pages from Prompt 05.

Rules:

* link only if slug/profile exists
* public profile shows safe data only
* if profile incomplete/thin/noindex, show setup/profile incomplete
* no private mobile/email
* no fake verified badge
* owner dashboard should not create public owner profile unless product allows

---

## 29. Dashboard Data Loading Rules

Dashboard data must be:

* own data only
* role-scoped
* RLS-protected
* server-side checked
* paginated/limited
* no unbounded reads
* no private data for wrong user
* no admin/staff data
* no fake data
* loading/error states handled

Do not rely on client-side filtering for security.

---

## 30. RLS / Security Requirements

Verify/maintain:

* dashboard routes require auth
* role dashboards require correct role
* dashboard data queries only own data
* wrong role denied
* wrong user denied
* private data not public cached
* hidden contact not exposed
* service role not used in client
* provider secrets not shown
* admin/staff routes separate
* public footer hidden in dashboard

If new dashboard tables/views are created, RLS required.

---

## 31. Direct URL Bypass Protection

Direct URL tests must be possible for:

```txt id="direct-url-tests"
guest → /dashboard/owner
guest → /dashboard/broker
guest → /dashboard/builder
owner → /dashboard/broker
owner → /dashboard/builder
broker → /dashboard/owner
broker → /dashboard/builder
builder → /dashboard/owner
builder → /dashboard/broker
public user → /admin
wrong user → /dashboard/.../[other-entity]/edit
```

Expected:

* denied/redirected
* private data not rendered before redirect
* safe error/no unauthorized leak

---

## 32. Dashboard UI Requirements

Dashboard UI must include:

* responsive shell
* page titles
* breadcrumbs or section labels
* role label
* status badges
* action buttons
* empty states
* setup-required states
* loading skeletons
* safe error states
* pagination where lists exist
* search/filter where lists exist
* mobile card layout
* confirmation for destructive actions

No broken blank pages.

---

## 33. Dashboard Layout Rules

Dashboard layout must not include:

* public footer
* public admin links
* fake stats
* fake lead chart
* fake revenue chart
* fake notification badge
* hidden contact
* provider secrets
* raw DB errors
* dead buttons
* `href="#"`
* horizontal overflow

Dashboard layout can include:

* role navigation
* compact topbar
* sidebar/drawer
* bottom nav on mobile
* support/help
* profile/logout
* notifications/no-data state

---

## 34. Navigation Item Requirements

Each dashboard nav item must be either:

* implemented and functional
* linked to safe placeholder page
* disabled with reason
* hidden if not applicable to role

No dead nav item.

No `href="#"`.

No button that appears to work but does nothing.

---

## 35. Owner Navigation Items

Owner nav may include:

```txt id="owner-nav"
Overview
My Properties
Post Property
My Requirements
Post Requirement
Inquiries / Leads
Saved Items
Notifications
Billing
Verification
Profile
Settings
Support
Logout
```

Owner nav must not include:

* My Projects
* Post Project
* Builder Ads
* Agents/Team
* Admin

---

## 36. Broker Navigation Items

Broker nav may include:

```txt id="broker-nav"
Overview
My Properties
Post Property
My Requirements
Post Requirement
Leads / CRM
Proposals
Saved Items
Notifications
Billing
Verification
Public Profile
Profile
Settings
Support
Logout
```

Broker nav must not include:

* My Projects
* Post Project
* Builder Ads
* Agents/Team
* Admin

---

## 37. Builder Navigation Items

Builder nav may include:

```txt id="builder-nav"
Overview
My Projects
Post Project
Project Leads
Matching Requirements
Ads / Promotions
Agents / Team
Notifications
Billing
Verification / RERA
Public Profile
Profile
Settings
Support
Logout
```

Builder nav must not include as active allowed action:

* Post Property
* My Properties
* Post Requirement
* Owner/Broker CRM if not applicable
* Admin

---

## 38. Form Entry Rules From Dashboard

Dashboard create buttons must respect Prompt 04 rules.

* Owner/Broker Post Property → property form
* Owner/Broker Post Requirement → requirement form
* Builder Post Project → project form

Wrong role create CTA must not be visible as allowed action.

If user visits wrong form directly, server denies.

---

## 39. Listing Management Table/Card Rules

Management lists should show:

* title/name
* entity type
* status
* approval status
* visibility
* created/updated date
* published date if any
* basic location
* action menu

Actions:

* edit
* preview if safe/private
* submit
* pause/resume
* delete
* view public page if published
* duplicate later if implemented

Do not show:

* fake views/leads
* hidden contact
* private admin notes unless allowed
* wrong-user data

---

## 40. Private Preview Rules

If dashboard supports preview:

* preview route must require owner/auth
* preview unpublished data only to owner/staff later
* preview noindex
* preview must not leak hidden contact publicly
* public detail route still only published
* preview label clearly visible

If preview not implemented, safe.

---

## 41. Dashboard Search/Filter Rules

For management lists:

* search own entities
* filter by status
* filter by type/category
* filter by approval status
* pagination
* no unbounded reads
* no wrong-user data
* no fake counts

If not implemented, list should still be safe and limited.

---

## 42. Error Handling

Use safe dashboard errors:

```txt id="dashboard-safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
ENTITY_NOT_FOUND
SETUP_REQUIRED
FEATURE_NOT_STARTED
NO_DATA
VALIDATION_ERROR
UNKNOWN_ERROR
```

Do not show:

* SQL errors
* stack traces
* service role key
* provider secrets
* hidden contact
* private profile data of others

---

## 43. Loading / Empty / Setup States

Every dashboard module/page must have:

* loading state
* empty state
* error state
* unauthorized state
* setup-required state if provider/module missing
* coming-soon state if later phase
* disabled reason if action not available

No blank modules.

---

## 44. Notification Center Page Foundation

If implementing `/dashboard/.../notifications`:

* show DB-backed notifications if table exists
* otherwise empty/setup-required
* mark all read only if real
* no fake unread badge
* no fake notification list
* no private data
* role-specific safe links only

Full notification system Prompt 12.

---

## 45. Billing Page Foundation

If implementing dashboard billing page:

* show setup-required if billing not ready
* show real plan only if exists
* show invoice list only if real
* no fake invoice
* no fake payment
* no fake active subscription
* no fake usage limits
* pricing link safe
* Razorpay not loaded unless billing implemented

Full billing Prompt 09.

---

## 46. Verification Page Foundation

If implementing verification page:

* show current real verification status
* explain steps
* upload docs disabled/setup-required if media not ready
* request verification button setup/coming soon unless workflow exists
* no fake badge
* no legal guarantee
* builder RERA section shows real entered data only

Full verification/admin approval later.

---

## 47. Support Page Foundation

If implementing support page:

* link to help/support public page if exists
* ticket creation setup-required unless support system exists
* no fake ticket submitted
* no fake reply
* no fake SLA
* safe support copy

Full support ticket system later.

---

## 48. Settings Page Foundation

Settings may include:

* profile basics
* theme preference
* language preference
* notification preferences placeholder
* privacy settings placeholder
* account status
* logout
* role change request placeholder

Rules:

* user edits own safe fields only
* role cannot be changed directly
* email/mobile verification status real
* no private data of other users
* profile image upload setup-required if media not ready

---

## 49. Profile Completeness

Profile completeness can be shown only if computed from real fields.

Allowed:

* show missing fields checklist
* show percentage only if computed deterministically
* no fake verification progress
* no fake badge

If computation not implemented, show profile setup guidance instead.

---

## 50. Security / Privacy Deep Rules

Dashboards must not leak:

* other users’ properties/projects/requirements
* hidden contact of leads/listings
* private profile data
* private documents
* billing data
* admin notes
* moderation notes
* provider statuses intended only for admin
* service role key
* provider secrets

Dashboard pages must not be public cached.

Use `no-store` or equivalent for private pages when applicable.

---

## 51. Performance Requirements

Dashboard implementation must:

* use pagination for lists
* avoid unbounded own entity reads
* avoid N+1 queries
* avoid heavy charts if no real data
* avoid loading admin modules
* avoid loading public search heavy code unnecessarily
* keep mobile dashboard fast
* no maps/payment/media heavy provider scripts
* cache only public-safe data, not private dashboard data

---

## 52. Accessibility Requirements

Dashboards must have:

* semantic layout
* headings
* nav labels
* clear button text
* aria labels for icon buttons
* focus visible
* keyboard navigation
* readable status badges
* status not color-only
* accessible modals/drawers
* confirmation for destructive actions
* large mobile tap targets

---

## 53. Responsive Requirements

Check at least:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Dashboards must have:

* no horizontal scroll
* sidebar becomes drawer/bottom nav
* tables become cards
* status badges readable
* action menus usable
* topbar not overlapping
* profile menu usable
* create CTA visible
* cards stack
* no sticky nav covering content
* no destructive action too close to primary action

---

## 54. SQL Migration Rule

This phase should usually not require major DB changes if earlier prompts created foundations.

If DB changes are needed for dashboard support:

* create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_owner_broker_builder_dashboards.sql
```

Migration must include:

* purpose
* phase: Prompt 06
* tables/views/indexes changed
* RLS policies changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 55. Possible Dashboard-Support Tables

Only create if needed and justified.

Possible tables:

```txt id="possible-dashboard-tables"
dashboard_preferences
saved_items
recently_viewed_items
notification_preferences
user_settings
profile_completion_events
```

Do not overbuild if later phases handle these.

If tables created, add RLS.

---

## 56. RLS Requirements For New Tables

If new private dashboard tables are created:

* RLS enabled
* user can read/write own rows only
* public denied
* wrong user denied
* staff/admin later permission-scoped
* no private data public views unless explicitly safe
* indexes added

Do not disable RLS.

---

## 57. Tests / Checks To Run

Run available:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If available, also run:

* route guard tests
* dashboard RLS tests
* component tests
* form/action tests
* responsive smoke checks
* accessibility lint if configured

If script missing, document `NOT_CONFIGURED`.

Do not claim tests passed if not run.

---

## 58. Manual Smoke Checks If App Runs

If app can run, check:

* guest denied dashboard
* owner lands on owner dashboard
* broker lands on broker dashboard
* builder lands on builder dashboard
* owner denied broker/builder dashboard
* broker denied owner/builder dashboard
* builder denied owner/broker dashboard
* public admin route not linked in dashboards
* dashboard lists show own data only
* no fake stats
* no fake leads
* no fake notifications
* no fake billing
* no fake verification
* create buttons route correctly
* wrong-role create buttons hidden
* logout works
* mobile nav works
* no horizontal scroll

Record results.

Full verification in matching manual prompt.

---

## 59. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` if relevant.

Potential statuses:

* Notifications: `NOT_STARTED` or `SETUP_REQUIRED`
* Billing/Razorpay: `NOT_STARTED` or `SETUP_REQUIRED`
* Media/R2: `NOT_STARTED` or `SETUP_REQUIRED`
* Support email/provider: `NOT_STARTED` or `SETUP_REQUIRED`
* Analytics: `NOT_STARTED` or `SETUP_REQUIRED`

Do not mark provider active without real test.

---

## 60. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* shared dashboard shell
* dashboard role redirect
* owner dashboard
* broker dashboard
* builder dashboard
* owner nav
* broker nav
* builder nav
* owner entity management
* broker entity management
* builder project management
* overview cards real-only
* dashboard profile menu
* dashboard logout
* dashboard notifications foundation
* dashboard billing placeholder
* dashboard verification placeholder
* dashboard support/help placeholder
* dashboard settings/profile page
* saved items placeholder
* recently viewed placeholder
* leads/CRM placeholder
* builder ads placeholder
* builder agents/team placeholder
* public profile links
* role guards
* direct URL dashboard denial
* no fake dashboard data
* responsive dashboard baseline
* dashboard RLS/private cache rules

Use accurate statuses.

---

## 61. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 06
* summary
* changed files
* new dashboard routes
* migration files if any
* RLS/security changes
* provider status changes
* docs updated
* tests/checks run
* known issues
* rollback notes
* manual verification pending

---

## 62. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* guest can access dashboard
* wrong role can access dashboard
* dashboard shows wrong-user data
* builder sees property post CTA
* owner/broker sees project post CTA
* fake stats
* fake leads
* fake notifications
* fake billing
* fake verification
* public footer in dashboard
* public admin link
* hidden contact leak
* service role client exposure
* dashboard private cache risk
* mobile dashboard horizontal scroll
* dashboard dead link
* `href="#"`
* build/typecheck failure
* missing RLS for new table
* migration missing
* no rollback notes

---

## 63. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 06 implementation status
* manual verification pending:

  * `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`
* dashboard routes needing verification
* role access tests pending
* responsive checks pending
* provider setup-required modules
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 64. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* dashboard auth required
* role-specific access
* direct URL denial
* own-data-only dashboard queries
* no hidden contact leak
* no public admin link
* no public footer/admin shell leak
* private no-store/cache notes
* RLS status for any new tables
* service role client exposure check
* known issues

---

## 65. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* dashboard list pagination
* dashboard query limits
* no unbounded reads
* no fake analytics charts
* no heavy provider scripts
* mobile dashboard performance
* private no-store caching
* build status
* future load test notes

---

## 66. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* dashboard route changes
* dashboard component changes
* migration path if any
* rollback notes
* cache/session risk
* private dashboard cache warning
* provider setup-required notes
* post-deploy dashboard smoke checks

---

## 67. Brain Update

Update `brain.md`.

Include:

* Prompt 06 implementation summary
* changed files
* dashboard routes
* role guard status
* real/fake data status
* setup-required modules
* migration files if any
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`
* exact resume instruction

---

## 68. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/dashboard/page.tsx
src/app/dashboard/layout.tsx
src/app/dashboard/owner/page.tsx
src/app/dashboard/broker/page.tsx
src/app/dashboard/builder/page.tsx
src/app/dashboard/owner/properties/*
src/app/dashboard/owner/requirements/*
src/app/dashboard/broker/properties/*
src/app/dashboard/broker/requirements/*
src/app/dashboard/broker/crm/*
src/app/dashboard/builder/projects/*
src/app/dashboard/builder/ads/*
src/app/dashboard/builder/agents/*
src/app/dashboard/profile/*
src/app/dashboard/settings/*
src/app/dashboard/notifications/*
src/app/dashboard/support/*
src/app/dashboard/billing/*
src/app/dashboard/verification/*
src/components/dashboard/*
src/components/layout/DashboardShell.tsx
src/components/layout/DashboardSidebar.tsx
src/components/layout/DashboardTopbar.tsx
src/components/layout/DashboardMobileNav.tsx
src/lib/dashboard/*
src/lib/permissions/dashboard-permissions.ts
src/types/dashboard.ts
supabase/migrations/*_owner_broker_builder_dashboards.sql
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

## 69. Expected Output From This Phase

At the end of Prompt 06 implementation, project should have:

* role-aware dashboard shell
* `/dashboard` role redirect
* owner dashboard
* broker dashboard
* builder dashboard
* role-specific navigation
* entity management links/pages
* profile/settings foundation
* notification placeholder/foundation
* billing placeholder/foundation
* verification placeholder/foundation
* support/help placeholder/foundation
* real-only overview cards
* no fake data
* no wrong-role access
* no public admin links
* no public footer in dashboard
* docs updated
* checks run
* manual verification pending

---

## 70. Forbidden Outcomes

This phase must not leave:

* guest dashboard access
* wrong role dashboard access
* wrong-user dashboard data
* builder property post CTA as allowed action
* owner/broker project post CTA as allowed action
* public admin link
* public footer in dashboard/admin
* fake dashboard stats
* fake leads
* fake analytics
* fake notification count
* fake billing/payment
* fake verification badge
* hidden contact leak
* provider secrets in UI
* service role in client
* private dashboard data publicly cached
* dead nav links
* `href="#"`
* mobile horizontal scroll
* docs outdated
* manual verification skipped

---

## 71. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* dashboards exist but some modules are placeholders
* billing/notifications/support/verification setup-required
* leads/CRM placeholders only
* builder ads/agents placeholders only
* some responsive/browser checks pending
* some advanced dashboard filters deferred
* RLS runtime tests pending but route/data checks safe

### `FAIL`

Use if:

* build fails
* guest can access dashboard
* wrong role can access dashboard
* wrong-user data visible
* hidden contact leaks
* fake stats/leads/billing/verification shown
* public admin link visible
* service role/provider secret exposed
* DB changes missing migration
* public dashboard cache risk unresolved

### `BLOCKED`

Use if:

* Prompt 02 auth foundation failed
* Prompt 04/05 entity foundation failed and dashboard depends on it
* cannot inspect required files
* package/build baseline broken
* route architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

* notifications provider missing
* billing/payment provider missing
* media provider missing
* support/email provider missing
* analytics provider missing
* Supabase env missing

Setup-required is acceptable only if UI is honest and no fake data appears.

---

## 72. Final Response Required Format

Return final response in this structure:

```txt id="prompt-06-final-response-format"
Summary:
- what owner/broker/builder dashboard foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Dashboard routes:
- shared:
- owner:
- broker:
- builder:

Role access:
- guest:
- owner:
- broker:
- builder:
- admin/staff separation:

Dashboard modules:
- owner:
- broker:
- builder:
- placeholders/setup-required:

Data and analytics:
- real counts:
- fake data check:
- own-data-only check:

Security/privacy:
- hidden contact:
- wrong-user data:
- public admin link:
- service role/provider secrets:
- private cache:

Responsive/UI:
- mobile nav:
- tables/cards:
- known issues:

Provider/setup-required:
- notifications:
- billing:
- verification:
- support:
- ads:
- media:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- routes:
- cache/session:

Manual verification:
- pending prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md

Next step:
- run prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

Do not say only “done”.

---

## 73. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

Do not start Prompt 07 until Prompt 06 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 74. Common Bugs To Watch For

Create/track bugs for:

* `BUG-DASHBOARD-GUEST-ACCESS`
* `BUG-DASHBOARD-WRONG-ROLE-ACCESS`
* `BUG-DASHBOARD-WRONG-USER-DATA`
* `BUG-DASHBOARD-BUILDER-PROPERTY-CTA`
* `BUG-DASHBOARD-OWNER-PROJECT-CTA`
* `BUG-DASHBOARD-BROKER-PROJECT-CTA`
* `BUG-DASHBOARD-PUBLIC-ADMIN-LINK`
* `BUG-DASHBOARD-PUBLIC-FOOTER`
* `BUG-DASHBOARD-FAKE-STATS`
* `BUG-DASHBOARD-FAKE-LEADS`
* `BUG-DASHBOARD-FAKE-NOTIFICATIONS`
* `BUG-DASHBOARD-FAKE-BILLING`
* `BUG-DASHBOARD-FAKE-VERIFICATION`
* `BUG-DASHBOARD-HIDDEN-CONTACT-LEAK`
* `BUG-DASHBOARD-DEAD-LINK`
* `BUG-DASHBOARD-HREF-HASH`
* `BUG-DASHBOARD-MOBILE-SCROLL`
* `BUG-DASHBOARD-PRIVATE-CACHE`
* `BUG-DASHBOARD-SERVICE-ROLE-CLIENT`
* `BUG-DASHBOARD-MIGRATION-MISSING`
* `BUG-DASHBOARD-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 75. Quality Bar

This phase is successful when future phases can rely on:

* secure role-aware dashboards
* owner dashboard for property/requirement management
* broker dashboard for property/requirement and CRM placeholders
* builder dashboard for project and future ads/agents placeholders
* all modules reachable or clearly setup/coming later
* real-only overview data
* no fake stats
* no wrong-role access
* no wrong-user data
* no hidden contact leak
* no public admin link
* no public footer in dashboard
* responsive dashboard shell
* docs accurately updated
* verification prompt ready

---

## 76. Final Rule For Prompt 06

Implement dashboards safely.

Owner gets owner dashboard only.

Broker gets broker dashboard only.

Builder gets builder dashboard only.

Guest gets no dashboard.

Admin/staff stay separate.

Show real data only.

Use no-data/setup-required states for unfinished modules.

Do not fake dashboard stats.

Do not fake leads.

Do not fake notifications.

Do not fake billing.

Do not fake verification.

Do not expose hidden contact.

Do not expose wrong-user data.

Do not expose admin links.

Do not leave dead links.

Do not cache private dashboard data publicly.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
