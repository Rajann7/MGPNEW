# docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md

# My Gujarat Property — UI, UX, Design System, Responsive And Interaction Rules

This document defines the complete **UI, UX, Design System, Responsive Layout, Interaction, Accessibility and Frontend Quality Rules** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — this design IS the design system)

> Source of truth: the finished 17-batch design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batch 1 = the design system; Batch 17 ends with a developer-QA consistency checklist). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`. Batch 1 defines the canonical tokens/components — reuse them, do not restyle.

**Locked tokens**
* Brand `#0F6B5C` (hover `#0C5648`, soft `#E7F2EF`, border `#C4E0D9`); semantic success `#16A34A`, warning/pending `#D97706`, error `#DC2626`, info `#2563EB`; Setup-Required blue `#EFF6FF/#BFDBFE/#1E3A8A`; privacy amber `#FFFBEB/#FDE68A/#B45309`. Font Inter 400/500/600; radius 16 (cards) / 10 (controls) / full (pills); shadows sm/md/lg; spacing 4-8-12-16-24-32-48. On-Hold unit status = blue `#1E40AF/#EFF6FF`.
* **Dark mode = token swap only** (no redesign): `#18181b/#27272a`, green→`#4ADE80`.

**Locked shells & patterns**
* Public header 3-zone (brand+city / search flex-1 / auth) + mega-menu; mobile = brand+city pill+hamburger with an always-visible search bar below.
* **App-like contextual mobile header (56px, back button + title + ≤2 actions) on every inner/detail/dashboard sub-page — no exceptions.**
* Dashboard: 240px collapsible sidebar (desktop) / drawer + **bottom nav Home · Search · Post (raised center FAB) · Leads · Profile** (mobile). Admin = graphite, drawer, **no bottom nav**.
* Every list has loading (skeleton) / empty (actionable, non-dead-end) / error (+Retry) states; tables → cards on mobile; every modal has a desktop + mobile bottom-sheet pair; every destructive action has a confirmation dialog; EntityStatusBadge chip grammar (dot + label) is uniform.
* Multi-step wizard pattern: desktop stepped header + sticky footer (Back / Save Draft / Continue); mobile "Step X of N" bar + sticky bottom action bar that never covers content.

**Interaction-safety & transient UI**
* Copy only via explicit button (never auto-copy); overlay-outside closes, inside-content click does not; bottom sheets lock background scroll; duplicate-submit protection (instant disable + spinner) on every submit.
* Sticky **compare tray** (max 4 items, persists across pagination) layers **above** the bottom nav and never covers card CTAs. Offline banner renders in normal flow above the header; PWA update toast is idle-deferred (never mid-wizard).
* **Accessibility quick-settings** panel (text size / high contrast / reduce motion, persists per device) reachable from footer + Settings; visible focus rings; 44px tap targets; safe-area padding.
* **Honesty states are visible UI** ("—" with caption, Setup-Required cards that state their fallback, "Never fake-active", "computer-generated invoice", dev-only "TEST MODE" ribbon). Batch 17's final consistency checklist is the developer-handoff QA sheet.

Claude must read this file before implementing homepage UI, public layouts, header, footer, search UI, cards, listing detail pages, dashboards, admin panels, forms, modals, bottom sheets, media galleries, upload UI, pricing UI, billing UI, notifications, profile pages, mobile layouts, responsive components, theme system or design-system tokens.

No broken UI is allowed.

No horizontal scroll is allowed.

No overlapping components are allowed.

No dead buttons or dead links are allowed.

No fake dashboard data is allowed.

No fake counts are allowed.

No hidden contact leak is allowed.

No mobile-unusable feature can be marked PASS.

---

## 1. Purpose

This file defines:

* design vision
* visual style
* brand UI rules
* layout system
* spacing system
* typography
* color strategy
* theme strategy
* component rules
* responsive breakpoints
* mobile-first rules
* role-aware header
* public footer
* dashboard shell
* admin shell
* cards
* tables
* forms
* modals
* drawers
* bottom sheets
* popups
* dropdowns
* tabs
* filters
* search UI
* detail page UI
* gallery UI
* upload UI
* notification UI
* billing/pricing UI
* ads UI
* support UI
* admin UI
* loading states
* empty states
* error states
* unauthorized states
* setup-required states
* disabled states
* accessibility
* touch interactions
* scroll behavior
* animations
* performance
* manual verification

This file is the master UI/UX reference.

---

## 2. Core Design Principles

The UI must follow these principles:

1. Mobile-first.
2. White-first and clean.
3. Premium marketplace feel.
4. Real estate focused.
5. Fast and lightweight.
6. Clear role-based navigation.
7. No fake content.
8. No dead actions.
9. No hidden contact leak.
10. No public admin exposure.
11. No confusing forms.
12. No irrelevant fields.
13. No horizontal scroll.
14. No overlap.
15. No tiny tap targets.
16. No broken popups.
17. No unresponsive dashboard tables.
18. No placeholder-only modules.
19. Every disabled action must show reason.
20. Every setup-required provider feature must say setup-required.
21. Every loading/empty/error state must be designed.
22. Every major flow must work on mobile.
23. Every private page must remain private.
24. Every public page must be SEO-safe.
25. Manual verification is required before PASS.

---

## 3. Visual Direction

The desired visual style:

* white-first
* premium
* clean
* modern
* Apple-style simplicity
* soft cards
* light borders
* subtle shadows
* generous spacing
* readable typography
* professional real estate marketplace tone
* Gujarat/India friendly
* mobile-first layouts
* trust-focused
* conversion-friendly
* not cluttered
* not flashy
* not dark-heavy by default
* not generic admin template without marketplace feel

