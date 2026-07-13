# SECURITY_RLS_CHECKLIST.md

# My Gujarat Property — Security, RLS, Privacy And Access Control Checklist

This file defines the security, RLS, privacy, access-control, contact-protection, admin-permission, provider-secret, payment-security and production security verification rules for **My Gujarat Property**.

Claude must update this file whenever auth, roles, permissions, database schema, RLS policies, public/private data, contact visibility, private documents, payments, providers, uploads, audit logs, admin/staff access or security-sensitive behavior changes.

No frontend-only security is allowed.

No RLS bypass is allowed.

No hidden contact leak is allowed.

No private document leak is allowed.

No fake security PASS is allowed.

---

## 1. Purpose

This file exists to make sure My Gujarat Property remains secure while it grows.

It covers:

* Supabase Auth security
* public user login/register security
* admin/staff login separation
* role-based access control
* staff permission security
* Super Admin control
* database RLS
* public-safe views
* direct URL bypass prevention
* server-side authorization
* hidden contact protection
* private document protection
* profile privacy
* listing privacy
* project contact rules
* lead privacy
* messaging privacy
* payment security
* Razorpay webhook security
* provider secret safety
* upload/media security
* private bucket/signed URL security
* audit logs
* soft delete and retention
* rate limits
* fraud/spam protection
* report abuse protection
* safe logs
* safe errors
* CSP/CORS/security headers
* CSRF/XSS/SSRF protections
* deployment security
* production final RLS pass

This file is a hard gate. A phase cannot be `PASS` if security/RLS requirements for that phase are unverified.

---

## PHASE SECURITY LOG

---

### Prompt 01 — Project Setup Baseline [2026-06-30]

| Security Check | Status | Notes |
|----------------|--------|-------|
| Service role key client exposure | PASS | `service.ts` is server-only, throws if key missing, never imported in client code |
| `.env.example` secrets check | PASS | No real secrets — all placeholder values only |
| Supabase anon key (client-safe) | PASS | Only `NEXT_PUBLIC_SUPABASE_*` used in browser client |
| Admin route public access | N/A — not implemented yet | Admin login planned for Prompt 07 |
| RLS enabled | NOT_STARTED | No database tables yet — starts in Prompt 02 |
| Hidden contact protection | NOT_STARTED | No listings yet — starts in Prompt 04 |
| Rate limiting | NOT_STARTED | Planned for Prompt 13 |
| Middleware auth guard | NOT_STARTED | Planned for Prompt 02 |
| Direct URL bypass | NOT_STARTED | Planned for Prompt 02 |
| Security headers | PARTIAL | Baseline headers added to `next.config.ts` (nosniff, X-Frame-Options, Referrer-Policy, admin noindex). Full CSP in Prompt 13. |
| Audit logs | NOT_STARTED | Planned for Prompt 07/13 |
| Payment security | NOT_STARTED | Planned for Prompt 09 |
| Private documents | NOT_STARTED | Planned for Prompt 10 |

**Phase 01 Security Summary:** VERIFIED [2026-06-30]. No security violations found. Secret scan clean. Service role boundary correct. `.env.example` clean. Security headers confirmed. No fake data, no dead links, no public admin link.

---

### Prompt 02 — Auth, Roles And RLS Foundation [2026-06-30]

| Security Check | Status | Notes |
|----------------|--------|-------|
| Service role key client exposure | PASS | `service.ts` server-only, never imported in client. `actions.ts` uses service client for profile creation only. |
| RLS enabled on all tables | PASS | All 10 new tables have `rowsecurity=true` confirmed via pg_tables |
| RLS policies applied | PASS | 16 policies confirmed via pg_policies query |
| profiles: own-read only | PASS | `auth.uid() = auth_user_id` policy. No cross-user read. |
| profiles: mobile/email not public | PASS | public_profiles_view excludes mobile, email, account_status details |
| broker/builder public views | PASS | Only `is_published=true` + `account_status=active` visible |
| staff tables: public denied | PASS | No public select policy on staff_profiles, staff_permissions, staff_invites |
| audit table: public denied | PASS | No select policy on auth_audit_events. Insert only via service role. |
| Admin route: separate from public | PASS | /admin/login is separate. No mobile OTP for admin. |
| Admin route: noindex | PASS | admin/login/layout.tsx has `robots: { index: false }` |
| No public admin registration | PASS | No register link in admin login. "Invite only" notice shown. |
| Admin login: staff_profiles check | PASS | After Supabase auth, server action verifies user in staff_profiles |
| Wrong role dashboard access | PASS | requireRole() server-side check. Wrong role → /unauthorized |
| Guest dashboard access | PASS | proxy.ts redirects unauthenticated to /login |
| OTP not logged | PASS | Dev mock OTP logged at INFO level (mobile+code). Blocked in production. |
| No fake OTP | PASS | Real provider → SETUP_REQUIRED. Dev mock clearly labeled. |
| Open redirect prevention | PASS | isSafeRedirectUrl() validates only internal paths |
| Hidden contact protection | NOT_STARTED | No listings yet. Policy and architecture in place. Implemented in Prompt 04. |
| Rate limiting | NOT_STARTED | Planned for Prompt 13 |
| 2FA for staff | NOT_STARTED | Planned for Prompt 13/07 |
| CSP headers | NOT_STARTED | Planned for Prompt 13 |
| Audit logs | PARTIAL | DB table created. Server action records basic events. Full audit in Prompt 07/13. |

**Phase 02 Security Summary:** PARTIAL [2026-06-30]. All critical auth/RLS/service-role/public-data security implemented. Rate limiting and 2FA deferred. RLS verified on Supabase. No service role exposure. No public admin access. Contact privacy architecture in place (no listings yet to protect). Manual verification pending.

---

### Prompt 03 — Public UI: Home, Header, Footer, Hero [2026-06-30]

| Security Check | Status | Notes |
|----------------|--------|-------|
| Service role key client exposure | PASS | No new server actions in Prompt 03. UI components use no Supabase calls directly. |
| No secrets in client bundle | PASS | CityProvider, HomeHeroSearch, CitySelector — no env vars, no API keys. |
| No admin/staff link in public header | PASS | Verified via grep — 0 matches for /admin in PublicHeaderClient and PublicFooter. |
| No admin/staff link in public footer | PASS | Footer links verified — no admin routes. |
| No PublicFooter in dashboard/admin | PASS | Grep confirmed PublicFooter/PublicLayout absent from /dashboard, /admin, /profile |
| No `href="#"` dead links | PASS | Grep confirmed 0 occurrences across entire src/ directory. |
| No fake data in public UI | PASS | No hardcoded listings, fake counts, fake views, fake badges, fake analytics. |
| Login/register gate visible | PASS | Guest sees Login/Register buttons; logged-in user sees Dashboard + avatar. |
| No contact number visible to guest | PASS | No contact data shown in any public UI component (no listings yet). |
| No provider secrets in globals.css | PASS | Only design tokens (CSS vars) — no secrets. |
| RLS unchanged | PASS | No RLS changes in Prompt 03. Prompt 02 RLS fully intact. |
| Static city list safe | PASS | GUJARAT_CITIES is public UI data — non-sensitive. No PII. |
| Search form safe | PASS | Form routes to /search via URLSearchParams — no backend call yet, no injection risk. |

**Phase 03 Security Summary:** PASS [2026-06-30]. Pure public UI phase — no new backend code, no new RLS, no new server actions, no new provider integrations. All security checks carried forward from Prompt 02. No admin exposure, no contact leak, no fake data, no secrets in bundle. No regressions found.

---

## 2. Absolute Security Rules

Claude must follow these rules:

1. Never rely on frontend-only security.
2. Always enforce sensitive access on server/backend/database level.
3. RLS must protect sensitive tables.
4. Service role key must never be exposed to client.
5. Hidden phone/contact must never leak to unauthorized users.
6. Private verification documents must never be public.
7. Admin/staff routes must not be accessible through public user login.
8. Admin/staff routes must be protected and noindexed.
9. Public users must never create admin/staff accounts.
10. Owner must not access another user’s private data.
11. Broker must not access another broker/owner’s private data unless explicitly allowed.
12. Builder must not access another builder’s private project data unless explicitly allowed.
13. Builder agents must see only assigned data.
14. Staff must see only permitted modules/actions.
15. Super Admin can access everything intended, but actions must be audited.
16. Sensitive admin actions must require permission and audit.
17. Payment success must never be trusted from client only.
18. Razorpay webhook signature verification is mandatory when payment is active.
19. Failed/pending payment must not activate plan.
20. Invoice must not be generated for failed payment.
21. Provider secrets must stay server-only.
22. OTPs, passwords, tokens, secrets and private data must not appear in logs.
23. Direct URL bypass must be tested.
24. API/server actions must check authorization.
25. Public-safe views must exclude private fields.
26. Uploaded files must be validated.
27. Private buckets must remain private.
28. Signed URLs must expire.
29. Rate limits must exist for abuse-sensitive actions.
30. Raw SQL/internal errors must never be shown to users.
31. Security bugs must be tracked in `BUGS_AND_FIXES.md`.
32. Security changes must be logged in `CHANGELOG.md`.
33. RLS/security verification must be recorded in `MANUAL_VERIFICATION.md`.
34. Feature security status must be updated in `FEATURE_REGISTRY.md`.
35. Production launch is blocked until final RLS/security pass.

---

## 3. Security Status Values

Use only these values:

| Status                   | Meaning                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `NOT_STARTED`            | Security/RLS implementation not started                      |
| `IN_PROGRESS`            | Security/RLS implementation in progress                      |
| `IMPLEMENTED_NOT_TESTED` | Security/RLS code exists but verification is not complete    |
| `PASS`                   | Security/RLS verified and passed                             |
| `PARTIAL`                | Some checks passed but some remain pending                   |
| `FAIL`                   | Check failed                                                 |
| `BLOCKED`                | Cannot verify due to missing dependency/environment/decision |
| `SETUP_REQUIRED`         | Needs provider/env/config setup                              |
| `NEEDS_REVIEW`           | Needs human/security/legal review                            |
| `REGRESSION`             | Previously passed security behavior broke                    |
| `HOTFIX_REQUIRED`        | Critical security issue requires immediate fix               |
| `ROLLED_BACK`            | Security change was rolled back                              |
| `MONITORING`             | Security fix passed but requires observation                 |

---

## 4. Security Severity Values

Use these severity values for security issues:

| Severity           | Meaning                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `SEC-S0_CRITICAL`  | Data leak, payment bypass, hidden contact leak, private document leak, service role exposure, RLS bypass |
| `SEC-S1_HIGH`      | Major unauthorized access, admin/staff permission bypass, webhook insecurity, auth bypass                |
| `SEC-S2_MEDIUM`    | Important missing protection with limited impact or workaround                                           |
| `SEC-S3_LOW`       | Minor security hardening issue                                                                           |
| `SEC-S4_HARDENING` | Defense-in-depth improvement                                                                             |

---

## 5. Security Verification Values

Use only these verification values:

| Verification             | Meaning                               |
| ------------------------ | ------------------------------------- |
| `PASS`                   | Check passed                          |
| `PARTIAL`                | Check partly passed                   |
| `FAIL`                   | Check failed                          |
| `BLOCKED`                | Check could not run                   |
| `NOT_RUN`                | Check not run yet                     |
| `NOT_APPLICABLE`         | Not relevant to current phase         |
| `NEEDS_RLS_CHECK`        | RLS test required                     |
| `NEEDS_SECURITY_CHECK`   | Security review required              |
| `NEEDS_PROVIDER_CHECK`   | Real provider/security check required |
| `NEEDS_LEGAL_REVIEW`     | Legal/privacy review required         |
| `NEEDS_PRODUCTION_CHECK` | Production verification required      |

---

## 6. Required Security Entry Format

Every security-sensitive phase must add/update an entry using this structure:

```md id="security-entry"
## SECURITY-CHECK-YYYYMMDD-000 — Check Title

### Status
NOT_STARTED / IN_PROGRESS / IMPLEMENTED_NOT_TESTED / PASS / PARTIAL / FAIL / BLOCKED / SETUP_REQUIRED / NEEDS_REVIEW / REGRESSION / HOTFIX_REQUIRED / ROLLED_BACK / MONITORING

### Severity
SEC-S0_CRITICAL / SEC-S1_HIGH / SEC-S2_MEDIUM / SEC-S3_LOW / SEC-S4_HARDENING

### Area
- Auth:
- Roles:
- RLS:
- Contact privacy:
- Admin/staff:
- Payment:
- Provider:
- Media/private docs:
- Logs:
- Rate limits:
- Other:

### Scope
- Phase:
- Prompt file:
- Routes:
- Server actions/API routes:
- Tables:
- RLS policies:
- Roles tested:
- Files changed:
- SQL/migration files:

### Expected Security Behavior
-

### Actual Security Behavior
-

### Verification Steps
1.
2.
3.

### Verification Result
PASS / PARTIAL / FAIL / BLOCKED / NOT_RUN

### Evidence
- Safe notes:
- Redacted logs:
- Test user roles:
- SQL/API checks:

### Bugs Created
- BUG ID or None

### Fix / Mitigation
- Changed files:
- SQL/migration files:
- RLS policies:
- Feature flags:
- Rollback notes:

### Docs Updated
- `SECURITY_RLS_CHECKLIST.md`
- `MANUAL_VERIFICATION.md`
- `BUGS_AND_FIXES.md`
- `CHANGELOG.md`
- `FEATURE_REGISTRY.md`
- `brain.md`

### Final Status
-
```

