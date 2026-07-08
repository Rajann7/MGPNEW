# docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md

# My Gujarat Property — Advanced Features, PWA, Localization, Analytics And Future Roadmap System

This document defines the complete **Advanced Features, PWA, Offline UX, Localization, Analytics, Alerts, Future Roadmap and Enhancement System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batch 17). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

* **PWA install prompt**: bottom banner with display logic — "Not now" remembered (localStorage) 30 days, shown only after 2+ sessions, never on first visit. **App-update toast** is non-blocking, bottom-center, deferred until idle, never mid-form. **Offline banner** renders in normal flow above the header and ships a "Saved properties (available offline)" content view.
* **Localization**: language selector English (default) / ગુજરાતી / हिन्दी (Hindi = "Coming soon" disabled for now); untranslated strings fall back to English with a "translation pending" dot — never machine-garbled. Transliteration/alias search is server-side (see doc 11).
* **Theme**: Light / Dark / System; dark mode is token-swap only (concrete hexes in doc 13).
* **Calculators (Gujarat-accurate)**:
  * EMI — sliders (amount/rate/tenure), result card, principal-vs-interest amortization mini bar chart, "estimate, not financial advice" disclaimer, home-loan assistance as a Setup-Required provider state.
  * Stamp duty — State/City + value + buyer toggle (Male/Female/Joint); encodes the real Gujarat rule (**female buyers pay no registration fee**), cites jantri value / Sub-Registrar; legal-review disclaimer.
  * Unit converter — Gujarat land units (sq ft / sq yd / vaar / sq m / **guntha** / **bigha (Gujarat)** / acre) with a reference table and "bigha varies by region" caveat.
* **Comparison**: sticky compare tray (max 4, persists across pagination, above bottom nav, never covers CTAs) → comparison table mixing resale (Contact Owner, RERA "—") vs project (Enquire, RERA Verified).
* **Accessibility quick-settings**: text size / high contrast / reduce motion, persists per device, reachable from footer + Settings.
* Batch 17 closes with a **developer-QA consistency checklist** covering all 17 batches — use it as the implementation handoff/QA sheet.

Claude must read this file before implementing PWA, offline mode, slow network UX, push notifications, install prompts, saved search alerts, price alerts, analytics dashboards, event tracking, Gujarati/Hindi/English localization, transliteration, real estate calculators, advanced project features, construction progress, 360 tours, floor plans, NRI support, future feature flags or advanced analytics-related SQL migrations.

No fake analytics is allowed.

No fake alert is allowed.

No fake offline capability is allowed.

No fake AI feature is allowed.

No fake advanced feature can be marked complete.

Provider-backed advanced features must be real or setup-required.

---

## 1. Purpose

This file defines:

* advanced feature strategy
* PWA scope
* offline UX
* slow network UX
* install prompt
* app shell
* push notifications
* notification permission
* saved searches
* saved search alerts
* price alerts
* availability alerts
* project progress alerts
* localization architecture
* Gujarati/Hindi/English support
* transliteration
* Indian formatting
* analytics event tracking
* dashboard analytics
* property analytics
* project analytics
* lead analytics
* ad analytics
* search analytics
* SEO analytics
* privacy-safe analytics
* advanced real estate features
* construction progress
* floor plans
* 360 tours
* locality guides
* society/building directories
* inventory availability
* price history
* price comparison
* EMI/stamp duty disclaimers
* loan availability disclaimer
* unit conversion
* NRI/ISD support
* advanced matching rules
* future AI no-rule
* feature flags
* provider dependencies
* implementation gates
* RLS/security
* performance
* manual verification rules

This file is the final detailed project-doc reference before the prompt file pack begins.

---

## 2. Core Advanced Feature Principles

Advanced features must follow these principles:

1. Core marketplace features come first.
2. Advanced features must not break core flows.
3. Advanced features must be feature-flagged if risky.
4. Advanced features must be real or setup-required.
5. No fake analytics.
6. No fake alerts.
7. No fake notifications.
8. No fake PWA support.
9. No fake offline support.
10. No fake price history.
11. No fake matching score.
12. No fake construction progress.
13. No fake inventory.
14. No fake RERA/verified status.
15. No hidden contact leak.
16. No private data in analytics.
17. Provider-backed features must have honest provider status.
18. Manual verification required before PASS.
19. AI/API recommendation features are not in current scope unless explicitly approved later.
20. Future features must be documented as future/deferred, not silently implemented fake.

---

## 3. Advanced Feature Status Values

Use these statuses:

| Status                     | Meaning                           |
| -------------------------- | --------------------------------- |
| `NOT_STARTED`              | not implemented                   |
| `DOCUMENTED_BASELINE`      | documented only                   |
| `IN_PROGRESS`              | implementation started            |
| `PARTIAL`                  | partially implemented             |
| `PASS`                     | fully implemented and verified    |
| `FAIL`                     | implemented/tested but failing    |
| `BLOCKED`                  | blocked by dependency             |
| `SETUP_REQUIRED`           | provider/config missing           |
| `DEFERRED`                 | intentionally planned for later   |
| `FUTURE_APPROVED_REQUIRED` | requires explicit future approval |
| `DISABLED_BY_FLAG`         | implemented but disabled          |
| `ROLLED_BACK`              | rolled back after issue           |

Do not mark advanced feature `PASS` without real verification.

---

## 4. PWA Overview

PWA means Progressive Web App behavior.

Possible PWA features:

* installable app
* app manifest
* service worker
* offline fallback page
* app icons
* splash screen metadata
* theme color
* mobile home screen launch
* cached public pages where safe
* push notifications
* background sync where supported
* network status UI
* update available prompt

PWA is useful but not a substitute for native app.

PWA must not cache private data publicly.

---

## 5. PWA Scope

Initial PWA scope may include:

* manifest
* icons
* theme color
* install prompt
* offline fallback
* public static asset cache
* selected public page cache
* push notifications setup-required
* app update prompt

Future PWA scope may include:

* offline saved property browsing
* offline draft editing
* background sync for draft submit
* push lead alerts
* push site visit reminders
* push billing reminders
* push admin alerts

All PWA features must be privacy-safe.

---

## 6. PWA Manifest Rules

Manifest should include:

* app name: My Gujarat Property
* short name
* description
* start URL
* display mode
* theme color
* background color
* icons
* screenshots where needed
* categories
* language
* orientation preference where appropriate

Rules:

* no fake app claims
* icons must exist
* start URL safe
* private dashboard should require auth after launch
* no hidden contact in manifest
* manifest assets must load
* theme color aligns with design system

---

## 7. Service Worker Rules

Service worker must be carefully implemented.

Allowed cache:

* static assets
* public images where safe
* public CMS/legal pages
* public homepage shell
* public search shell if safe
* offline fallback page

Must not cache publicly:

* dashboard data
* leads
* messages
* notifications
* invoices
* payment pages
* private documents
* signed URLs
* hidden contact
* admin pages
* staff pages
* provider settings
* audit logs
* support tickets
* private media
* checkout/payment status

