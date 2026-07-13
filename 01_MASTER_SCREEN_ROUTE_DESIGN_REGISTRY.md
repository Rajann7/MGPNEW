

# `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`

# MY GUJARAT PROPERTY

## MASTER SCREEN, ROUTE, DESIGN SOURCE, SHELL AND RESPONSIVE STATE REGISTRY

**File status:** FINAL MASTER REGISTRY
**Project root:** `C:\mgpweb`
**Approved design directory:** `C:\mgpweb\newdesign`
**Applies to:** All Design Batch 4–17 HTML sources
**Known design HTML files:** 14
**Known source-defined screen groups:** 228
**Primary comparison width:** 390px mobile
**Additional verification widths:** 320, 360, 430, 768, 1024, 1280, 1366 and 1440px

---

# 1. DOCUMENT PURPOSE

This document is the complete master registry for mapping every approved HTML design screen to the correct:

* application route;
* user role;
* permission scope;
* application shell;
* screen boundary;
* responsive transformation;
* conditional state;
* modal;
* drawer;
* bottom sheet;
* full-page state;
* global overlay;
* shared component;
* cross-Batch dependency;
* and implementation target.

This document must be used together with:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
3. `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
4. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

This registry is not permission to implement only the route names.

For every registered target, Claude must inspect the exact matching screen inside the listed HTML source and implement everything visible from the actual top boundary through the actual bottom boundary.

---

# 2. ABSOLUTE REGISTRY RULE

No approved HTML screen may remain unmapped.

No application route may use an approved design without a registry relationship.

No screen may be considered implemented when:

* only its first viewport is implemented;
* lower sections are missing;
* only desktop is implemented;
* only mobile is implemented;
* overlays are missing;
* loading or empty states are missing;
* the wrong shell is present;
* the old header remains;
* an extra footer is added;
* an old sidebar remains;
* a temporary action is changed into an unrelated full page;
* or several independent design screens are rendered together on one route.

---

# 3. DESIGN DIRECTORY DISCOVERY LOCK

Before beginning implementation, Claude must scan:

`C:\mgpweb\newdesign`

for every:

`*.html`

file.

Claude must create an actual discovered-file manifest containing:

* exact filename;
* exact path;
* file size;
* last modified timestamp;
* internal screen headings;
* number of desktop references;
* number of tablet references;
* number of mobile references;
* number of modal states;
* number of drawer states;
* number of bottom-sheet states;
* number of loading states;
* number of empty states;
* number of error states;
* and number of Setup Required states.

The discovered manifest must be compared with Section 11 of this registry.

If any additional HTML file exists in `newdesign` but is not registered here:

1. stop implementation of the affected area;
2. inspect that complete HTML file;
3. add every screen and state to this registry;
4. determine its route and shell;
5. only then implement it.

Do not ignore a file merely because its name starts with:

* copy;
* final;
* updated;
* new;
* standalone;
* batch;
* or includes `(1)`.

Do not automatically use duplicate files.

When two similarly named design files exist, compare their content and use the latest explicitly approved authority.

Do not guess which duplicate is final.

---

# 4. KNOWN COVERAGE LIMIT

The uploaded consolidated specification set defines Design Batches:

* 4;
* 5;
* 6;
* 7;
* 8;
* 9;
* 10;
* 11;
* 12;
* 13;
* 14;
* 15;
* 16;
* and 17.

Shared Batch 1, Batch 2 and Batch 3 systems are referenced as dependencies for:

* design tokens;
* public header;
* contextual mobile header;
* dashboard foundations;
* Admin shell;
* authentication;
* search;
* cards;
* overlays;
* loading;
* empty;
* error;
* and location behavior.

If separate Batch 0–3 HTML sources exist inside `newdesign`, they are mandatory and must be registered before implementation.

Do not assume they are absent merely because they are not part of the 14 merged Batch 4–17 specification documents.

---

# 5. REGISTRY FIELD DEFINITIONS

Every screen entry in this document contains the following concepts.

## 5.1 Registry ID

Stable design mapping identifier.

Format:

`B{batch}-S{screen}`

Variants use:

`B{batch}-S{screen}-{variant}`

Examples:

* `B4-S01`
* `B6-S01-MOBILE`
* `B10-S08-SUCCESS`

## 5.2 Design source

The exact standalone HTML file containing the visible screen.

## 5.3 Logical route

The product route represented by the screen.

A logical route may be:

* one full page;
* one nested route;
* one role-aware route;
* a route-backed overlay;
* an in-page state;
* a drawer;
* a modal;
* a bottom sheet;
* a toast;
* or a global application layer.

## 5.4 Route status

Possible route statuses:

### `CANONICAL`

Use the path defined in this registry unless an already-existing equivalent route is explicitly preserved.

### `EXISTING-EQUIVALENT-ALLOWED`

An existing route may remain when it:

* creates no duplicate experience;
* uses the exact approved screen;
* preserves canonical links;
* keeps role access correct;
* and does not break SEO or deep links.

### `ROLE-AWARE`

The same logical route resolves the correct shell and permissions from the authenticated role or host.

### `STATE`

The design is a conditional state on the same route.

### `OVERLAY`

The design opens over the current page.

### `GLOBAL`

The design may appear across multiple routes.

### `FULLSCREEN-OVERLAY`

The design occupies the viewport but preserves the originating page state.

### `PUBLIC-SYSTEM`

The route is available without a dashboard shell.

## 5.5 Shell

The exact outer application structure.

## 5.6 Access

The allowed:

* Guest;
* Owner;
* Broker;
* Builder;
* participant;
* Staff;
* Admin;
* Super Admin;
* or capability-scoped user.

## 5.7 Responsive behavior

How the same feature transforms between:

* desktop;
* tablet;
* mobile;
* modal;
* sheet;
* drawer;
* table;
* cards;
* sticky actions;
* and contextual headers.

## 5.8 Required states

The actual conditional design targets.

---

# 6. ROUTE PRESERVATION RULE

Some specifications define recommended canonical routes rather than mandatory filesystem paths.

An equivalent current route may remain only when all of the following are true:

* only one final route exists for the experience;
* no duplicate old route remains visible;
* the final route renders the exact approved design;
* links and notifications point to it correctly;
* role guards are server-side;
* canonical public URLs remain stable;
* return intent works;
* breadcrumbs work;
* and SEO does not create duplicate pages.

When current and registry routes conflict, Claude must choose one canonical path and implement redirects from obsolete public paths where required.

Do not maintain two visually different experiences for the same module.

---

# 7. DYNAMIC ROUTE IDENTIFIER RULE

Public-facing routes should use safe stable slugs or public display identifiers.

Internal dashboard routes may use secure record identifiers.

Do not expose raw internal IDs when a public slug or display ID is required.

Changing a route parameter must not expose another user’s data.

Dynamic identifiers include:

* `[slug]`
* `[id]`
* `[displayId]`
* `[threadId]`
* `[leadId]`
* `[proposalId]`
* `[visitId]`
* `[invoiceId]`
* `[campaignId]`
* `[userId]`
* `[staffId]`
* `[ticketId]`
* `[contentId]`
* `[locationId]`
* `[reportId]`
* `[exportId]`
* and `[requestId]`.

Every dynamic route requires server-side authorization.

---

# 8. SHELL REGISTRY

## 8.1 `SHELL-PUBLIC-DESKTOP`

Used for public pages where the design includes the standard public header.

May include:

* public header;
* search access;
* login/profile state;
* public content area;
* public footer only where shown.

Do not append the footer automatically when the screen does not show it.

## 8.2 `SHELL-PUBLIC-CONTEXTUAL-MOBILE`

Used for mobile detail and inner public screens.

May include:

* Back;
* compact title;
* overflow;
* contextual actions;
* sticky bottom CTA.

It replaces, rather than duplicates, the desktop public header on the mobile design.

## 8.3 `SHELL-WIZARD-OWNER`

Authenticated Owner posting shell.

Desktop may inherit Owner dashboard context.

Mobile uses the exact Batch 5 contextual wizard header and sticky footer.

## 8.4 `SHELL-WIZARD-BROKER`

Authenticated Broker posting shell.

Uses the shared Batch 5 wizard presentation, not a separate Broker-specific wizard design.

## 8.5 `SHELL-WIZARD-BUILDER`

Authenticated Builder Project wizard shell.

Uses exact Batch 5 progress and sticky footer behavior.

## 8.6 `SHELL-DASHBOARD-OWNER`

Desktop:

* 240px expanded sidebar;
* 64px collapsed rail;
* dashboard top bar;
* content area;
* notification;
* profile menu.

Mobile:

* contextual header;
* full navigation drawer;
* exact five-item bottom navigation.

Owner mobile bottom navigation:

1. Home
2. Search
3. Post
4. Leads
5. Profile

The raised central Post action opens the Owner Post flow.

## 8.7 `SHELL-DASHBOARD-BROKER`

Desktop Broker sidebar and top bar.

Mobile uses:

1. Home
2. Search
3. Post
4. Leads
5. Profile

Broker Post opens the shared Post Property flow.

Required Broker-only modules must remain available through sidebar/drawer.

## 8.8 `SHELL-DASHBOARD-BUILDER`

Desktop Builder sidebar and top bar.

Mobile uses:

1. Home
2. Search
3. Post
4. Leads
5. Profile

Builder Post opens Post Project.

Do not change Builder Post into Post Property.

## 8.9 `SHELL-DASHBOARD-ROLE-AWARE`

Used for shared:

* Lead Detail;
* Proposal Detail;
* Messages;
* Site Visits;
* and related operational pages.

The authenticated participant’s role determines whether the page appears inside:

* Owner;
* Broker;
* or Builder shell.

The domain functionality stays shared.

## 8.10 `SHELL-ADMIN`

Desktop:

* approved graphite Admin sidebar;
* Admin contextual header;
* permission-aware navigation;
* operational workspace.

Mobile:

* contextual Admin header;
* Admin drawer;
* no Owner/Broker/Builder bottom navigation.

## 8.11 `SHELL-NONE-FULLSCREEN`

Used for:

* Fullscreen Gallery;
* public Maintenance page;
* certain payment processing states;
* and other exact full-viewport designs.

Do not leak underlying dashboard navigation into these screens.

## 8.12 `SHELL-GLOBAL-LAYER`

Used for:

* PWA prompt;
* offline banner;
* consent;
* update toast;
* language selector;
* theme selector;
* and accessibility settings.

These states appear in relation to the current page and must not replace it unless the exact design says so.

---

# 9. GLOBAL RESPONSIVE RULES

Every mapped screen must be verified at applicable widths:

* 320px;
* 360px;
* 390px;
* 430px;
* 768px;
* 1024px;
* 1280px;
* 1366px;
* and 1440px.

## 9.1 Mobile root screen

A dashboard root screen must not show a Back button.

## 9.2 Mobile inner screen

Use the design-defined contextual Back header.

## 9.3 Table transformation

A desktop table must become the exact approved:

* cards;
* compact rows;
* accordion;
* or horizontal table

on mobile.

Do not squeeze all columns into 390px.

## 9.4 Modal transformation

Where specified:

* desktop modal → mobile bottom sheet;
* desktop drawer → mobile full page;
* desktop table → mobile cards;
* desktop split view → mobile list then detail.

## 9.5 Sticky elements

Sticky:

* CTA;
* composer;
* wizard footer;
* bottom navigation;
* comparison tray;
* and sheet actions

must not overlap.

## 9.6 Screen boundaries

The mobile design may intentionally omit desktop-only decorative content.

Do not force all desktop content into mobile when the source reorganizes it.

Do not omit required information merely to make mobile shorter.

---

# 10. DEFAULT STATE INHERITANCE

Unless the screen specification explicitly excludes a state, every applicable primary data screen must support:

* loading;
* skeleton;
* populated;
* empty;
* filtered empty;
* search no-results;
* safe error;
* Retry;
* unauthorized;
* forbidden;
* entity unavailable;
* provider Setup Required;
* provider runtime failure;
* stale state;
* submission in progress;
* success;
* and responsive state.

Only display states that apply to the current screen.

Do not show a normal empty screen when the real query failed.

---

# 11. KNOWN DESIGN SOURCE MANIFEST

## Batch 4

**Specification:**
`BATCH_04_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md`

**Design HTML:**
`Batch 4 - Detail Pages (Standalone).html`

Verify exact filename case in the folder.

## Batch 5

**Specification:**
`BATCH_05_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md`

**Design HTML:**
`Batch 5 - Posting Wizards (Standalone).html`

## Batch 6

**Specification:**
`BATCH_06_FULL_DESIGN_FUNCTIONALITY_VERIFICATION_SPEC.md`

**Design HTML:**
`Batch 6 - Owner Dashboard (Standalone).html`

## Batch 7

**Specification:**
`BATCH_DOCUMENT_04_DESIGN_BATCH_07_BROKER_DASHBOARD_FULL_SPEC.md`

**Design HTML:**
`Batch 7 - Broker Dashboard (Standalone).html`

## Batch 8

**Specification:**
`BATCH_DOCUMENT_05_DESIGN_BATCH_08_BUILDER_DASHBOARD_FULL_SPEC.md`

**Design HTML:**
`Batch 8 - Builder Dashboard (Standalone).html`

## Batch 9

**Specification:**
`BATCH_DOCUMENT_06_DESIGN_BATCH_09_SHARED_DETAIL_VIEWS_FULL_SPEC.md`

**Design HTML:**
`Batch 9 - Shared Detail Views (Standalone) (1).html`

Do not silently substitute a similarly named file without `(1)`.

## Batch 10

**Specification:**
`BATCH_DOCUMENT_07_DESIGN_BATCH_10_BILLING_PAYMENTS_FULL_SPEC.md`

**Design HTML:**
`Batch 10 - Billing & Payments (Standalone).html`

## Batch 11

**Specification:**
`BATCH_DOCUMENT_08_DESIGN_BATCH_11_ADMIN_MANAGEMENT_MODERATION_FULL_SPEC.md`

**Design HTML:**
`Batch 11 - Admin Management (Standalone).html`

## Batch 12

**Specification:**
`BATCH_DOCUMENT_09_DESIGN_BATCH_12_ADMIN_BILLING_PAYMENTS_FULL_SPEC.md`

**Design HTML:**
`Batch 12 - Admin Billing (Standalone).html`

## Batch 13

**Specification:**
`BATCH_DOCUMENT_10_DESIGN_BATCH_13_ADMIN_ADS_NOTIFICATIONS_SYSTEM_FULL_SPEC.md`

**Design HTML:**
`Batch 13 - Admin Ads Notifications System (Standalone).html`

## Batch 14

**Specification:**
`BATCH_DOCUMENT_11_DESIGN_BATCH_14_ADMIN_CMS_SEO_LOCATIONS_FULL_SPEC.md`

**Design HTML:**
`Batch 14 - Admin CMS & SEO (Standalone).html`

## Batch 15

**Specification:**
`BATCH_DOCUMENT_12_DESIGN_BATCH_15_ADMIN_AUDIT_SECURITY_REPORTS_FULL_SPEC.md`

**Design HTML:**
`Batch 15 - Admin Audit Security Reports (Standalone).html`

## Batch 16

**Specification:**
`BATCH_DOCUMENT_13_DESIGN_BATCH_16_PUBLIC_CONTENT_PAGES_FULL_SPEC.md`

**Design HTML:**
`Batch 16 - Public Content Pages (Standalone).html`

## Batch 17

**Specification:**
`BATCH_DOCUMENT_14_DESIGN_BATCH_17_ADVANCED_PWA_LOCALIZATION_TOOLS_FULL_SPEC.md`

**Design HTML:**
`Batch 17 - Advanced PWA Localization Tools (Standalone).html`

---

# 12. DESIGN BATCH 4 — DETAIL PAGES AND PUBLIC PROFILES

**Default shell:** Public shell
**Primary roles:** Guest, Owner, Broker, Builder
**Screen groups:** 10

---

## B4-S01 — Property Detail

**Canonical route:**
`/property/[slug]`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Access:**

* Guest;
* Owner;
* Broker;
* Builder;
* Staff as normal public viewer.

**Desktop shell:**

* public header;
* canonical breadcrumb;
* gallery grid;
* main detail column;
* contact sidebar;
* similar listings;
* no dashboard sidebar.

**Mobile shell:**

* contextual mobile header;
* swipeable media;
* compact facts;
* Owner/Broker contact card;
* sticky Call;
* sticky Enquire Now.

**Mandatory visible targets:**

* breadcrumb;
* gallery grid;
* View All Photos;
* price;
* verification status;
* title;
* location;
* posted date;
* key facts;
* description;
* Read More;
* amenities;
* location/map;
* seller card;
* masked phone;
* Reveal Number;
* Enquire;
* similar properties;
* share;
* save;
* report.

**Mandatory states:**

* active/public;
* unavailable/sold;
* unavailable/rented;
* safely removed/no longer available;
* no approved media;
* media loading;
* map active;
* map Setup Required;
* map runtime failure with address;
* saved;
* unsaved;
* auth required;
* contact masked;
* contact revealed;
* self-action blocked;
* enquiry existing;
* enquiry submitting;
* error.

**Connected overlays:**

* authentication;
* contact reveal;
* report;
* share/copy link;
* fullscreen gallery.

**Screen boundary:**

Start at the public screen header shown by the design.

End after the final similar-property or unavailable-alternative section shown by the HTML.

Do not append legacy property sections.

---

## B4-S01-U — Unavailable Property Tombstone

**Route:**
Same `/property/[slug]`

**Route status:** `STATE`

This is not a generic 404.

**Mandatory design content:**

* unavailable message;
* safe reason;
* safe unavailable date;
* safe property context;
* similar alternatives;
* filtered Browse All link.

**Do not display:**

* contact sidebar;
* enquiry CTA;
* active listing status;
* private moderation reason.

---

## B4-S02 — Project Detail

**Canonical route:**
`/project/[slug]`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Access:** Public.

**Desktop shell:**

* public header;
* project hero;
* project tabs;
* project content;
* enquiry/sidebar area where shown.

**Mobile shell:**

* contextual header;
* compact Project identity;
* scrollable tab strip;
* stacked configurations;
* sticky Call;
* sticky Enquire.

**Required tabs:**

1. Overview
2. Floor Plans
3. Amenities
4. Location
5. Gallery
6. Video
7. 360° Tour

**Mandatory content:**

* Builder identity;
* Project name;
* RERA status;
* location;
* Builder;
* price range;
* possession;
* available Units/configurations;
* construction milestones;
* brochure;
* similar projects;
* Builder mini card;
* project enquiry options;
* Site Visit entry.

**Required states:**

* RERA verified;
* RERA registered but not verified;
* RERA pending;
* brochure available;
* brochure unavailable;
* Video available;
* Video not uploaded;
* 360 Tour available;
* provider Setup Required;
* map Setup Required;
* no available configurations;
* contact masked/revealed;
* auth required;
* self-enquiry blocked;
* error.

---

## B4-S03 — Requirement Detail

**Canonical route:**
`/requirement/[displayId]`

**Route status:** `CANONICAL / RESTRICTED-PUBLIC`

**Guest state:**

* locked teaser;
* title;
* limited budget/location context;
* truncated description;
* Login to View Full Requirement;
* visibility explanation.

**Eligible authenticated access:**

* Owner;
* Broker;
* Builder

according to final permission and verification rules.

**Unauthorized authenticated state:**

* explicit forbidden/eligibility explanation;
* not a misleading login prompt.

**Full design content:**

* display ID;
* active status;
* title;
* posted date;
* purpose/type;
* budget;
* preferred locations;
* timeline;
* description;
* masked requester identity;
* Send Proposal.

**Required states:**

* Guest teaser;
* authenticated eligible;
* authenticated ineligible;
* active;
* closed;
* expired;
* proposal available;
* proposal already exists;
* plan/quota blocked;
* auth return state;
* unavailable.

**SEO:**

* Noindex;
* excluded from public Sitemap.

---

## B4-S04 — Broker Public Profile

**Canonical route:**
`/broker/[slug]`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Shell:** Public.

**Content:**

* avatar/initials;
* Broker name;
* business/agency;
* years active;
* member since;
* verification state;
* service areas;
* active listing count;
* active listings;
* Reviews Coming Soon;
* Contact Broker;
* overflow Report.

**Required states:**

* active public profile;
* no listings;
* claimable;
* already claimed;
* contact masked;
* auth required;
* contact revealed;
* unavailable/private;
* paginated listings;
* error.

**Mobile:**

* contextual header;
* compact identity;
* key counts;
* Contact Broker action;
* profile overflow.

Do not include full phone in the initial render.

---

## B4-S05 — Builder Microsite

**Canonical route:**
`/builder/[slug]`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Content:**

* Builder avatar/initials;
* company name;
* real RERA information;
* founded year;
* headquarters;
* delivered Project count;
* Contact Builder;
* Active Projects tab;
* Completed Projects tab;
* About tab;
* claim CTA only when eligible.

**Required states:**

* active projects;
* completed projects;
* no active projects;
* no completed projects;
* claimable;
* claimed;
* contact masked;
* contact revealed;
* provider/auth required;
* unavailable profile.

**Mobile:**

* contextual header;
* compact summary;
* tab transformation;
* contact action.

---

## B4-S06 — Owner Public-Safe Profile

**Canonical route:**
`/owner/[slug]`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Content:**

* safe avatar/initials;
* safe display name;
* Owner label;
* active public listing count;
* member since;
* public listings only where shown.

**Prohibited:**

* direct Owner phone;
* email;
* exact private address;
* direct profile contact reveal.

**Contact path:**

Contact through an individual listing enquiry.

**Required states:**

* public/semi-public;
* private profile safe unavailable;
* no active listings;
* active listings;
* report overlay where permitted.

---

## B4-S07 — Claim Profile Flow

**Route:**
Opened from eligible Broker or Builder public profile.

**Route status:** `OVERLAY`

**Desktop:** Modal.
**Mobile:** Bottom sheet or exact source-defined sheet.

**Content:**

* actual company/profile name;
* claimant relationship options;
* proof upload;
* RERA/GST proof guidance;
* submit for review;
* review timing only if operationally approved.

**Required states:**

* Guest → authentication → resume claim;
* eligible profile;
* already claimed;
* pending claim already exists;
* upload progress;
* upload validation error;
* storage Setup Required;
* submitting;
* submitted;
* blocked.

Do not create a full separate claim page unless the source explicitly shows one.

---

## B4-S08 — Report Content Flow

**Route:**
Opened from listing, project, requirement, Broker, Builder, Owner or supported target.

**Route status:** `OVERLAY`

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* correct target noun;
* structured reasons;
* Details field;
* submit;
* cancel/close.

**Required reasons:**

* Spam or duplicate;
* Fraud/suspicious;
* Incorrect information;
* Inappropriate content;
* Other.

**Required states:**

* Guest eligibility according to policy;
* authenticated;
* invalid target;
* duplicate report;
* submission in progress;
* submitted;
* validation error;
* server error.

The underlying page must remain visible in the background.

---

## B4-S09 — Fullscreen Gallery

**Route:**
Route-backed overlay associated with Property or Project.

Logical forms:

* `/property/[slug]?gallery=1`
* `/project/[slug]?gallery=1`

Equivalent route architecture may remain.

**Route status:** `FULLSCREEN-OVERLAY`

**Shell:** `SHELL-NONE-FULLSCREEN`

**Content:**

* actual media;
* index/count;
* close;
* previous;
* next;
* thumbnail/filmstrip where shown;
* captions/categories where shown.

**Required behavior:**

* opens from exact selected media;
* keyboard navigation;
* swipe;
* escape/close;
* focus restoration;
* unauthorized media blocked;
* Draft/private media unavailable publicly.

**States:**

* loading;
* image;
* video where supported;
* media error;
* no eligible media;
* end/start navigation.

---

## B4-S10 — Property Comparison Page

**Canonical route:**
`/compare`

**Route status:** `CANONICAL / PUBLIC-SYSTEM`

**Shell:** Public, unless the exact screen suppresses the header.

**Content:**

* selected Property columns;
* images;
* pricing;
* facts;
* amenities;
* location;
* remove;
* clear;
* empty slots;
* mobile comparison behavior.

**States:**

* no items;
* one item;
* two or more;
* unavailable item;
* removed item;
* loading;
* compare capacity reached;
* cross-navigation persistence.

Batch 17 owns the final advanced comparison capacity and persistent tray behavior.

Do not create two separate comparison systems.

---

# 13. DESIGN BATCH 5 — POSTING WIZARDS AND UNIT INVENTORY

**Default access:** Authenticated role
**Screen groups:** 4
**Step screens:** Property 9, Project 10, Requirement 7

---

## B5-S01 — Post Property Wizard

**Canonical Owner routes:**

* `/dashboard/owner/properties/new`
* `/dashboard/owner/properties/[id]/edit`

**Canonical Broker routes:**

* `/dashboard/broker/properties/new`
* `/dashboard/broker/properties/[id]/edit`

**Route status:** `ROLE-AWARE / EXISTING-EQUIVALENT-ALLOWED`

**Shell:**

* Owner → `SHELL-WIZARD-OWNER`
* Broker → `SHELL-WIZARD-BROKER`

**Mandatory screen targets:**

* shared desktop wizard shell;
* shared mobile wizard shell;
* Step X of 9;
* progress;
* Back;
* Save Draft;
* Continue;
* sticky footer;
* validation summary;
* autosave status;
* Draft Resume card;
* Media uploader;
* Location;
* map fallback;
* amenities;
* contact preferences;
* private Detail Preview;
* Submitted state;
* edit/reapproval warning.

**Exact step labels:**

Claude must read and preserve the exact nine labels and order from the HTML.

Do not invent a generic step list from documentation headings.

**Required states:**

* new;
* Draft;
* autosaving;
* saved;
* autosave error;
* resumed;
* validation error;
* media uploading;
* media failed;
* provider Setup Required;
* plan limit;
* Preview;
* submitting;
* duplicate Submit protected;
* Pending;
* Submitted;
* editing approved Listing;
* reapproval confirmation;
* blocked;
* forbidden.

**Mobile:**

* contextual wizard header;
* progress;
* one-column form;
* sticky actions;
* keyboard-safe footer.

**Preview:**

Must use Batch 4 Property Detail presentation in private Preview mode.

---

## B5-S02 — Post Project Wizard

**Canonical routes:**

* `/dashboard/builder/projects/new`
* `/dashboard/builder/projects/[id]/edit`

**Route status:** `CANONICAL / EXISTING-EQUIVALENT-ALLOWED`

**Access:** Builder.

**Shell:** `SHELL-WIZARD-BUILDER`

**Mandatory targets:**

* exact 10 steps;
* Step X of 10;
* shared Batch 5 shell;
* Developer identity;
* Project type;
* RERA state;
* location;
* landmarks;
* Tower/Wing/Floor/Unit structure;
* amenities;
* dates;
* construction foundation;
* media;
* brochure PDF;
* Floor Plans;
* Video;
* 360 Tour;
* contact;
* Project Preview;
* submission;
* Pending RERA Check;
* reapproval state.

**Exact step labels:**

Use the labels and sequence directly from the HTML.

**States:**

* Draft;
* resumed;
* RERA valid;
* invalid RERA;
* RERA pending;
* provider unavailable;
* Unit generation;
* duplicate generation protected;
* upload progress;
* Preview;
* plan blocked;
* Submit;
* Submitted;
* reapproval;
* forbidden.

**Preview:**

Must reuse Batch 4 Project Detail presentation in private mode.

---

## B5-S03 — Post Requirement Wizard

**Canonical role routes:**

* `/dashboard/owner/requirements/new`
* `/dashboard/owner/requirements/[id]/edit`
* `/dashboard/broker/requirements/new`
* `/dashboard/broker/requirements/[id]/edit`
* Builder requirement posting route only if the approved role policy and design explicitly allow it.

**Route status:** `ROLE-AWARE`

**Shell:** Role dashboard wizard shell.

**Mandatory targets:**

* exact seven steps;
* shared progress;
* sticky footer;
* Back;
* Save Draft;
* autosave;
* resume;
* Looking For;
* purpose/category;
* multi-City preferences;
* maximum five Localities;
* Missing Location request;
* budget;
* BHK;
* area;
* amenities;
* timeline;
* contact preferences;
* Preview;
* Pending/Live outcome.

**States:**

* new;
* Draft;
* autosaving;
* saved;
* Location limit;
* duplicate Location;
* missing Location requested;
* validation errors;
* Preview;
* plan limit;
* duplicate/spam warning;
* Pending;
* Submitted;
* restricted visibility.

---

## B5-S04 — Builder Unit Inventory Management

**Canonical route:**
`/dashboard/builder/projects/[id]/units`

**Unit edit state:**
Same route through modal/sheet or route-backed state.

**Access:** Builder owning the Project and authorized team members.

**Shell:** Builder dashboard.

**Desktop design:**

* Project context;
* Tower/Wing tabs;
* inventory table;
* sticky columns/header where shown;
* filters;
* selection;
* bulk action bar;
* Unit Edit modal.

**Mobile design:**

* contextual header;
* Tower accordion;
* Floor accordion;
* Unit cards;
* selection;
* bulk actions;
* Unit Edit bottom sheet.

**States:**

* loading;
* no Project;
* no structure;
* no Units;
* populated;
* filtered empty;
* Unit available;
* booked;
* sold;
* blocked transition;
* stale update;
* bulk update;
* partial bulk result;
* edit saving;
* error;
* forbidden.

---

# 14. DESIGN BATCH 6 — OWNER DASHBOARD

**Access:** Authenticated active Owner
**Shell:** `SHELL-DASHBOARD-OWNER`
**Screen groups:** 24

---

## B6-S01 — Owner Overview / Dashboard Home

**Canonical route:**
`/dashboard/owner`

**Variants:**

* Desktop full shell;
* stat-row skeleton;
* mobile root dashboard;
* mobile drawer open.

**Mobile title:** `Dashboard`

Do not show a Back button on the mobile root.

**Mandatory content:**

* timezone-correct greeting;
* active Property count;
* pending count;
* Lead count;
* Site Visit count;
* Plan usage;
* recent Leads;
* quick actions;
* notification;
* profile identity.

**States:**

* loading skeleton;
* populated;
* partial data failure;
* empty new account;
* Plan unavailable;
* error.

---

## B6-S02 — My Properties

**Canonical route:**
`/dashboard/owner/properties`

**Related routes:**

* new Wizard;
* edit Wizard;
* private pending Preview.

**Desktop:**

* status tabs;
* counts;
* list/table/card design from source;
* actions.

**Mobile:**

* contextual header;
* Property cards;
* overflow menu.

**Required actions:**

* View;
* Resume Draft;
* Edit;
* Pause;
* Resume;
* Delete/archive according to state.

**Variants:**

* desktop;
* delete confirmation;
* mobile overflow;
* empty state.

**States:**

* Draft;
* Pending;
* Live;
* Paused;
* Rejected;
* Expired;
* sold/rented where applicable;
* loading;
* filtered empty;
* error.

---

## B6-S03 — My Requirements

**Canonical route:**
`/dashboard/owner/requirements`

**Related routes:**

* new;
* edit;
* proposals.

**Desktop and mobile content:**

* real Requirement summary;
* status;
* proposal count;
* actions;
* pagination.

**Actions:**

* View;
* Edit;
* Close;
* Reopen;
* View Proposals;
* Resume Draft.

**States:**

* Draft;
* Pending;
* Active;
* Closed;
* Rejected;
* Expired;
* empty;
* filtered empty;
* error.

---

## B6-S04 — Owner Leads List

**Canonical route:**
`/dashboard/owner/leads`

**Desktop:** Table.
**Mobile:** Cards.

**Content:**

* Lead identity;
* Property;
* source;
* stage;
* time;
* contact state;
* actions.

**States:**

* loading;
* empty;
* filtered empty;
* error;
* paginated;
* search results.

---

## B6-S05 — Owner Quick Lead Detail

**Logical route/state:**

* opened from Leads list;
* desktop 480px right drawer;
* mobile full page;
* Open Full Detail connects to Batch 9.

**Canonical full detail:**
`/dashboard/leads/[id]`

**Required content:**

* Lead identity;
* listing context;
* masked/revealed contact;
* stage;
* Call;
* Message;
* Site Visit;
* notes;
* timeline;
* follow-up.

**States:**

* masked;
* revealed;
* auth/plan blocked;
* loading;
* stale;
* error;
* forbidden.

The drawer is not a replacement for Batch 9 full Lead workspace.

---

## B6-S06 — Owner Messages Thread List

**Canonical route:**
`/dashboard/messages`

May resolve Owner shell from session.

**Desktop:** Two-pane layout with selected Thread where shown.
**Mobile:** Thread list.

**Content:**

* participant;
* related entity;
* latest message;
* time;
* unread;
* search;
* filters;
* archive.

**States:**

* all;
* unread;
* archived;
* empty;
* no search result;
* loading;
* error.

---

## B6-S07 — Owner Message Thread Detail

**Canonical route:**
`/dashboard/messages/[threadId]`

**Desktop:** Right pane of split layout or dedicated route.
**Mobile:** Dedicated page.

**Content:**

* contextual header;
* safety banner;
* day groups;
* messages;
* attachments where available;
* sticky composer;
* send/retry.

**States:**

* sending;
* sent;
* failed;
* retry;
* attachment Setup Required;
* older-message pagination;
* participant forbidden;
* archived.

Notifications must open this route, not Lead Detail.

---

## B6-S08 — Owner Site Visits List

**Canonical route:**
`/dashboard/owner/site-visits`

**Content:**

* Upcoming;
* Past;
* Calendar where shown;
* requested date/time;
* Property;
* participant;
* status;
* actions.

**States:**

* requested;
* accepted;
* rescheduled;
* rejected;
* completed;
* cancelled;
* empty;
* loading;
* error.

---

## B6-S09 — Owner Site Visit Detail and Reject Confirmation

**Canonical route:**
`/dashboard/owner/site-visits/[id]`

**Desktop temporary rejection:** Modal.
**Mobile detail:** Full page.
**Mobile temporary rejection:** Bottom sheet or exact design confirmation.

**Content:**

* visit context;
* private address policy;
* map/address fallback;
* Directions;
* Accept;
* Reschedule;
* Reject;
* reason;
* timeline.

---

## B6-S10 — Saved Properties

**Canonical route:**
`/dashboard/owner/saved`

**Tab/state:** Saved Properties.

**Content:**

* saved Property cards;
* remove;
* open;
* compare where shown;
* pagination.

**States:**

* populated;
* empty;
* unavailable saved item;
* loading;
* error.

---

## B6-S11 — Saved Searches

**Canonical route:**
`/dashboard/owner/saved?tab=searches`

Equivalent tab route may remain.

**Content:**

* query summary;
* filters;
* match count;
* alert preference;
* open results;
* delete.

**States:**

* alert on;
* alert off;
* zero matches;
* new matches;
* empty;
* provider unavailable;
* error.

---

## B6-S12 — Recently Viewed

**Canonical route:**
`/dashboard/owner/saved?tab=recent`

Equivalent dedicated route may remain.

**Content:**

* real recent viewing history;
* Property/Project cards;
* clear where designed.

**States:**

* populated;
* empty;
* unavailable item;
* loading;
* error.

---

## B6-S13 — Owner Analytics

**Canonical route:**
`/dashboard/owner/analytics`

**Variants:**

* populated;
* insufficient data;
* Provider Setup Required.

**Content:**

* real 14-day chart;
* Lead source breakdown;
* date context;
* listing performance where shown.

Do not display simulated chart data.

---

## B6-S14 — Owner Subscription Overview

**Canonical route:**
`/dashboard/owner/billing`

**Content:**

* Trial banner;
* Plan;
* cycle;
* renewal;
* status;
* listing meter;
* featured slot meter;
* Upgrade/Manage actions.

**States:**

* free;
* trial;
* active;
* cancelled;
* expiring;
* expired;
* manually activated;
* provider Setup Required.

Uses Batch 10 financial authority.

---

## B6-S15 — Owner Invoice List

**Canonical route:**
`/dashboard/owner/billing/invoices`

Equivalent Billing tab may remain.

**Desktop:** Table.
**Mobile:** Cards.

**Content:**

* invoice number;
* date;
* amount;
* status;
* View;
* PDF.

**States:**

* empty;
* paginated;
* paid;
* pending;
* failed/void according to policy;
* PDF unavailable;
* loading;
* error.

---

## B6-S16 — Owner Invoice Detail

**Canonical route:**
`/dashboard/owner/billing/invoices/[id]`

**Content:**

* immutable invoice snapshot;
* line items;
* discounts;
* taxes;
* total;
* billed-to;
* GSTIN;
* Print;
* PDF Download.

**States:**

* loading;
* available;
* PDF generating;
* PDF unavailable;
* forbidden;
* error.

---

## B6-S17 — Owner Pricing / Upgrade

**Route:**
Inside Owner Billing or canonical role-aware Pricing route.

**Content:**

* real role plans;
* current plan;
* available plans;
* feature comparison;
* Upgrade;
* downgrade rules;
* selected-plan checkout entry.

Uses exact Batch 10 design contract.

---

## B6-S18 — Owner Verification

**Canonical route:**
`/dashboard/owner/verification`

**Variants:**

* not submitted;
* upload;
* Under Review;
* Approved;
* Rejected;
* resubmit.

**Content:**

* private proof upload;
* timeline;
* current status;
* real rejection reason;
* Resubmit.

---

## B6-S19 — Owner Profile Edit

**Canonical route:**
`/profile`

or one final canonical Owner profile route.

**Content:**

* avatar;
* crop;
* display name;
* safe public profile controls;
* mobile;
* email;
* address and privacy fields where designed.

**States:**

* edit;
* saving;
* saved;
* field error;
* upload;
* verified mobile locked;
* re-verification required.

---

## B6-S20 — Owner Notifications Center

**Canonical route:**
`/dashboard/owner/notifications`

**Content:**

* grouped notifications;
* unread;
* read;
* mark one;
* mark all;
* pagination;
* correct deep links.

**States:**

* empty;
* unread;
* read;
* filtered;
* loading;
* error.

---

## B6-S21 — Owner Support / Help

**Canonical route:**
`/dashboard/owner/support`

Equivalent shared authenticated Support route may remain.

**Content:**

* FAQ;
* create Ticket;
* Ticket list;
* Ticket detail/thread;
* status.

**States:**

* no Tickets;
* open;
* waiting;
* resolved;
* provider delivery skipped;
* loading;
* error.

---

## B6-S22 — Owner Settings

**Canonical route:**
`/dashboard/owner/settings`

**Content:**

* notification preferences;
* privacy;
* appearance;
* localization;
* account settings;
* Danger Zone entries.

Do not duplicate Batch 17 preferences with conflicting storage.

---

## B6-S23 — Owner Role Change Request

**Canonical route:**
`/dashboard/owner/settings/role-change`

**Content:**

* eligible target role;
* impact;
* subscription implications;
* submit;
* pending;
* withdraw.

**States:**

* no request;
* pending;
* approved;
* rejected;
* withdrawn;
* target role blocked;
* active subscription migration warning.

---

## B6-S24 — Owner Account Data, Export and Deletion

**Canonical route:**
`/dashboard/owner/settings/data`

**Content:**

* Data Export;
* export status;
* private Download;
* OTP re-verification;
* Account Deletion request;
* type `DELETE`;
* 30-day grace;
* cancel deletion.

**States:**

* no export;
* export queued;
* processing;
* ready;
* expired Download;
* export failed;
* deletion requested;
* grace period;
* cancelled;
* deletion processing;
* retained-data explanation.

---

# 15. DESIGN BATCH 7 — BROKER DASHBOARD

**Access:** Authenticated active Broker and scoped team members
**Shell:** `SHELL-DASHBOARD-BROKER`
**Screen groups:** 22

---

## B7-S01 — Broker Overview

**Canonical route:**
`/dashboard/broker`

**Content:**

* Broker-specific metrics;
* Listings;
* Requirements;
* Leads/CRM;
* Proposals;
* Plan usage;
* quick actions;
* recent activity;
* notification/profile controls.

**Variants:**

* desktop;
* skeleton;
* mobile root;
* mobile drawer.

Do not use Owner metrics with changed labels.

---

## B7-S02 — Broker My Properties

**Canonical route:**
`/dashboard/broker/properties`

**Broker-specific content:**

* Featured chip;
* promotion expiry;
* status;
* Lead count;
* actions;
* tabs;
* counts;
* pagination.

**States:**

* Draft;
* Live;
* Pending;
* Rejected;
* Paused;
* Expired;
* Featured active;
* Featured expired;
* empty;
* error.

---

## B7-S03 — Broker Post Property Entry and Draft Resume

**Route:**
Entry surface inside Broker Properties.

**Wizard target:**
Batch 5 shared Property Wizard.

**Content:**

* usage;
* Start;
* Draft card;
* real Step progress;
* Continue Draft;
* Discard confirmation.

Do not implement a separate Broker wizard.

---

## B7-S04 — Broker My Requirements

**Canonical route:**
`/dashboard/broker/requirements`

**Broker delta:**

* For Client indicator;
* client-safe context;
* status;
* proposal count;
* Draft;
* actions.

**States:**

* own;
* for client;
* Draft;
* active;
* closed;
* empty;
* error.

---

## B7-S05 — Requirement Feed

**Canonical route:**
`/dashboard/broker/requirements/feed`

**Content:**

* eligible Requirements;
* service-area matching;
* match indicators;
* filters;
* alerts;
* open Detail;
* Send Proposal.

**States:**

* populated;
* no matches;
* filtered empty;
* verification required;
* plan blocked;
* provider/matching unavailable;
* loading;
* error.

---

## B7-S06 — Sent Proposals List

**Canonical route:**
`/dashboard/broker/proposals`

**Content:**

* status tabs;
* exact counts;
* Requirement;
* proposed Listing;
* recipient-safe context;
* updated time;
* actions;
* pagination.

**States:**

* Draft where allowed;
* Sent;
* Viewed;
* Accepted;
* Rejected;
* Withdrawn;
* expired;
* empty;
* filtered empty;
* error.

---

## B7-S07 — Broker Proposal Detail

**Canonical route:**
`/dashboard/proposals/[proposalId]`

Role-aware shared route.

**Content:**

* Requirement recap;
* proposed Property/Project;
* terms/message;
* status timeline;
* participant visibility;
* conversation;
* allowed actions.

Uses Batch 9 full Proposal Detail contract.

---

## B7-S08 — Send Proposal Flow

**Trigger:** Requirement Detail or Feed.

**Route status:** `OVERLAY`

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* Requirement context;
* eligible Listing selector;
* message/terms;
* quota;
* Submit.

**States:**

* loading listings;
* no eligible listings;
* duplicate existing Proposal;
* quota blocked;
* invalid Listing;
* submitting;
* submitted;
* error.

---

## B7-S09 — Broker CRM List View

**Canonical route:**
`/dashboard/broker/leads`

**Desktop:** CRM table/list.
**Mobile:** cards.

**Content:**

* search;
* filters;
* stages;
* listing;
* source;
* assignee;
* follow-up;
* actions;
* pagination;
* CSV export where shown;
* bulk actions where shown.

**States:**

* populated;
* empty;
* filtered empty;
* loading;
* error.

---

## B7-S10 — Broker CRM Kanban View

**Canonical route:**
`/dashboard/broker/leads?view=kanban`

Equivalent stable view route may remain.

**Desktop:**

* stage columns;
* cards;
* drag/drop;
* counts;
* horizontal Kanban scroll.

**Touch/mobile:**

Use exact fallback controls rather than desktop-only drag/drop.

**States:**

* populated;
* empty stage;
* moving;
* stale move;
* rejected transition;
* error.

---

## B7-S11 — Broker CRM Lead Detail

**Logical route/state:**

* desktop quick drawer;
* mobile full page;
* full workspace opens Batch 9 route.

**Content:**

* Lead;
* listing/proposal context;
* stage;
* assignee;
* notes;
* timeline;
* contact;
* follow-up;
* Message;
* Site Visit.

**States:**

* masked/revealed;
* assigned/unassigned;
* stale;
* forbidden;
* error.

---

## B7-S12 — Broker Messages

**Canonical route:**
`/dashboard/messages`

Uses Broker shell and Batch 9 message behavior.

**Required:**

* list;
* search;
* filters;
* archive;
* Thread Detail;
* attachments;
* safe composer;
* pagination.

---

## B7-S13 — Broker Site Visits

**Canonical route:**
`/dashboard/broker/site-visits`

Uses shared Batch 9 lifecycle.

**Required states:**

* requested;
* accepted;
* rescheduled;
* rejected;
* completed;
* disputed;
* empty;
* error.

---

## B7-S14 — Broker Saved Items and Searches

**Canonical route:**
`/dashboard/broker/saved`

**Content:**

* Saved Properties;
* Saved Projects where applicable;
* Saved Searches;
* recent items where shown;
* alert preferences.

---

## B7-S15 — Broker Analytics

**Canonical route:**
`/dashboard/broker/analytics`

**Content:**

* conversion funnel;
* Lead → Visit → Close;
* Listing ranking;
* date range;
* filters.

**States:**

* real data;
* insufficient data;
* provider Setup Required;
* loading;
* error.

---

## B7-S16 — Broker Billing Plan and Usage

**Canonical route:**
`/dashboard/broker/billing`

**Content:**

* plan;
* cycle;
* renewal;
* listing usage;
* Featured slot usage;
* trial;
* Upgrade/Manage.

Uses Batch 10 authority.

---

## B7-S17 — Broker Invoices and Invoice Detail

**Canonical routes:**

* `/dashboard/broker/billing/invoices`
* `/dashboard/broker/billing/invoices/[invoiceId]`

**Desktop:** Table/detail.
**Mobile:** Cards/detail.

Uses immutable Batch 10 Invoice presentation.

---

## B7-S18 — Broker Verification

**Canonical route:**
`/dashboard/broker/verification`

**Content:**

* Broker verification;
* private documents;
* optional RERA Agent proof where approved;
* optional GST Certificate;
* status timeline;
* rejection/resubmit.

---

## B7-S19 — Broker Profile Edit

**Canonical route:**
`/dashboard/broker/profile`

**Content:**

* Broker name;
* business/agency;
* service areas;
* experience;
* About;
* avatar;
* public Profile connection;
* privacy;
* verification truth.

Changes must update `/broker/[slug]` according to publication rules.

---

## B7-S20 — Broker Notifications Center

**Canonical route:**
`/dashboard/broker/notifications`

**Content:**

* Broker notification groups;
* feed alerts;
* Proposal;
* Lead;
* Message;
* Visit;
* Billing;
* verification;
* deep links;
* pagination.

---

## B7-S21 — Broker Support / Help

**Canonical route:**
`/dashboard/broker/support`

**Content:**

* Broker FAQ;
* create Ticket;
* Ticket list;
* Thread;
* status.

Uses canonical Support system.

---

## B7-S22 — Broker Settings

**Canonical route:**
`/dashboard/broker/settings`

**Content:**

* Requirement Feed alerts;
* notification preferences;
* privacy;
* appearance;
* language;
* team/business settings where shown;
* Danger Zone.

---

# 16. DESIGN BATCH 8 — BUILDER DASHBOARD

**Access:** Authenticated Builder and scoped team
**Shell:** `SHELL-DASHBOARD-BUILDER`
**Screen groups:** 27

---

## B8-S01 — Builder Overview

**Canonical route:**
`/dashboard/builder`

**Content:**

* Projects;
* Units;
* Leads;
* Site Visits;
* team;
* campaigns;
* operational activity;
* quick actions.

**Variants:**

* desktop;
* skeleton;
* mobile root;
* mobile drawer.

---

## B8-S02 — My Projects

**Canonical route:**
`/dashboard/builder/projects`

**Content:**

* filters;
* counts;
* Project rows/cards;
* View;
* Edit;
* Manage Units;
* Pause;
* Resume;
* archive/delete according to policy;
* pagination.

**States:**

* Draft;
* Pending;
* Live;
* Needs Changes;
* Rejected;
* Paused;
* completed;
* empty;
* error.

---

## B8-S03 — Project Wizard Entry, Edit and Reapproval Warning

**Trigger:** Builder Projects.

**Wizard authority:** Batch 5.

**Content:**

* start Project;
* Draft Resume;
* real progress;
* edit live Project warning;
* pending revision;
* old approved data remains public;
* new revision pending review.

---

## B8-S04 — Unit Inventory

**Canonical route:**
`/dashboard/builder/projects/[id]/units`

Uses Batch 5 Unit Inventory authority.

**Desktop:** sticky inventory table.
**Mobile:** Tower/Floor accordion and Unit cards.

---

## B8-S05 — Unit Edit

**Trigger:** Unit Inventory.

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* Unit identity;
* floor;
* configuration;
* area;
* price;
* status;
* Save.

**States:**

* available;
* booked;
* sold;
* blocked transition;
* stale;
* saving;
* error.

---

## B8-S06 — Project Leads

**Canonical route:**
`/dashboard/builder/leads`

**Content:**

* Project;
* Lead;
* source;
* stage;
* assigned Agent;
* Project filter;
* Agent filter;
* actions;
* pagination.

**Desktop:** Table.
**Mobile:** Cards.

---

## B8-S07 — Project Lead Detail

**Logical route/state:**

* quick detail from list;
* full Batch 9 Lead route.

**Builder-specific content:**

* Project context;
* Unit/configuration interest;
* assigned Agent;
* Assign/Reassign;
* timeline;
* Message;
* Site Visit.

---

## B8-S08 — Matching Requirements Feed

**Canonical route:**
`/dashboard/builder/requirements`

**Content:**

* eligible Requirements;
* real match criteria;
* Project/configuration relevance;
* filters;
* Send Proposal.

Do not show vague fake match percentages.

---

## B8-S09 — Builder Proposals

**Canonical route:**
`/dashboard/builder/proposals`

**Content:**

* Proposal list;
* Project-linked Proposal;
* status;
* detail;
* send;
* conversation;
* duplicate protection.

Uses Batch 9 Proposal Detail.

---

## B8-S10 — Builder Messages

**Canonical route:**
`/dashboard/messages`

Uses Builder shell and canonical Messages system.

---

## B8-S11 — Builder Site Visits

**Canonical route:**
`/dashboard/builder/site-visits`

**Builder-specific content:**

* Project;
* interested configuration;
* assigned Agent;
* requested date/time;
* lifecycle actions;
* feedback/dispute.

---

## B8-S12 — Agents / Team List

**Canonical route:**
`/dashboard/builder/team`

**Content:**

* Agent identity;
* status;
* assigned Leads/Visits;
* permissions summary;
* actions;
* seat usage;
* pagination.

**States:**

* active;
* invited;
* suspended;
* empty;
* seat limit;
* error.

---

## B8-S13 — Invite Agent

**Trigger/route:**
`/dashboard/builder/team/invite`

May use modal/sheet according to exact design.

**Content:**

* email/mobile;
* role;
* permissions preset;
* seat usage;
* invite.

**States:**

* provider active;
* Email provider missing but internal invite created;
* duplicate member;
* seat limit;
* submitting;
* invited;
* error.

---

## B8-S14 — Agent Permissions Editor

**Canonical route:**
`/dashboard/builder/team/[agentId]/permissions`

**Content:**

* module permissions;
* Project scope;
* Lead scope;
* Visit scope;
* Save;
* audit context.

**Mobile:** exact stacked permission design.

Permissions must affect backend access.

---

## B8-S15 — Ad Campaign List

**Canonical route:**
`/dashboard/builder/ads`

**Content:**

* campaign status;
* Project;
* targeting;
* schedule;
* spend/payment state;
* moderation state;
* actions;
* pagination.

**States:**

* Draft;
* payment pending;
* pending review;
* active;
* paused;
* rejected;
* expired;
* empty;
* error.

---

## B8-S16 — Create Ad Campaign

**Canonical route:**
`/dashboard/builder/ads/new`

**Content:**

* Project;
* creative;
* desktop/tablet/mobile creative requirements;
* targeting;
* City/locality;
* schedule;
* pricing;
* Preview;
* submit/payment.

Use exact create-wizard design.

---

## B8-S17 — Ad Campaign Detail

**Canonical route:**
`/dashboard/builder/ads/[campaignId]`

**Content:**

* campaign;
* creative variants;
* targeting;
* schedule;
* moderation;
* payment;
* status timeline;
* actions.

---

## B8-S18 — Ad Analytics

**Canonical route/state:**
Campaign analytics tab or dedicated route.

**Required states:**

* analytics available;
* insufficient data;
* Analytics Provider Setup Required;
* no fake impressions/clicks;
* loading;
* error.

---

## B8-S19 — Project Analytics

**Canonical route:**
`/dashboard/builder/analytics`

or Project-scoped analytics route where designed.

**Content:**

* Project filter;
* views;
* Leads;
* Visits;
* conversion;
* configuration performance;
* date range.

**States:**

* real data;
* insufficient data;
* provider missing;
* error.

---

## B8-S20 — Builder Billing and Ad Wallet

**Canonical route:**
`/dashboard/builder/billing`

**Content:**

* subscription;
* usage;
* Project limits;
* team limits;
* ad wallet;
* wallet ledger;
* recharge;
* plan actions.

Wallet credit must follow trusted payment verification.

---

## B8-S21 — Builder Invoices

**Canonical routes:**

* `/dashboard/builder/billing/invoices`
* `/dashboard/builder/billing/invoices/[invoiceId]`

Uses Batch 10 Invoice truth.

---

## B8-S22 — RERA / Verification

**Canonical route:**
`/dashboard/builder/verification`

**Content:**

* company verification;
* RERA proof;
* upload;
* status;
* timeline;
* rejection;
* resubmit.

Uploading proof alone must not display Verified.

---

## B8-S23 — Company Microsite Edit

**Canonical route:**
`/dashboard/builder/company-profile`

**Content:**

* company identity;
* About;
* founded year;
* headquarters;
* service locations;
* RERA public information;
* media;
* Preview;
* Save/Publish rules.

Updates connect to `/builder/[slug]`.

---

## B8-S24 — Construction Progress Update

**Canonical route:**
`/dashboard/builder/projects/[id]/progress`

**Content:**

* milestones;
* status;
* percentage;
* dates;
* media/evidence where shown;
* update history;
* Save/Submit.

Do not overwrite historical milestones with one synthetic percentage.

---

## B8-S25 — Builder Notifications Center

**Canonical route:**
`/dashboard/builder/notifications`

**Content:**

* Project;
* Lead;
* Agent;
* Visit;
* Ad;
* RERA;
* Billing;
* Support;
* correct deep links.

---

## B8-S26 — Builder Support / Help

**Canonical route:**
`/dashboard/builder/support`

Uses canonical Support Tickets.

---

## B8-S27 — Builder Settings

**Canonical route:**
`/dashboard/builder/settings`

**Content:**

* notification preferences;
* team defaults;
* privacy;
* appearance;
* language;
* business settings;
* Danger Zone where shown.

---

# 17. DESIGN BATCH 9 — SHARED DETAIL VIEWS

**Access:** Authorized Lead, Proposal, Thread or Site Visit participants
**Shell:** Role-aware dashboard
**Screen groups:** 15

---

## B9-S01 — Lead Full Detail

**Canonical route:**
`/dashboard/leads/[leadId]`

**Desktop:** Full page inside correct role shell.
**Mobile:** Full page.

**Content:**

* Lead identity;
* display ID;
* stage;
* source;
* related Property/Project;
* contact state;
* primary actions;
* tabs;
* complete timeline;
* notes;
* documents;
* related Proposal;
* Message;
* Site Visit.

This is separate from Batch 6/7 quick Lead drawer.

---

## B9-S02 — Lead Notes

**Location:** Lead Full Detail tab/section.

**Content:**

* notes list;
* pinned note;
* add;
* edit;
* author;
* timestamp;
* pagination where needed.

**Mobile Add/Edit:** Bottom sheet.

**States:**

* empty;
* populated;
* pinned;
* editing;
* save error;
* forbidden.

---

## B9-S03 — Follow-Up Reminder

**Trigger:** Lead Detail.

**Desktop:** Modal/panel according to source.
**Mobile:** Bottom sheet.

**Content:**

* date;
* time;
* reminder type;
* note;
* Save.

**States:**

* no reminder;
* scheduled;
* completed;
* cancelled;
* invalid past date;
* provider missing but internal reminder stored.

---

## B9-S04 — Closed / Lost Status Reason

**Trigger:** Lead stage transition.

**Content:**

* Closed/Won;
* Lost;
* structured reason;
* details;
* confirmation.

**States:**

* required reason missing;
* saving;
* saved;
* stale stage;
* error.

---

## B9-S05 — Duplicate Lead Detection and Merge

**Location:** Lead Detail warning/review.

**Content:**

* duplicate candidates;
* reason;
* compare;
* dismiss;
* merge;
* impact.

**States:**

* no duplicate;
* possible duplicate;
* dismissed;
* merged;
* stale;
* merge blocked;
* error.

Merge must be transaction-safe.

---

## B9-S06 — Contact Reveal Flow

**Trigger:** Lead/contact action.

**Three design steps:**

1. masked contact and reveal intent;
2. quota/consent confirmation;
3. revealed contact and actions.

**Actions:**

* Reveal;
* Call;
* Copy;
* WhatsApp.

**States:**

* masked;
* auth required;
* quota available;
* quota exhausted;
* self-action blocked;
* revealed;
* already revealed;
* provider fallback;
* error.

No full phone before successful reveal.

---

## B9-S07 — Proposal Full Detail

**Canonical route:**
`/dashboard/proposals/[proposalId]`

**Content:**

* Requirement recap;
* proposed Property/Project;
* terms;
* message;
* real status timestamps;
* timeline;
* embedded conversation;
* Withdraw where allowed.

**States:**

* Sent;
* Viewed;
* Accepted;
* Rejected;
* Withdrawn;
* expired;
* participant forbidden;
* error.

---

## B9-S08 — Messages Searchable Thread List

**Canonical route:**
`/dashboard/messages`

**Content:**

* search by participant;
* search by Property/Project;
* All;
* Unread;
* Archived;
* latest message;
* unread;
* archive;
* pagination.

**Mobile:** Swipe archive where designed.

---

## B9-S09 — Full Message Thread

**Canonical route:**
`/dashboard/messages/[threadId]`

**Content:**

* participant;
* related Lead;
* View Lead;
* safety banner;
* messages;
* read state;
* attachments;
* typing indicator only when real;
* sticky composer;
* older-message pagination.

---

## B9-S10 — Report Message Thread

**Trigger:** Message Thread overflow.

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* reason;
* details;
* safe context snapshot;
* submit.

**States:**

* duplicate Report;
* submitting;
* submitted;
* validation error;
* error.

---

## B9-S11 — Site Visit Request

**Trigger:** Lead/Project/Property.

**Desktop:** Modal or exact design panel.
**Mobile:** Bottom sheet.

**Content:**

* entity;
* participant;
* date;
* time;
* message;
* submit.

**States:**

* available;
* duplicate pending;
* unavailable slot;
* submitting;
* submitted;
* error.

---

## B9-S12 — Site Visit Response

**Canonical route/state:**
Site Visit detail.

**Actions:**

* Accept;
* Reschedule;
* Reject.

Reject requires reason.

**States:**

* requested;
* accepted;
* reschedule proposed;
* rejected;
* stale;
* error.

---

## B9-S13 — Site Visit Reminder Notification

**Location:** Notification and Visit detail.

**Content/actions:**

* visit summary;
* Confirm;
* Cancel;
* Directions where allowed.

**States:**

* reminder scheduled;
* delivered in-app;
* external provider skipped;
* confirmed;
* cancelled;
* expired.

---

## B9-S14 — Post-Visit Feedback

**Trigger:** Completed Visit.

**Content:**

* Interested;
* Not Interested;
* follow-up;
* structured outcome;
* notes.

**States:**

* pending;
* submitted;
* conflicting participant outcomes;
* error.

---

## B9-S15 — Site Visit Dispute

**Canonical state:** Visit detail Disputed.

**Content:**

* dispute warning;
* frozen timeline/actions;
* participant outcomes;
* Contact Support;
* support context.

**Actions must remain frozen until authorized resolution.**

---

# 18. DESIGN BATCH 10 — BILLING AND PAYMENTS

**Access:** Guest pricing, Owner, Broker, Builder
**Screen groups:** 15

---

## B10-S01 — Public Pricing

**Canonical route:**
`/pricing`

**Shell:** Public.

**Content:**

* role selector where designed;
* Plan cards;
* price;
* cycle;
* features;
* Most Popular;
* current Plan;
* CTA;
* comparison;
* FAQ.

**States:**

* Guest;
* authenticated;
* current Plan;
* unavailable Plan;
* no paid Plans;
* loading;
* error.

Guest selection must survive authentication.

---

## B10-S02 — Subscription Overview

**Canonical route:**
`/dashboard/{role}/billing`

**Role-aware presentation:**

* Owner;
* Broker;
* Builder.

**Content:**

* current Plan;
* status;
* renewal;
* usage;
* manage;
* cancel;
* upgrade.

---

## B10-S03 — Trial Banner

**Location:** Dashboard Billing and applicable dashboard surfaces.

**Content:**

* Trial status;
* time remaining;
* Plan;
* Upgrade;
* expiry explanation.

**States:**

* active;
* ending;
* expired;
* converted;
* revoked.

---

## B10-S04 — Change Plan / Prorated Preview

**Trigger:** Billing Upgrade/Change Plan.

**Desktop:** Modal/page according to source.
**Mobile:** Sheet/page according to source.

**Content:**

* current Plan;
* target Plan;
* proration;
* effective date;
* add-ons;
* coupon where applicable;
* confirm.

**States:**

* upgrade;
* downgrade;
* no proration;
* invalid transition;
* loading;
* error.

---

## B10-S05 — Checkout / Order Summary

**Canonical route:**
`/checkout`

or one secure route-backed checkout session.

**Content:**

* selected Plan;
* billing period;
* proration;
* add-ons;
* coupon;
* taxable subtotal;
* CGST/SGST or IGST;
* total;
* billing details;
* Pay.

**States:**

* loading;
* valid;
* coupon valid;
* coupon invalid;
* GST incomplete;
* pending payment detected;
* provider Setup Required;
* error.

---

## B10-S06 — Razorpay Checkout

**State:** Provider payment interface launched from trusted order.

**Required design state:**

* Test Mode ribbon only in Test Mode;
* payment provider loading;
* cancel/close behavior;
* provider unavailable.

Do not open Razorpay directly from a Pricing card.

---

## B10-S07 — Payment Verification / Processing

**Route:** Secure processing state.

**Shell:** Exact source, potentially full-screen/minimal.

**Content:**

* processing indicator;
* verification message;
* do not close warning where shown.

**States:**

* provider callback received;
* waiting for trusted verification;
* pending webhook;
* delayed;
* failed verification;
* timeout with safe retry/status check.

---

## B10-S08 — Verified Payment Success

**Route:** Server-authorized success state.

**Content:**

* verified success;
* Plan;
* amount;
* invoice link;
* continue.

A query parameter alone must not open this state.

---

## B10-S09 — Payment Failure

**Content:**

* failure;
* safe reason;
* Retry;
* change payment method;
* support link.

**States:**

* provider failure;
* cancelled;
* verification mismatch;
* amount mismatch;
* internal recovery required.

---

## B10-S10 — Duplicate / Pending Payment Detection

**Content:**

* existing pending payment;
* amount;
* started time;
* Resume/Check Status;
* cancel/create-new policy.

Do not create duplicate active orders for the same purchase.

---

## B10-S11 — Invoice List

**Canonical route:**
`/dashboard/{role}/billing/invoices`

**Desktop:** Table.
**Mobile:** Cards.

**Content:**

* invoice;
* date;
* amount;
* status;
* View;
* PDF;
* pagination.

---

## B10-S12 — Printable Invoice Detail

**Canonical route:**
`/dashboard/{role}/billing/invoices/[invoiceId]`

**Content:**

* immutable snapshot;
* seller/platform details;
* billed-to;
* line items;
* coupon;
* proration period;
* add-ons;
* tax;
* total;
* payment reference;
* Print;
* PDF.

---

## B10-S13 — Refund Request and Tracker

**Canonical route:**
`/dashboard/{role}/billing/refunds`

Equivalent invoice-linked route may remain.

**Content:**

* Payment/Invoice;
* refundable amount;
* full/partial;
* structured reason;
* details;
* submit;
* tracker;
* Admin decision;
* provider status.

**States:**

* eligible;
* not eligible;
* pending;
* approved;
* processing;
* processed;
* rejected;
* failed;
* partial remaining balance.

---

## B10-S14 — GST / Billing Details

**Canonical route:**
`/dashboard/{role}/billing/settings`

**Content:**

* B2C/B2B;
* business name;
* GSTIN;
* address;
* State;
* validation;
* Save.

Changes apply to future Invoice snapshots, not old invoices.

---

## B10-S15 — Manual Subscription Activation State

**Location:** Subscription Overview.

**Content:**

* Activated by support;
* Plan;
* start;
* end;
* support reference where appropriate.

Do not show:

* paid Payment;
* paid Invoice;
* fake transaction.

---

# 19. DESIGN BATCH 11 — ADMIN MANAGEMENT AND MODERATION

**Access:** Permission-scoped Staff and Super Admin
**Shell:** `SHELL-ADMIN`
**Screen groups:** 22

---

## B11-S01 — Permission-Aware Admin Overview

**Canonical route:**
`/admin`

**Content:**

* only permitted module cards;
* real queue counts;
* priority items;
* recent activity;
* Staff identity.

**States:**

* Super Admin;
* role-specific Staff;
* no module permission;
* loading;
* partial error;
* mobile drawer.

Do not leak unauthorized queue counts.

---

## B11-S02 — Forbidden Module Full Page

**Route:** Any unauthorized Admin module route.

**Content:**

* access denied;
* module name;
* safe navigation back;
* request access path only if approved.

Do not redirect silently to Overview and hide the denial.

---

## B11-S03 — User Management List

**Canonical route:**
`/admin/users`

**Content:**

* search;
* role;
* status;
* verification;
* date;
* filters;
* pagination;
* user rows/cards;
* masked contact based on permission.

**Mobile:** Admin cards or exact responsive table.

---

## B11-S04 — User Detail

**Canonical route:**
`/admin/users/[userId]`

**Content:**

* safe profile;
* role;
* status;
* verification;
* entity summaries;
* activity;
* subscription summary;
* actions;
* masked/private fields by permission.

---

## B11-S05 — Suspend / Ban User

**Trigger:** User Detail.

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* Suspend/Ban;
* duration;
* reason;
* impact;
* confirm.

**States:**

* active;
* suspended;
* banned;
* expired suspension;
* restored;
* stale;
* error.

---

## B11-S06 — Role Change Request Queue

**Canonical route:**
`/admin/role-changes`

**Content:**

* requester;
* current role;
* target role;
* submitted;
* status;
* subscription impact;
* pagination.

---

## B11-S07 — Role Change Request Detail

**Canonical route:**
`/admin/role-changes/[requestId]`

**Content:**

* User;
* current/target role;
* reason;
* entity impact;
* subscription migration;
* approve;
* reject;
* audit timeline.

---

## B11-S08 — Staff List

**Canonical route:**
`/admin/staff`

**Content:**

* Staff;
* role/preset;
* permissions;
* status;
* last activity;
* actions;
* pagination.

---

## B11-S09 — Staff Invite

**Canonical route:**
`/admin/staff/invite`

May use modal/sheet if exact design uses overlay.

**Content:**

* identity/contact;
* role/preset;
* initial permissions;
* invite.

**States:**

* Email provider active;
* provider missing but internal invite stored;
* duplicate Staff;
* pending invite;
* expired invite;
* error.

---

## B11-S10 — Staff Permissions Editor

**Canonical route:**
`/admin/staff/[staffId]/permissions`

**Content:**

* module matrix;
* read;
* create;
* update;
* approve;
* export;
* sensitive access;
* Save;
* impact.

---

## B11-S11 — Staff Activity / Audit History

**Canonical route:**
`/admin/staff/[staffId]/activity`

**Content:**

* actions;
* targets;
* times;
* results;
* filters;
* pagination.

---

## B11-S12 — Property Moderation Queue

**Canonical route:**
`/admin/moderation/properties`

**Content:**

* queue;
* oldest-first;
* status;
* submitter;
* City;
* assigned reviewer where shown;
* filters;
* pagination.

---

## B11-S13 — Property Moderation Detail

**Canonical route:**
`/admin/moderation/properties/[id]`

**Content:**

* exact Property Preview;
* submitted version;
* checklist;
* media;
* location;
* approve;
* reject;
* Needs Changes;
* mandatory reason;
* history.

---

## B11-S14 — Project Moderation with RERA Gate

**Canonical route:**
`/admin/moderation/projects/[id]`

**Content:**

* Project Preview;
* RERA;
* proof;
* Units;
* media;
* checklist;
* publication gate;
* approve/reject/Needs Changes;
* explicit exception where permitted.

---

## B11-S15 — Requirement Moderation

**Canonical route:**
`/admin/moderation/requirements/[id]`

**Content:**

* Requirement;
* privacy;
* duplicate/spam;
* contact preference;
* approve;
* reject;
* Needs Changes.

---

## B11-S16 — Missing Location Queue and Approval

**Canonical route:**
`/admin/moderation/locations`

**Content:**

* requested text;
* proposed parent;
* requester;
* context;
* duplicate candidates;
* approve/create;
* map/alias context where available;
* reject.

Connects to Batch 14 Location hierarchy.

---

## B11-S17 — Duplicate Listing Merge Review

**Canonical route:**
`/admin/moderation/duplicates/[id]`

**Content:**

* source records;
* similarities;
* media;
* ownership;
* retain/merge/reject duplicate;
* impact;
* audit.

---

## B11-S18 — Public Profile Claim Review

**Canonical route:**
`/admin/moderation/claims/[id]`

**Content:**

* claimant;
* target profile;
* relationship;
* private proof;
* verification context;
* approve;
* reject;
* reason.

---

## B11-S19 — Verification Request Queue

**Canonical route:**
`/admin/verification`

**Content:**

* user;
* role;
* type;
* age;
* status;
* filters;
* pagination;
* assignment.

---

## B11-S20 — Verification Request Detail

**Canonical route:**
`/admin/verification/[id]`

**Content:**

* private documents;
* user context;
* checks;
* approve;
* Needs Changes;
* reject;
* mandatory reason;
* timeline.

---

## B11-S21 — Support Ticket Queue

**Canonical route:**
`/admin/support`

**Content:**

* priority;
* status;
* category;
* user/guest;
* assigned Staff;
* updated;
* filters;
* pagination.

---

## B11-S22 — Support Ticket Detail, Thread and Macros

**Canonical route:**
`/admin/support/[ticketId]`

**Content:**

* Ticket context;
* user;
* billing/entity context;
* Thread;
* attachments;
* reply composer;
* macros;
* assign;
* escalate;
* resolve;
* reopen where allowed.

---

# 20. DESIGN BATCH 12 — ADMIN BILLING AND PAYMENTS

**Access:** Billing-capable Staff and Super Admin
**Shell:** `SHELL-ADMIN`
**Screen groups:** 17

---

## B12-S01 — Subscriptions List

**Canonical route:**
`/admin/billing/subscriptions`

**Content:**

* user;
* role;
* Plan;
* source;
* status;
* start/end;
* renewal;
* search;
* filters;
* pagination.

---

## B12-S02 — Subscription Detail and Manual Extend

**Canonical route:**
`/admin/billing/subscriptions/[id]`

**Content:**

* lifecycle;
* entitlements;
* usage;
* payments;
* invoices;
* trial;
* source;
* Extend action;
* mandatory reason;
* history.

---

## B12-S03 — Payments List

**Canonical route:**
`/admin/billing/payments`

**Content:**

* payment reference;
* user;
* provider;
* amount;
* currency;
* state;
* Test/Live;
* time;
* filters;
* pagination.

---

## B12-S04 — Payment Detail Safe Summary

**Canonical route:**
`/admin/billing/payments/[id]`

**Content:**

* trusted amount;
* provider IDs safely masked;
* order;
* capture;
* Payment state;
* Subscription;
* Invoice;
* events;
* reconciliation;
* no unsafe raw credentials.

---

## B12-S05 — Webhook Events Log and Retry

**Canonical route:**
`/admin/billing/webhooks`

**Content:**

* provider event;
* type;
* received;
* verification;
* processing;
* result;
* safe error;
* retry;
* pagination.

**States:**

* processed;
* duplicate;
* failed;
* retrying;
* dead-lettered;
* invalid signature.

---

## B12-S06 — Refund Request Queue

**Canonical route:**
`/admin/billing/refunds`

**Content:**

* requester;
* Payment;
* Invoice;
* reason;
* requested amount;
* refundable amount;
* status;
* filters;
* pagination.

---

## B12-S07 — Refund Detail and Decision

**Canonical route:**
`/admin/billing/refunds/[id]`

**Content:**

* Payment;
* prior refunds;
* remaining amount;
* requested full/partial;
* reason;
* approve;
* reject;
* decision reason;
* provider processing;
* history.

---

## B12-S08 — Credit Notes

**Canonical route:**
`/admin/billing/credit-notes`

**Content:**

* issued list;
* create;
* Invoice/refund relation;
* tax reversal;
* reason;
* immutable number;
* PDF/view;
* pagination.

---

## B12-S09 — Manual Subscription Activation

**Canonical route:**
`/admin/billing/manual-activation`

**Content:**

* user;
* Plan;
* duration;
* start/end;
* source `admin_grant`;
* reason;
* impact;
* activate.

No fake Payment or paid Invoice.

---

## B12-S10 — Admin Invoice List and Export

**Canonical route:**
`/admin/billing/invoices`

**Content:**

* Invoice;
* user;
* GST type;
* amount;
* status;
* date;
* filters;
* pagination;
* authorized Export.

---

## B12-S11 — Invoice Correction / Versioned Adjustment

**Canonical route:**
`/admin/billing/invoices/[id]/correction`

**Content:**

* original immutable Invoice;
* correction reason;
* corrected fields allowed by policy;
* version;
* replacement/credit relation;
* approval where required.

Do not rewrite historical snapshot silently.

---

## B12-S12 — Plans List

**Canonical route:**
`/admin/billing/plans`

**Content:**

* role;
* Plan;
* price;
* cycle;
* status;
* features;
* public visibility;
* order;
* actions.

---

## B12-S13 — Plan Create/Edit and Public Preview

**Canonical routes:**

* `/admin/billing/plans/new`
* `/admin/billing/plans/[id]`

**Content:**

* role;
* name;
* price;
* tax behavior;
* cycle;
* entitlements;
* limits;
* public copy;
* active;
* public Pricing preview;
* Save/Publish rules.

---

## B12-S14 — Coupon List

**Canonical route:**
`/admin/billing/coupons`

**Content:**

* code;
* percentage/flat;
* Plans;
* valid dates;
* usage;
* limit;
* status;
* actions;
* pagination.

---

## B12-S15 — Coupon Create/Edit

**Canonical routes:**

* `/admin/billing/coupons/new`
* `/admin/billing/coupons/[id]`

**Content:**

* code;
* discount type/value;
* Plans;
* valid dates;
* usage limit;
* eligibility;
* save;
* deactivate.

---

## B12-S16 — Trial Campaign List

**Canonical route:**
`/admin/billing/trials`

**Content:**

* campaign;
* role;
* duration;
* active user count;
* eligibility;
* status;
* actions;
* pagination.

---

## B12-S17 — Trial Grant / Revoke

**Canonical route/state:**
Campaign detail or User action.

**Content:**

* user;
* campaign;
* current Plan;
* eligibility;
* Grant;
* Revoke;
* mandatory reason;
* fallback Plan;
* impact.

---

# 21. DESIGN BATCH 13 — ADMIN ADS, NOTIFICATIONS AND SYSTEM

**Access:** Capability-scoped Staff/Super Admin
**Shell:** Admin except public Maintenance page
**Screen groups:** 16

---

## B13-S01 — Ads Approval Queue

**Canonical route:**
`/admin/ads`

**Content:**

* queue;
* real count;
* search Builder/Project;
* status;
* schedule;
* submitted time;
* filters;
* pagination.

**Desktop:** Table.
**Mobile:** Cards.

---

## B13-S02 — Ad Campaign Review Detail

**Canonical route:**
`/admin/ads/[campaignId]`

**Content:**

* desktop creative;
* tablet creative;
* mobile creative;
* targeting;
* Cities;
* Localities;
* audience;
* schedule;
* Project/RERA;
* payment;
* approve;
* reject;
* structured reason.

---

## B13-S03 — Active, Expired and Rejected Ads

**Canonical route:**
`/admin/ads/manage`

or tabs under `/admin/ads`.

**Content:**

* Active;
* Paused;
* Expired;
* Rejected;
* real performance where available;
* `—` when unavailable;
* actions;
* pagination.

---

## B13-S04 — Ad Fraud / Click Pattern Review

**Canonical route:**
`/admin/ads/fraud`

**Content:**

* campaign;
* safe patterns;
* truncated identifiers;
* suspected clicks;
* billing exclusion;
* Mark Fraud;
* Dismiss;
* reasons;
* audit.

---

## B13-S05 — Notification Templates List

**Canonical route:**
`/admin/notifications/templates`

**Content:**

* event key;
* channels;
* languages;
* Draft/Live;
* updated;
* actions;
* filters;
* pagination.

---

## B13-S06 — Notification Template Editor

**Canonical route:**
`/admin/notifications/templates/[id]`

**Content:**

* English;
* Gujarati;
* Hindi state;
* subject;
* body;
* controlled tokens;
* preview;
* Save Draft;
* Publish;
* versioning.

---

## B13-S07 — Notification Delivery Logs

**Canonical route:**
`/admin/notifications/logs`

**Content:**

* event;
* user;
* channel;
* provider;
* state;
* time;
* safe error;
* filters;
* pagination.

**States:**

* Sent;
* Failed;
* Skipped Provider Missing;
* queued;
* retrying.

---

## B13-S08 — Notification Default Preferences Matrix

**Canonical route:**
`/admin/notifications/defaults`

**Content:**

* event/category;
* In-app;
* Email;
* SMS;
* WhatsApp;
* Push;
* default choices;
* Save.

Defaults apply to new users and must not overwrite existing choices silently.

---

## B13-S09 — Provider Status Dashboard

**Canonical route:**
`/admin/providers`

**Content:**

* SMS/OTP;
* Payment;
* Email;
* WhatsApp;
* Maps;
* Storage/CDN;
* Analytics;
* Error monitoring;
* status;
* last test;
* safe configuration indicator.

**States:**

* Active;
* Error;
* Setup Required;
* Disabled;
* Test Mode;
* Degraded.

---

## B13-S10 — Provider Detail / Test Connection

**Canonical route:**
`/admin/providers/[providerKey]`

**Content:**

* safe status;
* write-only secret inputs;
* masked identifier;
* rotation;
* last test;
* Test Connection;
* safe result;
* Audit.

Never return stored secrets.

---

## B13-S11 — Feature Flags List

**Canonical route:**
`/admin/feature-flags`

**Content:**

* flag;
* description;
* state;
* rollout type;
* audience;
* updated;
* actions.

**Rollouts:**

* All Users;
* role percentage;
* internal only;
* other approved deterministic scopes.

---

## B13-S12 — Feature Flag Toggle Confirmation

**Trigger:** Feature Flags list.

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* flag;
* current/new state;
* rollout;
* impact;
* mandatory Audit note;
* confirm.

---

## B13-S13 — Maintenance Mode Control

**Canonical route:**
`/admin/system/maintenance`

**Content:**

* active state;
* public message;
* immediate activation;
* schedule;
* start;
* end/duration;
* expected back;
* Admin exception;
* confirm.

---

## B13-S14 — Public Maintenance Page

**Canonical route/system state:**
Public routes while Maintenance Mode is active.

**Shell:** `SHELL-NONE-FULLSCREEN`

**Content:**

* branding;
* maintenance message;
* expected-back time;
* safe retry/status;
* approved support path.

Admin access remains according to policy.

---

## B13-S15 — System Health Dashboard

**Canonical route:**
`/admin/system/health`

**Content:**

* uptime or Setup Required;
* incidents;
* job queue;
* median wait;
* DLQ count;
* backup metadata;
* provider summary;
* safe timestamps.

No fake green state.

---

## B13-S16 — Dead-Letter Queue

**Canonical route:**
`/admin/system/dlq`

**Content:**

* job;
* type;
* safe error;
* attempts;
* time;
* Retry;
* Dismiss;
* audit note;
* pagination.

**States:**

* empty;
* failed;
* retrying;
* recovered;
* dismissed;
* stale;
* error.

---

# 22. DESIGN BATCH 14 — ADMIN CMS, SEO AND LOCATIONS

**Access:** Content/SEO/Location-capable Staff
**Shell:** Admin
**Screen groups:** 12

---

## B14-S01 — CMS Pages List

**Canonical route:**
`/admin/content/pages`

**Content:**

* title;
* slug;
* status;
* revision;
* updated;
* author;
* search;
* filters;
* pagination;
* create/edit.

---

## B14-S02 — CMS Page Editor

**Canonical routes:**

* `/admin/content/pages/new`
* `/admin/content/pages/[contentId]`

**Content:**

* shared editor;
* title;
* blocks;
* toolbar;
* SEO sidebar;
* autosave;
* Preview;
* Save Draft;
* Publish;
* revision history.

---

## B14-S03 — Blog Posts List

**Canonical route:**
`/admin/content/blog`

**Content:**

* title;
* category;
* author;
* Draft/Published;
* date;
* search;
* filters;
* pagination.

---

## B14-S04 — Blog Post Editor

**Canonical routes:**

* `/admin/content/blog/new`
* `/admin/content/blog/[contentId]`

**Shared editor plus:**

* featured image;
* category;
* excerpt;
* author;
* publication date;
* SEO.

---

## B14-S05 — Legal Pages List and Restricted Editor

**Canonical route:**
`/admin/content/legal`

**Editor route:**
`/admin/content/legal/[contentId]`

**Content:**

* policy;
* version;
* status;
* effective date;
* Draft;
* sign-off pending;
* published;
* restricted editor;
* Legal Review Sign-Off;
* Publish disabled until approval.

---

## B14-S06 — Per-Page SEO Metadata Quick Edit

**Canonical route:**
`/admin/seo/metadata`

or contextual SEO action from Content list.

**Content:**

* entity/page;
* Meta Title;
* Description;
* canonical;
* indexability;
* search preview;
* save.

Changes must affect real public output.

---

## B14-S07 — Redirect Manager

**Canonical route:**
`/admin/seo/redirects`

**Content:**

* source;
* target;
* status code;
* active;
* hits where real;
* search;
* filters;
* pagination.

---

## B14-S08 — Redirect Create/Edit and Loop Prevention

**Canonical routes:**

* `/admin/seo/redirects/new`
* `/admin/seo/redirects/[id]`

**Content:**

* source;
* target;
* status;
* duplicate check;
* chain warning;
* loop warning;
* Save.

---

## B14-S09 — Sitemap Status and Exclusion Transparency

**Canonical route:**
`/admin/seo/sitemap`

**Content:**

* last generated;
* entry counts;
* content/entity types;
* excluded Draft/private/Admin routes;
* errors;
* Regenerate.

---

## B14-S10 — Location Hierarchy Tree

**Canonical route:**
`/admin/locations`

**Content:**

* Country;
* State;
* District;
* Taluka;
* City;
* Area;
* Locality;
* Society;
* Village where applicable;
* counts;
* expand/collapse;
* Add Child;
* search.

---

## B14-S11 — Location Create/Edit Multilingual

**Canonical routes:**

* `/admin/locations/new`
* `/admin/locations/[locationId]`

**Content:**

* type;
* parent;
* English;
* Gujarati;
* Hindi;
* aliases;
* misspellings;
* active/selectable;
* canonical slug;
* Save.

---

## B14-S12 — Missing Translation Tracker

**Canonical route:**
`/admin/translations`

**Content:**

* key/entity;
* English source;
* target language;
* current translation;
* status;
* stale indicator;
* filters;
* counts;
* edit/complete.

**States:**

* missing;
* pending;
* completed;
* stale;
* fallback active;
* validation error.

---

# 23. DESIGN BATCH 15 — ADMIN AUDIT, SECURITY AND REPORTS

**Access:** Sensitive capability-scoped Staff
**Shell:** Admin
**Screen groups:** 12

---

## B15-S01 — Audit Logs Viewer

**Canonical route:**
`/admin/audit`

**Content:**

* actor;
* action;
* target;
* module;
* result;
* time;
* reason;
* safe before/after;
* filters;
* search;
* pagination.

Audit is append-only.

Sensitive Audit access may itself be audited.

---

## B15-S02 — Security Events Dashboard

**Canonical route:**
`/admin/security`

**Content:**

* real security events;
* severity;
* type;
* safe user/device context;
* status;
* trends only when real;
* filters;
* pagination;
* action/escalation.

---

## B15-S03 — Reports / Fraud Queue

**Canonical route:**
`/admin/reports`

**Content:**

* target;
* category;
* reporter;
* severity;
* status;
* submitted;
* assignment;
* filters;
* pagination.

---

## B15-S04 — Report Detail and Enforcement

**Canonical route:**
`/admin/reports/[reportId]`

**Content:**

* target context;
* safe evidence;
* prior reports;
* reporter-safe context;
* moderation history;
* enforcement choices;
* dismiss;
* resolve;
* reason.

---

## B15-S05 — Duplicate Lead Review

**Canonical route:**
`/admin/reviews/duplicate-leads/[id]`

**Content:**

* Lead records;
* similarities;
* timeline;
* participants;
* merge impact;
* merge;
* dismiss;
* reason;
* audit.

---

## B15-S06 — Contact Reveal Logs

**Canonical route:**
`/admin/reviews/contact-reveals`

**Content:**

* viewer;
* target;
* time;
* quota;
* source;
* outcome;
* safe masked contact;
* filters;
* pagination.

Full contact visibility requires explicit sensitive permission.

---

## B15-S07 — Message Report Review

**Canonical route:**
`/admin/reviews/message-reports/[id]`

**Content:**

* reported Thread context;
* safe messages;
* participants;
* report reason;
* prior reports;
* enforcement;
* resolve/dismiss;
* mandatory reason.

---

## B15-S08 — Site Visit Dispute Review

**Canonical route:**
`/admin/reviews/site-visit-disputes/[id]`

**Content:**

* Visit;
* participants;
* outcomes;
* timeline;
* support context;
* evidence;
* resolution;
* reason;
* notifications.

---

## B15-S09 — Business Metrics

**Canonical route:**
`/admin/reports/business`

**Content:**

* database-backed metrics;
* date range;
* role;
* City;
* listings;
* Leads;
* conversions;
* billing metrics where permitted;
* export entry.

Behavioral analytics must show Setup Required when unavailable.

---

## B15-S10 — Export Management

**Canonical route:**
`/admin/exports`

**Content:**

* export type;
* requester;
* status;
* created;
* expiry;
* size;
* Download;
* retry;
* revoke;
* pagination.

**States:**

* queued;
* processing;
* ready;
* failed;
* expired;
* revoked.

---

## B15-S11 — Bulk Action Preview and Confirmation

**Trigger:** Supported Admin list selection.

**Route status:** `OVERLAY / MULTI-STEP`

**Content sequence:**

1. selection;
2. server preview;
3. included records;
4. excluded records;
5. real affected count;
6. impact;
7. confirmation;
8. execution result.

**States:**

* previewing;
* eligible;
* partial eligible;
* stale;
* executing;
* completed;
* partial;
* failed.

---

## B15-S12 — Maker-Checker Queue

**Canonical route:**
`/admin/approvals`

**Content:**

* maker;
* action;
* target;
* reason;
* waiting time;
* status;
* Approve;
* Reject;
* execution state;
* pagination.

**Rules reflected in UI:**

* self-action disabled;
* checker must differ from maker;
* Approved distinct from Executed;
* expired/stale;
* execution retry/recovery.

---

# 24. DESIGN BATCH 16 — PUBLIC CONTENT PAGES

**Access:** Public except authenticated Ticket list
**Shell:** Public unless exact overlay
**Screen groups:** 20

---

## B16-S01 — About

**Canonical route:**
`/about`

**Content:**

* approved CMS content;
* company introduction;
* mission/value sections shown by design;
* no fake statistics;
* CTA/links shown by source.

**Variants:** Desktop and responsive mobile/tablet.

---

## B16-S02 — Contact

**Canonical route:**
`/contact`

**Primary design reference:** Mobile.

**Content:**

* real contact channels;
* office/address only when approved;
* contact/support entry;
* provider fallback;
* no fake phone/email.

---

## B16-S03 — FAQ / Help Center

**Canonical route:**
`/help`

**Content:**

* categories;
* search where shown;
* accordion;
* published FAQ content;
* support CTA.

**States:**

* populated;
* no search results;
* loading;
* error.

---

## B16-S04 — Safety Guidelines

**Canonical route:**
`/safety`

**Primary design reference:** Mobile.

**Content:**

* approved safety guidance;
* report/support actions;
* published CMS authority.

---

## B16-S05 — Terms and Conditions

**Canonical route:**
`/legal/terms`

Uses shared Legal Reader.

---

## B16-S06 — Privacy Policy

**Canonical route:**
`/legal/privacy`

Uses shared Legal Reader.

---

## B16-S07 — Cookie Policy

**Canonical route:**
`/legal/cookies`

Uses shared Legal Reader.

Includes Manage Cookie Preferences action.

---

## B16-S08 — Refund Policy

**Canonical route:**
`/legal/refund`

Uses shared Legal Reader.

---

## B16-S09 — Cancellation Policy

**Canonical route:**
`/legal/cancellation`

Uses shared Legal Reader.

---

## B16-S10 — Listing Policy

**Canonical route:**
`/legal/listing-policy`

Uses shared Legal Reader.

---

## B16-S11 — Advertising Policy

**Canonical route:**
`/legal/advertising-policy`

Uses shared Legal Reader.

---

## B16-S12 — Verification Policy

**Canonical route:**
`/legal/verification-policy`

Uses shared Legal Reader.

---

## B16-S13 — Payment Policy

**Canonical route:**
`/legal/payment-policy`

Uses shared Legal Reader.

---

## B16-S14 — Disclaimer

**Canonical route:**
`/legal/disclaimer`

Uses shared Legal Reader.

---

## B16-S15 — Grievance Policy

**Canonical route:**
`/legal/grievance`

Uses shared Legal Reader.

**Shared Legal Reader requirements for B16-S05–S15:**

* published approved revision only;
* title;
* version;
* effective date;
* desktop sticky table of contents;
* mobile collapsible table of contents;
* section anchors;
* readable typography;
* no Draft leakage;
* no unapproved translation;
* canonical metadata;
* Print where shown;
* loading/error state.

---

## B16-S16 — Blog Listing

**Canonical route:**
`/blog`

**Content:**

* published posts;
* featured post;
* cards;
* categories;
* pagination/load more;
* search where shown;
* real author;
* real publication date.

**States:**

* populated;
* empty;
* filtered empty;
* loading;
* error.

---

## B16-S17 — Blog Post

**Canonical route:**
`/blog/[slug]`

**Content:**

* title;
* author;
* date;
* featured image;
* body;
* category;
* share;
* related posts where shown;
* CMS revision.

**States:**

* published;
* unavailable;
* loading;
* error.

---

## B16-S18 — Guest Support Request

**Canonical route:**
`/support`

**Content:**

* category;
* name;
* contact;
* subject;
* details;
* attachments if approved;
* submit.

**States:**

* form;
* validation error;
* submitting;
* submitted;
* rate limited;
* Email acknowledgment sent;
* Email provider missing but Ticket saved;
* error.

---

## B16-S19 — My Support Tickets and Read-Only Thread

**Canonical routes:**

* `/support/tickets`
* `/support/tickets/[ticketId]`

**Access:** Authenticated owner of Ticket.

**Content:**

* Ticket list;
* status;
* updated order;
* pagination;
* read-only Thread;
* real user messages;
* real support replies.

**States:**

* open;
* resolved;
* empty;
* loading;
* error;
* forbidden.

---

## B16-S20 — Cookie Preference Manager

**Triggers:**

* Cookie Policy;
* Footer;
* initial consent where applicable;
* Batch 17 Analytics Consent.

**Route status:** `GLOBAL OVERLAY`

**Desktop:** Modal.
**Mobile:** Bottom sheet.

**Content:**

* Essential always on;
* Analytics;
* Marketing;
* Reject Non-Essential;
* Save Preferences;
* policy version.

**States:**

* first visit;
* saved;
* revisited;
* save error;
* provider active/missing;
* safe-area state.

---

# 25. DESIGN BATCH 17 — ADVANCED PWA, LOCALIZATION AND TOOLS

**Access:** Global/public/authenticated depending on feature
**Screen groups:** 12

---

## B17-S01 — PWA Install Prompt

**Route status:** `GLOBAL OVERLAY`

**Content:**

* application identity;
* install benefit;
* Install;
* Not Now;
* close behavior according to design.

**Eligibility states:**

* unsupported;
* first session;
* second eligible session;
* snoozed for 30 days;
* prompt available;
* install accepted;
* dismissed;
* already installed;
* standalone mode.

Do not display a fake Install action.

---

## B17-S02 — Offline Banner

**Route status:** `GLOBAL`

**Placement:** Above the header where defined.

**Content:**

* Offline message;
* reconnect state;
* Retry/status indicator where shown.

**States:**

* online;
* offline;
* reconnecting;
* reconnected;
* Service Worker unavailable.

Do not claim server mutations succeeded while offline.

---

## B17-S03 — Language Selector

**Trigger:** Header, settings or global preference control.

**Desktop:** Dropdown/popover/modal according to source.
**Mobile:** Sheet according to source.

**Choices:**

* English;
* Gujarati;
* Hindi state where supported.

**States:**

* selected;
* saving;
* fallback;
* missing translation;
* error.

---

## B17-S04 — Theme Selector

**Trigger:** Header/settings/global preferences.

**Choices:**

* Light;
* Dark;
* System.

**States:**

* selected;
* system changed;
* guest persistence;
* authenticated synchronization;
* hydration;
* error.

Do not create an unrelated dark design.

---

## B17-S05 — Transliteration and Typo-Tolerant Search

**Location:** Shared Search interface.

**Content/state:**

* Gujarati written in Latin script;
* Gujarati script;
* common spelling variant;
* typo tolerance;
* grouped results;
* exact canonical result;
* no results;
* loading;
* error.

This is an enhancement to the canonical Batch 3 Search, not a separate search system.

---

## B17-S06 — EMI Calculator

**Canonical route:**
`/tools/emi-calculator`

May also open from Property context if shown.

**Content:**

* loan amount;
* interest;
* tenure;
* calculate;
* monthly EMI;
* principal;
* interest;
* total;
* breakdown.

**States:**

* initial;
* valid result;
* invalid input;
* reset;
* entity-prefilled;
* error.

---

## B17-S07 — Gujarat Stamp Duty Calculator

**Canonical route:**
`/tools/stamp-duty-calculator`

**Content:**

* property value;
* buyer type/category where approved;
* location;
* applicable inputs;
* estimated duty;
* registration;
* total;
* disclaimer.

**States:**

* valid;
* incomplete;
* rule/data unavailable;
* Setup Required if authoritative rates are not configured;
* reset.

Do not hard-code unverified current rates as permanent truth.

---

## B17-S08 — Gujarat Land Unit Converter

**Canonical route:**
`/tools/land-unit-converter`

**Content:**

* source unit;
* amount;
* target unit;
* result;
* reverse/swap;
* supported Gujarat land units;
* disclaimer where variation applies.

**States:**

* valid;
* invalid;
* unsupported conversion;
* reset.

---

## B17-S09 — Comparison Tray and Full Comparison

**Global tray:** Appears after adding eligible Properties.

**Full route:**
`/compare`

**Content:**

* selected items;
* remove;
* open comparison;
* count;
* limit feedback;
* full comparison table;
* mobile horizontal behavior.

**States:**

* zero;
* one;
* two;
* three;
* four;
* fifth item rejected with feedback;
* unavailable item;
* navigation persistence;
* pagination persistence;
* clear all.

This replaces or finalizes Batch 4 comparison behavior.

---

## B17-S10 — Analytics Consent Prompt

**Route status:** `GLOBAL OVERLAY`

Uses the same consent authority as Batch 16 Cookie Preferences.

**Content:**

* concise consent explanation;
* Essential;
* Analytics;
* Marketing where applicable;
* accept/save/reject controls.

**States:**

* no decision;
* accepted;
* rejected;
* partial;
* provider missing;
* policy changed;
* revisited.

Analytics must not initialize before applicable consent.

---

## B17-S11 — PWA Update Available Toast

**Route status:** `GLOBAL`

**Content:**

* update available;
* Update;
* Later/dismiss where shown.

**States:**

* update found;
* installing;
* ready;
* reloading;
* failed;
* dismissed.

Do not reload while the user has unsaved critical work without safe handling.

---

## B17-S12 — Accessibility Quick Settings

**Trigger:** Global accessibility entry.

**Desktop:** Popover/modal according to source.
**Mobile:** Bottom sheet.

**Controls may include:**

* text size;
* contrast/high contrast where approved;
* Reduce Motion;
* accessibility reset;
* other exact design controls.

**States:**

* default;
* modified;
* persisted;
* reset;
* error.

The controls must alter actual interface behavior.

Reset Accessibility must not erase Cookie consent or unrelated preferences.

---

# 26. CROSS-BATCH ROUTE CONTRACTS

## 26.1 Property creation to public Detail

`Owner/Broker Property Wizard`
→ Draft
→ Pending Moderation
→ Batch 11 Review
→ Published
→ `/property/[slug]`

Pending `View Listing` opens a private Preview, not public Detail.

## 26.2 Project creation to public Detail

`Builder Project Wizard`
→ RERA gate
→ Units
→ Moderation
→ Published
→ `/project/[slug]`

## 26.3 Requirement flow

Requirement Wizard
→ Pending Moderation
→ eligible Requirement visibility
→ `/requirement/[displayId]`
→ Send Proposal
→ `/dashboard/proposals/[proposalId]`
→ embedded Thread.

## 26.4 Lead flow

Public enquiry
→ canonical Lead
→ role Leads list
→ quick drawer/mobile detail
→ `/dashboard/leads/[leadId]`
→ Message/Site Visit.

## 26.5 Message flow

Lead/Proposal communication
→ one Thread
→ `/dashboard/messages`
→ `/dashboard/messages/[threadId]`

Notifications must open the Thread route.

## 26.6 Site Visit flow

Property/Project/Lead action
→ Visit Request
→ response
→ reminder
→ feedback
→ dispute where required
→ Admin review.

## 26.7 Billing flow

`/pricing`
→ auth return
→ `/checkout`
→ provider
→ processing
→ trusted Payment
→ Subscription
→ Invoice
→ user Billing
→ Admin Billing.

## 26.8 CMS flow

Admin Draft
→ review/sign-off
→ publish
→ Batch 16 public route
→ metadata/canonical/Sitemap update.

## 26.9 Ad flow

Builder Campaign
→ payment state
→ Admin Ads Queue
→ review
→ active/expired/rejected
→ fraud review where required.

## 26.10 Claim flow

Public claimable Profile
→ Claim overlay
→ private proof
→ Admin Claim Review
→ approved ownership
→ public Profile claim state update.

---

# 27. SHARED OVERLAY REGISTRY

The following actions must normally preserve the originating page in the background:

* authentication modal/sheet;
* contact reveal;
* report content;
* claim profile;
* send Proposal;
* schedule Site Visit;
* Lead follow-up;
* status reason;
* delete confirmation;
* rejection reason;
* Unit edit;
* Staff invite where designed;
* suspend/ban User;
* Feature Flag toggle;
* Cookie preferences;
* language selection;
* theme selection;
* accessibility settings;
* bulk action preview;
* and provider test result.

Do not replace these with unrelated full-page routes unless the exact source uses a page.

---

# 28. FULL-PAGE MOBILE TRANSFORMATION REGISTRY

The following must become full pages on mobile where specified:

* quick Lead Detail;
* Message Thread Detail;
* Site Visit Detail;
* Lead Full Detail;
* Proposal Detail;
* operational Admin detail where the exact design requires it;
* and complex Payment/Invoice screens.

The mobile full page must use:

* contextual header;
* correct Back behavior;
* safe-area spacing;
* no duplicate bottom navigation when suppressed by the design;
* and keyboard-safe actions.

---

# 29. TABLE-TO-MOBILE TRANSFORMATION REGISTRY

At minimum, verify exact mobile transformation for:

* Owner Leads;
* Owner Invoices;
* Broker CRM Leads;
* Broker Proposals;
* Builder Projects;
* Builder Unit Inventory;
* Builder Leads;
* Builder Team;
* Builder Ads;
* Admin Users;
* Admin Staff;
* moderation queues;
* verification queues;
* support queues;
* subscriptions;
* payments;
* webhooks;
* refunds;
* invoices;
* Plans;
* Coupons;
* trials;
* Ads;
* Notification logs;
* Audit logs;
* Reports;
* Exports;
* and Maker-Checker.

Do not use desktop table widths as the mobile solution.

---

# 30. ROUTE ACCESS MATRIX

## Public Guest

May access:

* public Property;
* public Project;
* Broker Profile;
* Builder Profile;
* public-safe Owner Profile;
* Requirement teaser;
* Pricing;
* About;
* Contact;
* Help;
* Safety;
* published Legal;
* Blog;
* Guest Support;
* tools;
* public Comparison;
* Maintenance page.

Auth required for protected actions.

## Owner

May access:

* Owner dashboard;
* own Property/Requirement Wizards;
* own entities;
* eligible full Requirements;
* shared Lead/Message/Visit pages where participant;
* Billing;
* verification;
* Support;
* Profile;
* Settings.

## Broker

May access:

* Broker dashboard;
* shared Property Wizard;
* own/client Requirements;
* Requirement Feed;
* Proposals;
* CRM;
* participant communication;
* Broker Billing;
* verification;
* public Profile management.

## Builder

May access:

* Builder dashboard;
* Project Wizard;
* Units;
* Builder Leads;
* Requirement Feed;
* Proposals;
* team;
* Ads;
* Billing/wallet;
* RERA;
* Microsite;
* progress.

## Staff

May access only explicitly permitted Admin modules.

## Super Admin

May access all internal modules subject to sensitive-action safeguards.

Super Admin is not exempt from:

* Audit;
* maker-checker separation;
* secret safety;
* private-document rules;
* financial verification;
* and reason requirements.

---

# 31. NAVIGATION DEEP-LINK REGISTRY

Every Notification, queue item, metric and recent-activity item must target a typed destination.

Examples:

* Lead notification → Lead Detail;
* Message notification → Thread;
* Visit notification → Visit Detail;
* Proposal notification → Proposal Detail;
* listing moderation → entity review;
* verification update → verification route;
* billing notification → Payment/Invoice/Subscription;
* support reply → Ticket Thread;
* Role Change result → Role Change state;
* Ad decision → Campaign Detail;
* provider error → Provider Detail;
* DLQ alert → Job Detail/queue;
* CMS publish → Content Editor or public page;
* dispute → Admin dispute review.

Do not route all activity to dashboard home.

---

# 32. SCREEN BOUNDARY RECORD REQUIREMENT

Before coding each registered screen, Claude must add or internally record:

```md
DESIGN BOUNDARY RECORD

