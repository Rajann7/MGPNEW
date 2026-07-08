# Report - Batch 13 (Admin: Ads/Notifications/Provider/System/Feature Flags)

Source: Batch_13_Admin_Ads_Notifications_System_Standalone.txt (app source pre-extracted to work/b13.js; complete visible-text render in work/txt13.txt).
Compared against: C:\mgpweb\design-prompts\batch-13-admin-ads-notifications-system.md.

## Batch 13 - Admin Ads / Notifications / System

### Screens/components present in design (full inventory)

Design groups 16 screens into 6 sections (= sidebar sub-nav order within the admin shell; sidebar omitted in frames but sections labeled):
1. Ads Admin (1-4)
2. Notifications (5-8)
3. Providers (9-10)
4. Feature Flags (11-12)
5. Maintenance (13-14)
6. System Health (15-16)

Screen inventory:
- 1 Ads queue (pending approval, "3 waiting"): search builder/project; columns CREATIVE/CAMPAIGN/BUILDER/PROJECT/SUBMITTED + Review; mobile card transform; empty (Queue is clear + View active ads); loading/error (Could not load the ads queue - Retry).
- 2 Ad review detail: Campaign #AD-0038; CREATIVES ALL SIZES (desktop 1440x250, tablet 768x240, mobile 390x312); TARGETING SUMMARY (Cities, Localities, Audience Buyers Rs.50L+ budget, Schedule); RERA LINKAGE CHECK (Sankalp Grand Vista - RERA verified - PR/GJ/SURAT/2024/1182 - verified 12 Mar 2026 + View project record); Approve / Reject with structured reject-reason radio dialog (Misleading pricing claim / Creative quality below guidelines / Targeting violates policy / Other) + "will see your reason and can resubmit".
- 3 Active/expired ads (tabs Active(2)/Expired/Rejected): columns CAMPAIGN/SCHEDULE/STATUS/PERFORMANCE; honest performance - "12,480 impr, 214 clicks" tracked vs "- Analytics not tracked" untracked; Pause action.
- 4 Ad fraud/click review ("2 to review"): PII-safe pattern summaries (86 clicks in 4 min from one IP range 49.36.xx.xx same device fingerprint; Repeated clicks with no dwell time from 3 devices overnight window); CLICKS FLAGGED count; Mark as fraud / Dismiss; raw identifiers stay in audit log with restricted access; Mark as fraud opens confirmation (clicks excluded from builder billing).
- 5 Notification templates list (EVENT/CHANNELS/STATUS; lead.created In-app+Email+WhatsApp Live, visit.reminder_24h In-app+SMS Draft, listing.approved Live) + Edit.
- 6 Template editor: multi-language tabs (English / Gujarati / Hindi) with "Gujarati translation missing - English is sent as fallback"; Subject/Body; insert token chips (tokUserName, tokLeadName, tokPropertyTitle, tokCity as double-brace tokens); Save draft / Publish; LIVE PREVIEW SAMPLE DATA (substitutes real sample values as you type).
- 7 Delivery logs: filters (All channels / Failed only / Last 24h); RECIPIENT/EVENT/CHANNEL/STATUS/TIME; honest states - Sent, "Failed - carrier error", "Skipped - provider not set up".
- 8 Notification defaults: EVENT x CHANNEL matrix (IN-APP/EMAIL/SMS/WHATSAPP toggles); "Changes apply to newly registered users only - existing users keep their own preferences"; Save defaults.
- 9 Provider status grid: OTP/SMS Auth (MSG91 Active, auth_key masked, Tested 2 hrs ago OK), Payments (Razorpay Active, rzp_live_ masked), Email (Resend ERROR - Last 14 sends failed - API key rejected 401. Sends paused and queued. Failing since 9:20 AM + Fix now), WhatsApp (Meta Cloud API Setup Required - skipped logged as such), Maps (Google Maps Platform Setup Required - falls back to list with a banner), Media/CDN (Cloudflare R2 Active, bucket mgp-media), Analytics (PostHog Setup Required - never simulated numbers), Error Tracking (Sentry Active, dsn masked). Manage/Fix now/Set up links per card.
- 10 Provider detail/test: masked write-only keys (Secrets are write-only - replace to rotate; never displayed); Razorpay (Test Connection => Connection OK - test order created and voided); Resend (Test failed - 401 Unauthorized + Last successful test 28 Jun).
- 11 Feature flags list (FLAG/ROLLOUT/ENABLED; map_search_view All users, broker_kanban_crm Brokers 25% rollout, gujarati_ui Internal only).
- 12 Toggle confirmation + audit note: "Disable map_search_view? This will affect all users immediately..."; Audit note required; audit trail entry rendered inline (actor + note + timestamp).
- 13 Maintenance control: "Maintenance mode is OFF"; consequence copy (takes public site and all dashboards offline for everyone except admins); public message field; schedule-a-window option (Sun 6 Jul 2:00 AM, Duration 1 hour); Save schedule; requires confirmation + audit note.
- 14 Public maintenance page: "We will be back shortly" full page, brand-matching, scheduled ETA, support email (no dead links).
- 15 System health dashboard: Uptime (30d) 99.94% "1 incident, 26 min total"; Job queue 14 pending "Median wait 2.1s, healthy"; Dead-letter queue 3 failed; Last backup "Today 3:00 AM, Verified, 4.2 GB, daily".
- 16 Dead-letter queue: JOB/ERROR SUMMARY/FAILED; safe error summaries (send_email provider returned 401 key rejected No user data lost; generate_invoice_pdf PDF render timed out 30s Invoice remains viewable in-app download blocked; sync_rera_registry GujRERA portal unreachable nightly sync skipped); Retry / Dismiss (dismiss requires confirmation + audit note); "Raw stack traces live in Sentry (linked per job) - never displayed here".

