
# `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`

# MY GUJARAT PROPERTY

## COMPLETE FUNCTIONAL, BACKEND, DATABASE, SECURITY, RLS, PROVIDER AND DATA SPECIFICATION

**File status:** FINAL CONSOLIDATED FUNCTIONAL AUTHORITY
**Project root:** `C:\mgpweb`
**Approved design directory:** `C:\mgpweb\newdesign`
**Applies to:** Complete My Gujarat Property platform
**Covered design scope:** Batch 4 through Batch 17
**Public roles:** Owner, Broker, Builder
**Internal access:** Permission-scoped Staff, Admin and Super Admin
**Primary backend:** Supabase PostgreSQL, Supabase Auth, Supabase RLS and approved provider abstractions

---

# 1. DOCUMENT PURPOSE

This document defines the complete functional, backend, database, security, permission, provider, workflow, state-management, storage, performance and data-integrity requirements for My Gujarat Property.

It consolidates the functional requirements for:

* public Property and Project discovery;
* public-safe profiles;
* Property, Project and Requirement posting;
* Drafts and autosave;
* moderation;
* Owner dashboard;
* Broker dashboard and CRM;
* Builder dashboard;
* Unit Inventory;
* Leads;
* Proposals;
* Messages;
* Site Visits;
* Contact Reveal;
* Saved content;
* analytics;
* subscriptions;
* checkout;
* Payments;
* Invoices;
* Refunds;
* Credit Notes;
* Plans;
* Coupons;
* Trials;
* verification;
* claims;
* reports;
* support;
* Admin;
* Staff permissions;
* Ads;
* Notifications;
* providers;
* feature flags;
* Maintenance Mode;
* system health;
* CMS;
* Blog;
* Legal content;
* SEO;
* Redirects;
* Sitemap;
* Locations;
* translations;
* Audit;
* security events;
* business reports;
* exports;
* bulk actions;
* maker-checker;
* public content;
* cookie consent;
* PWA;
* localization;
* property tools;
* Comparison;
* accessibility;
* and final production behavior.

This document defines what the platform must do.

`00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md` defines the global implementation rules.

`01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md` defines which approved screen belongs to each route and state.

`03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md` defines how the complete implementation must be manually verified.

`04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md` defines the execution sequence.

---

# 2. IMPLEMENTATION PRINCIPLE

The application already contains existing code and database foundations.

Claude must not create a second disconnected backend.

For every functional area:

1. inspect current tables;
2. inspect current migrations;
3. inspect existing Server Actions and APIs;
4. inspect current RLS;
5. inspect existing providers;
6. identify secure compatible foundations;
7. preserve correct foundations;
8. repair incomplete foundations;
9. replace conflicting data behavior;
10. create missing canonical functionality;
11. migrate existing records safely;
12. verify every workflow using real database writes.

Do not create duplicate systems merely because a new design screen is being implemented.

Examples:

* do not create separate Owner Leads and Broker Leads tables;
* do not create separate dashboard Message tables;
* do not create separate Site Visit records for each role;
* do not create duplicate Invoice models for User and Admin;
* do not create separate public and Admin Support Ticket systems;
* do not create separate Notification records for each module;
* do not create separate Property media systems;
* do not create separate Location lists for each Wizard.

---

# 3. SYSTEM ARCHITECTURE

The final application must preserve the existing production-capable architecture unless an inspected implementation requires a safe correction.

Expected foundations include:

* Next.js App Router;
* TypeScript;
* Server Components;
* Client Components only where interaction requires them;
* Server Actions and secured route handlers;
* Supabase Auth;
* PostgreSQL;
* Row Level Security;
* private and public storage;
* provider abstraction;
* background jobs;
* scheduled jobs;
* application-level validation;
* database constraints;
* Audit events;
* Notifications;
* and secure provider webhook processing.

The Browser must never be the final authority for:

* identity;
* role;
* permission;
* ownership;
* target state;
* Payment state;
* Subscription state;
* provider success;
* price;
* tax;
* quota;
* verification;
* moderation;
* or entity visibility.

---

# 4. CANONICAL ROLE MODEL

## 4.1 Public registrable roles

Only these public roles are canonical:

* `owner`
* `broker`
* `builder`

Do not create public registration roles named:

* buyer;
* tenant;
* agency;
* agency_group;
* real_estate_group;
* developer_group;
* or similar removed legacy roles.

Words such as Buyer, Tenant, Customer or Requester may be contextual labels, not role records.

## 4.2 Owner

Owner may manage their own:

* Properties;
* Requirements where approved;
* Leads;
* Messages;
* Site Visits;
* Saved content;
* analytics;
* Billing;
* Invoices;
* verification;
* Profile;
* Support;
* Notifications;
* Settings;
* Role Change request;
* Data Export;
* and Account Deletion request.

Owner must not publish Projects or Builder Units.

## 4.3 Broker

Broker represents the consolidated Broker/Agency role.

Broker may manage:

* own Properties;
* authorized client Properties;
* own or client Requirements;
* Requirement Feed;
* Proposals;
* CRM Leads;
* Messages;
* Site Visits;
* Saved content;
* analytics;
* Billing;
* verification;
* business Profile;
* team members where approved;
* Notifications;
* Support;
* and Settings.

## 4.4 Builder

Builder may manage:

* Projects;
* Project Units;
* Unit Inventory;
* Leads;
* Requirements Feed;
* Proposals;
* Messages;
* Site Visits;
* team members;
* Ad Campaigns;
* Project analytics;
* Billing;
* Ad Wallet;
* RERA verification;
* Company Microsite;
* construction milestones;
* Notifications;
* Support;
* and Settings.

## 4.5 Internal roles

Internal access must use permission-scoped Staff.

Possible internal profiles include:

* Super Admin;
* User Manager;
* Moderation Manager;
* Verification Manager;
* Support Manager;
* Billing Manager;
* Payment Manager;
* Ads Manager;
* Content Editor;
* Blog Publisher;
* Legal Editor;
* Legal Reviewer;
* SEO Manager;
* Location Manager;
* Security Manager;
* Reports Manager;
* and other approved Staff profiles.

The role name alone must not replace capability checks.

---

# 5. TENANCY, OWNERSHIP AND TEAM SCOPE

Every user-owned entity must have an explicit canonical ownership model.

Do not force `agency_id` into every table.

Possible scope columns may include:

* `owner_profile_id`;
* `created_by_profile_id`;
* `business_profile_id`;
* `builder_profile_id`;
* `broker_profile_id`;
* `team_id`;
* `assigned_to_profile_id`;
* `participant_profile_id`;
* or another final inspected equivalent.

The final schema must make it possible to answer:

* who owns the record;
* who created it;
* who may edit it;
* which business it belongs to;
* which team members may access it;
* which participants may view it;
* and which Staff capabilities may override normal access.

Team access must not be inferred only from Client-selected business IDs.

---

# 6. USER ACCOUNT MODEL

The canonical account model must support:

* Auth User ID;
* public Profile ID;
* current canonical role;
* account status;
* mobile verification;
* optional email;
* email verification;
* public display name;
* private legal name where needed;
* avatar;
* preferred language;
* Theme;
* timezone;
* notification preferences;
* privacy preferences;
* public Profile visibility;
* created date;
* last active date;
* and deletion state.

## 6.1 Account states

At minimum, support applicable states such as:

* active;
* pending;
* suspended;
* banned;
* deletion_requested;
* deletion_grace_period;
* deletion_processing;
* deleted/anonymized;
* and blocked.

## 6.2 Account restrictions

Suspended or banned users must be prevented server-side from prohibited actions.

Depending on enforcement policy, effects may include:

* blocked login;
* blocked new Listings;
* blocked edits;
* hidden public Listings;
* blocked communication;
* blocked Payments;
* or restricted read-only access.

The enforcement effect must be stored and consistently applied.

---

# 7. AUTHENTICATION

Authentication must use the real configured provider.

Mobile OTP may remain the primary authentication path.

Development random OTP is permitted only when:

* development mode explicitly enables it;
* production cannot enable it accidentally;
* it does not create real verified production accounts;
* and the UI does not falsely state that a provider message was delivered.

## 7.1 Return intent

Auth-gated actions must preserve:

* originating route;
* target entity;
* requested action;
* selected Plan where applicable;
* selected Requirement or Proposal context;
* selected Saved action;
* and selected Contact Reveal action.

After authentication, server authorization must be checked again.

## 7.2 Open redirect prevention

Return URLs must be validated.

External redirects must not be accepted unless explicitly allow-listed.

## 7.3 Re-verification

Sensitive operations may require recent OTP re-verification, including:

* Data Export;
* Account Deletion;
* contact/mobile change;
* high-risk billing change;
* or other final approved actions.

---

# 8. STAFF PERMISSION MODEL

Use explicit capabilities rather than broad UI-only role gates.

A permission record may define:

* module;
* read;
* create;
* update;
* approve;
* reject;
* export;
* assign;
* manage;
* sensitive_read;
* sensitive_write;
* and execute.

Examples of permission keys may include:

* `users.read`;
* `users.suspend`;
* `users.role_change_review`;
* `staff.manage`;
* `properties.moderate`;
* `projects.moderate`;
* `requirements.moderate`;
* `claims.review`;
* `verification.review`;
* `support.manage`;
* `billing.read`;
* `billing.refund`;
* `billing.plan_manage`;
* `ads.review`;
* `notifications.manage`;
* `providers.manage`;
* `feature_flags.manage`;
* `maintenance.manage`;
* `cms.edit`;
* `cms.publish`;
* `legal.edit`;
* `legal.review`;
* `legal.publish`;
* `seo.manage`;
* `locations.manage`;
* `translations.manage`;
* `audit.read`;
* `security.manage`;
* `reports.manage`;
* `exports.manage`;
* and `approvals.check`.

Every protected Admin route and action must enforce the capability server-side.

---

# 9. CANONICAL DATABASE ENTITY REGISTRY

Existing table names may be preserved when they are equivalent and secure.

Do not create duplicate tables merely to match the names below.

The final logical data model must support the following entity groups.

## 9.1 Identity and access

* auth users;
* profiles;
* role history;
* businesses;
* team memberships;
* Staff profiles;
* Staff permissions;
* Staff invitations;
* account restrictions;
* user sessions where required;
* security events.

## 9.2 Real-estate content

* Properties;
* Property revisions;
* Projects;
* Project revisions;
* Project configurations;
* Project structures;
* Units;
* Unit status history;
* Requirements;
* Requirement locations;
* amenities;
* entity amenities;
* Locations;
* Location aliases;
* Missing Location requests;
* media;
* media processing;
* construction milestones.

## 9.3 Public engagement

* Saved items;
* Saved Searches;
* Saved Search locations/filters;
* Recently Viewed;
* Comparison sets/items;
* Contact Reveals;
* contact usage/quota;
* enquiries;
* Leads;
* Lead timeline;
* Lead notes;
* Lead reminders;
* Lead duplicate candidates;
* Lead merges;
* Proposals;
* Proposal status history;
* Message Threads;
* Thread participants;
* Messages;
* Message attachments;
* participant archive/read state;
* Site Visits;
* Site Visit history;
* Site Visit reminders;
* Site Visit feedback;
* Site Visit disputes.

## 9.4 Moderation and trust

* moderation queue records;
* moderation decisions;
* verification requests;
* verification documents;
* verification decisions;
* Profile Claims;
* Claim documents;
* Reports;
* Report evidence snapshots;
* enforcement actions;
* duplicate review records.

## 9.5 Billing

* Plans;
* Plan versions;
* Plan entitlements;
* Subscriptions;
* Subscription history;
* usage counters;
* checkout sessions;
* provider orders;
* Payments;
* Payment attempts;
* webhook events;
* Invoices;
* Invoice versions;
* Invoice line items;
* tax snapshots;
* Refund requests;
* Refunds;
* Credit Notes;
* Coupons;
* Coupon Plan relations;
* Coupon redemptions;
* Trial campaigns;
* Trial grants;
* wallet accounts;
* wallet ledger;
* manual Subscription grants.

## 9.6 Communication and operations

* Notifications;
* Notification templates;
* template versions;
* Notification preferences;
* Notification delivery attempts;
* Support Tickets;
* Support Messages;
* Support attachments;
* Support macros;
* Ads;
* Ad creatives;
* Ad targeting;
* Ad schedules;
* Ad moderation;
* Ad performance;
* Ad fraud reviews.

## 9.7 Platform administration

* provider configurations;
* provider test events;
* provider health;
* provider secret references;
* feature flags;
* feature flag rollout rules;
* Maintenance Mode;
* background jobs;
* job attempts;
* dead-letter queue;
* system health snapshots;
* Audit events;
* security events;
* Export jobs;
* bulk action previews;
* bulk action executions;
* maker-checker requests;
* approval decisions.

## 9.8 Content and SEO

* CMS documents;
* CMS revisions;
* CMS blocks;
* Blog Posts;
* Blog revisions;
* Blog categories;
* Legal documents;
* Legal revisions;
* Legal sign-offs;
* SEO metadata;
* Redirects;
* Sitemap runs;
* translation keys;
* translations;
* missing translation records;
* cookie/consent preferences;
* public content cache versions.

## 9.9 Preferences and advanced tools

* user preferences;
* language preferences;
* Theme preferences;
* accessibility preferences;
* PWA session/install preference;
* PWA update state where required;
* calculator reference data;
* Stamp Duty rate versions;
* land-unit conversion versions.

---

# 10. COMMON DATABASE FIELDS

Canonical entities should include the fields required by their lifecycle.

Applicable common fields include:

* `id`;
* `public_id`;
* `display_id`;
* `slug`;
* `status`;
* `created_at`;
* `created_by`;
* `updated_at`;
* `updated_by`;
* `version`;
* `lock_version`;
* `published_at`;
* `archived_at`;
* `deleted_at`;
* `metadata`;
* `last_transition_at`;
* and `last_transition_by`.

Do not use `metadata` as a substitute for frequently queried structured fields.

Critical filters, ownership, permissions, amounts, states and relationships must use typed indexed columns.

