# Design Add-Ons Master — My Gujarat Property

**Purpose:** Single source of truth for every feature/behavior found in the finished wireframe design (17 batches in `C:\Users\RAJAN\Documents\MGP DESIGN`) that is NOT yet captured in the project docs/prompts. These deltas must be folded into `docs/*.md`, `prompts/*.md`, root registry files, and `Calude Prompt.pdf` so the build matches the design 1:1.

Per-batch detail lives in `design-prompts/delta-reports/report-batch-NN.md`. This file is the deduplicated, cross-cutting rollup.

Design accent/token lock (from Batch 1, applies everywhere):
- Brand `#0F6B5C`, hover `#0C5648`, soft `#E7F2EF`, border `#C4E0D9`
- Semantic: success `#16A34A`, warning `#D97706`, error `#DC2626`, info `#2563EB`; pending `#D97706`
- Setup-Required blue `#EFF6FF/#BFDBFE/#1E3A8A`; privacy amber `#FFFBEB/#FDE68A/#B45309`
- Dark mode: `#18181b/#27272a`, green→`#4ADE80` (token-swap only, no redesign)
- Font Inter 400/500/600; radius 16 (cards) / 10 (controls) / full (pills); shadows sm/md/lg; spacing 4-8-12-16-24-32-48
- Bottom-nav order (LOCKED, all dashboards): **Home · Search · Post (raised center FAB) · Leads · Profile**
- Admin shell: graphite/neutral palette, desktop-primary, drawer on mobile, NO bottom nav

---

## A. CROSS-CUTTING NEW CONCEPTS (touch multiple docs — highest priority)

### A1. Contact-reveal monthly quota (plan-limited)
Reveal consent shows "Uses 1 of your **20 monthly reveals**." Reveals are now a **metered, plan-limited resource** tied to billing. Affects: leads/CRM (Batch 9), billing/plans (Batch 10/12), RLS/limits.
→ Update docs 07 (leads), 09 (billing plans must define reveal quota per plan), CLAUDE.md contact-privacy area.

### A2. WhatsApp as a first-class contact/notification action
Revealed contact offers **Call / Copy / WhatsApp** (copy only via explicit button, never auto-copy). WhatsApp also a notification channel across templates.
→ Docs 07, 10 (provider modes), 12 (media/consent). Provider dependency = Meta Cloud API (Setup Required state).

### A3. Featured / boosted listings as a paid, metered slot
"Featured slots" appear as a usage meter on billing (Owner 1/1, Broker 2/3, Builder), an "⚡ FEATURED until 18 Jul" chip on listings, and a plan feature line.
→ Docs 06 (property matrix — featured state), 09 (billing plans), 10 (ads/promotion overlap).

### A4. Ad-spend wallet (rupee balance) + auto-pause
Builder ad-spend is a **rupee wallet** (`₹340/₹500`, "Add funds"), and "campaigns pause automatically at ₹0 — never negative."
→ Docs 09 (billing), 10 (ads). New wallet entity + auto-pause rule.

### A5. Team seats as a metered plan resource
"Team seats 1/1" (Owner), "Agent seats 3/5" (Builder) appear as usage meters and plan limits.
→ Docs 08 (builder agents), 09 (plans).

### A6. GST jurisdiction engine (CGST+SGST vs IGST)
GSTIN state code drives tax: "Gujarat (24) — CGST+SGST will apply" (intra-state) implying IGST for inter-state. B2B/B2C toggle. Coupons carry through to the formal invoice line items.
→ Doc 09 (billing/GST) — needs explicit intra/inter-state logic + coupon-on-invoice.

### A7. Honesty states rendered as visible UI (not just rules)
Design turns CLAUDE.md honesty rules into on-screen elements everywhere: "(sample)" badges, "(real count)", "never faked", "never converted to image", "Never fake-active", "Nothing is simulated", "—" for no-data with threshold captions ("needs 10+ visits"), Setup-Required cards that state their fallback behavior, "TEST MODE" dev-only ribbon (staff builds only).
→ Doc 13 (UI/UX), CLAUDE.md — add "honesty states must be visible UI" as a design rule.

### A8. Reason-required + "This action will be logged" on every mutating admin action
Universal across all admin queues: Approve(brand)/Request Changes(warning)/Reject(danger); reason mandatory for reject/need-changes; inline "This action will be logged."; confirmation dialog for destructive/gateway actions.
→ Docs 08, 14 (audit), CLAUDE.md admin rules.

