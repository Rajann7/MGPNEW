# BATCH_DOCUMENT_11_DESIGN_BATCH_14_ADMIN_CMS_SEO_LOCATIONS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 11

## Design Batch 14 — Complete Admin CMS, Blog, Legal, SEO, Redirects, Sitemap, Location Hierarchy and Translation Management

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, backend, database, content-versioning, publishing, approval, SEO, redirect-safety, sitemap, location-hierarchy, multilingual-content, translation-status, search-alias, permission, audit, responsive behavior and live-verification specification for:

**My Gujarat Property · Design Batch 14 — Admin CMS / SEO / Locations**

Batch 14 defines the complete internal content and search-structure administration system for:

* CMS Pages,
* Blog Posts,
* Legal Pages,
* shared Content Editor,
* Content Drafts,
* Preview,
* Publishing,
* Legal Review Sign-Off,
* SEO Metadata,
* Indexability,
* Search Preview,
* Redirect Management,
* Redirect Loop Prevention,
* Sitemap Status,
* Sitemap Regeneration,
* Sitemap Exclusion Transparency,
* Location Hierarchy,
* multilingual Location Names,
* aliases and common misspellings,
* Translation Tracking.

Batch 14 contains exactly these 12 screen groups:

1. CMS Pages List
2. CMS Page Editor
3. Blog Posts List
4. Blog Post Editor
5. Legal Pages List + Restricted Legal Editor
6. Per-Page SEO Metadata Quick Edit
7. Redirect Manager
8. Redirect Create / Edit + Loop Prevention
9. Sitemap Status and Exclusion Transparency
10. Location Hierarchy Tree
11. Location Create / Edit — Multilingual
12. Missing Translation Tracker

Every screen and every defined state must be implemented.

Nothing may be skipped.

No Batch 14 module may remain:

* Coming Soon,
* placeholder-only,
* hard-coded production content,
* disconnected from public pages,
* visually implemented without persistence,
* publishable without required approval,
* SEO-control-only in UI while metadata remains static in code.

The actual Batch 14 design source must be read directly from:

`/newdesign/`

Use the exact Batch 14 source design.

Do not implement from:

* current placeholder Admin CMS page,
* current hard-coded Legal page content,
* generic rich-text CMS templates,
* generic SEO plugin dashboards,
* memory,
* assumptions.

---

# 2. ABSOLUTE CURRENT CMS REBUILD RULE

The current Admin route that displays:

`CMS / SEO / Locations — Coming Soon`

must be completely replaced by the real Batch 14 system.

Do not keep:

`Coming Soon panel + new screens beneath it`.

After Batch 14 implementation:

* CMS works,
* Blog works,
* Legal content works,
* SEO metadata works,
* Redirects work,
* Sitemap administration works,
* Location hierarchy works,
* Translation tracker works.

The placeholder must be removed.

---

# 3. CURRENT PUBLIC CONTENT REPLACEMENT RULE

Current hard-coded preliminary Legal content must not remain the production content authority.

Current routes may temporarily render static content during development, but Batch 14 completion requires:

Admin Legal Editor
→ approved Legal revision
→ published Legal content
→ public Legal page.

Do not keep:

Admin Legal content in database
while public Terms and Privacy still render hard-coded JSX.

---

# 4. ONE EDITOR SYSTEM RULE

The source explicitly requires:

**One content editing system for CMS, Blog and Legal.**

All three content types must use the same editor chrome:

* same toolbar,
* same title/header behavior,
* same content blocks,
* same SEO sidebar,
* same Draft action,
* same Preview action,
* same Publish action group,
* same autosave behavior,
* same revision architecture.

Differences are additive only.

### CMS Page

Base editor.

### Blog Post

Base editor plus:

* Featured Image,
* Categories,
* Excerpt.

### Legal Page

Base editor plus:

* restricted access,
* approval-required banner,
* Legal Review Sign-Off,
* Publish disabled until Sign-Off.

Do not create three unrelated editors.

---

# 5. PUBLISH NEVER SILENT RULE

The Batch 14 source explicitly states:

**Nothing goes live silently.**

Content lifecycle must be deliberate.

Required states include:

* Draft,
* Review/Sign-Off Pending where required,
* Published.

Publishing requires an explicit action.

Autosave must never publish.

Preview must never publish.

Saving SEO metadata must never automatically publish a Draft content body unless product policy explicitly says metadata changes to an already-Published page can be updated separately.

---

# 6. BATCH 14 SCREEN GROUPING

The source groups the Batch as:

## Screens 1–5

CMS, Blog and Legal Content.

## Screens 6–9

SEO, Redirects and Sitemap.

## Screens 10–11

Location Hierarchy.

## Screen 12

Translation Tracker.

All are mandatory.

---

# 7. IMPLEMENTATION ORDER

Implement Batch 14 in this order:

1. CMS/Content permissions and route architecture
2. shared Content data model and revisions
3. Screen 1 CMS Pages List
4. Screen 2 CMS Editor
5. Screen 3 Blog List
6. Screen 4 Blog Editor additions
7. Screen 5 Legal List and Sign-Off flow
8. Screen 6 SEO Metadata
9. Screen 7 Redirect Manager
10. Screen 8 Redirect Loop Prevention
11. Screen 9 Sitemap Status
12. Screen 10 Location Hierarchy
13. Screen 11 Location Editor
14. Screen 12 Translation Tracker
15. public rendering integration
16. complete SEO/search/location regression verification.

Do not build all modules in one uncontrolled change.

---

# 8. ADMIN SHELL

Batch 14 uses the approved Batch 1 Admin shell.

Required:

* graphite sidebar,
* Admin topbar,
* permission-aware navigation,
* desktop-primary editing workspace,
* mobile Admin drawer,
* no public dashboard bottom navigation.

---

# 9. PERMISSION GROUPS

At minimum distinguish capabilities for:

* CMS View,
* CMS Edit,
* CMS Publish,
* Blog View,
* Blog Edit,
* Blog Publish,
* Legal View,
* Legal Edit,
* Legal Sign-Off,
* Legal Publish,
* SEO View,
* SEO Edit,
* Redirect View,
* Redirect Manage,
* Sitemap View,
* Sitemap Regenerate,
* Location View,
* Location Manage,
* Translation View,
* Translation Edit/Review.

Do not use one unrestricted:

`CMS access`

permission for every high-impact SEO and Legal action.

---

# 10. SUPER ADMIN RULE

Super Admin has full access.

However, Legal Sign-Off should still preserve an explicit review event.

Super Admin access must not cause Legal content to:

auto-publish without recorded Sign-Off.

Access permission and approval record are separate concepts.

---

# 11. AUDIT REQUIREMENT

Audit significant actions including:

* Page Created,
* Draft Saved,
* Page Published,
* Page Unpublished/Archived where supported,
* Blog Published,
* Legal Sign-Off Requested,
* Legal Sign-Off Recorded,
* Legal Publish,
* SEO Metadata Changed,
* Indexability Changed,
* Redirect Created,
* Redirect Changed,
* Redirect Disabled,
* Sitemap Regenerated,
* Location Created,
* Location Moved,
* Location Activated/Deactivated,
* Alias Changed,
* Translation Updated,
* Translation Status Changed.

Audit must include:

* actor,
* target,
* action,
* safe before/after state,
* timestamp.

---

# 12. SCREEN 1 — CMS PAGES LIST

Exact source heading:

`CMS pages`

Search:

`Search pages…`

Action:

`New page`

Columns:

* PAGE
* SLUG
* STATUS
* EDITED

---

# 13. CMS REFERENCE ROW 1

Page:

`About Us`

Slug:

`/about`

Status:

`Published`

Edited:

`28 Jun`

---

# 14. CMS REFERENCE ROW 2

Page:

`How Verification Works`

Slug:

`/verification`

Status:

`Draft`

Edited:

`2 Jul`

---

# 15. CMS REFERENCE ROW 3

Page:

`RERA Guide for Buyers`

Slug:

`/guides/rera`

Status:

`Published`

Edited:

`20 Jun`

---

# 16. CMS LIST DATA

Every row comes from actual Content Page records.

Do not hard-code the reference list in the React component.

---

# 17. PAGE TITLE

The Page title must be actual content identity.

Do not derive Title only from Slug.

---

# 18. SLUG

Slug must:

* begin with `/`,
* be normalized,
* be unique in public route space,
* avoid reserved system routes,
* avoid Admin/Dashboard/API route collisions.

---

# 19. RESERVED ROUTE PROTECTION

Do not allow CMS creation for protected paths such as:

* `/admin`
* `/dashboard`
* `/api`
* `/login`

and other reserved application routes.

Validate server-side.

---

# 20. CMS STATUS

Use real content lifecycle state.

At minimum:

* Draft
* Published

Additional states may include:

* Archived
* Scheduled

only if approved wider content workflow implements them.

Do not add visible statuses absent from product behavior.

---

# 21. EDITED DATE

Use the actual latest content revision/save timestamp.

Do not use original creation date.

---

# 22. SEARCH PAGES

Search:

`Search pages…`

must be server-side when dataset grows.

Support matching:

* Title,
* Slug.

---

# 23. NEW PAGE

`New page`

opens the same shared Editor architecture used by Screen 2.

No separate simplified create form.

---

# 24. CMS LIST LOADING

Exact source rule:

`Loading = shimmer rows`

Use list/table-shaped skeleton.

---

# 25. CMS LIST EMPTY STATE

Exact:

`No pages yet`

Action:

`New page`

---

# 26. CMS LIST ERROR

Exact behavior:

Error banner.

Action:

`Retry`

---

# 27. CMS LIST PAGINATION

Use pagination or scalable server query.

Do not fetch unlimited content.

---

# 28. CMS LIST MOBILE

Transform rows into cards based on same data.

Preserve:

* Page,
* Slug,
* Status,
* Edited date.

---

# 29. SCREEN 2 — CMS PAGE EDITOR

Reference page:

`How Verification Works`

Status:

`Draft`

Autosave status:

`autosaved 2 min ago`

Actions:

* Draft
* Preview
* Publish…

---

# 30. EDITOR URL CONTEXT

Reference:

`mygujaratproperty.com/`

with editable/derived Slug context.

The editor must clearly show final public URL.

---

# 31. SHARED EDITOR TOOLBAR

Reference visible toolbar includes:

* Bold
* Italic
* H2

The real editor must support exactly the approved toolbar/block capabilities from Batch source.

Do not introduce a massive unrelated document editor.

---

# 32. CONTENT BLOCK SYSTEM

The source demonstrates:

* heading,
* paragraph,
* image block.

At minimum support the approved content block types required by the design.

Recommended safe structured content blocks:

* paragraph,
* heading,
* image,
* approved link/list blocks where required by actual public content.

Do not allow arbitrary unsafe script blocks.

---

# 33. REFERENCE CMS CONTENT

Reference heading:

`What "Verified" means on My Gujarat Property`

Reference paragraph:

`Every listing marked Verified has had its ownership documents and location checked by our review team. Verification typically completes within 24 hours of submission.`

Reference image:

`verification steps diagram`

Reference paragraph:

`Owners keep full control: your contact number stays hidden until you approve a reveal request.`

Use fixture content in persistent development data.

Do not hard-code it into production editor.

---

# 34. HONEST CLAIMS CONTENT RULE

The Batch source explicitly models:

`factual, no "No.1 / 100% verified / guaranteed" claims anywhere.`

Content governance must avoid unsupported claims.

Do not publish:

* No.1 Property Portal,
* 100% Verified,
* Guaranteed Sale,
* Guaranteed Investment Return

without real legal and factual authority.

---

# 35. AUTOSAVE

The editor displays:

`autosaved 2 min ago`

Autosave must be real.

Required:

* debounce,
* real Draft persistence,
* visible save state,
* failure state,
* no duplicate revisions on every keystroke unnecessarily.

---

# 36. AUTOSAVE STATES

Support honest states such as:

* Saving…
* Saved
* Autosaved X min ago
* Couldn't save — Retry

Do not display Autosaved if write failed.

---

# 37. AUTOSAVE NEVER PUBLISHES

Autosave updates Draft/current working revision only.

It must never make content public.

---

# 38. EDITOR CONCURRENCY

Prevent one Staff editor from silently overwriting a newer revision saved by another Staff.

Use:

* revision version,
* updated_at check,
* optimistic concurrency.

Show conflict and reload/compare behavior.

---

# 39. CONTENT REVISION MODEL

Every publishable content item should preserve revision history.

Required concepts:

Content Entity
→ Draft Revision
→ Published Revision.

Do not overwrite the only content row destructively.

---

# 40. DRAFT ACTION

`Draft`

should indicate current Draft state and/or explicitly save Draft according to exact source interaction.

Do not publish.

---

# 41. PREVIEW ACTION

`Preview`

must render:

* current Draft revision,
* exact public rendering component/layout,
* authenticated preview route or signed preview token.

Preview must not:

* appear in Sitemap,
* become searchable,
* become public without authorization.

---

# 42. PREVIEW URL SECURITY

Do not make predictable Draft preview URLs publicly accessible.

Use Staff authorization or short-lived signed Preview token.

---

# 43. PUBLISH ACTION

`Publish…`

uses confirmation where indicated by ellipsis.

Before publish:

* validate required Title,
* validate Slug,
* validate content,
* validate SEO fields according to policy,
* confirm no route conflict,
* persist Published revision,
* update public content pointer/state,
* invalidate public cache,
* audit.

---

# 44. PUBLISH IDEMPOTENCY

Double-click/retry must not create two identical Published versions unexpectedly.

---

# 45. PUBLISHED PAGE UPDATE

Editing a Published Page should create/update Draft changes separately until Publish.

Do not mutate the live public content on each autosave.

---

# 46. CONTENT SANITIZATION

All public rendering must be safe.

Do not render untrusted arbitrary HTML using unsafe direct HTML injection without sanitization.

---

# 47. IMAGE BLOCK

The reference contains an image block.

Image insertion must:

* use real Media upload/select flow,
* validate type,
* validate size,
* store alt text where required,
* persist media relationship,
* support safe CDN/public rendering.

---

# 48. IMAGE ALT TEXT

For SEO/accessibility:

image block should support meaningful Alt Text.

Do not default every image Alt to filename.

---

# 49. BROKEN IMAGE STATE

If media is unavailable:

Editor shows recoverable state.

Public page must not render broken layout.

---

# 50. SEO SIDEBAR — SHARED ACROSS EDITORS

Exact section:

`SEO`

Fields:

* Meta Title
* Meta Description
* Canonical URL
* Indexable
* Search Preview

This same SEO sidebar is used across:

* CMS,
* Blog,
* Legal.

---

# 51. META TITLE

Reference counter:

`54 / 60 characters`

Implement:

* live character count,
* target guidance.

Do not silently truncate saved title.

---

# 52. META TITLE VALIDATION

Allow Draft save with warning if appropriate.

Publish may enforce approved SEO policy.

Do not make content impossible to save because Meta Title is unfinished during Draft stage.

---

# 53. META DESCRIPTION

Reference:

`Learn how our team checks ownership documents and locations before a listing is marked Verified — and what that badge does and doesn't mean.`

Counter:

`143 / 160 characters`

Implement real character count.

---

# 54. CANONICAL URL

Canonical field must validate:

* safe URL/path,
* approved domain,
* no javascript/data schemes,
* intentional external canonical only if policy explicitly permits it.

---

# 55. CANONICAL SELF-REFERENCE

By default, canonical should resolve to the public page URL.

Manual override only when intentional.

---

# 56. INDEXABLE CONTROL

`Indexable`

is a real SEO setting.

It must affect:

* metadata robots,
* Sitemap inclusion,
* SEO Admin list.

Do not make the toggle cosmetic.

---

# 57. SEARCH PREVIEW

Reference:

`How Property Verification Works | My Gujarat…`

URL:

`mygujaratproperty.com/verification`

Preview must update from:

* Meta Title,
* Meta Description,
* canonical/public path.

---

# 58. SEARCH PREVIEW HONESTY

The Preview is a visual approximation.

Do not claim exact search-engine appearance guarantees.

---

# 59. SCREEN 3 — BLOG POSTS LIST

Exact columns:

* POST
* AUTHOR
* STATUS
* PUBLISHED

---

# 60. BLOG REFERENCE ROW 1

Post:

`Stamp duty in Gujarat: 2026 rates explained`

Context labels:

`Guides`

`stamp-duty`

Author:

`Content team`

Status:

`Published`

Published:

`1 Jul`

---

# 61. BLOG REFERENCE ROW 2

Post:

`Vesu vs Pal: choosing a locality in Surat`

Context labels:

`Localities`

`surat`

Author:

`Content team`

Status:

`Draft`

Published:

`—`

---

# 62. BLOG LIST DATA

Use actual Blog Post records and Category relationships.

---

# 63. BLOG AUTHOR

Author should map to actual:

* Staff author,
* approved author profile/display identity.

Do not hard-code:

`Content team`

for every Post unless intentionally configured.

---

# 64. BLOG STATUS

Use real:

* Draft,
* Published.

Scheduled status may be added only if actual scheduling is implemented.

---

# 65. PUBLISHED DATE

Draft:

`—`

Published:

actual published date.

Do not use edited date in Published column.

---

# 66. BLOG CATEGORY

Categories must be real structured relationships.

Do not store only one comma-separated Category string.

---

# 67. BLOG SLUG

The Blog Post needs stable Slug.

Changing title must not automatically break existing public URL.

---

# 68. BLOG LIST SEARCH

Support Blog title/slug search where final list design provides Search.

Use server-side query.

---

# 69. BLOG LIST PAGINATION

Use pagination.

---

# 70. SCREEN 4 — BLOG EDITOR

The Blog Editor uses the exact same shared Editor chrome.

Additional Blog-only controls:

* Featured Image Upload
* Categories
* Excerpt

---

# 71. FEATURED IMAGE

Reference:

`Featured image upload`

Required:

* real upload/select,
* preview,
* validation,
* persistence,
* alt text where appropriate.

---

# 72. BLOG CATEGORY CONTROL

Reference:

`Guides ×`

Action:

`+ category`

Use:

* searchable category selector,
* remove selected category,
* multiple categories where allowed.

---

# 73. CATEGORY CREATE

If Content Manager can create a new Category from Editor:

validate and persist.

If only existing Categories are selectable:

`+ category`

opens selector.

Follow the exact final source interaction.

---

# 74. BLOG EXCERPT

Blog-only Excerpt must persist separately from body.

Use for:

* Blog Listing card summary,
* social/SEO fallback where approved.

Do not auto-render full first paragraph as permanent authority if Excerpt is explicitly provided.

---

# 75. EXCERPT LENGTH

Use approved safe maximum and Preview.

Do not silently cut database content.

---

# 76. BLOG PUBLIC PAGE CONNECTION

Published Blog Post must render through the public Blog system used by Batch 16.

Admin Batch 14 is the content authority.

Do not keep public Blog hard-coded separately.

---

# 77. BLOG LIST CONNECTION

Batch 16 Blog Listing must query only:

* Published,
* public,
* indexability-appropriate posts.

Drafts remain inaccessible publicly.

---

# 78. BLOG FEATURED IMAGE PUBLIC CONSISTENCY

The same Featured Image selected in Admin must appear in:

* public Blog Listing,
* Blog Detail

according to Batch 16 design.

---

# 79. SCREEN 5 — LEGAL PAGES

Legal Pages use:

* same List system,
* same Editor,
* restricted permissions,
* Legal approval banner.

---

# 80. LEGAL REFERENCE ROW 1

Page:

`Terms of Use`

Slug:

`/terms`

Status:

`Published · v6`

---

# 81. LEGAL REFERENCE ROW 2

Page:

`Privacy Policy`

Slug:

`/privacy`

Status:

`v7 awaiting sign-off`

---

# 82. LEGAL VERSION DISPLAY

