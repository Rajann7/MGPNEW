# docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md

# My Gujarat Property — Ads, Promotions, Notifications And Provider Modes

This document defines the complete **Ads, Promotions, Notification System and External Provider Mode System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 8, 13). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Ads / promotions**
* Create Ad Campaign wizard = 7 steps (Project → Creatives → Targeting → Schedule → Preview → Payment → Submit). Creatives are uploaded per size with fixed aspect ratios: **Desktop 1200×300, Tablet 800×320, Mobile 390×200** (per-slot file-size limits). Step 5 shows an in-context preview ("banner appears between result rows").
* **Ads are always labelled "AD" to users** (transparency). Ad spend uses the rupee wallet with auto-pause at ₹0 (see doc 09). Campaign performance shows real impressions/clicks or honest "—"/"Analytics not tracked" — never fabricated. Ad list supports Duplicate on expired campaigns. Admin ad-fraud "Mark as fraud" excludes flagged clicks from builder billing.

**Notifications**
* Template editor: multi-language tabs (English / Gujarati / Hindi) with honest "translation missing — English sent as fallback"; insert-token chips using **camelCase `{{tokUserName}}` `{{tokLeadName}}` `{{tokPropertyTitle}}` `{{tokCity}}`**; live preview with sample data. Delivery logs distinguish Sent / Failed / **"Skipped — provider not set up"**. Notification defaults matrix (event × channel) applies to **newly registered users only** (existing users keep their prefs). Channels: In-app / Email / SMS / WhatsApp.
* Notification click deep-links to the related page, marks read, and reduces the unread badge (real unread count only).

**Provider modes**
* Provider grid shows honest **Active / Setup Required / Error** states, each with equal visual polish; every Setup-Required card **states its fallback behavior** (WhatsApp "skipped, logged"; Maps "falls back to list + banner"; Email "sends paused and queued"). Live Error state shows failure count + start time. Secrets are **write-only** (masked, "replace to rotate", never displayed); Test Connection names the exact test performed and returns an honest result. **OTP and SMS share one provider card** (e.g. MSG91). Never show fake "Connected"/"sent"/"active".

Claude must read this file before implementing builder ads, sponsored placements, ad approval, ad billing links, city targeting, homepage ads, notification bell, notification center, notification templates, email/SMS/WhatsApp delivery, provider settings, provider fallbacks, setup-required states, provider health, provider webhooks, retries, delivery logs, provider admin, feature flags or provider-related SQL migrations.

No fake ad is allowed.

No fake paid promotion is allowed.

No fake notification delivery is allowed.

No fake provider success is allowed.

No provider secret can be exposed.

No production feature can rely on test/mock provider state.

---

## 1. Purpose

This file defines:

* ads/promotions scope
* builder ad campaign workflow
* sponsored listing behavior
* homepage ad behavior
* city targeting
* IP/city fallback
* ad approval workflow
* ad payment linkage
* ad RERA/compliance rules
* ad banner upload rules
* ad fraud/impression/click tracking
* notification system
* notification bell
* notification center
* notification templates
* notification preferences
* notification delivery logs
* in-app notifications
* email notifications
* SMS notifications
* WhatsApp notifications
* push notifications
* provider modes
* setup-required states
* provider fallback behavior
* provider admin/status screens
* provider secrets safety
* provider health checks
* webhook/retry/idempotency rules
* feature flags for providers
* RLS/security expectations
* manual verification rules

This file is the master reference for promotions, notifications and provider-backed operations.

---

## 2. Core Principles

The system must follow these principles:

1. Ads must show only when approved, paid where required, active and not expired.
2. Builder ads must be linked to builder-owned approved projects.
3. Public ads must clearly show sponsored/promoted label.
4. RERA/compliance must be respected for project promotions.
5. Ad impressions and clicks must be real only.
6. No fake ad analytics are allowed.
7. Notifications must be DB-backed.
8. Unread counts must be real.
9. External notification delivery must be real or setup-required.
10. Provider secrets must never be exposed.
11. Missing providers must show setup-required/fallback.
12. Client-side provider success cannot be trusted for sensitive flows.
13. Webhooks must verify signatures where provider supports it.
14. Provider events must be idempotent.
15. Provider failures must be logged safely.
16. Provider fallbacks must not fake success.
17. Admin provider controls must be permission-scoped.
18. Production cannot use test/mock provider behavior.
19. Every provider status must be tracked honestly.
20. Manual verification is required before PASS.

---

## 3. Ads And Promotions Overview

Ads/promotions are paid or approved promotional placements on the platform.

Ad types may include:

* homepage banner
* city homepage banner
* search result sponsored card
* featured property/project placement
* builder project promotion
* profile promotion
* category/location promotion
* notification campaign where allowed
* internal announcement banner
* sponsored project carousel
* sponsored city placement
* boost listing
* featured listing
* ad campaign package

Current primary business scope:

* Builder dashboard ads/promotions for builder projects.
* Builder selects own published project.
* Builder uploads desktop/tablet/mobile banners.
* Builder targets all Gujarat or selected Gujarat cities.
* Admin approves/rejects/requests changes.
* Paid/approved/active/not expired ads show publicly.
* Sponsored label required.
* RERA disclosure required where applicable.

---

## 4. Ad Eligibility Rules

An ad/promotion can be created only if:

* user is logged in
* user role is Builder/Developer
* builder account is active
* builder has permission/plan/add-on if required
* selected project belongs to builder
* selected project is approved/published
* project is not paused/deleted/expired
* RERA status satisfies ad rule where applicable
* ad media is valid
* ad target is valid
* campaign duration is valid
* payment is verified or admin-approved manual exception exists
* ad submitted for approval
* ad approved before public display

An ad cannot display if:

* ad is draft
* ad is pending approval
* ad is rejected
* ad needs changes
* ad is unpaid where payment required
* payment failed/pending
* ad is paused
* ad expired
* ad is blocked
* project unpublished
* project paused/deleted
* builder suspended/banned
* RERA/compliance invalid
* media missing
* target city invalid
* feature flag disabled
* provider/setup dependency blocked

---

## 5. Ad Status Values

Ad lifecycle statuses:

| Status              | Meaning                                  |
| ------------------- | ---------------------------------------- |
| `draft`             | builder saved ad but not submitted       |
| `pending_approval`  | submitted for admin review               |
| `under_review`      | assigned/reviewing                       |
| `need_changes`      | admin requested changes                  |
| `rejected`          | rejected                                 |
| `approved`          | approved but not necessarily active      |
| `scheduled`         | approved and scheduled for future        |
| `active`            | currently running                        |
| `paused_by_builder` | paused by builder                        |
| `paused_by_admin`   | paused by admin                          |
| `expired`           | campaign ended                           |
| `blocked`           | blocked due to fraud/security/compliance |
| `deleted`           | soft deleted                             |
| `cancelled`         | cancelled before/during campaign         |

---

## 6. Ad Approval Status Values

| Status          | Meaning             |
| --------------- | ------------------- |
| `not_submitted` | not submitted       |
| `pending`       | waiting review      |
| `assigned`      | assigned to staff   |
| `under_review`  | reviewer checking   |
| `need_changes`  | changes requested   |
| `approved`      | approved            |
| `rejected`      | rejected            |
| `revoked`       | approval revoked    |
| `escalated`     | needs higher review |

---

## 7. Ad Payment Status Values

| Status          | Meaning                                |
| --------------- | -------------------------------------- |
| `not_required`  | payment not required for this campaign |
| `required`      | payment required                       |
| `pending`       | payment pending                        |
| `verified_paid` | verified payment success               |
| `failed`        | payment failed                         |
| `refunded`      | payment refunded                       |
| `manual_paid`   | admin marked paid with audit           |
| `blocked`       | payment issue blocks campaign          |

No ad requiring payment can run without `verified_paid` or audited approved equivalent.

---

## 8. Builder Ad Creation Flow

Builder ad creation flow:

1. Builder opens ads/promotions dashboard.
2. System checks role and plan.
3. Builder selects approved published project.
4. Builder selects ad type/placement.
5. Builder uploads banner media:

   * desktop
   * tablet
   * mobile
6. Builder selects target:

   * all Gujarat
   * selected cities
7. Builder selects duration/date range.
8. System calculates price if paid.
9. Builder previews ad.
10. Builder accepts ad policy/RERA disclosure.
11. Builder pays if required.
12. Payment must be verified.
13. Builder submits campaign for approval.
14. Admin reviews ad.
15. Admin approves/rejects/requests changes.
16. Active campaign displays only if all gates pass.
17. Impressions/clicks tracked real only.
18. Campaign expires automatically after end date.

If provider/payment/storage missing:

* show setup-required.
* do not fake upload/payment/ad submission.

---

## 9. Ad Placement Types

Supported or future ad placement types:

| Placement                   | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| `homepage_hero_banner`      | main homepage banner area                                     |
| `homepage_city_banner`      | homepage banner filtered by selected/IP city                  |
| `search_top_sponsored`      | sponsored result near top of search                           |
| `search_inline_sponsored`   | sponsored card within search results                          |
| `project_detail_sponsored`  | related/sponsored project on detail page                      |
| `city_page_banner`          | city SEO page banner                                          |
| `builder_profile_promotion` | promoted builder profile                                      |
| `featured_project_card`     | project shown in featured carousel                            |
| `boosted_project`           | boosted rank in allowed area                                  |
| `notification_campaign`     | internal promotional notification if allowed and consent-safe |

Initial implementation may start with limited placements but must track deferred items.

---

## 10. Ad Media Rules

Ad media must support:

* desktop banner
* tablet banner
* mobile banner

Media requirements:

* file type validation
* MIME validation
* file size limit
* dimension/ratio guidance
* preview
* crop/fit/no distortion where implemented
* upload progress
* retry
* error state
* storage provider setup-required state
* CDN where configured
* public after approval only
* old media cleanup where safe

Allowed formats may include:

* JPG
* JPEG
* PNG
* WebP
* AVIF
* GIF if policy allows
* sanitized SVG only if allowed

Ad media must not:

* include misleading claims
* include fake RERA/verified badges
* include phone numbers if policy disallows or hidden contact rules apply
* include illegal/abusive content
* include deceptive buttons
* include “guaranteed” legal/financial claims
* include unsafe scripts/SVG
* fake upload success

---

## 11. Suggested Ad Banner Sizes

Final sizes may be adjusted during design implementation.

Suggested guidance:

| Device  | Suggested Ratio                      | Notes                  |
| ------- | ------------------------------------ | ---------------------- |
| Desktop | wide landscape                       | homepage/search banner |
| Tablet  | medium landscape                     | tablet layout          |
| Mobile  | vertical/compact or mobile landscape | mobile-first placement |

Rules:

* show recommended dimensions in UI
* do not stretch/distort banners
* crop/fit preview before submit
* ensure mobile banner readable
* allow responsive image variants
* lazy-load public ad media
* no layout shift

---

## 12. Ad Targeting Rules

Target modes:

| Mode                  | Meaning                              |
| --------------------- | ------------------------------------ |
| `all_gujarat`         | ad eligible across Gujarat           |
| `selected_cities`     | ad eligible only for selected cities |
| `selected_districts`  | optional/future district targeting   |
| `selected_localities` | optional/future locality targeting   |
| `manual_admin`        | admin-configured targeting           |
| `fallback_nearby`     | nearby fallback if city unavailable  |

Initial primary targeting:

* all Gujarat
* selected Gujarat cities

Targeting rules:

* only valid active Gujarat cities
* city selection from location table
* no fake city data
* city targeting stored in DB
* user-selected city has priority over IP city
* IP city only if provider configured
* fallback to all Gujarat or nearby only by clear rule
* ad display must respect campaign targeting

---

## 13. Homepage Ad Selection Logic

Homepage ad display may consider:

1. user-selected city
2. IP/GeoIP city if configured
3. fallback city if nearby logic configured
4. all Gujarat campaigns
5. active campaign priority
6. campaign budget/rotation rules
7. frequency cap
8. fraud/click filters
9. RERA/compliance filters
10. device banner availability
11. ad placement availability

Rules:

* manual selected city should override IP city.
* if no city selected and no IP provider, use all Gujarat eligible ads.
* if no eligible ads, show no ad/empty design—not fake ads.
* only approved/paid/active/not expired ads show.
* sponsored label must be visible.
* public page must not block if ad query fails.
* ad query must be public-safe.

---

## 14. Search Sponsored Placement Rules

Sponsored search cards must:

