# BATCH_04_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md

# My Gujarat Property

## Design Batch 4

## Complete Detail Pages, Public Profiles, Claim, Report, Gallery and Comparison Specification

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, privacy, authentication, contact-reveal, lead-generation, project-enquiry, requirement-visibility, proposal-entry, public-profile, claim-verification, content-reporting, media-gallery, unavailable-listing, comparison, responsive, security, backend, database, RLS, SEO and live-verification specification for:

**My Gujarat Property · Design Batch 4 — Detail Pages + Public Profiles**

Batch 4 contains exactly these 10 functional screen groups:

1. Property Detail
2. Project Detail
3. Requirement Detail
4. Broker Public Profile
5. Builder Microsite
6. Owner Public-Safe Profile
7. Claim Profile Flow
8. Report Content Flow
9. Fullscreen Gallery
10. Comparison Page

Every screen and every defined state is mandatory.

Nothing may be skipped.

Batch 4 must not be treated as a collection of static public pages.

These screens are connected to:

* Search,
* Saved Items,
* Recent Views,
* Authentication,
* Contact Reveal,
* Leads,
* Messages,
* Site Visits,
* Proposals,
* Reports,
* Moderation,
* Verification,
* RERA status,
* Media Storage,
* Maps Provider,
* Notifications,
* Public Profiles,
* Claim Review,
* Comparison,
* SEO,
* Sitemap,
* unavailable-item handling.

The final implementation must preserve the exact Batch 4 design while using real application data and secure backend behavior.

---

# 2. DESIGN AUTHORITY

Use the actual design source:

`Batch 4 - Detail Pages (Standalone).html`

The source design is the visual and interaction authority for:

* screen structure,
* shell presence,
* breadcrumbs,
* media gallery,
* content order,
* desktop sidebars,
* mobile contextual headers,
* sticky bottom CTA,
* tab placement,
* public profile composition,
* Claim CTA,
* Report modal/sheet,
* Gallery overlay,
* Comparison structure.

Do not redesign from:

* existing current page appearance,
* generic real-estate templates,
* old project screenshots,
* previous mixed UI,
* personal assumptions.

---

# 3. CURRENT UI REPLACEMENT RULE

Where current implementation conflicts with Batch 4:

remove and rebuild the conflicting presentation.

Do not:

* layer new CSS over old design,
* keep duplicate old cards,
* keep two CTA systems,
* mix generic stacked cards with Batch 4 layout,
* retain placeholder media as final production media,
* retain wrong public visibility behavior because backend already exists.

Secure, compatible backend foundations may remain and be extended.

---

# 4. BATCH DEPENDENCIES

Batch 4 depends on the following approved systems:

## Batch 1

For:

* tokens,
* Public Header,
* mobile contextual Header,
* overlays,
* bottom sheets,
* status colors,
* loading/empty/error states,
* sticky CTA behavior.

## Batch 2

For:

* login/register modal or sheet,
* OTP flow,
* return-to-original-page behavior.

## Batch 3

For:

* Search,
* Search cards,
* Similar Listings,
* filters,
* canonical Location behavior.

## Batch 5

For:

* Property records,
* Project records,
* Requirement records,
* Media uploads,
* publication status.

## Batch 9

For:

* Lead detail,
* Proposal detail,
* Message Threads,
* Site Visits,
* Contact Reveal,
* connected communication actions.

## Batch 11

For:

* Claim Review,
* Moderation,
* Report Review.

## Batch 13

For:

* Maps Provider state,
* external provider honesty.

## Batch 14

For:

* SEO metadata,
* canonical URLs,
* Location hierarchy.

## Batch 15

For:

* Report investigation,
* fraud review,
* sensitive audit.

## Batch 17

For:

* final advanced Comparison system,
* final max-item capacity,
* mobile Compare Tray behavior.

---

# 5. IMPLEMENTATION ORDER

Implement Batch 4 in this order:

1. public-safe Detail data queries
2. Screen 1 Property Detail
3. Property unavailable state
4. Screen 2 Project Detail
5. Screen 3 Requirement Detail and visibility gates
6. Screen 4 Broker Public Profile
7. Screen 5 Builder Microsite
8. Screen 6 Owner Public-Safe Profile
9. Screen 7 Claim Flow
10. Screen 8 Report Flow
11. Screen 9 Fullscreen Gallery
12. Screen 10 Comparison
13. privacy regression
14. authentication return-flow regression
15. multi-role regression
16. responsive visual verification.

Do not implement everything in one uncontrolled phase.

---

# 6. GLOBAL PUBLIC DATA SAFETY RULE

Public Detail and Profile pages must query only public-safe fields.

Never expose through initial render, HTML, React Server Component payload, API response or hidden attribute:

* private mobile number,
* alternate mobile,
* private email,
* private verification documents,
* private identity documents,
* private Staff notes,
* Lead contact snapshots,
* payment data,
* internal moderation reason,
* claim proof documents.

---

# 7. FULL CONTACT NUMBER INITIAL-DOM PROHIBITION

Critical Batch 4 rule:

**Phone remains masked until explicit Reveal action.**

A full mobile number must not be sent to the Client before the authorised Reveal flow has succeeded.

Do not:

* pass full number as a hidden React prop,
* put it in a hidden `tel:` link,
* put it in initial Server Component payload,
* hide it only with CSS,
* render full number immediately merely because the viewer logged in.

Explicit reveal must be a real server-authorised event.

---

# 8. CURRENT CONTACT IMPLEMENTATION RECONCILIATION

The current implementation can resolve a full phone server-side through a service client and pass it to the Client CTA component when visibility conditions are satisfied.

That behavior conflicts with Batch 4's explicit masked-until-Reveal design.

Rebuild the flow so that:

initial load
→ masked number only

explicit Reveal action
→ server eligibility/quota/consent check

approved reveal
→ full number returned

reveal event persisted
→ Audit/CRM/Notification behavior where applicable.

---

# 9. AUTH RETURN INTENT

When a Guest taps an auth-gated action such as:

* Reveal Number,
* Enquire Now,
* Contact Broker,
* Contact Builder,
* Login to View Requirement,
* Save,

the Batch 2 Auth flow must preserve:

* current route,
* intended action where appropriate.

After successful authentication:

return to the same entity context.

Do not send the user to a generic Dashboard Home and lose intent.

---

# 10. SELF-ACTION PROTECTION

Users must not:

* send an enquiry to their own Listing,
* reveal their own number through consumer reveal flow,
* report their own entity through normal consumer flow where policy forbids it,
* claim their own already-owned profile.

Enforce server-side.

---

# 11. ROLE MODEL RULE

Do not recreate legacy role slugs such as:

* buyer,
* tenant

merely because public-facing sample copy says:

`Buyer`.

The final registrable public role model remains based on the approved canonical role architecture.

Contextual copy such as:

`Buyer`

may describe user intent, not a new database role.

---

# 12. SCREEN 1 — PROPERTY DETAIL

Exact source concept:

**Desktop with breadcrumb + Gallery Grid.
Mobile with contextual Header + sticky CTA.
Phone masked until explicit Reveal.**

This complete behavior is mandatory.

---

# 13. PROPERTY DESKTOP SHELL

Reference width:

`1280px`

Use Batch 1 Public desktop shell.

Required high-level order:

1. Public Header
2. Breadcrumb
3. Gallery Grid
4. Property title/price/status
5. Key Facts
6. Description
7. Amenities
8. Location
9. Similar Properties
10. desktop Contact card/sidebar.

---

# 14. PROPERTY BREADCRUMB

Reference:

Home
→ Ahmedabad
→ Satellite
→ 3 BHK Apartment, Shrinand Residency

Use canonical Location hierarchy.

Do not replace this with:

Home → Search → Property

when actual City/Locality context is available.

---

# 15. BREADCRUMB LINKS

Home:

`/`

City:

canonical City Search/Landing route.

Locality:

canonical Locality Search/Landing route.

Current Property:

non-link final item.

---

# 16. BREADCRUMB SEO

Render matching Breadcrumb structured data using the same canonical hierarchy.

Do not let visible and structured breadcrumbs disagree.

---

# 17. PROPERTY GALLERY GRID

Desktop source:

* one large main image,
* supporting smaller images,
* `View all 12 photos`.

Use actual Listing media.

---

# 18. CURRENT MEDIA PLACEHOLDER RECONCILIATION

The current Detail Gallery renders neutral placeholders because public media URL resolution is not wired.

This is acceptable only as an honest temporary Setup state.

Batch 4 completion requires:

Property media records
→ approved public media resolver
→ CDN/public-safe URL
→ real Gallery Grid
→ Fullscreen Gallery.

Placeholder-only Gallery is not Batch 4 completion.

---

# 19. MEDIA ORDER

Persist media ordering.

At minimum:

* cover media,
* sequence index,
* caption,
* room/category where available.

Do not reshuffle media on every request.

---

# 20. PROPERTY MEDIA SECURITY

Only media belonging to the published Property may render.

Do not accept arbitrary media ID from URL.

---

# 21. MEDIA DIMENSIONS

Use responsive image sizing.

Do not:

* stretch,
* distort,
* show different aspect-ratio images without approved crop behavior.

---

# 22. VIEW ALL PHOTOS

`View all N photos`

opens Screen 9 Fullscreen Gallery.

The count must be actual.

---

# 23. PROPERTY PRICE

Reference:

`₹85 L`

Use real Property pricing data.

Apply Indian number formatting.

---

# 24. PROPERTY VERIFICATION BADGE

Reference:

`Verified`

Display only when the actual Listing verification state qualifies.

Do not infer Verified from:

* Published,
* Approved,
* Owner verified.

Listing verification and publication status are separate.

---

# 25. SAMPLE BADGE PROHIBITION

The source design marks some content as sample.

Production must never display:

`sample`

as if it were a real trust badge.

---

# 26. PROPERTY TITLE

Reference:

`3 BHK Apartment, Shrinand Residency`

Use real title.

Support long-title wrapping.

