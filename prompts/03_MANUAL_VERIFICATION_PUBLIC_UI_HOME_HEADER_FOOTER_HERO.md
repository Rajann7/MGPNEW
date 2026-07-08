# prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md

# My Gujarat Property — Prompt 03 Manual Verification: Public UI, Home, Header, Footer And Hero Search

> **DESIGN-MATCH CHECK (mandatory):** In addition to the checks below, verify each built screen matches the finished wireframes at `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 1 & 3** side-by-side, and that every "Design Add-Ons" item in `docs/05`/`docs/13` (see `design-prompts/DESIGN_ADDONS_MASTER.md`) is present. Confirm locked tokens, contextual mobile header + back button, and honesty states.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

This prompt verifies the **Public UI, Homepage, Header, Footer, City Selector, Hero Search Section and Public Navigation Foundation** phase.

Do not skip this verification.

Do not start Prompt 04 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real UI/responsive/security checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
Prompt Number: 03 Verification
Phase: Public UI, Home, Header, Footer And Hero Search
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
Previous Prompt: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
Next Implementation Prompt: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the public UI foundation is safe, responsive and ready for the marketplace feature phases.

This verification checks:

* homepage loads
* existing header preserved
* existing city selector preserved
* Hero Search Section appears below header
* search routes to `/search`
* guest header behavior
* logged-in role-aware header behavior
* public footer behavior
* footer hidden from dashboard/admin where required
* no public admin link
* no dead links
* no `href="#"`
* no fake marketplace data
* no fake counts
* no fake verified/RERA/payment badges
* no hidden contact leak
* auth popup trigger behavior
* setup-required state behavior
* search placeholder behavior
* mobile menu behavior
* responsive widths
* accessibility baseline
* build/lint/typecheck checks
* docs updated
* Prompt 04 readiness

This verification does not require full property/project/requirement features. Those are Prompt 04.

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
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 03.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* public homepage
* public layout
* public header
* city selector
* guest navigation
* logged-in role-aware navigation
* public footer
* hero search section
* `/search` route placeholder/foundation
* protected CTA auth trigger
* mobile menu
* responsive behavior
* no dead links
* no fake data
* no public admin link
* no hidden contact leak
* docs/checklist updates

This verification does not cover:

* full listing data
* full search/filter engine
* property/project/requirement forms
* lead/inquiry system
* payment
* media upload
* ads
* notifications delivery
* CMS/legal full pages
* analytics
* PWA

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 03 changed files
3. inspect homepage route
4. inspect layout/header/footer components
5. inspect city selector
6. inspect hero search section
7. inspect `/search` route
8. inspect auth trigger integration
9. inspect role-aware header logic
10. inspect mobile menu/drawer
11. inspect footer links
12. search for dead links and `href="#"`
13. search for public admin link
14. search for fake data/counts/badges
15. run build/lint/typecheck/tests
16. manually test routes/UI where possible
17. test responsive widths where possible
18. update docs
19. create bugs for failures
20. decide verification result
21. update `brain.md`
22. prepare Prompt 04 readiness note

Do not skip docs updates.

---

## 6. Required File And Route Inspection

Inspect likely files:

```txt id="public-ui-file-inspection"
src/app/page.*
app/page.*
src/app/layout.*
app/layout.*
src/app/search/page.*
app/search/page.*
src/components/layout/PublicLayout.*
src/components/layout/PublicHeader.*
src/components/layout/PublicFooter.*
src/components/public/HomeHeroSearch.*
src/components/public/CitySelector.*
src/components/public/HomeRoleCards.*
src/components/public/HomeHowItWorks.*
src/components/auth/AuthTrigger.*
src/components/auth/*
src/styles/*
src/app/globals.css
app/globals.css
```

Also inspect docs:

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

Record exact files changed by Prompt 03.

---

## 7. Homepage Load Verification

Verify homepage route:

```txt id="homepage-route"
/ 
```

Check:

* page loads without crash
* no build/runtime import error
* brand visible
* header visible
* city selector visible if existing/implemented
* Hero Search Section visible below header
* main content visible
* footer visible
* no blank screen
* no infinite spinner
* no fake data displayed
* no public admin link
* no hidden contact
* no raw provider error

If homepage fails to load:

* create bug
* mark verification `FAIL`

---

## 8. Existing Header Preservation Verification

The user required existing guest/owner header preservation.

Verify:

* existing header was not replaced unnecessarily
* header visual style is still consistent
* brand still visible
* city selector still present
* guest header still works
* owner/logged-in header still works if previously existed
* old hero did not replace the header
* existing header responsive behavior not broken
* no major redesign without approval

If header was replaced/remade without reason:

* create bug
* mark `FAIL` or `PARTIAL` depending severity
* add rollback note

---

## 9. City Selector Preservation Verification

Verify city selector:

* still visible
* still accessible
* does not overlap brand
* does not cause horizontal scroll
* works on mobile
* selected city displays safely
* no fake IP detection
* no maps API dependency in this phase
* no fake current city
* if backend missing, setup/no-location state is honest

If city selector removed or broken:

* create bug
* mark `FAIL`

---

## 10. Hero Search Section Verification

Verify Hero Search Section:

* appears below existing header
* does not replace header
* matches overall design
* mobile responsive
* has clear headline/subheadline
* has search input or selectors
* has search button
* routes to `/search`
* preserves query params where implemented
* handles empty search safely
* no fake result count
* no fake listing cards
* no AI recommendation
* no maps provider dependency
* no dead CTA

If hero search button does nothing:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 11. Search Route Verification

Verify route:

```txt id="search-route"
/search
```

Check:

* route exists or intentionally redirects safely
* query params accepted safely
* placeholder clearly says full search comes later if full search not implemented
* no fake results
* no fake counts
* no hidden contact
* no raw errors
* no dead filter controls
* no AI recommendation
* no fake map
* no provider script loaded unnecessarily
* noindex if placeholder/no real search data

If `/search` route missing while hero links to it:

* create bug
* mark `FAIL`

---

## 12. Guest Header Verification

As guest, verify header shows:

* brand
* city selector
* search/nav
* login/register
* protected post CTA if designed

As guest, header must not show:

* dashboard link
* profile menu
* admin link
* staff link
* fake notification badge
* hidden contact
* fake verified badge
* provider secrets

Guest protected CTA should:

* open auth popup/page
* preserve intent where implemented
* show setup-required if auth provider missing
* not fake login

---

## 13. Logged-In Header Verification

If test users are available, verify for each public role.

### Owner

Header should show:

* dashboard link
* profile/logout
* owner-appropriate CTAs
* no login/register

Header should not show:

* admin link
* builder project CTA as allowed action
* fake notification count

### Broker

Header should show:

* dashboard link
* profile/logout
* broker-appropriate CTAs
* no login/register

Header should not show:

* admin link
* builder project CTA as allowed action
* fake notification count

### Builder

Header should show:

* dashboard link
* profile/logout
* builder project CTA if safe
* no login/register

Header should not show:

* admin link
* owner/broker property posting as allowed action
* fake notification count

If auth providers are setup-required and login cannot be tested:

* inspect role-aware code
* mark runtime role header test `SETUP_REQUIRED` or `PARTIAL`
* do not mark full PASS unless accepted

---

## 14. Admin Link Absence Verification

Public UI must not show admin/staff links.

Search UI/code for visible public references:

```txt id="admin-link-search"
Admin
Staff
Super Admin
/admin
/admin/login
Provider Settings
Internal
Audit Logs
System Settings
```

It is okay for admin route to exist internally.

It is not okay for public header/footer/homepage to link it.

If public admin link is visible:

* remove/fix if safe
* create critical bug
* mark `FAIL`

---

## 15. Footer Verification

Verify public footer:

* visible on homepage/public pages
* contains brand
* contains marketplace disclaimer
* contains legal/help/support links where safe
* contains no admin/staff links
* contains no fake counts
* contains no fake social links
* contains no `href="#"`
* links route to existing pages or safe placeholders
* responsive on mobile
* no horizontal scroll
* does not expose private contact
* does not claim legal guarantee

Footer links must be real or intentionally disabled/omitted.

Dead footer link is a bug.

---

## 16. Dashboard/Footer Separation Verification

If dashboard routes exist, verify:

* public footer not shown in dashboard/private layouts where required
* public footer not shown in admin/internal pages
* dashboard has appropriate shell/placeholder if implemented
* no public footer leaking into full-screen auth/internal flows unless intentionally designed

If footer appears on admin page:

* create bug
* mark `PARTIAL` or `FAIL` depending severity

---

## 17. Dead Link Verification

Search for:

```txt id="dead-link-patterns"
href="#"
href=""
javascript:void(0)
TODO link
coming soon link with no disabled state
```

Also manually click/touch key links:

* logo
* search
* login/register
* dashboard
* post CTA
* support/help
* footer legal links
* footer contact
* mobile menu links

Rules:

* no dead links
* no broken routes
* no fake success
* missing future route should be hidden/disabled/placeholder

If dead links exist:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 18. Fake Data Verification

Search for fake public data.

Look for:

* hardcoded property cards
* fake project cards
* fake user counts
* fake city counts
* fake views
* fake leads
* fake reviews/testimonials
* fake ratings
* fake verified badges
* fake RERA badges
* fake payment/provider status
* fake notification count
* fake “featured/sponsored” ads

If placeholders are present, verify they are clearly labeled as placeholder/coming later and not presented as real marketplace data.

If fake data appears real:

* create bug
* mark `FAIL`

---

## 19. Hidden Contact Leak Verification

Public UI must not show hidden contact.

Check:

* homepage
* header
* footer
* search placeholder
* profile menu public info
* metadata if easy
* public cards/sections if any

Search for hardcoded:

* phone numbers
* personal emails
* WhatsApp numbers
* private addresses
* hidden contact fields

Official support contact may be allowed only if business approved and public, but must not be private user contact.

If hidden/private contact leaks:

* create critical bug
* mark `FAIL`

---

## 20. Auth Trigger Verification

Test protected actions as guest:

* login/register button
* post property CTA
* post requirement CTA
* post project CTA if visible
* dashboard CTA
* save/contact if any present

Expected:

* opens auth popup/page
* or redirects to login safely
* preserves intent where implemented
* shows setup-required if OTP provider missing
* does not fake success
* does not expose admin login
* no dead click

If auth trigger is broken:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 21. Notification Bell Verification

If notification bell appears:

* unread count must be real or zero/no-data
* no fake notification count
* dropdown/bottom sheet opens if implemented
* empty state shown if no notifications
* no private data shown to wrong user
* no guest notification bell unless intentionally public/no-data

If notification system not implemented, hiding bell is acceptable.

Fake badge is a bug.

---

## 22. Profile Menu Verification

If logged-in profile menu exists:

* shows safe display name/role
* does not show hidden mobile/email publicly in header
* dashboard link correct by role
* settings/profile link safe
* logout works if auth available
* no admin link for public user
* no fake verified/plan badge
* menu closes properly

If auth unavailable, inspect code and mark runtime test setup-required.

---

## 23. Mobile Menu Verification

Verify mobile menu:

* opens
* closes
* links are tappable
* no admin link
* no dead links
* no horizontal scroll
* no overlap with brand/city selector
* body scroll behavior acceptable
* menu closes on link click where applicable
* guest/login state correct
* logged-in role state correct if testable

If mobile menu traps user or breaks layout:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 24. Responsive Verification

Test required widths:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

For each width check:

* homepage loads
* no horizontal scroll
* no overlap
* header readable
* brand not wrapping badly
* city selector usable
* login/register accessible
* mobile menu usable
* hero search usable
* search button visible
* footer stacked/readable
* no sticky UI covering content
* no text clipped badly
* no buttons too tiny
* no card overflow
* no modal/popup overflow if opened

If not all widths tested, mark responsive result `PARTIAL` or `NOT_TESTED`.

Do not claim responsive PASS without testing.

---

## 25. Browser Verification

If possible, test at least:

* Chrome/Chromium
* mobile viewport emulator
* one additional browser if available

If not possible, document browser testing as `NOT_TESTED`.

Do not fake cross-browser PASS.

---

## 26. Accessibility Verification

Check public UI baseline:

* semantic `header`
* semantic `nav`
* semantic `main`
* semantic `footer`
* input labels
* button text clear
* icon buttons have aria labels
* focus visible
* color contrast acceptable
* dropdown/menu keyboard usable where possible
* alt text for logo/images
* no color-only critical state
* error/setup-required text readable
* tap targets large enough

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 27. SEO Baseline Verification

Check homepage/search placeholder metadata:

* homepage title/meta brand-aligned
* no private data in metadata
* no fake review/rating schema
* no hidden contact in schema
* `/search` placeholder noindex if it has no real results
* admin/dashboard noindex still respected
* canonical not broken if implemented
* footer legal links not fake

Full SEO is later.

If fake schema/private metadata exists:

* create bug
* mark `FAIL`

---

## 28. Performance Baseline Verification

Check:

* homepage build passes
* no heavy provider scripts loaded unnecessarily
* no maps script loaded in this phase
* no payment script loaded in this phase
* no analytics SDK loaded if not configured
* no huge image blocking hero
* images optimized where used
* no admin/dashboard code imported into public page unnecessarily
* no unbounded data fetch for fake public data

If heavy provider script added unnecessarily:

* create bug
* mark `PARTIAL`

---

## 29. Security/Privacy Verification

Verify:

* no public admin link
* no service role/provider secrets in client
* no hidden contact
* no private profile email/mobile in header/home/footer
* auth provider errors safe
* protected actions require auth/setup-required
* logged-in header role data from profile, not fake
* no fake verified badge
* no public dashboard/admin data

If any security/privacy leak exists:

* mark `FAIL`

---

## 30. Build / Lint / Typecheck Verification

Run available checks with detected package manager.

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

## 31. Manual Route Smoke Test

Run/manual check:

```txt id="route-smoke-list"
/
/search
/dashboard
/dashboard/owner
/dashboard/broker
/dashboard/builder
/admin
/admin/login
```

Expected:

* `/` loads public homepage
* `/search` loads safe placeholder or real safe search
* dashboard routes protected/placeholder per Prompt 02
* `/admin` protected
* `/admin/login` not linked publicly
* no private data on public routes

If route not yet implemented but not linked publicly, record as not in scope.

If linked route missing, create bug.

---

## 32. Search Form Manual Test

Test search form:

* empty submit
* keyword submit
* city selected submit
* purpose selected submit
* type/category selected submit
* mobile submit
* keyboard enter if applicable

Expected:

* routes to `/search`
* query params safe
* no crash
* no fake result count
* no dead button
* no open redirect
* no raw error

If broken, create bug.

---

## 33. City Selector Manual Test

Test city selector:

* open
* close
* select city if available
* no selection state
* mobile tap
* small screen layout
* no overlap
* no fake IP detection
* search receives selected city only if implemented

If selector is setup-only:

* show honest state
* no fake city

---

## 34. Header State Manual Test Matrix

Use available test sessions/users.

| User State  | Expected                                         |
| ----------- | ------------------------------------------------ |
| Guest       | login/register visible                           |
| Owner       | dashboard/profile visible, login/register hidden |
| Broker      | dashboard/profile visible, login/register hidden |
| Builder     | dashboard/profile visible, login/register hidden |
| Admin/Staff | public header not used for admin shell           |

If test users are unavailable:

* inspect code
* mark runtime test `SETUP_REQUIRED` or `PARTIAL`

---

## 35. Public Footer Link Matrix

Check footer links.

Suggested matrix:

| Link                | Expected                           |
| ------------------- | ---------------------------------- |
| Home                | `/` works                          |
| Search              | `/search` works                    |
| Pricing             | route exists or hidden/placeholder |
| Support             | route exists or hidden/placeholder |
| About               | route exists or hidden/placeholder |
| Contact             | route exists or hidden/placeholder |
| Privacy             | route exists or hidden/placeholder |
| Terms               | route exists or hidden/placeholder |
| Refund/Cancellation | route exists or hidden/placeholder |
| Listing Policy      | route exists or hidden/placeholder |
| Ads Policy          | route exists or hidden/placeholder |
| Disclaimer          | route exists or hidden/placeholder |

No `href="#"`.

No fake social links.

---

## 36. Existing UI Regression Check

Compare before/after if possible.

Verify:

* existing approved header still exists
* city selector still exists
* old hero not replacing header
* homepage not visually broken
* auth flow still usable
* dashboard route guards still work from Prompt 02
* no working route removed
* no working component deleted
* no unexpected major design rewrite

If regression found:

* create bug
* update rollback notes
* mark `PARTIAL` or `FAIL`

---

## 37. Documentation Update Verification

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

If docs were not updated:

* update them
* mark verification `PARTIAL` until fixed

---

## 38. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

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
* auth trigger from header/CTA
* dashboard CTA routing
* no public admin link
* footer legal/help links
* no fake public data
* responsive baseline
* accessibility baseline
* no dead links baseline
* no horizontal scroll baseline

Future features must not be marked done.

---

## 39. Changelog Verification

Check `CHANGELOG.md` includes Prompt 03 entry with:

* date
* summary
* changed files
* public UI changes
* route changes
* docs updated
* tests/checks run
* responsive status
* known issues
* rollback notes
* verification status

If missing, update changelog.

---

## 40. Bugs And Fixes Verification

If issues found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

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

## 41. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 03 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes tested
* header states tested
* responsive widths tested
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “looks good”.

---

## 42. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 03 results for:

* no public admin link
* no hidden contact leak
* auth CTA protected
* no provider secrets in UI
* no fake verified/RERA/payment badges
* dashboard/admin routes remain protected
* no public private profile data
* no dead auth/security route
* known issues

---

## 43. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 03 results for:

* homepage build status
* no heavy provider scripts
* image optimization status
* public UI performance notes
* mobile responsiveness
* no unbounded data fetch
* search placeholder no heavy query
* Core Web Vitals not measured or measured
* known performance issues

---

## 44. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 03 changed UI files
* route changes
* no DB migration or migration list
* rollback notes for homepage/header/footer/hero
* cache purge notes if public UI changed
* deployment risk level
* verification status

If existing header was modified, rollback notes are mandatory.

---

## 45. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md` only if statuses changed.

Relevant statuses:

* auth provider setup-required state used
* location provider not started/setup-required
* maps not used
* notifications not started/setup-required
* analytics not used/setup-required

Provider status must remain honest.

No provider marked active because UI exists.

---

## 46. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 03 implementation summary
* Prompt 03 verification result
* routes checked
* header/city selector preservation result
* hero search result
* footer result
* responsive result
* bugs/blockers
* setup-required states
* tests/checks run
* next prompt:

  * `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`
* instruction not to proceed if Prompt 03 failed/blocked

---

## 47. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* homepage loads
* build passes
* existing header preserved or safely fixed
* city selector preserved or safely fixed
* hero search appears below header
* search routes to `/search`
* no dead key links
* no `href="#"` in touched UI
* no public admin link
* no fake public data
* no hidden contact leak
* guest header correct
* logged-in header behavior verified or setup-required documented
* footer public-safe and responsive
* dashboard/admin footer separation checked where applicable
* responsive widths checked
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* UI works but not all responsive widths tested
* logged-in states cannot be runtime-tested due to auth setup-required
* search route is placeholder only
* some footer legal routes are placeholders
* minor non-blocking UI issues exist
* tests not configured but build passes
* cross-browser testing not done

Prompt 04 can start only if user/Super Admin accepts partial and no critical public/security issue exists.

### FAIL

Use `FAIL` if:

* homepage broken
* build fails
* existing header/city selector removed
* hero search missing/dead
* `/search` linked but missing
* public admin link visible
* hidden contact leaks
* fake data displayed as real
* major mobile horizontal scroll
* dead primary CTA
* provider secret exposed
* auth trigger fakes login/success

Do not start Prompt 04.

### BLOCKED

Use `BLOCKED` if:

* Prompt 02 auth foundation failed and UI depends on it
* cannot inspect required files
* project cannot run/build due to unresolved baseline issue
* existing UI architecture conflict needs owner decision
* required Prompt 03 files missing

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* auth provider missing for runtime logged-in tests
* location backend missing
* legal/CMS routes missing
* search backend missing
* notification provider missing if bell hidden/setup state

Setup-required is acceptable only if UI does not fake functionality.

---

## 48. Prompt 04 Readiness Checklist

Prompt 04 can start only if:

* Prompt 03 implementation completed
* Prompt 03 verification completed
* no critical public UI bug open
* no public admin link
* no hidden contact leak
* no fake public data
* homepage/search route safe
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`

If Prompt 04 file missing, stop and ask/generate it.

---

## 49. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 03 Verification — Public UI, Home, Header, Footer And Hero Search

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes Checked:
- /
- /search
- /dashboard
- /admin

Header States Tested:
- Guest:
- Owner:
- Broker:
- Builder:
- Admin/Staff public separation:

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

Security/Public Safety Checks:
- public admin link:
- hidden contact leak:
- fake data:
- dead links:
- href="#":
- provider secrets:

Expected:
- Public UI is safe, responsive and ready for Prompt 04.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 04:
- Yes/No

Next Step:
- prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md or fix blockers first.
```

---

## 50. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 03 Public UI/Home/Header/Footer/Hero verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes checked:
- /:
- /search:
- /dashboard:
- /admin:

Header preservation:
- existing header:
- city selector:
- hero placement:

Header states:
- guest:
- owner:
- broker:
- builder:
- admin/staff public separation:

Footer:
- public footer:
- dashboard/admin footer separation:
- dead links:

Responsive:
- widths tested:
- horizontal scroll:
- overlap:
- mobile menu:

Security/public safety:
- public admin link:
- hidden contact leak:
- fake data/counts:
- href="#":
- provider secrets:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 04:
- Yes/No
- reason

Next step:
- prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

Do not write vague “verified”.

---

## 51. If Verification Fails

If verification fails:

1. do not start Prompt 04
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

Critical failures block progress.

---

## 52. If Verification Is Partial

If verification is partial:

* document what is partial
* list untested widths/states
* list setup-required dependencies
* confirm no critical public/security bug exists
* update docs
* ask/require owner acceptance before Prompt 04 if risk is significant

Acceptable partial examples:

* search route placeholder only
* logged-in role header not runtime-tested because auth setup-required
* some legal footer pages are placeholders
* cross-browser not tested
* full SEO not implemented yet

Not acceptable partial without fix:

* public admin link
* hidden contact leak
* existing header removed
* city selector removed
* homepage broken
* fake data shown as real
* search CTA dead
* build fail

---

## 53. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `brain.md`
* final response should say Prompt 04 can start

Do not start Prompt 04 automatically unless user asked to continue.

---

## 54. What Not To Do In This Verification

Do not:

* implement full property system
* implement full project system
* implement full search engine
* implement payment
* implement media upload
* implement admin modules
* add fake data to test UI
* add fake counts
* add fake verified badge
* add AI feature
* add maps provider
* expose admin link
* ignore mobile scroll bug
* ignore dead link
* ignore build failure
* mark PASS without responsive checks

---

## 55. Quality Bar

This verification is successful when future phases can trust:

* homepage is stable
* existing header/city selector preserved
* hero search is placed correctly
* public navigation is safe
* `/search` route exists/safe
* footer is public-safe
* guest/logged-in header behavior is correct or honestly setup-required
* admin/staff not exposed publicly
* mobile layout is usable
* no fake data is shown
* no hidden contact leaks
* docs reflect reality
* Prompt 04 can safely build property/project/requirement system on top

---

## 56. Final Rule For Prompt 03 Verification

Verify public UI honestly.

Verify existing header preservation honestly.

Verify city selector preservation honestly.

Verify Hero Search Section placement honestly.

Verify footer links honestly.

Verify responsive widths honestly.

Verify no public admin link.

Verify no hidden contact leak.

Verify no fake data.

Do not fake auth state.

Do not fake search results.

Do not fake provider status.

Do not ignore dead links.

Do not ignore horizontal scroll.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