Legal content must preserve explicit version history.

Example:

* v6 Published,
* v7 Awaiting Sign-Off.

Do not overwrite v6 while v7 is still under review.

---

# 83. LEGAL PUBLISHING RULE

The source explicitly states:

`Legal content changes require Content Manager + legal-review sign-off.`

Required flow:

Content Manager edits Draft
→ requests Legal Review
→ Legal Review Sign-Off recorded
→ Publish enabled
→ authorised Publish action
→ new Legal version becomes public.

---

# 84. LEGAL SIGN-OFF IS NOT A TEXT NOTE

Store a structured Sign-Off record:

* Legal Revision ID,
* Reviewer identity,
* Sign-Off status,
* reviewed at,
* optional review Note.

Do not use:

`approved = true`

without reviewer attribution.

---

# 85. LEGAL APPROVAL BANNER

Exact concept:

`approval required — legal-review sign-off pending`

Reference context:

`requested from legal@ on 2 Jul`

Render actual:

* pending state,
* requested date,
* reviewer/contact context if product exposes it.

---

# 86. LEGAL PUBLISH DISABLED

Publish action remains disabled until valid Sign-Off exists for the exact current revision.

Critical:

Sign-Off for v6 must not authorize v7.

Every changed Legal revision requires its own appropriate Sign-Off.

---

# 87. EDIT AFTER SIGN-OFF

If content changes after Sign-Off:

previous Sign-Off becomes invalid for the changed Draft revision.

Require re-review.

---

# 88. LEGAL REVIEW REJECTION / CHANGES

Support review outcome such as:

* Changes Requested,
* Sign-Off Approved.

Preserve review history.

---

# 89. LEGAL PUBLIC ROUTES

The Batch source uses:

* `/terms`
* `/privacy`

The current implementation uses:

* `/legal/terms`
* `/legal/privacy`

Reconcile routing according to final design authority.

Recommended migration behavior:

* canonical public routes follow Batch design,
* old public paths use intentional redirects,
* no duplicate indexable Legal copies.

---

# 90. CURRENT LEGAL PLACEHOLDER RECONCILIATION

Current Terms and Privacy pages contain preliminary hard-coded text and explicitly state final Legal content is pending.

Batch 14 completion requires:

* CMS-driven content,
* Legal versions,
* Sign-Off,
* publish gating,
* no preliminary-placeholder notices in production.

---

# 91. LEGAL SEO

Legal Pages use the same SEO sidebar.

However:

Legal indexability should follow approved legal/SEO policy.

Do not keep them permanently noindex merely because current placeholder pages are noindex.

When final approved Legal content is Published:

apply intentional SEO policy.

---

# 92. SCREENS 6–9 — SEO, REDIRECTS AND SITEMAP

These screens control public Search Engine behavior.

They must not create:

* private data exposure,
* redirect loops,
* indexable filtered search explosion,
* stale sitemap fiction.

---

# 93. SCREEN 6 — PER-PAGE SEO METADATA

Heading concept:

Per-page metadata.

Search:

`Search indexable pages…`

Reference count:

`1,842 pages`

Columns:

* PAGE
* META (click to edit inline)
* INDEXED

---

# 94. SEO PAGE INVENTORY

The SEO inventory may include eligible public routes from:

* CMS Pages,
* Blog Posts,
* Location Landing Pages,
* Project pages,
* Property pages,
* Builder/Broker profiles,

according to final SEO architecture.

Do not include:

* Dashboard,
* Admin,
* private user pages,
* Drafts,
* Pending Listings.

---

# 95. INDEXABLE PAGE COUNT

`1,842 pages`

is a design reference.

Production count must be real.

Do not hard-code 1,842.

---

# 96. SEO REFERENCE ROW — LOCALITY PAGE

Page:

`/ahmedabad/satellite`

Meta Title:

`Flats & houses in Satellite, Ahmedabad`

Description:

`Browse verified listings in Satellite with prices, photos and owner contacts.`

Use real metadata source.

---

# 97. CONTACT CLAIM HONESTY

SEO copy must respect privacy/contact product behavior.

Do not write:

`owner phone numbers instantly visible`

if contact reveal rules do not permit it.

---

# 98. SEO REFERENCE ROW — GUIDE

Page:

`/guides/rera`

The source shows inline edit active.

Behavior:

* click Meta text,
* edit inline,
* Enter saves,
* Esc cancels.

---

# 99. INLINE EDIT

Required:

* click-to-edit,
* local input,
* Enter Save,
* Escape Cancel,
* server validation,
* loading indicator,
* failure recovery.

---

# 100. INLINE EDIT PERSISTENCE

Enter must persist to actual SEO metadata source.

Do not update only local table state.

---

# 101. INLINE EDIT CONCURRENCY

Check current metadata revision/update time.

Do not overwrite newer Staff edit silently.

---

# 102. SEO REFERENCE ROW — FILTERED SEARCH

Page:

`/search?filters=…`

Title:

`Filtered search results`

Helper:

`Parameterized pages kept out of the index.`

Index control should reflect:

Noindex.

---

# 103. PARAMETERIZED SEARCH INDEX RULE

Search/filter combinations must not create uncontrolled indexable URL explosion.

Examples:

* budget combinations,
* sort parameters,
* pagination/filter variants.

Use:

* noindex,
* canonical logic,
* exclusion from Sitemap

according to final SEO policy.

---

# 104. INDEX TOGGLE

The Indexed/Indexable toggle must affect:

* robots metadata,
* Sitemap inclusion.

Do not merely alter Admin table badge.

---

# 105. HIGH-RISK NOINDEX CHANGE

Changing a large public Page type from Indexable to Noindex may have major SEO effect.

Where changing individual Page:

save normally with Audit.

For bulk/system patterns:

use stronger confirmation in later Bulk Actions governance.

---

# 106. SEO METADATA SOURCE OF TRUTH

Use a coherent model.

Do not maintain:

* Metadata in JSX,
* another value in CMS table,
* another value in SEO table.

Public route metadata should resolve through the final SEO configuration authority.

---

# 107. DYNAMIC PAGE METADATA

For dynamic Property/Project/Location routes:

generate metadata from real entity data plus approved templates/overrides.

Manual SEO override should be preserved separately from generated fallback.

---

# 108. SEO FALLBACKS

If no manual Meta Title:

generate a safe fallback.

If no Meta Description:

use approved entity summary/fallback.

Do not leave undefined metadata where product policy requires it.

---

# 109. SEO CHARACTER COUNTERS

Maintain sensible guidance consistent with shared Editor:

* Meta Title target around 60,
* Description target around 160.

Do not hard-fail all content merely because it is one character above guidance unless policy explicitly requires it.

---

# 110. SEO AUDIT

Record:

* Page key/URL,
* old Meta,
* new Meta,
* old indexability,
* new indexability,
* Staff actor,
* time.

---

# 111. SCREEN 7 — REDIRECT MANAGER

Reference heading:

`Redirects · 48`

Action:

`Add redirect`

Columns:

* FROM → TO
* TYPE
* HITS

---

# 112. REDIRECT REFERENCE ROW 1

From:

`/properties-ahmedabad`

To:

`/ahmedabad`

Type:

`301`

Hits:

`3,204`

---

# 113. REDIRECT REFERENCE ROW 2

From:

`/blog/old-stamp-duty-2024`

To:

`/blog/stamp-duty-2026`

Type:

`302`

Hits:

`87`

---

# 114. REDIRECT COUNT

`48`

is a reference.

Use exact database count in production.

---

# 115. REDIRECT TYPES

Support:

* 301 Permanent
* 302 Temporary

according to source.

Do not add unrelated status codes unless final product needs them.

---

# 116. REDIRECT HIT COUNT

Hits must come from actual redirect execution tracking.

Do not increment every time Admin opens the Redirect record.

---

# 117. HIT COUNTER PERFORMANCE

Use efficient counter/event aggregation.

Do not block every public redirect request on expensive analytics logic.

---

# 118. ADD REDIRECT

Opens Screen 8 Redirect Form.

---

# 119. REDIRECT EDIT

Existing Redirect should be editable where Admin UX supports it.

Preserve Audit.

---

# 120. REDIRECT DISABLE / REMOVE

If deleting an active Redirect is supported:

prefer disable/archive preserving history.

Do not erase high-impact SEO history silently.

---

# 121. REDIRECT MANAGER PAGINATION

Use pagination.

---

# 122. SCREEN 8 — REDIRECT FORM

Fields:

### From path *

### To path *

Type:

* 301 permanent
* 302 temporary

Action:

`Save redirect`

---

# 123. FROM PATH VALIDATION

Require:

* valid internal path syntax,
* starts with `/`,
* not empty,
* not identical to To,
* not reserved unsafe route where policy forbids interception.

---

# 124. TO PATH VALIDATION

Validate:

* internal target path,

or

* allow-listed intentional external destination only if product policy permits external redirects.

Avoid open-redirect vulnerability.

---

# 125. REDIRECT LOOP DETECTION

Exact source warning:

`Redirect loop detected:`

`/properties-ahmedabad already redirects to /ahmedabad (301). Saving is blocked until the chain is resolved.`

Save must be blocked.

---

# 126. DIRECT LOOP

Block:

A → A.

---

# 127. TWO-NODE LOOP

Block:

A → B
B → A.

---

# 128. MULTI-HOP LOOP

Block:

A → B
B → C
C → A.

Loop detection must inspect the chain.

---

# 129. REDIRECT CHAIN WARNING

Even without a loop, long chains should be detected.

Example:

A → B → C → D.

Prefer direct destination where possible.

Do not allow uncontrolled chain growth.

---

# 130. REDIRECT CONFLICT

Do not allow multiple simultaneously active Redirects from the same source path.

---

# 131. CMS ROUTE CONFLICT

Before saving Redirect From path:

check interaction with:

* active CMS routes,
* Blog routes,
* public dynamic routes,
* reserved routes.

Do not unexpectedly shadow critical application pages.

---

# 132. REDIRECT EXECUTION LAYER

Redirects must be executed centrally and efficiently.

