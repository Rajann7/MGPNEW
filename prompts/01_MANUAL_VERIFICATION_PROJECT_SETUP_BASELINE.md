# prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md

# My Gujarat Property — Prompt 01 Manual Verification: Project Setup Baseline

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/01_PROJECT_SETUP_BASELINE.md
```

This prompt verifies the **Project Setup Baseline** phase.

Do not skip this verification.

Do not start Prompt 02 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
Prompt Number: 01 Verification
Phase: Project Setup Baseline
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/01_PROJECT_SETUP_BASELINE.md
Previous Prompt: prompts/01_PROJECT_SETUP_BASELINE.md
Next Implementation Prompt: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
```

---

## 2. Verification Purpose

The purpose of this verification is to confirm the project baseline is clean, honest, and ready for future implementation phases.

This verification checks:

* project structure exists and is correct
* package manager identified
* framework version confirmed
* required scripts work (dev/build/lint/typecheck/format)
* build passes
* lint passes
* typecheck passes
* `.env.example` has no real secrets
* `.env.example` has all required provider placeholders
* Supabase client/server/service helpers are correctly separated
* service role key is server-side only
* no service role key in any client file
* no hardcoded fake data
* no fake provider success
* no dead links or buttons on homepage
* no public admin link
* homepage loads and shows correct brand name
* brand name "My Gujarat Property" is not wrapped
* root docs are all present and updated
* `supabase/migrations/` folder exists
* migration naming convention documented
* folder structure follows convention
* provider statuses are accurate (DEV_ONLY or SETUP_REQUIRED)
* baseline types/config/constants are present
* feature flags use env-driven logic only
* security headers are present in next.config
* no horizontal scroll issues at baseline
* bugs logged and tracked
* FEATURE_REGISTRY updated
* CHANGELOG updated
* brain.md updated with resume guide
* this verification file exists

This phase does not verify auth, RLS, listing, payment, admin, search, media, or any full feature. It verifies the baseline only.

---

## 3. Required Docs To Read First