Rules:

* cache versioning required
* update strategy required
* stale private data must not remain
* logout should clear private client cache where applicable
* service worker must not break deployment
* rollback plan required for service worker issues

---

## 8. Offline UX Rules

Offline mode must be honest.

Offline UI should show:

* network offline banner
* offline fallback page
* retry button
* cached page indicator where applicable
* disabled state for server actions
* draft saved locally only if implemented
* sync pending status only if real

Offline cannot do:

* real contact reveal
* real inquiry submit
* real payment
* real OTP login
* real media upload
* real admin approval
* real message send unless queued and later synced
* real subscription activation
* real notification delivery

If offline action is queued, it must show pending state and sync result later.

No fake offline success.

---

## 9. Slow Network UX Rules

Slow network UX should include:

* skeletons
* progress indicators
* retry
* timeout messages
* partial page fallback
* upload progress
* resumable upload if implemented
* provider timeout-safe errors
* low bandwidth image variants
* no huge blocking scripts
* no infinite spinner

Slow network must not:

* duplicate submits
* lose forms
* show fake success
* expose raw errors
* break mobile layout

---

## 10. Install Prompt Rules

Install prompt should:

* be subtle
* not block core action
* appear only if installable criteria met
* allow dismiss
* respect dismiss cooldown
* work on supported browsers
* show clear value
* not appear repeatedly annoyingly
* not claim native app-only features if absent

If PWA install not implemented, do not show fake install CTA.

---

## 11. PWA Update Prompt

When new app version available:

* show non-blocking update prompt
* allow refresh/update
* avoid interrupting form submission
* handle unsaved data
* show clear message
* do not force refresh during payment/upload/form unless safe

Service worker updates must be tested carefully.

---

## 12. Push Notification Overview

Push notifications may support:

* lead alerts
* new inquiry
* new message
* proposal status
* site visit reminders
* billing reminders
* ad approval/expiry
* admin tasks
* support updates
* security alerts

Push requires:

* browser permission
* push provider/VAPID setup
* notification preferences
* service worker
* subscription storage
* delivery logs
* safe payload

Push provider is setup-required until configured.

No fake push sent/delivered.

---

## 13. Push Notification Rules

Push rules:

1. user must grant permission.
2. subscription stored securely.
3. user can disable push.
4. notification payload must be privacy-safe.
5. deep link must be permission-checked.
6. delivery status real only.
7. retries controlled.
8. no sensitive full data in push body.
9. no hidden contact in push.
10. unsubscribe/expired subscription handled.
11. push provider status tracked.
12. in-app notification remains base source.

Examples of safe push body:

* “You have a new inquiry.”
* “Your listing needs changes.”
* “Site visit reminder.”

Avoid:

* full phone numbers
* private invoice details
* private address
* message body if sensitive
* private document names

---

## 14. Notification Permission UX

Permission UX must:

* explain value before browser prompt
* not prompt too early
* allow user to decline
* respect browser denial
* show how to enable later
* not block core app
* not spam prompts
* show setup-required if push provider missing

No dark-pattern notification prompt.

---

## 15. Offline Drafts

Offline/slow draft support may apply to:

* property form
* project form
* requirement form
* support ticket
* CMS/admin draft where internal
* profile edit

Rules:

* clearly mark local draft vs server draft
* sync only after login/server available
* handle conflicts
* never publish offline automatically
* media upload still requires online/storage
* sensitive draft data stored carefully
* user can clear local draft
* no fake submitted state

If local draft is not implemented, do not claim offline draft support.

---

## 16. Localization Overview

Localization means supporting multiple languages and scripts.

Target languages:

* English
* Hindi
* Gujarati

Important:

* Gujarat marketplace should support Gujarati-friendly search and display.
* Legal content translations require review.
* UI text should be architecture-ready for localization.
* Location aliases/transliteration should support search.

Localization should be phased.

---

## 17. Localization Scope

Localization may include:

* UI labels
* buttons
* form labels
* validation errors
* status badges
* notifications
* email/SMS/WhatsApp templates
* CMS pages
* legal pages
* blog posts
* help articles
* location names
* SEO metadata
* schema text
* search aliases
* date/currency/number units

Initial phase may implement English first with localization-ready architecture.

Do not fake full multilingual support if translations are incomplete.

---

## 18. Language Modes

Possible language modes:

| Mode                    | Meaning                                                         |
| ----------------------- | --------------------------------------------------------------- |
| `english_only`          | current default                                                 |
| `localization_ready`    | code supports translation keys but content not fully translated |
| `partial_multilingual`  | some UI/pages translated                                        |
| `full_multilingual`     | all required UI/content translated and verified                 |
| `legal_review_required` | legal translation needs review                                  |

Status must be honest.

---

## 19. Language Selector Rules

Language selector may be added to:

* header
* footer
* profile settings
* onboarding
* CMS/legal pages
* support/help

Rules:

* current language visible
* switching language does not break route
* fallback to English if translation missing
* legal translations must not be displayed as final if not reviewed
* SEO hreflang only if language pages are real
* no broken Gujarati fonts
* no layout break due to longer text

---

## 20. Translation Key Rules

UI text should use structured translation keys.

Examples:

```txt id="translation-key-examples"
auth.login.title
property.form.title.label
project.form.rera.status
dashboard.owner.overview
billing.payment.pending
notification.lead.new
error.provider.setup_required
```

Rules:

* no massive hardcoded user-facing text if localization planned
* validation messages translatable
* status values displayed through labels
* fallback language defined
* missing translation visibly tracked in development
* no fake translated text

---

## 21. Gujarati Support Rules

Gujarati support requires:

* Gujarati font
* correct glyph rendering
* layout tested with Gujarati text
* location names in Gujarati
* search aliases
* CMS/legal translations reviewed
* SEO metadata if Gujarati pages exist
* notification template translations if enabled

Recommended font:

```txt id="gujarati-font"
Noto Sans Gujarati
```

Rules:

* no broken glyphs
* no layout overflow
* no unreadable font size
* no auto-generated legal Gujarati without review

---

## 22. Hindi Support Rules

Hindi support requires:

* Devanagari-capable font stack
* UI translation
* location aliases where relevant
* help/legal review
* notification templates
* validation messages
* SEO only if real Hindi pages exist

No fake full Hindi support.

---

## 23. Transliteration Rules

Search should support common transliteration patterns.

Examples:

* Rajkot
* રાજકોટ
* राजकोट
* Kalawad Road
* કાલાવડ રોડ
* Ahmedabad
* અમદાવાદ
* अहमदाबाद

Rules:

* location aliases stored in DB
* search matches aliases
* avoid duplicate location records for same place
* admin can manage aliases
* slugs should be stable and SEO-safe
* transliteration must not create fake locations
* no private address indexing

---

## 24. Indian Formatting Rules

Use India-friendly formatting:

* INR currency
* Indian number separators
* GSTIN format
* Indian mobile numbers
* IST timezone
* Indian financial year
* dd MMM yyyy style dates
* local area units
* city/taluka/district labels
* pin code format

