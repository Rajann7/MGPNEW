# My Gujarat Property — User Flow and Navigation Map

This report details the primary operational workflows discovered in My Gujarat Property, followed by the screen access, redirect, and menu navigation matrices.

---

## 1. Discovered User Flows

### Flow FL-001: Guest Property Search and Discovery
* **Starting role:** Guest
* **Authentication state:** Unauthenticated
* **Starting screen:** Homepage (`SCR-001`)
* **Entry point:** Direct URL `/`
* **Required data:** Search query text or city selection
* **Steps:**
  1. Guest visits homepage, selects city (e.g. "Ahmedabad") via `UI-SCR001-002`.
  2. Enters search keyword in `UI-SCR001-003` and submits via `UI-SCR001-004`.
  3. Transitions to Search page `/search?city=ahmedabad&q={query}` (`SCR-007`).
  4. Clicks on a listing card `/property/[slug]` or `/project/[slug]`.
* **Branches:** If searching for a project, routes to `/project/[slug]`; if searching for a property, routes to `/property/[slug]`.
* **Overlay behaviour:** City selector dropdown opens on click.
* **Redirect behaviour:** None.
* **Close behaviour:** Dropdown closes on click outside or Escape.
* **Back behaviour:** Browser Back returns from Search to Homepage.
* **Refresh behaviour:** Page state reloads from URL search parameters.
* **Final screen:** Property Detail (`SCR-002`) or Project Detail (`SCR-003`).
* **Source evidence:** `src/components/public/HomeHeroSearch.tsx`, `src/app/search/page.tsx`
* **Runtime status:** `RUNTIME_AND_SOURCE_CONFIRMED`
* **Blockers:** None.

### Flow FL-002: Guest Login and OTP Verification
* **Starting role:** Guest
* **Authentication state:** Unauthenticated
* **Starting screen:** Homepage (`SCR-001`)
* **Entry point:** Header "Login" button `UI-SCR001-009`
* **Required data:** 10-digit mobile number, 4-digit verification code
* **Steps:**
  1. Guest clicks "Login", triggering `AuthModal` popup overlay.
  2. Enters 10-digit number and clicks "Send OTP".
  3. Form displays 4 OTP boxes and active countdown timer.
  4. Mock SMS provider automatically registers code. Enters 4-digit code.
  5. Session initializes. Popover closes. Homepage reloads authenticated.
* **Branches:** If the user is new, flows to Role Onboarding; if existing, logs in directly.
* **Overlay behaviour:** Modal slides up over Homepage, blocking interaction with the background.
* **Redirect behaviour:** Redirects to current originating route after successful auth.
* **Close behaviour:** Closes via Close button, Escape, or click outside.
* **Back behaviour:** None (modal remains active).
* **Refresh behaviour:** Reloading forces modal to close, returning guest to initial homepage.
* **Final screen:** Homepage (`SCR-001`) in authenticated state.
* **Source evidence:** `src/components/auth/AuthModal.tsx`, `src/components/auth/MobileOtpForm.tsx`
* **Runtime status:** `RUNTIME_AND_SOURCE_CONFIRMED`
* **Blockers:** None.

### Flow FL-003: New User Role Onboarding
* **Starting role:** Guest (Newly authenticated)
* **Authentication state:** Authenticated (New user, profile missing `public_role`)
* **Starting screen:** Homepage (`SCR-001`) with Active `AuthModal`
* **Entry point:** Immediate callback trigger after correct OTP entry
* **Required data:** Role selection (`owner`, `broker`, or `builder`) and Full Name
* **Steps:**
  1. Upon entering the correct OTP, the modal transitions from OTP form to `RegisterRoleForm`.
  2. Displays cards for "Owner", "Broker / Agent", and "Builder / Developer".
  3. User selects a role and inputs their name.
  4. Clicks "Complete Profile".
  5. Modal closes, writing profile row to PostgreSQL and redirecting to the role-specific dashboard.
* **Branches:**
  - Owner selected -> `/dashboard/owner`
  - Broker selected -> `/dashboard/broker`
  - Builder selected -> `/dashboard/builder`
* **Overlay behaviour:** Role selection sheet rendered inside AuthModal overlay.
* **Redirect behaviour:** Server redirects to `getDashboardRoute(role)`.
* **Close behaviour:** Disabled during onboarding step to prevent profile-less sessions.
* **Back behaviour:** Disabled.
* **Refresh behaviour:** Reloading traps the user in the role onboarding sheet if profile is incomplete.
* **Final screen:** Role Dashboard overview page.
* **Source evidence:** `src/components/auth/RegisterRoleForm.tsx`, `src/lib/auth/actions.ts`
* **Runtime status:** `RUNTIME_AND_SOURCE_CONFIRMED`
* **Blockers:** None.

### Flow FL-004: Protected-Action Authentication
* **Starting role:** Guest
* **Authentication state:** Unauthenticated
* **Starting screen:** Property Detail (`SCR-002`)
* **Entry point:** "Reveal Contact Number" or "Enquire Now" action
* **Required data:** Session initialization credentials
* **Steps:**
  1. Guest clicks "Reveal Number" `UI-SCR002-003`.
  2. Page checks if session profile exists. If null, triggers `AuthModal` overlay.
  3. Guest completes OTP verification flow.
  4. Session is established, modal closes.
  5. Original detail page updates to fetch `contactState` and reveal number.