Before verifying, confirm these files exist and are updated:

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
```

---

## 4. Project Structure Verification

Check that these exist:

```txt id="structure-check"
package.json
package-lock.json
tsconfig.json
next.config.ts
eslint.config.mjs
postcss.config.mjs
tailwind.config (built into postcss for v4)
.gitignore
.env.example
README.md
.prettierrc
src/app/layout.tsx
src/app/page.tsx
src/app/globals.css
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/service.ts
src/types/index.ts
src/config/index.ts
src/lib/feature-flags/index.ts
supabase/migrations/
supabase/README.md
docs/
prompts/
```

If any required file is missing, create bug and mark PARTIAL or BLOCKED.

---

## 5. Package Scripts Verification

Run and confirm result for each script:

```txt id="scripts-check"
npm run lint       → must pass with no errors
npm run typecheck  → must pass with no errors
npm run build      → must pass and show route list
npm run format     → must run without error
npm test           → document if not available (deferred = acceptable)
```

Record exact result for each.

---

## 6. Environment Variables Verification

Open `.env.example` and verify:

* No real API keys present
* No real JWT tokens present
* No real Supabase service role key present
* No real Razorpay keys present
* No real OTP/SMS credentials present
* No real email credentials present
* No real storage credentials present
* All provider placeholders are present as empty strings or commented hints
* `NEXT_PUBLIC_` prefix only on intentionally public keys
* `SUPABASE_SERVICE_ROLE_KEY` is NOT prefixed `NEXT_PUBLIC_`

If any real secret found: create critical bug BUG-XXXXXX-SEC-001, do not print secret, recommend rotation.

---

## 7. Supabase Client Safety Verification

Read `src/lib/supabase/client.ts`:

* Must use `NEXT_PUBLIC_SUPABASE_URL` only
* Must use `NEXT_PUBLIC_SUPABASE_ANON_KEY` only
* Must NOT import or use `SUPABASE_SERVICE_ROLE_KEY`
* Must be safe to use in Client Components

Read `src/lib/supabase/server.ts`:

* Must use `NEXT_PUBLIC_SUPABASE_URL` only
* Must use `NEXT_PUBLIC_SUPABASE_ANON_KEY` only
* Must use cookies for session
* Must NOT import or use `SUPABASE_SERVICE_ROLE_KEY`

Read `src/lib/supabase/service.ts`:

* Must use `SUPABASE_SERVICE_ROLE_KEY`
* Must throw clear error if key is missing
* Must NOT be exported from any client-facing module
* Must have comment stating server-side only

If any violation: create critical bug, mark BLOCKED.

---

## 8. Fake Data Verification

Search for and confirm no fake data exists:

* No hardcoded lead counts
* No hardcoded view counts
* No hardcoded property listings
* No hardcoded user names
* No fake payment success message
* No fake verified badge
* No fake OTP success
* No fake provider active state
* No fake notification count
* No fake analytics numbers

Check `src/app/page.tsx` — homepage must show real placeholder only, no fake listings.

---

## 9. Secret Exposure Verification

Check for hardcoded secrets in source files:

```txt id="secret-scan"
Search for: eyJ (JWT token prefix)
Search for: sk_live (Razorpay live key)
Search for: rk_live (Razorpay key)
Search for: AKIA (AWS key prefix)
Search for: sbp_ (Supabase access token)
Search for: service_role (in client-facing files)
```

If found in any tracked file: critical bug, do not print, recommend rotation.

---

## 10. Homepage Verification

Check `src/app/page.tsx` and `src/app/layout.tsx`:

* Title is "My Gujarat Property" or uses correct template
* Description is real (not "Generated by create next app")
* Homepage renders brand name
* No "Create Next App" text visible
* No Vercel/Next.js template links
* No dead buttons or dead `href="#"` links
* No public admin panel link
* No fake listings visible

---

## 11. Security Headers Verification

Check `next.config.ts` or `next.config.js`:

* `X-Content-Type-Options: nosniff` present
* `X-Frame-Options: DENY` present
* `Referrer-Policy` present
* Admin routes have `X-Robots-Tag: noindex, nofollow`

Full CSP is Prompt 13 — not required here.

---

## 12. Provider Status Verification

Check `API_PROVIDER_STATUS.md`:

* All providers have accurate status
* No provider marked `ACTIVE` without real tested credentials
* `DEV_ONLY` providers have documented owner decision
* `SETUP_REQUIRED` providers have placeholder documented
* No fake active state anywhere

---

## 13. Docs Presence Verification

Confirm all 10 root docs are present and contain Prompt 01 phase entries:

```txt id="docs-check"
CLAUDE.md              → present
brain.md               → updated with Prompt 01 section
FEATURE_REGISTRY.md    → has F01-xxx entries
CHANGELOG.md           → has Prompt 01 changelog entry
BUGS_AND_FIXES.md      → has Prompt 01 bugs section
MANUAL_VERIFICATION.md → has Prompt 01 verification section
API_PROVIDER_STATUS.md → has Prompt 01 provider table
DEPLOYMENT_ROLLBACK.md → has Prompt 01 deployment entry
SECURITY_RLS_CHECKLIST.md → has Prompt 01 security table
PERFORMANCE_CHECKLIST.md  → has Prompt 01 performance table
```

---

## 14. Migration Convention Verification

Confirm:

* `supabase/migrations/` directory exists
* `supabase/README.md` exists with naming convention
* No schema migrations exist yet (correct for Prompt 01)
* Convention documented: `YYYYMMDD_HHMMSS_description.sql`

---

## 15. Bug Tracking Verification

Confirm `BUGS_AND_FIXES.md`:

* All bugs found in Prompt 01 are documented
* Each bug has ID, severity, priority, status, description
* No bug is hidden
* Fixed bugs show resolution
* Blocked bugs show reason

---

## 16. brain.md Resume Guide Verification

Confirm `brain.md`:

* Has Prompt 01 section
* States current phase status
* States next step clearly
* Another Claude account could resume from this file

---

## 17. Verification Result Rules

Use only these results:

| Result | Meaning | Can Start Prompt 02? |
|--------|---------|----------------------|
| `PASS` | All checks pass, no blocking issues | Yes |
| `PARTIAL` | Minor issues, non-blocking, owner accepts | Only if owner approves |
| `BLOCKED` | Blocking issue prevents safe continuation | No |
| `FAIL` | Critical failure, must fix first | No |

---

## 18. Final Verification Checklist

Before marking result:

- [ ] Project structure complete
- [ ] All scripts run (lint/typecheck/build/format)
- [ ] No real secrets in `.env.example`
- [ ] Supabase client/server/service boundaries correct
- [ ] No service role in client files
- [ ] No fake data
- [ ] No fake provider success
- [ ] No dead links on homepage
- [ ] No public admin link
- [ ] Homepage shows real brand name
- [ ] Security headers present in config
- [ ] Provider statuses accurate
- [ ] All 10 root docs present and updated
- [ ] Migration folder exists
- [ ] Bugs tracked
- [ ] brain.md resume guide updated
- [ ] This verification file exists

---

## 19. Docs To Update After Verification

Update these files with verification result:

* `MANUAL_VERIFICATION.md` — final result for Prompt 01
* `CHANGELOG.md` — verification entry
* `brain.md` — next step updated
* `FEATURE_REGISTRY.md` — QA status updated for F01 items
* `BUGS_AND_FIXES.md` — any new bugs found
* `SECURITY_RLS_CHECKLIST.md` — baseline security confirmed
* `PERFORMANCE_CHECKLIST.md` — baseline performance confirmed
* `API_PROVIDER_STATUS.md` — if any status changed
* `DEPLOYMENT_ROLLBACK.md` — if rollback notes updated

---

## 20. Final Response Format

```txt id="verification-response-format"
Verification Summary:
- checks run
- issues found
- result

Files checked:
- list

Commands run:
- command: result

Docs updated:
- list

Issues found:
- list or none

Result: PASS / PARTIAL / BLOCKED / FAIL

Can start Prompt 02: Yes / No

Next step: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
```
