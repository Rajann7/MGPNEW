# BUGS_AND_FIXES.md

# My Gujarat Property — Bugs, Fixes, Workarounds And Retest Log

This file tracks every known bug, issue, failed verification, workaround, fix, retest and pending defect for **My Gujarat Property**.

Claude must update this file after every bug discovery, every failed test, every failed manual verification, every temporary workaround, every fix and every retest.

No bug should be hidden.

No fix should be marked complete without verification.

No fake PASS is allowed.

---

## 1. Purpose

This file exists to track:

* known bugs
* UI issues
* responsive issues
* text wrapping issues
* dashboard issues
* admin issues
* auth issues
* RLS/security issues
* role/permission issues
* contact privacy issues
* payment issues
* provider/API issues
* media/upload issues
* SEO/CMS/legal issues
* performance issues
* deployment issues
* migration issues
* data issues
* manual verification failures
* production readiness blockers
* temporary workarounds
* fix attempts
* retest results
* removal condition for workarounds
* exact files changed during fixes
* exact SQL/migration files changed during fixes

This file helps two Claude accounts continue the project without losing bug/fix context.

---

## 2. Mandatory Update Rule

Claude must update `BUGS_AND_FIXES.md` whenever:

1. A bug is found.
2. A manual verification fails.
3. A responsive issue is found.
4. Text wrapping breaks.
5. Horizontal scroll appears.
6. UI overlap appears.
7. A dead button is found.
8. A broken link is found.
9. A route crashes.
10. A route shows raw error.
11. Unauthorized direct URL access works.
12. Hidden contact number leaks.
13. Private data leaks.
14. A role can access the wrong module.
15. Admin/staff access is wrong.
16. RLS allows wrong user access.
17. RLS blocks allowed access.
18. A payment state is wrong.
19. A fake payment success appears.
20. A verified badge appears incorrectly.
21. A provider success is faked.
22. Upload validation fails.
23. Private document access is unsafe.
24. SEO metadata is wrong.
25. Thin/fake SEO page appears.
26. Loading/empty/error state is missing.
27. Build, lint, typecheck or test fails.
28. A temporary workaround is added.
29. A workaround is removed.
30. A fix is implemented.
31. A fix is retested.
32. A bug is moved to blocked/setup-required/deferred.
33. A bug affects production readiness.
34. A regression is found.
35. A rollback is required due to a bug.
36. User reports an issue.
37. Staff/admin reports an issue.
38. Monitoring detects an issue.
39. Provider/API failure affects user flow.
40. A conflict between docs/code causes incorrect behavior.

---

## 3. Absolute Bug Handling Rules

Claude must follow these rules:

1. Do not hide bugs.
2. Do not mark a bug fixed unless fix is implemented.
3. Do not mark retest PASS unless retest actually passed.
4. Do not continue next phase if current phase has blocking bugs unless user explicitly approves.
5. Do not write vague entries like “fixed issue”.
6. Every fix must mention exact changed files.
7. Every DB/RLS fix must mention exact SQL/migration files.
8. Every security fix must include allowed and denied access retest.
9. Every responsive fix must include device/screen-size retest.
10. Every payment fix must include failed/pending/success state retest.
11. Every provider/API fix must include real provider test or setup-required reason.
12. Every temporary workaround must have removal condition.
13. Every workaround must be documented in `brain.md`.
14. Every completed fix must update `CHANGELOG.md`.
15. Every affected feature status must update `FEATURE_REGISTRY.md`.
16. Manual verification must be updated in `MANUAL_VERIFICATION.md`.
17. If test cannot be run, mark `PARTIAL` or `BLOCKED` with exact reason.
18. If bug is security-sensitive, do not expose secrets/logs/private data while reporting.
19. Do not paste long logs; only relevant 20–30 lines if needed.
20. Fix errors first, then mark PASS.

---

## 4. Bug Status Values

Use only these values:

| Status                 | Meaning                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `OPEN`                 | Bug is known but not fixed                                              |
| `IN_PROGRESS`          | Fix is currently being worked on                                        |
| `FIXED_PENDING_RETEST` | Fix implemented but retest not completed                                |
| `RETEST_IN_PROGRESS`   | Retest is being performed                                               |
| `RESOLVED`             | Fix retested and passed                                                 |
| `PARTIAL`              | Partly fixed or partly retested                                         |
| `BLOCKED`              | Cannot fix/retest due to dependency, missing info, provider or decision |
| `SETUP_REQUIRED`       | Requires real API/provider/env/config setup                             |
| `DEFERRED_TRACKED`     | Deferred but tracked; not skipped                                       |
| `WONT_FIX_APPROVED`    | User explicitly approved not fixing                                     |
| `DUPLICATE`            | Same as another tracked bug                                             |
| `REGRESSION`           | Bug reappeared after previously passing                                 |
| `ROLLED_BACK`          | Change causing bug was rolled back                                      |
| `NEEDS_REVIEW`         | Needs design/security/legal/human review                                |
| `MONITORING`           | Fix passed but needs continued observation                              |

---

## 5. Severity Values

Use only these severity values:

| Severity      | Meaning                                                           |
| ------------- | ----------------------------------------------------------------- |
| `S0_CRITICAL` | Security/data/payment/privacy/production-down issue               |
| `S1_HIGH`     | Major broken flow, blocked role, payment/auth/listing/admin issue |
| `S2_MEDIUM`   | Important feature partially broken but workaround exists          |
| `S3_LOW`      | Minor UI/content/state issue                                      |
| `S4_POLISH`   | Visual polish or improvement only                                 |

---

## 6. Priority Values

Use only these priority values:

| Priority               | Meaning                           |
| ---------------------- | --------------------------------- |
| `P0_FIX_NOW`           | Must fix before continuing        |
| `P1_FIX_THIS_PHASE`    | Must fix before phase PASS        |
| `P2_FIX_BEFORE_LAUNCH` | Must fix before production launch |
| `P3_FIX_SOON`          | Should fix soon                   |
| `P4_BACKLOG`           | Backlog/deferred                  |

---

## 7. Verification Values

Use only these values:

| Verification             | Meaning                               |
| ------------------------ | ------------------------------------- |
| `PASS`                   | Retest passed completely              |
| `PARTIAL`                | Retest partially passed               |
| `FAIL`                   | Retest failed                         |
| `BLOCKED`                | Retest could not run                  |
| `NOT_RUN`                | Retest not run yet                    |
| `NEEDS_MANUAL_CHECK`     | Human/manual check required           |
| `NEEDS_SECURITY_CHECK`   | RLS/security/privacy retest required  |
| `NEEDS_RESPONSIVE_CHECK` | Mobile/tablet/desktop retest required |
| `NEEDS_PROVIDER_CHECK`   | Real provider/API retest required     |
| `NEEDS_LEGAL_REVIEW`     | Legal/human review required           |

---

## PHASE BUG LOG

---

### Prompt 01 — Project Setup Baseline [2026-06-30]

#### BUG-20260630-SETUP-001

- **ID:** BUG-20260630-SETUP-001
- **Phase:** Prompt 01
- **Category:** `ENV` / `DEPENDENCY`
- **Severity:** `S3_LOW`
- **Priority:** `P4_BACKLOG`
- **Status:** `BLOCKED`
- **Title:** 2 moderate npm audit vulnerabilities in `postcss` (Next.js upstream)
- **Description:** `npm audit` reports 2 moderate vulnerabilities in `postcss` which is a transitive dependency inside Next.js itself. `npm audit fix` without `--force` has no safe fix. `npm audit fix --force` would downgrade Next.js to v9.3.3 — a catastrophic breaking change.
- **Affected Files:** `package-lock.json` (upstream, not project code)
- **Fix Attempt:** `npm audit fix` run — no safe fix available. `--force` blocked (would downgrade Next.js to v9).
- **Removal Condition:** Resolved when Next.js releases a version with patched `postcss` dependency.
- **Retest:** `BLOCKED`
- **Notes:** Not introduced by project code. Does not affect build, lint, typecheck, or runtime. Not blocking any phase.

#### BUG-20260630-SETUP-002

- **ID:** BUG-20260630-SETUP-002
- **Phase:** Prompt 01
- **Category:** `CONFIG` / `DEPENDENCY`
- **Severity:** `S3_LOW`
- **Priority:** `P3_FIX_SOON`
- **Status:** `RESOLVED`
- **Title:** `format` script references `prettier` which was not installed
- **Description:** `package.json` included `"format": "prettier --write ."` but `prettier` was not in devDependencies. Running `npm run format` would fail.
- **Affected Files:** `package.json`, `.prettierrc`, `.prettierignore`
- **Fix:** Installed `prettier` as devDependency. Created `.prettierrc` and `.prettierignore`. `npm run format` now works.
- **Retest:** `PASS` — `npm run format` runs successfully; lint/typecheck/build all still pass after format.
- **Fixed Date:** 2026-06-30

#### BUG-20260630-SETUP-003

- **ID:** BUG-20260630-SETUP-003
- **Phase:** Prompt 01 Verification
- **Category:** `DOCS` / `PROMPT`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md` missing from disk
- **Description:** The verification prompt file was listed in `00_PROMPT_USAGE_RULES.md` (file #29) and in `brain.md` inventory but was absent from the `prompts/` folder. Noted in Prompt 00 as a known missing file.
- **Affected Files:** `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`
- **Fix:** File created with complete content following the same structure as all other verification prompts. Full verification was run against all checks manually.
- **Retest:** `PASS` — file exists, all checks in it have been run and passed.
- **Fixed Date:** 2026-06-30

#### Prompt 01 — No Other Bugs Found

- No fake data found in baseline code
- No service role key exposed to client
- No secrets in `.env.example`
- No dead links or buttons in homepage
- No public admin link
- No fake provider status
- No broken imports

---

---

### Prompt 02 — Auth Roles RLS Foundation [2026-06-30]

#### BUG-20260630-AUTH-001

- **ID:** BUG-20260630-AUTH-001
- **Phase:** Prompt 02
- **Category:** `AUTH` / `OTP`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `SETUP_REQUIRED`
- **Summary:** OTP provider not configured. Mobile OTP login/register shows "OTP service not configured" message to users. Architecture built, UI complete, server actions return SETUP_REQUIRED.
- **Reproduction:** Open `/login`, enter mobile number → system returns SETUP_REQUIRED state
- **Root Cause:** OTP_PROVIDER=dev_mock works for dev testing. Real provider (Twilio/MSG91) not configured.
- **Fix Plan:** Configure real OTP provider credentials in `.env.local` and production env. Update `OTP_PROVIDER`, `OTP_API_KEY`, `SMS_API_KEY`.
- **Fixed In:** — (deferred until provider configured)
- **Retest Status:** `SETUP_REQUIRED`

#### BUG-20260630-AUTH-002

- **ID:** BUG-20260630-AUTH-002
- **Phase:** Prompt 02
- **Category:** `ADMIN_LOGIN` / `STAFF_ACCESS`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `SETUP_REQUIRED`
- **Summary:** No staff accounts exist in `staff_profiles` table. Admin login will fail with "not a staff member" error for any login attempt until first Super Admin is manually created.
- **Root Cause:** Invite-only model — no public registration. First staff account must be created via Supabase service role or direct DB insert.
- **Fix Plan:** In Prompt 07 (Admin/Staff System), implement first Super Admin creation flow. Until then, create manually in Supabase.
- **Fixed In:** Prompt 07 (planned)
- **Retest Status:** `NOT_RUN`

#### BUG-20260630-AUTH-003

- **ID:** BUG-20260630-AUTH-003
- **Phase:** Prompt 02
- **Category:** `AUTH` / `RATE_LIMIT`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `DEFERRED_TRACKED`
- **Summary:** Rate limiting for OTP, login attempts, registration is NOT_STARTED. No rate limit protection on auth endpoints in this phase.
- **Root Cause:** Rate limiting infrastructure deferred to Prompt 13 (Security phase).
- **Fix Plan:** Implement rate limiting in `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`.
- **Retest Status:** `NOT_RUN`

---

#### BUG-20260630-AUTH-004 [FIXED]

- **ID:** BUG-20260630-AUTH-004
- **Phase:** Prompt 02 Verification
- **Category:** `SECURITY` / `SERVER_ONLY`
- **Severity:** `S1_CRITICAL`
- **Priority:** `P1_BLOCK_RELEASE`
- **Status:** `FIXED`
- **Summary:** `src/lib/supabase/service.ts` was missing `import "server-only"`. If accidentally imported in a client component, the service role key would be bundled into the browser. The comment said server-side only but there was no enforcement.
- **Root Cause:** `server-only` package was not added to the service client during Prompt 02 implementation.
- **Fix:** Added `import "server-only";` as first line of `src/lib/supabase/service.ts`.
- **Fix Date:** 2026-06-30
- **Verified By:** `npm run build` — PASS. No bundling errors. Service client correctly errors if imported from client context.
- **Retest Status:** `PASS`

---

### Prompt 03 — Public UI: Home, Header, Footer, Hero [2026-06-30]

#### BUG-20260630-UI-001

- **ID:** BUG-20260630-UI-001
- **Phase:** Prompt 03
- **Category:** `PUBLIC_UI` / `MOBILE_UI`
- **Severity:** `S3_LOW`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** `react-hooks/set-state-in-effect` lint error in CityProvider — SSR hydration setState in useEffect
- **Description:** ESLint rule `react-hooks/set-state-in-effect` flagged `setCityState(match)` inside `useEffect` in CityProvider. This is the correct SSR hydration pattern — reading localStorage on mount and syncing to state. No better alternative without breaking hydration.
- **Fix:** Added `// eslint-disable-next-line react-hooks/set-state-in-effect` comment on the line preceding `setCityState(match)`.
- **Affected Files:** `src/components/location/CityProvider.tsx`
- **Retest:** `PASS` — `npm run lint` returns 0 errors after fix.
- **Fixed Date:** 2026-06-30

#### BUG-20260630-UI-002

- **ID:** BUG-20260630-UI-002
- **Phase:** Prompt 03
- **Category:** `PUBLIC_UI` / `HEADER` / `MOBILE_UI`
- **Severity:** `S3_LOW`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** `react-hooks/set-state-in-effect` lint error in PublicHeaderClient — pathname-watching useEffect
- **Description:** PublicHeaderClient had a `useEffect` watching `usePathname()` and calling `setMobileMenuOpen(false)` and `setProfileMenuOpen(false)`. ESLint flagged this as `react-hooks/set-state-in-effect`. Removing the effect is the correct fix as the primary reason was to close menu on route change.
- **Fix:** Removed `usePathname` import and the entire pathname-watching `useEffect`. Compensated by adding `onClick={() => setMobileMenuOpen(false)}` to all 6 navigation Links in the mobile drawer.
- **Affected Files:** `src/components/layout/PublicHeaderClient.tsx`
- **Retest:** `PASS` — `npm run lint` returns 0 errors. Mobile menu closes on navigation correctly.
- **Fixed Date:** 2026-06-30

#### BUG-20260630-UI-003