Examples:

* ₹25,00,000
* ₹1.25 Cr where display helper is approved
* 29 Jun 2026
* FY 26-27
* sq ft / sq yd / acre / guntha

Rules:

* do not mix wrong currency.
* do not show UTC date to users.
* do not miscalculate financial year.

---

## 25. Unit Conversion Rules

Unit conversion may support:

* sq ft
* sq yd
* sq meter
* acre
* hectare
* guntha
* bigha where local support verified
* meter/feet dimensions

Rules:

* conversion formulas must be correct.
* original unit stored.
* converted display clearly labeled.
* no legal guarantee for land measurement.
* admin/user can choose preferred unit where implemented.
* no fake/rounded misleading conversion.
* agriculture/land local units may need Gujarat-specific validation.

---

## 26. Analytics Overview

Analytics must be real and privacy-safe.

Analytics types:

* public site analytics
* search analytics
* listing analytics
* project analytics
* lead analytics
* CRM analytics
* ad analytics
* billing analytics
* provider analytics
* admin operations analytics
* SEO analytics
* performance analytics

No fake analytics.

If analytics event tracking is not implemented, show `SETUP_REQUIRED` or `NOT_STARTED`.

---

## 27. Analytics Principles

Analytics rules:

1. Track real events only.
2. No fake counts.
3. No fake views.
4. No fake leads.
5. No fake conversions.
6. Privacy-safe tracking.
7. Respect cookie preferences.
8. Avoid hidden contact/private data.
9. Aggregate heavy analytics.
10. Use date filters.
11. Use role-scoped dashboards.
12. Use permission-scoped admin analytics.
13. Provider-backed analytics requires setup.
14. Dashboard chart must show source/definition where useful.
15. Analytics must be performant.

---

## 28. Analytics Event Types

Possible event types:

### Public Events

* page view
* search performed
* filter applied
* property card viewed
* project card viewed
* property detail viewed
* project detail viewed
* profile viewed
* share clicked
* save clicked
* inquiry clicked
* contact reveal clicked
* call clicked after reveal
* WhatsApp clicked after reveal

### Lead Events

* inquiry submitted
* lead created
* contact revealed
* proposal sent
* message sent
* site visit requested
* site visit completed
* lead converted/lost

### Ad Events

* ad impression
* ad click
* ad inquiry conversion
* ad contact conversion
* ad city/device event
* suspicious ad event

### Billing Events

* plan viewed
* checkout started
* payment pending
* payment verified
* payment failed
* invoice generated
* subscription expired

### Admin Events

* moderation approved
* moderation rejected
* verification approved
* support ticket resolved
* report resolved
* payment reconciled
* export created

---

## 29. Analytics Privacy Rules

Analytics must not store:

* hidden contact
* private email
* private exact address
* private document URL
* invoice PDF URL
* message body
* support private content
* raw payment secrets
* OTP
* tokens
* service role
* provider secrets

Use:

* internal IDs
* hashed session/IP where needed
* event type
* entity ID
* timestamp
* safe metadata
* aggregate metrics

Respect cookie/analytics consent.

---

## 30. Public Page View Analytics

Page views may track:

* route
* entity type
* entity ID
* city
* device type
* session hash
* logged-in profile ID if allowed
* referrer safe
* timestamp

Rules:

* no fake views.
* admin preview not counted as public view unless marked.
* bot filtering where possible.
* duplicate views deduplicated by window if product defines.
* views not shown publicly until reliable.
* hidden contact not tracked.

---

## 31. Property Analytics

Owner/Broker property analytics may show:

* property views
* inquiry count
* contact reveal count
* saved count
* share count
* search impressions
* lead sources
* city/source breakdown
* timeline chart
* conversion funnel where implemented

Rules:

* real only
* no fake views
* no fake inquiries
* no hidden contact
* owner/broker sees own property analytics only
* analytics setup-required if tracking missing
* bot/admin views excluded or marked
* date range filters

---

## 32. Project Analytics

Builder project analytics may show:

* project views
* inquiry count
* contact reveal count
* saved count
* brochure downloads
* floor plan views
* video plays
* unit inventory interactions
* matching requirements
* ad impressions/clicks
* lead sources
* city/device breakdown
* RERA/profile interactions
* site visit requests

Rules:

* real only
* builder sees own project analytics only
* no fake project popularity
* no fake inventory interest
* ad metrics separated from organic
* date range filters
* setup-required if event tracking missing

---

## 33. Lead / CRM Analytics

Lead analytics may show:

* new leads
* contacted leads
* follow-up due
* site visits
* converted/lost
* source breakdown
* response time
* proposal statuses
* message unread count
* agent performance where applicable

Rules:

* real only
* role/ownership-scoped
* agent performance permission-scoped
* no fake conversion
* no fake lead stage
* no private data in aggregate shown to wrong user

---

## 34. Ad Analytics

Ad analytics may show:

* impressions
* clicks
* CTR
* inquiries from ad
* contact reveals from ad
* city breakdown
* device breakdown
* spend/campaign period
* suspicious events
* active/expired status

Rules:

* real events only
* no fake impressions/clicks
* fraud-filtered counts documented
* builder sees own ads only
* admin sees permission-scoped
* ad active only if approved/paid/active/not expired
* sponsored label remains public

---

## 35. Billing Analytics

Admin billing analytics may show:

* plan purchases
* active subscriptions
* trials
* expiring plans
* payment success/failure
* refunds
* invoices
* revenue
* GST breakdown
* role-wise subscription
* coupon usage

Rules:

* real payment data only
* permission-scoped
* no fake revenue
* failed payment not counted as revenue
* test payments excluded from production revenue
* invoice after verified payment only
* sensitive billing fields protected

---

## 36. SEO Analytics

SEO analytics may include:

* indexed pages
* sitemap status
* organic landing pages
* search query trends where provider data available
* city page views
* blog views
* no-result searches
* crawl errors
* redirect hits
* broken links

Provider may include Search Console or analytics tool.

Rules:

* setup-required until configured
* no fake SEO traffic
* no fake ranking claims
* no private data
* no fake search console data

---

## 37. Admin Operations Analytics

Admin analytics may include:

* pending approvals
* approval time
* rejected/approved counts
* verification backlog
* support SLA
* report/fraud backlog
* payment issues
* provider failures
* staff workload
* audit events
* security events

Rules:

* real only
* permission-scoped
* no fake SLA
* no fake workload
* heavy reports aggregated

---

## 38. Analytics Dashboard UI Rules

Analytics UI must show:

* date range filter
* metric definition if ambiguous
* loading state
* empty state
* setup-required state
* error state
* source of data where useful
* chart/table responsive
* mobile cards
* no fake placeholder charts
* export only if permitted

If event tracking not implemented:

* show “Analytics setup required” or “No data yet”
* do not show hardcoded charts

---

## 39. Analytics Storage Strategy

Analytics may use:

* event table
* summary table
* materialized views
* daily aggregates
* provider analytics
* privacy-safe logs

Suggested tables:

* `analytics_events`
* `property_analytics_daily`
* `project_analytics_daily`
* `ad_analytics_daily`
* `search_analytics_daily`
* `lead_analytics_daily`
* `billing_analytics_daily`
* `admin_operations_daily`
* `analytics_exports`

Raw events should be retained only as needed.

Heavy dashboards should use aggregates.

---

## 40. Analytics Event Table Fields

Suggested `analytics_events` fields:

* `id`
* `event_type`
* `entity_type`
* `entity_id`
* `profile_id`
* `session_hash`
* `ip_hash`
* `user_agent_hash`
* `city_id`
* `device_type`
* `source`
* `metadata_safe`
* `created_at`

Rules:

* no hidden contact
* no private body/content
* no secrets
* metadata safe only
* indexed by event/entity/date

---

## 41. Saved Search Alerts

Saved search alerts allow users to get updates for matching listings/projects.

Fields:

* user/profile ID
* query params
* alert frequency
* notification channels
* status
* last run
* last notified
* match count
* created_at
* updated_at

Rules:

* user owns saved search
* alerts use real public-safe results
* no fake alert
* notification provider setup-required if external
* in-app alert DB-backed
* user can pause/delete alert
* frequency respected
* no hidden contact in alert

---

## 42. Price Alerts

Price alerts may notify when:

* saved property price changes
* saved project price range changes
* city/type price trend changes where analytics real
* budget match appears

Rules:

* price change must be real.
* user must opt in.
* no fake price drop.
* no fake trend.
* notification privacy-safe.
* public-safe listing only.
* provider setup-required for external alerts.
* price history stored/audited if displayed.

---

## 43. Availability Alerts

Availability alerts may notify when:

* property becomes available/active
* project unit becomes available
* project phase opens
* matching listing appears
* saved search has new result
* ad/project update matches interest

Rules:

* availability real only.
* no fake unit availability.
* user opt-in.
* notification deep link permission-checked.
* public-safe data only.
* builder inventory must be real.

---

## 44. Construction Progress Alerts

Construction progress alerts for projects may notify:

* new progress update
* new construction photo
* possession date update
* phase update
* RERA/status update
* project approval/public update

Rules:

* builder update must be real.
* admin approval may be required before public.
* no fake progress.
* progress media safe.
* RERA disclaimer visible.
* user can follow project where implemented.

---

## 45. Advanced Real Estate Features Overview

Advanced real estate features may include:

* floor plans
* unit inventory
* construction progress
* 360 virtual tours
* Matterport embeds
* locality guides
* society/building directory
* price history
* price alerts
* saved searches
* availability alerts
* EMI calculator
* stamp duty calculator/disclaimer
* unit converter
* nearby places
* project comparison
* property comparison
* broker/builder microsites
* co-owner/authority proof
* claim profile/listing
* duplicate merge
* project phase tracking
* RERA recheck
* NRI support
* lead scoring/matching rule-based
* advanced filters
* PWA push
* offline drafts

Each must be implemented only when scoped and verified.

---

## 46. Floor Plan Advanced Rules

Floor plans may support:

* per unit type
* per BHK
* per floor
* per wing/tower
* master plan
* site layout
* downloadable PDF
* zoom viewer
* gallery section
* unit inventory link

Rules:

* builder owns project.
* floor plan public only after approval.
* file validation required.
* private internal plan notes hidden.
* no fake floor plan.
* plan updates may require reapproval.

---

## 47. Unit Inventory Advanced Rules

Unit inventory may support:

* wing/tower
* floor
* unit number
* unit type
* area
* price visibility
* availability
* booking/sold/hold status
* possession phase
* floor plan link

Rules:

* builder-owned project only.
* public availability real only.
* private unit notes hidden.
* inventory updates audited.
* fake sold/booked/available status is critical bug.
* no fake scarcity.

---

## 48. Construction Progress Rules

Project progress may include:

* stage
* percentage
* date
* photos
* notes
* milestone
* phase
* expected possession
* delay note/disclaimer
* admin review

Rules:

* no fake progress.
* progress update by builder/admin only.
* public update may require approval.
* progress media validated.
* history retained.
* date/time real.
* user alerts real only.

---

## 49. 360 / Virtual Tour Advanced Rules

Virtual tours may support:

* Matterport
* iframe provider
* 360 photo
* external tour URL
* embedded viewer

Rules:

* provider/iframe allowlist required.
* no unsafe arbitrary iframe.
* lazy-load.
* mobile responsive.
* public only after approval.
* no fake virtual tour.
* setup-required if provider not configured.
* hidden contact not embedded.

---

## 50. Locality Guide Rules

Locality guide may include:

* city/locality overview
* connectivity
* amenities
* nearby schools/hospitals/transport where real/provider-backed
* average price where real analytics
* listing/project links
* FAQs
* safety/disclaimer
* SEO metadata

Rules:

* no fake locality facts.
* no fake price trends.
* no copied/copyrighted content.
* provider-backed nearby data setup-required.
* thin/empty locality guide noindex.
* admin/CMS controlled content.
* public-safe only.

---

## 51. Society / Building Directory Rules

Directory may include:

* society/building name
* locality
* type
* public listings/projects
* SEO page if useful
* claim/report option
* public-safe details

Rules:

* no fake society/building.
* no exact private unit exposure.
* public pages only if useful.
* no hidden contact.
* claim/report protected.
* admin approval for missing/duplicate directory records.

---

## 52. Price History Rules

Price history may track:

* listing price changes
* project price range changes
* city/locality aggregate trends
* property type trends
* ad/featured price changes not mixed with property price

Rules:

* price history real only.
* show source/definition.
* avoid financial advice.
* do not predict guaranteed appreciation.
* allow user to hide old price if policy permits only if legal/product approved.
* changes audited.
* fake trend is critical bug.

---

## 53. Price Comparison Rules

Comparison may show:

* properties side by side
* projects side by side
* unit types
* price
* area
* location
* amenities
* possession
* RERA status
* contact/inquiry CTA

Rules:

* public-safe data only.
* real data only.
* no fake ranking.
* no hidden contact.
* no legal/financial recommendation.
* unavailable/expired items handled.

---

## 54. EMI Calculator Rules

EMI calculator may be informational.

Fields:

* property price
* loan amount
* interest rate
* tenure
* down payment
* EMI result

Rules:

* calculator is estimate only.
* not financial advice.
* rates not guaranteed.
* no bank approval guarantee.
* user can edit inputs.
* default rates must be labeled as example if not provider-backed.
* no fake loan availability.
* legal disclaimer required.

---

## 55. Stamp Duty / Registration Calculator Rules

Stamp duty calculator may be informational.

Rules:

* rates/laws can change.
* must be verified/current before production.
* if not current, show disclaimer/setup-required.
* not legal advice.
* should use admin-configured rates if implemented.
* no fake exact legal amount.
* user should consult professional/official source.
* because laws can change, production rate data requires review.

If implemented later, confirm current Gujarat rates before coding.

---

## 56. Loan Availability Rules

Loan availability should be careful.

