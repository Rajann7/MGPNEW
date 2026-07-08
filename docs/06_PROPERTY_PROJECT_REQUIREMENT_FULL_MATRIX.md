# docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md

# My Gujarat Property — Property, Project And Requirement Full Matrix

This document defines the complete **Property**, **Project** and **Requirement** system for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 4, 5, 8). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

**Posting wizards**
* **Post Property = 9 steps** (Basics → Type & Purpose → Price & Area → Location → Amenities → Media → Contact → Preview → Submitted). Any "5-step" reference is wrong — use 9. Desktop stepped header shows a "+3" overflow indicator when steps exceed 6.
* **Post Project = 10 steps**; RERA number uses a Gujarat format mask with live validation ("PR/GJ/CITY/YYYY/NNNN") + honest "RERA registration pending" toggle; project cannot go live without RERA verification or an admin-flagged exception; submit shows a combined **"Pending · RERA check"** badge. Wings/Towers/Units step auto-computes total units and feeds the Unit Inventory grid.
* **Post Requirement = 7 steps**. **Requirements REQUIRE team approval before public display (add a Pending state)** — do NOT go live immediately. Extras: "Loan pre-approved" checkbox, "Up to 5 localities across cities" cap, "How should brokers reach you?" radio (in-app proposals only / calls OK).
* Media step: cover-image selection, drag-reorder (long-press on mobile), tap-scissors crop, per-file upload %, min-photo helper + growth nudge ("5+ photos get 2x more views"); brochure stored as PDF, never converted to image; 360°/video empty → honest "Setup Required" tab, never a broken embed.
* Preview renders the exact public detail layout in a "PREVIEW — not yet live" frame with per-block Edit links. Draft re-entry card ("6 of 9 steps · saved 2 hrs ago"). Edit-after-approval is a confirm dialog ("Editing will require re-approval; stays live with previous data until approved").
* Contact step: inline "Verified" check in phone field; preferred-contact-time chips; "your number stays hidden until you approve a reveal".

**Unit inventory (Builder)**
* Statuses: Available / Booked / Sold / **On Hold (4th status, blue)**. Desktop table with sticky header + sticky bulk-action bar (Mark Booked / Sold / On Hold / Adjust price); genuine mobile accordion Wing→Floor→52px unit rows (not a shrunk table). Unit edit modal has an **"Override base price" checkbox** with base-price context ("override shows on listing").

**Detail pages**
* Property detail: masked phone revealed only via action; sold/rented/expired = full unavailable variant with concrete reason/date + scoped browse CTA (no soft-404). Gallery counter carries a per-photo room caption ("3/12 · Living room").
* Comparison surfaces verification **Status as a spec row** (Verified vs Pending); comparison mixes resale (Contact Owner, RERA "—") vs project (Enquire, RERA Verified) with correct per-type CTAs.
* Requirement identity is **masked until proposal accepted**; guest sees a blurred/locked teaser ("Login to view full requirement"). Featured/boosted listings show an "⚡ FEATURED until <date>" chip (a paid metered slot — see doc 09).

Claude must read this file before implementing property posting, project posting, requirement posting, listing forms, approval workflows, public detail pages, search cards, dashboard listing management, media upload, contact privacy, location hierarchy, RLS policies, admin moderation or related SQL migrations.

No property/project/requirement feature can be marked complete unless this matrix is followed and verified.

No fake listing data is allowed.

No hidden contact leak is allowed.

No project can include PG/hostel/room.

No builder can post normal property unless future approved rule changes.

No owner/broker can post project.

---

## 1. Purpose

This file defines:

* property system
* builder project system
* requirement system
* role permissions
* category matrix
* purpose matrix
* field matrix
* type-based dynamic forms
* approval workflow
* draft workflow
* edit/update lifecycle
* pause/resume lifecycle
* delete/soft delete lifecycle
* location hierarchy
* media upload rules
* image rules
* video rules
* brochure/PDF rules
* floor plan rules
* 360/virtual tour rules
* contact visibility
* hidden contact privacy
* inquiry and lead creation
* detail page rules
* dashboard management rules
* admin moderation rules
* RLS/security rules
* billing/subscription gates
* verification/RERA gates
* SEO rules
* performance rules
* manual verification rules

This file is the full marketplace content matrix.

---

## 2. Main Entity Types

The platform has three core marketplace posting entities.

| Entity      | Who Can Post           | Public Listing Type         | Main Purpose                  |
| ----------- | ---------------------- | --------------------------- | ----------------------------- |
| Property    | Owner, Broker/Agent    | individual property listing | sell/rent/list                |
| Project     | Builder/Developer only | builder/developer project   | sell/rent project units       |
| Requirement | Owner, Broker/Agent    | buying/renting requirement  | ask/search/matching/proposals |

Important:

* Builder can post **Project** only.
* Owner/Broker can post **Property** and **Requirement**.
* Project must not contain PG/hostel/room.
* Requirement may reference property/project interest but is not a listing.
* All create/edit content requires approval where defined.
* Pause/resume does not require approval if content is not changed.
* Public search must show approved/published content only.

---

## 3. Role Permission Matrix

## 3.1 Create Permissions

| Action                   | Guest |    Owner | Broker/Agent | Builder/Developer |        Admin/Staff |
| ------------------------ | ----: | -------: | -----------: | ----------------: | -----------------: |
| Create property          |    No |      Yes |          Yes |                No | Admin-managed only |
| Create project           |    No |       No |           No |               Yes | Admin-managed only |
| Create requirement       |    No |      Yes |          Yes |     No by default | Admin-managed only |
| Save draft property      |    No |      Yes |          Yes |                No |       If permitted |
| Save draft project       |    No |       No |           No |               Yes |       If permitted |
| Save draft requirement   |    No |      Yes |          Yes |     No by default |       If permitted |
| Submit for approval      |    No | Own only |     Own only |          Own only |        Review side |
| Edit own property        |    No |      Yes |          Yes |                No |       If permitted |
| Edit own project         |    No |       No |           No |               Yes |       If permitted |
| Edit own requirement     |    No |      Yes |          Yes |     No by default |       If permitted |
| Pause/resume own listing |    No |      Yes |          Yes |               Yes |       If permitted |
| Delete own listing       |    No |      Yes |          Yes |               Yes |       If permitted |
| Moderate/approve         |    No |       No |           No |                No |   Yes if permitted |

---

## 3.2 Public Viewing Permissions