Do not query the entire Redirect table on every request.

Use:

* cached lookup,
* edge-compatible mapping,
* safe server routing architecture.

Changes must invalidate/update lookup.

---

# 133. REDIRECT AUDIT

Record:

* From,
* To,
* Type,
* actor,
* before/after,
* timestamp.

---

# 134. SCREEN 9 — SITEMAP STATUS

Reference:

`sitemap.xml`

Status:

`Last generated 3 Jul 2026 04:00 IST · 1,842 pages included`

Action:

`Regenerate`

---

# 135. SITEMAP GENERATION STATE

The Admin screen must display actual:

* last generated time,
* page count,
* generation status,
* error state where applicable.

Do not display a timestamp merely because the route is dynamically available.

---

# 136. CURRENT SITEMAP FOUNDATION

The current application already generates a public-safe Sitemap from:

* approved Properties,
* approved Projects,
* public Broker profiles,
* public Builder profiles,
* limited static Legal paths.

Preserve the public-safe principle.

Batch 14 must extend this architecture to:

* CMS Pages,
* Blog Posts,
* approved Location Landing Pages,
* final Legal routes,
* other approved public SEO pages.

---

# 137. SITEMAP PUBLIC-SAFE RULE

Never include:

* Draft,
* Pending,
* Rejected,
* Paused,
* Deleted,
* private dashboard URLs,
* Admin URLs,
* private user routes,
* filter explosion URLs.

---

# 138. REGENERATE ACTION

`Regenerate`

must launch actual Sitemap generation/rebuild process.

It must not merely update:

`last_generated_at`.

---

# 139. REGENERATE PERMISSION

Require SEO/Sitemap permission.

---

# 140. REGENERATE DUPLICATE PROTECTION

If a generation job is already running:

do not start uncontrolled concurrent duplicate jobs.

Show:

Generation in progress.

---

# 141. SITEMAP GENERATION RESULT

Persist:

* started at,
* finished at,
* status,
* included URL count,
* exclusion summary,
* error summary.

---

# 142. SITEMAP FAILURE

If generation fails:

do not update Last Generated as successful.

Preserve previous valid Sitemap where architecture permits.

Show safe error and Retry.

---

# 143. SCHEDULED GENERATION

The reference time:

`04:00 IST`

indicates scheduled generation behavior.

Implement a reliable scheduled Sitemap regeneration according to final operation schedule.

Do not depend on an open Browser session.

---

# 144. SITEMAP EXCLUSION TRANSPARENCY

Exact source section:

`EXCLUDED — TRANSPARENCY LIST`

The Admin must explain important exclusion categories.

---

# 145. EXCLUSION — THIN LOCALITY PAGE

Reference:

`/rajkot/mavdi (locality)`

Reason:

`0 active listings — thin page`

This reflects a real SEO rule.

Do not index empty/thin locality pages merely because a Location exists.

---

# 146. THIN PAGE THRESHOLD

Define the approved threshold.

The source example uses zero active Listings.

The implementation may include additional content-quality thresholds if final SEO policy defines them.

Do not invent fake active Listing counts.

---

# 147. EXCLUSION — PARAMETERIZED SEARCH

Reference:

`/search?*`

`1,190 variants`

Reason:

`parameterized`

Use actual pattern count/summary where tracked.

Do not enumerate millions of URLs individually in UI.

---

# 148. EXCLUSION — EXPIRED PROPERTIES

Reference:

`/property/expired/*`

`208`

Reason:

`expired listings`

Expired Listing policy must be consistent with public safe unavailable-page behavior.

They may:

* remain accessible as safe unavailable pages,
* be excluded from Sitemap,
* use appropriate indexing policy.

Do not automatically hard-delete route solely because Sitemap excludes it.

---

# 149. EXCLUSION COUNTS

All exclusion category counts must be real.

Do not hard-code reference values.

---

# 150. SITEMAP AND INDEXABILITY CONSISTENCY

A Page marked Noindex must not be included in Sitemap.

A Sitemap-included Page should not emit Noindex accidentally.

Build automated checks.

---

# 151. SITEMAP AND CANONICAL CONSISTENCY

Avoid Sitemap entries whose canonical points somewhere else unless intentionally managed.

---

# 152. SCREENS 10–11 — LOCATION HIERARCHY

Batch 14 defines the canonical Location administration system.

This system must connect to:

* Posting Wizards,
* Search,
* Location Landing Pages,
* Missing Location Queue,
* SEO,
* aliases and typo-tolerant search.

---

# 153. SCREEN 10 — LOCATION HIERARCHY TREE

Heading:

Location hierarchy.

Search:

`Search locations…`

Filter:

`Level: All`

---

# 154. HIERARCHY REFERENCE TREE

Reference:

`India`

Level:

`country`

→ `Gujarat`

Level:

`state`

→ `Ahmedabad`

Level:

`district`

→ `Ahmedabad City`

Level:

`city`

→ `West Zone`

Level:

`area`

→ `Satellite`

Level:

`locality · 214 listings`

→ `Shrinand Residency`

Level:

`society`

Also:

`Bopal`

Level:

`locality · 168 listings`

---

# 155. COMPLETE LOCATION MODEL

The Location system must support the final approved hierarchy.

At minimum design-relevant levels include:

* Country,
* State,
* District,
* Taluka where required,
* City,
* Area,
* Locality,
* Society.

Where the wider approved Gujarat address model requires:

* Village

support it coherently.

Do not create a separate incompatible location system.

---

# 156. TREE DATA MODEL

Each Location node requires:

* ID,
* Type/Level,
* Parent ID,
* canonical English Name,
* localized names,
* Active state,
* publication/search state where needed,
* slug,
* timestamps.

---

# 157. TREE PARENT VALIDATION

Enforce valid parent-child relationships.

Examples:

State
cannot have Society as direct parent.

Society
cannot be parent of Country.

---

# 158. LOCATION CYCLE PREVENTION

Moving a node must not allow it to become:

* its own parent,
* child of its descendant.

Server-side cycle check required.

---

# 159. SEARCH LOCATIONS

Search should match:

* canonical Name,
* localized Name,
* Aliases.

Use server-side search for large hierarchy.

---

# 160. LEVEL FILTER

`Level: All`

must filter actual Location types.

Examples:

* State
* District
* City
* Area
* Locality
* Society

and other approved levels.

---

# 161. ADD CHILD

The source shows:

`Add child`

for hierarchy nodes.

Action must open the Location Create form with:

* Parent preselected,
* valid child Level options.

---

# 162. LISTING COUNT

Reference:

`Satellite · 214 listings`

`Bopal · 168 listings`

Counts must use real active eligible Listing count.

Do not count Draft/Pending Listings.

---

# 163. LISTING COUNT PERFORMANCE

Avoid one query per Location node.

Use:

* aggregate view,
* grouped query,
* materialized counter with correct refresh strategy.

No N+1.

---

# 164. TALUKA COLLAPSE RULE

The source explicitly states:

`Taluka level collapses when identical to city (e.g. Ahmedabad City).`

Implement this as a deliberate hierarchy presentation/data rule.

Do not show redundant:

Ahmedabad City
→ Ahmedabad Taluka
→ Ahmedabad City

when they represent the same practical selection context.

---

# 165. TALUKA DATA PRESERVATION

Collapsing in UI does not mean losing official geography data if required internally.

The system may retain the relationship while presenting a simplified path.

---

# 166. MISSING-LOCATION QUEUE INTEGRATION

The source explicitly states:

`New nodes from the Missing-Location queue (Batch 11 §16) land here as pending children.`

Required flow:

User requests missing Location
→ Admin Batch 11 approves canonical parent/Location
→ new Location node created as pending child where workflow requires final activation
→ Batch 14 Location Admin reviews/activates/completes translation as required
→ becomes selectable.

Do not create a separate orphan Location table.

---

# 167. PENDING CHILD STATE

Pending child must be visually distinguishable where the final hierarchy workflow requires it.

It should not automatically become selectable publicly until required validation is complete.

---

# 168. LOCATION NODE ACTIONS

Where appropriate:

* Add Child,
* Edit,
* Activate/Deactivate,
* Move/reparent with safeguards.

Use exact Batch screen interaction and supporting Admin actions.

---

# 169. LOCATION DEACTIVATION

Deactivating a Location must not destroy historical:

* Properties,
* Projects,
* Requirements,
* Addresses.

It should prevent new selection or public use according to product policy.

---

# 170. LOCATION DELETE RULE

Do not hard-delete a Location with active references.

Use:

* merge,
* deactivate,
* replacement mapping

where appropriate.

---

# 171. LOCATION SLUG

Generate stable SEO-safe Slug.

Avoid changing public Location URL silently when display Name changes.

Use Redirect Manager for intentional URL migration.

---

# 172. LOCATION SEO CONNECTION

Active eligible Location Landing Pages can feed:

* SEO Metadata Screen,
* Sitemap.

Thin Location Pages are excluded according to SEO policy.

---

# 173. SCREEN 11 — LOCATION CREATE / EDIT

Exact fields:

### Name (English) *

### Name (ગુજરાતી)

### Name (हिन्दी)

### Aliases / common spellings

### Parent location

### Active — selectable in posting wizards & search

Action:

`Save location`

---

# 174. ENGLISH NAME

Required.

Normalize:

* surrounding whitespace,
* duplicate spacing.

Do not force lowercase display.

---

# 175. GUJARATI NAME

Optional/pending according to translation workflow.

Persist as localized Location name.

---

# 176. HINDI NAME

Optional/pending according to current localization state.

Persist separately.

---

# 177. ALIASES

Reference:

`Satelite`

`Satellite Road`

Supporting copy:

`Aliases resolve in search — misspellings still find the locality.`

This behavior must be real.

---

# 178. ALIAS DATA MODEL

Use a structured alias relationship.

Do not store only one comma-separated unsearchable text string.

At minimum support:

* Location ID,
* alias,
* normalized alias,
* locale/context where needed.

---

# 179. ALIAS UNIQUE CONFLICT