---

# 27. PROPERTY SUBTEXT

Reference:

`Near Iscon Cross Road, Satellite, Ahmedabad · Posted 28 Jun 2026`

Use:

* landmark,
* Locality,
* City,
* actual publication date.

---

# 28. POSTED DATE

Use actual `published_at`.

Do not use:

* created date,
* draft date,
* last edited date.

---

# 29. PROPERTY KEY FACTS

Exact source examples:

* 3 BHK
* 1,450 sq ft
* 7th of 12 floors
* Semi-furnished
* East facing

Use actual fields.

---

# 30. KEY FACT NULL STATE

If a fact is unavailable:

omit according to design or show `—` where required.

Do not fabricate:

* Facing,
* Floor,
* Furnishing.

---

# 31. PROPERTY DESCRIPTION

Reference heading:

`Description`

Use real approved Property description.

Preserve intentional paragraphs/newlines.

Sanitize.

---

# 32. MOBILE READ MORE

Mobile source truncates Description and shows:

`Read more`

The control must:

* expand content,
* update accessibility state.

No dead action.

---

# 33. PROPERTY AMENITIES

Reference:

* Covered parking
* 24×7 security
* Lift
* Society garden
* Rainwater harvest
* Power backup

Use actual Property amenities.

---

# 34. AMENITY LABEL REGISTRY

Use a canonical amenity-label registry.

Do not show raw database keys such as:

`rainwater_harvesting`.

---

# 35. PROPERTY LOCATION SECTION

Reference:

`Location`

When Map Provider is active:

show approved Map.

When unavailable:

show honest fallback.

---

# 36. MAP SETUP REQUIRED STATE

Exact source:

`Map: Setup Required`

`Provider not configured — fallback shows address only`

Address:

`Near Iscon Cross Road, Satellite, Ahmedabad 380015`

This state must connect to Batch 13 Provider status.

---

# 37. MAP FAILURE FALLBACK

Provider configured but runtime Map load fails:

still show address.

Do not leave an empty broken grey block.

---

# 38. EXACT LOCATION PRIVACY

For privacy-sensitive listings:

do not expose precise latitude/longitude publicly if product policy only permits approximate Location.

Use approved approximate coordinates.

---

# 39. SIMILAR PROPERTIES

Reference:

`Similar properties`

Source examples:

* ₹78 L — 3 BHK · Jodhpur
* ₹92 L — 3 BHK · Bodakdev
* ₹81 L — 2.5 BHK · Satellite

Use real published Properties.

---

# 40. SIMILAR PROPERTY RELEVANCE

Ranking priority should prefer:

1. same Locality
2. same City
3. same Purpose
4. similar Property Type/BHK
5. reasonable price proximity

according to final recommendation logic.

Current city + purpose only is a useful foundation but does not fully reproduce the source's locality relevance.

---

# 41. SIMILAR PROPERTY PUBLIC-SAFE RULE

Only eligible public Properties.

Exclude:

* current Property,
* Draft,
* Pending,
* Rejected,
* Removed.

---

# 42. PROPERTY OWNER CONTACT CARD

Reference:

RP
Rajesh Patel
Owner
Since 2023
`+91 98XXX XXX45`
Reveal number
Enquire Now

This layout must use real data.

---

# 43. POSTER NAME DATA GAP

Current Property public view does not expose the poster's safe display name, causing the current UI to fall back to a generic role label.

Batch 4 completion requires a safe poster relationship/query that supplies:

* public display name,
* public avatar/initial,
* public role label,
* safe member-since date,
* qualifying verification state.

Do not invent the name.

---

# 44. MASKED PHONE DISPLAY

Initial state:

masked phone only.

Example:

`+91 98XXX XXX45`

Mask server-side or from safely returned masked value.

---

# 45. REVEAL NUMBER ACTION

Required server flow:

1. validate viewer/auth state
2. validate target existence
3. prevent self-reveal
4. verify contact visibility policy
5. verify plan/quota where applicable
6. verify consent/approval rules
7. persist Reveal event
8. atomically increment usage if applicable
9. return full number
10. create required Notification/Audit event.

---

# 46. NO FULL NUMBER BEFORE REVEAL

Before successful Reveal:

Browser Network response must not contain full number.

This is a mandatory security test.

---

# 47. ENQUIRE NOW

Action opens the approved enquiry/lead flow.

Guest:

Batch 2 Auth sheet
→ return to Property
→ continue enquiry.

Authenticated eligible user:

open enquiry form.

---

# 48. ENQUIRY DATA

Use actual:

* target Property ID,
* source page,
* name,
* contact source,
* alternate number where allowed,
* interest,
* message.

---

# 49. ENQUIRY IDEMPOTENCY

Double submit must create one Lead/Inquiry.

---

# 50. DUPLICATE ENQUIRY

Existing active Inquiry should show real status.

Do not create endless duplicate Leads for repeated button taps.

---

# 51. ROLE PERMISSION RECONCILIATION

The current CTA code restricts enquiry creation to Owner accounts only.

Batch 4 source does not visually define an Owner-only enquiry restriction.

Use the final canonical communication permission system.

Do not preserve an arbitrary role restriction unless the approved final role model explicitly requires it.

At minimum:

* self-enquiry blocked,
* unauthorized roles/actions safely blocked server-side,
* legitimate eligible public roles supported.

---

# 52. PROPERTY OVERFLOW MENU

Exact source actions:

* Share
* Save
* Report listing

Use one overflow menu.

---

# 53. SHARE ACTION

Use native Web Share API where supported.

Fallback:

Copy Link.

No fake Share success.

---

# 54. SAVE ACTION

Guest:

auth flow → return → Save.

Authenticated:

persist Saved Property.

UI state survives refresh.

---

# 55. REPORT ACTION

Opens Screen 8 Report flow.

---

# 56. PROPERTY MOBILE — 390PX

Exact mobile reference includes:

* contextual Header,
* swipeable media carousel,
* image counter,
* price,
* Verified badge,
* title,
* Location/date,
* compact facts,
* Owner card,
* truncated Description,
* Read More,
* sticky Call,
* sticky Enquire Now.

---

# 57. MOBILE CONTEXTUAL HEADER

Reference title:

`3 BHK, Shrinand Residency`

Use Batch 1 mobile contextual header.

Back behavior:

return to previous context when safe.

---

# 58. MOBILE CAROUSEL

Must support:

* swipe,
* indicator,
* image count,
* open Fullscreen Gallery.

---

# 59. MOBILE STICKY CTA

Exact actions:

* Call
* Enquire Now

Fixed to viewport.

Respect:

* safe area,
* keyboard,
* Compare Tray offset where applicable.

---

# 60. CALL ACTION BEFORE REVEAL

If number not yet revealed:

Call triggers the Reveal/auth flow.

Do not place full `tel:` URI in initial DOM.

---

# 61. PROPERTY UNAVAILABLE VARIANT

Exact source rule:

**Unavailable variant — no soft-404.**

Reference:

`This property is no longer available`

`It was marked as sold by the owner on 30 June 2026.`

---

# 62. CURRENT UNAVAILABLE GAP

Current Property Detail uses the public-safe view and calls `notFound()` when the Property cannot be fetched.

If Sold/Unavailable records are excluded from that public view, the current behavior can produce a 404 instead of the Batch 4 tombstone.

This must be corrected.

---

# 63. SAFE TOMBSTONE DATA

Unavailable resolver may return only safe fields:

* public title,
* safe Location,
* unavailable reason,
* unavailable date,
* similarity context.

Do not expose hidden private data.

---

# 64. UNAVAILABLE REASONS

User-facing reason should map safely from actual status.

Examples:

* Sold
* Rented
* Removed/No Longer Available where policy permits.

Do not expose private moderation reason.

---

# 65. UNAVAILABLE SIMILAR SECTION

Reference:

`Similar in Satellite`

Show real alternatives.

---

# 66. BROWSE ALL LINK

Reference:

`Browse all 3 BHK in Satellite`

Must open Search with correct canonical filters.

---

# 67. PROPERTY SEO

Active public Property:

* indexable according to SEO policy,
* canonical,
* safe Meta Title/Description,
* structured data.

Unavailable Property:

apply approved expired/unavailable SEO policy.

Do not blindly return hard 404 if source requires tombstone.

---

# 68. SCREEN 1 FINAL CHECKLIST

* [ ] Public Header
* [ ] canonical breadcrumb
* [ ] real Gallery Grid
* [ ] View All count
* [ ] real Price
* [ ] real verification badge
* [ ] Property Title
* [ ] landmark/Locality/City
* [ ] Posted date
* [ ] exact Key Facts
* [ ] Description
* [ ] mobile Read More
* [ ] Amenities
* [ ] Map Active state
* [ ] Map Setup Required fallback
* [ ] address fallback
* [ ] Similar Properties
* [ ] public-safe poster data
* [ ] masked phone
* [ ] explicit Reveal
* [ ] no phone in initial payload
* [ ] Enquire Now
* [ ] auth return flow
* [ ] duplicate protection
* [ ] Share
* [ ] Save
* [ ] Report
* [ ] mobile contextual Header
* [ ] swipeable Carousel
* [ ] sticky Call
* [ ] sticky Enquire
* [ ] safe-area handling
* [ ] unavailable tombstone
* [ ] similar unavailable alternatives
* [ ] Browse All filtered Search
* [ ] SEO
* [ ] Sitemap consistency

---

# 69. SCREEN 2 — PROJECT DETAIL

Reference project:

`Sankalp Grand Vista`

Location:

`Vesu, Surat`

Builder:

`Sankalp Developers`

Price:

`₹62 L – ₹1.4 Cr`

Possession:

`Dec 2027`

---

# 70. PROJECT HERO

Required:

* Builder initials/avatar,
* Project name,
* RERA Verified badge when truly verified,
* Location,
* Builder name,
* price range,
* possession.

Use real data.

---

# 71. RERA REGISTERED VS VERIFIED

Critical distinction:

`RERA Registered`

is not automatically:

`RERA Verified`.

Current implementation labels based primarily on:

* `rera_registered`
* RERA number.

Batch 4 source shows:

`RERA Verified`.

Display Verified only when actual RERA verification status is verified.

---

# 72. RERA NUMBER

Use actual RERA registration number.

Do not invent or expose a sample number in production.

---

# 73. RERA DISCLAIMER

Where required:

show approved disclaimer encouraging independent verification.

Do not make RERA badge a transaction guarantee.

---

# 74. PROJECT TABS

Exact source tabs:

* Overview
* Floor Plans
* Amenities
* Location
* Gallery
* Video
* 360° Tour

All must exist.

---

# 75. CURRENT PROJECT TAB GAP

Current Project implementation provides:

* Overview
* Floor Plans
* Amenities
* Location
* Gallery

but does not expose full source tabs for:

* Video
* 360° Tour.

Add them.

---

# 76. TAB STATE

Tabs must be:

* keyboard accessible,
* deep-linkable where useful,
* no full-page reload,
* mobile horizontally scrollable if needed.

---

# 77. AVAILABLE UNITS

Reference:

### 2 BHK

1,120 sq ft
from ₹62 L

### 3 BHK

1,540 sq ft
from ₹89 L

### 4 BHK

2,080 sq ft
from ₹1.18 Cr

Use actual Unit/Configuration data.

---

# 78. UNIT AGGREGATION

Use authoritative Project Unit Inventory.

Do not maintain duplicate free-text configuration lists disconnected from Batch 8 inventory.

---

# 79. AVAILABLE UNIT COUNT

Only genuinely available units/configurations should appear.

---

# 80. FLOOR PLANS

Floor Plans tab uses actual:

* configuration,
* media,
* area,
* pricing where public.

Do not use fake plan diagrams.

---

# 81. CONSTRUCTION PROGRESS

Exact source:

* Foundation — Done · Mar 25
* Structure — Done · Apr 26
* 64%
* Finishing — In progress
* Handover — Dec 27

This requires milestone-level data.

---

# 82. CURRENT SYNTHETIC PROGRESS GAP

Current implementation maps broad construction status to fixed percentages such as:

* pre-launch → 10%
* under-construction → 40%
* nearing-possession → 75%
* completed → 100%.

This is not sufficient for the Batch 4 milestone design.

Do not label synthetic status mapping as real Construction Progress.

---

# 83. CONSTRUCTION MILESTONE DATA

Store actual Project milestones:

* milestone name,
* state,
* percent where applicable,
* completed date,
* target date,
* display order.

---

# 84. PROJECT VIDEO TAB

When real video exists:

show approved player.

When absent:

exact honest state.

---

# 85. VIDEO SETUP STATE

Source:

`Video: Setup Required`

`Walkthrough video not uploaded by builder yet. Tab shows this state, never a broken player.`

Do not show:

* broken iframe,
* fake thumbnail,
* disabled player with error.

---

# 86. 360 TOUR TAB

Source:

`360° Tour: Setup Required`

`Tour provider not configured — honest placeholder, no fake embed.`

Connect to Provider availability.

---

# 87. 360 TOUR ACTIVE STATE

When configured:

render approved secure embed.

Validate allowed provider/domain.

Do not allow arbitrary iframe URL injection.

---

# 88. PROJECT LOCATION

Same Provider honesty rules as Property.

Map unavailable:

address fallback.

---

# 89. PROJECT GALLERY

Use actual Project media and Screen 9 Gallery.

---

# 90. SIMILAR PROJECTS

Reference:

`Similar projects in Surat`

Use real approved Projects.

Ranking:

* same City,
* similar area/locality,
* similar price/configuration.

---

# 91. PROJECT ENQUIRY CARD

Exact reference:

`Enquire about this project`

Options include:

* Interested in 3 BHK
* Interested in 2 BHK
* Interested in 4 BHK
* Site visit
* Enquire Now

---

# 92. INTEREST OPTIONS

Generate from real available configurations.

Do not hard-code 2/3/4 BHK when the Project offers different units.

---

# 93. PROJECT ENQUIRY

Persist selected interest/configuration with the Lead/Inquiry.

Do not discard interest after submit.

---

# 94. SITE VISIT ENTRY

`Site visit`

must connect to Batch 9 Site Visit Request flow with Project context.

No dead checkbox.

---

# 95. PROJECT BROCHURE

Reference:

`Project brochure`

`PDF · 4.2 MB`

Action:

`View`

---

# 96. BROCHURE FILE RULE

The source explicitly says:

**PDF — never converted to image.**

Use:

* actual PDF asset,
* secure/public access according to Project status,
* View action.

Do not rasterize brochure into fake Gallery images.

---

# 97. CURRENT BROCHURE GAP

Current Brochure Card always shows a not-uploaded state.

Batch 4 completion requires real brochure media relation and View action when a brochure exists.

---

# 98. BROCHURE METADATA

Use real:

* filename/display label,
* MIME,
* size.

Do not hard-code 4.2 MB.

---

# 99. BUILDER MINI CARD

Reference:

SD
Sankalp Developers
12 projects
Since 2009
View microsite

Use actual Builder public data.

---

# 100. CURRENT PROJECT COUNT GAP

Current Project Detail passes no real Builder project count to the mini card.

Add actual safe aggregate count.

---

# 101. MOBILE PROJECT DETAIL

Exact mobile reference:

* contextual Header
* Project identity
* compact tab strip
* price range
* RERA
* possession/configuration summary
* unit price cards
* Brochure
* sticky Call
* sticky Enquire Now.

---

# 102. PROJECT CALL PRIVACY

Same explicit contact Reveal rules apply.

No full phone in initial render.

---

# 103. SCREEN 2 FINAL CHECKLIST

* [ ] Project Hero
* [ ] real Project Name
* [ ] real Builder
* [ ] Location
* [ ] Price Range
* [ ] Possession
* [ ] verified vs registered distinction
* [ ] actual RERA state
* [ ] Overview tab
* [ ] Floor Plans
* [ ] Amenities
* [ ] Location
* [ ] Gallery
* [ ] Video
* [ ] 360 Tour
* [ ] real Unit configurations
* [ ] actual Inventory connection
* [ ] Construction milestones
* [ ] no synthetic fake percentage
* [ ] Video honest empty state
* [ ] Tour Setup Required state
* [ ] Similar Projects
* [ ] Enquiry configuration selection
* [ ] Site Visit
* [ ] Enquire Now
* [ ] real Brochure PDF
* [ ] PDF View action
* [ ] no image conversion
* [ ] Builder mini card
* [ ] actual Project count
* [ ] actual Founded date where public
* [ ] View Microsite
* [ ] mobile sticky CTA
* [ ] contact privacy
* [ ] SEO

---

# 104. SCREEN 3 — REQUIREMENT DETAIL

Exact source rule:

**Visible to Owner / Broker / Builder only.
Guests see a locked teaser.**

This visibility model must be implemented deliberately.

---

# 105. CURRENT REQUIREMENT VISIBILITY MISMATCH

Current public Search data layer gates Requirements to:

* verified Broker,
* verified Builder,

and excludes Owner.

Batch 4 source explicitly includes:

* Owner,
* Broker,
* Builder.

Reconcile this with the final canonical permission policy.

Do not leave an accidental Broker/Builder-only gate if Batch 4's approved visibility rule remains active.

---

# 106. REQUIREMENT FULL VIEW

Reference:

`REQ-2841`

Status:

`Active`

Title:

`Looking for: 3 BHK apartment for family, ready to move`

Posted:

`1 Jul 2026`

---

# 107. REQUIREMENT FIELDS

Exact source:

### TYPE

Buy · Apartment

### BUDGET

₹75 L – ₹95 L

### LOCATION

Satellite / Bodakdev

### TIMELINE

Within 2 months

---

# 108. REQUIREMENT DESCRIPTION

Reference:

Family of four relocating from Vadodara, orientation, minimum area, parking, school proximity and loan-preapproved context.

Use actual Requirement details.

---

# 109. REQUESTER IDENTITY MASKING

Reference:

`M****a P.`

Copy:

`Buyer · identity masked until proposal accepted`

Do not expose:

* full name,
* phone,
* email

before the approved Proposal/communication rule allows it.

---

# 110. CONTEXTUAL BUYER LABEL

`Buyer`

is a contextual requirement intent label.

Do not create a legacy `buyer` account role.

---

# 111. SEND PROPOSAL

Action:

`Send Proposal`

opens the Proposal form.

The source notes the full flow is connected to Batch 9.

---

# 112. PROPOSAL CONTEXT

Pre-fill:

* Requirement ID,
* target requester,
* Requirement summary.

User selects an eligible Property/Project according to Proposal rules.

---

# 113. PROPOSAL DUPLICATE PROTECTION

Do not create duplicate active Proposal for same:

sender

* Requirement
* proposed Listing

according to final Proposal constraints.

---

# 114. REQUIREMENT GUEST TEASER

Exact mobile concept:

* Requirement title
* Budget
* one Location
* truncated description
* Login to View Full Requirement
* visibility explanation.

---

# 115. GUEST TEASER PRIVACY

Teaser must not leak:

* full preferred Locality set if restricted,
* full description,
* requester identity,
* phone,
* exact private conditions.

---

# 116. LOGIN / REGISTER

Action opens Batch 2 Auth.

After successful login:

return to Requirement route.

Then permission is evaluated.

---

# 117. AUTHENTICATED BUT UNAUTHORIZED STATE

Do not show the same Guest teaser as though the user only needs login.

Show honest:

* Forbidden,
* role/verification requirement,

according to final permission policy.

---

# 118. REQUIREMENT PUBLIC SEARCH SAFETY

Requirement records must not become broadly public through:

* Sitemap,
* Search Engine indexing,
* public JSON endpoint.

---

# 119. REQUIREMENT SEO

Use:

Noindex

for restricted Requirement Detail.

Do not include in public Sitemap.