| Entity               |                                    Guest | Logged-in Public User | Owner/Broker/Builder Owner |      Staff/Admin |
| -------------------- | ---------------------------------------: | --------------------: | -------------------------: | ---------------: |
| Approved property    |                          Yes public-safe |       Yes public-safe |          Yes if public/own | Yes if permitted |
| Draft property       |                                       No |                    No |                   Own only | Yes if permitted |
| Pending property     |                                       No |                    No |                   Own only | Yes if permitted |
| Rejected property    |                                       No |                    No |                   Own only | Yes if permitted |
| Approved project     |                          Yes public-safe |       Yes public-safe |          Yes if public/own | Yes if permitted |
| Draft project        |                                       No |                    No |                   Own only | Yes if permitted |
| Pending project      |                                       No |                    No |                   Own only | Yes if permitted |
| Approved requirement | Limited/scoped if public strategy allows |                Scoped |                Own/allowed | Yes if permitted |
| Private requirement  |                                       No |                    No |                   Own only | Yes if permitted |

---

## 3.3 Forbidden Role Actions

These are hard rules.

| Role                     | Forbidden                                       |
| ------------------------ | ----------------------------------------------- |
| Guest                    | create/edit/manage any marketplace entity       |
| Owner                    | post project                                    |
| Broker/Agent             | post project                                    |
| Builder/Developer        | post normal property                            |
| Builder/Developer        | post PG/hostel/room as project                  |
| Any public user          | edit another user’s entity                      |
| Any public user          | approve/reject own listing                      |
| Any public user          | bypass plan/approval/verification gates         |
| Any public user          | view private docs of others                     |
| Any public user          | reveal hidden contact without authorization     |
| Staff without permission | approve/reject/export/private doc access        |
| Admin without permission | manage provider/payment/security-sensitive data |
| Super Admin              | high-risk actions without audit                 |

---

## 4. Entity Status Values

Use consistent status values.

## 4.1 Content Lifecycle Status

Allowed content statuses:

| Status             | Meaning                                          |
| ------------------ | ------------------------------------------------ |
| `draft`            | user saved but not submitted                     |
| `pending_approval` | submitted and waiting for review                 |
| `under_review`     | admin/staff reviewing                            |
| `need_changes`     | reviewer requested changes                       |
| `rejected`         | rejected by reviewer                             |
| `published`        | approved and public                              |
| `paused`           | temporarily hidden by owner/broker/builder/admin |
| `expired`          | expired due to date/plan/status                  |
| `archived`         | archived from active management                  |
| `deleted`          | soft deleted                                     |
| `blocked`          | blocked due to fraud/legal/security issue        |

---

## 4.2 Approval Status

Allowed approval statuses:

| Status          | Meaning                  |
| --------------- | ------------------------ |
| `not_submitted` | not submitted yet        |
| `pending`       | waiting for review       |
| `assigned`      | assigned to staff        |
| `under_review`  | actively reviewed        |
| `need_changes`  | user must fix            |
| `approved`      | approved                 |
| `rejected`      | rejected                 |
| `escalated`     | sent to senior/admin     |
| `revoked`       | earlier approval revoked |

---

## 4.3 Visibility Status

Allowed visibility statuses:

| Status       | Meaning                       |
| ------------ | ----------------------------- |
| `private`    | not public                    |
| `public`     | public-safe visible           |
| `limited`    | visible to scoped roles/users |
| `hidden`     | hidden from public            |
| `admin_only` | internal only                 |

---

## 5. Property System Overview

Property means a normal individual listing created by Owner or Broker/Agent.

Property can represent:

* residential property
* commercial property
* industrial property
* land/plot
* PG/hostel/room listing
* business listing
* agricultural land
* warehouse
* industrial shed
* shop
* office
* showroom
* flat/apartment
* tenament
* bungalow
* villa
* row house
* farmhouse where allowed
* open plot
* NA plot
* residential plot
* commercial plot

Property must support:

* create
* draft
* preview
* submit for approval
* edit/update
* reapproval after content update
* pause/resume
* schedule publish where implemented
* delete/soft delete
* media upload
* cover/front image
* contact visibility
* inquiry
* lead generation
* public detail page
* public search card
* dashboard management
* admin moderation
* SEO metadata
* report/abuse

---

## 6. Property Purpose Matrix

Property purpose values:

| Purpose             | Meaning                                                  |       Allowed For Property |
| ------------------- | -------------------------------------------------------- | -------------------------: |
| `sell`              | property available for sale                              |                        Yes |
| `rent`              | property available for rent                              |                        Yes |
| `lease`             | long-term commercial/industrial/agri lease where allowed |            Optional/future |
| `pg_hostel`         | PG/hostel/room occupancy                                 |   Yes as property category |
| `business_transfer` | business/commercial opportunity where allowed            |        Optional/controlled |
| `requirement`       | user need, not listing                                   | No, use Requirement entity |

Use approved enum names during implementation.

---

## 7. Property Category Matrix

## 7.1 Top-Level Property Categories

| Category           |         Allowed For Property | Notes                                        |
| ------------------ | ---------------------------: | -------------------------------------------- |
| Residential        |                          Yes | flats, apartments, houses, villas, tenaments |
| Commercial         |                          Yes | shops, offices, showrooms                    |
| Industrial         |                          Yes | sheds, warehouses, industrial land           |
| Land / Plot        |                          Yes | residential/commercial/agri/NA plots         |
| PG / Hostel / Room |                          Yes | property listing only, not project           |
| Business           |              Yes if approved | business listing/opportunity                 |
| Agricultural       |                          Yes | agri land/farm land                          |
| Mixed-use          | Yes if fields handle clearly | commercial/residential mixed                 |

---

## 7.2 Residential Property Types

Residential property types may include:

* flat
* apartment
* studio apartment
* penthouse
* tenament
* bungalow
* villa
* row house
* independent house
* farmhouse
* residential plot
* residential land
* duplex
* triplex
* service apartment where allowed

Common fields:

* BHK
* bedrooms
* bathrooms
* balconies
* floor
* total floors
* built-up area
* carpet area
* super built-up area
* furnishing
* parking
* age of property
* possession
* amenities
* society/building
* maintenance
* facing
* lift
* water supply
* power backup where relevant

---

## 7.3 Commercial Property Types

Commercial property types may include:

* shop
* office
* showroom
* commercial building
* commercial plot
* warehouse
* godown
* co-working space where allowed
* restaurant/cafe space where allowed
* retail space
* mall unit
* clinic space where allowed
* commercial land

Common fields:

* built-up area
* carpet area
* frontage
* floor
* total floors
* road width
* parking
* washroom
* pantry
* power load
* business suitability
* lift/escalator
* commercial approvals where relevant
* rent/deposit/maintenance if rental
* price if sale

---

## 7.4 Industrial Property Types

Industrial property types may include:

* industrial shed
* warehouse
* factory
* industrial land
* industrial plot
* logistics space
* cold storage where allowed
* workshop
* manufacturing unit