---

# 11. DATABASE CONSTRAINTS

Use database constraints to protect invariants.

Applicable examples include:

* unique public slug;
* unique active role-change request per user;
* unique pending Claim per user and target;
* unique active Proposal for the approved sender/Requirement/Listing combination;
* unique active comparison item per comparison set;
* unique thread participant;
* unique active checkout intent where policy requires it;
* unique processed provider webhook event;
* unique Invoice number;
* unique Credit Note number;
* unique Coupon code;
* one active primary Subscription per account and product context;
* one active verification request of the same type where required;
* one current published revision;
* and no duplicate deterministic Unit generation key.

Constraints must complement, not replace, server validation.

---

# 12. DATABASE INDEXES

Create indexes for real query patterns.

At minimum, inspect and index applicable combinations for:

* owner + status;
* business + status;
* role + status;
* published status + City + purpose;
* Project + Unit status;
* Requirement visibility + status + location;
* Lead recipient + stage + updated date;
* Lead assignee + stage;
* Thread participant + last message date;
* Message thread + created date;
* Site Visit participant + scheduled date;
* Notification recipient + read state + created date;
* Invoice account + issue date;
* Payment provider ID;
* webhook provider + provider event ID;
* moderation queue type + status + submitted date;
* Support assignee + status + priority;
* Location parent + type;
* normalized Location alias;
* CMS type + status + updated date;
* Redirect source path;
* Audit actor + date;
* Audit target + date;
* report status + severity;
* background job status + run date;
* and Expiry/schedule fields.

Do not add unused indexes blindly.

Verify query plans for high-volume paths.

---

# 13. MIGRATION RULE

Every database change must use a migration.

A migration must include, where applicable:

1. schema change;
2. constraints;
3. indexes;
4. backfill;
5. data normalization;
6. RLS update;
7. grants;
8. helper functions;
9. compatibility period;
10. and rollback/recovery notes.

Do not:

* rewrite applied migration history;
* drop existing data without a migration plan;
* force a destructive reset;
* or assume development database shape equals production.

---

# 14. ROW LEVEL SECURITY FOUNDATION

RLS must enforce final ownership and participant rules.

## 14.1 Public-safe policies

Public access must be limited to:

* published eligible Properties;
* published eligible Projects;
* approved public profiles;
* public CMS content;
* published Blog Posts;
* published Legal revisions;
* active public Plans;
* and other explicitly public-safe records.

Public policies must not expose private fields.

Use public-safe views or functions where needed.

## 14.2 User-owned policies

Users may access only their own:

* Drafts;
* Properties;
* Projects;
* Requirements;
* Saved items;
* Saved Searches;
* Subscription;
* Invoices;
* verification requests;
* Support Tickets;
* Notifications;
* account requests;
* and exports.

## 14.3 Participant policies

Participants may access only authorized:

* Leads;
* Proposals;
* Message Threads;
* Messages;
* Site Visits;
* Reveal history;
* and dispute records.

## 14.4 Team policies

Team members may access records only when:

* active membership exists;
* required module permission exists;
* Project/business scope permits access;
* assignment scope permits access;
* and membership is not suspended or revoked.

## 14.5 Staff policies

Staff access must follow capabilities.

Do not give every Admin unrestricted access merely because an Admin shell exists.

## 14.6 RLS engineering

Avoid:

* recursive policies;
* unindexed expensive policy joins;
* unsafe service-role fallback;
* policy functions that expose data;
* and inconsistent ownership columns.

Use indexed helper functions where appropriate.

---

# 15. SERVICE ROLE USE

Service-role access is permitted only in trusted server contexts.

Before using service-role access:

1. authenticate the requester;
2. authorize the action;
3. validate the target;
4. validate the current state;
5. project minimum required fields;
6. execute the smallest necessary operation;
7. create Audit where required.

Never expose service-role credentials to:

* Client code;
* public environment variables;
* Browser responses;
* logs visible to users;
* or generated HTML.

---

# 16. PUBLIC-SAFE FIELD PROJECTION

Public detail and Profile queries must explicitly select only public-safe fields.

Never send private fields and hide them in the UI.

Sensitive fields include:

* full mobile;
* alternate mobile;
* private email;
* private address;
* exact coordinates where restricted;
* identity documents;
* verification proofs;
* claim proofs;
* Staff notes;
* internal moderation reason;
* private Lead data;
* Payment details;
* provider secrets;
* internal fraud evidence;
* and private attachments.

---

# 17. PROPERTY DATA MODEL

A Property must support applicable structured fields such as:

* owner/business;
* poster role;
* public slug;
* purpose;
* category;
* Property type;
* title;
* description;
* BHK/configuration;
* furnishing;
* facing;
* floor;
* total floors;
* carpet area;
* built-up area;
* plot area;
* area unit;
* price;
* negotiable flag;
* maintenance;
* security deposit;
* availability;
* possession;
* age;
* amenities;
* parking;
* location hierarchy;
* address text;
* landmark;
* PIN code;
* approximate/public coordinates;
* private coordinates where allowed;
* contact preference;
* publication status;
* moderation state;
* verification state;
* published date;
* unavailable reason;
* unavailable date;
* and current approved revision.

Do not store essential Property attributes only in one unvalidated JSON blob.

---

# 18. PROPERTY STATE MACHINE

Applicable Property states may include:

* Draft;
* Pending;
* Under Review;
* Needs Changes;
* Approved;
* Live;
* Paused;
* Rejected;
* Expired;
* Sold;
* Rented;
* Archived;
* Removed;
* and Deleted where policy permits.

A display status must map from canonical server state.

Invalid transitions must fail.

Examples:

* Draft → Pending;
* Pending → Under Review;
* Under Review → Approved/Needs Changes/Rejected;
* Approved → Live;
* Live → Paused;
* Paused → Live;
* Live → Sold/Rented;
* Live edit → Pending Revision while approved version remains public.

Do not silently mutate live public content when reapproval is required.

---

# 19. PROPERTY DRAFT AND WIZARD

The Property Wizard must implement:

* exact nine steps from the HTML;
* step progress;
* partial Draft persistence;
* debounced autosave;
* manual Save Draft;
* latest saved timestamp;
* save error state;
* exact resume step;
* refresh recovery;
* multiple Draft safety;
* Start New without silently deleting existing Draft;
* validation summary;
* type-aware fields;
* Price validation;
* Area validation;
* canonical Location;
* amenities;
* contact preferences;
* media;
* Preview;
* Plan gate;
* idempotent Submit;
* moderation;
* and Submitted state.

## 19.1 Autosave concurrency

Autosave must not allow an older request to overwrite newer values.

Use:

* version;
* updated timestamp;
* mutation sequence;
* or another stale-write protection.

## 19.2 Draft privacy

Property Drafts and Draft media must never be publicly accessible.

---

# 20. PROPERTY MEDIA REQUIREMENTS

Property media must support:

* minimum-photo rule;
* real upload;
* MIME validation;
* size validation;
* image decoding validation;
* upload progress;
* retry;
* remove;
* reorder;
* Cover selection;
* crop metadata;
* caption/category where available;
* private Draft storage;
* approved public delivery after publication;
* and orphan cleanup.

A media ID must not be attachable to another user’s Property.

Provider unavailable state must be honest.

---

# 21. PROPERTY PREVIEW

Preview must use the Batch 4 Property Detail presentation with private Draft data.

Preview must:

* require owner/editor authorization;
* use Draft revision;
* use private signed media;
* not create a public indexable URL;
* not appear in Sitemap;
* not expose contact publicly;
* and provide Edit links to relevant Wizard steps.

---

# 22. PROPERTY PUBLIC DETAIL

The public Property resolver must return:

* public-safe Property fields;
* approved media;
* approved poster-safe data;
* exact aggregate counts;
* verification truth;
* canonical Location;
* similar eligible Properties;
* masked contact;
* and unavailable tombstone data where required.

## 22.1 Posted date

Use actual `published_at`.

Do not use Draft creation date.

## 22.2 Verification badge

Property verification is separate from:

* moderation approval;
* publication;
* and user verification.

Show Verified only when the actual Property verification state qualifies.

## 22.3 Unavailable tombstone

Sold, Rented or safely unavailable Properties must show the approved tombstone when policy requires it.

Do not return a generic 404 for every unavailable Property.

The tombstone query must return only safe fields.

---

# 23. PROJECT DATA MODEL

A Project must support:

* Builder identity;
* public slug;
* Project name;
* description;
* Project type;
* RERA registration state;
* RERA number;
* RERA verification state;
* RERA proof relation;
* Location;
* landmarks;
* price range;
* launch date;
* possession date;
* towers/wings;
* floors;
* Unit configuration;
* amenities;
* brochure;
* Floor Plans;
* video;
* 360 Tour;
* media;
* contact preference;
* construction milestones;
* publication state;
* moderation;
* revision;
* and public Profile relation.

---

# 24. RERA STATE MODEL

RERA states must distinguish:

* not provided;
* not applicable where valid;
* syntax invalid;
* registered/unverified;
* verification pending;
* verified;
* rejected;
* expired;
* and approved exception where policy permits.

`RERA Registered` must not automatically display as `RERA Verified`.

Project publication must respect the RERA gate.

Any Admin exception must require:

* explicit permission;
* mandatory reason;
* safe impact warning;
* and Audit.

---

# 25. PROJECT WIZARD

The Project Wizard must implement:

* exact ten steps;
* shared Batch 5 shell;
* Builder identity from authenticated Profile;
* Project type;
* RERA syntax;
* RERA pending state;
* Location;
* landmarks;
* Wing/Tower/Floor structure;
* deterministic Unit generation;
* amenities;
* dates;
* construction foundation;
* Project media;
* Brochure PDF;
* Floor Plans;
* Video URL;
* 360 Tour URL;
* contact;
* private Preview;
* Plan gate;
* idempotent Submit;
* Pending RERA Check;
* and revision/reapproval.

---

# 26. DETERMINISTIC UNIT GENERATION

Project Unit generation must be deterministic and idempotent.

The system must prevent duplicates when generation is retried.

A Unit identity should derive from approved structured attributes such as:

* Project;
* Tower/Wing;
* Floor;
* Unit number;
* or another stable unique key.

Generating the same structure twice must not duplicate Units.

Changing Project structure after inventory exists must:

* show impact;
* prevent unsafe deletion;
* preserve sold/booked Units;
* require confirmation;
* and use a transaction or recoverable migration workflow.

---

# 27. UNIT INVENTORY

Each Unit may support:

* Project;
* Tower;
* Wing;
* Floor;
* Unit number;
* configuration;
* carpet area;
* built-up area;
* price;
* status;
* availability date;
* booking reference where permitted;
* public visibility;
* last updated;
* and status history.

## 27.1 Unit states

Applicable states:

* available;
* blocked;
* reserved;
* booked;
* sold;
* unavailable;
* and archived.

Invalid backward transitions must be controlled.

For example, Sold must not become Available through a casual Client request.

## 27.2 Bulk operations

Bulk Unit actions must:

* preview affected Units;
* exclude stale/invalid Units;
* revalidate server-side;
* execute transactionally where possible;
* return partial-result details when applicable;
* and create Audit.

---

# 28. PROJECT CONSTRUCTION MILESTONES

Do not derive fake progress from a broad Project status.

Store actual milestones with fields such as:

* Project;
* milestone type/name;
* display order;
* target date;
* completed date;
* state;
* percentage contribution where approved;
* Builder note;
* media/evidence;
* approved visibility;
* and update history.

Public progress must reflect actual approved milestone data.

---

# 29. PROJECT MEDIA

Project media must distinguish:

* gallery image;
* cover;
* Floor Plan;
* brochure;
* video;
* 360 Tour;
* construction progress media;
* and other approved categories.

Brochure must remain PDF.

Do not convert it into a fake image gallery item.

Video and 360 embeds must use:

* approved provider/domain allow-list;
* sanitized URLs;
* secure embed policy;
* and honest absent/Setup Required states.

---

# 30. PROJECT PUBLIC DETAIL

Project Detail must use:

* real Builder;
* real Project;
* real RERA distinction;
* real price range;
* real possession date;
* real Unit Inventory aggregates;
* real Floor Plans;
* real construction milestones;
* real media;
* real brochure metadata;
* real similar Projects;
* real Builder counts;
* and real enquiry options.

Project enquiry configuration options must come from available configurations.

Do not hard-code 2 BHK, 3 BHK or 4 BHK when the Project has different inventory.

---

# 31. REQUIREMENT DATA MODEL

A Requirement must support:

* creator;
* creator role;
* client context where approved;
* public display ID;
* purpose;
* Property category;
* Property type;
* BHK/configuration;
* budget minimum;
* budget maximum;
* area;
* preferred locations;
* amenities;
* timeline;
* description;
* contact preference;
* requester visibility;
* Draft state;
* moderation;
* active/closed/expired state;
* published/approved date;
* and Proposal relations.

---

# 32. REQUIREMENT WIZARD

The Requirement Wizard must implement:

* exact seven steps;
* Draft;
* autosave;
* resume;
* Looking For;
* purpose/category;
* multiple Cities/Localities;
* maximum approved Location count;
* duplicate Location prevention;
* Missing Location request;
* budget;
* BHK;
* area;
* amenities;
* timeline;
* contact preference;
* Preview;
* Plan/quota;
* spam/duplicate checks;
* Submit;
* moderation;
* and active outcome.

Preferred Localities must use canonical Location relations.

Do not store all selected Locations only as one free-text string.

---

# 33. REQUIREMENT VISIBILITY

Requirement Detail must support:

* Guest locked teaser;
* eligible Owner access;
* eligible Broker access;
* eligible Builder access;
* authenticated but unauthorized state;
* masked requester identity;
* Proposal action;
* Noindex;
* Sitemap exclusion.

The full description and requester identity must not leak to Guest HTML or API payloads.

---

# 34. REQUIREMENT FEED AND MATCHING

Broker and Builder Requirement Feeds must use real eligibility and matching.

Possible matching factors include:

