# prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md

# My Gujarat Property — Prompt 03: Public UI, Home, Header, Footer And Hero Search

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1 — do NOT design from scratch. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 1 (design system) & 3 (home/search)**, the add-on list in `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `design-prompts/delta-reports/report-batch-01.md` + `report-batch-03.md`, and the "Design Add-Ons" section of `docs/05` + `docs/13`. Locked tokens: brand `#0F6B5C`, Inter, radius 16/10; contextual mobile header w/ back button; honesty states as visible UI.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
```

This phase implements and verifies the public-facing UI foundation for **My Gujarat Property**:

* homepage layout
* existing header preservation
* existing city selector preservation
* public guest header
* logged-in role-aware header
* public footer
* hero search section
* public search route handoff
* auth popup trigger integration
* mobile-first responsive behavior
* loading/empty/error/setup-required UI states
* no fake data
* no dead links
* no horizontal scroll
* no public admin link

Do not skip existing UI inspection.

Do not replace approved existing header/city selector unnecessarily.

Do not introduce fake marketplace data.

Do not add AI/API/maps/WhatsApp/OTP/payment/Cloudflare integrations in this phase unless already safely implemented and required.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
Prompt Number: 03
Phase: Public UI, Home, Header, Footer And Hero Search
Type: Implementation Prompt
Matching Verification Prompt: prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
Previous Verification Prompt: prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
```

---

## 2. Phase Purpose

The purpose of this phase is to build the public UI foundation for My Gujarat Property.

This includes:

* preserve existing homepage/header/city selector if already working
* implement/repair public layout
* implement/repair role-aware public header
* implement/repair public footer
* add/merge hero search section under existing header
* route hero search to `/search`
* create safe public search page placeholder if missing
* integrate guest protected actions with auth popup
* hide login/register for logged-in users
* show dashboard/profile/notification shell for logged-in users
* keep admin/staff completely separate
* mobile-first responsive checks
* no dead buttons/links
* no fake counts/listings/leads/analytics
* no hidden contact leak
* no public admin link
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase creates the public UI shell used by later marketplace features.

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect any existing homepage/header/footer/city selector code.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
src/app/page.*
app/page.*
src/app/layout.*
app/layout.*
src/app/search/
app/search/
src/components/
components/
src/components/layout/
components/layout/
src/components/public/
components/public/
src/components/header*
components/header*
src/components/footer*
components/footer*
src/components/city*
components/city*
src/components/auth/
components/auth/
src/lib/auth/
lib/auth/
src/lib/permissions/
lib/permissions/
src/lib/locations/
lib/locations/
src/styles/
styles/
src/app/globals.css
app/globals.css
tailwind.config.*
next.config.*
```

Search for existing:

* homepage
* header
* guest header
* owner header
* city selector
* hero section
* search box
* footer
* auth popup trigger
* login/register buttons
* dashboard links
* profile menu
* notification bell
* mobile menu
* public admin link
* fake data/cards
* dead links
* `href="#"`
* AI/search recommendation widgets
* map/WhatsApp/payment/provider widgets

Do not duplicate components.

Do not delete working UI without approval.

---

## 5. Critical Preservation Rule

The user has specified:

* existing guest homepage header is ready
* existing owner homepage header is ready
* existing city selector is ready
* preserve existing design
* old homepage hero copy should only be used for the Hero Search Section
* place Hero Search Section below existing header
* do not replace existing header/city selector
* search should route to `/search`
* do not add AI/API/maps/WhatsApp/OTP/payment/Cloudflare now unless already implemented by previous phases

Claude must follow this exactly.

If existing header/city selector exists and works:

* preserve it
* only minimally adjust for role-aware behavior if needed
* do not redesign it
* do not rewrite it from scratch
* do not remove existing responsive behavior
* do not remove existing city selector
* do not break brand layout

If existing header is broken:

* fix it carefully
* preserve visual style as much as possible
* document exact fix

---

## 6. Implementation Scope

This phase may implement:

### 6.1 Public Layout

* public site layout
* homepage composition
* public header
* public footer
* mobile navigation
* responsive container system
* public-safe metadata baseline

### 6.2 Header

* guest header
* logged-in public user header
* role-aware dashboard link
* city selector
* login/register buttons
* profile menu placeholder
* notification bell placeholder with real/no-data state
* mobile menu/drawer
* no public admin link

### 6.3 Footer

* public footer
* role-aware useful links
* legal/help/support links
* no dead links
* no admin links
* no fake social links
* hide footer on dashboard/admin/private layouts where applicable

### 6.4 Homepage

* homepage sections
* hero search section
* search input
* purpose/type/location selection
* `/search` route handoff
* CTA buttons
* safe public content sections
* no fake listing counts
* no fake verified/RERA/payment/lead data

### 6.5 Auth Integration

* login/register button opens existing auth flow/popup
* protected CTA opens auth popup for guests
* logged-in users see dashboard/profile controls
* no admin login shown in public header
* setup-required auth state handled if OTP missing

### 6.6 Responsive UI

* mobile-first behavior
* no horizontal scroll
* no overlap
* brand not wrapping badly
* city selector usable
* mobile menu works
* footer stacks
* hero search usable on 320px+

### 6.7 Docs And Verification

Update required docs and prepare for manual verification.

---

## 7. Out Of Scope For This Phase

Do not implement full:

* property posting system
* project posting system
* requirement posting system
* search/filter engine
* public detail pages
* broker/builder profiles
* dashboards
* admin panel
* CRM/leads
* payments/subscriptions
* media upload
* ads/promotions
* notification delivery
* CMS/blog/legal full system
* maps API
* WhatsApp API
* AI search/recommendations
* analytics dashboards
* PWA/offline

This phase can create placeholder routes/states only when needed for navigation safety.

---

## 8. Design Direction

Public UI must follow:

* mobile-first
* white-first
* premium
* clean
* modern real estate marketplace
* subtle borders
* soft shadows
* consistent cards
* rounded corners
* readable text
* Gujarat/India friendly
* large tap targets
* no clutter
* no harsh colors
* no broken responsive layout

Inspiration is allowed from:

* TailAdmin
* Untitled UI
* Creative Tim
* Dribbble real estate dashboards
* Uiverse components

Do not copy exact proprietary designs.

---

## 9. Brand Rules

Brand:

```txt id="brand-name"
My Gujarat Property
```

Header brand must:

* be visible
* not wrap badly
* not overlap city selector
* fit at 320px
* remain readable
* link to homepage
* not be hidden behind menu

Do not use unsupported claims like:

* “No.1 property site”
* “100% verified”
* “guaranteed deals”
* “best investment”
* “legal guarantee”

Unless the business owner legally approves those claims later.

---

## 10. Header Requirements

Header must support these states:

### 10.1 Guest Header

Guest header should include:

* brand/logo
* city selector
* search shortcut or search input where designed
* public navigation where available
* login/register CTA
* post property/requirement CTA may trigger auth popup
* mobile menu

Guest header must not show:

* dashboard link
* profile menu
* admin link
* fake notification count
* hidden contact
* provider secret/setup internals

### 10.2 Logged-In Owner Header

Owner header should include:

* brand/logo
* city selector
* search
* dashboard link
* post property CTA later/protected
* post requirement CTA later/protected
* notification bell with real/no-data state
* profile menu
* logout

Owner header must hide:

* login/register
* builder project posting as allowed action
* admin link

### 10.3 Logged-In Broker Header

Broker header should include:

* brand/logo
* city selector
* search
* dashboard link
* post property CTA later/protected
* post requirement CTA later/protected
* leads/CRM entry later if dashboard-ready
* notification bell with real/no-data state
* profile menu
* logout

Broker header must hide:

* login/register
* builder project posting as allowed action
* admin link

### 10.4 Logged-In Builder Header

Builder header should include:

* brand/logo
* city selector
* search
* dashboard link
* post project CTA later/protected
* ads/promotions entry later if dashboard-ready
* notification bell with real/no-data state
* profile menu
* logout

Builder header must hide:

* login/register
* normal property posting as allowed action
* admin link

### 10.5 Admin/Staff

Admin/staff must not use public header.

Admin/staff routes have separate internal shell later.

No public header admin link.

---

## 11. Header Mobile Rules

Mobile header must:

* work at 320px
* keep brand readable
* keep city selector accessible
* avoid horizontal scroll
* avoid overlap
* use hamburger/drawer/bottom sheet if needed
* close menu on route change
* close menu on outside tap/back where possible
* keep login/register accessible for guest
* keep profile/logout accessible for logged-in
* not show too many buttons in one row
* not block page content

Mobile tap targets must be large enough.

---

## 12. City Selector Rules

City selector must:

* preserve existing working component
* show selected city
* allow user to change city if existing feature supports
* not break header layout
* not overlap brand
* not be hidden on mobile
* support setup/no-location state if location system not implemented
* avoid loading full Gujarat hierarchy on homepage if heavy
* use safe fallback if location data unavailable
* not rely on maps API in this phase
* not fake IP detection
* not show fake current city

If location backend is not ready:

* keep city selector UI with static/safe placeholder or setup-required state
* route search with selected city only if data available
* document location system `PARTIAL`/`NOT_STARTED`

---

## 13. Hero Search Section Requirements

Hero Search Section should be below existing header.

It may include:

* headline
* subheadline
* purpose selector:

  * Buy
  * Rent
  * Sell/Resale where product wording allows
* category/type selector:

  * Property
  * Project
  * Requirement where appropriate
* location/city selector or search input
* keyword input
* search button
* quick links/chips
* post property/project/requirement CTA based on role/guest
* trust/disclaimer text

Hero search must route to:

```txt id="search-route"
/search
```

Search params can be:

```txt id="search-params"
?purpose=buy
?purpose=rent
?type=property
?city=rajkot
?q=2bhk
```

Use current routing conventions.

Do not implement full search engine here unless already available.

---

## 14. Old Homepage Hero Merge Rule

If there is an old homepage/live-link Hero Search Section reference in project:

* copy only the Hero Search Section concept/content
* place it below existing header
* do not replace existing header
* do not replace city selector
* do not copy unsupported fake claims
* do not copy AI/API/maps/WhatsApp/payment/provider widgets
* preserve current site visual style
* make it responsive
* route search to `/search`
* remove dead buttons

If old content has links that do not exist, convert to safe routes or disabled/setup-required states.

---

## 15. Search Route Placeholder Rules

If `/search` route does not exist, create safe placeholder route.

Placeholder may show:

* search page title
* current query params
* coming-soon/filter foundation
* no fake results
* empty state
* link back/home
* setup note that full search comes in Prompt 05/11

Placeholder must not show:

* fake property cards
* fake project cards
* fake counts
* hidden contact
* fake map
* fake AI recommendations

If `/search` exists, preserve and integrate safely.

---

## 16. Protected CTA Rules

Protected CTAs include:

* Post Property
* Post Requirement
* Post Project
* Save
* Contact/Inquiry
* Dashboard
* Profile
* Notifications

For guest:

* trigger auth popup or redirect to login/register safely
* preserve original intent
* do not show fake success

For logged-in users:

* route based on role
* if feature not implemented yet, show coming-soon/setup-required/disabled reason
* do not create dead links

Examples:

* owner/broker post property route may be placeholder until Prompt 04
* builder post project route may be placeholder until Prompt 04
* dashboard route may be placeholder from Prompt 02
* notification delivery may be not started, bell shows no-data/setup state

---

## 17. Footer Requirements

Public footer must include:

* brand
* short marketplace disclaimer
* public navigation
* search/category links if routes exist
* role links:

  * Owner
  * Broker
  * Builder
* help/support link
* legal links
* contact/grievance link if route exists
* copyright

Footer must not include:

* admin link
* staff link
* fake social links
* broken links
* `href="#"`
* fake listing counts
* hidden contact
* private phone/email unless official public support contact approved
* unsupported legal guarantee claims

If a footer link route does not exist:

* create safe placeholder page only if in scope
* or disable/remove link
* or link to existing support/legal placeholder
* document route missing

No dead links.

---

## 18. Dashboard/Footer Separation Rule

Public footer should not appear on:

* dashboard pages
* admin pages
* full-screen auth flows if designed separately
* private billing pages
* private profile settings pages
* internal staff pages

If current root layout shows footer everywhere, adjust layout structure carefully.

Do not break public homepage.

---

## 19. Public Navigation Rules

Public navigation may include:

* Home
* Search
* Buy
* Rent
* Projects
* Pricing
* Support
* Blog
* About
* Contact

Only include routes that exist or have safe placeholders.

Do not include:

* Admin
* Staff
* Provider settings
* Internal tools
* fake unavailable modules

If a feature is not implemented:

* show disabled/setup-required/coming-soon state where useful
* avoid dead click

---

## 20. Auth Integration Rules

Header/login actions must integrate with Prompt 02 auth foundation.

Rules:

* login/register opens auth popup/page
* mobile OTP setup-required state is honest
* logged-in user hides login/register
* role-based dashboard link appears
* logout works if implemented
* auth errors safe
* no raw provider error
* no fake OTP
* no fake login
* no public admin registration

If auth foundation is partial/setup-required, header must handle that safely.

---

## 21. Notification Bell Rules

If notification system is not implemented yet:

* do not show fake unread count
* show bell with zero/no-data state only if useful
* clicking can open setup/no notifications placeholder
* or hide until implemented
* document feature status

If shown:

* unread badge must be real
* no fake notifications
* no private data
* mobile dropdown/bottom sheet safe

Full notifications are Prompt 12.

---

## 22. Profile Menu Rules

Logged-in profile menu may include:

* user name
* role label
* dashboard
* profile/settings
* theme setting placeholder if implemented
* support
* logout

Must not include:

* admin link for public users
* fake verified badge
* fake plan
* fake notifications
* hidden provider status

If profile data not loaded:

* show loading state
* show safe fallback
* do not leak email/mobile publicly

---

## 23. Theme Toggle Rules

If theme toggle already exists, preserve it.

If not implemented, do not overbuild.

A simple placeholder or no theme toggle is acceptable.

If implemented:

* options:

  * light
  * dark
  * system
* no unreadable colors
* store user preference only if foundation exists
* do not break white-first visual style

Full theme system can be later.

---

## 24. Homepage Content Sections

Homepage may include safe sections like:

* hero search
* browse by city
* browse by property type
* why use My Gujarat Property
* role cards:

  * Owner
  * Broker
  * Builder
* how it works
* latest listings placeholder only if real data exists
* project spotlight placeholder only if real data exists
* safety/disclaimer section
* CTA section
* support/legal links

Rules:

* no fake listing cards
* no fake counts
* no fake “verified” stats
* no fake testimonials
* no fake reviews
* no fake RERA
* no fake payment/provider status
* no fake analytics
* no fake city inventory

If data is not connected, show content that does not claim live data.

---

## 25. Homepage Copy Rules

Copy should be clear and truthful.

Allowed tone:

* “Find properties and projects across Gujarat.”
* “Post your property or requirement after login.”
* “Builders can showcase approved projects.”
* “Contact details are protected until authorized inquiry/reveal.”
* “Always verify property documents independently.”

Avoid:

* guaranteed deals
* guaranteed legal title
* guaranteed verified property
* fake counts
* fake user numbers
* fake leads
* fake “best price”
* fake “instant approval”
* fake RERA guarantee

---

## 26. Public Legal/Disclaimer Baseline

Homepage/footer may include disclaimer text:

```txt id="public-disclaimer-example"
My Gujarat Property is a real estate marketplace. Users should independently verify property documents, ownership, RERA details and legal information before any transaction.
```

Do not claim platform is legal advisor.

Do not claim verification is legal guarantee.

Full legal pages are later Prompt 11.

---

## 27. No AI Rule For This Phase

Do not add:

* AI search
* AI recommendations
* AI chatbot
* AI property valuation
* AI legal advice
* AI price prediction
* AI lead scoring
* AI writing tools

If any existing AI component exists:

* document as out of current scope
* disable behind feature flag if unsafe
* do not make it public unless explicitly approved

---

## 28. No Provider Integration Rule For This Phase

Do not add new real integrations for:

* Google Maps API
* WhatsApp API
* Razorpay
* Cloudflare R2
* CDN
* SMS/OTP provider
* email provider
* analytics
* push
* Turnstile

This phase may only show setup-required states or use already completed Prompt 02 auth foundation.

Full provider work is later prompts.

---

## 29. No Fake Data Rule

Do not show fake:

* property cards
* project cards
* requirements
* verified badges
* RERA badges
* listing counts
* user counts
* leads
* reviews
* ratings
* payment success
* provider status
* notifications
* analytics
* city inventory
* ad banners
* sponsored placements

If placeholder content is needed, label clearly as:

* coming soon
* no data yet
* setup required
* feature not implemented yet

Never make placeholder look like real production data.

---

## 30. SEO Baseline For Public UI

Basic SEO baseline:

* homepage title/meta aligned with brand
* no private data in metadata
* no fake schema
* no fake reviews/ratings
* no hidden contact in metadata
* search placeholder noindex if no real results
* admin/dashboard noindex from Prompt 02/other layout
* legal footer links not fake

Full SEO comes in Prompt 05 and Prompt 11.

---

## 31. Accessibility Requirements

Public UI must include:

* semantic header/nav/main/footer
* readable text
* labels for search inputs
* buttons have clear text
* icon buttons have aria labels
* focus visible
* mobile menu keyboard accessible where possible
* dropdown close behavior
* alt text for logo/images
* no color-only status
* good contrast
* large tap targets

Severe accessibility blockers must be logged.

---

## 32. Responsive Requirements

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

Public UI must have:

* no horizontal scroll
* no overlap
* brand readable
* city selector usable
* header actions usable
* mobile menu works
* hero search usable
* footer stacks nicely
* search button visible
* no sticky element covers content
* text wraps correctly
* cards/sections responsive

If not fully checked, mark verification pending/partial.

---

## 33. Interaction Rules

Implement safe interactions:

* mobile menu open/close
* outside tap close if applicable
* escape close where applicable
* auth popup trigger
* search submit
* city selector open/close
* profile menu open/close
* no nested button conflict
* `stopPropagation` where needed
* no accidental copy
* no double submit
* no dead click

Back button behavior for popup/menu should be safe where implemented.

---

## 34. Search Form Behavior

Search form should:

* validate/normalize inputs
* route to `/search`
* preserve query params
* not crash on empty input
* allow city/type/purpose selection where available
* not call non-existent API
* not show fake result count
* not block if full search backend not ready
* keep form usable on mobile

If search route placeholder:

* show query received
* show no results/coming soon
* no fake cards

---

## 35. Location / City Handling In This Phase

Do not implement full Gujarat location database in this phase.

Allowed:

* preserve existing city selector
* use static safe initial city list if already exists
* show selected city
* pass city slug/name to `/search`
* show setup/no-location state if backend missing

Do not:

* fake IP city detection
* call maps API
* load huge location hierarchy
* create fake “nearby” results
* show fake city listing counts

Full location system later Prompt 11.

---

## 36. Public Search Placeholder Route

If created, `/search` placeholder should include:

* heading
* search params summary
* filters coming later note
* empty/no data state
* link back to home
* optional auth protected CTA
* noindex if no real data
* no fake listings

Example message:

```txt id="search-placeholder-copy"
Search foundation is ready. Full property, project and requirement results will be connected in the search/detail phase.
```

Keep it professional, not broken.

---

## 37. Header Route Safety

Header links must route safely.

Recommended:

```txt id="header-routes"
/
 /search
 /pricing
 /support
 /dashboard
 /dashboard/owner
 /dashboard/broker
 /dashboard/builder
