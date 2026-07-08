# API_PROVIDER_STATUS.md

# My Gujarat Property — API Provider Status, Setup, Verification And Fallback Rules

This file tracks every external provider, API mode, setup state, verification result, production readiness status, fallback behavior and provider-related risk for **My Gujarat Property**.

Claude must update this file whenever any provider/API/env/config/payment/storage/communication/map/analytics/monitoring/cron status changes.

No fake provider success is allowed.

If a provider is not configured, the feature must show `SETUP_REQUIRED`, `BLOCKED`, `DISABLED_BY_FLAG` or safe fallback.

---

## 1. Purpose

This file tracks:

* Supabase Auth
* Supabase PostgreSQL
* Supabase RLS
* Supabase Server Client
* Supabase Storage if used
* OTP provider
* SMS provider
* Email provider
* WhatsApp free mode
* WhatsApp Business Cloud API
* Razorpay payment provider
* Razorpay webhooks
* Google Maps Embed mode
* Google Maps API / Places mode
* Cloudflare R2 storage
* Cloudflare CDN
* Cloudflare Turnstile
* Analytics provider
* Error tracking provider
* Monitoring provider
* Cron/background job provider
* Image/video/PDF processing provider or queue
* Malware/file scan provider if used
* PDF generation provider/library
* Email invoice delivery provider
* Push notification provider if enabled
* GeoIP/city detection provider if enabled
* Search Console/SEO provider if enabled

This file ensures provider-backed features are never marked complete unless the real provider state is known, tested and documented.

---

## 2. Mandatory Provider Rule

Every provider-backed feature must have one of these:

1. real working provider configuration
2. setup-required state
3. disabled feature flag
4. documented fallback mode
5. blocked status with exact reason

Never show:

* fake OTP sent
* fake SMS sent
* fake WhatsApp sent
* fake email sent
* fake payment success
* fake invoice sent
* fake upload success
* fake CDN active state
* fake map loaded state
* fake analytics count
* fake provider health active
* fake notification delivered
* fake webhook verified
* fake verified badge
* fake RERA/provider status
* fake active plan due to failed payment

---

## 3. Provider Status Values

Use only these values:

| Status                  | Meaning                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `NOT_STARTED`           | Provider has not been configured or planned in code yet                                            |
| `SETUP_REQUIRED`        | Provider feature exists or is planned but real credentials/config are missing                      |
| `CONFIGURED_NOT_TESTED` | Env/config exists but real verification has not passed                                             |
| `TEST_MODE_ONLY`        | Provider is configured only in test/sandbox/dev mode                                               |
| `LIVE_READY`            | Provider is configured with production/live credentials and tested                                 |
| `ACTIVE`                | Provider is active and used by the application                                                     |
| `DISABLED_BY_FLAG`      | Provider-backed feature is disabled by feature flag                                                |
| `FALLBACK_ACTIVE`       | Provider is unavailable and fallback is active                                                     |
| `BLOCKED`               | Provider cannot be used due to missing decision, failed setup, missing approval or technical issue |
| `FAILED`                | Provider was configured/tested but failed                                                          |
| `DEGRADED`              | Provider partially works but has limitations or intermittent issue                                 |
| `NEEDS_REVIEW`          | Provider requires admin/security/legal/human review                                                |
| `DEPRECATED`            | Provider is no longer preferred and should be replaced                                             |
| `REMOVED`               | Provider integration was removed intentionally and documented                                      |

---

## 4. Provider Verification Values

Use only these values:

| Verification             | Meaning                                                |
| ------------------------ | ------------------------------------------------------ |
| `PASS`                   | Provider verified successfully                         |
| `PARTIAL`                | Provider partially verified                            |
| `FAIL`                   | Provider verification failed                           |
| `BLOCKED`                | Verification could not run                             |
| `NOT_RUN`                | Verification not run yet                               |
| `NOT_APPLICABLE`         | Provider not relevant for this phase                   |
| `NEEDS_PROVIDER_CHECK`   | Real provider verification required                    |
| `NEEDS_SECURITY_CHECK`   | Secrets/webhook/access/logging security check required |
| `NEEDS_PRODUCTION_CHECK` | Production/live mode verification required             |
| `NEEDS_LEGAL_REVIEW`     | Legal/compliance review required                       |
| `NEEDS_COST_REVIEW`      | Pricing/quota/cost review required                     |

---

## PHASE PROVIDER STATUS LOG

---

### Prompt 01 — Project Setup Baseline [2026-06-30] — UPDATED 2026-06-30

**Owner decision:** OTP, SMS, Email, WhatsApp, Razorpay, R2/CDN, Maps, Turnstile, Analytics and all third-party providers are intentionally deferred. They will be configured and integrated after the full project build is complete. In dev mode, all provider-backed features show `DEV_ONLY` or `NOT_STARTED`. No fake provider success is used.

| Provider | Status | Phase | Verification | Notes |
|----------|--------|-------|--------------|-------|
| Supabase Auth | `DEV_ONLY` | Prompt 02 | `NOT_RUN` | Will implement in Prompt 02. Credentials in .env.local (not committed). |
| Supabase PostgreSQL | `DEV_ONLY` | Prompt 02 | `NOT_RUN` | Schema starts in Prompt 02. |
| Supabase RLS | `NOT_STARTED` | Prompt 02 | `NOT_RUN` | RLS implementation starts in Prompt 02. |
| Supabase SSR Client | `DEV_ONLY` | Prompt 01 | `NOT_RUN` | Helpers created. Works once .env.local is configured. |
| OTP Provider | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. Dev uses Supabase built-in OTP. |
| SMS Provider | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. |
| Email Provider | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. |
| WhatsApp Free Link | `NOT_STARTED` | Post-launch | `NOT_RUN` | Planned for Prompt 12 UI; real API after launch. |
| WhatsApp Business API | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. |
| Razorpay | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. Test mode used during Prompt 09. |
| Google Maps | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real API key added after project completion. Embed fallback used in dev. |
| Cloudflare R2 | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. Local/placeholder in dev. |
| Cloudflare CDN | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real credentials added after project completion. |
| Cloudflare Turnstile | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real site key added after project completion. Disabled in dev by feature flag. |
| Analytics | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real provider added after project completion. |
| Error Tracking | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real DSN added after project completion. |
| Cron / Background Jobs | `NOT_STARTED` | Prompt 14 | `NOT_RUN` | Planned for Prompt 14. |
| PDF Generation | `NOT_STARTED` | Prompt 09 | `NOT_RUN` | Planned for billing phase. |
| Push Notifications | `DEV_ONLY` | Post-launch | `NOT_RUN` | Real keys added after project completion. |

**Verification [2026-06-30]:** `PASS` — all provider statuses reviewed. No provider marked ACTIVE without credentials. DEV_ONLY decision confirmed by owner. No fake provider success anywhere in source code.

**Standing rule:** No provider may be marked `ACTIVE` or `LIVE_READY` without real credentials in `.env.local` and a documented verified test. `DEV_ONLY` means: feature UI is built, provider slot is ready, real credentials will be dropped in post-launch. No fake success is ever shown to users — provider-absent states show `SETUP_REQUIRED` UI message.

---

### Prompt 02 — Auth, Roles And RLS Foundation [2026-06-30]