### A9. Per-viewer document watermarking
Private docs (verification, claim) shown in a viewer watermarked with the **reviewing staff's initials** ("MGP ADMIN · KR"), "never downloadable."
→ Docs 08 (admin), 12 (media privacy), 14 (security).

### A10. Cross-module linkage is explicit and must be built
Lead ↔ Messages (doc "Shared in chat") ↔ Proposal ↔ Notifications ↔ Site Visit; Missing-Location queue (Batch 11) feeds Location tree (Batch 14); Construction update (Batch 8) feeds public Project timeline (Batch 4); Manual activation (Batch 12) surfaces "Activated by support" on user billing (Batch 10); Plan editor (Batch 12) reuses public pricing card (Batch 10).
→ Docs 07, 08, 11, 14; brain.md architecture notes.

---

## B. PER-BATCH ADD-ONS (feature-level, for doc/prompt edits)

### Batch 1 — Design System
OTP resend countdown ("Resend in 0:24"); share popover "Download brochure" action; lead-drawer contact masking micro-pattern ("+91 98790 44xxx · reveals on contact"); stat-card trend chip ("+18% this week"); sidebar numeric count badges; mega-menu curated QUICK LINKS; delete-dialog cascade-consequence copy ("its 37 leads will be removed"); "Draft saved / Resume anytime" toast; locked token-summary footer.

### Batch 2 — Auth
Auto-submit on 6th OTP digit; "Change" number link; explicit remaining-attempt counters ("2 attempts left", "2 attempts remaining before 30-min lockout"); "Back to browsing" recovery; "Use a different number"; role chip + Change on registration; email helper "used for receipts and account recovery"; suspension detail (date + reason category + "listings hidden" + Read policy); personalized success; staff lockout details (until 14:45 IST, "admin notified"); invite metadata (inviter name+role, password policy min-12, expiry "6 days · single use"); consent-gated Continue.

### Batch 3 — Public Home + Search
Typo/transliteration-tolerant autosuggest ("raj"→"Raj kot"); "Clear history" on recently-viewed; 6th city chip Bhavnagar; applied-filter-count badge + inline chips on mobile filter bar; map fallback dismissible + toggle disabled-with-tooltip ("Map is not available yet"); post-login auto-save of Save Search; missing-location "Notify me at (email/mobile)" capture; footer legal set (Grievance Redressal, Listing Guidelines, RERA Information); price-pin map markers.

### Batch 4 — Detail + Profiles
Comparison exposes verification Status as a spec row (Verified vs Pending); requirement identity "masked until proposal accepted"; claim modal "Your role at company" select + 2-business-day SLA; project enquiry intent includes "Site visit"; unavailable variant gives concrete sold reason/date + scoped browse CTA; gallery per-photo room caption ("3/12 · Living room"); honesty labels as visible copy; owner privacy notice as amber banner element.

### Batch 5 — Posting Wizards
"+3" step-overflow indicator; photo-count growth nudge ("5+ photos get 2x views"); long-press-reorder + tap-scissors-crop microcopy; description live counter ("Min 30 · 132/2000"); cross-city autosuggest with bold match; WhatsApp+in-app submit promise; "View listing"+"Go to My Listings" post-submit; edit-after-approval as confirm dialog; draft re-entry card ("6 of 9 · saved 2 hrs ago"); RERA Gujarat format mask + live validation ("PR/GJ/CITY/YYYY/NNNN"); "Pending · RERA check" combined badge; auto-computed unit total feeding 5D; EV charging + solar amenities; 360° honest-fallback; **"Loan pre-approved" checkbox** (requirement); "Up to 5 localities" cap; "How should brokers reach you?" radio (in-app only / calls OK); preferred-contact-time chips; inline "Verified" check in phone field.
⚠ CONFLICT: 5C says requirement "is live for matching" immediately, but CLAUDE.md §17 requires approval before display. RESOLVE: add Pending state for requirements.
⚠ CONFLICT: wizard is 9 steps (5A) but Batch 7 entry card says "5-step wizard / Step 3 of 5". RESOLVE step count.

