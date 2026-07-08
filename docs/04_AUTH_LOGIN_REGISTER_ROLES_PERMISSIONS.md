# docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md

# My Gujarat Property — Auth, Login, Register, Roles, Permissions And Access Control

This document defines the complete authentication, registration, login, role, permission, session, protected route, public/admin separation and access-control system for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batch 2). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

* Auth is an **overlay** on the current page: desktop centered modal, mobile bottom sheet (same component, two containers). Continue stays disabled until Terms+Privacy consent is ticked AND 10 digits entered.
* OTP: 6-box input, first box auto-focused, **auto-submit on the 6th digit**; masked destination ("OTP sent to +91 9XXXX XX210") with a **"Change"** link; resend cooldown ("Resend OTP in 0:28").
* Honest full-stop states (no bypass): wrong/expired OTP with **remaining-attempt counter** ("2 attempts left"); rate-limited ("Try again in 15 minutes" + "Back to browsing"); unregistered number ("Create a free account?" + "Use a different number"); OTP provider unavailable ("SMS OTP temporarily unavailable"); suspended/banned (date + reason category + "listings hidden" + Read policy).
* Role selector: Owner / Broker-Agent / Builder-Developer cards with 1-line capability copy; dynamic CTA ("Continue as Owner"). Registration form carries a role chip with **Change**; email optional ("used for receipts and account recovery"); mobile prefilled + locked.
* **Post-login redirect intent**: header Login → home/dashboard; action-triggered login (Enquire/Save/Search) → returns to that exact action (e.g. enquiry sent on the same page, Save Search auto-saved).
* **Admin/Staff portal** (Batch 2): full page (not popup), graphite "MGP Staff Portal" branding, noindex/nofollow, **email + password + Google only, no OTP, no public register**. Invalid-credentials shows remaining attempts → 30-minute lockout (until an exact time, "your admin was notified"). **Staff invite acceptance**: token-based, shows inviter name+role, invited email read-only, password policy (min 12 chars, 1 number, 1 symbol), read-only permissions preview, "invite expires in 6 days · single use".

Claude must read this file before implementing authentication, user registration, role selection, protected actions, dashboards, admin/staff login, permissions, RLS policies or route guards.

No public admin registration is allowed.

No frontend-only access control is allowed.

No role bypass is allowed.

No hidden contact leak is allowed.

---

## 1. Purpose

This file exists to define:

* public user login
* public user registration
* mobile OTP popup
* unregistered mobile flow
* registered mobile login flow
* Owner role
* Broker/Agent role
* Builder/Developer role
* guest access
* logged-in user behavior
* inquiry/contact protected actions
* redirect after login/register
* profile creation
* role-specific onboarding
* role-based dashboards
* role permissions
* admin/staff login
* staff invite-only account system
* Super Admin rules
* granular staff permissions
* route protection
* direct URL blocking
* RLS expectations
* session security
* OTP security
* consent/legal rules
* provider setup-required behavior
* manual verification requirements

This file is the single detailed reference for auth and role behavior.

---

## 2. Core Auth Principles

Authentication must follow these principles:

1. Public users use mobile OTP login/register.
2. Public user registration supports only Owner, Broker/Agent and Builder/Developer.
3. Admin/staff users use a separate login flow.
4. Admin/staff login must not use public mobile OTP.
5. Admin/staff accounts must be invite-only.
6. Public users cannot create admin/staff accounts.
7. Guest users can browse public-safe content.
8. Guest users cannot reveal hidden contacts.
9. Inquiry/contact protected actions must trigger auth popup.
10. Logged-in users should not see login/register CTA.
11. After login/register, user returns to original intended action where possible.
12. Role must be enforced on server and database, not only in UI.
13. Direct URL bypass must be blocked.
14. RLS must protect sensitive data.
15. Service role key must never be in client.
16. OTP provider missing must show `SETUP_REQUIRED`, not fake sent.
17. Auth errors must be safe.
18. Login/session events must be audited where relevant.
19. Suspicious login behavior must be tracked where implemented.
20. No fake verified role or fake permission state is allowed.

---

## 3. User Types

The platform has two broad user groups.

## 3.1 Public Users

Public users are marketplace users.

Public roles:

* Guest
* Owner
* Broker/Agent
* Builder/Developer

Public users use:

* mobile OTP login/register
* role-specific dashboard
* role-specific posting rules
* role-specific leads and billing
* role-specific verification
* public website actions

---

## 3.2 Internal Users

Internal users are platform team members.

Internal roles:

* Super Admin
* Admin
* Staff roles

Internal users use:

* separate admin/staff login
* email/Google login only
* invite-only account creation
* permission-scoped admin panel
* audit logs
* noindex routes
* stronger session/security controls

Internal users must not be created through public registration.

---

## 4. Guest User Rules

Guest means the user is not logged in.

Guest can:

* view homepage
* use city selector
* use public search
* view approved public property cards
* view approved public project cards
* view approved public detail pages
* view public CMS/legal/blog/help pages
* view public-safe broker/builder profiles
* open login/register popup
* click inquiry/contact buttons but must authenticate first
* view pricing/plans if public
* view public ads/promotions
* report public content where allowed and abuse-protected
* share public pages
* use public filters/sort/search

Guest cannot:

* reveal hidden phone/contact
* see private email/mobile
* submit inquiry without login/register
* save property/project to account
* post property
* post project
* post requirement
* access any dashboard
* access admin/staff panel
* access billing/invoices
* access private documents
* access leads/messages/proposals/site visits
* access notifications
* access verification flow
* access draft/pending/rejected listings
* access private API data

Guest protected action behavior:

* show login/register popup
* preserve original action intent
* after login/register, continue original action where safe
* do not lose search/detail context

---

## 5. Public User Roles

## 5.1 Owner

Owner is a property owner.