Inspiration may include:

* TailAdmin
* Untitled UI
* Creative Tim dashboards
* Dribbble real estate dashboards
* Uiverse components
* Ahmed UI style references

Rules:

* Use inspiration only.
* Do not copy exact proprietary design.
* Preserve existing approved UI if user says it is ready.
* Do not replace working components unnecessarily.
* Improve without breaking existing layout.

---

## 4. Brand Rules

Brand name:

```txt
My Gujarat Property
```

Brand rules:

* brand text must not wrap badly
* brand must remain readable at 320px width
* logo/brand lockup must fit header
* brand must not overlap city selector
* brand should not be hidden behind menu
* brand must not shrink unreadably
* brand color should align with design tokens
* logo fallback should work if image missing
* no distorted logo
* no fake “No.1” claim unless legally approved

Mobile header must keep brand readable.

---

## 5. Layout System

Use consistent layout structure.

Public pages:

* header
* main content
* optional hero/search
* content sections
* public footer

Dashboard pages:

* dashboard shell
* sidebar/bottom nav
* top bar
* content area
* no public footer unless explicitly designed

Admin pages:

* internal shell
* sidebar
* top bar
* module content
* detail drawer/page
* no public footer
* noindex

---

## 6. Responsive Breakpoints

Mandatory verification widths:

|  Width | Device Context                |
| -----: | ----------------------------- |
|  320px | very small mobile             |
|  360px | common Android mobile         |
|  390px | modern iPhone width           |
|  430px | large phone                   |
|  768px | tablet                        |
| 1024px | small laptop/tablet landscape |
| 1366px | desktop                       |

Every major page/flow must be checked at these widths.

Major pages include:

* homepage
* search page
* property detail
* project detail
* auth popup
* property form
* project form
* requirement form
* owner dashboard
* broker dashboard
* builder dashboard
* admin dashboard
* notification center
* billing/pricing
* media upload/gallery
* CMS/legal/blog/support pages

---

## 7. Mobile-First Rules

Mobile-first means:

* design starts at 320px
* content stacks vertically
* primary CTA visible
* filters use bottom sheet
* tables become cards
* sidebars become drawers/bottom nav
* modals become bottom sheets where useful
* tap targets are large
* no horizontal scroll
* no overlapping sticky UI
* forms are sectioned
* media is optimized
* gallery is swipe-friendly
* search is easy to use
* dashboard summaries load first
* heavy charts lazy-load

Mobile-first does not mean desktop should be ignored.

Desktop must still feel premium and spacious.

---

## 8. No Horizontal Scroll Rule

No page should horizontally scroll at required widths.

Common causes to prevent:

* wide tables
* long brand text
* fixed-width cards
* unwrapped URLs
* large images
* overflowing dropdowns
* non-responsive modals
* long buttons
* code blocks
* ad banners
* maps
* gallery thumbnails
* dashboard stat cards
* admin tables

Fix methods:

* use responsive grid
* use min-width carefully
* use `overflow-x-auto` only inside table container when unavoidable
* convert table to cards on mobile
* wrap long text
* truncate safely with tooltip/details
* use responsive images
* use bottom sheets for menus
* avoid fixed pixel widths on mobile

Page-level horizontal scroll is a bug.

---

## 9. Spacing System

Use consistent spacing.

Suggested spacing scale:

* 4px
* 8px
* 12px
* 16px
* 20px
* 24px
* 32px
* 40px
* 48px
* 64px

Rules:

* mobile spacing should be compact but readable
* desktop spacing can be generous
* cards need breathing room
* forms need clear vertical rhythm
* dashboard grids need consistent gaps
* no cramped buttons
* no overlapping sticky bars
* no random inconsistent margins

---

## 10. Typography Rules

Typography must be readable.

Rules:

* use clear font stack
* support Gujarati where needed
* use Noto Sans Gujarati or equivalent for Gujarati
* avoid tiny text
* heading hierarchy clear
* body text readable
* labels visible
* error text readable
* numbers/currency aligned where useful
* cards avoid too much text
* long descriptions collapsed/expanded where needed

Minimum practical text sizes:

* body: readable on mobile
* labels: not too small
* buttons: readable
* metadata: still accessible

Do not use low-contrast grey text for important information.

---

## 11. Language And Script Rules

UI should be ready for:

* English
* Hindi
* Gujarati

Rules:

* avoid hardcoded layout assumptions based on English text length
* Gujarati text must not break layout
* long location names must wrap/truncate safely
* search aliases/transliteration supported by location/search system
* legal pages may need reviewed translations
* no auto-translated legal text without review
* date/currency/unit formatting India-friendly

Examples:

* Rajkot
* રાજકોટ
* राजकोट

---

## 12. Color System

Design should use token-based colors.

Required token categories:

* background
* foreground
* muted
* border
* card
* primary
* secondary
* accent
* success
* warning
* danger
* info
* disabled
* focus ring

Rules:

* no random hardcoded colors everywhere
* maintain contrast
* dark mode compatible if implemented
* status colors consistent
* success not used for fake success
* warning for setup-required/pending
* danger for destructive/error
* sponsored/featured label clear
* verified badge distinct but not overclaiming

---

## 13. Theme Rules

Theme options:

* light
* dark
* system

Rules:

