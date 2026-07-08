# CLAUDE RUN PROMPTS — MY GUJARAT PROPERTY (TOKEN-LIGHT VERSION)

Same 16-phase build+verify sequence as `Calude Prompt.pdf`. All standing rules (non-negotiables, design-replace-not-restyle, doc-update list, docs to update, no-fake rules, Final Response Format, phase workflow) already live permanently in **CLAUDE.md** — Claude reads that file every session automatically, so this version does **not** repeat them in each block. Nothing from the original prompt file has been deleted; every rule and every phase-specific design/add-on detail below is preserved — only the boilerplate that duplicated CLAUDE.md was cut.

Run one block → wait for "NEXT" → run its verification block → wait for "NEXT" → move to next phase.

---

## PROMPT 00 — START

Read `brain.md`, `FEATURE_REGISTRY.md`, `CHANGELOG.md`, `BUGS_AND_FIXES.md`, `MANUAL_VERIFICATION.md`, `API_PROVIDER_STATUS.md`, `DEPLOYMENT_ROLLBACK.md`, `SECURITY_RLS_CHECKLIST.md`, `PERFORMANCE_CHECKLIST.md`, `prompts/00_PROMPT_USAGE_RULES.md`, and `CLAUDE.md` in full. Apply all CLAUDE.md rules (§3A design source of truth, non-negotiables, workflow) without restating them.

Reply with: (1) Files read (2) Missing files (3) Current status from brain.md (4) Next file: `prompts/01_PROJECT_SETUP_BASELINE.md`. Wait for "NEXT PROMPT 01".

---

## PROMPT 01 — Project Setup & Baseline
Run `prompts/01_PROJECT_SETUP_BASELINE.md` fully. Apply CLAUDE.md rules as-is (docs to update, checks to run, Final Response Format).
Next: `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`

### Verify 01
Run `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md` fully per CLAUDE.md verification rules.
Next: `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`

---

## PROMPT 02 — Auth, Roles, RLS Foundation
Run `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md` fully.
**Design:** MGP DESIGN Batch 2 (Auth flows) — replace-not-restyle per CLAUDE.md §3A.
**Phase add-ons:** OTP overlay (modal/bottom-sheet), auto-submit on 6th digit, remaining-attempt counters, honest full-stop states, role selector, staff portal (email/password/Google, noindex, no OTP), invite acceptance, post-login redirect intent.
Next: `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`

### Verify 02
Run `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md` fully. Design-match vs Batch 2 + confirm all Design Add-Ons above are present.
Next: `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`

---

## PROMPT 03 — Public UI: Home, Header, Footer, Hero
Run `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md` fully.
**Design:** Batches 1 (design system) & 3 (home/search).
**Add-ons:** 3-zone header + mega-menu, contextual mobile header w/ back button, transliteration autosuggest, price-pin map + dismissible fallback, locked tokens brand #0F6B5C / Inter / radius 16-10, honesty states as visible UI.
Next: `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`

### Verify 03
Run verification file fully. Design-match vs Batches 1 & 3 + confirm add-ons above.
Next: `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`

---

## PROMPT 04 — Property, Project, Requirement System
Run `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md` fully.
**Design:** Batches 4 (detail), 5 (wizards), 8 (unit inventory).
**Add-ons:** Post Property = 9 steps; Post Project = 10 (RERA gate + live format mask); requirements need approval (Pending state) before public; On-Hold 4th unit status; override base price; featured-slot chip; unavailable-listing variant; PREVIEW frame.
Next: `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`

### Verify 04
Run verification file fully. Design-match vs Batches 4/5/8 + confirm add-ons above.
Next: `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`

---

## PROMPT 05 — Public Search, Detail, Profile, SEO
Run `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md` fully.
**Design:** Batches 3 (search) & 4 (detail/profiles).
**Add-ons:** Typo/transliteration search; masked contact reveal; sold/unavailable variant (no soft-404); compare tray; requirement masked-until-proposal-accepted; gallery per-photo caption; honesty labels as visible copy.
Next: `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`

### Verify 05
Run verification file fully. Design-match vs Batches 3 & 4 + confirm add-ons above.
Next: `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`

---

## PROMPT 06 — Owner, Broker, Builder Dashboards
Run `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md` fully.
**Design:** Batches 6 (owner), 7 (broker + CRM Kanban), 8 (builder + agents/ads).
**Add-ons:** Bottom nav Home·Search·Post(FAB)·Leads·Profile; drawer = full module list; Kanban desktop-only; "For client" broker requirements; featured/ad-wallet/seats meters; per-channel notification matrix; account-deletion double-guard.
Next: `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`

### Verify 06
Run verification file fully. Design-match vs Batches 6/7/8 + confirm add-ons above.
Next: `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`

---

## PROMPT 07 — Admin, Staff, Super Admin System
Run `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md` fully.
**Design:** Batches 11–15 (all admin).
**Add-ons:** Graphite admin shell, no bottom nav; uniform Approve/Request-Changes/Reject + reason + "will be logged"; per-viewer watermarked non-downloadable docs; maker-checker self-approval disabled; append-only audit w/ masked IP; permission-scoped nav.
Next: `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`