* be clearly labeled `Sponsored`
* not look like organic result without disclosure
* use public-safe project/property data
* not hide ad nature
* respect city/filter relevance where defined
* not show expired/unapproved ads
* not show fake ranking
* not show fake metrics
* not leak hidden contacts
* load efficiently
* not disrupt SEO/private data

Sponsored results should not replace all organic results.

---

## 15. Ad Rotation Rules

Ad rotation may use:

* priority
* start/end date
* city match
* device match
* random weighted rotation
* fair rotation
* budget/impression cap where implemented
* frequency cap
* fraud filtering
* manual admin priority

Rules:

* rotation state must be real.
* no fake impressions to satisfy rotation.
* if priority is paid, disclose internally and document.
* admin override audited.
* rotation must be performant.

---

## 16. Ad Impression Tracking

Impression means ad was actually displayed or reasonably viewed based on product decision.

Impression tracking rules:

* track only real rendered/viewable events
* avoid duplicate spam
* use session/device/IP hash where safe
* do not store raw sensitive IP where avoidable
* rate-limit event spam
* deduplicate within window
* respect privacy/cookie rules
* do not count bot/admin preview as normal impression unless marked
* public page failure must not break user experience
* no fake impression count

Impression fields may include:

* ad ID
* placement
* city
* device type
* session hash
* IP hash
* user agent hash
* profile ID if logged in
* timestamp
* event type
* fraud flag

---

## 17. Ad Click Tracking

Click means user intentionally clicked ad.

Click tracking rules:

* track only real clicks
* debounced/deduplicated
* prevent click spam
* use safe redirect or direct link
* prevent open redirect
* log campaign/project
* fraud detection
* do not fake click count
* do not count admin preview as normal click
* redirect target must be safe public project/profile page
* sponsored label remains clear before click

Click may create lead only when user takes lead action, not just click, unless ad product explicitly defines click lead.

---

## 18. Ad Fraud Protection

Ad fraud signals:

* repeated clicks from same session/IP hash
* bot user agent
* abnormal click-through rate
* repeated self-clicks by builder
* admin/test traffic
* suspicious referrer
* high-frequency impressions
* direct event API abuse
* malformed events

Fraud actions:

* ignore event
* mark suspicious
* rate limit
* block event key
* alert admin
* pause campaign if severe
* review manually
* exclude from billable metrics if applicable

No fake fraud decisions.

---

## 19. Ad Admin Review

Admin/staff ad review must show:

* builder profile
* selected project
* project approval status
* RERA status
* plan/payment status
* banner previews desktop/tablet/mobile
* target cities
* start/end date
* ad policy acceptance
* sponsored label preview
* landing page preview
* duplicate/conflict warnings
* fraud history
* internal notes
* approval timeline

Admin actions:

* approve
* reject
* request changes
* pause
* resume
* block
* revoke approval
* assign/escalate
* add note

Reason required for:

* reject
* request changes
* pause by admin
* block
* revoke

Actions audited.

---

## 20. Ad Compliance Rules

Ad compliance must check:

* builder owns project
* project approved/published
* ad media matches project
* no misleading claim
* no fake RERA
* no fake verified badge
* no illegal promise
* no discriminatory content
* no unsafe contact leak
* no hidden fees deception
* RERA disclosure where applicable
* sponsored label visible
* landing page safe
* payment verified
* campaign not expired

Ad copy should not claim:

* guaranteed returns
* guaranteed legal title
* guaranteed appreciation
* platform guarantee
* fake scarcity
* fake government approval
* fake RERA verified status

---

## 21. Ad RERA Rules

For project ads:

* RERA applicability must be captured.
* RERA number/status must be real.
* RERA proof private.
* RERA disclosure visible where applicable.
* Valid RERA may be mandatory before promotion where applicable.
* Expired/revoked/invalid RERA should block or warn ad approval according to policy.
* Admin review required for RERA-sensitive ad.
* No fake RERA badge.

RERA badge/disclosure must not be legal guarantee.

---

## 22. Ad Billing Linkage

Ad may require payment.

Ad billing flow:

1. builder creates campaign
2. campaign price calculated server-side
3. Razorpay order created if provider configured
4. payment verified through webhook
5. campaign payment status updated
6. invoice generated if required
7. ad can be submitted/approved/activated depending policy

Ad cannot run on:

* failed payment
* pending payment
* fake client callback
* unverified payment
* unpaid required campaign

Manual paid status requires permission and audit.

---

## 23. Ad Expiry And Renewal

Campaign expiry:

* campaign ends at `ends_at`
* ad no longer displays
* status becomes expired
* dashboard shows renewal option
* notification sent if provider configured
* public cache revalidated

Renewal may require:

* payment
* approval if media/content/target changed
* RERA recheck
* plan check
* admin review

Expired ad must not display.

---

## 24. Ad Pause / Resume

Builder pause:

* builder can pause own active ad
* ad stops displaying
* resume allowed if still valid/paid/approved/not expired
* no reapproval if content unchanged
* cache revalidated

Admin pause:

* permission required
* reason required
* audit required
* builder notified

Resume after admin pause may require admin permission.

---

## 25. Ad Deletion / Cancellation

Rules:

* soft delete by default
* active paid campaign cancellation follows refund/cancellation policy
* deleted ad hidden from public
* media cleanup follows media rules
* audit admin delete/cancel
* no hard delete without retention/legal approval
* campaign analytics retained as needed

---

## 26. Notification System Overview

Notification system has two layers:

1. **In-app notifications** stored in database.
2. **External notifications** sent through providers.

External channels may include:

* email
* SMS
* WhatsApp
* push

In-app notification is the base reliable channel.

Provider delivery can fail without losing in-app notification.

---

## 27. Notification Types

Notification types include:

### Auth / Account

* account created
* login alert
* suspicious login
* role change requested
* role change approved/rejected
* account suspended/banned

### Listing / Project / Requirement

* property submitted
* property approved/rejected/need changes
* property expired
* project submitted
* project approved/rejected/need changes
* requirement submitted
* requirement approved/rejected/need changes

### Leads / CRM

* new inquiry
* contact revealed
* new lead assigned
* follow-up due
* proposal received
* proposal viewed/accepted/rejected
* new message
* site visit requested/accepted/rejected/rescheduled/cancelled

### Billing

* payment pending
* payment failed
* payment verified
* subscription activated
* plan expiring
* trial expiring
* invoice generated
* refund processed

