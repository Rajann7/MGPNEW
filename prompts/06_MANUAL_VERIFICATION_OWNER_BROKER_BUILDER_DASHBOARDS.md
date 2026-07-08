# prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md

# My Gujarat Property — Prompt 06 Manual Verification: Owner, Broker And Builder Dashboards

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 6, 7, 8** and all `docs/05` "Design Add-Ons". Confirm: bottom nav Home·Search·Post(FAB)·Leads·Profile, drawer = full module list, Kanban desktop-only, "For client" broker requirements, featured/ad-wallet/seats meters, per-channel notification matrix.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

This prompt verifies the **Owner, Broker and Builder Dashboard** phase.

Do not skip this verification.

Do not start Prompt 07 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real role access, own-data-only, dashboard UI, fake-data, security, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
Prompt Number: 06 Verification
Phase: Owner, Broker And Builder Dashboards
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
Previous Prompt: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
Next Implementation Prompt: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that authenticated public-user dashboards are secure, role-aware, usable and honest.

This verification checks:

* shared dashboard shell
* `/dashboard` role redirect
* Owner dashboard
* Broker dashboard
* Builder dashboard
* role-specific navigation
* direct URL denial
* guest denial
* wrong-role denial
* own-data-only dashboard queries
* entity management routes
* profile/settings foundation
* notification foundation
* billing placeholder/foundation
* verification placeholder/foundation
* support/help foundation
* leads/CRM placeholders
* builder ads placeholders
* builder agents/team placeholders
* public profile links
* no fake dashboard stats
* no fake leads
* no fake notifications
* no fake billing/payment
* no fake verification
* no hidden contact leak
* no wrong-user data leak
* no public admin link
* no public footer inside dashboard
* no private dashboard public cache risk
* responsive dashboard layout
* build/lint/typecheck/tests
* docs updates
* Prompt 07 readiness

This phase does not verify full admin/staff system, CRM, billing, ads, notifications, support tickets, verification workflow or media upload. Those are later prompts.

---

## 3. Required Docs To Read First

Before verification, read:

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
prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 06.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* public-user dashboard shell
* role-aware public dashboards
* owner dashboard
* broker dashboard
* builder dashboard
* dashboard redirects
* dashboard route guards
* dashboard navigation
* dashboard entity management links
* own-data-only dashboard queries
* private dashboard cache safety
* dashboard placeholders for future modules
* responsive dashboard UI
* docs/checklist updates

This verification does not cover full implementation of:

* Super Admin/Admin/Staff modules
* staff permissions UI
* moderation queues
* full leads/CRM
* full proposals/messages/site visits
* full billing/payment/Razorpay
* full media upload
* full ads/promotions
* full notifications delivery
* full support ticket system
* full verification workflow
* full analytics dashboards

Those must remain `NOT_STARTED`, `PARTIAL`, `SETUP_REQUIRED`, `COMING_SOON` or `NO_DATA` where applicable.

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 06 changed files
3. inspect dashboard routes
4. inspect dashboard shell/layout
5. inspect role redirect logic
6. inspect route guards
7. inspect dashboard data queries
8. inspect owner dashboard
9. inspect broker dashboard
10. inspect builder dashboard
11. inspect entity management links
12. inspect placeholders/setup-required modules
13. inspect profile/settings pages
14. inspect notification/billing/verification/support placeholders
15. search for fake stats/data
16. search for wrong-role/admin links
17. search for hidden contact leaks
18. check private cache/no-store behavior
19. run automated checks
20. run manual smoke checks where possible
21. test responsive widths
22. update required docs
23. create bugs for failures
24. decide final verification result
25. update `brain.md`
26. prepare Prompt 07 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/dashboard/page.*
app/dashboard/page.*
src/app/dashboard/layout.*
app/dashboard/layout.*
src/app/dashboard/owner/page.*
app/dashboard/owner/page.*
src/app/dashboard/broker/page.*
app/dashboard/broker/page.*
src/app/dashboard/builder/page.*
app/dashboard/builder/page.*
src/app/dashboard/owner/
app/dashboard/owner/
src/app/dashboard/broker/
app/dashboard/broker/
src/app/dashboard/builder/
app/dashboard/builder/
src/app/dashboard/profile/
app/dashboard/profile/
src/app/dashboard/settings/
app/dashboard/settings/
src/app/dashboard/notifications/
app/dashboard/notifications/
src/app/dashboard/support/
app/dashboard/support/
src/app/dashboard/billing/
app/dashboard/billing/
src/app/dashboard/verification/
app/dashboard/verification/
src/components/dashboard/
components/dashboard/
src/components/layout/DashboardShell.*
components/layout/DashboardShell.*
src/components/layout/DashboardSidebar.*
components/layout/DashboardSidebar.*
src/components/layout/DashboardTopbar.*
components/layout/DashboardTopbar.*
src/components/layout/DashboardMobileNav.*
components/layout/DashboardMobileNav.*
src/lib/dashboard/
lib/dashboard/
src/lib/permissions/
lib/permissions/
src/lib/auth/
lib/auth/
src/lib/actions/
lib/actions/
src/types/dashboard.*
types/dashboard.*
supabase/migrations/
```

Also inspect:

```txt id="docs-to-check"
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