---

# 120. SCREEN 3 FINAL CHECKLIST

* [ ] full Detail for eligible roles
* [ ] Guest locked teaser
* [ ] Owner visibility
* [ ] Broker visibility
* [ ] Builder visibility
* [ ] unauthorized state
* [ ] Display ID
* [ ] Active badge
* [ ] Title
* [ ] Posted date
* [ ] Type
* [ ] Budget
* [ ] Locations
* [ ] Timeline
* [ ] full Description
* [ ] masked requester identity
* [ ] no private contact leak
* [ ] Send Proposal
* [ ] Batch 9 Proposal connection
* [ ] duplicate protection
* [ ] auth return flow
* [ ] Noindex
* [ ] Sitemap exclusion

---

# 121. SCREEN 4 — BROKER PUBLIC PROFILE

Canonical route:

`/broker/[slug]`

Use a real stable public slug.

---

# 122. BROKER HEADER

Reference:

KB
Kunal Bhatt
Broker
Bhatt Estate Consultants
8 years active

Use actual Broker public information.

---

# 123. CURRENT BROKER DATA GAP

Current profile foundation has:

* agency name,
* display name,
* verification status,
* public slug,
* live Properties.

But current UI lacks the complete source data needed for:

* years active,
* exact on-platform tenure.

Extend public-safe view/data.

---

# 124. CONTACT BROKER

Action:

`Contact broker`

Auth-gated.

Initial render must not contain full number.

---

# 125. BROKER SERVICE AREAS

Reference chips:

* Satellite
* Bodakdev
* Bopal
* SG Highway

Use actual:

* configured service areas,
* or safely derived real active Listing areas.

Do not fabricate.

---

# 126. BROKER ACTIVE LISTINGS COUNT

Reference:

`14 Active listings`

Use exact database count.

Current code uses the length of a bounded fetched Property list.

That can become wrong when:

* Listing count > fetch limit,
* pagination is added.

Use an exact aggregate count.

---

# 127. BROKER PLATFORM TENURE

Reference:

`8 yrs`

`On platform since 2018`

Use actual Profile/public-business dates.

---

# 128. REVIEWS STATE

Exact:

`Reviews: Coming soon`

`never faked`

Do not display:

* stars,
* rating,
* review count

without real Review data.

---

# 129. BROKER LISTINGS

Display real active public Listings.

Use pagination or load-more when needed.

Do not show only the first bounded result set without explaining pagination.

---

# 130. REPORT PROFILE

Exact source rule:

`Report profile — lives in ⋮ overflow, subtle`

Do not display a large destructive-looking Report card at the bottom as the primary profile action.

Move/keep it in the exact overflow design.

---

# 131. BROKER MOBILE

Reference:

* contextual Header
* initials/avatar
* Name
* Broker · Agency
* Listings count
* Years
* Reviews soon
* Contact Broker.

---

# 132. CONTACT DATA INITIAL RENDER

Source explicitly says:

`number never in initial render`.

Mandatory Network payload verification.

---

# 133. BROKER SEO

Public Profile:

* canonical,
* indexable according to policy,
* real descriptive metadata,
* Listing structured relationships where appropriate.

---

# 134. SCREEN 4 FINAL CHECKLIST

* [ ] public slug route
* [ ] initials/avatar
* [ ] Broker Name
* [ ] Agency
* [ ] years active
* [ ] Contact Broker
* [ ] auth gate
* [ ] no initial phone
* [ ] real service areas
* [ ] exact active Listing count
* [ ] platform tenure
* [ ] Reviews Coming Soon
* [ ] no fake stars
* [ ] public Listings
* [ ] pagination
* [ ] Report in overflow
* [ ] mobile design
* [ ] SEO

---

# 135. SCREEN 5 — BUILDER MICROSITE

Canonical route:

`/builder/[slug]`

Reference:

SD
Sankalp Developers

---

# 136. BUILDER RERA INFORMATION

Reference:

`RERA: PR/GJ/SURAT/2019/0847`

Use actual public Builder/company registration data.

Do not show a sample number.

---

# 137. BUILDER SUMMARY

Reference:

`Founded 2009 · HQ Surat · 12 projects delivered`

Use actual:

* Founded year,
* HQ/City,
* delivered Project count.

---

# 138. CURRENT BUILDER PROFILE GAP

Current Builder Profile currently derives:

* total Project count,
* City count,
* a RERA registered status indicator.

The public view does not currently provide the full source information for:

* exact RERA number,
* Founded year,
* full About text,
* delivered-count source summary.

Extend data model/view.

---

# 139. CONTACT BUILDER

Auth-gated.

No full number in initial render.

---

# 140. BUILDER TABS

Exact:

* Active projects (3)
* Completed (9)
* About

Use exact real counts.

---

# 141. CURRENT BUILDER ABOUT GAP

Current implementation passes:

`about={null}`

to Builder project tabs.

Batch 4 completion requires actual public Builder About content.

---

# 142. ACTIVE PROJECTS

Reference:

* Sankalp Grand Vista
* Sankalp Skyline
* Sankalp Business Hub

Use real published active Projects.

---

# 143. COMPLETED PROJECTS

Use actual completed/ready-to-move Project status.

Do not classify based only on publication date.

---

# 144. PROJECT TAB COUNTS

Counts must be exact database counts.

Do not derive count from a bounded first 24 Projects.

---

# 145. BUILDER ABOUT

Reference type of content:

delivered Projects, geographic focus, documentation/completion track record.

Use approved Builder profile content.

Do not publish unsupported claims.

---

# 146. BUILDER MICROSITE SEO

Metadata should use:

* Company name,
* City,
* approved public description.

No fake `best builder` claims.

---

# 147. CLAIM CTA ELIGIBILITY

Claim CTA appears only when the profile is genuinely claimable/unclaimed.

Do not show:

`Is this your business?`

on every third-party Builder Profile indiscriminately.

---

# 148. CLAIMED PROFILE

When claimed/owned:

hide Claim CTA.

---

# 149. SCREEN 5 FINAL CHECKLIST

* [ ] Builder slug
* [ ] initials/avatar
* [ ] Company Name
* [ ] actual RERA information
* [ ] Founded year
* [ ] HQ City
* [ ] delivered Project count
* [ ] Contact Builder
* [ ] auth gate
* [ ] no initial full number
* [ ] Active Projects tab
* [ ] exact Active count
* [ ] Completed tab
* [ ] exact Completed count
* [ ] About tab
* [ ] real About content
* [ ] Project cards
* [ ] claimable-state integration
* [ ] SEO

---

# 150. SCREEN 6 — OWNER PUBLIC-SAFE PROFILE

Exact design principle:

**minimal by default**

Reference:

RP
Rajesh Patel
Owner
2 active listings
Member since 2023

---

# 151. OWNER PROFILE PRIVACY

Public Owner Profile must not expose:

* phone,
* email,
* private address.

Source:

`No phone/email exposed publicly. Contact only via listing enquiry.`

Mandatory.

---

# 152. OWNER PROFILE VISIBILITY

Current data layer contains a useful privacy foundation:

Owner public-safe view returns a row only when Owner visibility permits public/semi-public exposure.

Preserve this principle.

---

# 153. PRIVATE OWNER PROFILE

Default-private Owner:

public route must return safe 404/unavailable behavior.

Do not leak existence through metadata.

---

# 154. OWNER PUBLIC ROUTE

Implement a stable safe route architecture.

Use a public slug where appropriate rather than exposing raw internal Profile UUID.

---

# 155. OWNER ACTIVE LISTING COUNT

Use exact public active count.

Do not derive from bounded first-page Listing array.

---

# 156. MEMBER SINCE

Use actual safe Profile creation/public membership date.

---

# 157. OWNER LISTINGS

If source/final profile design includes Listing entry:

show only approved public active Listings.

---

# 158. CONTACT OWNER

There is no direct Profile phone reveal.

User contacts Owner through a specific Listing enquiry.

---

# 159. OWNER PROFILE REPORTING

If profile reporting is allowed:

use subtle overflow and Screen 8 Report flow.

---

# 160. OWNER SEO

Only public/semi-public Owner profiles eligible for indexing according to SEO policy.

Private Owner profiles:

Noindex/not available.

---

# 161. CURRENT OWNER ROUTE RECONCILIATION

A public-safe Owner query foundation exists.

A complete Batch 4 Owner public screen route was not confirmed in the inspected current route implementation.

Build the full Screen 6 experience rather than leaving the data function unused.

---

# 162. SCREEN 6 FINAL CHECKLIST

* [ ] minimal Owner layout
* [ ] initials/avatar
* [ ] safe Name
* [ ] Owner label
* [ ] real active Listing count
* [ ] Member Since
* [ ] no mobile number
* [ ] no email
* [ ] no exact address
* [ ] Listing-enquiry-only contact
* [ ] privacy-level gate
* [ ] safe private-profile behavior
* [ ] exact counts
* [ ] SEO privacy consistency

---

# 163. SCREEN 7 — CLAIM PROFILE FLOW

Exact context:

`Is this your business?`

`This profile was auto-created from RERA records and is unclaimed.`

Action:

`Claim this profile`

---

# 164. CLAIM ELIGIBILITY

Show Claim CTA only when:

* target type supports Claim,
* Profile is unclaimed,
* current user is not already owner,
* no disqualifying approved Claim exists.

---

# 165. CLAIM AUTH GATE

Guest taps Claim:

Batch 2 Auth
→ return to Profile
→ continue Claim.

---

# 166. CLAIM MODAL TITLE

Reference:

`Claim "Sankalp Developers"`

Use actual Company name.

---

# 167. CLAIM ROLE OPTIONS

Exact:

* Director / Partner
* Authorized signatory
* Marketing head

Additional `Other` may exist only if approved backend supports it.

---

# 168. PROOF OF OWNERSHIP

Exact source:

`Proof of ownership *`

Upload helper:

`Upload RERA certificate or GST doc`

Allowed:

`PDF/JPG · max 10 MB`

This is required functionality.

---

# 169. CURRENT CLAIM GAP

Current implementation explicitly replaces document upload with a free-text note because storage is unavailable.

That honest temporary behavior is better than fake upload, but it does not complete Batch 4.

Batch 4 completion requires actual private proof upload.

---

# 170. CLAIM DOCUMENT STORAGE

Claim proof is private.

Use:

* private bucket/storage,
* authorised signed access,
* Verification-team access only.

Do not expose public URL.

---

# 171. CLAIM FILE VALIDATION

Server-side validate:

* MIME,
* extension,
* size ≤ 10 MB,
* allowed file types.

Do not trust browser `accept`.

---

# 172. CLAIM FILE SECURITY

Apply approved malware/security processing where infrastructure supports it.

Never inline-render unsafe arbitrary files.

---

# 173. CLAIM SUBMIT

Action:

`Submit claim for review`

Required flow:

1. authentication
2. target validation
3. claimability check
4. duplicate pending Claim check
5. role validation
6. required proof validation
7. private upload confirmation
8. Claim Request creation
9. Verification queue entry
10. Notification/Audit.

---

# 174. CLAIM REVIEW SLA

Reference:

`Reviewed by Verification team within 2 business days.`

Only display this if operationally approved.

Do not promise an SLA the team cannot meet.

---

# 175. DUPLICATE CLAIM

Same User + target with pending Claim:

do not create another.

---

# 176. CLAIM CONCURRENCY

When two different users claim the same Profile:

both may be reviewed according to policy, but only one final ownership assignment may succeed.

Use transactional final approval.

---

# 177. CLAIM ADMIN CONNECTION

Connect to Batch 11 Claim Review.

Admin must see:

* claimant,
* role,
* proof documents,
* Profile target,
* verification context.

---

# 178. CLAIM AUDIT

Record:

* request submitted,
* proof uploaded,
* review decision,
* ownership assignment.

Do not store document URL inside general public Audit metadata.

---

# 179. SCREEN 7 FINAL CHECKLIST

* [ ] unclaimed Profile condition
* [ ] Is This Your Business card
* [ ] Claim action
* [ ] auth return
* [ ] Company name
* [ ] Director/Partner
* [ ] Authorized Signatory
* [ ] Marketing Head
* [ ] Proof required
* [ ] RERA/GST proof
* [ ] PDF
* [ ] JPG
* [ ] 10 MB server limit
* [ ] private storage
* [ ] duplicate pending prevention
* [ ] Verification queue
* [ ] honest SLA
* [ ] Notification
* [ ] Audit
* [ ] Batch 11 Review integration

---

# 180. SCREEN 8 — REPORT CONTENT

Batch 4 defines:

### Desktop

Modal.

### Mobile

Bottom sheet.

Use Batch 1 Overlay patterns.

---

# 181. REPORT TITLE

Context-sensitive:

`Report this listing`

For Profile:

`Report this profile`

Use correct target noun.

---

# 182. REPORT REASONS

Exact source:

* Spam or duplicate
* Fraud / suspicious
* Incorrect information
* Inappropriate content
* Other

Use structured category keys.

---

# 183. CATEGORY RECONCILIATION

Current backend supports a broader Report category registry.

Maintain compatibility while ensuring the exact Batch 4 options appear for Listing flow.

Do not show irrelevant categories unless approved.

---

# 184. REPORT DETAILS

Field:

`Details`

Maximum length validated server-side.

---

# 185. GUEST REPORT RULE

Exact Batch 4 source:

**Guests are rate-limited to 3 reports/day.**

This conflicts with the current implementation, which:

* requires authentication,
* uses a 10/day authenticated-user cap.

The Batch 4 source rule must be implemented unless a later explicit canonical policy supersedes it.

---

# 186. GUEST REPORT ARCHITECTURE

Guest Report should create a real moderation record without requiring a fake User Profile.

Support:

* nullable reporter Profile,
* anonymous session identifier,
* privacy-safe rate-limit key,
* abuse protection.

Do not create fake Profile rows.

---

# 187. GUEST REPORT RATE LIMIT

Server-side:

maximum 3 Guest reports per approved 24-hour/day policy window.

Do not use Client localStorage as sole enforcement.

---

# 188. LOGGED-IN REPORT PROTECTION

Continue supporting:

* duplicate pending Report prevention,
* User rate limiting.

---

# 189. REPORT TARGET VALIDATION

Validate that target:

* exists,
* matches target type.

Do not accept arbitrary UUID with mismatched target.

---

# 190. REPORT SUBMIT

Action:

`Submit report`

Required:

* reason required,
* description sanitization,
* rate limit,
* duplicate policy,
* moderation queue persistence,
* success state.

---

# 191. REPORT QUEUE CONNECTION

Reports feed Batch 15 Reports/Fraud queue and related moderation workflow.

---

# 192. NO FAKE SUCCESS

If database insert fails:

do not show:

`Report submitted`.

---

# 193. REPORT MOBILE SHEET

Reference mobile list uses exact reason choices and Submit action.

Respect:

* focus,
* safe area,
* keyboard.

---

# 194. REPORT MODAL ACCESSIBILITY

Desktop:

* `role=dialog`,
* focus trap,
* Escape close,
* focus restore.

---

# 195. REPORT CURRENT RECONCILIATION

Current Report modal has real:

* category validation,
* details,
* moderation persistence,
* duplicate prevention,
* authenticated rate limiting.

Preserve those foundations.

Correct:

* Guest behavior,
* exact 3/day source rule,
* exact design placement,
* Profile Report overflow placement.

---

# 196. SCREEN 8 FINAL CHECKLIST

* [ ] desktop modal
* [ ] mobile bottom sheet
* [ ] correct target noun
* [ ] Spam/Duplicate
* [ ] Fraud/Suspicious
* [ ] Incorrect Information
* [ ] Inappropriate Content
* [ ] Other
* [ ] Details
* [ ] Guest support
* [ ] Guest 3/day server limit
* [ ] authenticated duplicate protection
* [ ] target validation
* [ ] moderation queue
* [ ] no fake success
* [ ] Batch 15 integration
* [ ] focus management
* [ ] safe-area behavior

---

# 197. SCREEN 9 — FULLSCREEN GALLERY

Exact source:

Desktop:

* full-screen dark overlay,
* current image count,
* caption,
* previous/next arrows,
* keyboard hints,
* thumbnail strip.

Mobile:

* same full-screen overlay,
* swipe,
* dot indicators,
* no thumbnail strip.

---

# 198. GALLERY REFERENCE HEADER

Reference:

`3 / 12 · Living room`

Use actual:

* current index,
* total count,
* media caption.

---

# 199. CURRENT CAPTION GAP

Current Gallery displays:

`caption coming soon`.

Batch 4 completion requires actual media caption metadata or omission when caption is missing.

Do not show production placeholder text.

---

# 200. DESKTOP KEYBOARD CONTROLS

Exact:

* Left Arrow → previous
* Right Arrow → next
* Esc → close

Mandatory.

---

# 201. DESKTOP NAVIGATION BUTTONS

Previous and Next buttons must work.

Disable/wrap behavior must follow design.

Current implementation wraps circularly; verify source expectation and keep consistent.

---

# 202. DESKTOP THUMBNAIL STRIP

Use actual image thumbnails.

Selected thumbnail visible.

Click thumbnail navigates.

---

# 203. CURRENT THUMBNAIL PLACEHOLDER GAP

Current Gallery creates empty thumbnail boxes.

Replace with real thumbnails after media pipeline is connected.

---

# 204. MOBILE SWIPE

Swipe left/right changes media.

Do not rely on dot click only.

---

# 205. MOBILE DOTS

Show dot indicators according to exact Batch 1/4 pattern.

For large image counts:

use approved compressed indicator behavior.

Do not render hundreds of dots.

---

# 206. IMAGE PRELOADING

Preload adjacent image where practical.

Do not download all high-resolution media immediately.

---

# 207. IMAGE FAILURE

Show honest retry/Unavailable media state.

Do not close entire Gallery because one image fails.

---

# 208. GALLERY FOCUS TRAP

Focus remains inside Overlay.

Close returns focus to the media tile that opened it.

---

# 209. BODY SCROLL LOCK

Background page must not scroll.

Restore previous state cleanly.

---

# 210. MOBILE ORIENTATION

Gallery remains usable in portrait and landscape.

---

# 211. GALLERY CURRENT FOUNDATION

Current implementation already provides:

* Fullscreen portal,
* Arrow keys,
* Escape,
* previous/next controls,
* touch swipe,
* desktop thumbnail structure,
* mobile dots.

Preserve this foundation.

Replace placeholder media/captions with actual data.

---

# 212. SCREEN 9 FINAL CHECKLIST

* [ ] real media URLs
* [ ] full-screen overlay
* [ ] current count
* [ ] total count
* [ ] real caption
* [ ] Left Arrow
* [ ] Right Arrow
* [ ] Esc
* [ ] previous button
* [ ] next button
* [ ] actual thumbnails
* [ ] selected thumbnail state
* [ ] mobile swipe
* [ ] mobile dots
* [ ] no mobile thumbnail strip
* [ ] adjacent preload
* [ ] image failure handling
* [ ] focus trap
* [ ] focus restore
* [ ] scroll lock
* [ ] portrait/landscape test

---

# 213. SCREEN 10 — COMPARISON PAGE

Batch 4 source defines a Property Comparison page.

Reference heading:

`COMPARE`

with sticky header behavior.

---

# 214. REFERENCE COMPARED ITEMS

Property 1:

₹85 L
3 BHK · Shrinand Residency, Satellite

Property 2:

₹92 L
3 BHK · Aaryan Heights, Bodakdev

Third column:

`Add another to compare`

`from saved or search`

---

# 215. COMPARISON ROWS

Exact Batch 4 source rows:

* Price / sq ft
* Carpet area
* Floor
* Furnishing
* Facing
* Status

Each Property has:

`Enquire`

action.

---

# 216. PRICE PER SQ FT

Compute from authoritative price and approved comparable area basis.

Do not divide by an inconsistent area type across Properties.

If Carpet Area unavailable:

follow comparison policy and show `—` rather than misleading number.

---

# 217. CARPET AREA

Use real Carpet Area.

Do not substitute Super Built-Up silently.

---

# 218. FLOOR

Reference:

`7th of 12`

Use real fields.

---

# 219. FURNISHING

Use canonical display labels.

---

# 220. FACING

Use actual Property Facing.

---

# 221. STATUS

Reference examples:

* Verified
* Pending

Use actual status semantics.

Do not expose internal moderation state inappropriately.

---

# 222. ADD ANOTHER

Action opens approved selection surface from:

* Saved Properties,
* Search.

No dead card.

---

# 223. COMPARE DATA FRESHNESS

Comparison page should resolve current public data for selected entity IDs.

Do not rely only on stale localStorage Price values.

---

# 224. UNAVAILABLE COMPARED ITEM

If an item becomes unavailable:

show safe Unavailable state.

Do not reveal hidden Listing details.

Allow Remove.

---

# 225. ENQUIRE PER ITEM

Each `Enquire` action targets the correct Property.

Do not use one generic first-item target.

---

# 226. COMPARISON MOBILE

Exact source:

* columns horizontally scroll,
* specification-label column pinned left.

Mandatory.

---

# 227. PINNED LABEL COLUMN

The attribute column remains visible during horizontal item scroll.

Use intentional sticky positioning.

---

# 228. PAGE-LEVEL OVERFLOW PROHIBITION

Only Comparison table scrolls horizontally.

The full page must not.

---

# 229. BATCH 4 CAPACITY

Batch 4 source says:

`max 3 items`.

---

# 230. BATCH 17 LATER OVERRIDE

Batch 17 later defines final advanced Comparison maximum:

`max 4 items`.

Conflict resolution:

* Batch 4 defines the Detail Comparison screen structure.
* Batch 17 is the later explicit global Comparison-capacity authority.
* Final combined system after Batch 17 must support maximum 4.
* Do not let an earlier Batch 4 implementation later revert the Batch 17 max-4 rule.

During Batch 4 phase testing, preserve source layout behavior and ensure architecture can support the later fourth column.

---

# 231. CURRENT COMPARISON FOUNDATION

Current implementation already provides:

* persistent localStorage state,
* public-safe Compare item summary,
* Compare Tray,
* `/compare`,
* Noindex,
* up to 4 items.

Preserve compatible foundations.

Batch 4 screen still requires:

* exact Comparison design,
* exact source rows,
* current-data revalidation,
* pinned attribute column,
* Add Another from Saved/Search,
* correct per-item Enquire action.

---

# 232. CURRENT GENERIC COMPARISON GAP

Current Comparison only renders generic rows:

* Price
* Location
* Type
* Details.

Replace with exact meaningful comparison specifications.

---

# 233. COMPARISON SEO

Comparison is personal/transient state.

Keep:

Noindex.

Do not include in Sitemap.

---

# 234. SCREEN 10 FINAL CHECKLIST

* [ ] sticky Compare header
* [ ] real Property 1
* [ ] real Property 2
* [ ] Add Another
* [ ] Saved source
* [ ] Search source
* [ ] Price/sq ft
* [ ] Carpet Area
* [ ] Floor
* [ ] Furnishing
* [ ] Facing
* [ ] Status
* [ ] `—` for missing value
* [ ] per-item Enquire
* [ ] current-data revalidation
* [ ] unavailable item state
* [ ] mobile horizontal scroll
* [ ] pinned specification column
* [ ] no page overflow
* [ ] Batch 17 max-4 compatibility
* [ ] Noindex

---

# 235. DATA MODEL — PROPERTY DETAIL

Property Detail requires safe fields for:

* title,
* slug,
* description,
* purpose,
* category,
* Property type,
* price/rent,
* negotiable,
* area values/types,
* bedrooms,
* bathrooms,
* balconies,
* floor,
* total floors,
* furnishing,
* possession,
* availability,
* facing,
* parking,
* amenities,
* canonical Location IDs/text,
* approximate coordinates,
* media relationships,
* publication state,
* availability state,
* poster relation,
* contact visibility.

---

# 236. PROPERTY UNAVAILABLE DATA MODEL

Support safe historical availability metadata:

* became unavailable at,
* availability reason/status,
* safe public tombstone flag.

Do not require access to the full private row for tombstone rendering.

---

# 237. PROJECT DETAIL DATA MODEL

Support:

* Project identity,
* Builder relationship,
* pricing,
* Unit configurations,
* Inventory,
* possession,
* milestones,
* Amenities,
* public media,
* Video media,
* 360 Provider URL/config,
* Brochure PDF,
* RERA registration,
* RERA verification state,
* Location.

---

# 238. PROJECT MILESTONE DATA MODEL

At minimum:

* Project ID,
* milestone key,
* label,
* state,
* percent,
* completed at,
* target date,
* order.

---

# 239. REQUIREMENT DETAIL DATA MODEL

Support:

* Display ID,
* title,
* purpose,
* category,
* Requirement type,
* budget/rent range,
* preferred Location IDs,
* timeline,
* Description,
* requester relationship,
* visibility state,
* publication state.

---

# 240. PUBLIC PROFILE DATA MODEL

Broker public view requires:

* public slug,
* safe display name,
* Agency name,
* active-since/founded date,
* platform-join date,
* verification state,
* service areas,
* exact active Listing count.

Builder public view requires:

* public slug,
* Company name,
* Company type,
* Founded year,
* HQ Location,
* RERA data,
* public About,
* active Project count,
* completed Project count.

Owner public-safe view requires:

* safe display name,
* avatar,
* membership date,
* public visibility state,
* exact active Listing count.

---

# 241. CLAIM DATA MODEL

Support:

* Request ID,
* requester Profile,
* target type,
* target Profile/business,
* claimed role,
* proof media relations,
* optional Note,
* status,
* reviewer,
* decision reason,
* timestamps.

---

# 242. REPORT DATA MODEL

Support both:

* authenticated reporter,
* approved anonymous Guest reporting path.

Fields:

* target type,
* target ID,
* category,
* description,
* reporter Profile nullable,
* anonymous abuse-control identity reference,
* status,
* priority,
* timestamps.

---

# 243. MEDIA DATA MODEL

Public media requires:

* owner entity type,
* entity ID,
* media ID,
* storage key,
* public delivery variant,
* MIME,
* dimensions,
* file size,
* caption,
* category/room,
* sort order,
* cover flag.

---

# 244. CONTACT REVEAL DATA MODEL

Use immutable Reveal event/history supporting:

* requester,
* target contact owner,
* target entity,
* policy basis,
* revealed at,
* quota usage where applicable.

---

# 245. PUBLIC VIEW SECURITY

Public database views must:

* omit private phone/email,
* omit private documents,
* include only eligible public entity states,
* use safe Location fields.

Do not use `select *`.

---

# 246. RLS — PROPERTY

Test:

Guest can read approved public Property fields.

Guest cannot read:

* private Profile mobile,
* Lead records,
* private documents.

---

# 247. RLS — PROJECT

Guest can read approved public Project fields.

Cannot read:

* private Builder account data,
* private internal Unit management data.

---

# 248. RLS — REQUIREMENT

Guest:

teaser comes from explicitly safe data path.

Full Requirement:

only eligible authenticated roles according to final source rule.

Do not rely only on frontend hidden sections.

---

# 249. RLS — CLAIM DOCUMENTS

Only:

* Claim owner where appropriate,
* authorised Verification Staff

may read proof.

Public denied.

---

# 250. RLS — REPORTS

Reporter may submit according to authenticated/Guest route policy.

Normal public user cannot read moderation queue.

---

# 251. CONTACT REVEAL RACE CONDITION

Concurrent Reveal requests must not consume quota twice or produce conflicting approval states.

Use atomic logic.

---

# 252. CONTACT REVEAL IDEMPOTENCY

Revealing an already revealed contact should return existing authorised result without duplicate quota charge.

---

# 253. LEAD CREATION TRANSACTION SAFETY

Enquiry creation may involve:

* Lead,
* CRM event,
* Notification.

Use transaction/RPC or durable recoverable orchestration.

---

# 254. PROPOSAL CONNECTION

Requirement Send Proposal must connect to the same Proposal system used in:

* Batch 7,
* Batch 8,
* Batch 9.

No duplicate Proposal subsystem.

---

# 255. SITE VISIT CONNECTION

Project Site Visit action connects to the same Batch 9 Visit system.

No independent Project appointment table.

---

# 256. CLAIM REVIEW CONNECTION

Claim Request connects to Batch 11.

No disconnected manual email-only process.

---

# 257. REPORT REVIEW CONNECTION

Report goes to Batch 15 review queues.

No data sink.

---

# 258. MAP PROVIDER CONNECTION

Map states use Batch 13 Provider status.

No fake Provider connection.

---

# 259. MEDIA PROVIDER CONNECTION

Media and proof storage requirements must be added to the final external-provider/setup requirements document.

Do not hide missing storage dependency.

---

# 260. SEO — PROPERTY

Metadata:

* real title,
* safe Location,
* safe description,
* canonical.

Structured data uses only real facts.

---

# 261. SEO — PROJECT

Metadata:

* Project name,
* Location,
* Builder where safe,
* approved description.

Do not add fake ratings/reviews.

---

# 262. SEO — BROKER/BUILDER

Use safe public business/profile information.

No:

* fake rating,
* fake Review count,
* unsupported superlatives.

---

# 263. SEO — OWNER

Respect privacy visibility.

Do not index private Owner profiles.

---

# 264. REQUIREMENT SEO

Restricted Requirement pages:

Noindex.

Exclude from Sitemap.

---

# 265. COMPARISON SEO

Noindex.

Exclude from Sitemap.

---

# 266. LOADING STATES