Common fields:

* plot area
* built-up area
* shed height
* power load
* road width
* loading/unloading access
* truck access
* water availability
* drainage
* zone type
* industrial estate
* compliance notes
* lease/sale/rent terms
* clear height
* floor load where relevant

---

## 7.5 Land / Plot Types

Land/plot types may include:

* residential plot
* commercial plot
* industrial plot
* agricultural land
* NA plot
* open plot
* farmhouse land
* society plot
* corner plot
* main road plot

Common fields:

* plot area
* area unit
* length
* width
* road width
* facing
* boundary wall
* zoning
* NA status
* title/ownership type
* electricity/water availability
* approach road
* land use
* survey/block number where safe
* agricultural/non-agricultural status
* conversion status
* legal disclaimer

---

## 7.6 PG / Hostel / Room Types

Allowed as property listings only.

Types:

* PG
* hostel
* room
* shared room
* private room
* paying guest accommodation

Common fields:

* gender allowed
* occupancy type
* food included
* deposit
* monthly rent
* room sharing
* bed count
* bathroom type
* curfew rules
* amenities
* available from
* rules/policies
* nearby college/office area
* owner/broker contact rules

PG/hostel/room must not be available in project posting.

---

## 7.7 Business Property / Business Listing

Business listing may include:

* running business for sale
* shop with business
* franchise opportunity where allowed
* commercial business asset

Common fields:

* business type
* asking price
* monthly revenue optional/private
* rent/lease terms
* setup included
* staff/assets included
* license/compliance note
* disclaimer

Business listing must be handled carefully and may require legal disclaimers.

---

## 8. Property Form Common Fields

Every property form should include relevant common fields.

## 8.1 Basic Fields

| Field                    |        Required | Notes                         |
| ------------------------ | --------------: | ----------------------------- |
| title                    |             Yes | clear, not spammy             |
| purpose                  |             Yes | sell/rent/lease where allowed |
| category                 |             Yes | residential/commercial/etc.   |
| property type            |             Yes | type-specific                 |
| property subtype         |     Conditional | if applicable                 |
| description              | Yes/Recommended | safe, validated               |
| price/rent               |     Conditional | based on purpose              |
| negotiable               |        Optional | boolean                       |
| ownership type           |     Conditional | especially sale/land          |
| age/new-old              |     Conditional | built property                |
| availability/possession  |     Conditional |                               |
| contact visibility       |             Yes | show/hide/request             |
| terms/disclaimer consent |             Yes | listing/legal notice          |

---

## 8.2 Price And Money Fields

Fields:

* expected price
* price unit
* price negotiable
* rent amount
* security deposit
* maintenance charge
* brokerage charge
* token amount where relevant
* all-inclusive flag where relevant
* price on request flag where allowed
* payment schedule where future

Rules:

* money fields validated
* no negative value
* currency INR
* Indian formatting
* “price on request” must not hide required compliance if needed
* no fake discount/price history
* public display should match visibility rules

---

## 8.3 Area Fields

Fields:

* built-up area
* carpet area
* super built-up area
* plot area
* land area
* frontage
* length
* width
* area unit

Allowed units:

* sq ft
* sq yd
* sq meter
* acre
* guntha
* bigha where local support added
* hectare where relevant

Rules:

* unit conversion helper where implemented
* positive values only
* type-based required fields
* irrelevant area fields hidden
* display normalized and original where useful

---

## 8.4 Building / Floor Fields

Fields:

* building name
* society name
* wing
* floor number
* total floors
* unit/flat/shop number optional/private/public rules
* lift
* parking
* age of property
* construction status
* possession status

Rules:

* exact flat/unit number may be private if user chooses
* public address should avoid overexposure if privacy requires
* floor fields hidden for land/plot unless relevant

---

## 8.5 Amenities Fields

Amenities may include:

* parking
* lift
* security
* water supply
* power backup
* garden
* gym
* clubhouse
* swimming pool
* children play area
* fire safety
* CCTV
* gas pipeline
* visitor parking
* maintenance staff
* drainage
* road access
* loading/unloading
* power load
* furnished equipment
* internet
* food for PG
* laundry for PG

Amenities must be type-specific.

No irrelevant amenities.

---

## 9. Project System Overview

Project means builder/developer project.

Builder is the only public role allowed to post projects.

Project supports:

* create
* draft
* preview
* submit for approval
* edit/update
* reapproval after update
* pause/resume
* delete/soft delete
* unit inventory
* wings/towers
* floors
* per-floor units
* floor plans
* brochure PDF
* images
* one video max
* 360/virtual tour iframe/URL
* construction progress timeline
* possession/phase timeline
* RERA status
* RERA disclaimers
* project leads
* matching buying requirements
* project analytics
* ads/promotions
* admin moderation
* public detail page
* public search card
* SEO metadata

---

## 10. Project Purpose Matrix

Project purpose values:

| Purpose     | Allowed For Project | Notes                                                           |
| ----------- | ------------------: | --------------------------------------------------------------- |
| `sell`      |                 Yes | units/plots available for sale                                  |
| `rent`      |                 Yes | commercial/industrial/rental project inventory where applicable |
| `lease`     |     Optional/future | industrial/commercial long-term                                 |
| `pg_hostel` |                  No | never as project                                                |
| `room`      |                  No | never as project                                                |

---

## 11. Project Category Matrix

Allowed project categories/types:

* residential apartment project
* residential villa project
* residential row house project
* residential plotting project
* township
* mixed-use project
* commercial complex
* office project
* shop/showroom project
* mall/commercial center
* industrial estate
* industrial park
* industrial plotting project
* warehouse/logistics project
* land/plotting scheme
* society project
* gated community
* affordable housing where valid
* premium/luxury project where not fake claim

Not allowed in project:

* PG
* hostel
* single room
* individual owner property
* broker normal listing
* fake prelaunch without compliance if prohibited
* unapproved RERA claim

---

## 12. Project Form Common Fields

## 12.1 Basic Project Fields

| Field                 |                              Required | Notes                       |
| --------------------- | ------------------------------------: | --------------------------- |
| project name          |                                   Yes | clear, unique slug          |
| builder/developer     |                                   Yes | current builder             |
| project type          |                                   Yes | residential/commercial/etc. |
| project purpose       |                                   Yes | sell/rent                   |
| description           |                                   Yes | public-safe                 |
| RERA status           | Conditional/Required where applicable | must be real                |
| RERA number           |                           Conditional | required if claiming RERA   |
| possession date       |                           Conditional | if under construction       |
| launch date           |                              Optional |                             |
| construction status   |                                   Yes |                             |
| project phase         |                  Optional/conditional |                             |
| total units           |                           Conditional |                             |
| total wings/towers    |                           Conditional |                             |
| total floors          |                           Conditional |                             |
| per-floor units       |                           Conditional |                             |
| contact rule          |                                   Yes |                             |
| legal/RERA disclaimer |                                   Yes |                             |