### ADD-ON features/screens in design NOT in the prompt (deltas)

- Ad review reject dialog is a structured radio-reason picker (Misleading pricing / Creative quality / Targeting violates policy / Other + explain) - prompt only said "reason required".
- Ad fraud "Mark as fraud" explicitly excludes flagged clicks from builder billing (billing-integrity linkage) and states raw identifiers stay in a restricted-access audit log - beyond prompt "not raw PII overexposed".
- Active ads tabs include a Rejected tab (prompt named only Active/Expired).
- Provider grid encodes graceful-degradation behavior per provider: WhatsApp skipped logged as such; Maps falls back to list with a banner; Email error sends paused and queued - concrete fallback semantics the prompt did not specify.
- Email provider rendered in a live ERROR state with failure count + start time (Last 14 sends failed 401, Failing since 9:20 AM) - richer than a static Error badge.
- Provider secrets explicitly write-only (replace to rotate, never displayed), with Test Connection results that name the test performed (test order created and voided).
- Template editor tokens are camelCase (tokUserName etc.) rather than prompt user_name snake_case - naming-convention delta for implementation.
- Delivery logs include a distinct "Skipped - provider not set up" state (separate from Failed) - honest provider-absence handling.
- Notification defaults explicitly scoped to NEW users only (existing users keep their own preferences) - migration-safety rule.
- Feature flag confirmation renders the resulting audit-trail entry inline (actor + note + timestamp) as a preview, not just a note.
- Maintenance carries a schedule-a-window sub-flow with concrete window + duration (not just an immediate toggle).
- System health surfaces incident detail (1 incident 26 min total) and backup verification (Verified 4.2 GB daily) - audit-grade metrics.
- Dead-letter dismiss requires confirmation + audit note; each job links to Sentry for the raw trace.

### Items in prompt MISSING from design

- Provider channel "SMS" as a distinct card - design merges OTP/SMS Auth into one MSG91 card (prompt listed OTP and SMS separately). All 9 named providers otherwise represented.
- No standalone provider "Add/Connect new provider" screen (implied by Set up CTAs but the setup flow itself is not a separate frame).
- Otherwise all 16 prompt screens present.

### Notable UX patterns

- "Never fake a status" made literal: Active / Setup Required / Error states each get equal visual polish; Setup Required always states the fallback behavior.
- Secrets always masked and write-only; Test Connection with named, honest result strings.
- Honest performance column: real numbers or "- Analytics not tracked" - never fabricated.
- PII-safe fraud patterns: truncated IP/device summaries in UI, raw data restricted to audit log.
- High-risk toggles (feature flags, maintenance) require confirmation + mandatory audit note; audit entry previewed inline.
- Safe error summaries everywhere (delivery logs, dead-letter queue) with "no user data lost / remains viewable" reassurance; raw stack traces only in Sentry.
- Defaults changes scoped to new users to protect existing preferences.
