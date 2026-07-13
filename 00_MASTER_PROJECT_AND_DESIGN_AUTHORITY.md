

# `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`

# MY GUJARAT PROPERTY

## MASTER PROJECT, DESIGN AUTHORITY, IMPLEMENTATION AND QUALITY RULES

**File status:** FINAL MASTER AUTHORITY
**Project root:** `C:\mgpweb`
**Approved design directory:** `C:\mgpweb\newdesign`
**Applies to:** Entire My Gujarat Property website and application
**Applies to:** All public pages, authentication, posting flows, dashboards, shared modules, billing, Admin, Super Admin, CMS, public content, PWA, localization and production release
**Execution model:** Phase Implementation → Separate Phase Verification → Fix → Retest → PASS → Next Phase

---

# 1. DOCUMENT PURPOSE

This document is the global authority for implementing the approved My Gujarat Property design into the existing application.

It defines the rules that apply to every:

* route,
* screen,
* responsive variant,
* component,
* interaction,
* form,
* modal,
* drawer,
* bottom sheet,
* table,
* card,
* dashboard,
* public page,
* authentication flow,
* database operation,
* provider integration,
* Admin action,
* security rule,
* verification step,
* and production release decision.

This document must be read completely before implementation begins.

This document must not be used as permission to rebuild the project blindly.

The project already contains:

* application routes,
* frontend components,
* backend logic,
* database tables,
* migrations,
* Row Level Security policies,
* Server Actions,
* provider abstractions,
* authentication,
* permissions,
* shared modules,
* and partial implementations.

The objective is to:

1. preserve secure and compatible functionality;
2. remove or replace conflicting visual presentation;
3. rebuild missing or incorrect behavior;
4. implement the exact approved HTML design;
5. connect every visible control to real application functionality;
6. complete responsive, security and manual verification;
7. prepare the application for production release.

---

# 2. ABSOLUTE PRIMARY INSTRUCTION

The HTML design files inside:

`C:\mgpweb\newdesign`

are the final visible design authority.

For each application route, Claude must identify the corresponding screen inside the approved HTML design file and implement that screen exactly from top to bottom.

The complete visible product UI inside the relevant design screen must be followed, including:

* starting point of the screen,
* ending point of the screen,
* header presence or absence,
* sidebar presence or absence,
* top bar,
* navigation,
* breadcrumbs,
* page title,
* section order,
* content hierarchy,
* cards,
* forms,
* fields,
* tabs,
* filters,
* tables,
* lists,
* actions,
* badges,
* status indicators,
* informational notices,
* sticky actions,
* bottom navigation,
* footer presence or absence,
* mobile transformation,
* tablet transformation,
* desktop transformation,
* overlays,
* drawers,
* sheets,
* dialogs,
* and all displayed states.

The application screen must not contain additional visual sections that are not part of the approved design screen.

The application screen must not omit visible product sections that are present in the approved design screen.

---

# 3. APPROVED SOURCE LOCATIONS

## 3.1 Project source

Primary application root:

`C:\mgpweb`

Claude must inspect the actual codebase before making changes.

Do not assume a route, component, schema, table or provider exists merely because it is mentioned in documentation.

## 3.2 Design source

Primary design directory:

`C:\mgpweb\newdesign`

The exact HTML filenames and screen mappings will be defined in:

`01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`

Claude must use the exact filename listed in the registry.

Do not substitute:

* an older HTML file,
* a similarly named file,
* an exported screenshot,
* an old project design,
* an earlier wireframe,
* a generic template,
* or a personally invented replacement.

## 3.3 Supporting authority files

The complete implementation system will use these files:

1. `00_MASTER_PROJECT_AND_DESIGN_AUTHORITY.md`
2. `01_MASTER_SCREEN_ROUTE_DESIGN_REGISTRY.md`
3. `02_COMPLETE_FUNCTIONAL_BACKEND_AND_DATA_SPEC.md`
4. `03_MASTER_MANUAL_VERIFICATION_AND_RELEASE_CHECKLIST.md`
5. `04_CLAUDE_5_PHASE_IMPLEMENTATION_AND_VERIFICATION_PROMPTS.md`

All five files work together.

No single file may be treated as permission to ignore another file.

---

# 4. AUTHORITY PRECEDENCE

When instructions appear to conflict, use this precedence order:

1. latest explicit user instruction;
2. this Master Project and Design Authority;
3. Master Screen, Route and Design Registry;
4. exact approved HTML screen in `C:\mgpweb\newdesign`;
5. Complete Functional, Backend and Data Specification;
6. Manual Verification and Release Checklist;
7. phase-specific implementation prompt;
8. existing secure application behavior;
9. old code appearance;
10. personal assumptions or generic design patterns.

The current code is implementation evidence.

The current code is not visual design authority.

Old screenshots, previous project UI and outdated components are not authority when they conflict with the approved HTML design.

---

# 5. COMPLETE HTML INSPECTION RULE

Before changing a route, Claude must inspect the complete matching HTML design file from beginning to end.

Claude must not inspect only:

* the first viewport,
* one screenshot,
* one component,
* one responsive width,
* or one visible section.

Claude must identify all relevant:

* screens,
* states,
* device variants,
* dialogs,
* drawers,
* sheets,
* empty states,
* loading states,
* error states,
* expanded states,
* collapsed states,
* and responsive transformations.

Long HTML files must not be treated as one single application page unless the design explicitly represents one page.

---

# 6. DESIGN PRESENTATION WRAPPER EXCLUSION

A standalone design HTML file may contain presentation-only elements used to demonstrate multiple screens.

Do not implement presentation-only wrapper content as product UI.

Examples that must not be copied into the real application unless they are part of the actual app screen:

* “Screen 1” labels,
* device names,
* desktop/mobile captions,
* design notes,
* implementation notes,
* dashed frame outlines,
* sample viewport borders,
* documentation headings,
* explanatory text outside the app frame,
* screen-number navigation,
* prototype-only controls,
* demo background,
* presentation canvas,
* arrows pointing at components,
* redline measurements,
* or design-document footers.

Claude must identify the actual product screen boundary inside the HTML.

Only the actual application interface inside that screen boundary is implemented.

---

# 7. MULTIPLE SCREEN AND STATE RULE

When one HTML file contains several screens or states:

* each screen must be mapped to its correct route or application state;
* states must not be displayed simultaneously unless the design requires it;
* desktop and mobile variants must normally be responsive versions of the same route;
* loading, empty, error and populated states must appear conditionally;
* modal, drawer and bottom-sheet states must open through their correct actions;
* confirmation states must not be permanently visible;
* sample rows must not be inserted as real production data.

Do not turn a design catalogue page containing several examples into one long application route.

---

# 8. EXACT SCREEN BOUNDARY LOCK

For every mapped application screen:

* begin where the approved product screen begins;
* end where the approved product screen ends;
* preserve the exact visible section order;
* preserve the intended density;
* preserve the shell shown in that screen;
* do not append unrelated legacy sections;
* do not prepend an old project header;
* do not add a default footer when the screen has no footer;
* do not insert generic dashboard widgets;
* do not add promotional cards;
* do not add duplicate navigation;
* do not add extra whitespace to imitate page length;
* do not shorten the screen by omitting lower sections.

If the approved design screen includes content below the initial viewport, the complete scrollable screen must be implemented.

---

# 9. SHELL PRESENCE RULE

Shell elements are controlled per screen and route.

These may include:

* public header,
* contextual mobile header,
* desktop dashboard sidebar,
* compact rail,
* dashboard top bar,
* Admin sidebar,
* mobile dashboard drawer,
* mobile bottom navigation,
* sticky action footer,
* public footer,
* or no shell.

If the design screen does not contain a shell element, do not add it.

Examples:

* no header in design → do not render the global header;
* no sidebar in design → do not render dashboard sidebar;
* no bottom navigation in design → do not render bottom navigation;
* no footer in design → do not append public footer;
* contextual mobile header shown → use that header rather than the desktop header;
* full-screen gallery shown → suppress the underlying shell visually while preserving the underlying page state.

Route layouts must support intentional shell suppression.

A global layout must not leak an unwanted header, footer, sidebar or navigation into a screen.

---

# 10. DESIGN AUTHORITY LOCK

The approved design controls:

* visible layout,
* component hierarchy,
* content order,
* navigation placement,
* card composition,
* control placement,
* spacing,
* density,
* border treatment,
* radius,
* shadow level,
* typography hierarchy,
* icon placement,
* image aspect ratio,
* background treatment,
* responsive transformation,
* overlay type,
* sticky behavior,
* tab placement,
* filter placement,
* table-to-card transformation,
* and state presentation.