### Ads

* ad submitted
* ad approved
* ad rejected
* ad need changes
* ad active
* ad paused
* ad expired
* ad payment failed
* ad performance summary where implemented

### Admin / Staff

* new moderation task
* verification task assigned
* support ticket assigned
* report/fraud alert
* provider failure
* payment webhook failure
* security event
* SLA overdue
* maker-checker pending

### System

* provider setup-required
* provider failed
* backup/restore alert
* maintenance mode
* deployment alert
* security incident

---

## 28. Notification Status Values

Notification status:

| Status     | Meaning                        |
| ---------- | ------------------------------ |
| `created`  | notification record created    |
| `unread`   | not read                       |
| `read`     | read by recipient              |
| `archived` | archived                       |
| `deleted`  | soft deleted                   |
| `failed`   | failed to create/process       |
| `blocked`  | blocked by preference/security |

Delivery status:

| Status                    | Meaning                                      |
| ------------------------- | -------------------------------------------- |
| `not_required`            | external delivery not required               |
| `queued`                  | delivery queued                              |
| `sent`                    | provider accepted/sent where real            |
| `delivered`               | provider confirmed delivered where available |
| `failed`                  | delivery failed                              |
| `retry_pending`           | retry scheduled                              |
| `skipped_preference`      | user preference disabled                     |
| `skipped_quiet_hours`     | delayed/skipped due to quiet hours           |
| `provider_setup_required` | provider missing                             |
| `provider_disabled`       | disabled by flag                             |
| `blocked`                 | blocked due to abuse/policy                  |

No fake sent/delivered.

---

## 29. Notification Bell Rules

Notification bell must show:

* real unread count
* latest notifications
* loading state
* empty state
* error state
* mark one read
* mark all read
* deep link
* mobile bottom sheet
* notification center link

Rules:

* count must be DB-backed
* recipient sees own notifications only
* staff sees own internal notifications only
* no fake unread count
* not globally cached
* direct URL protected
* deep links permission-checked
* deleted/unauthorized target handled safely

---

## 30. Notification Center Rules

Notification center must support:

* list notifications
* filter by type
* filter read/unread
* mark read
* mark all read
* archive/delete
* preferences link
* deep link open
* pagination
* mobile card layout
* empty state
* error state

Rules:

* user sees own notifications
* staff sees own internal notifications
* no private data leak in notification body
* notification body must be safe
* deep link must not bypass permissions

---

## 31. Notification Template Rules

Templates may include:

* title
* body
* channel
* type
* language
* placeholders
* deep link
* enabled flag
* role target
* provider channel
* version
* created/updated by

Template rules:

* placeholders validated
* no secrets/private docs
* hidden contact not inserted unless recipient authorized
* legal/transactional templates reviewed where needed
* changes audited
* admin permission required
* multi-language ready
* fallback template if missing

---

## 32. Notification Preferences

User preferences may include:

* in-app enabled
* email enabled
* SMS enabled
* WhatsApp enabled
* push enabled
* marketing opt-in
* transactional notifications
* lead notifications
* billing notifications
* site visit notifications
* support notifications
* digest frequency
* quiet hours
* language preference

Rules:

* important transactional/security notifications may be mandatory where allowed
* marketing opt-in required for marketing messages
* unsubscribe respected
* quiet hours respected where implemented
* preference changes user-scoped
* no fake external delivery

---

## 33. Notification Deep Link Rules

Deep links must be safe.

Examples:

* property approval → property dashboard page
* new inquiry → lead detail
* proposal received → proposal detail
* new message → message thread
* invoice generated → billing invoice
* ad approved → ad dashboard
* admin task → admin queue item

Rules:

* deep link must be permission-checked
* wrong user denied
* deleted target shows unavailable
* guest redirected to auth if appropriate
* staff permission checked
* no private IDs exposed in public metadata
* no open redirect

---

## 34. In-App Notification Flow

Flow:

1. Event occurs.
2. Server validates event.
3. Notification record created.
4. Recipient unread count updates.
5. Notification bell shows latest.
6. External delivery job queued if configured.
7. Delivery log updated.
8. User can read/mark/archive.

If external provider fails:

* in-app notification remains.
* delivery log records failure.
* retry if configured.
* no fake delivery.

---

## 35. External Notification Flow

Flow:

1. Notification created.
2. User preference checked.
3. Channel/provider selected.
4. Provider availability checked.
5. Delivery job queued.
6. Provider adapter sends.
7. Provider response processed.
8. Delivery log updated.
9. Retry/failure handled.

Rules:

* provider setup-required if missing
* disabled channel skipped
* safe provider errors
* no raw secrets
* delivery status real only
* idempotency for retry
* no duplicate spam

---

## 36. Provider Mode System

Provider modes define how a provider is used.

Allowed provider modes:

| Mode             | Meaning                             |
| ---------------- | ----------------------------------- |
| `not_started`    | not configured                      |
| `setup_required` | required configuration missing      |
| `disabled`       | intentionally disabled              |
| `test`           | test/sandbox mode                   |
| `live`           | production live mode                |
| `fallback`       | fallback mode active                |
| `free_mode`      | free/non-API mode                   |
| `api_mode`       | official API mode                   |
| `manual_mode`    | manual/admin processing             |
| `mock_dev_only`  | mock only for dev, never production |
| `maintenance`    | temporarily unavailable             |
| `failed`         | configured but failing              |
| `degraded`       | partially working                   |

Production cannot rely on `mock_dev_only`.

---

## 37. Provider Status Values

Provider status:

| Status                  | Meaning                      |
| ----------------------- | ---------------------------- |
| `NOT_STARTED`           | not implemented/configured   |
| `SETUP_REQUIRED`        | env/provider setup missing   |
| `CONFIGURED_NOT_TESTED` | config exists but not tested |
| `TEST_MODE_ONLY`        | only sandbox/test mode ready |
| `LIVE_READY`            | production live ready        |
| `ACTIVE`                | active and working           |
| `DISABLED_BY_FLAG`      | disabled by feature flag     |
| `FALLBACK_ACTIVE`       | fallback mode in use         |
| `FAILED`                | provider failing             |
| `DEGRADED`              | partial failure              |
| `BLOCKED`               | cannot be used               |
| `ROLLED_BACK`           | provider change rolled back  |

Provider status must be tracked in `API_PROVIDER_STATUS.md`.