If one Alias maps ambiguously to multiple Location nodes:

do not silently choose wrong Location.

Use:

* scoped alias by City/parent context,
* disambiguation.

---

# 180. CURRENT STATIC CITY ALIAS RECONCILIATION

The current Search foundation includes a hard-coded city alias/transliteration map.

Batch 14 requires editable Location Aliases as canonical Admin-managed data.

Migration strategy:

1. Preserve working static aliases during transition.
2. Create Location Alias records.
3. Import approved existing aliases.
4. Update Search expansion to query/use canonical alias data.
5. Remove duplicated hard-coded authority once database-backed alias system is verified.

Do not break existing typo-tolerant Search during migration.

---

# 181. PARENT LOCATION

Reference choices:

`West Zone, Ahmedabad City (area)`

`Ahmedabad City (city)`

Parent selector must show enough hierarchy context to prevent selecting the wrong same-named location.

---

# 182. PARENT SEARCH

Searchable selector.

Do not load entire Gujarat location hierarchy into one giant dropdown.

---

# 183. VALID PARENT TYPES

Filter Parent choices by child Level.

Do not allow invalid hierarchy relationships.

---

# 184. ACTIVE CONTROL

Exact concept:

`Active — selectable in posting wizards & search`

This must connect to real application behavior.

Inactive Location:

* not selectable for new Posts,
* not suggested in normal Search,
* historical records remain intact.

---

# 185. LOCATION SAVE

Required:

1. permission,
2. validate Name,
3. validate Type,
4. validate Parent,
5. check duplicate sibling,
6. check Alias conflicts,
7. save localized names,
8. save Aliases,
9. save Active state,
10. update Search index/cache,
11. audit.

---

# 186. LOCATION DUPLICATE DETECTION

Check exact and normalized sibling names.

Do not create:

Satellite
and
satellite

as duplicate siblings.

---

# 187. LOCATION MERGE

If duplicate Locations already exist:

use a deliberate merge/reassignment workflow.

Do not simply delete one record.

---

# 188. LOCATION SEARCH INDEX UPDATE

After Name/Alias changes:

update Search lookup promptly.

Do not leave stale Aliases indefinitely.

---

# 189. POSTING WIZARD INTEGRATION

Batch 5 Posting Wizards must load Active canonical Location options.

Missing Location flow must remain available.

---

# 190. PUBLIC SEARCH INTEGRATION

Search should use canonical Location IDs where possible, while retaining human-friendly URL/display values.

Current public Search uses string filters such as:

* City,
* District,
* Taluka,
* Area,
* Locality

and text matching.

Batch 14 final architecture should migrate toward canonical Location relationships or a safe compatibility layer.

Do not rely indefinitely on arbitrary free-text `ILIKE` as the only location authority.

---

# 191. SEARCH URL COMPATIBILITY

Migration to Location IDs must preserve existing search URLs where product requires.

Use Slug/lookup mapping.

Do not break shared search links unnecessarily.

---

# 192. LOCATION LANDING PAGE

Location SEO pages should resolve from canonical Location nodes.

Example:

`/ahmedabad/satellite`

must map to the correct:

Satellite locality
under Ahmedabad hierarchy.

Do not resolve based on name globally.

---

# 193. SCREEN 12 — MISSING TRANSLATION TRACKER

Reference heading:

`148 strings missing translations`

Language options:

* ગુજરાતી
* हिन्दी

Columns:

* ENGLISH SOURCE
* ગુજરાતી
* STATUS

for Gujarati view.

---

# 194. MISSING COUNT

`148`

is a design reference.

Production count must be real.

---

# 195. LANGUAGE TAB

Switching to Hindi must show:

* Hindi translation column,
* Hindi status/count.

Do not keep Gujarati data under Hindi tab.

---

# 196. TRANSLATION REFERENCE ROW 1

English:

`Your number stays hidden until you approve a reveal.`

Gujarati:

`તમે મંજૂરી ન આપો ત્યાં સુધી તમારો નંબર છુપાયેલો રહે છે.`

Status:

`Translated`

---

# 197. TRANSLATION REFERENCE ROW 2

English:

`Submitted for review — typically approved within 24 hours.`

Gujarati:

not completed or awaiting completion according to source state.

Status:

`Pending`

---

# 198. TRANSLATION REFERENCE ROW 3

English:

`Resend OTP`

Gujarati state:

`missing`

Status:

`Pending`

---

# 199. TRANSLATION KEY MODEL

Do not use the English text itself as the permanent immutable primary key.

Use stable translation keys.

Example conceptual keys:

* `contact.number_hidden_until_reveal`
* `moderation.submitted_review_eta`
* `auth.resend_otp`

Display English Source separately.

---

# 200. ENGLISH SOURCE CHANGE

If English Source changes:

translation should be flagged for review.

Do not continue marking an old translation Translated automatically.

---

# 201. TRANSLATION STATUS MODEL

At minimum support source-relevant states:

* Translated
* Pending
* Missing

If Reviewer workflow is implemented:

* Draft
* Review Pending
* Approved

may map internally.

Keep user-visible states aligned to design.

---

# 202. EDIT TRANSLATION

Translation values must be editable through an authorised workflow.

Do not make Tracker read-only if it is the management screen for missing translations.

---

# 203. TRANSLATION VALIDATION

Preserve:

* required interpolation tokens,
* formatting placeholders,
* punctuation where important.

Do not allow translation to remove required variables.

---

# 204. TOKEN CONSISTENCY

If source contains:

`{{name}}`

translation must preserve required token.

Validate before marking Translated.

---

# 205. UI STRING REGISTRY

The Tracker should derive from a canonical UI translation catalog.

Do not manually create a list of random missing strings disconnected from application localization files/data.

---

# 206. CMS CONTENT TRANSLATION VS UI TRANSLATION

Do not confuse:

### UI Translation Strings

Buttons, notices, labels.

with:

### CMS Content Translations

Page body/title content.

Batch 14 Screen 12 tracks application string translations.

CMS Page localization can use the Content model where supported.

---

# 207. TRANSLATION FALLBACK

If Gujarati/Hindi UI translation is missing:

use approved English fallback.

Do not show blank buttons.

---

# 208. HONEST FALLBACK STATE

The localization system should be able to report fallback/missing status to Tracker.

Do not silently hide all missing translation work.

---

# 209. TRANSLATION SEARCH / FILTER FOUNDATION

For scale, architecture should support filtering by:

* locale,
* status,
* key/source search.

Do not add visible controls that conflict with source design, but keep server data scalable.

---

# 210. TRANSLATION PAGINATION

148+ records require pagination or efficient virtualized list.

Do not fetch the entire future localization catalog unnecessarily.

---

# 211. TRANSLATION AUDIT

Record:

* key,
* locale,
* old value,
* new value,
* status,
* editor,
* timestamp.

---

# 212. CONTENT DATA MODEL REQUIREMENTS

A shared Content Entity should support:

* ID,
* content type:

  * CMS
  * Blog
  * Legal
* stable content key,
* title,
* slug,
* status,
* author/owner,
* current Draft Revision,
* current Published Revision,
* created at,
* updated at.

---

# 213. CONTENT REVISION REQUIREMENTS

Revision should support:

* Content Entity ID,
* revision number,
* title snapshot,
* body/blocks,
* excerpt where applicable,
* SEO snapshot/relation,
* created by,
* created at,
* state.

---

# 214. BLOG-SPECIFIC DATA REQUIREMENTS

Support:

* Featured Image,
* Category relations,
* Excerpt,
* author,
* published date.

---

# 215. LEGAL-SPECIFIC DATA REQUIREMENTS

Support:

* Legal version number,
* review state,
* Sign-Off Request,
* Sign-Off reviewer,
* Sign-Off timestamp,
* review Note,
* current Published Legal Revision.

---

# 216. SEO DATA MODEL REQUIREMENTS

Support:

* Page/Entity key,
* Meta Title,
* Meta Description,
* Canonical URL,
* Indexable flag,
* last edited by,
* updated time.

For generated pages:

support Template/fallback and manual override distinction.

---

# 217. REDIRECT DATA MODEL REQUIREMENTS

Support:

* From path,
* To destination,
* 301/302 type,
* Active state,
* hit count or metric relation,
* created by,
* updated by,
* timestamps.

---

# 218. SITEMAP RUN DATA MODEL

Support:

* run ID,
* status,
* started at,
* completed at,
* included count,
* exclusion category summary,
* safe error summary,
* triggered by:

  * schedule
  * Staff.

---

# 219. LOCATION DATA MODEL REQUIREMENTS

Support:

* ID,
* Type,
* Parent ID,
* canonical Name,
* English Name,
* Gujarati Name,
* Hindi Name,
* Slug,
* Active state,
* Pending state where needed,
* created/updated metadata.

---

# 220. LOCATION ALIAS DATA MODEL

Support:

* Location ID,
* alias,
* normalized alias,
* locale/context,
* active state.

---

# 221. TRANSLATION DATA MODEL REQUIREMENTS

Support:

* translation key,
* English Source,
* locale,
* translated value,
* status,
* source version/hash,
* updated by,
* timestamps.

---

# 222. CURRENT REPOSITORY RECONCILIATION — ADMIN CMS

Current `/admin/cms` is an explicit Coming Soon placeholder.

Replace it with the full 12-screen Batch 14 system.

---

# 223. CURRENT REPOSITORY RECONCILIATION — PUBLIC LEGAL

Current Terms and Privacy pages are hard-coded preliminary placeholders and are noindex pending legal review.

Batch 14 requires:

* database-backed Legal content,
* versions,
* Sign-Off,
* Publish gate,
* final public rendering.

---

# 224. CURRENT REPOSITORY RECONCILIATION — SITEMAP

Current Sitemap correctly reads public-safe:

* Property,
* Project,
* Broker,
* Builder

slugs.

Preserve this safety.

Extend for:

* Published CMS Pages,
* Published Blog Posts,
* approved Location Landing Pages,
* final Legal Pages.

Add:

* Admin Status screen,
* generation records,
* Regenerate action,
* exclusion transparency.

