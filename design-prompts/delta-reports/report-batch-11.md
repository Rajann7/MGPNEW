# Report — Batch 11 (Admin: User/Staff/Role Management + Moderation Queues)

Source: `Batch_11_Admin_Management_Standalone_.txt` (app source pre-extracted to `work/b11.js`; complete visible-text render in `work/txt11.txt`).
Compared against: `C:\mgpweb\design-prompts\batch-11-admin-user-moderation.md`.

## Batch 11 — Admin Management & Moderation

### Screens/components present in design (full inventory)

Design groups 22 screens into 5 sidebar sections. Admin sidebar nav order (role-aware overview, Verification Manager view):
1. Overview
2. Moderation (badge e.g. 12)
3. Verification (badge e.g. 5)
4. Users
5. Staff & Roles (locked / "no access" for this staff member)
6. Billing (locked / "no access")

Locked modules visible but disabled with lock/tooltip — permission-scoped nav.

Screen inventory:
- 1–2 Overview: role-aware queue count cards (Property Moderation 12 "oldest pending 26 hrs", Verification 5 "2 brokers · 3 owners", Claim Requests 2, Project Moderation 3 "1 awaiting RERA check", Missing Locations 4 "3 in new GIDC areas", Support Tickets "—" requires Support Manager permission). Forbidden-module full page. Mobile: contextual header + drawer, no bottom nav.
- 3 User list: filters (Role, Status, City, Joined) + search; masked contact (98XXX XXX45) for non-permitted staff.
- 4 User detail tabs: Listings(14)/Leads/Reports(1)/Payments/Activity Log; Suspend/Ban; verified badge.
- 5 Suspend/ban confirm: reason required, Temporary (30 days) vs Permanent ban, consequence copy, logged.
- 6 Role change request queue (user, current→requested role, date).
- 7 Role change detail: applicant justification quote, note/reject reason (required to reject), Approve/Reject.
- 8 Staff list ("Internal staff · 6"), permission chips, status (Active/Invited), Invite staff.
- 9 Staff invite: work email, role template (Verification/Support/Content/Billing Manager/Custom…), module permission checkboxes (Verification, Moderation, Users, Support, Billing, System).
- 10 Permissions editor: VIEW/EDIT/APPROVE matrix per module; "Super Admin always sees everything… matrix can only restrict below"; Save.
- 11 Staff activity/audit history: chronological log with record links (#L-8842, #V-2210, #C-114), IST timestamps, checklist results.
- 12 Property moderation queue (Pending / Needs changes tabs); Review; empty ("All caught up"); error ("Couldn't load · Retry").
- 13 Property moderation detail: public listing preview + 5-item checklist (Photos clear, Price reasonable, No contact info in description, Location pin matches, Not a duplicate), notes required for Reject/Request Changes; Approve(brand)/Request Changes(warning)/Reject(danger).
- 14 Project variant: adds RERA row (PR/GJ/SURAT/2019/0847 + Verify + Unverified badge); approval blocked until RERA verified or exception flagged.
- 15 Requirement variant: lighter 2-point checklist (Genuine requirement not spam, No contact info in text).
- 16 Missing location queue + approve mini-form ("Shela Extension", requested by 3 users; ADD TO LOCATION HIERARCHY, Parent selector; Approve & add / Reject).
- 17 Duplicate/merge review: field-level keep selectors (Price, Photos "keep both available", Description) older vs newer; "keeps older live, archives newer. Logged + reversible for 30 days."
- 18 Claim request review: private watermarked PDF viewer ("RERA certificate.pdf", per-viewer watermark "MGP ADMIN · KR", never downloadable); Approve claim / Reject.
- 19 Verification request queue (applicant, document type, date).
- 20 Verification detail: private per-viewer watermarked viewer (aadhaar.pdf, gst-cert.pdf), badge preview ("On approval: Verified"), reason required for Reject/Need Changes; Approve/Need Changes/Reject.
- 21 Support ticket queue (ticket, priority chip, status chip, assigned avatar).
- 22 Ticket detail: chat thread, macro dropdown (Refund timeline / Ask for payment ref / Escalation notice), Escalate + Resolve.

### ADD-ON features/screens in design NOT in the prompt (deltas)

- Overview cards carry live sub-context strings not requested: "oldest pending 26 hrs", "2 brokers · 3 owners", "1 awaiting RERA check", "3 in new GIDC areas".
- Overview shows a locked/"—" Support Tickets card with explicit permission-gate copy ("Requires Support Manager permission") — per-card permission gating on the overview beyond the generic forbidden page.
- Mobile "no bottom nav" rule explicitly stated for admin (drawer only, "desktop-primary; drawer for emergency mobile use").
- Merge is time-bounded reversible: "Logged + reversible for 30 days", keeps older live / archives newer — concrete soft-delete/undo policy.
- Per-viewer document watermarking for BOTH claim (18) and verification (20) docs: watermark = reviewing staff initials ("MGP ADMIN · KR"), "never downloadable" (prompt only said "watermarked placeholder").
- Support ticket detail surfaces requester's plan ("Broker · Basic plan") inline.
- Named macro set: 3 concrete canned responses vs generic dropdown.
- Role-template presets in staff invite (prompt said only "role selector").
- Requirement checklist deliberately reduced to 2 points as a variant.
- Suspend copy specifies exact side-effects: "All 14 listings hidden immediately, active leads paused, user notified. Login stays possible but posting blocked."

### Items in prompt MISSING from design

- Staff status "suspended" — prompt lists active/invited/suspended; design renders only Active and Invited.
- No other omissions; all 22 prompt screens present.

### Notable UX patterns

- Single action-button hierarchy reused identically across every queue: Approve(brand) · Request Changes(warning outline) · Reject(danger outline); reason required for reject/need-changes; every action logged.
- "This action will be logged." inline note on every mutating action.
- Masked-contact pattern driven by permission (User Manager sees full number).
- Permission matrix can only restrict below Super Admin.
- Positive empty state ("All caught up") + explicit error/Retry on every queue.
- Graphite/neutral admin shell (Batch 1 §3F) to signal internal tool.
- Record IDs consistently linkable (#L-, #V-, #C-, #T-) in logs.
