
# `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`

# MY GUJARAT PROPERTY

## MASTER MANUAL VERIFICATION, REGRESSION, SECURITY, RESPONSIVE, PERFORMANCE AND PRODUCTION RELEASE CHECKLIST

**File status:** FINAL VERIFICATION AUTHORITY
**Project root:** `C:\mgpweb`
**Approved design directory:** `C:\mgpweb\newdesign`
**Primary mobile comparison width:** `390px`
**Required additional widths:** `320px`, `360px`, `430px`, `768px`, `1024px`, `1280px`, `1366px`, `1440px`
**Verification model:** Implementation → Manual Verification → Fix → Retest → PASS
**Applies to:** All public, authenticated, dashboard, Admin, billing, CMS, system, PWA and production routes

---

# 1. DOCUMENT PURPOSE

This document defines the complete manual verification and production release standard for My Gujarat Property.

It must be used to verify:

* exact HTML design implementation;
* screen boundaries;
* route behavior;
* shell behavior;
* responsive transformations;
* loading states;
* empty states;
* error states;
* forms;
* database persistence;
* authentication;
* roles;
* permissions;
* ownership;
* participant access;
* Row Level Security;
* private data;
* media;
* external providers;
* Payments;
* Subscriptions;
* Invoices;
* Refunds;
* Notifications;
* Leads;
* Proposals;
* Messages;
* Site Visits;
* moderation;
* verification;
* claims;
* Reports;
* Support;
* Admin;
* CMS;
* SEO;
* PWA;
* localization;
* accessibility;
* performance;
* deployment;
* and final production readiness.

This file must be used together with:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
3. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
4. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

No implementation phase may be marked PASS until the relevant checks in this document pass.

---

# 2. ABSOLUTE VERIFICATION RULE

Do not trust:

* implementation report;
* code review alone;
* screenshot alone;
* build success alone;
* TypeScript success alone;
* lint success alone;
* route rendering alone;
* existing automated tests alone;
* developer claims;
* mock provider output;
* or visual similarity at one screen width.

Verification must use the running application.

Verification must inspect:

* real rendered screens;
* real interactions;
* actual routes;
* actual database writes;
* actual data reload;
* Browser Network requests;
* Browser Console;
* direct URL access;
* direct Server Action/API access;
* file access;
* provider states;
* duplicate actions;
* stale actions;
* concurrent actions;
* mobile behavior;
* tablet behavior;
* desktop behavior;
* and cross-module regressions.

Static code inspection is not PASS.

---

# 3. FINAL DESIGN COMPARISON RULE

Every screen must be compared directly with its exact design HTML inside:

`C:\mgpweb\newdesign`

Do not compare from memory.

Do not compare only with a screenshot when the HTML contains additional content below the first viewport.

For every registered screen:

1. open the exact design HTML;
2. identify the exact product screen boundary;
3. open the corresponding application route;
4. use the same reference viewport;
5. compare from the screen’s actual top boundary;
6. scroll through the entire screen;
7. compare through the final bottom section;
8. trigger all shown overlays and states;
9. compare desktop;
10. compare tablet;
11. compare mobile;
12. record defects;
13. fix defects;
14. retest.

`Almost the same` is not PASS.

---

# 4. VERIFICATION PRECEDENCE

When verification criteria conflict, use this order:

1. latest explicit user instruction;
2. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`;
3. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`;
4. exact approved HTML design;
5. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`;
6. this verification file;
7. phase-specific verification prompt;
8. existing automated tests;
9. current code behavior.

Existing code passing its old tests does not permit design or functional conflicts.

---

# 5. VERIFICATION EXECUTION ORDER

Use this exact execution order:

1. confirm required authority files exist;
2. confirm exact design HTML exists;
3. confirm application starts;
4. confirm database connection;
5. confirm migrations;
6. confirm development fixtures;
7. confirm provider configuration state;
8. run automated focused tests;
9. run lint;
10. run TypeScript typecheck;
11. run production build;
12. start or preserve the running application;
13. verify exact design;
14. verify desktop;
15. verify tablet;
16. verify `390px`;
17. verify mobile edge widths;
18. verify functionality;
19. verify persistence;
20. inspect database state;
21. inspect Network payloads;
22. test wrong-role access;
23. test cross-user access;
24. test RLS;
25. test private files;
26. test duplicate actions;
27. test concurrency;
28. test provider missing/error states;
29. test performance;
30. inspect Console and failed requests;
31. fix defects;
32. rerun focused tests;
33. rerun affected shared regressions;
34. rerun lint;
35. rerun typecheck;
36. rerun production build;
37. issue final PASS, FAIL or BLOCKED result.

---

# 6. RUNNING SERVER RULE

Do not stop the running development server unnecessarily.

Keep the application available during manual verification.

Restart only when required by:

* environment changes;
* dependency changes;
* framework configuration;
* migration-dependent application boot;
* Service Worker reset;
* or a confirmed stale server state.

When restart is necessary:

1. record the reason;
2. stop safely;
3. restart on the approved port;
4. confirm the app loads;
5. resume verification;
6. do not lose the original defect context.

Do not repeatedly restart the server as a substitute for fixing application state bugs.

---

# 7. REQUIRED VERIFICATION ENVIRONMENT

Before testing, record:

* operating system;
* browser name and version;
* Node version;
* package-manager version;
* active branch;
* latest commit;
* current uncommitted changes;
* application URL;
* database environment;
* storage environment;
* provider mode;
* development or production mode;
* service worker state;
* and test date/timezone.

Use a supported modern browser.

Where practical, use:

* Chromium-based browser;
* responsive device emulation;
* real keyboard navigation;
* and one secondary browser for critical public/auth/payment flows.

---

# 8. AUTHORITY FILE EXISTENCE CHECK

Confirm these exact files exist:

* `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
* `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
* `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
* `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
* `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

Confirm all exact design HTML files listed in File 2 exist.

If a required file is missing:

* mark the affected verification BLOCKED;
* name the missing file;
* name the expected location;
* do not use an old substitute;
* do not guess its content.

---

# 9. REQUIRED DEVELOPMENT FIXTURES

Create or verify realistic fixtures for:

## 9.1 Public states

* Guest;
* published Property;
* Property with many images;
* Property without approved media;
* unavailable Property;
* published Project;
* Project with Brochure;
* Project without Video;
* Project without 360 provider;
* public Broker;
* public Builder;
* public Owner;
* private Owner Profile;
* claimable Profile;
* claimed Profile;
* active Requirement;
* restricted Requirement teaser.

## 9.2 Owner fixtures

* Owner A;
* Owner B;
* new empty Owner;
* Owner with many Properties;
* Owner with multiple Requirements;
* Owner with more than one page of Leads;
* Owner with Messages;
* Owner with Visits;
* Owner with Invoices;
* Owner with verification rejected;
* Owner with pending Role Change;
* Owner with Export job;
* Owner with deletion request.

## 9.3 Broker fixtures

* Broker A;
* Broker B;
* Broker with active Properties;
* Broker with client Requirements;
* Broker with matching Feed;
* Broker with Proposals;
* Broker with more than one CRM page;
* Broker with Kanban Leads;
* Broker with team member where supported;
* Broker with verification states;
* Broker with Billing records.

## 9.4 Builder fixtures

* Builder A;
* Builder B;
* Builder with multiple Projects;
* Builder with Units;
* Builder with available/booked/sold Units;
* Builder with Leads;
* Builder with Agent;
* Builder with Ad Campaign;
* Builder with RERA pending;
* Builder with RERA approved;
* Builder with construction milestones;
* Builder with wallet and Invoices.

## 9.5 Staff fixtures

* Super Admin;
* User Manager;
* Moderation Staff;
* Verification Staff;
* Support Staff;
* Billing Staff;
* Ads Staff;
* Content Staff;
* SEO Staff;
* Location Staff;
* Security Staff;
* unauthorized Staff;
* Staff with partial permissions;
* maker;
* checker;
* and suspended Staff.

## 9.6 System fixtures

* provider Active;
* provider Setup Required;
* provider Error;
* Payment Test Mode;
* successful Payment;
* failed Payment;
* pending Payment;
* Refund;
* DLQ job;
* Maintenance scheduled;
* Maintenance active;
* feature flag active/inactive;
* published CMS;
* Draft CMS;
* approved Legal revision;
* unapproved Legal Draft;
* translation missing;
* PWA supported;
* PWA unsupported;
* offline state.

Fixtures must not be hard-coded into production rendering.

---

# 10. TEST DATA ISOLATION

Verification must not corrupt unrelated development or production-like data.

Use identifiable test records.

Test records should contain safe markers such as:

* `QA`;
* `TEST`;
* current date;
* or a dedicated test account.

Do not use real customer contact details for destructive or provider tests.

Do not use production Payment credentials unless an explicitly approved production smoke test is being performed.

---

# 11. EVIDENCE REQUIREMENT

For each verification phase, preserve evidence where useful:

* route tested;
* viewport;
* screenshot;
* screen recording for interaction defects;
* Network request;
* Network response;
* Console error;
* database before state;
* database after state;
* Audit event;
* provider delivery state;
* test account;
* defect ID;
* fix file;
* retest result.

Sensitive evidence must be redacted.

Do not include:

* full mobile;
* full provider secret;
* service-role key;
* private document;
* raw payment credential;
* or unrestricted private payload

in ordinary verification reports.

---

# 12. DEFECT SEVERITY

Use these severity levels.

## Critical

Examples:

* authentication bypass;
* cross-user private data exposure;
* service-role secret exposure;
* full contact leaked before authorization;
* public verification document;
* false paid Subscription;
* duplicate charge;
* incorrect Refund;
* production deletion;
* unsafe RLS;
* unrestricted Admin access;
* cached private data after logout.

Critical defect means FAIL.

## High

Examples:

* required action does not work;
* wrong entity changed;
* stale approval succeeds;
* duplicate Lead/Proposal/Visit;
* mobile primary action inaccessible;
* wrong shell;
* missing required screen;
* broken moderation;
* private route indexed;
* provider falsely marked Active.

High defect means FAIL.

## Medium

Examples:

* incorrect empty state;
* major responsive issue;
* broken pagination;
* wrong count;
* noncritical accessibility blocker;
* missing Retry;
* inconsistent status;
* partial visual mismatch.

Medium defects must be fixed before final PASS unless explicitly accepted by the user.

## Low

Examples:

* small spacing difference;
* minor copy mismatch;
* low-impact visual alignment issue.

Low defects must still be fixed when they conflict with the approved exact design.

---

# 13. DEFECT WORKFLOW

For every defect:

1. record route;
2. record role;
3. record viewport;
4. record expected result;
5. record actual result;
6. identify whether defect is visual, functional, security, data, provider, performance or accessibility;
7. identify root cause;
8. implement fix;
9. rerun focused test;
10. rerun related role test;
11. rerun related mobile/desktop state;
12. inspect Network/Console;
13. rerun lint;
14. rerun typecheck;
15. rerun production build;
16. update status.

Do not mark a defect fixed without retesting the original reproduction steps.

---

# 14. PASS, FAIL AND BLOCKED DEFINITIONS

## PASS

PASS is permitted only when:

* every mandatory item passes;
* exact design passes;
* functionality passes;
* real persistence passes;
* security passes;
* responsive behavior passes;
* no critical/high defect remains;
* required medium defects are fixed;
* lint passes;
* typecheck passes;
* production build passes;
* and affected shared regressions pass.

## FAIL

Use FAIL when:

* an internal implementation defect remains;
* required UI is missing;
* required action is dead;
* security or RLS fails;
* data does not persist;
* design substantially differs;
* responsive behavior fails;
* or required internal functionality is incomplete.

Internal implementation defects are not BLOCKED.

## BLOCKED

BLOCKED is permitted only for a genuine external dependency such as:

* missing provider credentials;
* unavailable third-party service;
* inaccessible external account;
* missing user-provided design file;
* or unavailable external legal/rate authority.

Even when blocked:

* internal functionality must be complete where possible;
* honest Setup Required state must pass;
* fallback must pass;
* no fake success may appear;
* all nonblocked checks must pass.

---

# 15. EXACT SCREEN BOUNDARY VERIFICATION

For every screen, verify:

* actual product top boundary;
* actual product bottom boundary;
* presentation wrapper excluded;
* no design labels copied;
* no viewport frames copied;
* no explanatory notes copied;
* no extra old header;
* no extra old footer;
* no extra old sidebar;
* no old page section below new content;
* no unrelated promotional block;
* no duplicate card group;
* no hidden conflicting UI.

Scroll the complete route.

Do not stop after the first viewport.

---

# 16. SHELL VERIFICATION

Verify per route:

* correct public header;
* correct contextual mobile header;
* correct Owner sidebar;
* correct Broker sidebar;
* correct Builder sidebar;
* correct Admin sidebar;
* correct top bar;
* correct mobile drawer;
* correct mobile bottom navigation;
* correct sticky CTA;
* correct shell suppression;
* correct footer presence or absence.

Test that a global layout does not inject an unwanted shell into:

* Wizard;
* Fullscreen Gallery;
* payment processing;
* Maintenance page;
* modal;
* sheet;
* or Admin mobile route.

---

# 17. HEADER VERIFICATION

Verify:

* exact height;
* logo;
* alignment;
* search position;
* City selector only where designed;
* login/profile state;
* notification state;
* navigation;
* active route;
* mobile transformation;
* sticky behavior;
* dropdown behavior;
* outside click;
* Escape;
* focus restoration;
* keyboard access.

Do not accept:

* two headers;
* old header plus new header;
* incorrect City selector;
* fake badge;
* dead search;
* or overlapping header.

---

# 18. SIDEBAR VERIFICATION

Verify:

* exact width;
* collapsed state;
* expanded state;
* active item;
* role identity;
* real badges;
* permission-hidden modules;
* keyboard navigation;
* tooltip in collapsed state;
* scroll behavior;
* sticky/fixed behavior;
* content offset;
* mobile removal;
* and drawer replacement.

Do not show modules the user cannot access.

Do not fetch unauthorized module counts.

---

# 19. MOBILE DRAWER VERIFICATION

Test:

* open;
* close button;
* outside click;
* Escape;
* focus trap;
* body scroll lock;
* correct role items;
* correct active item;
* real counts;
* logout;
* focus return;
* no background clicks;
* no desktop sidebar collision.

Admin drawer must not use public-role bottom navigation.

---

# 20. MOBILE BOTTOM NAVIGATION VERIFICATION

Where shown, verify:

* exact five items;
* exact order;
* exact label;
* exact icon;
* active state;
* raised Post action where designed;
* correct role-specific Post destination;
* real badges;
* safe-area inset;
* no overlap with sticky CTA;
* no overlap with keyboard;
* no hidden final content.

Owner/Broker Post must not open Builder Project Wizard.

Builder Post must not open Property Wizard.

---

# 21. ROUTE VERIFICATION

For every visible route:

* open through normal navigation;
* open directly;
* refresh;
* use Back;
* use Forward;
* open in new tab where applicable;
* test invalid ID;
* test unavailable ID;
* test unauthorized ID;
* test changed slug;
* test changed host where applicable;
* test old route redirect;
* test canonical route.

No obsolete route may show an old conflicting design.

---

# 22. DEEP-LINK VERIFICATION

Test deep links from:

* Notifications;
* dashboard metric;
* recent activity;
* Lead row;
* Message notification;
* Site Visit reminder;
* Proposal notification;
* Invoice notification;
* moderation queue;
* verification queue;
* Support reply;
* Ad result;
* Role Change result;
* provider error;
* DLQ alert;
* CMS publish result;
* Report queue;
* Export ready notification.

Each link must open the exact entity and context.

Do not route everything to dashboard home.

---

# 23. BROWSER HISTORY VERIFICATION

Test:

* page → modal → close;
* page → drawer → close;
* page → auth → return;
* Search → Detail → Back;
* Feed → Requirement → Proposal → Back;
* Leads → drawer → full Detail → Back;
* Messages list → Thread → Back;
* Pricing → auth → Checkout → Back;
* Gallery → close;
* Compare → remove → Back.

Temporary overlays should normally close before navigating away.

Avoid history loops.

---

# 24. VISUAL HIERARCHY VERIFICATION

Compare:

* page title;
* subtitle;
* primary action;
* secondary action;
* section order;
* card hierarchy;
* content emphasis;
* price emphasis;
* status emphasis;
* helper text;
* warning placement;
* badges;
* CTA hierarchy;
* metadata;
* whitespace;
* grouping.

Correct colors with incorrect hierarchy is FAIL.

---

# 25. TYPOGRAPHY VERIFICATION

Verify:

* font family;
* heading scale;
* body scale;
* helper text;
* metadata;
* numbers;
* price;
* table text;
* line height;
* weight;
* letter spacing;
* wrapping;
* truncation;
* Gujarati rendering;
* Hindi state where shown;
* long names;
* long email-safe display;
* long Property title;
* long Location;
* long Admin reason.

No text clipping is allowed.

---

# 26. SPACING AND ALIGNMENT VERIFICATION

Verify:

* page margins;
* max width;
* grid gap;
* section gap;
* card padding;
* table padding;
* control gap;
* icon alignment;
* label alignment;
* form spacing;
* footer spacing;
* sticky offset;
* mobile side padding;
* safe-area padding.

Do not accept:

* oversized blank space;
* collapsed sections;
* inconsistent card padding;
* arbitrary stacked boxes;
* or misaligned actions.

---

# 27. COLOR AND TOKEN VERIFICATION

Verify:

* approved brand color;
* background;
* surface;
* border;
* text;
* muted text;
* primary action;
* secondary action;
* focus;
* disabled;
* success;
* pending;
* warning;
* error;
* information;
* selected state.

Test Light, Dark and System where applicable.

Do not allow hard-coded light colors to break Dark mode.

Do not recolor images.

---

# 28. ICON VERIFICATION

Verify:

* correct icon;
* consistent icon library/style;
* size;
* alignment;
* accessible name;
* hover/focus state;
* semantic meaning.

Do not use emoji in place of approved production icons unless the design explicitly shows it.

---

# 29. IMAGE AND MEDIA VISUAL VERIFICATION

Verify:

* correct image;
* real data;
* correct aspect ratio;
* crop;
* object position;
* Cover image;
* no distortion;
* no layout jump;
* loading;
* failure fallback;
* responsive sizes;
* image count;
* gallery order.

Do not accept generic grey placeholders as final when real media exists.

---

# 30. RESPONSIVE TEST ORDER

Use this order:

1. `390px`;
2. `320px`;
3. `360px`;
4. `430px`;
5. `768px`;
6. `1024px`;
7. `1280px`;
8. `1366px`;
9. `1440px`.

Test intermediate widths for high-risk layouts.

Do not test only desktop.

---

# 31. `390PX` PRIMARY MOBILE CHECKLIST

At `390px`, verify:

* no horizontal page scroll;
* no text clipping;
* no button clipping;
* contextual header;
* correct Back behavior;
* mobile card layout;
* mobile table transformation;
* bottom navigation;
* sticky CTA;
* safe-area inset;
* mobile drawer;
* bottom sheet;
* keyboard;
* input visibility;
* media swipe;
* tab scrolling;
* modal height;
* action accessibility;
* footer or final content visibility.

---

# 32. SMALL MOBILE CHECKLIST

At `320px` and `360px`, verify:

* title wraps;
* badges wrap or remain readable;
* buttons fit or stack;
* form fields remain full width;
* table cards remain readable;
* no fixed-width overflow;
* drawer fits;
* bottom sheet actions fit;
* bottom navigation labels remain usable;
* no offscreen close control;
* no clipped Gujarati text.

---

# 33. WIDE MOBILE CHECKLIST

At `430px`, verify:

* layout does not incorrectly switch to tablet too early;
* cards do not become oversized;
* side padding remains consistent;
* sticky elements align;
* bottom navigation remains correct;
* modal/sheet does not leave awkward width.

---

# 34. TABLET CHECKLIST

At `768px` and `1024px`, verify:

* correct tablet transformation;
* sidebar behavior;
* drawer behavior;
* column count;
* card width;
* table behavior;
* sticky behavior;
* touch targets;
* modal width;
* filters;
* search;
* no desktop-only overflow;
* no mobile-only excessive whitespace.

Tablet must not be treated as a larger mobile screenshot only.

---

# 35. DESKTOP CHECKLIST

At `1280px`, `1366px` and `1440px`, verify:

* max width;
* sidebar/content ratio;
* correct desktop grid;
* exact table columns;
* sticky sidebar/card;
* modal width;
* right drawer width;
* content alignment;
* footer;
* no excessive unused space;
* no stretched cards.

---

# 36. HORIZONTAL OVERFLOW CHECK

Inspect the full page and major components.

Accidental page-level horizontal scrolling is FAIL.

Intentional horizontal scrolling is allowed only for approved:

* tabs;
* Comparison table;
* Kanban;
* explicit responsive table;
* media strip.

Intentional scroll areas must have visible and usable interaction.

---

# 37. STICKY AND FIXED ELEMENT CHECK

Verify:

* header;
* sidebar;
* sticky CTA;
* sticky Wizard footer;
* Message composer;
* bottom navigation;
* Comparison tray;
* modal actions;
* table header.

Check:

* correct offset;
* no overlap;
* correct z-index;
* safe-area;
* final content not hidden;
* keyboard behavior;
* scroll container compatibility.

---

# 38. MOBILE KEYBOARD CHECK

For every mobile form or composer:

1. focus first field;
2. focus middle field;
3. focus final field;
4. open dropdown;
5. type long text;
6. open keyboard;
7. submit;
8. test sticky action.

Verify:

* field scrolls into view;
* action remains reachable;
* bottom sheet resizes correctly;
* no keyboard-covered button;
* no accidental page jump;
* no trapped scroll.

---

# 39. ORIENTATION CHECK

For high-risk mobile/tablet screens, verify portrait and landscape:

* Wizard;
* media gallery;
* Message Thread;
* Comparison;
* Admin table;
* Unit Inventory;
* Checkout;
* Invoice;
* modal/sheet.

No important action may become unreachable in landscape.

---

# 40. LOADING STATE VERIFICATION

Force or simulate loading.

Verify:

* exact skeleton or spinner;
* no fake zero;
* no content flash with incorrect user;
* no old UI flash;
* no layout collapse;
* loading does not block unrelated modules unnecessarily;
* screen reader status where appropriate;
* request completes;
* state is replaced by real content.

---

# 41. EMPTY STATE VERIFICATION

Create a genuinely empty account or dataset.

Verify:

* correct empty copy;
* correct illustration/icon;
* correct primary action;
* no fake sample row;
* no irrelevant filters;
* action leads to correct creation flow;
* role-specific copy;
* mobile layout.

---

# 42. FILTERED-EMPTY STATE VERIFICATION

Apply filters that return zero.

Verify:

* filtered-empty copy differs from new-account empty state;
* active filters remain visible;
* Clear Filters works;
* count is correct;
* no data error is hidden as filtered empty.