- Registry ID:
- Design filename:
- Exact internal screen heading:
- Exact desktop screen start:
- Exact desktop screen end:
- Exact mobile screen start:
- Exact mobile screen end:
- Presentation-only wrapper excluded:
- Header present:
- Sidebar present:
- Topbar present:
- Mobile contextual header present:
- Bottom navigation present:
- Footer present:
- Sticky CTA present:
- Modal/drawer/sheet states:
- Loading state:
- Empty state:
- Error state:
- Setup Required state:
- Application route:
- Existing route being preserved/replaced:
```

No implementation should begin when the actual screen boundary is still ambiguous.

---

# 33. ROUTE DUPLICATION AUDIT

Before final completion, search the repository for obsolete duplicate routes and components.

Audit especially:

* old Property Detail;
* old Project Detail;
* old dashboards;
* generic Lead Detail;
* old Messages;
* public Support used inside dashboards;
* old Billing;
* placeholder Admin modules;
* hard-coded Legal pages;
* old Comparison;
* duplicate preference storage;
* and old navigation shells.

For each duplicate:

* redirect if a public URL needs preservation;
* remove conflicting presentation;
* retain only secure reusable backend logic;
* update links;
* update Notifications;
* update Sitemap;
* update tests.

Do not leave an old route accessible through direct URL with outdated design.

---

# 34. UNREGISTERED SCREEN PROHIBITION

Claude must not create a new visible screen merely because:

* a library suggests it;
* a template includes it;
* current code has a route;
* a generic SaaS pattern appears useful;
* or implementation is easier as a new page.

When new technical UI is genuinely required but not drawn:

1. confirm it is necessary;
2. use the approved shared design-system pattern;
3. do not change the registered normal screen;
4. document it as a technical state;
5. ensure it does not become a new product module.

---

# 35. SCREEN COMPLETION STATUS REGISTRY

Every registered screen must use one of these statuses during execution:

* `NOT_INSPECTED`
* `INSPECTED`
* `MAPPED`
* `IMPLEMENTING`
* `IMPLEMENTED`
* `VERIFYING`
* `FAILED`
* `BLOCKED_EXTERNAL`
* `PASS`

A Batch cannot pass while any screen is:

* not inspected;
* unmapped;
* implementing;
* failed;
* or blocked by an internal defect.

---

# 36. REGISTRY COMPLETION REPORT

After all design files have been inspected, Claude must return:

## MASTER SCREEN REGISTRY AUDIT REPORT

* HTML files discovered:
* Expected HTML files found:
* Additional HTML files found:
* Duplicate design files found:
* Final authority chosen for each duplicate:
* Total source screen groups:
* Total desktop targets:
* Total tablet-specific targets:
* Total mobile targets:
* Total modals:
* Total drawers:
* Total bottom sheets:
* Total full-screen overlays:
* Total loading states:
* Total empty states:
* Total error states:
* Total Setup Required states:
* Unmapped screens:
* Missing HTML sources:
* Missing routes:
* Duplicate current routes:
* Shell conflicts:
* Registry status: COMPLETE / INCOMPLETE / BLOCKED

Implementation must not be declared fully complete while the registry status is INCOMPLETE.

---

# 37. FINAL REGISTRY ACCEPTANCE CHECKLIST

* [ ] All HTML files inside `C:\mgpweb\newdesign` scanned
* [ ] All known 14 Batch 4–17 sources found
* [ ] Any additional Batch 0–3 or other HTML sources registered
* [ ] Every actual design screen has a Registry ID
* [ ] Every Registry ID has one route or state
* [ ] Every route has one final design authority
* [ ] Every route has a defined shell
* [ ] Every public route has canonical behavior
* [ ] Every protected route has role/permission access
* [ ] Every dynamic route has server authorization
* [ ] Every desktop screen has responsive mapping
* [ ] Every mobile source state is mapped
* [ ] Every modal is mapped
* [ ] Every drawer is mapped
* [ ] Every bottom sheet is mapped
* [ ] Every fullscreen overlay is mapped
* [ ] Every loading state is mapped
* [ ] Every empty state is mapped
* [ ] Every error state is mapped
* [ ] Every Setup Required state is mapped
* [ ] Every temporary action preserves the page background
* [ ] No unwanted shell appears
* [ ] No extra header appears
* [ ] No extra sidebar appears
* [ ] No extra footer appears
* [ ] No mobile Admin bottom navigation appears
* [ ] No old conflicting route remains
* [ ] No old conflicting component remains hidden
* [ ] No visible action points to `#`
* [ ] Every Notification has a typed deep link
* [ ] Every public Detail has correct privacy behavior
* [ ] Every dashboard uses correct role shell
* [ ] Shared Lead/Message/Visit modules remain canonical
* [ ] Billing routes use Batch 10 authority
* [ ] Admin financial routes use Batch 12 authority
* [ ] CMS public output uses Batch 14 → Batch 16 flow
* [ ] Comparison uses one Batch 4/17 system
* [ ] Cookie and analytics consent use one shared system
* [ ] Final route duplication audit passes
* [ ] Final registry report status is COMPLETE

---

# 38. FINAL NON-NEGOTIABLE REGISTRY STATEMENT

Every final application screen must have a traceable relationship:

**Application Route or State
→ Registry ID
→ Exact HTML Design File
→ Exact Screen Boundary
→ Correct Shell
→ Correct Role/Permission
→ Correct Desktop Layout
→ Correct Tablet Transformation
→ Correct Mobile Transformation
→ Correct Modal/Drawer/Sheet Behavior
→ Correct Loading/Empty/Error/Setup State
→ Real Functional Module.**

No route may be approved based only on similar appearance.

No design target may be approved based only on route rendering.

No screen may be skipped because the HTML file is long.

No lower section may be omitted because it is below the first viewport.

No extra component may be added merely because it already exists in the old application.

The exact registered HTML screen—from its actual top boundary through its actual bottom boundary—is the final visible authority.

---