* service area;
* City;
* Locality;
* purpose;
* Property/Project type;
* BHK/configuration;
* budget;
* possession/timeline;
* and available matching Listing.

Do not show fake match percentages.

If a numeric match score is displayed, its algorithm must be deterministic and explainable.

---

# 35. AMENITY REGISTRY

Use one canonical amenity registry.

Each amenity should support:

* canonical key;
* display label;
* category;
* supported entity types;
* icon reference;
* translation;
* active status;
* and display order.

Do not render raw database keys.

Do not maintain different spellings for the same amenity across Property, Project and Requirement.

---

# 36. LOCATION SYSTEM

Use one canonical hierarchy.

Approved hierarchy may include:

Country
→ State
→ District
→ Taluka
→ City or Village
→ Area or Locality
→ Society or Building.

The final hierarchy must account for approved Gujarat-specific normalization.

## 36.1 Location fields

A Location may support:

* type;
* parent;
* canonical name;
* Gujarati name;
* Hindi name;
* slug;
* aliases;
* common misspellings;
* transliterations;
* latitude;
* longitude;
* boundary reference where available;
* active status;
* selectable status;
* SEO status;
* and display order.

## 36.2 Parent validation

A Locality must not be assigned to an invalid parent type.

Moving a Location must validate the entire subtree and SEO impact.

## 36.3 Lazy loading

The Admin tree must not load all India Locations in one request.

Load:

* visible roots;
* children on expansion;
* direct search results;
* and required breadcrumb ancestors.

---

# 37. MISSING LOCATION WORKFLOW

When a user cannot find a Location:

1. collect requested text;
2. collect intended parent;
3. collect entity context;
4. create Missing Location request;
5. prevent duplicate pending request where possible;
6. allow user to continue according to approved fallback;
7. send to Admin queue;
8. compare duplicate candidates;
9. approve/create canonical Location or reject;
10. reconnect approved Location to affected Draft where possible;
11. notify requester;
12. create Audit.

Do not silently create free-text canonical Locations from every submission.

---

# 38. MAP AND COORDINATE DATA

Store textual Location independently from Map provider availability.

Map provider failure must not destroy the valid address.

Coordinate rules must support:

* exact private coordinates;
* approximate public coordinates;
* address-only fallback;
* current-location fallback;
* and native Map intent where approved.

Public pages must not expose precise coordinates when privacy policy requires approximation.

---

# 39. MEDIA SYSTEM

Use one canonical media architecture.

A media record may include:

* storage provider;
* bucket/container;
* storage key;
* entity type;
* entity ID;
* owner;
* MIME;
* extension;
* size;
* width;
* height;
* duration where applicable;
* checksum;
* sort index;
* cover flag;
* caption;
* category;
* crop metadata;
* upload state;
* processing state;
* visibility;
* created date;
* and deleted/orphan state.

## 39.1 Upload lifecycle

Recommended lifecycle:

1. request upload authorization;
2. verify user/entity;
3. issue short-lived upload authorization;
4. upload;
5. complete upload;
6. verify file;
7. persist metadata;
8. process/optimize;
9. attach to entity;
10. publish only when entity is eligible.

## 39.2 Upload states

* pending;
* uploading;
* uploaded;
* processing;
* ready;
* failed;
* rejected;
* orphaned;
* removed.

## 39.3 Orphan cleanup

Incomplete and unattached uploads must be cleaned through scheduled jobs.

Do not delete files still referenced by:

* approved revision;
* invoice;
* verification;
* claim;
* support;
* moderation;
* or legal retention.

---

# 40. IMAGE PROCESSING

Where image conversion is enabled:

* preserve original when required;
* create optimized variants;
* use WEBP/AVIF where supported;
* maintain aspect ratio;
* apply crop only through recorded crop metadata;
* prevent distortion;
* and create responsive sizes.

Do not convert PDFs to images unless a separate safe preview is explicitly required.

---

# 41. PRIVATE DOCUMENT STORAGE

The following must remain private unless policy explicitly states otherwise:

* verification documents;
* Claim proofs;
* private RERA/GST proof;
* identity documents;
* Account Export archives;
* Support attachments;
* Message attachments;
* moderation evidence;
* Refund evidence;
* Invoice files where account-restricted;
* and internal report evidence.

Access must require:

* authorization;
* short-lived signed URL or protected streaming;
* safe Content-Disposition;
* access expiry;
* and Audit for sensitive files where required.

---

# 42. PUBLIC PROFILE SYSTEM

Use public-safe profile projections.

## 42.1 Broker Profile

Support:

* public slug;
* display name;
* business name;
* service areas;
* experience;
* member since;
* verification state;
* active Listing count;
* paginated active Listings;
* public About;
* and contact action.

Counts must use aggregate queries.

Do not derive total count from the first result page.

## 42.2 Builder Profile

Support:

* public slug;
* company name;
* RERA information;
* founded year;
* headquarters;
* About;
* active Project count;
* completed Project count;
* delivered count;
* tabs;
* public media;
* and claimable state.

## 42.3 Owner public-safe Profile

Support:

* public slug;
* safe display name;
* avatar/initials;
* Owner label;
* member since;
* active public Listing count;
* privacy state;
* and public Listings only where allowed.

Do not expose direct Owner phone or email on the Profile.

---

# 43. PROFILE CLAIMS

A Claim Request must support:

* claimant;
* target profile;
* target type;
* claimed relationship;
* proof documents;
* request state;
* reviewer;
* decision;
* decision reason;
* ownership assignment;
* created date;
* reviewed date;
* and Audit.

## 43.1 Claim requirements

* target must be claimable;
* profile must not already be owned;
* claimant must not already own it;
* proof is required;
* PDF/JPG must be validated;
* maximum file size must follow approved design, including the 10 MB Claim proof limit;
* proof must remain private;
* duplicate pending request must be prevented;
* and final ownership assignment must be transactional.

Two competing Claims may be reviewed, but only one ownership assignment may succeed.

---

# 44. CONTENT REPORTING

Use one canonical Report system for supported targets:

* Property;
* Project;
* Requirement;
* Broker Profile;
* Builder Profile;
* Owner Profile where permitted;
* Message Thread;
* and other approved content.

A Report must support:

* reporter or Guest identity token;
* target type;
* target ID;
* structured category;
* details;
* safe evidence snapshot;
* status;
* severity;
* assigned Staff;
* decision;
* enforcement;
* and Audit.

## 44.1 Report categories

At minimum, Listing/Profile reports may include:

* Spam or duplicate;
* Fraud or suspicious;
* Incorrect information;
* Inappropriate content;
* Other.

## 44.2 Duplicate protection

Prevent repeated pending Reports by the same reporter for the same target and category according to policy.

## 44.3 Guest Report rate limit

Guest reporting must be rate-limited.

Where the approved specification requires it, enforce a maximum of three Guest reports per day using a privacy-safe rate-limit identity.

Do not trust a Client counter.

---

# 45. FULLSCREEN GALLERY

Gallery data must use only authorized entity media.

The gallery must support:

* persisted order;
* selected initial media;
* previous/next;
* keyboard;
* swipe;
* count;
* captions;
* category;
* image error;
* and close/return context.

Do not accept an arbitrary media ID unrelated to the Property or Project.

---

# 46. COMPARISON SYSTEM

Use one persistent Comparison system.

The final approved capacity is maximum four eligible Properties unless a later explicit user instruction changes it.

Comparison must support:

* add from Search;
* add from Saved;
* add from Detail;
* persistent tray;
* remove;
* clear;
* full Comparison route;
* mobile horizontal comparison;
* pinned label column where designed;
* unavailable item handling;
* stale-item revalidation;
* and navigation persistence.

Comparison must not include:

* Draft;
* private;
* unauthorized;
* or deleted content.

The Comparison page should be Noindex unless final SEO policy states otherwise.

---

# 47. SAVED ITEMS

Use one canonical Saved Item model.

Supported types may include:

* Property;
* Project;
* and other explicitly approved types.

A Saved Item must support:

* user;
* entity type;
* entity ID;
* created date;
* and unavailable state.

Duplicate saves must be prevented.

Guest Save must resume after authentication.

---

# 48. SAVED SEARCHES

A Saved Search must store structured filters rather than only a display string.

Possible fields:

* user;
* purpose;
* Property type;
* locations;
* price range;
* BHK;
* area;
* amenities;
* sort;
* alert enabled;
* last match check;
* last seen match;
* new match count;
* and created date.

Saved Search alerts must use real matching queries.

When Email/Push is unavailable, internal match state may still be updated, while external delivery remains honestly skipped.

---

# 49. RECENTLY VIEWED

Recently Viewed must use real viewing history.

Store:

* user or approved anonymous session;
* entity type;
* entity ID;
* viewed date;
* source;
* and optional count.

Do not expose another user’s history.

Clear History must be real and idempotent.

Retention must be bounded.

---

# 50. SEARCH SYSTEM

Search must use canonical data and scalable queries.

It must support approved:

* Property;
* Project;
* City;
* Locality;
* Builder;
* developer/business;
* landmark;
* purpose;
* Property type;
* price;
* BHK;
* area;
* and other final filters.

Search must not operate only over the currently loaded first page.

## 50.1 Search suggestion grouping

Suggestions may be grouped by:

* City;
* Locality;
* Project;
* Builder;
* landmark;
* and recent search.

## 50.2 Search safety

Normalize input safely.

Do not directly concatenate raw search input into SQL.

## 50.3 Search pagination

Use cursor or page-based pagination with deterministic ordering.

---

# 51. TRANSLITERATION AND TYPO-TOLERANT SEARCH

Search must integrate canonical Location aliases.

Examples that must remain supported include:

* `amdavad` → Ahmedabad;
* `ahemdabad` → Ahmedabad;
* `baroda` → Vadodara;
* `vadodra` → Vadodara;
* `surrat` → Surat;
* `rajkott` → Rajkot;
* and Locality aliases such as `Satelite` → Satellite within correct City context.

Ranking should prefer:

1. exact canonical match;
2. exact alias;
3. exact localized name;
4. strong prefix;
5. safe transliteration match;
6. bounded typo match.

Do not over-correct unrelated terms.

Candidate expansion must be bounded.

---

# 52. LEAD SYSTEM

Use one canonical Lead system across Owner, Broker and Builder.

A Lead must support:

* public display ID;
* source;
* target entity;
* target Property/Project;
* Requirement relation where applicable;
* Proposal relation;
* requester;
* recipient;
* business scope;
* assigned team member;
* stage;
* interest/configuration;
* original message;
* contact snapshot protected by privacy;
* reveal state;
* next follow-up;
* last activity;
* created date;
* and closure outcome.

## 52.1 Lead sources

Possible sources include:

* Property enquiry;
* Project enquiry;
* Contact Reveal;
* Proposal;
* Site Visit;
* direct dashboard entry where approved;
* Ad Campaign;
* and other tracked approved sources.

Do not fabricate source attribution.

---

# 53. LEAD STAGES

Use a canonical stage registry.

Possible stages may include:

* New;
* Contacted;
* Qualified;
* Visit Scheduled;
* Negotiation;
* Won/Closed;
* Lost;
* Archived.

The final labels must follow approved design.

Stage changes must:

* validate current state;
* create timeline event;
* store actor;
* store timestamp;
* require reason where applicable;
* and be transaction-safe.

Closing or losing a Lead must require the approved structured reason.

---

# 54. LEAD TIMELINE

The canonical Lead timeline must record relevant touchpoints:

* Lead created;
* contact revealed;
* stage changed;
* assigned/reassigned;
* note created;
* reminder scheduled;
* Proposal sent/viewed/accepted/rejected;
* Message sent;
* Site Visit requested/accepted/rescheduled/rejected/completed;
* feedback;
* duplicate merged;
* closed/lost;
* and other important events.

Do not construct a fake timeline from the current Lead row.

---

# 55. LEAD NOTES

Lead Notes must support:

* author;
* text;
* created date;
* edited date;
* pin state;
* visibility scope where approved;
* and soft deletion/audit.

Users may edit only Notes permitted by policy.

Pinning must persist.

Notes lists must paginate when large.

---

# 56. FOLLOW-UP REMINDERS

A reminder must support:

* Lead;
* creator;
* assigned user;
* due date/time;
* timezone;
* reminder type;
* note;
* status;
* completed date;
* cancelled date;
* and delivery attempts.

Server must reject invalid past dates according to policy.

The internal reminder record must be saved even when an external notification provider is unavailable.

---

# 57. DUPLICATE LEAD DETECTION

Duplicate detection may use approved signals such as:

* same normalized contact;
* same target entity;
* same business;
* same active period;
* same requester;
* or equivalent safe criteria.

The system must support:

* possible duplicate;
* comparison;
* dismiss;
* merge;
* and Admin review where required.

## 57.1 Lead merge

Merge must be transaction-safe.

It may need to reconcile:

* Lead fields;
* timeline;
* Notes;
* reminders;
* Messages;
* Site Visits;
* Proposals;
* assignee;
* and status.

The losing record must remain traceable through Audit and redirect/reference.

---

# 58. CONTACT REVEAL

A full contact number must not be sent before authorized Reveal.

The Reveal flow must:

1. authenticate;
2. validate target;
3. prevent self-reveal;
4. validate participant/role eligibility;
5. validate contact visibility;
6. validate consent;
7. validate Plan/quota;
8. check existing Reveal;
9. atomically reserve/increment usage where applicable;
10. create immutable Reveal event;
11. return full contact only after success;
12. create Lead/timeline/Notification where required.

## 58.1 Reveal quota

Quota must use trusted usage counters.

Monthly or Plan-based quotas must be atomically enforced.

A retry of the same successful Reveal must not consume quota again incorrectly.

## 58.2 Contact actions

After Reveal, support explicit:

* Call;
* Copy;
* WhatsApp.

Do not automatically copy.

Do not include a full `tel:` or WhatsApp URL in initial HTML.

## 58.3 Native WhatsApp

A user-click WhatsApp intent may use approved `wa.me` fallback independently from Notification-provider delivery.