---

## 12.2 Wings / Towers / Floors

Project must support:

* total wings/towers
* wing/tower names
* floors per wing/tower
* per-floor units
* unit numbering
* floor-wise unit availability
* wing-wise inventory
* phase-wise inventory where needed

Fields:

* wing/tower name
* total floors
* units per floor
* floor number
* unit number
* unit type
* BHK/unit category
* area
* price
* availability status

Rules:

* inventory must be builder-owned
* public view must show only public-safe availability
* private internal inventory notes hidden
* bulk update audited where sensitive
* sold/booked/hold statuses real only

---

## 12.3 Unit Inventory Fields

Unit statuses:

* `available`
* `booked`
* `sold`
* `hold`
* `not_released`
* `blocked`
* `inactive`

Unit fields:

* unit number
* wing/tower
* floor
* BHK/unit type
* area
* area unit
* price
* price visibility
* availability status
* facing
* balcony
* parking
* floor plan
* possession phase
* remarks internal/public-safe

Rules:

* no fake unit availability
* no fake sold/booked counts
* public availability must come from real inventory
* unit update requires builder ownership or assigned permission
* important changes audited

---

## 12.4 Project Amenities

Project amenities may include:

* clubhouse
* gym
* garden
* children play area
* swimming pool
* security
* CCTV
* gated community
* lift
* parking
* EV charging
* fire safety
* power backup
* water supply
* sewage treatment
* rainwater harvesting
* temple/community hall
* sports facilities
* commercial frontage
* loading/unloading
* wide roads
* industrial power load
* drainage
* streetlights

Amenities must be real and not exaggerated.

---

## 12.5 RERA Fields

RERA-related fields:

* RERA applicable
* RERA status
* RERA number
* RERA project URL where safe
* RERA approval date
* RERA expiry/validity where applicable
* RERA document/proof private
* RERA verified by admin
* RERA disclaimer
* RERA last checked at

Rules:

* do not show RERA verified unless real approval/check done
* RERA badge is not legal guarantee
* valid RERA mandatory before promotion/ads where applicable
* RERA proof docs private
* RERA changes audited
* expired/revoked RERA must update public status

---

## 13. Requirement System Overview

Requirement means a user’s buying/renting need.

Owner and Broker can post requirement.

Requirement supports:

* create
* draft
* preview
* submit for approval
* edit/update
* reapproval after update
* pause/resume
* delete/soft delete
* expiry/renewal
* matching
* proposal receiving
* CRM integration
* notifications
* privacy/contact settings
* admin moderation
* duplicate/spam detection
* dashboard management

Requirement is not a property listing.

Requirement must not show fake matching.

---

## 14. Requirement Purpose Matrix

Requirement purposes:

| Purpose                  | Meaning                                      |
| ------------------------ | -------------------------------------------- |
| `buy`                    | user wants to buy                            |
| `rent`                   | user wants to rent                           |
| `lease`                  | user wants lease where applicable            |
| `invest`                 | optional/future; must avoid financial advice |
| `joint_venture`          | optional/future; advanced feature            |
| `land_requirement`       | land/plot need                               |
| `commercial_requirement` | commercial space need                        |
| `industrial_requirement` | industrial space need                        |

---

## 15. Requirement Category Matrix

Requirement may target:

* residential property
* commercial property
* industrial property
* land/plot
* agricultural land
* project units
* builder projects
* shop/office/showroom
* warehouse/industrial shed
* PG/room where allowed
* business space where allowed

Fields must change based on requirement type.

---

## 16. Requirement Form Common Fields

Fields:

* title
* purpose
* required category
* required property/project type
* budget min
* budget max
* preferred area min
* preferred area max
* area unit
* preferred locations
* city
* locality
* taluka/district
* BHK/unit type where relevant
* possession timeline
* urgency
* contact preference
* privacy level
* requirement description
* expected proposal details
* expiry date
* consent/contact sharing notice

Rules:

* budget valid
* location valid
* required fields by type
* hidden contact protected
* duplicate/spam prevention
* approval required
* no fake match score

---

## 17. Dynamic Form Rule

Property/project/requirement forms must be dynamic.

Rules:

1. Show only relevant fields.
2. Hide irrelevant fields.
3. Enforce required fields based on type.
4. Validate on server.
5. Validate on client for UX.
6. Use role rules.
7. Use purpose rules.
8. Use category/type rules.
9. Use location rules.
10. Use media rules.
11. Use subscription/plan gate.
12. Use provider setup-required state.
13. Preserve draft.
14. Allow preview before submit.
15. Show progress/steps.
16. Prevent duplicate submit.
17. Show clear errors.
18. Mobile-friendly layout.

Example:

* Flat needs BHK/floor/society.
* Plot needs plot area/dimensions/road width.
* Industrial shed needs power load/shed height/loading access.
* PG needs occupancy/food/rules.
* Project needs wings/towers/units/RERA.
* Requirement needs budget/preferences, not seller property title.

---

## 18. Location Hierarchy Rule

All property/project/requirement location entry must support hierarchy.

Hierarchy:

1. country
2. state
3. district
4. taluka
5. city/village
6. area
7. locality
8. society
9. building
10. landmark
11. address
12. pin code
13. map pin

Rules:

* default India/Gujarat where appropriate
* cascading dropdown
* parent-child validation
* all Gujarat district/taluka/city support planned
* missing location request
* admin/city manager approval
* nearby fallback where implemented
* manual city selection
* map optional/provider setup-required
* address privacy respected
* location slug for SEO
* Gujarati/Hindi/English/transliteration support where implemented

Missing location must not block entire system if safe fallback exists.

---

## 19. Map And Geolocation Rules

Map features depend on provider status.

Allowed map modes:

* disabled
* text-only address/location
* embed mode
* API mode

Rules:

* Google Maps provider setup-required until configured
* missing map must fallback to text address
* map pin optional/required based on type
* map coordinates validated
* no provider blocking form submit if manual location exists
* no raw provider errors
* no fake nearby places
* no hidden private exact location if user privacy setting hides it
* map embed/API key restricted

---

## 20. Media Upload Common Rules

Media applies to property, project and requirement only where allowed.

General media rules:

* validate file type
* validate MIME
* validate size for infra safety
* upload progress
* retry
* error state
* reorder
* cover/front image
* preview
* crop where implemented
* no distortion
* drag-safe behavior
* no fake upload success
* setup-required if storage provider missing
* metadata stored
* public/private bucket decision
* optimized variants where configured
* original backup where defined
* EXIF stripping where configured
* SVG safety
* orphan cleanup
* CDN where configured