Rules:

* do not claim loan approved.
* do not claim bank tie-up unless real.
* “Loan availability” should be informational/setup-required unless real provider exists.
* EMI estimate not equal loan approval.
* contact lead may be created only with user consent if loan partner integrated.
* no fake loan badge.

---

## 57. Nearby Places Rules

Nearby places may use map provider.

Possible nearby categories:

* school
* hospital
* bank
* bus stop
* railway station
* airport
* market
* temple
* mall
* office hub
* industrial estate
* road/highway

Rules:

* provider setup-required if using API.
* no fake nearby places.
* manual curated nearby data admin-controlled if used.
* public-safe.
* exact private address privacy respected.
* map lazy-load.

---

## 58. NRI Support Rules

NRI support may include:

* ISD country code
* email OTP fallback where approved
* WhatsApp communication
* timezone display
* NRI support category
* document upload
* remote site visit/video call future
* legal disclaimer

Rules:

* OTP/SMS provider must support ISD if enabled.
* email fallback must be secure.
* NRI users still follow Indian property legal disclaimers.
* no fake NRI verification.
* no guaranteed remote deal.
* data privacy and consent apply.

---

## 59. Claim Profile / Claim Listing Rules

Claim system may allow:

* broker profile claim
* builder profile claim
* society/building claim
* property authority claim
* project authority claim

Flow:

1. user submits claim
2. uploads proof
3. admin reviews
4. claim approved/rejected
5. ownership/management updated if approved
6. audit log
7. notification

Rules:

* proof private.
* no automatic claim approval.
* conflict handling.
* existing owner notified where appropriate.
* legal disclaimer.
* false claims can lead to suspension.

---

## 60. Duplicate Merge Rules

Duplicate merge may apply to:

* properties
* projects
* profiles
* locations
* societies/buildings
* requirements

Rules:

* admin permission required.
* show duplicates side by side.
* choose canonical record.
* preserve leads/history.
* redirect old slug if public page.
* audit merge.
* rollback notes.
* no accidental data loss.
* no merge without review for sensitive records.

---

## 61. Requirement Matching Advanced Rules

Requirement matching may be rule-based.

Match factors:

* city/locality
* purpose
* property/project type
* budget
* area
* BHK/unit type
* possession timeline
* amenities
* verified/RERA status where relevant
* availability
* user preference

Rules:

* no AI API in current scope.
* no fake match score.
* show match reason if score shown.
* private data protected.
* wrong role denied.
* matching setup `NOT_STARTED` until implemented.
* matching must be explainable.

---

## 62. AI / Recommendation No-Rule

Current scope explicitly says:

* no AI API
* no AI search
* no AI recommendations
* no AI chatbot
* no AI-generated listings
* no AI fake content
* no AI valuation
* no AI price prediction
* no AI legal/loan advice

If future AI is approved, it requires:

* explicit user approval
* updated documentation
* provider status
* privacy review
* legal disclaimer
* security review
* cost/rate limit review
* manual verification
* feature flag

Until then, AI-related features must be `FUTURE_APPROVED_REQUIRED` or `DEFERRED`.

---

## 63. Advanced Search Features

Advanced search may include:

* saved filters
* map view
* nearby search
* commute filters where provider-backed
* draw area search future
* compare selected
* search alerts
* price alerts
* availability alerts
* recently viewed
* sort by verified/RERA
* city/locality transliteration
* filters by project phase/inventory

Rules:

* no fake counts.
* no hidden contact.
* provider-backed features setup-required.
* query params preserved.
* mobile bottom sheet.
* public-safe data only.

---

## 64. Recently Viewed Advanced Rules

Recently viewed may include:

* properties
* projects
* profiles
* blog/help pages where useful

Rules:

* guest local-only if not logged in.
* logged-in DB sync if implemented.
* no private data.
* deleted/unpublished items hidden/unavailable.
* user can clear history.
* do not upload guest local history without clear UX/consent if sensitive.

---

## 65. Saved Items Advanced Rules

Saved items may include:

* properties
* projects
* broker profiles
* builder profiles
* requirements where scoped
* searches

Rules:

* user-owned.
* public-safe cards.
* no private data.
* unavailable item state.
* saved count real only.
* no fake saved state.
* login to sync.

---

## 66. PWA Push And Saved Search Alerts Combined

Saved search alerts may use:

* in-app notification
* email
* SMS
* WhatsApp
* push

Rules:

* in-app base notification real.
* external providers setup-required.
* push permission required.
* no fake alert delivered.
* no sensitive content in push.
* user can manage preferences.

---

## 67. Advanced Dashboard Widgets

Widgets may include:

* recent leads
* inquiry trend
* listing performance
* project performance
* ad performance
* plan usage
* upcoming site visits
* follow-ups
* saved search alerts
* provider/setup warnings
* verification status
* support status

Rules:

* real data only.
* setup-required if missing.
* no fake chart.
* no fake notification badge.
* mobile cards.
* lazy-load heavy widgets.

---

## 68. Admin Advanced Operations

Admin advanced modules may include:

* analytics reports
* provider health
* job queue
* dead letters
* fraud dashboard
* SEO performance
* location demand
* search no-result reports
* ad fraud reports
* support SLA
* security dashboard
* backup/restore status
* PWA push subscriptions
* localization content status

Rules:

* permission-scoped.
* real data only.
* no raw secrets.
* no private data unless permitted.
* heavy reports aggregated.
* exports permission-gated.

---

## 69. Localization Admin Rules

Localization admin may support:

* translation keys
* missing translations
* language-specific CMS
* language-specific blog
* language-specific legal pages
* location aliases
* notification templates
* email/SMS/WhatsApp templates
* SEO metadata per language
* publish/review status

Rules:

* legal translations require legal review.
* missing translation fallback.
* no fake full translation status.
* publish permission required.
* audit changes.
* no broken routes.

---

## 70. Analytics Admin Rules

Analytics admin may support:

* event overview
* dashboard metrics
* property/project trends
* user growth
* lead funnel
* ad performance
* search trends
* no-result searches
* provider errors
* export
* date filters
* role filters

Rules:

* permission required.
* sensitive data masked.
* no fake charts.
* no unbounded queries.
* heavy reports background/aggregated.
* exports audited.

---

## 71. PWA Admin Rules

PWA/admin status may show:

* manifest status
* service worker status
* icon status
* installability status
* push provider status
* notification subscription count
* offline fallback status
* cache version
* service worker version
* recent push failures
* update prompt status

Rules:

* no fake installability.
* no private data.
* push subscription info protected.
* provider setup-required shown honestly.

---

## 72. Feature Flag Strategy For Advanced Features

Advanced features should be feature-flagged:

* PWA service worker
* offline drafts
* push notifications
* saved search alerts
* price alerts
* availability alerts
* analytics dashboards
* ad analytics
* map advanced search
* nearby places
* 360 tours
* floor plan viewer
* unit inventory public view
* construction progress alerts
* localization selector
* Gujarati UI
* Hindi UI
* EMI calculator
* stamp duty calculator
* NRI login/support
* claim listing
* duplicate merge
* advanced matching