---

# 43. ERROR AND RETRY VERIFICATION

Force:

* database query failure;
* server action failure;
* provider failure;
* network failure;
* upload failure;
* stale state;
* permission error.

Verify:

* safe user message;
* no stack trace;
* no raw SQL;
* no secret;
* Retry works;
* successful modules remain visible where failure isolation is required;
* error does not become zero/empty.

---

# 44. FORBIDDEN AND UNAUTHORIZED STATE

Test:

* unauthenticated protected route;
* authenticated wrong role;
* correct role but wrong ownership;
* Staff without capability;
* participant not in Thread;
* participant not in Visit;
* Invoice of another user;
* private Profile;
* private Export.

Verify:

* server-side denial;
* correct forbidden design;
* no sensitive count;
* no partial private render;
* no data in Network payload;
* safe navigation option.

---

# 45. SETUP REQUIRED STATE

For every provider-dependent module:

1. remove or disable provider configuration safely;
2. open the module;
3. verify exact Setup Required state;
4. verify no fake success;
5. verify internal fallback;
6. verify safe recovery/action;
7. restore provider state;
8. retest Active state.

Setup Required must not be represented as normal empty data.

---

# 46. FORM VERIFICATION

For every form, test:

* untouched submit;
* required fields;
* invalid format;
* minimum length;
* maximum length;
* invalid number;
* boundary number;
* past date;
* future date;
* invalid URL;
* invalid enum;
* whitespace;
* Unicode;
* Gujarati;
* duplicate value;
* server error;
* double submit;
* refresh;
* Back;
* Cancel;
* success.

Verify field values are preserved after unrelated errors.

---

# 47. CLIENT AND SERVER VALIDATION

Bypass Client validation where possible through:

* DevTools;
* direct request;
* modified payload;
* direct Server Action/API call.

Verify server rejects:

* invalid role;
* wrong owner;
* invalid status;
* excessive amount;
* invalid file;
* invalid ID;
* invalid date;
* invalid provider URL;
* invalid Coupon;
* invalid RERA;
* invalid GSTIN.

Client validation alone is not PASS.

---

# 48. DRAFT VERIFICATION

For every Draft flow:

1. begin Draft;
2. enter early-step data;
3. wait for autosave;
4. refresh;
5. reopen;
6. verify values;
7. verify exact resume step;
8. edit quickly to force autosave race;
9. close before save completes;
10. reopen;
11. verify newest values;
12. trigger save failure;
13. verify error;
14. retry;
15. start a second Draft;
16. confirm first Draft remains;
17. resume both;
18. discard only through approved confirmation.

---

# 49. AUTOSAVE RACE VERIFICATION

Generate rapid changes so requests complete out of order.

Verify:

* older response does not overwrite newer data;
* saving indicator is truthful;
* latest version remains after refresh;
* database version advances correctly;
* no duplicate Draft is created;
* error is recoverable.

---

# 50. PERSISTENCE VERIFICATION

For every mutation:

1. perform action;
2. inspect UI success;
3. inspect Network response;
4. inspect database;
5. refresh page;
6. log out;
7. log back in;
8. reopen route;
9. verify persisted state.

A Client-only success that disappears after refresh is FAIL.

---

# 51. DATABASE WRITE VERIFICATION

Inspect actual records for:

* correct owner;
* correct business;
* correct entity;
* correct state;
* correct timestamps;
* correct revision;
* correct Audit;
* correct Notification;
* correct relation;
* no duplicate;
* no orphan record;
* no unintended write.

Do not rely only on UI.

---

# 52. DATABASE CONSTRAINT VERIFICATION

Test relevant constraints:

* duplicate slug;
* duplicate pending Claim;
* duplicate Proposal;
* duplicate participant;
* duplicate webhook event;
* duplicate Invoice;
* duplicate Coupon;
* duplicate Unit;
* duplicate active request;
* invalid foreign key;
* invalid enum;
* invalid amount.

Verify safe application error.

---

# 53. MIGRATION VERIFICATION

For each migration:

* apply from clean state where practical;
* apply to existing fixture data;
* verify backfill;
* verify indexes;
* verify constraints;
* verify RLS;
* verify no data loss;
* verify application compatibility;
* verify rollback/recovery notes;
* verify migration order.

Do not validate only against an already manually modified database.

---

# 54. AUTHENTICATION VERIFICATION

Test:

* Guest login;
* registration;
* OTP request;
* invalid OTP;
* expired OTP;
* repeated OTP;
* rate limit;
* resend;
* development OTP mode;
* production OTP mode;
* logout;
* session refresh;
* account suspended;
* return intent;
* direct `/login`;
* protected-action login;
* mobile popup;
* desktop modal.

Verify direct `/login` behavior matches the approved background/modal design.

---

# 55. AUTH RETURN-INTENT VERIFICATION

Test Guest actions:

* Save Property;
* Enquire;
* Reveal;
* Contact Broker;
* Contact Builder;
* View Requirement;
* Send Proposal;
* select Pricing Plan;
* Claim Profile;
* Report where auth-gated.

After login:

* return to original route;
* preserve entity;
* preserve selected action;
* continue safely;
* recheck permission;
* do not redirect generically.

---

# 56. OPEN REDIRECT TEST

Modify return URL to:

* external domain;
* protocol-relative URL;
* malicious encoded URL;
* unauthorized internal route.

Verify safe rejection or approved fallback.

---

# 57. ROLE VERIFICATION

Test each role separately:

* Owner;
* Broker;
* Builder;
* Staff;
* Super Admin.

Verify:

* correct landing;
* correct shell;
* correct routes;
* correct bottom navigation;
* correct Post action;
* correct permissions;
* no legacy role route;
* no Client-only role switching.

---

# 58. WRONG-ROLE TEST

Attempt:

* Owner Project Wizard;
* Owner Builder Units;
* Broker Builder route;
* Builder Owner Property management;
* public user Admin route;
* Staff wrong module;
* suspended team member route.

Verify:

* server denial;
* no private payload;
* correct forbidden state;
* no role value accepted from Client.

---

# 59. CROSS-USER OWNERSHIP TEST

Using User A and User B, change route IDs and invoke actions for:

* Draft;
* Property;
* Project;
* Requirement;
* media;
* Lead;
* Message Thread;
* Site Visit;
* Invoice;
* verification;
* Support Ticket;
* Saved item;
* Export;
* Profile edit;
* team member.

Every unauthorized attempt must fail server-side.

---

# 60. PARTICIPANT SCOPE TEST

Verify only participants may access:

* Lead;
* Proposal;
* Thread;
* Message;
* Site Visit;
* dispute;
* contact state;
* related private attachments.

Test guessed IDs.

Test a removed or archived participant.

---

# 61. STAFF CAPABILITY TEST

For every Admin module:

* authorized Staff opens normally;
* unauthorized Staff sees forbidden state;
* navigation hides module;
* direct URL is denied;
* count is not fetched;
* Server Action is denied;
* sensitive data remains absent.

Test partial permissions such as:

* read without approve;
* read without export;
* update without sensitive read;
* approve without provider management.

---

# 62. SUPER ADMIN TEST

Super Admin may access required internal modules but must still follow:

* Audit;
* mandatory reason;
* secret write-only rule;
* private-file access control;
* financial verification;
* maker-checker separation;
* and stale-state validation.

Super Admin must not see stored provider secrets.

---

# 63. RLS TESTING METHOD

Test RLS using:

* normal application session;
* direct database client under user session;
* direct API request;
* changed entity ID;
* changed ownership payload;
* changed business ID;
* changed role value;
* missing session;
* expired session.

Verify RLS does not depend only on UI.

---

# 64. PUBLIC-SAFE PAYLOAD TEST

Inspect:

* initial HTML;
* RSC/Flight payload;
* JSON/API responses;
* prefetch responses;
* hidden attributes;
* Client store;
* localStorage;
* sessionStorage;
* script data.

Verify absence of:

* full phone;
* alternate phone;
* private email;
* exact private address;
* private coordinates;
* verification proof;
* Claim proof;
* Staff notes;
* moderation reason;
* Payment details;
* provider secrets;
* service-role keys.

---

# 65. CONTACT PRIVACY VERIFICATION

Before Reveal:

* inspect DOM;
* inspect Network;
* inspect React payload;
* inspect `tel:` links;
* inspect WhatsApp links;
* inspect Client state.

Full contact must be absent.

After approved Reveal:

* full contact appears only in authorized response;
* Reveal event persists;
* quota updates once;
* Lead/timeline updates where required;
* repeat request does not charge again incorrectly;
* wrong user cannot reuse response;
* refresh behavior follows policy.

---

# 66. SELF-ACTION PROTECTION

Test user attempting to:

* enquire on own Property;
* reveal own contact;
* contact own public Profile;
* report own target where prohibited;
* claim own Profile;
* propose to own Requirement where prohibited.

Server must block the action.

---

# 67. PRIVATE FILE VERIFICATION

For each private file:

* open as owner;
* open as authorized Staff;
* open as unrelated user;
* open without login;
* reuse expired signed URL;
* change file ID;
* copy direct URL;
* inspect response headers.

Verify:

* unauthorized denial;
* expiry;
* safe Content-Disposition;
* no permanent public URL;
* no file enumeration.

---

# 68. FILE UPLOAD VERIFICATION

Test:

* valid file;
* invalid MIME;
* renamed extension;
* corrupted image;
* oversized file;
* zero-byte file;
* unsupported PDF;
* duplicate upload;
* interrupted upload;
* retry;
* remove;
* reorder;
* Cover;
* crop;
* authorization expiry;
* attaching another user’s media ID.

Verify database and storage cleanup.

---

# 69. MEDIA ORPHAN TEST

Start upload but do not attach.

Verify:

* temporary state;
* cleanup job;
* no public exposure;
* referenced media is not deleted;
* failed multipart data is cleaned safely.

---

# 70. TRANSACTION VERIFICATION

Force failure between related writes for:

* Submit + moderation;
* Lead stage + timeline;
* assignment + Notification;
* Reveal + quota;
* Proposal + Thread;
* Visit response + Notification;
* Payment + Subscription + Invoice;
* Refund + Credit Note;
* Role Change;
* Claim approval;
* Account Deletion;
* bulk action;
* maker-checker.

Verify:

* rollback;
* recoverable state;
* no silent partial completion;
* retry safety.

---

# 71. IDEMPOTENCY VERIFICATION

Double-click or replay:

* Wizard Submit;
* enquiry;
* Proposal;
* Reveal;
* Message Thread creation;
* Visit Request;
* Visit response;
* Lead stage;
* Payment order;
* webhook;
* Refund;
* Invoice generation;
* Coupon;
* Trial Grant;
* Staff invite;
* verification;
* Claim;
* Ticket;
* Mark All Read;
* Export;
* deletion request;
* moderation;
* Ad submission;
* DLQ retry;
* bulk action;
* maker-checker execution.

Verify one valid effect.

---

# 72. CONCURRENCY VERIFICATION

Use two sessions/windows for:

* two Admin reviewers;
* two Profile claimants;
* two Lead editors;
* two Unit updates;
* final Coupon usage;
* final Plan quota;
* final team seat;
* Payment callback + webhook;
* two checker decisions;
* Ad expiry + pause;
* role approval + withdrawal.

Verify stale action fails safely.

---

# 73. PAGINATION VERIFICATION

For every scalable list:

1. create more than one page;
2. open first page;
3. move next;
4. move back;
5. test direct page/cursor;
6. apply filters;
7. apply search;
8. sort;
9. remove an item;
10. refresh;
11. test mobile load more/infinite scroll where designed.