| Provider | Status | Prompt | Verification | Notes |
|----------|--------|--------|--------------|-------|
| Supabase Auth | `CONFIGURED_NOT_TESTED` | Prompt 02 | `NOT_RUN` | .env.local has real URL+anon key. Phone OTP requires Twilio. Email auth (admin) built-in to Supabase. |
| Supabase PostgreSQL | `CONFIGURED_NOT_TESTED` | Prompt 02 | `PARTIAL` | Migration applied via Management API. 10 tables + 3 views + 16 RLS policies confirmed. Full app test pending. |
| Supabase RLS | `CONFIGURED_NOT_TESTED` | Prompt 02 | `PARTIAL` | RLS enabled + policies applied and verified via pg_policies query. App-level RLS test pending verification prompt. |
| OTP Provider | `DEV_ONLY` | Post-launch | `VERIFIED (dev_mock)` | OTP_PROVIDER=dev_mock. Send/verify/**session** verified live end-to-end 2026-07-08 (T02 migration, real dev-OTP login mints real Supabase session). Production external SMS gateway (Twilio/MSG91) = **activation pending, separate from migration** (§5.5). `REAL_PROVIDER_VERIFICATION_STATUS=NOT_RUN` until real gateway configured. |
| Admin Auth (email/password) | `CONFIGURED_NOT_TESTED` | Prompt 02 | `NOT_RUN` | Supabase built-in email/password auth used. Requires first staff account created manually. |
| Email (invites) | `SETUP_REQUIRED` | Post-launch | `NOT_RUN` | Staff invite email not implemented (Prompt 07). |
| All other providers | `DEV_ONLY` | Post-launch | `NOT_RUN` | No change from Prompt 01. |

**Note:** `dev_mock` OTP mode is NEVER to be used in production. It is blocked by `process.env.NODE_ENV === 'production'` check in `src/lib/auth/actions.ts`. Production OTP requires real provider credentials.

---

### Prompt 03 — Public UI: Home, Header, Footer, Hero [2026-06-30]

| Provider | Status | Prompt | Verification | Notes |
|----------|--------|--------|--------------|-------|
| Supabase Auth | `CONFIGURED_NOT_TESTED` | Prompt 02 | `PARTIAL` | No change from Prompt 02. Public UI does not call auth directly — header reads session via server profile. |
| Supabase PostgreSQL | `CONFIGURED_NOT_TESTED` | Prompt 02 | `PARTIAL` | No new tables or migrations in Prompt 03. Public UI does not query DB (profile fetched via existing getCurrentProfile). |
| Supabase RLS | `CONFIGURED_NOT_TESTED` | Prompt 02 | `PARTIAL` | No RLS changes in Prompt 03. |
| Location / City data | `STATIC_LIST` | Prompt 03 | `PASS` | 20 Gujarat cities in static array inside CityProvider. No DB / API call needed for Phase 03. |
| Search (form only) | `FRONTEND_ONLY` | Prompt 03 | `PASS` | Search form routes to /search with URLSearchParams. No backend search API yet. |
| Google Maps | `NOT_STARTED` | Prompt 11+ | `NOT_RUN` | No map shown in homepage in this phase. |
| Notifications badge | `NOT_STARTED` | Prompt 10+ | `NOT_RUN` | Not shown in public header yet. |
| OTP Provider | `DEV_ONLY` | Post-launch | `NOT_RUN` | No change from Prompt 02. |
| All other providers | `DEV_ONLY` | Post-launch | `NOT_RUN` | No change from Prompt 02. |

**Note:** Prompt 03 is a pure public UI phase. No new provider integrations. No new env variables added. No fake provider success introduced. CityProvider uses static list — correct for this phase.

---

### Prompt 07 — Admin, Staff And Super Admin System [2026-07-01]

| Provider | Status | Prompt | Verification | Notes |
|----------|--------|--------|--------------|-------|
| Admin Auth (email/password) | `CONFIGURED_TESTED` | Prompt 02, re-verified Prompt 07 | `PASS` | Live-verified: real Super Admin login via `/admin/login` with a real Supabase Auth user + `staff_profiles` row. No mobile OTP, no public registration. |
| Email (staff invites) | `SETUP_REQUIRED` | Prompt 07 | `PASS` (honesty check) | `inviteStaff()` creates a real DB invite row but honestly reports "Email provider is not configured (SETUP_REQUIRED) — share the invite link manually" instead of faking a sent email. `EMAIL_PROVIDER` env var still empty. |
| Admin/Staff provider status page | `NEW — CODE_ONLY` | Prompt 07 | `PASS` | `/admin/providers` (Super Admin / `can_manage_provider` only) lists env-var *presence* only (never values) for Supabase, OTP, SMS, Email, WhatsApp, Razorpay, Google Maps, Cloudflare R2/CDN, Turnstile, Analytics, Error Tracking, Web Push, Cron — never marks any provider "Active" without a real health check (none exists yet, so all show "CONFIGURED (untested)" or `SETUP_REQUIRED`). |
| Razorpay / Billing | `SETUP_REQUIRED` | Prompt 09 (unchanged) | `NOT_RUN` | `/admin/billing` is an honest placeholder this phase — no fake payments/invoices/subscriptions. |
| Support/Reports/Fraud provider | `NOT_STARTED` | Later phase | `NOT_RUN` | No ticket/report table exists yet; `/admin/support` shows honest `SETUP_REQUIRED`/`coming_soon`. |
| All other providers | `DEV_ONLY`/`SETUP_REQUIRED` | Post-launch | `NOT_RUN` | No change from Prompt 02/03. |

**Note:** Prompt 07 introduces no new external provider dependencies. The only provider-status change is that Admin Auth (email/password) has now been live-tested end-to-end (not just configured), and the staff-invite email gap is now honestly surfaced in the admin UI itself rather than only in this doc.

---

### Prompt 08 — Leads, CRM, Requirements, Proposals And Messages [2026-07-01]

| Provider | Status | Prompt | Verification | Notes |
|----------|--------|--------|--------------|-------|
| In-app notifications (DB-backed) | `CONFIGURED_TESTED` | Prompt 08 | `PASS` | Live-verified: real `notifications` table, real unread badge (2), real mark-read. This is the in-app foundation only — no external delivery. |
| Notification delivery (email/SMS/WhatsApp/push) | `NOT_STARTED` | Later phase (Prompt 12) | `NOT_RUN` | No provider wired — notification *events* are real and DB-backed, but nothing is sent externally. Honestly not faked. |
| Realtime messaging | `NOT_STARTED` | Later phase | `NOT_RUN` | Messages are DB-backed with client-side `router.refresh()`/re-fetch on send — no websocket/realtime subscription. No fake "online"/"typing" indicators. |
| Media/R2 (message attachments) | `NOT_STARTED` | Prompt 10/12 | `NOT_RUN` | No attachment table or upload path created this phase — attachments are simply absent from the UI, not faked. |
| Calendar/reminder provider (site visits) | `NOT_STARTED` | Later phase | `NOT_RUN` | Site visit scheduling is DB-backed only; no calendar invite/reminder sent. |
| Supabase Database/RLS | `CONFIGURED_TESTED` | Prompt 08 | `PASS` | Migration `20260701160000_leads_crm_requirements_proposals_messages.sql` applied; RLS verified via 15-table anonymous-denial probe + wrong-user lead-access probe. |

**Note:** Prompt 08 introduces no new external provider dependencies. All communication features (leads, messages, notifications) are real and DB-backed; only *external* delivery/realtime/media remain `NOT_STARTED`, honestly reported.

---

## 5. Provider Mode Values

Use only these provider mode values:

| Mode              | Meaning                                                 |
| ----------------- | ------------------------------------------------------- |
| `NONE`            | No provider selected                                    |
| `DEV_ONLY`        | Development-only mock or test behavior                  |
| `SANDBOX`         | Provider sandbox/test environment                       |
| `LIVE`            | Real production provider mode                           |
| `FREE_LINK`       | Provider-free public URL mode, such as WhatsApp `wa.me` |
| `EMBED_ONLY`      | Embedded provider mode, such as Google Maps Embed       |
| `API`             | Full provider API integration                           |
| `MANUAL`          | Manual admin process                                    |
| `DISABLED`        | Feature disabled                                        |
| `FEATURE_FLAGGED` | Controlled by feature flag                              |
| `FALLBACK`        | Fallback mode active                                    |

---

## 6. Provider Environment Safety Rules

Claude must follow these rules for all provider configuration:

1. Never hardcode secrets.
2. Never paste real secrets in docs.
3. Never expose service role keys.
4. Never expose provider API secrets in client code.
5. Never expose `.env` values in chat, docs, logs or screenshots.
6. Update `.env.example` whenever any environment variable is added, changed or removed.
7. `.env.example` must show variable names only, not real values.
8. Client-exposed public keys must be clearly named and intentionally safe.
9. Server-only secrets must be used only in trusted server-side code.
10. Provider test mode must not be active in production.
11. Dev/mock providers must not be active in production.
12. Production should fail safe if required provider secrets are missing.
13. Missing provider should show `SETUP_REQUIRED` or safe fallback, not fake success.
14. Logs must not include API keys, tokens, OTPs, payment secrets, webhook payload secrets, private URLs or full request payloads.
15. Provider webhook signatures must be verified where supported.
16. Provider retries must be idempotent.
17. Provider failures must not crash the website.
18. Provider failures must not expose raw errors to users.
19. Provider changes must be audit logged.
20. Provider settings must be Super Admin controlled where applicable.

---

## 7. Required Provider Entry Format

Every provider must use this exact structure:

```md
## PROVIDER-ID — Provider Name

### Current Status
- Status:
- Mode:
- Environment:
- Owner:
- Feature flag:
- Last verified:
- Verification result:

### Purpose
- Used for:
- Affected modules:
- Affected roles:

### Provider Options
- Preferred provider:
- Alternative providers:
- Current selected provider:

### Required Environment Variables
| Variable | Client/Server | Required | Status | Notes |
|---|---|---|---|---|

### Public/Private Data Rules
- Sends user personal data: Yes/No
- Sends phone number: Yes/No
- Sends email: Yes/No
- Sends property/project data: Yes/No
- Sends payment data: Yes/No
- Sends document/media data: Yes/No
- Sensitive data handling:

### Setup Steps
1.
2.
3.

### Verification Checklist
| Check | Result | Notes |
|---|---|---|

### Failure Behavior
- User-facing fallback:
- Admin-facing error:
- Retry behavior:
- Notification behavior:
- Feature state if failed:

### Security Requirements
- Secret handling:
- Webhook signature:
- Rate limit:
- Audit log:
- Log redaction:
- Server/client boundary:

### Production Readiness
- Live key configured:
- Test mode disabled:
- Mock mode disabled:
- Error fallback tested:
- Cost/quota reviewed:
- Legal/privacy reviewed:
- Final status:

### Related Docs
- `brain.md`
- `FEATURE_REGISTRY.md`
- `CHANGELOG.md`
- `BUGS_AND_FIXES.md`
- `MANUAL_VERIFICATION.md`
- relevant detailed docs

### Pending Issues
-
```

---

## 8. Current Provider Summary

_Reconciled 2026-07-04 (Prompt 01 re-baseline): this intro was stale. Real state — Prompts 01–08 built & verified; Prompt 09 billing foundation built with Razorpay in TEST mode. All other external providers remain DEV_ONLY / SETUP_REQUIRED (deferred by owner until post-build). The per-phase provider logs above (Prompt 01–08) are the authoritative record. No provider is ACTIVE without a real verified test._

| Provider Area    | Provider                                               | Current Status             | Mode                 | Verification           | Production Ready |
| ---------------- | ------------------------------------------------------ | -------------------------- | -------------------- | ---------------------- | ---------------- |
| Auth             | Supabase Auth                                          | `NOT_STARTED`              | `NONE`               | `NOT_RUN`              | No               |
| Database         | Supabase PostgreSQL                                    | `NOT_STARTED`              | `NONE`               | `NOT_RUN`              | No               |
| RLS              | Supabase RLS                                           | `NOT_STARTED`              | `NONE`               | `NOT_RUN`              | No               |
| Server DB access | Supabase Server Client                                 | `NOT_STARTED`              | `NONE`               | `NOT_RUN`              | No               |
| OTP              | MSG91/Fast2SMS/Twilio/Textlocal or selected provider   | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| SMS              | MSG91/Fast2SMS/Twilio/Textlocal or selected provider   | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Email            | Resend/SendGrid/SMTP or selected provider              | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| WhatsApp Free    | `wa.me` links                                          | `SETUP_REQUIRED`           | `FREE_LINK` planned  | `NEEDS_PROVIDER_CHECK` | No               |
| WhatsApp API     | WhatsApp Business Cloud API                            | `SETUP_REQUIRED`           | `API` planned        | `NEEDS_PROVIDER_CHECK` | No               |
| Payment          | Razorpay                                               | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Maps Embed       | Google Maps Embed                                      | `SETUP_REQUIRED`           | `EMBED_ONLY` planned | `NEEDS_PROVIDER_CHECK` | No               |
| Maps API         | Google Maps API / Places                               | `SETUP_REQUIRED`           | `API` planned        | `NEEDS_PROVIDER_CHECK` | No               |
| Storage          | Cloudflare R2                                          | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| CDN              | Cloudflare CDN                                         | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Bot protection   | Cloudflare Turnstile                                   | `DISABLED_BY_FLAG` planned | `FEATURE_FLAGGED`    | `NEEDS_PROVIDER_CHECK` | No               |
| Analytics        | GA/Plausible/Cloudflare Analytics or selected provider | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Error tracking   | Sentry/LogRocket or selected provider                  | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Cron             | Supabase pg_cron / hosting cron / queue                | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| File scan        | Malware/file scan provider or internal scanner         | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Image processing | Sharp/Cloudflare Images/custom worker or queue         | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| PDF generation   | Server library/provider                                | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| Web push         | Browser Web Push                                       | `DEFERRED_TRACKED`         | `NONE`               | `NOT_RUN`              | No               |
| GeoIP            | Cloudflare/IP provider/manual city fallback            | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |
| SEO integrations | Google Search Console                                  | `SETUP_REQUIRED`           | `NONE`               | `NEEDS_PROVIDER_CHECK` | No               |

---

# 9. Supabase Providers

## API-001 — Supabase Auth

### Current Status

* Status: `NOT_STARTED`
* Mode: `NONE`
* Environment: Not configured in implementation yet
* Owner: Super Admin / System
* Feature flag: No
* Last verified: Not verified
* Verification result: `NOT_RUN`

### Purpose

* Public mobile OTP login/register
* Owner/Broker/Builder user authentication
* Admin/staff email/Google authentication
* Session handling
* Logout
* Protected route session checks

### Provider Options

* Preferred provider: Supabase Auth
* Alternative providers: None currently approved
* Current selected provider: Supabase Auth

### Required Environment Variables

| Variable                        | Client/Server      | Required    | Status        | Notes                                 |
| ------------------------------- | ------------------ | ----------- | ------------- | ------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Client-safe public | Yes         | `NOT_STARTED` | Public project URL only               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-safe public | Yes         | `NOT_STARTED` | Public anon key; must rely on RLS     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only        | Conditional | `NOT_STARTED` | Never expose to browser/client        |
| `SUPABASE_JWT_SECRET`           | Server-only        | Conditional | `NOT_STARTED` | Only if backend verification needs it |

### Public/Private Data Rules

* Sends user personal data: Yes
* Sends phone number: Yes for OTP/auth
* Sends email: Yes for email/admin auth
* Sends property/project data: No direct requirement except profile/session usage
* Sends payment data: No
* Sends document/media data: No
* Sensitive data handling: Auth data must be protected by RLS and server-side authorization.

### Setup Steps

1. Create/configure Supabase project.
2. Configure auth providers.
3. Configure OTP/email settings.
4. Configure public environment variables.
5. Keep service role server-only.
6. Configure callback URLs.
7. Configure admin/staff separate login rules in app.
8. Test public auth and admin/staff auth separately.

### Verification Checklist

| Check                                     | Result    | Notes                           |
| ----------------------------------------- | --------- | ------------------------------- |
| Public mobile OTP auth configured         | `NOT_RUN` | Provider setup pending          |
| Register role selector works with Auth    | `NOT_RUN` | Implementation pending          |
| Logged-in session persists                | `NOT_RUN` | Implementation pending          |
| Logout works                              | `NOT_RUN` | Implementation pending          |
| Admin/staff public login blocked          | `NOT_RUN` | Implementation pending          |
| Staff/admin email/Google login configured | `NOT_RUN` | Provider setup pending          |
| Service role not exposed                  | `NOT_RUN` | Security implementation pending |
| Auth errors safe                          | `NOT_RUN` | Implementation pending          |

### Failure Behavior

* User-facing fallback: show auth unavailable or setup-required if OTP provider missing.
* Admin-facing error: show provider status without exposing secrets.
* Retry behavior: safe retry with rate limits.
* Notification behavior: suspicious auth notifications only if notification provider configured; otherwise in-app/setup-required.
* Feature state if failed: login/register blocked or degraded with clear safe message.

### Security Requirements

* Secret handling: service role server-only.
* Webhook signature: not applicable unless auth webhooks are used.
* Rate limit: login/OTP attempts must be rate-limited.
* Audit log: staff/admin login and suspicious auth events tracked.
* Log redaction: no OTP/token/session/private payload in logs.
* Server/client boundary: server-only auth admin operations never imported in client.

### Production Readiness

* Live key configured: No
* Test mode disabled: Not applicable yet
* Mock mode disabled: Not applicable yet
* Error fallback tested: No
* Cost/quota reviewed: No
* Legal/privacy reviewed: Pending
* Final status: `NOT_STARTED`

### Related Docs

* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `SECURITY_RLS_CHECKLIST.md`
* `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`

### Pending Issues

* Supabase project/config not implemented yet.
* OTP provider selection pending.
* Admin/staff Google/email provider setup pending.

---

## API-002 — Supabase PostgreSQL

### Current Status

* Status: `NOT_STARTED`
* Mode: `NONE`
* Environment: Not configured in implementation yet
* Owner: Super Admin / System
* Feature flag: No
* Last verified: Not verified
* Verification result: `NOT_RUN`

### Purpose

* Main application database
* Profiles, roles, permissions
* Properties
* Projects
* Requirements
* Leads
* Proposals
* Messages
* Billing
* Payments
* Ads
* Notifications
* CMS/SEO/legal pages
* Audit logs
* Provider settings
* Feature flags

### Required Environment Variables

| Variable                        | Client/Server      | Required    | Status        | Notes                                    |
| ------------------------------- | ------------------ | ----------- | ------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Client-safe public | Yes         | `NOT_STARTED` | Public Supabase URL                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-safe public | Yes         | `NOT_STARTED` | RLS-protected public key                 |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only        | Conditional | `NOT_STARTED` | Server-only                              |
| `DATABASE_URL`                  | Server-only        | Conditional | `NOT_STARTED` | Used for migrations/tools only if needed |

### Verification Checklist

| Check                      | Result    | Notes                   |
| -------------------------- | --------- | ----------------------- |
| DB connection works        | `NOT_RUN` | Implementation pending  |
| Migrations apply           | `NOT_RUN` | Migration files pending |
| Required tables exist      | `NOT_RUN` | DB schema pending       |
| Indexes exist where needed | `NOT_RUN` | Pending                 |
| No unbounded query pattern | `NOT_RUN` | Pending                 |
| Public-safe views created  | `NOT_RUN` | Pending                 |
| Backup strategy exists     | `NOT_RUN` | Pending                 |

### Failure Behavior

* User-facing fallback: safe error, no raw DB error.
* Admin-facing error: internal status, no credentials.
* Retry behavior: retry only where safe.
* Feature state if failed: `BLOCKED` or degraded read-only if designed.

### Security Requirements

* Raw DB credentials never exposed.
* Service role server-only.
* RLS enabled on sensitive tables.
* Safe typed errors.
* Audit logs for sensitive DB actions.

### Production Readiness

* Live key configured: No
* Migration verified: No
* Backup verified: No
* RLS verified: No
* Final status: `NOT_STARTED`

### Pending Issues

* Full schema and migrations still need implementation.

---

## API-003 — Supabase RLS

### Current Status

* Status: `NOT_STARTED`
* Mode: `NONE`
* Verification result: `NOT_RUN`

### Purpose

* Enforce public/private access at database level.
* Prevent direct URL/API bypass.
* Protect contact numbers, private profile fields, leads, messages, payments, verification documents and admin data.

### Verification Checklist

| Check                                            | Result    | Notes   |
| ------------------------------------------------ | --------- | ------- |
| RLS enabled on sensitive tables                  | `NOT_RUN` | Pending |
| Guest allowed public-safe approved listings only | `NOT_RUN` | Pending |
| Guest denied hidden contact/private fields       | `NOT_RUN` | Pending |
| Owner sees own data only                         | `NOT_RUN` | Pending |
| Broker sees own/allowed data only                | `NOT_RUN` | Pending |
| Builder sees own/agent-assigned data only        | `NOT_RUN` | Pending |
| Staff scoped access works                        | `NOT_RUN` | Pending |
| Super Admin access works                         | `NOT_RUN` | Pending |
| Wrong-owner denied                               | `NOT_RUN` | Pending |
| Wrong-role denied                                | `NOT_RUN` | Pending |
| Public-safe views exclude private data           | `NOT_RUN` | Pending |

### Failure Behavior

* If RLS is missing or fails, phase status must be `FAIL` or `BLOCKED`.
* Do not launch.
* Do not mark feature `PASS`.

### Security Requirements

* RLS allowed and denied tests mandatory.
* Frontend-only protection is not enough.
* Server actions must still check authorization.

### Production Readiness

* Final status: `NOT_STARTED`
* Production cannot launch until RLS final pass is complete.

---

## API-004 — Supabase Server Client

### Current Status

* Status: `NOT_STARTED`
* Mode: `NONE`
* Verification result: `NOT_RUN`

### Purpose

* Server-side DB access.
* Server Actions.
* Route Handlers.
* Admin/server-only operations.
* Secure provider webhook handling.
* Auth/session verification.

### Required Environment Variables

| Variable                        | Client/Server      | Required    | Status        | Notes                    |
| ------------------------------- | ------------------ | ----------- | ------------- | ------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Client-safe public | Yes         | `NOT_STARTED` | Public URL               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-safe public | Yes         | `NOT_STARTED` | RLS protected            |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only        | Conditional | `NOT_STARTED` | Only trusted server-side |

### Verification Checklist

| Check                                           | Result    | Notes   |
| ----------------------------------------------- | --------- | ------- |
| Server client initialized safely                | `NOT_RUN` | Pending |
| Client bundle does not include service role key | `NOT_RUN` | Pending |
| Server actions use user session where possible  | `NOT_RUN` | Pending |
| Admin actions audit logged                      | `NOT_RUN` | Pending |
| User-facing errors are typed/safe               | `NOT_RUN` | Pending |

---

# 10. OTP And SMS Providers

## API-005 — OTP Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / System Manager
* Feature flag: Auth provider setup state
* Last verified: Not verified
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Public mobile OTP login
* Public mobile OTP registration
* Mobile number verification
* Mobile number change verification
* Optional suspicious login alerts
* Optional NRI/international number support

### Provider Options

* Preferred provider: to be selected by Super Admin
* Alternative providers:

  * MSG91
  * Fast2SMS
  * Twilio
  * Textlocal
  * Other approved Indian OTP/SMS provider
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                      | Client/Server | Required                 | Status           | Notes                       |
| ----------------------------- | ------------- | ------------------------ | ---------------- | --------------------------- |
| `OTP_PROVIDER`                | Server/config | Yes                      | `NOT_STARTED`    | Provider identifier         |
| `OTP_API_KEY`                 | Server-only   | Yes if provider selected | `SETUP_REQUIRED` | Never expose                |
| `OTP_SENDER_ID`               | Server/config | Provider-specific        | `SETUP_REQUIRED` | DLT/provider dependent      |
| `OTP_TEMPLATE_ID`             | Server/config | Provider-specific        | `SETUP_REQUIRED` | DLT/template dependent      |
| `OTP_DEV_MODE`                | Server/config | Dev only                 | `NOT_STARTED`    | Must be false in production |
| `OTP_RATE_LIMIT_PER_IP`       | Server/config | Yes                      | `NOT_STARTED`    | Cost protection             |
| `OTP_RATE_LIMIT_PER_MOBILE`   | Server/config | Yes                      | `NOT_STARTED`    | Abuse protection            |
| `OTP_EXPIRY_SECONDS`          | Server/config | Yes                      | `NOT_STARTED`    | OTP expiry                  |
| `OTP_RESEND_COOLDOWN_SECONDS` | Server/config | Yes                      | `NOT_STARTED`    | Resend cooldown             |
| `OTP_MAX_ATTEMPTS`            | Server/config | Yes                      | `NOT_STARTED`    | Attempt lock                |

### Public/Private Data Rules

* Sends user personal data: Yes
* Sends phone number: Yes
* Sends email: No unless email OTP fallback added
* Sends property/project data: No
* Sends payment data: No
* Sends document/media data: No
* Sensitive data handling: Never log OTP or full provider payload.

### Setup Steps

1. Select provider.
2. Configure provider account.
3. Configure DLT/template if required.
4. Add server-only env variables.
5. Update `.env.example`.
6. Implement provider adapter.
7. Add rate limit by IP/device/mobile.
8. Add OTP attempt logs.
9. Add setup-required fallback.
10. Test success.
11. Test failed delivery.
12. Test wrong OTP.
13. Test resend cooldown.
14. Test rate limit.
15. Disable dev OTP in production.

### Verification Checklist

| Check                                 | Result    | Notes                  |
| ------------------------------------- | --------- | ---------------------- |
| Provider selected                     | `BLOCKED` | Pending decision       |
| Env variables added to `.env.example` | `NOT_RUN` | Pending implementation |
| Real OTP send works                   | `NOT_RUN` | Provider setup pending |
| OTP verification works                | `NOT_RUN` | Pending                |
| Wrong OTP fails safely                | `NOT_RUN` | Pending                |
| OTP resend cooldown works             | `NOT_RUN` | Pending                |
| OTP max attempts works                | `NOT_RUN` | Pending                |
| OTP rate limit works                  | `NOT_RUN` | Pending                |
| OTP not logged                        | `NOT_RUN` | Pending                |
| Provider failure fallback shown       | `NOT_RUN` | Pending                |
| Dev OTP disabled in production        | `NOT_RUN` | Pending                |
| International/NRI fallback considered | `NOT_RUN` | Pending                |

### Failure Behavior

* User-facing fallback: “OTP service is currently unavailable. Please try again later.” or setup-required in development/admin.
* Admin-facing error: provider status + safe error code.
* Retry behavior: controlled retry, resend cooldown.
* Notification behavior: admin provider issue notification if notifications available.
* Feature state if failed: login/register OTP blocked or fallback email OTP if implemented.

### Security Requirements

* Secret handling: API key server-only.
* Webhook signature: not applicable unless provider has callbacks.
* Rate limit: mandatory.
* Audit log: suspicious OTP abuse and provider config changes.
* Log redaction: OTP and provider payload redacted.
* Server/client boundary: OTP send/verify server-side only.

### Production Readiness

* Live key configured: No
* Test mode disabled: Not verified
* Mock mode disabled: Not verified
* Error fallback tested: No
* Cost/quota reviewed: No
* Legal/privacy reviewed: Pending OTP/data usage notice
* Final status: `SETUP_REQUIRED`

### Pending Issues

* Provider not selected.
* Env variables pending.
* Real OTP verification pending.
* NRI/international number strategy pending.

---

## API-006 — SMS Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / Notification Manager / System Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Transactional SMS
* OTP SMS if same provider used
* Payment alerts if enabled
* Important admin/system alerts if enabled
* Site visit reminders if enabled
* Lead notifications if enabled
* Trial/plan expiry alerts if enabled

### Provider Options

* MSG91
* Fast2SMS
* Twilio
* Textlocal
* Other approved provider
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                  | Client/Server | Required           | Status           | Notes               |
| ------------------------- | ------------- | ------------------ | ---------------- | ------------------- |
| `SMS_PROVIDER`            | Server/config | Yes if SMS enabled | `SETUP_REQUIRED` | Provider identifier |
| `SMS_API_KEY`             | Server-only   | Yes if SMS enabled | `SETUP_REQUIRED` | Never expose        |
| `SMS_SENDER_ID`           | Server/config | Provider-specific  | `SETUP_REQUIRED` | DLT requirement     |
| `SMS_DLT_ENTITY_ID`       | Server/config | Provider-specific  | `SETUP_REQUIRED` | India DLT           |
| `SMS_DEFAULT_TEMPLATE_ID` | Server/config | Provider-specific  | `SETUP_REQUIRED` | Template            |
| `SMS_RATE_LIMIT_PER_USER` | Server/config | Yes                | `NOT_STARTED`    | Abuse/cost          |
| `SMS_DAILY_COST_LIMIT`    | Server/config | Recommended        | `NOT_STARTED`    | Cost control        |

### Verification Checklist

| Check                                           | Result    | Notes   |
| ----------------------------------------------- | --------- | ------- |
| Provider selected                               | `BLOCKED` | Pending |
| DLT/template configured                         | `BLOCKED` | Pending |
| Test SMS delivery                               | `NOT_RUN` | Pending |
| Delivery status callback/log works              | `NOT_RUN` | Pending |
| Failure state logged                            | `NOT_RUN` | Pending |
| No fake sent status                             | `NOT_RUN` | Pending |
| Rate/cost limit works                           | `NOT_RUN` | Pending |
| Unsubscribe/opt-out respected for marketing SMS | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: in-app notification or email fallback where available.
* Admin-facing error: provider status, quota, safe reason.
* Retry behavior: retry only transactional messages with idempotency.
* Feature state if failed: `SETUP_REQUIRED`, `FAILED` or `FALLBACK_ACTIVE`.

### Security Requirements

* API secret server-only.
* SMS payload logs redacted.
* Marketing/transactional separation required.
* DLT/template compliance required for production.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 11. Email Provider

## API-007 — Email Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / Notification Manager / System Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Account emails if needed
* Staff invites
* Admin/staff login support if email-based
* Support ticket replies
* Invoice email delivery
* Payment receipts
* Trial/subscription reminders
* Verification status emails
* Lead/site visit/proposal notifications if enabled
* Security/suspicious login alerts
* Provider/system alerts

### Provider Options

* Resend
* SendGrid
* SMTP
* Other approved provider
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                    | Client/Server | Required             | Status           | Notes               |
| --------------------------- | ------------- | -------------------- | ---------------- | ------------------- |
| `EMAIL_PROVIDER`            | Server/config | Yes if email enabled | `SETUP_REQUIRED` | Provider identifier |
| `EMAIL_API_KEY`             | Server-only   | Provider-specific    | `SETUP_REQUIRED` | Never expose        |
| `SMTP_HOST`                 | Server-only   | If SMTP              | `SETUP_REQUIRED` | SMTP only           |
| `SMTP_PORT`                 | Server-only   | If SMTP              | `SETUP_REQUIRED` | SMTP only           |
| `SMTP_USER`                 | Server-only   | If SMTP              | `SETUP_REQUIRED` | SMTP only           |
| `SMTP_PASS`                 | Server-only   | If SMTP              | `SETUP_REQUIRED` | Never expose        |
| `EMAIL_FROM_ADDRESS`        | Server/config | Yes                  | `SETUP_REQUIRED` | Verified sender     |
| `EMAIL_REPLY_TO`            | Server/config | Recommended          | `SETUP_REQUIRED` | Support replies     |
| `EMAIL_RATE_LIMIT_PER_USER` | Server/config | Yes                  | `NOT_STARTED`    | Abuse/cost          |
| `EMAIL_DAILY_LIMIT`         | Server/config | Recommended          | `NOT_STARTED`    | Cost/quota          |

### Public/Private Data Rules

* Sends user personal data: Yes
* Sends phone number: Sometimes, only if needed
* Sends email: Yes
* Sends payment data: Yes for invoice/receipt
* Sends document/media data: No private docs unless explicitly approved
* Sensitive data handling: no OTP/password/token/private document URLs in email unless safe expiring link and approved.

### Setup Steps

1. Select provider.
2. Configure verified sending domain.
3. Configure SPF/DKIM/DMARC.
4. Add env variables.
5. Update `.env.example`.
6. Create email template system.
7. Add delivery logs.
8. Add bounce/complaint handling where provider supports.
9. Add unsubscribe support for marketing emails.
10. Test transactional email.
11. Test invoice email.
12. Test failed email state.
13. Test no fake sent status.

### Verification Checklist

| Check                           | Result    | Notes   |
| ------------------------------- | --------- | ------- |
| Provider selected               | `BLOCKED` | Pending |
| Domain verified                 | `NOT_RUN` | Pending |
| SPF/DKIM/DMARC checked          | `NOT_RUN` | Pending |
| Transactional email sends       | `NOT_RUN` | Pending |
| Invoice email sends             | `NOT_RUN` | Pending |
| Failed email logged             | `NOT_RUN` | Pending |
| Bounce/complaint handling       | `NOT_RUN` | Pending |
| No fake sent status             | `NOT_RUN` | Pending |
| Unsubscribe works for marketing | `NOT_RUN` | Pending |
| Legal footer present            | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: show in-app status and allow retry/download where applicable.
* Admin-facing error: provider status, safe error ID.
* Retry behavior: retry queue for transactional emails.
* Notification behavior: admin provider issue if repeated failures.
* Feature state if failed: `FAILED`, `SETUP_REQUIRED`, or `FALLBACK_ACTIVE`.

### Security Requirements

* Email provider secrets server-only.
* No raw provider payload in logs.
* No sensitive private document public links.
* Marketing emails require opt-out/unsubscribe.
* Transactional emails separated from marketing.

### Production Readiness

* Final status: `SETUP_REQUIRED`

### Pending Issues

* Provider not selected.
* Domain/email authentication pending.
* Invoice email pending.

---

# 12. WhatsApp Providers

## API-008 — WhatsApp Free `wa.me` Mode

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `FREE_LINK` planned
* Environment: Not configured
* Owner: Super Admin / Notification Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* User-initiated WhatsApp contact link
* Share property/project link
* Share text template
* Contact CTA where allowed
* Free fallback when WhatsApp API is not configured

### Provider Options

* WhatsApp free `wa.me` links
* Current selected provider: planned fallback mode

### Required Environment Variables

| Variable                        | Client/Server | Required                | Status           | Notes                          |
| ------------------------------- | ------------- | ----------------------- | ---------------- | ------------------------------ |
| `WHATSAPP_MODE`                 | Server/config | Yes if WhatsApp enabled | `SETUP_REQUIRED` | `FREE_LINK`, `API`, `DISABLED` |
| `WHATSAPP_DEFAULT_COUNTRY_CODE` | Server/config | Recommended             | `NOT_STARTED`    | India default                  |
| `WHATSAPP_BUSINESS_NUMBER`      | Server/config | Optional                | `SETUP_REQUIRED` | If platform number used        |

### Public/Private Data Rules

* Sends user personal data: User-initiated only
* Sends phone number: Yes if contact CTA opens WhatsApp
* Sends property/project data: Share text can include public-safe details
* Sends payment data: No
* Sensitive data handling: no hidden contact leak; no private data in share template.

### Verification Checklist

| Check                                     | Result    | Notes   |
| ----------------------------------------- | --------- | ------- |
| `wa.me` URL generated safely              | `NOT_RUN` | Pending |
| Phone number only shown to allowed user   | `NOT_RUN` | Pending |
| Share text contains public-safe data only | `NOT_RUN` | Pending |
| URL encoding correct                      | `NOT_RUN` | Pending |
| User-initiated click tracking works       | `NOT_RUN` | Pending |
| No fake sent status                       | `NOT_RUN` | Pending |
| Hidden contact not leaked                 | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: show contact unavailable or copy/share alternative.
* Admin-facing error: not applicable unless platform number misconfigured.
* Retry behavior: not applicable; user opens WhatsApp manually.
* Feature state if failed: fallback to call/inquiry/share link.

### Security Requirements

* Do not show hidden contact to guest.
* Do not include private data in message template.
* Track click as user-initiated, not delivered message.
* Never show “sent” for `wa.me`; only “opened WhatsApp” or click tracked.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-009 — WhatsApp Business Cloud API

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `API` planned
* Environment: Not configured
* Owner: Super Admin / Notification Manager / System Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Template-based WhatsApp notifications
* Lead notifications if enabled
* Payment/trial/subscription notifications if enabled
* Verification/status notifications if enabled
* Site visit reminders if enabled
* Admin/system alerts if enabled

### Provider Options

* WhatsApp Business Cloud API
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                         | Client/Server      | Required                     | Status           | Notes              |
| -------------------------------- | ------------------ | ---------------------------- | ---------------- | ------------------ |
| `WHATSAPP_MODE`                  | Server/config      | Yes                          | `SETUP_REQUIRED` | `API` when enabled |
| `WHATSAPP_ACCESS_TOKEN`          | Server-only        | Yes if API enabled           | `SETUP_REQUIRED` | Never expose       |
| `WHATSAPP_PHONE_NUMBER_ID`       | Server-only/config | Yes if API enabled           | `SETUP_REQUIRED` | Provider ID        |
| `WHATSAPP_BUSINESS_ACCOUNT_ID`   | Server-only/config | Yes if API enabled           | `SETUP_REQUIRED` | Provider ID        |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN`  | Server-only        | If webhook enabled           | `SETUP_REQUIRED` | Never expose       |
| `WHATSAPP_APP_SECRET`            | Server-only        | If signature validation used | `SETUP_REQUIRED` | Never expose       |
| `WHATSAPP_DEFAULT_TEMPLATE_LANG` | Server/config      | Recommended                  | `NOT_STARTED`    | Template language  |
| `WHATSAPP_RATE_LIMIT_PER_USER`   | Server/config      | Yes                          | `NOT_STARTED`    | Abuse/cost         |

### Verification Checklist

| Check                                  | Result    | Notes   |
| -------------------------------------- | --------- | ------- |
| API credentials configured             | `NOT_RUN` | Pending |
| `.env.example` updated                 | `NOT_RUN` | Pending |
| Template approved                      | `NOT_RUN` | Pending |
| Test template send works               | `NOT_RUN` | Pending |
| Failed template send logged            | `NOT_RUN` | Pending |
| Delivery status webhook verified       | `NOT_RUN` | Pending |
| Webhook signature/verify token checked | `NOT_RUN` | Pending |
| No fake sent status                    | `NOT_RUN` | Pending |
| Opt-in proof checked                   | `NOT_RUN` | Pending |
| User opt-out respected                 | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: in-app notification/email/SMS fallback if configured.
* Admin-facing error: template not approved, token issue, quota issue.
* Retry behavior: controlled retry with idempotency.
* Notification behavior: provider issue notification for admins.
* Feature state if failed: `FAILED`, `SETUP_REQUIRED`, or `FALLBACK_ACTIVE`.

### Security Requirements

* Access token server-only.
* Webhook verify token server-only.
* No private payload logs.
* Opt-in required where applicable.
* Marketing vs transactional separation.
* No fake delivery status.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 13. Payment Provider

## API-010 — Razorpay Payment Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / Payment Manager / Billing Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Subscription plan checkout
* Banner ad payments
* Add-on payments
* Boost/featured listing payments
* Extra listing/project/requirement/lead/contact unlock payments
* Invoice generation after verified payment
* Refunds where enabled
* Payment reconciliation
* Payment dashboard

### Provider Options

* Preferred provider: Razorpay
* Alternative providers: none approved currently
* Current selected provider: Razorpay planned

### Required Environment Variables

| Variable                          | Client/Server      | Required                | Status           | Notes                              |
| --------------------------------- | ------------------ | ----------------------- | ---------------- | ---------------------------------- |
| `RAZORPAY_MODE`                   | Server/config      | Yes                     | `SETUP_REQUIRED` | `SANDBOX` or `LIVE`                |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`     | Client-safe public | Yes if checkout enabled | `SETUP_REQUIRED` | Public key ID only                 |
| `RAZORPAY_KEY_SECRET`             | Server-only        | Yes                     | `SETUP_REQUIRED` | Never expose                       |
| `RAZORPAY_WEBHOOK_SECRET`         | Server-only        | Yes for webhook         | `SETUP_REQUIRED` | Mandatory for webhook verification |
| `RAZORPAY_ACCOUNT_ID`             | Server/config      | Optional                | `SETUP_REQUIRED` | If needed                          |
| `PAYMENT_SUCCESS_REDIRECT_URL`    | Server/config      | Yes                     | `NOT_STARTED`    | Safe redirect                      |
| `PAYMENT_FAILURE_REDIRECT_URL`    | Server/config      | Yes                     | `NOT_STARTED`    | Safe redirect                      |
| `PAYMENT_WEBHOOK_IDEMPOTENCY_TTL` | Server/config      | Yes                     | `NOT_STARTED`    | Avoid duplicate processing         |
| `PAYMENT_TEST_MODE_ALLOWED`       | Server/config      | Dev only                | `NOT_STARTED`    | Must be false in production        |

### Public/Private Data Rules

* Sends user personal data: Yes
* Sends phone number: Yes, if needed for checkout/customer
* Sends email: Yes, if needed for receipt/customer
* Sends payment data: Yes
* Sends property/project data: Possibly item/plan/ad reference
* Sends document/media data: No
* Sensitive data handling: no secrets, full payloads or payment private data in public logs.

### Setup Steps

1. Create Razorpay account.
2. Configure sandbox keys for development.
3. Configure live keys for production.
4. Add env variables.
5. Update `.env.example`.
6. Create payment order logic server-side.
7. Implement checkout UI.
8. Implement callback handling.
9. Implement webhook endpoint.
10. Verify webhook signature.
11. Implement idempotency.
12. Implement payment state machine.
13. Implement failed/pending/success states.
14. Activate subscription only after verified payment or audited manual activation.
15. Generate invoice only after verified payment.
16. Test duplicate webhook.
17. Test failed payment.
18. Test pending payment.
19. Test success payment.
20. Disable test mode in production.

### Verification Checklist

| Check                                       | Result    | Notes            |
| ------------------------------------------- | --------- | ---------------- |
| Razorpay selected                           | `PASS`    | Provider planned |
| Env variables added to `.env.example`       | `NOT_RUN` | Pending          |
| Checkout order created server-side          | `NOT_RUN` | Pending          |
| Client only receives public key/order data  | `NOT_RUN` | Pending          |
| Secret not exposed                          | `NOT_RUN` | Pending          |
| Payment callback safe                       | `NOT_RUN` | Pending          |
| Webhook signature verified                  | `NOT_RUN` | Pending          |
| Webhook idempotency works                   | `NOT_RUN` | Pending          |
| Failed payment does not activate plan       | `NOT_RUN` | Pending          |
| Pending payment does not activate plan      | `NOT_RUN` | Pending          |
| Success activates only after verification   | `NOT_RUN` | Pending          |
| Duplicate payment handled                   | `NOT_RUN` | Pending          |
| Invoice generated only after success        | `NOT_RUN` | Pending          |
| Invoice number not wasted on failed payment | `NOT_RUN` | Pending          |
| Refund flow safe if enabled                 | `NOT_RUN` | Pending          |
| Test mode disabled in production            | `NOT_RUN` | Pending          |

### Failure Behavior

* User-facing fallback: payment failed/pending message with retry.
* Admin-facing error: payment status, safe event ID, no secret.
* Retry behavior: checkout retry, webhook retry, dead-letter queue where implemented.
* Notification behavior: payment failed/success/pending notification.
* Feature state if failed: plan remains inactive until verified success.

### Security Requirements

* Key secret server-only.
* Webhook secret server-only.
* Signature verification mandatory.
* Idempotency mandatory.
* Safe redirects, no open redirect.
* Manual activation requires audit reason.
* Raw payment errors not exposed to user.
* Test mode disabled in production.

### Production Readiness

* Live key configured: No
* Test mode disabled: Not verified
* Mock mode disabled: Not verified
* Error fallback tested: No
* Cost/quota reviewed: No
* Legal/privacy reviewed: Pending payment/refund/terms notice
* Final status: `SETUP_REQUIRED`

### Pending Issues

* Razorpay setup pending.
* Payment state machine pending.
* Webhook verification pending.
* Invoice/GST integration pending.

---

## API-011 — Razorpay Webhooks

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Verify payment success
* Update payment status
* Activate subscriptions/plans
* Mark add-ons active
* Trigger invoice generation
* Trigger billing notifications
* Reconcile payment events
* Handle refunds where enabled

### Required Environment Variables

| Variable                          | Client/Server | Required    | Status           | Notes           |
| --------------------------------- | ------------- | ----------- | ---------------- | --------------- |
| `RAZORPAY_WEBHOOK_SECRET`         | Server-only   | Yes         | `SETUP_REQUIRED` | Required        |
| `RAZORPAY_WEBHOOK_ALLOWED_EVENTS` | Server/config | Recommended | `NOT_STARTED`    | Event allowlist |
| `PAYMENT_WEBHOOK_IDEMPOTENCY_TTL` | Server/config | Yes         | `NOT_STARTED`    | Deduplication   |
| `WEBHOOK_RETRY_MAX_ATTEMPTS`      | Server/config | Recommended | `NOT_STARTED`    | Retry control   |

### Verification Checklist

| Check                                         | Result    | Notes   |
| --------------------------------------------- | --------- | ------- |
| Signature validation implemented              | `NOT_RUN` | Pending |
| Invalid signature rejected                    | `NOT_RUN` | Pending |
| Duplicate webhook ignored/idempotent          | `NOT_RUN` | Pending |
| Success event activates plan                  | `NOT_RUN` | Pending |
| Failed event keeps plan inactive              | `NOT_RUN` | Pending |
| Pending event keeps plan pending              | `NOT_RUN` | Pending |
| Invoice triggered after verified success only | `NOT_RUN` | Pending |
| Dead-letter queue/failure log exists          | `NOT_RUN` | Pending |
| Raw payload not logged                        | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: payment remains pending until verified.
* Admin-facing error: webhook event failure queue.
* Retry behavior: idempotent retry.
* Feature state if failed: do not activate plan.

### Production Readiness

* Final status: `SETUP_REQUIRED`
* Production cannot mark payment complete without verified webhook or safe verified callback process.

---

# 14. Maps Providers

## API-012 — Google Maps Embed Mode

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `EMBED_ONLY` planned
* Environment: Not configured
* Owner: Super Admin / System Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Basic map display on property/project detail pages
* Location visualization
* Optional street/nearby display if enabled
* Low-complexity fallback before full Maps API

### Required Environment Variables

| Variable                    | Client/Server                 | Required              | Status           | Notes                           |
| --------------------------- | ----------------------------- | --------------------- | ---------------- | ------------------------------- |
| `MAPS_MODE`                 | Server/config                 | Yes                   | `SETUP_REQUIRED` | `DISABLED`, `EMBED_ONLY`, `API` |
| `GOOGLE_MAPS_EMBED_API_KEY` | Server/client depending usage | If embed key required | `SETUP_REQUIRED` | Restrict by domain              |
| `MAPS_DEFAULT_COUNTRY`      | Server/config                 | Recommended           | `NOT_STARTED`    | India                           |
| `MAPS_DEFAULT_STATE`        | Server/config                 | Recommended           | `NOT_STARTED`    | Gujarat                         |

### Verification Checklist

| Check                              | Result    | Notes   |
| ---------------------------------- | --------- | ------- |
| Embed key configured               | `NOT_RUN` | Pending |
| Domain restrictions configured     | `NOT_RUN` | Pending |
| Map iframe/url safe                | `NOT_RUN` | Pending |
| Missing map fallback works         | `NOT_RUN` | Pending |
| Location without exact pin handled | `NOT_RUN` | Pending |
| Attribution visible                | `NOT_RUN` | Pending |
| Quota/error fallback works         | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: show text address/location hierarchy.
* Admin-facing error: maps provider setup-required or quota error.
* Retry behavior: not required.
* Feature state if failed: map disabled; location text remains.

### Security Requirements

* Restrict API key by domain/referrer where possible.
* Validate coordinates/URLs.
* Avoid SSRF unsafe external embed generation.
* Do not block page render if map fails.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-013 — Google Maps API / Places Mode

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `API` planned
* Environment: Not configured
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Advanced map display
* Places autocomplete
* Address lookup
* Map pin selection
* Nearby places if enabled
* Search map toggle
* Location validation support

### Required Environment Variables

| Variable                          | Client/Server              | Required                   | Status           | Notes                        |
| --------------------------------- | -------------------------- | -------------------------- | ---------------- | ---------------------------- |
| `MAPS_MODE`                       | Server/config              | Yes                        | `SETUP_REQUIRED` | `API` when enabled           |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Client-safe but restricted | Yes if client maps enabled | `SETUP_REQUIRED` | Must be restricted by domain |
| `GOOGLE_MAPS_SERVER_API_KEY`      | Server-only                | Optional                   | `SETUP_REQUIRED` | Server geocoding if used     |
| `GOOGLE_MAPS_PLACES_ENABLED`      | Server/config              | Optional                   | `NOT_STARTED`    | Feature flag/config          |
| `GOOGLE_MAPS_QUOTA_ALERT_LIMIT`   | Server/config              | Recommended                | `NOT_STARTED`    | Cost/quota alert             |

### Verification Checklist

| Check                                | Result    | Notes   |
| ------------------------------------ | --------- | ------- |
| API key configured                   | `NOT_RUN` | Pending |
| Key restricted                       | `NOT_RUN` | Pending |
| Places autocomplete works            | `NOT_RUN` | Pending |
| Map pin selection works              | `NOT_RUN` | Pending |
| Quota failure fallback works         | `NOT_RUN` | Pending |
| No raw provider error shown          | `NOT_RUN` | Pending |
| Maps disabled fallback works         | `NOT_RUN` | Pending |
| Nearby disclaimer shown where needed | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: manual address/location dropdown.
* Admin-facing error: quota/key/setup issue.
* Retry behavior: not automatic for user forms; allow manual fallback.
* Feature state if failed: `SETUP_REQUIRED` or `FALLBACK_ACTIVE`.

### Security Requirements

* API keys restricted.
* Server key server-only.
* No private user data in unnecessary provider calls.
* Manual fallback must exist.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 15. Cloudflare Storage, CDN And Bot Protection

## API-014 — Cloudflare R2 Storage

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / System Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Property images
* Project images
* Project videos
* Floor plans
* PDF brochures
* Profile images/logos
* Banner ad images
* Support/report attachments
* Private verification documents
* Invoice PDFs if stored
* Media original backups
* Media variants

### Required Environment Variables

| Variable                          | Client/Server          | Required             | Status           | Notes                                                                    |
| --------------------------------- | ---------------------- | -------------------- | ---------------- | ------------------------------------------------------------------------ |
| `CLOUDFLARE_R2_ACCOUNT_ID`        | Server-only/config     | Yes                  | `SETUP_REQUIRED` | Never expose if sensitive                                                |
| `CLOUDFLARE_R2_ACCESS_KEY_ID`     | Server-only            | Yes                  | `SETUP_REQUIRED` | Never expose                                                             |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Server-only            | Yes                  | `SETUP_REQUIRED` | Never expose                                                             |
| `CLOUDFLARE_R2_PUBLIC_BUCKET`     | Server/config          | Yes                  | `SETUP_REQUIRED` | Public media only                                                        |
| `CLOUDFLARE_R2_PRIVATE_BUCKET`    | Server/config          | Yes                  | `SETUP_REQUIRED` | Private docs                                                             |
| `CLOUDFLARE_R2_ENDPOINT`          | Server-only/config     | Yes                  | `SETUP_REQUIRED` | S3-compatible endpoint                                                   |
| `CLOUDFLARE_R2_PUBLIC_BASE_URL`   | Client-safe public URL | Yes for public media | `SETUP_REQUIRED` | CDN/public domain                                                        |
| `R2_SIGNED_URL_EXPIRY_SECONDS`    | Server/config          | Yes for private docs | `NOT_STARTED`    | Expiring private links                                                   |
| `UPLOAD_MAX_FILE_SIZE_MB`         | Server/config          | Yes                  | `NOT_STARTED`    | Even if user said no min/max image size, system must still protect infra |
| `UPLOAD_ALLOWED_IMAGE_TYPES`      | Server/config          | Yes                  | `NOT_STARTED`    | Safe image formats                                                       |
| `UPLOAD_ALLOWED_PDF_TYPES`        | Server/config          | Yes                  | `NOT_STARTED`    | PDF only for brochure/docs                                               |
| `UPLOAD_ALLOWED_VIDEO_TYPES`      | Server/config          | Yes                  | `NOT_STARTED`    | Project video                                                            |

### Public/Private Data Rules

* Sends user personal data: Possibly in metadata if not controlled; avoid.
* Sends phone/email: No
* Sends property/project data: Media linked to property/project IDs.
* Sends payment data: Invoice PDFs if stored.
* Sends document/media data: Yes
* Sensitive data handling: private docs must never use public bucket.

### Setup Steps

1. Create Cloudflare account.
2. Create R2 public bucket.
3. Create R2 private bucket.
4. Configure CORS/bucket policies.
5. Configure CDN/public domain.
6. Add server-only credentials.
7. Update `.env.example`.
8. Implement upload validation.
9. Implement public/private file classification.
10. Implement signed private URL access.
11. Implement upload logs.
12. Implement orphan cleanup tracking.
13. Implement lifecycle/cost alerts where possible.
14. Test public image upload.
15. Test private document upload.
16. Test signed URL expiry.
17. Test unauthorized private access denied.

### Verification Checklist

| Check                         | Result    | Notes   |
| ----------------------------- | --------- | ------- |
| Public bucket configured      | `NOT_RUN` | Pending |
| Private bucket configured     | `NOT_RUN` | Pending |
| Env variables added           | `NOT_RUN` | Pending |
| Upload works                  | `NOT_RUN` | Pending |
| Public image accessible       | `NOT_RUN` | Pending |
| Private document not public   | `NOT_RUN` | Pending |
| Signed URL expires            | `NOT_RUN` | Pending |
| Type validation works         | `NOT_RUN` | Pending |
| Size validation works         | `NOT_RUN` | Pending |
| SVG safety works              | `NOT_RUN` | Pending |
| EXIF removal works or tracked | `NOT_RUN` | Pending |
| Orphan cleanup tracked        | `NOT_RUN` | Pending |
| Cost alert tracked            | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: upload unavailable / retry / setup-required.
* Admin-facing error: bucket/config/credential issue.
* Retry behavior: upload retry where safe.
* Notification behavior: admin provider issue.
* Feature state if failed: media upload blocked or degraded; never fake upload success.

### Security Requirements

* Access keys server-only.
* Private bucket for verification docs/private files.
* File validation mandatory.
* Signed URLs for private docs.
* No permanent public URL for private docs.
* Upload logs redacted.
* Unsafe file types blocked.
* Malware scan/setup-required tracked where needed.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-015 — Cloudflare CDN

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Serve public images
* Serve optimized image variants
* Serve public brochure/floor plan files where allowed
* Improve performance
* CDN cache purge on media update/delete

### Required Environment Variables

| Variable                  | Client/Server      | Required          | Status           | Notes             |
| ------------------------- | ------------------ | ----------------- | ---------------- | ----------------- |
| `CLOUDFLARE_CDN_BASE_URL` | Client-safe public | Yes               | `SETUP_REQUIRED` | Public CDN domain |
| `CLOUDFLARE_API_TOKEN`    | Server-only        | If purge/API used | `SETUP_REQUIRED` | Never expose      |
| `CLOUDFLARE_ZONE_ID`      | Server/config      | If purge/API used | `SETUP_REQUIRED` | Zone ID           |
| `CDN_CACHE_TTL_SECONDS`   | Server/config      | Recommended       | `NOT_STARTED`    | Cache policy      |
| `CDN_PURGE_ON_UPDATE`     | Server/config      | Recommended       | `NOT_STARTED`    | Purge toggle      |

### Verification Checklist

| Check                                      | Result    | Notes   |
| ------------------------------------------ | --------- | ------- |
| CDN domain works                           | `NOT_RUN` | Pending |
| Public image served via CDN                | `NOT_RUN` | Pending |
| Cache headers safe                         | `NOT_RUN` | Pending |
| Deleted/changed media not stale            | `NOT_RUN` | Pending |
| CDN purge works if implemented             | `NOT_RUN` | Pending |
| Private docs not served through public CDN | `NOT_RUN` | Pending |
| Broken image fallback works                | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: direct public R2 URL if safe, or placeholder.
* Admin-facing error: CDN/provider status.
* Retry behavior: purge retry if configured.
* Feature state if failed: `DEGRADED` or `FALLBACK_ACTIVE`.

### Security Requirements

* CDN must not expose private bucket files.
* API token server-only.
* Cache purge audit for updates/deletes.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-016 — Cloudflare Turnstile

### Current Status

* Status: `DISABLED_BY_FLAG`
* Mode: `FEATURE_FLAGGED`
* Environment: Not configured
* Owner: Super Admin / Security Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Bot protection
* OTP/login abuse prevention
* Public lead forms
* Contact reveal forms
* Inquiry forms
* Report forms
* Potential payment-sensitive forms

### Required Environment Variables

| Variable                         | Client/Server      | Required   | Status           | Notes                  |
| -------------------------------- | ------------------ | ---------- | ---------------- | ---------------------- |
| `TURNSTILE_ENABLED`              | Server/config      | Yes        | `NOT_STARTED`    | Super Admin controlled |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client-safe public | If enabled | `SETUP_REQUIRED` | Public site key        |
| `TURNSTILE_SECRET_KEY`           | Server-only        | If enabled | `SETUP_REQUIRED` | Never expose           |
| `TURNSTILE_VERIFY_URL`           | Server/config      | Optional   | `NOT_STARTED`    | Provider endpoint      |

### Verification Checklist

| Check                                | Result    | Notes                              |
| ------------------------------------ | --------- | ---------------------------------- |
| Feature flag exists                  | `NOT_RUN` | Pending                            |
| Disabled by default                  | `NOT_RUN` | Required until Super Admin enables |
| Site key configured                  | `NOT_RUN` | Pending                            |
| Secret server-only                   | `NOT_RUN` | Pending                            |
| Server-side token verification works | `NOT_RUN` | Pending                            |
| Invalid token denied                 | `NOT_RUN` | Pending                            |
| Forms fallback safely if disabled    | `NOT_RUN` | Pending                            |

### Failure Behavior

* User-facing fallback: form blocked with safe message if enabled and verification fails.
* Admin-facing error: setup-required/provider error.
* Retry behavior: user can retry challenge.
* Feature state if failed: disabled or setup-required.

### Security Requirements

* Secret server-only.
* Server-side verification mandatory.
* Do not rely on frontend-only challenge.

### Production Readiness

* Final status: `DISABLED_BY_FLAG`

---

# 16. Analytics, Error Tracking And Monitoring

## API-017 — Analytics Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Environment: Not configured
* Owner: Super Admin / Reports Manager / SEO Manager
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Page analytics
* Search analytics
* Lead source tracking
* UTM/campaign tracking
* Ad impressions/clicks
* SEO funnel tracking
* Core Web Vitals
* Dashboard analytics where provider-backed

### Provider Options

* Google Analytics
* Plausible
* Cloudflare Analytics
* Other approved privacy-friendly analytics provider
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                        | Client/Server        | Required                     | Status           | Notes                        |
| ------------------------------- | -------------------- | ---------------------------- | ---------------- | ---------------------------- |
| `ANALYTICS_PROVIDER`            | Server/config        | If enabled                   | `SETUP_REQUIRED` | Provider identifier          |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client-safe public   | If GA enabled                | `SETUP_REQUIRED` | Public tracking ID           |
| `PLAUSIBLE_DOMAIN`              | Client/server config | If Plausible                 | `SETUP_REQUIRED` | Domain                       |
| `ANALYTICS_ENABLED`             | Server/config        | Yes                          | `NOT_STARTED`    | Controlled by consent/config |
| `WEB_VITALS_ENABLED`            | Server/config        | Recommended                  | `NOT_STARTED`    | Performance tracking         |
| `COOKIE_CONSENT_REQUIRED`       | Server/config        | Yes if tracking cookies used | `NOT_STARTED`    | Privacy compliance           |

### Verification Checklist

| Check                             | Result    | Notes   |
| --------------------------------- | --------- | ------- |
| Provider selected                 | `BLOCKED` | Pending |
| Consent mode respected            | `NOT_RUN` | Pending |
| Page view tracking works          | `NOT_RUN` | Pending |
| UTM tracking works                | `NOT_RUN` | Pending |
| Ad impression/click tracking real | `NOT_RUN` | Pending |
| No fake analytics                 | `NOT_RUN` | Pending |
| Private data not sent             | `NOT_RUN` | Pending |
| Cookie preference respected       | `NOT_RUN` | Pending |
| Web Vitals captured               | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: none; analytics should not affect user flow.
* Admin-facing error: analytics setup-required.
* Retry behavior: not critical.
* Feature state if failed: analytics dashboard shows empty/setup-required, not fake charts.

### Security Requirements

* Respect cookie/analytics consent.
* Do not send hidden phone/private user data.
* Do not expose private lead/payment details.
* No fake dashboard metrics.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-018 — Error Tracking Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Capture server/client errors
* Monitor production crashes
* Trace provider failures
* Support incident response
* Help debugging without leaking secrets

### Provider Options

* Sentry
* LogRocket
* Other approved error monitoring provider
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                      | Client/Server                 | Required              | Status           | Notes                |
| ----------------------------- | ----------------------------- | --------------------- | ---------------- | -------------------- |
| `ERROR_TRACKING_PROVIDER`     | Server/config                 | If enabled            | `SETUP_REQUIRED` | Provider             |
| `SENTRY_DSN`                  | Client/server depending setup | If Sentry             | `SETUP_REQUIRED` | DSN, review exposure |
| `SENTRY_AUTH_TOKEN`           | Server-only/build             | If source maps upload | `SETUP_REQUIRED` | Never expose         |
| `LOGROCKET_APP_ID`            | Client-safe public            | If LogRocket          | `SETUP_REQUIRED` | Review privacy       |
| `ERROR_TRACKING_ENABLED`      | Server/config                 | Yes                   | `NOT_STARTED`    | Enable/disable       |
| `ERROR_LOG_REDACTION_ENABLED` | Server/config                 | Yes                   | `NOT_STARTED`    | Mandatory            |

### Verification Checklist

| Check                                      | Result    | Notes   |
| ------------------------------------------ | --------- | ------- |
| Provider selected                          | `BLOCKED` | Pending |
| Redaction configured                       | `NOT_RUN` | Pending |
| Test error captured                        | `NOT_RUN` | Pending |
| Private data not captured                  | `NOT_RUN` | Pending |
| OTP/token/password not logged              | `NOT_RUN` | Pending |
| Hidden contact not logged in public traces | `NOT_RUN` | Pending |
| Provider failure does not crash app        | `NOT_RUN` | Pending |
| Source maps handled safely                 | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: safe error page/message.
* Admin-facing error: internal error logs where allowed.
* Retry behavior: not applicable.
* Feature state if failed: app still works, monitoring degraded.

### Security Requirements

* Redact secrets/private data.
* Do not record sensitive verification documents.
* Do not expose raw request bodies.
* Limit session replay or disable on sensitive pages.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-019 — Monitoring / Uptime Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Uptime monitoring
* Synthetic checks
* Provider health monitoring
* Alerting
* Production launch watch
* Incident response

### Provider Options

* Hosting provider monitoring
* Better Uptime/UptimeRobot/StatusPage/other approved provider
* Sentry uptime where supported
* Current selected provider: `NONE`

### Required Environment Variables

| Variable              | Client/Server | Required    | Status           | Notes              |
| --------------------- | ------------- | ----------- | ---------------- | ------------------ |
| `MONITORING_PROVIDER` | Server/config | If enabled  | `SETUP_REQUIRED` | Provider           |
| `MONITORING_API_KEY`  | Server-only   | If API used | `SETUP_REQUIRED` | Never expose       |
| `STATUS_PAGE_URL`     | Public/config | Optional    | `SETUP_REQUIRED` | Public status page |
| `ALERT_EMAIL_TO`      | Server/config | Recommended | `SETUP_REQUIRED` | Admin alerts       |

### Verification Checklist

| Check                    | Result    | Notes   |
| ------------------------ | --------- | ------- |
| Provider selected        | `BLOCKED` | Pending |
| Homepage synthetic check | `NOT_RUN` | Pending |
| Search synthetic check   | `NOT_RUN` | Pending |
| Login synthetic check    | `NOT_RUN` | Pending |
| Admin health check       | `NOT_RUN` | Pending |
| Alert delivery works     | `NOT_RUN` | Pending |
| Incident log flow works  | `NOT_RUN` | Pending |

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 17. Background Jobs, Cron And Processing Providers

## API-020 — Cron / Background Job Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Auto-pause expired listings
* Free trial expiry
* Subscription expiry/grace reminders
* Notification digests
* Failed notification retry
* Webhook retry/dead-letter processing
* Orphan media cleanup
* Soft delete purge after retention
* Sitemap regeneration
* Search index refresh
* RERA re-check where implemented
* Provider health checks
* Backup/restore checks where implemented

### Provider Options

* Supabase pg_cron
* Hosting provider cron
* Queue worker
* Serverless scheduled jobs
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                      | Client/Server | Required                         | Status           | Notes                      |
| ----------------------------- | ------------- | -------------------------------- | ---------------- | -------------------------- |
| `CRON_PROVIDER`               | Server/config | Yes if cron enabled              | `SETUP_REQUIRED` | Provider                   |
| `CRON_SECRET`                 | Server-only   | Yes for protected cron endpoints | `SETUP_REQUIRED` | Never expose               |
| `CRON_TIMEZONE`               | Server/config | Yes                              | `NOT_STARTED`    | Asia/Kolkata / IST         |
| `JOB_RETRY_MAX_ATTEMPTS`      | Server/config | Recommended                      | `NOT_STARTED`    | Retry                      |
| `JOB_DEAD_LETTER_ENABLED`     | Server/config | Recommended                      | `NOT_STARTED`    | DLQ                        |
| `SOFT_DELETE_RETENTION_DAYS`  | Server/config | Yes                              | `NOT_STARTED`    | 90-day rule if implemented |
| `ORPHAN_MEDIA_RETENTION_DAYS` | Server/config | Yes                              | `NOT_STARTED`    | Cleanup policy             |

### Verification Checklist

| Check                                     | Result    | Notes   |
| ----------------------------------------- | --------- | ------- |
| Cron provider selected                    | `BLOCKED` | Pending |
| Protected cron secret configured          | `NOT_RUN` | Pending |
| Midnight IST jobs scheduled               | `NOT_RUN` | Pending |
| Expired listing auto-pause works          | `NOT_RUN` | Pending |
| Soft delete purge tracked                 | `NOT_RUN` | Pending |
| Orphan media cleanup works                | `NOT_RUN` | Pending |
| Failed job retry works                    | `NOT_RUN` | Pending |
| Dead-letter queue works where implemented | `NOT_RUN` | Pending |
| Admin job status UI works                 | `NOT_RUN` | Pending |
| Logs redacted                             | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: no direct crash; dashboard may show stale/expired warning.
* Admin-facing error: cron failure alert.
* Retry behavior: retry queue and dead-letter where implemented.
* Feature state if failed: `DEGRADED` or `BLOCKED`.

### Security Requirements

* Cron endpoints protected.
* Cron secret server-only.
* Jobs idempotent.
* Logs redacted.
* Heavy jobs not run synchronously in user request.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-021 — Image / Video / PDF Processing Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Convert uploaded images to WebP/AVIF
* Generate image variants
* Remove EXIF
* Generate video thumbnails
* Compress videos
* Generate PDF preview/metadata if needed
* Process floor plans
* Create OG images if enabled

### Provider Options

* Server-side Sharp
* Cloudflare Images
* Cloudflare Workers
* Queue worker
* FFmpeg for video
* PDF library for preview/generation
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                    | Client/Server | Required                  | Status           | Notes                  |
| --------------------------- | ------------- | ------------------------- | ---------------- | ---------------------- |
| `MEDIA_PROCESSING_PROVIDER` | Server/config | Yes if processing enabled | `SETUP_REQUIRED` | Provider               |
| `IMAGE_VARIANTS_ENABLED`    | Server/config | Yes                       | `NOT_STARTED`    | WebP/AVIF              |
| `IMAGE_WEBP_ENABLED`        | Server/config | Recommended               | `NOT_STARTED`    | WebP                   |
| `IMAGE_AVIF_ENABLED`        | Server/config | Recommended               | `NOT_STARTED`    | AVIF                   |
| `IMAGE_EXIF_STRIP_ENABLED`  | Server/config | Yes                       | `NOT_STARTED`    | Privacy                |
| `VIDEO_PROCESSING_ENABLED`  | Server/config | If video enabled          | `NOT_STARTED`    | One video project rule |
| `PDF_PROCESSING_ENABLED`    | Server/config | If PDF preview/generation | `NOT_STARTED`    | PDF                    |

### Verification Checklist

| Check                          | Result    | Notes   |
| ------------------------------ | --------- | ------- |
| Image variant generation works | `NOT_RUN` | Pending |
| WebP works                     | `NOT_RUN` | Pending |
| AVIF works or fallback tracked | `NOT_RUN` | Pending |
| Original stored                | `NOT_RUN` | Pending |
| EXIF stripped                  | `NOT_RUN` | Pending |
| HEIC/HEIF fallback works       | `NOT_RUN` | Pending |
| SVG safety handled             | `NOT_RUN` | Pending |
| Video thumbnail works          | `NOT_RUN` | Pending |
| PDF processing safe            | `NOT_RUN` | Pending |
| Failed processing retry works  | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: original safe image or placeholder; setup-required for processing.
* Admin-facing error: processing job failure.
* Retry behavior: background job retry.
* Feature state if failed: upload may remain pending/processing failed; no fake processed URL.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-022 — Malware / File Scan Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Scan uploaded PDFs
* Scan private verification documents
* Scan support/report attachments
* Scan SVGs or sanitize/block unsafe SVG
* Block unsafe upload payloads

### Provider Options

* Internal validation/sanitization
* Antivirus scanning service
* Queue-based scanner
* Current selected provider: `NONE`

### Required Environment Variables

| Variable                    | Client/Server | Required          | Status           | Notes             |
| --------------------------- | ------------- | ----------------- | ---------------- | ----------------- |
| `FILE_SCAN_PROVIDER`        | Server/config | If scan enabled   | `SETUP_REQUIRED` | Provider          |
| `FILE_SCAN_API_KEY`         | Server-only   | Provider-specific | `SETUP_REQUIRED` | Never expose      |
| `FILE_SCAN_ENABLED`         | Server/config | Yes               | `NOT_STARTED`    | Feature toggle    |
| `SVG_SANITIZE_ENABLED`      | Server/config | Yes               | `NOT_STARTED`    | SVG safety        |
| `UPLOAD_QUARANTINE_ENABLED` | Server/config | Recommended       | `NOT_STARTED`    | Hold unsafe files |

### Verification Checklist

| Check                                   | Result    | Notes   |
| --------------------------------------- | --------- | ------- |
| Unsafe file blocked                     | `NOT_RUN` | Pending |
| PDF scan works                          | `NOT_RUN` | Pending |
| SVG safety works                        | `NOT_RUN` | Pending |
| Quarantine flow works                   | `NOT_RUN` | Pending |
| Private docs remain private during scan | `NOT_RUN` | Pending |
| Scan failures do not mark file safe     | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: upload pending review or failed safely.
* Admin-facing error: scan provider issue.
* Retry behavior: scan retry queue.
* Feature state if failed: do not publish unsafe file.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 18. PDF, Invoice And Export Providers

## API-023 — PDF Generation Provider / Library

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Invoice PDFs
* Property PDF export if enabled
* Project PDF export if enabled
* Requirement PDF export if enabled
* Admin report PDF export
* Printable detail pages

### Required Environment Variables

| Variable                         | Client/Server | Required        | Status           | Notes            |
| -------------------------------- | ------------- | --------------- | ---------------- | ---------------- |
| `PDF_PROVIDER`                   | Server/config | If PDFs enabled | `SETUP_REQUIRED` | Library/provider |
| `PDF_STORAGE_BUCKET`             | Server/config | If stored       | `SETUP_REQUIRED` | Usually R2       |
| `PDF_GENERATION_TIMEOUT_SECONDS` | Server/config | Recommended     | `NOT_STARTED`    | Avoid stuck jobs |

### Verification Checklist

| Check                                    | Result    | Notes   |
| ---------------------------------------- | --------- | ------- |
| Invoice PDF generation works             | `NOT_RUN` | Pending |
| PDF stored securely                      | `NOT_RUN` | Pending |
| PDF download permission works            | `NOT_RUN` | Pending |
| Failed PDF generation handled            | `NOT_RUN` | Pending |
| PDF does not include private hidden data | `NOT_RUN` | Pending |
| Admin report export permission works     | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: invoice visible in HTML or retry download.
* Admin-facing error: generation failure status.
* Feature state if failed: show failed PDF generation; no fake download.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

# 19. GeoIP, Search Console And Optional Providers

## API-024 — GeoIP / City Detection Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Detect user city for banner ads
* City-based homepage context
* Nearby city fallback
* Improve ad targeting

### Provider Options

* Cloudflare IP headers
* GeoIP database/provider
* Manual city selector fallback
* Current selected provider: `NONE`

### Required Environment Variables

| Variable             | Client/Server | Required          | Status           | Notes         |
| -------------------- | ------------- | ----------------- | ---------------- | ------------- |
| `GEOIP_PROVIDER`     | Server/config | Optional          | `SETUP_REQUIRED` | Provider      |
| `GEOIP_API_KEY`      | Server-only   | Provider-specific | `SETUP_REQUIRED` | Never expose  |
| `GEOIP_ENABLED`      | Server/config | Optional          | `NOT_STARTED`    | Toggle        |
| `GEOIP_DEFAULT_CITY` | Server/config | Recommended       | `NOT_STARTED`    | Fallback city |

### Verification Checklist

| Check                                        | Result    | Notes   |
| -------------------------------------------- | --------- | ------- |
| Manual city selector works without GeoIP     | `NOT_RUN` | Pending |
| GeoIP detects city if enabled                | `NOT_RUN` | Pending |
| User manual city override wins               | `NOT_RUN` | Pending |
| Ad targeting respects city                   | `NOT_RUN` | Pending |
| Nearby city fallback works where implemented | `NOT_RUN` | Pending |
| No private IP data overexposed               | `NOT_RUN` | Pending |

### Failure Behavior

* User-facing fallback: manual city selector.
* Admin-facing error: GeoIP setup-required.
* Feature state if failed: `FALLBACK_ACTIVE`.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-025 — Google Search Console / SEO Provider

### Current Status

* Status: `SETUP_REQUIRED`
* Mode: `NONE`
* Verification result: `NEEDS_PROVIDER_CHECK`

### Purpose

* Indexing issue monitoring
* Sitemap submission/checking
* SEO issue review
* Search performance reports

### Required Environment Variables

| Variable                   | Client/Server | Required | Status           | Notes                |
| -------------------------- | ------------- | -------- | ---------------- | -------------------- |
| `GSC_ENABLED`              | Server/config | Optional | `NOT_STARTED`    | Toggle               |
| `GSC_SITE_URL`             | Server/config | Optional | `SETUP_REQUIRED` | Verified property    |
| `GSC_SERVICE_ACCOUNT_JSON` | Server-only   | Optional | `SETUP_REQUIRED` | Never expose if used |

### Verification Checklist

| Check                                  | Result    | Notes   |
| -------------------------------------- | --------- | ------- |
| GSC property verified                  | `NOT_RUN` | Pending |
| Sitemap submitted                      | `NOT_RUN` | Pending |
| Indexing issues fetched if implemented | `NOT_RUN` | Pending |
| Admin SEO dashboard safe               | `NOT_RUN` | Pending |

### Failure Behavior

* SEO provider failure must not affect public website.
* Admin dashboard should show setup-required or provider unavailable.

### Production Readiness

* Final status: `SETUP_REQUIRED`

---

## API-026 — Web Push Provider

### Current Status

* Status: `DEFERRED_TRACKED`
* Mode: `NONE`
* Verification result: `NOT_RUN`

### Purpose

* Browser/PWA push notifications if enabled later.

### Required Environment Variables

| Variable                                | Client/Server      | Required   | Status           | Notes           |
| --------------------------------------- | ------------------ | ---------- | ---------------- | --------------- |
| `WEB_PUSH_ENABLED`                      | Server/config      | Optional   | `NOT_STARTED`    | Toggle          |
| `NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY` | Client-safe public | If enabled | `SETUP_REQUIRED` | Public key      |
| `WEB_PUSH_VAPID_PRIVATE_KEY`            | Server-only        | If enabled | `SETUP_REQUIRED` | Never expose    |
| `WEB_PUSH_SUBJECT`                      | Server/config      | If enabled | `SETUP_REQUIRED` | Contact subject |

### Verification Checklist

| Check                             | Result    | Notes    |
| --------------------------------- | --------- | -------- |
| User permission prompt safe       | `NOT_RUN` | Deferred |
| Push subscription stored safely   | `NOT_RUN` | Deferred |
| Push send works                   | `NOT_RUN` | Deferred |
| Unsubscribe works                 | `NOT_RUN` | Deferred |
| Quiet hours/preferences respected | `NOT_RUN` | Deferred |

### Production Readiness

* Final status: `DEFERRED_TRACKED`

---

# 20. Provider Settings Database Tracking

Provider settings must be tracked in database/admin where implemented.

Expected DB objects:

| Object                       | Purpose                                                 | Status        |
| ---------------------------- | ------------------------------------------------------- | ------------- |
| `provider_settings`          | Current provider configuration metadata without secrets | `NOT_STARTED` |
| `provider_setting_versions`  | Provider setting change history                         | `NOT_STARTED` |
| `provider_health_checks`     | Provider test results and health status                 | `NOT_STARTED` |
| `provider_alerts`            | Quota/cost/failure alerts                               | `NOT_STARTED` |
| `provider_errors`            | Safe mapped provider errors                             | `NOT_STARTED` |
| `notification_delivery_logs` | Email/SMS/WhatsApp/in-app delivery logs                 | `NOT_STARTED` |
| `sms_logs`                   | SMS send attempts                                       | `NOT_STARTED` |
| `email_logs`                 | Email send attempts                                     | `NOT_STARTED` |
| `whatsapp_logs`              | WhatsApp send attempts                                  | `NOT_STARTED` |
| `payment_webhook_events`     | Razorpay webhook events/idempotency                     | `NOT_STARTED` |
| `webhook_events`             | Generic webhook events                                  | `NOT_STARTED` |
| `dead_letters`               | Failed webhook/job events                               | `NOT_STARTED` |
| `media_assets`               | Media file metadata                                     | `NOT_STARTED` |
| `media_variants`             | Optimized image/video variants                          | `NOT_STARTED` |
| `media_processing_jobs`      | Media processing queue                                  | `NOT_STARTED` |
| `media_scan_results`         | File scan results                                       | `NOT_STARTED` |
| `cdn_purge_logs`             | CDN purge history                                       | `NOT_STARTED` |
| `signed_url_logs`            | Private signed URL access                               | `NOT_STARTED` |
| `usage_logs`                 | API/storage/provider usage                              | `NOT_STARTED` |
| `cost_logs`                  | Provider cost tracking                                  | `NOT_STARTED` |
| `security_events`            | Provider/security abuse events                          | `NOT_STARTED` |
| `audit_logs`                 | Provider config/action audit                            | `NOT_STARTED` |

Rules:

* Do not store raw secrets in `provider_settings`.
* Store only metadata, provider mode, status, last test result, masked key label, enabled/disabled state and timestamps.
* Secrets must live in environment/secret manager only.
* Every provider setting change must be audit logged.
* Super Admin controls sensitive provider settings.
* Staff/System Manager may view provider status only if permitted.
* Public users must never see internal provider errors or config.

---

# 21. Provider Health Status UI Rules

Admin/Super Admin provider status UI must show real state.

Required provider status fields:

* provider name
* provider mode
* status
* last checked time
* last check result
* last safe error code
* configured/missing env indication
* live/test/sandbox label
* feature flag state
* quota/cost warning if available
* fallback state
* linked affected features
* setup instructions link
* safe test button where allowed
* audit history link

Never show:

* raw API key
* secret key
* full token
* webhook secret
* private URL
* raw provider payload
* full user personal data
* fake active state
* fake successful test
* fake sent count
* fake delivery status

Provider UI result values:

| UI Label                 | Internal Meaning        |
| ------------------------ | ----------------------- |
| `Not configured`         | `SETUP_REQUIRED`        |
| `Configured, not tested` | `CONFIGURED_NOT_TESTED` |
| `Test mode`              | `TEST_MODE_ONLY`        |
| `Live ready`             | `LIVE_READY`            |
| `Active`                 | `ACTIVE`                |
| `Disabled`               | `DISABLED_BY_FLAG`      |
| `Fallback active`        | `FALLBACK_ACTIVE`       |
| `Failed`                 | `FAILED`                |
| `Blocked`                | `BLOCKED`               |
| `Needs review`           | `NEEDS_REVIEW`          |

---

# 22. Provider Feature Fallback Matrix

| Feature                       | Provider Needed                  | Missing Provider Behavior                                      | Fake Success Allowed |
| ----------------------------- | -------------------------------- | -------------------------------------------------------------- | -------------------- |
| Public login/register OTP     | OTP provider                     | `SETUP_REQUIRED` / auth unavailable / dev-only controlled mode | No                   |
| Admin/staff email login       | Supabase/email/Google            | setup-required or disabled                                     | No                   |
| Staff invite email            | Email                            | in-app/admin manual setup-required                             | No                   |
| SMS notifications             | SMS                              | in-app/email fallback if configured                            | No                   |
| WhatsApp share/contact        | WhatsApp free/API                | free link fallback or disabled                                 | No                   |
| WhatsApp API notifications    | WhatsApp API                     | in-app/email/SMS fallback if configured                        | No                   |
| Payment checkout              | Razorpay                         | payment unavailable/setup-required                             | No                   |
| Payment webhook               | Razorpay                         | plan remains pending/inactive                                  | No                   |
| Invoice email                 | Email                            | download available if PDF generated; email setup-required      | No                   |
| Map display                   | Google Maps                      | text address/location fallback                                 | No                   |
| Places autocomplete           | Google Maps API                  | manual location dropdown                                       | No                   |
| Property/project image upload | Cloudflare R2                    | upload disabled/setup-required                                 | No                   |
| Private document upload       | Cloudflare R2 private            | upload blocked/setup-required                                  | No                   |
| CDN image delivery            | Cloudflare CDN                   | direct safe URL or placeholder                                 | No                   |
| Image optimization            | Image processing                 | original safe image or processing setup-required               | No                   |
| PDF generation                | PDF provider/library             | HTML view or generation failed/setup-required                  | No                   |
| Banner ad display             | R2/CDN/payment/location          | show only approved/paid/active real ads                        | No                   |
| Analytics dashboard           | Analytics/provider/data tracking | empty/setup-required state                                     | No                   |
| Error tracking                | Sentry/monitoring                | local safe logs/admin setup-required                           | No                   |
| Turnstile bot protection      | Cloudflare Turnstile             | disabled by flag or setup-required                             | No                   |
| Cron expiry jobs              | Cron                             | manual/admin warning/status                                    | No                   |
| Web push                      | Web Push                         | disabled/deferred                                              | No                   |

---

# 23. Provider Production Readiness Checklist

Before production launch, each provider must be checked.

## 23.1 General Provider Checklist

| Check                                   | Required                |
| --------------------------------------- | ----------------------- |
| Provider selected                       | Yes if feature launched |
| Env variables added to `.env.example`   | Yes                     |
| Real secrets only in secure env         | Yes                     |
| No secrets in docs/chat/code/client     | Yes                     |
| Server-only secrets server-only         | Yes                     |
| Test mode disabled in production        | Yes                     |
| Mock/dev mode disabled in production    | Yes                     |
| Provider real test completed            | Yes                     |
| Failure fallback tested                 | Yes                     |
| Provider UI shows real status           | Yes                     |
| Audit log for config changes            | Yes                     |
| Cost/quota reviewed                     | Yes                     |
| Logs redacted                           | Yes                     |
| Rate limits added where needed          | Yes                     |
| Legal/privacy notice added where needed | Yes                     |
| Feature Registry updated                | Yes                     |
| Changelog updated                       | Yes                     |
| Manual Verification updated             | Yes                     |
| Bugs tracked if failed                  | Yes                     |

## 23.2 Production Launch Blocking Provider Issues

Production launch is blocked if:

* OTP dev mode is active
* Razorpay test mode is active for live billing
* payment webhook signature verification is missing
* failed/pending payment can activate subscription
* provider secrets are exposed to client
* service role key is exposed
* private documents use public bucket
* hidden contacts leak through API/provider/logs
* fake provider health says active
* fake email/SMS/WhatsApp sent status is shown
* R2/CDN not configured but upload UI claims success
* Maps missing but UI crashes
* analytics sends private data without consent
* error tracking logs OTP/tokens/private data
* production `.env.example` is outdated
* missing provider has no setup-required/fallback state
* provider failure crashes main website

---

# 24. Provider Testing Templates

## 24.1 Provider Test Entry Format

```md
## PROVIDER-TEST-YYYYMMDD-000 — Provider Name Test

### Provider
- Name:
- Feature:
- Mode:
- Environment:

### Test Date
- Date:
- Tested by:
- Branch/commit:
- App URL:

### Test Scope
- Success case:
- Failure case:
- Security case:
- Fallback case:

### Commands / Actions
1.
2.
3.

### Result
PASS / PARTIAL / FAIL / BLOCKED / NEEDS_PROVIDER_CHECK

### Evidence
- Safe screenshot:
- Safe log excerpt:
- Provider event ID redacted:
- Related route:

### Security Check
- Secrets exposed: Yes/No
- Logs redacted: Yes/No
- Client bundle safe: Yes/No
- Webhook verified: Yes/No/Not Applicable
- Rate limit checked: Yes/No/Not Applicable

### Docs Updated
- `API_PROVIDER_STATUS.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `MANUAL_VERIFICATION.md`
- `BUGS_AND_FIXES.md` if needed
- `brain.md`

### Pending Issues
-
```

---

## 24.2 Provider Failure Entry Format

```md
## PROVIDER-FAIL-YYYYMMDD-000 — Provider Name Failure

### Provider
- Name:
- Feature:
- Mode:
- Environment:

### Failure Summary
- What failed:
- User impact:
- Admin impact:
- Security impact:
- Payment impact:
- Data/privacy impact:

### Current Status
SETUP_REQUIRED / FAILED / BLOCKED / DEGRADED / FALLBACK_ACTIVE

### Fallback
- Fallback shown:
- Fake success blocked:
- User message:
- Admin message:

### Bug Tracking
- BUG ID:
- Severity:
- Priority:

### Required Fix
1.
2.
3.

### Docs Updated
-
```

---

# 25. `.env.example` Rules

Whenever provider/env changes happen, update `.env.example`.

`.env.example` must include:

* variable name
* blank/example placeholder
* short comment if needed
* no real secret
* no private URL
* no real API key
* no real token
* no service role value

Example safe format:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OTP Provider
OTP_PROVIDER=
OTP_API_KEY=
OTP_SENDER_ID=
OTP_TEMPLATE_ID=
OTP_DEV_MODE=false

# Razorpay
RAZORPAY_MODE=sandbox
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

Rules:

* Do not commit real `.env`.
* Do not paste real `.env` values in docs.
* If new env variable is added and `.env.example` is not updated, phase cannot be `PASS`.
* If provider uses client-side public key, ensure it is intentionally public and restricted where possible.
* If provider uses server-only secret, do not prefix with `NEXT_PUBLIC_`.

---

# 26. Provider Logs And Redaction Rules

Provider logs must never include:

* OTP
* password
* access token
* refresh token
* service role key
* API key
* webhook secret
* Razorpay secret
* WhatsApp token
* SMS key
* Email API key
* private document URL
* full signed URL
* full raw provider payload
* full request body with private data
* full phone number where not necessary
* full hidden contact list
* sensitive verification document data

Provider logs may include:

* safe provider name
* safe event type
* status
* redacted event ID
* redacted phone/email
* safe error code
* retry count
* timestamp
* user ID if internal/admin-safe and permission-protected
* related entity ID if internal/admin-safe

Redaction examples:

```txt
Phone: +91******4321
Email: u***@example.com
Payment ID: pay_****1234
Webhook Event: evt_****5678
```

---

# 27. Provider Audit Rules

Audit log required for:

* provider enabled
* provider disabled
* provider mode changed
* provider credentials rotated
* provider test run
* provider health status changed manually
* Razorpay webhook config changed
* OTP provider changed
* SMS/email/WhatsApp template changed
* Cloudflare bucket config changed
* CDN purge triggered manually
* Maps mode changed
* Turnstile enabled/disabled
* analytics provider enabled/disabled
* error tracking provider enabled/disabled
* payment manual activation
* failed provider override
* provider fallback forced
* production provider mode changed

Audit entry must include:

* actor
* role
* timestamp
* provider
* action
* previous status
* new status
* reason
* safe metadata
* no secrets

---

# 28. Provider Admin Permission Rules

Provider settings are sensitive.

### Super Admin

Can:

* view all provider status
* configure provider modes
* enable/disable providers
* rotate credentials
* test providers
* view provider health
* view cost/quota
* manage feature flags
* manage payment provider
* manage OTP/SMS/Email/WhatsApp/Maps/Cloudflare/Analytics/Error Tracking settings
* override provider status with audit

### System Manager

Can, if permitted:

* view provider health
* run safe test buttons
* view safe error messages
* view usage/quota summaries
* cannot view raw secrets

### Notification Manager

Can, if permitted:

* manage notification templates
* view delivery logs
* view safe delivery errors
* test notification channel if allowed
* cannot view raw secrets

### Payment Manager

Can, if permitted:

* view payment provider status
* view payment logs
* manage reconciliation/refunds where allowed
* cannot view raw Razorpay secret

### Billing Manager

Can, if permitted:

* view billing/payment state
* manage plans/manual billing where allowed
* cannot view provider secrets unless explicitly allowed by Super Admin

### Staff / Other Admin

Can:

* see setup-required or failed provider status only if needed for their workflow
* cannot view raw secrets
* cannot change provider settings unless permission granted

### Public Users

Can only see:

* graceful unavailable message
* setup-required style message only where appropriate
* no internal provider details
* no secrets
* no raw errors

---

# 29. Current Open Provider Issues

## PROVIDER-ISSUE-20260629-001 — Real Providers Not Configured Yet

### Status

`SETUP_REQUIRED`

### Providers Affected

* OTP
* SMS
* Email
* WhatsApp
* Razorpay
* Google Maps
* Cloudflare R2
* Cloudflare CDN
* Turnstile
* Analytics
* Error tracking
* Cron/background jobs
* Media processing
* File scan
* PDF generation
* GeoIP
* Search Console

### Impact

* Provider-backed features cannot be production-ready yet.
* Features must show setup-required/fallback state.
* No fake provider success allowed.
* Payment cannot activate subscriptions until Razorpay/webhook verified.
* Upload cannot claim success until storage configured.
* OTP login cannot be real until OTP provider configured.
* External notifications cannot claim sent until provider configured/tested.

### Required Action

1. Finish documentation pack.
2. Generate prompt pack.
3. Implement core app and Supabase foundation.
4. Add provider settings/admin status system.
5. Configure providers one by one.
6. Update `.env.example`.
7. Test success and failure states.
8. Update this file after each provider verification.

### Related Bug

* `BUG-20260629-003`

### Verification

* Result: `NEEDS_PROVIDER_CHECK`

---

## PROVIDER-ISSUE-20260629-002 — `.env.example` Not Created/Updated Yet

### Status

`NOT_STARTED`

### Impact

* Provider env variables are documented here but not implemented yet.
* Claude must update `.env.example` during implementation phases.

### Required Action

* Create/update `.env.example` during provider/code phases.
* Never include real secrets.

### Verification

* Result: `NOT_RUN`

---

## PROVIDER-ISSUE-20260629-003 — Production Provider Modes Not Verified

### Status

`NOT_STARTED`

### Impact

* Production readiness cannot pass.
* Dev/test/mock provider states must be disabled before production launch.

### Required Action

* During final production phase, verify:

  * OTP live mode
  * Razorpay live mode
  * Email/SMS/WhatsApp live mode if launched
  * R2/CDN real storage
  * Maps real/restricted key
  * Analytics consent-safe
  * Error tracking redacted
  * Turnstile enabled/disabled intentionally
  * Cron jobs protected

### Verification

* Result: `NOT_RUN`

---

# 30. Provider Readiness By Phase

| Phase                                   | Provider Work                                                           | Required Status Before PASS                                                            |
| --------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Phase 01 — Project Setup                | `.env.example` baseline, safe env structure                             | `PARTIAL` allowed if no provider active                                                |
| Phase 02 — Auth Roles RLS               | Supabase Auth/DB/RLS baseline, OTP setup-required                       | Supabase core should work or be blocked; OTP `SETUP_REQUIRED` acceptable if documented |
| Phase 03 — Public UI                    | Provider-backed CTAs safe states                                        | No fake provider action                                                                |
| Phase 04 — Property/Project/Requirement | Media setup-required or R2 implemented; maps setup-required or fallback | No fake upload/map                                                                     |
| Phase 05 — Search/Detail/SEO            | Maps/analytics setup-required or fallback                               | No fake counts/maps                                                                    |
| Phase 06 — Dashboards                   | Analytics/notifications real or empty/setup-required                    | No fake charts                                                                         |
| Phase 07 — Admin                        | Provider status UI/admin permission                                     | Provider secrets protected                                                             |
| Phase 08 — Leads/Messaging              | Notifications/WhatsApp/SMS/Email setup-required or real                 | No fake sent                                                                           |
| Phase 09 — Billing/Payment              | Razorpay setup and webhook verification                                 | Cannot PASS payment without verified states or explicit setup-required scope           |
| Phase 10 — Media/R2/CDN                 | R2/CDN real or setup-required                                           | No fake upload/CDN                                                                     |
| Phase 11 — SEO/CMS/Legal                | Analytics/GSC optional/setup-required                                   | No private tracking without consent                                                    |
| Phase 12 — Ads/Notifications/Providers  | Provider status and notification providers                              | Real or setup-required with safe fallback                                              |
| Phase 13 — Security/Privacy/Fraud       | Turnstile/rate limits/provider log redaction                            | Security provider checks required                                                      |
| Phase 14 — Performance/Deployment       | Cron/monitoring/provider health                                         | Setup/monitoring documented                                                            |
| Phase 15 — Production API Testing       | All launched providers live-tested                                      | PASS only after real production checks or approved setup-required exclusions           |

---

# 31. Provider Final Response Rule

Whenever Claude changes provider/API code/config, final response must include:

```md
## Provider / API Status
- Provider changed:
- Status:
- Mode:
- Verification result:

## Changed Files
- path/to/file

## Env / Config
- `.env.example` updated: Yes/No
- New env variables:
- Real secrets exposed: No

## SQL / Migration Files
- path/to/migration.sql
- None

## Tests Run
- command:
- result:

## Provider Verification
- success case:
- failure case:
- fallback:
- fake success blocked:

## Docs Updated
- `API_PROVIDER_STATUS.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `MANUAL_VERIFICATION.md`
- `BUGS_AND_FIXES.md` if needed
- `brain.md`

## Pending Issues
- issue or None

## Next Phase
-
```

If provider verification is not fully passed, do not say `PASS`.

---

# 32. Provider Documentation Update Checklist

Before completing any provider-related phase, Claude must check:

* [ ] Provider selected or marked `SETUP_REQUIRED`.
* [ ] Provider mode documented.
* [ ] `.env.example` updated if env changed.
* [ ] No real secrets written in docs.
* [ ] Server-only secrets not exposed to client.
* [ ] Feature flag/setup-required state implemented if incomplete.
* [ ] Success case tested or documented as not run.
* [ ] Failure case tested or documented as not run.
* [ ] Fallback tested or documented as not run.
* [ ] Fake success blocked.
* [ ] Safe user-facing error exists.
* [ ] Admin-facing safe provider status exists where relevant.
* [ ] Logs redacted.
* [ ] Rate limits added where needed.
* [ ] Webhook signature verified where needed.
* [ ] Idempotency added for payment/webhooks/jobs.
* [ ] Audit log added for provider setting changes.
* [ ] Feature Registry updated.
* [ ] Changelog updated.
* [ ] Manual Verification updated.
* [ ] Bugs/Fixes updated if provider issue exists.
* [ ] brain.md updated with current provider status.
* [ ] Production mode checked if production phase.
* [ ] Pending issues listed honestly.

If any required item is missing, provider phase cannot be `PASS`.

---

# 33. Current Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Created |
|        6 | `MANUAL_VERIFICATION.md`                                  | Created |
|        7 | `API_PROVIDER_STATUS.md`                                  | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Pending |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Pending |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Pending |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Pending |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Pending |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Pending |
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

# 34. Current Provider Status Summary For `brain.md`

Use this summary in `brain.md` after copying this file:

```md
## Current Provider Status

- Supabase Auth/DB/RLS: NOT_STARTED
- OTP provider: SETUP_REQUIRED
- SMS provider: SETUP_REQUIRED
- Email provider: SETUP_REQUIRED
- WhatsApp free/API: SETUP_REQUIRED
- Razorpay: SETUP_REQUIRED
- Razorpay webhook verification: SETUP_REQUIRED
- Google Maps Embed/API: SETUP_REQUIRED
- Cloudflare R2: SETUP_REQUIRED
- Cloudflare CDN: SETUP_REQUIRED
- Cloudflare Turnstile: DISABLED_BY_FLAG planned
- Analytics: SETUP_REQUIRED
- Error tracking: SETUP_REQUIRED
- Monitoring: SETUP_REQUIRED
- Cron/background jobs: SETUP_REQUIRED
- Media processing: SETUP_REQUIRED
- File scan: SETUP_REQUIRED
- PDF generation: SETUP_REQUIRED
- GeoIP: SETUP_REQUIRED
- Web Push: DEFERRED_TRACKED
- Google Search Console: SETUP_REQUIRED

Main rule: no provider-backed feature can fake success. Missing provider must show setup-required, disabled, blocked or fallback state.
```

---

## Prompt 05 Update — Public Search, Detail Pages, Profiles And SEO [2026-07-01]

- Supabase Database/RLS: unchanged (`public_properties_view`, `public_projects_view`, `public_requirements_view`, `public_broker_profiles_view`, `public_builder_profiles_view` — all from Prompt 04/02). One view fix applied: `public_properties_view` now includes `description` (see `BUGS_AND_FIXES.md` BUG-20260701-SEARCH-001).
- Media/Cloudflare R2/CDN: still `SETUP_REQUIRED` — detail/search pages show a neutral "photos not added yet" placeholder, never a fake image.
- Maps/GeoIP: still `SETUP_REQUIRED` — no map toggle built this phase (deferred to Prompt 11 per phase scope).
- Analytics/Google Search Console: still `SETUP_REQUIRED` — no analytics SDK loaded on public pages.
- Contact reveal/leads provider: still `NOT_STARTED` — detail-page CTAs are auth-gated placeholders only (real lead/contact-reveal backend is Prompt 08).

No provider status changed to `ACTIVE`/`CONFIGURED` in this phase — this phase only consumed existing Supabase views.

### Manual Verification Confirmation [2026-07-01]
Re-confirmed during Prompt 05 manual verification: no provider claims changed. Media/Maps/Analytics/Contact-reveal remain `SETUP_REQUIRED`/`NOT_STARTED` exactly as above — verification did not introduce any new provider-backed feature.

---

## Prompt 06 Update — Owner, Broker And Builder Dashboards [2026-07-01]

- Notifications: `NOT_STARTED` (no `notifications` table; dashboard bell shows honest empty state, not a fake unread count)
- Billing/Razorpay: `NOT_STARTED` (dashboard billing pages show `SETUP_REQUIRED`, link to public `/pricing`, no fake plan/invoice)
- Support/email provider: `NOT_STARTED` (Support nav links to the existing public `/support` page; no ticket system yet)
- Analytics: `SETUP_REQUIRED` (unchanged — no analytics SDK loaded on any dashboard page)
- Media/R2: `SETUP_REQUIRED` (unchanged — no media touched this phase)

No provider marked active without a real test, per standing rule.

---

# 35. Final Rule

Provider-backed features are only complete when the provider is real, configured, tested, secure, documented and verified.

If a provider is missing, show `SETUP_REQUIRED`.

If a provider fails, show safe fallback or `FAILED`.

If provider testing is not done, mark `NEEDS_PROVIDER_CHECK`.

Never fake success.

Never expose secrets.

Never activate payments, plans, uploads, notifications, maps, OTP, analytics or provider health without real verification.

## Prompt 08 Verification (Formal Pass) [2026-07-02]

Confirmed honest provider states — no fake delivery anywhere in communication code:
- In-app notifications (DB `notifications` table): ACTIVE (real DB-backed events via `createNotification`).
- Email / SMS / WhatsApp / Push delivery: SETUP_REQUIRED — no external send is triggered or claimed by any Prompt 08 action.
- Message attachments / Media (R2/CDN): SETUP_REQUIRED (Prompt 10/12) — UI shows honest disabled/setup state, no `message_attachments` table, no fake upload success.
- Calendar / reminder provider (site visits): SETUP_REQUIRED — site-visit reminders not sent; only DB status + in-app notification.
- Realtime provider (messaging): NOT_STARTED — messages are request/refresh, no fake typing/online status.
- Supabase Database/RLS: ACTIVE — 15 comm tables RLS-verified.

No provider marked active without real backing. No hidden contact in any provider payload.

## Prompt 09 — Billing / Payment Providers [2026-07-02]

- **Razorpay (payments):** TEST_MODE — test keys configured in `.env.local` (`RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET`, secret server-only; `NEXT_PUBLIC_RAZORPAY_KEY_ID` for client checkout). `RAZORPAY_MODE=test`. Order creation via REST implemented. Not ACTIVE (no live keys, no production go-live).
- **Razorpay Webhook:** SETUP_REQUIRED — `RAZORPAY_WEBHOOK_SECRET` is intentionally EMPTY until a webhook is configured in the Razorpay dashboard. The endpoint `/api/webhooks/razorpay` returns HTTP 503 `RAZORPAY_WEBHOOK_SETUP_REQUIRED` until the secret is set. Signature verification (HMAC-SHA256 over raw body) + idempotency (unique provider_event_id) are implemented and ready. **Because activation is webhook-only, subscriptions do not auto-activate until this secret is set + a real test webhook is delivered.**
- **PDF invoice generation:** NOT_STARTED — invoices are real DB records with GST breakdown + sequential number; PDF/print download is a later phase (UI states this honestly).
- **Email invoice delivery:** SETUP_REQUIRED — no email provider configured; `gst_profiles.invoice_email` captured but nothing is sent.
- **GST validation provider:** NOT_STARTED — GSTIN is format-validated only; no government verification claimed.
- **Cron / expiry jobs (trial/grace/subscription expiry):** SETUP_REQUIRED — statuses + dates stored; no scheduled expiry job yet.
- **Supabase Database/RLS:** migration `20260702100000_billing_payment_subscription_trial_gst.sql` written; **NOT yet applied to the remote project** (apply blocked pending owner approval). App degrades to honest SETUP_REQUIRED states until applied.

No provider marked active without a real test. No fake payment/invoice/GST/webhook.

### [2026-07-02] Update — migration applied + webhook secret set
- **Supabase Database/RLS:** migration `20260702100000` APPLIED to remote. 19 billing tables live, RLS on all, plans seeded, invoice fn working.
- **Razorpay Webhook:** secret now SET in `.env.local`; endpoint no longer 503. Live-verified: bad sig → 400, valid sig → processed idempotently. Still needs a public URL + matching dashboard webhook for real Razorpay delivery (localhost can't receive). Status: CONFIGURED (local), pending real dashboard webhook.

---

### Prompt 02 Design Alignment [2026-07-04]
No provider change. OTP remains `dev_mock` / `SETUP_REQUIRED` (real SMS provider still deferred). Auth UI now shows the design's honest states: SMS-OTP-unavailable → "SMS OTP is temporarily unavailable…" (no fake sent); "Too many attempts / try again in 15 minutes" full-stop. Resend cooldown + remaining-attempt counter are UI affordances; real server-side rate-limit/lockout stays deferred to Prompt 13.

---

## Prompt 03 [2026-07-04] — Public UI provider notes
- Cloudflare R2 / media: `SETUP_REQUIRED` — homepage featured cards show honest "photo/render coming soon" placeholders (no fake images). Real photos land in Prompt 10.
- Location/city: static in-app city list (no maps API, no fake IP detection). Full Gujarat hierarchy + provider = Prompt 11. No provider marked ACTIVE.
- Auth (OTP): unchanged (DEV_ONLY dev_mock); homepage role-band CTAs open the existing auth popup, no fake success.
- No new provider integrations added in Prompt 03 (UI-only phase).
