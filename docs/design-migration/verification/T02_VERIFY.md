# Verification — T02 · Auth Flows (Batch 2) — FRESH REBUILD AUDIT

> **UPDATE 2026-07-08 (runtime pass):** live rendering + interaction + full responsive matrix executed with a real headless Chromium (Playwright) against the running dev server. See "## Runtime verification (Playwright, executed)" below. Screen 7 implemented + live-verified; a real `/admin/login` desktop overflow defect was found and fixed.


**Design source:** `batch 2- Auth Flows (Standalone).html` (decoded → `scratchpad/design-extract/batch2.decoded.html`, 16 screens + redirect-intent rule). **Date:** 2026-07-08. Fresh audit — historical IMPL✓ / Prompt-02 PASS labels NOT trusted; each screen re-inspected against the exact decoded design source, top-to-bottom.

## Design source resolution
Bundled artifact decoded via Node (`script[type="__bundler/template"]` → JSON.parse). 5 `<h2>` groups → 16 numbered screens:
A Phone→OTP (1–4) · B Error/limit (5–7, 11) · C Register+roles (8–10) · D Terminal (12–13) + redirect rule · E Staff portal (14–16).

## Target-by-target fresh audit (design screen → implementation)
| # | Design screen | Impl | Structural match vs decoded source | Result |
|---|---|---|---|---|
| 1 | Mobile entry — desktop modal | `AuthModal` + `MobileOtpForm` (step=mobile) | brand logo+close, "Login or register", 🇮🇳+91 prefix (flex-shrink-0) + input (min-w-0 flex-1), consent checkbox w/ Terms+Privacy links, Continue | MATCH |
| 1m/2 | Mobile bottom sheet + checking | `AuthModal` sheet (rounded-t-20, drag handle) + disabled-until-valid + "Checking…" pending btn | grab handle, disabled Continue + honest caption, spinner label | MATCH |
| 3 | OTP login — desktop modal | `MobileOtpForm` (step=otp) + `OtpInput` | "Welcome back", masked no. + Change, 6 boxes (48×54, brand active ring), auto-focus/advance/submit caption, Verify & login, Resend | MATCH |
| 4 | Resend cooldown — mobile sheet | `MobileOtpForm` cooldown countdown | "Resend OTP in 0:NN · link disabled during cooldown", tabular-nums | MATCH |
| 5 | Wrong/expired OTP | `MobileOtpForm` error banner + `OtpInput error` | #FEF2F2/#FECACA banner "Incorrect or expired OTP. N left", red boxes, "Try again" btn label | MATCH |
| 6 | Rate-limited — full stop | `MobileOtpForm` (step=rate_limited) | lock icon, "Too many attempts", 15-min pause, "Back to browsing", "No bypass…" | MATCH |
| 7 | Unregistered → register prompt | `MobileOtpForm` (step=`unregistered`) | **IMPLEMENTED 1:1 (2026-07-08):** after real `checkMobileExists`→exists:false, shows intermediate card — user icon in #E7F2EF, "This number isn't registered", "+91 {mobile} is new to us. Create a free account to continue?", **Create account** (brand)→registration, **Use a different number**→resets to mobile entry. Live-reached + exact copy verified. | MATCH |
| 8 | Role selector — desktop modal | `RegisterRoleForm`(step=role) + `RoleSelector` | "Who are you?", 3 role cards (Owner selected brand, radio), "Continue as {role}" | MATCH |
| 9 | Registration form — mobile sheet | `RegisterRoleForm`(step=form) | role chip + Change, Full name*, Email(optional)+hint, Mobile locked/prefilled+hint, mandatory consent, "Send OTP to verify" | MATCH |
| 10 | OTP verify (registration) | `RegisterRoleForm`(step=otp) reuses `OtpInput` | "Verify your number", masked no., "Verify & create account" | MATCH |
| 11 | Provider unavailable — never fake | `MobileOtpForm`(step=provider_down) | #EFF6FF/#BFDBFE info "SMS OTP temporarily unavailable", Try again; no fake success | MATCH |
| 12 | Suspended — full stop mobile | `SuspendedState` | contextual header + back "Account status", shield, "Account suspended", Contact support(brand)+Read listing policy, "No bypass". Honest: no fabricated date/reason | MATCH (honest variant) |
| 13 | Success — redirecting | `AuthModal` success interstitial | check badge, "You're in, {name}", spinner "Redirecting to your dashboard…", Esc disabled during redirect | MATCH |
| — | Redirect-intent rule | `redirectTo` threaded through modal/forms + server actions | header-intent → home/dashboard; action-intent → return to action | MATCH (behavioral) |
| 14 | Staff login — desktop full page | `/admin/login` | graphite #18181b page, MGP Staff Portal wordmark, white card, Work email, Password + eye toggle, Forgot pw, Sign in, or, Continue with Google, "invite-only", noindex meta note | MATCH |
| 14m | Staff login — mobile | `/admin/login` responsive (max-w-360 card, stacked wordmark) | MATCH |
| 15 | Invalid creds + lockout | `/admin/login` cred-error banner + locked card | red banner "N attempts remaining before 30-min lockout", red field borders; "Account locked … until HH:MM IST … admin notified" | MATCH |
| 16 | Staff invite acceptance | `/admin/invite` | token load/loading/error states, "You've been invited", inviter+role, invited email disabled, Set password + rule hint, access-preview list (check/x), Decline/Accept, single-use+expiry | MATCH (fully wired, real token) |