Claude must not independently redesign the interface.

Claude must not “improve” the design according to personal preference.

Claude must not replace the approved design with:

* a generic SaaS dashboard,
* an Admin template,
* a ShadCN demo layout,
* a Tailwind template,
* a Dribbble-inspired recreation,
* a Housing.com copy,
* an old project layout,
* or an unrelated real-estate template.

Libraries may be used to implement behavior, but they must not override the approved design.

---

# 11. EXACT VISUAL FIDELITY RULE

Implementation must match the source screen in all material visual characteristics:

* page width,
* maximum content width,
* full-width sections,
* grid structure,
* column ratio,
* sidebar width,
* top-bar height,
* header height,
* card size,
* card density,
* section spacing,
* element alignment,
* label placement,
* field height,
* button hierarchy,
* badge treatment,
* status treatment,
* table density,
* image crop,
* image ratio,
* text wrapping,
* typography hierarchy,
* and responsive order.

Do not interpret “same design” as only matching:

* colors,
* rounded corners,
* or general appearance.

The complete composition must match.

---

# 12. PALETTE AND DESIGN TOKEN RULE

Do not introduce a hard-coded visual palette that conflicts with the approved design source.

The approved HTML design controls:

* brand colors,
* surface colors,
* background colors,
* text colors,
* border colors,
* semantic status colors,
* interaction colors,
* focus colors,
* and disabled-state colors.

Extract reusable tokens from the approved designs where practical.

Use shared semantic tokens for:

* primary,
* secondary,
* text,
* muted text,
* surface,
* raised surface,
* border,
* focus,
* success,
* warning,
* error,
* information,
* pending,
* and disabled.

Do not randomly recolor components.

Do not independently create a new brand palette.

Do not normalize intentional visual differences between:

* public pages,
* public-role dashboards,
* Admin,
* Super Admin,
* system screens,
* and full-screen experiences.

---

# 13. TYPOGRAPHY RULE

Use the typography shown by the approved design.

Maintain:

* font family or approved closest project-safe implementation,
* heading hierarchy,
* label hierarchy,
* paragraph sizing,
* helper text,
* metadata text,
* table typography,
* numeric emphasis,
* price emphasis,
* and mobile scaling.

Do not use tiny text to force content into fixed boxes.

Do not clip text.

Do not prevent natural wrapping where the design allows wrapping.

Long names, locations, titles, email-safe displays, masked identifiers and Gujarati text must remain usable.

---

# 14. SPACING AND DENSITY RULE

Match the intended density of the source.

Do not create:

* oversized empty spaces,
* large blank dashboard sections,
* excessive card padding,
* giant hero spacing without source authority,
* basic stacked rectangles,
* repeated boxed sections,
* or unnecessary nested cards.

Do not make a compact mobile design look like a compressed desktop screen.

Do not make a desktop operational table look like a loose marketing page.

---

# 15. CURRENT UI REPLACEMENT RULE

When current UI conflicts with approved design:

remove and replace the conflicting presentation.

Do not:

* layer new CSS over the old visual architecture;
* retain old cards behind new cards;
* keep old layout hidden with CSS;
* maintain two navigation systems;
* keep duplicate CTA systems;
* keep duplicate mobile navigation;
* mix old and new table designs;
* place approved design inside an old wrapper;
* leave legacy components mounted but invisible;
* or keep old conflicting markup for convenience.

Conflicting presentation must be removed cleanly.

Secure and compatible backend foundations may remain.

---

# 16. PRESERVE, REPLACE AND REBUILD METHOD

Before coding each phase, Claude must internally classify relevant implementation into three groups.

## 16.1 Preserve

Preserve only items that are:

* secure,
* correct,
* compatible,
* reusable,
* performant,
* and consistent with final requirements.

Examples:

* valid database tables,
* correct RLS policies,
* secure Server Actions,
* working authentication,
* provider abstraction,
* reusable validation,
* correct business-state transitions,
* existing audit foundation,
* safe shared data queries,
* or working storage abstractions.

## 16.2 Replace

Replace items where functionality may remain useful but the presentation conflicts.

Examples:

* old page layout,
* old dashboard shell,
* old cards,
* generic tables,
* old filters,
* outdated forms,
* duplicated navigation,
* incorrect mobile arrangement,
* or legacy visual states.

## 16.3 Rebuild

Rebuild items that are:

* insecure,
* structurally incorrect,
* disconnected from real data,
* placeholder-only,
* based on legacy roles,
* missing server validation,
* using fake success,
* exposing private information,
* unscalable,
* or fundamentally incompatible with the approved flow.

Claude must implement after making this internal map.

Claude must not stop after returning only a plan.

---

# 17. EXISTING CODEBASE AND STACK RULE

This is an existing application.

Do not replace the framework or create a new project unless explicitly ordered.

Expected application foundations include:

* Next.js App Router,
* TypeScript,
* Tailwind CSS,
* reusable UI components,
* Supabase,
* PostgreSQL,
* Supabase authentication,
* Row Level Security,
* Server Components,
* Server Actions or secured APIs,
* shared state only where required,
* and provider abstractions.

Claude must verify actual package versions and current architecture from the repository.

Do not:

* migrate frameworks without permission;
* rebuild the project in plain HTML;
* create a disconnected prototype;
* create a second application folder;
* replace Supabase with another backend;
* bypass existing migrations;
* or create local mock-only functionality as final implementation.

---

# 18. SOURCE CONTROL AND CHANGE SAFETY

Implementation must preserve repository history and existing working functionality.

Before significant changes:

* inspect repository status;
* inspect current branch;
* understand existing modified files;
* avoid overwriting unrelated user work;
* avoid destructive reset;
* avoid deleting unknown files merely because they appear unused;
* and identify cross-phase dependencies.

Use focused, reviewable changes.

Do not silently:

* reset the database,
* delete production-like data,
* rewrite all migrations,
* remove secure backend foundations,
* or regenerate the entire project.

---

# 19. FINAL PUBLIC ROLE MODEL

The final public registrable roles are:

1. Owner
2. Broker
3. Builder

Canonical role identifiers should follow the approved project role architecture, normally:

* `owner`
* `broker`
* `builder`

## 19.1 Owner

Owner manages their own:

* properties,
* requirements where permitted,
* leads,
* messages,
* site visits,
* saved items,
* billing,
* verification,
* profile,
* support,
* settings,
* and account requests.

## 19.2 Broker

Broker represents the consolidated Broker/Agency role.

Broker capabilities may include:

* own listings,
* client listings where permitted,
* requirements,
* requirement feed,
* proposals,
* leads and CRM,
* messages,
* site visits,
* team or agents,
* billing,
* verification,
* profile,
* and agency/business information.

Agency agents are team members under Broker/Agency scope.

Do not recreate a separate public `agency` registration role unless explicitly approved later.

## 19.3 Builder

Builder represents Builder/Developer.

Builder capabilities may include:

* projects,
* project units,
* unit inventory,
* leads,
* requirements,
* proposals,
* messages,
* site visits,
* team members,
* ads,
* project analytics,
* billing,
* RERA proof,
* company microsite,
* and construction progress.

---

# 20. LEGACY ROLE PROHIBITION

Do not recreate removed public roles such as:

* Buyer,
* Tenant,
* Agency,
* Agency Group,
* Real Estate Group,
* or other legacy role structures.

Words such as:

* buyer,
* tenant,
* customer,
* requester,
* property seeker,
* seller,
* or landlord

may be used as contextual intent labels where the design requires them.

A contextual label must not automatically become a database role.

Do not add legacy columns such as `agency_id` everywhere unless the final ownership and team model actually requires that relationship.

Ownership and scope columns must derive from the final approved role and team architecture.

---

# 21. INTERNAL ROLE AND PERMISSION MODEL

Internal access may include:

* Admin,
* Super Admin,
* and permission-scoped Staff.

Internal authorization must be capability-based.

Do not rely only on a broad role name.

Examples of capabilities may include:

* user management,
* role review,
* staff management,
* moderation,
* verification,
* support,
* billing,
* refunds,
* plan management,
* Ads review,
* CMS,
* SEO,
* locations,
* provider management,
* feature flags,
* system health,
* audit,
* security,
* reports,
* exports,
* and maker-checker approval.

Internal navigation must display only permitted modules.

Direct URL and direct Server Action access must still be denied when permission is absent.

Hidden navigation is not authorization.

---

# 22. ROLE-BASED SHELL RULE

Public-role dashboard shells and Admin shells are different systems.

Do not mix:

* Owner navigation inside Broker routes;
* Broker navigation inside Builder routes;
* public-role bottom navigation inside Admin;
* Admin graphite shell inside public dashboards;
* or public header inside a full dashboard route unless exact design shows it.