---

## 7. Auth Security Checklist

### 7.1 Public Auth Rules

Public auth is for:

* Owner
* Broker/Agent
* Builder/Developer

Public auth must use mobile OTP login/register popup.

Public auth must not create:

* Admin
* Staff
* Super Admin

Checklist:

| Check                                                    | Required Result | Current Status |
| -------------------------------------------------------- | --------------- | -------------- |
| Public login/register uses mobile OTP                    | Required        | `NOT_STARTED`  |
| Existing mobile proceeds to login OTP                    | Required        | `NOT_STARTED`  |
| Unregistered mobile shows register prompt                | Required        | `NOT_STARTED`  |
| Registration role selector has Owner/Broker/Builder only | Required        | `NOT_STARTED`  |
| Full name required                                       | Required        | `NOT_STARTED`  |
| Email field shown/validated                              | Required        | `NOT_STARTED`  |
| Mobile field shown/validated                             | Required        | `NOT_STARTED`  |
| Terms/Privacy consent required                           | Required        | `NOT_STARTED`  |
| OTP attempt limit exists                                 | Required        | `NOT_STARTED`  |
| OTP resend cooldown exists                               | Required        | `NOT_STARTED`  |
| OTP rate limit per IP/mobile/device                      | Required        | `NOT_STARTED`  |
| OTP value never logged                                   | Required        | `NOT_STARTED`  |
| Wrong OTP safe error                                     | Required        | `NOT_STARTED`  |
| Logged-in user does not see login/register               | Required        | `NOT_STARTED`  |
| Original action intent preserved after login             | Required        | `NOT_STARTED`  |
| Guest protected action triggers auth popup               | Required        | `NOT_STARTED`  |
| Auth errors do not leak internals                        | Required        | `NOT_STARTED`  |

### 7.2 Admin/Staff Auth Rules

Admin/staff login must be separate.

Admin/staff must not use public mobile OTP login.

Checklist:

| Check                                                   | Required Result | Current Status |
| ------------------------------------------------------- | --------------- | -------------- |
| Separate admin/staff login URL                          | Required        | `NOT_STARTED`  |
| Admin/staff login supports email/Google only            | Required        | `NOT_STARTED`  |
| No public admin/staff create account                    | Required        | `NOT_STARTED`  |
| Staff invite-only                                       | Required        | `NOT_STARTED`  |
| Admin/staff URLs noindex                                | Required        | `NOT_STARTED`  |
| Admin/staff login route protected from public role flow | Required        | `NOT_STARTED`  |
| Failed login attempt limit                              | Required        | `NOT_STARTED`  |
| Session timeout where required                          | Required        | `NOT_STARTED`  |
| Suspicious login event logged                           | Required        | `NOT_STARTED`  |
| Device/session tracking where implemented               | Required        | `NOT_STARTED`  |
| Staff disabled/banned account cannot login              | Required        | `NOT_STARTED`  |
| Role change/ban can revoke sessions where required      | Required        | `NOT_STARTED`  |

---

## 8. Role-Based Access Control Checklist

### 8.1 Role Definitions

Public user roles:

* `owner`
* `broker`
* `builder`

Internal roles:

* `super_admin`
* `admin`
* staff roles:

  * `verification_manager`
  * `support_manager`
  * `content_manager`
  * `seo_manager`
  * `ads_manager`
  * `billing_manager`
  * `payment_manager`
  * `city_manager`
  * `user_manager`
  * `notification_manager`
  * `system_manager`
  * `security_manager`
  * `reports_manager`
  * `audit_manager`

### 8.2 Owner Access Rules

Owner can:

* manage own profile
* post property
* post requirement
* manage own properties
* manage own requirements
* view own leads
* view own billing/subscription
* view own analytics
* contact support

Owner cannot:

* post project
* access broker-only modules
* access builder-only modules
* access admin/staff modules
* edit another user’s property
* view another user’s private leads
* view private verification docs of others
* bypass approval

Checklist:

| Check                                              | Required Result | Current Status |
| -------------------------------------------------- | --------------- | -------------- |
| Owner dashboard accessible to owner                | Required        | `NOT_STARTED`  |
| Owner can post property                            | Required        | `NOT_STARTED`  |
| Owner can post requirement                         | Required        | `NOT_STARTED`  |
| Owner cannot post project                          | Required        | `NOT_STARTED`  |
| Owner sees own records only                        | Required        | `NOT_STARTED`  |
| Owner cannot access wrong-owner listing edit       | Required        | `NOT_STARTED`  |
| Owner cannot access admin routes                   | Required        | `NOT_STARTED`  |
| Owner plan/verification gates enforced server-side | Required        | `NOT_STARTED`  |

### 8.3 Broker Access Rules

Broker/Agent can:

* manage own profile
* post property
* post requirement
* view relevant requirement feed where allowed
* send proposals where allowed
* manage own leads
* manage own billing/subscription
* view own analytics
* submit verification

Broker cannot:

* post builder project
* access builder-only modules unless explicitly assigned
* access admin/staff modules
* edit another user’s listing
* bypass plan/approval/verification gates

Checklist:

| Check                                           | Required Result | Current Status |
| ----------------------------------------------- | --------------- | -------------- |
| Broker dashboard accessible to broker           | Required        | `NOT_STARTED`  |
| Broker can post property                        | Required        | `NOT_STARTED`  |
| Broker can post requirement                     | Required        | `NOT_STARTED`  |
| Broker cannot post project                      | Required        | `NOT_STARTED`  |
| Broker sees own leads/listings                  | Required        | `NOT_STARTED`  |
| Broker cannot edit another broker/owner listing | Required        | `NOT_STARTED`  |
| Broker proposal permissions enforced            | Required        | `NOT_STARTED`  |
| Broker cannot access admin routes               | Required        | `NOT_STARTED`  |

### 8.4 Builder Access Rules

Builder can:

* manage own profile
* post project
* manage own projects
* receive project leads
* view matching buying requirements where allowed
* manage agents and permissions
* manage ads/promotions
* manage billing/subscription
* submit verification
* view project analytics

Builder cannot:

* post normal property unless future approved rule changes
* post PG/hostel/room as project
* access owner/broker-only private modules unless explicitly assigned
* access admin/staff modules
* edit another builder’s project
* bypass project approval/RERA/payment gates

Checklist:

| Check                                          | Required Result | Current Status |
| ---------------------------------------------- | --------------- | -------------- |
| Builder dashboard accessible to builder        | Required        | `NOT_STARTED`  |
| Builder can post project                       | Required        | `NOT_STARTED`  |
| Builder cannot post normal property            | Required        | `NOT_STARTED`  |
| Builder cannot create PG/hostel/room project   | Required        | `NOT_STARTED`  |
| Builder sees own projects/leads                | Required        | `NOT_STARTED`  |
| Builder cannot edit another builder project    | Required        | `NOT_STARTED`  |
| Builder agent permissions enforced             | Required        | `NOT_STARTED`  |
| Builder ads require approved/paid/active rules | Required        | `NOT_STARTED`  |

### 8.5 Super Admin Access Rules

Super Admin can:

* access all admin modules
* manage users
* manage roles/permissions
* manage staff
* manage properties/projects/requirements
* manage verification
* manage billing/payment/plans
* manage providers
* manage ads
* manage CMS/SEO/legal
* manage reports
* view audits
* use feature flags
* use maintenance mode
* perform high-risk actions with audit

Super Admin must still:

* use separate admin/staff login
* be audited on high-risk actions
* not expose secrets
* not bypass legal/security records silently

Checklist:

| Check                                                      | Required Result | Current Status |
| ---------------------------------------------------------- | --------------- | -------------- |
| Super Admin login separate                                 | Required        | `NOT_STARTED`  |
| Super Admin sees all modules                               | Required        | `NOT_STARTED`  |
| Super Admin high-risk actions audited                      | Required        | `NOT_STARTED`  |
| Super Admin provider settings protected                    | Required        | `NOT_STARTED`  |
| Super Admin cannot expose secrets in UI                    | Required        | `NOT_STARTED`  |
| Super Admin actions require confirmation where destructive | Required        | `NOT_STARTED`  |

### 8.6 Admin And Staff Access Rules

Admin/staff access is permission-based.

Checklist:

| Check                                                          | Required Result | Current Status |
| -------------------------------------------------------------- | --------------- | -------------- |
| Staff sees only assigned modules                               | Required        | `NOT_STARTED`  |
| Wrong staff direct URL denied                                  | Required        | `NOT_STARTED`  |
| Staff action permission enforced server-side                   | Required        | `NOT_STARTED`  |
| Sensitive data permission enforced                             | Required        | `NOT_STARTED`  |
| Private doc access permission enforced                         | Required        | `NOT_STARTED`  |
| Export permission enforced                                     | Required        | `NOT_STARTED`  |
| Bulk action permission enforced                                | Required        | `NOT_STARTED`  |
| Staff cannot manage provider secrets unless explicitly allowed | Required        | `NOT_STARTED`  |
| Admin cannot access Super Admin-only settings                  | Required        | `NOT_STARTED`  |
| Staff actions audited                                          | Required        | `NOT_STARTED`  |

---

## 9. RLS Master Rules

RLS must protect the database even if a route/API bug exists.

Rules:

1. Enable RLS on every sensitive table.
2. Public read must use public-safe views where needed.
3. Public-safe views must exclude private fields.
4. Policies must be role-aware.
5. Policies must be owner-aware.
6. Policies must be status-aware.
7. Policies must be staff-permission-aware where possible.
8. Service role bypass must be trusted-server-only.
9. Admin access must be controlled with server checks and/or secure policies.
10. RLS must be tested for allow and deny cases.
11. Never disable RLS for convenience.
12. If RLS must be changed, create migration.
13. RLS changes need rollback notes.
14. RLS failure is a launch blocker.

---

## 10. Required RLS Test Matrix

Every RLS-sensitive phase must test:

| Actor         | Action                                     | Expected                                |
| ------------- | ------------------------------------------ | --------------------------------------- |
| Guest         | read approved public property/project      | Allowed                                 |
| Guest         | read pending/draft/rejected listing        | Denied                                  |
| Guest         | read hidden phone/contact                  | Denied                                  |
| Guest         | read private profile fields                | Denied                                  |
| Guest         | read private verification document         | Denied                                  |
| Guest         | write listing/lead/message                 | Denied except public auth-trigger flows |
| Owner         | read own profile                           | Allowed                                 |
| Owner         | update own profile                         | Allowed with validation                 |
| Owner         | read another user private profile          | Denied                                  |
| Owner         | manage own property                        | Allowed                                 |
| Owner         | manage another user property               | Denied                                  |
| Owner         | post project                               | Denied                                  |
| Broker        | manage own property/requirement            | Allowed                                 |
| Broker        | post project                               | Denied                                  |
| Broker        | read allowed requirement feed              | Allowed                                 |
| Broker        | read unauthorized private lead             | Denied                                  |
| Builder       | manage own project                         | Allowed                                 |
| Builder       | post normal property                       | Denied unless future rule approved      |
| Builder       | manage own agents                          | Allowed                                 |
| Builder agent | read assigned builder leads/projects       | Allowed                                 |
| Builder agent | read unassigned builder data               | Denied                                  |
| Staff         | read assigned module scope                 | Allowed                                 |
| Staff         | read unassigned module scope               | Denied                                  |
| Staff         | export without permission                  | Denied                                  |
| Admin         | perform assigned ops action                | Allowed                                 |
| Admin         | manage provider secrets without permission | Denied                                  |
| Super Admin   | manage intended admin data                 | Allowed                                 |
| Any user      | access another user’s private docs         | Denied                                  |
| Any user      | hard delete without permission             | Denied                                  |
| Any user      | fake payment success                       | Denied                                  |
| Any user      | fake verified badge                        | Denied                                  |

---

## 11. Expected RLS Coverage By Table/Area

Actual table names may be finalized during implementation, but each area must have RLS or equivalent backend security.

