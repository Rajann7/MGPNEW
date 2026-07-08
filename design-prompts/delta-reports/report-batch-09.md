## Batch 9 — Shared Detail Views (Leads / CRM / Proposals / Messaging / Site Visits)

### Screens/components present in design (full inventory — 15 screens across 5 groups)
- **Screen 1 — Lead full detail (standalone):** header (MP/Meera Purohit, "New" badge, "Number revealed" indicator), sub-line `Lead #2471 · via listing page · 3 BHK, Silver Heights · received today 9:42 AM`; actions Call / Schedule Visit / Message; tabs Timeline · Notes(2) · Related Property · Documents(1); Timeline = full touchpoint log (inquiry → number revealed → message sent → site visit scheduled); Notes tab with PINNED + regular notes (author, timestamp, Edit); Documents tab (`floor-plan-A-1204.pdf`, "Shared in chat · 840 KB", "Attach document"). Mobile 390px variant.
- **Screens 2–5 — Lead actions:** Add/Edit note bottom sheet (pin toggle); Follow-up reminder scheduler (date/time + quick chips Tomorrow/In 3 days/Next week + channels In-app/Push + resulting "Follow up Sat 10 AM" chip); Status-change pipeline dropdown (New/Contacted/Site Visit/Negotiation/Closed-Lost) with required-reason Closed/Lost dialog; Duplicate-lead inline banner (View #1234 / Merge… / Dismiss).
- **Screen 6 — Contact reveal (3 steps):** masked → consent notice → revealed (Call/Copy/WhatsApp).
- **Screen 7 — Proposal detail (#P-0192, "Shortlisted"):** requirement recap, proposed listing recap, status timeline (Sent/Viewed/Shortlisted/Accepted-Rejected), embedded conversation thread, Withdraw confirmation.
- **Screens 8–10 — Messages:** thread list (search + All/Unread(2)/Archived + swipe-to-archive); thread detail (View lead, Report thread, persistent safety banner, image + PDF attachments, read ticks, input above keyboard); Report-thread modal (reason taxonomy + notice + spinner).
- **Screens 11–15 — Site visits:** request form; Accept/Reject/Reschedule (propose new slot; reject reason required); reminder notification card w/ inline Confirm/Cancel; post-visit feedback (Interested/Not interested/Follow-up); dispute frozen state (support-only).

### ADD-ON features/screens in the design NOT in the docs/prompts (deltas)
1. **Monthly reveal quota** — reveal consent says "Uses 1 of your **20 monthly reveals**." Introduces a plan-limited reveal-allowance counter concept not in prompt (billing/plan tie-in).
2. **WhatsApp action** on revealed contact (prompt only listed Call/Copy) — provider dependency.
3. **Quick relative-time reminder chips** (Tomorrow / In 3 days / Next week).
4. **Two explicit reminder channels** distinguished: "In-app reminder" vs "Push notification."
5. **Named Closed/Lost reason taxonomy** (deal done / budget mismatch / chose another property / unresponsive / Other).
6. **Merge semantics spelled out** — "both timelines combine and the newer lead closes" (concrete data-model rule).
7. **Report-thread policy/SLA copy** — "The other person isn't notified… reviewed within 24 hours; thread stays visible."
8. **Documents-tab provenance link** — docs show "Shared in chat," tying Documents to Messaging attachments; plus an independent "Attach document" upload entry point on the lead.
9. **Named site-visit reject-reason list** (Unavailable / No longer interested / Other).

### Items in the prompt possibly MISSING from captured design
- Typing-indicator placeholder (screen 9) and Related Property tab body content — tabs/features exist but no text captured; likely rendered visually, flagged as *possibly missing*. All 15 screens otherwise present.

### Notable UX patterns
copy-only-on-tap, persistent non-dismissible chat safety banner, duplicate-submit protection everywhere, consistent destructive confirmations, strong cross-module linkage (lead↔messages↔proposal↔notifications), dispute = frozen support-only state.
