# Batch 11 — Admin: User/Staff/Role Management + Moderation Queues

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 11 of 17 — Admin User/Staff/Role Management and Moderation Queues. This begins the Admin/Super Admin/Staff section — visually distinct from user-facing dashboards (graphite/neutral palette, not brand teal, to signal "internal tool").

MANDATORY CONSISTENCY — reuse the EXACT design system tokens from Batch 1, but apply the ADMIN SHELL variant (3F): graphite sidebar, desktop-primary, permission-scoped nav (some items visible/enabled, some grayed with a lock icon + tooltip for staff without that permission), drawer on mobile (no bottom nav). Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on every mobile admin sub-page.
- Every queue/list has loading, empty ("All caught up ✓" positive state), and error states.
- Every approve/reject action requires a reason field where the doc specifies, and produces a confirmation dialog for reject/suspend/ban actions.
- Every admin action that should be audited shows an inline note: "This action will be logged."
- No fake metrics; sensitive data only shown to permitted roles (annotate a masked/redacted example).
- Mobile-first still applies (admin staff may need emergency mobile access) but desktop 1280px+ is primary.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **Admin Dashboard Overview (role-aware)** — pending-queue count cards (Property Moderation: 12, Verification: 5, Support Tickets: 8, etc. — REAL-looking sample counts), quick-links to each queue.
2. **Unauthorized/Forbidden page** — "You don't have permission to access this module" + safe link back to allowed dashboard.
3. **User Management — List/Table** — table→card, filters (role, status, city, joined-date), search, row click → detail.
4. **User Detail page** — profile summary, tabs: Listings / Leads / Reports / Payment History / Activity Log; suspend/ban button (confirmation dialog requiring reason).
5. **User Suspend/Ban Confirmation Modal** — reason textarea (required), duration selector (temporary/permanent), warning copy about consequences.
6. **Role Change Request — Review Queue** — table of pending requests (user, current role → requested role, reason, date).
7. **Role Change Request Detail** — full context, approve/reject buttons, reject requires reason.
8. **Staff List page** — table of internal staff, role/permission summary chips, status (active/invited/suspended).
9. **Staff Invite form** — email, role selector, module-permission checkboxes grid, send-invite button.
10. **Staff Detail/Permissions Editor** — module-by-module toggle matrix (view/edit/approve per module), save bar, "This staff member can also see everything shown here" note pattern matching the Super-Admin-sees-all rule.
11. **Staff Activity/Audit History view (per staff)** — chronological log of their admin actions with timestamps and affected-record links.
12. **Property Moderation Queue** — table→card, thumbnail, title, submitted-by, submitted-date, "Review" button, filter by pending/needs-changes.
13. **Property Moderation Detail** — full listing preview (same rendering as public detail page) + moderation panel: Approve / Reject / Request Changes buttons, reason/notes textarea (required for reject/need-changes), moderation checklist (e.g. "Photos clear", "Price reasonable", "No contact info in description").
14. **Project Moderation Queue + Detail** — same pattern as property, PLUS a dedicated RERA verification check row (RERA number + "Verify" button + verified/unverified badge).
15. **Requirement Moderation Queue + Detail** — same pattern, lighter checklist.
16. **Missing Location Request Queue + Detail/Approve modal** — requested location name, submitter, "Add to location hierarchy" approve action opening a location-creation mini-form.
17. **Duplicate/Merge Review Screen** — side-by-side comparison of two listings/profiles with field-level "keep left / keep right / keep both" selectors, merge confirmation.
18. **Claim Request Review Queue + Detail** — proof-document viewer (private, watermarked placeholder), approve/reject buttons.
19. **Verification Request Queue** — table→card, applicant, document type, submitted date.
20. **Verification Request Detail** — private document viewer (secure/watermarked placeholder annotation), approve/reject/need-changes buttons with reason field, resulting badge preview ("This will show a Verified badge on their profile").
21. **Support Ticket Queue** — table→card, priority/status chips, assigned-to avatar.
22. **Support Ticket Detail** — reply thread (chat-style), canned-response/macro dropdown, escalate button, resolve/close action.

Design the moderation detail screens (13–15, 20) with the most care — they are the highest-frequency admin workflows; ensure the approve/reject/need-changes button group has a consistent, unmistakable visual hierarchy (approve = brand/success color, reject = danger color, need-changes = neutral/warning) reused identically across every queue in this batch.
