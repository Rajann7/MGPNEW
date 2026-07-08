# report-batch-15

## Batch 15 — Admin Audit / Security / Reports / Fraud / Exports

### Screens/components present in design (full inventory)

Teal accent (#0F6B5C). Sticky anchor nav: 1 Audit Logs, 2 Security, 3-4 Fraud Queue, 9-10 Reports·Exports. data-screen-label attributes per section.

1. Audit Logs Viewer (append-only) — search actor/target, filters (Actor: All, Module: Users [active/removable chip], Last 7 days), locked "Append-only — entries can never be edited or deleted" pill. Columns ACTOR/ACTION/TARGET/WHEN. Rows (priya@ role change, kunal@ listing approve, system auto-suspend). Read-only detail panel #AL-99120 with BEFORE/AFTER permission diff (payments.refund true→false highlighted), IP shown masked (103.240.xx.xx). Mobile card transform note ("under contextual header w/ back button"). Loading shimmer + empty ("No log entries match…Clear filters") + error ("Couldn't load audit logs" + Retry).
2. Security Events Dashboard — time range chips (Last 24h/7d/30d). 3 stat cards: Failed logins 42 (bar sparkline + "Spike 2-3 PM — mostly one IP range"), Rate-limit hits 118 (sparkline), Suspicious IPs flagged 3 (red, "2 auto-blocked after OTP flooding; 1 pending"). Recent security events table TYPE/DETAIL/SEVERITY/WHEN (OTP flooding High, Credential stuffing Medium, Admin login-new device Info).
3. Reports/Fraud Queue — columns TYPE/REPORTED ENTITY/REPORTER/SUBMITTED/PRIORITY/action. Rows Fraud(High), Spam(Medium, reporter "System (pattern)"), Duplicate(Low). Review buttons linking to detail/#f5.
4. Report Detail #R-0455 — EVIDENCE (quote + 2 screenshot thumbs), REPORTED LISTING PREVIEW (₹35L 2BHK, live 12 days, 6 leads, Open→), RELATED HISTORY ("3 prior reports · 2 fraud 1 upheld · 1 spam dismissed · account 4 months"), TAKE ACTION with required Reason textarea + 4 buttons (Warn user / Suspend user… / Remove listing… / Dismiss report).
5. Duplicate lead review — side-by-side KEEP (older richer #1234) vs MERGE IN (newer #2471), same-number match noted, "Merging combines timelines… Cannot be undone", buttons Not duplicates / Merge into #1234….
6. Contact reveal logs (permission-gated) — amber banner "Restricted view — requires abuse investigation permission and is itself audit-logged". Columns REVEALED BY/NUMBER OF/FROM LISTING/WHEN. Flagged row (User #U-9914 flagged, revealed 19 different buyers across 6 listings in 2 days).
7. Message report review — THREAD CONTEXT chat bubbles with a FLAGGED red bubble ("Share your OTP so I can generate the booking receipt"), REPORT panel (reporter, sender prior reports), required Reason + Warn sender / Suspend sender… / Dismiss.
8. Site visit dispute review #V-1188 — Disputed chip, OWNER REPORTED "Visit completed" vs VISITOR REPORTED "Visit didn't happen" side-by-side with quotes+timestamps, required Resolution notes ("both parties see this"), Mark completed / Mark not happened / Resolve….
9. Business metrics — Platform overview card, date range (This week), Export CSV. 3 stat tiles (New listings 86 ↑, Active users 4,212 ↑, Leads created 512 ↓ red). CITY-WISE NEW LISTINGS bars (Ahmedabad 32, Surat 22, Rajkot 18, Vadodara 14). Note "Counts come from the platform database directly — no analytics provider needed". Adjacent dashed "Behavioral analytics — Setup Required" card ("Nothing is simulated in the meantime" + Connect analytics→).
10. Exports management — Request an export form (Data type select: Listings/Leads/Users/Payments/Audit logs, From/To dates, CSV/XLSX/JSON toggle, Request export). "Your exports" list: Ready (2.1 MB, "link expires in 24 h", Download), Processing (~2 min), Failed ("range too large. Try 3 months max" + Retry).
11. Bulk action confirmation modal — overlay "Approve 12 listings?", scrollable affected-records preview (4 shown "…and 8 more (scroll)"), Cancel + Approve all 12.
12. Maker-checker pending approvals — teal banner "Four-eyes rule: checker must be a different admin than the maker". Columns MAKER/ACTION/WAITING/actions. Row 1 (kunal@ manual refund ₹24,999, Approve…/Reject…). Row 2 (You priya@ bulk-suspend, Approve DISABLED "You made this — another admin must check it").

### ADD-ON features/screens in design NOT in the prompt (deltas)

- IP address masking in audit detail (103.240.xx.xx) and security events (152.58.xx.xx) — privacy-preserving display not asked for.
- "system" and "System (pattern)" as non-human actors in audit log and fraud reporter — automated-actor modeling.
- Sparkline mini bar-charts inside security stat cards with narrative captions ("Spike 2-3 PM — mostly one IP range", "Normal range — mostly search API") — beyond plain "cards/charts".
- Concrete named threat types: OTP flooding, Credential stuffing (device fingerprint across 14 accounts), Admin login-new device verified via OTP — richer than "failed-login/rate-limit/suspicious-IP".
- Auto-block outcomes surfaced ("auto-blocked 24 h", "2 auto-blocked after OTP flooding") — automated enforcement shown, not just monitoring.
- Reveal-logs abuse pattern flag (19 buyers / 6 listings / 2 days) with a "flagged" chip — turns the log into an anomaly detector.
- "Contact reveal logs access is itself audit-logged" — meta-audit / access-to-sensitive-data logging.
- Message-report screen uses an OTP-phishing scam as the flagged example — ties directly to platform's OTP security concern; realistic fraud modeling.
- Report detail RELATED HISTORY carries verdict outcomes (upheld/dismissed) not just counts.
- Setup-required behavioral-analytics card sits BESIDE real DB metrics, with explicit "Nothing is simulated" copy — honest-data rule made visible.
- Export failure with actionable remediation ("Try 3 months max") and file size / 24h-expiry annotations.
- Maker-checker self-approval hard-disabled for the current admin with inline explanation — enforces four-eyes in UI, not just a note.
- "Reason required for all / for any action" enforced across fraud, message-report, dispute, and bulk screens — reason-textarea pattern applied consistently and stated as audit-logged.
- data-screen-label / data-dc-script attributes suggest a component-registry/streaming render harness (DCLogic) — infra hint.

### Items in prompt MISSING from design

- Full mobile card transforms per screen — only Audit Logs shows a mobile card sample; the rest are desktop-only grids (prompt asked "desktop then mobile for each screen").
- Report type "inappropriate" enum value mentioned in prompt — design shows Fraud/Spam/Duplicate only (no "inappropriate" row).
- Export status "Queued" — design shows Ready/Processing/Failed but no explicit Queued example.

### Notable UX patterns

- Deliberately "boring-in-a-good-way": high-contrast severity chips (High/Medium/Low/Info), zero-ambiguity confirm copy ("All 12 go live immediately and owners are notified").
- Preview-before-destroy consistently (bulk modal scroll-list, merge "cannot be undone", diff panel).
- Append-only enforced visually — no edit/delete affordances near log rows, explicit lock pill.
- Reason-required + audit-logged action pattern reused on every enforcement action.
- Permission-gating surfaced as banners on sensitive views (reveal logs).
- Setup-required and real-data separated so no fake analytics leak in.