* **Branches:** None.
* **Overlay behaviour:** AuthModal slides over detail page.
* **Redirect behaviour:** Originating path preserved in state; no route change occurs.
* **Close behaviour:** Closes on Escape. Number remains masked until revealed.
* **Back behaviour:** None.
* **Refresh behaviour:** Reloading returns page to original masked state.
* **Final screen:** Property Detail (`SCR-002`) with contact number visible.
* **Source evidence:** `src/app/property/[slug]/page.tsx`, `src/components/auth/AuthTrigger.tsx`
* **Runtime status:** `RUNTIME_AND_SOURCE_CONFIRMED`
* **Blockers:** None.

### Flow FL-005: Property Posting Entry (Owner)
* **Starting role:** Owner
* **Authentication state:** Authenticated
* **Starting screen:** Owner Dashboard Overview (`SCR-030`)
* **Entry point:** "Post Property" shortcut or bottom mobile tab Post button
* **Required data:** Complete property fields (B5-S01 posting wizard)
* **Steps:**
  1. Owner clicks "Post Property".
  2. Navigates to `/dashboard/owner/properties/new`.
  3. Displays wizard posting form layout.
* **Branches:** None.
* **Overlay behaviour:** None (renders full-page wizard).
* **Redirect behaviour:** Redirects to `/login` if session expires.
* **Close behaviour:** "Cancel" returns owner to Properties listing.
* **Back behaviour:** Contextual Back button prompts unsaved warnings.
* **Refresh behaviour:** Reloading loads the form from the latest autosaved draft.
* **Final screen:** Properties listing overview `/dashboard/owner/properties`.
* **Source evidence:** `src/components/forms/PropertyForm.tsx`, `src/components/forms/wizard/PostingWizardShell.tsx`
* **Runtime status:** `RUNTIME_AND_SOURCE_CONFIRMED`
* **Blockers:** Enforced billing checks if `BILLING_GATES_ENFORCED=true`.

---

## 2. Navigation Matrices

### Role-to-Screen Access Matrix
| Screen Route | Guest | Owner | Broker | Builder | Admin | Super Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | Access | Access | Access | Access | Access | Access |
| `/search` | Access | Access | Access | Access | Access | Access |
| `/property/[slug]` | Access | Access | Access | Access | Access | Access |
| `/dashboard/owner` | Redirect | Access | Denied | Denied | Denied | Denied |
| `/dashboard/broker` | Redirect | Denied | Access | Denied | Denied | Denied |
| `/dashboard/builder` | Redirect | Denied | Denied | Access | Denied | Denied |
| `/admin` | Redirect | Denied | Denied | Denied | Access | Access |

### Protected-Route Redirect Matrix
* **Unauthenticated Access:**
  - `/dashboard/*` -> redirects to `/login?redirectTo=/dashboard` -> after login resolves role dashboard.
  - `/profile` -> redirects to `/login?redirectTo=/profile`.
  - `/admin/*` -> redirects to `/unauthorized?reason=admin_denied`.
* **Incorrect Public Role Access:**
  - Owner attempting `/dashboard/broker` -> redirects to `/unauthorized?reason=wrong_role`.
  - Builder attempting `/dashboard/owner` -> redirects to `/unauthorized?reason=wrong_role`.
* **Restricted Accounts:**
  - Profile status `suspended`/`banned` -> redirects to `/unauthorized?reason=account_restricted`.
  - Profile status `deleted` -> redirects to `/unauthorized?reason=account_deleted`.

### Desktop Sidebar Navigation Matrix
* **Owner Dashboard (`SHELL-DASHBOARD-OWNER`):**
  1. Overview -> `/dashboard/owner`
  2. My Properties -> `/dashboard/owner/properties`
  3. My Requirements -> `/dashboard/owner/requirements`
  4. Leads -> `/dashboard/owner/leads`
  5. Messages -> `/dashboard/messages`
  6. Site Visits -> disabled (`#`)
  7. Saved -> `/dashboard/owner/saved`
  8. Analytics -> disabled (`#`)
  9. Billing -> `/dashboard/owner/billing`
  10. Settings -> disabled (`#`)
  11. Verification -> `/dashboard/owner/verification`
  12. Profile -> `/profile`
  13. Support -> `/support`

* **Broker Dashboard (`SHELL-DASHBOARD-BROKER`):**
  1. Overview -> `/dashboard/broker`
  2. My Listings -> `/dashboard/broker/properties`
  3. My Requirements -> `/dashboard/broker/requirements`
  4. Leads / CRM -> `/dashboard/broker/leads`
  5. Proposals -> `/dashboard/broker/proposals`
  6. Messages -> `/dashboard/messages`
  7. Saved Items -> `/dashboard/broker/saved`
  8. Notifications -> `/dashboard/broker/notifications`
  9. Billing -> `/dashboard/broker/billing`
  10. Verification -> `/dashboard/broker/verification`
  11. Public Profile -> `/dashboard/broker/public-profile`
  12. Profile -> `/profile`
  13. Support -> `/support`

* **Builder Dashboard (`SHELL-DASHBOARD-BUILDER`):**
  1. Overview -> `/dashboard/builder`
  2. My Projects -> `/dashboard/builder/projects`
  3. Project Leads -> `/dashboard/builder/leads`
  4. Matching Requirements -> `/dashboard/builder/requirements`
  5. Messages -> `/dashboard/messages`
  6. Ads / Promotions -> `/dashboard/builder/ads`
  7. Agents / Team -> `/dashboard/builder/agents`
  8. Notifications -> `/dashboard/builder/notifications`
  9. Billing -> `/dashboard/builder/billing`
  10. Verification / RERA -> `/dashboard/builder/verification`
  11. Public Profile -> `/dashboard/builder/public-profile`
  12. Profile -> `/profile`
  13. Support -> `/support`
