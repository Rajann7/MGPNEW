# report-batch-16

## Batch 16 — Public Content Pages (Legal / CMS / Blog / Help / Support)

### Screens/components present in design (full inventory)

Teal accent. Anchor nav: 1-2 About·Contact, 3-4 Help·Safety, 5-15 Legal layout, 7·20 Cookies, 16-17 Blog, 18-19 Support. All 20 prompt screens present.

1. About (desktop) — condensed public header + breadcrumb Home>About, hero "Property, done honestly, in Gujarati and in Gujarat", founding story, 3 value cards (Reviewed before live / Your number your call / Built for Gujarat), dark footer (Terms/Privacy/Cookie preferences/Grievance). Qualitative trust copy, no stats.
2. Contact (mobile 390px) — contextual back-button header, form (name/email, Subject select [Listing question/Account help/Billing/Partnership/Other], message, Send). "Map: Setup Required — provider not configured. Address shown instead." Address + email + WhatsApp support hours block.
3. FAQ/Help center (desktop) — "How can we help?" search, category chips (Listings/Account&login/Payments/Verification/Safety), accordion (first Q open: "Why is my listing still pending?"), "Still need help? Raise a ticket" CTA.
4. Safety guidelines (mobile) — back+share header, intro, icon tip cards (Never share your OTP [red lock], + more), editorial layout.
5. Terms & Conditions (desktop) — breadcrumb, sticky "ON THIS PAGE" TOC (7 sections, active item highlighted), numbered sections, "Last updated 15 June 2026 · Effective for all users".
6/8/9/11/12/13. Privacy, Refund, Cancellation, Advertising, Verification, Payment — reuse exact T&C template (noted in shared-layout banner), only title/date/section-list change.
7. Cookie Policy page — shared layout + embedded "Manage Cookie Preferences" button (opens modal). Note: also reachable from footer (screen 20).
10. Listing Policy — do's/don'ts two-column strip (DO green: real recent photos, true price, mark sold promptly; DON'T red: post twice, phone numbers in photos, list unauthorized) above the shared legal text.
14. Disclaimer — short page, amber callout "online listing and lead marketplace… not the owner… no legal/financial advice", verify-independently paragraph.
15. Grievance Policy — officer contact block (avatar "HD", Grievance Officer Hetal Dave, grievance@ email, address, "Acknowledged within 48 hours · resolved within 15 days" pill).
Mobile legal — collapsible TOC ("On this page (7 sections)") with back-button header.
16. Blog listing (desktop) — breadcrumb, category chips (All/Buying guides/Locality spotlights/RERA & legal/Home loans), 3-col article card grid (image, category pill, title, excerpt, author avatar+read-time+date), pagination (1/2/3), empty-category state ("No posts in 'Home loans' yet" + Browse all posts).
17. Blog post (mobile) — reading-progress bar under header (38% teal), back+share header, hero image, category pill, title, author byline (PT avatar), max-w prose body, Related posts horizontal strip, share buttons (WhatsApp/Copy link/Email).
18. Guest support form (rate-limited) — name/email/subject/describe/Submit, note "Guests can submit up to 3 requests per hour. Log in for faster tracking".
19. My tickets (logged-in) — ticket list with status chips (Open amber / Resolved green), click-through read-only thread (#T-1204, chat bubbles user/support), reply box "only while ticket is open" with send button.
20. Cookie preference manager — desktop modal + mobile bottom sheet: Essential (always on, disabled), Analytics (on teal), Marketing (off), "Reject non-essential" + "Save preferences".

### ADD-ON features/screens in design NOT in the prompt (deltas)

- Reading-progress bar rendered as a real % (38%) under the mobile blog header — prompt asked for it but design ties it into the app-header with share affordance.
- Blog post share buttons are channel-specific (WhatsApp green / Copy link / Email) rather than generic — WhatsApp-first for Gujarat context.
- Contact page Map Setup-Required fallback explicitly shows the address INSTEAD (honest provider-not-configured state) — beyond "map embed with fallback".
- Support ticket thread models a real diagnostic exchange referencing the platform's own 10 MB upload limit — cross-consistent with media rules.
- Ticket status uses colored status dots inside chips (amber/green pulse dot) — richer status affordance.
- Guest support rate-limit stated numerically (3/hour) AND nudges login — matches prompt but also reinforces abuse/rate-limit rules.
- Cookie modal Essential toggle is visibly disabled/greyed (opacity .7) not just "on" — communicates non-toggleable clearly.
- Shared-layout reuse documented on-screen via an amber banner listing exactly which screens (6,8,9,11,12,13) reuse the template and which add extras (7/10/14/15) — self-documenting design.
- About value cards reuse the exact trust pillars from the platform (review-before-live, masked contact, Gujarat locality/language) — brand-consistent, not generic "values".
- Grievance officer block includes a concrete SLA pill (48h ack / 15-day resolve) — specific commitment beyond "response-time".
- Blog author avatars use initials-in-circle with teal/grey variants (verified vs guest author styling hint).
- Legal body copy models honest claims (e.g. "Listing review reduces, but cannot eliminate, inaccurate information") — no-fake-claims rule modeled in sample legal text.

### Items in prompt MISSING from design

- Screens 6, 8, 9, 11, 12, 13 (Privacy/Refund/Cancellation/Advertising/Verification/Payment) are NOT rendered individually — only referenced via the shared-layout reuse banner. Acceptable per "shown fully once" instruction but no per-page preview exists.
- About "team section" — design shows values cards and story but no team/people section (prompt allowed "team OR values").
- Desktop breadcrumb present on About/Legal/Blog; some mobile inner pages rely on back-button only (consistent with prompt).
- Full multi-screen responsive set (desktop AND mobile for every screen) not exhaustively shown — each screen picks one representative viewport.

### Notable UX patterns

- ONE shared legal-document layout across 5-13 & 15; per-page differences are additive blocks, not new templates.
- App-like contextual mobile headers (back button, centered title, optional share) on every inner page.
- Sticky desktop TOC / collapsible mobile TOC for long legal content; breadcrumbs on desktop.
- Honest provider states (Map Setup-Required) and honest claims copy throughout.
- Reader-facing side deliberately mirrors Batch 14 CMS authoring (blog/legal), closing the author→reader loop.
- max-w prose reading measure on long-form body text.