Shell identity, navigation and counts must be consistent across all pages within the same role context.

Role navigation badges must use real counts.

Do not display sample or hard-coded badge numbers.

---

# 23. HOST AND ROUTING AUTHORITY

Preserve the approved role-routing architecture.

The project may use:

* main public domain for Guest and Owner-facing public access;
* Broker-specific host or route scope;
* Builder-specific host or route scope;
* internal account/Admin host or route scope.

Do not break host-aware authentication, return URLs or deep links.

A user must not access an unauthorized role shell by manually changing:

* hostname,
* route,
* query parameter,
* local state,
* or Client-side role value.

Server-side role and permission checks remain mandatory.

---

# 24. AUTHENTICATION RULE

Authentication must be real and server-backed.

Do not simulate login through:

* localStorage only,
* hard-coded user objects,
* query parameters,
* demo buttons,
* or Client-only role switches.

Authentication flows must preserve return intent.

When a Guest starts an auth-gated action:

1. preserve the current route;
2. preserve the intended entity;
3. preserve the intended action where appropriate;
4. open the approved authentication modal or sheet;
5. complete authentication;
6. return to the original context;
7. continue or safely resume the intended action.

Do not redirect every successful login to a generic dashboard and discard user intent.

---

# 25. OTP AND PROVIDER AUTHENTICATION HONESTY

Development OTP behavior and production OTP behavior must be clearly separated.

Development-only OTP support may exist only when:

* explicitly enabled for development;
* visibly identified as development behavior where needed;
* unavailable in production;
* and protected from accidental production use.

Production must not use random or fake OTP success.

When OTP provider is not configured:

* display approved Setup Required or unavailable behavior;
* do not claim that an OTP was sent;
* do not accept arbitrary OTP;
* do not fake verification.

Mobile number may remain the primary authentication identifier according to final product rules.

Optional email verification must not silently replace required mobile verification.

---

# 26. FUNCTIONALITY LOCK

Every visible action must work.

The final implementation must contain no required control with:

* `href="#"`,
* empty click handler,
* console-only action,
* permanent disabled state,
* fake loading,
* fake success,
* fake upload,
* fake payment,
* fake provider test,
* fake analytics,
* fake count,
* fake message,
* fake lead,
* fake ticket,
* or placeholder modal.

If a source-required internal module has no external provider configured, implement the internal workflow and show honest provider delivery state.

For example:

* create Notification record even if external Email delivery is unavailable;
* store follow-up reminder even if Push provider is unavailable;
* create Staff invitation record even if Email sending is skipped;
* preserve canonical textual address if Maps is unavailable.

An external provider dependency does not justify leaving the complete internal module as Coming Soon.

---

# 27. REAL DATA RULE

Production-facing application data must come from authoritative application records.

Do not display sample values as real values.

This applies to:

* counts,
* names,
* cities,
* prices,
* plans,
* usage meters,
* leads,
* status,
* dates,
* relative times,
* project progress,
* RERA status,
* verification status,
* payments,
* revenue,
* analytics,
* provider status,
* system health,
* delivery logs,
* notifications,
* audit events,
* support tickets,
* and dashboard metrics.

Development fixtures may be used for testing.

Fixtures must be clearly recognized as development data and must not be hard-coded into production rendering.

---

# 28. DATA MODEL AUTHORITY

Use one canonical data model for each domain.

Do not create disconnected duplicate systems for:

* Property,
* Project,
* Requirement,
* Lead,
* Proposal,
* Message,
* Site Visit,
* Contact Reveal,
* Saved Item,
* Billing,
* Payment,
* Subscription,
* Invoice,
* Refund,
* Verification,
* Report,
* Support,
* Notification,
* Media,
* Location,
* Ad,
* CMS content,
* Audit,
* Provider,
* or User settings.

Role dashboards must reuse canonical shared records.

Example:

Owner Lead, Broker CRM Lead, Builder Lead and Shared Lead Detail must refer to one canonical Lead system with role-specific presentation and permissions.

Do not create one Lead table per dashboard.

---

# 29. SERVER-SIDE AUTHORIZATION RULE

Every protected mutation must independently validate:

* authenticated user;
* active account state;
* role where required;
* Staff capability where required;
* ownership;
* team scope;
* participant relationship;
* target existence;
* target type;
* current target state;
* input validity;
* subscription or quota where applicable;
* and transition permission.

A hidden or disabled Client button is not security.

Client-supplied:

* role,
* owner ID,
* amount,
* plan,
* status,
* permission,
* contact number,
* verification state,
* or provider success

must not be trusted as authority.

---

# 30. ROW LEVEL SECURITY RULE

Use Row Level Security as a core authorization layer.

Policies must reflect:

* final public roles,
* entity ownership,
* team assignment,
* participant access,
* public-safe access,
* Staff capabilities,
* and internal service behavior.

Do not use an absolute rule that every join inside RLS is forbidden.

Instead:

* avoid recursive RLS;
* avoid unsafe policy recursion;
* avoid expensive unindexed joins;
* minimize unnecessary joins;
* use indexed ownership and scope columns;
* use stable helper functions where appropriate;
* test direct database access;
* and verify policies with multiple users.

Do not use service-role access as a shortcut around broken RLS.

---

# 31. SERVICE ROLE RULE

Service-role credentials must never reach:

* Browser JavaScript,
* Client Components,
* localStorage,
* public environment variables,
* HTML,
* React payload,
* logs visible to users,
* or API responses.

When a server process uses service-role access:

1. authenticate the requester;
2. authorize the requested action explicitly;
3. validate the entity and state;
4. perform only the minimum required operation;
5. project only required fields;
6. record Audit where applicable.

Service-role access does not remove the need for authorization.

---

# 32. EXPLICIT DATA PROJECTION RULE

Avoid unrestricted sensitive queries.

Do not use broad `select *` patterns on entities containing private information.

Use explicit field projections.

Public queries must return only public-safe fields.

Client payloads must contain only fields required by that screen.

Do not send sensitive fields to the Browser and hide them with CSS.

---

# 33. CONTACT PRIVACY RULE

Phone numbers, alternate numbers and private contact data remain protected.

Before an authorized contact reveal succeeds:

* full number must not be present in initial HTML;
* full number must not be present in Server Component payload;
* full number must not be passed as a hidden prop;
* full number must not exist in a hidden `tel:` link;
* full number must not be returned by a background query;
* full number must not be included in metadata;
* full number must not be hidden only through masking CSS.

Initial state must use a safely generated masked value.

An authorized Reveal flow may require:

1. authentication;
2. self-reveal protection;
3. role or relationship eligibility;
4. visibility and consent check;
5. plan or quota check;
6. atomic usage accounting;
7. immutable Reveal event;
8. safe full-contact response;
9. timeline, Notification or Audit where specified.

Repeat requests must not consume duplicate quota or create duplicate events incorrectly.

---

# 34. PUBLIC-SAFE DATA RULE

Public pages and profiles must not expose:

* private phone,
* alternate mobile,
* private email,
* exact private address,
* identity documents,
* verification documents,
* claim proof,
* payment information,
* Staff notes,
* moderation notes,
* private Lead data,
* contact snapshots,
* provider secrets,
* internal fraud notes,
* or private analytics.

Public-safe profile and detail queries must be separate from internal management queries where necessary.

Private profiles must not leak existence through:

* metadata,
* initial payload,
* API errors,
* or predictable identifiers.

---

# 35. PRIVATE FILE AND DOCUMENT RULE

Private documents must use private storage and authorized access.

Examples include:

* verification proofs,
* claim proofs,
* GST documents,
* RERA proof where private,
* identity documents,
* payment evidence,
* export archives,
* internal report evidence,
* private attachments,
* and sensitive invoices where applicable.

Do not expose permanent public URLs.

Use:

* short-lived signed access;
* participant or permission checks;
* access logging where required;
* MIME validation;
* safe Content-Disposition;
* and secure download behavior.

---

# 36. MEDIA ARCHITECTURE RULE

Use one canonical media system with configurable entity and media type.

Media records should support relevant fields such as:

* entity type,
* entity ID,
* media ID,
* storage key,
* MIME,
* file size,
* width,
* height,
* sort index,
* cover status,
* caption,
* category,
* crop metadata,
* processing status,
* upload status,
* and creator.

Upload authorization must be short-lived.

Do not expose master storage credentials.

A user must not attach another user’s uploaded file to their entity.

Handle:

* failed uploads,
* incomplete multipart uploads,
* orphan cleanup,
* retry,
* remove,
* reorder,
* cover selection,
* and deletion retention.

---