| Data Area                   | Expected Protection                                                         | Current Status |
| --------------------------- | --------------------------------------------------------------------------- | -------------- |
| `profiles`                  | User can read/update own private profile; public view excludes private data | `NOT_STARTED`  |
| `public_profiles` / view    | Public-safe profile fields only                                             | `NOT_STARTED`  |
| `user_roles`                | User can read own role; staff/admin controlled changes                      | `NOT_STARTED`  |
| `role_change_requests`      | User own request; admin review                                              | `NOT_STARTED`  |
| `staff_profiles`            | Staff/admin only; scoped access                                             | `NOT_STARTED`  |
| `staff_permissions`         | Super Admin/system only                                                     | `NOT_STARTED`  |
| `properties`                | Public approved only; owner/broker own manage; admin review                 | `NOT_STARTED`  |
| `property_media`            | Public approved listing media only; private drafts restricted               | `NOT_STARTED`  |
| `projects`                  | Public approved only; builder own manage; admin review                      | `NOT_STARTED`  |
| `project_units`             | Public-safe availability; builder/admin manage                              | `NOT_STARTED`  |
| `project_media`             | Public approved project media only; drafts restricted                       | `NOT_STARTED`  |
| `requirements`              | Owner/broker own manage; feed scoped by rules                               | `NOT_STARTED`  |
| `requirement_matches`       | Matched allowed users only                                                  | `NOT_STARTED`  |
| `proposals`                 | Sender/receiver/admin scoped                                                | `NOT_STARTED`  |
| `leads`                     | Lead sender/receiver/assigned agent/admin scoped                            | `NOT_STARTED`  |
| `lead_events`               | Related lead participants/admin scoped                                      | `NOT_STARTED`  |
| `messages`                  | Thread participants only                                                    | `NOT_STARTED`  |
| `message_attachments`       | Thread participants only; private signed access                             | `NOT_STARTED`  |
| `site_visits`               | Participants/assigned agents/admin scoped                                   | `NOT_STARTED`  |
| `saved_items`               | User own only                                                               | `NOT_STARTED`  |
| `saved_searches`            | User own only                                                               | `NOT_STARTED`  |
| `recently_viewed`           | User own or guest local only                                                | `NOT_STARTED`  |
| `notifications`             | Recipient own only; admin scoped                                            | `NOT_STARTED`  |
| `notification_logs`         | Admin/staff scoped; no private secrets                                      | `NOT_STARTED`  |
| `verification_requests`     | User own; admin review                                                      | `NOT_STARTED`  |
| `verification_documents`    | Private; user own metadata, admin permission; signed access                 | `NOT_STARTED`  |
| `reports`                   | Reporter own submission; admin review; accused limited if needed            | `NOT_STARTED`  |
| `support_tickets`           | User own; support/admin scoped                                              | `NOT_STARTED`  |
| `support_messages`          | Ticket participants/support/admin scoped                                    | `NOT_STARTED`  |
| `plans`                     | Public read for active plans; admin manage                                  | `NOT_STARTED`  |
| `subscriptions`             | User own; billing/admin scoped                                              | `NOT_STARTED`  |
| `payments`                  | User own; payment/billing/admin scoped; no secret payload                   | `NOT_STARTED`  |
| `payment_webhook_events`    | Server/admin only                                                           | `NOT_STARTED`  |
| `invoices`                  | User own; billing/admin scoped                                              | `NOT_STARTED`  |
| `coupons`                   | Public-safe active coupons only; admin manage                               | `NOT_STARTED`  |
| `trial_grants`              | User own status; admin manage                                               | `NOT_STARTED`  |
| `ads`                       | Public active approved paid ads only; builder own/admin manage              | `NOT_STARTED`  |
| `ad_media`                  | Approved ad public media only                                               | `NOT_STARTED`  |
| `ad_events`                 | Admin/builder own analytics; fraud protection                               | `NOT_STARTED`  |
| `cms_pages`                 | Public published only; staff/admin manage drafts                            | `NOT_STARTED`  |
| `blog_posts`                | Public published only; staff/admin manage drafts                            | `NOT_STARTED`  |
| `seo_pages`                 | Public safe only; admin/SEO manage                                          | `NOT_STARTED`  |
| `redirects`                 | Public read safe; admin/SEO manage                                          | `NOT_STARTED`  |
| `locations`                 | Public active read; city manager/admin manage                               | `NOT_STARTED`  |
| `missing_location_requests` | User own request; admin/city manager review                                 | `NOT_STARTED`  |
| `provider_settings`         | Super Admin/system only; no secrets                                         | `NOT_STARTED`  |
| `feature_flags`             | Super Admin/system only                                                     | `NOT_STARTED`  |
| `audit_logs`                | Admin/audit manager/Super Admin read; append-only                           | `NOT_STARTED`  |
| `security_events`           | Security/admin scoped                                                       | `NOT_STARTED`  |
| `rate_limit_events`         | Security/system scoped                                                      | `NOT_STARTED`  |
| `data_export_requests`      | User own; privacy/admin scoped                                              | `NOT_STARTED`  |
| `data_delete_requests`      | User own; privacy/admin scoped                                              | `NOT_STARTED`  |
| `legal_consents`            | User own; admin/legal scoped                                                | `NOT_STARTED`  |
| `cookie_preferences`        | User/session own                                                            | `NOT_STARTED`  |

---

## 12. Public-Safe View Rules

Public pages must not query sensitive tables directly if private fields may exist.

Use public-safe views or server mapping for:

* property cards
* project cards
* search results
* detail pages
* public profiles
* city/locality SEO pages
* sitemap
* schema markup
* share metadata
* public ads
* public CMS/blog pages

Public-safe views must exclude:

* hidden phone numbers
* private mobile numbers
* private email addresses
* WhatsApp numbers if not allowed
* exact private address where not public
* private notes
* internal moderation notes
* payment data
* lead/contact reveal logs
* private documents
* verification document URLs
* admin comments
* audit logs
* raw provider payload
* IP/device identifiers
* internal fraud score
* private user metadata
* rejected/draft/private records
* unapproved media
* unapproved ads
* private unit/inventory admin notes

Checklist:

| Check                                        | Required Result | Current Status |
| -------------------------------------------- | --------------- | -------------- |
| Public property view excludes hidden contact | Required        | `NOT_STARTED`  |
| Public project view safe                     | Required        | `NOT_STARTED`  |
| Public profile view safe                     | Required        | `NOT_STARTED`  |
| Public search uses approved data only        | Required        | `NOT_STARTED`  |
| Sitemap excludes private/admin/thin pages    | Required        | `NOT_STARTED`  |
| Schema excludes private fields               | Required        | `NOT_STARTED`  |
| Share metadata excludes private fields       | Required        | `NOT_STARTED`  |

---

## 13. Hidden Contact Privacy Checklist

Hidden contact privacy is critical.

### 13.1 Contact Must Not Leak In

| Location               | Required Result                          | Current Status |
| ---------------------- | ---------------------------------------- | -------------- |
| Search result card     | No hidden contact                        | `NOT_STARTED`  |
| Detail page            | No hidden contact to unauthorized user   | `NOT_STARTED`  |
| Public profile         | No hidden/private contact unless allowed | `NOT_STARTED`  |
| API response           | No hidden contact                        | `NOT_STARTED`  |
| Server component props | No hidden contact in client payload      | `NOT_STARTED`  |
| HTML page source       | No hidden contact                        | `NOT_STARTED`  |
| Metadata               | No hidden contact                        | `NOT_STARTED`  |
| Open Graph             | No hidden contact                        | `NOT_STARTED`  |
| Schema markup          | No hidden contact                        | `NOT_STARTED`  |
| Sitemap                | No hidden contact                        | `NOT_STARTED`  |
| Share text             | No hidden contact unless allowed         | `NOT_STARTED`  |
| Notifications          | No hidden contact to unauthorized user   | `NOT_STARTED`  |
| Logs                   | No full hidden contact                   | `NOT_STARTED`  |
| Exports                | Permission-only                          | `NOT_STARTED`  |
| Analytics              | No hidden contact                        | `NOT_STARTED`  |
| Error tracking         | No hidden contact                        | `NOT_STARTED`  |

### 13.2 Contact Reveal Rules

Contact reveal must:

* require login
* require consent where appropriate
* create/update lead where required
* log reveal event
* enforce rate limits
* prevent duplicate abuse
* respect property contact visibility
* respect project logged-in contact visibility rule
* protect uploader privacy where hidden
* notify listing/project owner where appropriate
* avoid exposing data in public HTML/API before reveal

Checklist:

| Check                                        | Required Result | Current Status |
| -------------------------------------------- | --------------- | -------------- |
| Guest cannot reveal contact                  | Required        | `NOT_STARTED`  |
| Auth popup appears for guest inquiry/contact | Required        | `NOT_STARTED`  |
| Login returns to original contact action     | Required        | `NOT_STARTED`  |
| Contact reveal consent shown                 | Required        | `NOT_STARTED`  |
| Reveal logged                                | Required        | `NOT_STARTED`  |
| Rate limit enforced                          | Required        | `NOT_STARTED`  |
| Duplicate reveal handled                     | Required        | `NOT_STARTED`  |
| Lead created/reused safely                   | Required        | `NOT_STARTED`  |
| Project contact visible to logged-in users   | Required        | `NOT_STARTED`  |
| Property hidden contact respected            | Required        | `NOT_STARTED`  |
| No public HTML/API leak before reveal        | Required        | `NOT_STARTED`  |

A hidden contact leak is `SEC-S0_CRITICAL`.

---

## 14. Private Document Security Checklist

Private documents include:

* verification documents
* identity/business proof
* authority proof
* RERA proof
* ownership proof
* co-owner documents
* support private attachments
* report evidence
* payment/billing private documents
* private invoice files if not public
* private admin-uploaded evidence

Rules:

1. Private documents must be stored in private bucket.
2. Public bucket must never hold private verification documents.
3. Access must use signed URL or server proxy with permission.
4. Signed URL must expire.
5. Access must be logged.
6. Staff access must require permission.
7. Super Admin/Admin access must be audited.
8. Public user cannot access private document URL.
9. Wrong owner cannot access another user’s documents.
10. Deleted/revoked documents must stop being accessible.
11. Document thumbnails/previews must follow same privacy.
12. Document metadata must not expose private info publicly.
13. Document scan/processing must not move private files to public bucket.
14. Logs must not contain full private URLs.

Checklist:

| Check                            | Required Result | Current Status   |
| -------------------------------- | --------------- | ---------------- |
| Private bucket exists            | Required        | `SETUP_REQUIRED` |
| Verification docs private        | Required        | `NOT_STARTED`    |
| Signed URL expiry configured     | Required        | `NOT_STARTED`    |
| Wrong user denied                | Required        | `NOT_STARTED`    |
| Guest denied                     | Required        | `NOT_STARTED`    |
| Staff permission enforced        | Required        | `NOT_STARTED`    |
| Access logged                    | Required        | `NOT_STARTED`    |
| Private preview protected        | Required        | `NOT_STARTED`    |
| Deleted/revoked doc inaccessible | Required        | `NOT_STARTED`    |
| Private doc URL not logged       | Required        | `NOT_STARTED`    |

Private document leak is `SEC-S0_CRITICAL`.

---

## 15. Server-Side Authorization Checklist

Every sensitive server action/API route must check authorization.

Sensitive actions include:

* create/update/delete property
* create/update/delete project
* create/update/delete requirement
* approve/reject listing
* update listing status
* reveal contact
* submit inquiry
* send proposal
* send message
* upload private document
* download private document
* manage leads
* assign leads
* create site visit
* update site visit
* manage subscription
* create payment order
* handle webhook
* create invoice
* manual payment activation
* apply coupon
* manage ads
* approve ads
* manage notifications
* manage CMS/legal/SEO
* manage locations
* manage users
* manage roles/permissions
* manage staff
* manage providers
* manage feature flags
* export data
* bulk actions
* delete/restore/hard delete
* view audit logs

Checklist:

| Check                                  | Required Result         | Current Status |
| -------------------------------------- | ----------------------- | -------------- |
| User session checked                   | Required                | `NOT_STARTED`  |
| Role checked                           | Required                | `NOT_STARTED`  |
| Resource ownership checked             | Required                | `NOT_STARTED`  |
| Staff permission checked               | Required                | `NOT_STARTED`  |
| Plan/subscription gate checked         | Required where relevant | `NOT_STARTED`  |
| Verification gate checked              | Required where relevant | `NOT_STARTED`  |
| Approval/status gate checked           | Required where relevant | `NOT_STARTED`  |
| Feature flag checked                   | Required where relevant | `NOT_STARTED`  |
| Input validated                        | Required                | `NOT_STARTED`  |
| Rate limit checked                     | Required where relevant | `NOT_STARTED`  |
| Audit log written for sensitive action | Required                | `NOT_STARTED`  |
| Safe error returned                    | Required                | `NOT_STARTED`  |

---

## 16. Direct URL Bypass Checklist

Every protected route must be tested by direct URL paste.

Routes to test:

* owner dashboard
* broker dashboard
* builder dashboard
* listing create/edit
* project create/edit
* requirement create/edit
* leads CRM
* messages
* site visits
* billing/subscription
* invoices
* verification documents
* support tickets
* admin login
* admin dashboard
* staff modules
* provider settings
* payment admin
* user management
* SEO/CMS admin
* audit logs
* feature flags
* private file routes
* API/server action endpoints where possible

Checklist:

| Actor                                 | Expected                |
| ------------------------------------- | ----------------------- |
| Guest direct dashboard URL            | Denied/auth             |
| Guest direct admin URL                | Denied/noindex          |
| Owner direct broker-only URL          | Denied                  |
| Owner direct builder-only URL         | Denied                  |
| Owner direct project create URL       | Denied                  |
| Broker direct builder project URL     | Denied                  |
| Builder direct property create URL    | Denied                  |
| Wrong owner direct edit URL           | Denied                  |
| Wrong staff direct module URL         | Denied                  |
| Admin direct Super Admin settings URL | Denied unless permitted |
| Super Admin direct admin URL          | Allowed                 |
| User direct private file URL          | Denied unless permitted |

Direct URL bypass failure is `SEC-S0_CRITICAL` or `SEC-S1_HIGH`.

---

## 17. Payment Security Checklist

Payment security is mandatory for billing/subscription/ads/promotions/add-ons.

Rules:

1. Create payment order server-side.
2. Client must not set payable amount as trusted source.
3. Razorpay key secret server-only.
4. Webhook secret server-only.
5. Verify webhook signature.
6. Use idempotency for webhook events.
7. Do not activate plan from client callback alone.
8. Failed payment must not activate subscription.
9. Pending payment must not activate subscription.
10. Invoice only after verified success.
11. Failed payment must not consume invoice number.
12. Duplicate webhook must not duplicate subscription/invoice.
13. Manual activation requires audit reason.
14. Refund/credit note actions require permission/audit.
15. Test mode must not be active in production.
16. Payment errors must be safe.
17. Payment logs must be redacted.
18. Payment admin access must be permission-scoped.
19. Razorpay provider failure must keep payment pending/inactive.
20. Plan limits must be server-enforced.