Required for:

* Property Detail,
* Project Detail,
* Requirement Detail,
* Profile Lists,
* Claim submission,
* Report submission,
* Gallery media,
* Comparison data refresh.

Use screen-specific skeletons.

---

# 267. PROPERTY EMPTY STATES

Examples:

* No photos yet,
* No Amenities provided,
* no Similar Properties.

Use honest states.

---

# 268. PROJECT EMPTY STATES

Required:

* no Floor Plans,
* no Amenities,
* no Video,
* Tour Setup Required,
* no similar Projects,
* Brochure unavailable.

---

# 269. PROFILE EMPTY STATES

Broker:

`No published listings yet`

Builder:

No Active Projects / No Completed Projects.

Do not fabricate cards.

---

# 270. ERROR STATES

Required:

* Property load error,
* Project load error,
* Requirement permission error,
* Similar query error,
* Save error,
* Reveal error,
* Enquiry error,
* Proposal entry error,
* Claim upload error,
* Claim submit error,
* Report error,
* Gallery media error,
* Compare data refresh error.

---

# 271. TEXT WRAPPING VERIFICATION

Explicitly inspect:

* Property titles,
* Project names,
* Builder Company names,
* Broker Agency names,
* long Locations,
* RERA numbers,
* Requirement titles,
* Claim Company names,
* Report reason labels,
* Gallery captions.

Fix:

* clipping,
* overlap,
* accidental button wrapping.

Do not randomly shrink typography.

---

# 272. RESPONSIVE MATRIX

Test:

* 360px
* 390px
* 768px
* tablet landscape
* 1280px
* wide desktop

for all 10 screens.

---

# 273. PROPERTY MOBILE RESPONSIVE CHECK

Verify:

* Header title,
* media,
* counter,
* price,
* badges,
* facts,
* Owner card,
* Description,
* Read More,
* sticky CTA.

---

# 274. PROJECT MOBILE RESPONSIVE CHECK

Verify:

* Header,
* Hero,
* tabs,
* unit cards,
* Brochure,
* Call,
* Enquire.

---

# 275. REQUIREMENT MOBILE RESPONSIVE CHECK

Guest teaser must match source.

Eligible authenticated full view must remain readable.

---

# 276. PROFILE MOBILE RESPONSIVE CHECK

Verify exact hierarchy for:

* Broker,
* Builder,
* Owner.

---

# 277. CLAIM MOBILE RESPONSIVE CHECK

Desktop modal becomes mobile bottom sheet where appropriate.

File upload remains reachable with keyboard.

---

# 278. REPORT RESPONSIVE CHECK

Desktop modal.

Mobile bottom sheet.

---

# 279. GALLERY RESPONSIVE CHECK

Desktop:

thumbnail strip.

Mobile:

swipe and dots.

---

# 280. COMPARISON RESPONSIVE CHECK

Internal horizontal scroll.

Pinned label column.

No full-page horizontal scroll.

---

# 281. STICKY CTA SAFE AREA

All mobile sticky CTA bars must respect:

`env(safe-area-inset-bottom)`.

---

# 282. COMPARE/TRAY CTA COLLISION

Where Compare Tray exists:

it must not block:

* Call,
* Enquire,
* mobile navigation.

Use the final Batch 17 offset/priority rules.

---

# 283. TOUCH TARGETS

Mobile actions should provide practical minimum ~44px targets.

Especially:

* Back,
* Overflow,
* Save,
* close Gallery,
* dots where interactive,
* CTA buttons.

---

# 284. NO DEAD UI RULE

Every visible control must work.

Includes:

* Breadcrumb links,
* View All Photos,
* Gallery images,
* Read More,
* Map,
* Similar cards,
* Reveal Number,
* Enquire Now,
* Share,
* Save,
* Report,
* Project Tabs,
* Unit interest,
* Site Visit,
* Brochure View,
* Builder Microsite,
* Send Proposal,
* Contact Broker,
* Contact Builder,
* Profile overflow,
* Claim Profile,
* Proof Upload,
* Submit Claim,
* Report Reason,
* Submit Report,
* Gallery arrows,
* Gallery thumbnails,
* Gallery dots,
* Compare Add Another,
* Compare Enquire.

No:

`href="#"`

No empty event handler.

---

# 285. PROPERTY LIVE REGRESSION FLOW

Execute:

Guest opens Search
→ opens Property
→ verifies Breadcrumb
→ verifies real Gallery
→ taps View All
→ navigates Gallery
→ closes
→ taps Reveal
→ Auth sheet opens
→ completes OTP
→ returns to same Property
→ explicit Reveal flow executes
→ inspect Network before Reveal and confirm no full number
→ inspect successful Reveal response
→ Call action works
→ Enquire Now
→ create one Lead
→ double click/retry
→ confirm one Inquiry
→ Save
→ refresh
→ Saved state persists
→ Share
→ Report as Guest fixture
→ verify Guest rate limit architecture
→ inspect moderation queue
→ mark Property Sold in owner workflow
→ reopen public URL
→ verify safe unavailable tombstone
→ open Similar Property.

---

# 286. PROJECT LIVE REGRESSION FLOW

Open Project
→ verify actual RERA state
→ switch Overview
→ Floor Plans
→ Amenities
→ Location
→ Gallery
→ Video
→ 360 Tour
→ verify honest missing Provider states
→ inspect real Unit configurations
→ inspect Construction milestones
→ select 3 BHK interest
→ Enquire
→ verify Lead context preserves interest
→ request Site Visit
→ verify Batch 9 Visit context
→ open Brochure PDF
→ open Builder Microsite.

---

# 287. REQUIREMENT LIVE REGRESSION FLOW

Guest opens Requirement URL
→ sees locked teaser only
→ inspect Network for private requester data
→ Login
→ return to same route
→ test Owner permission
→ test Broker permission
→ test Builder permission
→ test unauthorized/inactive account
→ eligible user views full details
→ requester remains masked
→ Send Proposal
→ Batch 9 Proposal form opens
→ submit Proposal fixture
→ verify connection.

---

# 288. BROKER PROFILE LIVE REGRESSION

Open Broker Profile
→ verify exact active Listing count
→ verify actual service areas
→ verify tenure
→ Reviews Coming Soon
→ inspect initial payload for phone leak
→ Contact Broker
→ authenticate/reveal according to policy
→ open Listing
→ return
→ Report Profile through overflow.

---

# 289. BUILDER PROFILE LIVE REGRESSION

Open Builder Microsite
→ verify RERA data
→ Founded year
→ HQ
→ Delivered count
→ Active count
→ Completed count
→ About content
→ open Active Project
→ return
→ Contact Builder
→ inspect privacy behavior.

For an unclaimed fixture:

Claim Profile
→ authenticate
→ select role
→ upload valid PDF
→ submit
→ verify Claim queue.

---

# 290. OWNER PROFILE LIVE REGRESSION

Public/semi-public Owner:

route opens minimal safe profile.

Inspect Network:

no phone/email.

Private Owner:

safe not-found behavior.

Open Listing from allowed public context.

Contact only through Listing enquiry.

---

# 291. CLAIM UPLOAD TEST MATRIX

Test:

* valid PDF under 10 MB
* valid JPG under 10 MB
* file over 10 MB
* unsupported executable
* MIME spoof
* duplicate pending Claim.

Only valid claims submit.

---

# 292. REPORT RATE-LIMIT TEST

Guest test identity:

Report 1 → accepted
Report 2 → accepted
Report 3 → accepted
Report 4 within policy window → blocked.

Confirm only three queue records.

---

# 293. REPORT DUPLICATE TEST

Authenticated user submits same target/category repeatedly.

Verify duplicate pending policy.

---

# 294. PHONE LEAK TEST

Before Reveal inspect:

* HTML source,
* RSC payload,
* Network,
* Client props,
* hidden links.

Full number must not exist.

---

# 295. GALLERY MEDIA AUTH TEST

Attempt arbitrary media ID belonging to:

* Draft Property,
* another private entity.

Public Gallery access denied/not resolved.

---

# 296. COMPARISON PERSISTENCE TEST

Add Property A
→ Search pagination
→ add Property B
→ open Detail
→ open Compare
→ verify both.

After Batch 17:

test items 1–4
→ attempt 5
→ visible limit feedback.

---

# 297. MULTI-ROLE PERMISSION MATRIX

Test:

## Guest

Can:

* public Property,
* public Project,
* public Broker/Builder Profile,
* public-safe Owner Profile,
* locked Requirement teaser,
* approved Guest Report flow.

Auth-gated:

* contact Reveal,
* Enquiry,
* Contact Profile,
* Claim submission.

## Owner

Can:

* public content,
* eligible Requirement full view according to source rule,
* communication actions according to canonical permissions.

## Broker

Can:

* public content,
* eligible Requirement full view,
* Send Proposal,
* communication actions according to policy.

## Builder

Can:

* public content,
* eligible Requirement full view,
* Send Proposal,
* Project communication actions.

## Staff/Admin

Public screens behave normally.

Private moderation functionality remains in Admin routes.

---

# 298. CURRENT REPOSITORY RECONCILIATION — PROPERTY

Useful current foundations:

* public-safe Property view
* Metadata
* Breadcrumb component
* Similar query
* Save
* Recently Viewed
* Inquiry lookup
* CTA
* Overflow actions.

Required correction:

* canonical Location breadcrumb
* actual media URLs
* actual poster safe data
* explicit Reveal before full number
* remove full phone initial payload possibility
* exact unavailable tombstone
* source-accurate mobile layout
* stronger Similar ranking.

---

# 299. CURRENT REPOSITORY RECONCILIATION — PROJECT

Useful foundations:

* Project Detail route
* Project Hero
* Unit configuration rendering
* Amenities
* Location
* Gallery structure
* Similar Projects
* CTA
* Builder link.

Required correction:

* true RERA Verified semantics
* Video tab
* 360 Tour tab
* real media
* real Brochure PDF
* real Builder Project count
* milestone-level Construction Progress
* remove synthetic fixed status percentage behavior
* exact source mobile hierarchy.