Owner can:

* login/register using mobile OTP
* create owner profile
* access owner dashboard
* post property
* post requirement
* manage own properties
* manage own requirements
* view own leads
* view own inquiries
* use messages where implemented
* manage site visits where implemented
* view own billing/subscription
* view own invoices
* view own analytics
* submit verification where enabled
* contact support
* receive notifications
* save items/searches where implemented
* request role change

Owner cannot:

* post project
* access builder project dashboard
* access broker-only requirement/proposal features unless future approved
* access admin/staff panel
* edit another user’s listing
* view another user’s private leads
* view private documents of others
* bypass approval
* bypass plan/subscription gate
* bypass verification gate
* fake verified badge
* fake lead/payment/analytics

Owner dashboard route must reject:

* guest
* broker
* builder
* admin/staff public session mismatch
* wrong owner attempting to access another owner’s record

---

## 5.2 Broker / Agent

Broker or agent is a real estate intermediary.

Broker can:

* login/register using mobile OTP
* create broker profile
* access broker dashboard
* post property
* post requirement
* manage own properties
* manage own requirements
* view allowed requirement feed
* send proposals where allowed
* manage own leads
* use CRM
* manage follow-ups
* manage site visits where implemented
* use messages where implemented
* view own billing/subscription
* view own invoices
* view own analytics
* submit broker verification
* contact support
* receive notifications
* request role change

Broker cannot:

* post builder project
* access builder project dashboard
* access builder agent-management module
* access admin/staff panel
* edit another user’s property/requirement
* view another user’s private leads
* bypass approval
* bypass subscription gate
* bypass verification gate
* fake proposal/contact/lead/payment state

Broker dashboard route must reject:

* guest
* owner
* builder
* wrong broker record access
* unauthorized admin/staff context

---

## 5.3 Builder / Developer

Builder or developer is a project creator.

Builder can:

* login/register using mobile OTP
* create builder/developer profile
* access builder dashboard
* post project
* manage own projects
* manage project units/inventory
* manage project leads
* view matching buying requirements where allowed
* send/receive proposals where allowed
* manage builder agents
* assign agent permissions
* manage ads/promotions
* view project analytics
* manage billing/subscription
* view invoices
* submit builder/business verification
* submit RERA/project proof
* receive notifications
* contact support
* request role change

Builder cannot:

* post normal property unless future approved rule changes
* post PG/hostel/room as project
* access owner property posting flow
* access broker-only modules unless explicitly allowed
* access admin/staff panel
* edit another builder’s project
* bypass RERA/approval/payment/verification gates
* fake RERA/verified/project/contact/lead/payment state

Builder dashboard route must reject:

* guest
* owner
* broker
* wrong builder record access
* unauthorized agent access
* unauthorized admin/staff context

---

## 6. Public Login/Register Flow

Public auth is popup-first and mobile OTP based.

## 6.1 Login/Register Entry Points

Login/register popup can open from:

* header login button
* register button
* inquiry button
* contact/reveal button
* save button
* post property button
* post requirement button
* post project button
* dashboard access attempt
* pricing/subscribe action
* report flow if auth required
* proposal action
* message action
* site visit request
* notification deep link requiring auth

Each entry point should pass an intent.

Intent examples:

* `login_header`
* `register_header`
* `inquiry_property`
* `reveal_contact_property`
* `reveal_contact_project`
* `save_property`
* `post_property`
* `post_requirement`
* `post_project`
* `open_dashboard`
* `subscribe_plan`
* `send_proposal`
* `request_site_visit`

After login/register, system should continue intent if safe.

---

## 6.2 Mobile Number Step

First popup step:

* ask mobile number
* default country India `+91`
* allow future NRI/ISD fallback where implemented
* validate mobile format
* show OTP/data usage notice
* show Terms/Privacy links
* show safe error for invalid mobile

Behavior:

1. User enters mobile.
2. Server checks if mobile exists.
3. If exists, go to login OTP step.
4. If not exists, go to registration prompt/role selection.

Do not reveal sensitive account details during mobile check.

Safe wording:

* “This number is not registered. Please create an account.”
* Do not reveal private profile details.

---

## 6.3 Existing Mobile Login Flow

Existing mobile flow:

1. User enters mobile.
2. System identifies existing public user.
3. OTP is sent if provider configured.
4. If OTP provider missing, show setup-required/unavailable state.
5. User enters OTP.
6. OTP verified server-side.
7. User session created.
8. User redirected to intended route/action.
9. Login/register buttons hidden.

Required states:

* loading
* OTP sent
* OTP resend cooldown
* wrong OTP
* expired OTP
* too many attempts
* provider unavailable
* rate limited
* account suspended/banned
* success
* redirecting

No fake OTP sent.

---

## 6.4 Unregistered Mobile Registration Flow

Unregistered mobile flow:

1. User enters mobile.
2. System says number is not registered.
3. Prompt user to register.
4. Show role selector:

   * Owner
   * Broker/Agent
   * Builder/Developer
5. Show role explanation.
6. User selects role.
7. User enters:

   * full name
   * email
   * mobile
8. User accepts:

   * Terms & Conditions
   * Privacy Policy
   * OTP/data usage notice
9. OTP sent if provider configured.
10. User verifies OTP.
11. Profile created.
12. Role-specific profile initialized.
13. User redirected to original intent/dashboard/home.
14. Onboarding/profile completion prompt shown if needed.

Registration cannot include:

* Admin
* Staff
* Super Admin

---

## 6.5 Role Selection UI Requirements

Role selector must be clear and non-confusing.

Role cards should include:

### Owner

Description:

* “I own property and want to list/sell/rent or post my requirement.”

Allowed:

* post property
* post requirement
* manage own leads

Not allowed:

* post builder project

### Broker / Agent

Description:

* “I work as a broker/agent and manage property listings or client requirements.”

Allowed:

* post property
* post requirement
* manage leads
* send proposals

Not allowed:

* post builder project

### Builder / Developer

Description:

* “I am a builder/developer and want to list projects.”

Allowed:

* post project
* manage project leads
* ads/promotions
* agents/permissions

Not allowed:

* post normal property
* post PG/hostel/room as project

Role selection must include warning:

* “Choose carefully. Role change later may require approval.”

---

## 6.6 Registration Fields

Required fields:

| Field                   | Required                                        | Notes                               |
| ----------------------- | ----------------------------------------------- | ----------------------------------- |
| full name               | Yes                                             | validate length and safe characters |
| mobile                  | Yes                                             | verified by OTP                     |
| email                   | Yes or strongly required as per project setting | validate format                     |
| role                    | Yes                                             | owner/broker/builder only           |
| Terms consent           | Yes                                             | stored                              |
| Privacy consent         | Yes                                             | stored                              |
| OTP/data notice consent | Yes                                             | stored or implied with clear notice |

Optional/future fields by role:

Owner:

* display name
* preferred city
* property interest

Broker:

* agency name
* office city
* service areas
* experience
* verification docs

Builder:

* company name
* office city
* company logo
* RERA/developer details
* verification docs

Do not force long onboarding before account creation unless necessary.

Use progressive onboarding.

---

## 6.7 OTP Verification Step

OTP verification must include:

* OTP input
* resend button
* resend cooldown
* attempt count
* expiry notice
* rate limit
* safe wrong OTP error
* safe provider error
* loading state
* success state

OTP must be:

* generated/verified server-side or provider-side
* not logged
* not exposed
* not reusable after success
* expired after configured time
* rate-limited by mobile/IP/session/device where possible

If OTP provider missing:

* show `SETUP_REQUIRED` in development/admin context
* show safe user-facing unavailable message in public context
* do not show fake OTP sent

---

## 6.8 Redirect After Login/Register

After successful auth:

If user came from protected action, return to that action.

Examples:

| Original Action         | After Auth                                                        |
| ----------------------- | ----------------------------------------------------------------- |
| inquiry on property     | continue inquiry form or submit inquiry confirmation              |
| reveal property contact | continue contact reveal with consent                              |
| reveal project contact  | show project contact if allowed                                   |
| save property           | save item                                                         |
| post property           | owner/broker route if role allowed; otherwise role denied message |
| post project            | builder route if role allowed; otherwise role denied message      |
| post requirement        | owner/broker route if role allowed; otherwise role denied message |
| open dashboard          | role dashboard                                                    |
| subscribe plan          | pricing/checkout flow                                             |
| send proposal           | proposal form if role allowed                                     |
| request site visit      | site visit request form                                           |

If role does not allow original action:

* show clear role limitation
* do not silently redirect wrong dashboard
* offer allowed alternatives
* allow role change request if appropriate

---

## 7. Logged-In User Header Behavior

After login:

* hide login/register buttons
* show profile/avatar/menu
* show role-aware dashboard link
* show notifications bell
* show logout
* show theme setting if available
* preserve city selector
* preserve search
* show role-aware primary CTA

Role-aware primary CTAs:

| Role        | Primary CTA                              |
| ----------- | ---------------------------------------- |
| Owner       | Post Property / Post Requirement         |
| Broker      | Post Property / Post Requirement         |
| Builder     | Post Project                             |
| Admin/Staff | Admin Dashboard only in internal context |
| Guest       | Login/Register                           |

Public header must not expose admin/staff links to public users.

---

## 8. Session Rules

Sessions must be secure and predictable.

Rules:

* session checked server-side for protected routes
* logout clears session
* expired session redirects to login/popup
* wrong-role session denied
* suspended/banned session denied
* staff/admin disabled session denied
* session refresh handled safely
* no token exposed in logs
* no raw session object exposed unnecessarily
* public pages must not require session unless protected action
* private pages must not be cached publicly

Admin/staff sessions may require:

* shorter timeout
* device tracking
* suspicious login alert
* re-auth for sensitive actions
* 2FA where implemented/setup-required
* session revoke on staff disable/role change

---

## 9. Public Role Permissions Matrix

## 9.1 Main Permission Matrix

| Action                   |                        Guest |          Owner |      Broker |                   Builder |
| ------------------------ | ---------------------------: | -------------: | ----------: | ------------------------: |
| View homepage            |                          Yes |            Yes |         Yes |                       Yes |
| Search public listings   |                          Yes |            Yes |         Yes |                       Yes |
| View public detail pages |                          Yes |            Yes |         Yes |                       Yes |
| View hidden contact      |                           No |    Conditional | Conditional |               Conditional |
| Submit inquiry           |                Auth required |            Yes |         Yes |                       Yes |
| Save property/project    | Local/limited or auth prompt |            Yes |         Yes |                       Yes |
| Post property            |                           No |            Yes |         Yes |                        No |
| Post project             |                           No |             No |          No |                       Yes |
| Post requirement         |                           No |            Yes |         Yes | No or limited future rule |
| Access owner dashboard   |                           No |            Yes |          No |                        No |
| Access broker dashboard  |                           No |             No |         Yes |                        No |
| Access builder dashboard |                           No |             No |          No |                       Yes |
| View own leads           |                           No |            Yes |         Yes |                       Yes |
| View other user leads    |                           No |             No |          No |                        No |
| Send proposal            |                           No | Limited/future |         Yes |             Where allowed |
| Manage agents            |                           No |             No |          No |                       Yes |
| Manage ads/promotions    |                           No |             No |          No |                       Yes |
| Billing/subscription     |                           No |       Own only |    Own only |                  Own only |
| Verification submission  |                           No |            Own |         Own |                       Own |
| Support ticket           |                Optional/auth |            Own |         Own |                       Own |
| Admin panel              |                           No |             No |          No |                        No |