```

If route missing:

* create safe placeholder if in scope
* or remove/hide link
* or show disabled reason

Do not use `href="#"`.

---

## 38. Footer Route Safety

Footer links must be safe.

Possible future routes:

```txt id="footer-routes"
/about
/contact
/support
/help
/faq
/blog
/legal/privacy
/legal/terms
/legal/refund-policy
/legal/listing-policy
/legal/advertising-policy
/legal/verification-policy
/legal/disclaimer
/pricing
/search
```

If routes are not implemented:

* avoid link
* or create basic placeholder legal/support pages only if safe
* or point to existing route
* do not leave broken/dead links

Full CMS/legal comes in Prompt 11.

---

## 39. Public Header No Admin Rule

Search public UI for:

* `/admin`
* “Admin”
* “Staff”
* “Super Admin”
* provider settings links
* internal tools

None should appear in public header/footer.

Admin route can exist but must be separate and hidden from public UI.

If public admin link exists:

* remove it
* create bug
* update security checklist

---

## 40. Existing Design Preservation Test

Before finalizing, compare with existing UI.

Verify:

* existing header still present if it existed
* existing city selector still present if it existed
* existing guest/owner header behavior preserved or improved safely
* old hero was not used to replace header
* homepage not visually broken
* no large unexpected redesign
* no working feature removed

If any approved UI changed significantly:

* document reason
* create rollback note
* ask approval if major

---

## 41. Component Structure Recommendation

Use/align with current structure.

Possible components:

```txt id="public-ui-components"
components/layout/PublicLayout.tsx
components/layout/PublicHeader.tsx
components/layout/PublicFooter.tsx
components/public/HomeHeroSearch.tsx
components/public/CitySelector.tsx
components/public/HomeRoleCards.tsx
components/public/HomeHowItWorks.tsx
components/public/HomeDisclaimer.tsx
components/auth/AuthTrigger.tsx
```

Do not create duplicates if components already exist.

Prefer small reusable components.

---

## 42. State Handling Requirements

Every public UI interactive module must have states where relevant:

* loading
* empty
* error
* unauthorized
* setup-required
* disabled
* success

Examples:

* auth provider setup-required
* city list unavailable
* search route placeholder
* profile menu loading
* notification no-data
* CTA disabled because feature later phase

No blank broken sections.

---

## 43. Performance Requirements

Public UI must:

* avoid heavy client JS
* keep homepage fast
* avoid loading admin/dashboard code
* avoid loading maps
* avoid loading payment scripts
* avoid loading analytics SDK if not configured
* lazy-load non-critical sections if needed
* optimize images
* reduce layout shift
* avoid huge hero image
* use server components where suitable
* keep interactive components minimal

No heavy provider scripts in this phase.

---

## 44. Image Rules

If homepage uses images:

* use optimized image component if available
* include width/height
* include alt text
* no distorted images
* no huge unoptimized image
* no fake property/project image as real listing
* no copyrighted images unless already allowed
* use abstract/brand-safe graphics if needed

If no image asset exists, use clean CSS/card layout instead.

---

## 45. Error Handling

Errors must be safe.

Do not show:

* raw SQL error
* raw provider error
* secret values
* stack traces
* hidden contact
* private profile data

Show user-safe errors:

```txt id="safe-error-examples"
Something went wrong. Please try again.
Search is not fully connected yet.
Authentication provider setup required.
Location data is not available yet.
```

---

## 46. Build/Lint/Typecheck Requirements

Run available checks:

```txt id="checks"
npm run lint
npm run typecheck
npm run build
npm test
```

or package manager equivalent.

If script missing, document `NOT_CONFIGURED`.

If command fails:

* fix safe issues
* create bug if not fixed
* do not mark PASS

---

## 47. Manual Smoke Checks

If app runs, manually check:

* homepage loads
* header visible
* city selector visible
* brand not broken
* login/register visible for guest
* login/register hidden for logged-in user if test user available
* dashboard link appears for logged-in role if available
* admin link not visible publicly
* hero search visible below header
* search routes to `/search`
* footer visible on public page
* footer not visible on dashboard if dashboard layout exists
* no dead links
* no `href="#"`
* no fake counts
* no horizontal scroll at common mobile widths
* no console crash

Record results.

Full verification in matching manual prompt.

---

## 48. SQL Migration Rule

Prompt 03 should normally not require DB migration.

If DB changes are necessary:

* create migration under `supabase/migrations/`
* include purpose comments
* include rollback notes
* explain why UI phase needed DB change
* update security/deployment docs

Avoid DB changes in this phase unless absolutely needed.

---

## 49. API Provider Status Updates

Update `API_PROVIDER_STATUS.md` only if provider status changes.

Possible updates:

* Auth provider setup-required state used in UI
* Location provider not started/setup-required
* Maps API not used
* Notifications not started/setup-required
* Analytics not used/setup-required

Do not mark provider active.

---

## 50. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

* public layout
* homepage
* existing header preservation
* city selector preservation
* guest header
* logged-in role-aware header
* mobile header/menu
* public footer
* hero search section
* search route placeholder
* auth popup trigger from header/CTA
* dashboard CTA routing
* no public admin link
* footer legal/help links
* no fake data public UI
* responsive baseline
* accessibility baseline
* no dead links baseline
* no horizontal scroll baseline

Use accurate statuses.

---

## 51. Changelog Update

Update `CHANGELOG.md`.

Entry should include:

* date
* Prompt 03
* summary
* changed UI files
* changed route files
* changed docs
* provider status changes if any
* tests/checks run
* responsive status
* known issues
* rollback notes
* manual verification pending

---

## 52. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* header brand wraps badly
* city selector missing/broken
* login button dead
* search button dead
* `/search` route missing
* footer dead link
* `href="#"`
* public admin link
* fake count shown
* fake listing card shown
* fake verified badge
* hidden contact leak
* footer appears in dashboard
* horizontal scroll
* mobile menu broken
* build failure
* old header replaced incorrectly
* auth popup not connected
* setup-required state missing

Use existing bug convention.

---

## 53. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 03 implementation status
* manual verification pending:

  * `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