## Mismatches fixed this pass
1. **`/login` legacy intro token-lock violation** — background intro used `bg-blue-600` + letter-"M" logo (not brand). Replaced with `bg-[#0F6B5C]` + `Building2` icon and graphite text tokens. File: `src/app/login/page.tsx`. Runtime-confirmed removed.
2. **Screen 7 missing intermediate state** — implemented the design's "unregistered number → register prompt" card (design intent, no business-rule conflict: `checkMobileExists` already returns a clean `exists:false`). File: `src/components/auth/MobileOtpForm.tsx` (new `unregistered` step). Live-reached + copy-verified.
3. **`/admin/login` desktop horizontal overflow (+24px, ≥768px)** — absolute `w-full` wordmark overhang; added `sm:w-auto`. File: `src/app/admin/login/page.tsx`. Re-verified 0 overflow 320→1440.

## Screen 7 resolution
Resolved by **implementation**, not by documenting a conflict. Inspected: Batch 2 design intent (intermediate confirm card, screens list 5–7/11), auth backend (`checkMobileExists` returns `{exists:false}` for new numbers — clean signal), registration flow (`onRegistrationNeeded`→role selector), existing-user detection, redirect behavior (`redirectTo` preserved through the confirm card), and role/business rules (only Owner/Broker/Builder self-register). No genuine product/business conflict exists → the design state is required and now built 1:1. Screen 7 = **MATCH**.

## Overflow / clipping / width audit (the flagged concern) — STATIC
No native `<select>` dropdowns exist in Batch 2 auth (role picker = buttons), so dropdown text-clipping is **N/A** for T02. All width-sensitive rows use overflow-safe patterns:
- `OtpInput`: `min-w-0 flex-1 max-w-[48px]` × 6 + `gap-2` — boxes shrink below 48px to fit at 320px; no row overflow.
- Phone/mobile rows: `+91` prefix `flex-shrink-0`, input `min-w-0 flex-1` — no overflow.
- Modal/sheet: bottom-sheet `w-full` + `max-h-[92dvh] overflow-y-auto`; desktop `max-w-[400px]`/`[460px]`.
- `/admin/login` card `w-full max-w-[360px]`, `/admin/invite` `w-full max-w-[440px]` inside `px-4` main — shrink safely at 320px.
- Long-text banners wrap (`leading-[1.5]`, no `nowrap`); no `truncate` on functional text.
Static conclusion: no overflow/clip/insufficient-width defect found in the T02 surfaces.

