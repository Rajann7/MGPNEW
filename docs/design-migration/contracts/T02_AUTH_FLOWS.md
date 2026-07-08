# Screen Contract — T02 · Auth Flows (Batch 2)

**Design source:** `batch 2- Auth Flows (Standalone).html` → decoded `scratchpad/design-extract/batch2.decoded.html` = **18 frame targets** (16 distinct numbered screens 1–16) + 5 group headers = 23 registry rows. **Processed 18/18.** **Status:** fresh-audited + RUNTIME-VERIFIED 2026-07-08 (headless Chromium) and **RE-VERIFIED 2026-07-08 (c) via preview_\* MCP** (screens 1/3/7/8/9/12/13/14/15/16 + eye-toggle driven live; /login 320+390 bottom-sheet + /admin/login + /admin/invite responsive clean; no T02 source changed). OTP send/verify/session verified live via approved DEV_ONLY dev_mock; suspended screen 12 verified live. Production external SMS = provider activation (§5.5, separate). **VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS → FINAL: COMPLETE** (migration scope).

## Canonical targets & routes/components
| Target | Route / Component |
|---|---|
| Consumer auth overlay (1–13) | `/login` route + `AuthModal` overlay (used site-wide via `AuthModalProvider`/`AuthTrigger`) → `MobileOtpForm`, `RegisterRoleForm`, `RoleSelector`, `OtpInput` |
| Suspended full-stop (12) | `SuspendedState` |
| Staff login + lockout (14–15) | `/admin/login` |
| Staff invite acceptance (16) | `/admin/invite` (+ `lib/actions/staff-invite.ts`) |

## Exact visual structure (top→bottom, per screen) — see T02_VERIFY.md audit table
Modal/sheet: brand logo + (back)/close → title+subtitle → field(s) → consent → primary CTA → helper/resend. Staff pages: graphite chrome + wordmark → white card (title → banner? → fields → Sign in → or → Google → invite-only note) → noindex footer.

## Legacy UI removed / fixes
- `/login` background intro `bg-blue-600` + "M" letter logo → brand `#0F6B5C` + `Building2` (2026-07-08). No other legacy auth chrome.
- `/admin/login` absolute `w-full` wordmark → `sm:w-auto` (fixed +24px desktop overflow).

## Screen 7 (unregistered → register prompt) — RESOLVED by implementation
Design intent = intermediate confirm card, not skip. No business-rule conflict (`checkMobileExists`→`exists:false` is a clean signal). Built in `MobileOtpForm` as `unregistered` step: "This number isn't registered" + "+91 {mobile} is new to us…" + **Create account**→registration + **Use a different number**→reset. `redirectTo` preserved through the card. Live-reached + copy-verified.

## Functionality preserved (do NOT change)
Supabase auth server actions (`checkMobileExists`, `requestOtp`, `verifyOtpAndLogin`, `verifyOtpAndRegister`, `adminLogin`), OTP mask + attempt/lockout/cooldown logic, Zod validators (`lib/validators/auth.ts`), rate limits, `redirectTo` intent threading, provider `OTP_PROVIDER_SETUP_REQUIRED` honest fallback, staff invite token flow + permission preview, RLS/role guards.

## New functionality
None net-new this pass (screens already implemented). Optional: screen-7 intermediate "unregistered number" confirm card (currently skipped → PARTIAL).

## Data completeness
Role list = full canonical set (Owner/Broker/Builder — public-registerable roles only, per §13). Invite permission preview sourced from real invite record. No sample truncation.

## Interaction matrix — verified at code level (live UNVERIFIED)
All CTAs/inputs/toggles/checkboxes/resend/back/close/eye-toggle wired to real state/actions; no dead or fake-success controls; OTP success never fabricated (provider-gated → honest "temporarily unavailable").

## Responsive contract
Desktop = centered modal (max-w 400/460) / graphite full page. Mobile = bottom sheet (rounded-t-20, drag handle, max-h-92dvh scroll) / stacked staff card. Overflow-safe: OTP boxes `min-w-0 flex-1 max-w-[48px]`, phone prefix `flex-shrink-0` + input `min-w-0 flex-1`, cards `w-full max-w-[…]` inside `px-4`. No `<select>` → no dropdown clipping.