Rules:

* backend enforcement for sensitive features.
* flag changes audited.
* disabled feature shows reason.
* no frontend-only security.
* docs updated when flag changes.

---

## 73. Advanced Provider Dependencies

Advanced features may need providers:

| Feature              | Provider / Dependency             |
| -------------------- | --------------------------------- |
| PWA push             | Web Push/VAPID, service worker    |
| Push delivery        | push provider/browser             |
| Email alerts         | email provider                    |
| SMS alerts           | SMS provider                      |
| WhatsApp alerts      | WhatsApp API/free link            |
| Map advanced search  | Google Maps/API                   |
| Nearby places        | Maps/Places API                   |
| GeoIP city detection | GeoIP/IP provider                 |
| Media variants       | image processing                  |
| Video thumbnail      | video processing                  |
| PDF generation       | PDF generator                     |
| Analytics            | analytics/event pipeline          |
| Error tracking       | error tracking provider           |
| Cron alerts          | background jobs                   |
| Saved search alerts  | cron/jobs + notifications         |
| Price alerts         | analytics/history + notifications |
| Stamp duty rates     | admin-config/legal review         |
| EMI calculator       | local calculation                 |
| Localization         | translation/content system        |

Missing provider means setup-required.

---

## 74. Advanced Database Tables

Suggested tables:

* `pwa_push_subscriptions`
* `pwa_install_events`
* `offline_sync_queue`
* `language_preferences`
* `translation_keys`
* `translations`
* `location_aliases`
* `analytics_events`
* `analytics_daily_summaries`
* `saved_searches`
* `saved_search_alert_runs`
* `price_history`
* `price_alerts`
* `availability_alerts`
* `project_progress_updates`
* `project_progress_media`
* `project_unit_inventory_history`
* `comparison_lists`
* `recently_viewed`
* `claim_requests`
* `duplicate_merge_events`
* `calculator_settings`
* `nearby_place_cache`
* `feature_flags`
* `background_jobs`
* `dead_letters`
* `audit_logs`

Actual schema may vary, but behavior must exist.

---

## 75. Suggested Table Fields

## 75.1 `pwa_push_subscriptions`

Fields:

* `id`
* `profile_id`
* `endpoint_hash`
* `subscription_encrypted`
* `browser`
* `device_type`
* `status`
* `last_used_at`
* `created_at`
* `updated_at`

Rules:

* subscription data protected.
* user can remove subscription.
* invalid subscriptions cleaned.

---

## 75.2 `language_preferences`

Fields:

* `id`
* `profile_id`
* `language_code`
* `source`
* `created_at`
* `updated_at`

Language codes:

* `en`
* `hi`
* `gu`

---

## 75.3 `translations`

Fields:

* `id`
* `translation_key`
* `language_code`
* `text`
* `status`
* `review_required`
* `created_by_staff_id`
* `updated_by_staff_id`
* `created_at`
* `updated_at`

---

## 75.4 `analytics_events`

Fields:

* `id`
* `event_type`
* `entity_type`
* `entity_id`
* `profile_id`
* `session_hash`
* `ip_hash`
* `user_agent_hash`
* `city_id`
* `device_type`
* `source`
* `metadata_safe`
* `created_at`

---

## 75.5 `saved_search_alert_runs`

Fields:

* `id`
* `saved_search_id`
* `status`
* `matched_count`
* `notified_count`
* `last_error_safe`
* `started_at`
* `completed_at`
* `created_at`

---

## 75.6 `price_history`

Fields:

* `id`
* `entity_type`
* `entity_id`
* `old_price`
* `new_price`
* `currency`
* `changed_by_profile_id`
* `changed_by_staff_id`
* `change_source`
* `created_at`

---

## 75.7 `price_alerts`

Fields:

* `id`
* `profile_id`
* `entity_type`
* `entity_id`
* `condition_type`
* `target_price`
* `status`
* `last_triggered_at`
* `created_at`
* `updated_at`

---

## 75.8 `availability_alerts`

Fields:

* `id`
* `profile_id`
* `entity_type`
* `entity_id`
* `condition_type`
* `status`
* `last_triggered_at`
* `created_at`
* `updated_at`

---

## 75.9 `claim_requests`

Fields:

* `id`
* `claimant_profile_id`
* `target_entity_type`
* `target_entity_id`
* `claim_type`
* `status`
* `proof_media_id`
* `reviewed_by_staff_id`
* `review_note`
* `created_at`
* `updated_at`

---

## 75.10 `duplicate_merge_events`

Fields:

* `id`
* `entity_type`
* `source_entity_id`
* `target_entity_id`
* `merged_by_staff_id`
* `reason`
* `rollback_notes`
* `created_at`

---

## 76. Index Expectations

Indexes required for:

* push subscriptions by profile/status
* language preferences by profile
* translations by key/language
* analytics by event/entity/date
* analytics by profile/date where allowed
* saved search alert runs by saved search/status/date
* price history by entity/date
* price alerts by profile/status
* availability alerts by profile/status
* progress updates by project/date
* recently viewed by profile/session/date
* claim requests by target/status
* duplicate merge events by entity/date
* background jobs by status/next run
* dead letters by source/status

No advanced analytics list should be unbounded.

---

## 77. Migration Expectations

Advanced feature implementation requires migrations for:

* PWA push subscriptions
* language preferences
* translations
* analytics events/summaries
* saved search alerts
* price history
* price alerts
* availability alerts
* project progress enhancements
* claim requests
* duplicate merge events
* feature flags
* background jobs
* RLS policies
* indexes

Migration must include:

* header
* purpose
* phase
* tables changed
* RLS changed yes/no
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 78. RLS And Security Rules

RLS must enforce:

* user sees own language preferences
* user sees own push subscriptions
* user manages own saved searches/alerts
* user sees own recently viewed if DB stored
* property analytics owner/broker own only
* project analytics builder own only
* ad analytics builder own only
* admin analytics permission-scoped
* price alerts user-owned
* claim requests claimant/admin scoped
* duplicate merge admin-only
* translations admin/localization permission
* public reads only public-safe aggregate data
* analytics events not exposing private data
* push subscriptions protected
* feature flags admin-only
* background jobs admin/system-only

---

## 79. Privacy Rules For Advanced Features

Advanced features must not leak:

* hidden contact
* private address
* private documents
* message bodies
* invoice data
* support content
* private analytics
* push subscription secrets
* exact private location
* sensitive user behavior publicly
* provider secrets
* raw IP/user agent where not needed

Use:

* safe aggregation
* hashed identifiers
* permission-scoped dashboards
* public-safe views
* consent preferences

---

## 80. Performance Rules

Advanced features must be performance-safe.

Rules:

* analytics dashboards use aggregates.
* saved search alerts run in background.
* price alerts run in background.
* push sends queued/retried.
* PWA service worker does not cache private data.
* localization bundles lazy/fallback where needed.
* charts lazy-load.
* maps lazy-load.
* 360 tours lazy-load.
* videos lazy-load.
* heavy comparisons paginated/limited.
* no global realtime analytics.
* no unbounded event scans.