### Batch 6 — Owner Dashboard
Sidebar count badges; drawer holds FULL module list (adds Recently Viewed, Verification, Support, Log out) vs 5-item bottom nav; raised center Post FAB; personalized greeting + stat insight lines; listing expiry countdown + per-listing lead count; status-contextual row actions (Pending loses Pause; Paused gets Resume + "hidden while paused"); delete dialog names listing + 37 leads; requirement proposals integration (View proposals / Close / Reopen); leads empty "Share your listing" CTA; lead reveal-status microcopy + Mark Contacted shortcut; chat read receipts/✓✓/"You:"/unread badge/day dividers; reject-visit dialog counter-offers "Reschedule instead"; Directions + map on visit detail; saved-search alert-bell mute toggle + frequency + "4 new" badge; Recently Viewed auto-hidden until first view; analytics honesty annotations; featured-slots meter; GST 18% line-item breakdown + legal name "MGP Technologies Pvt. Ltd."; Downgrade button on Free; verification rejected reason as quoted reviewer message; per-channel notification matrix; **"Show my name on listings" privacy toggle** (Off shows "Owner"); account deletion double-guard (type "DELETE" + OTP + 30-day grace); role-change Withdraw button; data export SLA (48h) + deletion cancel window (30d) + OTP identity step; notification deep-link targets per item; support ticket IDs + status chips + categories.

### Batch 7 — Broker Dashboard
Nav count badges; overview insight subtitle + Requirement Feed quick-action; stat secondary insights; activity feed deep-link targets + "proposal was viewed by" event; "featured until 18 Jul" expiry; wizard usage counter "11 of 25 listings used" + Discard-draft confirm; **"For client" tag** (brokers post requirements on behalf of clients — NEW concept); requirement-feed match engine ("Matches 3 of your listings", Hide, already-proposed state, "Widen your areas"+Edit service areas); proposal price-vs-budget line ("₹68 L vs budget ₹60–90L"); owner rejection reason surfaced verbatim; proposal Withdraw + Message owner; send-proposal listing selector with match hints; CRM bulk **Export CSV**; lead SOURCE dimension (Listing page/Proposal/Saved search); Kanban hover quick-card with masked phone + Note; CLOSED ✓ vs LOST with loss reason; follow-up reminder presets + delivery channels (push+email); LINKED entity block (lead↔listing↔proposal); proposals-per-month quota meter (8/30); optional RERA-agent + GST cert uploads with benefit copy; service-areas→feed scoping rule; broker notification types; feed alert frequency (instant/daily digest/off); multi-listing calendar color-coding.
⚠ Kanban is desktop-only; mobile = list + Move-to-stage menu (never drag).

### Batch 8 — Builder Dashboard
Ad "AD" labelling mandated in-context; ad-spend wallet auto-pause at ₹0; permission toggles with risk descriptions ("spends money") + apply-immediately; invite emails expire 7 days; unit "Override base price" checkbox with base context; **On Hold as 4th unit status** (beyond Available/Booked/Sold); analytics honesty thresholds ("needs 10+ visits", "from inventory status changes"); anti-"95% match" rule (explainable match chips only); edit-re-approval keeps project live on old data until approved; construction update feeds Batch 4 timeline; Settings danger zone deletes company + all agent access; Team notifications routing; enumerated builder notification types (Ad approved/rejected, RERA expiring, Agent accepted invite, Unit booked by agent); ad-list Duplicate action; 7-step ad wizard with per-slot creative sizes (Desktop 1200×300 / Tablet 800×320 / Mobile 390×200) + in-context preview.

### Batch 9 — Shared Detail Views
Monthly reveal quota (see A1); WhatsApp action (A2); relative-time reminder chips (Tomorrow/In 3 days/Next week); two reminder channels (in-app vs push); named Closed/Lost taxonomy (deal done/budget mismatch/chose another/unresponsive/Other); merge semantics ("both timelines combine, newer lead closes"); report-thread SLA copy ("not notified, reviewed within 24h, thread stays visible"); documents-tab provenance ("Shared in chat") + independent "Attach document"; named site-visit reject reasons (Unavailable/No longer interested/Other).

### Batch 10 — Billing & Payments
Ad-credits rupee meter + team-seats meter (A4/A5); GST-jurisdiction intelligence (A6); prorated math concrete preview (upgrade + checkout, exact remaining-days ₹); coupon on invoice line items; refund partial/full selector + reason taxonomy (Feature not used/Charged by mistake/Service issue/Other) + tracker ID (REF-114) + "~3 business days" SLA; failed-payment auto-refund promise (5–7 days) + "still on Basic"; duplicate-payment recency ("started 2 min ago"); "TEST MODE" dev-only ribbon; invoice provenance (seller entity + GSTIN `24AAACM9910P1ZS` + payment ref + "computer-generated invoice"); refund-pending as invoice status.