# 37. FILE VALIDATION RULE

Validate files server-side.

Validation may include:

* MIME type,
* file extension,
* actual decoded media validity,
* size limit,
* image dimensions,
* PDF validity,
* content-type consistency,
* and allowed entity relationship.

Do not trust only:

* browser `accept`,
* filename,
* Client-side MIME,
* or Client-side size checks.

Brochure PDF must remain PDF where the design requires PDF.

Do not convert a brochure PDF into fake gallery images.

Image optimization or conversion must not destroy original media where the architecture requires originals.

---

# 38. LOCATION AUTHORITY

Use one canonical Gujarat location hierarchy.

The shared location system may include:

* State,
* District,
* Taluka,
* City,
* Village,
* Area,
* Locality,
* Society,
* Building,
* Landmark,
* PIN code,
* coordinates,
* aliases,
* and multilingual names.

Property and Project flows must use the shared canonical source.

Requirement flows may use a multi-location variant of the same source.

Do not create separate incompatible city lists across forms.

Do not force an unrecognized free-text locality into a canonical location ID.

Use the Missing Location workflow when required.

---

# 39. MAP BEHAVIOR RULE

The approved current Map behavior must be used consistently.

When the selected Map mode is available:

* use the approved map or map-intent behavior;
* validate coordinates and address;
* preserve privacy rules.

When the Map provider is unavailable:

* do not show a broken map;
* do not show an empty grey block;
* display the approved address-only, list, native intent or Setup Required fallback;
* allow valid textual location completion where permitted.

Map provider failure must not automatically destroy a valid Draft.

Do not simultaneously treat Map behavior as both resolved and unresolved.

---

# 40. PROVIDER HONESTY RULE

Provider status must control actual downstream behavior.

Possible providers include:

* OTP/SMS,
* Email,
* WhatsApp,
* Maps,
* Payment,
* Storage/CDN,
* Analytics,
* Error monitoring,
* Push Notifications,
* and other configured services.

A provider state must be backed by real system information.

Allowed states may include:

* Active,
* Error,
* Setup Required,
* Disabled,
* Test Mode,
* Degraded,
* or Pending verification.

Do not mark a provider Active merely because environment variables exist.

Provider status may use:

* configuration presence,
* safe validation,
* last test,
* last successful test,
* delivery health,
* or provider-specific checks.

---

# 41. PROVIDER SECRET RULE

Provider secrets are write-only.

After saving a secret:

* do not return it to the Browser;
* do not populate it back into a form;
* do not show it to Super Admin;
* do not include it in Audit metadata;
* do not include it in logs.

The UI may show only:

* credential exists,
* safe masked prefix,
* safe masked suffix,
* last rotation time,
* last test,
* and safe status.

Secret replacement must accept a new secret through a secure server flow.

---

# 42. PROVIDER TEST RULE

“Test Connection” must perform a real, safe and non-destructive test.

Do not simulate provider success.

Do not create unwanted production effects.

Provider test flow must include:

* permission check;
* server-side execution;
* rate limiting;
* safe provider-specific test;
* safe error classification;
* timestamp;
* last-successful-test state;
* and Audit without secrets.

Do not return raw provider responses containing sensitive data.

---

# 43. PROVIDER FALLBACK RULES

Use honest fallback behavior.

Examples:

## Email unavailable

* internal Notification or queue record may still be created;
* Email delivery is skipped, failed or queued honestly;
* do not show Sent unless provider confirms appropriate success.

## WhatsApp unavailable

* use approved `wa.me` fallback where allowed;
* otherwise skip and log;
* do not claim API delivery.

## Maps unavailable

* show address/list/native intent fallback;
* do not show broken map.

## Analytics unavailable

* show `—`, unavailable or Setup Required;
* do not invent metrics.

## Storage unavailable

* show Setup Required for upload;
* do not fake upload completion.

## Payment unavailable

* do not activate paid Subscription;
* show honest checkout-unavailable or Test Mode behavior.

---

# 44. FINANCIAL TRUTH RULE

Financial state must come from trusted server and provider verification.

Client success pages are not payment authority.

Do not create a successful:

* Payment,
* Subscription,
* Invoice,
* Refund,
* Credit Note,
* Wallet credit,
* Coupon redemption,
* or Add-on

based only on Client callback or redirect query.

Payment flow must validate applicable:

* server-authoritative Plan;
* amount;
* currency;
* tax;
* Coupon;
* provider order;
* provider payment;
* raw webhook signature;
* event shape;
* capture state;
* amount match;
* currency match;
* and idempotency.

Do not treat authorization as capture when capture is required.

---

# 45. PAYMENT AND SUBSCRIPTION CONSISTENCY

Connected financial operations must remain consistent.

Payment completion may need to coordinate:

* Payment status;
* Subscription activation;
* Trial transition;
* Invoice creation;
* Coupon usage;
* Add-on usage;
* entitlement update;
* Notification;
* and Audit.

Use:

* transaction,
* durable orchestration,
* recoverable job,
* or idempotent state machine.

Do not leave a successful Payment with missing Subscription or duplicate Invoice.

---

# 46. DATABASE MIGRATION RULE

All schema changes must use safe migrations.

Do not:

* edit production schema manually without migration;
* rewrite old migration history;
* destroy user data;
* rename or drop important columns without compatibility handling;
* force legacy ownership columns;
* or reset the entire database.

For required changes:

1. inspect current schema;
2. design final canonical structure;
3. create migration;
4. add indexes;
5. add constraints;
6. add or update RLS;
7. backfill safely if required;
8. preserve compatibility during rollout;
9. test with existing data;
10. document rollback or recovery.

---

# 47. STATE MACHINE RULE

Important domain workflows must use explicit states and valid transitions.

Do not manage complex workflows with arbitrary display strings only.

This applies to:

* listings,
* projects,
* requirements,
* leads,
* proposals,
* site visits,
* claims,
* verification,
* role changes,
* subscriptions,
* payments,
* refunds,
* Ads,
* support tickets,
* content revisions,
* exports,
* account deletion,
* provider tests,
* maintenance,
* and maker-checker requests.

Server must reject invalid or stale transitions.

---

# 48. TRANSACTION AND DURABLE ORCHESTRATION RULE

Multi-write workflows must be atomic or durably recoverable.

Examples include:

* Lead stage + timeline event;
* Site Visit response + Lead update + Notification;
* Contact Reveal + quota increment + Reveal event;
* listing submission + moderation state;
* role approval + profile + subscription migration;
* Payment + Subscription + Invoice;
* Refund + Payment + Credit Note;
* Claim approval + ownership assignment;
* verification submission + queue;
* account deletion orchestration;
* export job creation;
* Ad approval + schedule;
* bulk actions;
* maker-checker execution.

Do not perform several unrelated writes and silently ignore partial failure.

---

# 49. IDEMPOTENCY RULE

Protect all high-impact actions from duplicate execution.

Examples:

* submit listing;
* submit project;
* submit requirement;
* send enquiry;
* send proposal;
* reveal contact;
* create Message thread;
* request Site Visit;
* respond to Site Visit;
* update Lead stage;
* submit claim;
* submit verification;
* make payment;
* process webhook;
* issue refund;
* activate Subscription;
* apply Coupon;
* create invoice;
* grant trial;
* send Staff invite;
* submit support ticket;
* mark all Notifications read;
* create export;
* request deletion;
* approve moderation;
* retry job;
* execute bulk action;
* approve maker-checker request.

Double click, retry, network replay and provider webhook replay must not create duplicate effects.

---

# 50. CONCURRENCY AND STALE-STATE RULE

Every action that can be changed by multiple actors or requests must revalidate current server state.

Examples:

* two users claiming the same profile;
* two Admins reviewing the same item;
* two Staff members approving a request;
* repeated inventory update;
* simultaneous Lead stage update;
* duplicate Unit generation;
* Coupon last-use race;
* final plan quota;
* payment webhook race;
* two checkers deciding one request;
* Ad pause/expiry race;
* and bulk action on changed records.

Use:

* unique constraints,
* version checks,
* conditional updates,
* database locks where appropriate,
* transactions,
* and idempotency keys.

Do not trust stale Client state.

---

# 51. PAGINATION RULE

Operational lists must use scalable pagination, cursor loading or intentionally bounded previews.

Do not fetch an arbitrary first 100 rows and treat those rows as the complete dataset.

This rule applies to relevant:

* Properties,
* Projects,
* Requirements,
* Leads,
* Messages,
* Site Visits,
* Proposals,
* Saved items,
* Invoices,
* Payments,
* Notifications,
* Support Tickets,
* Users,
* Staff,
* moderation queues,
* verification queues,
* Reports,
* Audit logs,
* Provider logs,
* Ads,
* CMS content,
* locations,
* exports,
* and job queues.

