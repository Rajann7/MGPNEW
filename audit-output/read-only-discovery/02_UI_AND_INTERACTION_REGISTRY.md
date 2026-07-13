# My Gujarat Property — UI and Interaction Registry

This document lists the UI components and interactive controls for key interface screens. All elements are assigned a unique ID in the format `UI-[SCREEN-ID]-[ITEM-NUMBER]`.

---

## 1. Homepage (`SCR-001`)

### Component and Control Summary
* **Total Meaningful Components:** 12
* **Total Interactive Controls:** 22
* **Total Non-Interactive Components:** 4
* **Total Conditional Controls:** 6
* **Total Navigation Controls:** 12
* **Total Form Controls:** 4
* **Total Overlay Triggers:** 3

### UI & Interaction Table
| UI ID | Label or Description | Type | Interactive | Visibility Condition | Roles | Devices | Handler or Destination | Safe to Execute | Observed Result | Source Evidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UI-SCR001-001** | App Logo | Navigation Link | Yes | None (Always) | All | All | `/` (Refresh / Home) | Yes | Navigates to Home | `src/components/layout/Logo.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-002** | City Selector Dropdown | Button / Trigger | Yes | Home only | All | Desktop | Opens location selector popover | Yes | Displays dropdown list of cities | `src/components/layout/PublicHeaderClient.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-003** | Search Input Box | Input Field | Yes | None | All | All | Updates local search state query | Yes | User typing updates text value | `src/components/public/HomeHeroSearch.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-004** | Search Submit Button | Button | Yes | None | All | All | `/search?q={query}&city={city}` | Yes | Navigates to search page | `src/components/public/HomeHeroSearch.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-005** | Category: Buy Properties | Navigation Card | Yes | None | All | All | `/search?tab=buy` | Yes | Navigates to search with Buy filters | `src/components/public/HomeCategoryTiles.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-006** | Category: Rent Properties | Navigation Card | Yes | None | All | All | `/search?tab=rent` | Yes | Navigates to search with Rent filters | `src/components/public/HomeCategoryTiles.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-007** | Featured Property Card | Card link | Yes | If featured items exist | All | All | `/property/[slug]` | Yes | Navigates to property detail | `src/components/public/HomeFeaturedProperties.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-008** | Post Listing Shortcut Card | Button | Yes | None | All | All | Triggers AuthModal or dashboard route | Yes | Opens login modal if Guest, else dashboard | `src/components/public/HomeRoleCards.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-009** | Login/Register CTA | Button | Yes | Guest | Guest | All | Opens `AuthModal` overlay | Yes | Renders login popover | `src/components/layout/PublicHeaderClient.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR001-010** | Profile Avatar Dropdown | Menu trigger | Yes | Authenticated | Owner, Broker, Builder | All | Toggles profile actions dropdown menu | Yes | Displays dropdown options | `src/components/layout/PublicHeaderClient.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |

---

## 2. Property Detail Page (`SCR-002`)

### Component and Control Summary
* **Total Meaningful Components:** 10
* **Total Interactive Controls:** 12
* **Total Non-Interactive Components:** 5
* **Total Conditional Controls:** 4
* **Total Navigation Controls:** 5
* **Total Form Controls:** 2
* **Total Overlay Triggers:** 4