* light theme is default/primary
* dark theme must be readable if implemented
* system follows OS preference
* user preference stored where implemented
* dashboard/profile menu can expose theme control
* no flashing theme mismatch if possible
* all components must support theme tokens
* charts/tables/cards readable in both modes
* legal/payment/error pages readable in both modes

If dark mode incomplete, mark `PARTIAL` or `NOT_STARTED`, not fake complete.

---

## 14. Border, Radius And Shadow Rules

Recommended feel:

* soft rounded cards
* light borders
* subtle shadows
* no harsh heavy shadows
* no excessive glassmorphism
* no blurry unreadable backgrounds
* no overdecorated cards

Rules:

* cards consistent radius
* modals consistent radius
* buttons consistent radius
* focus outline visible
* disabled states clear
* hover states subtle
* selected states clear

---

## 15. Icon Rules

Icons should:

* be consistent style
* support labels where needed
* not replace critical text alone
* have accessible labels
* not be too small
* not be misleading
* not use fake verified/payment/security icons without real status

Icon-only buttons need:

* `aria-label`
* tooltip or accessible label where useful
* large tap target

---

## 16. Button Rules

Button types:

* primary
* secondary
* outline
* ghost
* destructive
* link
* disabled
* loading

Rules:

* primary CTA clear
* destructive actions require confirmation
* disabled buttons show reason where needed
* loading button prevents double submit
* button labels must be action-specific
* no dead buttons
* no `href="#"`
* no fake success on click
* buttons must be large enough on mobile
* sticky buttons must not overlap content

Examples:

* “Post Property”
* “Post Project”
* “Submit for Approval”
* “Save Draft”
* “Reveal Contact”
* “Upgrade Plan”
* “Request Changes”
* “Approve”
* “Reject”

---

## 17. Link Rules

Links must:

* point to real route
* be accessible
* have meaningful label
* not use `href="#"`
* not open internal pages unnecessarily in new tab
* open uploader profile in new tab where product requires
* not expose private URLs
* not create open redirect risk
* show disabled/setup-required if target not ready

Footer/legal/search links must work.

Dead links are bugs.

---

## 18. Card Rules

Cards are used for:

* property listings
* project listings
* requirement cards
* dashboard stats
* CRM leads
* admin table mobile cards
* notifications
* pricing plans
* support tickets
* blog posts
* CMS/help articles
* ads

Card rules:

* clear title
* key metadata
* primary action
* secondary actions
* status badge where needed
* public-safe data only on public cards
* responsive image
* no fake count
* no hidden contact
* no overloaded text
* skeleton loading
* empty/error states where list empty/fails

Cards must not be clickable in a way that breaks nested buttons.

Use `stopPropagation` where needed.

---

## 19. Property Card Rules

Property card should show:

* cover image
* title
* purpose
* property type
* price/rent
* location
* key specs
* verified badge if real
* sponsored label if ad
* save/share
* inquiry/contact CTA
* status in dashboard context

Must not show:

* hidden contact
* private email
* exact private address if hidden
* fake views
* fake leads
* fake verified badge
* fake listing count

---

## 20. Project Card Rules

Project card should show:

* cover image
* project name
* builder name
* project type
* location
* price range if real
* possession
* unit types
* RERA status if real
* sponsored label if ad
* inquiry/contact CTA

Must not show:

* fake RERA badge
* fake inventory
* fake sold/booked count
* hidden contact to guest
* private RERA proof
* fake views/leads

---

## 21. Dashboard Stat Card Rules

Dashboard stat cards must show real data only.

Allowed states:

* loading
* empty
* setup-required
* no data
* real count
* error

Stat cards must not show:

* hardcoded fake count
* fake lead count
* fake view count
* fake revenue
* fake payment
* fake notification count
* fake analytics

If analytics not implemented, show setup-required/not-started state.

---

## 22. Table Rules

Tables are used for:

* dashboard lists
* admin queues
* billing records
* leads
* users
* payments
* verification requests
* ads
* support tickets

Rules:

* desktop tables can be used
* mobile tables become cards
* table container may scroll horizontally only inside container if unavoidable
* page-level horizontal scroll not allowed
* sticky columns only if responsive safe
* filters above table
* pagination required
* row actions accessible
* row click opens detail drawer/page
* sensitive columns hidden unless permission
* no unbounded table
* no fake data

---

## 23. Form Rules

Forms are used for:

* auth/register
* property posting
* project posting
* requirement posting
* profile edit
* verification
* billing details
* support ticket
* ads
* admin moderation
* CMS/blog/legal admin

Form rules:

* sectioned/step-based for long forms
* mobile-first
* clear labels
* required markers
* helper text
* validation near fields
* server validation
* save draft where needed
* preview before submit where relevant
* loading state
* disabled state
* error summary for long forms
* unsaved changes warning
* no irrelevant fields
* no hidden required fields
* no double submit

---

## 24. Dynamic Form Rules

Dynamic forms must:

* show relevant fields based on role/type/purpose
* hide irrelevant fields
* update validation when fields change
* preserve user input where possible
* explain why field is disabled
* avoid jumping layout excessively
* work on mobile
* validate server-side

Examples:

* Flat shows BHK/floor/society.
* Plot shows area/dimensions/road width.
* Project shows wings/towers/units/RERA.
* PG shown for property only, not project.
* Builder cannot see property posting as allowed action.

---

## 25. Multi-Step Form Rules

Long forms should be step-based.

Step UI must show:

* current step
* completed steps
* validation state
* save draft
* previous/next
* final preview
* submit for approval
* mobile-friendly progress

Rules:

* user can go back without losing data
* invalid fields explained
* draft saves safely
* final submit validates all server-side
* step changes should not cause horizontal overflow
* mobile progress indicator compact