### Batch 11 — Admin User/Moderation
Overview cards live sub-context ("oldest pending 26 hrs", "1 awaiting RERA check"); per-card permission-gate copy on overview; admin mobile "no bottom nav, drawer only"; merge time-bounded reversible (30 days); per-viewer watermarking (A9); ticket shows requester plan inline; named macro set (Refund timeline / Ask for payment ref / Escalation notice); role-template presets in staff invite; requirement checklist reduced to 2 points; suspend side-effects spec ("14 listings hidden, leads paused, login possible but posting blocked").
GAP: staff "suspended" status not rendered — keep in spec.

### Batch 12 — Admin Billing
Coupon over-limit honest state (312/300); webhook retry "Failed ×2" + states (Processed/Failed/Queued) + "signature verified · secrets redacted"; manual activation → user billing "Activated by support" (A10); refund reason on approve AND reject + second confirmation before gateway; subscription live usage meters + stored method "•••• 4482"; plan-history timeline with prorated amounts + payment IDs + trial campaign attribution; plan form includes Team seats + Featured slots/mo; public pricing preview reuses Batch 10 card; invoice correction versioned (v2, both retained, auto-recompute).
GAP: plans list duplicate/archive row actions not rendered — keep in spec.

### Batch 13 — Admin Ads/Notifications/System
Structured radio reject-reason for ads (Misleading pricing/Creative quality/Targeting violation/Other); ad fraud "Mark as fraud" excludes clicks from builder billing + raw IDs in restricted audit log; Rejected tab on active-ads; provider graceful-degradation semantics baked into grid (WhatsApp "skipped, logged"; Maps "falls back to list + banner"; Email "sends paused and queued"); live provider ERROR state with failure count + start time; secrets write-only + Test Connection names the test ("test order created and voided"); **token naming camelCase `{{tokUserName}}`** (design) vs snake_case `{{user_name}}` (prompt) — RESOLVE naming; delivery "Skipped — provider not set up" distinct state; notification defaults scoped to NEW users only; feature-flag confirmation previews audit entry inline; maintenance schedule-a-window sub-flow; system health incident/backup detail; dead-letter dismiss requires confirm + audit note, Sentry-linked.
GAP: SMS merged into OTP/SMS card (not separate); no standalone "connect new provider" frame.

### Batch 14 — Admin CMS/SEO/Location
CMS autosave; live SEO char counters (54/60, 143/160); live Google snippet preview; legal versioning + sign-off audit ("v7 awaiting sign-off, requested from legal@ 2 Jul", Publish disabled); cross-screen count cohesion (1,842 pages); redirect hit-count as decision rationale; disabled Save + not-allowed cursor on redirect loop; location tree fed by Missing-Location queue (A10); "taluka collapses when identical to city"; locality listing counts in tree; aliases→typo-tolerant search explainer; translation tracker (148 missing strings, inline edit).
GAP: mobile card variants not drawn; blog category/tag manager not full; no standalone Preview screen.

### Batch 15 — Admin Audit/Security/Reports
IP masking (103.240.xx.xx); non-human actors ("system", "System (pattern)"); sparklines + narrative captions in security cards; named threat types (OTP flooding, Credential stuffing across 14 accounts, Admin new-device); auto-block outcomes ("2 auto-blocked after OTP flooding"); reveal-logs abuse pattern flag (19 buyers/6 listings/2 days) + access is itself audit-logged; message-report models OTP-phishing scam; report RELATED HISTORY carries verdict outcomes (upheld/dismissed); Setup-Required analytics beside real DB metrics ("Nothing is simulated"); export failure remediation ("Try 3 months max") + 24h-expiry; maker-checker self-approval hard-disabled in UI; reason-required+audit-logged on every enforcement action.
GAP: mobile transforms (only Audit sample); "inappropriate" report type; export "Queued" state.

### Batch 16 — Public Content
Reading-progress bar % under mobile blog header + share; channel-specific share (WhatsApp/Copy/Email, WhatsApp-first); Contact Map Setup-Required shows address instead; support thread references 10 MB upload limit; ticket status colored pulse dots; guest support rate-limit (3/hour) + login nudge; cookie Essential toggle visibly disabled; self-documenting shared-layout banner (which legal screens reuse template); About value cards = platform trust pillars; grievance officer SLA pill (48h ack / 15-day resolve); honest-claims copy in sample legal text ("reduces but cannot eliminate").
GAP: individual legal pages 6/8/9/11/12/13 only via shared-layout reference; no team section.

