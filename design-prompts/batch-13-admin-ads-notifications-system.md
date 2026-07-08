# Batch 13 — Admin: Ads/Notifications/Provider/System/Feature Flags

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 13 of 17 — Admin Ads Moderation, Notification Management, Provider/System Administration, and Feature Flags.

MANDATORY CONSISTENCY — reuse the Admin Shell and all design tokens from Batch 1, matching Batches 11–12's admin visual language exactly. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on mobile admin sub-pages.
- Every queue/list has loading, empty, and error states.
- Provider/system screens must show honest Active/Setup-Required/Error states — NEVER fake "Connected" status; secrets are always masked (e.g. "sk_live_••••••••42af") with a "Test Connection" action rather than displaying real keys.
- High-risk toggles (feature flags, maintenance mode) require a confirmation dialog and show an audit note.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

### Ads Admin
1. **Ads Queue (pending approval)** — table→card, campaign thumbnail, builder name, project, submitted date, "Review" button.
2. **Ad Review Detail** — banner previews across all creative sizes (desktop/tablet/mobile), targeting summary, RERA-linkage check (verifies the underlying project is RERA-verified), Approve/Reject buttons (reason required for reject).
3. **Active/Expired Ads List** — table→card, status chips, performance summary column (real impressions/clicks or "—" if not tracked), pause action.
4. **Ad Fraud/Click Review Screen** — flagged-click table (IP/device pattern summary, not raw PII overexposed), "Mark as fraud" / "Dismiss" actions.

### Notification Admin
5. **Notification Templates List** — table of templates (event type, channel: in-app/email/SMS/WhatsApp, status).
6. **Template Editor** — subject/body fields with placeholder-token helper chips ({{user_name}}, {{property_title}}), multi-language tabs (English/Gujarati/Hindi — show a "translation missing" indicator state), live preview panel.
7. **Notification Delivery Logs** — table→card, recipient, channel, status (Sent/Failed/Setup-Required-so-skipped), timestamp, filter.
8. **Notification Preferences Defaults Config** — matrix of event-types × channels with default-on/off toggles (applies to new users).

### Provider / System Admin
9. **Provider Status Dashboard** — grid of provider cards (OTP, WhatsApp, Email, SMS, Razorpay, Maps, R2/CDN, Analytics, Error Tracking) each showing status badge (Active/Setup Required/Error) — masked config summary, never real secrets.
10. **Provider Detail/Test Screen** — masked key fields, "Test Connection" button + result state (success/fail), last-tested timestamp.
11. **Feature Flags List** — table of flags (name, description, status, rollout scope), toggle switches.
12. **Feature Flag Toggle Detail/Confirmation** — impact description, confirmation dialog ("This will affect all users immediately"), audit-log note.
13. **Maintenance Mode Control** — big toggle with warning copy, custom maintenance-message field, scheduled-maintenance-window option, preview of the public-facing maintenance page.
14. **Maintenance Page (public-facing, shown when active)** — friendly full-page "We'll be back shortly" state, matches public branding, no dead links.
15. **System Health Dashboard** — job queue status cards, backup-status card (last backup timestamp), uptime indicator — honest, real-looking sample data.
16. **Background Jobs / Dead-Letter Queue View** — table of failed jobs, retry/dismiss actions, error summary (safe, no raw stack trace).

Give the Provider Status Dashboard (#9) special attention — it's the clearest visual expression of the platform's "never fake a status" rule, so make the Setup-Required and Error states just as polished as the Active state, not an afterthought gray box.