Supported image formats may include:

* JPG
* JPEG
* PNG
* WebP
* AVIF
* GIF
* HEIC
* HEIF
* sanitized SVG only if allowed

Even if business does not impose visible min/max image count, system must enforce safe technical limits.

---

## 21. Property Media Rules

Property can include:

* multiple images
* cover/front image
* gallery order
* optional brochure PDF for broker where allowed
* PDF where owner allowed by plan/rule if future
* no video by default unless future approved
* map/location images only through provider where configured

Rules:

* cover image recommended
* gallery lazy-loaded
* public only after approval
* draft/pending images private or limited until approved
* hidden contact not embedded in images/watermark
* unsafe images blocked
* EXIF privacy handled
* no fake media success

---

## 22. Project Media Rules

Project can include:

* multiple images
* cover/front image
* gallery order
* one video max
* brochure PDF
* floor plan images/PDF
* 360/virtual tour URL/iframe
* construction progress media
* ad banners in separate ad module

Rules:

* one video max enforced
* brochure PDF allowed/expected
* floor plan section required where available
* 360 URL validated/safe
* iframe allowlist/validation required
* public after approval
* RERA/legal docs private, not public media
* gallery lazy-loaded
* video lazy-loaded
* PDF lazy/on demand
* no fake upload success

---

## 23. Requirement Media Rules

Requirement usually does not need public media.

Optional media may include:

* requirement reference document
* support attachment
* proposal attachment
* site visit proof in related modules

Rules:

* private/scoped by default
* no unnecessary public media
* file validation
* private bucket if sensitive
* no hidden contact leak in attachment metadata

---

## 24. Brochure PDF Rules

Brochure PDF rules:

| Entity             |                    PDF Allowed | Notes                                      |
| ------------------ | -----------------------------: | ------------------------------------------ |
| Property by Owner  | Optional/future/plan-dependent | must be safe if enabled                    |
| Property by Broker |     Yes where plan/rule allows | broker brochure                            |
| Project by Builder |                            Yes | project brochure                           |
| Requirement        |                   Generally No | use proposal/support attachments if needed |

PDF requirements:

* PDF only
* validate MIME and extension
* lazy load/download
* public/private decision
* no malware/unsafe PDF where scan enabled
* setup-required if storage missing
* no fake PDF upload
* no private docs in brochure area
* brochure visible only when listing/project approved and public if public brochure

---

## 25. Floor Plan Rules

Floor plan applies mostly to projects.

Floor plan types:

* image
* PDF
* per unit type
* per wing/floor
* per BHK
* master layout
* site layout

Rules:

* builder upload only
* project ownership required
* approval/public status follows project
* public-safe
* no private internal notes
* lazy-load
* file validation
* setup-required if storage missing

---

## 26. Video Rules

Project video rules:

* one video max
* allowed only for project by builder
* validate type/size
* upload progress
* thumbnail if processing configured
* lazy-load video
* no autoplay heavy content by default
* video provider/storage setup-required if missing
* no fake upload success
* video public only after project approval
* video cannot include illegal/private/false claim content

Property video is not default unless future approved.

---

## 27. 360 / Virtual Tour Rules

360/virtual tour may support:

* Matterport URL
* iframe URL
* approved virtual tour provider URL
* self-hosted 360 link where safe

Rules:

* validate URL
* allowlist providers where possible
* block unsafe iframe/script
* no SSRF
* lazy-load embed
* public after approval
* setup-required if provider/iframe mode disabled
* no fake 360 tour

---

## 28. Contact Visibility Rules

Contact visibility is critical.

Property contact options may include:

* show contact to logged-in users
* hide contact and allow inquiry/request
* show contact only after reveal/consent
* broker/owner contact preference
* WhatsApp/call/email depending provider/user setting

Project contact rule:

* logged-in user should see project contact according to project contact rule
* guest must authenticate first
* project contact must not leak in guest public HTML/API
* no hidden contact leak

Requirement contact rules:

* contact shown only to allowed matched/proposal users
* hidden until reveal/consent where required
* requirement poster privacy respected

---

## 29. Contact Reveal Rules

Contact reveal must:

1. require login
2. check role/account status
3. check listing/project/requirement status
4. check contact visibility rule
5. check duplicate reveal
6. check rate limit
7. log consent/reveal event
8. create/reuse lead
9. notify owner/broker/builder where configured
10. show contact only after authorization
11. never include hidden contact in public payload before reveal

Contact reveal states:

* auth required
* subscription required where applicable
* verification required where applicable
* reveal allowed
* already revealed
* rate limited
* contact hidden/request sent
* provider unavailable for external notification
* safe error

Hidden contact leak is critical bug.

---

## 30. Inquiry Rules

Inquiry can be submitted for:

* property
* project
* requirement/proposal where allowed
* profile
* ad/project promotion where allowed

Inquiry must:

* require login/register or protected auth flow
* preserve original intent
* validate message
* create lead
* prevent duplicate spam
* check rate limits
* respect contact privacy
* notify receiver where configured
* show success only after DB write succeeds
* no fake inquiry sent

Inquiry statuses:

* submitted
* duplicate_existing
* pending_response
* contacted
* closed
* blocked

---

## 31. Lead Creation Rules From Listings

Lead may be created by:

* inquiry
* contact reveal
* phone click
* WhatsApp click
* proposal
* requirement match
* site visit request
* ad click/inquiry
* saved interest where implemented

Lead must record:

* source
* sender
* receiver
* entity type
* entity ID
* consent
* contact reveal status
* duplicate group
* created_at
* status/stage

No fake lead count.

---

## 32. Property Public Detail Page Rules

Property detail page must show:

* approved public property only
* title
* category/type
* purpose
* price/rent
* negotiable flag
* location public-safe
* images/gallery
* all relevant type-based fields
* amenities
* description
* uploader public-safe profile link
* inquiry/contact CTA
* save/share/report CTA
* similar properties real only
* legal disclaimer
* SEO metadata
* sticky mobile CTA bar

Must not show:

* hidden contact before reveal
* private email
* private address if hidden
* private docs
* draft/pending/rejected data
* fake verified badge
* fake views
* fake inquiry count
* fake similar listings

---

## 33. Project Public Detail Page Rules

Project detail page must show:

* approved public project only
* project name
* builder public-safe profile
* project type/purpose
* RERA status if real
* RERA disclaimer
* location
* gallery
* video if uploaded
* brochure PDF
* floor plans
* unit/inventory public-safe summary
* wings/towers/floors summary
* amenities
* construction progress
* possession/phase timeline
* 360/virtual tour if safe
* contact/inquiry CTA
* save/share/report CTA
* similar projects real only
* ads/sponsored label if applicable
* SEO metadata