Do not confuse:

* user-initiated native intent;
* and provider-sent WhatsApp Notification.

---

# 59. ENQUIRY CREATION

Public enquiry must:

* preserve target;
* preserve source;
* validate self-action;
* capture approved interest;
* use verified account contact or approved alternate contact;
* create one canonical Lead;
* prevent duplicate double-submit;
* return existing active enquiry state when applicable;
* and notify the recipient.

Do not create endless duplicate Leads from repeated clicks.

---

# 60. PROPOSAL SYSTEM

A Proposal must support:

* sender;
* recipient/requester;
* Requirement;
* proposed Property or Project;
* proposed Unit/configuration where applicable;
* message;
* terms;
* status;
* sent date;
* viewed date;
* accepted date;
* rejected date;
* withdrawn date;
* expiry;
* and associated Thread.

## 60.1 Proposal states

* Draft where approved;
* Sent;
* Viewed;
* Accepted;
* Rejected;
* Withdrawn;
* Expired.

Use real timestamps.

Do not infer status times from `updated_at`.

## 60.2 Proposal duplicate prevention

Prevent duplicate active Proposal for the same approved combination of:

* sender;
* Requirement;
* proposed Listing;
* or other final uniqueness rule.

## 60.3 Proposal conversation

Proposal conversation must use the canonical Message system.

Do not create a separate static conversation model.

---

# 61. MESSAGE THREADS

Use one canonical Thread model.

A Thread must support:

* Thread type;
* participants;
* related Lead;
* related Proposal;
* related Property/Project;
* last Message;
* last activity;
* created date;
* and status.

Thread creation must be idempotent for the approved participant/context combination.

---

# 62. THREAD PARTICIPANTS

Participant-specific fields may include:

* participant Profile;
* joined date;
* last read Message;
* last read date;
* archive state;
* muted state where approved;
* and removed/blocked state.

Archive must be per participant.

One participant archiving must not hide the Thread for everyone.

---

# 63. MESSAGES

A Message must support:

* Thread;
* sender;
* body;
* Message type;
* created date;
* edited date where allowed;
* delivery state;
* failure state;
* reply relation where approved;
* and attachments.

Messages must be visible only to authorized participants and Staff with explicit sensitive permission.

## 63.1 Message pagination

Use cursor pagination ordered by stable date and ID.

Do not load every Message in a long Thread.

## 63.2 Read state

Read state must be real.

Do not display fake read receipts.

## 63.3 Typing state

Typing indicator may be shown only when a real presence/typing mechanism exists.

Typing state must expire.

Do not show a permanent fake typing animation.

## 63.4 Attachments

Message attachments must:

* use private storage;
* validate file type/size;
* require participant access;
* and avoid permanent public URL.

---

# 64. MESSAGE REPORTING

Reporting a Thread must create a canonical Report with a safe context snapshot.

Do not copy unlimited private Message history into a broad public or ordinary Audit payload.

Staff access to reported Message content must require the correct permission.

Duplicate Report attempts must be controlled.

---

# 65. SITE VISIT SYSTEM

A Site Visit must support:

* public display ID;
* requester;
* host;
* target Property/Project;
* related Lead;
* proposed date/time;
* confirmed date/time;
* timezone;
* message;
* status;
* rejection reason;
* reschedule history;
* address visibility;
* reminder state;
* feedback;
* dispute;
* and Audit/timeline.

## 65.1 Site Visit states

* Requested;
* Accepted;
* Reschedule Proposed;
* Rescheduled;
* Rejected;
* Cancelled;
* Scheduled;
* Completed;
* No Show where approved;
* Disputed;
* Resolved.

## 65.2 Duplicate prevention

Prevent duplicate pending Visit Requests for the same participants and target in the same relevant period.

## 65.3 Reject reason

Rejection must require a reason.

## 65.4 Reschedule

Reschedule must preserve history and require the other participant’s response where applicable.

## 65.5 Directions

Directions may use the approved Map/native intent behavior.

Private address must be revealed only according to Visit state and policy.

---

# 66. SITE VISIT REMINDERS

Scheduled Visit reminders must be created through a durable job.

A reminder should include:

* Visit;
* intended recipient;
* due time;
* channel choices;
* internal Notification;
* delivery attempts;
* and final state.

Provider missing must result in honest skipped/failed external delivery while preserving internal Notification.

---

# 67. SITE VISIT FEEDBACK AND DISPUTE

After completion, participants may provide structured feedback.

Possible outcomes include:

* Interested;
* Not Interested;
* Follow-Up Required;
* Completed Successfully;
* No Show;
* or other approved outcomes.

Conflicting high-impact outcomes may create a Dispute.

When Disputed:

* relevant actions must be frozen;
* evidence and timeline must be preserved;
* participants must see the dispute state;
* Support/Admin review must receive Visit context;
* and only authorized resolution may unlock or close the workflow.

---

# 68. DASHBOARD DATA RULE

Dashboard metrics must use authoritative aggregate queries.

Do not download Lists to calculate totals.

Metrics must use consistent definitions.

Examples:

* Active Properties;
* Pending Properties;
* New Leads;
* Upcoming Visits;
* unread Messages;
* active Projects;
* available Units;
* sent Proposals;
* campaign states;
* Subscription usage;
* and verification status.

If a metric query fails, do not display zero.

Show an honest error or partial-data state.

---

# 69. OWNER DASHBOARD FUNCTIONALITY

Owner dashboard functionality must include:

* Overview;
* My Properties;
* My Requirements;
* Leads;
* quick Lead Detail;
* Messages;
* Site Visits;
* Saved Properties;
* Saved Searches;
* Recently Viewed;
* analytics;
* Subscription;
* Invoices;
* Invoice Detail;
* Pricing/Upgrade;
* verification;
* Profile Edit;
* Notifications;
* Support;
* Settings;
* Role Change;
* Data Export;
* and Account Deletion.

Every module must use real canonical records.

---

# 70. BROKER DASHBOARD FUNCTIONALITY

Broker dashboard functionality must include:

* Broker Overview;
* My Properties;
* Property Wizard entry;
* Draft Resume;
* My Requirements;
* Requirement Feed;
* Sent Proposals;
* Proposal Detail;
* Send Proposal;
* CRM List;
* CRM Kanban;
* quick Lead Detail;
* Messages;
* Site Visits;
* Saved content;
* analytics;
* Billing;
* Invoices;
* verification;
* Broker Profile;
* Notifications;
* Support;
* Settings;
* and team/business scope where approved.

## 70.1 CRM Kanban

Kanban movement must update the canonical Lead stage.

It must:

* validate transition;
* reject stale movement;
* create timeline;
* and work through accessible non-drag fallback on touch/mobile.

---

# 71. BUILDER DASHBOARD FUNCTIONALITY

Builder dashboard functionality must include:

* Builder Overview;
* Projects;
* Project Wizard entry;
* Project revision/reapproval;
* Unit Inventory;
* Unit Edit;
* Leads;
* Lead Detail;
* Requirement Feed;
* Proposals;
* Messages;
* Site Visits;
* team;
* invitation;
* Agent permissions;
* Ad Campaigns;
* Ad creation;
* Ad Detail;
* Ad Analytics;
* Project Analytics;
* Billing;
* Ad Wallet;
* Invoices;
* RERA/verification;
* Company Microsite;
* construction progress;
* Notifications;
* Support;
* and Settings.

---

# 72. TEAM AND AGENT MANAGEMENT

A team membership must support:

* business/team;
* invited contact;
* Profile;
* role/preset;
* status;
* seat usage;
* Project scope;
* Lead scope;
* Visit scope;
* permissions;
* invited by;
* accepted date;
* suspended date;
* and revoked date.

## 72.1 Invitation

Invitation must:

* validate seat availability;
* prevent duplicate active membership;
* create internal invitation record;
* use a high-entropy token;
* expire;
* and honestly report Email delivery status.

Provider missing must not prevent creation of the internal invitation when product policy allows manual sharing.

## 72.2 Permission enforcement

Changing Agent permissions must affect backend access.

Do not implement permissions only as UI checkboxes.

---

# 73. ASSIGNMENT SYSTEM

Leads, Site Visits and relevant Projects may be assigned to authorized team members.

Assignment must validate:

* active membership;
* module permission;
* Project/business scope;
* seat status;
* and current record scope.

Reassignment must create timeline/Audit.

Removing a team member must safely reassign or unassign active work according to policy.

---

# 74. ANALYTICS FOUNDATION

Analytics surfaces may use two categories:

## 74.1 Database-derived analytics

Examples:

* Lead counts;
* Proposal counts;
* Visit counts;
* stage conversions;
* available Units;
* Invoice totals;
* Payment totals;
* Project counts.

These should be calculated from canonical database data.

## 74.2 Behavioral analytics

Examples:

* Listing views;
* source attribution;
* impressions;
* Ad clicks;
* engagement;
* ranking;
* and funnel events.

These require a configured analytics/tracking foundation and consent.

Do not invent behavioral metrics when the provider or event pipeline is absent.

---

# 75. ANALYTICS STATES

Analytics screens must distinguish:

* real populated data;
* insufficient data;
* provider Setup Required;
* consent unavailable;
* query failure;
* and no eligible records.

`0` must be used only when the verified count is actually zero.

---

# 76. ANALYTICS PRIVACY

Users may view analytics only for entities they own or are authorized to manage.

Staff access requires explicit permission.

Analytics queries must not expose another business’s raw customer data.

---

# 77. NOTIFICATION SYSTEM

Use one canonical Notification system.

A Notification must support:

* recipient;
* event key;
* title;
* body;
* entity type;
* entity ID;
* typed deep link;
* read state;
* created date;
* expiry;
* priority;
* and delivery records.

## 77.1 Deep links

Notifications must open the correct context.

Examples:

* Message Notification → Thread;
* Lead Notification → Lead;
* Site Visit Notification → Visit;
* Proposal Notification → Proposal;
* Invoice Notification → Invoice;
* Support reply → Ticket;
* moderation result → entity/dashboard state;
* verification result → verification;
* Ad result → Campaign;
* Role Change result → request state.

Do not point every Notification to dashboard home.

## 77.2 Mark read

Mark-one and Mark-all must be real and idempotent.

---

# 78. NOTIFICATION DELIVERY

External channel delivery must be stored separately from the Notification record.

Delivery states may include:

* queued;
* processing;
* sent;
* delivered where provider supports it;
* failed;
* skipped_provider_missing;
* skipped_preference;
* rate_limited;
* dead_lettered.

Do not mark an Email or WhatsApp as sent merely because an internal Notification exists.

---

# 79. NOTIFICATION PREFERENCES

Preferences may support:

* in-app;
* Email;
* SMS;
* WhatsApp;
* Push;
* event category;
* and mandatory operational exceptions.

Global Admin defaults apply only as defaults.

Changing defaults must not silently overwrite every existing user’s choices.

Mandatory security or transactional Notifications may remain enabled according to policy.

---

# 80. NOTIFICATION TEMPLATES

Templates must support:

* stable event key;
* channel;
* language;
* subject;
* body;
* controlled tokens;
* Draft;
* published/live version;
* version history;
* preview;
* and validation.

Do not allow arbitrary unsafe template code.

Missing Gujarati translation must show the approved fallback/pending state.

---

# 81. SUBSCRIPTION MODEL

A Subscription must support:

* account;
* role/product;
* Plan version;
* source;
* status;
* start date;
* current period start;
* current period end;
* renewal state;
* cancel-at-period-end;
* cancellation date;
* trial relation;
* manual grant relation;
* provider subscription ID where applicable;
* entitlement snapshot;
* and history.

## 81.1 Subscription sources

Examples:

* free/default;
* trial;
* paid;
* admin_grant;
* migration;
* promotion.

Manual grant must not create a fake Payment.

---

# 82. SUBSCRIPTION STATES

Applicable states:

* free;
* trialing;
* active;
* past_due where supported;
* cancelled;
* expiring;
* expired;
* revoked;
* manually activated;
* and pending activation.

State must derive from trusted server records.

---

# 83. PLANS AND ENTITLEMENTS

A Plan must support:

* stable Plan ID;
* role applicability;
* public name;
* internal version;
* price;
* currency;
* billing cycle;
* tax behavior;
* active state;
* public visibility;
* display order;
* feature list;
* Listing limits;
* Project limits;
* Requirement limits;
* Contact Reveal limits;
* Featured slots;
* Ad credits;
* team seats;
* analytics access;
* media limits where approved;
* and other entitlements.

Historical Subscriptions must retain their Plan version or entitlement snapshot.

Editing a Plan must not retroactively corrupt old Invoices or entitlements without an explicit migration.

---

# 84. USAGE COUNTERS

Usage must be authoritative and concurrency-safe.

Examples:

* published Listings;
* active Projects;
* Contact Reveals;
* Featured slots;
* Proposals;
* team seats;
* Ad credits;
* storage where used;
* and other Plan limits.

Use:

* database aggregates;
* transactional counters;
* or validated usage ledgers.

Do not trust a Client-side meter.

---

# 85. PUBLIC PRICING

Public Pricing must read active public Plans from the canonical Plan system.

It must support:

* role selection;
* cycle;
* current Plan;
* comparison;
* selected Plan;
* auth return;
* and Checkout.

Do not hard-code final Plan prices separately from Admin Plan management.

---

# 86. CHECKOUT SESSION

Checkout must create a trusted server-side session.

A Checkout session should capture:

* authenticated account;
* selected Plan version;
* billing cycle;
* add-ons;
* Coupon;
* proration;
* subtotal;
* discount;
* taxable amount;
* tax;
* total;
* currency;
* billing details;
* provider;
* expiry;
* status;
* and idempotency key.

The Client may request a Plan, but the server must calculate the final amount.

---

# 87. GST AND BILLING DETAILS

Billing details must support applicable:

* B2C/B2B;
* legal/business name;
* GSTIN;
* billing address;
* State;
* PIN code;
* place of supply;
* and validation state.

Tax calculation must distinguish applicable:

* CGST/SGST;
* or IGST

according to approved tax rules.

Invoice tax data must be snapshotted.

Changing billing details affects future Invoices, not historical Invoices.

---

# 88. PAYMENT MODEL

A Payment must support:

* account;
* Checkout session;
* provider;
* provider order ID;
* provider Payment ID;
* amount;
* currency;
* mode;
* status;
* authorization state;
* capture state;
* failure code;
* safe failure message;
* created date;
* verified date;
* and related Subscription/Invoice.

Never store raw payment credentials.

---

# 89. PAYMENT STATES

Applicable states:

* created;
* pending;
* authorized;
* captured;
* verified;
* failed;
* cancelled;
* refunded;
* partially_refunded;
* disputed where supported;
* and reconciliation_required.

Do not treat authorization as capture when capture is required.

---

# 90. PAYMENT PROVIDER VERIFICATION

Financial success must be based on trusted provider verification.

Verify applicable:

* signature;
* event authenticity;
* provider order;
* provider Payment;
* amount;
* currency;
* capture;
* account;
* Plan;
* idempotency;
* and event replay.

A success query parameter or Client callback is not sufficient.

---

# 91. PAYMENT PROCESSING FLOW

Trusted flow:

1. validate Checkout;
2. create provider order;
3. open provider interface;
4. receive Client callback;
5. show Processing;
6. receive or fetch trusted provider state;
7. verify signature and amount;
8. create/update Payment;
9. activate Subscription;
10. create Invoice;
11. apply Coupon redemption;
12. apply entitlements;
13. create Notification;
14. create Audit;
15. show verified Success.

Multi-write completion must be transactional or durably recoverable.

---

# 92. WEBHOOK EVENTS

Store provider webhook events with:

* provider;
* provider event ID;
* event type;
* received date;
* signature verification state;
* processing state;
* attempt count;
* safe summary;
* last error;
* processed date;
* and related entity.

Raw webhook payload storage, if retained, must be encrypted/restricted and redacted from ordinary UI.

Provider event ID must be unique.

Webhook processing must be idempotent.

---

# 93. DUPLICATE AND PENDING PAYMENT

Before creating another order, detect relevant existing pending Payment/Checkout.

The UI may offer:

* Check Status;
* Resume;
* wait;
* or create new only when safe.

Do not create multiple charge attempts accidentally from double click.

---

# 94. INVOICE MODEL

An Invoice must be an immutable financial snapshot.

It must support:

* sequential Invoice number;
* account;
* billing identity snapshot;
* seller/platform snapshot;
* issue date;
* supply date where applicable;
* currency;
* line items;
* quantity;
* unit amount;
* discount;
* proration period;
* add-ons;
* tax;
* total;
* Payment reference;
* status;
* PDF state;
* and version/correction relation.

Do not regenerate old Invoice amounts from current Plan data.

---

# 95. INVOICE CORRECTION

Historical Invoice data must not be silently edited.

Corrections must use:

* versioned correction;
* Credit Note;
* replacement Invoice;
* or another legally approved workflow.

Store:

* original version;
* corrected version;
* reason;
* actor;
* approval where required;
* and Audit.

---

# 96. INVOICE PDF

Invoice PDF must be generated from the immutable snapshot.

It must:

* match displayed data;
* remain private to the account and authorized Staff;
* use safe download;
* and handle generation failure honestly.

Do not provide a broken or fake PDF button.

---

# 97. REFUND REQUEST

A Refund Request must support:

* requester;
* Payment;
* Invoice;
* requested amount;
* full/partial type;
* reason;
* details;
* eligibility result;
* status;
* reviewer;
* decision reason;
* and timestamps.

Server must calculate the refundable amount.

The Client must not choose an amount above the remaining refundable balance.

---

# 98. REFUND PROCESSING

Refund approval flow:

1. validate Staff permission;
2. validate current request;
3. validate Payment;
4. calculate prior refunds;
5. validate remaining amount;
6. require decision reason;
7. initiate provider Refund;
8. persist provider Refund;
9. update Payment state;
10. create Credit Note/tax reversal where required;
11. update request;
12. notify user;
13. create Audit.

Retry must not create duplicate provider Refunds.

---

# 99. CREDIT NOTES

Credit Notes must support:

* sequential number;
* Invoice;
* Refund;
* amount;
* tax reversal;
* reason;
* issue date;
* status;
* PDF;
* and immutable history.

Do not create duplicate Credit Notes for the same finalized Refund effect.

---

# 100. COUPONS

A Coupon must support:

* code;
* discount type;
* discount value;
* currency for flat discount;
* applicable Plans;
* role eligibility;
* valid from;
* valid to;
* total usage limit;
* per-user limit;
* active state;
* and usage count.

## 100.1 Coupon redemption

Redemption must be concurrency-safe.

Validate:

* active state;
* date;
* applicable Plan;
* user eligibility;
* total usage;
* per-user usage;
* subtotal;
* maximum discount;
* and currency.

Reserve or record Coupon usage only through a trusted successful Checkout/Payment policy.

---

# 101. TRIAL CAMPAIGNS

A Trial Campaign must support:

* name;
* role;
* eligible Plans;
* duration;
* eligibility rules;
* start/end;
* active state;
* real active-user count;
* and created/updated actor.

Trial Grant must:

* validate eligibility;
* prevent duplicate overlapping grant;
* snapshot entitlement;
* create Subscription/trial relation;
* notify user;
* and create Audit.

Trial Revoke must require reason and apply the approved fallback Plan immediately or at the approved effective time.

---

# 102. MANUAL SUBSCRIPTION ACTIVATION

Manual activation must:

* require Billing permission;
* select user;
* select Plan;
* set duration/start/end;
* require reason;
* show bypass warning;
* create `admin_grant` Subscription source;
* create entitlements;
* notify user;
* and create Audit.

It must not create:

* fake Payment;
* paid Invoice;
* fake provider transaction.

---

# 103. BUILDER AD WALLET

If Ad Wallet is active, use a real ledger.

A wallet must support:

* account;
* currency/credit unit;
* balance;
* reserved balance;
* and status.

Ledger entries may include:

* recharge;
* campaign reservation;
* campaign spend;
* refund;
* adjustment;
* expiry;
* and Admin correction.

Wallet balance must derive from trusted ledger entries.

Do not directly edit balance without a corresponding immutable ledger event.

---

# 104. USER BILLING DASHBOARD

Owner, Broker and Builder Billing surfaces must use the same canonical systems.

They must support:

* current Plan;
* trial;
* status;
* cycle;
* renewal;
* usage;
* Upgrade;
* Plan change;
* Invoices;
* Refunds where available;
* GST details;
* and provider Setup Required state.

---

# 105. ADMIN SUBSCRIPTION MANAGEMENT

Admin Subscription management must support:

* search;
* role;
* Plan;
* status;
* source;
* start/end;
* renewal;
* usage;
* Plan history;
* manual extend;
* and Audit.

Manual Extend must:

* require permission;
* require duration/reason;
* validate current state;
* update entitlement period;
* notify user;
* and preserve history.

---

# 106. PAYMENT RECONCILIATION

Authorized Staff may trigger safe provider reconciliation.

Reconciliation must:

* use stored provider identifiers;
* fetch trusted provider state;
* redact secrets;
* compare amount/currency/state;
* update only through valid transitions;
* prevent duplicate activation;
* and create Audit.

Do not show raw provider JSON in the ordinary Payment Detail screen.

---

# 107. FINANCIAL EXPORT

Admin financial export must:

* respect filters;
* use server-authorized queries;
* be generated asynchronously for large datasets;
* remain private;
* expire;
* log Download;
* and exclude unauthorized sensitive fields.

Do not export only the currently visible first page while claiming full filtered export.

---

# 108. VERIFICATION SYSTEM

Use one canonical verification model for supported verification types:

* Owner identity;
* Broker identity/business;
* Builder company;
* RERA;
* GST;
* or other approved verification.

A request must support:

* applicant;
* verification type;
* private documents;
* state;
* submitted date;
* reviewer;
* decision;
* rejection/Needs Changes reason;
* current approved version;
* and timeline.

---

# 109. VERIFICATION STATES

Applicable states:

* not_submitted;
* Draft;
* submitted;
* under_review;
* needs_changes;
* rejected;
* approved;
* expired;
* and resubmitted.

Uploading a document must not automatically produce Verified status.

Public verification changes only after authorized approval.

---

# 110. VERIFICATION RESUBMISSION

Resubmission must:

* preserve previous document/history;
* create a new version;
* reference the rejection/Needs Changes reason;
* update queue state;
* and notify reviewers.

Do not overwrite the evidence used for a prior decision.

---

# 111. MODERATION SYSTEM

Use one canonical moderation framework for:

* Property;
* Project;
* Requirement;
* Profile Claim;
* Missing Location;
* duplicate Listing;
* Ads;
* and other approved review types.

A moderation record must support:

* entity type;
* entity ID;
* revision ID;
* submitted by;
* submitted date;
* queue state;
* assigned reviewer;
* checklist;
* decision;
* structured reason;
* free-text reason;
* reviewed date;
* and Audit.

---

# 112. MODERATION STATES

Applicable states:

* queued;
* assigned;
* under_review;
* approved;
* needs_changes;
* rejected;
* cancelled;
* expired;
* and superseded.

A stale reviewer must not approve an old revision after a newer revision is submitted.

Use revision/version validation.

---

# 113. PROPERTY MODERATION

Property Review must verify applicable:

* ownership;
* Property data;
* Location;
* price;
* media;
* prohibited content;
* contact rules;
* duplicate risk;
* verification claims;
* and publication eligibility.

Approval publishes the approved revision only.

---

# 114. PROJECT MODERATION

Project Review must verify:

* Builder;
* RERA;
* Project data;
* Unit structure;
* media;
* Floor Plans;
* brochure;
* Location;
* dates;
* and publication gate.

Admin RERA exception requires special permission and reason.

---

# 115. REQUIREMENT MODERATION

Requirement Review must verify:

* legitimate intent;
* privacy;
* contact preference;
* budget;
* Location;
* spam;
* duplicate behavior;
* and restricted visibility.

Requester contact must not become broadly public.

---

# 116. DUPLICATE LISTING REVIEW

Duplicate review must support:

* source records;
* matching signals;
* owners;
* media;
* status;
* keep;
* merge/archive;
* dismiss;
* impact;
* and Audit.

Do not merge records without preserving references and history.

---

# 117. USER MANAGEMENT

Admin User Management must support:

* search;
* role filter;
* status filter;
* verification filter;
* date filters;
* pagination;
* masked contact;
* safe User Detail;
* entity summary;
* Subscription summary;
* activity;
* suspend;
* ban;
* restore;
* and Role Change review.

Do not use unrestricted `select *`.

Sensitive contact visibility must depend on permission.

---

# 118. SUSPEND, BAN AND RESTORE

Enforcement action must support:

* action type;
* duration;
* reason;
* start;
* expiry;
* actor;
* impact;
* Notification;
* and Audit.

Expiry restoration may run through a scheduled job.

Concurrent Admin decisions must be revalidated.

---

# 119. ROLE CHANGE REQUEST

The approved initial flow includes Owner → Broker Role Change.

A Role Change Request must support:

* requester;
* current role;
* target role;
* reason;
* impact snapshot;
* Subscription implications;
* verification requirements;
* state;
* submitted date;
* decision;
* reviewer;
* decision reason;
* and withdrawal.

Only one active request per user is permitted.

Submitting a request does not immediately change role.

---

# 120. ROLE CHANGE APPROVAL

Approval must be transactional or durably recoverable.

It may need to coordinate:

* Profile role;
* role history;
* business Profile;
* verification requirement;
* Subscription migration;
* entitlement limits;
* dashboard routing;
* team capability;
* compatible Listings;
* incompatible Draft handling;
* Notification;
* and Audit.

A stale/concurrent second decision must fail.

Compatible Listings should remain safe according to final migration policy.

---

# 121. STAFF MANAGEMENT

Staff management must support:

* Staff list;
* invitation;
* permission preset;
* custom permissions;
* status;
* activity;
* last access;
* suspend/revoke;
* and Audit.

Invited Staff must not have permissions before accepting and activating the account according to policy.

Sensitive permission escalation may require maker-checker.

---

# 122. SUPPORT TICKET SYSTEM

Use one canonical Ticket system for:

* Guest Support;
* authenticated user Support;
* Owner dashboard;
* Broker dashboard;
* Builder dashboard;
* and Admin Support.

A Ticket must support:

* human-readable reference;
* requester user or Guest identity;
* Guest tracking token hash where offered;
* category;
* priority;
* subject;
* details;
* status;
* assigned Staff;
* related entity;
* related Visit/Billing context;
* created date;
* updated date;
* and resolution.

---

# 123. SUPPORT TICKET STATES

Applicable states:

* open;
* waiting_for_support;
* waiting_for_user;
* escalated;
* resolved;
* closed;
* and reopened where approved.

State changes must create history.

---

# 124. GUEST SUPPORT RATE LIMIT

Guest Support must enforce a server-side maximum of three requests per hour for the same approved rate-limit identity.

The fourth request within the period must be blocked and must not create a Ticket.

Do not expose the raw rate-limit key.

---

# 125. SUPPORT THREAD

Support Messages must support:

* Ticket;
* sender type;
* sender ID;
* body;
* attachments;
* created date;
* and visibility.

Authenticated users may view only their own Tickets.

Guest tracking, if provided, must use a high-entropy token whose stored value is hashed.

---

# 126. SUPPORT ADMIN

Authorized Staff must support:

* queue;
* search;
* status;
* category;
* priority;
* assignee;
* reply;
* macros;
* escalate;
* resolve;
* reopen;
* and contextual links.

Support macros insert content but must not fake a sent reply until submitted.

Provider missing must not prevent the real Support reply from appearing in the canonical Ticket Thread.

---

# 127. DATA EXPORT

A user Data Export must support:

* user;
* request date;
* identity re-verification;
* rate limit;
* status;
* job;
* archive;
* size;
* expiry;
* Download count;
* failure;
* and access logs.