### Verify 07
Run verification file fully. Design-match vs Batches 11–15 + confirm add-ons above.
Next: `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`

---

## PROMPT 08 — Leads, CRM, Requirements, Proposals, Messages
Run `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md` fully.
**Design:** Batches 7 (broker CRM) & 9 (shared detail views).
**Add-ons:** Contact-reveal monthly quota (plan-limited); Call/Copy/WhatsApp; Kanban desktop-only + move-to-stage; follow-up reminders; duplicate-lead merge (reversible 30d); named reject/lost taxonomies; persistent chat safety banner; LINKED block.
Next: `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`

### Verify 08
Run verification file fully. Design-match vs Batches 7 & 9 + confirm add-ons above.
Next: `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`

---

## PROMPT 09 — Billing, Payment, Subscription, Trial, GST
Run `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md` fully.
**Design:** Batches 10 (billing/payment) & 12 (admin billing).
**Add-ons:** Metered plan resources (reveal quota, featured slots, ad-spend wallet auto-pause ₹0, team seats, proposals/mo); GST jurisdiction (CGST+SGST / IGST); coupon-on-invoice; honest payment states (success only after verified callback); manual-activation surfaced + audited.
Next: `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`

### Verify 09
Run verification file fully. Design-match vs Batches 10 & 12 + confirm add-ons above.
Next: `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`

---

## PROMPT 10 — Media, Storage, Uploads, R2/CDN
Run `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md` fully.
**Design:** Batches 5 (upload widget) & 11 (private-doc viewer).
**Add-ons:** Cover-select + drag-reorder + crop + % upload; brochures stored as PDF (never image); per-viewer watermarked non-downloadable private docs; 10 MB limit shown; 360°/video Setup-Required fallback.
Next: `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`

### Verify 10
Run verification file fully. Design-match vs Batches 5 & 11 + confirm add-ons above.
Next: `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`

---

## PROMPT 11 — Location, Search, SEO, CMS, Legal
Run `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md` fully.
**Design:** Batches 3 (search), 14 (CMS/SEO/location admin), 16 (public legal/blog/help).
**Add-ons:** Transliteration/alias search; shared legal-doc layout + TOC; legal versioning + sign-off; redirect loop guard; sitemap exclusion transparency; SEO counters + snippet preview; guest support rate-limit.
Next: `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`

### Verify 11
Run verification file fully. Design-match vs Batches 3/14/16 + confirm add-ons above.
Next: `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`

---

## PROMPT 12 — Ads, Promotion, Notifications, Providers
Run `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md` fully.
**Design:** Batches 8 (create-ad wizard) & 13 (ads/notifications/providers).
**Add-ons:** 7-step ad wizard w/ per-size creatives + "AD" labelling; ad-spend wallet auto-pause; camelCase `{{tokUserName}}` tokens; defaults apply to new users only; provider graceful-degradation states; OTP+SMS one card; write-only secrets; no fake provider status.
Next: `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`

### Verify 12
Run verification file fully. Design-match vs Batches 8 & 13 + confirm add-ons above.
Next: `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`

---

## PROMPT 13 — Security, Privacy, Fraud, Rate Limits
Run `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md` fully.
**Design:** Batches 9 (contact reveal) & 15 (audit/security/fraud).
**Add-ons:** Append-only audit w/ masked IP; contact-reveal logs meta-audited + abuse flag; named threat types + auto-block; maker-checker self-approval disabled; reason-required + logged enforcement; consent + rate-limits surfaced.
Next: `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`

### Verify 13
Run verification file fully. Design-match vs Batches 9 & 15 + confirm add-ons above.
Next: `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`

---

## PROMPT 14 — Performance, Caching, Deployment, Launch
Run `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md` fully.
**Design:** Batch 17 (advanced/PWA/localization/tools).
**Add-ons:** PWA install/offline/update logic; token-swap dark mode; transliteration search; Gujarat calculators (EMI/stamp-duty/land-units); accessibility quick-settings; Batch-17 final QA checklist.
Next: `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`

### Verify 14
Run verification file fully. Design-match vs Batch 17 + confirm add-ons above.
Next: `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

---

## PROMPT 15 — Final Production, API Testing, Signoff
Run `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md` fully.
**Design:** All batches + Batch 17 final QA checklist — run the Batch-17 developer-QA consistency checklist across the whole app (shells/nav, tokens, list states, modals/sheets, status-badge colors, wizards, honesty rules, mobile rules) and confirm every Design Add-Ons item across all phases above is actually built.
**Scope:** real OTP/payment/webhook/email/WhatsApp/R2/maps tests, RLS, role access, contact privacy, responsive, load, backup and rollback.
Next: `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`

### Verify 15 — Final
Run verification file fully. Design-match vs all batches + Batch 17 checklist. Confirm real (not faked) production readiness across auth, payment, providers, RLS, privacy, responsive, load, backup, rollback, and full design match.
Final status: PASS / PARTIAL / FAIL / BLOCKED. Next: project complete — production signoff.