---

## 26. Modal Rules

Modal is used for:

* auth popup
* confirmation
* small forms
* quick preview
* filters on desktop
* image crop
* details where appropriate

Modal rules:

* focus trap
* escape/back closes where safe
* outside click closes only when safe
* close button visible
* body scroll locked
* mobile converts to bottom sheet where useful
* no overflow off-screen
* no hidden submit button
* no infinite spinner
* no raw error
* no nested modal chaos

---

## 27. Bottom Sheet Rules

Bottom sheets are preferred on mobile for:

* auth
* filters
* sort
* actions
* notification dropdown
* profile menu
* share menu
* contact/inquiry action
* map/list toggle options
* confirmation where appropriate

Bottom sheet rules:

* drag handle optional
* close button
* safe height
* internal scroll
* body scroll locked
* back closes sheet first
* tap outside closes when safe
* sticky action footer if needed
* no content hidden behind phone keyboard
* no horizontal overflow

---

## 28. Drawer Rules

Drawers are used for:

* mobile navigation
* admin detail preview
* dashboard detail
* filters on tablet/desktop
* CRM lead detail
* support ticket detail

Drawer rules:

* responsive width
* full screen on mobile if needed
* close button
* focus handling
* body scroll lock
* loading/error/empty states
* no private data unless permitted
* no horizontal overflow
* action footer stays visible

---

## 29. Dropdown Rules

Dropdowns are used for:

* profile menu
* notification menu
* action menu
* select filters
* admin row actions

Rules:

* not clipped by parent
* responsive on mobile
* keyboard accessible
* closes on outside click
* no tiny items
* no overflow off-screen
* destructive actions visually separated
* disabled items show reason
* no hidden admin actions for public users

---

## 30. Tabs Rules

Tabs may be used for:

* dashboard modules
* profile sections
* listing detail sections
* admin detail views
* billing history
* verification status
* media sections

Rules:

* mobile scrollable tabs if needed
* active tab clear
* tab content accessible
* deep-link or state preserved where useful
* no hidden critical content
* no fake tab counts
* tabs must not overflow page horizontally

---

## 31. Filter UI Rules

Filters must:

* be easy to use
* be responsive
* show active filter chips
* allow clear all
* update query params where useful
* have loading state
* not hide results permanently
* be type-aware
* avoid irrelevant filters
* mobile bottom sheet
* desktop sidebar/top filters

Filter chips must be removable.

No fake result count.

---

## 32. Search UI Rules

Search UI must:

* route to real search
* support location/type/purpose
* preserve query
* show loading/empty/error
* no dead search button
* no fake suggestions unless real
* no hidden contact in results
* mobile-friendly input
* clear button
* recent searches where implemented
* saved search where logged in
* setup-required for provider-backed features

---

## 33. Auth Popup UX Rules

Auth popup must:

* open from protected actions
* support mobile OTP flow
* show registration if mobile not found
* include Owner/Broker/Builder role selector
* preserve original intent
* redirect/continue action after login
* not show admin/staff registration
* show provider setup-required if OTP missing
* prevent double submit
* resend cooldown
* safe errors
* mobile bottom sheet friendly
* close/back behavior safe

Auth popup must not:

* fake OTP sent
* fake login success
* expose admin login link
* lose user form data unnecessarily
* reveal hidden contact before auth

---

## 34. Contact / Inquiry UX Rules

Contact/inquiry UI must:

* require auth for guest
* explain contact privacy
* show reveal/contact state
* prevent duplicate inquiry spam
* show success only after DB success
* show already-contacted state
* rate limit safely
* create real lead
* show setup-required if external notification provider missing but in-app lead created
* no hidden contact before authorization

Sticky mobile CTA bar may include:

* Call/Contact
* Inquiry
* Save
* Share

Must not cover content.

---

## 35. Gallery UX Rules

Gallery used for:

* property images
* project images
* floor plans
* ad previews
* profile media
* CMS/blog media

Gallery rules:

* swipe on mobile
* thumbnails where useful
* fullscreen viewer
* keyboard navigation
* close button
* lazy-load
* optimized variants
* no distortion
* placeholder/skeleton
* safe empty state
* video/PDF separate controls
* cover image first
* no accidental card click on swipe
* hidden contact not embedded/displayed

---

## 36. Video UX Rules

Video UI must:

* lazy-load
* show thumbnail
* show controls
* avoid autoplay heavy video
* be responsive
* not block LCP
* show setup-required/processing if video provider missing
* handle failed video
* support project one-video rule
* no fake video processing

---

## 37. PDF UX Rules

PDF UI used for:

* brochure
* floor plan
* invoice
* verification/support private docs

Rules:

* public brochure/floor plan downloadable/viewable after approval
* private PDF signed URL only
* invoice own-only
* loading state
* error state
* file size indicator where useful
* download button accessible
* no public private PDF
* no fake PDF link

---

## 38. Upload UX Rules

Upload UI must:

* show allowed file types
* show file size guidance
* show upload progress
* show preview
* support retry
* support remove
* support reorder
* set cover
* show validation errors
* show provider setup-required
* prevent double upload
* preserve draft
* be mobile-friendly
* show processing status
* show real success only

Upload UI must not:

* fake upload success
* use broken image preview
* expose private storage key
* ignore failed upload
* allow project more than one video
* allow unsafe files

---

## 39. Notification UI Rules

Notification UI must include:

* bell icon
* real unread badge
* dropdown/latest list
* notification center
* mark read
* mark all read
* empty state
* loading state
* error state
* mobile bottom sheet
* deep link permission check
* preferences link

Must not show:

* fake unread count
* fake delivered state
* notification for wrong user
* private data in public UI

---

## 40. Dashboard Shell Rules

User dashboard shell must include:

* role-aware navigation
* top bar
* notification bell
* profile menu
* help/support
* quick action
* content area
* mobile bottom nav/drawer
* no public footer
* no admin links
* loading/empty/error states

Role dashboards:

* Owner
* Broker
* Builder

Rules:

* dashboard route requires correct role
* wrong role denied
* direct URL blocked
* modules clickable or disabled with reason
* no fake counts
* no dead modules
* responsive cards

---

## 41. Owner Dashboard UI Rules

Owner dashboard should prioritize:

* overview
* post property
* my properties
* post requirement
* my requirements
* leads
* messages
* site visits
* saved items
* billing
* verification
* profile
* support
* settings

UI rules:

* property actions clear
* requirement actions clear
* project posting not shown as allowed
* plan/verification gates visible
* real stats only
* mobile cards
* no public footer

---

## 42. Broker Dashboard UI Rules

Broker dashboard should prioritize:

* overview
* post property
* my properties
* post requirement
* requirements feed
* proposals
* leads/CRM
* messages
* site visits
* saved items
* billing
* verification
* profile
* support
* settings

UI rules:

* CRM list mobile-friendly
* proposal statuses real
* requirement feed scoped
* project posting not shown as allowed
* real analytics only
* no fake lead/proposal counts

---

## 43. Builder Dashboard UI Rules

Builder dashboard should prioritize:

* overview
* post project
* my projects
* unit inventory
* project leads
* matching requirements
* agents/team
* ads/promotions
* analytics
* billing
* verification/RERA
* profile/microsite
* support
* settings

UI rules:

* property posting not shown as allowed
* project creation clear
* unit inventory responsive
* ads setup/payment/approval states clear
* real project leads only
* real ad metrics only
* project one-video rule visible in media UI

---

## 44. Admin UI Rules

Admin UI must be:

* permission-aware
* fast
* table/card responsive
* noindex
* internal-only
* audit-friendly
* action-confirmation focused
* safe for private data
* clear for moderation queues

Admin UI must include:

* search
* filters
* pagination
* row/detail drawer
* status badges
* internal notes
* audit timeline
* permission-gated actions
* loading/empty/error/unauthorized/setup states

Admin UI must not:

* expose provider secrets
* show modules without permission
* allow direct URL bypass
* show public footer
* show raw sensitive errors
* fake provider/payment/verification status

---

## 45. Pricing And Billing UI Rules

Pricing UI must:

* show role selector
* show plan cards
* show real features/limits
* show GST note
* show setup-required if payment provider missing
* show coupon input if implemented
* show legal links
* show comparison clearly
* not fake discount/popular claim

Billing dashboard must show:

* current plan
* real usage
* payment history
* invoices
* trial/expiry
* failed/pending states
* upgrade/renew CTA
* setup-required if provider missing

No fake active plan.

---

## 46. Verification UI Rules

Verification UI must show:

* current status
* required docs
* upload area
* review timeline
* need changes reason
* approved/rejected/revoked status
* badge disclaimer
* private document notice
* upload setup-required where missing
* access/privacy note

Must not show:

* fake verified badge
* fake RERA status
* public private docs
* raw admin notes where not intended

---

## 47. Ads UI Rules

Builder ads UI must show:

* select own approved project
* desktop/tablet/mobile banner upload
* target all Gujarat or selected cities
* campaign dates
* preview
* payment status
* approval status
* sponsored label preview
* RERA disclosure
* performance metrics real only
* pause/resume/edit/delete
* setup-required states

Admin ads UI must show:

* campaign details
* builder/project
* payment state
* RERA state
* media previews
* approve/reject/need changes
* fraud/analytics
* audit timeline

No fake ad active state.

---

## 48. Support UI Rules

Support UI must include:

* help search
* FAQ
* ticket form
* category
* priority
* description
* attachments if configured
* status tracking
* replies
* support notifications
* escalation/grievance links

Rules:

* guest support only if allowed and rate-limited
* user sees own ticket
* staff sees assigned/permitted tickets
* private attachments protected
* no fake support response

---

## 49. CMS / Blog / Legal UI Rules

CMS/legal/blog public UI must:

* be readable
* SEO-friendly
* mobile responsive
* accessible
* use headings
* link legal pages
* no broken footer links
* no fake guarantee
* no private data
* no hidden contact
* no unsafe HTML

Admin editor UI must:

* protect drafts
* sanitize rich text
* show preview
* support publish/noindex/canonical
* audit legal changes
* permission-gate publish

---

## 50. State Design Rules

Every module must design these states:

1. loading
2. empty
3. error
4. unauthorized
5. forbidden
6. setup-required
7. disabled
8. success
9. pending
10. need changes
11. rejected
12. expired
13. blocked
14. offline/slow connection where relevant

No blank white screen.

No infinite spinner without fallback.

No raw provider/SQL error.

---

## 51. Loading State Rules

Loading state may use:

* skeleton
* spinner
* progress bar
* inline loading
* button loading
* upload progress
* table skeleton
* card skeleton

Rules:

* preserve layout
* avoid layout shift
* no infinite loading
* show retry/fallback if long/fails
* button loading disables duplicate submit
* upload progress real only

---

## 52. Empty State Rules

Empty state must include:

* clear message
* role-specific next action
* illustration/icon optional
* setup link if needed
* no fake data
* no fake count

Examples:

* “No properties posted yet. Post your first property.”
* “No project leads yet.”
* “No invoices yet.”
* “No matching results found.”
* “No ads running.”

---

## 53. Error State Rules

Error state must include:

* safe user-facing error
* retry button where useful
* support link where needed
* no raw stack trace
* no SQL/provider secret
* no hidden private data
* safe error code where useful

Errors must not break entire page if only one widget fails.

---

## 54. Unauthorized / Forbidden State Rules

Unauthorized means not logged in.

Forbidden means logged in but not allowed.

Rules:

* guest protected action opens auth popup
* wrong role gets clear message
* wrong owner denied safely
* staff no permission denied
* no private data shown
* direct URL blocked
* safe redirect where appropriate

Examples:

* “Login required.”
* “This action is only available for Builders.”
* “You do not have permission to view this page.”

---

## 55. Setup-Required State Rules

Setup-required is used when provider/config/integration missing.

Examples:

* OTP provider missing
* Razorpay missing
* R2 storage missing
* email provider missing
* WhatsApp API missing
* maps provider missing
* analytics missing
* cron/jobs missing
* PDF generation missing
* malware scan missing

Rules:

* do not fake success
* show clear disabled state
* show admin/provider status path if internal
* public user sees simple unavailable message
* docs updated
* API provider status updated

---

## 56. Disabled State Rules

Disabled button/action must show reason.

Examples:

* “Upgrade plan to upload video.”
* “Only Builders can post projects.”
* “Payment provider setup required.”
* “Verification required.”
* “Project must be approved before ads.”
* “RERA verification required for promotion.”
* “You have reached your plan limit.”

Disabled without reason is bad UX.

---

## 57. Status Badge Rules

Status badges must be consistent.

Status examples:

* Draft
* Pending
* Under Review
* Need Changes
* Approved
* Published
* Rejected
* Paused
* Expired
* Deleted
* Blocked
* Verified
* Unverified
* Setup Required
* Payment Pending
* Payment Failed
* Active
* Trial
* Grace

Rules:

* badge color consistent
* no fake verified/payment badge
* badge text readable
* tooltip/explanation where needed
* status from real data only

---

## 58. Accessibility Rules

Accessibility requirements:

* semantic HTML
* proper heading order
* labels for inputs
* `aria-label` for icon buttons
* focus visible
* keyboard navigation
* modal focus trap
* escape close where safe
* color contrast
* alt text for images
* captions/labels for media
* no color-only status
* screen-reader friendly errors
* large tap targets
* form validation announced where possible
* skip link where useful

Accessibility bugs must be tracked.

---

## 59. Tap Target Rules

Mobile tap targets should be comfortable.

Rules:

* buttons large enough
* spacing between actions
* no tiny close buttons
* no tiny dropdown items
* destructive actions not next to common action without confirmation
* sticky CTA not too close to OS gesture area
* upload/remove buttons easy to tap
* checkbox/radio labels clickable

---

## 60. Keyboard And Focus Rules

Keyboard support required for:

* forms
* modals
* dropdowns
* search
* filters
* tabs
* gallery close/navigation
* admin actions
* notification menu
* profile menu

Rules:

* focus not trapped accidentally
* focus returns to trigger after modal close
* visible focus ring
* tab order logical
* hidden elements not focusable
* disabled elements handled properly

---

## 61. Scroll Behavior Rules

Scroll rules:

* body scroll locks when modal/drawer/bottom sheet open
* background not scrollable behind overlay
* internal scroll inside drawer/sheet
* sticky headers not covering anchor content
* sticky footer CTA not covering form fields
* restore scroll where useful
* infinite scroll accessible with load more fallback
* gallery swipe does not scroll page unexpectedly

---

## 62. Back Button Behavior

Back button should:

* close modal first
* close bottom sheet first
* close drawer first
* close fullscreen gallery first
* then navigate back
* preserve unsaved form warning where needed

This is especially important on mobile.

---

## 63. Confirmation Rules

Confirmation required for:

* delete
* hard delete
* cancel subscription
* refund
* manual activation
* reject approval
* block/suspend user
* revoke verification
* pause active ad by admin
* change provider settings
* feature flag high-risk
* bulk action
* discard unsaved changes

Confirmation should include:

* action summary
* consequence
* reason field where needed
* cancel button
* confirm button
* destructive styling

---

## 64. Toast / Alert Rules

Toasts should:

* be short
* not cover critical UI
* be accessible
* have success/error/warning/info style
* not replace inline validation
* not claim fake success

Alerts/banners should be used for:

* setup-required
* maintenance
* payment pending
* verification required
* plan expired
* provider degraded
* security warning
* RERA/legal disclaimer

---

## 65. Animation Rules

Animations should be:

* subtle
* fast
* non-blocking
* accessible
* respect reduced-motion preference
* not delay user action
* not hide loading
* not cause layout shift
* not be excessive

Use animation for:

* modal open
* bottom sheet open
* dropdown open
* skeleton loading
* button feedback
* card hover

Avoid heavy animations on low-end mobile.

---

## 66. Performance UI Rules

Frontend performance:

* optimize images
* lazy-load media
* avoid huge JS bundles
* code split heavy modules
* lazy-load charts/maps/video/PDF
* avoid rendering huge lists
* virtualize long lists where needed
* paginate tables
* memoize expensive components where useful
* avoid layout shift
* use skeletons
* avoid blocking public page on providers
* use server components where suitable
* avoid unnecessary client components