Record exact files changed by Prompt 06.

---

## 7. Dashboard Route Verification

Check dashboard routes.

Expected possible routes:

```txt id="dashboard-routes"
 /dashboard
 /dashboard/owner
 /dashboard/broker
 /dashboard/builder
 /dashboard/profile
 /dashboard/settings
 /dashboard/notifications
 /dashboard/support
 /dashboard/billing
 /dashboard/verification
 /dashboard/owner/properties
 /dashboard/owner/requirements
 /dashboard/broker/properties
 /dashboard/broker/requirements
 /dashboard/broker/crm
 /dashboard/broker/proposals
 /dashboard/builder/projects
 /dashboard/builder/ads
 /dashboard/builder/agents
```

Actual route structure can differ if documented.

Verify:

* linked routes exist or safe placeholder exists
* no dead dashboard nav item
* no `href="#"`
* no public admin link
* no route crashes
* dashboard pages require auth
* role-specific dashboards require correct role
* private pages noindex/no public cache where applicable

If nav links to missing routes:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 8. `/dashboard` Redirect Verification

Verify `/dashboard` redirects correctly:

```txt id="dashboard-redirects"
guest → login/auth required
owner → /dashboard/owner
broker → /dashboard/broker
builder → /dashboard/builder
admin/staff → internal admin route or unauthorized
unknown role → unauthorized/setup-required
suspended/banned → restricted state
```

Check:

* redirect is server-side or securely guarded
* no redirect loop
* role fetched from trusted source
* client-only redirect is not sole protection
* account status is respected where implemented
* safe unauthorized state exists

If `/dashboard` lets guest into dashboard:

* create critical bug
* mark `FAIL`

---

## 9. Guest Access Verification

Guest must be denied:

```txt id="guest-denied-routes"
/dashboard
/dashboard/owner
/dashboard/broker
/dashboard/builder
/dashboard/profile
/dashboard/settings
/dashboard/notifications
/dashboard/billing
/dashboard/verification
/dashboard/support if private
/dashboard/owner/properties
/dashboard/broker/properties
/dashboard/builder/projects
```

Expected:

* redirected to login/auth
* safe login required message
* no private data rendered before redirect
* no cached private HTML
* no dashboard nav visible to unauthenticated user

If guest sees dashboard/private data:

* create critical bug
* mark `FAIL`

---

## 10. Owner Dashboard Access Verification

With owner user or code inspection, verify:

Owner can access:

```txt id="owner-allowed"
 /dashboard/owner
 /dashboard/owner/properties
 /dashboard/owner/requirements
 owner-safe profile/settings/support/billing/verification
```

Owner is denied:

```txt id="owner-denied"
 /dashboard/broker
 /dashboard/builder
 /dashboard/builder/projects
 /dashboard/builder/ads
 /dashboard/builder/agents
 /admin
```

Owner dashboard must not show as active allowed action:

* Post Project
* My Projects
* Builder Ads
* Agents/Team
* Admin
* Staff
* Provider settings

If owner can access builder/broker dashboard:

* create critical bug
* mark `FAIL`

---

## 11. Broker Dashboard Access Verification

With broker user or code inspection, verify:

Broker can access:

```txt id="broker-allowed"
 /dashboard/broker
 /dashboard/broker/properties
 /dashboard/broker/requirements
 /dashboard/broker/crm if placeholder/allowed
 /dashboard/broker/proposals if placeholder/allowed
 broker-safe profile/settings/support/billing/verification
```

Broker is denied:

```txt id="broker-denied"
 /dashboard/owner
 /dashboard/builder
 /dashboard/builder/projects
 /dashboard/builder/ads
 /dashboard/builder/agents
 /admin
```

Broker dashboard must not show as active allowed action:

* Post Project
* My Projects
* Builder Ads
* Agents/Team
* Admin
* Staff
* Provider settings

If broker can access builder/owner dashboard:

* create critical bug
* mark `FAIL`

---

## 12. Builder Dashboard Access Verification

With builder user or code inspection, verify:

Builder can access:

```txt id="builder-allowed"
 /dashboard/builder
 /dashboard/builder/projects
 /dashboard/builder/projects/new
 /dashboard/builder/ads if placeholder/allowed
 /dashboard/builder/agents if placeholder/allowed
 builder-safe profile/settings/support/billing/verification
```

Builder is denied:

```txt id="builder-denied"
 /dashboard/owner
 /dashboard/broker
 /dashboard/owner/properties
 /dashboard/broker/properties
 /dashboard/owner/requirements
 /dashboard/broker/requirements
 /admin
```

Builder dashboard must not show as active allowed action:

* Post Property
* My Properties
* Post Requirement
* My Requirements as creator
* Admin
* Staff
* Provider settings

If builder can create/access property/requirement creation as allowed action:

* create critical bug
* mark `FAIL`

---

## 13. Admin / Staff Separation Verification

This phase is not admin implementation, but dashboards must keep admin separate.

Verify:

* no public-user dashboard links to `/admin`
* no admin/staff link in owner dashboard
* no admin/staff link in broker dashboard
* no admin/staff link in builder dashboard
* admin/staff auth routes not exposed in public dashboard
* public users denied `/admin`
* admin/staff do not use public dashboard shell unless explicitly safe and documented

If public dashboard exposes admin/staff link:

* create critical bug
* mark `FAIL`

---

## 14. Direct URL Bypass Verification

Test or inspect direct URL access.

Required scenarios:

```txt id="direct-url-scenarios"
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
wrong user → /dashboard/.../[other-user-entity]/edit
```

Expected:

* denied/redirected
* no private data rendered before redirect
* safe unauthorized state
* no client-only protection
* server/data query denies forbidden access

If direct URL bypass works:

* create critical bug
* mark `FAIL`

---

## 15. Shared Dashboard Shell Verification

Verify dashboard shell includes:

* role-aware nav
* dashboard topbar
* mobile nav/drawer/bottom nav
* profile menu
* logout
* support/help entry
* settings entry
* notification entry if implemented
* current page title
* loading state
* unauthorized state
* setup-required state
* no public footer
* no public admin link

Verify shell excludes:

* public footer
* admin/staff nav
* provider settings
* fake notification badge
* hidden contact
* provider secrets
* service role output

If public footer appears in dashboard and it exposes public-only links awkwardly or admin gaps:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 16. Owner Dashboard Content Verification

Owner overview should show only real/own data or safe states.

Check modules:

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

Verify:

* owner property count is real or no-data
* owner requirement count is real or no-data
* pending/published/paused counts are real
* leads placeholder does not show fake leads
* saved items placeholder does not show fake saved properties
* billing placeholder does not show fake plan/payment
* verification does not show fake verified badge
* notification badge real/zero/no-data only
* create buttons route to owner-allowed forms
* no project posting as allowed action

If owner overview has fake stats:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 17. Broker Dashboard Content Verification

Broker overview should show only real/own data or safe states.

Check modules:

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

Verify:

* broker property count is real or no-data
* broker requirement count is real or no-data
* leads/CRM placeholder does not show fake pipeline
* proposals placeholder does not show fake proposal count
* billing placeholder does not show fake plan/payment
* verification does not show fake verified badge
* public profile link safe if profile exists
* no project posting as allowed action
* no builder ads/agents as active module

If broker dashboard shows fake leads/CRM:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 18. Builder Dashboard Content Verification

Builder overview should show only real/own data or safe states.

Check modules:

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

Verify:

* builder project count is real or no-data
* pending/published/paused project counts are real
* project leads placeholder does not show fake leads
* matching requirements placeholder does not show fake matches/count
* ads placeholder does not show fake active ads/impressions/clicks
* agents/team placeholder does not show fake agents
* billing placeholder does not show fake plan/payment
* verification/RERA does not show fake verified badge
* public profile link safe if profile exists
* no normal property posting allowed
* no owner/broker requirement creation allowed

If builder dashboard shows fake ad performance or fake project leads:

* create bug
* mark `FAIL`

---

## 19. Entity Management Verification

Verify dashboard entity pages use Prompt 04 rules.

### Owner

Check:

* owner sees own properties only
* owner sees own requirements only
* owner can access post property
* owner can access post requirement
* owner cannot access project creation
* edit/submit/pause/delete own entity only

### Broker

Check:

* broker sees own properties only
* broker sees own requirements only
* broker can access post property
* broker can access post requirement
* broker cannot access project creation
* edit/submit/pause/delete own entity only

### Builder

Check:

* builder sees own projects only
* builder can access post project
* builder cannot access post property
* builder cannot access post requirement
* edit/submit/pause/delete own project only