Verify:

* no duplicate;
* no skipped record;
* stable ordering;
* correct count;
* correct URL state where applicable.

---

# 74. COUNT VERIFICATION

Compare displayed counts against authoritative database queries.

Test counts larger than fetched preview.

Verify:

* dashboard stat;
* tab count;
* unread count;
* active count;
* pending count;
* queue count;
* Plan usage;
* available Units;
* Project count;
* active Trial users;
* Coupon usage.

Do not accept a count derived from the rendered first page.

---

# 75. N+1 VERIFICATION

Use query logs, Network requests or instrumentation.

Test lists with realistic record volume.

Verify no one-query-per-row behavior for:

* Leads;
* Message Threads;
* Projects;
* Users;
* Properties;
* Invoices;
* Notifications;
* CMS rows;
* Location tree;
* Support Tickets;
* Ads.

Record before/after query count when fixing N+1.

---

# 76. PERFORMANCE VERIFICATION

Measure representative routes:

* public Homepage/Search;
* Property Detail;
* Project Detail;
* Owner Overview;
* Broker Leads;
* Builder Units;
* Messages;
* Admin Users;
* moderation queue;
* Payments;
* Audit logs;
* CMS list;
* Location tree.

Verify:

* bounded requests;
* no huge Client payload;
* no unnecessary sequential requests;
* responsive interaction;
* no blocking optional provider;
* optimized images;
* no giant hidden DOM;
* stable loading.

---

# 77. CONSOLE VERIFICATION

Inspect Browser Console for:

* uncaught errors;
* React hydration mismatch;
* key warning;
* accessibility warning;
* failed fetch;
* Service Worker error;
* CSP violation;
* insecure resource;
* provider error;
* deprecated API;
* infinite loop.

Known benign development warnings must be documented.

Production-critical warnings must be fixed.

---

# 78. NETWORK VERIFICATION

Inspect:

* failed requests;
* duplicate requests;
* request waterfall;
* sensitive payload;
* incorrect cache;
* unauthorized prefetch;
* provider response;
* status codes;
* Retry;
* redirect;
* file response;
* Payment verification;
* webhook status where locally observable.

No private route should be prefetched to unauthorized users.

---

# 79. ACCESSIBILITY VERIFICATION

Verify:

* semantic headings;
* one meaningful H1;
* labels;
* field errors;
* keyboard access;
* visible focus;
* focus order;
* dialog semantics;
* screen-reader names;
* image alt;
* button names;
* link purpose;
* table headers;
* status announcements;
* color contrast;
* reduced motion;
* text scaling.

Accessibility Settings do not excuse inaccessible default UI.

---

# 80. KEYBOARD TEST

Navigate without mouse:

* header;
* sidebar;
* bottom navigation where keyboard applicable;
* tabs;
* filters;
* dropdowns;
* menus;
* cards;
* tables;
* pagination;
* modals;
* drawers;
* sheets;
* Gallery;
* forms;
* comparison.

Verify no keyboard trap except intentional modal focus trap.

---

# 81. MODAL VERIFICATION

Test:

* open;
* title;
* focus;
* focus trap;
* Tab;
* Shift+Tab;
* Escape;
* close button;
* outside click;
* body scroll lock;
* background blocked;
* submit;
* validation;
* loading;
* error;
* focus restoration.

Do not close destructive processing accidentally.

---

# 82. BOTTOM-SHEET VERIFICATION

At mobile widths, test:

* drag/close where designed;
* close button;
* scrim;
* focus;
* body scroll;
* internal scroll;
* keyboard;
* safe-area;
* sticky actions;
* outside click;
* destructive confirmation;
* background preservation.

---

# 83. DRAWER VERIFICATION

For desktop right drawers and mobile navigation drawers, verify:

* exact width;
* animation;
* focus;
* close;
* outside click;
* Escape;
* scroll;
* body lock;
* backdrop;
* route state;
* Back behavior;
* focus restoration.

---

# 84. TABLE VERIFICATION

Verify:

* headers;
* column order;
* row data;
* sorting;
* filters;
* selection;
* bulk bar;
* pagination;
* empty;
* loading;
* error;
* mobile transformation;
* accessible labels;
* sticky header;
* sticky column where designed.

Do not hide required row actions on mobile.

---

# 85. SEARCH AND FILTER VERIFICATION

Test:

* exact search;
* partial search;
* case;
* whitespace;
* Gujarati;
* transliteration;
* typo;
* no result;
* clear;
* multiple filters;
* filter reset;
* pagination with filters;
* direct URL state;
* mobile filter sheet;
* outside close.

Search must not only search loaded rows.

---

# 86. STATUS VERIFICATION

For each domain:

* inspect canonical database status;
* inspect displayed label;
* inspect semantic color;
* inspect available actions;
* test transition;
* test terminal state;
* test stale transition;
* test translation.

Do not display raw enum keys.

---

# 87. DATE AND TIME VERIFICATION

Test:

* timezone greeting;
* relative time;
* midnight boundary;
* month boundary;
* year boundary;
* Visit date;
* reminder date;
* Trial expiry;
* Subscription cycle;
* Ad schedule;
* Maintenance schedule;
* CMS publish date;
* Audit timestamp.

Do not use Draft creation time where submission/published time is required.

---

# 88. NOTIFICATION VERIFICATION

Test:

* Notification creation;
* unread count;
* read one;
* read all;
* pagination;
* grouping;
* deep link;
* archived/expired behavior;
* preference;
* provider Active;
* provider missing;
* delivery failed;
* retry/DLQ where applicable.

Internal Notification and external delivery status must remain distinct.

---

# 89. LEAD VERIFICATION

Test:

* enquiry creates one Lead;
* target is correct;
* source is correct;
* role recipient is correct;
* interest is preserved;
* stage is correct;
* timeline exists;
* duplicate enquiry protection;
* listing context;
* Property/Project-wise grouping;
* mobile card;
* desktop table;
* quick detail;
* full detail;
* pagination;
* filters;
* wrong-role denial.

---

# 90. LEAD STAGE VERIFICATION

For every allowed stage:

* update;
* inspect database;
* inspect timeline;
* inspect UI;
* refresh;
* test concurrent change;
* test invalid transition;
* test required close/lost reason;
* test Kanban;
* test mobile fallback.

One stage change must create one timeline event.

---

# 91. LEAD NOTES AND REMINDERS

Test:

* add Note;
* edit;
* pin;
* unpin;
* multiple pages;
* wrong user;
* add Reminder;
* invalid past time;
* timezone;
* complete;
* cancel;
* provider missing;
* internal persistence.

---

# 92. DUPLICATE LEAD MERGE

Test:

* detection;
* compare;
* dismiss;
* merge;
* concurrent merge;
* related Messages;
* Visits;
* Proposals;
* Notes;
* timeline;
* assignee;
* redirect/reference;
* Audit.

No related record may become orphaned.

---

# 93. PROPOSAL VERIFICATION

Test:

* eligible sender;
* wrong role;
* eligible Listing selector;
* no eligible Listing;
* duplicate Proposal;
* quota;
* Submit;
* status;
* view timestamp;
* accept;
* reject;
* withdraw;
* expiry;
* embedded Thread;
* participant privacy.

---

# 94. MESSAGE VERIFICATION

Test:

* Thread creation;
* duplicate-click Thread prevention;
* search;
* filters;
* archive per participant;
* unread;
* read;
* pagination;
* send;
* retry;
* failure;
* attachment;
* typing expiry;
* direct URL denial;
* mobile composer;
* keyboard.

One participant archiving must not archive for all.

---

# 95. MESSAGE PRIVACY

Inspect Thread and Message payloads as:

* participant;
* nonparticipant;
* Staff without sensitive permission;
* authorized Report reviewer.

Verify no unrelated Message content is exposed.

---

# 96. SITE VISIT VERIFICATION

Test:

* Request;
* duplicate Request;
* Accept;
* Reschedule;
* reject reason;
* Cancel;
* reminder;
* Directions;
* private address policy;
* completed;
* feedback;
* conflicting outcome;
* dispute;
* frozen actions;
* Admin resolution.

Verify timeline and Notifications.

---

# 97. SAVED CONTENT VERIFICATION

Test:

* Save;
* duplicate Save;
* remove;
* refresh;
* Guest auth return;
* unavailable item;
* pagination;
* Saved Search;
* alert preference;
* Recently Viewed;
* clear history;
* Comparison entry.

---

# 98. COMPARISON VERIFICATION

Test:

* add first;
* add second;
* add third;
* add fourth;
* attempt fifth;
* remove;
* clear;
* refresh;
* Search navigation;
* Saved navigation;
* Detail navigation;
* unavailable item;
* stale data;
* mobile horizontal scroll;
* pinned label column;
* Noindex.

Use one shared comparison state.

---

# 99. ANALYTICS VERIFICATION

Test:

* real database-derived metric;
* real behavioral metric;
* insufficient data;
* provider missing;
* consent off;
* consent on;
* date range;
* role scope;
* entity scope;
* query error.

Do not accept a decorative chart with generated data.

---

# 100. PROVIDER STATUS VERIFICATION

For every provider:

* no configuration;
* configured untested;
* test success;
* test failure;
* Disabled;
* Test Mode;
* Active;
* Error;
* Degraded;
* credential rotation.

Verify status is backed by real information.

---

# 101. PROVIDER SECRET VERIFICATION

After saving a secret:

* inspect form;
* inspect HTML;
* inspect Network;
* inspect database-return path;
* inspect Audit;
* inspect logs.

The stored secret must not be returned.

Only safe mask/indicator may appear.

---

# 102. PROVIDER TEST CONNECTION

Test:

* unauthorized Staff;
* authorized Staff;
* valid configuration;
* invalid configuration;
* rate limit;
* timeout;
* safe error;
* provider success;
* Audit;
* no unintended production action.

No simulated success is permitted.

---

# 103. PAYMENT VERIFICATION STANDARD

Use Test Mode for normal verification.

Test:

* Plan selection;
* authenticated account;
* server-calculated amount;
* tax;
* Coupon;
* provider order;
* pending;
* Client callback;
* trusted verification;
* webhook;
* capture;
* Payment record;
* Subscription;
* Invoice;
* Notification;
* duplicate callback;
* duplicate webhook;
* amount mismatch;
* currency mismatch;
* invalid signature;
* cancelled payment;
* failed payment.

---

# 104. PAYMENT SUCCESS SECURITY

Attempt to open success with:

* query parameter;
* fake provider ID;
* another user’s Payment ID;
* pending Payment;
* failed Payment.

Verified Success must not render unless the trusted server state qualifies.

---

# 105. CHECKOUT VERIFICATION

Test:

* Guest Plan selection;
* auth return;
* current Plan;
* upgrade;
* downgrade;
* proration;
* add-on;
* valid Coupon;
* invalid Coupon;
* expired Coupon;
* usage limit;
* GST B2C;
* GST B2B;
* State tax;
* total;
* provider missing;
* duplicate pending order;
* refresh.

Client must not control total.

---

# 106. SUBSCRIPTION VERIFICATION

Test states:

* free;
* trial;
* active;
* cancelled;
* expiring;
* expired;
* revoked;
* manual grant;
* upgrade;
* downgrade;
* usage;
* renewal.

Verify entitlement changes are real and server-enforced.

---

# 107. INVOICE VERIFICATION

Verify:

* unique number;
* immutable snapshot;
* billing identity;
* seller identity;
* line items;
* discount;
* proration;
* tax;
* total;
* Payment reference;
* Print;
* PDF;
* private access;
* mobile rendering;
* historical consistency after Plan change.

---

# 108. REFUND VERIFICATION

Test:

* eligible Payment;
* ineligible Payment;
* full Refund;
* partial Refund;
* excessive amount;
* prior Refund;
* remaining amount;
* approve;
* reject;
* provider failure;
* retry;
* duplicate processing;
* Payment status;
* Credit Note;
* Notification;
* Audit.

---

# 109. CREDIT NOTE VERIFICATION

Verify:

* correct Invoice;
* correct Refund;
* amount;
* tax reversal;
* unique number;
* immutable state;
* PDF;
* private access;
* duplicate prevention.

---

# 110. COUPON CONCURRENCY TEST

Set a Coupon with one remaining use.

Attempt simultaneous Checkout from two sessions.

Verify:

* only eligible successful use is counted;
* no negative remaining usage;
* no duplicate redemption;
* correct Payment/Checkout behavior.

---

# 111. TRIAL VERIFICATION

Test:

* eligibility;
* Grant;
* duplicate Grant;
* active count;
* expiry;
* revoke;
* fallback Plan;
* entitlement;
* Notification;
* Audit;
* concurrent Grant.

---

# 112. MANUAL ACTIVATION VERIFICATION

Verify:

* authorized Billing Staff;
* unauthorized Staff;
* selected user;
* Plan;
* duration;
* mandatory reason;
* Subscription source `admin_grant`;
* no Payment;
* no paid Invoice;
* entitlement;
* Notification;
* Audit.

---

# 113. MODERATION VERIFICATION

For Property, Project and Requirement:

* submit revision;
* queue record;
* assigned reviewer;
* preview exact revision;
* checklist;
* approve;
* Needs Changes;
* reject;
* mandatory reason;
* stale review;
* concurrent review;
* public version;
* Notification;
* Audit.

---

# 114. LIVE REVISION VERIFICATION

For an approved/live Property or Project:

1. edit data;
2. submit revision;
3. inspect public route;
4. verify old approved version remains;
5. approve new revision;
6. verify public route changes;
7. verify cache invalidation;
8. verify Search and SEO update.

Do not allow silent live mutation.

---

# 115. VERIFICATION REQUEST TEST

Test:

* not submitted;
* upload;
* Submit;
* Under Review;
* Needs Changes;
* rejected;
* resubmit;
* approved;
* expiry where applicable;
* private document access;
* public badge truth.

Uploading proof alone must not show Verified.

---

# 116. PROFILE CLAIM VERIFICATION

Test:

* claimable Profile;
* claimed Profile;
* Guest auth return;
* required relationship;
* valid PDF/JPG;
* invalid file;
* oversized file;
* private storage;
* duplicate pending;
* competing claim;
* Admin approval;
* Admin rejection;
* ownership assignment;
* public CTA update;
* Audit.

---

# 117. REPORT VERIFICATION

Test:

* Listing Report;
* Profile Report;
* Thread Report;
* Guest Report where allowed;
* category;
* Details;
* invalid target;
* duplicate pending;
* Guest rate limit;
* submit;
* queue;
* safe context;
* Admin decision;
* enforcement;
* Notification/Audit.

---

# 118. SUPPORT VERIFICATION

Test:

* Guest request;
* Guest rate limit;
* authenticated Ticket;
* Ticket list;
* own Ticket;
* cross-user denial;
* Admin queue;
* assignment;
* macro;
* reply;
* Email active;
* Email missing;
* internal Thread;
* resolve;
* reopen;
* pagination;
* attachment privacy.

---

# 119. DATA EXPORT VERIFICATION

Test:

* OTP re-verification;
* invalid OTP;
* request rate limit;
* queue;
* processing;
* ready;
* private Download;
* Download log;
* expiry;
* wrong user;
* failure;
* retry;
* archive cleanup.

---

# 120. ACCOUNT DELETION VERIFICATION

Test:

* typed `DELETE`;
* incorrect confirmation;
* OTP;
* request;
* 30-day grace;
* cancel;
* scheduled processing;
* public Profile state;
* login state;
* personal-data handling;
* financial retention;
* Audit retention;
* Message/Lead integrity;
* final Auth closure.

Do not run irreversible final deletion against valuable test data without a dedicated disposable account.

---

# 121. ADMIN OVERVIEW VERIFICATION

For each Staff profile:

* only permitted cards;
* real counts;
* locked card shows `—`;
* no unauthorized count query;
* oldest queue age;
* role breakdown;
* RERA pending count;
* missing Location count;
* Claims count;
* partial query failure isolation;
* mobile drawer;
* no bottom navigation.

---

# 122. USER MANAGEMENT VERIFICATION

Test:

* search;
* role filter;
* status;
* verification;
* pagination;
* masked contact;
* User Detail;
* entity summaries;
* Subscription summary;
* suspend;
* ban;
* restore;
* reason;
* expiry;
* Notification;
* Audit;
* wrong Staff permission.

---

# 123. STAFF MANAGEMENT VERIFICATION

Test:

* Staff list;
* invite;
* duplicate invite;
* Email missing;
* token expiry;
* accept;
* permission preset;
* custom permission;
* direct route denial;
* suspend;
* revoke;
* activity;
* Audit.

---

# 124. ADS VERIFICATION

Test Builder flow:

* Draft;
* creatives;
* dimensions;
* targeting;
* schedule;
* pricing;
* wallet/payment;
* Submit;
* moderation;
* approve;
* reject;
* active;
* pause;
* expiry;
* analytics;
* provider missing;
* fraud review.

Verify desktop, tablet and mobile creative variants.

---

# 125. AD TARGETING VERIFICATION

Use multiple Cities and campaigns.

Verify:

1. selected/current City match;
2. local approved campaign;
3. fallback behavior;
4. expired campaign excluded;
5. paused campaign excluded;
6. rejected campaign excluded;
7. no campaign hides placement;
8. City data is canonical.

---

# 126. NOTIFICATION TEMPLATE VERIFICATION

Test:

* Draft;
* English;
* Gujarati;
* Hindi pending state;
* controlled tokens;
* invalid token;
* preview;
* publish;
* version;
* delivery;
* missing translation fallback;
* safe HTML/text.

---

# 127. FEATURE FLAG VERIFICATION

Test:

* inactive;
* active;
* All Users;
* role scope;
* percentage rollout;
* internal only;
* deterministic assignment;
* confirmation;
* mandatory note;
* stale change;
* Audit;
* direct server behavior.

A hidden UI does not permit unauthorized Server Action.

---

# 128. MAINTENANCE MODE VERIFICATION

Test:

* immediate activation;
* scheduled activation;
* message;
* expected back;
* public Homepage;
* Search;
* Detail;
* Auth;
* dashboards;
* Admin exception;
* webhook policy;
* background jobs;
* scheduled end;
* manual disable;
* Audit.

Maintenance must be server-enforced.

---

# 129. SYSTEM HEALTH VERIFICATION

For each signal:

* actual healthy;
* actual failing;
* provider missing;
* monitoring absent;
* stale data;
* Retry/refresh;
* safe timestamp.

Do not show fake uptime or green status.

---

# 130. DLQ VERIFICATION

Test:

* failed job;
* attempts;
* safe error;
* Retry;
* duplicate Retry;
* recovery;
* Dismiss where allowed;
* critical financial job governance;
* unauthorized Staff;
* Audit.

---

# 131. CMS VERIFICATION

Test:

* new Page;
* Draft;
* autosave;
* refresh;
* Preview;
* sanitize content;
* media;
* SEO;
* publish;
* revision;
* public route;
* Draft not public;
* cache invalidation;
* Sitemap.

---

# 132. BLOG VERIFICATION

Test:

* Draft Post;
* category;
* featured image;
* author;
* excerpt;
* publish;
* Listing;
* pagination;
* Post;
* related Posts;
* SEO;
* Draft denial;
* unavailable state;
* mobile design.

---

# 133. LEGAL CONTENT VERIFICATION

For every policy:

* correct route;
* published revision;
* version;
* effective date;
* table of contents;
* anchors;
* mobile TOC;
* no Draft;
* no unapproved translation;
* Print where shown;
* canonical;
* Sitemap;
* sign-off revision lock.

Editing a signed revision must invalidate approval for the changed revision.

---

# 134. SEO METADATA VERIFICATION

Inspect rendered source for:

* title;
* description;
* canonical;
* robots;
* Open Graph;
* structured data;
* breadcrumbs.

Test:

* Property;
* Project;
* Broker;
* Builder;
* Owner;
* CMS Page;
* Blog;
* Legal;
* City;
* Locality;
* restricted Requirement;
* Compare;
* dashboard.

Private routes must not leak entity data in metadata.

---

# 135. REDIRECT VERIFICATION

Test:

* valid redirect;
* `301`;
* `302`;
* duplicate source;
* loop;
* chain;
* unsafe external target;
* route conflict;
* disabled redirect;
* cache update;
* count where real.

---

# 136. SITEMAP VERIFICATION

Verify inclusion of eligible:

* Property;
* Project;
* public Profile;
* CMS;
* Blog;
* Legal;
* City/Locality pages.

Verify exclusion of:

* Draft;
* private;
* Requirement;
* dashboard;
* Admin;
* Support Ticket;
* Checkout;
* Payment;
* private Owner;
* Compare if Noindex.

Test regeneration and large-volume batching.

---

# 137. LOCATION VERIFICATION

Test hierarchy:

* State;
* District;
* Taluka;
* City;
* Village;
* Area;
* Locality;
* Society.

Verify:

* parent rules;
* create;
* edit;
* aliases;
* Gujarati;
* Hindi;
* slug;
* search;
* lazy tree;
* move impact;
* duplicate;
* SEO impact;
* Wizard integration.

---

# 138. MISSING LOCATION VERIFICATION

Test:

* user cannot find Location;
* submit request;
* duplicate pending;
* Admin queue;
* duplicate candidates;
* approve/create;
* reject;
* Draft reconnection;
* Notification;
* Audit.

---

# 139. TRANSLATION VERIFICATION

Test:

* English;
* Gujarati;
* Hindi nonselectable/coming state;
* fallback;
* missing;
* stale;
* completed;
* UI strings;
* Server Component strings;
* Client Component strings;
* validation;
* statuses;
* HTML `lang`;
* hydration.

No raw translation key may appear.

---

# 140. THEME VERIFICATION

Test:

* Light;
* Dark;
* System;
* OS change while System active;
* Guest persistence;
* logged-in sync;
* initial paint;
* no flash;
* public routes;
* dashboards;
* modal;
* table;
* error;
* status colors;
* images.

Layout and hierarchy must not change between themes.

---

# 141. COOKIE AND ANALYTICS CONSENT

Test:

* first visit;
* Essential only;
* Accept;
* Reject;
* partial selection;
* reopen;
* change;
* policy version change;
* Analytics provider missing;
* provider active with consent off;
* provider active with consent on;
* Marketing;
* persistence;
* logout/login;
* no tracking before consent.

Accessibility Reset must not clear consent.

---

# 142. PWA INSTALL VERIFICATION

Test:

* unsupported browser;
* first session;
* second eligible session;
* prompt unavailable;
* real native prompt;
* Install accepted;
* dismissed;
* Not Now;
* 30-day snooze;
* already installed;
* standalone mode;
* iOS/platform-specific guidance if designed.

Do not display fake success.

---

# 143. OFFLINE VERIFICATION

Test:

* go offline;
* banner;
* safe cached public page;
* private dashboard behavior;
* mutation attempt;
* Message attempt;
* Payment attempt;
* Reveal attempt;
* reconnect;
* Retry;
* Service Worker unavailable.

High-risk writes must not show fake success offline.

---

# 144. SERVICE WORKER SECURITY

Test:

1. log in;
2. open private pages;
3. log out;
4. go offline;
5. try Back;
6. inspect Cache Storage;
7. try direct private route.

Private content must not remain accessible.

---

# 145. PWA UPDATE VERIFICATION

Test:

* new version available;
* toast;
* Later;
* Update;
* installing;
* ready;
* reload;
* failure;
* unsaved Draft;
* unsent Message;
* active Checkout.

Do not destroy unsaved critical work.

---

# 146. CALCULATOR VERIFICATION

## EMI

Test:

* standard case;
* zero-interest edge;
* invalid principal;
* invalid rate;
* invalid tenure;
* decimal;
* large value;
* reset;
* entity prefill;
* independent calculation comparison.

## Stamp Duty

Test:

* valid configured rule;
* effective date;
* buyer category;
* jurisdiction;
* unavailable rate data;
* disclaimer;
* version change.

## Land Unit

Test:

* all supported units;
* reverse;
* precision;
* invalid input;
* regional variation;
* disclaimer.

---

# 147. ACCESSIBILITY SETTINGS VERIFICATION

Test:

* text size;
* reduced motion;
* contrast;
* persistence;
* reset;
* mobile sheet;
* keyboard;
* public pages;
* dashboards;
* forms;
* tables;
* modal;
* Gujarati.

Reset must not affect Theme, language or consent unless explicitly designed.

---

# 148. DESIGN BATCH 4 VERIFICATION

## Property Detail

Verify:

* breadcrumb;
* Gallery proportions;
* image count;
* Price;
* verification badge;
* title;
* facts;
* description;
* Read More;
* Amenities;
* Map/fallback;
* similar cards;
* seller card;
* masked contact;
* Reveal;
* enquiry;
* Save;
* Share;
* Report;
* mobile Carousel;
* sticky CTA;
* unavailable tombstone;
* SEO.

## Project Detail

Verify:

* hero;
* Builder;
* RERA registered/verified distinction;
* tabs;
* Units;
* Floor Plans;
* milestones;
* Video;
* 360 Tour;
* Map;
* brochure PDF;
* enquiry;
* Site Visit;
* similar Projects;
* Builder mini card;
* mobile sticky CTA.

## Requirement Detail

Verify:

* eligible full view;
* Guest teaser;
* unauthorized state;
* masked requester;
* Proposal;
* Noindex;
* Sitemap exclusion.

## Profiles

Verify Broker, Builder and Owner:

* safe data;
* exact counts;
* contact privacy;
* tabs;
* claimable state;
* pagination;
* SEO.

## Claim, Report, Gallery and Compare

Verify exact overlay/full-screen behavior, private files, rate limits, real media and persistent Comparison.

---

# 149. DESIGN BATCH 5 VERIFICATION

## Property Wizard

Verify:

* all nine exact steps;
* progress;
* Draft;
* autosave;
* resume;
* validation;
* Location;
* media;
* Preview;
* Plan gate;
* Submit;
* reapproval;
* duplicate protection;
* Owner/Broker scope.

## Project Wizard

Verify:

* all ten steps;
* Builder identity;
* RERA;
* structure;
* Unit generation twice;
* media;
* brochure;
* Floor Plans;
* Video;
* Tour;
* Preview;
* Submit;
* reapproval.

## Requirement Wizard

Verify:

* seven steps;
* multi-location;
* limit;
* Missing Location;
* Draft;
* Preview;
* Submit;
* privacy.

## Unit Inventory

Verify desktop table, mobile accordion/cards, Unit edit, bulk actions, concurrency and public inventory consistency.

---

# 150. DESIGN BATCH 6 VERIFICATION

Verify all Owner screens:

1. Overview;
2. My Properties;
3. My Requirements;
4. Leads;
5. quick Lead Detail;
6. Message list;
7. Thread;
8. Visit list;
9. Visit Detail;
10. Saved Properties;
11. Saved Searches;
12. Recently Viewed;
13. Analytics;
14. Subscription;
15. Invoices;
16. Invoice Detail;
17. Pricing/Upgrade;
18. Verification;
19. Profile;
20. Notifications;
21. Support;
22. Settings;
23. Role Change;
24. Data Export and deletion.

Verify Owner shell across every subpage.

---

# 151. DESIGN BATCH 7 VERIFICATION

Verify all Broker screens:

1. Overview;
2. My Properties;
3. Wizard entry/Draft Resume;
4. My Requirements;
5. Requirement Feed;
6. Proposal list;
7. Proposal Detail;
8. Send Proposal;
9. CRM list;
10. CRM Kanban;
11. quick Lead Detail;
12. Messages;
13. Site Visits;
14. Saved;
15. Analytics;
16. Billing;
17. Invoices;
18. Verification;
19. Profile;
20. Notifications;
21. Support;
22. Settings.

Verify Broker-specific counts and functionality, not Owner data with changed labels.

---

# 152. DESIGN BATCH 8 VERIFICATION

Verify all Builder screens:

1. Overview;
2. Projects;
3. Project entry/reapproval;
4. Unit Inventory;
5. Unit Edit;
6. Project Leads;
7. Lead Detail;
8. Requirement Feed;
9. Proposals;
10. Messages;
11. Site Visits;
12. Team;
13. Invite;
14. Permissions;
15. Ad list;
16. Ad creation;
17. Ad Detail;
18. Ad Analytics;
19. Project Analytics;
20. Billing/wallet;
21. Invoices;
22. RERA/verification;
23. Company Microsite;
24. construction progress;
25. Notifications;
26. Support;
27. Settings.

Verify team permission enforcement and Unit consistency.

---

# 153. DESIGN BATCH 9 VERIFICATION

Verify:

* full Lead Detail;
* Notes;
* Follow-Up;
* close/lost reason;
* duplicate detection;
* Contact Reveal;
* Proposal Full Detail;
* Message list;
* Thread;
* Report Thread;
* Visit Request;
* Visit response;
* reminder;
* feedback;
* dispute.

Verify shared modules inside Owner, Broker and Builder shells.

---

# 154. DESIGN BATCH 10 VERIFICATION

Verify:

* public Pricing;
* Subscription Overview;
* Trial;
* Change Plan;
* Checkout;
* Razorpay/provider UI;
* processing;
* verified success;
* failure;
* pending detection;
* Invoice list;
* Invoice Detail;
* Refund;
* GST;
* manual activation display.

Verify trusted financial state.

---

# 155. DESIGN BATCH 11 VERIFICATION

Verify:

* permission-aware Admin Overview;
* forbidden module;
* Users;
* User Detail;
* suspend/ban;
* Role Change queue/detail;
* Staff;
* invite;
* permissions;
* activity;
* Property moderation;
* Project moderation;
* Requirement moderation;
* Missing Location;
* duplicate Listing;
* Claim review;
* verification queue;
* verification Detail;
* Support queue;
* Support Detail.

---

# 156. DESIGN BATCH 12 VERIFICATION

Verify:

* Subscriptions;
* Subscription Detail;
* Payments;
* Payment Detail;
* webhook events;
* Refund queue;
* Refund Detail;
* Credit Notes;
* manual activation;
* Invoices/export;
* Invoice correction;
* Plans;
* Plan editor/Preview;
* Coupons;
* Coupon editor;
* Trial Campaigns;
* Trial Grant/Revoke.

---

# 157. DESIGN BATCH 13 VERIFICATION

Verify:

* Ads queue;
* Ad review;
* Ad management;
* Ad fraud;
* Notification Templates;
* Template editor;
* delivery logs;
* preference defaults;
* provider dashboard;
* Provider Detail;
* Feature Flags;
* toggle confirmation;
* Maintenance control;
* public Maintenance page;
* System Health;
* DLQ.

---

# 158. DESIGN BATCH 14 VERIFICATION

Verify:

* CMS Pages;
* Page editor;
* Blog list;
* Blog editor;
* Legal list/editor;
* SEO metadata;
* Redirects;
* Redirect editor;
* Sitemap;
* Location tree;
* Location editor;
* Missing Translation tracker.

Verify public integration after publication.

---

# 159. DESIGN BATCH 15 VERIFICATION

Verify:

* Audit;
* Security Events;
* Reports queue;
* Report Detail;
* duplicate Lead review;
* Reveal logs;
* Message Report;
* Visit Dispute;
* Business Metrics;
* Exports;
* Bulk Action;
* Maker-Checker.

Verify sensitive permissions and append-only behavior.

---

# 160. DESIGN BATCH 16 VERIFICATION

Verify:

* About;
* Contact;
* Help;
* Safety;
* 11 Legal policies;
* Blog Listing;
* Blog Post;
* Guest Support;
* My Tickets;
* Ticket Thread;
* Cookie Preferences.

Verify published CMS authority and public canonical routes.

---

# 161. DESIGN BATCH 17 VERIFICATION

Verify:

* PWA Install;
* Offline Banner;
* Language;
* Theme;
* transliteration Search;
* EMI Calculator;
* Stamp Duty Calculator;
* Land Unit Converter;
* Comparison Tray;
* Comparison table;
* Analytics Consent;
* PWA Update;
* Accessibility Settings;
* final global responsive/accessibility consistency.

---

# 162. PHASE 1 VERIFICATION — AUDIT, MAPPING AND SHARED FOUNDATIONS

Phase 1 cannot pass until:

* all HTML files discovered;
* duplicate design files resolved;
* every screen mapped;
* every route mapped;
* every shell mapped;
* current routes audited;
* old duplicate routes identified;
* design tokens extracted;
* shared responsive foundation works;
* auth modal/sheet foundation works;
* role guards work;
* public-safe data strategy exists;
* RLS baseline passes;
* private storage baseline passes;
* provider registry baseline works;
* no critical old UI conflict remains in shared shells.

Run the Master Screen Registry Audit Report.

---

# 163. PHASE 2 VERIFICATION — PUBLIC, AUTH, SEARCH, DETAIL AND POSTING

Phase 2 cannot pass until:

* public shell passes;
* auth return intent passes;
* Search passes;
* Property Detail passes;
* Project Detail passes;
* Requirement Detail passes;
* Broker/Builder/Owner Profiles pass;
* Claim passes;
* Report passes;
* Gallery passes;
* Compare passes;
* Property Wizard passes;
* Project Wizard passes;
* Requirement Wizard passes;
* Unit Inventory foundation passes;
* moderation handoff exists;
* public payload privacy passes;
* SEO baseline passes.

---

# 164. PHASE 3 VERIFICATION — ROLE DASHBOARDS

Phase 3 cannot pass until:

* Owner shell and all Owner screens pass;
* Broker shell and all Broker screens pass;
* Builder shell and all Builder screens pass;
* role bottom navigation passes;
* mobile drawers pass;
* shared Lead/Message/Visit contracts pass;
* dashboard counts are real;
* pagination passes;
* analytics states are honest;
* Billing entry points connect correctly;
* Notifications deep-link correctly;
* direct role/ownership denials pass.

---

# 165. PHASE 4 VERIFICATION — SHARED OPERATIONS, BILLING AND ADMIN

Phase 4 cannot pass until:

* full Lead workspace passes;
* Proposal passes;
* Messages pass;
* Site Visits pass;
* Pricing/Checkout passes;
* trusted Payment passes;
* Subscription passes;
* Invoices pass;
* Refund/Credit Note passes;
* Admin Users/Staff passes;
* moderation passes;
* verification passes;
* Support passes;
* Ads passes;
* provider management passes;
* Feature Flags pass;
* Maintenance passes;
* system health/DLQ pass;
* Admin Billing passes;
* Audit/security/report/export/maker-checker passes.

---

# 166. PHASE 5 VERIFICATION — CMS, PUBLIC CONTENT, PWA AND RELEASE

Phase 5 cannot pass until:

* CMS passes;
* Blog passes;
* Legal sign-off passes;
* SEO metadata passes;
* Redirects pass;
* Sitemap passes;
* Locations pass;
* translations pass;
* public content passes;
* Support public flow passes;
* Cookie Consent passes;
* PWA passes;
* Theme/language/accessibility passes;
* calculators pass;
* Comparison final behavior passes;
* final cross-Batch regression passes;
* production configuration passes.

---

# 167. CROSS-BATCH PROPERTY FLOW

Run:

Property Wizard
→ Draft
→ autosave
→ private Preview
→ Submit
→ moderation
→ Approval
→ public Detail
→ Search
→ Save
→ Reveal/Enquiry
→ Lead
→ Message
→ Visit
→ Dashboard
→ Notification
→ mark sold/rented
→ unavailable tombstone.

Inspect every database relation.

---

# 168. CROSS-BATCH PROJECT FLOW

Run:

Project Wizard
→ RERA validation
→ Unit generation
→ Unit management
→ media/Brochure
→ Preview
→ Submit
→ moderation
→ public Project
→ Builder Microsite
→ Project enquiry
→ Lead
→ Message
→ Visit
→ progress update
→ public milestone update.

---

# 169. CROSS-BATCH REQUIREMENT FLOW

Run:

Requirement Wizard
→ moderation
→ restricted Detail/Feed
→ Proposal
→ Proposal Detail
→ Thread
→ Lead/CRM
→ Visit where applicable
→ close/expire.

Verify privacy at each stage.

---

# 170. CROSS-BATCH BILLING FLOW

Run:

Pricing
→ select Plan
→ auth return
→ Checkout
→ Coupon
→ GST
→ provider order
→ callback
→ webhook
→ Payment
→ Subscription
→ entitlement
→ Invoice
→ PDF
→ Refund Request
→ Admin decision
→ provider Refund
→ Credit Note
→ reconciliation.

---

# 171. CROSS-BATCH SUPPORT FLOW

Run:

Guest/User Support
→ Ticket
→ Admin queue
→ assignment
→ Staff reply
→ Notification
→ external provider state
→ user Ticket Thread
→ resolve
→ reopen where allowed.

---

# 172. CROSS-BATCH CLAIM FLOW

Run:

unclaimed public Profile
→ Claim
→ auth return
→ private proof
→ Admin Claim Review
→ competing Claim scenario
→ approval
→ ownership assignment
→ public Profile CTA update
→ Audit.

---

# 173. CROSS-BATCH AD FLOW

Run:

Builder Campaign
→ creative upload
→ targeting
→ Payment/wallet
→ Submit
→ Admin review
→ approval
→ schedule
→ active placement
→ City targeting
→ analytics
→ fraud review
→ pause/expiry.

---

# 174. CROSS-BATCH CONTENT FLOW

Run:

Admin CMS/Blog/Legal Draft
→ autosave
→ Preview
→ sign-off where required
→ Publish
→ public route
→ SEO
→ canonical
→ Sitemap
→ cache invalidation
→ translation fallback.

---

# 175. CROSS-BATCH ROLE CHANGE FLOW

Run:

Owner request
→ impact warning
→ pending
→ Admin review
→ subscription/verification handling
→ approval
→ role history
→ Broker access
→ old route denial/redirect
→ Notification
→ Audit.

Test withdrawal and concurrent review.

---

# 176. CROSS-BATCH DELETION FLOW

Run with disposable account:

Danger Zone
→ typed confirmation
→ OTP
→ request
→ grace period
→ cancel.

For final processing, verify safely in a dedicated isolated environment:

* public content;
* personal data;
* Auth;
* retention;
* financial records;
* Audit;
* communication integrity.

---

# 177. SHARED COMPONENT REGRESSION

When a shared component changes, retest every consumer.

Examples:

## Auth

Retest Save, Enquiry, Reveal, Pricing, Claim and Requirement.

## Location

Retest Property, Project, Requirement, Search, SEO, Ads and Admin Location.

## Media

Retest Property, Project, Claim, verification, Message, Support and Ads.

## Lead

Retest Owner, Broker, Builder and Admin duplicate review.

## Messages

Retest Owner, Broker, Builder, Proposal and Reports.

## Billing

Retest Owner, Broker, Builder and Admin.

## Notification

Retest all deep links and provider logs.

---

# 178. OLD UI REMOVAL AUDIT

Search repository and browser for:

* old header;
* old dashboard sidebar;
* old bottom navigation;
* generic old cards;
* duplicate Lead page;
* old Messages;
* old Billing;
* placeholder Admin;
* hard-coded Legal;
* old Comparison;
* old profile pages;
* legacy role navigation;
* hidden conflicting markup.

Open obsolete routes directly.

No old conflicting design may remain accessible.

---

# 179. DEAD ACTION AUDIT

Search code and manually verify:

* `href="#"`;
* empty handler;
* `console.log` action;
* disabled required button;
* TODO;
* Coming Soon;
* fake timeout;
* fake success;
* hard-coded sample count;
* static fake table;
* fake chart;
* fake provider state.

Every required visible action must work.

---

# 180. RESPONSIVE REGRESSION MATRIX

Retest representative screens:

## Public

* Property Detail;
* Project Detail;
* Requirement teaser;
* Pricing;
* Blog;
* Legal.

## Owner

* Overview;
* Properties;
* Leads;
* Thread;
* Billing;
* Settings.

## Broker

* Overview;
* CRM table;
* Kanban;
* Feed;
* Proposal.

## Builder

* Overview;
* Projects;
* Units;
* Team;
* Ads.

## Admin

* Overview;
* Users;
* moderation Detail;
* Payments;
* CMS editor;
* Audit.

At all required widths.

---

# 181. ACCESSIBILITY REGRESSION MATRIX

Test:

* public header;
* role sidebar;
* Admin drawer;
* auth modal;
* Report modal;
* Claim sheet;
* Wizard;
* tabs;
* Gallery;
* table;
* Kanban fallback;
* Message composer;
* Checkout;
* Invoice;
* Cookie Preferences;
* Accessibility Settings.

---

# 182. SECURITY REGRESSION MATRIX

Retest:

* contact initial payload;
* private file;
* wrong role;
* cross-user route;
* participant Thread;
* Invoice;
* Admin module;
* Staff action;
* provider secrets;
* Payment success;
* Service Worker logout cache;
* Export URL;
* signed URL expiry;
* open redirect;
* rate limits.

---

# 183. PERFORMANCE REGRESSION MATRIX

Retest with realistic volume:

* Search results;
* Owner Properties;
* Leads;
* Messages;
* Units;
* Admin Users;
* moderation queues;
* Payments;
* Audit;
* Notifications;
* Blog;
* Location tree.

Verify:

* pagination;
* count queries;
* N+1;
* bounded payload;
* no major degradation.

---

# 184. PRODUCTION ENVIRONMENT CHECK

Before production release, verify:

* production environment selected;
* development OTP disabled;
* fake data removed;
* test bypass disabled;
* provider Test/Live mode correct;
* production URLs correct;
* database URL correct;
* service-role secret server-only;
* public environment variables safe;
* Payment webhook URL correct;
* redirect URLs correct;
* storage buckets correct;
* CORS correct;
* CSP correct;
* cookie settings secure;
* domain/host routing correct;
* error monitoring configured or honest;
* analytics consent integrated;
* scheduled jobs configured;
* backup configured;
* restore tested or documented.

---

# 185. PRODUCTION DATABASE CHECK

Verify:

* all migrations applied;
* no pending migration;
* indexes present;
* constraints present;
* RLS enabled;
* policies correct;
* functions secured;
* service-role use limited;
* seed/test records removed where required;
* backup taken;
* rollback/recovery plan exists;
* connection pooling configured;
* query limits appropriate.

---

# 186. PRODUCTION STORAGE CHECK

Verify:

* public buckets contain only public assets;
* private buckets remain private;
* signed URL expiry;
* upload limits;
* media processor;
* CDN;
* orphan cleanup;
* malware/security process where configured;
* CORS;
* file headers;
* retention.

---

# 187. PRODUCTION PROVIDER CHECK

For each provider:

* correct credentials;
* correct mode;
* server-side storage;
* Test Connection;
* last successful test;
* failure state;
* rate limit;
* webhook;
* fallback;
* safe logging;
* no secret exposure.

Do not activate production with fake provider success.

---

# 188. PRODUCTION PAYMENT CHECK

Verify:

* correct Live/Test mode;
* Plan prices;
* currency;
* tax;
* webhook signature;
* success route;
* failure route;
* duplicate detection;
* Invoice number sequence;
* Refund;
* reconciliation;
* Audit;
* support escalation.

Perform only approved low-risk smoke transactions.

---

# 189. PRODUCTION SEO CHECK

Verify:

* production domain;
* canonical domain;
* robots;
* Sitemap;
* no staging URL;
* no localhost;
* no private route indexing;
* correct structured data;
* public metadata;
* Redirects;
* 404;
* unavailable tombstone;
* Open Graph assets.

---

# 190. PRODUCTION PWA CHECK

Verify:

* manifest URLs;
* icons;
* Service Worker scope;
* cache version;
* update;
* offline fallback;
* logout cache;
* production asset paths;
* installation;
* no staging cache conflict.

---

# 191. PRODUCTION OBSERVABILITY CHECK

Verify:

* error tracking;
* job monitoring;
* webhook monitoring;
* Payment failure alert;
* provider failure alert;
* DLQ alert;
* backup status;
* security event capture;
* safe logs;
* correlation IDs.

When monitoring is unavailable, document the blocker and do not show fake System Health.

---

# 192. BACKUP AND ROLLBACK CHECK

Before release:

* create database backup;
* verify backup timestamp;
* verify storage backup/retention;
* record deployed commit;
* record migrations;
* record environment changes;
* record provider changes;
* define rollback steps;
* define forward-fix steps;
* identify irreversible migrations;
* confirm maintenance communication.

---

# 193. DEPLOYMENT CHECK

Verify:

* clean production build;
* deployment succeeds;
* migrations succeed;
* no runtime startup error;
* health route;
* public Homepage;
* authentication;
* representative dashboard;
* Admin access;
* provider callback;
* Service Worker;
* cache invalidation;
* logs.

---

# 194. POST-DEPLOYMENT SMOKE TEST

Immediately after deployment, test:

1. Homepage;
2. Search;
3. Property Detail;
4. Project Detail;
5. Login;
6. Owner dashboard;
7. Broker dashboard;
8. Builder dashboard;
9. Admin Overview;
10. one real-safe database write;
11. one Notification;
12. one file access;
13. Pricing;
14. provider status;
15. public Legal;
16. Sitemap;
17. logout;
18. private route denial;
19. Console;
20. server logs.

---

# 195. FINAL PRODUCTION RECONCILIATION

Run only after every phase is PASS.

Do not trust prior phase reports.

Re-run representative browser flows and inspect actual database/provider behavior.

Mandatory audit:

1. no mixed old/new UI;
2. no hidden conflicting component;
3. no invented shell;
4. no missing registered screen;
5. complete Property flow;
6. complete Project flow;
7. complete Requirement flow;
8. complete Lead/Message/Visit flow;
9. complete Billing flow;
10. complete Admin flow;
11. complete CMS/public-content flow;
12. contact privacy;
13. private documents;
14. write-only secrets;
15. RLS;
16. direct URL/API denial;
17. sensitive-access Audit;
18. pagination;
19. complete count queries;
20. no first-100-as-complete logic;
21. no material N+1;
22. provider Setup Required states;
23. responsive navigation;
24. accessibility;
25. localization;
26. consent;
27. PWA safety;
28. lint;
29. typecheck;
30. production build.

---

# 196. FINAL COMPLETION BLOCKERS

Do not release while any of the following remains:

* missing required screen;
* incomplete screen bottom section;
* extra old header/sidebar/footer;
* mixed old/new UI;
* dead required action;
* `href="#"`;
* fake success;
* fake count;
* fake analytics;
* fake Payment;
* fake provider Active state;
* full phone in initial payload;
* public private document;
* cross-user data exposure;
* broken RLS;
* wrong role access;
* Client-authoritative Payment;
* duplicate high-impact action;
* stale approval;
* unbounded Admin list;
* first 100 treated as total;
* material N+1;
* wrong mobile shell;
* mobile overlap;
* horizontal overflow;
* keyboard-covered action;
* inaccessible modal;
* Draft content publicly exposed;
* private route indexed;
* development OTP enabled in production;
* test Payment mode mislabeled;
* provider secret exposed;
* Service Worker caches private data after logout;
* analytics loads before consent;
* failed lint;
* failed typecheck;
* failed production build;
* known Critical or High defect.

---

# 197. PHASE IMPLEMENTATION REPORT FORMAT

After implementation, return:

## PHASE IMPLEMENTATION REPORT

* Phase:
* Authority files read:
* Exact design files inspected:
* Registered screens implemented:
* Current routes inspected:
* Existing backend inspected:
* Preserve items:
* Replace items:
* Rebuild items:
* Files created:
* Files changed:
* Files removed:
* Routes completed:
* Shared components:
* Migrations:
* RLS changes:
* Constraints/indexes:
* Server Actions/APIs:
* Provider dependencies:
* Honest provider states:
* Security/privacy work:
* Responsive work:
* Accessibility work:
* Automated tests:
* Lint:
* Typecheck:
* Production build:
* Known issues:
* External blockers:
* Phase status: IMPLEMENTED / PARTIAL / BLOCKED

Stop after this report and wait for separate verification.

---

# 198. PHASE MANUAL VERIFICATION REPORT FORMAT

## PHASE MANUAL VERIFICATION REPORT

* Phase:
* Verification date:
* Application URL:
* Browser:
* Authority files checked:
* Design HTML files compared:
* Registry IDs verified:
* Routes/screens tested:
* Guest result:
* Owner result:
* Broker result:
* Builder result:
* Staff result:
* Super Admin result:
* 320px result:
* 360px result:
* 390px result:
* 430px result:
* 768px result:
* 1024px result:
* 1280px result:
* 1366px result:
* 1440px result:
* Loading result:
* Empty result:
* Filtered-empty result:
* Error/Retry result:
* Unauthorized result:
* Forbidden result:
* Setup Required result:
* Forms tested:
* Functional actions tested:
* Database writes inspected:
* Network payloads inspected:
* Console inspected:
* RLS result:
* Ownership result:
* Participant result:
* Private-file result:
* Contact privacy result:
* Provider result:
* Financial result:
* Pagination/count result:
* N+1/performance result:
* Idempotency result:
* Concurrency result:
* Accessibility result:
* PWA/consent result:
* SEO result:
* Bugs found:
* Critical defects:
* High defects:
* Medium defects:
* Low defects:
* Fixes applied:
* Focused retest:
* Shared regression:
* Lint after fixes:
* Typecheck after fixes:
* Production build after fixes:
* External blockers:
* Remaining issues:
* Final phase status: PASS / FAIL / BLOCKED

---

# 199. BATCH INTEGRATION REPORT FORMAT

## BATCH INTEGRATION VERIFICATION REPORT

* Design Batch:
* Passed sections rechecked:
* Cross-section flows tested:
* Roles tested:
* Responsive widths tested:
* Design regressions:
* Functional regressions:
* Database regressions:
* Security/RLS regressions:
* Privacy regressions:
* Provider regressions:
* Financial regressions:
* Pagination/performance result:
* Accessibility result:
* Bugs found:
* Fixes applied:
* Retest result:
* Lint:
* Typecheck:
* Production build:
* Remaining blockers:
* Final Batch status: PASS / FAIL / BLOCKED

---

# 200. MASTER SCREEN REGISTRY AUDIT REPORT FORMAT

## MASTER SCREEN REGISTRY AUDIT REPORT

* HTML files discovered:
* Expected files found:
* Additional files found:
* Duplicate design files:
* Final authority chosen:
* Total screen groups:
* Desktop targets:
* Tablet targets:
* Mobile targets:
* Modals:
* Drawers:
* Bottom sheets:
* Fullscreen overlays:
* Loading states:
* Empty states:
* Error states:
* Setup Required states:
* Unmapped screens:
* Missing design sources:
* Missing routes:
* Duplicate current routes:
* Shell conflicts:
* Old UI conflicts:
* Registry status: COMPLETE / INCOMPLETE / BLOCKED

---

# 201. FINAL PRODUCTION RELEASE REPORT FORMAT

## FINAL PRODUCTION RELEASE REPORT

* Release candidate:
* Branch:
* Commit:
* Deployment environment:
* Production URL:
* Authority files:
* Design registry status:
* Phase 1 status:
* Phase 2 status:
* Phase 3 status:
* Phase 4 status:
* Phase 5 status:
* Cross-Batch reconciliation:
* Public flow result:
* Owner flow result:
* Broker flow result:
* Builder flow result:
* Admin result:
* Billing result:
* CMS/public content result:
* Security/RLS result:
* Contact privacy result:
* Private storage result:
* Provider result:
* Payment result:
* Refund/Invoice result:
* SEO/Sitemap result:
* Consent result:
* PWA result:
* Accessibility result:
* Localization result:
* Responsive result:
* Performance result:
* Pagination/count result:
* N+1 result:
* Lint:
* Typecheck:
* Production build:
* Migrations:
* Backup:
* Rollback readiness:
* Post-deployment smoke test:
* Critical defects:
* High defects:
* Accepted lower defects:
* External provider blockers:
* Final decision: RELEASE APPROVED / RELEASE REJECTED / EXTERNALLY BLOCKED

---

# 202. FINAL MASTER CHECKLIST

## Design

* [ ] Every HTML file inspected completely
* [ ] Every screen mapped
* [ ] Every route uses correct design
* [ ] Entire screen top-to-bottom implemented
* [ ] No presentation wrapper copied
* [ ] No old conflicting UI
* [ ] Correct shell
* [ ] Correct desktop
* [ ] Correct tablet
* [ ] Correct mobile
* [ ] Correct overlays
* [ ] Correct states
* [ ] No extra header/sidebar/footer

## Functionality

* [ ] Every visible action works
* [ ] No `href="#"`
* [ ] No empty handler
* [ ] No permanent required Coming Soon
* [ ] Forms persist
* [ ] Drafts resume
* [ ] Errors recover
* [ ] Refresh preserves state
* [ ] Deep links work
* [ ] Browser history works

## Data

* [ ] Real data
* [ ] Real counts
* [ ] Real dates
* [ ] Real statuses
* [ ] Real analytics or honest unavailable state
* [ ] Actual database writes verified
* [ ] No duplicate domain system
* [ ] No orphan records
* [ ] Correct revisions

## Security

* [ ] Auth server-backed
* [ ] Role enforced
* [ ] Ownership enforced
* [ ] Participant scope enforced
* [ ] Staff capability enforced
* [ ] RLS verified
* [ ] Direct URL denied
* [ ] Direct action denied
* [ ] Sensitive payload absent
* [ ] Contact masked
* [ ] Private files protected
* [ ] Secrets write-only
* [ ] Service-role server-only

## Reliability

* [ ] Transactions verified
* [ ] Idempotency verified
* [ ] Concurrency verified
* [ ] Stale state rejected
* [ ] Retry safe
* [ ] Background jobs durable
* [ ] DLQ verified
* [ ] Audit created

## Performance

* [ ] Pagination
* [ ] Complete count queries
* [ ] No first-100 assumption
* [ ] No material N+1
* [ ] Bounded payloads
* [ ] Optimized media
* [ ] Failure isolation
* [ ] Scalable Location tree
* [ ] Scalable Admin lists

## Financial

* [ ] Server-calculated amount
* [ ] Trusted provider verification
* [ ] Webhook signature
* [ ] Idempotent webhook
* [ ] Subscription consistency
* [ ] Invoice immutable
* [ ] Refund safe
* [ ] Credit Note correct
* [ ] Manual grant has no fake Payment

## Providers

* [ ] Honest status
* [ ] Real Test Connection
* [ ] Safe errors
* [ ] No secret response
* [ ] Missing-provider fallback
* [ ] Correct Test/Live mode
* [ ] Delivery state honest

## Content and SEO

* [ ] Published revision only
* [ ] Draft not public
* [ ] Legal sign-off exact revision
* [ ] Canonical correct
* [ ] Robots correct
* [ ] Sitemap correct
* [ ] Redirect loops blocked
* [ ] Cache invalidated
* [ ] Translation fallback correct

## PWA and consent

* [ ] Real install eligibility
* [ ] Offline state real
* [ ] No false offline mutation success
* [ ] Private cache cleared after logout
* [ ] Update flow safe
* [ ] No analytics before consent
* [ ] Consent changeable
* [ ] Theme persists
* [ ] Language persists
* [ ] Accessibility settings work

## Release

* [ ] Lint passes
* [ ] Typecheck passes
* [ ] Production build passes
* [ ] Migrations applied
* [ ] Backup complete
* [ ] Rollback ready
* [ ] Production providers verified
* [ ] Post-deployment smoke test passes
* [ ] No Critical defect
* [ ] No High defect
* [ ] Final release report approved

---

# 203. FINAL NON-NEGOTIABLE STATEMENT

My Gujarat Property must not be marked complete merely because the code compiles or the main route opens.

Every registered screen must be opened in the running application and compared directly with the exact approved HTML design from its actual top boundary to its actual bottom boundary.

Every visible control must be tested.

Every persistent action must be verified in the database.

Every sensitive screen must be inspected through Browser Network payloads.

Every protected route must be tested using the wrong role, wrong owner, wrong participant and direct action attempt.

Every high-impact action must be tested for duplicate, stale and concurrent execution.

Every provider-dependent module must show either real verified behavior or an honest Setup Required/fallback state.

Every financial success must come from trusted server/provider verification.

Every required mobile screen must pass at `390px`, with edge-width checks at `320px`, `360px` and `430px`.

Every major screen must pass tablet and desktop verification.

When any defect is discovered:

**Fix → Focused Retest → Shared Regression → Lint → Typecheck → Production Build → Recheck.**

Final production release requires:

**Exact Design + Complete Functionality + Real Persistence + Secure Authorization + RLS + Privacy + Private Storage + Transaction Safety + Idempotency + Concurrency Safety + Provider Honesty + Financial Integrity + Scalable Pagination + Accurate Counts + No Material N+1 + Responsive Quality + Accessibility + Localization + Consent + PWA Safety + SEO + CMS Publishing Integrity + Production Configuration + Backup + Rollback + Post-Deployment Smoke Test.**

---