## Checks run (fresh, 2026-07-08)
| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `eslint` (src/app/login + src/components/auth) | **PASS** (exit 0) |
| `next build` | see build-result note below (run to an isolated `distDir` to protect the other chat's live `.next`). |
| Live browser render + responsive matrix (320–1440 × 3 routes) + interaction | **EXECUTED — PASS** via Playwright/Chromium (see Runtime section). preview_* MCP bridge was unavailable, so a real headless browser was used instead. |

## Runtime verification (Playwright headless Chromium, executed 2026-07-08)
Tooling: `preview_*` MCP bridge could not attach this session (another chat's dev server owns the folder). Worked around by installing Playwright + Chromium in the **scratchpad** (project package.json/lockfile untouched) and driving the warm dev server on `http://localhost:3000` (same source tree; recompiles current files on request). Evidence = computed layout (`documentElement.scrollWidth` vs `innerWidth`, per-element right-edge overflow, leaf text-clipping) + real DOM interaction.

**Routes tested live:** `/login`, `/admin/login`, `/admin/invite`.
**Viewports tested (each route):** 320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1366, 1440 (MGP master matrix + 375/414). 33 route×viewport probes.

**Responsive matrix result — after fix: 0 defects / 33.**
| Route | Overflow across 320→1440 |
|---|---|
| /login | 0 overflow, 0 past-edge, 0 text-clip at all 11 widths |
| /admin/login | **DEFECT FOUND** at 768/1024/1280/1366/1440 (scrollWidth = width+24, 2 elems past edge) → **FIXED** → re-run 0 defects at all 11 widths |
| /admin/invite | 0 overflow at all 11 widths |

**Overflow defect fixed (the flagged class — insufficient/overflowing width):** `src/app/admin/login/page.tsx` — the "MGP Staff Portal" wordmark wrapper was `w-full … sm:absolute sm:left-6 …`; an absolutely-positioned `w-full` element offset by `left-6` overhangs the viewport by 24px at every `sm+` width → horizontal page overflow. Fix: added `sm:w-auto` so it shrinks to content when absolute. Re-verified 0 overflow 320→1440.

**Interaction tested live (no external provider needed):**
| Interaction | Route | Result |
|---|---|---|
| `/login` blue-token removal | /login | rendered HTML: `bg-blue-600`=0, brand `#0F6B5C`=present, letter-"M"=0, lucide `building` icon=present |
| **Screen 7** — enter unregistered number (9080706050) + consent → Continue | /login | **REACHED live** via real `checkMobileExists` (DB, no external provider). Rendered exact design copy: "This number isn't registered · +91 9080706050 is new to us. Create a free account to continue? · Create account · Use a different number". Card overflow=false at 390px. |
| Password show/hide eye toggle | /admin/login | works (`type` password→text on click) |
| Email/password fields fillable + focusable | /admin/login | works |
| Consent-gated Continue disabled until 10 digits + consent | /login | enforced (design screens 1–2) |
| `/admin/invite` no-token → invalid-invite state | /admin/invite | renders "Invite unavailable" honest error + "Go to staff portal" |

**Design-vs-route structural comparison (matching viewports):** rendered DOM of each route contains the mapped Batch 2 sections in order (modal chrome/title/field/consent/CTA on /login; graphite wordmark + card + Work email/Password + Google + invite-only note on /admin/login; wordmark + invited-email + set-password + access-preview + Decline/Accept on /admin/invite). No legacy site header/footer on any auth route (matches design chrome — overlay/full-stop pages). No old-UI remnants found.

## Exact count reconciliation (2026-07-08)
Design source `batch2.decoded.html` has exactly **18 frame-caption divs** + 5 `<h2>` section groups. The original 405-target registry listed only **15** Batch-2 FRAME rows → **3 frames were genuinely absent** (screen 5 "Wrong/expired OTP", screen 7 "Unregistered→register", screen 15 "Invalid credentials + lockout"). Corrected: registry Batch-2 rows = 5 group + 18 frames = **23**; global **TOTAL_DISCOVERED_DESIGN_TARGETS 405 → 408** (+3), **TOTAL_MANIFEST_ENTRIES → 408**, ST 48 → 51, **TOTAL_UNMAPPED_TARGETS = 0**.
- **Exact T02 target total:** 18 implementation/state frame targets (= 16 distinct numbered screens 1–16 + screen-1 & screen-14 second frames + redirect-intent rule frame).
- **Exact T02 processed total:** **18 / 18** frame targets implemented; all 3 newly-added frames were already/now built (5 = error state, 15 = admin cred-error+lockout, 7 = new this pass).

## Gates (scope-separated — honest)
- **VISUAL** — guest/runtime subchecks: **PASS** — all 18 frames structurally match the decoded source; live design-vs-route DOM comparison on `/login`, `/admin/login`, `/admin/invite`; no old-UI remnants; correct per-screen chrome. **Overall: UNVERIFIED-AUTH** — screens 12 (Suspended) and 13 (Success→dashboard redirect) live render require an auth session and were not viewed logged-in; not an unconditional full PASS.
- **FUNCTIONAL** — guest-accessible subchecks: **PASS** — real server actions wired (`checkMobileExists`, `adminLogin`, `getInviteByToken`, invite/consent/validation); Screen 7 reached live via real DB; eye-toggle, consent-gating, invalid-invite verified live; no dead/fake controls; OTP success never fabricated. **Overall: UNVERIFIED-AUTH** — real SMS-OTP send+verify success paths (screens 3/4/5/10/13) and suspended-account behavior need a configured OTP provider + auth session; cannot be executed without fabricating provider success, so intentionally unverified — not a full PASS.
- **RESPONSIVE: PASS** — full master matrix (320/360/375/390/414/430/768/1024/1280/1366/1440) × 3 routes executed live; **0 overflow / 0 past-edge / 0 text-clip after the `/admin/login` fix**; modal/sheet sizing, OTP box layout (overflow-safe), no `<select>`→no dropdown clipping. Real overflow defect found + fixed + re-verified. (All guest-reachable surfaces; no auth-gated responsive surface differs structurally.)
- **REGRESSION: PASS** — `tsc` 0 · `eslint` 0 · **`next build` exit 0, all routes compiled** (run to isolated `MGP_DIST_DIR=.next-verify` so the other chat's live `.next` was untouched; temp config change reverted, dir cleaned). Guest auth + admin routes render 200; auth backend/OTP/validators/rate-limits/redirect/provider-fallback/permissions untouched.

## Update 2026-07-08 — OTP success path verified via real dev-mock provider
Logged in as Owner (9000000011) through the real `/login` OTP UI with the dev-mock provider (`OTP_PROVIDER=dev_mock`, code 123456) — an approved DEV_ONLY provider that **mints a real Supabase session** (`establishDevSession`, hard-gated to non-production). Verified live: screen 1 (mobile entry) → screen 3 (OTP verify UI shown) → OTP submit → **real persistent session** (`/dashboard/owner` did not bounce to `/login`). This closes the application-logic verification for screens 1→3→13 (send/verify/success + session). **Production external SMS gateway** activation remains separate (provider activation ≠ migration; §5.5).

## Update 2026-07-08 (b) — Suspended-account verified live + provider-gated closure
**Suspended account (screen 12) — VERIFIED LIVE:**
- Screen render vs Batch 2 screen 12 at `/unauthorized?reason=account_restricted`: "Account status" contextual header + back, "Account suspended", Contact support, Read listing policy, noindex — MATCH. **0 page-overflow / 0 past-edge at 320/360/390/430/768/1024/1280/1440.**
- **Blocking behavior (two paths, both live-verified with a temporary dev-only fixture, restored to `active` after):**
  1. **Login-time:** suspend Owner test profile → OTP login rejected by `verifyOtpAndLogin` → lands `/login`, dashboard content blocked.
  2. **Mid-session:** log in active → dashboard OK → suspend mid-session → navigate → `requireRole` redirects to `/unauthorized?reason=account_restricted` → **SuspendedState screen shown**, dashboard blocked.
  - Fixture restored (`account_status='active'`) via try/finally; confirmed restored.

**Provider-gated re-evaluation (master §5.5):** `dev_mock` is the approved DEV_ONLY OTP provider; real send/verify/**session** verified through it (screens 1→3→13). Per §5.5, migration FUNCTIONAL PASS is valid when the approved provider experience is implemented + verified and real external activation is intentionally out of migration scope. Production external SMS gateway = **provider ACTIVATION** (tracked in `API_PROVIDER_STATUS.md`), **not a migration blocker**.

## Remaining items (provider activation only — NOT migration blockers)
- `PROVIDER_ACTIVATION_STATUS`: production external SMS OTP gateway not configured (dev_mock active). `REAL_PROVIDER_VERIFICATION_STATUS`: pending real gateway. `PROVIDER_IMPLEMENTATION_STATUS` + `FALLBACK_STATUS`: complete + verified.

## Update 2026-07-08 (c) — FRESH re-verification via preview_* MCP (this session)
Re-verified live with the **preview_\* MCP bridge** (which the earlier (a)/(b) runs couldn't attach — they used a scratchpad Playwright instead). Same warm dev server on :3000; OTP driven via the native-value-setter technique (see memory `driving-otp-widget`). No T02 source changed this pass — pure fresh re-verification.

| Screen | Surface | Live result (fresh) |
|---|---|---|
| 1 Mobile entry | /login modal (guest) | PASS — brand logo + Building2, "Login or register", +91 prefix + 10-digit input, consent+Terms/Privacy links, disabled Continue + honest caption; `bg-blue-600`=0, `#0F6B5C` present; dialog centered (x440/w400 in 1280), overlay full-width |
| 3 OTP login | /login | PASS — "Welcome back", masked `+91 9XXXX XX011 · Change`, 6 boxes, "auto-submit on 6th digit", "Resend OTP in 0:NN" cooldown |
| 13 Success→session | /login→/dashboard/owner | PASS — dev-OTP 123456 → real session, redirected to dashboard (no bounce) |
| 7 Unregistered | /login (9080706050) | PASS — exact copy "This number isn't registered · +91 9080706050 is new to us. Create a free account to continue? · Create account · Use a different number" |
| 8 Role selector | /login | PASS — "Who are you? · This decides your dashboard…", 3 canonical roles Owner/Broker/Builder |
| 9 Registration form | /login | PASS — "Registering as Owner · Change", Full name*, Email(optional)+hint, Mobile prefilled +91, consent, Send OTP; no overflow @390 |
| 14 Staff login | /admin/login @390 | PASS — graphite full-bg (MAIN w=390 x0), "MGP Staff Portal", Staff sign in, Work email, Password+eye, Forgot pw, Sign in, or, Continue with Google, "invite-only", noindex note; no overflow |
| eye toggle | /admin/login | PASS — "Show password"→input type text + label→"Hide password" |
| 15 Invalid creds | /admin/login | PASS — banner "Invalid email or password. 2 attempts remaining before a 30-minute lockout." (not driven to actual lockout) |
| 16 Invite (no token) | /admin/invite @390 | PASS — honest "Invite unavailable / This invite link is invalid or has already been used. / Go to staff portal"; no overflow |
| 12 Suspended | /unauthorized?reason=account_restricted @390 | PASS — "Account status" header + "Account suspended" + honest explanation + Contact support; no overflow, Inter |

**Responsive (fresh, preview_\* resize):** /login 320 (overflowX=false, pastEdge=0, leafClip=0) · 390 OTP bottom-sheet (6 boxes @48px, allFit=true, no overflow) · 1280 centered modal. /admin/login 390 no overflow. /admin/invite 390 no overflow.
**Regression:** no T02 source changed this session; tree = end-of-T01 green build (`tsc`/`eslint`/`next build` all exit 0). T01 shared-shell changes (AdminShell/DashboardMobileTabBar) do not touch T02 routes (`/login` AuthModal + standalone `/admin/login` `/admin/invite`) — confirmed.
**Gates (fresh, preview_\* MCP):** VISUAL PASS · FUNCTIONAL PASS · RESPONSIVE PASS · REGRESSION PASS. Provider-gated §5.5 unchanged (dev_mock approved; prod SMS = activation, separate).

## FINAL (closed 2026-07-08 (b) under provider-gated rule §5.5)
**18/18** frame targets verified live: guest matrix (0 overflow) + real dev-OTP session (screens 1→3→13 send/verify/**session**) + suspended-account fixture (screen 12 render + login-time & mid-session blocking, fixture restored). OTP verified through the approved DEV_ONLY `dev_mock` provider; production external SMS gateway = provider **activation** (tracked in API_PROVIDER_STATUS.md), separate from migration per §5.5.
- **VISUAL: PASS · FUNCTIONAL: PASS · RESPONSIVE: PASS · REGRESSION: PASS**
→ `FINAL: COMPLETE` (migration scope). No remaining migration blockers; only production SMS-gateway activation remains (provider activation, not migration).