* routes needing verification
* responsive widths needing verification
* known issues
* setup-required states

Do not mark manual verification PASS from implementation prompt alone.

---

## 54. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md` if relevant.

Check/update:

* no public admin link
* no hidden contact in public UI
* auth popup triggers protected actions
* logged-in role-aware header does not reveal private data
* no private dashboard footer leak
* no provider secrets in UI
* no fake verification/RERA/payment badge
* private routes still protected

---

## 55. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md` for public UI.

Include:

* homepage bundle baseline
* no heavy provider scripts
* image optimization status
* no maps/payment scripts loaded
* public UI build status
* responsive performance status
* search placeholder no heavy query
* public caching/no private cache notes if applicable

---

## 56. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* files changed
* UI rollback notes
* route rollback notes
* feature flag/setup-required notes if any
* no DB migration or migration rollback if used
* public UI deployment risk
* cache purge notes if public layout changed

---

## 57. Brain Update

Update `brain.md`.

Include:

* Prompt 03 implementation summary
* changed files
* routes/components added/changed
* existing header/city selector preservation status
* search route status
* auth integration status
* footer status
* responsive status
* tests/checks run
* bugs/setup-required
* next prompt:

  * `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`
* exact resume instruction

---

## 58. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/page.tsx
app/page.tsx
src/app/layout.tsx
app/layout.tsx
src/app/search/page.tsx
app/search/page.tsx
src/components/layout/PublicLayout.tsx
src/components/layout/PublicHeader.tsx
src/components/layout/PublicFooter.tsx
src/components/public/HomeHeroSearch.tsx
src/components/public/CitySelector.tsx
src/components/public/HomeRoleCards.tsx
src/components/public/HomeHowItWorks.tsx
src/components/auth/AuthTrigger.tsx
src/styles/globals.css
src/app/globals.css
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

