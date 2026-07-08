# TARGET_REGISTRY — exact one-record-per-discovered-target

Authoritative deterministic registry: **one row per design target** discovered by extraction (h2/h3/frame-caption labels) across all 17 MGP DESIGN batches. This is the exact source for reconciliation counts; SCREEN_MANIFEST's grouped summaries link back here. Auto-classified (rules in migration log); SCREEN_MANIFEST holds the curated route/status overlay. Generated 2026-07-04.

**EXACT TOTALS:** TOTAL_DISCOVERED_DESIGN_TARGETS = **408** (was 405; **+3 correction 2026-07-08** — the auto-extraction genuinely missed 3 Batch 2 frame captions: screen **5** "Wrong / expired OTP", screen **7** "Unregistered number → register prompt", and screen **15** "Invalid credentials + lockout". Verified against design source: `batch2.decoded.html` has exactly **18** frame-caption divs; the original registry listed only 15 Batch-2 FRAME rows → 3 absent. Now added as T02-021/022/023 and mapped; all implemented.) · RS=207 · RV=55 · ST=51 · MD=35 · WZ=10 · DSR=50 (SC/INH/RO folded into RS/DSR by the auto-pass; curated reclassification lives in SCREEN_MANIFEST). TOTAL_MANIFEST_ENTRIES = 408 · TOTAL_UNMAPPED_TARGETS = **0**.

> **Batch 2 exact count (reconciled 2026-07-08):** 5 H2 group targets (T02-001..005) + **18** frame targets (T02-006..023) = **23** Batch-2 registry rows. Of the 18 frames, all 18 are implemented/verified (16 distinct numbered design screens 1–16, since screen 1 and screen 14 each appear in two frames, plus the "post-login redirect intent" rule frame). Implementation/state targets processed = **18 / 18**.

Columns: `TARGET_ID | CLASS | SRC_TAG | LABEL`