---

# 300. CURRENT REPOSITORY RECONCILIATION — REQUIREMENT

Current Search foundation has Requirement public-safe view and strict role gate.

Required:

* actual Detail route/screen
* exact Guest teaser
* Owner/Broker/Builder visibility reconciliation
* masked identity
* Send Proposal.

A complete Batch 4 Requirement Detail route was not confirmed in the inspected current route implementation.

---

# 301. CURRENT REPOSITORY RECONCILIATION — BROKER

Useful current foundations:

* Broker public route
* public view
* live Listings
* contact button
* service-area derivation
* Reviews Soon state
* Claim card
* Report.

Required:

* exact active count aggregate
* actual tenure
* exact Agency/profile styling
* auth-gated explicit contact privacy
* Report in subtle overflow
* claim eligibility condition.

---

# 302. CURRENT REPOSITORY RECONCILIATION — BUILDER

Useful current foundations:

* Builder public route
* Project query
* active/completed split
* contact button
* claim/report foundations.

Required:

* real RERA number/details
* Founded year
* HQ
* delivered count
* exact tab counts
* About content
* unclaimed-only Claim CTA.

---

# 303. CURRENT REPOSITORY RECONCILIATION — OWNER

Useful foundation:

public-safe Owner query with privacy-level gate.

Required:

* complete public route
* minimal source layout
* exact active count
* safe Member Since
* no phone/email.

---

# 304. CURRENT REPOSITORY RECONCILIATION — CLAIM

Current flow honestly creates a real Claim Request but substitutes free-text proof because Storage is not wired.

Batch 4 completion requires:

* real required proof upload
* private storage
* Review access.

---

# 305. CURRENT REPOSITORY RECONCILIATION — REPORT

Current flow provides real:

* authenticated submission,
* category validation,
* duplicate pending protection,
* moderation queue persistence.

Required source reconciliation:

* Guest reports,
* 3/day Guest rate limit,
* exact overlay design,
* Batch 15 queue connection.

---

# 306. CURRENT REPOSITORY RECONCILIATION — GALLERY

Current implementation already has:

* desktop grid structure,
* mobile structure,
* Fullscreen Overlay,
* keyboard navigation,
* swipe,
* dots,
* thumbnail layout.

Missing:

* actual media resolver,
* real thumbnails,
* real captions.

---

# 307. CURRENT REPOSITORY RECONCILIATION — COMPARISON

Current implementation already has:

* persistent state,
* Tray,
* max 4,
* Compare route,
* Noindex.

Required:

* Batch 4 exact table rows,
* current record revalidation,
* Add from Saved/Search,
* pinned label column,
* correct per-item actions,
* final Batch 17 capacity behavior.

---

# 308. BUILD VERIFICATION STANDARD

After every implementation phase:

1. run Build
2. run TypeScript check
3. run Lint where configured
4. start actual app
5. test Guest
6. test Owner
7. test Broker
8. test Builder
9. inspect public Network payload
10. inspect contact privacy
11. inspect database writes
12. inspect Lead creation
13. inspect Proposal connection
14. inspect Site Visit connection
15. inspect Claim queue
16. inspect Report queue
17. inspect media access
18. refresh and verify persistence
19. test 390px
20. test tablet
21. test 1280px
22. inspect Console
23. inspect failed requests
24. inspect horizontal overflow.

Static code review is not PASS.

---

# 309. MANUAL VISUAL VERIFICATION

Compare directly with actual Batch 4 design source.

Inspect:

### Property

* breadcrumb,
* Gallery proportions,
* Price,
* Title,
* facts,
* Description spacing,
* Amenities,
* Map fallback,
* Similar cards,
* Owner card,
* mobile Carousel,
* sticky CTA,
* unavailable page.

### Project

* Hero,
* RERA badge,
* Tabs,
* unit cards,
* progress,
* media Setup states,
* enquiry card,
* Brochure,
* Builder card,
* mobile sticky CTA.

### Requirement

* full Detail,
* masked identity,
* Guest teaser.

### Profiles

* Broker,
* Builder,
* Owner.

### Other

* Claim card/modal,
* Report modal/sheet,
* Fullscreen Gallery,
* Compare table.

`Almost the same` is not PASS.

---

# 310. COMPLETION BLOCKERS

Batch 4 must not be marked complete while any of these remain:

* Property phone is present in initial Client payload,
* login immediately exposes full phone without explicit Reveal,
* Property poster name is fake/generic when source requires real data,
* Gallery remains placeholder-only,
* Gallery captions say Coming Soon in production,
* Property Sold route returns soft 404 instead of designed unavailable state,
* Similar Property logic ignores relevant locality context entirely,
* Map Provider missing shows broken Map,
* Project RERA Registered is mislabeled Verified,
* Project Video tab missing,
* Project 360 Tour tab missing,
* Brochure View missing,
* brochure represented as image,
* Construction Progress uses synthetic fixed percentages as though real,
* Project Builder count missing,
* Requirement Detail missing,
* Owner excluded despite active Batch 4 visibility rule,
* Guest teaser leaks private Requirement data,
* requester identity exposed before Proposal permission,
* Broker active Listing count derived only from bounded fetched page,
* Broker tenure fake/missing,
* fake Reviews displayed,
* Builder Founded year missing,
* Builder HQ missing,
* Builder delivered count fake/missing,
* Builder About null,
* Claim CTA shown on already-claimed Profiles,
* Claim proof upload replaced permanently by text note,
* Claim proof stored publicly,
* Guest Report source behavior not implemented,
* Guest rate limit not server-side,
* Report submits to nowhere,
* Gallery thumbnails remain fake placeholders,
* Comparison uses only generic Price/Location/Type/Details rows,
* mobile Compare label column not pinned,
* Compare data stays stale after Property removal,
* dead action,
* `href="#"`,
* text clipping,
* CTA overlap,
* mobile safe-area bug,
* private phone/email leak,
* Draft/Pending entity data exposed publicly,
* no live multi-role verification.

---

# 311. FINAL ACCEPTANCE STATEMENT

**Design Batch 4 — Detail Pages + Public Profiles is complete only when all 10 screen groups are implemented according to the exact design source, connected to real application workflows and verified through real browser and database behavior.**

Completion requires:

* complete Property Detail,
* canonical breadcrumb,
* real Gallery Grid,
* real public media,
* View All Photos,
* actual Price,
* real verification state,
* Property Title,
* exact Location context,
* Posted date,
* Key Facts,
* Description,
* Read More,
* Amenities,
* Map Active state,
* Map Setup Required fallback,
* Similar Properties,
* public-safe poster identity,
* masked phone,
* explicit server-authorised Reveal,
* no full number before Reveal,
* Enquire Now,
* Auth return flow,
* Lead creation,
* duplicate prevention,
* Share,
* Save,
* Report,
* mobile contextual Header,
* mobile swipe Carousel,
* sticky Call,
* sticky Enquire,
* unavailable Property tombstone,
* Similar alternatives,
* filtered Browse All action,
* complete Project Detail,
* Project Hero,
* real RERA semantics,
* Overview,
* Floor Plans,
* Amenities,
* Location,
* Gallery,
* Video,
* 360 Tour,
* real Unit Inventory integration,
* real Construction milestones,
* honest Provider/media states,
* Similar Projects,
* Project Enquiry,
* selected configuration interest,
* Site Visit connection,
* real Brochure PDF,
* Builder Mini Card,
* real Project count,
* complete Requirement Detail,
* Owner/Broker/Builder visibility,
* Guest locked teaser,
* masked requester identity,
* Send Proposal,
* Batch 9 Proposal connection,
* complete Broker Public Profile,
* real service areas,
* exact active count,
* real tenure,
* Reviews Coming Soon with no fake rating,
* Contact Broker privacy,
* complete Builder Microsite,
* real RERA data,
* Founded year,
* HQ,
* real delivered count,
* Active/Completed tabs,
* exact counts,
* public About,
* Contact Builder privacy,
* complete Owner public-safe Profile,
* privacy-level gate,
* exact active Listing count,
* Member Since,
* no public phone/email,
* Claim CTA only on eligible unclaimed Profiles,
* Role selection,
* required RERA/GST proof,
* private PDF/JPG upload,
* 10 MB validation,
* Claim Review queue,
* Report desktop modal,
* Report mobile bottom sheet,
* exact Report reasons,
* Details,
* real Guest report path,
* 3/day Guest rate limit,
* moderation queue,
* Fullscreen Gallery,
* image count,
* real captions,
* keyboard navigation,
* real thumbnail strip,
* mobile swipe,
* mobile dots,
* full Comparison page,
* exact Comparison rows,
* Add Another from Saved/Search,
* current public data,
* unavailable-item handling,
* per-item Enquire,
* mobile horizontal scroll,
* pinned specification column,
* Batch 17 max-4 compatibility,
* privacy-safe public views,
* complete RLS enforcement,
* complete SEO behavior,
* complete Sitemap behavior,
* no fake data,
* no private data leakage,
* no dead controls,
* complete mobile verification,
* complete tablet verification,
* complete desktop verification,
* complete Guest/Owner/Broker/Builder regression.

Required implementation sequence:

**Property Detail → verify → Unavailable Property → verify → Project Detail → verify → Requirement Detail → verify → Broker Profile → verify → Builder Microsite → verify → Owner Public Profile → verify → Claim Flow → verify → Report Flow → verify → Fullscreen Gallery → verify → Comparison → verify → complete Privacy/Auth/Lead/Proposal/Site Visit multi-role regression.**

No Batch 4 screen passes merely because it renders.

**Exact Design + Public Data Safety + Contact Privacy + Real Media + Lead Integrity + Requirement Visibility + Proposal Connection + Public Profile Integrity + Claim Verification Integrity + Report Integrity + Gallery Functionality + Comparison Accuracy + Responsive Behavior + Live Multi-Role Verification must all pass.**