## 127.1 Export flow

1. authenticate;
2. reverify identity through real OTP;
3. validate rate limit;
4. create Export job;
5. gather authorized user data;
6. generate archive asynchronously;
7. store privately;
8. notify user;
9. allow expiring signed Download;
10. log Download;
11. expire/delete archive according to retention.

Do not expose another user’s archive.

---

# 128. ACCOUNT DELETION

Account Deletion must support:

* typed `DELETE` confirmation;
* OTP re-verification;
* request date;
* 30-day grace period;
* scheduled deletion date;
* cancel action;
* processing state;
* completion;
* and retention explanation.

## 128.1 Deletion orchestration

Deletion must safely handle:

* Auth account;
* public Profile;
* Properties;
* Projects;
* Requirements;
* media;
* Saved content;
* Notifications;
* team membership;
* Subscription;
* personal contact data;
* Support;
* Messages;
* Leads;
* Payments;
* Invoices;
* Refunds;
* Audit;
* fraud/security records;
* and legal retention.

Do not simply cascade-delete all records.

Financial, Audit, security and communication integrity may require retention or anonymization.

---

# 129. AD CAMPAIGN SYSTEM

A Builder Ad Campaign must support:

* Builder;
* Project;
* campaign name;
* creative variants;
* desktop creative;
* tablet creative;
* mobile creative;
* targeting;
* Cities;
* Localities;
* audience;
* schedule;
* budget/price;
* wallet/payment;
* moderation;
* state;
* performance;
* and expiry.

---

# 130. AD CAMPAIGN STATES

Applicable states:

* Draft;
* payment_pending;
* submitted;
* pending_review;
* approved;
* scheduled;
* active;
* paused;
* rejected;
* expired;
* cancelled;
* and fraud_review.

Invalid transitions must fail.

---

# 131. AD TARGETING

Ad targeting must use canonical Locations.

City-priority behavior must support approved logic such as:

1. user selected/current City;
2. matching local campaign;
3. approved fallback/nearby City;
4. hide placement when no eligible campaign.

Targeting must not use an unverified free-text City as canonical authority.

---

# 132. AD CREATIVE VALIDATION

Validate:

* MIME;
* dimensions;
* aspect ratio;
* file size;
* target ownership;
* prohibited content;
* Project relation;
* and variant completeness.

Ads must not become active before:

* required Payment/wallet state;
* required moderation;
* schedule;
* and target eligibility.

---

# 133. AD MODERATION

Admin Review must include:

* all creative variants;
* Project;
* RERA context;
* targeting;
* schedule;
* Payment;
* and policy checklist.

Reject requires structured and free-text reason as required.

Builder must receive the decision through canonical Notification.

---

# 134. AD PERFORMANCE

Ad metrics may include:

* impressions;
* clicks;
* CTR;
* Leads;
* spend;
* and conversion.

Use real tracking only.

When analytics is not configured:

* show `—`;
* insufficient data;
* or Setup Required.

Do not generate random metrics.

---

# 135. AD FRAUD REVIEW

Fraud review may use safe signals such as:

* repeated clicks;
* abnormal velocity;
* suspicious patterns;
* invalid traffic;
* and billing-exclusion candidates.

Admin UI must show safe summaries.

Do not expose unnecessary raw device identifiers.

Fraud decisions require reason and Audit.

---

# 136. PROVIDER CONFIGURATION

Provider configuration must support approved categories such as:

* OTP/SMS;
* Email;
* WhatsApp;
* Maps;
* Payment;
* storage/CDN;
* analytics;
* Push;
* error monitoring;
* Cron/jobs;
* and other integrated services.

Each provider must have:

* key;
* mode;
* enabled state;
* safe configuration indicators;
* secret reference;
* last test;
* last success;
* last error;
* health;
* and updated actor.

---

# 137. PROVIDER STATUS

Final status must distinguish:

* Setup Required;
* Configured/Untested;
* Active;
* Error;
* Disabled;
* Test Mode;
* Degraded;
* and Pending Verification.

Environment-variable presence alone is not Active.

---

# 138. PROVIDER SECRETS

Secrets are write-only.

After saving:

* do not return the secret;
* do not prefill the real secret;
* do not show it to Super Admin;
* do not include it in Audit;
* do not include it in error responses.

Show only safe indicators such as:

* configured;
* masked prefix/suffix;
* last rotation;
* and last test.

Secret rotation must create Audit without secret value.

---

# 139. PROVIDER TEST

Test Connection must:

* require permission;
* run server-side;
* rate-limit;
* use a safe non-destructive provider-specific test;
* record result;
* record timestamp;
* update status appropriately;
* redact provider response;
* and create Audit.

Do not simulate success.

---

# 140. PROVIDER FALLBACK MATRIX

## 140.1 Maps unavailable

* show textual address;
* use approved list/native intent fallback;
* do not show broken iframe;
* do not block valid text Location.

## 140.2 Email unavailable

* create internal Notification/workflow;
* mark Email skipped/failed honestly;
* use queue/DLQ according to policy;
* do not show Sent.

## 140.3 WhatsApp provider unavailable

* external provider delivery skipped/logged;
* approved user-click native intent may remain available.

## 140.4 SMS/OTP unavailable

* do not claim OTP sent;
* do not fake verification;
* show Setup Required/unavailable state.

## 140.5 Storage unavailable

* show upload Setup Required;
* do not fake upload completion.

## 140.6 Payment unavailable

* do not activate paid Subscription;
* show Checkout unavailable/Test Mode honestly.

## 140.7 Analytics unavailable

* show Setup Required, `—` or insufficient data;
* do not invent metrics.

## 140.8 Push unavailable

* preserve internal Notification;
* mark external delivery skipped.

---

# 141. FEATURE FLAGS

A Feature Flag must support:

* stable key;
* description;
* current state;
* rollout type;
* audience;
* percentage;
* roles;
* internal-only scope;
* start/end;
* updated actor;
* and history.

Rollout assignment must be deterministic.

Do not assign a different percentage outcome on every request.

---

# 142. FEATURE FLAG CHANGE

High-impact Flag changes must use:

* current/new state;
* impact;
* audience;
* confirmation;
* mandatory Audit note;
* stale-state check;
* and Audit.

A disabled UI module does not automatically remove server authorization checks.

---

# 143. MAINTENANCE MODE

Maintenance Mode must be a real platform state.

It must support:

* active;
* scheduled;
* message;
* start;
* end;
* duration;
* expected back;
* Admin exception;
* public maintenance page;
* and Audit.

It must apply consistently to approved:

* Homepage;
* Search;
* Detail;
* Auth;
* Owner dashboard;
* Broker dashboard;
* Builder dashboard.

Critical webhook/background processing must follow the approved maintenance safety policy.

---

# 144. SYSTEM HEALTH

System Health must use real signals.

Possible components:

* application availability;
* database;
* Auth;
* storage;
* provider health;
* background queue;
* DLQ;
* webhook processing;
* backup freshness;
* and error monitoring.

When a signal source is absent, show Setup Required or unavailable.

Do not display fake uptime or fake green health.

---

# 145. BACKGROUND JOBS

Use durable background jobs for appropriate asynchronous workflows:

* media processing;
* orphan cleanup;
* Notification delivery;
* reminder scheduling;
* Payment reconciliation;
* Invoice generation;
* Refund processing;
* Sitemap generation;
* analytics aggregation;
* Saved Search matching;
* Data Export;
* Account Deletion;
* Ad activation/expiry;
* Subscription expiry;
* Trial expiry;
* temporary suspension expiry;
* cache invalidation;
* and other long-running work.

A job must support:

* type;
* payload reference;
* priority;
* scheduled date;
* status;
* attempt count;
* maximum attempts;
* idempotency key;
* last error;
* locked worker;
* started/completed date;
* and result.

---

# 146. DEAD-LETTER QUEUE

Jobs that exceed retry policy may enter DLQ.

DLQ must support:

* job type;
* safe error;
* attempts;
* created date;
* risk level;
* Retry;
* Dismiss where permitted;
* and Audit.

Critical financial jobs must not be casually dismissed.

Examples:

* Payment reconciliation;
* Invoice generation;
* Refund processing.

Risk-aware governance is required.

---

# 147. CMS DOCUMENT SYSTEM

Use one coherent content framework for:

* CMS Pages;
* Blog Posts;
* and Legal Documents.

A content document must support:

* type;
* slug;
* title;
* status;
* current Draft revision;
* current published revision;
* author;
* updater;
* created date;
* updated date;
* and SEO relation.

---

# 148. CMS REVISIONS

A revision must support:

* document;
* version;
* structured content/blocks;
* summary;
* created by;
* created date;
* autosave state;
* approval state;
* published state;
* and superseded state.

Public routes must use published revision only.

Draft content must not leak through guessed URL, metadata, Sitemap or related content.

---

# 149. CMS EDITOR

The editor must support:

* shared toolbar;
* structured blocks;
* text;
* headings;
* links;
* images;
* lists;
* safe embeds where approved;
* autosave;
* Preview;
* SEO sidebar;
* Save Draft;
* Publish;
* and revision history.

Content must be sanitized before public rendering.

Draft media must remain private or protected.

---

# 150. BLOG SYSTEM

Blog Posts must support:

* title;
* slug;
* excerpt;
* body;
* featured image;
* category;
* author;
* publication date;
* status;
* SEO;
* related Posts;
* and revision history.

Only published Posts appear in:

* Blog Listing;
* public Post;
* related Posts;
* Sitemap;
* and public Search.

Pagination is required for growing Blog lists.

---

# 151. LEGAL CONTENT

Legal documents must support:

* policy type;
* version;
* effective date;
* Draft revision;
* review request;
* reviewer;
* sign-off;
* published revision;
* and history.

## 151.1 Exact-revision sign-off

Approval applies to one exact revision.

Example:

* Legal v6 Published;
* create v7 Draft;
* sign off v7;
* edit v7 into a new revision;
* previous approval must not authorize the changed revision.

Public Legal remains the previous published version until explicit Publish.

---

# 152. LEGAL POLICIES

The shared Legal Reader must support approved published content for:

* Terms and Conditions;
* Privacy Policy;
* Cookie Policy;
* Refund Policy;
* Cancellation Policy;
* Listing Policy;
* Advertising Policy;
* Verification Policy;
* Payment Policy;
* Disclaimer;
* Grievance Policy.

Do not hard-code disconnected public Legal content outside the canonical publishing system.

---

# 153. SEO METADATA

SEO metadata may support:

* entity/page;
* Meta Title;
* Meta Description;
* canonical URL;
* indexability;
* Open Graph;
* structured data;
* breadcrumb data;
* and updated date.

Public metadata must use public-safe fields.

Private and restricted routes must not leak private data through metadata.

---

# 154. PUBLIC ENTITY SEO

Eligible public:

* Property;
* Project;
* Broker Profile;
* Builder Profile;
* public Owner Profile;
* CMS Page;
* Blog Post;
* Legal Page;
* City/Locality landing page

must use correct canonical behavior.

Restricted Requirement pages must be Noindex and excluded from Sitemap.

---

# 155. CITY AND LOCALITY SEO PAGES

SEO landing pages must derive from:

* canonical Location;
* purpose;
* Property type;
* real eligible listings;
* and approved metadata templates.

Examples may include:

* Property in Rajkot;
* Property for sale in Rajkot;
* Flats in Rajkot;
* Rent Property in Rajkot;
* Property in a specific Locality.

Do not create duplicate thin pages with conflicting canonical URLs.

Nearby fallback, if used, must be labeled honestly.

---

# 156. REDIRECTS

A Redirect must support:

* source path;
* target path;
* status code;
* active state;
* created by;
* updated date;
* and safe hit count where real.

Validate:

* duplicate source;
* redirect chain;
* loop;
* unsafe external domain;
* and conflict with active route.

Redirect lookup must be indexed and efficient.

---

# 157. SITEMAP

Sitemap generation must include only eligible published indexable content.

Exclude:

* Draft;
* private;
* Admin;
* dashboard;
* Requirement Detail;
* Ticket;
* private Support;
* checkout;
* Payment;
* Comparison where Noindex;
* and other restricted routes.

For large URL volumes use:

* batching;
* Sitemap index;
* or static/streamed generation.

Store Sitemap run status, counts, errors and completion date.

---

# 158. TRANSLATION SYSTEM

Translations must support:

* key/entity;
* source language;
* target language;
* source version;
* translation;
* state;
* reviewer;
* updated date;
* and stale state.

Applicable states:

* missing;
* pending;
* completed;
* stale;
* and fallback active.

Do not show raw translation keys publicly.

---

# 159. LANGUAGE PREFERENCE

Supported final choices from the approved design include:

* English;
* Gujarati;
* Hindi Coming Soon/non-selectable until fully supported.

Store validated locale for authenticated users where synchronization is enabled.

Guest preference may use local persistence.

Update document language metadata.

Avoid severe first-render language flash.

---

# 160. CONTENT LANGUAGE VS UI LANGUAGE

UI translation and CMS body translation are different.

Gujarati UI must not automatically imply that every Blog or Legal document has an approved Gujarati translation.

When approved Legal translation is unavailable, use the approved English fallback.

Do not machine-translate Legal content on the fly and present it as authoritative.

---

# 161. THEME PREFERENCE

Canonical Theme values:

* `light`
* `dark`
* `system`

Theme changes must use semantic token swaps.

Do not redesign layout for dark mode.

System mode must follow OS changes.

Guest preference may persist locally.

Authenticated preference may synchronize to server according to deterministic precedence.

Do not invert Property photographs.

---

# 162. ACCESSIBILITY PREFERENCES

Accessibility preferences may include:

* text size;
* Reduce Motion;
* contrast mode;
* and other exact approved settings.

Preferences must change real UI behavior.

They must persist according to approved Guest/account behavior.

Reset Accessibility must not delete:

* cookie consent;
* Theme;
* language;
* or unrelated settings.

---

# 163. COOKIE AND ANALYTICS CONSENT