---

## 9.2 Property Permissions

| Action                  |      Owner |         Broker |                      Builder |
| ----------------------- | ---------: | -------------: | ---------------------------: |
| Create property         |        Yes |            Yes |                           No |
| Save draft              |        Yes |            Yes |                           No |
| Submit for approval     |        Yes |            Yes |                           No |
| Edit own property       |        Yes |            Yes |                           No |
| Edit other property     |         No |             No |                           No |
| Pause own property      |        Yes |            Yes |                           No |
| Resume own property     |        Yes |            Yes |                           No |
| Delete own property     |        Yes |            Yes |                           No |
| View own leads          |        Yes |            Yes | Conditional only if receiver |
| View property analytics |   Own only |       Own only |                           No |
| Upload images           |        Yes |            Yes |                           No |
| Upload PDF brochure     | As allowed | Broker allowed |                           No |

Builder property create remains denied unless explicitly changed in future approved scope.

---

## 9.3 Project Permissions

| Action                      | Owner | Broker | Builder |
| --------------------------- | ----: | -----: | ------: |
| Create project              |    No |     No |     Yes |
| Save project draft          |    No |     No |     Yes |
| Submit project for approval |    No |     No |     Yes |
| Edit own project            |    No |     No |     Yes |
| Edit other builder project  |    No |     No |      No |
| Pause own project           |    No |     No |     Yes |
| Resume own project          |    No |     No |     Yes |
| Delete own project          |    No |     No |     Yes |
| Manage units/inventory      |    No |     No |     Yes |
| Upload project images       |    No |     No |     Yes |
| Upload project video        |    No |     No |     Yes |
| Upload brochure/floor plan  |    No |     No |     Yes |
| Manage project ads          |    No |     No |     Yes |
| Manage agents               |    No |     No |     Yes |

Project must not include PG/hostel/room.

---

## 9.4 Requirement Permissions

| Action                               |          Owner |            Broker |                                    Builder |
| ------------------------------------ | -------------: | ----------------: | -----------------------------------------: |
| Create requirement                   |            Yes |               Yes |                              No by default |
| Save draft                           |            Yes |               Yes |                              No by default |
| Submit for approval                  |            Yes |               Yes |                              No by default |
| Edit own requirement                 |            Yes |               Yes |                              No by default |
| View own requirement leads/proposals |            Yes |               Yes |                Limited if receiver/matched |
| View requirement feed                | No or own only | Yes where allowed | Matching buying requirements where allowed |
| Send proposal                        | Future/limited |               Yes |                          Yes where allowed |
| Delete own requirement               |            Yes |               Yes |                              No by default |

If builder requirement posting is added later, it must be explicitly approved and documented.

---

## 10. Admin / Staff Login System

## 10.1 Internal Login Principles

Admin/staff authentication must be separate from public user auth.

Rules:

* separate URL
* email/Google login only
* no mobile OTP public login
* no public create account
* no self-register
* invite-only
* noindex
* protected by role
* route access checked server-side
* staff permissions checked server-side
* audit login attempts where relevant
* suspicious activity tracked where implemented

---

## 10.2 Internal Login Route

Recommended route:

```txt id="admin-login-route"
/admin/login
```

Alternative internal staff route may be:

```txt id="staff-login-route"
/staff/login
```

Rules:

* no public user registration component
* no mobile OTP field
* no “create account” link
* noindex meta
* robots disallow
* safe error messages
* rate limit login attempts
* redirect logged-in internal user to admin/staff dashboard
* reject public-role users

---

## 10.3 Staff Invite Flow

Staff account creation flow:

1. Super Admin creates invite.
2. Invite includes email, staff role and permissions.
3. Invite token is generated securely.
4. Token is stored hashed.
5. Invite email sent if email provider configured.
6. If email missing, invite is setup-required/manual with safe status.
7. Staff accepts invite.
8. Staff sets up email/Google login.
9. Staff profile created.
10. Staff permissions assigned.
11. Invite marked accepted.
12. Audit log written.

Rules:

* invite expires
* token one-time use
* no raw token stored
* no public staff signup
* disabled staff cannot login
* permission changes audited

---

## 10.4 Super Admin Creation

Super Admin must not be created from public registration.

Allowed methods:

* secure seed/setup script
* protected manual DB setup during initial deployment
* environment-controlled setup command
* invite created by existing Super Admin

Rules:

* no public endpoint to create Super Admin
* no public signup role value `super_admin`
* initial setup must be documented
* Super Admin creation must be audited where possible
* production seed Super Admin credentials must not be hardcoded

---

## 11. Internal Role Permissions

## 11.1 Super Admin

Super Admin can:

* manage everything
* view all modules
* create/edit staff
* manage permissions
* manage providers
* manage feature flags
* manage payment settings
* manage plans/pricing/trials/coupons
* manage legal/CMS/SEO
* view audit logs
* perform high-risk actions with confirmation/audit
* enable maintenance mode
* approve deployment/production signoff

Super Admin actions still require:

* audit logs
* safe confirmation for destructive actions
* no secret exposure
* no silent hard delete
* no untracked provider change

---

## 11.2 Admin

Admin can access assigned operation modules.

Possible access:

* users
* content moderation
* properties
* projects
* requirements
* verification
* reports
* support
* locations
* ads
* billing
* payments
* notifications
* CMS/SEO/legal

Admin cannot by default:

* manage Super Admin
* manage provider secrets
* manage feature flags
* change staff permissions
* hard delete sensitive data
* access private docs unless permitted
* export sensitive data unless permitted
* perform refunds unless permitted
* override payment without audit

---

## 11.3 Staff Roles

Staff roles must be permission-scoped.

### Verification Manager

Can:

* review verification requests
* request changes
* approve/reject if permitted
* view verification docs if permitted
* add internal notes
* call log where implemented

Cannot:

* view provider secrets
* change payment settings
* access unrelated private data

### Support Manager

Can:

* manage support tickets
* reply to users
* assign/escalate tickets
* view support attachments if permitted
* use macros where implemented

Cannot:

* change billing/payment unless permitted
* view private verification docs unless permitted

### Content Manager

Can:

* review property/project/requirement content if permitted
* edit CMS content if allowed
* manage blog drafts/publish if allowed
* request content changes

Cannot:

* access payment/provider secrets
* hard delete without permission

### SEO Manager

Can:

* manage SEO metadata
* manage redirects
* manage sitemap/noindex settings
* manage blog SEO
* review city/locality SEO pages

Cannot:

* expose private data in SEO
* manage provider secrets
* view private documents

### Ads Manager

Can:

* review ads
* approve/reject/need changes
* view ad performance
* verify sponsored label/compliance
* manage ad policy content if allowed

Cannot:

* activate unpaid ad without payment/admin permission
* fake impressions/clicks

### Billing Manager

Can:

* view billing records where permitted
* manage plans if allowed
* review subscriptions
* view invoices
* handle billing support
* issue manual adjustments if permitted/audited

Cannot:

* process refunds unless payment permission exists
* bypass webhook verification

### Payment Manager

Can:

* view payments
* reconcile payments
* manage refunds if permitted
* review webhook failures
* handle payment disputes
* manual activation only with audit if allowed

Cannot:

* access Razorpay secret raw value
* activate payment without audit

### City Manager

Can:

* manage location hierarchy
* review missing location requests
* approve city/locality/society/building additions
* manage location SEO status if permitted

Cannot:

* access private user/payment docs

### User Manager

Can:

* review user accounts
* suspend/ban if permitted
* handle profile reports
* review role change requests if allowed

Cannot:

* change staff permissions
* access private docs unless permitted

### Notification Manager

Can:

* manage notification templates
* view delivery logs
* test notification channels if allowed
* manage preferences/config where permitted

Cannot:

* view provider secret raw values
* fake delivery status

### System Manager

Can:

* view provider health
* run safe health checks
* view system status
* manage safe operational settings if permitted

Cannot:

* view raw secrets unless Super Admin-level permission
* change payment/security-critical config without permission

### Security Manager

Can:

* review security events
* review rate limits
* handle fraud reports
* review suspicious activity
* recommend bans/suspensions
* access audit logs where permitted

Cannot:

* delete audit logs
* bypass legal/privacy process

### Reports Manager

Can:

* view analytics/reports
* export allowed reports
* filter dashboards
* view performance/business metrics

Cannot:

* export sensitive/private data without export permission

### Audit Manager

Can:

* view audit logs
* review high-risk actions
* export audit logs if permitted
* flag suspicious admin/staff actions

Cannot:

* edit/delete audit logs

---

## 12. Permission Model

Permissions should be modular.

Recommended permission fields:

* `module`
* `can_read`
* `can_write`
* `can_create`
* `can_update`
* `can_delete`
* `can_restore`
* `can_hard_delete`
* `can_approve`
* `can_reject`
* `can_request_changes`
* `can_assign`
* `can_export`
* `can_bulk_action`
* `can_view_sensitive`
* `can_view_private_documents`
* `can_manage_payments`
* `can_refund`
* `can_manual_activate`
* `can_manage_providers`
* `can_manage_feature_flags`
* `can_manage_staff`
* `can_manage_permissions`
* `can_view_audit_logs`
* `can_manage_security`
* `can_publish`
* `can_manage_seo`
* `can_manage_legal`

Permission checks must happen:

* in UI
* on route access
* on server action/API
* in DB/RLS where applicable
* before exports
* before private document access
* before sensitive actions

UI permission hiding is not enough.

---

## 13. Protected Route Rules

## 13.1 Public Protected Routes

Public dashboard routes require:

* authenticated session
* public role
* correct role
* active account status
* not banned/suspended
* onboarding status where needed
* plan/verification gate where action needs it

Examples:

| Route                                    | Required                               |
| ---------------------------------------- | -------------------------------------- |
| `/dashboard/owner`                       | Owner                                  |
| `/dashboard/broker`                      | Broker                                 |
| `/dashboard/builder`                     | Builder                                |
| `/dashboard/owner/properties/[id]/edit`  | Owner and owns property                |
| `/dashboard/broker/properties/[id]/edit` | Broker and owns property               |
| `/dashboard/builder/projects/[id]/edit`  | Builder and owns project               |
| `/dashboard/builder/agents`              | Builder                                |
| `/dashboard/*/billing`                   | Authenticated owner of billing account |

---

## 13.2 Admin Protected Routes

Admin routes require:

* internal auth
* staff/admin/Super Admin profile
* active internal account
* permission for module
* noindex
* direct URL blocking
* safe unauthorized page

Examples:

| Route                  | Required                              |
| ---------------------- | ------------------------------------- |
| `/admin/dashboard`     | Internal role                         |
| `/admin/users`         | user read permission                  |
| `/admin/staff`         | staff manage permission               |
| `/admin/providers`     | provider permission / Super Admin     |
| `/admin/payments`      | payment/billing permission            |
| `/admin/audit`         | audit permission                      |
| `/admin/feature-flags` | feature flag permission / Super Admin |
| `/admin/security`      | security permission                   |

---

## 14. Direct URL Bypass Rules

Every protected route must deny unauthorized direct URL access.

Direct URL tests must check:

* guest to owner dashboard
* guest to broker dashboard
* guest to builder dashboard
* owner to broker route
* owner to builder route
* broker to owner route
* broker to builder project route
* builder to property posting route
* wrong owner edit listing route
* wrong builder edit project route
* public user to admin route
* staff without permission to admin module
* admin without Super Admin permission to provider/feature flag route
* guest to private document URL
* wrong user to invoice URL
* wrong user to message thread

