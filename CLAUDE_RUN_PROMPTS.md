# CLAUDE RUN PROMPTS — MY GUJARAT PROPERTY

> Copy-paste command file for driving the build in Claude Code (same project folder). **Design = source of truth** (finished 17-batch wireframes at `C:\Users\RAJAN\Documents\MGP DESIGN`).
> Paste ONE block, wait for the reply, then paste the next. Order: Prompt 00 → 01 IMPL → 01 VERIFY → 02 IMPL → 02 VERIFY → … → 15.

---

## ▶ BLOCK: PROMPT 00 — START PROJECT RULES
```text
You are working inside my project folder for "My Gujarat Property". First confirm you can access/read the project files. If you cannot, say exactly: "I cannot access the project folder from here. Please use Claude Code inside the project folder or enable local file access."

If you can access the files, read these fully first, without skipping anything: CLAUDE.md, brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md, prompts/00_PROMPT_USAGE_RULES.md, and CLAUDE.md §3A (Design Source Of Truth).

DESIGN IS THE SOURCE OF TRUTH — REPLACE, DO NOT RESTYLE. The complete finished UI/UX exists as a 17-batch wireframe set at C:\Users\RAJAN\Documents\MGP DESIGN. Every built screen must end up 100% visually identical (pixel-for-pixel) to the provided design. For every screen the design defines, remove the current screen's markup and rebuild it from the design's actual markup/layout/structure/classes — read the screen's real markup from the extracted design source (scratchpad design-extract/, or regenerate from the MGP DESIGN bundles) and port it exactly (same layout, styles, spacing, copy). Do NOT merely recolor or tweak the existing component, and do NOT reproduce it from memory or a text description; keep ONLY the backend wiring (server actions, data, RLS, route guards, validation) and mount it inside the design's markup. Consolidated add-on list: design-prompts/DESIGN_ADDONS_MASTER.md; per-batch deltas: design-prompts/delta-reports/. Only create net-new design for things absent from both design and docs, using Batch 1 tokens. Global rules: (1) honesty states are visible UI; (2) every mutating admin action is reason-required + logged. Locked conflicts: requirements need approval (Pending); Post Property = 9 steps; notification tokens {{tokUserName}} (camelCase); keep staff "suspended" status; OTP+SMS share one provider card.

Match the design's responsive behavior exactly (mobile-first): on every screen at every width (320/360/390/430/768/1024/1366/wide) there must be NO horizontal scroll, NO element outside the screen, NO overlap, NO cramped/broken layout, NO tiny fonts; tables become cards on mobile; sticky bars never cover content. Any non-responsive or overflowing screen is a FAIL — fix before PASS.

Follow every rule strictly. Do not skip/shorten/summarize any requirement. After every implementation prompt, run the matching verification prompt before the next. Update all required docs. If provider keys/env/Supabase/RLS/payment/OTP/SMS/WhatsApp/email/media/CDN/maps/monitoring/backup/production credentials or test data are missing, mark honestly as SETUP_REQUIRED / PARTIAL / BLOCKED / NOT_CONFIGURED / NOT_AVAILABLE. Do not fake PASS, data, provider/payment/OTP/SMS/WhatsApp/email/media/RLS/build/deployment success, or production readiness. Never expose hidden contact, secrets, service role keys, private media/documents/messages/leads/invoices/logs, admin notes, or private routes.

After reading, reply with: (1) Files read. (2) Missing files. (3) Current status from brain.md. (4) Next file to run: prompts/01_PROJECT_SETUP_BASELINE.md. Do not start Prompt 01 until I say "NEXT PROMPT 01".
```

---

## ▶ BLOCK: PROMPT 01 IMPLEMENTATION — Project Setup / Baseline
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/01_PROJECT_SETUP_BASELINE.md

Execute every requirement in the file completely. Implement the full project setup/baseline phase exactly as written. Before coding, read all required docs listed inside that prompt.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
```

## ▶ BLOCK: PROMPT 01 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md

Verify Prompt 01 completely. Verify Prompt 01 completely. Check every baseline/setup requirement honestly. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 02: Yes/No; Next step: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
```

---

## ▶ BLOCK: PROMPT 02 IMPLEMENTATION — Auth, Roles, Permissions, RLS Foundation
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/02_AUTH_ROLES_RLS_FOUNDATION.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batch 2 (Auth flows)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. OTP overlay (modal/bottom-sheet), auto-submit on 6th digit, remaining-attempt counters, honest full-stop states, role selector, staff portal (email/password/Google, noindex, no OTP), invite acceptance. Post-login redirect intent.