---

## 38. Provider Areas

Provider areas include:

* Supabase Auth
* Supabase Database
* Supabase RLS
* OTP provider
* SMS provider
* email provider
* WhatsApp free link
* WhatsApp Business API
* Razorpay
* Google Maps Embed
* Google Maps API
* Cloudflare R2
* Cloudflare CDN
* Cloudflare Turnstile
* analytics provider
* error tracking provider
* cron/background job provider
* media processing provider
* file scanning provider
* PDF generation provider
* GeoIP/IP location provider
* web push provider
* Search Console / SEO provider

Each provider must have honest status.

---

## 39. Provider Setup-Required Rule

If provider is missing, the app must show setup-required/fallback.

Examples:

| Provider Missing | Required Behavior                                |
| ---------------- | ------------------------------------------------ |
| OTP              | public OTP login unavailable/setup-required      |
| SMS              | SMS delivery setup-required                      |
| Email            | email delivery setup-required                    |
| WhatsApp API     | use free wa.me fallback or setup-required        |
| Razorpay         | checkout disabled/setup-required                 |
| Maps API         | manual location/text fallback                    |
| R2               | upload disabled/setup-required                   |
| CDN              | media works without CDN or setup-required        |
| Turnstile        | abuse protection setup-required/disabled by flag |
| Analytics        | analytics dashboard empty/setup-required         |
| Cron             | reminders/expiry jobs setup-required             |
| Push             | push notification setup-required                 |
| PDF              | invoice PDF generation setup-required            |

Do not fake provider success.

---

## 40. Provider Fallback Rules

Fallbacks must be honest.

Examples:

* WhatsApp API missing → `wa.me` free link if allowed and user contact already authorized.
* Maps API missing → text address/manual location.
* Email provider missing → in-app notification only.
* SMS provider missing → in-app/email if configured.
* Push missing → in-app notification only.
* R2 missing → upload disabled/setup-required.
* CDN missing → serve from storage if safe/configured or setup-required.
* GeoIP missing → manual city selector.
* Analytics missing → real DB counts only or setup-required.
* Cron missing → manual/admin warning or request-time checks.

Fallback cannot show “sent/delivered/paid/uploaded” unless real.

---

## 41. Provider Admin Module

Provider admin must show:

* provider name
* provider area
* current mode
* current status
* required env names
* configured yes/no
* last tested at
* last test result
* safe error code
* feature flag state
* fallback status
* setup notes
* related features affected
* retry/test action if permitted
* audit timeline

Provider admin must not show:

* raw API key
* secret
* webhook secret
* service role key
* full token
* raw private `.env`
* raw provider payload with secrets

---

## 42. Provider Secret Safety

Provider secrets must be:

* stored in environment variables or secret manager
* never committed
* never printed in logs
* never returned to browser
* never shown raw in admin UI
* never stored in plain DB
* never included in public JS bundle
* never sent in notification/template
* rotated when leaked
* masked in status UI

Masked example:

```txt id="provider-secret-mask"
RAZORPAY_KEY_SECRET: configured / hidden
MSG91_AUTH_KEY: configured / hidden
RESEND_API_KEY: configured / hidden
```

---

## 43. Provider Health Checks

Provider health checks may verify:

* env exists
* API reachable
* auth valid
* test send works
* webhook configured
* bucket accessible
* CDN reachable
* map key valid
* payment mode correct
* rate limits healthy
* last failure
* last success

Rules:

* health check permission required
* health check rate-limited
* no production spam test
* safe errors only
* no raw secrets in result
* provider status updated honestly
* audit high-risk provider setting changes

---

## 44. Provider Webhook Rules

Webhook providers may include:

* Razorpay
* WhatsApp Business API
* email delivery provider
* SMS delivery provider
* push provider
* storage/media processing provider
* analytics/event provider where needed

Webhook rules:

1. verify signature where supported
2. use raw body where required
3. reject invalid signature
4. idempotency by event ID
5. store safe event summary
6. process safely
7. retry on failure
8. no duplicate side effects
9. no raw secret payload logs
10. rate-limit/validate source where possible

---

## 45. Provider Retry Rules

Retry required for:

* notification sends
* webhook processing
* media processing
* invoice PDF generation
* provider health checks where safe
* ad event aggregation
* payment reconciliation

Retry rules:

* limited attempts
* exponential backoff where possible
* safe error code
* dead-letter after repeated failure
* admin alert on failure
* idempotent processing
* no duplicate user spam
* no duplicate invoice/payment activation

---

## 46. Dead Letter Queue

Dead letter records should store:

* source
* event type
* event ID/hash
* safe payload summary
* error code
* attempts
* last attempted at
* status
* assigned staff/system
* resolution note

Dead letters may occur for:

* webhook processing failure
* notification delivery failure
* media processing failure
* invoice generation failure
* ad event aggregation failure

No secrets in dead-letter payload.

---

## 47. OTP Provider Modes

OTP provider modes:

| Mode             | Meaning                 |
| ---------------- | ----------------------- |
| `setup_required` | provider not configured |
| `test`           | test mode               |
| `live`           | live OTP                |
| `disabled`       | OTP disabled            |
| `fallback`       | fallback method enabled |
| `mock_dev_only`  | dev only                |

OTP rules:

* public login depends on OTP provider.
* OTP must not be logged.
* OTP send/verify rate-limited.
* no fake OTP sent.
* non-registered mobile triggers registration flow.
* production cannot use dev mock OTP.
* OTP provider status tracked.

Possible providers:

* MSG91
* Fast2SMS
* Twilio
* Textlocal
* other approved provider

---

## 48. SMS Provider Modes

SMS may be used for:

* OTP if separate
* alerts
* billing reminders
* site visit reminders
* lead alerts
* security alerts

Rules:

* DLT/template compliance may be needed in India.
* provider setup-required until configured.
* delivery logs real only.
* no fake SMS sent.
* user preferences respected where applicable.
* transactional messages handled appropriately.
* safe retry.

---

## 49. Email Provider Modes

Email may be used for:

* staff invites
* invoices
* receipts
* support replies
* verification updates
* listing approvals
* billing alerts
* security alerts
* marketing/newsletter where opted in

Possible providers:

* Resend
* SendGrid
* SMTP
* other approved provider

Rules:

* provider setup-required until configured.
* email sending server-side.
* templates safe.
* delivery logs real only.
* unsubscribe for marketing.
* no secrets in email.
* no private docs attached publicly without permission.
* invoice PDF attachment/link must be scoped.
* staff invite tokens secure.

---

## 50. WhatsApp Provider Modes

WhatsApp modes:

| Mode              | Meaning                                               |
| ----------------- | ----------------------------------------------------- |
| `free_link`       | `wa.me` link opens WhatsApp; no API delivery tracking |
| `business_api`    | official WhatsApp Business Cloud/API                  |
| `setup_required`  | API not configured                                    |
| `disabled`        | disabled                                              |
| `fallback_active` | free link fallback                                    |

Rules:

* WhatsApp free link is not same as delivered message.
* Do not mark `sent` if only wa.me opened.
* Contact must be authorized before showing WhatsApp link.
* Hidden contact not leaked to guest.
* Business API templates require approval.
* Delivery logs only if API confirms.
* User preference/consent respected.
* No fake WhatsApp sent/delivered status.

---

## 51. Razorpay Provider Modes

Razorpay modes:

* setup_required
* test
* live
* disabled
* failed

Rules:

* test mode only is not production-ready.
* live keys required for production.
* webhook secret required.
* server-side order creation.
* webhook signature verification.
* no client-only activation.
* no fake payment success.
* idempotency mandatory.
* provider status tracked.

---

## 52. Maps Provider Modes

Maps modes:

* disabled
* embed mode
* API mode
* setup_required
* fallback manual location

Rules:

* manual location must work without map provider.
* Maps API key restricted by domain/API.
* no raw key exposure beyond public browser key restrictions.
* no server secret in client.
* no fake nearby places.
* IP/GeoIP not required for manual city.
* text address fallback.
* map pin privacy respected.

---

## 53. Cloudflare R2 / Storage Provider Modes

Storage modes:

* setup_required
* local/dev only
* R2 active
* disabled
* fallback storage

Rules:

* public media bucket separate from private docs.
* private docs signed URLs only.
* upload disabled/setup-required if provider missing.
* no fake upload success.
* media metadata stored.
* orphan cleanup.
* lifecycle rules.
* CDN purge where needed.
* private docs never on public CDN.

---

## 54. Cloudflare CDN Provider Modes

CDN modes:

* setup_required
* active
* disabled
* degraded

Rules:

* public media can use CDN.
* private docs must not be public CDN.
* cache purge/revalidation required on media update/delete.
* public asset caching safe.
* no fake CDN healthy status.
* fallback direct storage if safe/configured.

---

## 55. Turnstile Provider Modes

Turnstile may protect:

* OTP send
* inquiry submit
* contact reveal
* report form
* support ticket
* message send
* search abuse
* admin login where appropriate

Modes:

* setup_required
* active
* disabled_by_flag
* fallback_rate_limit_only

Rules:

* Turnstile missing should not fake bot protection.
* rate limits still required.
* token verified server-side.
* frontend-only Turnstile not enough.
* provider failure safe.

---

## 56. Analytics Provider Modes

Analytics may include:

* privacy-safe analytics
* web analytics
* business metrics
* ad analytics
* search analytics
* conversion analytics

Rules:

* real events only.
* consent/cookie rules respected.
* no fake charts.
* dashboard analytics may use DB events if external provider missing.
* provider setup-required if advanced analytics not configured.
* no hidden contact/private data in analytics.
* IP/user identifiers minimized/hashed where appropriate.

---

## 57. Error Tracking Provider Modes

Error tracking may include:

* frontend errors
* backend errors
* provider failures
* webhook errors
* job failures

Rules:

* no secrets in error reports.
* no OTP/tokens/payment secrets.
* no hidden contact.
* no private docs URLs.
* environment tagged.
* provider setup-required until configured.
* production errors monitored.

---

## 58. Cron / Background Job Provider Modes

Jobs may handle:

* ad expiry
* subscription expiry
* trial expiry
* reminders
* notification retries
* payment reconciliation
* invoice PDF generation
* sitemap generation
* media cleanup
* provider health checks
* report aggregation
* dead-letter retry

Rules:

* cron setup-required until configured.
* request-time fallback where safe.
* no fake reminders/expiry.
* jobs idempotent.
* retries safe.
* failure alerts internal.

---

## 59. Push Notification Provider Modes

Push may support:

* web push
* PWA push
* lead alerts
* message alerts
* site visit reminders
* admin alerts

Rules:

* explicit browser permission.
* user preference.
* provider setup-required.
* fallback in-app notification.
* no fake push sent.
* no sensitive full data in push body.
* deep link permission-checked.

---

## 60. Provider Feature Flags

Provider-backed features should use feature flags.

Possible flags:

* `enable_otp_login`
* `enable_sms_notifications`
* `enable_email_notifications`
* `enable_whatsapp_api`
* `enable_whatsapp_free_link`
* `enable_razorpay_checkout`
* `enable_google_maps`
* `enable_r2_uploads`
* `enable_cdn_media`
* `enable_turnstile`
* `enable_web_push`
* `enable_ad_campaigns`
* `enable_ad_impression_tracking`
* `enable_notification_digest`
* `enable_provider_health_checks`

Rules:

* sensitive features require backend flag enforcement.
* flag change audited.
* disabled feature shows safe state.
* production flags documented.
* no frontend-only sensitive enforcement.

---

## 61. Notification And Provider Database Tables

Suggested tables:

* `ads`
* `ad_media`
* `ad_targets`
* `ad_events`
* `ad_approval_events`
* `ad_billing_links`
* `ad_fraud_events`
* `notifications`
* `notification_templates`
* `notification_preferences`
* `notification_delivery_logs`
* `notification_batches`
* `provider_settings`
* `provider_health_checks`
* `provider_webhook_events`
* `provider_delivery_attempts`
* `background_jobs`
* `dead_letters`
* `feature_flags`
* `audit_logs`
* `security_events`
* `rate_limit_events`

Actual schema may vary, but behavior must exist.

---

## 62. Suggested Ad Table Fields

## 62.1 `ads`

Fields:

* `id`
* `builder_profile_id`
* `project_id`
* `title`
* `placement_type`
* `status`
* `approval_status`
* `payment_status`
* `target_mode`
* `starts_at`
* `ends_at`
* `budget_amount`
* `pricing_type`
* `rera_checked`
* `policy_accepted_at`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 62.2 `ad_media`