Core Web Vitals targets:

* LCP ≤ 2.5s
* INP ≤ 200ms
* CLS ≤ 0.1

---

## 67. Public Page UI Rules

Public pages must:

* load fast
* be SEO-safe
* show public header
* show public footer
* have clear search
* show approved public-safe data
* have no fake counts
* have no hidden contact
* have no admin links
* have responsive layout
* have working legal/footer links
* have no horizontal scroll

Public pages include:

* homepage
* search
* property detail
* project detail
* public profiles
* city/locality pages
* blog
* CMS/legal/help/support pages

---

## 68. Detail Page UI Rules

Property/project detail pages must include:

* gallery
* title/name
* price/rent/range
* location
* specs
* description
* amenities
* uploader/builder profile link
* contact/inquiry CTA
* save/share/report
* sticky mobile CTA
* related/similar real items
* disclaimers
* SEO-safe content

Must not include:

* hidden contact before auth/reveal
* fake view count
* fake lead count
* fake verified/RERA
* private docs
* unapproved media

---

## 69. Header Rules

Header must be:

* role-aware
* responsive
* readable
* sticky if designed
* not overlapping content
* not horizontally overflowing
* not wrapping brand badly
* not exposing admin links publicly

Guest header:

* login/register
* city selector
* search
* public nav

Owner/Broker header:

* dashboard link
* post property/requirement
* notifications
* profile menu

Builder header:

* dashboard link
* post project
* notifications
* profile menu

Admin/staff:

* separate internal shell, not public header.

---

## 70. Footer Rules

Public footer must include:

* brand
* disclaimer
* public nav
* legal links
* help/support links
* city/category links if real
* contact/grievance link
* copyright

Footer must not:

* appear in dashboard pages unless explicitly designed
* show admin/staff links
* show fake counts
* show broken links
* show private contact
* use placeholder social links
* use `href="#"`

---

## 71. Dashboard No-Footer Rule

Dashboard pages should not show public footer.

Applies to:

* owner dashboard
* broker dashboard
* builder dashboard
* admin dashboard
* staff dashboard
* private pages
* billing dashboard
* CRM/messages/site visits
* dashboard forms

Dashboard pages need dashboard navigation, not public footer.

---

## 72. Responsive Images Rules

Images must:

* use correct aspect ratio
* not stretch
* use object-fit carefully
* use width/height to reduce CLS
* use responsive sizes
* lazy-load below fold
* prioritize hero/cover only when needed
* show fallback placeholder
* use optimized variants
* avoid huge original in cards

Broken images are bugs.

---

## 73. Map UI Rules

Map UI is provider-dependent.

Rules:

* map is optional unless feature demands
* manual location works without map
* map lazy-loads
* provider setup-required if missing
* map does not expose private exact location
* map has fallback
* map does not cause horizontal overflow
* map controls usable on mobile
* no fake nearby places

---

## 74. Data Honesty UI Rules

UI must never show fake:

* listings
* projects
* requirements
* leads
* views
* analytics
* notifications
* payments
* invoices
* verification badges
* RERA status
* ads
* impressions
* clicks
* provider health
* support replies
* reviews
* ratings
* city/listing counts

If data is unavailable:

* show empty
* show setup-required
* show not-started
* show loading/error
* hide feature until ready with documented status

---

## 75. Privacy UI Rules

UI must protect:

* hidden phone
* hidden email
* private address
* private documents
* verification docs
* RERA proof docs
* invoice PDFs
* message attachments
* support attachments
* leads
* CRM notes
* admin notes
* audit logs
* provider settings

Public UI must never contain private fields in:

* HTML
* API payload
* meta tags
* schema
* sitemap
* share text
* image alt/caption
* notifications to wrong user

---

## 76. RLS/Permission UI Alignment

UI permission hiding must align with server/RLS.

Rules:

* hide unavailable actions for UX
* show disabled reason where helpful
* still enforce server-side
* still enforce RLS
* direct URL blocked
* wrong role denied
* staff permission denied
* private docs protected

UI-only security is invalid.

---

## 77. Design Tokens Recommendation

Recommended token groups:

```txt id="design-token-groups"
colors
spacing
radius
shadow
typography
font-size
line-height
z-index
breakpoints
motion
status
component-size
```

Rules:

* tokens centralized
* no inconsistent one-off styles
* components use tokens
* light/dark compatible
* status tokens consistent
* avoid magic values unless needed and documented

---

## 78. Component Library Structure

Recommended component areas:

```txt id="component-library-structure"
components/ui/
components/layout/
components/public/
components/dashboard/
components/admin/
components/forms/
components/media/
components/search/
components/notifications/
components/billing/
components/support/
```

Rules:

* reusable base components
* marketplace-specific components
* role-aware configs
* no duplicate conflicting components
* preserve existing working components
* document major components if needed

---

## 79. Page-Level Quality Checklist

Every page must check:

* title/heading
* primary action
* loading state
* empty state
* error state
* unauthorized state if private
* setup-required state if provider-backed
* mobile layout
* tablet layout
* desktop layout
* no horizontal scroll
* no overlap
* no dead links/buttons
* no fake data
* no private leak
* no console errors
* accessible labels
* performance acceptable

---

## 80. Manual Responsive Verification Checklist

Manual verification must test:

### Widths

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

### Public UI

* homepage
* header
* city selector
* hero/search
* footer
* search page
* filters
* property card
* project card
* detail page
* gallery
* sticky CTA
* public profile
* CMS/legal/blog/support pages

### Auth UI