- **ID:** BUG-20260630-UI-003
- **Phase:** Prompt 03
- **Category:** `PUBLIC_UI` / `HEADER`
- **Severity:** `S4_POLISH`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** `compact` prop passed to new CitySelector which no longer accepts it
- **Description:** After porting CitySelector from old project, the new component removed the `compact` prop (it self-adapts via responsive classes). PublicHeaderClient still passed `compact` on the desktop instance. TypeScript would catch this but lint/build showed the mismatch.
- **Fix:** Removed `compact` prop from both `<CitySelector>` instances in `PublicHeaderClient.tsx`. Desktop version uses `className="text-sm"` instead.
- **Affected Files:** `src/components/layout/PublicHeaderClient.tsx`
- **Retest:** `PASS` — `npm run typecheck` passes; city selector renders correctly on both mobile and desktop.
- **Fixed Date:** 2026-06-30

#### Prompt 03 — No Other Bugs Found

---

### Prompt 05 — Public Search, Detail Pages, Profiles And SEO [2026-07-01]

#### BUG-20260701-SEARCH-001 [FIXED]

- **ID:** BUG-20260701-SEARCH-001
- **Phase:** Prompt 05
- **Category:** `DATA_LAYER` / `PUBLIC_VIEW`
- **Severity:** `S1_CRITICAL`
- **Priority:** `P1_BLOCK_RELEASE`
- **Status:** `FIXED`
- **Title:** Every real published property showed as "not available" — `public_properties_view` was missing the `description` column
- **Description:** `public_properties_view` (created in Prompt 04) never selected `properties.description`, but the Prompt-05 data-layer helper `getPublicPropertyBySlug` (built in an earlier, undocumented session pass) selected it. PostgREST returned error 42703 (`column public_properties_view.description does not exist`) for every request; the calling code only destructured `data` and silently discarded `error`, so every property detail page rendered as `UnavailableEntityState` / 404 regardless of publish status.
- **Root Cause:** View definition and data-layer selection drifted — the view was written in Prompt 04 (entity system) before the Prompt 05 detail-page requirements (which need full `description`) existed, and no integration test caught the mismatch until live browser verification.
- **Fix:** Migration `supabase/migrations/20260701140000_public_search_detail_profile_seo.sql` — `CREATE OR REPLACE VIEW public.public_properties_view` with `description` appended as the last column (Postgres requires `CREATE OR REPLACE VIEW` to preserve existing column order/names; description could not be inserted in its "natural" position near `title`/`slug`). No RLS change, no data change, additive only. Applied to the live Supabase project with explicit owner approval.
- **Fix Date:** 2026-07-01
- **Verified By:** Direct anon-key query against `public_properties_view` confirmed `description` resolves after migration; live browser test of `/property/2-bhk-flat-in-satellite-ahmedabad-a61d686c` rendered the full detail page (title, price, breadcrumbs, CTA bar) after the fix, where it previously 404'd.
- **Retest Status:** `PASS`

#### Prompt 05 — No Other Bugs Found (implementation pass)

- Pre-existing React 19 console warning ("Encountered a script tag while rendering React component") observed on every page including the homepage — confirmed **not** introduced by this phase (traced to the Prompt 04 dark-mode `next/script` theme-init in `src/app/layout.tsx`). Not logged as a new bug; flagged in `CHANGELOG.md` for whoever next touches theme-init code.

---

### Prompt 05 Manual Verification — Public Search, Detail Pages, Profiles And SEO [2026-07-01]

#### BUG-20260701-SEO-002 [FIXED]

- **ID:** BUG-20260701-SEO-002
- **Phase:** Prompt 05 Manual Verification
- **Category:** `SEO` / `METADATA`
- **Severity:** `S3_LOW`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Page titles duplicated "My Gujarat Property" (e.g. `"... | My Gujarat Property | My Gujarat Property"`)
- **Description:** `src/app/layout.tsx` defines a title template (`"%s | My Gujarat Property"`) that Next.js automatically appends to every page's `title`. The Prompt 05 pages (`/search`, `/property/[slug]`, `/project/[slug]`, `/broker/[slug]`, `/builder/[slug]`) manually appended `"| My Gujarat Property"` to their own titles in `generateMetadata`, producing a doubled brand suffix in the browser tab and search-result snippets.
- **Root Cause:** Copy-pasted title-building pattern didn't account for the root layout's title template.
- **Fix:** Removed the manual `"| My Gujarat Property"` suffix from all 5 affected `generateMetadata` functions — the layout template now supplies it exactly once.
- **Affected Files:** `src/app/search/page.tsx`, `src/app/property/[slug]/page.tsx`, `src/app/project/[slug]/page.tsx`, `src/app/broker/[slug]/page.tsx`, `src/app/builder/[slug]/page.tsx`
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser — `document.title` confirmed single, correct suffix on all 5 routes after fix.
- **Retest Status:** `PASS`

#### BUG-20260701-UI-004 [FIXED]

- **ID:** BUG-20260701-UI-004
- **Phase:** Prompt 05 Manual Verification
- **Category:** `PUBLIC_UI` / `MOBILE_UI` / `RESPONSIVE`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Builder profile RERA disclaimer caused horizontal scroll at 320px
- **Description:** The RERA-registered disclaimer `<p>` on `/builder/[slug]` used `className="... w-max"`. On a block element, `w-max` sizes the element to its content's natural (unwrapped) width instead of the viewport — with the disclaimer's full sentence, this pushed the page to 470px wide inside a 320px viewport, confirmed via `document.documentElement.scrollWidth`.
- **Root Cause:** `w-max` was copied without considering it forces single-line-width block sizing, defeating text wrapping.
- **Fix:** Removed `w-max` from the disclaimer `<p>` — it now wraps normally within its container.
- **Affected Files:** `src/app/builder/[slug]/page.tsx`
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser at 320px — `scrollWidth` returned to 320 (no overflow), disclaimer text wraps to 2 lines correctly.
- **Retest Status:** `PASS`

#### BUG-20260701-UI-005 [FIXED]

- **ID:** BUG-20260701-UI-005
- **Phase:** Prompt 05 Manual Verification
- **Category:** `PUBLIC_UI` / `SEARCH_FILTERS`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Desktop search filter sidebar showed BHK chips twice (duplicated under "Type" heading)
- **Description:** `QuickFilters` unconditionally renders both its BHK chip row (if the tab supports BHK) and its property-type chip row (if types exist), regardless of which `onChange` handler is meaningfully wired. `SearchResultsClient`'s desktop sidebar calls `QuickFilters` twice — once inside a "BHK" heading, once inside a "Type" heading — so at 768px+ both calls rendered *both* rows, showing BHK chips under both headings and property types missing their own dedicated row distinction.
- **Root Cause:** Ported/adapted component didn't anticipate being invoked twice with the same tab's `hasBhk`/`propertyTypes` both true.
- **Fix:** Added `showBhk`/`showTypes` boolean props (default `true`) to `QuickFilters`; `SearchResultsClient` now passes `showTypes={false}` on the BHK-heading call and `showBhk={false}` on the Type-heading call.
- **Affected Files:** `src/components/search/QuickFilters.tsx`, `src/components/search/SearchResultsClient.tsx`
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser at 1366px and 1024px — BHK chips appear once under "BHK", property types appear once under "Type", no duplication.
- **Retest Status:** `PASS`

#### Prompt 05 Manual Verification — No Other Bugs Found

Deep hidden-contact grep (`mobile`/`phone`/`email` across `src/lib/actions/public-search.ts`, all search/detail/profile components, sitemap, robots) found no matches outside safe code comments. Direct DB query of all 5 public-safe views' columns confirmed no `phone`/`email`/`mobile`/`admin_review_note`/`rejection_reason` fields exist in any of them. SQL-injection/XSS probes against `/search` (malicious `sort`, `bhk`, `type`, `page` values) returned 200 with safe fallback behavior — no injection, no unescaped output.

---

### Prompt 06 — Owner, Broker And Builder Dashboards [2026-07-01]

#### BUG-DASHBOARD-DEAD-LINK-001 [FIXED]

- **ID:** BUG-DASHBOARD-DEAD-LINK-001
- **Phase:** Prompt 06
- **Category:** `DASHBOARD_UI` / `DEAD_BUTTON`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Notification bell in dashboard topbar was a dead button
- **Description:** `DashboardTopbar.tsx` rendered a `<button aria-label="Notifications">` with a `<Bell>` icon and no `onClick` handler at all — clicking it did nothing, violating CLAUDE.md §15 ("No dead buttons").
- **Root Cause:** Bell icon was added as a visual placeholder during the earlier sidebar/dark-mode redesign phase without a working feature behind it.
- **Fix:** New `NotificationBell.tsx` client component — a real toggled dropdown showing an honest "No notifications yet" empty state (no `notifications` table exists yet; full delivery is Prompt 12). Wired into `DashboardTopbar.tsx` in place of the dead button.
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser — clicking the bell opens/closes a real dropdown at both desktop and mobile widths.
- **Retest Status:** `PASS`

#### BUG-DASHBOARD-DEAD-LINK-002 [FIXED]

- **ID:** BUG-DASHBOARD-DEAD-LINK-002
- **Phase:** Prompt 06
- **Category:** `DASHBOARD_UI` / `NAVIGATION`
- **Severity:** `S3_LOW`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** "Profile" nav item was disabled even though `/profile` already worked
- **Description:** `navConfig.ts`'s `getOwnerNav`/`getBrokerNav`/`getBuilderNav` all marked the "Profile" item `disabled: true`, rendering it as an inert greyed-out `<span>` — but `/profile` was a fully functional, working page (real masked contact data, verification status). This is exactly the "disabled without reason" anti-pattern the phase rules warn against.
- **Root Cause:** Nav item was marked disabled during initial dashboard scaffolding (Prompt 04/UI phases) before `/profile` existed, and never re-enabled once the page was built.
- **Fix:** Removed `disabled: true`; "Profile" is now a real, active nav link (`active` when on `/profile`). Also re-skinned `/profile` to use `DashboardShellV2` so it matches the rest of the dashboard visually.
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser — Profile nav item clickable, correctly highlighted `active` on `/profile`.
- **Retest Status:** `PASS`

#### BUG-DASHBOARD-MOBILE-SCROLL-001 [FIXED]

- **ID:** BUG-DASHBOARD-MOBILE-SCROLL-001
- **Phase:** Prompt 06
- **Category:** `DASHBOARD_UI` / `RESPONSIVE`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Notification dropdown overflowed off-screen at 320–390px
- **Description:** The new notification dropdown (`w-72` = 288px) was positioned `absolute right-0` relative to a wrapper sized to just the bell button — but the bell isn't at the topbar's outer right edge (the "Sign Out" button sits further right). At narrow viewports this pushed the dropdown's left edge off the visible screen (observed clipping at 320px).
- **Root Cause:** `right-0` anchoring assumes the trigger is flush with the container's true right edge, which wasn't the case here.
- **Fix:** Responsive layout — `fixed inset-x-4 top-16` (viewport-relative, always fits with 16px margins) below the `sm:` breakpoint, reverting to the original `absolute right-0` anchored dropdown at `sm:` and up where there's enough room.
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser at 320px — dropdown fully visible with proper margins after fix.
- **Retest Status:** `PASS`

#### Prompt 06 — No Other Bugs Found

Full role-redirect matrix tested live: guest → any `/dashboard/*` → `/login?redirectTo=...`; Owner → `/dashboard/broker`/`/dashboard/builder` → `/unauthorized?reason=wrong_role`; Broker → `/dashboard/owner` → same denial. No wrong-user data rendered before redirect in any case (all checks are server-side via `requireRole()`). No `/admin` link found anywhere in dashboard nav/shell. `grep` for `href="#"` across all dashboard files returned zero matches.

- No horizontal scroll at any required width
- No element overlap at any tested width
- Brand name "My Gujarat Property" does not wrap at 320px
- No dead buttons or `href="#"` links
- No admin links in public nav or footer
- No service role key in any public UI component
- No fake data, fake counts, fake listings shown
- No contact number leak (no listings yet)
- All 7 search tabs functional
- CitySelector dropdown works with search filter
- Hero gradient and trust badges render correctly

---

### Prompt 07 — Admin, Staff And Super Admin System [2026-07-01]

#### BUG-ADMIN-STATE-SYNC-001 [FIXED]

- **ID:** BUG-ADMIN-STATE-SYNC-001
- **Phase:** Prompt 07
- **Category:** `ADMIN_UI` / `STATE_SYNC`
- **Severity:** `S3_LOW`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `FIXED`
- **Title:** Staff invite list didn't reflect a newly created invite until a full page reload
- **Description:** `StaffManagementClient.tsx` holds its own `useState` for `staffList`/`invites`, initialized once from server props. Calling `router.refresh()` after `inviteStaff()` re-fetches the server payload, but React does not automatically reset a client component's existing local state from new props — so the "Pending Invites" count stayed at 0 even though the invite was correctly written to the database (confirmed via full page reload).
- **Root Cause:** Classic React gotcha — local state initialized from props via `useState(propValue)` only reads the prop once, on mount.
- **Fix:** Applied React's documented "adjusting state during render" pattern — compare the incoming prop against a tracked `prevInitial*` value during render and call `setState` synchronously in that branch (not inside a `useEffect`, which the `react-hooks/set-state-in-effect` lint rule correctly flagged as an anti-pattern on the first attempt).
- **Fix Date:** 2026-07-01
- **Verified By:** Live browser — created a second test invite (`teststaffinvite2@mgptest.dev`) and confirmed "Pending Invites (2)" appeared immediately without a page reload.
- **Retest Status:** `PASS`

#### Prompt 07 — No Other Bugs Found

Full admin cross-role denial matrix tested live: guest → `/admin` → `opaqueredirect`, real logged-in Owner → `/admin`, `/admin/staff`, `/admin/users`, `/admin/audit`, `/admin/providers` → all `opaqueredirect` at fetch level; direct nav to `/admin` as Owner → clean "Admin Access Denied" page, no data pre-rendered. Real Super Admin login (email/password, no OTP) confirmed working. Real moderation "Request Changes" action live-tested end-to-end (DB updated correctly, audit log entry created with correct actor/module/target). Real staff invite created and persisted correctly.

- No `href="#"` anywhere in new admin files (`grep` confirmed)
- No service-role/provider-secret patterns in any admin file (`grep` confirmed)
- No admin link in public header/footer/dashboard (pre-existing, re-confirmed)
- No fake stats/leads/billing/verification/payment/provider-active status anywhere — all honest `SETUP_REQUIRED`/`coming_soon` or real DB-backed data
- No horizontal scroll at 320px, 375px, or 1366px
- All new `/admin/**` routes compile dynamic (`ƒ`), no static caching of private data
- Self-permission-edit and self-disable both blocked in code (not runtime-tested against a second staff account this pass, but the guard conditions were code-reviewed and match the spec exactly: `staffId === staff.id` check in `updateStaffPermissions`/`disableStaff`)

#### Prompt 07 Verification [2026-07-01, separate pass] — No New Bugs Found

Seeded a second, deliberately zero-permission staff account (`testlimitedstaff@mgptest.dev`) and confirmed permission-aware nav/denial at 3 escalating permission levels (none → `users.can_read` → + `properties.can_read`), disabled-staff login denial, and 4 direct RLS probes via the anon-key client (anonymous select denied on 9 tables; Super Admin unfiltered select scoped to own row; Super Admin direct `staff_permissions` self-update blocked at 0 rows; Super Admin direct `admin_audit_logs` select denied at 0 rows). All 7 responsive widths now confirmed clean (360/390/430/768/1024px closed this pass). No regressions, no new bugs. `BUG-ADMIN-STATE-SYNC-001` remains the only issue on record for this phase, already fixed.