Only change needed files.

Do not duplicate components.

---

## 59. Expected Output From This Phase

At the end of Prompt 03 implementation, the project should have:

* public homepage working
* existing header/city selector preserved or safely fixed
* role-aware header foundation
* public footer foundation
* hero search section below header
* `/search` route or safe placeholder
* auth/login/register trigger integration
* no public admin link
* no dead links/buttons in touched UI
* no fake data
* mobile-first responsive baseline
* docs updated
* checks run
* manual verification pending

---

## 60. Forbidden Outcomes

This phase must not leave:

* existing header replaced without reason
* city selector removed
* old hero replacing entire homepage/header
* fake property/project cards
* fake counts
* fake verified/RERA badges
* fake notification count
* fake search results
* fake provider success
* public admin link
* dead footer links
* `href="#"`
* dashboard footer leak if avoidable
* horizontal scroll
* broken mobile menu
* hidden contact in public UI
* service role/provider secrets in client
* full search/SEO/payment/media implemented prematurely
* AI feature added
* maps loaded unnecessarily
* payment script loaded unnecessarily

---

## 61. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification is pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* existing UI preserved but some responsive checks pending
* search route placeholder only
* auth provider setup-required
* footer links partially placeholder
* full mobile testing pending
* some future routes not implemented but safe
* non-critical UI bugs documented