Use one canonical consent model shared by Batch 16 and Batch 17.

Consent must support:

* policy version;
* Essential;
* Analytics;
* Marketing;
* timestamp;
* source;
* user/session identity;
* and updated state.

Essential remains enabled.

## 163.1 Consent-before-load

Nonessential Analytics and Marketing providers must not initialize before applicable consent.

## 163.2 Withdrawal

Users must be able to withdraw consent.

Future tracking behavior must honor withdrawal.

## 163.3 Provider/consent matrix

### Provider missing + Consent on

Do not fake tracking.

Show provider Setup Required where relevant.

### Provider active + Consent off

Do not track.

### Provider active + Consent on

Tracking may initialize.

---

# 164. PUBLIC CONTENT

About, Contact, Help and Safety pages must use approved published content.

Do not display:

* fake statistics;
* fake phone;
* fake office;
* placeholder FAQs;
* or Draft content.

Provider-dependent contact channels must show honest state.

---

# 165. PUBLIC SUPPORT

Guest Support and authenticated My Tickets must use the same canonical Ticket system as Admin Support.

Public Support routes must not expose private Ticket content through Sitemap or metadata.

Guest Email acknowledgment must state actual provider outcome.

---

# 166. PWA FOUNDATION

PWA implementation must include:

* valid manifest;
* approved icons;
* Service Worker registration;
* versioned caches;
* update detection;
* safe offline fallback;
* and private-data protection.

---

# 167. PWA INSTALL PROMPT

Install prompt eligibility must require:

* platform support;
* not already installed;
* not standalone;
* at least two eligible sessions;
* no active 30-day `Not Now` snooze;
* and actual native install event availability where required.

Install must invoke the real platform flow.

Do not show a fake Install success.

---

# 168. OFFLINE STATE

Offline state must use real connectivity/Service Worker information.

The UI must:

* display the approved banner;
* show reconnect state;
* provide safe offline fallback;
* and prevent false server-write success.

Do not blindly queue:

* Payment;
* Refund;
* Contact Reveal;
* Subscription change;
* Account Deletion;
* or other high-risk mutations offline.

---

# 169. SERVICE WORKER PRIVATE DATA SAFETY

Do not broadly cache private dashboard HTML or API responses.

After logout, private cached data must not remain accessible.

Use:

* network-first or no-store for sensitive routes;
* cache partition/versioning;
* cache cleanup;
* and logout invalidation.

Auth and RLS remain authoritative.

---

# 170. PWA UPDATE

When a new Service Worker version is ready:

* show the approved update toast;
* allow Update;
* handle Later where designed;
* activate safely;
* and reload after user confirmation.

Do not reload while critical unsaved work exists without safe handling.

---

# 171. EMI CALCULATOR

The EMI Calculator must use real calculation.

Inputs:

* principal;
* annual interest rate;
* tenure;
* tenure unit.

For a standard reducing-balance loan:

`EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)`

where:

* `P` = principal;
* `r` = monthly interest rate;
* `n` = number of monthly installments.

Return:

* monthly EMI;
* total principal;
* total interest;
* total payment;
* and approved breakdown.

Validate:

* positive values;
* reasonable limits;
* zero-interest edge case;
* decimal precision;
* and reset.

Display a disclaimer that the result is an estimate.

---

# 172. GUJARAT STAMP DUTY CALCULATOR

Stamp Duty calculation must use versioned authoritative rate data.

Store:

* jurisdiction;
* property type;
* buyer category where applicable;
* rate components;
* registration fee;
* minimum/maximum;
* effective date;
* source/reference;
* active version;
* and disclaimer.

Do not permanently hard-code an unverified rate.

When current authoritative rates are not configured:

show Setup Required or rule-data unavailable.

---

# 173. LAND UNIT CONVERTER

Land-unit conversion must use a versioned conversion registry.

Support approved Gujarat-relevant units.

A conversion rule must include:

* source unit;
* target unit;
* factor;
* regional scope;
* effective version;
* precision;
* and disclaimer where local variation exists.

Do not treat a regionally variable unit as universally exact without warning.

---

# 174. AUDIT LOG

Audit must be append-only for sensitive governance actions.

An Audit event may contain:

* actor;
* actor role;
* action;
* target type;
* target ID;
* safe before state;
* safe after state;
* reason;
* result;
* request ID;
* timestamp;
* and safe device/network context where approved.

Do not store:

* provider secrets;
* raw identity documents;
* full private attachments;
* unnecessary full phone;
* raw payment credentials;
* or unrestricted webhook data.

---

# 175. AUDITED ACTIONS

Audit at minimum applicable:

* role changes;
* suspensions/bans;
* Staff permission changes;
* moderation decisions;
* verification decisions;
* Claim decisions;
* sensitive contact access;
* provider secret rotation;
* provider tests;
* Feature Flag changes;
* Maintenance Mode;
* Plan changes;
* manual Subscription activation;
* Refund decision;
* Invoice correction;
* Coupon/Trial changes;
* Ad decisions;
* legal sign-off/publication;
* Redirect changes;
* Location changes;
* report enforcement;
* exports;
* bulk actions;
* maker-checker;
* and deletion orchestration.

---

# 176. SECURITY EVENTS

Security events may include:

* repeated failed authentication;
* suspicious OTP attempts;
* permission denial patterns;
* unauthorized direct URL/API access;
* suspicious Contact Reveal;
* suspicious Payment/webhook;
* unsafe file;
* abnormal export request;
* Account takeover indicators;
* and rate-limit abuse.

A security event must support:

* type;
* severity;
* user;
* safe device/network context;
* detected date;
* status;
* assignee;
* resolution;
* and related Audit.

---

# 177. REPORTS AND FRAUD QUEUE

The Admin Reports/Fraud queue must combine canonical Report records with:

* severity;
* target;
* reporter-safe context;
* prior Reports;
* current moderation;
* assignment;
* and enforcement status.

Report resolution must preserve evidence and history.

---

# 178. CONTACT REVEAL LOGS

Sensitive Reveal logs must support:

* viewer;
* target;
* source;
* timestamp;
* quota;
* result;
* masked contact;
* and related Lead.

Full contact display requires explicit sensitive permission.

Access to Reveal logs may itself be audited.

---

# 179. BUSINESS METRICS

Business metrics must use authoritative aggregates.

Possible metrics:

* user growth;
* active Listings;
* Projects;
* Requirements;
* Lead creation;
* Proposal conversion;
* Site Visit conversion;
* Subscription revenue;
* Payment success;
* Refunds;
* Ads;
* Support volumes;
* and moderation turnaround.

Behavioral metrics require the actual analytics pipeline.

Do not merge database-derived and provider-derived metrics without clear definitions.

---

# 180. EXPORT MANAGEMENT

Admin Export jobs must support:

* type;
* filters;
* requester;
* permission snapshot;
* status;
* progress;
* created date;
* completion;
* file;
* expiry;
* Download logs;
* revoke;
* and failure.

Exports must remain private.

Large exports must be asynchronous and paginated/batched internally.

---

# 181. BULK ACTIONS

Bulk actions must use the following sequence:

1. Client selection;
2. server preview;
3. eligibility validation;
4. included records;
5. excluded records;
6. actual affected count;
7. impact explanation;
8. confirmation;
9. server revalidation;
10. execution;
11. result summary;
12. Audit.

Do not use only the Client selection count.

Stale records must be excluded or safely re-evaluated.

---

# 182. MAKER-CHECKER

High-risk actions may use maker-checker.

A request must support:

* maker;
* proposed action;
* target;
* payload reference;
* reason;
* created date;
* status;
* checker;
* decision;
* execution state;
* execution error;
* and Audit.

Rules:

* maker cannot approve their own action;
* checker must have required capability;
* approval does not equal successful execution;
* stale requests must fail;
* execution must be idempotent;
* and rejected/expired requests must not execute.

---

# 183. TRANSACTION REQUIREMENTS

Use database transactions or durable orchestration for multi-write workflows such as:

* Property/Project Submit and moderation;
* Lead stage + timeline;
* assignment + timeline;
* Contact Reveal + quota + event;
* Proposal + Thread;
* Site Visit response + timeline + Notification;
* Lead merge;
* Payment + Subscription + Invoice;
* Refund + Payment + Credit Note;
* Coupon redemption;
* Trial Grant/Revoke;
* Role Change approval;
* verification submission;
* Claim approval;
* Ad activation;
* Account Deletion;
* bulk action;
* and maker-checker execution.

Partial completion must be recoverable and visible.

---

# 184. IDEMPOTENCY REQUIREMENTS

High-impact actions must use an idempotency strategy.

Applicable actions include:

* Property Submit;
* Project Submit;
* Requirement Submit;
* enquiry;
* Proposal;
* Message Thread creation;
* Contact Reveal;
* Site Visit Request;
* Visit response;
* Lead stage;
* Payment order;
* webhook processing;
* Subscription activation;
* Invoice creation;
* Refund;
* Credit Note;
* Coupon redemption;
* Trial Grant;
* Staff invite;
* verification submission;
* Claim submission;
* Support Ticket;
* Mark All Notifications Read;
* Export;
* Account Deletion;
* moderation decision;
* Ad submission;
* DLQ Retry;
* bulk action;
* and maker-checker execution.

The same successful request must not create duplicate effects.

---

# 185. STALE-STATE PROTECTION

State-changing actions must re-read or conditionally validate the current record.

Use applicable:

* version column;
* `updated_at`;
* expected status;
* conditional SQL update;
* unique constraint;
* row lock;
* transaction;
* or idempotency key.

Examples:

* two Admins reviewing the same Project;
* two Users claiming one Profile;
* two Agents changing one Lead;
* two Payment events;
* final Coupon use;
* final Plan quota;
* Unit status race;
* and Trial Grant race.

---

# 186. SERVER ACTION AND API CONTRACT

Every mutation endpoint must:

1. authenticate;
2. authorize;
3. validate input;
4. validate target;
5. validate current state;
6. validate rate/Plan limits;
7. execute transactionally;
8. sanitize output;
9. create Audit/Notification where required;
10. return typed safe result.

Do not accept Client authority for:

* owner ID;
* role;
* assignee permission;
* price;
* amount;
* tax;
* verification;
* moderation;
* Subscription;
* or provider result.

---

# 187. VALIDATION

Use shared schemas where appropriate.

Validate:

* strings;
* lengths;
* numbers;
* dates;
* enums;
* IDs;
* relationships;
* URLs;
* file types;
* file sizes;
* Location;
* phone;
* email;
* GSTIN;
* RERA format;
* provider identifiers;
* Coupon;
* and state transitions.

Client validation improves usability.

Server validation remains mandatory.

Database constraints protect final invariants.

---

# 188. RATE LIMITING

Use server-side rate limits for abuse-prone actions.

Applicable examples:

* OTP;
* login attempts;
* Guest Reports;
* Guest Support;
* Contact Reveal;
* enquiry;
* Proposal;
* Message sending;
* file upload authorization;
* provider Test Connection;
* Export;
* Account Deletion;
* Password/account recovery;
* and public Search abuse where required.

Rate-limit keys must be privacy-safe and not exposed.

Use different limits by risk and authentication state.

---

# 189. PAGINATION

Use scalable pagination for growing lists.

Required modules include:

* Properties;
* Projects;
* Requirements;
* Leads;
* Proposals;
* Message Threads;
* Messages;
* Site Visits;
* Saved items;
* Saved Searches;
* Invoices;
* Payments;
* Refunds;
* Notifications;
* Support Tickets;
* Users;
* Staff;
* moderation queues;
* verification queues;
* Reports;
* Audit;
* Ads;
* Notification logs;
* CMS;
* Blog;
* Redirects;
* translations;
* exports;
* webhook events;
* background jobs;
* and DLQ.

Never treat an arbitrary first 100 records as the full dataset.

---

# 190. COUNT QUERIES

Use dedicated aggregate/count queries.

Do not download rows merely to count.

Counts must match the displayed definition.

Examples:

* active Listings;
* active Projects;
* available Units;
* unread Notifications;
* unread Threads;
* pending queue;
* active Trial users;
* current Coupon usage;
* and public tab counts.

---

# 191. N+1 PREVENTION

Audit for N+1 queries, especially:

* Lead enrichment;
* Message Thread participants;
* last Message;
* Project/Builder counts;
* Listing owner data;
* Admin User summaries;
* CMS authors;
* Blog categories;
* Location child counts;
* Notification delivery;
* and invoice relations.

Use:

* batched queries;
* joins;
* aggregate views;
* RPC;
* or carefully designed server loaders.

---

# 192. DATA LOADING FAILURE

An error must not become an empty state.

Distinguish:

* zero;
* empty;
* filtered empty;
* unauthorized;
* forbidden;
* provider unavailable;
* query failed;
* and partially available.

Dashboard modules should fail independently where possible.

---

# 193. CACHING

Cache only data that is safe and appropriate.

Public published content may use:

* ISR;
* tag revalidation;
* CDN;
* or server caching.

Private dashboard data must not be shared between users.

Cache invalidation is required after:

* entity publication;
* entity unpublication;
* moderation;
* CMS publish;
* Legal publish;
* SEO update;
* Redirect update;
* Location update;
* and relevant account visibility change.

---

# 194. PUBLIC CACHE INVALIDATION

Examples:

* publish Property → invalidate Detail, Search, City/Locality page and Sitemap;
* mark Property unavailable → invalidate Detail and Search;
* publish Project → invalidate Project and Builder Profile;
* update Builder Microsite → invalidate public Profile;
* publish Blog → invalidate Blog Listing, Post, related Posts and Sitemap;
* publish Legal → invalidate Legal route;
* change Redirect → refresh redirect lookup;
* change Location alias → refresh Search index.

---

# 195. OBSERVABILITY

Use safe observability for:

* errors;
* background jobs;
* webhook failures;
* provider failures;
* Payment reconciliation;
* slow queries;
* file-processing failures;
* and security events.

Logs must include:

* request/correlation ID;
* safe user/entity reference;
* module;
* error classification;
* and timestamp.