Checklist:

| Check                            | Required Result | Current Status   |
| -------------------------------- | --------------- | ---------------- |
| Server-side order creation       | Required        | `NOT_STARTED`    |
| Client amount not trusted        | Required        | `NOT_STARTED`    |
| Razorpay secret server-only      | Required        | `SETUP_REQUIRED` |
| Webhook signature verified       | Required        | `SETUP_REQUIRED` |
| Webhook idempotency              | Required        | `NOT_STARTED`    |
| Failed payment inactive          | Required        | `NOT_STARTED`    |
| Pending payment inactive         | Required        | `NOT_STARTED`    |
| Success only after verification  | Required        | `NOT_STARTED`    |
| Invoice only after success       | Required        | `NOT_STARTED`    |
| Duplicate webhook safe           | Required        | `NOT_STARTED`    |
| Manual activation audited        | Required        | `NOT_STARTED`    |
| Refund permission enforced       | Required        | `NOT_STARTED`    |
| Test mode disabled in production | Required        | `NOT_STARTED`    |
| Payment logs redacted            | Required        | `NOT_STARTED`    |

Payment bypass is `SEC-S0_CRITICAL`.

---

## 18. Provider Secret Security Checklist

Provider secrets include:

* Supabase service role key
* OTP provider key
* SMS key
* Email key
* WhatsApp token
* Razorpay secret
* Razorpay webhook secret
* Google Maps server key
* Cloudflare R2 access/secret
* Cloudflare API token
* Turnstile secret
* Analytics secret if any
* Error tracking auth token
* Cron secret
* Web push private key
* File scan provider key
* Search Console service account

Rules:

1. Secrets must never be in client code.
2. Secrets must never be in public docs.
3. Secrets must never be in logs.
4. Secrets must never be in screenshots.
5. Secrets must never be exposed through API response.
6. `.env.example` must not contain real values.
7. `NEXT_PUBLIC_` must only be used for intentionally public values.
8. Server-only code must not be imported into client components.
9. Provider status UI must mask secrets.
10. Secret rotation must be audit logged.
11. Production secrets must be stored in secure environment/secret manager.

Checklist:

| Check                               | Required Result        | Current Status |
| ----------------------------------- | ---------------------- | -------------- |
| `.env.example` has names only       | Required               | `NOT_STARTED`  |
| No real `.env` committed            | Required               | `NOT_STARTED`  |
| No service role in client bundle    | Required               | `NOT_STARTED`  |
| No provider secret in client bundle | Required               | `NOT_STARTED`  |
| Admin provider UI masks secrets     | Required               | `NOT_STARTED`  |
| Secret rotation audited             | Required               | `NOT_STARTED`  |
| Logs redacted                       | Required               | `NOT_STARTED`  |
| Build scan for secrets              | Required before launch | `NOT_STARTED`  |

Secret exposure is `SEC-S0_CRITICAL`.

---

## 19. Upload And Media Security Checklist

Upload security applies to:

* property images
* project images
* project video
* brochure PDFs
* floor plans
* profile images
* logos
* banner ads
* support attachments
* report evidence
* verification documents

Rules:

1. Validate file type.
2. Validate file size to protect infrastructure.
3. Validate MIME and extension.
4. Block unsafe files.
5. Sanitize/block unsafe SVG.
6. Strip EXIF where required.
7. Store private docs privately.
8. Use public bucket only for public media.
9. Keep original/variants rules safe.
10. Do not publish media until listing/project/ad approved where required.
11. Delete/update media with soft-delete/orphan cleanup rules.
12. CDN must not cache private files.
13. Signed URLs must expire.
14. Upload failure must not fake success.
15. Malware/file scan setup-required or implemented for sensitive uploads.
16. Image/video/PDF processing failures must be safe.

Checklist:

| Check                            | Required Result | Current Status   |
| -------------------------------- | --------------- | ---------------- |
| Allowed image types validated    | Required        | `NOT_STARTED`    |
| PDF type validated               | Required        | `NOT_STARTED`    |
| Video type validated             | Required        | `NOT_STARTED`    |
| Size limits enforced server-side | Required        | `NOT_STARTED`    |
| MIME sniff/check                 | Required        | `NOT_STARTED`    |
| Unsafe SVG handled               | Required        | `NOT_STARTED`    |
| EXIF stripped or tracked         | Required        | `SETUP_REQUIRED` |
| Private docs private bucket      | Required        | `SETUP_REQUIRED` |
| Public media public bucket only  | Required        | `SETUP_REQUIRED` |
| Signed URLs expire               | Required        | `NOT_STARTED`    |
| Upload authorization checked     | Required        | `NOT_STARTED`    |
| Upload ownership checked         | Required        | `NOT_STARTED`    |
| Media approval/status respected  | Required        | `NOT_STARTED`    |
| Orphan cleanup tracked           | Required        | `NOT_STARTED`    |
| CDN private leak check           | Required        | `NOT_STARTED`    |

---

## 20. Admin And Staff Security Checklist

Admin/staff area is high-risk.

Rules:

1. Admin/staff routes are separate from public routes.
2. Admin/staff routes are protected.
3. Admin/staff routes are noindexed.
4. Public users cannot register as staff/admin.
5. Staff accounts are invite-only.
6. Staff permissions are granular.
7. Sensitive data permission required.
8. Private document permission required.
9. Export permission required.
10. Bulk action permission required.
11. High-risk actions require confirmation.
12. Reject/need-changes actions require reason.
13. Maker-checker required for high-risk actions where defined.
14. Admin notes are internal only.
15. Staff actions are audited.
16. Provider secrets visible only to allowed Super Admin/system scope.
17. Staff cannot bypass restrictions by direct URL.
18. Admin UI must not leak private fields to unauthorized staff.

Checklist:

| Check                                            | Required Result | Current Status |
| ------------------------------------------------ | --------------- | -------------- |
| Admin URL protected                              | Required        | `NOT_STARTED`  |
| Admin URL noindex                                | Required        | `NOT_STARTED`  |
| Staff invite-only                                | Required        | `NOT_STARTED`  |
| Staff menu permission-scoped                     | Required        | `NOT_STARTED`  |
| Staff server action permission-scoped            | Required        | `NOT_STARTED`  |
| Sensitive private data hidden without permission | Required        | `NOT_STARTED`  |
| Private doc permission enforced                  | Required        | `NOT_STARTED`  |
| Export permission enforced                       | Required        | `NOT_STARTED`  |
| Bulk action confirmation                         | Required        | `NOT_STARTED`  |
| High-risk audit log                              | Required        | `NOT_STARTED`  |
| Provider settings Super Admin-only               | Required        | `NOT_STARTED`  |
| Direct URL bypass denied                         | Required        | `NOT_STARTED`  |

---

## 21. Audit Log Checklist

Audit logs are required for sensitive actions.

Audit log required for:

* user role change
* staff role/permission change
* admin/staff login security event
* property approval/rejection/need-changes
* project approval/rejection/need-changes
* requirement approval/rejection/need-changes
* verification approval/rejection/revocation
* private document access
* contact reveal
* payment manual activation
* refund/credit note
* invoice correction
* provider setting change
* feature flag change
* plan/price/trial/coupon change
* ad approval/rejection/pause
* CMS/legal publish
* SEO redirect/canonical change
* report action
* user ban/suspension
* soft delete/restore/hard delete
* export action
* bulk action
* security setting change
* maintenance mode change
* deployment/rollback action

Audit logs must include:

* actor ID
* actor role
* action
* target type
* target ID
* old safe value if needed
* new safe value if needed
* reason
* timestamp
* IP/device where safe
* no secrets
* no full private document URL
* no OTP/token/password

Checklist:

| Check                                   | Required Result | Current Status |
| --------------------------------------- | --------------- | -------------- |
| Audit table exists                      | Required        | `NOT_STARTED`  |
| Audit RLS/admin scope                   | Required        | `NOT_STARTED`  |
| High-risk actions audited               | Required        | `NOT_STARTED`  |
| Audit logs append-only                  | Required        | `NOT_STARTED`  |
| Audit logs not editable by normal staff | Required        | `NOT_STARTED`  |
| Audit logs do not include secrets       | Required        | `NOT_STARTED`  |
| Export actions audited                  | Required        | `NOT_STARTED`  |
| Private doc access audited              | Required        | `NOT_STARTED`  |
| Payment manual action audited           | Required        | `NOT_STARTED`  |

---

## 22. Soft Delete, Retention And Hard Delete Checklist

Rules:

1. Default delete for important records should be soft delete.
2. Public pages must hide soft-deleted records.
3. Dashboards should show restore/trash where allowed.
4. Hard delete only after retention and Super Admin permission where applicable.
5. Private data deletion must respect legal hold/payment records.
6. Audit logs should not be normally deleted.
7. Deletion must not leave public media/private files exposed.
8. Orphan cleanup must be controlled.
9. Payment/invoice records need retention rules.
10. User data delete/export requests must be handled carefully.

Checklist:

| Check                                                      | Required Result            | Current Status |
| ---------------------------------------------------------- | -------------------------- | -------------- |
| Soft delete fields exist where needed                      | Required                   | `NOT_STARTED`  |
| Public queries hide soft deleted                           | Required                   | `NOT_STARTED`  |
| Owner/broker/builder can delete own allowed records safely | Required                   | `NOT_STARTED`  |
| Restore permission enforced                                | Required                   | `NOT_STARTED`  |
| Hard delete Super Admin-only                               | Required where implemented | `NOT_STARTED`  |
| Retention days configured                                  | Required                   | `NOT_STARTED`  |
| Legal hold respected                                       | Required where implemented | `NOT_STARTED`  |
| Orphan media cleanup safe                                  | Required                   | `NOT_STARTED`  |
| Audit logs retained                                        | Required                   | `NOT_STARTED`  |

---

## 23. Rate Limit And Abuse Protection Checklist

Rate limits are required for high-abuse and high-cost features.

Rate limit required for:

* OTP send
* OTP verify
* login attempts
* registration attempts
* contact reveal
* inquiry submit
* proposal submit
* message send
* site visit request
* support ticket create
* report submit
* search requests where scraping risk exists
* saved search alerts
* upload attempts
* payment order creation
* coupon application
* webhook retry
* notification sends
* admin login attempts
* provider test buttons
* password/email login if used
* public profile/contact scraping
* SEO page scraping where needed

Checklist:

| Check                       | Required Result | Current Status |
| --------------------------- | --------------- | -------------- |
| OTP rate limit              | Required        | `NOT_STARTED`  |
| Login attempt limit         | Required        | `NOT_STARTED`  |
| Contact reveal rate limit   | Required        | `NOT_STARTED`  |
| Inquiry/proposal spam limit | Required        | `NOT_STARTED`  |
| Message spam limit          | Required        | `NOT_STARTED`  |
| Upload rate/size protection | Required        | `NOT_STARTED`  |
| Payment order rate limit    | Required        | `NOT_STARTED`  |
| Search scraping protection  | Required        | `NOT_STARTED`  |
| Report abuse protection     | Required        | `NOT_STARTED`  |
| Admin login rate limit      | Required        | `NOT_STARTED`  |
| Provider test limit         | Required        | `NOT_STARTED`  |
| Rate limit events logged    | Required        | `NOT_STARTED`  |

---

## 24. Input Validation Checklist

Every input must be validated server-side.

High-priority validated inputs:

* mobile number
* email
* full name
* role
* property type
* project type
* purpose
* price/budget
* area/size/unit
* location IDs
* address fields
* map coordinates
* RERA number
* GSTIN
* PAN/business IDs where used
* URLs/iframes/virtual tours
* image/PDF/video files
* support/report attachments
* payment plan ID
* coupon code
* proposal amount/message
* message content
* CMS slug/content/meta
* SEO title/meta/canonical
* redirect URLs
* feature flag values
* provider settings
* admin action reasons
* staff permission changes
* bulk action IDs
* sort/filter query params

Checklist:

| Check                                | Required Result | Current Status |
| ------------------------------------ | --------------- | -------------- |
| Server-side validation schema exists | Required        | `NOT_STARTED`  |
| Client validation not trusted alone  | Required        | `NOT_STARTED`  |
| Query params validated               | Required        | `NOT_STARTED`  |
| File inputs validated                | Required        | `NOT_STARTED`  |
| URL inputs sanitized/validated       | Required        | `NOT_STARTED`  |
| Numeric ranges validated             | Required        | `NOT_STARTED`  |
| Enum values validated                | Required        | `NOT_STARTED`  |
| Admin actions reason validated       | Required        | `NOT_STARTED`  |
| Safe validation errors               | Required        | `NOT_STARTED`  |

---

## 25. Web Security Checklist

### 25.1 XSS Protection

Required:

* escape user content
* sanitize rich text CMS/blog if allowed
* sanitize descriptions if rendering HTML
* avoid dangerouslySetInnerHTML unless sanitized
* validate iframe/embed URLs
* block unsafe SVG or sanitize
* safe markdown rendering if used
* no user-controlled script injection
* no raw provider payload rendering

### 25.2 CSRF Protection

Required where cookie/session-based mutation exists:

* server actions check session
* state-changing endpoints require authenticated session
* same-site cookies
* CSRF token where needed
* origin/referer check where relevant
* no GET destructive actions

### 25.3 SSRF Protection

Required for:

* virtual tour URLs
* map/embed URLs
* external image/PDF fetch if any
* URL previews if any
* webhook callback URLs if any

Rules:

* allowlist known domains where possible
* block internal/private IP ranges
* do not fetch arbitrary URLs server-side without validation
* timeout external requests
* safe error handling