```
T01-001 | DSR | H2 | Foundations
T01-002 | DSR | H2 | Core Components
T01-003 | DSR | H2 | Global Navigation Shells
T01-004 | DSR | H2 | Overlay Patterns
T01-005 | DSR | H2 | Universal Screen States
T01-006 | DSR | H2 | Form Wizard Pattern
T01-007 | DSR | H2 | Mobile Sticky CTA — detail pages
T01-008 | DSR | H3 | Color tokens
T01-009 | DSR | H3 | Type scale — Inter
T01-010 | DSR | H3 | Spacing scale
T01-011 | DSR | H3 | Radius scale
T01-012 | DSR | H3 | Shadow scale
T01-013 | DSR | H3 | Icon set — Lucide outline, 1.75px stroke, never mixed
T01-014 | DSR | H3 | Buttons
T01-015 | DSR | H3 | Inputs
T01-016 | DSR | H3 | Status badges — EntityStatusBadge pattern
T01-017 | DSR | H3 | Cards
T01-018 | DSR | H3 | Avatars
T01-019 | DSR | H3 | Dropdown menu (open)
T01-020 | DSR | H3 | Tabs
T01-021 | DSR | H3 | Tooltip
T01-022 | DSR | H3 | Pagination
T01-023 | DSR | H3 | Progress — linear
T01-024 | DSR | H3 | Progress — stepped (3 variants)
T01-025 | DSR | H3 | 3A · Public header — desktop (mega-menu open)
T01-026 | DSR | H3 | 3B · Public header — mobile (390px)
T01-027 | DSR | H3 | 3C · Contextual header — mobile (56px, mandatory)
T01-028 | DSR | H3 | 3D · Dashboard shell — desktop (Owner/Broker/Builder)
T01-029 | DSR | H3 | 3E · Dashboard shell — mobile
T01-030 | DSR | H3 | 3F · Admin/Staff shell — graphite palette
T01-031 | DSR | H3 | Generic modal — desktop
T01-032 | DSR | H3 | Confirmation dialog — destructive
T01-033 | DSR | H3 | Bottom sheet — mobile equivalent
T01-034 | DSR | H3 | Toasts — auto-dismiss, top-right desktop / top mobile
T01-035 | DSR | H3 | Share popover — desktop
T01-036 | DSR | H3 | Notification dropdown — desktop (open + empty)
T01-037 | DSR | H3 | Notification bottom sheet — mobile
T01-038 | DSR | H3 | Filter bottom sheet — mobile
T01-039 | DSR | H3 | Share sheet — mobile
T01-040 | DSR | H3 | Right-side detail drawer — desktop (480px)
T01-041 | DSR | H3 | Fullscreen gallery viewer
T01-042 | DSR | H3 | Loading — skeleton + shimmer
T01-043 | DSR | H3 | Empty — always actionable
T01-044 | DSR | H3 | Error, forbidden &amp; setup states
T01-045 | DSR | H3 | Table → card responsive transform (same dataset)
T01-046 | DSR | H3 | Desktop — stepped header + panel + sticky footer
T01-047 | DSR | H3 | Mobile — sticky action bar, content never covered
T01-048 | DSR | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Context A — public detail page: sticky CTA only
T01-049 | DSR | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Context B — inside dashboard: CTA stacked above bottom nav
T01-050 | DSR | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Consistency rules — every future batch must obey
> T01 status 2026-07-08: authenticated shells (3D/3E/3F desktop+mobile) re-verified live via owner + super-admin sessions — UNVERIFIED-AUTH CLOSED. Fresh defects fixed: 3E dashboard mobile bottom nav → locked 5-item Home·Search·Post-FAB·Leads·Profile; 3F admin mobile → removed forbidden bottom nav, added contextual drawer. VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS → **T01 FINAL: COMPLETE**.
T02-001 | RS | H2 | Phone entry → OTP login
T02-002 | ST | H2 | Error, rate-limit &amp; unavailable states
T02-003 | RS | H2 | Role selection &amp; registration
T02-004 | ST | H2 | Suspended account &amp; success
T02-005 | RS | H2 | Admin / Staff portal
T02-006 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">1 · Mobile number entry — desktop modal
T02-007 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">1 · Mobile bottom sheet &nbsp;+&nbsp; 2 · Checking state
T02-008 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">3 · Existing user — OTP login (desktop modal)
T02-009 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">4 · Resend cooldown (mobile sheet)
T02-010 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">6 · Rate-limited — full stop
T02-011 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">11 · OTP provider unavailable — neutral, never fake-success
T02-012 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">8 · Role selector — desktop modal
T02-013 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">9 · Registration form — mobile sheet
T02-014 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">10 · OTP verify (registration) — same pattern as 3
T02-015 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">12 · Suspended account — full stop, mobile (390px)
T02-016 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">13 · Success — redirecting, dashboard skeleton behind
T02-017 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Post-login redirect intent rule — annotate on every batch
T02-018 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">14 · Staff login — desktop full page
T02-019 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">14 · Staff login — mobile (390px)
T02-020 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">16 · Staff invite acceptance — token-based
T02-021 | ST | FRAME | 5 · Wrong / expired OTP  [ADDED 2026-07-08 — auto-extraction miss corrected; impl = MobileOtpForm error state]
T02-022 | ST | FRAME | 7 · Unregistered number → register prompt  [ADDED 2026-07-08 — auto-extraction miss corrected; impl = MobileOtpForm `unregistered` step]
T02-023 | ST | FRAME | 15 · Invalid credentials + lockout  [ADDED 2026-07-08 — auto-extraction miss corrected; impl = /admin/login cred-error banner + Account-locked card]
> Batch 2 status 2026-07-08 (b): all 18 frames verified live (guest matrix + dev-OTP session + suspended fixture). VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS → **T02 FINAL: COMPLETE** (provider-gated §5.5; production SMS activation separate).
T03-001 | RS | H2 | Homepage
T03-002 | RS | H2 | Browse by category
T03-003 | RS | H2 | Featured properties
T03-004 | RS | H2 | Featured projects
T03-005 | RS | H2 | Recently viewed
T03-006 | RS | H2 | List with us — it's free
T03-007 | RS | H2 | How it works
T03-008 | RS | H2 | Why My Gujarat Property
T03-009 | RS | H2 | Browse by category
T03-010 | RS | H2 | Featured properties
T03-011 | RS | H2 | List with us — it's free
T03-012 | RS | H2 | Search Results
T03-013 | MD | H2 | Search — Filter bottom sheet (mobile, open)
T03-014 | ST | H2 | Search — Empty state
T03-015 | RS | H2 | Search — Map toggle view
T03-016 | ST | H2 | Search — Loading state
T03-017 | RS | H2 | Save Search prompt
T03-018 | RV | H3 | 1A · Homepage — desktop (1280px+)
T03-019 | RV | H3 | 1B · Homepage — mobile (390px)
T03-020 | RV | H3 | 2A · Search results — desktop
T03-021 | RV | H3 | 2B · Search results — mobile (390px)
T03-022 | ST | H3 | Empty results — desktop &amp; mobile share this block
T03-023 | MD | H3 | Missing-location request modal — desktop
T03-024 | RV | H3 | 5A · Split view — desktop
T03-025 | MD | H3 | 5B · Full map + bottom-sheet list — mobile
T03-026 | ST | H3 | 5C · Fallback — maps provider not configured
T03-027 | RV | H3 | Inline card — desktop, sits above results
T03-028 | ST | H3 | Toast variant — mobile, after applying filters
T03-029 | ST | FRAME | font:500 13px Inter;color:#1E3A8A">Map view unavailable — showing list view
T04-001 | RS | H2 | Property detail page
T04-002 | RS | H2 | Project detail page
T04-003 | RS | H2 | Requirement detail — scoped visibility
T04-004 | RS | H2 | Broker public profile — /broker/[slug]
T04-005 | RS | H2 | Builder microsite — /builder/[slug]
T04-006 | MD | H2 | Report content modal &amp; fullscreen gallery
T04-007 | RS | H2 | Comparison page
T04-008 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — 1280px
T04-009 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile — 390px, sticky CTA
T04-010 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Unavailable variant — no soft-404
T04-011 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — 1280px
T04-012 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile — sticky Enquire CTA
T04-013 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — Broker/Builder view with Send Proposal
T04-014 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Guest teaser — locked, mobile
T04-015 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop
T04-016 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile
T04-017 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">6 · Owner public-safe profile — minimal by default
T04-018 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">7 · Claim profile — CTA + request modal
T04-019 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">8 · Report — desktop modal
T04-020 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">8 · Report — mobile bottom sheet
T04-021 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">9 · Fullscreen gallery — desktop with thumbnail strip
T05-001 | WZ | H2 | Post Property wizard — Owner/Broker · 9 steps
T05-002 | WZ | H2 | Post Project wizard — Builder · 10 steps
T05-003 | WZ | H2 | Post Requirement wizard — 7 steps
T05-004 | RS | H2 | Unit inventory management — Builder
T05-005 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop shell (dashboard sidebar + wizard) — step 3 shown with validation errors
T05-006 | WZ | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile shell — step 6 (Media upload) with upload widget
T05-007 | WZ | FRAME | font:500 13px Inter;color:#3f3f46">All 9 step panels — each slots into the identical shells above (desktop + mobile)
T05-008 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — grid with bulk select + action bar
T05-009 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile — stacked accordion cards
T05-010 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Unit edit — mobile bottom sheet (desktop = centered modal, same fields)
T06-001 | RS | H2 | Overview / Dashboard Home
T06-002 | RS | H2 | My Properties list
T06-003 | RS | H2 | My Requirements list
T06-004 | RS | H2 | Leads / Inquiries list — the worked table → card pair
T06-005 | MD | H2 | Lead Detail — drawer (desktop) / full page (mobile)
T06-006 | RS | H2 | Messages — thread list &amp; thread detail
T06-007 | RS | H2 | Site Visits — list &amp; detail
T06-008 | RS | H2 | Saved Properties · Saved Searches · Recently Viewed
T06-009 | RS | H2 | Analytics Dashboard
T06-010 | RS | H2 | Billing · Invoices · Invoice Detail · Pricing
T06-011 | RS | H2 | Verification Status
T06-012 | RS | H2 | Profile Edit · Notifications Center
T06-013 | RS | H2 | Support / Help · Settings
T06-014 | RS | H2 | Role Change Request · Data Export / Delete
T06-015 | RV | H3 | 1A · Overview — desktop (full shell)
T06-016 | ST | H3 | 1B · Stat row — skeleton loading variant
T06-017 | RV | H3 | 1C · Overview — mobile (390px, root screen: no back button, bottom nav)
T06-018 | MD | H3 | 1D · Mobile — sidebar drawer (open)
T06-019 | RV | H3 | 2A · Desktop panel (inside dashboard shell)
T06-020 | MD | H3 | 2B · Delete — confirmation dialog (mandatory for destructive actions)
T06-021 | RV | H3 | 2C · Mobile — contextual header + overflow menu open
T06-022 | ST | H3 | 2D · Empty state
T06-023 | RV | H3 | 3A · Desktop panel
T06-024 | ST | H3 | 3B · Mobile card + empty state
T06-025 | RV | H3 | 4A · Desktop table
T06-026 | RV | H3 | 4B · Same dataset → mobile cards
T06-027 | MD | H3 | 5A · Desktop — right drawer (480px)
T06-028 | RV | H3 | 5B · Mobile — full page with back button
T06-029 | RV | H3 | 6 · Thread list — mobile
T06-030 | RV | H3 | 7 · Thread detail — mobile (sticky input above keyboard)
T06-031 | RV | H3 | 8 · Visits list — desktop panel
T06-032 | MD | H3 | 9B · Reject — confirmation dialog
T06-033 | RV | H3 | 9A · Visit detail — mobile
T06-034 | ST | H3 | 10 · Saved properties — grid + empty
T06-035 | RS | H3 | 11 · Saved searches
T06-036 | ST | H3 | 12 · Recently viewed — strip + empty
T06-037 | RS | H3 | 13A · Populated — views over time + lead sources
T06-038 | ST | H3 | 13B · Not enough data yet
T06-039 | ST | H3 | 13C · Provider not configured
T06-040 | RS | H3 | 14 · Billing / Subscription
T06-041 | RS | H3 | 15 · Invoices — table→card
T06-042 | RS | H3 | 16 · Invoice detail — printable
T06-043 | RS | H3 | 17 · Pricing / Upgrade — in-dashboard plan comparison
T06-044 | RS | H3 | 18A · Upload + timeline (under review)
T06-045 | ST | H3 | 18B · Rejected — reason + re-submit
T06-046 | RS | H3 | 19 · Profile edit
T06-047 | RS | H3 | 20 · Notifications Center — full page
T06-048 | RS | H3 | 21 · Support — FAQ + ticket form + ticket status
T06-049 | RS | H3 | 22 · Settings
T06-050 | ST | H3 | 23 · Role change request + pending state
T06-051 | RS | H3 | 24 · Data export / delete request
T06-052 | ST | FRAME | font:500 13px Inter">#4821 — Invoice not downloading
T06-053 | RS | FRAME | font:500 13px Inter;color:#52525b">#4710 — Photo upload failing
T07-001 | RS | H2 | Overview / Dashboard Home
T07-002 | WZ | H2 | My Properties · Wizard entry · My Requirements
T07-003 | RS | H2 | Requirement Feed — matching requirements from Owners
T07-004 | RS | H2 | Proposals — Sent list · Detail · Send form
T07-005 | RS | H2 | Leads / CRM — List view
T07-006 | RV | H2 | Leads / CRM — Kanban view (desktop 1280px+)
T07-007 | MD | H2 | Lead Detail — CRM drawer (desktop) / full page (mobile)
T07-008 | RS | H2 | Messages · Site Visits · Saved — reused from Owner batch
T07-009 | RS | H2 | Analytics — conversion funnel &amp; listing ranking
T07-010 | RS | H2 | Billing · Invoices · Verification
T07-011 | RS | H2 | Profile Edit · Notifications · Support · Settings
T07-012 | RV | H3 | 1A · Overview — desktop (full shell, broker nav)
T07-013 | RS | H3 | 2 · Property row — with Featured chip (delta vs Owner)
T07-014 | RS | H3 | 4 · My Requirements — reused pattern
T07-015 | WZ | H3 | 3 · Post Property wizard — entry card + Continue Draft
T07-016 | RV | H3 | 5A · Feed — desktop panel
T07-017 | ST | H3 | 5B · Empty state
T07-018 | RS | H3 | 6 · Sent list — status tabs
T07-019 | RS | H3 | 7 · Proposal detail
T07-020 | MD | H3 | 8 · Send Proposal — modal (desktop) with duplicate-submit protection
T07-021 | RS | H3 | 15A · Conversion funnel — lead → visit → close
T07-022 | RS | H3 | 15B · Listing performance ranking
T07-023 | RS | H3 | 16 · Broker plan card + usage meters
T07-024 | RS | H3 | 18 · Verification — broker docs
T07-025 | RS | H3 | 19 · Profile edit — broker fields
T07-026 | RS | FRAME | font:500 13px Inter">Your proposal was viewed by Rajesh P. (3 BHK requirement)
T07-027 | RS | FRAME | font:500 13px Inter">Viewed by owner
T07-028 | RS | FRAME | font:500 13px Inter">Called — interested, wants ground-floor unit
T08-001 | RS | H2 | Overview / Dashboard Home
T08-002 | ST | H2 | My Projects · Wizard entry + re-approval banner
T08-003 | RS | H2 | Unit Inventory Management
T08-004 | RS | H2 | Leads · Requirement Feed · Proposals · Messages · Site Visits
T08-005 | RS | H2 | Agents / Team · Invite · Permissions Editor
T08-006 | WZ | H2 | Ads / Promotions — list · create wizard · detail · analytics
T08-007 | RS | H2 | Project Analytics · Billing · Invoices
T08-008 | RS | H2 | RERA Upload · Company Microsite · Construction Progress
T08-009 | RS | H2 | Notifications · Support · Settings — reused
T08-010 | RV | H3 | 2 · Projects list — desktop panel
T08-011 | ST | H3 | 3 · Wizard entry + edit re-approval banner
T08-012 | RV | H3 | 4A · Desktop — table with sticky header, 2 units selected
T08-013 | RV | H3 | 4B · Mobile — accordion by wing → floor (390px)
T08-014 | MD | H3 | 5 · Unit detail / edit — desktop modal
T08-015 | RS | H3 | 7 · Lead detail — Assigned Agent block (delta)
T08-016 | RS | H3 | 8 · Requirement Feed — explainable match chip (delta)
T08-017 | RS | H3 | 11 · Site visit detail — "Assign to agent" (delta)
T08-018 | RV | H3 | 12 · Team list — desktop table
T08-019 | RS | H3 | 14 · Permissions editor — per agent
T08-020 | MD | H3 | 13 · Invite agent — modal
T08-021 | RS | H3 | 15 · Campaign list
T08-022 | ST | H3 | 17 · Campaign detail — performance block (honest states)
T08-023 | ST | H3 | 18 · Ad analytics — setup-required state
T08-024 | WZ | H3 | 16 · Create Ad Campaign wizard — step 2 of 7 (creative slots)
T08-025 | RS | H3 | 19 · Project analytics — sales velocity (real data)
T08-026 | RS | H3 | 20 · Billing — Builder tier + ad wallet
T08-027 | RS | H3 | 22 · RERA proof upload — per project
T08-028 | RS | H3 | 23 · Company microsite edit
T08-029 | RS | H3 | 24 · Construction progress update
T09-001 | RS | H2 | Lead full detail page — standalone
T09-002 | MD | H2 | Note modal · Reminder scheduler · Status change · Duplicate detection
T09-003 | WZ | H2 | Contact Reveal flow — 3 steps
T09-004 | RS | H2 | Proposal full detail — with embedded thread
T09-005 | RS | H2 | Messages — searchable list · full-featured thread · report flow
T09-006 | RS | H2 | Site Visits — request · respond · remind · feedback · dispute
T09-007 | RV | H3 | 1A · Desktop — page inside dashboard shell (shell omitted)
T09-008 | RV | H3 | 1B · Mobile — full page (390px)
T09-009 | MD | H3 | 2 · Add/Edit note — mobile bottom sheet
T09-010 | ST | H3 | 5 · Duplicate lead detection — inline banner
T09-011 | MD | H3 | 3 · Follow-up reminder scheduler — modal
T09-012 | RS | H3 | 4 · Status change → Closed/Lost requires a reason
T09-013 | RV | H3 | 8 · Thread list — search + filters (mobile)
T09-014 | RV | H3 | 9 · Thread detail — full featured (mobile)
T09-015 | MD | H3 | 10 · Report thread — modal
T09-016 | RS | H3 | 11 · Request form (from lead context)
T09-017 | RS | H3 | 13 · Reminder notification card (in bell/center)
T09-018 | RS | H3 | 12 · Accept / Reject / Reschedule flow
T09-019 | RS | H3 | 14 · Post-visit feedback card
T09-020 | ST | H3 | 15 · Dispute state — edge case
T09-021 | RS | FRAME | font:500 13px Inter">Site visit scheduled — Sat 5 Jul, 11:00 AM
T10-001 | RS | H2 | Public pricing page
T10-002 | RS | H2 | In-dashboard billing — identical shell for Owner/Broker/Builder
T10-003 | RS | H2 | Payment flow — linear sequence
T10-004 | RS | H2 | Invoices
T10-005 | RS | H2 | Refunds, GST settings &amp; manual activation
T10-006 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — Broker tab active
T10-007 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile — stacked comparison cards
T10-008 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">2 · Subscription overview (Broker shown — structure identical for all 3 roles) + 3 · trial banner
T10-009 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">4 · Plan upgrade/change with prorated preview
T10-010 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">6 · Razorpay modal — representative placeholder
T10-011 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">7 · Verifying — background locked
T10-012 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">8 · Success — only after verified webhook/callback
T10-013 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">9 · Failed — honest, no plan activated
T10-014 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">11 · Invoice list — desktop table (identical all 3 roles) + mobile card
T10-015 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">12 · Invoice detail — printable
T10-016 | RS | FRAME | font:500 13px Inter;margin-top:4px">Bhatt Estate Consultants (Kunal Bhatt)
T10-017 | RS | FRAME | font:500 13px Inter">Refund status — REF-114
T10-018 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">15 · Manual activation — audit-friendly honest state
T11-001 | RS | H2 | Admin dashboard overview — role-aware
T11-002 | RS | H2 | User management &amp; role changes
T11-003 | RS | H2 | Staff management, permissions &amp; audit
T11-004 | RS | H2 | Moderation queues &amp; reviews
T11-005 | RS | H2 | Verification requests &amp; support tickets
T11-006 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop — Verification Manager view
T11-007 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">2 · Forbidden module — full page
T11-008 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile — contextual header + drawer, no bottom nav
T11-009 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">5 · Suspend/ban confirmation — reason required
T11-010 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">7 · Role change detail — reject requires reason
T11-011 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">10 · Permissions editor — view/edit/approve matrix
T11-012 | RS | FRAME | font:500 13px Inter">Kavita Rao — permissions
T11-013 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">12 · Property moderation queue (+ states)
T11-014 | RS | FRAME | font:500 13px Inter;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">3 BHK Apartment, Shrinand Residency — ₹85 L
T11-015 | RS | FRAME | font:500 13px Inter;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Plot 220 sq yd, Sanand GIDC — ₹38 L
T11-016 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">13 · Property moderation detail — highest-frequency workflow
T11-017 | RS | FRAME | font:500 13px Inter">"Shela Extension" — Ahmedabad
T11-018 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">17 · Duplicate / merge review — field-level keep selectors
T11-019 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">18 · Claim request review
T11-020 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">20 · Verification detail — private viewer + badge preview
T11-021 | RS | FRAME | font:500 13px Inter">Kunal Bhatt — broker verification
T11-022 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">22 · Ticket detail — thread + macros
T12-001 | RS | H2 | Subscriptions
T12-002 | RS | H2 | Payments &amp; webhook events
T12-003 | RS | H2 | Refunds, credit notes &amp; manual activation
T12-004 | RS | H2 | Plans &amp; coupons administration
T12-005 | RS | H2 | Trial campaigns
T12-006 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">4 · Payment detail — safe summary payload
T12-007 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin:24px 0 12px">7 · Refund detail / approve — confirmation before processing
T12-008 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">8 · Credit note — create + issued list
T12-009 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin:24px 0 12px">9 · Manual activation — bypass warning
T12-010 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin:24px 0 12px">11 · Invoice correction — versioned
T12-011 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">13 · Plan create/edit — with live public-pricing preview
T13-001 | RS | H2 | Ads Admin — queue · review · active list · fraud review
T13-002 | RS | H2 | Notification Admin — templates · editor · delivery logs · defaults
T13-003 | RS | H2 | Provider Status Dashboard + Detail/Test
T13-004 | RS | H2 | Feature Flags — list + toggle confirmation with audit note
T13-005 | RS | H2 | Maintenance Mode control + public maintenance page
T13-006 | RS | H2 | System Health + Background Jobs / Dead-Letter Queue
T13-007 | RV | H3 | 1 · Ads queue (pending approval) — desktop table
T13-008 | RS | H3 | 2 · Ad review detail — creatives, targeting, RERA check
T13-009 | RS | H3 | 3 · Active / expired ads — honest performance column
T13-010 | RS | H3 | 4 · Ad fraud / click review — PII-safe patterns
T13-011 | RS | H3 | 5 · Notification templates list
T13-012 | RS | H3 | 6 · Template editor — token chips, multi-language, live preview
T13-013 | ST | H3 | 7 · Delivery logs — honest failure + skip states
T13-014 | RS | H3 | 8 · Notification defaults — event × channel matrix (applies to new users)
T13-015 | RS | H3 | 9 · Provider status grid
T13-016 | RS | H3 | 10 · Provider detail / test — masked keys, test connection
T13-017 | RS | H3 | 11 · Flags list
T13-018 | RS | H3 | 12 · Toggle confirmation + audit note
T13-019 | RS | H3 | 13 · Maintenance control
T13-020 | RS | H3 | 14 · Public maintenance page (shown when active)
T13-021 | RS | H3 | 15 · System health dashboard
T13-022 | ST | H3 | 16 · Dead-letter queue — safe error summaries
T13-023 | RS | FRAME | font:500 13px Inter">Monsoon Offer — Grand Vista
T13-024 | RS | FRAME | font:500 13px Inter">Sankalp Grand Vista — RERA verified
T14-001 | RS | H2 | Content editing — one system for CMS, Blog &amp; Legal
T14-002 | RS | H2 | SEO settings, redirects &amp; sitemap
T14-003 | RS | H2 | Location hierarchy
T14-004 | RS | H2 | Missing translation tracker
T14-005 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin:24px 0 12px">5 · Legal pages — same list + editor, restricted
T14-006 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">2 · CMS page editor (4 · Blog adds featured image + categories + excerpt — same chrome)
T14-007 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">6 · Per-page metadata — inline quick edit + index toggle
T14-008 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin:24px 0 12px">8 · Redirect form — loop prevention warning
T14-009 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">10 · Hierarchy tree — Country → … → Society
T14-010 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">11 · Location create/edit — multilingual
T15-001 | RS | H2 | Audit Logs Viewer — append-only
T15-002 | RS | H2 | Security Events Dashboard
T15-003 | RS | H2 | Reports/Fraud Queue + Report Detail
T15-004 | RS | H2 | Duplicate lead · Reveal logs · Message report · Visit dispute
T15-005 | RS | H2 | Business Reports + Exports Management
T15-006 | RS | H2 | Bulk Action Confirmation + Maker-Checker Queue
T15-007 | RS | H3 | 5 · Duplicate lead review — same merge pattern as duplicate-listing (Batch 11)
T15-008 | RS | H3 | 6 · Contact reveal logs — permission-gated
T15-009 | RS | H3 | 7 · Message report review — flagged content in thread context
T15-010 | RS | H3 | 8 · Site visit dispute review — both outcomes side-by-side
T15-011 | ST | H3 | 9 · Business metrics — real data + setup-required variant
T15-012 | RS | H3 | 10 · Exports management
T15-013 | RS | H3 | 11 · Bulk action — preview of affected records first
T15-014 | RS | H3 | 12 · Maker-checker pending approvals
T16-001 | RS | H2 | About &amp; Contact
T16-002 | RS | H2 | Help center &amp; safety guidelines
T16-003 | RS | H2 | Shared legal document layout
T16-004 | RS | H2 | Cookie preference manager
T16-005 | RS | H2 | Blog
T16-006 | RS | H2 | Support tickets
T16-007 | RS | H3 | Property, done honestly, in Gujarati and in Gujarat
T16-008 | RS | H3 | How can we help?
T16-009 | RS | H3 | Terms &amp; Conditions
T16-010 | RS | H3 | Carpet vs built-up vs super built-up: what you actually pay for
T16-011 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">1 · About — desktop
T16-012 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">2 · Contact — mobile (390px)
T16-013 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">3 · FAQ / Help center — desktop
T16-014 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">4 · Safety guidelines — mobile
T16-015 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">5 · Terms &amp; Conditions — desktop with sticky TOC
T16-016 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:10px">Mobile — collapsible TOC (all legal pages)
T16-017 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:10px">10 · Listing Policy — do's/don'ts strip (above the shared layout)
T16-018 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:10px">14 · Disclaimer — short page with callout
T16-019 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:10px">15 · Grievance Policy — officer contact block
T16-020 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Desktop modal
T16-021 | MD | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">Mobile bottom sheet
T16-022 | RS | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">7 · Cookie Policy page — embedded trigger
T16-023 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">16 · Blog listing — desktop
T16-024 | RV | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">17 · Blog post — mobile with reading progress
T16-025 | ST | FRAME | font:500 13px Inter;color:#3f3f46;margin-bottom:12px">18 · Guest support form — rate-limited
T16-026 | ST | FRAME | font:500 13px Inter">Photos not uploading on listing
T17-001 | ST | H2 | PWA Install Prompt + Offline Banner
T17-002 | RS | H2 | Language Selector · Theme Toggle · Transliteration-Tolerant Search
T17-003 | RS | H2 | EMI Calculator · Stamp Duty Calculator · Unit Converter
T17-004 | MD | H2 | Comparison — compare tray + full table
T17-005 | ST | H2 | Analytics Consent · App Update Banner · Accessibility Quick-Settings
T17-006 | RS | H2 | Final consistency checklist
T17-007 | ST | H3 | 1 · Install prompt — mobile bottom banner
T17-008 | ST | H3 | 2 · Offline banner — above header, layout-safe
T17-009 | MD | H3 | 3 · Language selector (header dropdown, open)
T17-010 | RS | H3 | 4 · Theme toggle + dark-mode proof (same tokens, no redesign)
T17-011 | RS | H3 | 5 · Typo / transliteration-tolerant search (concept annotation)
T17-012 | RS | H3 | 6 · EMI calculator
T17-013 | RS | H3 | 7 · Stamp duty calculator (Gujarat rules)
T17-014 | RS | H3 | 8 · Unit converter — Gujarat land units
T17-015 | MD | H3 | 9a · Compare tray (sticky bottom bar on search results)
T17-016 | RS | H3 | 9b · Full comparison table
T17-017 | MD | H3 | 10 · Analytics consent (first visit, bottom-left desktop / bottom sheet mobile)
T17-018 | ST | H3 | 11 · App update available (PWA, non-blocking toast)
T17-019 | RS | H3 | 12 · Accessibility quick-settings panel
```