Fields:

* `id`
* `ad_id`
* `media_asset_id`
* `device_type`
* `sort_order`
* `created_at`

Device types:

* `desktop`
* `tablet`
* `mobile`

---

## 62.3 `ad_targets`

Fields:

* `id`
* `ad_id`
* `target_type`
* `location_id`
* `created_at`

Target types:

* `all_gujarat`
* `city`
* `district`
* `locality`

---

## 62.4 `ad_events`

Fields:

* `id`
* `ad_id`
* `event_type`
* `placement_type`
* `city_id`
* `profile_id`
* `session_hash`
* `ip_hash`
* `user_agent_hash`
* `device_type`
* `is_suspicious`
* `created_at`

Event types:

* `impression`
* `click`
* `conversion_inquiry`
* `conversion_contact`
* `conversion_site_visit`

---

## 62.5 `ad_approval_events`

Fields:

* `id`
* `ad_id`
* `action`
* `from_status`
* `to_status`
* `reason`
* `actor_staff_id`
* `created_at`

---

## 62.6 `ad_fraud_events`

Fields:

* `id`
* `ad_id`
* `event_type`
* `severity`
* `session_hash`
* `ip_hash`
* `safe_reason`
* `status`
* `created_at`

---

## 63. Suggested Notification Table Fields

## 63.1 `notifications`

Fields:

* `id`
* `recipient_profile_id`
* `recipient_staff_id`
* `type`
* `title`
* `body`
* `deep_link`
* `entity_type`
* `entity_id`
* `read_at`
* `archived_at`
* `created_at`
* `deleted_at`

---

## 63.2 `notification_templates`

Fields:

* `id`
* `template_key`
* `type`
* `channel`
* `language`
* `title_template`
* `body_template`
* `deep_link_template`
* `status`
* `created_by_staff_id`
* `updated_by_staff_id`
* `created_at`
* `updated_at`

---

## 63.3 `notification_preferences`

Fields:

* `id`
* `profile_id`
* `channel`
* `notification_type`
* `enabled`
* `quiet_hours_start`
* `quiet_hours_end`
* `digest_frequency`
* `created_at`
* `updated_at`

---

## 63.4 `notification_delivery_logs`

Fields:

* `id`
* `notification_id`
* `recipient_profile_id`
* `recipient_staff_id`
* `channel`
* `provider`
* `status`
* `provider_message_id`
* `attempt_count`
* `last_error_safe`
* `sent_at`
* `delivered_at`
* `created_at`
* `updated_at`

---

## 64. Suggested Provider Table Fields

## 64.1 `provider_settings`

Fields:

* `id`
* `provider_name`
* `provider_area`
* `mode`
* `status`
* `is_enabled`
* `feature_flag_key`
* `configured_env_keys`
* `last_tested_at`
* `last_test_result`
* `safe_error_code`
* `updated_by_staff_id`
* `created_at`
* `updated_at`

No raw secrets.

---

## 64.2 `provider_health_checks`

Fields:

* `id`
* `provider_name`
* `status`
* `safe_error_code`
* `checked_by_staff_id`
* `checked_at`
* `created_at`

---

## 64.3 `provider_webhook_events`

Fields:

* `id`
* `provider_name`
* `provider_event_id`
* `event_type`
* `signature_verified`
* `processing_status`
* `payload_hash`
* `safe_error_code`
* `processed_at`
* `created_at`

---

## 65. Index Expectations

Indexes required for:

* ads by builder
* ads by project
* ads by status
* ads by approval status
* ads by payment status
* ads by date range
* ad targets by city/location
* ad events by ad/date/type
* ad fraud events by ad/status
* notifications by recipient/read/date
* delivery logs by notification/status
* notification preferences by profile/type/channel
* provider settings by provider name/area
* provider webhook events by provider event ID unique
* provider health checks by provider/date
* background jobs by status/next run
* dead letters by source/status

No ad/notification/provider admin table should be unpaginated.

---

## 66. RLS And Security Rules

RLS must enforce:

* builder sees own ad campaigns only
* builder can create ads only for own projects
* builder cannot access another builder’s ads
* public reads only eligible public ad data
* ad analytics visible to campaign owner/admin only
* notification recipient reads own notifications
* staff reads own internal notifications
* notification preferences user-owned
* delivery logs staff/admin permission-scoped
* provider settings admin/Super Admin only
* provider secrets not stored/exposed
* webhook events server/admin only
* ad admin actions permission-scoped
* feature flags admin/Super Admin only
* private media/doc rules respected
* hidden contact never in notifications unless authorized recipient and safe

---

## 67. Direct URL Bypass Tests

Test:

* builder accesses another builder ad
* owner accesses builder ads dashboard
* broker accesses builder ads dashboard
* guest accesses ads dashboard
* user accesses another user notifications
* user marks another user notification read
* user accesses provider admin
* staff without provider permission accesses provider admin
* staff without notification permission edits template
* public accesses delivery logs
* invalid webhook hits provider webhook
* ad displays when unpaid
* ad displays when pending approval
* ad displays when expired
* hidden contact appears in notification

All unauthorized must fail.

---

## 68. Provider And Notification Logging Rules

Do not log:

* API secrets
* webhook secrets
* OTP
* payment secrets
* hidden contact
* full phone/email when not necessary
* private document URL
* full provider payload with sensitive data
* service role key
* raw WhatsApp/email/SMS tokens
* push private keys

Safe logs:

* provider name
* event ID
* safe error code
* status
* attempt count
* timestamp
* redacted recipient
* notification ID
* campaign ID
* payment ID
* ad ID

---

## 69. Rate Limit Rules

Rate limits required for:

* ad event tracking
* ad click tracking
* ad campaign creation
* ad media upload
* provider health check test button
* provider webhook endpoint where applicable
* notification send test
* notification batch creation
* SMS send
* email send
* WhatsApp send
* OTP send/verify
* push registration
* contact reveal via provider link
* report abuse from ad/message

Rate limit failure must be safe.

---

## 70. Admin Manual Verification Checklist

Manual verification must check:

### Ads

* builder can create ad only for own approved project
* owner cannot create ad
* broker cannot create ad
* builder cannot select another builder project
* desktop/tablet/mobile banner upload real/setup-required
* target all Gujarat works
* selected city targeting works
* invalid city denied
* payment required state works
* unpaid ad not public
* pending ad not public
* rejected ad not public
* approved paid active ad public
* expired ad not public
* sponsored label visible
* RERA disclosure visible where needed
* impressions/clicks real only
* admin approval reason/audit