---

# 225. CURRENT REPOSITORY RECONCILIATION — ROBOTS

Current Robots correctly notes that:

robots.txt is SEO guidance, not access control.

Preserve this principle.

Do not use:

`Disallow: /admin`

as a replacement for authentication/permission.

---

# 226. CURRENT REPOSITORY RECONCILIATION — LOCATION SEARCH

Current public Search accepts textual:

* city,
* district,
* taluka,
* area,
* locality

and applies text matching.

Batch 14 requires canonical managed Location hierarchy.

Migrate carefully without breaking Search.

---

# 227. CURRENT REPOSITORY RECONCILIATION — ALIASES

Current Search includes static typo/transliteration aliases for Gujarat city names.

Preserve working search quality during migration.

Final authority should become:

* Admin-managed canonical Locations,
* Location Alias records,
* scalable alias/search lookup.

---

# 228. CURRENT REPOSITORY RECONCILIATION — REDIRECTS

A complete Batch 14 Redirect Manager was not found in the inspected Admin CMS implementation.

Implement:

* Redirect List,
* Hit count,
* Add/Edit,
* 301/302,
* loop prevention,
* route conflict protection,
* central execution.

---

# 229. CURRENT REPOSITORY RECONCILIATION — BLOG

Public Blog pages from Batch 16 must use the Batch 14 Blog content authority.

Do not create separate static Blog fixtures.

---

# 230. CURRENT REPOSITORY RECONCILIATION — SEO

Metadata currently defined directly in route code must be reconciled with Batch 14 Admin SEO authority.

The final system must support:

* static fallback metadata,
* generated dynamic metadata,
* CMS override,
* manual SEO override

without conflicting sources.

---

# 231. EDITOR SECURITY

Content Editor must prevent:

* script injection,
* event-handler injection,
* dangerous iframe embedding,
* javascript URLs.

Allow only approved safe blocks.

---

# 232. LINK SECURITY

External links should receive appropriate:

* rel attributes,
* target behavior

according to policy.

Do not permit `javascript:` links.

---

# 233. PREVIEW SECURITY

Draft Preview must not appear in:

* Sitemap,
* Search index,
* public navigation.

---

# 234. CONTENT PUBLISH TRANSACTION SAFETY

Publish flow should atomically or durably:

* mark Published Revision,
* update public pointer/state,
* invalidate cache,
* create Audit.

Do not show success while public pointer still points to old/broken revision without recoverable state.

---

# 235. LEGAL SIGN-OFF TRANSACTION SAFETY

Sign-Off must bind to exact revision ID/hash.

---

# 236. SEO INDEXABILITY SECURITY

No Staff without SEO Edit permission may change Indexability.

---

# 237. REDIRECT SECURITY

Prevent open redirects.

External redirect support, if allowed, must use explicit domain allow-list or high-permission confirmation.

---

# 238. LOCATION PERMISSION

Only authorised Location Manager/Content Staff may:

* create,
* move,
* activate,
* alias.

---

# 239. TRANSLATION PERMISSION

Do not allow ordinary Content Viewer to approve translations.

---

# 240. N+1 PREVENTION

Avoid N+1 in:

* CMS List author/status enrichment,
* Blog categories,
* SEO Inventory,
* Location Listing counts,
* Translation statuses.

Use:

* joins,
* aggregate views,
* batched lookup.

---

# 241. PAGINATION REQUIREMENTS

Use pagination for:

* CMS Pages,
* Blog Posts,
* Legal revision history where long,
* SEO Page Inventory,
* Redirects,
* Sitemap Run history where shown,
* Translation records.

Location tree should use lazy child loading for large hierarchy.

---

# 242. LOCATION TREE LAZY LOADING

Do not load every Location node in India in one request.

Load:

* root/visible nodes,
* children on expansion,
* search results directly.

---

# 243. LOCATION TREE EXPANSION STATE

Preserve usable expansion state during Edit/return where appropriate.

---

# 244. SITEMAP PERFORMANCE

Do not perform uncontrolled unbounded database reads in one application request if URL volume grows significantly.

Use:

* bounded batching,
* streaming/static file generation,
* sitemap index splitting when required by scale.

---

# 245. REDIRECT PERFORMANCE

Redirect lookup must be efficient.

Do not query full Redirect table on every request.

---

# 246. SEARCH ALIAS PERFORMANCE

Alias resolution should use:

* indexed normalized Alias,
* canonical Location relation.

Do not scan all Aliases in application memory per search.

---

# 247. LOADING STATES

Required for:

* CMS List,
* Editor initial load,
* Blog List,
* Legal List,
* SEO Inventory,
* Redirect List,
* Sitemap Status,
* Location Tree,
* Location Editor Parent search,
* Translation Tracker.

Use design-appropriate skeletons.

---

# 248. EMPTY STATES

Required:

* No CMS Pages,
* No Blog Posts,
* No Redirects,
* No eligible SEO pages,
* No Location search results,
* No missing translations.

Use positive/actionable copy.

---

# 249. ERROR STATES

Required:

* CMS List load failure,
* Autosave failure,
* Publish failure,
* Preview failure,
* Legal Sign-Off state failure,
* SEO Inline Save failure,
* Redirect loop/error,
* Redirect save failure,
* Sitemap generation failure,
* Location tree load failure,
* Location Save failure,
* Translation Save failure.

Do not expose raw database errors.

---

# 250. OVERLAY AND EDITOR VERIFICATION

Test:

* Publish confirmation,
* Legal review/sign-off dialogs,
* Redirect warning,
* Location Parent selector,
* Category selector,
* Featured Image upload,
* image block upload.

Verify:

* focus,
* keyboard,
* z-index,
* outside click,
* Escape behavior,
* unsaved changes protection.

---

# 251. UNSAVED CHANGES WARNING

If Staff navigates away with unsaved local changes not yet persisted:

show safe warning.

Do not show false warning after successful Autosave.

---

# 252. MOBILE EDITOR BEHAVIOR

Batch 14 is desktop-primary, but mobile emergency access must remain usable.

On narrow screens:

* Editor toolbar remains usable,
* SEO sidebar stacks below or follows exact responsive behavior,
* action group remains reachable,
* keyboard does not cover fields.

Do not render a 1200px fixed editor canvas.

---

# 253. SEO INLINE EDIT MOBILE

Enter/Escape keyboard behavior should remain usable.

Provide clear Save/Cancel controls where mobile keyboard interaction makes desktop-only key behavior insufficient, while preserving design intent.

---

# 254. LOCATION TREE MOBILE

Use hierarchical expandable cards/tree rows.

Do not force wide desktop indentation beyond viewport.

---

# 255. TRANSLATION TRACKER MOBILE

Rows become structured cards if necessary.

Preserve:

* English Source,
* target translation,
* Status.

---

# 256. TEXT WRAPPING VERIFICATION

Inspect:

* long CMS Titles,
* long Slugs,
* Blog Titles,
* Legal status labels,
* Meta descriptions,
* canonical URLs,
* Redirect paths,
* loop warning,
* Location hierarchy path,
* Aliases,
* Translation source strings.

Fix:

* clipping,
* broken URL overflow,
* badge overlap,
* accidental button wrapping.

Do not randomly shrink typography.

---

# 257. NO DEAD UI RULE

Every visible Batch 14 action must work.

This includes:

* Search Pages,
* New Page,
* CMS row,
* Draft,
* Preview,
* Publish,
* Editor toolbar,
* image block,
* Featured Image Upload,
* remove Category,
* Add Category,
* Legal Sign-Off request,
* Legal Publish gate,
* Meta Title,
* Meta Description,
* Canonical URL,
* Indexable toggle,
* inline Meta Edit,
* Enter Save,
* Escape Cancel,
* Add Redirect,
* Redirect row,
* Save Redirect,
* 301,
* 302,
* Regenerate Sitemap,
* Search Locations,
* Level Filter,
* Expand Node,
* Add Child,
* Edit Location,
* Alias management,
* Parent selector,
* Active toggle,
* Save Location,
* Gujarati translation tab,
* Hindi translation tab,
* Translation Edit/Save/Status workflow.

No:

`href="#"`.

No empty click handlers.

---

# 258. SCREEN 1 FINAL CHECKLIST — CMS LIST

* [ ] CMS Pages List
* [ ] Search Pages
* [ ] New Page
* [ ] Page column
* [ ] Slug column
* [ ] Status column
* [ ] Edited column
* [ ] Published state
* [ ] Draft state
* [ ] real Edited date
* [ ] route conflict validation
* [ ] shimmer rows
* [ ] No Pages Yet state
* [ ] New Page CTA
* [ ] Error banner
* [ ] Retry
* [ ] pagination
* [ ] mobile cards

---

# 259. SCREEN 2 FINAL CHECKLIST — CMS EDITOR

* [ ] shared Editor Chrome
* [ ] Page Title
* [ ] Draft state
* [ ] real Autosave
* [ ] Autosave timestamp
* [ ] Draft action
* [ ] Preview
* [ ] Publish
* [ ] public URL context
* [ ] Bold
* [ ] Italic
* [ ] H2
* [ ] Paragraph
* [ ] Image block
* [ ] safe content rendering
* [ ] image persistence
* [ ] Alt Text
* [ ] Revision history
* [ ] Published Revision separate from Draft
* [ ] concurrency protection
* [ ] unsaved conflict handling
* [ ] honest content claims
* [ ] no silent publish

---

# 260. SHARED SEO SIDEBAR FINAL CHECKLIST

* [ ] Meta Title
* [ ] live title count
* [ ] 60-character guidance
* [ ] Meta Description
* [ ] live description count
* [ ] 160-character guidance
* [ ] Canonical URL
* [ ] safe URL validation
* [ ] Indexable control
* [ ] Search Preview
* [ ] Preview Title
* [ ] Preview URL
* [ ] Preview Description
* [ ] persistence
* [ ] public metadata connection
* [ ] Sitemap connection
* [ ] Audit

---

# 261. SCREEN 3 FINAL CHECKLIST — BLOG LIST