### Batch 17 — Advanced/PWA/Tools
PWA install display logic (localStorage 30 days, only after 2+ sessions, never first visit); offline banner + "Saved properties (available offline)" content view; language selector fallback ("translation pending" dot, never machine-garbled), Hindi "Coming soon"; theme token-swap dark mode (concrete hex); transliteration search (amdavad→Ahmedabad, રાજકોટ→Rajkot, barodra→Vadodara via Baroda alias, server-side); EMI amortization mini bar chart + Home-loan Setup Required; **Gujarat stamp duty (female buyers no registration fee, jantri value, Sub-Registrar)**; Gujarat land units (vaar/guntha/Gujarat bigha, region-varies caveat); comparison compare-tray (max 4, persists across pagination, above bottom nav) + mixed resale-vs-project table (Contact Owner vs Enquire, RERA "—" vs Verified); analytics consent (first visit, no tracking until choose); app-update toast idle-deferred never mid-form; accessibility quick-settings (text size / high contrast / reduce motion, persists per device, 2 entry points); final 17-batch developer-QA consistency checklist artifact.

---

## C. CONFLICTS TO RESOLVE BEFORE BUILD
1. **Requirement approval:** Batch 5 shows requirement "live immediately"; CLAUDE.md §17 requires approval. → Add Pending state for requirements (align to approval).
2. **Property wizard step count:** Batch 5 = 9 steps; Batch 7 entry card = "5-step". → Pick one (recommend 9) and fix the entry card reference.
3. **Notification token case:** design uses camelCase `{{tokUserName}}`; prompts use snake_case `{{user_name}}`. → Pick one convention for implementation.
4. **Staff "suspended" status:** in spec but not drawn (Batch 11). → Keep in build.
5. **SMS vs OTP provider cards:** design merges them; spec lists separately (Batch 13). → Decide card model.

---

## D. DOCS/FILES THAT NEED UPDATING (mapping)
- **CLAUDE.md** — A7 (honesty as visible UI), A8 (reason+logged), bottom-nav lock, admin-no-bottom-nav.
- **docs/05** (home/profile/dashboard) — drawer≠sidebar rule, FAB, greeting/insights, privacy toggles.
- **docs/06** (property/project/requirement) — featured state, On-Hold unit status, requirement Pending, RERA format mask, override base price.
- **docs/07** (leads/CRM/messages/visits) — reveal quota, WhatsApp, CRM SOURCE, Kanban desktop-only, reminder presets, LINKED block, merge semantics, reject reasons.
- **docs/08** (admin/staff) — watermarking, reason+logged, macros, role templates, maker-checker, per-card permission gates.
- **docs/09** (billing/GST) — reveal quota per plan, ad-spend wallet+auto-pause, team/featured/proposal meters, GST jurisdiction, coupon-on-invoice, refund taxonomy+SLA, manual-activation surfacing.
- **docs/10** (ads/notifications/providers) — "AD" labelling, ad fraud billing-exclusion, provider graceful-degradation, token case, defaults-new-users-only, WhatsApp channel.
- **docs/11** (location/search/SEO/CMS/legal) — transliteration/alias engine, sitemap exclusion transparency, legal versioning+sign-off, redirect loop guard, translation tracker.
- **docs/12** (media/upload) — per-viewer watermarking, PDF-never-image, 10MB limit surfaced.
- **docs/13** (UI/UX) — all shared patterns, dark-mode token swap, sticky compare-tray layering, offline/update transient UI, accessibility quick-settings.
- **docs/14** (security/privacy/fraud) — IP masking, auto-block, reveal-log meta-audit, named threat types, contact-reveal-log permission gate.
- **docs/16** (advanced/PWA/localization) — PWA display logic, calculators (Gujarat-accurate), transliteration, accessibility, consent.
- **prompts/03–15 + verification prompts** — fold matching add-ons per phase.
- **FEATURE_REGISTRY.md** — add new features (reveal quota, ad wallet, featured slots, team seats, For-client requirements, transliteration search, calculators, maker-checker, etc.).
- **brain.md** — architecture notes for cross-module linkages + conflict resolutions.
- **Calude Prompt.pdf** — regenerate step-by-step build prompts + verification prompts reflecting all above.