### Notifications

* notification created from real event
* unread count real
* mark read works
* mark all read works
* notification center paginated
* wrong user denied
* deep link permission checked
* preferences work
* external provider missing setup-required
* delivery logs real only

### Providers

* provider status page shows setup-required
* raw secrets hidden
* test button permission required
* provider failure safe
* feature flag disables provider feature
* webhook invalid signature denied where applicable
* duplicate webhook handled
* retry/dead-letter tracked

### Security

* RLS own ad only
* public-safe ad data only
* delivery logs protected
* provider settings protected
* no hidden contact in public notification/ad
* no provider secret in client
* no fake provider success

### Responsive

* builder ads dashboard mobile
* admin ad review mobile
* notification dropdown mobile
* notification center mobile
* provider status admin mobile

Widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 71. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* builder ads dashboard
* ad campaign creation
* project selection for ad
* desktop banner upload
* tablet banner upload
* mobile banner upload
* ad target all Gujarat
* ad target selected cities
* ad preview
* ad payment gate
* ad approval workflow
* ad active display
* sponsored label
* RERA disclosure
* ad impressions
* ad clicks
* ad fraud checks
* ad expiry/renewal
* ad pause/resume
* admin ad review
* notification bell
* notification center
* unread count
* mark read/mark all read
* notification templates
* notification preferences
* notification delivery logs
* in-app notifications
* email provider mode
* SMS provider mode
* WhatsApp provider mode
* OTP provider mode
* Razorpay provider mode
* maps provider mode
* R2/CDN provider mode
* Turnstile provider mode
* analytics provider mode
* error tracking provider mode
* cron/job provider mode
* push provider mode
* provider admin/status
* provider health checks
* provider webhooks
* provider retries/dead letters
* provider feature flags
* provider RLS/security
* manual verification

Each item must have real status.

---

## 72. Common Bugs To Track

Create bug if:

* unpaid ad displays
* pending ad displays
* rejected ad displays
* expired ad displays
* ad displays without sponsored label
* builder selects another builder project
* owner/broker can create builder ad
* fake impressions/clicks shown
* ad click event spam not limited
* RERA fake disclosure/badge shown
* ad payment fake success
* notification unread count fake
* notification created for wrong recipient
* wrong user reads notification
* delivery marked sent without provider
* WhatsApp free link marked delivered
* provider secret exposed
* provider status fake active
* production uses mock provider
* invalid webhook accepted
* duplicate webhook processed twice
* private contact inserted into public notification
* provider test button accessible without permission
* provider raw error shown
* notification deep link bypasses permissions
* provider config stored with raw secret in DB
* mobile notification dropdown overflows
* ad banner distorted
* admin ad table unpaginated

---

## 73. Current Ads/Notifications/Provider Status

As of this documentation generation stage:

| Area                          | Status           |
| ----------------------------- | ---------------- |
| Builder ads dashboard         | `NOT_STARTED`    |
| Ad campaign creation          | `NOT_STARTED`    |
| Ad media upload               | `SETUP_REQUIRED` |
| Ad city targeting             | `NOT_STARTED`    |
| Ad payment gate               | `SETUP_REQUIRED` |
| Ad approval workflow          | `NOT_STARTED`    |
| Ad public display             | `NOT_STARTED`    |
| Sponsored label               | `NOT_STARTED`    |
| RERA ad disclosure            | `NOT_STARTED`    |
| Ad impressions/clicks         | `NOT_STARTED`    |
| Ad fraud detection            | `NOT_STARTED`    |
| Admin ad review               | `NOT_STARTED`    |
| Notification bell             | `NOT_STARTED`    |
| Notification center           | `NOT_STARTED`    |
| In-app notifications          | `NOT_STARTED`    |
| Notification templates        | `NOT_STARTED`    |
| Notification preferences      | `NOT_STARTED`    |
| Delivery logs                 | `NOT_STARTED`    |
| Email provider                | `SETUP_REQUIRED` |
| SMS provider                  | `SETUP_REQUIRED` |
| WhatsApp free link            | `NOT_STARTED`    |
| WhatsApp Business API         | `SETUP_REQUIRED` |
| OTP provider                  | `SETUP_REQUIRED` |
| Razorpay provider             | `SETUP_REQUIRED` |
| Maps provider                 | `SETUP_REQUIRED` |
| Cloudflare R2                 | `SETUP_REQUIRED` |
| Cloudflare CDN                | `SETUP_REQUIRED` |
| Turnstile                     | `SETUP_REQUIRED` |
| Analytics provider            | `SETUP_REQUIRED` |
| Error tracking provider       | `SETUP_REQUIRED` |
| Cron/background jobs          | `SETUP_REQUIRED` |
| Push provider                 | `SETUP_REQUIRED` |
| Provider admin/status         | `NOT_STARTED`    |
| Provider health checks        | `NOT_STARTED`    |
| Provider webhooks             | `NOT_STARTED`    |
| Provider retries/dead letters | `NOT_STARTED`    |
| Manual verification           | `NOT_STARTED`    |

---

## 74. Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Created |
|        6 | `MANUAL_VERIFICATION.md`                                  | Created |
|        7 | `API_PROVIDER_STATUS.md`                                  | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Created |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Created |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Created |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Created |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Created |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Created |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Created |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Created |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Created |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Created |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Created |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Created |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Created |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 75. Related Documents

This file must stay aligned with:

* `CLAUDE.md`
* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`
* `docs/01_PROJECT_MASTER_AND_SCOPE.md`
* `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
* `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
* `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
* `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
* `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 76. Final Ads/Notifications/Provider Rule

Ads must be real.

Promotions must be paid/approved/active where required.

Sponsored label must be visible.

RERA/compliance must be real.

Ad impressions and clicks must be real.

Notifications must be DB-backed.

Unread count must be real.

External delivery must be provider-confirmed or setup-required.

WhatsApp free link is not delivery confirmation.

Provider secrets must never be exposed.

Provider status must be honest.

Missing provider means setup-required or fallback, never fake success.

Production cannot use mock/dev provider behavior.

No fake ad.

No fake notification.

No fake provider status.

No fake delivery.

No fake payment.

No fake PASS.