* [ ] Post column
* [ ] Author
* [ ] Status
* [ ] Published date
* [ ] Blog Title
* [ ] Category context
* [ ] Slug context
* [ ] real Author
* [ ] Published state
* [ ] Draft state
* [ ] Draft Published date = —
* [ ] pagination
* [ ] mobile behavior

---

# 262. SCREEN 4 FINAL CHECKLIST — BLOG EDITOR

* [ ] exact shared Editor Chrome
* [ ] Featured Image
* [ ] real upload
* [ ] image preview
* [ ] Category selection
* [ ] selected Category chip
* [ ] remove Category
* [ ] Add Category
* [ ] Excerpt
* [ ] autosave
* [ ] Draft
* [ ] Preview
* [ ] Publish
* [ ] SEO Sidebar
* [ ] Public Blog connection
* [ ] Batch 16 Blog Listing connection
* [ ] Published-only public access

---

# 263. SCREEN 5 FINAL CHECKLIST — LEGAL

* [ ] Legal List
* [ ] Terms row
* [ ] Privacy row
* [ ] published version
* [ ] pending version
* [ ] same Editor Chrome
* [ ] restricted permission
* [ ] approval-required banner
* [ ] Sign-Off Request
* [ ] requested date
* [ ] exact revision binding
* [ ] Publish disabled before Sign-Off
* [ ] Legal Reviewer identity
* [ ] Sign-Off timestamp
* [ ] Changes Requested state
* [ ] re-review after post-sign-off edit
* [ ] Legal version history
* [ ] no hard-coded public placeholder
* [ ] canonical public route reconciliation
* [ ] Audit

---

# 264. SCREEN 6 FINAL CHECKLIST — SEO QUICK EDIT

* [ ] Search Indexable Pages
* [ ] real Page count
* [ ] Page column
* [ ] Meta column
* [ ] Indexed column
* [ ] Location Page row
* [ ] Meta Title
* [ ] Meta Description
* [ ] Guide Page row
* [ ] click inline edit
* [ ] Enter Save
* [ ] Escape Cancel
* [ ] persistent server Save
* [ ] save failure state
* [ ] Filtered Search row
* [ ] parameterized Page Noindex
* [ ] Index toggle
* [ ] robots metadata connection
* [ ] Sitemap connection
* [ ] Audit
* [ ] pagination

---

# 265. SCREEN 7 FINAL CHECKLIST — REDIRECT MANAGER

* [ ] Redirect count
* [ ] Add Redirect
* [ ] From
* [ ] To
* [ ] Type
* [ ] Hits
* [ ] 301 display
* [ ] 302 display
* [ ] real hit counts
* [ ] server-side pagination
* [ ] Edit flow
* [ ] disable/archive behavior
* [ ] Audit
* [ ] mobile cards

---

# 266. SCREEN 8 FINAL CHECKLIST — REDIRECT FORM

* [ ] From Path required
* [ ] To Path required
* [ ] 301 Permanent
* [ ] 302 Temporary
* [ ] Save Redirect
* [ ] direct-loop detection
* [ ] two-node-loop detection
* [ ] multi-hop-loop detection
* [ ] source conflict detection
* [ ] Redirect-chain warning
* [ ] save blocked on loop
* [ ] no open redirect
* [ ] reserved-route protection
* [ ] cache/lookup invalidation
* [ ] Audit

---

# 267. SCREEN 9 FINAL CHECKLIST — SITEMAP

* [ ] sitemap.xml status
* [ ] real Last Generated time
* [ ] IST display
* [ ] real Included count
* [ ] Regenerate
* [ ] generation-in-progress state
* [ ] duplicate-job protection
* [ ] generation record
* [ ] success state
* [ ] failure state
* [ ] previous valid Sitemap safety
* [ ] scheduled generation
* [ ] CMS Page inclusion
* [ ] Blog inclusion
* [ ] Legal inclusion
* [ ] Location Page inclusion
* [ ] Property inclusion
* [ ] Project inclusion
* [ ] Broker inclusion
* [ ] Builder inclusion
* [ ] Draft exclusion
* [ ] Pending exclusion
* [ ] parameterized Search exclusion
* [ ] Thin Locality transparency row
* [ ] parameterized variants transparency row
* [ ] expired Property transparency row
* [ ] real exclusion counts
* [ ] noindex/Sitemap consistency

---

# 268. SCREEN 10 FINAL CHECKLIST — LOCATION TREE

* [ ] Search Locations
* [ ] Level: All
* [ ] Country
* [ ] State
* [ ] District
* [ ] Taluka where required
* [ ] City
* [ ] Area
* [ ] Locality
* [ ] Society
* [ ] Village where wider final model requires
* [ ] India
* [ ] Gujarat
* [ ] Ahmedabad District
* [ ] Ahmedabad City
* [ ] West Zone
* [ ] Satellite
* [ ] Shrinand Residency
* [ ] Bopal
* [ ] real active Listing counts
* [ ] Add Child
* [ ] lazy tree loading
* [ ] hierarchy validation
* [ ] cycle prevention
* [ ] Taluka collapse rule
* [ ] Missing Location pending children
* [ ] activation workflow
* [ ] no hard delete of referenced Locations
* [ ] SEO Landing Page connection

---

# 269. SCREEN 11 FINAL CHECKLIST — LOCATION EDITOR

* [ ] English Name required
* [ ] Gujarati Name
* [ ] Hindi Name
* [ ] Aliases
* [ ] Satelite Alias fixture
* [ ] Satellite Road Alias fixture
* [ ] real Search resolution
* [ ] canonical Alias records
* [ ] Alias conflict handling
* [ ] Parent Location
* [ ] hierarchy context in options
* [ ] searchable Parent selector
* [ ] valid Parent-type filter
* [ ] Active selectable control
* [ ] Posting Wizard integration
* [ ] Search integration
* [ ] Save Location
* [ ] duplicate sibling detection
* [ ] Search index/cache update
* [ ] Audit

---

# 270. SCREEN 12 FINAL CHECKLIST — TRANSLATIONS

* [ ] real Missing Translation count
* [ ] Gujarati tab
* [ ] Hindi tab
* [ ] English Source
* [ ] target translation column
* [ ] Status column
* [ ] Translated state
* [ ] Pending state
* [ ] Missing state
* [ ] Number Hidden reference string
* [ ] Review ETA reference string
* [ ] Resend OTP reference string
* [ ] stable Translation Keys
* [ ] English Source version/change tracking
* [ ] stale translation review state
* [ ] Translation edit/save
* [ ] token preservation
* [ ] English fallback
* [ ] no blank UI strings
* [ ] pagination
* [ ] Audit

---

# 271. FULL CONNECTED BATCH 14 REGRESSION FLOW

Execute this complete real flow:

Login as Content Manager
→ open CMS Pages
→ Search Page
→ create new Draft Page
→ set Title
→ set Slug
→ add H2
→ add Paragraph
→ upload Image Block
→ edit Meta Title
→ verify character count
→ edit Meta Description
→ set Canonical
→ keep Indexable
→ wait for Autosave
→ refresh
→ verify Draft restored
→ Preview
→ verify Draft rendering not public/indexed
→ Publish
→ verify public Page route
→ verify correct metadata
→ verify Sitemap inclusion after generation
→ edit Published Page
→ verify public page remains old version before Publish
→ publish new revision
→ verify revision history
→ open Blog Posts
→ create Draft Blog
→ upload Featured Image
→ assign Category
→ add Excerpt
→ write body
→ Preview
→ Publish
→ verify Batch 16 Blog Listing
→ verify Blog Detail
→ open Legal Pages
→ edit Privacy Draft vNext
→ verify Publish disabled
→ request Legal Review
→ record Sign-Off using authorised Legal Reviewer fixture
→ verify Publish enabled for exact revision
→ change content after Sign-Off
→ verify Sign-Off invalidated/re-review required
→ Sign-Off again
→ Publish
→ verify old Legal version retained
→ verify final public Legal route
→ open SEO Metadata
→ click Meta inline edit
→ press Escape
→ verify no Save
→ edit again
→ press Enter
→ refresh
→ verify persistence
→ toggle test Page Noindex
→ verify metadata robots
→ regenerate Sitemap
→ verify Page excluded
→ restore test fixture
→ open Redirect Manager
→ add 301 test redirect
→ visit From route
→ verify target
→ verify Hit count
→ attempt A→A
→ verify blocked
→ attempt A→B and B→A
→ verify blocked
→ attempt three-node cycle
→ verify blocked
→ open Sitemap Status
→ Regenerate
→ verify real Run state
→ verify Included count
→ verify Exclusion transparency
→ open Location Hierarchy
→ search Satellite
→ expand hierarchy
→ inspect Listing count
→ Add Child fixture
→ edit English/Gujarati/Hindi Names
→ add Alias `Satelite`
→ save inactive
→ verify not selectable in Posting Wizard
→ activate
→ verify Posting Wizard selection
→ search by Alias
→ verify canonical Location result
→ approve Missing Location fixture in Batch 11 flow
→ verify pending child appears in Batch 14 tree
→ validate/activate it
→ open Translation Tracker
→ switch Gujarati/Hindi tabs
→ edit missing test translation
→ verify token validation
→ mark/update status
→ switch application locale fixture
→ verify translation
→ remove translation fixture
→ verify English fallback
→ run mobile Admin regression
→ tablet regression
→ desktop regression.

Any broken connection means Batch 14 is incomplete.

---

# 272. CMS AUTOSAVE FAILURE TEST

Disconnect/fail Draft Save.

Expected:

* no false Autosaved status,
* visible Save failure,
* local editing not silently discarded,
* Retry available.

---

# 273. PUBLISHED REVISION SAFETY TEST

Published Page v1
→ edit Draft v2
→ Autosave v2
→ public route must still render v1
→ Publish v2
→ public route switches to v2.

---

# 274. LEGAL SIGN-OFF REVISION TEST

Legal v7 receives Sign-Off.

Then edit one character, creating v8 or changed revision.

Expected:

v7 Sign-Off does not authorize changed revision.

Publish remains blocked.

---

# 275. REDIRECT LOOP TEST MATRIX

Test:

* A→A
* A→B + B→A
* A→B + B→C + C→A
* A→B + B→C with no loop
* duplicate active From path
* reserved Admin route
* malicious external redirect target

Only valid safe redirects save.

---

# 276. SITEMAP CONSISTENCY TEST

For test Page:

### Published + Indexable

Included.

### Draft

Excluded.

### Published + Noindex

Excluded.

### Location with no eligible content

Excluded according to thin-page policy.

### Parameterized Search

Excluded.

---

# 277. LOCATION ALIAS TEST

Search:

`Satelite`

Expected:

canonical Satellite locality.

Search same Alias in another City context if ambiguous.

Expected:

contextual disambiguation.

No silent wrong-location match.

---

# 278. LOCATION DEACTIVATION TEST

Deactivate test Locality.

Expected:

* historical Listing remains valid,
* new Posting selection unavailable,
* Search suggestion behavior follows inactive policy,
* no foreign-key destruction.

---

# 279. TRANSLATION STALENESS TEST

English Source v1 translated.

Edit English Source.

Expected:

target translation marked Pending Review/Stale according to final status model.

Do not continue displaying Translated state without review.

---

# 280. PERMISSION REGRESSION MATRIX

## CMS Viewer

Can list/read.

Cannot edit/publish.

## Content Editor

Can edit Draft.

Cannot Publish unless Publish permission.

## Blog Publisher

Can publish Blog where granted.

Cannot Publish Legal without Legal workflow.

## Legal Reviewer

Can record Sign-Off where granted.

Cannot silently change Published Page content unless also granted content permissions.

## SEO Manager

Can edit metadata, redirects, sitemap according to granted permissions.

## Location Manager

Can manage Location tree.

Cannot Publish Legal content.

## Super Admin

Full access, while Legal Sign-Off record still remains an explicit workflow event.

---

# 281. LIVE VERIFICATION STANDARD

After every implementation group:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. start the actual application,
5. login as Content Manager,
6. login as SEO Manager,
7. login as Legal Reviewer,
8. login as Location Manager,
9. login as limited View-only Staff,
10. test route permission,
11. test server action permission,
12. inspect database writes,
13. inspect Revision rows,
14. inspect Sign-Off records,
15. inspect Metadata changes,
16. inspect Redirect records,
17. inspect Sitemap Runs,
18. inspect Location records,
19. inspect Alias records,
20. inspect Translation records,
21. inspect Audit,
22. refresh Browser,
23. verify persistence,
24. test 390px mobile,
25. test tablet,
26. test desktop,
27. inspect Browser console,
28. inspect failed Network requests,
29. inspect public metadata output,
30. inspect Sitemap output,
31. inspect private Draft exposure.

Static code review is not PASS.

---

# 282. PUBLIC ROUTE VERIFICATION

For every Published content type:

verify:

Admin Draft/Publish state
→ Public route rendering
→ Metadata
→ Canonical
→ Robots index state
→ Sitemap state.

These five areas must agree.

---

# 283. SEARCH INTEGRATION VERIFICATION

For every Active test Location:

verify:

* Posting Wizard,
* Search filters,
* Alias search,
* public Location Page where eligible,
* SEO Metadata,
* Sitemap eligibility.

Do not maintain disconnected Location systems.

---

# 284. MANUAL VISUAL VERIFICATION

Compare implementation side-by-side with actual Batch 14 source.

Inspect:

* Admin shell,
* CMS rows,
* Slug typography,
* Status badges,
* Editor toolbar,
* body width,
* SEO sidebar,
* Draft/Preview/Publish group,
* Autosave status,
* image block,
* Featured Image control,
* Category chips,
* Legal banner,
* character counters,
* Search Preview,
* SEO inline edit,
* Index toggle,
* Redirect rows,
* loop warning,
* Sitemap status,
* exclusion list,
* Location indentation,
* level labels,
* Listing count labels,
* Add Child action,
* multilingual form,
* Alias chips/inputs,
* Translation table,
* Status badges.

`Almost the same` is not PASS.

---

# 285. COMPLETION BLOCKERS

Batch 14 must not be marked complete while any of these remain:

* Admin CMS remains Coming Soon,
* CMS List static,
* Editor disconnected from public content,
* CMS/Blog/Legal use unrelated editors,
* Autosave status fake,
* Autosave publishes content,
* Draft Preview publicly accessible,
* Published content overwritten during Draft autosave,
* no revision history,
* Blog Featured Image fake,
* Categories stored only as hard-coded text,
* Excerpt missing,
* Legal content still hard-coded preliminary JSX,
* Legal Publish works without Sign-Off,
* Sign-Off is not tied to exact revision,
* content edit after Sign-Off remains publishable without re-review,
* Terms/Privacy route duplication has no canonical/redirect plan,
* Meta Title input doesn't affect public metadata,
* Meta Description input doesn't affect public metadata,
* Canonical unsafe/unvalidated,
* Index toggle cosmetic only,
* Noindex Page still in Sitemap,
* SEO Inline Edit saves only locally,
* Enter Save missing,
* Escape Cancel missing,
* Redirect Manager missing,
* redirect Hit count fake,
* direct redirect loop allowed,
* multi-hop redirect loop allowed,
* open redirect vulnerability,
* redirect route shadows protected system route,
* Sitemap Admin missing,
* Regenerate only updates timestamp without rebuilding,
* Sitemap includes Draft/Pending/private pages,
* exclusion counts fake,
* Location Tree hard-coded,
* Location Listing counts N+1/fake,
* Taluka collapse rule ignored,
* Missing Location approval creates orphan record,
* Pending child flow missing,
* Location Parent cycle allowed,
* referenced Location hard-deleted,
* Active toggle doesn't affect Posting/Search,
* aliases saved but Search ignores them,
* hard-coded city alias map remains the only alias authority permanently,
* Alias ambiguity silently maps wrong Location,
* Translation Tracker static,
* Missing count fake,
* Gujarati/Hindi tabs show same data,
* stable translation keys missing,
* English source change doesn't flag stale translation,
* missing translation produces blank UI,
* token placeholders can be lost,
* no pagination,
* no permission enforcement,
* no Audit,
* dead button,
* `href="#"`,
* mobile editor unusable,
* long Slug/URL overflow,
* console errors,
* Draft leakage,
* Sitemap/indexability inconsistency,
* no live public-route verification.

---

# 286. FINAL ACCEPTANCE STATEMENT

**Design Batch 14 — Admin CMS / SEO / Locations is complete only when all 12 Batch 14 screen groups are implemented according to the exact source design and every content, SEO, redirect, Sitemap, Location and translation action is connected to real persistent application behavior.**

Completion requires:

* exact CMS Pages List,
* Search Pages,
* New Page,
* Page/Slug/Status/Edited columns,
* shimmer loading,
* No Pages Yet state,
* Retry state,
* shared CMS Editor,
* Draft,
* real Autosave,
* Preview,
* Publish,
* content revisions,
* safe structured content,
* image blocks,
* honest content claims,
* shared SEO sidebar,
* Meta Title count,
* Meta Description count,
* Canonical URL,
* Indexable control,
* Search Preview,
* Blog Posts List,
* real Author,
* real Categories,
* Draft/Published states,
* Blog Editor using same Chrome,
* Featured Image,
* Category selector,
* Excerpt,
* Public Blog connection,
* Legal Pages List,
* Legal version numbers,
* restricted access,
* Legal Sign-Off workflow,
* approval-required banner,
* Publish disabled until exact-revision Sign-Off,
* public Legal rendering,
* SEO per-page Inventory,
* real indexable Page count,
* inline Meta editing,
* Enter Save,
* Escape Cancel,
* parameterized Page Noindex,
* Redirect Manager,
* real Hit counts,
* 301,
* 302,
* Redirect Create/Edit,
* loop detection,
* multi-hop chain inspection,
* Save blocker,
* open-redirect protection,
* Sitemap Status,
* real Last Generated time,
* real Included count,
* Regenerate action,
* generation job state,
* exclusion transparency,
* Thin Locality exclusion,
* Parameterized Search exclusion,
* Expired Listing exclusion,
* complete public-safe Sitemap integration,
* Location Hierarchy,
* Country,
* State,
* District,
* Taluka where required,
* City,
* Area,
* Locality,
* Society,
* Village where final wider hierarchy requires,
* Taluka collapse rule,
* real Listing counts,
* Add Child,
* Missing Location pending-child integration,
* Location Create/Edit,
* English Name,
* Gujarati Name,
* Hindi Name,
* Aliases,
* contextual Parent selection,
* Active/selectable state,
* Posting Wizard integration,
* Search integration,
* Alias resolution,
* canonical Location SEO pages,
* Translation Tracker,
* real missing count,
* Gujarati,
* Hindi,
* English Source,
* target translation,
* Translation Status,
* stable keys,
* stale-translation detection,
* English fallback,
* token validation,
* complete permissions,
* complete audit,
* no fake data,
* no placeholder modules,
* no Draft leakage,
* no SEO inconsistency,
* no redirect loops,
* no broken Sitemap,
* no duplicate Location authority,
* no blank translations,
* complete desktop verification,
* complete tablet verification,
* complete mobile Admin verification,
* complete public-route regression.

Required implementation sequence:

**Screens 1–2 CMS → verify → Screens 3–4 Blog → verify → Screen 5 Legal → verify → Screen 6 SEO Metadata → verify → Screens 7–8 Redirects → verify → Screen 9 Sitemap → verify → Screens 10–11 Locations → verify → Screen 12 Translations → verify → complete connected CMS/SEO/Search/Public regression test.**

No content-management screen passes merely because it renders.

**Exact Design + Content Version Integrity + Legal Approval Integrity + SEO Consistency + Redirect Safety + Sitemap Transparency + Canonical Location Integrity + Search Alias Accuracy + Translation Integrity + Permission Enforcement + Auditability + Responsive Behavior + Live Public Verification must all pass.**