If direct URL bypass works, it is a security bug.

---

## 15. RLS Expectations For Auth And Roles

RLS must enforce:

* user can read/update own profile
* user cannot read another user’s private profile
* guest can read only public-safe profile fields
* owner can manage own property/requirement
* broker can manage own property/requirement
* builder can manage own project/agents/ads
* builder agents only assigned data
* user can read own notifications
* user can read own billing/invoices
* user can read own leads/messages
* staff can read assigned module data only
* Super Admin can read admin-scoped data
* private documents restricted
* payment/webhook data restricted
* audit logs restricted
* provider settings restricted
* feature flags restricted

Public-safe views must exclude hidden contact/private fields.

---

## 16. Auth-Related Database Tables

Auth system may use these tables:

* `profiles`
* `owner_profiles`
* `broker_profiles`
* `builder_profiles`
* `staff_profiles`
* `staff_invites`
* `staff_permissions`
* `role_change_requests`
* `legal_consents`
* `auth_events`
* `security_events`
* `rate_limit_events`
* `audit_logs`
* `sessions` if app-level session tracking is added
* `device_sessions` if device tracking is added
* `login_attempts` if separate tracking is added
* `otp_attempts` if custom OTP provider flow is added

Actual table names may vary, but behavior must exist.

---

## 17. Profile Creation Rules

When a public user registers:

1. Supabase Auth user created.
2. `profiles` row created.
3. Role stored as owner/broker/builder.
4. Role-specific profile row created:

   * `owner_profiles`
   * `broker_profiles`
   * `builder_profiles`
5. Legal consent stored.
6. Auth event logged.
7. Welcome notification created if implemented.
8. Onboarding prompt shown if profile incomplete.

Profile creation must be atomic where possible.

If role-specific profile creation fails:

* do not leave inconsistent role state
* show safe error
* log safe server error
* allow retry or rollback

---

## 18. Account Status Rules

Public account statuses:

* `active`
* `pending_verification`
* `suspended`
* `banned`
* `deleted`

Rules:

| Status               | Behavior                                              |
| -------------------- | ----------------------------------------------------- |
| active               | normal access                                         |
| pending_verification | access allowed with verification gates where needed   |
| suspended            | login/dashboard restricted, safe message              |
| banned               | login/dashboard blocked, safe message                 |
| deleted              | no normal access, privacy/legal retention rules apply |

Internal staff account statuses:

* `invited`
* `active`
* `disabled`
* `suspended`
* `deleted`

Disabled/suspended staff must not access admin.

---

## 19. Role Change Request Rules

Users may request role change.

Examples:

* Owner → Broker
* Broker → Owner
* Owner → Builder
* Broker → Builder
* Builder → Broker
* Builder → Owner

Role change must:

* show impact warning
* require reason
* require approval
* preserve existing records safely
* avoid permission leak
* revoke old dashboard access after approval where needed
* update role-specific profile
* audit action
* notify user
* possibly require verification
* handle subscription/plan impact
* handle active listings/projects/requirements
* not silently delete data

Direct role self-change without approval is not allowed unless future rules explicitly allow.

---

## 20. Plan, Subscription And Auth Gates

Some actions require active plan.

Plan gate may apply to:

* post property
* post project
* post requirement
* upload extra media
* unlock leads/contact
* create ads/promotions
* add builder agents
* access advanced analytics
* use certain proposal features

Auth gate order:

1. user logged in?
2. correct role?
3. account active?
4. required profile complete?
5. required verification?
6. required subscription/plan?
7. limit available?
8. provider available?
9. action allowed?

If plan missing:

* show pricing/plan popup
* do not fake active plan
* do not allow bypass through direct URL/API
* server action must reject

---

## 21. Verification Gates

Verification may gate:

* verified badge
* broker trust label
* builder trust label
* project promotion
* RERA display/promotion
* contact reveal limits
* higher plan limits
* public profile trust display
* admin approval rules

Verification status must be real.

Do not show verified badge unless approved.

Badge disclaimer:

* verification badge is not legal guarantee
* platform does not guarantee ownership/title
* users must do their own due diligence

---

## 22. Auth UI State Requirements

Auth UI must include states:

* initial mobile entry
* checking mobile
* registration required
* role selection
* registration form
* OTP sending
* OTP sent
* OTP resend cooldown
* OTP verifying
* wrong OTP
* expired OTP
* too many attempts
* provider unavailable
* setup-required
* suspended/banned account
* success
* redirecting
* generic safe error

No blank popup.

No infinite spinner.

No raw provider error.

---

## 23. Auth Modal / Popup UX Rules

Auth popup must:

* be mobile-first
* fit 320px width
* use bottom sheet on mobile if suitable
* support desktop modal
* lock background scroll
* close on outside tap where safe
* back button closes step/popup first where implemented
* preserve form state when switching steps
* prevent double submit
* show disabled loading state
* show clear validation errors
* support keyboard/focus
* not overlap with sticky header badly
* not cause horizontal scroll
* not expose admin login link in public flow

---

## 24. Consent And Legal Rules In Auth

Registration must include:

* Terms & Conditions consent
* Privacy Policy consent
* OTP/data usage notice
* contact sharing notice where relevant
* marketing opt-in optional where implemented
* cookie/analytics preference where applicable

Consent must store:

* profile/user ID
* consent type
* policy version
* timestamp
* IP/device hash where safe
* user agent hash where safe

Do not make legal claims such as:

* “100% verified”
* “guaranteed safe”
* “legally approved”
* “ownership guaranteed”

---

## 25. OTP Provider Setup-Required Rules

OTP provider may not be configured initially.