Execute every requirement in the file completely. Implement the full Auth, Roles, Permissions, Admin Login, Public OTP, Profiles, Protected Routes, Supabase/RLS foundation exactly as written. Do not skip auth guards, public role rules, admin separation, RLS, migrations, docs, or checks.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
```

## ▶ BLOCK: PROMPT 02 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batch 2 (Auth flows) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 02 completely. Verify public auth, OTP/register/login, Owner/Broker/Builder roles, admin/staff separate login, route guards, RLS policies, wrong-user denial, provider setup states, direct URL blocking, and docs. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 03: Yes/No; Next step: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

---

## ▶ BLOCK: PROMPT 03 IMPLEMENTATION — Public UI, Home, Header, Footer, Hero
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 1 (design system) & 3 (home/search)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. 3-zone header + mega-menu; contextual mobile header w/ back button; transliteration autosuggest; price-pin map + dismissible fallback; locked tokens brand #0F6B5C / Inter / radius 16-10; honesty states as visible UI.

Execute every requirement in the file completely. Implement the public UI, homepage, header, footer, hero, city selector, public role-aware navigation, responsive UI, mobile-first behavior, no-dead-links, and setup-required states exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
```

## ▶ BLOCK: PROMPT 03 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 1 (design system) & 3 (home/search) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 03 completely. Check homepage, header, footer, hero, city selector, public routes, mobile layout, no horizontal scroll, no dead links, role/device behavior, setup-required states, accessibility basics, and docs. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 04: Yes/No; Next step: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

---

## ▶ BLOCK: PROMPT 04 IMPLEMENTATION — Property, Project, Requirement System
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 4 (detail), 5 (wizards), 8 (unit inventory)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Post Property = 9 steps; Post Project = 10 (RERA gate + live format mask); REQUIREMENTS NEED APPROVAL (Pending state) before public; On-Hold 4th unit status; override base price; featured-slot chip; unavailable-listing variant; PREVIEW frame.

Execute every requirement in the file completely. Implement property posting, project posting, requirement posting, type-specific fields, location hierarchy, media fields, approval workflow, draft/pause/edit/delete behavior, role restrictions, database/RLS, migrations, docs, and checks exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
```

## ▶ BLOCK: PROMPT 04 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 4 (detail), 5 (wizards), 8 (unit inventory) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 04 completely. Check property/project/requirement posting, type-specific fields, approval workflow (incl. requirement Pending), lifecycle states, role restrictions, migrations, and RLS. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 05: Yes/No; Next step: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

---

## ▶ BLOCK: PROMPT 05 IMPLEMENTATION — Public Search, Detail Pages, Profiles, SEO
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 3 (search) & 4 (detail/profiles)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Typo/transliteration search; masked contact reveal; sold/unavailable variant (no soft-404); compare tray; requirement masked-until-proposal-accepted; gallery per-photo caption; honesty labels as visible copy.

Execute every requirement in the file completely. Implement public search, filters, detail pages, public profiles/microsites, comparison, SEO metadata/sitemap/canonical, and setup-required states exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
```

## ▶ BLOCK: PROMPT 05 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 3 (search) & 4 (detail/profiles) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 05 completely. Check search/filters/sort/pagination, detail pages + unavailable variant, profiles, comparison, SEO basics, contact privacy, and docs. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 06: Yes/No; Next step: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

---

## ▶ BLOCK: PROMPT 06 IMPLEMENTATION — Owner, Broker, Builder Dashboards
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 6 (owner), 7 (broker + CRM Kanban), 8 (builder + agents/ads)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Bottom nav Home·Search·Post(FAB)·Leads·Profile; drawer = full module list; Kanban desktop-only; "For client" broker requirements; featured/ad-wallet/seats meters; per-channel notification matrix; account-deletion double-guard.

Execute every requirement in the file completely. Implement the Owner, Broker and Builder dashboards, all modules, dashboard shell (sidebar/drawer/bottom nav), states, and role-specific flows exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
```

## ▶ BLOCK: PROMPT 06 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 6 (owner), 7 (broker + CRM Kanban), 8 (builder + agents/ads) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 06 completely. Check each role dashboard, all modules, shell + bottom nav, table→card transforms, loading/empty/error states, and role scoping. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 07: Yes/No; Next step: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

---

## ▶ BLOCK: PROMPT 07 IMPLEMENTATION — Admin, Staff, Super Admin System
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 11–15 (all admin)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Graphite admin shell, no bottom nav; uniform Approve/Request-Changes/Reject + reason + "will be logged"; per-viewer watermarked non-downloadable docs; maker-checker self-approval disabled; append-only audit w/ masked IP; permission-scoped nav.

Execute every requirement in the file completely. Implement the Super Admin, Admin and Staff operations: moderation queues, verification, user/staff/role management, permissions, audit, and all admin modules exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
```