### UI & Interaction Table
| UI ID | Label or Description | Type | Interactive | Visibility Condition | Roles | Devices | Handler or Destination | Safe to Execute | Observed Result | Source Evidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UI-SCR002-001** | View All Photos | Button | Yes | Media exists | All | All | Opens fullscreen gallery modal | Yes | Displays gallery slideshow | `src/components/detail/DetailGallery.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR002-002** | Save/Bookmark | Button | Yes | None | All | All | `isItemSaved` toggles bookmark DB state | No | `NOT_SAFELY_EXECUTED — SOURCE MAPPED ONLY` | `src/lib/actions/saved.ts` | `NOT_SAFELY_EXECUTED` |
| **UI-SCR002-003** | Reveal Number Button | Button | Yes | Unrevealed | All | All | `getListingContactState` reveal flow | Yes | Displays unmasked seller contact number | `src/app/property/[slug]/page.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR002-004** | Enquire Now Form Input | Input | Yes | Unenquired | All | All | User enters message/text | Yes | Typable textbox field | `src/components/detail/DetailCTABar.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR002-005** | Send Inquiry Submit | Button | Yes | Unenquired | All | All | Submits query payload to DB | No | `NOT_SAFELY_EXECUTED — SOURCE MAPPED ONLY` | `src/lib/actions/leads.ts` | `NOT_SAFELY_EXECUTED` |
| **UI-SCR002-006** | Report Content Trigger | Button | Yes | None | All | All | Opens `ReportModal` | Yes | Renders complaint form overlay | `src/components/detail/ReportModal.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR002-007** | Compare Checkbox | Checkbox | Yes | None | All | All | Add listing to CompareTray list | Yes | Item displays in sticky compare bar | `src/components/compare/CompareTray.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |

---

## 3. Authentication Overlay Modal (`AuthModal`)

### Component and Control Summary
* **Total Meaningful Components:** 4
* **Total Interactive Controls:** 8
* **Total Non-Interactive Components:** 1
* **Total Conditional Controls:** 4
* **Total Navigation Controls:** 1
* **Total Form Controls:** 4
* **Total Overlay Triggers:** 1

### UI & Interaction Table
| UI ID | Label or Description | Type | Interactive | Visibility Condition | Roles | Devices | Handler or Destination | Safe to Execute | Observed Result | Source Evidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UI-SCR099-001** | Mobile Number Input | Input | Yes | Initial login step | Guest | All | Updates typed mobile value state | Yes | Text changes to match mobile pattern | `src/components/auth/MobileOtpForm.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR099-002** | Send OTP Action | Button | Yes | Initial login step | Guest | All | Calls Supabase auth mock OTP provider | Yes | Step transitions to OTP validation | `src/components/auth/MobileOtpForm.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR099-003** | 4-Digit OTP Box | Input | Yes | Verification step | Guest | All | Validates OTP match | Yes | Auto-submits on completion of 4 numbers | `src/components/auth/OtpInput.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR099-004** | Resend OTP Button | Link | Yes | OTP step + expired countdown | Guest | All | Re-triggers mock SMS OTP provider | Yes | Timer resets to 30 seconds countdown | `src/components/auth/MobileOtpForm.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR099-005** | Role Selection Cards | Selection buttons | Yes | Onboarding step (New user) | Guest | All | Sets role context (Owner/Broker/Builder) | Yes | Highlight border wraps active selection | `src/components/auth/RegisterRoleForm.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR099-006** | Complete Registration | Button | Yes | Onboarding step | Guest | All | Write profile details to database | No | `NOT_SAFELY_EXECUTED — SOURCE MAPPED ONLY` | `src/lib/auth/actions.ts` | `NOT_SAFELY_EXECUTED` |
| **UI-SCR099-007** | Close Auth Modal | Button | Yes | None | Guest | All | Sets open state to false | Yes | Modal slides out of viewport | `src/components/auth/AuthModal.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |

---

## 4. Owner Dashboard Page (`SCR-030`)

### Component and Control Summary
* **Total Meaningful Components:** 10
* **Total Interactive Controls:** 18
* **Total Non-Interactive Components:** 2
* **Total Conditional Controls:** 5
* **Total Navigation Controls:** 10
* **Total Form Controls:** 0
* **Total Overlay Triggers:** 1

### UI & Interaction Table
| UI ID | Label or Description | Type | Interactive | Visibility Condition | Roles | Devices | Handler or Destination | Safe to Execute | Observed Result | Source Evidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UI-SCR030-001** | Post Property CTA | Button | Yes | None | Owner | All | `/dashboard/owner/properties/new` | Yes | Navigates to post property wizard | `src/app/dashboard/owner/page.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-002** | View Leads shortcut | Button | Yes | None | Owner | All | `/dashboard/owner/leads` | Yes | Navigates to owner leads listing | `src/app/dashboard/owner/page.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-003** | Sidebar Menu: Saved | Navigation Link | Yes | None | Owner | Desktop | `/dashboard/owner/saved` | Yes | Navigates to bookmarks page | `src/components/dashboard/navConfig.ts` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-004** | Sidebar Menu: Billing | Navigation Link | Yes | None | Owner | Desktop | `/dashboard/owner/billing` | Yes | Navigates to subscriptions billing | `src/components/dashboard/navConfig.ts` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-005** | Mobile Tab: Profile | Navigation Link | Yes | None | Owner | Mobile | `/profile` | Yes | Navigates to account profile settings | `src/components/dashboard/navConfig.ts` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-006** | Hamburger Icon | Button | Yes | None | Owner | Mobile | Slides open mobile navigation drawer | Yes | Opens mobile drawer nav | `src/components/dashboard/DashboardMobileHeader.tsx` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-007** | Sidebar Menu: Site Visits | Navigation Link | Yes | None (Always disabled) | Owner | Desktop | Disabled - "Coming soon" label | Yes | Non-clickable disabled control | `src/components/dashboard/navConfig.ts` | `RUNTIME_AND_SOURCE_CONFIRMED` |
| **UI-SCR030-008** | Logout Action | Button | Yes | Profile menu open | Owner | All | Triggers Supabase session termination | No | `NOT_SAFELY_EXECUTED — SOURCE MAPPED ONLY` | `src/components/auth/LogoutButton.tsx` | `NOT_SAFELY_EXECUTED` |