If OTP provider is missing in development:

* show setup-required state
* allow dev-only controlled testing only if explicitly configured
* mark provider status in `API_PROVIDER_STATUS.md`
* do not fake OTP sent

If OTP provider is missing in production:

* public OTP login cannot be considered PASS
* show safe unavailable state
* do not allow fake login
* admin/staff login must remain separate

OTP provider status must be tracked in:

* `API_PROVIDER_STATUS.md`
* `MANUAL_VERIFICATION.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `brain.md`

---

## 26. Admin/Staff Security Enhancements

Admin/staff should support or track:

* login attempt limit
* session timeout
* 2FA setup-required/implemented
* suspicious login alert
* device/session tracking
* IP/device hash logging
* forced logout on disable/suspension
* re-auth for sensitive actions where implemented
* maker-checker for high-risk changes
* audit logs
* private data permission
* export permission
* provider settings permission
* payment/refund permission

If not implemented yet, mark `NOT_STARTED` or `SETUP_REQUIRED`, not skipped.

---

## 27. Notifications Related To Auth

Notifications may be created for:

Public users:

* account created
* login from new device where implemented
* role change requested
* role change approved/rejected
* verification requested/approved/rejected
* subscription/plan required
* suspicious activity

Admin/staff:

* new user registration if configured
* role change request
* verification request
* suspicious login
* provider/auth failure
* OTP abuse/rate limit spike

External delivery depends on provider status.

No fake email/SMS/WhatsApp sent status.

---

## 28. Auth And SEO Rules

Auth/dashboard/admin pages must follow SEO rules:

Public login/register:

* may be noindex if popup-first
* fallback page safe

Dashboards:

* noindex
* private
* not in sitemap

Admin/staff:

* noindex
* disallow in robots
* not in sitemap
* no public metadata exposing internal modules

Public profiles:

* SEO allowed only with public-safe fields
* no private contact
* no hidden contact
* no private verification documents

---

## 29. Auth And Caching Rules

Do not globally cache:

* dashboard pages
* account/profile private pages
* auth session data
* notifications
* billing
* leads
* messages
* private documents
* admin pages
* staff pages
* user-specific saved items
* contact reveal state

Public pages can be cached if they use public-safe data only.

Never cache private user data as public.

---

## 30. Auth And Logging Rules

Do not log:

* OTP
* password
* access token
* refresh token
* session token
* provider API key
* service role key
* full mobile number when not necessary
* hidden contact
* private user data
* private document URL

Safe logging:

* redacted mobile
* safe event type
* user ID/profile ID internal
* safe status
* safe error code
* timestamp
* IP/device hash

Auth errors must be safe.

---

## 31. Auth Rate Limits

Rate limits required for:

* mobile number check
* OTP send
* OTP verify
* OTP resend
* registration attempts
* login attempts
* admin/staff login attempts
* staff invite accept attempts
* contact reveal
* inquiry submit
* provider test buttons
* role change request
* support/report abuse

Rate limit should consider:

* IP hash
* mobile hash
* user ID
* device/session hash
* action type
* time window

Rate limit failure must show safe error.

---

## 32. Auth Testing Checklist

Auth implementation must test:

### Public Auth

* guest opens login popup
* mobile field validation
* existing mobile flow
* unregistered mobile register prompt
* role selector Owner/Broker/Builder only
* full name required
* email validation
* Terms/Privacy required
* OTP provider setup-required if missing
* OTP success if provider configured
* wrong OTP safe error
* resend cooldown
* rate limit
* successful login hides login/register
* logout works
* original action redirect works
* suspended/banned account blocked

### Role Access

* owner dashboard allowed for owner
* broker dashboard allowed for broker
* builder dashboard allowed for builder
* owner denied broker/builder routes
* broker denied owner/builder routes
* builder denied owner/broker routes
* owner cannot post project
* broker cannot post project
* builder cannot post property
* guest denied all dashboards
* wrong owner denied record edit

### Admin/Staff

* admin login separate
* admin route noindex
* no mobile OTP admin login
* no public staff registration
* staff invite-only
* staff permission scoped
* wrong staff route denied
* disabled staff denied
* Super Admin all modules allowed
* sensitive action audited

### RLS

* guest denied private profile
* guest denied hidden contact
* user reads own profile
* user denied another profile private fields
* owner reads own property
* wrong owner denied
* staff permission allowed/denied
* Super Admin allowed where intended

### Security

* service role not in client
* OTP not logged
* tokens not logged
* safe errors
* direct URL bypass blocked
* private data not cached publicly

---

## 33. Auth Manual Verification Result Template

Use this format in `MANUAL_VERIFICATION.md` after auth phase:

```md id="auth-verification-template"
## AUTH-VERIFY-YYYYMMDD-000 — Auth Roles RLS Verification

### Scope
- Public mobile OTP:
- Registration:
- Role selector:
- Owner dashboard:
- Broker dashboard:
- Builder dashboard:
- Admin/staff login:
- Permissions:
- RLS:
- Direct URL bypass:

### Roles Tested
- Guest:
- Owner:
- Broker:
- Builder:
- Super Admin:
- Admin:
- Staff:

### Routes Tested
-

### Provider Status
- OTP:
- Email:
- Google:
- Supabase Auth:

### Results
| Check | Result | Notes |
|---|---|---|
| Guest protected action opens auth popup | PASS/PARTIAL/BLOCKED/FAIL |  |
| Unregistered mobile registration prompt | PASS/PARTIAL/BLOCKED/FAIL |  |
| Role selector only Owner/Broker/Builder | PASS/PARTIAL/BLOCKED/FAIL |  |
| Owner access rules | PASS/PARTIAL/BLOCKED/FAIL |  |
| Broker access rules | PASS/PARTIAL/BLOCKED/FAIL |  |
| Builder access rules | PASS/PARTIAL/BLOCKED/FAIL |  |
| Admin/staff separation | PASS/PARTIAL/BLOCKED/FAIL |  |
| Direct URL bypass blocked | PASS/PARTIAL/BLOCKED/FAIL |  |
| RLS allow/deny checks | PASS/PARTIAL/BLOCKED/FAIL |  |
| Hidden contact protected | PASS/PARTIAL/BLOCKED/FAIL |  |
| Service role not exposed | PASS/PARTIAL/BLOCKED/FAIL |  |