---

## 81. Caching Rules

Can cache:

* public translations
* public CMS/blog/legal translations
* public location aliases
* public analytics aggregates if safe
* public locality guide content
* public static PWA assets

Do not cache publicly:

* push subscriptions
* private alerts
* saved searches
* user preferences
* private analytics
* dashboard analytics
* admin analytics
* offline private data
* signed URLs
* private messages/leads/invoices

---

## 82. Advanced Error Handling

Use safe errors:

* `PWA_SETUP_REQUIRED`
* `PUSH_PERMISSION_DENIED`
* `PUSH_PROVIDER_SETUP_REQUIRED`
* `OFFLINE_ACTION_UNAVAILABLE`
* `SYNC_PENDING`
* `SYNC_FAILED`
* `LOCALIZATION_MISSING`
* `TRANSLATION_REVIEW_REQUIRED`
* `ANALYTICS_SETUP_REQUIRED`
* `NO_ANALYTICS_DATA`
* `ALERT_PROVIDER_SETUP_REQUIRED`
* `PRICE_HISTORY_UNAVAILABLE`
* `MAP_PROVIDER_SETUP_REQUIRED`
* `CALCULATOR_DISCLAIMER_REQUIRED`
* `FEATURE_DISABLED`
* `FUTURE_APPROVAL_REQUIRED`
* `FORBIDDEN`
* `RATE_LIMITED`

Do not expose raw provider errors.

---

## 83. Manual Verification Checklist

Manual verification must check:

### PWA

* manifest loads
* app icons exist
* installability works where supported
* install prompt not spammy
* offline fallback works
* service worker does not cache private data
* update prompt works
* logout/private cache handled
* PWA disabled/rolled back safely if issue

### Offline / Slow Network

* offline banner appears
* server actions disabled or queued honestly
* no fake contact reveal
* no fake inquiry
* no fake payment
* upload failure handled
* draft behavior honest
* retry works

### Push

* permission UX clear
* permission denied handled
* push subscription stored securely
* test push real/setup-required
* no sensitive data in push body
* user can disable push
* delivery logs real only

### Localization

* language selector works if implemented
* English fallback works
* Gujarati font renders
* Hindi text renders
* long translated text does not break layout
* missing translation tracked
* legal translations marked review-required if not reviewed
* location aliases search works if implemented

### Analytics

* event created from real action
* no fake dashboard chart
* property owner sees own analytics only
* builder sees own project/ad analytics only
* admin analytics permission works
* no hidden contact/private data in analytics
* date filters work
* empty/setup-required state honest

### Alerts

* saved search alert uses real result
* price alert uses real price change
* availability alert uses real availability
* external provider setup-required if missing
* notification deep links safe
* user can pause/delete alert

### Advanced Real Estate Features

* floor plan public only after approval
* project one-video rule still enforced
* 360 URL validated
* progress updates real
* unit inventory real
* locality guide no fake facts
* price history real
* EMI calculator disclaimer visible
* stamp duty calculator marked setup/legal-review unless verified current
* NRI flow setup-required/real

### Security / RLS

* saved alerts user-owned
* push subscriptions protected
* analytics scoped
* claim requests scoped
* duplicate merge admin-only
* private data not cached
* service worker private cache test
* direct URL bypass denied

### Responsive

Test at:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

Check:

* PWA install banner
* offline banner
* language selector
* analytics dashboard
* charts
* alerts UI
* comparison UI
* floor plan viewer
* 360 viewer
* calculator UI
* advanced dashboard widgets

---

## 84. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* PWA manifest
* PWA icons
* service worker
* offline fallback
* offline banner
* slow network UX
* install prompt
* update prompt
* push subscriptions
* push notifications
* push preferences
* saved search alerts
* price alerts
* availability alerts
* construction progress alerts
* localization architecture
* language selector
* English UI
* Gujarati UI
* Hindi UI
* Gujarati font
* location aliases/transliteration
* translation admin
* notification template localization
* analytics events
* property analytics
* project analytics
* lead analytics
* ad analytics
* billing analytics
* SEO analytics
* admin operations analytics
* analytics aggregation
* floor plan advanced viewer
* unit inventory public view
* construction progress timeline
* 360 virtual tour
* locality guides
* society/building directory
* price history
* price comparison
* property/project comparison
* EMI calculator
* stamp duty calculator
* unit converter
* nearby places
* NRI support
* claim profile/listing
* duplicate merge
* rule-based matching
* AI no-rule/future approval gate
* advanced feature flags
* advanced RLS/security
* advanced manual verification

Each item must have real status.

---

## 85. Common Bugs To Track

Create bug if:

* PWA claims installable but manifest/icons broken
* service worker caches private dashboard
* service worker caches hidden contact
* offline action shows fake success
* push sent without permission
* push body contains sensitive data
* push delivery marked sent without provider
* language selector breaks route
* Gujarati text broken
* legal translation shown as final without review
* analytics chart hardcoded
* fake views shown
* fake ad clicks shown
* fake price trend shown
* wrong user sees analytics
* saved search alert sends fake result
* price alert triggers without price change
* availability alert shows fake inventory
* project progress fake
* unit inventory fake
* 360 iframe unsafe
* EMI calculator implies loan approval
* stamp duty calculator uses unverified rates as official
* nearby places fake
* claim request auto-approves
* duplicate merge loses data
* AI feature added without approval
* advanced feature bypasses RLS
* advanced feature not behind flag when risky
* heavy analytics query slows dashboard
* private data in analytics export
* PWA rollback not possible

---

## 86. Current Advanced/PWA/Localization/Analytics Status

As of this documentation generation stage:

| Area                               | Status                     |
| ---------------------------------- | -------------------------- |
| PWA manifest                       | `NOT_STARTED`              |
| PWA icons                          | `NOT_STARTED`              |
| Service worker                     | `NOT_STARTED`              |
| Offline fallback                   | `NOT_STARTED`              |
| Offline banner                     | `NOT_STARTED`              |
| Slow network UX                    | `DOCUMENTED_BASELINE`      |
| Install prompt                     | `NOT_STARTED`              |
| Update prompt                      | `NOT_STARTED`              |
| Push notifications                 | `SETUP_REQUIRED`           |
| Push subscriptions                 | `NOT_STARTED`              |
| Saved search alerts                | `SETUP_REQUIRED`           |
| Price alerts                       | `NOT_STARTED`              |
| Availability alerts                | `NOT_STARTED`              |
| Construction progress alerts       | `NOT_STARTED`              |
| Localization architecture          | `NOT_STARTED`              |
| English UI                         | `DOCUMENTED_BASELINE`      |
| Gujarati UI                        | `NOT_STARTED`              |
| Hindi UI                           | `NOT_STARTED`              |
| Gujarati font                      | `NOT_STARTED`              |
| Location aliases/transliteration   | `NOT_STARTED`              |
| Translation admin                  | `NOT_STARTED`              |
| Notification template localization | `NOT_STARTED`              |
| Analytics events                   | `NOT_STARTED`              |
| Property analytics                 | `NOT_STARTED`              |
| Project analytics                  | `NOT_STARTED`              |
| Lead analytics                     | `NOT_STARTED`              |
| Ad analytics                       | `NOT_STARTED`              |
| Billing analytics                  | `NOT_STARTED`              |
| SEO analytics                      | `SETUP_REQUIRED`           |
| Admin operations analytics         | `NOT_STARTED`              |
| Analytics aggregation              | `NOT_STARTED`              |
| Floor plan advanced viewer         | `NOT_STARTED`              |
| Unit inventory public view         | `NOT_STARTED`              |
| Construction progress timeline     | `NOT_STARTED`              |
| 360 virtual tour                   | `SETUP_REQUIRED`           |
| Locality guides                    | `NOT_STARTED`              |
| Society/building directory         | `NOT_STARTED`              |
| Price history                      | `NOT_STARTED`              |
| Price comparison                   | `NOT_STARTED`              |
| Property/project comparison        | `NOT_STARTED`              |
| EMI calculator                     | `NOT_STARTED`              |
| Stamp duty calculator              | `LEGAL_REVIEW_REQUIRED`    |
| Unit converter                     | `NOT_STARTED`              |
| Nearby places                      | `SETUP_REQUIRED`           |
| NRI support                        | `NOT_STARTED`              |
| Claim profile/listing              | `NOT_STARTED`              |
| Duplicate merge                    | `NOT_STARTED`              |
| Rule-based matching                | `NOT_STARTED`              |
| AI features                        | `FUTURE_APPROVED_REQUIRED` |
| Advanced feature flags             | `NOT_STARTED`              |
| Advanced RLS/security              | `NOT_STARTED`              |
| Manual verification                | `NOT_STARTED`              |

---

## 87. Documentation Generation Progress

| File No. | File                                                                          | Status  |
| -------: | ----------------------------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                                                   | Created |
|        2 | `brain.md`                                                                    | Created |
|        3 | `FEATURE_REGISTRY.md`                                                         | Created |
|        4 | `CHANGELOG.md`                                                                | Created |
|        5 | `BUGS_AND_FIXES.md`                                                           | Created |
|        6 | `MANUAL_VERIFICATION.md`                                                      | Created |
|        7 | `API_PROVIDER_STATUS.md`                                                      | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                                      | Created |
|        9 | `SECURITY_RLS_CHECKLIST.md`                                                   | Created |
|       10 | `PERFORMANCE_CHECKLIST.md`                                                    | Created |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                                         | Created |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`                            | Created |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`                             | Created |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`                            | Created |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`                              | Created |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`                         | Created |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`                         | Created |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`                                  | Created |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`                           | Created |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`                        | Created |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`                               | Created |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`                             | Created |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`                             | Created |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`                             | Created |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`                               | Created |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`                     | Created |
|       27 | `prompts/00_PROMPT_USAGE_RULES.md`                                            | Pending |
|       28 | `prompts/01_PROJECT_SETUP_BASELINE.md`                                        | Pending |
|       29 | `prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md`                    | Pending |
|       30 | `prompts/02_AUTH_ROLES_RLS_FOUNDATION.md`                                     | Pending |
|       31 | `prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md`                 | Pending |
|       32 | `prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`                             | Pending |
|       33 | `prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md`         | Pending |
|       34 | `prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`                           | Pending |
|       35 | `prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md`       | Pending |
|       36 | `prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`                              | Pending |
|       37 | `prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md`          | Pending |
|       38 | `prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md`                               | Pending |
|       39 | `prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md`           | Pending |
|       40 | `prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`                                | Pending |
|       41 | `prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md`            | Pending |
|       42 | `prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md`                     | Pending |
|       43 | `prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md` | Pending |
|       44 | `prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`                        | Pending |
|       45 | `prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md`    | Pending |
|       46 | `prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md`                                  | Pending |
|       47 | `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`              | Pending |
|       48 | `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`                                 | Pending |
|       49 | `prompts/11_MANUAL_VERIFICATION_LOCATION_SEARCH_SEO_CMS_LEGAL.md`             | Pending |
|       50 | `prompts/12_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`                         | Pending |
|       51 | `prompts/12_MANUAL_VERIFICATION_ADS_PROMOTION_NOTIFICATIONS_PROVIDERS.md`     | Pending |
|       52 | `prompts/13_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`                            | Pending |
|       53 | `prompts/13_MANUAL_VERIFICATION_SECURITY_PRIVACY_FRAUD_RATE_LIMITS.md`        | Pending |
|       54 | `prompts/14_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`                         | Pending |
|       55 | `prompts/14_MANUAL_VERIFICATION_PERFORMANCE_CACHING_DEPLOYMENT_LAUNCH.md`     | Pending |
|       56 | `prompts/15_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`                      | Pending |
|       57 | `prompts/15_MANUAL_VERIFICATION_FINAL_PRODUCTION_API_TESTING_AND_SIGNOFF.md`  | Pending |

---

## 88. Related Documents

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
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* prompt files
* manual verification prompt files
* SQL migrations
* RLS policies

---

## 89. Detailed Documentation Pack Completion Note

This file completes the detailed documentation section.

Completed detailed documentation files:

1. `CLAUDE.md`
2. `brain.md`
3. `FEATURE_REGISTRY.md`
4. `CHANGELOG.md`
5. `BUGS_AND_FIXES.md`
6. `MANUAL_VERIFICATION.md`
7. `API_PROVIDER_STATUS.md`
8. `DEPLOYMENT_ROLLBACK.md`
9. `SECURITY_RLS_CHECKLIST.md`
10. `PERFORMANCE_CHECKLIST.md`
11. `docs/01_PROJECT_MASTER_AND_SCOPE.md`
12. `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
13. `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
14. `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
15. `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
16. `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
17. `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
18. `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
19. `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
20. `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
21. `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
22. `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
23. `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
24. `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
25. `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
26. `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`

Next section starts the Claude Code prompt pack.

---

## 90. Final Advanced/PWA/Localization/Analytics Rule

Advanced features must never fake capability.

PWA must not cache private data.

Offline mode must not fake server success.

Push notifications require permission and real provider delivery.

Localization must be honest and reviewed where legal content is involved.

Gujarati/Hindi/English support must not break layout.

Analytics must be real, privacy-safe and role-scoped.

Saved search alerts must use real matching data.

Price alerts must use real price changes.

Availability alerts must use real availability.

Project progress must be real.

Unit inventory must be real.

360 tours must be safe and provider/iframe validated.

Calculators must include disclaimers.

NRI support must be secure and provider-backed.

AI features are not allowed in current scope unless explicitly approved later.

Advanced features must be feature-flagged where risky.

Provider missing means setup-required.

No fake PWA.

No fake offline.

No fake push.

No fake localization.

No fake analytics.

No fake price history.

No fake alerts.

No fake advanced feature.

No fake PASS.