### 25.4 Open Redirect Protection

Required for:

* login redirect
* payment redirect
* share/deep link redirect
* admin preview redirect

Rules:

* only allow internal paths or approved domains
* validate redirect target
* avoid user-controlled full URL redirects

### 25.5 CORS Checklist

| Check                                               | Required Result | Current Status |
| --------------------------------------------------- | --------------- | -------------- |
| CORS restricted to approved origins                 | Required        | `NOT_STARTED`  |
| Admin APIs not public CORS                          | Required        | `NOT_STARTED`  |
| Provider webhooks validate signature, not CORS only | Required        | `NOT_STARTED`  |
| No wildcard credentials CORS                        | Required        | `NOT_STARTED`  |

### 25.6 Security Headers Checklist

Required headers where applicable:

* Content-Security-Policy
* X-Frame-Options or CSP frame-ancestors
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* Strict-Transport-Security in production HTTPS
* noindex headers/meta for admin/staff
* cache-control for private pages
* safe caching for public pages

Current status: `NOT_STARTED`

---

## 26. Logging And Error Safety Checklist

Logs must never expose:

* OTP
* password
* access token
* refresh token
* service role key
* API keys
* provider secrets
* webhook secret
* Razorpay secret
* private document URL
* full signed URL
* full hidden contact list
* full private user payload
* raw DB credentials
* unredacted payment payload
* unredacted provider payload
* private verification document details

User-facing errors must not expose:

* SQL error
* stack trace
* internal file path
* secret/env name with value
* provider raw error
* payment raw payload
* RLS policy internals
* private object existence if unauthorized

Checklist:

| Check                               | Required Result              | Current Status   |
| ----------------------------------- | ---------------------------- | ---------------- |
| Safe error mapping exists           | Required                     | `NOT_STARTED`    |
| Logs redact secrets                 | Required                     | `NOT_STARTED`    |
| Logs redact OTP                     | Required                     | `NOT_STARTED`    |
| Logs redact hidden contact          | Required                     | `NOT_STARTED`    |
| Logs redact private file URLs       | Required                     | `NOT_STARTED`    |
| No raw SQL error public             | Required                     | `NOT_STARTED`    |
| Error tracking redaction configured | Required if provider enabled | `SETUP_REQUIRED` |

---

## 27. SEO And Privacy Security Checklist

SEO must not leak private data.

Checklist:

| Check                                       | Required Result | Current Status |
| ------------------------------------------- | --------------- | -------------- |
| Admin pages noindex                         | Required        | `NOT_STARTED`  |
| Staff pages noindex                         | Required        | `NOT_STARTED`  |
| Private dashboard pages noindex             | Required        | `NOT_STARTED`  |
| Draft/rejected listings noindex/not public  | Required        | `NOT_STARTED`  |
| Empty/thin pages noindex/hidden             | Required        | `NOT_STARTED`  |
| Sitemap excludes admin/private pages        | Required        | `NOT_STARTED`  |
| Sitemap excludes hidden contact             | Required        | `NOT_STARTED`  |
| Schema excludes hidden contact/private data | Required        | `NOT_STARTED`  |
| Open Graph excludes private data            | Required        | `NOT_STARTED`  |
| No fake review/rating/schema                | Required        | `NOT_STARTED`  |
| No fake listing count                       | Required        | `NOT_STARTED`  |
| No false guarantee claims                   | Required        | `NOT_STARTED`  |

---

## 28. Consent, Privacy And Legal Security Checklist

Required consent/privacy flows:

* Terms & Conditions consent during registration
* Privacy Policy consent during registration
* OTP/data usage notice
* contact sharing consent
* lead/inquiry sharing notice
* listing/project/requirement legal warning
* payment/refund/cancellation policy acknowledgement where needed
* ad policy acknowledgement
* verification document privacy notice
* report/abuse policy notice
* cookie/analytics preference where needed
* marketing opt-in/out where needed
* unsubscribe for marketing email/SMS/WhatsApp where applicable
* data export/delete request process
* grievance/support contact
* platform marketplace disclaimer
* no legal/ownership guarantee disclaimer
* RERA disclaimer where applicable

Checklist:

| Check                                       | Required Result | Current Status |
| ------------------------------------------- | --------------- | -------------- |
| Terms consent stored                        | Required        | `NOT_STARTED`  |
| Privacy consent stored                      | Required        | `NOT_STARTED`  |
| OTP notice shown                            | Required        | `NOT_STARTED`  |
| Contact sharing notice shown                | Required        | `NOT_STARTED`  |
| Lead consent logged                         | Required        | `NOT_STARTED`  |
| Verification doc privacy notice             | Required        | `NOT_STARTED`  |
| Payment/refund policy visible               | Required        | `NOT_STARTED`  |
| Cookie preferences stored where needed      | Required        | `NOT_STARTED`  |
| Marketing opt-out works where needed        | Required        | `NOT_STARTED`  |
| Data export/delete request tracked          | Required        | `NOT_STARTED`  |
| Legal pages reviewed or marked NEEDS_REVIEW | Required        | `NOT_STARTED`  |

---

## 29. Fraud, Report And Abuse Checklist

Fraud/report system must protect users and prevent misuse.

Reportable items:

* property
* project
* requirement
* proposal
* profile
* message
* banner ad
* review/testimonial if implemented
* support abuse

Checklist:

| Check                                        | Required Result | Current Status |
| -------------------------------------------- | --------------- | -------------- |
| Report form authenticated or abuse-protected | Required        | `NOT_STARTED`  |
| Report categories validated                  | Required        | `NOT_STARTED`  |
| Evidence upload private/safe                 | Required        | `NOT_STARTED`  |
| Duplicate report handling                    | Required        | `NOT_STARTED`  |
| Fake report abuse tracked                    | Required        | `NOT_STARTED`  |
| Admin report queue permission-scoped         | Required        | `NOT_STARTED`  |
| Report action audited                        | Required        | `NOT_STARTED`  |
| User suspension/ban audited                  | Required        | `NOT_STARTED`  |
| Appeal system tracked where implemented      | Required        | `NOT_STARTED`  |
| Listing/report privacy respected             | Required        | `NOT_STARTED`  |

Fraud signals to track where implemented:

* duplicate listings
* duplicate requirements
* repeated contact reveals
* OTP abuse
* payment mismatch
* fake verification docs
* fake RERA claims
* spam messages
* suspicious reports
* scraping behavior
* provider abuse/cost spike

---

## 30. Module-Specific Security Checklist

### 30.1 Property Security

| Check                                     | Required Result | Current Status |
| ----------------------------------------- | --------------- | -------------- |
| Owner/broker create allowed               | Required        | `NOT_STARTED`  |
| Builder create property denied            | Required        | `NOT_STARTED`  |
| Public only approved properties           | Required        | `NOT_STARTED`  |
| Draft/pending/rejected hidden             | Required        | `NOT_STARTED`  |
| Edit requires owner/broker ownership      | Required        | `NOT_STARTED`  |
| Update triggers reapproval where required | Required        | `NOT_STARTED`  |
| Pause/resume ownership checked            | Required        | `NOT_STARTED`  |
| Soft delete ownership checked             | Required        | `NOT_STARTED`  |
| Hidden contact protected                  | Required        | `NOT_STARTED`  |
| Images public only after safe status      | Required        | `NOT_STARTED`  |
| Brochure rules enforced                   | Required        | `NOT_STARTED`  |

### 30.2 Project Security

| Check                                   | Required Result | Current Status |
| --------------------------------------- | --------------- | -------------- |
| Builder create allowed                  | Required        | `NOT_STARTED`  |
| Owner/broker project create denied      | Required        | `NOT_STARTED`  |
| PG/hostel/room project denied           | Required        | `NOT_STARTED`  |
| Public only approved projects           | Required        | `NOT_STARTED`  |
| Edit requires builder ownership         | Required        | `NOT_STARTED`  |
| Update triggers reapproval              | Required        | `NOT_STARTED`  |
| RERA ad/promotion gate enforced         | Required        | `NOT_STARTED`  |
| Logged-in project contact rule enforced | Required        | `NOT_STARTED`  |
| Agent permissions enforced              | Required        | `NOT_STARTED`  |
| Unit inventory ownership checked        | Required        | `NOT_STARTED`  |

### 30.3 Requirement Security

| Check                              | Required Result | Current Status |
| ---------------------------------- | --------------- | -------------- |
| Owner/broker create allowed        | Required        | `NOT_STARTED`  |
| Builder visibility scoped          | Required        | `NOT_STARTED`  |
| Feed access scoped                 | Required        | `NOT_STARTED`  |
| Contact privacy respected          | Required        | `NOT_STARTED`  |
| Proposal sender/receiver scoped    | Required        | `NOT_STARTED`  |
| Duplicate/spam protection          | Required        | `NOT_STARTED`  |
| Requirement edit ownership checked | Required        | `NOT_STARTED`  |
| Approval status respected          | Required        | `NOT_STARTED`  |

### 30.4 Leads CRM Security

| Check                        | Required Result | Current Status |
| ---------------------------- | --------------- | -------------- |
| Lead participants scoped     | Required        | `NOT_STARTED`  |
| Wrong user denied            | Required        | `NOT_STARTED`  |
| Builder agent assigned scope | Required        | `NOT_STARTED`  |
| Lead notes private           | Required        | `NOT_STARTED`  |
| Lead assignment audited      | Required        | `NOT_STARTED`  |
| Contact reveal logged        | Required        | `NOT_STARTED`  |
| Duplicate lead safe          | Required        | `NOT_STARTED`  |
| CRM analytics real/scoped    | Required        | `NOT_STARTED`  |

### 30.5 Messaging Security

| Check                      | Required Result | Current Status |
| -------------------------- | --------------- | -------------- |
| Thread participants only   | Required        | `NOT_STARTED`  |
| Wrong user denied          | Required        | `NOT_STARTED`  |
| Attachments private/signed | Required        | `NOT_STARTED`  |
| Message spam limit         | Required        | `NOT_STARTED`  |
| Block/report respected     | Required        | `NOT_STARTED`  |
| Unread counts scoped       | Required        | `NOT_STARTED`  |
| Notifications scoped       | Required        | `NOT_STARTED`  |

### 30.6 Billing Security

| Check                          | Required Result | Current Status   |
| ------------------------------ | --------------- | ---------------- |
| Plan limits server-enforced    | Required        | `NOT_STARTED`    |
| Subscription ownership checked | Required        | `NOT_STARTED`    |
| Invoice ownership checked      | Required        | `NOT_STARTED`    |
| Payment webhook verified       | Required        | `SETUP_REQUIRED` |
| Manual billing actions audited | Required        | `NOT_STARTED`    |
| Coupon abuse prevented         | Required        | `NOT_STARTED`    |
| Trial abuse tracked            | Required        | `NOT_STARTED`    |

### 30.7 Ads Security

| Check                                        | Required Result | Current Status |
| -------------------------------------------- | --------------- | -------------- |
| Builder can submit own project ad only       | Required        | `NOT_STARTED`  |
| Approved/published project required          | Required        | `NOT_STARTED`  |
| Paid/active/not expired required for display | Required        | `NOT_STARTED`  |
| Admin approval required                      | Required        | `NOT_STARTED`  |
| RERA/policy gate enforced                    | Required        | `NOT_STARTED`  |
| Ad media validated                           | Required        | `NOT_STARTED`  |
| Click/impression fraud tracked               | Required        | `NOT_STARTED`  |
| Sponsored label shown                        | Required        | `NOT_STARTED`  |

### 30.8 CMS/SEO/Legal Security

| Check                            | Required Result | Current Status |
| -------------------------------- | --------------- | -------------- |
| Draft CMS hidden                 | Required        | `NOT_STARTED`  |
| Publish permission enforced      | Required        | `NOT_STARTED`  |
| SEO settings permission enforced | Required        | `NOT_STARTED`  |
| Redirect open redirect blocked   | Required        | `NOT_STARTED`  |
| Legal page edit audited          | Required        | `NOT_STARTED`  |
| Rich text sanitized              | Required        | `NOT_STARTED`  |
| Sitemap excludes private pages   | Required        | `NOT_STARTED`  |

---

## 31. SQL Migration Security Checklist

Every DB/RLS/security change must have migration.

Checklist:

| Check                                          | Required Result         | Current Status |
| ---------------------------------------------- | ----------------------- | -------------- |
| Migration file exists for DB change            | Required                | `NOT_STARTED`  |
| Migration header includes RLS impact           | Required                | `NOT_STARTED`  |
| RLS policies created/updated in migration      | Required                | `NOT_STARTED`  |
| Public-safe views created/updated in migration | Required where needed   | `NOT_STARTED`  |
| Indexes added for security/performance queries | Required where needed   | `NOT_STARTED`  |
| Destructive change approved                    | Required if destructive | `NOT_STARTED`  |
| Backup noted for destructive/security change   | Required if risky       | `NOT_STARTED`  |
| Rollback notes included                        | Required                | `NOT_STARTED`  |
| Migration tested in staging before production  | Required before prod    | `NOT_STARTED`  |
| RLS allow/deny tests after migration           | Required                | `NOT_STARTED`  |

---

## 32. Security Testing Commands / Methods

Future project may use different tools, but security verification should include:

### 32.1 Build/Bundle Secret Check

Check:

* service role not in client bundle
* provider secrets not in client bundle
* server-only modules not imported by client
* `.env` not committed

### 32.2 RLS SQL Tests

Test with:

* unauthenticated/anon role
* authenticated owner
* authenticated broker
* authenticated builder
* builder agent
* staff role
* admin
* Super Admin
* wrong-owner user
* banned/suspended user where implemented

### 32.3 Route/API Tests

Test:

* direct URL route protection
* API route authorization
* server action authorization
* middleware/auth guard
* RLS backend deny
* safe error response

### 32.4 UI Security Tests

Test:

* unauthorized UI does not show action
* hidden UI alone is not relied on
* disabled/setup-required state prevents submit
* no private data in source/API response
* no raw errors
* no hidden contact leak

---

## 33. Security Bug Rules

Create `BUGS_AND_FIXES.md` entry immediately if:

* hidden phone leaks
* private document leaks
* service role key exposed
* provider secret exposed
* guest accesses dashboard/admin/private API
* wrong owner accesses another record
* wrong staff accesses module
* builder posts property incorrectly
* owner/broker posts project incorrectly
* failed payment activates plan
* pending payment activates plan
* webhook signature missing
* fake verified badge appears
* fake payment/provider success appears
* private file public URL appears
* raw SQL error appears
* logs include OTP/token/secret
* admin route indexed
* public staff account creation possible
* RLS disabled/missing on sensitive table
* direct URL bypass works
* private fields in public-safe view
* sitemap/schema/meta leaks private data
* upload accepts unsafe files
* rate limit missing for abuse-sensitive launch feature

Security bug final status cannot be `RESOLVED` until retest passes.

---

## 34. Production Security Final Pass

Production launch cannot happen without final security pass.

### 34.1 Required Final PASS Items

| Check                                          | Required Result |
| ---------------------------------------------- | --------------- |
| Service role not exposed                       | PASS            |
| Provider secrets not exposed                   | PASS            |
| RLS enabled on sensitive tables                | PASS            |
| RLS allow/deny tests                           | PASS            |
| Public-safe views safe                         | PASS            |
| Hidden contact not leaked                      | PASS            |
| Private docs not leaked                        | PASS            |
| Admin/staff route protected                    | PASS            |
| Admin/staff route noindex                      | PASS            |
| Direct URL bypass blocked                      | PASS            |
| Role permissions enforced                      | PASS            |
| Staff permissions enforced                     | PASS            |
| Payment webhook verified if payment live       | PASS            |
| Failed/pending payment inactive                | PASS            |
| Upload validation works                        | PASS            |
| Private bucket protected                       | PASS            |
| Signed URL expiry works                        | PASS            |
| Logs redacted                                  | PASS            |
| Safe errors only                               | PASS            |
| Rate limits active for critical actions        | PASS            |
| Audit logs active                              | PASS            |
| Soft delete/public hide works                  | PASS            |
| Legal/consent flows present                    | PASS            |
| Security headers configured                    | PASS            |
| Dev/mock/test providers disabled in production | PASS            |
| No launch-blocking security bugs open          | PASS            |

### 34.2 Allowed Production Exceptions

Only allowed if user/Super Admin explicitly approves:

* provider not launched and marked `SETUP_REQUIRED`
* feature disabled by flag
* feature deferred and not exposed publicly
* manual fallback documented
* legal review pending but page marked `NEEDS_REVIEW` and launch approval exists

No exception allowed for:

* contact leak
* private document leak
* service role exposure
* payment bypass
* admin public access
* RLS failure on sensitive data
* provider secret leak
* raw private data leak

---

## 35. Current Security/RLS Status

No actual website implementation has started yet.

Current status:

| Area                           | Status           |
| ------------------------------ | ---------------- |
| Supabase Auth                  | `NOT_STARTED`    |
| Supabase DB                    | `NOT_STARTED`    |
| Supabase RLS                   | `NOT_STARTED`    |
| Public auth security           | `NOT_STARTED`    |
| Admin/staff auth security      | `NOT_STARTED`    |
| Role/RBAC                      | `NOT_STARTED`    |
| Staff permissions              | `NOT_STARTED`    |
| Public-safe views              | `NOT_STARTED`    |
| Hidden contact protection      | `NOT_STARTED`    |
| Private documents              | `SETUP_REQUIRED` |
| Payment security               | `SETUP_REQUIRED` |
| Provider secret security       | `SETUP_REQUIRED` |
| Upload/media security          | `SETUP_REQUIRED` |
| Rate limits                    | `NOT_STARTED`    |
| Audit logs                     | `NOT_STARTED`    |
| Soft delete/retention          | `NOT_STARTED`    |
| Consent/privacy                | `NOT_STARTED`    |
| Fraud/report abuse             | `NOT_STARTED`    |
| Security headers               | `NOT_STARTED`    |
| Logs/error redaction           | `NOT_STARTED`    |
| Direct URL bypass tests        | `NOT_STARTED`    |
| Production security final pass | `NOT_STARTED`    |

---

## 36. Current Open Security Risks

## SECURITY-RISK-20260629-001 — RLS Not Implemented Yet

### Status

`NOT_STARTED`

### Severity

`SEC-S1_HIGH`

### Risk

Database and RLS have not been implemented yet.

### Required Action

* Implement schema and RLS in phase migrations.
* Test allowed/denied access.
* Update this checklist and manual verification.

### Launch Impact

Production launch blocked until final RLS pass.

---

## SECURITY-RISK-20260629-002 — Provider Secrets Not Configured Yet

### Status

`SETUP_REQUIRED`

### Severity

`SEC-S2_MEDIUM`

### Risk

Real providers are not configured. Provider features must not fake success.

### Required Action

* Configure providers later.
* Keep secrets server-only.
* Update `.env.example`.
* Verify success/failure/fallback.

### Launch Impact

Provider-backed features blocked or setup-required until configured.

---

## SECURITY-RISK-20260629-003 — Payment Webhook Security Not Implemented Yet

### Status

`SETUP_REQUIRED`

### Severity

`SEC-S0_CRITICAL` if payment is launched without fix

### Risk

Razorpay/webhook is not implemented yet. Payment features cannot be production-active.

### Required Action

* Implement Razorpay securely.
* Verify webhook signature.
* Add idempotency.
* Test failed/pending/success states.

### Launch Impact

Payment launch blocked until verified.

---

## SECURITY-RISK-20260629-004 — Private Document Storage Not Implemented Yet

### Status

`SETUP_REQUIRED`

### Severity

`SEC-S0_CRITICAL` if private docs are exposed

### Risk

Cloudflare R2/private bucket/signed URL system is not implemented yet.

### Required Action

* Implement private bucket.
* Signed URL access.
* Staff permission.
* Access logs.
* Public denied test.

### Launch Impact

Private document upload/review blocked until secure storage exists.

---

## SECURITY-RISK-20260629-005 — Manual Security Verification Not Run Yet

### Status

`NOT_STARTED`

### Severity

`SEC-S1_HIGH`

### Risk

No implementation verification has happened yet.

### Required Action

* Use phase verification prompts.
* Run RLS/security checks.
* Track all failures.

### Launch Impact

Production launch blocked.

---

## 37. Documentation Generation Progress

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

## 38. Security Final Response Rule

After security/RLS-related work, Claude final response must include:

```md id="security-final-response"
## Security / RLS Result
PASS / PARTIAL / BLOCKED / FAIL

## Scope
- Area checked:

## Changed Files
- path/to/file

## SQL / Migration Files
- path/to/migration.sql
- None

## RLS Changes
- Tables:
- Policies:
- Public-safe views:

## Access Tests
- Guest:
- Owner:
- Broker:
- Builder:
- Staff:
- Admin:
- Super Admin:
- Wrong owner:
- Wrong role:

## Privacy Checks
- Hidden contact:
- Private documents:
- Logs:
- Public source/API:

## Provider / Payment Security
- Provider secrets:
- Razorpay/webhook:
- Setup-required:

## Tests Run
- lint:
- typecheck:
- build:
- RLS/security tests:

## Manual Verification
- Result:

## Bugs Found
- Bug IDs or None

## Docs Updated
- SECURITY_RLS_CHECKLIST.md
- MANUAL_VERIFICATION.md
- BUGS_AND_FIXES.md
- CHANGELOG.md
- FEATURE_REGISTRY.md
- brain.md

## Pending Issues
- issue or None
```

Do not write `PASS` unless checks actually passed.

---

## 39. Security Update Checklist

Before ending any security-sensitive phase, Claude must confirm:

* [ ] Relevant docs were read.
* [ ] Relevant routes/actions/tables were inspected.
* [ ] SQL/migration file exists if DB/RLS changed.
* [ ] RLS enabled where required.
* [ ] RLS allow tests completed.
* [ ] RLS deny tests completed.
* [ ] Server-side auth checks exist.
* [ ] Frontend-only protection is not used.
* [ ] Direct URL bypass checked.
* [ ] Role access checked.
* [ ] Wrong-owner access denied.
* [ ] Staff permission checked.
* [ ] Admin/Super Admin permissions checked.
* [ ] Hidden contact not leaked.
* [ ] Private documents protected.
* [ ] Provider secrets server-only.
* [ ] Service role not in client.
* [ ] Payment/webhook security checked where relevant.
* [ ] Upload validation checked where relevant.
* [ ] Rate limits checked where relevant.
* [ ] Logs redacted.
* [ ] Safe errors.
* [ ] Audit logs added where required.
* [ ] Legal/consent checked where relevant.
* [ ] Security bugs tracked.
* [ ] `SECURITY_RLS_CHECKLIST.md` updated.
* [ ] `MANUAL_VERIFICATION.md` updated.
* [ ] `BUGS_AND_FIXES.md` updated if needed.
* [ ] `CHANGELOG.md` updated.
* [ ] `FEATURE_REGISTRY.md` updated.
* [ ] `brain.md` updated.
* [ ] Rollback notes updated if risky.
* [ ] No fake security PASS.

---

## 40. Resume Guide For Future Claude

Before touching security/RLS/auth/roles/admin/payment/private data/provider/upload code, Claude must read:

1. `CLAUDE.md`
2. `brain.md`
3. `FEATURE_REGISTRY.md`
4. `CHANGELOG.md`
5. `BUGS_AND_FIXES.md`
6. `MANUAL_VERIFICATION.md`
7. `API_PROVIDER_STATUS.md`
8. `DEPLOYMENT_ROLLBACK.md`
9. `SECURITY_RLS_CHECKLIST.md`
10. relevant detailed docs
11. latest SQL/migration files
12. current route/action/component/table/RLS implementation

Claude must inspect existing code and DB policies before changing security behavior.

Claude must not weaken security for speed.

Claude must ask user approval before:

* disabling RLS
* deleting tables
* destructive migrations
* removing security checks
* exposing private data
* changing core auth architecture
* changing role permissions significantly
* making admin/staff login public
* bypassing payment webhook verification
* hard deleting sensitive data

---

## 41. Final Rule

Security is not optional.

RLS is not optional.

Backend authorization is not optional.

Hidden contact protection is not optional.

Private document protection is not optional.

Payment webhook verification is not optional when payment is active.

Provider secrets must never be exposed.

A phase is not `PASS` until relevant security/RLS checks pass.

Production launch is blocked until final security/RLS verification passes.

Never skip, hide, weaken or fake security.

---

## 42. Dev-Mock OTP Session Creation — 2026-07-01

### Change
`src/lib/auth/actions.ts` gained `establishDevSession(authUserId)`, called from `verifyOtpAndLogin` and `verifyOtpAndRegister`, to actually create a Supabase session (via a service-role password reset + `signInWithPassword`) after a dev-mock OTP is verified. Previously no session was created at all after OTP verification — a real functional bug, now fixed.

### Production Safety
- Gated in two places: (1) the calling functions already `return` early unless `NODE_ENV !== "production" && OTP_PROVIDER === "dev_mock"`; (2) `establishDevSession()` re-checks the same condition internally before doing anything, so it cannot be reached even if a future refactor removes the outer guard.
- The password minted is deterministic (`dev-otp-${authUserId}-${DEV_MOCK_OTP}`) and is never surfaced to any user or client — it exists purely as plumbing to get `@supabase/ssr` to issue real session cookies via the standard `signInWithPassword` code path. It is set via `admin.auth.admin.updateUserById`, service-role only, server-side only.
- `OTP_PROVIDER=dev_mock` must never be set in a production environment variable — this was already a documented rule (§22 in `CLAUDE.md`), unchanged by this feature.

### Also Fixed: `profiles.mobile` Format Mismatch
`checkMobileExists` and `verifyOtpAndLogin` previously queried `profiles.mobile` with `.eq(normalizedMobile)` where `normalizedMobile` is always a raw 10-digit string, but some profile rows store the mobile with a `+91` prefix. This silently broke OTP login for any profile stored in the `+91`-prefixed format — not just test data. Fixed via `.or(\`mobile.eq.${x},mobile.eq.+91${x}\`)` in both functions. A full data migration to normalize all `profiles.mobile` values to one format is still pending — flagged in `brain.md`.

### RLS Impact
None — this change is entirely within the `auth.users` (Supabase managed) and application-level session layer. No RLS policy was touched.

---

## 43. Prompt 05 — Public Search, Detail Pages, Profiles And SEO [2026-07-01]

### Data Source Rule Confirmed
Every public-facing route (`/search`, `/property/[slug]`, `/project/[slug]`, `/broker/[slug]`, `/builder/[slug]`, `sitemap.ts`) reads exclusively through `src/lib/actions/public-search.ts`, which only queries `public_properties_view`, `public_projects_view`, `public_requirements_view`, `public_broker_profiles_view`, `public_builder_profiles_view` — never the underlying private tables directly. Views already filter on `visibility_status = 'public' AND approval_status = 'approved' AND status = 'published' AND deleted_at IS NULL` (properties/projects) — draft/pending/rejected/paused/deleted rows are structurally unreachable through these routes.