If any role sees another user’s entity:

* create critical bug
* mark `FAIL`

---

## 20. Own-Data-Only Query Verification

Inspect dashboard queries/server actions.

Verify:

* data filtered by authenticated profile/user ID server-side
* RLS protects data
* no client-only filtering for security
* no `select *` exposing private fields unnecessarily
* no service role in client
* no wrong-user data in props
* no admin/staff data in public dashboards
* private queries no-store where needed

If dashboard fetches all entities and filters in browser:

* create critical bug
* mark `FAIL`

---

## 21. Overview Cards Verification

Check every dashboard overview card.

Allowed real cards:

* own property count
* own project count
* own requirement count
* own draft count
* own pending approval count
* own published count
* own paused count
* profile completeness if computed from real fields
* billing status if real/setup-required
* verification status if real

Forbidden fake cards:

* fake views
* fake leads
* fake revenue
* fake conversion rate
* fake ad impressions
* fake CTR
* fake unread notifications
* fake plan usage
* fake verified badge
* fake “hot leads”

If a metric is not implemented, it must show:

```txt id="safe-states"
No data yet
Coming in later phase
Setup required
Not configured
```

---

## 22. Fake Dashboard Data Verification

Search for fake data patterns:

```txt id="fake-data-patterns"
mock
dummy
fake
sample
demo
123
999
10,000
views
leads
revenue
conversion
chartData
placeholderStats
testStats
verified: true
plan: active
```

Context matters: dev-only or test-only fixtures are allowed only if not used as production dashboard data.

Verify dashboard does not display fake:

* stats
* leads
* notifications
* billing
* invoices
* verification
* ads
* agents
* saved items
* recent views
* analytics charts

If fake data appears real:

* create bug
* mark `FAIL`

---

## 23. Leads / CRM Placeholder Verification

Full leads/CRM comes in Prompt 08.

Verify:

* leads/CRM page/card is placeholder or real data only
* no fake leads
* no fake unread count
* no fake pipeline
* no fake follow-ups
* no hidden contact
* no fake contact reveal
* setup-required/coming-later message clear
* broker/builder role-specific messaging correct

If fake CRM pipeline appears:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 24. Billing Placeholder Verification

Full billing/payment comes in Prompt 09.

Verify:

* billing page/card is placeholder/setup-required unless billing real
* no fake active subscription
* no fake invoice
* no fake payment history
* no fake Razorpay success
* no fake trial/coupon
* no fake usage limits unless real
* no payment script loaded unnecessarily
* provider status honest

If fake billing/payment appears:

* create bug
* mark `FAIL`

---

## 25. Verification Placeholder Verification

Verify dashboard verification section:

* shows real profile verification status only
* no fake verified badge
* no fake document approval
* no fake RERA approval
* no fake team review/call completed
* no legal guarantee claim
* media upload disabled/setup-required if not implemented
* request verification CTA setup/coming-later if workflow absent
* builder RERA fields real only

If fake verified badge appears:

* create critical bug
* mark `FAIL`

---

## 26. Notification Placeholder Verification

Full notifications come in Prompt 12.

Verify:

* notification bell count real/zero/no-data only
* no fake unread badge
* notification center shows DB-backed real notifications or empty/setup state
* mark-read actions exist only if real
* no fake latest notification list
* no private data leak
* role-specific links safe

If fake notification count appears:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 27. Support / Help Verification

Verify support/help foundation:

* link/page exists or safe placeholder
* no dead support CTA
* ticket form not fake
* no fake ticket success
* no fake replies/SLA
* safe public support copy
* no hidden/private contact unless official support contact approved
* setup-required if support system not implemented

If support button does nothing:

* create bug
* mark `PARTIAL`

---

## 28. Saved Items / Recently Viewed Verification

If module exists:

* shows real saved/recent items only
* otherwise empty/setup-required
* no fake saved properties/projects
* no fake recently viewed
* no wrong-user saved items
* guest local saved data not shown as user data unless synced

If not implemented, safe placeholder is acceptable.

---

## 29. Profile / Settings Verification

Verify profile/settings page:

* user can view own profile only
* user can edit own safe fields only
* role shown from trusted source
* user cannot directly change role
* role change request placeholder if implemented
* email/mobile verification status real
* profile image upload setup-required if media missing
* notification preferences placeholder safe
* privacy settings placeholder safe
* theme/language preference safe
* logout works
* no wrong-user profile data

If profile page allows role escalation:

* create critical bug
* mark `FAIL`

---

## 30. Role Change Request Verification

If role change request exists:

* user cannot directly mutate role
* request requires confirmation/warning
* admin approval required
* request status real
* no fake approval
* no auto-upgrade to broker/builder
* route/action protected
* audit/status event if implemented

If not implemented:

* must show setup/coming later if surfaced

If direct role mutation exists:

* create critical bug
* mark `FAIL`

---

## 31. Builder Agents / Team Placeholder Verification

If builder agents/team module exists:

* visible only to builder
* no fake agents
* no fake invites
* no fake invite sent
* permissions not fake
* email provider setup-required if invite uses email
* wrong role denied
* no public access

If agent/team management is real, verify RLS and permissions.

If placeholder, mark `PARTIAL`/`NOT_STARTED`.

---

## 32. Ads / Promotions Placeholder Verification

If builder ads/promotions module exists:

* visible only to builder
* no fake ad banners
* no fake active ads
* no fake impressions/clicks
* no fake sponsored placement
* no fake payment
* project selection not fake
* RERA note/disclaimer safe
* setup-required/coming later if not implemented

If fake ad metrics appear:

* create bug
* mark `FAIL`

---

## 33. Public Profile Link Verification

Verify broker/builder dashboard public profile links:

* link exists only if slug/profile safe
* route works or shows setup/profile incomplete
* public page does not expose private mobile/email
* no fake verified badge
* no fake listing/project count
* owner dashboard does not create public owner profile unless approved

If public profile link leaks private profile data:

* create critical bug
* mark `FAIL`

---

## 34. Navigation Verification

Check role-specific nav.

Owner nav should not include builder-only modules.

Broker nav should not include builder-only modules.

Builder nav should not include owner/broker posting modules.

All nav items must be:

* implemented
* safe placeholder
* disabled with reason
* or hidden

No dead nav.

No `href="#"`.

No admin/staff links.

If `href="#"` exists in dashboard nav:

* create bug
* mark `PARTIAL`

---

## 35. Dashboard Footer Separation Verification

Verify:

* public footer is hidden on dashboard pages
* public footer is hidden on admin/internal pages
* dashboard uses dashboard shell
* dashboard does not show public homepage footer links
* no public admin link through footer
* no duplicated public layout causing UX clutter

If public footer appears but does not leak or break, mark `PARTIAL`; if it exposes admin/security issues, mark `FAIL`.

---

## 36. Hidden Contact Verification

Dashboards must not leak hidden contact except where user owns their own data and field is intended.

Check:

* overview cards
* entity lists
* profile menu
* notifications
* CRM placeholders
* public profile links
* support placeholders
* logs/errors
* client payloads

Do not expose:

* other users’ phone/email
* contact reveal phone/email
* lead contact details before lead/contact phase
* hidden listing contact publicly
* private profile mobile/email to wrong user

If hidden contact leaks to wrong user/public dashboard:

* create critical bug
* mark `FAIL`

---

## 37. Private Cache Verification

Dashboard pages are private.

Verify:

* no public caching of dashboard pages
* no static generation of private dashboard data
* no cached private props shared between users
* `no-store` or equivalent used where needed
* user-specific data not revalidated publicly
* auth/session checked server-side
* private data not in public sitemap

If private dashboard data can be cached publicly:

* create critical bug
* mark `FAIL`

---

## 38. Service Role / Secret Verification

Search dashboard code for:

```txt id="secret-patterns"
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
RAZORPAY_KEY_SECRET
R2_SECRET_ACCESS_KEY
OTP_API_KEY
SMS_API_KEY
WHATSAPP_BUSINESS_TOKEN
GOOGLE_CLIENT_SECRET
SENDGRID_API_KEY
RESEND_API_KEY
```

Verify:

* no service role in client components
* no provider secrets in dashboard UI
* no raw env values shown
* no secrets in docs beyond placeholders
* no secrets in logs/errors

If real secret exposed:

* create critical bug
* mark `FAIL`
* recommend secret rotation without printing value

---

## 39. RLS Verification For New Tables

If Prompt 06 created new tables, verify:

```txt id="possible-new-tables"
dashboard_preferences
saved_items
recently_viewed_items
notification_preferences
user_settings
profile_completion_events
```

For each private table:

* RLS enabled
* user can read/write own rows only
* wrong user denied
* public denied
* indexes added
* no public-safe view unless intentional
* migration exists
* rollback notes exist

If RLS missing:

* create critical bug
* mark `FAIL`

---

## 40. Migration Verification

If Prompt 06 changed DB, verify migration exists:

```txt id="migration-name"
supabase/migrations/*_owner_broker_builder_dashboards.sql
```

Migration must include:

* purpose
* phase: Prompt 06
* tables/views/indexes changed
* RLS policies changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark `FAIL`

If no DB changes were needed:

* record “none”

---

## 41. Dashboard Query Performance Verification

Check dashboard data fetching:

* limited/paginated entity lists
* no unbounded reads
* no N+1 repeated profile/entity queries
* no heavy charts with fake data
* no loading all public search data
* no admin module import into public dashboards
* no maps/payment/media provider scripts loaded
* private pages no-store

If dashboard reads all entities across platform:

* create critical bug
* mark `FAIL`

---

## 42. Responsive Verification

Test these widths:

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

* dashboard shell fits
* no horizontal scroll
* sidebar becomes drawer/bottom nav
* bottom nav does not cover content
* topbar not overlapping
* profile menu usable
* notification entry usable
* cards stack correctly
* tables become cards
* action menus usable
* status badges readable
* create buttons accessible
* destructive actions not too close to primary actions
* form entry pages remain usable

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 43. Mobile Navigation Verification

Verify mobile dashboard navigation:

* opens/closes if drawer
* bottom nav routes correctly if used
* no wrong-role nav item
* no admin link
* active state correct
* logout/profile accessible
* support/help accessible
* create/post CTA accessible
* no clipped nav items
* no horizontal scroll
* safe touch targets

If mobile nav unusable:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 44. Accessibility Verification

Check dashboard accessibility:

* semantic headings
* nav landmarks/labels
* buttons have text/aria labels
* icon buttons labeled
* status badges readable and not color-only
* focus visible
* keyboard navigation through nav/action menus
* drawers/modals focus behavior safe
* forms have labels
* destructive confirmations clear
* error messages readable
* tap targets large

If severe blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 45. Build / Lint / Typecheck Verification

Run available checks.

Examples:

```txt id="npm-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

```txt id="pnpm-checks"
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If scripts missing:

* record `NOT_CONFIGURED`

If checks fail:

* fix safe issues if in scope
* create bug if unresolved
* mark `FAIL` or `PARTIAL`

Build failure blocks PASS.

---

## 46. Manual Smoke Test Matrix

If app can run and test users exist, test:

```txt id="manual-smoke-matrix"
Guest:
- /dashboard denied
- /dashboard/owner denied
- /dashboard/broker denied
- /dashboard/builder denied

Owner:
- /dashboard redirects to /dashboard/owner
- owner dashboard loads
- owner properties page own data only
- owner requirements page own data only
- owner denied broker dashboard
- owner denied builder dashboard
- owner denied admin

Broker:
- /dashboard redirects to /dashboard/broker
- broker dashboard loads
- broker properties page own data only
- broker requirements page own data only
- broker denied owner dashboard
- broker denied builder dashboard
- broker denied admin

Builder:
- /dashboard redirects to /dashboard/builder
- builder dashboard loads
- builder projects page own data only
- builder denied owner dashboard
- builder denied broker dashboard
- builder denied admin
```

If test users unavailable:

* inspect code
* mark runtime role test `SETUP_REQUIRED` or `PARTIAL`
* do not fake PASS for runtime checks

---

## 47. Dashboard Module Clickability Test

For each role, click/check every visible module.

Expected:

* implemented page loads
* safe placeholder loads
* disabled with reason
* or hidden

No:

* dead click
* `href="#"`
* missing route 404 from visible nav
* fake success
* fake data
* admin link

If module visible but broken:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 48. Entity Action Test

If entity actions are surfaced in dashboard, verify:

* create routes correct by role
* edit own entity works or safe page exists
* submit for approval works or safe state
* pause/resume works or safe state
* delete has confirmation
* wrong role cannot access action
* wrong user cannot access entity edit
* no fake status update

If wrong user can update entity:

* create critical bug
* mark `FAIL`

---

## 49. Error And Empty State Verification

Every dashboard module should handle:

* loading
* empty
* error
* unauthorized
* forbidden
* setup-required
* coming-soon
* no-data

Check:

* no blank cards
* no raw SQL error
* no stack trace
* no provider secret
* no private data in error
* errors are understandable

If raw errors show sensitive data:

* create bug
* mark `FAIL`

---

## 50. Documentation Update Verification

Verify these docs were updated:

```txt id="docs-update-required"
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

If docs missing updates:

* update them
* mark verification `PARTIAL` until fixed

---

## 51. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

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

Future features must not be marked done.

---

## 52. Changelog Verification

Check `CHANGELOG.md` includes Prompt 06 entry with:

* date
* summary
* changed files
* new dashboard routes
* migration files if any
* RLS/security changes
* provider status changes
* docs updated
* tests/checks run
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 53. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

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

## 54. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 06 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* dashboard routes checked
* roles tested
* module clickability
* own-data-only checks
* fake data checks
* security/privacy checks
* responsive widths
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “works”.

---

## 55. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 06 results for:

* dashboard auth required
* role-specific access
* direct URL denial
* own-data-only dashboard queries
* hidden contact protection
* public admin link absence
* public footer/dashboard separation
* private cache/no-store
* service role client exposure check
* provider secret exposure check
* RLS for new tables
* known issues

If guest/wrong-role access works, result cannot be PASS.

---

## 56. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 06 results for:

* dashboard list pagination
* dashboard query limits
* no unbounded reads
* no fake/heavy analytics charts
* no heavy provider scripts
* mobile dashboard performance
* private no-store caching
* build status
* future load testing notes
* known performance issues

---

## 57. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 06 route changes
* dashboard component changes
* migration path if any
* rollback notes
* cache/session risk
* private dashboard cache warning
* provider setup-required notes
* post-deploy dashboard smoke checks
* verification status

If DB changed without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 58. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md` if statuses changed.

Relevant provider/module statuses:

* Notifications
* Billing/Razorpay
* Media/R2
* Support email/provider
* Analytics
* Ads
* Verification document upload

Rules:

* no provider marked `ACTIVE` without test
* missing providers marked `SETUP_REQUIRED`/`NOT_STARTED`
* dashboard must not fake provider-backed functionality

---

## 59. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 06 implementation summary
* Prompt 06 verification result
* dashboard route list
* role guard result
* own-data-only result
* fake data result
* responsive result
* setup-required modules
* migration files if any
* bugs/blockers
* commands run
* next prompt:

  * `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`
* instruction not to proceed if Prompt 06 failed/blocked

---

## 60. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* guest dashboard access denied
* owner dashboard access correct
* broker dashboard access correct
* builder dashboard access correct
* wrong-role dashboard access denied
* public admin link absent
* dashboard data is own-data-only
* no wrong-user data visible
* no hidden contact leak
* no fake stats/leads/notifications/billing/verification
* all visible nav/module items work or show safe placeholder
* no `href="#"` in touched dashboard UI
* public footer hidden from dashboard
* private dashboard cache risk handled
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* dashboards work but some modules are placeholders
* billing/notifications/support/verification setup-required
* leads/CRM placeholders only
* builder ads/agents placeholders only
* some responsive/browser checks pending
* RLS runtime tests unavailable but route/data logic reviewed
* tests not configured but build passes
* non-critical UI bugs documented

Prompt 07 can start only if user/Super Admin accepts partial and no critical access/privacy/security issue exists.

### FAIL

Use `FAIL` if:

* build fails
* guest can access dashboard
* wrong role can access dashboard
* wrong-user data visible
* hidden contact leaks
* fake stats/leads/billing/verification shown as real
* public admin link visible
* service role/provider secret exposed
* private dashboard public cache risk unresolved
* DB changes missing migration
* dead primary dashboard nav breaks core use

Do not start Prompt 07.

### BLOCKED

Use `BLOCKED` if:

* Prompt 02 auth/role foundation failed
* Prompt 04 entity foundation failed and dashboards depend on it
* Prompt 05 public profile dependencies block dashboard links
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision
* required Prompt 06 files missing

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* missing auth test users
* Supabase/env unavailable
* notifications provider missing
* billing/payment provider missing
* media provider missing
* support/email provider missing
* analytics provider missing
* ads provider/workflow missing

Setup-required is acceptable only when dashboard clearly says setup/coming later and does not fake functionality.

---

## 61. Prompt 07 Readiness Checklist

Prompt 07 can start only if:

* Prompt 06 implementation completed
* Prompt 06 verification completed
* no critical dashboard access bug open
* no guest dashboard access
* no wrong-role dashboard access
* no wrong-user data leak
* no hidden contact leak
* no fake data shown as real
* no public admin link in dashboard
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`

If Prompt 07 file is missing, stop and ask/generate it.

---

## 62. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 06 Verification — Owner, Broker And Builder Dashboards

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes Checked:
- /dashboard:
- /dashboard/owner:
- /dashboard/broker:
- /dashboard/builder:
- owner management routes:
- broker management routes:
- builder management routes:
- shared dashboard routes:

Roles Tested:
- Guest:
- Owner:
- Broker:
- Builder:
- Admin/Staff separation:

Dashboard Access Checks:
- guest denied:
- wrong role denied:
- direct URL bypass:
- own-data-only:
- public admin link:
- public footer:

Modules Checked:
- Owner:
- Broker:
- Builder:
- Notifications:
- Billing:
- Verification:
- Support:
- Saved/Recent:
- Ads/Agents:
- Leads/CRM:

Security/Public Safety:
- hidden contact:
- wrong-user data:
- fake stats:
- fake leads:
- fake billing/payment:
- fake notifications:
- fake verification:
- service role/provider secrets:
- private cache:

Responsive Widths Tested:
- 320px:
- 360px:
- 390px:
- 430px:
- 768px:
- 1024px:
- 1366px:

Commands Run:
- command: result

Expected:
- Owner/Broker/Builder dashboards are role-safe, real-data-only and ready for Prompt 07.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 07:
- Yes/No

Next Step:
- prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md or fix blockers first.
```