Must not show:

* fake RERA badge
* fake inventory
* fake sold/booked count
* private RERA proof docs
* hidden guest contact
* unapproved media
* draft/pending/rejected data
* fake analytics/views

---

## 34. Requirement Detail / Feed Rules

Requirement visibility depends on product rules.

Requirement feed/detail may show to:

* owner who posted
* broker who posted
* allowed brokers/builders
* admin/staff

Requirement public/scoped fields may include:

* purpose
* category/type needed
* budget range
* preferred location
* urgency
* description public-safe
* proposal action
* contact/request action

Must not show:

* hidden contact unauthorized
* private identity if hidden
* unrelated user private data
* fake match score
* fake proposal count
* unauthorized full details

---

## 35. Search Card Rules

Property/project search cards must show public-safe fields only.

Property card may show:

* cover image
* title
* type
* purpose
* price/rent
* city/locality
* key specs
* verified badge only if real
* sponsored label if paid/approved
* save/share
* contact/inquiry CTA without hidden contact leak

Project card may show:

* cover image
* project name
* builder name public-safe
* project type
* location
* price range if real
* possession
* RERA status if real
* unit types
* sponsored label if paid/approved
* inquiry CTA

Requirement cards where shown must be scoped and privacy-safe.

Cards must not show fake counts/views/contacts.

---

## 36. Approval Workflow

Approval applies to:

* new property
* property edit/update
* new project
* project edit/update
* new requirement
* requirement edit/update
* ads/promotions
* verification proof
* missing location request

Approval states:

1. draft
2. submit
3. pending approval
4. assigned/under review
5. approved/published
6. need changes
7. rejected
8. revoked if needed

Reviewer actions:

* approve
* reject
* request changes
* assign
* escalate
* add internal note
* preview public page
* compare changes
* audit action

Approval must be audited.

---

## 37. Edit / Update Rules

When user edits published property/project/requirement:

* if only pause/resume: no approval needed
* if public content changes: may move to pending approval
* old public version may remain or listing may go pending based on product decision
* change diff should be visible to admin where implemented
* user sees approval status
* rejected changes must not overwrite public approved content unless designed safely
* private draft of changes should be stored if needed

Critical fields requiring reapproval:

* title
* price
* location
* contact preference
* description
* images/media
* brochure
* RERA status
* unit inventory public fields
* amenities
* property/project type
* legal/compliance fields

---

## 38. Pause / Resume Rules

Pause:

* allowed for owner/broker property owner
* allowed for builder project owner
* allowed for requirement owner
* allowed for admin/staff with permission
* hides from public search/detail
* keeps data in dashboard
* does not require approval if content unchanged
* reason optional/user-facing where implemented
* audit where sensitive/admin

Resume:

* allowed if listing was previously approved and no content changed
* may require approval if content changed
* must respect subscription/expiry/verification gates
* must not show rejected/blocked listing
* public cache revalidated

---

## 39. Delete / Soft Delete Rules

Delete should be soft delete by default.

Rules:

* user can delete own allowed entity
* admin/staff can delete if permitted
* deleted public entity hidden
* leads/history may remain with retention rules
* media not immediately hard deleted unless cleanup policy
* restore where allowed
* hard delete Super Admin-only after retention/legal checks
* audit admin deletes
* no accidental public broken pages without safe unavailable state

---

## 40. Expiry / Renewal Rules

Entities may expire.

Property/project/requirement expiry may depend on:

* plan
* listing duration
* approval age
* manual expiry
* project completion
* user pause/delete
* subscription expiry

Expired entity:

* hidden or marked expired according to rules
* dashboard shows renew action
* public detail may show expired/unavailable or 410/noindex strategy
* search excludes expired
* leads/messages preserved
* SEO handled safely

Renewal may require:

* active plan
* reapproval
* payment
* updated content confirmation

---

## 41. Subscription / Plan Gates

Active plan may be required before posting:

* property
* project
* requirement
* additional media
* brochure
* video
* agents
* leads/contact unlock
* ads/promotions
* advanced analytics

Gate order:

1. login
2. role allowed
3. active account
4. active plan/trial
5. limit available
6. verification if required
7. provider available/setup-required
8. submit action

If plan missing:

* show pricing popup/page
* no fake active plan
* server action rejects
* direct URL bypass blocked

---

## 42. Verification Gates

Verification may affect:

* verified badge
* trust label
* higher listing limits
* contact reveal limits
* project promotion
* RERA display/promotion
* ad eligibility
* public profile trust

Rules:

* verification badge real only
* project/RERA badge real only
* verification docs private
* admin approval required
* changes audited
* revoked/expired badge removed
* badge disclaimer required

---

## 43. RERA And Project Promotion Gate

For projects:

* RERA status captured
* valid RERA mandatory before promotion/ads where applicable
* RERA proof private
* RERA badge real only
* RERA number validated format where possible
* RERA disclaimer visible
* expired/revoked RERA blocks or warns promotion
* admin/staff review required

No fake RERA.

---

## 44. Admin Moderation Scope

Admin/staff must be able to moderate:

* properties
* projects
* requirements
* media
* RERA/project proof
* reports
* duplicate/spam
* ads/promotions
* missing location requests

Moderation UI must show:

* submission details
* public preview
* uploader profile
* role
* plan/verification status
* duplicate warnings
* report history
* media preview
* location details
* internal notes
* timeline
* approve/reject/need changes
* reason required for rejection/need changes
* assignment
* SLA/status
* audit trail

Admin moderation must be permission-scoped.

---

## 45. Admin Moderation Rules

Rules:

* staff permissions enforced server-side
* sensitive/private docs require permission
* approve/reject actions audited
* reasons required for rejection/need changes
* public preview must use public-safe view
* rejected content not public
* approved content revalidates public pages
* moderation notes internal only
* user notified where configured
* bulk actions permission-gated
* direct URL bypass blocked

---

## 46. Duplicate Detection Rules

Duplicate detection may apply to:

* property listings
* projects
* requirements
* leads
* inquiries
* proposals
* reports

Signals:

* same mobile/profile
* same location
* same title
* same images
* same price
* same project name
* same RERA number
* same requirement details
* repeated contact reveal
* repeated inquiry

Rules:

* do not auto-delete without review unless safe
* show duplicate warning
* admin merge/mark duplicate where implemented
* audit duplicate resolution
* no fake duplicate label

---

## 47. Report / Abuse Rules

Users can report:

* property
* project
* requirement
* profile
* message
* ad

Report form must include:

* category
* description
* optional evidence
* reporter info
* target entity
* abuse protection
* duplicate report handling
* admin review