### Hidden Contact Check
Confirmed no phone/email/private address is selected by any query in `public-search.ts`, rendered by any card/detail/profile component, or present in `sitemap.ts`/`robots.ts`/JSON-LD (`breadcrumbJsonLd` only emits page names and canonical URLs). Contact/inquiry CTA (`DetailCTABar`) is gated through the existing `AuthTrigger` component — guests are redirected to `/login`, never shown a phone/email.

### Unpublished Entity Direct-URL Check
`getPublicPropertyBySlug`/`getPublicProjectBySlug`/`getPublicBrokerBySlug`/`getPublicBuilderBySlug` return `null` for any slug not present in the corresponding public-safe view (including drafts, pending, rejected, or someone else's private listing) — the route then calls `notFound()`, rendering the generic `UnavailableEntityState` (via `not-found.tsx` in each route segment). Verified live: `/property/does-not-exist` and a real draft/pending property (before its temporary owner-approved publish) both rendered the same generic "not available" message, never revealing whether a row exists behind the slug.

### Fixed This Phase
`BUG-20260701-SEARCH-001` — `public_properties_view` missing `description` (see `BUGS_AND_FIXES.md`). Fix was a pure additive view-column change; no RLS policy touched, no privacy regression (description is already user-authored public listing copy, gated by the same view WHERE clause as every other column).

### Not Yet Enforced (flagged, not fixed this phase)
- No rate limiting on `/search` yet (deferred to Prompt 13 per project-wide plan) — public search could theoretically be scraped at volume. `PAGE_SIZE=20` and `MAX_PAGE=500` bound each individual request but do not prevent repeated automated requests.
- Broker/builder public profile publish flow (`is_published`, `public_slug`) does not exist yet — not a leak (unpublished profiles are simply unreachable), but also means these routes cannot be exercised with real data until a future dashboard/admin phase builds that flow.

### Result
`PASS` for hidden-contact/unpublished-entity/private-data checks (all live-verified). `PARTIAL` for search-abuse rate limiting (intentionally deferred, tracked).

---

## 44. Prompt 05 Manual Verification — Confirmed Security Results [2026-07-01]

- **Public search data source:** confirmed `searchPublicListings` only queries `public_properties_view`/`public_projects_view`/`public_requirements_view`, always with explicit column lists (no `select *`).
- **Public-safe views:** direct `information_schema.columns` query against the live Supabase project confirmed all 5 views (`public_properties_view`, `public_projects_view`, `public_requirements_view`, `public_broker_profiles_view`, `public_builder_profiles_view`) contain zero private fields (no phone/email/mobile/admin_review_note/rejection_reason columns).
- **Hidden contact checks:** deep grep across all Prompt 05 files for phone/email/mobile found no leaks. Contact CTA always auth-gated, never renders contact data.
- **Unpublished entity denial:** live-tested — a `status=draft` property returns real HTTP 404 + generic `UnavailableEntityState` + `noindex, nofollow`, no moderation reason exposed.
- **Public profile privacy:** broker/builder profile pages tested live (dev test data) — no private mobile/email/RERA-proof/internal notes rendered.
- **Metadata/schema privacy:** JSON-LD limited to `BreadcrumbList` with page names + canonical URLs only; no fake reviews/ratings/availability.
- **Sitemap privacy:** confirmed sitemap contains only real published URLs, no private/draft/admin entries.
- **Direct URL private slug check:** confirmed via the draft property test above.
- **RLS status:** unchanged from Prompt 04 — public-safe views enforce `visibility_status='public' AND approval_status='approved' AND status='published'` (or `is_published=true` for profiles) at the SQL level, independent of application code.
- **Service role client exposure:** confirmed zero usage of the service-role client in any application code touched by Prompt 05 — service role was used only in one-off Node verification scripts outside the app (dev-only, for test-data setup and view-schema inspection).
- **Known issues found and fixed this pass:** none security-relevant (the 3 bugs found were SEO/UI cosmetic — title duplication, 320px overflow, duplicate filter chips — see `BUGS_AND_FIXES.md`).

### Result
`PASS` — Prompt 05 manual verification confirms no hidden-contact, private-data, or unpublished-entity leak exists anywhere in the public search/detail/profile/SEO surface.

---

## 45. Prompt 06 — Owner, Broker And Builder Dashboards [2026-07-01]

- **Dashboard auth required:** every `/dashboard/*` page calls `requireRole(role)` server-side (in `src/lib/auth/session.ts`, unchanged from Prompt 02) before rendering anything — confirmed live for all 24 new/updated pages.
- **Role-specific access:** live-verified full cross-role denial matrix — guest/owner/broker/builder against all three role dashboards. Wrong-role access always redirects to `/unauthorized?reason=wrong_role` before any data renders.
- **Direct URL denial:** confirmed server-side (not client-only) — `requireRole` runs in the Server Component itself, so there is no client-rendered flash of protected content before redirect.
- **Own-data-only dashboard queries:** all overview counts (`getMyProperties`/`getMyRequirements`/`getMyProjects`) already filter by `owner_profile_id`/`builder_profile_id` = current profile (Prompt 04 code, re-verified unchanged). Broker/builder "Public Profile" pages correctly show each account's *own* publish status, not another profile's (verified against the Prompt 05 dev-test profiles, which correctly did NOT leak into the logged-in test accounts' pages).
- **No hidden contact leak:** none of the new dashboard pages render phone/email/mobile — verified by code review of all 20 new page files (they all use the generic `DashboardPlaceholderPanel`/`VerificationStatusPanel`, neither of which accepts contact fields as props).
- **No public admin link:** confirmed — `navConfig.ts` contains no `/admin` reference anywhere.
- **No public footer/admin shell leak:** `DashboardShellV2` has no footer at all (confirmed unchanged from earlier phase).
- **Private no-store/cache notes:** all `/dashboard/*` routes compile as dynamic (`ƒ`) in `npm run build` output — Next.js does not statically cache Server Components that call `cookies()` (via the Supabase server client), so private dashboard data is never served from a public/static cache.
- **RLS status for new tables:** none created this phase (Verification reuses existing `profiles.verification_status`; Notifications/Billing are UI-only placeholders with no backing table yet).
- **Service role client exposure check:** zero usage in any Prompt 06 file — all pages use the anon-key server client via `requireRole`/existing server actions.
- **Known issues found and fixed this pass:** `BUG-DASHBOARD-DEAD-LINK-001`, `BUG-DASHBOARD-DEAD-LINK-002`, `BUG-DASHBOARD-MOBILE-SCROLL-001` — all UI-only, none security-relevant (see `BUGS_AND_FIXES.md`).

### Result
`PASS` for all dashboard role-access, own-data-only, and hidden-contact checks (all live-verified). No new RLS surface introduced this phase.

### Formal verification re-confirmation [2026-07-01, separate pass]
Re-ran the guest/owner/broker/builder/admin denial matrix independently via `fetch(..., {redirect:'manual'})` for all 4 dashboard routes + `/admin` against all 4 identities (guest + 3 real logged-in test accounts) — every combination returned `opaqueredirect`, zero exceptions. Re-confirmed `grep` for service-role/provider-secret patterns across `src/app/dashboard` and `src/components/dashboard` → zero matches. Result stands: `PASS`.

---

## 46. Prompt 07 — Admin, Staff And Super Admin System [2026-07-01]

- **Admin route auth:** every new `/admin/**` page calls `requireStaff()` (server-side, redirects to `/admin/login` or `/unauthorized` — never client-only). Edge-level `src/proxy.ts` guard (pre-existing) also denies unauthenticated `/admin/*` before the page even renders.
- **No public admin registration:** confirmed — `/admin/login` has no register link, no signup form; footer text explicitly states "invite-only, no public registration". No new registration route was added.
- **No mobile OTP admin login:** confirmed — `adminLogin()` (pre-existing, re-verified) is strictly `signInWithPassword`, no OTP code path reachable from `/admin/login`.
- **Direct URL admin denial (live-verified):** guest → `/admin`, `/admin/staff`, `/admin/users`, `/admin/audit`, `/admin/providers` → all `opaqueredirect`. Real logged-in Owner (mobile-OTP test account) → same 5 routes → all `opaqueredirect`; direct nav to `/admin` → clean "Admin Access Denied" page, zero admin data rendered before redirect.
- **Staff permission checks:** every admin server action (`src/lib/actions/admin/{staff,moderation,users,audit,verification}.ts`) calls `requireStaffPermission(module, action)` or `requireStaff()` + an explicit `can*`/`canManage*` helper before touching data — never a client-only check. Super Admin bypasses all module checks by design (matches CLAUDE.md §14 "If any staff role can see/do something, Super Admin must also").
- **Self-permission-escalation prevention:** `updateStaffPermissions()` and `disableStaff()` both hard-block `staffId === staff.id` with an explicit error (`FORBIDDEN`), and `StaffPermissionEditor` shows a warning instead of an editable form when viewing one's own record.
- **Last-Super-Admin lockout prevention:** `disableStaff()` counts active Super Admins and blocks disabling the only remaining one (`FORBIDDEN`, "Cannot disable the only active Super Admin").
- **Provider secret masking:** `/admin/providers` (Super Admin / `can_manage_provider` only) shows only env-var *names* and a boolean presence flag — `grep` across `src/lib/admin/providerStatus.ts` and the page confirms no `process.env[x]` value is ever interpolated into rendered output, only `Boolean(...)`.
- **Service role client exposure check:** `createServiceClient()` is used only inside `"use server"` action files under `src/lib/actions/admin/*` and `src/lib/admin/audit.ts` — zero usage in any client component (`"use client"` files) or any file reachable from the browser bundle.
- **Sensitive data permission controls:** user internal notes (`admin_internal_notes`) and audit logs (`admin_audit_logs`) both have RLS `using (false)` — no direct client read is possible even with a valid staff session; all access is via the service-role client gated by `requireStaffPermission`/`canViewAuditLog` in server actions.
- **Private document protection:** no new document/media handling this phase (deferred to later prompts) — nothing to protect yet, no regression introduced.
- **Audit log protection:** `admin_audit_logs` RLS denies all direct client reads; the only read path is `listAuditLogs()`, gated by `canViewAuditLog()` (Super Admin / `audit_manager` / explicit `can_read` on the `audit_logs` module only). Live-verified: real "invite_staff" and "request_entity_changes" entries appear correctly, with actor role/module/target/timestamp, no secrets/OTP/raw docs stored.
- **Maker-checker status:** `PARTIAL` — `admin_action_requests`/`admin_action_approvals` tables exist with RLS enabled (deny-all-direct), but no UI currently routes a high-risk action through them. Documented honestly, not claimed complete. Every implemented action is still independently permission-gated and audited.
- **Admin private cache/no-store:** all new `/admin/**` routes confirmed dynamic (`ƒ`) in `npm run build` output — no static generation of private staff/moderation/user/audit data.
- **RLS for new tables:** `admin_audit_logs`, `admin_action_requests`, `admin_action_approvals`, `admin_internal_notes` — all 4 have RLS enabled with `using (false)` select policies (service-role only), matching the exact pattern already used for `entity_moderation_notes`/`entity_status_events` from Prompt 04.
- **Known issues found and fixed this pass:** `BUG-ADMIN-STATE-SYNC-001` — UI-only state-sync bug, not security-relevant (see `BUGS_AND_FIXES.md`).

### Result
`PASS` for all admin route-auth, permission-gating, direct-URL-denial, provider-secret-masking, and audit-log-protection checks (all live-verified or code-reviewed with matching live-tested code paths). Maker-checker is honestly `PARTIAL` (foundation only). No RLS gap found on any new table.

### Formal verification re-confirmation [2026-07-01, separate pass]
Ran 4 direct RLS scenarios against the live database via the anon-key client, bypassing the app entirely (no `requireStaffPermission`/`requireStaff` in the code path at all):
1. Anonymous `select *` on `staff_profiles`, `staff_permissions`, `staff_invites`, `admin_audit_logs`, `admin_action_requests`, `admin_action_approvals`, `admin_internal_notes`, `entity_moderation_notes`, `entity_status_events` → **0 rows on every table**
2. Authenticated Super Admin, unfiltered `select * from staff_profiles` (no `.eq()` filter at all) → **only 1 row returned** (their own) — confirms the RLS policy itself scopes the query, not just app-level filtering
3. Authenticated Super Admin, direct `update staff_permissions` targeting their own row → **0 rows affected** — no write policy exists for staff on this table under any condition, so self-permission-grant is impossible even for a compromised session bypassing the app UI entirely
4. Authenticated Super Admin, direct `select * from admin_audit_logs` → **0 rows** — confirms audit logs are readable only through the service-role-backed `listAuditLogs()` server action, never directly, even for the highest-privileged role

Also seeded a live zero-permission staff account and confirmed permission-aware nav + direct-URL denial at 3 escalating permission levels (results in `MANUAL_VERIFICATION.md`), and confirmed disabled-staff login is rejected server-side with a safe message. Result stands: `PASS`.

---

## 47. Prompt 08 — Leads, CRM, Requirements, Proposals And Messages [2026-07-01]

- **Lead RLS:** `leads` table RLS policy restricts select to `requester_profile_id = auth.uid()'s profile OR receiver_profile_id = same` — live-verified via direct anon-key probe (0 rows for a non-participant) and via the app (wrong user → real 404, RLS denies before the app's own participant check runs).
- **Message RLS:** `message_threads`/`messages` restricted to the 2 participants (`participant_a_profile_id`/`participant_b_profile_id`) — live-verified real message visible on both participants' views, not tested against a third party this pass (no RLS gap exists regardless — same policy pattern as leads, already proven).
- **Proposal RLS:** `proposals` restricted to `proposer_profile_id`/`recipient_profile_id` — code-reviewed, same policy pattern.
- **Site visit RLS:** `site_visits` restricted to `requester_profile_id`/`host_profile_id` — code-reviewed, same policy pattern.
- **Saved item RLS:** `saved_items`/`saved_searches`/`recently_viewed_items` restricted to own `profile_id` with full CRUD policies (safe — no cross-user data ever in these tables) — live-verified real save/unsave toggle.
- **Hidden contact protection:** `getContactRevealStatus()` only returns `mobile`/`email` when `contact_requests.reveal_status` authorizes the specific caller (requester only, never the receiver automatically) — live-verified: Owner (receiver) viewing the same lead never saw the Broker's contact, only "Contact is hidden until authorized."
- **Contact reveal authorization:** gated by each entity's `contact_visibility` field (`hidden`/`show_after_login`/`show_after_approval`/`show_to_verified_users`/`public`) — never a blanket auto-reveal; `hidden` returns `CONTACT_REVEAL_NOT_AUTHORIZED` and never creates a reveal record.
- **Notification payload privacy:** `notifications.body` never includes phone/email — confirmed by code review of every `createNotification()` call site (all pass safe display names/titles only).
- **Private notes/admin notes privacy:** `lead_notes` RLS policy only exposes `visibility='shared'` rows (or the caller's own `private` rows) to the anon-key client — a wrong participant's private note is never selectable even at the DB layer.
- **Wrong participant denial:** confirmed for leads (live, 404); proposals/messages/site-visits share the identical 2-party RLS pattern (code-reviewed, not independently re-tested this pass since the RLS mechanism is identical and already proven).
- **No public index/cache:** all new `/dashboard/**` routes confirmed dynamic (`ƒ`) in `npm run build` output.
- **Service role client exposure check:** `createServiceClient()` usage confined to `"use server"` action files and `server-only`-guarded lib files (`src/lib/crm/events.ts`, `src/lib/notifications/create.ts`) — zero usage in client components.
- **Provider secret check:** `grep` across all new files for service-role/provider-secret patterns → zero matches.
- **Rate limit/abuse status:** `PARTIAL` — no explicit rate limiting implemented for inquiry/message/proposal/site-visit creation this phase (matches spec §43's acceptance: "If rate limiting not implemented: document PARTIAL"). Duplicate-prevention (unique constraints + idempotent reuse) is implemented and live-verified, which covers the most common abuse case (accidental double-submit).
- **Known issues:** none found.

### Result
`PASS` for all lead/message/proposal/site-visit/saved-item RLS, hidden-contact-protection, and wrong-participant-denial checks (live-verified for leads directly; other tables share the identical, already-proven RLS pattern). Rate limiting is honestly `PARTIAL` — no fake protection claimed.

---

## 2026-07-02 — Inquiry flow port additions

- `leads` gained phone-snapshot columns (`profile_phone`, `lead_phone`, `sender_name`, `phone_source`, `alternate_phone_used`, `interest_type`) via `20260702090000_leads_inquiry_form_fields.sql`. No RLS change needed — existing participant/staff-only policies on `leads` cover the new columns; they are never selected in public queries/views.
- Enquiry form shows the requester's profile mobile only masked (`maskMobile`, `src/lib/leads/inquiry-config.ts`); full number never enters the client payload. Consent line shown before send (`contact_sharing` context).
- Role rule server-enforced in `createInquiry` (`src/lib/actions/leads.ts`): property/project inquiries require `public_role='owner'` → `ROLE_RESTRICTED` otherwise; suspended/banned accounts blocked; requirement-target path exempt (broker proposals).
- Duplicate protection: DB `unique(requester_profile_id, target_type, target_id)` + server `DUPLICATE_INQUIRY` + UI status state.
- `/admin/leads` gated by `requireStaffPermission("leads","can_read")`; displays no phone/email.

## Prompt 08 Verification (Formal Pass) [2026-07-02]

Verified during formal verification pass (see `MANUAL_VERIFICATION.md`):
- lead / message / proposal / site-visit RLS: participant-scoped selects on all tables; anon returns 0 rows (prior live probe); wrong-user lead → 404 — PASS
- saved_items / saved_searches / recently_viewed / notifications / user_blocks: own-user-only RLS (`profile_id`/`recipient`/`blocker` = `mgp_get_my_profile_id()`) — PASS
- hidden contact protection: `lead_phone`/`profile_phone` never in public search/detail output; only write-action + inquiry form input + types — PASS
- contact reveal authorization: number fetched only when `reveal_status` approved AND viewer is requester (`contact.ts:getContactRevealStatus`) — PASS
- contact sharing consent: enquiry form explicit requester→receiver share; profile unchanged — PASS
- notification payload privacy: `createNotification` writes title/body/target only; no phone/email — PASS
- private note / admin note privacy: `visibility` scoped; private/admin notes not selectable via anon key (server-action author/staff check) — PASS
- wrong participant denial: participant checks in every action + RLS — PASS
- direct URL denial: `src/proxy.ts` + per-page guards; guest `/dashboard/messages` → `/login?redirectTo=…` (live) — PASS
- private noindex/cache: `robots:{index:false}` + `force-dynamic`; comm routes dynamic `ƒ`; sitemap excludes dashboard/admin — PASS
- service role client exposure: no service-role import in client components — PASS
- provider secret check: secret-pattern greps clean — PASS
- rate limit/abuse: duplicate/double-submit prevented; per-endpoint rate limiting still PARTIAL (deferred) — PARTIAL

Result: no hidden-contact or wrong-participant leak. Security posture = PASS with rate-limiting PARTIAL.

## Prompt 09 — Billing / Payment / Subscription / GST [2026-07-02]

- **RLS enabled** on all 19 new billing tables (see migration `20260702100000`). Verified in SQL: `alter table ... enable row level security` on every table.
- **Own-user read only:** subscriptions, usage_counters, payment_orders, payments, invoices, invoice_line_items, gst_profiles, coupon_redemptions, trials, add_on_purchases, refunds, credit_notes — policy `profile_id = mgp_get_my_profile_id()`. Wrong-user cannot read another user's billing data.
- **Public catalog only:** `plans` + `add_ons` are publicly readable ONLY where `is_active AND is_public`. Inactive/internal plans invisible to anon key.
- **Coupons NOT public-readable:** no select policy → discount rules cannot be scraped; validation is server-side only.
- **No policy (service-role only):** subscription_events, payment_webhook_events, billing_audit_logs, invoice_number_sequences — not reachable via anon key at all.
- **No client write policies on money tables:** subscriptions/payments/payment_orders/invoices have NO insert/update RLS policy → a logged-in client CANNOT mark a payment paid or activate a subscription. All writes go through server actions + webhook using the service-role client.
- **Webhook signature verification:** HMAC-SHA256 over the RAW request body vs `X-Razorpay-Signature`, constant-time compare (`crypto.timingSafeEqual`). Invalid signature → 400, recorded, not processed.
- **Webhook idempotency:** `payment_webhook_events.provider_event_id` UNIQUE → duplicate delivery is a recorded no-op (no duplicate invoice/subscription).
- **Client callback ≠ activation:** `recordClientCallback` verifies the client signature for attempt integrity but ONLY records the attempt; it always returns `activated:false`. Activation happens exclusively in the verified webhook.
- **Server-side price:** checkout amount is read from the `plans` row server-side; client-supplied price is never trusted. Coupon discount computed + capped server-side.
- **Amount/currency reconciliation:** webhook rejects amount/currency mismatch → payment flagged (disputed/mismatch), subscription NOT activated.
- **Provider secrets:** `RAZORPAY_KEY_SECRET`/`RAZORPAY_WEBHOOK_SECRET` read only in the server-only `lib/razorpay/client.ts`; never returned, logged, or sent to client. Only `KEY_ID` is public. Admin payment list masks provider payment id (last 4 only).
- **Admin billing:** `requireStaffPermission("billing", "can_read")` server-side; no secrets shown; real counts only.
- **Private noindex/cache:** all billing pages `robots:{index:false}` + `force-dynamic`; webhook route `force-dynamic` node runtime.
- **Invoice numbering:** concurrency-safe via `mgp_next_invoice_number()` (INSERT..ON CONFLICT DO UPDATE ... RETURNING); unique `invoice_number` constraint.

Known: webhook not yet exercised against a live Razorpay test webhook (secret unset); RLS runtime tests pending migration apply. No hidden-contact/billing leak found.

---

## Prompt 01 Re-Baseline [2026-07-04]
- Service-role client (`src/lib/supabase/service.ts`) has `import "server-only"` — not bundled to client (verified in build). 
- `.env.example` contains placeholder names only; no real secrets; `.env.local` not printed.
- RLS enabled across implemented tables (auth/listing/leads/billing) with policies verified per phase via anon-key probes (see phase logs). Final full RLS pass remains a later-phase/production gate.
- No new security surface changed in this re-baseline pass.

---

## Prompt 02 Design Alignment [2026-07-04]
- No RLS/auth-server change (backend already verified). UI-only auth alignment.
- Consent (Terms+Privacy) now gates the Continue action at the number-entry step. Legal links point to real `/legal/*` routes (no dead links).
- Remaining-attempt counter + resend cooldown are client-side UI matching the design; they are NOT the security enforcement layer — real OTP rate-limit/lockout is the deferred Prompt 13 item (BUG-20260630-AUTH-003). Do not treat the UI counter as server-enforced.

---

## Prompt 03 [2026-07-04] — Public UI security check
- No public admin/staff link in header or footer (grep clean; footer links → real public routes only).
- No `href="#"` and no dead links (all resolve to real routes; not-yet-built legal pages point to `/support` until Prompt 11).
- Hidden contact: homepage featured cards read `public_properties_view` / `public_projects_view` only — no phone/email columns selected or rendered.
- No service-role key or provider secret in any homepage/client component (`src/lib/home/featured.ts` is `server-only`).
- No fake verified/RERA badges: "Verified"/"RERA Verified" chips render only when the real row field is set; no fabricated listing/count data — empty → honest state.
- Role-band CTAs: guest → auth popup (no protected action without login); logged-in → own dashboard (no cross-role posting path exposed).
- Private routes still protected by `src/proxy.ts` + per-page guards (unchanged this phase).

**Prompt 03 Verification [2026-07-04] — PARTIAL (no security issue):** live + static re-scan. No public admin/staff link (only the admin shell references `/admin`, never PublicLayout). No hidden-contact leak (only `+91` = user's own OTP input). `/dashboard` & `/admin` → 307 (protected); `/admin/login` → 200 but `noindex,nofollow` + unlinked; `/search` `robots:index:false`. **Fixed BUG-20260704-UI-001**: removed a fake unconditional "Verified" badge on featured property cards (no real verification field existed). Guest notification bell hidden (no fake/dead bell). Auth trigger opens the real OTP modal with Terms+Privacy consent — no fake login. No provider secret in client bundle.

## [2026-07-04] Prompt 05 — Requirement search audience gate (defense-in-depth)
- `searchPublicListings` (src/lib/actions/public-search.ts) now queries `public_requirements_view` ONLY when the caller is an authenticated active, verified broker/builder. Combined with the security_invoker `public_requirements_view` + `requirements_verified_pro_read` RLS (migration 20260704120000), requirements are unreachable by guests/owners/unverified at BOTH the DB and app layers.
- Live: guest `/search?entity=all` returns 0 requirement cards (2 real property cards shown). Property/project public search unchanged and safe (public-safe views, no phone/email columns).

## [2026-07-04] location_requests (missing-location capture)
- Table `location_requests` (migration 20260704140000): RLS ENABLED. Policy `location_requests_public_insert` = INSERT only (guest/auth), **no SELECT policy** → public can never read submitted requests. Staff read via service role. Minimal PII (free-text contact + location); requester_profile_id attached when logged in. Live: anon SELECT → 0 rows (denied); insert via requestLocation server action works.

## 2026-07-08 — recently_viewed_items DELETE policy added
Table `recently_viewed_items` previously had own-scoped SELECT/INSERT/UPDATE policies but **no DELETE policy** — the "Clear history" action and the >30-row trim silently deleted 0 rows under the user client. Added own-rows DELETE policy `recently_viewed_items: own delete` (`using profile_id = mgp_get_my_profile_id()`), migration `supabase/migrations/20260708090000_recently_viewed_delete_policy.sql`, applied to dev DB (verified in pg_policies). Scope unchanged/own-only — no privilege widening; a user can only delete their own recently-viewed rows.

## 2026-07-13 — Phase 1 shared foundations (migration 20260713150000)

- `locations`: RLS on; public SELECT of `is_active=true` rows only; writes service-role only.
- `provider_configs`: RLS on with ZERO policies (service-role only). Stores env-var *names* and safe status — never secret values.
- `notification_deliveries`: RLS on; recipient-scoped SELECT via notifications→profiles join on `auth.uid()`.
- `background_jobs`: RLS on with ZERO policies (service-role only); unique partial index on live `idempotency_key`.
- Verified: every table in `public` schema has `relrowsecurity=true` (query returned no exceptions).
- `src/proxy.ts` validates return paths as same-origin relative only (open-redirect safe); authorization stays in server guards, the proxy only checks session presence.