* login popup
* registration role selector
* OTP step
* setup-required state
* error state
* mobile bottom sheet

### Dashboards

* owner dashboard
* broker dashboard
* builder dashboard
* dashboard nav
* dashboard cards
* dashboard tables as cards
* dashboard forms
* notifications
* billing
* verification
* CRM/messages/site visits

### Admin

* admin shell
* sidebar/drawer
* moderation queue
* table/card mobile
* detail drawer/page
* action confirmations
* provider settings
* audit logs
* private docs

### Forms

* property form
* project form
* requirement form
* media upload
* profile edit
* billing details
* support ticket
* ad campaign

### Interaction

* modals close
* bottom sheets close
* drawers close
* back button behavior
* body scroll lock
* no double submit
* disabled reasons
* validation errors
* toasts/alerts
* keyboard focus

### Bugs To Check

* horizontal scroll
* overlap
* broken images
* dead buttons
* dead links
* hidden contact leak
* fake counts
* overflow dropdowns
* inaccessible controls
* tiny tap targets
* public admin link
* public footer in dashboard
* raw errors
* infinite loading

---

## 81. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* design tokens
* light theme
* dark theme
* system theme
* public layout
* role-aware header
* public footer
* dashboard shell
* admin shell
* mobile navigation
* bottom sheets
* modals
* drawers
* dropdowns
* tabs
* cards
* tables-to-cards responsive
* forms
* multi-step forms
* upload UI
* gallery UI
* video UI
* PDF UI
* notification UI
* pricing UI
* billing UI
* verification UI
* ads UI
* support UI
* CMS/legal/blog UI
* loading states
* empty states
* error states
* unauthorized states
* setup-required states
* disabled reason states
* accessibility
* responsive verification
* no-horizontal-scroll verification
* no-dead-link verification
* no-fake-data UI verification

Each item must have real status.

---

## 82. Common Bugs To Track

Create bug if:

* mobile horizontal scroll
* header brand wraps badly
* city selector overlaps header
* footer link broken
* dashboard shows public footer
* admin link visible publicly
* dead button
* `href="#"`
* fake count shown
* fake analytics chart
* fake notification badge
* fake payment status
* fake verified badge
* hidden contact shown
* table overflows page
* modal overflows mobile
* bottom sheet cannot close
* background scrolls behind modal
* upload shows fake success
* gallery image distorted
* video blocks page load
* PDF private URL public
* disabled button has no reason
* setup-required feature shows success
* raw SQL/provider error shown
* keyboard focus lost
* tap target too small
* form loses data on step change
* double submit creates duplicate
* sticky CTA covers content
* dark mode unreadable
* Gujarati text broken
* skeleton causes layout shift
* admin table unpaginated
* private data in public metadata

---

## 83. Current UI/UX Status

As of this documentation generation stage:

| Area                                       | Status                   |
| ------------------------------------------ | ------------------------ |
| Design tokens                              | `NOT_STARTED`            |
| White-first visual system                  | `DOCUMENTED_BASELINE`    |
| Light theme                                | `NOT_STARTED`            |
| Dark theme                                 | `NOT_STARTED`            |
| System theme                               | `NOT_STARTED`            |
| Public layout                              | `NOT_STARTED`            |
| Existing header/city selector preservation | `DOCUMENTED_REQUIREMENT` |
| Role-aware header                          | `NOT_STARTED`            |
| Public footer                              | `NOT_STARTED`            |
| Dashboard shell                            | `NOT_STARTED`            |
| Admin shell                                | `NOT_STARTED`            |
| Mobile navigation                          | `NOT_STARTED`            |
| Modals                                     | `NOT_STARTED`            |
| Bottom sheets                              | `NOT_STARTED`            |
| Drawers                                    | `NOT_STARTED`            |
| Cards                                      | `NOT_STARTED`            |
| Tables-to-cards                            | `NOT_STARTED`            |
| Multi-step forms                           | `NOT_STARTED`            |
| Upload UI                                  | `NOT_STARTED`            |
| Gallery UI                                 | `NOT_STARTED`            |
| Notification UI                            | `NOT_STARTED`            |
| Pricing/billing UI                         | `NOT_STARTED`            |
| Verification UI                            | `NOT_STARTED`            |
| Ads UI                                     | `NOT_STARTED`            |
| Support UI                                 | `NOT_STARTED`            |
| CMS/legal/blog UI                          | `NOT_STARTED`            |
| Loading/empty/error states                 | `NOT_STARTED`            |
| Setup-required states                      | `NOT_STARTED`            |
| Accessibility                              | `NOT_STARTED`            |
| Responsive verification                    | `NOT_STARTED`            |
| No horizontal scroll verification          | `NOT_STARTED`            |
| Manual verification                        | `NOT_STARTED`            |

---

## 84. Documentation Generation Progress

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
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Created |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Created |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Created |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 85. Related Documents

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
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 86. Final UI/UX Rule

The platform must look premium, clean, white-first and mobile-first.

Every page must be responsive.

Every major flow must work at 320px, 360px, 390px, 430px, 768px, 1024px and 1366px.

No horizontal scroll.

No overlapping components.

No dead buttons.

No dead links.

No fake counts.

No fake analytics.

No fake notification badges.

No fake provider success.

No hidden contact leak.

No public admin link.

No private data in public UI.

Every disabled/setup-required feature must show a reason.

Every module must have loading, empty and error states.

Dashboard pages must not show public footer unless explicitly designed.

Admin pages must be internal-only and noindex.

No mobile-unusable feature can be marked PASS.

No fake PASS.