Report categories may include:

* fake listing
* wrong price
* wrong contact
* duplicate
* fraud/scam
* inappropriate content
* sold/rented but active
* RERA issue
* ownership dispute
* spam
* other

Report action must not expose reporter private data publicly.

---

## 48. Validation Rules

Validation required for:

* role permission
* title
* purpose
* category/type
* price/budget
* area/unit
* location hierarchy
* address/pin code
* map coordinates
* property-specific fields
* project-specific fields
* requirement-specific fields
* RERA number
* URLs/iframes
* media files
* contact preference
* approval status transitions
* plan/limit
* ownership
* duplicate/spam
* admin action reason

Client validation improves UX.

Server validation is mandatory.

---

## 49. RLS And Security Rules

RLS must enforce:

* public reads approved/published public-safe only
* owner reads/writes own properties/requirements
* broker reads/writes own properties/requirements
* builder reads/writes own projects/ads/units
* wrong owner denied
* wrong role denied
* builder cannot create property
* owner/broker cannot create project
* requirement visibility scoped
* private docs denied unless permitted
* staff permission scoped
* payment/billing gates server-enforced
* hidden contact excluded from public views
* audit logs protected

Public-safe views required for:

* property cards
* project cards
* property detail
* project detail
* public profiles
* SEO pages
* sitemap
* ads

---

## 50. Public-Safe Data Rules

Public-safe property/project data must exclude:

* hidden phone/contact
* private email
* private exact address where hidden
* private notes
* draft/pending/rejected content
* admin moderation notes
* private verification docs
* private RERA proof docs
* payment/subscription data
* internal fraud flags
* raw user metadata
* private lead data
* private unit notes
* audit logs
* provider logs

Public-safe data may include:

* public title/name
* public location level
* approved images
* price/rent if public
* type/purpose
* specs
* public amenities
* public description
* verified badge if real
* public profile link
* public RERA number/status if real
* public disclaimer

---

## 51. SEO Rules

Property/project/requirement SEO must be safe.

Property/project public pages should include:

* title
* meta description
* canonical
* slug
* H1
* public-safe schema
* image metadata where safe
* breadcrumbs
* city/locality/type metadata
* no hidden contact
* no private data
* no fake reviews
* no fake rating
* no fake count

Noindex/hide:

* draft
* pending
* rejected
* private
* deleted
* expired where appropriate
* empty/thin pages
* admin/staff/dashboard pages

Requirement SEO should be limited/scoped and privacy-safe.

---

## 52. Slug Rules

Slug should be:

* unique
* readable
* SEO-safe
* stable where possible
* updated carefully on title/location change
* redirect old slug if changed
* not expose private data
* not include phone/email
* not include unsafe characters

Examples:

* `/property/2bhk-flat-rajkot-kalawad-road-abc123`
* `/project/green-valley-residency-rajkot`
* `/builder/company-name`
* `/broker/agency-name`

Slug collisions handled safely.

---

## 53. Search And Filter Rules

Search must support:

* purpose
* category/type
* city
* locality
* price/budget
* area
* BHK/unit type
* possession
* status public only
* verified filter if real
* RERA filter if real
* sponsored/featured separation
* sort
* pagination
* mobile filters

Rules:

* search uses public-safe views
* no hidden contact
* no fake count
* no unbounded read
* filters indexed
* query params
* mobile bottom sheet
* empty state
* no private/draft records

---

## 54. Performance Rules

Performance requirements:

* pagination for lists
* no unbounded queries
* indexes for status/location/type/price
* lazy gallery
* optimized cover images
* video/PDF lazy load
* dashboard lists paginated
* admin queues paginated
* location dropdowns lazy/cached
* no N+1 media queries
* use public-safe views
* cache public pages safely
* revalidate targeted paths/tags
* no private data cached publicly

---

## 55. UI / UX Form Rules

Forms must be:

* step-based or sectioned
* mobile-first
* autosave/draft where implemented
* clear required labels
* type-aware
* location cascade
* media upload area
* preview before submit
* validation errors near fields
* disabled/loading states
* save draft button
* submit for approval button
* cancel/back safe
* unsaved changes warning
* responsive
* accessible

No huge single confusing form on mobile.

---

## 56. Step-Based Form Recommendation

Property form steps:

1. Basic details
2. Type and purpose
3. Price/area/specs
4. Location
5. Amenities/details
6. Media
7. Contact/privacy
8. Preview
9. Submit

Project form steps:

1. Project basics
2. Type/purpose/RERA
3. Location
4. Wings/towers/units
5. Amenities
6. Timelines/progress
7. Media/brochure/floor plans/video/360
8. Contact
9. Preview
10. Submit

Requirement form steps:

1. Requirement purpose
2. Type/category
3. Budget/area/preferences
4. Location preferences
5. Contact/privacy
6. Preview
7. Submit

---

## 57. Preview Rules

Preview must show:

* how public page/card will look
* missing required fields
* approval warning
* hidden contact behavior
* media order
* SEO preview where implemented
* legal disclaimers
* RERA disclaimer where project
* no private admin-only data

Preview must not publish automatically.

---

## 58. Draft Rules

Draft supports:

* save incomplete form
* continue later
* edit draft
* delete draft
* submit when complete
* media draft storage where safe
* autosave where implemented
* user owns draft only
* draft not public
* draft not indexed
* draft media not public unless safe

---

## 59. Notifications For Entity Lifecycle

Notifications may be created for:

* draft saved where needed
* submitted for approval
* approved
* rejected
* need changes
* published
* paused
* resumed
* expired
* renewed
* deleted/restored
* new inquiry
* contact reveal
* lead created
* proposal received
* report filed
* admin action
* project RERA/verification status
* ad eligibility issue

External delivery depends on provider status.

No fake sent status.

---

## 60. Billing Usage Limit Examples

Plan limits may apply to:

* number of active properties
* number of active projects
* number of active requirements
* image count
* video allowed
* brochure allowed
* floor plans allowed
* agents allowed
* lead/contact unlocks
* ad campaigns
* featured/boost slots
* analytics level
* city targeting
* support priority

Plan limit checks must be server-side.

---

## 61. Recommended Database Tables For This Matrix

Tables may include:

* `properties`
* `property_type_details`
* `property_media`
* `property_approval_events`
* `projects`
* `project_wings`
* `project_units`
* `project_phases`
* `project_progress_updates`
* `project_media`
* `project_floor_plans`
* `project_approval_events`
* `requirements`
* `requirement_matches`
* `requirement_approval_events`
* `proposals`
* `leads`
* `lead_events`
* `media_assets`
* `media_variants`
* `locations`
* `missing_location_requests`
* `reports`
* `audit_logs`
* `notifications`
* `subscriptions`
* `verification_requests`
* `verification_documents`
* `ads`