Dashboard previews may be bounded but must provide a working View All action when required.

---

# 52. COUNT QUERY RULE

Counts must come from authoritative aggregate or count queries.

Do not download entire row sets merely to count them.

Do not derive complete tab counts from:

* first 24 records,
* first 50 records,
* first 100 records,
* or currently rendered cards.

Count definitions must match displayed labels.

Examples:

* Active Listings must count only qualifying active listings;
* New Leads This Week must use correct timezone and date definition;
* active Project count must use qualifying published projects;
* unread count must use actual unread state;
* Trial active users must exclude expired or revoked trials.

---

# 53. N+1 QUERY RULE

Audit and remove N+1 patterns.

Do not issue one extra query per:

* Lead,
* Message thread,
* Project,
* User,
* Property,
* Invoice,
* Notification,
* or table row

when a bounded joined query, aggregate, RPC or batch query is appropriate.

Performance must remain acceptable with realistic account data.

---

# 54. PERFORMANCE RULE

Implementation must remain scalable and production-oriented.

Use appropriate:

* database indexes,
* bounded queries,
* aggregate queries,
* parallel independent loading,
* caching,
* revalidation,
* server rendering,
* incremental rendering,
* code splitting,
* image optimization,
* CDN delivery,
* and background jobs.

Avoid:

* unbounded list loading,
* sequential independent requests,
* duplicate data fetching,
* rendering huge hidden DOM trees,
* loading every dashboard module on every route,
* sending sensitive unused fields to Client,
* or blocking the entire page on one optional provider.

---

# 55. PERFORMANCE HONESTY

Do not display fake zero values when a query fails.

Differentiate:

* actual zero,
* loading,
* failed query,
* unavailable provider,
* no permission,
* and empty dataset.

If one independent dashboard query fails, show an honest affected state without corrupting successful modules.

---

# 56. STANDARD SCREEN STATES

Every applicable screen must support real states such as:

* initial loading,
* skeleton,
* populated,
* empty,
* filtered empty,
* no search results,
* validation error,
* network error,
* server error,
* retry,
* forbidden,
* unauthorized,
* unavailable,
* Setup Required,
* provider error,
* offline,
* stale state,
* success,
* partial success,
* and archived or expired.

Only show states relevant to that screen.

Do not display all states simultaneously.

Use exact source-designed states when available.

If a required technical state is not explicitly drawn, use the approved shared design-system pattern without redesigning the normal screen.

---

# 57. NO FAKE EMPTY OR ZERO STATE

An error must not be rendered as:

* zero leads,
* zero revenue,
* no messages,
* no invoices,
* or no results.

A failed provider must not be rendered as a normal empty dataset.

A permission denial must not be rendered as “No data yet.”

Use the correct state.

---

# 58. TEMPORARY ACTION INTERACTION LOCK

Temporary actions must preserve the current page in the background.

Examples include:

* filters,
* confirmations,
* action menus,
* report forms,
* share actions,
* contact reveal,
* schedule actions,
* edit dialogs,
* status updates,
* delete confirmation,
* reject reason,
* support reply,
* notification preview,
* provider test,
* and quick settings.

Use the exact design-defined:

* modal,
* drawer,
* side panel,
* popover,
* dropdown,
* or bottom sheet.

Do not navigate to a separate full-screen route for a temporary action unless the approved design explicitly uses a full page.

---

# 59. DESKTOP AND MOBILE OVERLAY RULE

Where the approved design defines different overlay behavior:

* desktop may use modal or side drawer;
* mobile may use bottom sheet or full-height sheet;
* a complex detail may use desktop drawer and mobile full page;
* a gallery may use full-screen overlay on all devices.

Implement the exact responsive interaction.

Do not use one generic modal for every action.

---

# 60. OVERLAY ACCESSIBILITY RULE

Applicable overlays must support:

* correct dialog semantics;
* `aria-modal` where required;
* accessible title;
* initial focus;
* focus trap;
* Escape close where appropriate;
* outside-click close where appropriate;
* close button;
* body scroll lock;
* background interaction prevention;
* and focus restoration to the triggering control.

Destructive or in-progress actions must not close accidentally where the design or safety requirement prohibits it.

---

# 61. OUTSIDE-CLICK RULE

Dropdowns, menus, popovers, mobile drawers, modals and sheets must close on outside interaction where appropriate.

Do not leave overlays permanently open.

Do not make outside click close an action while:

* irreversible processing is running;
* user data would be silently lost;
* or exact design requires explicit confirmation.

---

# 62. RESPONSIVE AUTHORITY

Responsive implementation must follow the actual device variants shown in the design.

Responsive behavior is not achieved by simply shrinking desktop UI.

The implementation must transform:

* column structure,
* navigation,
* card composition,
* table layout,
* action placement,
* sticky behavior,
* filters,
* modal type,
* information density,
* image presentation,
* and content order

according to the approved source.

---

# 63. REQUIRED RESPONSIVE WIDTHS

At minimum, verify relevant screens at:

* 320px,
* 360px,
* 390px,
* 430px,
* 768px,
* 1024px,
* 1280px,
* 1366px,
* and 1440px.

Use 390px as the primary mobile comparison where the design uses a 390px mobile reference.

Use exact design-specific widths where stated.

High-risk screens must also be checked at intermediate widths.

---

# 64. MOBILE-FIRST VERIFICATION RULE

For responsive verification:

1. test 390px first;
2. test smaller mobile widths;
3. test wider mobile widths;
4. test tablet;
5. test laptop/desktop;
6. test wide desktop where applicable.

Do not verify only desktop and declare responsive completion.

---

# 65. RESPONSIVE FAILURE PROHIBITIONS

No screen may have accidental:

* page-level horizontal scrolling,
* text clipping,
* button clipping,
* card overflow,
* table overflow without approved handling,
* overlapping sticky elements,
* hidden final row,
* bottom-nav collision,
* sticky CTA collision,
* keyboard-covered action,
* inaccessible dropdown,
* off-screen modal,
* safe-area collision,
* or fixed-height content truncation.

Intentional horizontal scrolling is permitted only for approved components such as:

* tab strips,
* comparison tables,
* or explicitly scrollable tables.

---

# 66. MOBILE SAFE AREA RULE

Fixed bottom elements must respect device safe area.

This includes:

* bottom navigation,
* sticky CTA,
* message input,
* wizard footer,
* modal actions,
* bottom sheets,
* and comparison tray.

When more than one fixed element is present, calculate correct offsets.

Do not place the sticky CTA behind bottom navigation.

---

# 67. MOBILE KEYBOARD RULE

Forms, message inputs, search, sheets and sticky actions must remain usable when the mobile keyboard is open.

Verify:

* focused field visibility;
* scroll into view;
* action accessibility;
* sheet height;
* sticky footer behavior;
* and no trapped content.

---

# 68. TABLE RESPONSIVE RULE

Follow the exact source transformation.

Depending on the screen, a desktop table may become:

* mobile cards,
* horizontally scrollable table,
* compact rows,
* grouped blocks,
* or a simplified operational list.

Do not squeeze all desktop columns into a 390px viewport.

Do not remove critical actions or status information during transformation.

---

# 69. MOBILE NAVIGATION RULE

Where public-role mobile bottom navigation is shown:

* use the exact number of items;
* use the exact order;
* use the correct labels;
* use correct active state;
* use real badges;
* and preserve safe-area spacing.

Do not add public-role bottom navigation to Admin screens.

Admin mobile access uses its approved contextual header and drawer unless exact design says otherwise.

---

# 70. DRAWER RULE

Mobile drawers must support:

* correct navigation order;
* current user identity;
* correct role context;
* real badges;
* working route links;
* logout;
* scrim;
* focus trap;
* outside click;
* Escape where available;
* body scroll lock;
* and focus return.

Do not keep desktop sidebar visible underneath a mobile drawer in a conflicting way.

---

# 71. ACCESSIBILITY BASELINE

The complete application must be accessible by default.

Accessibility Quick Settings are enhancements, not a substitute for correct implementation.

Use:

* semantic HTML,
* correct headings,
* associated labels,
* keyboard navigation,
* visible focus,
* accessible names,
* meaningful button text,
* alt text,
* status announcements,
* proper table semantics,
* and correct dialog behavior.

Do not make a clickable `div` when a button or link is appropriate.

---

# 72. KEYBOARD ACCESSIBILITY

All interactive controls must be usable through keyboard where the platform supports keyboard interaction.

This includes:

* navigation,
* tabs,
* menus,
* dropdowns,
* forms,
* modals,
* drawers,
* gallery controls,
* filters,
* tables,
* pagination,
* accordions,
* and comparison actions.

Do not remove focus outlines.

---

# 73. MOTION AND ANIMATION RULE

Use motion only where supported by approved design.

Respect:

* `prefers-reduced-motion`;
* user Reduce Motion preference where implemented;
* and accessibility settings.

Reduce nonessential:

* transitions,
* parallax,
* auto-scroll,
* decorative movement,
* and repeated animation.

Do not disable essential:

* loading indicators,
* state progress,
* or necessary feedback.

---

# 74. TEXT SIZE AND WRAPPING RULE

At larger text settings:

* buttons must grow or wrap;
* labels must remain associated;
* cards must expand;
* tables must remain usable;
* navigation must not clip;
* and overlays must remain functional.

Do not use browser zoom hacks as the Text Size implementation.

Use token-based typography scaling where the design provides Text Size settings.

---

# 75. LANGUAGE RULE

Support approved languages and fallback behavior according to final localization design.

Possible languages include:

* English,
* Gujarati,
* and Hindi state where defined.

Do not randomly mix languages.

Do not display raw translation keys.

When translation is missing:

* use the approved English fallback;
* record missing translation where required;
* show subtle pending behavior only if designed.

Do not automatically publish machine-generated Legal translation as authoritative without review.

---

# 76. GUJARATI TEXT SAFETY

Verify Gujarati text for:

* correct font rendering,
* line height,
* wrapping,
* truncation,
* button sizing,
* table/card transformation,
* large text,
* and mobile layouts.

Do not verify localization using only English strings.

---

# 77. THEME RULE

Theme behavior must follow approved design.

Supported choices may include:

* Light,
* Dark,
* System.

Do not create an unrelated dark-mode redesign.

Theme must use semantic tokens.

Theme changes must not:

* recolor property images,
* destroy brand identity,
* reduce contrast,
* break status colors,
* or create unreadable overlays.

Persist theme preference according to approved architecture.

---

# 78. PWA SECURITY RULE

PWA and Service Worker behavior must not weaken authentication.

Do not use Cache Storage as authorization authority.

Do not blindly cache private dashboard HTML for cross-user reuse.

After logout:

* private pages,
* private API results,
* contact data,
* and private media

must not remain exposed through offline cache.

Use versioned caches and safe invalidation.

---

# 79. OFFLINE HONESTY RULE

Offline state must be based on real connectivity or Service Worker state.

Do not show fake offline mode.

Offline behavior must not claim that a write succeeded when it is only stored locally unless an approved queued-write architecture exists.

Show honest:

* offline banner,
* unavailable action,
* queued state,
* or retry behavior.

---

# 80. ANALYTICS CONSENT RULE

Analytics and tracking must respect consent.

Do not initialize nonessential analytics before the user grants the applicable consent.

Cookie and analytics preferences must be:

* persisted;
* changeable;
* auditable where required;
* isolated by category;
* and respected across navigation.

Rejecting analytics must not break essential application functionality.

Resetting accessibility settings must not erase cookie consent.

---

# 81. NOTIFICATION RULE

Use one canonical Notification system.

Notification records and external delivery are separate.

A Notification may have channel states such as:

* in-app delivered,
* Email sent,
* Email failed,
* WhatsApp skipped,
* SMS provider missing,
* Push queued,
* or provider error.

Do not mark a Notification externally delivered unless the provider confirms the appropriate success state.

Notification preferences, templates, logs and defaults must remain connected.

---

# 82. MESSAGE AND COMMUNICATION RULE

Use one canonical Message thread and participant system.

Do not create duplicate threads for repeated clicks.

Message access must require participant authorization.

Do not expose unrelated conversations through:

* direct URL,
* thread ID guessing,
* search,
* notifications,
* or Client state.

Message lists must use:

* real unread state,
* real preview,
* real timestamp,
* bounded pagination,
* and correct participant context.

---

# 83. LEAD CONSOLIDATION RULE

Owner, Broker and Builder must use the shared canonical Lead system.

The role-specific Leads experience may combine or connect:

* enquiries,
* property/project context,
* proposals,
* messages,
* site visits,
* notes,
* reminders,
* stages,
* contact reveal,
* and timeline events.

Do not create disconnected Lead, Message and Site Visit records that cannot be traced to the same customer journey.

---

# 84. SHARED MODULE CONTRACT RULE

Preserve cross-phase and cross-role contracts.

Shared modules include:

* authentication,
* search,
* property cards,
* project cards,
* location,
* media,
* contact reveal,
* Lead detail,
* proposals,
* messages,
* Site Visits,
* billing,
* verification,
* support,
* reports,
* notifications,
* provider states,
* and audit.

When a shared module is improved in one phase:

* verify all roles using it;
* avoid breaking previously passed screens;
* avoid role-specific duplicate implementations;
* preserve design-specific presentation differences.

Shared functionality does not mean every role must use identical visual layout.

---

# 85. SEARCH RULE

Search must use real indexed or scalable data queries.

Do not search only the currently loaded first page.

Search suggestions and filters must connect to canonical:

* cities,
* localities,
* projects,
* developers/builders,
* property types,
* purposes,
* and other approved entities.

Search state must support:

* clear;
* no results;
* error;
* loading;
* recent or suggested state where designed;
* and responsive behavior.

Do not display fake autocomplete results.

---

# 86. SEO RULE

Public indexable pages must use correct:

* canonical URL;
* Meta Title;
* Meta Description;
* heading hierarchy;
* Open Graph data where applicable;
* structured data;
* breadcrumb data;
* and Sitemap inclusion.

Restricted or private pages must use appropriate:

* Noindex;
* Sitemap exclusion;
* access control;
* and metadata privacy.

Visible breadcrumb and structured breadcrumb must agree.

Do not insert fake claims such as:

* “best builder”,
* “number one broker”,
* or “verified property”

unless supported by real approved data and policy.

---

# 87. CITY AND LOCATION SEO RULE

City, locality, property-type and purpose landing pages must derive from canonical location and listing data.

Examples may include:

* property in Rajkot,
* property for sale in Rajkot,
* flats in Rajkot,
* rent property in Rajkot,
* property by locality,
* project by city.

A search-engine entry must open the correctly filtered canonical result.

Do not create duplicate thin pages with conflicting canonical URLs.

When no local result exists, any nearby fallback must be honest and clearly labeled.

---

# 88. CMS CONTENT AUTHORITY

Public content must render from the approved CMS publishing system where specified.

Do not maintain disconnected:

* hard-coded legal pages,
* static fake blog records,
* duplicate content sources,
* preliminary placeholders,
* or public content that ignores Admin revisions.

The intended flow is:

Admin CMS draft
→ review/approval where required
→ published revision
→ public rendering.

---

# 89. LEGAL CONTENT RULE

Legal pages and notices must use approved published content and versioning.

Do not:

* invent legal promises;
* display an unapproved translation as authoritative;
* hide version or effective date when required;
* or allow Draft legal content to become public.

The platform’s marketplace and advertising disclaimers must remain consistent across:

* listing,
* verification,
* payment,
* trial,
* contact,
* property status,
* and transaction-related surfaces.

Verification must not be represented as a transaction guarantee.

---

# 90. SUPPORT RULE

Use one canonical Support Ticket system.

Support must support applicable:

* guest request,
* authenticated ticket,
* user-owned ticket list,
* read-only or reply thread according to state,
* Admin queue,
* Staff reply,
* resolution,
* reopening where allowed,
* notifications,
* and audit.

Cross-user Ticket access must fail.

Do not use fake support messages or fake agent names.

---

# 91. AUDIT RULE

High-impact and sensitive actions must create meaningful Audit events.

Audit should record appropriate:

* actor,
* action,
* target,
* timestamp,
* reason,
* safe before/after,
* result,
* and request context.

Audit must not contain:

* full provider secrets,
* full private contact numbers unless explicitly required and protected,
* private documents,
* raw payment credentials,
* or unnecessary sensitive payloads.

Security and governance audit records should be append-only according to final architecture.

---

# 92. ADMIN GOVERNANCE RULE

Admin and Super Admin actions must be permission-scoped.

High-risk actions may require:

* confirmation;
* mandatory reason;
* impact preview;
* stale-state revalidation;
* four-eyes approval;
* maker-checker separation;
* and durable execution.

A checker must not approve their own maker action where four-eyes control applies.

“Approved” and “Executed” must be distinct when execution can fail or run asynchronously.

---

# 93. BULK ACTION RULE

Bulk actions must follow:

Selection
→ Server Preview
→ Included records
→ Excluded records
→ Real affected count
→ Impact explanation
→ Confirmation
→ Server revalidation
→ Execution
→ Result summary
→ Audit.

Do not use only the Client selection count as final affected count.

Records that become stale must be safely excluded or re-evaluated.

Repeat execution must not duplicate effects.

---

# 94. SYSTEM HEALTH HONESTY

System-health surfaces must use real operational information.

Do not invent:

* uptime,
* incident count,
* queue length,
* median wait,
* backup freshness,
* webhook health,
* delivery rate,
* or error rate.

When monitoring is not configured:

show approved Setup Required or unavailable state.

Do not display fake green health.

---

# 95. MAINTENANCE MODE RULE

Maintenance Mode must be a real server-enforced platform state.

It must support approved:

* message,
* start,
* end,
* duration,
* scheduling,
* public maintenance page,
* expected-back information,
* Admin exception,
* and Audit.

Do not implement Maintenance Mode as a Client-only banner while public routes remain fully active.

Critical webhook or background processing behavior must follow approved safety rules during maintenance.

---

# 96. ERROR HANDLING RULE

User-facing errors must be safe and useful.

Do not expose:

* database errors,
* stack traces,
* provider secret fragments,
* raw SQL,
* internal file paths,
* service-role details,
* or private identifiers.

Log appropriate technical details securely.

Show a user-safe error with:

* clear problem,
* relevant recovery,
* retry where safe,
* and support path where necessary.

---

# 97. FORM RULE

Every form must use:

* correct labels,
* required indicators,
* helper text,
* server validation,
* Client feedback where useful,
* field-level errors,
* error summary where designed,
* valid default values,
* loading state,
* disabled state during submission,
* duplicate-submit protection,
* and success or next-state behavior.

Do not clear valid user data after an unrelated validation error.

Do not rely only on HTML `required`.

---

# 98. DRAFT AND AUTOSAVE RULE

Where Draft persistence is required:

* persist actual partial values;
* store the correct step;
* support refresh;
* support resume;
* handle autosave race;
* show saving/saved/error state;
* avoid overwriting newer values;
* and preserve separate Drafts according to product behavior.

“Start New” must not silently delete an existing Draft unless the user confirms the approved destructive behavior.

Draft data and Draft media must remain private.

---

# 99. DELETE AND DESTRUCTIVE ACTION RULE

Destructive actions must follow the exact confirmation design.

Applicable protections may include:

* explicit confirmation;
* item name;
* typed confirmation;
* mandatory reason;
* OTP re-verification;
* impact summary;
* grace period;
* cancellation;
* retention rules;
* and Audit.

Do not use browser `confirm()` as final UX when the design defines a modal or sheet.

Do not permanently delete records that require legal, billing, Audit or communication retention.

---

# 100. DATE, TIME AND TIMEZONE RULE

Use consistent timezone-aware behavior.

Relative time, greetings, reminders, campaign schedules, visit times, trial expiry and reporting windows must use the approved user or business timezone.

Do not calculate date-sensitive values only in Browser local time when server consistency is required.

Quick date actions must work across:

* month boundary,
* year boundary,
* daylight or timezone changes where applicable,
* and invalid past selections.

---

# 101. STATUS LABEL RULE

Use a canonical status registry.

Do not display raw database enum keys directly.

Map statuses to approved:

* user-facing label,
* semantic color,
* icon,
* helper text,
* available actions,
* and terminal behavior.

Do not use a success color for pending or uncertain state.

---

# 102. ICON RULE

Use the approved icon style consistently.

Icons must:

* support the meaning;
* have accessible labels where needed;
* align correctly;
* and not replace essential text without accessible naming.

Do not mix unrelated icon libraries in a visibly inconsistent way.

Do not use emoji as production interface icons unless the design explicitly uses them.

---

# 103. IMAGE AND ASSET RULE

Use real or approved development assets.

Do not leave:

* broken image links,
* generic grey boxes,
* sample stock photos presented as user uploads,
* fake floor plans,
* fake project renders,
* or source-design placeholder names

as production completion.

When media is unavailable:

use the approved honest empty or Setup Required state.

Maintain intended:

* aspect ratio,
* crop,
* object position,
* lazy loading,
* responsive sizing,
* and error fallback.

---

# 104. NO PLACEHOLDER COMPLETION RULE

A screen does not pass merely because it renders.

Required modules must not remain:

* Coming Soon,
* TODO,
* placeholder,
* disabled forever,
* fake sample,
* static demonstration,
* or unconnected design.

External provider-only capability may remain Setup Required only when:

* the internal workflow is complete where possible;
* the fallback is correct;
* the status is honest;
* and the exact Setup Required state is verified.

---

# 105. DEVELOPMENT FIXTURE RULE

Use realistic fixtures only for testing.

Fixtures must cover:

* multiple roles;
* multiple users;
* ownership boundaries;
* empty and populated accounts;
* different statuses;
* long content;
* Gujarati content;
* provider active and missing states;
* payment Test Mode;
* and permission denial.

Do not depend on one privileged demo user.

Before production release:

* remove unsafe fake data;
* remove bypasses;
* remove random OTP;
* remove fake providers;
* remove test secrets;
* and verify production configuration.

---

# 106. IMPLEMENTATION PHASE CONTROL

Claude must work only on the named phase.

Before implementation:

1. read this file completely;
2. read the Phase Prompt;
3. read the relevant registry entries;
4. read the relevant functionality specification;
5. inspect all exact HTML design sources for that phase;
6. inspect current routes, components, actions, schema, RLS and providers;
7. create an internal Preserve / Replace / Rebuild map;
8. implement the phase;
9. run required tests;
10. return the required implementation report;
11. stop.

Do not begin the next phase automatically.

Do not pre-implement later-phase screens in a way that changes their approved design authority.

Shared foundations may be created when unavoidable, but later screens must not be visually invented.

---

# 107. NO PLAN-ONLY RESPONSE

When a Phase Implementation Prompt is issued, Claude must implement.

Do not return only:

* analysis,
* plan,
* recommendation,
* checklist,
* pseudocode,
* or suggested architecture.

A plan may be formed internally, but actual code changes are required unless a real blocker prevents implementation.

A blocker report must identify:

* exact missing file,
* exact missing access,
* exact conflict,
* exact failed command,
* or exact external dependency.

---

# 108. MISSING FILE RULE

If a required file is missing:

* stop the affected phase;
* name the exact missing file;
* name the expected location;
* explain why it is required;
* do not substitute an older similarly named file;
* and do not guess its contents.

If one unrelated optional asset is missing, continue only when the phase can remain correct and the missing asset can use an approved honest state.

---

# 109. CODE QUALITY RULE

Code must be:

* typed;
* maintainable;
* modular;
* readable;
* secure;
* testable;
* and consistent with the existing architecture.

Avoid:

* giant route files;
* duplicated domain logic;
* `any` without valid reason;
* silent error swallowing;
* magic status strings;
* repeated permission checks with conflicting logic;
* hard-coded sample IDs;
* insecure environment usage;
* and unnecessary Client Components.

Use Server Components by default where suitable.

Use Client Components only where interactivity requires them.

---

# 110. SHARED COMPONENT RULE

Create shared components when:

* behavior is truly shared;
* accessibility should remain consistent;
* state handling is common;
* and design differences can be configured safely.

Do not over-generalize visually different screens into one inflexible generic component.

Do not duplicate shared secure domain logic merely because two screens look different.

Separate:

* domain behavior,
* data access,
* state machine,
* and visual presentation

where appropriate.

---

# 111. ROUTE AND LINK RULE

Every visible navigation control must open the correct:

* route,
* entity,
* tab,
* filter,
* drawer,
* modal,
* or external intent.

Do not use:

* placeholder URLs,
* `href="#"`,
* incorrect IDs,
* generic dashboard redirects,
* or lost return context.

Deep links from Notifications, Leads, Messages, Site Visits, Support and Admin queues must open the exact relevant record and context.

---

# 112. BROWSER HISTORY RULE

Back navigation must behave naturally.

Temporary overlays should normally close before leaving the underlying page.

Authentication return, filter state, search state and entity context should be preserved where required.

Do not create history loops through repeated redirects.

---

# 113. TESTING REQUIREMENTS

After each implementation phase, run applicable:

* focused automated tests;
* unit tests;
* integration tests;
* route tests;
* permission tests;
* RLS tests;
* validation tests;
* concurrency tests;
* idempotency tests;
* lint;
* TypeScript typecheck;
* and production build.

Do not declare success based only on code reading.

Do not declare success merely because the production build succeeds.

---

# 114. REAL BROWSER VERIFICATION

Verification must open the running application in a real browser.

Verify:

* actual rendering;
* interactions;
* navigation;
* form behavior;
* overlays;
* responsive behavior;
* loading;
* data writes;
* network requests;
* authorization failures;
* provider states;
* and browser console.

Inspect actual database changes where the flow performs writes.

Inspect Network payloads for sensitive data leakage.

---

# 115. MULTI-USER PERMISSION TESTING

Use at least:

* Guest;
* Owner A;
* Owner B;
* Broker A;
* Broker team member where applicable;
* Builder A;
* unrelated authenticated user;
* permission-scoped Admin;
* unauthorized Staff;
* and Super Admin where required.

Test direct access to another user’s:

* property,
* project,
* requirement,
* Lead,
* Message,
* Site Visit,
* invoice,
* verification document,
* ticket,
* export,
* saved item,
* Draft,
* and private media.

Cross-user access must fail server-side.

---

# 116. VERIFICATION FAILURE PROCESS

When verification finds a defect:

1. record the defect;
2. identify the real cause;
3. fix the implementation;
4. rerun the focused test;
5. rerun affected regression tests;
6. rerun lint;
7. rerun typecheck;
8. rerun production build;
9. recheck impacted shared surfaces;
10. update the verification result.

Do not mark a known defect as a future enhancement when it is part of required scope.

---

# 117. PASS RULE

A phase may be marked PASS only when:

* all required screens are implemented;
* exact design comparison passes;
* desktop passes;
* tablet passes;
* mobile passes;
* all visible actions work;
* real data is used;
* loading and error states work;
* permissions pass;
* RLS passes;
* privacy passes;
* sensitive payload checks pass;
* duplicate and stale actions pass;
* provider fallbacks are honest;
* lint passes;
* typecheck passes;
* production build passes;
* and no internal required blocker remains.

Build success alone is not PASS.

Rendering alone is not PASS.

Desktop-only completion is not PASS.

---

# 118. BLOCKED RULE

A phase may be marked BLOCKED only when a genuine external dependency prevents full completion.

Examples may include:

* missing external credentials;
* inaccessible third-party account;
* unavailable provider service;
* or user-required file not present.

Even when externally blocked:

* internal application workflow must be implemented where possible;
* Setup Required or fallback UI must be correct;
* no fake success may be shown;
* and all non-blocked requirements must pass.

Internal coding defects are FAIL, not BLOCKED.

---

# 119. IMPLEMENTATION REPORT FORMAT

After each Phase Implementation, return:

## PHASE IMPLEMENTATION REPORT

* Phase:
* Authority files read:
* Exact design files inspected:
* Design screens/states mapped:
* Current routes/components inspected:
* Backend/schema/RLS inspected:
* Provider dependencies inspected:
* Preserve items:
* Replace items:
* Rebuild/new items:
* Files created:
* Files changed:
* Files removed:
* Routes completed:
* Shared components completed:
* Database migrations:
* RLS changes:
* Indexes/constraints:
* Provider behavior and fallbacks:
* Security/privacy work:
* Accessibility work:
* Responsive work:
* Tests run:
* Lint result:
* Typecheck result:
* Production build result:
* Known remaining issues:
* External blockers:
* Phase status: IMPLEMENTED / PARTIAL / BLOCKED

After returning this report, stop and wait for the separate Phase Verification Prompt.

---

# 120. VERIFICATION REPORT FORMAT

After each separate Phase Verification, return:

## PHASE MANUAL VERIFICATION REPORT

* Phase:
* Design files compared:
* Routes/screens tested:
* Guest result:
* Owner result:
* Broker result:
* Builder result:
* Admin/Staff result:
* Super Admin result:
* 320px result:
* 360px result:
* 390px result:
* 430px result:
* Tablet result:
* Desktop result:
* Wide desktop result:
* Loading/skeleton result:
* Empty/filtered-empty result:
* Error/retry result:
* Forbidden/unauthorized result:
* Setup Required/provider result:
* Functional actions tested:
* Database writes verified:
* Network payloads inspected:
* Permission/RLS/privacy result:
* Contact/private-file result:
* Duplicate/idempotency result:
* Concurrency/stale-state result:
* Accessibility/keyboard result:
* Console/network errors:
* Bugs found:
* Fixes applied:
* Retest result:
* Shared regression result:
* Lint after fixes:
* Typecheck after fixes:
* Production build after fixes:
* Remaining blockers:
* Final phase status: PASS / FAIL / BLOCKED

---

# 121. PROHIBITED IMPLEMENTATION PATTERNS

The following are prohibited:

* inventing UI not present in approved design;
* omitting lower screen sections;
* adding a header not present in design;
* adding a footer not present in design;
* adding a sidebar not present in design;
* adding mobile bottom navigation to Admin;
* keeping conflicting old UI;
* hiding old UI only through CSS;
* generic template dashboard replacement;
* basic stacked rectangle wireframes;
* oversized empty spaces;
* fake data;
* fake counts;
* fake analytics;
* fake reviews;
* fake provider health;
* fake delivery status;
* fake payment;
* fake upload;
* fake message;
* fake support reply;
* fake success;
* dead buttons;
* `href="#"`;
* console-only actions;
* disabled required modules;
* permanent Coming Soon;
* full contact in initial DOM;
* public private-document URLs;
* Client-only authorization;
* trusting Client amount or role;
* service-role key exposure;
* unrestricted sensitive `select *`;
* arbitrary first-100 counting;
* unbounded operational lists;
* N+1 queries;
* duplicate domain systems;
* non-idempotent high-risk actions;
* stale Client state as authority;
* raw provider errors shown to users;
* secret values returned after save;
* destructive database reset;
* production random OTP;
* unsafe PWA private-page cache;
* tracking before consent;
* unreviewed Legal translation publication;
* desktop-only verification;
* build-only PASS;
* and moving to the next phase before verification PASS.

---

# 122. DESIGN COMPARISON CHECKLIST

For every screen, compare:

* correct route;
* correct shell;
* exact top boundary;
* exact bottom boundary;
* header;
* sidebar;
* top bar;
* mobile header;
* navigation;
* breadcrumbs;
* title;
* subtitle;
* primary action;
* secondary actions;
* content order;
* card count;
* card hierarchy;
* field order;
* labels;
* helper text;
* tabs;
* filters;
* badges;
* status colors;
* empty state;
* loading state;
* error state;
* modal;
* drawer;
* sheet;
* sticky action;
* bottom navigation;
* footer;
* image ratio;
* text wrapping;
* spacing;
* desktop layout;
* tablet layout;
* mobile layout;
* and interaction behavior.

A screen with correct colors but incorrect structure fails.

A screen with correct desktop appearance but incorrect mobile transformation fails.

A screen with correct appearance but dead functionality fails.

---

# 123. FINAL PRODUCTION COMPLETION DEFINITION

The complete My Gujarat Property implementation is production-ready only when:

1. all five implementation phases are complete;
2. all mapped design screens are implemented;
3. every phase verification is PASS;
4. complete cross-phase regression is PASS;
5. all public roles pass;
6. Admin and Super Admin permissions pass;
7. desktop, tablet and mobile pass;
8. no conflicting old UI remains;
9. no required module remains placeholder;
10. no fake success or fake operational data remains;
11. authentication and return-intent pass;
12. contact privacy passes;
13. private storage passes;
14. RLS and direct URL denial pass;
15. payment truth passes;
16. provider fallback honesty passes;
17. accessibility passes;
18. localization passes;
19. consent behavior passes;
20. SEO and Sitemap behavior pass;
21. PWA cache security passes;
22. lint passes;
23. typecheck passes;
24. production build passes;
25. production environment validation passes;
26. development bypasses are removed or safely disabled;
27. database migrations are applied safely;
28. final backup and rollback readiness are confirmed;
29. final launch smoke tests pass;
30. and no known critical or high-severity blocker remains.

---

# 124. FINAL NON-NEGOTIABLE STATEMENT

The approved design files inside `C:\mgpweb\newdesign` control the final visible browser output.

For every current route, Claude must replace the conflicting current presentation with the exact mapped design screen from header/top boundary through the final bottom section.

Claude must not add visible UI that is absent from the approved screen.

Claude must not remove visible UI that is present in the approved screen.

Claude must not retain conflicting legacy presentation.

Claude must preserve secure compatible functionality, rebuild incorrect functionality and connect every visible action to real data and real backend behavior.

No phase is complete until:

**Exact Design + Complete Functionality + Responsive Behavior + Accessibility + Real Data + Server Authorization + RLS + Privacy + Provider Honesty + Transaction Safety + Idempotency + Performance + Manual Browser Verification + Regression Testing + Lint + Typecheck + Production Build all pass.**