Do not log secrets or full sensitive payloads.

---

# 196. ERROR CLASSIFICATION

Classify errors where useful:

* validation;
* unauthorized;
* forbidden;
* not found;
* conflict;
* stale state;
* rate limited;
* provider missing;
* provider error;
* database error;
* file validation;
* Payment verification;
* and internal recovery required.

Return safe user-facing messages.

Store technical detail securely.

---

# 197. RETENTION

Define retention for:

* Drafts;
* orphan media;
* viewing history;
* Notifications;
* delivery logs;
* OTP attempts;
* Support;
* Messages;
* Leads;
* financial records;
* Audit;
* security events;
* exports;
* provider events;
* and deleted accounts.

Financial, legal, fraud and Audit records may require longer retention.

Do not delete required evidence through ordinary account cleanup.

---

# 198. SOFT DELETE AND ARCHIVE

Use soft delete/archive for records that require:

* restoration;
* Audit;
* financial history;
* moderation history;
* communication integrity;
* or legal retention.

Hard deletion is appropriate only after:

* retention checks;
* relationship checks;
* and approved cleanup policy.

---

# 199. STATUS REGISTRY

Use canonical typed statuses.

Do not use arbitrary user-facing strings as database authority.

Each status should define:

* canonical key;
* user label;
* semantic meaning;
* permitted actions;
* terminal/nonterminal state;
* transition rules;
* and translation key.

Use consistent status language across dashboards and Admin.

---

# 200. DATE AND TIME

Store timestamps in a consistent timezone-safe format.

Use user/business timezone for display and date grouping.

Date-sensitive modules include:

* greetings;
* Lead follow-up;
* Site Visits;
* reminders;
* Subscription periods;
* trial expiry;
* campaign schedule;
* Ad expiry;
* maintenance;
* CMS publication;
* and reports.

Do not rely solely on Browser local time for authoritative transitions.

---

# 201. SECURITY AND PRIVACY TEST MATRIX

At minimum verify:

* Guest cannot access private data;
* Owner A cannot access Owner B;
* Broker A cannot access another Broker business;
* Agent cannot access unassigned/restricted records;
* Builder A cannot access Builder B Project;
* Thread nonparticipant cannot access Messages;
* unrelated user cannot access Visit;
* unrelated user cannot access Invoice;
* unrelated user cannot access verification document;
* unrelated user cannot access Ticket;
* unrelated user cannot access Export;
* Staff without sensitive permission cannot view private contact/documents;
* Admin without module permission cannot access module;
* and Super Admin actions still create Audit.

---

# 202. DIRECT URL AND DIRECT ACTION TESTS

UI hiding is not sufficient.

Test:

* direct route;
* Server Action;
* API route;
* storage URL;
* signed URL reuse;
* changed dynamic ID;
* changed hostname;
* changed role field;
* changed business ID;
* and replayed request.

Unauthorized attempts must fail server-side.

---

# 203. SENSITIVE BROWSER PAYLOAD TESTS

Inspect HTML, React Server Component payload, Network and Client state.

Verify absence of unauthorized:

* full contact;
* alternate number;
* private email;
* private document URL;
* service key;
* provider secret;
* raw webhook;
* Payment credential;
* Staff note;
* internal moderation reason;
* and private Ticket/Message content.

---

# 204. DEVELOPMENT FIXTURES

Create realistic development fixtures for:

* Guest;
* Owner A;
* Owner B;
* Broker A;
* Broker team member;
* Builder A;
* Builder Agent;
* permission-scoped Staff;
* unauthorized Staff;
* Super Admin;
* empty account;
* populated account;
* Draft;
* Pending;
* Live;
* Rejected;
* expired;
* unavailable;
* provider active;
* provider missing;
* Test Mode Payment;
* long text;
* Gujarati text;
* and concurrent workflows.

Fixtures must not become hard-coded production display data.

---

# 205. PRODUCTION SAFETY

Before production:

* disable development OTP;
* remove auth bypasses;
* remove fake provider success;
* remove test secrets;
* remove unsafe fixtures;
* verify production environment variables;
* verify provider mode;
* verify Payment Live/Test mode;
* verify webhook URLs;
* verify storage permissions;
* verify RLS;
* verify cron/jobs;
* verify backup;
* verify monitoring;
* and verify rollback readiness.

---

# 206. CROSS-MODULE FLOW — PROPERTY

Required complete flow:

Owner/Broker Property Wizard
→ Draft
→ autosave
→ private media
→ Preview
→ Submit
→ moderation
→ Needs Changes or Approval
→ published Property Detail
→ Search/SEO
→ Save
→ Contact Reveal/Enquiry
→ Lead
→ Message
→ Site Visit
→ Dashboard
→ Notification
→ sold/rented unavailable tombstone.

Every connection must use canonical records.

---

# 207. CROSS-MODULE FLOW — PROJECT

Required flow:

Builder Project Wizard
→ RERA validation
→ structure/Units
→ media/brochure
→ Preview
→ Submit
→ moderation/RERA gate
→ published Project Detail
→ Builder Microsite
→ enquiry/configuration
→ Lead
→ Proposal/Message/Site Visit
→ Builder dashboard
→ construction progress
→ Notifications.

---

# 208. CROSS-MODULE FLOW — REQUIREMENT

Required flow:

Requirement Wizard
→ moderation
→ restricted Detail/Feed
→ eligible Broker/Builder
→ Send Proposal
→ Proposal Detail
→ embedded Message Thread
→ Lead/CRM outcome
→ Site Visit where applicable
→ close/expire.

---

# 209. CROSS-MODULE FLOW — BILLING

Required flow:

Pricing
→ selected Plan
→ authentication return
→ Checkout
→ Coupon/GST/proration
→ provider order
→ processing
→ trusted verification/webhook
→ Payment
→ Subscription
→ entitlements
→ Invoice
→ Notification
→ Refund request
→ Admin decision
→ provider Refund
→ Credit Note
→ reconciliation.

---

# 210. CROSS-MODULE FLOW — CONTENT

Required flow:

CMS/Blog/Legal Draft
→ autosave
→ Preview
→ approval/sign-off where required
→ Publish
→ public route
→ cache invalidation
→ SEO/canonical
→ Sitemap
→ translation/fallback.

---

# 211. CROSS-MODULE FLOW — SUPPORT

Required flow:

Guest/User Support request
→ canonical Ticket
→ Admin queue
→ assignment
→ Staff reply
→ internal Notification
→ external acknowledgment where configured
→ user Thread
→ resolve
→ read-only/closed state
→ reopen where policy allows.

---

# 212. CROSS-MODULE FLOW — ADS

Required flow:

Builder Campaign Draft
→ creative validation
→ targeting
→ pricing/wallet/Payment
→ Submit
→ Admin Review
→ approval/rejection
→ schedule
→ active
→ performance
→ fraud review where applicable
→ pause/expiry
→ Notification/Audit.

---

# 213. CROSS-MODULE FLOW — ROLE CHANGE

Required flow:

Owner request
→ warning/impact
→ pending
→ Admin review
→ transactional role/Subscription/verification migration
→ Notification
→ new dashboard access
→ Audit.

Withdrawal must be available before final decision according to policy.

---

# 214. CROSS-MODULE FLOW — ACCOUNT DELETION

Required flow:

Danger Zone
→ typed confirmation
→ OTP
→ deletion request
→ 30-day grace
→ cancel or scheduled processing
→ public content cleanup
→ personal data anonymization/deletion
→ legal retention
→ Auth closure
→ Audit completion.

---

# 215. FUNCTIONAL COMPLETION RULE

A module is not complete when only the screen exists.

Completion requires:

* real database records;
* real states;
* real server actions;
* real RLS;
* real validation;
* real persistence;
* real error handling;
* real empty states;
* real provider fallback;
* real idempotency;
* real responsive behavior;
* and real browser verification.

---

# 216. PROHIBITED BACKEND PATTERNS

The following are prohibited:

* separate duplicate domain systems;
* Client-only authorization;
* Client-supplied owner authority;
* Client-supplied role authority;
* Client-supplied Payment success;
* Client-supplied amount authority;
* fake provider success;
* fake analytics;
* fake Notification delivery;
* fake Payment;
* fake Invoice;
* fake Refund;
* fake wallet balance;
* public private-file URLs;
* full contact before Reveal;
* raw service-role access from Browser;
* write-only secret returned to Client;
* unrestricted sensitive `select *`;
* first 100 rows treated as full dataset;
* unbounded Admin list;
* N+1 list architecture;
* silent partial multi-write;
* non-idempotent webhook;
* duplicate Proposal/Visit/Lead;
* stale-state approval;
* hard-coded current tax/rate data without versioning;
* Draft CMS leakage;
* unapproved Legal publication;
* unsafe Service Worker private caching;
* tracking before consent;
* and hard deletion that breaks financial/Audit integrity.

---

# 217. MODULE IMPLEMENTATION REPORT

For each functional module implemented, Claude must report:

## FUNCTIONAL MODULE IMPLEMENTATION RECORD

* Module:
* Existing tables inspected:
* Existing actions/APIs inspected:
* Existing RLS inspected:
* Existing providers inspected:
* Preserve:
* Replace:
* Rebuild:
* Canonical entities used:
* Migrations added:
* Constraints added:
* Indexes added:
* RLS changes:
* Server actions/APIs:
* State transitions:
* Transactions:
* Idempotency:
* Provider fallback:
* Privacy protections:
* Performance work:
* Automated tests:
* Manual database verification:
* Remaining blockers:
* Status: IMPLEMENTED / PARTIAL / BLOCKED

---

# 218. FINAL DATA ARCHITECTURE CHECKLIST

* [ ] One canonical Profile system
* [ ] One final public role model
* [ ] One team and Staff permission model
* [ ] One Property system
* [ ] One Project system
* [ ] One Unit Inventory system
* [ ] One Requirement system
* [ ] One media system
* [ ] One Location hierarchy
* [ ] One Missing Location workflow
* [ ] One Lead system
* [ ] One Proposal system
* [ ] One Message system
* [ ] One Site Visit system
* [ ] One Contact Reveal system
* [ ] One Notification system
* [ ] One Support system
* [ ] One moderation framework
* [ ] One verification framework
* [ ] One Claim framework
* [ ] One Report framework
* [ ] One Billing system
* [ ] One Payment/Webhook system
* [ ] One Invoice system
* [ ] One Refund/Credit Note system
* [ ] One Plan/entitlement system
* [ ] One Coupon system
* [ ] One Trial system
* [ ] One Ad system
* [ ] One provider registry
* [ ] One Feature Flag system
* [ ] One Maintenance Mode system
* [ ] One background-job/DLQ system
* [ ] One CMS revision system
* [ ] One Blog publishing system
* [ ] One Legal sign-off system
* [ ] One SEO/Redirect/Sitemap system
* [ ] One translation system
* [ ] One Audit system
* [ ] One Export system
* [ ] One bulk-action system
* [ ] One maker-checker system
* [ ] One cookie/analytics consent system
* [ ] One language preference
* [ ] One Theme preference
* [ ] One accessibility preference
* [ ] One PWA foundation
* [ ] One Comparison system
* [ ] No duplicate legacy role architecture
* [ ] No unrestricted sensitive queries
* [ ] No private-file public URLs
* [ ] No full contact before Reveal
* [ ] No fake financial state
* [ ] No fake provider state
* [ ] No fake analytics
* [ ] No arbitrary first-100 total
* [ ] No material N+1
* [ ] All high-risk actions idempotent
* [ ] All multi-write workflows transactional or recoverable
* [ ] All dynamic routes server-authorized
* [ ] All public data uses public-safe projection
* [ ] All critical changes audited
* [ ] All production bypasses disabled

---

# 219. FINAL CROSS-BATCH ACCEPTANCE

The backend and data implementation is complete only when all representative end-to-end flows pass:

1. Property Wizard to public Detail;
2. Project Wizard to Unit Inventory and public Project;
3. Requirement to Proposal and Message;
4. Enquiry to Lead, Contact Reveal, Message and Site Visit;
5. Owner dashboard lifecycle;
6. Broker CRM lifecycle;
7. Builder Project/team/Ad lifecycle;
8. Pricing to verified Payment, Subscription and Invoice;
9. Refund to Credit Note;
10. User/Staff/Moderation/Verification Support Admin workflows;
11. Ads, Notification and provider fallbacks;
12. CMS/Legal/Blog to public content and Sitemap;
13. Reports, Audit, Security, Export and maker-checker;
14. Cookie consent and Analytics provider matrix;
15. PWA install, offline and update safety;
16. language, Theme, transliteration and accessibility persistence;
17. calculator correctness;
18. Comparison persistence;
19. direct URL/RLS denial;
20. sensitive payload privacy;
21. pagination/count/N+1 performance;
22. transaction, duplicate and concurrency safety;
23. production provider configuration;
24. lint;
25. typecheck;
26. production build;
27. real browser verification;
28. real database verification;
29. multi-role regression;
30. and no known critical internal blocker.

---

# 220. FINAL NON-NEGOTIABLE STATEMENT

My Gujarat Property must operate as one connected production application.

Every visible screen must connect to a canonical backend entity, secure server operation, real database record and valid state transition.

No module may exist only as visual UI.

No secure backend module may remain disconnected from the approved screen.

No public request may bypass server authorization.

No private information may be sent before authorization.

No financial state may be created from untrusted Client success.

No provider may display Active or Sent without real supporting state.

No high-impact action may create duplicate or contradictory records.

No operational list may assume that the first 100 rows represent all data.

No old duplicate Lead, Message, Site Visit, Billing, Support, Notification, Location, Media or role system may remain as a competing authority.

Final completion requires:

**Canonical Data + Real Persistence + Secure Authentication + Role/Ownership/Participant Authorization + RLS + Private Storage + Contact Privacy + Valid State Machines + Transactions + Idempotency + Provider Honesty + Financial Integrity + Auditability + Scalable Queries + Background Job Reliability + Consent + PWA Safety + End-to-End Browser and Database Verification.**