## ▶ BLOCK: PROMPT 07 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 11–15 (all admin) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 07 completely. Check moderation/verification queues, user/staff/role management, permission scoping, audit log (append-only), maker-checker, and admin separation. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 08: Yes/No; Next step: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

---

## ▶ BLOCK: PROMPT 08 IMPLEMENTATION — Leads, CRM, Requirements, Proposals, Messages
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 7 (broker CRM) & 9 (shared detail views)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Contact-reveal MONTHLY QUOTA (plan-limited); Call/Copy/WhatsApp; Kanban desktop-only + Move-to-stage; follow-up reminders; duplicate-lead merge (reversible 30d); named reject/lost taxonomies; persistent chat safety banner; LINKED block.

Execute every requirement in the file completely. Implement leads/CRM, contact reveal, requirement feed, proposals, site visits, and messaging exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
```

## ▶ BLOCK: PROMPT 08 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 7 (broker CRM) & 9 (shared detail views) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 08 completely. Check leads/CRM, reveal quota + consent, requirement feed/proposals, site visit accept/reject/reschedule, messaging safety, and RLS. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 09: Yes/No; Next step: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

---

## ▶ BLOCK: PROMPT 09 IMPLEMENTATION — Billing, Payment, Subscription, Trial, GST
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 10 (billing/payment) & 12 (admin billing)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Metered plan resources: reveal quota, featured slots, ad-spend wallet (auto-pause ₹0), team seats, proposals/mo; GST jurisdiction (CGST+SGST / IGST); coupon-on-invoice; honest payment states (success only after verified callback); manual-activation surfaced + audited.

Execute every requirement in the file completely. Implement billing, plans, subscription, Razorpay payment + webhook verification, trials, coupons, GST, invoices, refunds, and admin billing exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

## ▶ BLOCK: PROMPT 09 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 10 (billing/payment) & 12 (admin billing) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 09 completely. Check plans/limits, real payment verification (no fake success), trial, coupon, GST split, invoice sequence, refunds, RLS wrong-user denial. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 10: Yes/No; Next step: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

---

## ▶ BLOCK: PROMPT 10 IMPLEMENTATION — Media Storage, Uploads, R2, CDN
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 5 (upload widget) & 11 (private-doc viewer)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Cover-select + drag-reorder + crop + % upload; brochures stored as PDF (never image); per-viewer watermarked non-downloadable private docs; 10 MB limit shown; 360°/video Setup-Required fallback.

Execute every requirement in the file completely. Implement media upload, validation, image optimization, private documents, Cloudflare R2/CDN, and signed private access exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

## ▶ BLOCK: PROMPT 10 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 5 (upload widget) & 11 (private-doc viewer) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 10 completely. Check upload validation, optimized public images, PDF-as-PDF, private signed access, watermarking, and bucket policies. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 11: Yes/No; Next step: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

---

## ▶ BLOCK: PROMPT 11 IMPLEMENTATION — Location, Search, SEO, CMS, Legal
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 3 (search), 14 (CMS/SEO/location admin), 16 (public legal/blog/help)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Transliteration/alias search; shared legal-doc layout + TOC; legal versioning + sign-off; redirect loop guard; sitemap exclusion transparency; SEO counters + snippet preview; guest support rate-limit.

Execute every requirement in the file completely. Implement location hierarchy + admin, transliteration/alias search, SEO, CMS, blog, legal pages, help/support, and redirects/sitemap exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

## ▶ BLOCK: PROMPT 11 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 3 (search), 14 (CMS/SEO/location admin), 16 (public legal/blog/help) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 11 completely. Check location tree/aliases, transliteration search, SEO metadata/sitemap/redirects, CMS/blog/legal publish flow, and no-fake-claims copy. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 12: Yes/No; Next step: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

---

## ▶ BLOCK: PROMPT 12 IMPLEMENTATION — Ads, Promotion, Notifications, Providers
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 8 (create-ad wizard) & 13 (ads/notifications/providers)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. 7-step ad wizard w/ per-size creatives + "AD" labelling; ad-spend wallet auto-pause; camelCase {{tokUserName}} tokens; defaults apply to new users only; provider graceful-degradation states; OTP+SMS one card; write-only secrets; no fake provider status.

Execute every requirement in the file completely. Implement ads/promotions, ad campaign wizard + moderation, database-backed notifications, notification templates, and provider modes exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md
```

## ▶ BLOCK: PROMPT 12 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 8 (create-ad wizard) & 13 (ads/notifications/providers) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 12 completely. Check ad wizard/moderation, "AD" labelling, real notification unread counts + deep links, provider Active/Setup-Required/Error states, and no fake sends. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 13: Yes/No; Next step: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