---

## 63. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 06 Owner/Broker/Builder Dashboards verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes checked:
- /dashboard:
- owner dashboard:
- broker dashboard:
- builder dashboard:
- shared dashboard routes:

Role access:
- guest:
- owner:
- broker:
- builder:
- admin/staff separation:
- direct URL bypass:

Dashboard modules:
- owner:
- broker:
- builder:
- notifications:
- billing:
- verification:
- support:
- leads/CRM:
- ads/agents:

Data safety:
- own-data-only:
- wrong-user data:
- hidden contact:
- fake stats:
- fake leads:
- fake billing/payment:
- fake notifications:
- fake verification:

Security/privacy:
- public admin link:
- public footer in dashboard:
- service role/provider secrets:
- private cache/no-store:
- RLS/new tables:

Responsive:
- widths tested:
- mobile nav:
- tables/cards:
- horizontal scroll:

Provider/setup-required:
- notifications:
- billing:
- media:
- support:
- analytics:
- ads:
- verification:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 07:
- Yes/No
- reason

Next step:
- prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

Do not write vague “verified”.

---

## 64. If Verification Fails

If verification fails:

1. do not start Prompt 07
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `brain.md`
8. state exact blocker
9. fix if safe and in scope
10. rerun verification
11. only then proceed

Critical access/privacy/security failures block progress.

---

## 65. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list placeholder modules
* list untested role/runtime checks
* list responsive/browser gaps
* confirm no guest access
* confirm no wrong-role access
* confirm no wrong-user data leak
* confirm no hidden contact leak
* confirm no fake data shown as real
* update docs
* ask/require owner acceptance before Prompt 07 if risk is significant

Acceptable partial examples:

* billing placeholder only
* notification placeholder only
* leads/CRM placeholder only
* ads/agents placeholder only
* support ticket system not implemented
* some browser checks not done
* missing test users but code inspected

Not acceptable partial without fix:

* guest dashboard access
* wrong-role dashboard access
* wrong-user data leak
* hidden contact leak
* fake billing/stats/leads as real
* public admin link
* build fail

---

## 66. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `brain.md`
* final response should say Prompt 07 can start

Do not start Prompt 07 automatically unless user asked to continue.

---

## 67. What Not To Do In This Verification

Do not:

* implement admin/staff system
* implement full leads/CRM
* implement full billing/payment
* implement full ads/promotions
* implement full notifications
* implement full support tickets
* implement full verification workflow
* add fake stats to make dashboard look full
* add fake leads
* add fake notifications
* add fake invoices
* add fake verified badges
* bypass role guards
* expose hidden contact
* expose provider secrets
* ignore private cache risk
* ignore direct URL bypass
* start Prompt 07 after FAIL/BLOCKED

---

## 68. Quality Bar

This verification is successful when future phases can trust that:

* dashboards are private
* dashboards are role-specific
* Owner/Broker/Builder access is correct
* all dashboard data is own-data-only
* all unfinished modules are honest placeholders/setup-required states
* dashboard overview uses real data only
* no fake stats/leads/billing/verification exist
* no hidden contact leaks
* no public admin links exist
* no public footer appears in dashboard
* private caching is safe
* dashboard UI works on mobile
* docs reflect reality
* Prompt 07 admin system can be built separately and safely

---

## 69. Final Rule For Prompt 06 Verification

Verify dashboards honestly.

Verify role access honestly.

Verify own-data-only honestly.

Verify direct URL denial honestly.

Verify no fake stats honestly.

Verify no fake leads honestly.

Verify no fake billing honestly.

Verify no fake notifications honestly.

Verify no fake verification honestly.

Verify hidden contact safety honestly.

Verify no public admin link honestly.

Verify private cache safety honestly.

Do not fake dashboard data.

Do not expose wrong-user data.

Do not expose hidden contact.

Do not allow guest dashboard access.

Do not allow wrong-role dashboard access.

Do not mark PASS without responsive and security checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