Actual schema can be normalized differently, but all behavior must exist.

---

## 62. Migration Expectations

Implementation requires SQL migrations for:

* property tables
* project tables
* requirement tables
* media links
* approval events
* location references
* indexes
* RLS policies
* public-safe views
* status enums/checks
* audit hooks/triggers where used
* lead/proposal links where phase overlaps

Migration must include:

* header
* purpose
* phase
* tables changed
* RLS changed
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 63. Index Expectations

Indexes required for:

* `properties.status`

* `properties.approval_status`

* `properties.owner_profile_id`

* `properties.city_village_id`

* `properties.locality_id`

* `properties.purpose`

* `properties.category`

* `properties.property_type`

* `properties.price`

* `properties.published_at`

* `properties.slug`

* `projects.status`

* `projects.approval_status`

* `projects.builder_profile_id`

* `projects.city_village_id`

* `projects.locality_id`

* `projects.project_type`

* `projects.purpose`

* `projects.rera_status`

* `projects.published_at`

* `projects.slug`

* `requirements.status`

* `requirements.profile_id`

* `requirements.city_village_id`

* `requirements.purpose`

* `requirements.requirement_type`

* `requirements.budget_min`

* `requirements.budget_max`

* `requirements.created_at`

* media entity indexes

* approval queue indexes

* lead entity indexes

* location parent-child indexes

---

## 64. Manual Verification Matrix

Manual verification must check:

### Property

* owner can create draft
* broker can create draft
* builder cannot create property
* guest cannot create
* type-based fields show/hide correctly
* required fields enforced
* location hierarchy works
* missing location request works/setup-required
* media upload setup-required or real
* preview works
* submit for approval works
* pending not public
* approved public
* edit triggers reapproval where required
* pause/resume works
* delete soft-deletes
* hidden contact protected
* detail page safe
* search card safe

### Project

* builder can create draft
* owner cannot create project
* broker cannot create project
* PG/hostel/room not available as project
* wings/towers/floors/units work
* one video max enforced
* brochure/floor plan upload works/setup-required
* RERA fields work
* RERA badge real only
* project contact guest/auth behavior safe
* submit for approval works
* pending not public
* approved public
* edit triggers reapproval
* pause/resume works
* unit inventory real
* ads eligibility respects RERA/approval/payment

### Requirement

* owner can create requirement
* broker can create requirement
* builder denied by default
* required fields enforced
* budget/location/type fields valid
* submit approval works
* feed visibility scoped
* proposal action scoped
* hidden contact safe
* duplicate/spam protection checked
* edit/reapproval works
* pause/resume/delete works

### Admin

* moderation queue shows submissions
* staff permission enforced
* approve/reject/need changes works
* reason required
* internal notes private
* audit logs created
* public cache revalidates
* rejected not public
* private docs permission enforced

### Security

* RLS allowed/denied
* direct URL bypass blocked
* hidden contact not in HTML/API
* private docs not public
* wrong owner denied
* wrong role denied
* service role not client

### Responsive

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 65. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* property create
* property draft
* property preview
* property submit approval
* property edit/update
* property pause/resume
* property delete/soft delete
* property media upload
* property detail page
* property search card
* property contact privacy
* project create
* project draft
* project preview
* project approval
* project edit/update
* project pause/resume
* project delete/soft delete
* project wings/towers
* project unit inventory
* project brochure
* project floor plan
* project video one max
* project 360/virtual tour
* project RERA fields
* project detail page
* project contact privacy
* requirement create
* requirement draft
* requirement approval
* requirement edit/update
* requirement matching
* requirement feed
* proposals link
* approval/moderation
* location hierarchy
* missing location request
* media provider setup-required
* RLS policies
* public-safe views
* admin moderation
* manual verification

---

## 66. Common Bugs To Track

Create bug if:

* builder can post property
* owner/broker can post project
* project form includes PG/hostel/room
* guest can create listing
* wrong owner edits listing
* pending listing appears public
* rejected listing appears public
* hidden contact leaks
* private document leaks
* media upload fakes success
* video more than one allowed for project
* RERA badge fake
* invoice/payment gate bypasses listing limit
* plan gate bypassed
* required field missing but submit succeeds
* irrelevant fields shown causing confusion
* location hierarchy invalid
* public SEO includes private data
* search shows fake count
* detail page shows draft/private data
* approval action lacks audit
* staff without permission approves
* cache shows paused/deleted listing
* mobile form overflows
* dashboard module dead
* direct URL bypass works

---

## 67. Current Property/Project/Requirement Status

As of this documentation generation stage:

| Area                           | Status                |
| ------------------------------ | --------------------- |
| Property system                | `NOT_STARTED`         |
| Property type matrix           | `DOCUMENTED_BASELINE` |
| Property posting form          | `NOT_STARTED`         |
| Property approval workflow     | `NOT_STARTED`         |
| Property detail page           | `NOT_STARTED`         |
| Property media upload          | `SETUP_REQUIRED`      |
| Property contact privacy       | `NOT_STARTED`         |
| Project system                 | `NOT_STARTED`         |
| Project type matrix            | `DOCUMENTED_BASELINE` |
| Project posting form           | `NOT_STARTED`         |
| Project unit inventory         | `NOT_STARTED`         |
| Project RERA fields            | `NOT_STARTED`         |
| Project media/video/PDF        | `SETUP_REQUIRED`      |
| Project detail page            | `NOT_STARTED`         |
| Requirement system             | `NOT_STARTED`         |
| Requirement posting form       | `NOT_STARTED`         |
| Requirement matching/proposals | `NOT_STARTED`         |
| Approval/moderation            | `NOT_STARTED`         |
| Location hierarchy             | `NOT_STARTED`         |
| Missing location requests      | `NOT_STARTED`         |
| RLS/public-safe views          | `NOT_STARTED`         |
| Admin moderation               | `NOT_STARTED`         |
| Manual verification            | `NOT_STARTED`         |

---

## 68. Documentation Generation Progress

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
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Pending |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Pending |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Pending |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Pending |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Pending |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 69. Related Documents

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
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 70. Final Property/Project/Requirement Rule

Owner and Broker can post properties and requirements.

Builder can post projects only.

Project cannot include PG, hostel or room.

Every create/edit content change requires approval where defined.

Pause/resume can avoid approval only if content does not change.

Public pages show only approved public-safe data.

Hidden contact must never leak.

Private documents must never be public.

Provider-backed media/contact/payment features must be real or setup-required.

No fake listings.

No fake project inventory.

No fake requirement matching.

No fake RERA.

No fake analytics.

No fake PASS.