---

## ▶ BLOCK: PROMPT 13 IMPLEMENTATION — Security, Privacy, Fraud, Rate Limits
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batches 9 (contact reveal) & 15 (audit/security/fraud)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Append-only audit w/ masked IP; contact-reveal logs meta-audited + abuse flag; named threat types + auto-block; maker-checker self-approval disabled; reason-required + logged enforcement; consent + rate-limits surfaced.

Execute every requirement in the file completely. Implement security, input validation, authorization, RLS hardening, rate limits, fraud/abuse handling, audit logging, and consent exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md
```

## ▶ BLOCK: PROMPT 13 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batches 9 (contact reveal) & 15 (audit/security/fraud) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 13 completely. Check rate limits, RLS wrong-user/guest denial, audit append-only + masked IP, reveal-log gating, fraud handling, and safe error handling. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 14: Yes/No; Next step: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

---

## ▶ BLOCK: PROMPT 14 IMPLEMENTATION — Performance, Caching, Deployment, Launch
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN Batch 17 (advanced/PWA/localization/tools)), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. PWA install/offline/update logic; token-swap dark mode; transliteration search; Gujarat calculators (EMI/stamp-duty/land-units); accessibility quick-settings; Batch-17 final QA checklist.

Execute every requirement in the file completely. Implement performance optimization, caching/revalidation, pagination, image optimization, PWA/offline, localization, calculators, accessibility, deployment and rollback readiness exactly as written.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md
```

## ▶ BLOCK: PROMPT 14 VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN Batch 17 (advanced/PWA/localization/tools) side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 14 completely. Check Core Web Vitals targets, caching/pagination, PWA/offline/update, dark mode, calculators (Gujarat-accurate), accessibility, and rollback readiness. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Can start Prompt 15: Yes/No; Next step: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

---

## ▶ BLOCK: PROMPT 15 IMPLEMENTATION — Final Production, API Testing, Signoff
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md

DESIGN SOURCE (mandatory) — REPLACE, not restyle, 100% identical: Read this screen's real markup from the extracted design source (design-extract/, from MGP DESIGN All batches + Batch 17 final QA checklist), remove the current markup, and rebuild it so the result is 100% pixel-identical to the design (same layout, styles, spacing, copy) — port the actual markup, do not recreate from description; keep only backend wiring. See design-prompts/DESIGN_ADDONS_MASTER.md + the "Design Add-Ons" doc sections. Run the Batch-17 developer-QA consistency checklist across the whole app: shells/nav, tokens, list states, modals/sheets, status-badge colors, wizards, honesty rules, mobile rules. Confirm every "Design Add-Ons" item across docs is built.

Execute every requirement in the file completely. Run the final production readiness + real API testing phase exactly as written: real OTP/payment/webhook/email/WhatsApp/R2/maps tests, RLS, role access, contact privacy, responsive, load, backup and rollback.

Update all required docs: brain.md, FEATURE_REGISTRY.md, CHANGELOG.md, BUGS_AND_FIXES.md, MANUAL_VERIFICATION.md, API_PROVIDER_STATUS.md, DEPLOYMENT_ROLLBACK.md, SECURITY_RLS_CHECKLIST.md, PERFORMANCE_CHECKLIST.md. Run available lint, typecheck, build, and tests if configured. Do not fake completion, data, provider success, payment success, RLS/security pass, or PASS.

End your response with: Summary; Changed files; SQL migrations; Docs updated; Tests/checks run; Issues found; Result status; Next step: run prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md
```

## ▶ BLOCK: PROMPT 15 FINAL VERIFICATION
```text
Read and run this file fully from the project folder without skipping or missing anything: prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md

DESIGN-MATCH CHECK (mandatory): Verify each built screen matches C:\Users\RAJAN\Documents\MGP DESIGN All batches + Batch 17 final QA checklist side-by-side, and that every "Design Add-Ons" item is present (see design-prompts/DESIGN_ADDONS_MASTER.md). Confirm locked tokens, contextual mobile header + back button, list states, and honesty states.

Verify Prompt 15 completely. Confirm real (not faked) production readiness across auth, payment, providers, RLS, privacy, responsive, load, backup, rollback, and full design match. Final status: PASS / PARTIAL / FAIL / BLOCKED. Update all required docs. Do not mark PASS unless verification is real; if PARTIAL / BLOCKED / FAIL / SETUP_REQUIRED, document exact reasons, bugs, blockers, and next steps.

End your response with: Verification Summary; Files/routes checked; Commands run; Docs updated; Issues found; Result; Final production status: PASS / PARTIAL / FAIL / BLOCKED; Next step: (project complete — production signoff)
```