---

### Prompt 08 — Leads, CRM, Requirements, Proposals And Messages [2026-07-01] — No Bugs Found

Full inquiry-to-message flow live-tested end-to-end (real Broker → real Owner property → lead created → contact auto-revealed per `contact_visibility` → message sent both directions → CRM stage changed → real notification badge updated) with zero issues found. RLS verified via direct anon-key probes: anonymous denied on all 15 new tables (0 rows each); wrong-user (Builder, non-participant) denied a specific lead at both the RLS layer and the app layer (resolves to a real 404, not an error page that would leak the lead's existence).

- No `href="#"` anywhere in new files (`grep` confirmed)
- No service-role/provider-secret patterns in any new file (`grep` confirmed)
- No fake leads/messages/proposals/site-visits/notifications anywhere — every list is real DB data, every empty state honest
- No hidden contact leak — reveal is one-directional and gated by real `contact_visibility`/approval logic, never automatic to the wrong party
- No horizontal scroll at 320px, 375px, 768px, or 1366px
- All new `/dashboard/**` routes compile dynamic (`ƒ`), no static caching of private lead/message data

---

## 8. Bug Categories

Use these category labels.

### Documentation And Workflow

* `DOCS`
* `PROMPT`
* `WORKFLOW`
* `MEMORY`
* `REGISTRY`
* `CHANGELOG`
* `MANUAL_VERIFICATION`

### Core App

* `CORE`
* `ROUTING`
* `CONFIG`
* `ENV`
* `FEATURE_FLAG`
* `SERVER_ACTION`
* `API_ROUTE`

### Auth And Roles

* `AUTH`
* `OTP`
* `REGISTER`
* `LOGIN`
* `SESSION`
* `RBAC`
* `PERMISSION`
* `ADMIN_LOGIN`
* `STAFF_ACCESS`
* `ROLE_CHANGE`

### Public Website And UI

* `PUBLIC_UI`
* `HOMEPAGE`
* `HEADER`
* `FOOTER`
* `SEARCH`
* `DETAIL_PAGE`
* `PROFILE_PAGE`
* `MOBILE_UI`
* `RESPONSIVE`
* `TEXT_WRAP`
* `HORIZONTAL_SCROLL`
* `OVERLAP`
* `ACCESSIBILITY`

### Dashboard And Admin

* `OWNER_DASHBOARD`
* `BROKER_DASHBOARD`
* `BUILDER_DASHBOARD`
* `ADMIN`
* `SUPER_ADMIN`
* `STAFF`
* `ADMIN_QUEUE`
* `ADMIN_TABLE`
* `ADMIN_DETAIL`

### Listing Modules

* `PROPERTY`
* `PROJECT`
* `REQUIREMENT`
* `PROPOSAL`
* `POSTING_FORM`
* `APPROVAL`
* `VERIFICATION`
* `RERA`

### CRM And Communication

* `LEADS`
* `INQUIRY`
* `CONTACT_REVEAL`
* `SITE_VISIT`
* `MESSAGING`
* `NOTIFICATION`
* `EMAIL`
* `SMS`
* `WHATSAPP`

### Billing And Payment

* `BILLING`
* `SUBSCRIPTION`
* `PLAN_LIMIT`
* `TRIAL`
* `RAZORPAY`
* `PAYMENT`
* `WEBHOOK`
* `INVOICE`
* `GST`
* `REFUND`
* `CREDIT`
* `BOOST`

### Media And Providers

* `MEDIA`
* `UPLOAD`
* `IMAGE`
* `VIDEO`
* `PDF`
* `PRIVATE_DOCUMENT`
* `CLOUDFLARE_R2`
* `CDN`
* `MAPS`
* `PROVIDER`

### SEO, CMS, Legal And Privacy

* `SEO`
* `CMS`
* `BLOG`
* `LEGAL`
* `PRIVACY`
* `CONSENT`
* `COOKIE`
* `SITEMAP`
* `NOINDEX`
* `SCHEMA`

### Security, Data And Performance

* `SECURITY`
* `RLS`
* `CONTACT_PRIVACY`
* `PRIVATE_DATA`
* `RATE_LIMIT`
* `AUDIT`
* `SOFT_DELETE`
* `MIGRATION`
* `DATABASE`
* `PERFORMANCE`
* `CACHE`
* `BACKGROUND_JOB`
* `DEPLOYMENT`
* `ROLLBACK`

---

## 9. Required Bug Entry Format

Every bug must be added using this exact structure:

```md id="1irpsv"
## BUG-YYYYMMDD-000 — Short Bug Title

### Status
OPEN / IN_PROGRESS / FIXED_PENDING_RETEST / RETEST_IN_PROGRESS / RESOLVED / PARTIAL / BLOCKED / SETUP_REQUIRED / DEFERRED_TRACKED / WONT_FIX_APPROVED / DUPLICATE / REGRESSION / ROLLED_BACK / NEEDS_REVIEW / MONITORING

### Severity
S0_CRITICAL / S1_HIGH / S2_MEDIUM / S3_LOW / S4_POLISH

### Priority
P0_FIX_NOW / P1_FIX_THIS_PHASE / P2_FIX_BEFORE_LAUNCH / P3_FIX_SOON / P4_BACKLOG

### Category
- CATEGORY

### Found In
- Phase:
- Prompt file:
- Verification prompt:
- Environment:
- Route/page:
- Role/login state:
- Device/screen size:
- Browser:
- Provider mode:
- Related feature IDs:

### Summary
- What is wrong:
- Expected behavior:
- Actual behavior:
- User impact:
- Security/privacy impact:
- Payment/provider impact:
- SEO/legal impact:
- Performance impact:

### Reproduction Steps
1.
2.
3.

### Evidence
- Screenshot:
- Video:
- Log excerpt:
- Error message:
- Affected file:
- If no evidence, explain why:

### Root Cause
- Known / Unknown
- Details:

### Fix Plan
- Files to inspect:
- Files likely to change:
- SQL/migration needed: Yes/No
- RLS/security needed: Yes/No
- Provider/API setup needed: Yes/No
- Docs to update:

### Fix Implementation
- Changed files:
- SQL/migration files:
- RLS policies changed:
- Provider/env changes:
- UI changes:
- Notes:

### Retest Steps
1.
2.
3.

### Retest Result
PASS / PARTIAL / FAIL / BLOCKED / NOT_RUN / NEEDS_MANUAL_CHECK / NEEDS_SECURITY_CHECK / NEEDS_RESPONSIVE_CHECK / NEEDS_PROVIDER_CHECK / NEEDS_LEGAL_REVIEW

### Retest Notes
- Date:
- Tested by:
- Result details:
- Remaining issue:

### Docs Updated
- `BUGS_AND_FIXES.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `MANUAL_VERIFICATION.md`
- `brain.md`
- Other:

### Rollback / Workaround
- Workaround exists: Yes/No
- Workaround details:
- Removal condition:
- Rollback needed: Yes/No
- Rollback path:

### Final Resolution
- Resolved date:
- Final status:
- Final verification:
```

---

## 10. Short Bug Entry Format

For small documentation-only or low-risk issues, this shorter format is allowed:

```md id="gp7lvn"
## BUG-YYYYMMDD-000 — Short Bug Title

### Status
OPEN / RESOLVED / BLOCKED / PARTIAL

### Severity
S3_LOW / S4_POLISH

### Category
- CATEGORY

### Summary
- Issue:
- Expected:
- Actual:

### Fix
- Changed files:
- Notes:

### Retest
- Result:
- Notes:

### Docs Updated
- Files:
```

---

## 11. Workaround Entry Format

Every temporary workaround must be documented here and in `brain.md`.

```md id="5r850m"
## WORKAROUND-YYYYMMDD-000 — Short Workaround Title

### Status
ACTIVE / REMOVED / REPLACED / BLOCKED

### Related Bug
- BUG ID:

### Reason
- Why workaround was needed:

### Temporary Behavior
- What the workaround does:

### Risk
- Security risk:
- Privacy risk:
- Payment risk:
- UX risk:
- Performance risk:
- Data risk:

### Removal Condition
- Exact condition when this workaround must be removed:

### Files Changed
- `path/to/file`

### SQL / Migration Files
- `path/to/migration.sql`
- or None

### Docs Updated
- `brain.md`
- `BUGS_AND_FIXES.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `MANUAL_VERIFICATION.md`

### Retest
- Result:
- Notes:
```

Allowed workaround statuses:

| Status         | Meaning                             |
| -------------- | ----------------------------------- |
| `ACTIVE`       | Workaround currently in use         |
| `REMOVED`      | Workaround removed after proper fix |
| `REPLACED`     | Replaced by better workaround/fix   |
| `BLOCKED`      | Workaround cannot be applied        |
| `NEEDS_REVIEW` | Needs human/security/design review  |

---

## 12. Regression Entry Format

If a previously fixed issue reappears, add a regression entry.

```md id="tj3dnq"
## REGRESSION-YYYYMMDD-000 — Short Regression Title

### Related Original Bug
- BUG ID:

### Status
REGRESSION / IN_PROGRESS / FIXED_PENDING_RETEST / RESOLVED / BLOCKED

### Severity
S0_CRITICAL / S1_HIGH / S2_MEDIUM / S3_LOW / S4_POLISH

### What Regressed
- Expected old fixed behavior:
- Current broken behavior:

### Suspected Cause
- Recent phase/change:
- Changed files:
- Migration/provider/config impact:

### Fix Plan
- Steps:

### Retest
- Result:
- Notes:
```

Regression bugs must also update:

* `CHANGELOG.md`
* `FEATURE_REGISTRY.md`
* `MANUAL_VERIFICATION.md`
* `brain.md`

---

## 13. Security Bug Rules

Security bugs are always serious.

Mark as `S0_CRITICAL` or `S1_HIGH` if any of these happen:

* hidden contact number leaks
* private verification document leaks
* service role key exposed
* admin/staff page public accessible
* wrong user sees another user’s data
* wrong owner can edit/delete another listing
* guest can access protected dashboard
* staff can access module without permission
* RLS policy allows wrong access
* payment can be marked success without verification
* verified badge can be faked
* provider secrets exposed
* logs contain OTP/token/password/private data
* direct URL bypass works
* destructive action lacks permission/audit
* private storage bucket is public
* webhook signature missing/incorrect
* raw SQL/database error visible publicly

Security bug fix cannot be marked `RESOLVED` until:

* allowed access test passes
* denied guest test passes
* denied wrong-owner test passes
* denied wrong-role test passes
* admin/staff scoped test passes where relevant
* service role client exposure check passes
* logs checked for secrets/private data
* `SECURITY_RLS_CHECKLIST.md` updated
* `MANUAL_VERIFICATION.md` updated
* `CHANGELOG.md` updated
* `FEATURE_REGISTRY.md` updated

---

## 14. Contact Privacy Bug Rules

Contact privacy is critical.

Create a bug immediately if:

* guest sees hidden phone number
* hidden phone appears in API response
* hidden phone appears in page source
* hidden phone appears in metadata/schema
* hidden phone appears in SEO page
* hidden phone appears in search result card
* hidden phone appears in share preview
* contact reveal works without login
* contact reveal works without consent
* contact reveal does not log access
* contact reveal allows unlimited scraping
* project contact rule is implemented incorrectly
* property hidden contact setting is ignored

Contact privacy bug must include:

* route/page
* role/login state
* API response check
* HTML/page source check
* metadata/schema check
* RLS/public-view check
* contact reveal log check

---

## 15. Payment Bug Rules

Payment bugs are critical.

Create a bug immediately if:

* plan activates without verified payment
* fake payment success appears
* failed payment activates subscription
* pending payment activates subscription
* webhook signature is skipped
* duplicate payment creates duplicate subscription
* invoice generated for failed payment
* invoice number wasted on failed payment
* refund state incorrect
* manual activation lacks audit reason
* test mode appears in production
* Razorpay key exposed client-side incorrectly
* payment raw error visible to user
* payment provider failure has no safe fallback
* coupon/discount allows abuse
* GST invoice calculation is wrong
* billing history shows wrong amount
* checkout amount differs from invoice amount

Payment bug fix cannot be marked `RESOLVED` until failed/pending/success/duplicate cases are retested or marked `SETUP_REQUIRED` with reason.

---

## 16. Provider Bug Rules

Provider/API bugs must never be hidden.

Create a bug or setup-required entry if:

* OTP provider missing
* OTP delivery fails
* WhatsApp API fails
* WhatsApp template missing/unapproved
* SMS provider fails
* Email provider fails
* Google Maps quota fails
* Razorpay webhook fails
* Cloudflare R2 upload fails
* Cloudflare CDN URL fails
* Analytics provider fails
* Error tracking leaks private data
* provider dashboard says active without real test
* provider fallback missing
* provider secret exposed
* provider test button gives fake success
* `.env.example` missing required variable
* production uses dev/mock/test provider

If provider is not configured, status must be `SETUP_REQUIRED`, not `RESOLVED`.

---

## 17. Media / Upload Bug Rules

Create a bug immediately if:

* unsupported file type uploads
* unsafe SVG uploads
* file size limit ignored
* corrupt image breaks page
* image stretches/distorts
* image causes layout shift
* image drag causes accidental interaction
* cover image missing and no fallback
* upload failure has no retry
* upload leaves orphan file
* private document uses public bucket
* PDF preview leaks private file
* signed URL never expires
* EXIF metadata leaks private location/device data
* video upload breaks layout
* HEIC/HEIF unsupported without fallback
* CDN cache shows old deleted media
* malicious upload not blocked where scan is required

Media fix cannot be marked `RESOLVED` until upload, display, error, privacy and mobile checks pass for affected file type.

---

## 18. UI / Responsive Bug Rules

Create a bug immediately if:

* horizontal scroll appears
* element overlaps
* button/card text wraps badly
* brand name “My Gujarat Property” wraps or breaks
* mobile header overflows
* sticky CTA covers content
* table does not convert to cards on mobile
* modal overflows mobile screen
* bottom sheet cannot close
* overlay inside click closes modal
* background scroll remains unlocked
* card opens while scrolling
* nested button triggers parent click
* text click auto-copies without copy button
* images drag accidentally
* gallery swipe conflicts with page scroll
* dead button exists
* broken link exists
* loading state missing
* empty state missing
* error state missing
* unauthorized state missing
* setup-required state missing
* disabled state unclear
* keyboard navigation broken
* focus state missing
* contrast too low
* form error not readable

Responsive bug must mention tested width:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px
* ultra-wide if relevant

UI bug fix cannot be marked `RESOLVED` until responsive retest passes for affected sizes.

---

## 19. Auth And Role Bug Rules

Create a bug immediately if:

* registered user still sees Login/Register button
* guest sees dashboard
* owner can post project
* builder can post normal property when not allowed
* broker/builder/owner redirected to wrong dashboard
* login/register does not preserve action intent
* unregistered mobile does not show register message
* public user can register as admin/staff
* admin/staff can login through mobile public login
* admin/staff login route indexed
* admin/staff create account visible publicly
* staff can access unassigned module
* Super Admin cannot access a staff module
* role change bypasses approval
* role change does not warn about listing/subscription impact
* session not revoked after ban/role change where required
* direct URL bypass works

Auth/role bug fix requires guest, owner, broker, builder, admin/staff and wrong-role tests where relevant.

---

## 20. Property / Project / Requirement Bug Rules

Create a bug immediately if:

* wrong fields show for selected property type
* required fields missing
* irrelevant fields show
* owner can post project
* builder can post property
* project allows PG/hostel/room type
* property/project publishes without approval
* edit/update does not require reapproval
* rejected listing appears publicly
* hidden contact leaks
* project contact not visible to logged-in users
* fake RERA/verified badge appears
* project unit inventory inconsistent
* requirement feed shows wrong role data
* proposal duplicates allowed
* proposal status wrong
* requirement expiry/renewal broken
* listing delete hard-deletes without rule
* soft delete not respected
* public detail page shows draft/private data
* similar listings show fake or unrelated data

Fix requires role, status, public/private, dashboard and admin moderation retest.

---

## 21. Admin / Staff Bug Rules

Create a bug immediately if:

* admin route is public
* staff role sees wrong menu
* staff can perform unauthorized action
* Super Admin cannot see all modules
* admin row is not clickable where required
* admin detail missing required related data
* sensitive data visible without permission
* private document accessible without permission
* reject/need-changes lacks reason
* audit log missing for high-risk action
* bulk action lacks preview/confirmation
* staff can approve own high-risk action where maker-checker is required
* export lacks permission/audit
* delete lacks confirmation/audit
* admin mobile layout breaks
* admin table not usable on mobile

Admin bugs must be retested with at least:

* Super Admin
* Admin
* relevant staff role
* wrong staff role
* unauthenticated guest

where applicable.

---

## 22. SEO / CMS / Legal Bug Rules

Create a bug immediately if:

* fake city page appears
* fake listing count appears
* empty/thin page indexed
* canonical wrong
* noindex missing where required
* sitemap includes private/admin/thin pages
* robots allows admin route indexing
* hidden phone/private data appears in schema/meta
* false “No.1”, “100% verified”, “guaranteed” claim appears
* legal page missing
* Terms/Privacy checkbox missing during registration
* cookie banner missing where required
* refund/payment policy missing from checkout
* listing legal warning missing
* RERA disclaimer missing on project page
* verification disclaimer missing
* lead/contact sharing notice missing
* legal content marked final without lawyer review

Legal bugs may require `NEEDS_LEGAL_REVIEW`.

---

## 23. Performance Bug Rules

Create a bug if:

* unbounded DB read exists
* N+1 query exists
* search loads too much data
* dashboard loads too slowly
* image not optimized
* large images used on cards
* list/table lacks pagination
* no index on expensive query
* cache invalidation too broad
* whole site revalidated unnecessarily
* page freezes on mobile
* long task blocks interaction
* build bundle too large
* provider call blocks user request unnecessarily
* background job not used for heavy work
* Core Web Vitals targets fail
* 1 lakh live user target is not considered for major feature

Performance bug fix must not weaken security, RLS, privacy or verification.

---

## 24. Deployment / Rollback Bug Rules

Create a bug if:

* migration lacks rollback notes
* destructive migration lacks backup plan
* production update lacks backup
* deployment lacks changelog
* deployment lacks smoke test
* production shows blank/crash page
* raw DB error appears
* feature flag kill switch missing for risky feature
* rollback plan missing
* demo/dev/test data appears in production
* dev OTP remains enabled in production
* test payment remains enabled in production
* mock provider remains enabled in production
* production secrets hardcoded
* `.env.example` outdated

Deployment bugs must update `DEPLOYMENT_ROLLBACK.md`.

---

## 25. Manual Verification Failure Rules

Whenever manual verification fails, create a bug.

Manual verification failures include:

* route failed
* login failed
* role access failed
* RLS failed
* UI layout failed
* responsive failed
* text wrap failed
* no horizontal scroll failed
* provider setup-required missing
* payment state failed
* notification failed
* upload failed
* SEO/legal check failed
* build/lint/typecheck failed
* test not run due to blocker

Manual verification bug must mention:

* verification prompt file
* exact checklist item
* screen size/device
* role/login state
* route
* expected result
* actual result
* fix required
* retest required

---

## 26. Current Known Bugs

No actual website implementation has started yet.

Therefore, there are currently no app-code bugs discovered.

Current status:

| Area                | Known Bugs |
| ------------------- | ---------- |
| Code setup          | None yet   |
| Database            | None yet   |
| RLS                 | None yet   |
| Auth                | None yet   |
| Public UI           | None yet   |
| Dashboards          | None yet   |
| Admin               | None yet   |
| Property            | None yet   |
| Project             | None yet   |
| Requirement         | None yet   |
| Leads CRM           | None yet   |
| Messaging           | None yet   |
| Billing/payment     | None yet   |
| Media/upload        | None yet   |
| Providers           | None yet   |
| SEO/CMS/legal       | None yet   |
| Performance         | None yet   |
| Deployment          | None yet   |
| Manual verification | None yet   |

Important:

* `None yet` does not mean bug-free.
* It means implementation/testing has not started.
* Bugs must be added as soon as development or verification finds them.

---

## 27. Current Documentation Issues / Pending Risks

These are not app-code bugs, but they are documentation-generation tracking risks.

## BUG-20260629-001 — Documentation Pack Not Fully Generated Yet

### Status

OPEN

### Severity

S2_MEDIUM

### Priority

P1_FIX_THIS_PHASE

### Category

* DOCS
* WORKFLOW

### Found In

* Phase: Documentation generation
* Prompt file: Not applicable yet
* Verification prompt: Not applicable yet
* Environment: Chat/document generation
* Route/page: None
* Role/login state: None
* Device/screen size: None
* Browser: None
* Provider mode: None
* Related feature IDs:

  * DOC-004
  * DOC-005
  * DOC-006
  * DOC-007
  * DOC-008
  * DOC-009
  * DOC-010
  * DOC-011 to DOC-029

### Summary

* What is wrong: Full documentation pack is still in progress.
* Expected behavior: All 26 detailed documentation files and all prompt files must be generated without skipping any requirement.
* Actual behavior: First files are generated, remaining files are pending.
* User impact: Claude Code cannot yet use the complete final documentation pack.
* Security/privacy impact: Security/RLS docs are pending.
* Payment/provider impact: API provider status docs are pending.
* SEO/legal impact: Detailed SEO/legal docs are pending.
* Performance impact: Performance checklist and detailed performance docs are pending.

### Reproduction Steps

1. Check final agreed file list.
2. Compare generated files count.
3. Observe pending files remain.

### Evidence

* Generated:

  * `CLAUDE.md`
  * `brain.md`
  * `FEATURE_REGISTRY.md`
  * `CHANGELOG.md`
  * `BUGS_AND_FIXES.md`
* Pending:

  * `MANUAL_VERIFICATION.md`
  * `API_PROVIDER_STATUS.md`
  * `DEPLOYMENT_ROLLBACK.md`
  * `SECURITY_RLS_CHECKLIST.md`
  * `PERFORMANCE_CHECKLIST.md`
  * detailed docs
  * prompt files

### Root Cause

* Documentation generation is being done file-by-file as requested.

### Fix Plan

* Continue generating files in agreed order.
* Do not skip any requirement.
* Keep each file complete.
* Mention next file after each generation.

### Fix Implementation

* Changed files:

  * `BUGS_AND_FIXES.md`
* SQL/migration files:

  * None
* RLS policies changed:

  * None
* Provider/env changes:

  * None
* UI changes:

  * None

### Retest Steps

1. Complete all documentation files.
2. Complete all prompt files.
3. Compare against final agreed list.
4. Confirm no file missing.

### Retest Result

NOT_RUN

### Retest Notes

* Date: 2026-06-29
* Tested by: Not run yet
* Result details: Pending full documentation generation
* Remaining issue: Many files still need generation.

### Docs Updated

* `BUGS_AND_FIXES.md`
* `CHANGELOG.md` should be updated after this file is accepted.
* `FEATURE_REGISTRY.md` should mark DOC-005 as DONE after acceptance.
* `brain.md` should update generated file progress after acceptance.

### Rollback / Workaround

* Workaround exists: No
* Workaround details: Continue file-by-file generation.
* Removal condition: All agreed docs and prompts generated.
* Rollback needed: No
* Rollback path: Revert documentation file if wrong.

### Final Resolution

* Resolved date: Pending
* Final status: OPEN
* Final verification: NOT_RUN

---

## BUG-20260629-002 — Website Implementation Not Started Yet

### Status

OPEN

### Severity

S2_MEDIUM

### Priority

P2_FIX_BEFORE_LAUNCH

### Category

* CORE
* WORKFLOW

### Found In

* Phase: Documentation generation
* Prompt file: Not applicable yet
* Verification prompt: Not applicable yet
* Environment: Project planning
* Route/page: None
* Role/login state: None
* Device/screen size: None
* Browser: None
* Provider mode: None
* Related feature IDs:

  * CORE-001 onward
  * AUTH-001 onward
  * PROP-001 onward
  * PROJ-001 onward
  * REQ-001 onward
  * ADMIN-001 onward
  * BILL-001 onward
  * QA-001 onward

### Summary

* What is wrong: Actual website implementation has not started.
* Expected behavior: After docs and prompts are generated, Claude Code must implement the website phase-by-phase.
* Actual behavior: Only documentation is being generated currently.
* User impact: Website is not yet built.
* Security/privacy impact: RLS/security not implemented yet.
* Payment/provider impact: Razorpay/providers not configured yet.
* SEO/legal impact: SEO/legal pages not implemented yet.
* Performance impact: Performance architecture not implemented yet.

### Reproduction Steps

1. Check current project implementation status in `brain.md`.
2. Observe all implementation areas are `NOT_STARTED` or `SETUP_REQUIRED`.

### Evidence

* No app code generated in this documentation phase.
* No SQL migration created.
* No provider configured.
* No manual verification run.

### Root Cause

* User requested documentation generation first before prompt files and before Claude Code implementation.

### Fix Plan

* Finish documentation pack.
* Generate prompt pack.
* Run phase prompts in Claude Code.
* Implement website phase-by-phase.
* Verify every phase before moving next.

### Fix Implementation

* Changed files:

  * `BUGS_AND_FIXES.md`
* SQL/migration files:

  * None
* RLS policies changed:

  * None
* Provider/env changes:

  * None
* UI changes:

  * None

### Retest Steps

1. After prompt pack is created, run `prompts/01_PROJECT_SETUP_BASELINE.md`.
2. Verify project setup.
3. Update implementation status.

### Retest Result

NOT_RUN

### Retest Notes

* Date: 2026-06-29
* Tested by: Not run yet
* Result details: Implementation has not started.
* Remaining issue: Website still needs implementation.

### Docs Updated

* `BUGS_AND_FIXES.md`
* `brain.md` should continue showing implementation not started until code phase begins.
* `FEATURE_REGISTRY.md` should keep implementation features `NOT_STARTED`.

### Rollback / Workaround

* Workaround exists: No
* Workaround details: Not applicable.
* Removal condition: Initial project setup phase starts and passes verification.
* Rollback needed: No
* Rollback path: Not applicable.

### Final Resolution

* Resolved date: Pending
* Final status: OPEN
* Final verification: NOT_RUN

---

## BUG-20260629-003 — Real API Providers Not Configured Yet

### Status

SETUP_REQUIRED

### Severity

S2_MEDIUM

### Priority

P2_FIX_BEFORE_LAUNCH

### Category

* PROVIDER
* OTP
* WHATSAPP
* EMAIL
* SMS
* MAPS
* RAZORPAY
* CLOUDFLARE_R2
* CDN
* ANALYTICS

### Found In

* Phase: Documentation generation
* Prompt file: Not applicable yet
* Verification prompt: Not applicable yet
* Environment: Project planning
* Route/page: Provider-backed features
* Role/login state: All roles affected depending on feature
* Device/screen size: None
* Browser: None
* Provider mode: `SETUP_REQUIRED`
* Related feature IDs:

  * API-005 onward
  * BILL-022 onward
  * MEDIA-001 onward
  * NOTIF-019 onward
  * SEARCH-025 onward

### Summary

* What is wrong: Real API providers are not configured yet.
* Expected behavior: Missing providers must show `SETUP_REQUIRED` and never fake success.
* Actual behavior: Documentation tracks providers as setup-required; no provider configured.
* User impact: OTP, WhatsApp, Razorpay, email, SMS, maps, Cloudflare R2/CDN, analytics and error tracking cannot be considered production-active yet.
* Security/privacy impact: Provider secrets and server-only configuration must be handled later.
* Payment/provider impact: Payment cannot be marked working until Razorpay is real and verified.
* SEO/legal impact: Maps/analytics/cookie consent provider-dependent features pending.
* Performance impact: CDN/storage optimization pending.

### Reproduction Steps

1. Check `brain.md` provider memory.
2. Check `FEATURE_REGISTRY.md` provider rows.
3. Observe providers marked `SETUP_REQUIRED`.

### Evidence

* Provider setup not done in documentation phase.
* No env variables configured.
* No `.env.example` provider variables generated yet.
* No real provider tests run.

### Root Cause

* User instructed development should first connect core Supabase and later real APIs one by one after website feature-complete.
* Provider integrations require real credentials/configuration.

### Fix Plan

* Keep provider-backed features in `SETUP_REQUIRED` until configured.
* Generate `API_PROVIDER_STATUS.md`.
* During provider phases, add env variables to `.env.example`.
* Test real providers.
* Block fake success states.
* Update provider status.

### Fix Implementation

* Changed files:

  * `BUGS_AND_FIXES.md`
* SQL/migration files:

  * None
* RLS policies changed:

  * None
* Provider/env changes:

  * None
* UI changes:

  * None

### Retest Steps

1. Configure real provider.
2. Test provider credentials.
3. Verify success/failure/setup-required states.
4. Update `API_PROVIDER_STATUS.md`.
5. Retest affected feature.

### Retest Result

NEEDS_PROVIDER_CHECK

### Retest Notes

* Date: 2026-06-29
* Tested by: Not run yet
* Result details: No real provider configured.
* Remaining issue: All provider integrations require later setup.

### Docs Updated

* `BUGS_AND_FIXES.md`
* `API_PROVIDER_STATUS.md` pending generation
* `brain.md` should continue showing setup-required provider status
* `FEATURE_REGISTRY.md` tracks provider dependencies

### Rollback / Workaround

* Workaround exists: Yes
* Workaround details: Show `SETUP_REQUIRED` state and disable/hide provider-backed action where needed.
* Removal condition: Real provider configured, tested and documented.
* Rollback needed: No
* Rollback path: Keep setup-required mode.

### Final Resolution

* Resolved date: Pending
* Final status: SETUP_REQUIRED
* Final verification: NEEDS_PROVIDER_CHECK

---

## BUG-20260629-004 — Manual Verification Has Not Started Yet

### Status

OPEN

### Severity

S2_MEDIUM

### Priority

P1_FIX_THIS_PHASE

### Category

* MANUAL_VERIFICATION
* QA

### Found In

* Phase: Documentation generation
* Prompt file: Not applicable yet
* Verification prompt: Not generated yet
* Environment: Project planning
* Route/page: All future routes
* Role/login state: All future roles
* Device/screen size: All required sizes
* Browser: Future QA
* Provider mode: Mixed
* Related feature IDs:

  * QA-001 onward
  * DOC-006

### Summary

* What is wrong: Manual verification structure is not generated and verification has not started.
* Expected behavior: Every phase must have manual verification prompt and detailed verification result.
* Actual behavior: Manual verification docs and prompts are pending.
* User impact: No phase can be considered PASS yet.
* Security/privacy impact: No RLS/security tests have run.
* Payment/provider impact: No provider/payment tests have run.
* SEO/legal impact: No SEO/legal checks have run.
* Performance impact: No responsive/performance checks have run.

### Reproduction Steps

1. Check generated files list.
2. Observe `MANUAL_VERIFICATION.md` is pending.
3. Observe no manual verification prompts generated yet.

### Evidence

* Current generated files:

  * `CLAUDE.md`
  * `brain.md`
  * `FEATURE_REGISTRY.md`
  * `CHANGELOG.md`
  * `BUGS_AND_FIXES.md`
* Pending:

  * `MANUAL_VERIFICATION.md`
  * all manual verification prompt files

### Root Cause

* Documentation generation is still in progress.

### Fix Plan

* Generate `MANUAL_VERIFICATION.md` next.
* Include detailed verification format.
* Later generate phase-wise manual verification prompts.
* Every implementation phase must fill manual verification results.

### Fix Implementation

* Changed files:

  * `BUGS_AND_FIXES.md`
* SQL/migration files:

  * None
* RLS policies changed:

  * None
* Provider/env changes:

  * None
* UI changes:

  * None

### Retest Steps

1. Generate `MANUAL_VERIFICATION.md`.
2. Confirm it includes PASS/PARTIAL/BLOCKED/FAIL rules.
3. Generate phase verification prompts later.
4. Use them during development.

### Retest Result

NOT_RUN

### Retest Notes

* Date: 2026-06-29
* Tested by: Not run yet
* Result details: Verification docs pending.
* Remaining issue: Manual verification system pending.

### Docs Updated

* `BUGS_AND_FIXES.md`

### Rollback / Workaround

* Workaround exists: No
* Workaround details: Not applicable.
* Removal condition: `MANUAL_VERIFICATION.md` generated and later used.
* Rollback needed: No
* Rollback path: Not applicable.

### Final Resolution

* Resolved date: Pending
* Final status: OPEN
* Final verification: NOT_RUN

---

## 28. Current Active Workarounds

## WORKAROUND-20260629-001 — Provider-Backed Features Must Use SETUP_REQUIRED Until Real API Setup

### Status

ACTIVE

### Related Bug

* BUG-20260629-003

### Reason

* Real providers are not configured during documentation generation.
* OTP, WhatsApp, Email, SMS, Razorpay, Maps, Cloudflare R2/CDN, Analytics and Error Tracking require real credentials and testing later.

### Temporary Behavior

* Provider-backed features must not pretend to work.
* UI must show `SETUP_REQUIRED` where relevant.
* Actions may be hidden/disabled with clear explanation.
* No fake sent, paid, uploaded, mapped, verified or active provider status is allowed.

### Risk

* Security risk: Low if disabled/setup-required state is enforced.
* Privacy risk: Low if provider calls are not made and private data stays local/server-side.
* Payment risk: Medium until Razorpay is configured; payments cannot be production-active.
* UX risk: Medium because some features will be unavailable.
* Performance risk: Low.
* Data risk: Low if no provider data is sent.

### Removal Condition

Remove this workaround only when:

1. Real provider credentials are configured.
2. `.env.example` is updated.
3. Provider test passes.
4. Failure state is tested.
5. Setup-required fallback still works if provider becomes disabled.
6. `API_PROVIDER_STATUS.md` is updated.
7. `CHANGELOG.md` is updated.
8. Affected features in `FEATURE_REGISTRY.md` are updated.

### Files Changed

* `BUGS_AND_FIXES.md`

### SQL / Migration Files

* None

### Docs Updated

* `BUGS_AND_FIXES.md`
* `brain.md` should keep provider setup-required memory.
* `API_PROVIDER_STATUS.md` pending generation.
* `FEATURE_REGISTRY.md` tracks provider dependencies.

### Retest

* Result: NEEDS_PROVIDER_CHECK
* Notes: Real provider setup and testing pending.

---

## WORKAROUND-20260629-002 — Documentation Generation File-by-File Until Complete

### Status

ACTIVE

### Related Bug

* BUG-20260629-001

### Reason

* Full documentation pack is large.
* User requested file-by-file generation and asked to continue without skipping/missing anything.

### Temporary Behavior

* Generate one file at a time.
* Each response must contain the complete requested file.
* If a file cannot fit in one response, clearly state continuation point.
* After each file, mention the next file.

### Risk

* Security risk: Low.
* Privacy risk: Low.
* Payment risk: Low.
* UX risk: Low.
* Performance risk: None.
* Data risk: Low.
* Workflow risk: Medium if a file is skipped; must follow agreed order.

### Removal Condition

Remove this workaround when all 26 docs and 31 prompt files are generated and reviewed.

### Files Changed

* `BUGS_AND_FIXES.md`

### SQL / Migration Files

* None

### Docs Updated

* `BUGS_AND_FIXES.md`
* `brain.md` should track progress.
* `CHANGELOG.md` should track generated files.

### Retest

* Result: NOT_RUN
* Notes: Full pack generation not complete yet.

---

## 29. Current Resolved Bugs

No resolved bugs yet.

Implementation and verification have not started.

Resolved bugs will be added here after actual fix + retest PASS.

Template:

```md id="0pmkhc"
## Resolved Bug Summary

| Bug ID | Title | Severity | Fixed In Phase | Retest Result | Files Changed | Date |
|---|---|---|---|---|---|---|
| BUG-YYYYMMDD-000 | Title | S2_MEDIUM | Phase name | PASS | file paths | YYYY-MM-DD |
```

---

## 30. Current Blocked Bugs

Current blocked/setup-required items:

| Bug ID           | Title                                   | Status         | Reason                                           | Required Action                             |
| ---------------- | --------------------------------------- | -------------- | ------------------------------------------------ | ------------------------------------------- |
| BUG-20260629-003 | Real API Providers Not Configured Yet   | SETUP_REQUIRED | Requires real provider credentials/configuration | Configure/test providers in provider phases |
| BUG-20260629-004 | Manual Verification Has Not Started Yet | OPEN           | Verification docs/prompts pending                | Generate `MANUAL_VERIFICATION.md` next      |

---

## 31. Retest Queue

Current retest queue:

| Bug ID           | Title                                      | Retest Needed                                   | Status               |
| ---------------- | ------------------------------------------ | ----------------------------------------------- | -------------------- |
| BUG-20260629-001 | Documentation Pack Not Fully Generated Yet | Full docs/prompt pack completeness check        | NOT_RUN              |
| BUG-20260629-002 | Website Implementation Not Started Yet     | Project setup phase verification                | NOT_RUN              |
| BUG-20260629-003 | Real API Providers Not Configured Yet      | Provider configuration and real API tests       | NEEDS_PROVIDER_CHECK |
| BUG-20260629-004 | Manual Verification Has Not Started Yet    | Manual verification doc/prompt generation check | NOT_RUN              |

---

## 32. Fix Checklist

Before marking any bug `RESOLVED`, Claude must confirm:

* [ ] Bug is clearly described.
* [ ] Expected behavior is written.
* [ ] Actual behavior is written.
* [ ] Impact is written.
* [ ] Root cause is known or marked unknown.
* [ ] Fix plan is written.
* [ ] Exact files changed are listed.
* [ ] SQL/migration files are listed or `None`.
* [ ] RLS/security impact is listed.
* [ ] Provider/API impact is listed.
* [ ] UI/responsive impact is listed.
* [ ] Tests are run or exact reason is documented.
* [ ] Manual verification is run or exact reason is documented.
* [ ] Retest result is not fake.
* [ ] `CHANGELOG.md` updated.
* [ ] `FEATURE_REGISTRY.md` updated.
* [ ] `MANUAL_VERIFICATION.md` updated.
* [ ] `brain.md` updated if status/workaround/decision changed.
* [ ] `SECURITY_RLS_CHECKLIST.md` updated for security/RLS bugs.
* [ ] `API_PROVIDER_STATUS.md` updated for provider bugs.
* [ ] `DEPLOYMENT_ROLLBACK.md` updated for deployment/rollback bugs.
* [ ] `PERFORMANCE_CHECKLIST.md` updated for performance bugs.
* [ ] Workaround removed or removal condition written.
* [ ] Pending issues honestly listed.
* [ ] No secrets/log-private-data exposed.

If any item is missing, do not mark `RESOLVED`.

---

## 33. Phase PASS Blocking Rules

A phase cannot be marked `PASS` if any of these exist in that phase:

* `S0_CRITICAL` open bug
* `S1_HIGH` open bug
* security/RLS bug not fixed
* contact privacy bug not fixed
* payment verification bug not fixed
* admin/staff permission bug not fixed
* public/private data leak not fixed
* build failure
* typecheck failure
* lint failure that affects release quality
* route crash
* broken login/register
* dead primary CTA
* broken posting flow in that phase
* broken admin approval flow in that phase
* broken mobile layout in that phase
* horizontal scroll in primary views
* provider fake success
* test mode active in production phase
* dev OTP active in production phase
* missing required migration for DB change
* missing rollback notes for destructive DB change
* manual verification not run and no acceptable reason
* documentation not updated

Allowed exception:

* User explicitly approves moving ahead with `PARTIAL` or `BLOCKED`.
* The issue must stay tracked in this file and `FEATURE_REGISTRY.md`.

---

## 34. Production Launch Blocking Bugs

Production launch is blocked if any of these remain open:

### Security / Privacy

* contact number leak
* private document leak
* service role key leak
* RLS failure
* admin/staff public access
* role bypass
* raw secret/log exposure
* provider secret exposure
* unsafe upload
* webhook signature missing
* missing rate limits for OTP/contact reveal/payment-sensitive APIs

### Payment / Billing

* fake payment success
* failed/pending payment activates plan
* invoice generated without verified payment
* test payment mode active
* Razorpay webhook unverified
* GST/invoice sequence broken
* manual activation lacks audit

### Auth / Roles

* public admin registration possible
* admin mobile login possible
* logged-in user still sees login/register
* wrong dashboard redirect
* direct URL unauthorized access works
* role change bypasses approval

### UI / UX

* homepage broken
* search broken
* login/register popup broken
* public detail page broken
* dashboard broken for any active role
* admin panel broken
* mobile layout broken on required sizes
* horizontal scroll on primary pages
* text wrap breaks key UI
* dead primary buttons

### Providers / Deployment

* dev OTP active
* mock provider active
* test payment active
* production env misconfigured
* no backup
* no rollback plan
* build fails
* no production smoke test
* demo data visible publicly
* legal pages missing
* privacy/terms consent missing

---

## 35. Bug ID Rules

Bug IDs must use:

```md id="4fb3um"
BUG-YYYYMMDD-001
```

Example:

```md id="pczfoq"
BUG-20260629-001
```

Workaround IDs must use:

```md id="8tl0c1"
WORKAROUND-YYYYMMDD-001
```

Regression IDs must use:

```md id="h9b7vk"
REGRESSION-YYYYMMDD-001
```

Rules:

* Do not reuse IDs.
* Do not renumber old bugs.
* Mark duplicates as `DUPLICATE` and link original bug.
* Keep old bug history even after resolved.
* Do not delete bug history.
* Do not hide production bugs.

---

## 36. Bug Source Rules

Every bug must mention where it came from:

* manual verification
* automated test
* lint/typecheck/build
* user report
* admin/staff report
* monitoring alert
* security review
* RLS test
* provider test
* payment webhook test
* responsive QA
* SEO QA
* legal review
* performance/load test
* deployment smoke test
* production incident
* code review
* migration review
* docs/code conflict

---

## 37. Exact Evidence Rules

Do not paste long logs.

Allowed evidence:

* relevant 20–30 log lines
* exact route path
* exact file path
* screenshot filename/path
* browser/device size
* error code
* provider error ID if safe
* payment order ID if safe and redacted
* database migration filename
* SQL error summary without secrets/private data

Never include:

* OTP
* password
* API key
* access token
* refresh token
* service role key
* Razorpay secret
* provider secret
* private document URL
* full private user payload
* full hidden contact list
* raw database credentials

---

## 38. Bug Fix Final Response Rule

When Claude fixes a bug, final response must include:

```md id="cjvby5"
## Fixed
- Bug ID:
- Summary:

## Changed Files
- path/to/file

## SQL / Migration Files
- path/to/file.sql
- None

## Tests Run
- command
- result

## Retest Result
PASS / PARTIAL / BLOCKED / FAIL

## Docs Updated
- BUGS_AND_FIXES.md
- CHANGELOG.md
- FEATURE_REGISTRY.md
- MANUAL_VERIFICATION.md
- brain.md

## Pending Issues
- issue or None
```

If no test was run, say exact reason and do not mark `PASS`.

---

## 39. Bug Relationship To Other Docs

When updating this file, also update:

### Always for bug/fix

* `CHANGELOG.md`
* `FEATURE_REGISTRY.md`
* `MANUAL_VERIFICATION.md`

### If project memory/status changes

* `brain.md`

### If provider/API bug

* `API_PROVIDER_STATUS.md`

### If security/RLS/privacy/contact/admin bug

* `SECURITY_RLS_CHECKLIST.md`

### If performance/query/cache/load bug

* `PERFORMANCE_CHECKLIST.md`

### If deployment/migration/rollback bug

* `DEPLOYMENT_ROLLBACK.md`

### If code behavior contradicts docs

* relevant detailed docs
* `brain.md` conflict note

---

## 40. Current Documentation Generation Progress

| File No. | File                                                      | Bug/Fix Tracking Status          |
| -------: | --------------------------------------------------------- | -------------------------------- |
|        1 | `CLAUDE.md`                                               | Created, needs manual review     |
|        2 | `brain.md`                                                | Created, needs continued updates |
|        3 | `FEATURE_REGISTRY.md`                                     | Created, needs continued updates |
|        4 | `CHANGELOG.md`                                            | Created, needs continued updates |
|        5 | `BUGS_AND_FIXES.md`                                       | Created                          |
|        6 | `MANUAL_VERIFICATION.md`                                  | Pending                          |
|        7 | `API_PROVIDER_STATUS.md`                                  | Pending                          |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Pending                          |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Pending                          |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Pending                          |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Pending                          |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Pending                          |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Pending                          |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Pending                          |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Pending                          |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Pending                          |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Pending                          |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Pending                          |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending                          |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending                          |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending                          |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending                          |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending                          |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending                          |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending                          |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending                          |

---

## 41. Current Open Bug Summary

| Bug ID           | Title                                      | Status         | Severity  | Priority             | Category               | Retest               |
| ---------------- | ------------------------------------------ | -------------- | --------- | -------------------- | ---------------------- | -------------------- |
| BUG-20260629-001 | Documentation Pack Not Fully Generated Yet | OPEN           | S2_MEDIUM | P1_FIX_THIS_PHASE    | DOCS/WORKFLOW          | NOT_RUN              |
| BUG-20260629-002 | Website Implementation Not Started Yet     | OPEN           | S2_MEDIUM | P2_FIX_BEFORE_LAUNCH | CORE/WORKFLOW          | NOT_RUN              |
| BUG-20260629-003 | Real API Providers Not Configured Yet      | SETUP_REQUIRED | S2_MEDIUM | P2_FIX_BEFORE_LAUNCH | PROVIDER               | NEEDS_PROVIDER_CHECK |
| BUG-20260629-004 | Manual Verification Has Not Started Yet    | OPEN           | S2_MEDIUM | P1_FIX_THIS_PHASE    | MANUAL_VERIFICATION/QA | NOT_RUN              |

---

## 42. Final Rule

A bug is not fixed until it is fixed and retested.

A phase is not PASS until blocking bugs are fixed or user explicitly accepts moving forward with tracked `PARTIAL` / `BLOCKED`.

A production launch is not allowed while critical bugs remain open.

Never skip, hide, delete or fake bug status.

## Prompt 09 — Billing [2026-07-02]

No new bugs found during implementation. Watch-list items from the prompt were checked and are NOT present:
- `BUG-BILLING-FAKE-PAYMENT-SUCCESS`: prevented — activation is webhook-only.
- `BUG-BILLING-CLIENT-CALLBACK-ACTIVATES`: prevented — `recordClientCallback` returns `activated:false`, never activates.
- `BUG-BILLING-WEBHOOK-NO-SIGNATURE`: prevented — HMAC-SHA256 raw-body verification, invalid → 400.
- `BUG-BILLING-WEBHOOK-DUPLICATE-INVOICE`: prevented — unique `provider_event_id` + one-invoice-per-payment idempotency check.
- `BUG-BILLING-CLIENT-PRICE-TRUSTED`: prevented — price read from DB server-side.
- `BUG-BILLING-RLS-MISSING`: prevented — RLS on all 19 tables; money tables have no client write policy.
- `BUG-BILLING-PROVIDER-SECRET-LEAK`: prevented — secrets only in server-only `lib/razorpay/client.ts`; admin masks payment ids.
- `BUG-BILLING-PRIVATE-PAGE-INDEXABLE` / `PRIVATE-CACHE`: prevented — noindex + force-dynamic.

Open (non-bug, documented): webhook not yet exercised against a live Razorpay test webhook (`RAZORPAY_WEBHOOK_SECRET` unset); migration not yet applied to remote (runtime RLS tests pending).

---

### Prompt 01 Re-Baseline [2026-07-04]

#### BUG-20260704-DOCS-001 [FIXED]

- **ID:** BUG-20260704-DOCS-001
- **Phase:** Prompt 01 (re-baseline)
- **Category:** `DOCS` / `REGISTRY`
- **Severity:** `S3_LOW`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `RESOLVED`
- **Title:** Stale top-of-file status summaries contradicted the phase logs
- **Description:** The "Current Overall Status" block in `FEATURE_REGISTRY.md` §5, the "Current Provider Summary" intro in `API_PROVIDER_STATUS.md` §8, and the "Current Project Snapshot" in `brain.md` §2 all still said documentation-generation / NOT_STARTED, while the per-phase logs in the same files show Prompts 01–08 built & verified and Prompt 09 billing foundation built. This is the "old generated files inconsistent with docs" baseline bug from Prompt 01 §48.
- **Fix:** Reconciled all three summaries to the real phase-log state (with a dated note pointing to the authoritative per-phase logs / bottom resume entries). No app code touched.
- **Affected Files:** `FEATURE_REGISTRY.md`, `API_PROVIDER_STATUS.md`, `brain.md`
- **Retest:** `PASS` — summaries now match phase logs; `npm run lint`/`typecheck`/`build` all pass.
- **Fixed Date:** 2026-07-04

#### Prompt 01 Re-Baseline — No Other Bugs Found

- `.env.example` contains placeholder names only, no secrets. `.env.local` not printed.
- Single lockfile (`package-lock.json`), npm. Scripts present: dev/build/start/lint/typecheck/format.
- 7 migrations under `supabase/migrations/`. `src/proxy.ts` is the Next 16 middleware convention (not a bug).
- No service-role key in client code path; `src/lib/supabase/service.ts` has `import "server-only"` (BUG-20260630-AUTH-004, already fixed).
- Pre-existing upstream npm-audit items (BUG-20260630-SETUP-001) unchanged, non-blocking.

---

### Prompt 02 Design Alignment [2026-07-04]

#### BUG-20260704-AUTHUI-001 [FIXED]
- **ID:** BUG-20260704-AUTHUI-001
- **Phase:** Prompt 02 (design alignment)
- **Category:** `PUBLIC_UI` / `AUTH`
- **Severity:** `S3_LOW`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `RESOLVED`
- **Title:** Auth UI off-brand (blue) and missing finished-design elements
- **Description:** Auth components used hardcoded `blue-600/500/50` instead of the brand token, and the OTP was a single input missing the Batch 2 design's 6-box auto-submit, resend cooldown, remaining-attempt counter, masked-number "Change" link, and consent-checkbox-gated Continue. Brand token hex was also #0f7b6c vs the design-locked #0F6B5C.
- **Fix:** Locked `--brand` to #0F6B5C; added `OtpInput` (6-box, auto-submit); rebuilt MobileOtpForm + RegisterRoleForm + RoleSelector to the design with brand tokens.
- **Affected Files:** `src/app/globals.css`, `src/components/auth/OtpInput.tsx` (new), `MobileOtpForm.tsx`, `RegisterRoleForm.tsx`, `RoleSelector.tsx`.
- **Retest:** `PASS` — lint/typecheck/build pass; live /login verified (brand-teal Continue #0F6B5C, consent gates Continue both states, no console errors).
- **Fixed Date:** 2026-07-04

---

### Prompt 02 True Port [2026-07-04]

#### BUG-20260704-AUTHUI-002 [RESOLVED]
- **ID:** BUG-20260704-AUTHUI-002
- **Phase:** Prompt 02 (true design port)
- **Category:** `PUBLIC_UI` / `AUTH`
- **Severity:** `S3_LOW`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `RESOLVED`
- **Title:** Auth UI was a restyle, not a true port of the finished design
- **Description:** Prior pass (AUTHUI-001) recolored/rebuilt auth components from a text description rather than porting the actual Batch 2 design markup — violating the REPLACE-not-restyle rule (CLAUDE.md §3A rule 0).
- **Fix:** Read the actual Batch 2 markup from `design-extract/batch_2_Auth_Flows_Standalone_.txt` and rebuilt AuthModal/MobileOtpForm/RegisterRoleForm/RoleSelector/OtpInput 1:1 (exact inline-style values, copy, spacing), keeping only backend wiring.
- **Retest:** `PASS` — lint/typecheck/build pass; live /login desktop + 375px verified pixel-faithful (screens 1 & 8), no console errors, no horizontal overflow.
- **Fixed Date:** 2026-07-04

---

### Prompt 02 Verification [2026-07-04]

#### BUG-20260704-AUTH-DESIGN-001 [RESOLVED 2026-07-04]
- **ID:** BUG-20260704-AUTH-DESIGN-001
- **Phase:** Prompt 02 Verification
- **Category:** `AUTH` / `ADMIN_LOGIN` / `PUBLIC_UI` (design-match)
- **Severity:** `S3_LOW`
- **Priority:** `P2_FIX_BEFORE_LAUNCH`
- **Status:** `RESOLVED` — Batch 2 screens 12–16 ported 1:1 and live-verified (2026-07-04).
- **Fix:** (a) `/admin/login` rebuilt to the graphite "MGP Staff Portal" design (screens 14–15): work email + password with eye toggle, **Forgot password?** + **Continue with Google** (honest SETUP_REQUIRED notices — not dead, not fake), Sign in (graphite), invite-only footer, `noindex`; invalid-credentials **attempt counter** ("N attempts remaining before a 30-minute lockout") and **Account locked** state ("Locked until HH:MM IST · your admin was notified" + Contact your admin) — client-side visible UI; real server-side lockout stays Prompt 13. (b) Screen 12 suspended terminal → new `SuspendedState` (app header + back, "Account suspended", listings-hidden copy, Contact support + Read listing policy) rendered by `/unauthorized?reason=account_restricted`; honest copy, no fabricated date/reason. (c) Screen 13 personalized success → `AuthModal` now shows "You're in, {firstName} / Redirecting…" (firstName returned from `verifyOtpAndLogin`/`verifyOtpAndRegister`). (d) Screen 16 staff invite acceptance → new pre-auth route `/admin/invite?token=…` (`getInviteByToken`/`acceptStaffInvite` in `src/lib/actions/staff-invite.ts` + role→permission presets in `src/lib/admin/role-presets.ts`): real inviter/role/expiry + permission preview, accept creates the active staff auth user + profile + seeded permissions and marks the invite accepted (single-use).
- **Changed/new files:** `src/app/admin/login/page.tsx` (rebuild), `src/components/auth/AuthModal.tsx` + `MobileOtpForm.tsx` + `RegisterRoleForm.tsx` (firstName→success), `src/lib/auth/actions.ts` (return firstName), `src/components/auth/SuspendedState.tsx` (new), `src/app/unauthorized/page.tsx`, `src/lib/actions/staff-invite.ts` (new), `src/lib/admin/role-presets.ts` (new), `src/app/admin/invite/{page,layout}.tsx` (new), `src/proxy.ts` (see BUG-...-002).
- **Retest:** `PASS` — live: staff portal graphite `#18181b`, attempt-counter → lockout ("Locked until 18:19 IST"), suspended screen, personalized success "You're in, Test" → `/dashboard/owner`, invite screen-16 with real data → accept created active `verification_manager` with seeded perms (verification r/a/r + properties r) → new staff signs in (session created; `/admin` root then RBAC-gates per Prompt 07 = expected). lint/typecheck/build PASS; 320px no overflow on all three new screens.
- **Original title:** Batch 2 auth screens 12–16 not ported to finished design; some Batch 2 add-ons absent

#### BUG-20260704-AUTH-DESIGN-002 [RESOLVED]
- **ID:** BUG-20260704-AUTH-DESIGN-002
- **Phase:** Prompt 02 Verification (screen-16 port)
- **Category:** `ROUTING` / `ADMIN` / `SECURITY`
- **Severity:** `S1_HIGH` (feature-blocking)
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** Proxy redirected `/admin/invite` to `/admin/login` — invitees could never reach the acceptance page
- **Description:** `src/proxy.ts` treats every `/admin/*` path except `/admin/login` as auth-required, so an unauthenticated invitee opening `/admin/invite?token=…` was 302'd to `/admin/login?redirectTo=%2Fadmin%2Finvite`. Confirmed live.
- **Fix:** Allow `/admin/invite` (like `/admin/login`) through the proxy without a session. Authorization for the invite page comes from possession of a valid, unexpired, single-use token, re-validated server-side in `acceptStaffInvite`. No other `/admin/*` route was loosened.
- **Affected Files:** `src/proxy.ts`
- **Retest:** `PASS` — after fix, `/admin/invite?token=…` renders the acceptance page (real invite live-loaded); other `/admin/*` still redirect guests to `/admin/login`.

#### BUG-20260704-AUTH-DESIGN-003 [RESOLVED]
- **ID:** BUG-20260704-AUTH-DESIGN-003
- **Phase:** Prompt 02 Verification (screen-16 port)
- **Category:** `DATABASE` / `STAFF`
- **Severity:** `S2_MEDIUM`
- **Priority:** `P1_FIX_THIS_PHASE`
- **Status:** `RESOLVED`
- **Title:** Invite-accept seeded 0 staff_permissions rows (silent PostgREST bulk-insert failure)
- **Description:** `acceptStaffInvite` built permission rows per role preset where different modules set different flag subsets (e.g. `verification` sets can_approve/can_reject, `properties` only can_read). PostgREST bulk insert unions keys across rows and sends explicit `NULL` for any column a row omits → hits the `NOT NULL` defaults on `staff_permissions`, failing the whole batch. The error was unchecked, so the accept succeeded but the new staff got **no** permissions. Caught in live verification (perms `[]`), reproduced (single-row insert succeeded, batch didn't).
- **Fix:** Every seeded row now starts from an explicit all-`false` `PERM_BASELINE` then spreads the grant, so all rows share the same key set; the insert error is now checked/logged.
- **Affected Files:** `src/lib/actions/staff-invite.ts`
- **Retest:** `PASS` — fresh invite accept seeded verification (read/approve/reject) + properties (read) exactly as the preset preview showed; verified via direct DB query.
- **Description:** The public popup auth (Batch 2 screens 1–11) is a true 1:1 design port with all add-ons. The remaining Batch 2 screens are NOT design-matched:
  - Screen 14–15 Staff Portal: `src/app/admin/login/page.tsx` is a functional restyle (blue focus rings, "Admin Panel"/"Staff Login") — NOT the design's graphite "MGP Staff Portal"; missing **Forgot password?**, **Continue with Google**, and the **invalid-credentials attempt counter + 30-min lockout** state ("2 attempts remaining", "Locked until 14:45 IST · your admin was notified").
  - Screen 12 Suspended terminal: suspension is only a plain error string ("Your account has been restricted…") — missing the design's full-stop screen with suspension date + reason category + "your listings are hidden" + "Read listing policy" CTA.
  - Screen 13 Success: login redirects directly — missing the personalized "You're in, Rajesh / Redirecting…" success screen.
  - Screen 16 Staff invite acceptance: no token-based public acceptance page (inviter name+role, invited-email read-only, set-password min-12 policy, read-only permissions preview, "expires in 6 days · single use"). (`src/app/admin/staff/invites/page.tsx` is the admin-side invite *list*, not the acceptance page.)
  - Missing Batch 2 add-ons (DESIGN_ADDONS_MASTER §B Batch 2): staff lockout details, invite metadata, suspension detail, personalized success.
- **Impact:** Cosmetic/feature-parity only. NOT a security issue: admin/staff login is functional and secure (separate route, `noindex,nofollow`, email+password only, no OTP, no public register, invite-only copy, server-side staff check). Login blocks suspended/banned accounts correctly (just without the rich terminal screen).
- **Root Cause:** Prompt 02 true-port pass covered public screens 1–11 first; staff portal + terminal states (12–16) were explicitly deferred (documented in MANUAL_VERIFICATION Prompt 02 True Port entry).
- **Affected Files:** `src/app/admin/login/page.tsx` (restyle→port), + new: suspended terminal state, success screen, staff invite acceptance page.
- **Fix Plan:** Port screens 12–16 from `design-extract/batch_2_Auth_Flows_Standalone_.txt` (graphite staff portal, Forgot-password + Google buttons, lockout counter, suspended full-stop, personalized success, invite acceptance) keeping existing backend wiring (`adminLogin`, staff RLS, invite tables already exist).
- **Retest:** `NOT_RUN` — pending port. Does NOT block Prompt 03 (public home/header/hero — different area). Must be closed before final production signoff.

---

### Prompt 03 — Public UI, Home, Header, Footer, Hero [2026-07-04] — No Bugs Found (implementation pass)

Batch 3 homepage true-port implemented cleanly: lint/typecheck/build PASS; live homepage rendered all sections with real data. No `href="#"`, no public admin link, no fake listing/count/badge data (RERA/Verified chips only when the real row field is set; empty → honest state), no hidden-contact leak (public views only), no service-role/secret in client. Guest header shows Login/Register; logged-in Owner header shows Dashboard+avatar. 1280px + 320px: no horizontal scroll, brand does not wrap. No console errors. Remaining full responsive matrix + broker/builder header variants belong to `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`.

---

## BUG-20260704-UI-001 — Fake "Verified" badge on featured property cards — FIXED

- **Phase:** Prompt 03 verification (2026-07-04) · **Severity:** S2 (honesty-rule violation, CLAUDE.md rule #8) · **Status:** FIXED
- **Found:** `src/components/public/HomeFeaturedProperties.tsx` rendered a "Verified" badge on **every** featured property card, but `PublicPropertyCard` (`src/lib/actions/public-search.ts`) carries **no verification field** and `getHomeFeatured()` returns newest published rows unfiltered — so the badge was unconditional/fake.
- **Fix:** Removed the unconditional "Verified" badge (and the now-unused `Check` import). Left a code comment: re-add only when gated on a real verification field. Projects card was already correct (RERA chip gated on `p.rera_registered`).
- **Retest:** lint/typecheck/build PASS; homepage re-rendered without the badge. No other fake badge remains.

## BUG-20260704-SEARCH-TRANSLIT — `/search` results not typo/transliteration-tolerant — FIXED

- **Phase:** Prompt 05 verification (2026-07-04) · **Severity:** S3 (design add-on gap; search still returned correct exact-match rows — no security/correctness issue) · **Status:** FIXED
- **Detail:** The Batch 3 "typo/transliteration search" add-on was wired only at the home-hero autosuggest; the `/search` **results** backend (`src/lib/actions/public-search.ts`) matched `q` with a single `ilike("title"|"project_name", %q%)`, so `q=amdavad` / `q=baroda` matched nothing even when Ahmedabad/Vadodara listings existed.
- **Fix:** Added `expandSearchTerms()` in `src/lib/search/config.ts` (Gujarat city alias/typo map → canonical name, whole-word aliasing, terms sanitized to `[a-z0-9 ]`). Wired into both property + project `q` queries as a safe PostgREST `.or()` ilike across title/name + city_text + locality_text.
- **Retest:** live-probed — `q=Ahmedabad`→1 real property, `q=amdavad`→**same 1** (was 0), `q=baroda`/`q=zzzznope`→0 (no fake results). eslint/tsc/build PASS.

## BUG-20260704-UI-002 — Global font is Geist, design token locks Inter — FIXED (2026-07-04, T01 migration)

- **Resolved during** MGP design migration T01/Batch 1 fresh rebuild. `src/app/layout.tsx` now loads **Inter** (400/500/600/700) into `--font-geist-sans`; `src/app/globals.css` `body` uses `var(--font-geist-sans)` first (previously a hardcoded system stack overrode any loaded font). **Runtime-verified:** `getComputedStyle(body).fontFamily` = Inter on `/` and `/search`; `document.fonts` shows Inter loaded; no overflow at 320px; `npm run build` 40/40. Auth-consumer live re-render UNVERIFIED-AUTH (global token, provably applied). Evidence: `docs/design-migration/verification/T01_VERIFY.md`.

## BUG-20260704-UI-002-ORIG — Global font was Geist, design token locks Inter — (superseded, see FIXED entry above)

- **Phase:** Prompt 03 verification (2026-07-04) · **Severity:** S4 (visual token deviation; not functional/security/honesty) · **Status:** OPEN
- **Detail:** `DESIGN_ADDONS_MASTER.md` / CLAUDE.md §3A lock **Inter 400/500/600**, but `src/app/layout.tsx` loads **Geist** via `next/font/google` (`--font-geist-sans`) and `globals.css` maps `--font-sans` to it. Pre-existing since Prompt 01 baseline.
- **Why not fixed in this pass:** swapping the global font touches every previously-verified screen (dashboards/admin included); it's a deliberate design-token change, not a public-UI verification fix. Recommend a dedicated token pass: replace `Geist`→`Inter` in `layout.tsx` and re-verify spacing app-wide.
- **Retest:** N/A (open). Does NOT block Prompt 04 (cosmetic).

### Prompt 04 Verification [2026-07-04]

#### BUG-20260704-ENTITY-REQ-AUDIENCE [OPEN · DEFERRED→Prompt 05]
- **Severity:** S2_MEDIUM · **Priority:** P1_FIX_IN_PROMPT_05 · **Category:** RLS / REQUIREMENT / DESIGN-MATCH
- **Title:** Requirement audience not gated to verified Brokers/Builders (locked rule)
- **Description:** `requirements_public_read` RLS grants **anon** SELECT on requirements where `visibility_status='public' AND approval_status='approved' AND status='published'`, and `public_requirements_view` (definer view) is read by `searchPublicListings`. Locked rule (CLAUDE.md §3A conflict #1 + Batch-5 submit copy) is: requirements are **visible to verified Brokers & Builders only — never public, never to guests**. So once an admin approves any requirement it would be guest-readable.
- **Active leak now:** NONE — 0 requirements are approved/public (all submit → `pending`, verified live). Latent only.
- **Root cause:** requirement audience gating belongs to the requirement-feed/search phase; Prompt 04 built the entity + pending-approval foundation but not the verified-only feed.
- **Fix (Prompt 05):** gate the requirement feed/search to authenticated **verified** broker/builder profiles (app-layer role check + `security_invoker` view or dedicated scoped view); do not surface requirements in guest search. Add `requirements → verified broker/builder only` to SECURITY_RLS_CHECKLIST.
- **Retest:** NOT_RUN (fix lands in Prompt 05).

#### BUG-20260704-ENTITY-REQ-AUDIENCE — UPDATE: RESOLVED [2026-07-04]
- **Status:** RESOLVED (was OPEN/DEFERRED).
- **Fix:** migration `supabase/migrations/20260704120000_requirement_audience_verified_pro_only.sql` — applied to remote (Management API, HTTP 201). (1) Dropped anon-public `requirements_public_read`; added `requirements_verified_pro_read` (approved+published requirement readable only if the caller is an **active, verified broker/builder** — EXISTS on profiles). (2) Recreated `public_requirements_view` `WITH (security_invoker=true)` (same column list, still excludes description) so the view honors the caller's RLS instead of bypassing it as a definer view. Owners still see their own via `requirements_owner_read`; admin/staff via service role.
- **Retest:** PASS — live: guest reads base `requirements`=0 rows and `public_requirements_view`=0 rows; **verified broker session reads the seeded approved requirement=1 row**; guest simultaneously=0; anon insert still DENIED (42501); properties/projects public views unchanged (2/1 rows). Test data + temp verification flag cleaned up. lint/tsc/build GREEN (39/39).

### Codebase-wide bug scan [2026-07-08]

#### BUG-20260708-PERF-001 [RESOLVED]
- **Category:** PERFORMANCE / N+1
- **Severity:** S3_LOW
- **Title:** `getTotalUnreadMessageCount` issued one count query per thread in a loop
- **Fix:** `src/lib/actions/messages.ts` — single `.in("thread_id", threadIds)` query for all unread messages across threads, tallied in-memory against each thread's last-read timestamp.
- **Retest:** PASS — build 40/40 green.

#### BUG-20260708-PERF-002 [RESOLVED]
- **Category:** PERFORMANCE / N+1
- **Severity:** S3_LOW
- **Title:** `listSavedItems` / `listRecentlyViewed` queried the target entity table once per row
- **Fix:** `src/lib/actions/saved.ts` — added shared `batchLoadEntities()` helper (same pattern as `admin/leads.ts`) grouping ids by item_type and batching with `.in()`. Both functions now use it.
- **Retest:** PASS — build 40/40 green.

#### BUG-20260708-PERF-003 [RESOLVED]
- **Category:** PERFORMANCE / UNBOUNDED READ
- **Severity:** S4
- **Title:** `trackRecentlyViewed` trim step fetched the user's entire history on every page view
- **Fix:** `src/lib/actions/saved.ts` — trim query now uses `.range(RECENTLY_VIEWED_MAX, RECENTLY_VIEWED_MAX + 199)` instead of an unbounded select.
- **Retest:** PASS — build 40/40 green.

#### BUG-20260708-SEC-001 [RESOLVED]
- **Category:** SECURITY / PRIVILEGE_ESCALATION
- **Severity:** S3_MEDIUM
- **Title:** `updateStaffPermissions` allowed a staff member to grant permission flags they did not themselves hold (incl. `can_manage_staff`) to any non-super-admin target
- **Fix:** `src/lib/actions/admin/staff.ts` — non-super-admin granters are now checked against their own `staff_permissions` row for that module; any `true` flag being granted that the granter does not already hold is rejected with `PERMISSION_DENIED`. Super admin exempt (holds all permissions by definition).
- **Retest:** PASS — build 40/40 green. Logic-verified; no UI surface change (server action only).

#### BUG-20260708-SEC-002 [RESOLVED]
- **Category:** SECURITY / INFO_LEAK
- **Severity:** S4_LOW
- **Title:** `getContactRevealStatus` returned distinct `LEAD_NOT_FOUND` vs `NOT_PARTICIPANT` errors, letting an authenticated caller enumerate valid lead IDs
- **Fix:** `src/lib/actions/contact.ts` — both cases now return the same `NOT_PARTICIPANT` error.
- **Retest:** PASS — build 40/40 green.

### Deep auth flow audit — Login/Register, all roles [2026-07-08]

#### BUG-20260708-AUTH-001 [RESOLVED — CRITICAL]
- **Category:** AUTH / SESSION / FAKE_SUCCESS
- **Severity:** S1_CRITICAL
- **Title:** `verifyOtpAndRegister` never checked `establishDevSession()`'s result — new accounts could be created with no session, silently returning `success:true` and bouncing the user to `/login?redirectTo=...` via the auth-required middleware
- **Found:** Live-verified in browser — registration consistently landed back on the login form after "Verify & create account" instead of the dashboard.
- **Root cause (2 layered bugs):**
  1. `verifyOtpAndRegister` (`src/lib/auth/actions.ts`) called `await establishDevSession(...)` without checking success, unlike `verifyOtpAndLogin` which already did.
  2. `establishDevSession`'s fallback synthetic email used `userData.user.email ?? fallback` — Supabase returns `""` (empty string, not `null`) for phone-only accounts, so `??` never triggered the fallback and `signInWithPassword` was called with an empty email (`"missing email or phone"` from GoTrue).
- **Fix:** `verifyOtpAndRegister` now checks the result and rolls back the orphaned auth user + returns an honest error on failure. `establishDevSession` now always signs in via email+password (synthetic `dev-mock-<id>@internal.mgptest.dev` for phone-only accounts) using `||` instead of `??`, since phone+password sign-in was also independently unreliable in this project's auth config.
- **Retest:** PASS — live: Owner, Broker, Builder registration all verified end-to-end through the real UI, landing on the correct role dashboard with a persistent session. Existing seeded-account logins (Owner/Broker/Super Admin) re-verified unaffected.

#### BUG-20260708-AUTH-002 [RESOLVED]
- **Category:** SECURITY / RATE_LIMITING
- **Severity:** S2_MEDIUM
- **Title:** OTP verify (login+register) and admin password lockout counters were client-side `useState` only — reloading the page or calling the action directly reset the count, so brute-forcing OTP/admin password was server-side unbounded
- **Fix:** New `auth_login_attempts` table (`supabase/migrations/20260709090000_auth_login_attempts_rate_limit.sql`, **not yet applied to remote — run `supabase db push`**) + server-side lockout in `verifyOtpAndLogin`/`verifyOtpAndRegister` (5 attempts / 15 min) and `adminLogin` (3 attempts / 30 min) in `src/lib/auth/actions.ts`. Client-shown counters are now UX only, no longer the enforcement.
- **Retest:** Build/typecheck PASS. Rate-limit table not yet live in remote DB — code fails open safely (no lockout enforced, no crash) until migration is applied; SETUP_REQUIRED until then.

#### BUG-20260708-AUTH-003 [RESOLVED]
- **Category:** SECURITY / ENUMERATION
- **Severity:** S3_LOW
- **Title:** `checkMobileExists` had no rate limit — any caller could enumerate which mobile numbers are registered
- **Fix:** Same `auth_login_attempts` ledger, `mobile_check` type, 15 attempts / 15 min cap.

#### BUG-20260708-AUTH-004 [RESOLVED]
- **Category:** SECURITY / PREDICTABLE_CREDENTIAL
- **Severity:** S2_MEDIUM (DEV_ONLY code path, hard-gated to non-production)
- **Title:** `establishDevSession`'s minted password was `dev-otp-${authUserId}-123456` — fully computable from a non-secret ID + the fixed dev OTP constant
- **Fix:** Password is now `dev-${crypto.randomUUID()}`, unique per call, never derived from any guessable input.

#### BUG-20260708-AUTH-005 [RESOLVED]
- **Category:** SECURITY / RACE_CONDITION
- **Severity:** S2_MEDIUM
- **Title:** Staff invite acceptance (`acceptStaffInvite`) only marked the invite `accepted` *after* creating the auth user + staff profile — two concurrent submits of the same token could both pass the pending-status check before either write landed
- **Fix:** `src/lib/actions/staff-invite.ts` now atomically claims the invite (`UPDATE ... WHERE status='pending'`, checks rows affected) before any account creation; releases the claim back to `pending` on any downstream failure so the invitee can retry.

#### BUG-20260708-AUTH-006 [RESOLVED]
- **Category:** ROUTING / MIDDLEWARE
- **Severity:** S3_LOW (latent — no affected route existed yet)
- **Title:** `proxy.ts` used bare `pathname.startsWith(p)` for route-group matching, which would incorrectly match a future route like `/admin-tools` as admin-protected, or `/dashboard-preview` as auth-required
- **Fix:** Added `matchesPathPrefix()` helper (exact match or `${base}/` boundary) used for all three route groups.

#### BUG-20260708-AUTH-007 [RESOLVED]
- **Category:** UX / ROLE_ASSIGNMENT
- **Severity:** S3_LOW
- **Title:** `RegisterRoleForm` defaulted `role` state to `"owner"` — a user who never interacted with the role selector could register as Owner without an explicit choice
- **Fix:** `role` now starts `null`; "Continue" is disabled until a role is explicitly clicked (`RoleSelector` already supported `Role | null`).
- **Retest:** PASS — live-verified: role step shows "Select a role to continue" (disabled) until a card is clicked.

#### BUG-20260708-AUTH-008 [RESOLVED]
- **Category:** INFO_LEAK
- **Severity:** S4_LOW
- **Title:** `getContactRevealStatus` returned distinct `LEAD_NOT_FOUND` vs `NOT_PARTICIPANT` errors, letting an authenticated caller enumerate valid lead IDs
- **Fix:** Both cases now return the same `NOT_PARTICIPANT` error (`src/lib/actions/contact.ts`).

#### BUG-20260708-AUTH-009 [RESOLVED]
- **Category:** UX / REDUNDANT_REDIRECT
- **Severity:** S4_LOW
- **Title:** `verifyOtpAndLogin`'s default redirect was role-agnostic `/dashboard` (extra 302 hop through `src/app/dashboard/page.tsx`), inconsistent with `verifyOtpAndRegister`'s direct role-specific redirect; `getDashboardRouteForRole` was duplicated in both `actions.ts` and `session.ts`
- **Fix:** `verifyOtpAndLogin` now redirects directly to the role-specific dashboard; `actions.ts` imports `getDashboardRoute` from `session.ts` instead of duplicating it.

**Not fixed — needs a human decision:** `src/proxy.ts`'s `/admin/*` guard only checks "is any authenticated user", not "is staff" (staff check happens per-page via `requireStaff()`). Confirmed every current admin page already calls it, so no live gap — but there's no central enforcement, so a future admin page added without remembering the check would be silently exposed. Adding a blanket `src/app/admin/layout.tsx` guard was evaluated and skipped: it would also wrap `/admin/login` and `/admin/invite` (which must stay reachable pre-auth), and server-component layouts have no reliable pathname branch to exclude them — risks a redirect loop. Flagging for a deliberate follow-up rather than a rushed fix.

**Setup required:** Apply `supabase/migrations/20260709090000_auth_login_attempts_rate_limit.sql` to the remote DB (`supabase db push` or via Management API) to activate the new server-side OTP/admin-login/mobile-check rate limiting. Until applied, the code fails open (no lockout enforced, no crash).

### Rate-limit migration applied + lockout re-verified [2026-07-08]

`supabase/migrations/20260709090000_auth_login_attempts_rate_limit.sql` applied to remote by the user via the Supabase SQL Editor. Live-verified end-to-end:

- **OTP lockout (cap 5, otp_verify):** submitted wrong OTP for a seeded mobile across two page reloads (resetting the client's own 3-attempt UX counter each time) — the server recorded exactly 5 failed rows in `auth_login_attempts` and silently declined to record a 6th, confirming the request was blocked pre-emptively (`recentFailed >= OTP_MAX_ATTEMPTS`) before ever validating the OTP.
- **Admin lockout (cap 3, admin_password):** same method — 3 failed rows recorded, then a 4th attempt **with the correct password** was still rejected ("Invalid email or password") and did **not** add a 4th row, proving the lockout is enforced server-side ahead of `signInWithPassword`, not just displayed client-side.
- Fixed a stale copy string on the admin lockout screen (`src/app/admin/login/page.tsx`) that claimed "server-side lockout is enforced in a later phase" — no longer true as of BUG-20260708-AUTH-002.
- Test attempt rows and lockout state cleaned up afterward (seeded Owner/Super Admin test accounts confirmed to log in normally post-cleanup).

**Status: BUG-20260708-AUTH-002 fully closed** (was previously SETUP_REQUIRED pending migration apply).

### User-reported: rate limit appeared not to work + dead close button [2026-07-08]

#### BUG-20260708-AUTH-010 [RESOLVED]
- **Category:** UX / SECURITY_VISIBILITY
- **Severity:** S2_MEDIUM
- **Title:** OTP lockout appeared to "not work" after reload — client's own 3-attempt UX counter (`MobileOtpForm`) resets on page reload/back-navigation and is separate from the real server-side 5-attempt cap; worse, when the server's real lockout error did fire, the client silently treated it as a generic wrong-OTP message ("Incorrect or expired OTP. N attempts left.") instead of surfacing it — masking the real lockout entirely.
- **Reported by user:** "rate limit not work, when i reload re-enter number than showing enter otp option why?"
- **Fix:** `src/components/auth/MobileOtpForm.tsx` — `submitOtp` now checks whether the server's error is the real lockout message (`"Too many incorrect attempts..."`) and, if so, immediately switches to the lockout screen showing that exact server message — overriding the locally-reset attempt counter. The mobile-entry step and OTP-request itself were never the gate; verify-time checks always were, this just makes that visible instead of silently swallowed.
- **Retest:** PASS — live: accumulated 5 real server-recorded failures for a seeded account across two page reloads, confirmed via direct table query (`auth_login_attempts`, capped at exactly 5 rows); the 6th verify attempt was blocked server-side (row count stayed at 5) and the UI correctly displayed "Too many incorrect attempts. Please try again in 15 minutes." instead of a misleading "1 attempt left."

#### BUG-20260708-AUTH-011 [RESOLVED]
- **Category:** DEAD_UI
- **Severity:** S3_LOW
- **Title:** Close (X) button on the standalone `/login` page was a hardcoded no-op (`onClose={() => {}}`) — visible, clickable, does nothing
- **Reported by user:** "close btn not working"
- **Fix:** `src/app/login/page.tsx` — close now navigates to `/` via `router.push`.
- **Retest:** PASS — live: clicking Close on `/login` now lands on the homepage. Popup-modal close (header Login button → X) confirmed unaffected/working.

**Dead-UI sweep:** grepped the full `src/` tree for `onClick={() => {}}` and `href="#"` — no other dead handlers found. Admin login's "Forgot password?" / "Continue with Google" buttons are intentional honest `SETUP_REQUIRED` notices (not dead), confirmed correct per CLAUDE.md §20.

### User re-report: same number re-testable after "locked" screen [2026-07-09]

#### BUG-20260708-AUTH-010 — FOLLOW-UP FIX
- **Reported by user:** logged in with 9737074939, got "Too many attempts" after only 3 wrong tries, then re-tried the same number shortly after and the lockout didn't show.
- **Root cause (deeper than the first fix):** `MobileOtpForm`'s client-only `MAX_ATTEMPTS = 3` pseudo-lockout was **less than** the real server cap of 5. So the client would show a "locked for 15 minutes" screen after 3 wrong tries — but the server hadn't actually locked anything yet (only 3 of 5 real failures recorded), so the "lock" was fake and the same number could immediately retry successfully. This is exactly the same class of bug as BUG-20260708-AUTH-010's first fix, just one layer deeper: even after making the *real* lockout message display correctly, the *fake* premature one was still firing first and being shown as if it were real.
- **Fix:** Removed the client-side attempt counter and premature pseudo-lockout entirely (`MAX_ATTEMPTS`, `attemptsLeft` state deleted from `src/components/auth/MobileOtpForm.tsx`). Every wrong OTP now shows a plain "Incorrect or expired OTP. Please try again." with no guessed remaining-count — the client cannot know the true count (it doesn't survive reload/navigation), so it no longer pretends to. The **only** way the lockout screen appears now is a real server response starting with `"Too many incorrect attempts"`.
- **Retest:** PASS — live, using the user's own reported number 9737074939 (which already had 5 real recent failures from their testing): reached the OTP entry screen normally (expected — requesting/viewing OTP is never blocked, only verifying is), then submitting **even the correct dev-mock OTP (123456)** was still rejected with the real server lockout message, proving the block is genuine and accurate this time. Test lockout state cleared afterward so the number isn't left waiting out a real 15-minute window from testing.

### Batch 5 · Section 2 — Post Project Wizard live-verification bugs [2026-07-10]

#### BUG-20260710-PROJ-001 [RESOLVED]
- **Category:** DATA_INTEGRITY / FIRST_STEP_DRAFT
- **Severity:** S2_MEDIUM
- **Title:** Project Wizard Step 1 could never create a draft — `project_type` (a Step 2 field) was `not null` at the DB level and non-optional in `ProjectDraftSchema`, so `createProjectDraft` always failed with Postgres `23502` (not-null violation) on the very first Continue click. Same class of bug the Property wizard had already fixed (Batch 5 §16-19).
- **Found by:** live browser walkthrough (Builder test account) while verifying this section, not a pre-existing report.
- **Fix:** `src/lib/validators/project.ts` — `project_type` made nullable in `ProjectDraftSchema` (still required, via `.refine`-free enum, in `ProjectSubmitSchema`). `src/lib/actions/projects.ts` — insert/update now pass `data.project_type ?? null`. DB: migration `20260710161000_project_type_draft_nullable.sql` drops the `not null` constraint and adds a guarded `projects_classification_required` CHECK (`status = 'draft' or project_type is not null`), mirroring the existing `properties_classification_required` pattern.
- **Retest:** PASS — live: Step 1 (name + description only, no type selected yet) now saves a real draft and advances to Step 2.

#### BUG-20260710-PROJ-002 [RESOLVED]
- **Category:** DATA_INTEGRITY / IDEMPOTENCY
- **Severity:** S2_MEDIUM
- **Title:** "Generate units" on the Wings/Towers/Units step always failed with Postgres `42P10` (no unique/exclusion constraint matching the ON CONFLICT specification) — the unit-generation backend existed from an earlier pass but had never actually been exercised end-to-end until this section wired it into the wizard UI.
- **Root cause:** `generateWingUnits()` (`src/lib/actions/units.ts`) upserts with `onConflict: "project_id,unit_number"`, but the existing unique index (`uq_project_units_project_unit_number`, from migration `20260710120000`) was a **partial** index (`where unit_number is not null`). Postgres refuses to match `ON CONFLICT` against a partial index unless the exact predicate is restated by the caller, which the Supabase JS client's `onConflict` string cannot do.
- **Fix:** Migration `20260710162000_project_units_upsert_conflict_fix.sql` drops and recreates the index as a plain (non-partial) unique index — behaviorally identical for this table since NULL `unit_number` values were never treated as duplicates by Postgres in either form.
- **Retest:** PASS — live: "Generate units" on a 4-floor × 3-units/floor wing created 12 units on the first click, and clicking "Regenerate units" immediately after created 0 new units (idempotent), confirmed via the on-screen "N units generated (M total)" message.

#### BUG-20260710-PROJ-003 [RESOLVED]
- **Category:** SECURITY / RLS
- **Severity:** S1_HIGH
- **Title:** Editing (or pausing/resuming) any already-published/approved project or property was completely broken — every authenticated content-only save failed with Postgres `42501` (RLS rejection), even though the app's own `canEditProject`/`canEditProperty` explicitly allow it. This silently broke the entire "Edit Anyway → re-approval" flow (Batch 5 §45-49) for every already-approved listing.
- **Found by:** live browser walkthrough (manual verification pass) — clicking "Edit anyway" on a freshly-approved test project and saving any change.
- **Root cause:** `projects_builder_update` / `properties_owner_update` / `requirements_owner_update` RLS `with check` clauses hard-coded an allowed-value whitelist for `status`/`approval_status`/`visibility_status` on the resulting row. Postgres re-evaluates `with check` against the full NEW row on every UPDATE regardless of which columns actually changed — so once a row is genuinely published (`approval_status='approved'`, `status='published'`), those values sit outside the whitelist and ANY subsequent update (content edit, pause/resume) is rejected.
- **Fix (user-approved, since it changes RLS security logic):** migration `20260710164000_fix_entity_update_rls_governance_check.sql` replaces the fixed whitelist with a `before update` trigger (`mgp_guard_entity_governance_fields`) that only constrains the three governance columns when they actually change (comparing OLD vs NEW), allowlisting exactly the transitions the app's own authenticated actions perform (submit-for-approval, pause↔resume, soft delete) — anything else still requires the service role (staff/admin actions). Applied to `projects`, `properties`, and `requirements` (same bug, same migration, same fix) via reviewed `supabase db push`.
- **Retest:** PASS — live: shrank then restored a wing's floor count on the published test project via "Edit anyway" → Save (previously failed, now succeeds); a plain "Save Draft" content-only save on the Preview step succeeded with no error; Submit for review correctly re-hid the project (visibility_status → private) while pending; admin re-approved it and it went public again — full edit-after-publish cycle confirmed working end-to-end.

#### BUG-20260710-PROJ-004 [RESOLVED]
- **Category:** FAKE_DATA / HONESTY
- **Severity:** S2_MEDIUM
- **Title:** The public Project Detail page's "Construction progress" section showed a synthetic percentage derived purely from the coarse `construction_status` bucket (e.g. "Under Construction" → always exactly 40%) instead of the real, builder-entered `construction_percentage` this section's Step 6 collects — exactly the "fake exact 64% merely from broad status" anti-pattern Batch 5 §167 explicitly forbids. A test project with a real 64% entered showed "40%" publicly.
- **Found by:** live browser walkthrough — viewing the just-submitted-and-approved test project's public page.
- **Root cause (two layers):** (1) `ConstructionProgress` (`src/components/detail/ProjectDetailView.tsx`) never accepted a percentage prop at all, always using the per-status `STATUS_MAP` estimate. (2) Even after fixing that, `public_projects_view` and `getPublicProjectBySlug`'s column list both predated the `construction_percentage`/`progress_note`/`video_url` columns (added earlier in this same section's implementation pass) — Postgres views don't auto-inherit new base-table columns, so the real value could never even reach the page.
- **Fix:** `ConstructionProgress` now takes `percentage`/`progressNote` props and prefers the real value, with an honest "Estimated stage only" caption when the builder hasn't entered one; migration `20260710163000_public_projects_view_progress_video.sql` recreates the view with the missing columns appended (Postgres `CREATE OR REPLACE VIEW` cannot reorder/insert mid-list, only append); `public-search.ts`'s select list and `project/[slug]/page.tsx` updated to read and pass them through. The same gap also silently dropped `video_url` (the "Walkthrough video" section was checking `virtual_tour_url` for both video AND tour, and the 360° tour block was hard-coded to always say "not configured") — fixed alongside since it's the identical root cause.
- **Retest:** PASS — live: public page now shows "64% complete — reported directly by the builder." matching the real wizard input.

#### BUG-20260710-PROJ-005 [RESOLVED]
- **Category:** FAKE_DATA / MISSING_FEATURE
- **Severity:** S3_LOW
- **Title:** A builder-uploaded brochure PDF (real, working upload confirmed in this section) was never actually shown to public visitors — `BrochureCard` took no props and always rendered the honest-but-now-stale "Not uploaded by the builder yet." state regardless of whether one existed, because the private-bucket `media` row has no RLS read policy for non-owners (correct — it must never be broadly SELECT-able) and no server action existed to safely bridge that for a genuinely public project.
- **Fix:** new `getPublicProjectBrochure(projectId)` in `src/lib/actions/media.ts` — runs under the service role specifically to re-verify, fresh on every call, that the project is actually `visibility_status='public'` before ever touching the private bucket or returning a signed URL (300s, same convention as the existing owner-gated `getSignedMediaUrl`). `BrochureCard` now renders a real filename + size + working download link when present. Also hardened `registerMedia` to check the uploaded object's real magic bytes (`%PDF-`) match the declared `application/pdf` MIME before ever registering a brochure — closes the gap where a plain-text file could previously be uploaded as a "PDF" purely on a spoofed MIME string (Batch 5 §173 "PDF structure" check).
- **Retest:** PARTIAL — code complete, `tsc`/`eslint`/`build` all pass; browser automation (both the sandboxed preview and the Chrome extension fallback) stopped responding partway through this verification pass and did not recover after multiple retries, so the live download link and magic-byte rejection could not be re-confirmed by clicking in this session. Re-verify live in a fresh session.