### `FAIL`

Use if:

* build fails
* homepage broken
* header/city selector removed accidentally
* public admin link exists
* hidden contact leaks
* fake data shown as real
* search button dead
* major mobile break
* service role/provider secret exposed

### `BLOCKED`

Use if:

* Prompt 02 auth foundation missing/failed
* existing UI architecture conflict requires owner decision
* cannot inspect required files
* build/tooling broken from previous phase

---

## 62. Final Response Required Format

Return final response in this structure:

```txt id="prompt-03-final-response-format"
Summary:
- what public UI/header/footer/hero work was implemented

Existing UI preservation:
- header:
- city selector:
- homepage:

Changed files:
- path list

Routes:
- homepage:
- search:
- auth:
- dashboard links:
- footer links:

UI features:
- guest header:
- logged-in role-aware header:
- footer:
- hero search:
- mobile menu:
- auth trigger:

Security/privacy:
- public admin link:
- hidden contact:
- fake data:
- provider secrets:

Responsive status:
- widths checked or pending:
- known issues:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Setup-required:
- provider/config list

Rollback notes:
- UI rollback:
- route rollback:
- docs rollback:

Manual verification:
- pending prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md

Next step:
- run prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

Do not say only “done”.

---

## 63. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

Do not start Prompt 04 until Prompt 03 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 64. Common Public UI Bugs To Watch For

Create/track bugs for:

* `BUG-UI-HEADER-REMOVED`
* `BUG-UI-CITY-SELECTOR-REMOVED`
* `BUG-UI-BRAND-WRAP`
* `BUG-UI-HEADER-OVERLAP`
* `BUG-UI-MOBILE-HORIZONTAL-SCROLL`
* `BUG-UI-MOBILE-MENU-BROKEN`
* `BUG-UI-HERO-SEARCH-DEAD`
* `BUG-UI-SEARCH-ROUTE-MISSING`
* `BUG-UI-FOOTER-DEAD-LINK`
* `BUG-UI-HREF-HASH`
* `BUG-UI-PUBLIC-ADMIN-LINK`
* `BUG-UI-FAKE-LISTING-DATA`
* `BUG-UI-FAKE-COUNT`
* `BUG-UI-FAKE-VERIFIED-BADGE`
* `BUG-UI-HIDDEN-CONTACT-LEAK`
* `BUG-UI-DASHBOARD-FOOTER-LEAK`
* `BUG-UI-AUTH-TRIGGER-BROKEN`
* `BUG-UI-SETUP-REQUIRED-MISSING`
* `BUG-UI-BUILD-FAIL`
* `BUG-UI-ACCESSIBILITY-AUTH-BLOCKER`

Use existing bug ID convention if available.

---

## 65. Quality Bar

This phase is successful when:

* public homepage loads
* existing approved header/city selector remains intact
* Hero Search Section appears below header
* search routes to `/search`
* guest login/register works or setup-required state is honest
* logged-in header hides login/register
* role dashboard links are correct
* public footer has no dead links
* admin link is absent from public UI
* mobile layout is usable
* no horizontal scroll
* no fake data
* no hidden contact leak
* docs are updated
* checks are run
* manual verification is ready

---

## 66. Final Rule For Prompt 03

Preserve existing header and city selector.

Add Hero Search Section below existing header.

Keep public UI mobile-first and clean.

Do not add fake listings.

Do not add fake counts.

Do not add fake verified badges.

Do not add public admin link.

Do not add AI features.

Do not add maps/payment/WhatsApp/Cloudflare integrations now.

Do not expose hidden contact.

Do not expose provider secrets.

Do not leave dead links.

Do not leave `href="#"`.

Do not skip responsive checks.

Do not skip docs updates.

Do not skip manual verification.

No fake PASS.