### Bugs Found
-

### Final Result
PASS / PARTIAL / BLOCKED / FAIL
```

---

## 34. Auth Feature Registry Items

`FEATURE_REGISTRY.md` must track at least:

* public mobile OTP login
* unregistered mobile registration prompt
* role selector
* owner registration
* broker registration
* builder registration
* OTP resend/rate limit
* auth popup intent redirect
* logged-in header behavior
* logout
* owner dashboard access
* broker dashboard access
* builder dashboard access
* role route guards
* direct URL protection
* admin/staff login
* staff invite
* staff permissions
* Super Admin access
* role change request
* account suspension/ban
* session timeout
* suspicious login tracking
* Terms/Privacy consent
* RLS profile policies
* public-safe profile views
* service role isolation

Each item must have real status.

---

## 35. Auth Bug Examples

Create bug if:

* login/register button still visible after login
* unregistered mobile does not prompt registration
* role selector includes admin/staff
* owner can post project
* builder can post property
* guest can access dashboard
* wrong owner can edit listing
* public user can access admin route
* admin route appears in sitemap
* hidden contact appears before reveal
* OTP logged
* OTP fake sent
* OTP no rate limit
* failed auth shows raw provider error
* service role key appears in client
* public user can create staff account
* disabled staff can login
* staff accesses unauthorized module
* payment/plan gate bypass through auth flow
* private profile data appears publicly

---

## 36. Implementation Order For Auth Phase

Recommended implementation order:

1. create auth utilities
2. configure Supabase client/server client
3. define role types
4. define profile tables/migrations
5. define staff tables/migrations
6. create base RLS policies
7. create public-safe profile view
8. create auth popup UI shell
9. create mobile check flow
10. create registration role selector
11. create OTP setup-required adapter
12. create profile creation server action
13. create dashboard route guards
14. create admin/staff login route shell
15. create staff invite model/admin placeholder
16. create permission helpers
17. add legal consent storage
18. add rate-limit structure
19. add audit/security event structure
20. run tests/manual verification
21. update docs

Provider credentials may be setup-required, but UI/backend must not fake provider success.

---

## 37. Migration Expectations For Auth Phase

Auth phase likely requires migrations for:

* profiles
* role-specific profiles
* staff profiles
* staff invites
* staff permissions
* role change requests
* legal consents
* auth/security events
* rate limit events
* audit logs
* public-safe profile views
* RLS policies

Migration must include:

* table definitions
* indexes
* RLS enable
* RLS policies
* rollback notes
* public-safe views
* no destructive changes unless approved

---

## 38. Auth Security PASS Requirements

Auth phase cannot be `PASS` unless:

* public auth flow exists or provider missing is setup-required
* role selector excludes admin/staff
* public registration creates only owner/broker/builder
* dashboard routes are role-protected
* admin/staff routes are separate
* staff public registration impossible
* direct URL bypass blocked
* RLS base policies exist and are tested where DB exists
* service role not exposed
* hidden contact not exposed through auth flow
* safe errors exist
* rate limits exist or are tracked/blocking if launch
* docs updated
* manual verification updated
* bugs tracked/fixed

If OTP real provider is missing, auth may be `PARTIAL` or `SETUP_REQUIRED` depending phase scope.

---

## 39. Current Auth Status

As of this documentation generation stage:

| Auth Area                    | Status           |
| ---------------------------- | ---------------- |
| Public mobile OTP login      | `NOT_STARTED`    |
| Public registration          | `NOT_STARTED`    |
| Owner role registration      | `NOT_STARTED`    |
| Broker role registration     | `NOT_STARTED`    |
| Builder role registration    | `NOT_STARTED`    |
| OTP provider                 | `SETUP_REQUIRED` |
| Supabase Auth                | `NOT_STARTED`    |
| Supabase profiles            | `NOT_STARTED`    |
| Role-specific profiles       | `NOT_STARTED`    |
| Admin/staff login            | `NOT_STARTED`    |
| Staff invite-only system     | `NOT_STARTED`    |
| Staff permissions            | `NOT_STARTED`    |
| Super Admin setup            | `NOT_STARTED`    |
| Route guards                 | `NOT_STARTED`    |
| Direct URL bypass protection | `NOT_STARTED`    |
| RLS policies                 | `NOT_STARTED`    |
| Public-safe profile views    | `NOT_STARTED`    |
| Consent storage              | `NOT_STARTED`    |
| Rate limits                  | `NOT_STARTED`    |
| Audit/security events        | `NOT_STARTED`    |
| Manual verification          | `NOT_STARTED`    |

---

## 40. Documentation Generation Progress

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
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Pending |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Pending |
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

## 41. Related Documents

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
* later dashboard/admin/billing/security docs
* auth implementation prompt
* auth manual verification prompt
* SQL migration files
* RLS policies

---

## 42. Final Auth Rule

Public users can only register as Owner, Broker/Agent or Builder/Developer.

Admin and staff are separate, invite-only and never public.

Guest can browse but cannot reveal hidden contact.

Logged-in role access must be enforced server-side and with RLS.

Direct URL bypass must be blocked.

OTP provider missing must show setup-required, not fake sent.

Payment/plan/verification gates must be enforced on the server.

No frontend-only security.

No service role in client.

No hidden contact leak.

No fake auth PASS.
