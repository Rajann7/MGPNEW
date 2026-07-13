# My Gujarat Property — State, Responsive and Overlay Matrix

This document provides detailed mappings for conditional states, overlay presentation profiles, and viewport responsive conversions.

---

## 1. Overlay Behavior Matrix

Below is the presentation profile for the primary interactive overlays.

| Overlay ID | Parent Screen | Trigger UI ID | Type | Background | Scroll Lock | Close Button | Outside Click | Escape | Resulting Screen | Source File | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OV-001** | SCR-001 (Home) | UI-SCR001-009 | Modal Popover | Dimmed Backdrop | Enabled | Yes (X) | Enabled | Enabled | SCR-001 (Home) | `components/auth/AuthModal.tsx` | `RUNTIME_OBSERVED` |
| **OV-002** | SCR-002 (Detail)| UI-SCR002-006 | Modal Dialog | Dimmed Backdrop | Enabled | Yes (Cancel) | Enabled | Enabled | SCR-002 (Detail) | `components/detail/ReportModal.tsx` | `RUNTIME_OBSERVED` |
| **OV-003** | SCR-007 (Search)| UI-SCR007-002 | Mobile Drawer | Underlay Backdrop | Enabled | Yes (X) | Enabled | Enabled | SCR-007 (Search) | `components/search/MobileFilterSheet.tsx` | `RUNTIME_OBSERVED` |
| **OV-004** | SCR-030 (Owner) | UI-SCR030-006 | Slide Drawer | Blurred Backdrop | Enabled | Yes (X) | Enabled | Enabled | SCR-030 (Owner) | `components/layout/AdminMobileDrawer.tsx` | `RUNTIME_OBSERVED` |
| **OV-005** | SCR-001 (Home) | UI-SCR001-002 | Popover Dropdown | Clear | Disabled | Click Outside | Enabled | Enabled | SCR-001 (Home) | `components/layout/PublicHeaderClient.tsx` | `RUNTIME_OBSERVED` |

*Note: All overlays trap focus inside their container to guarantee keyboard accessibility (design system focus rules).*

---

## 2. Conditional State Matrix

Below are the conditional state profiles implemented across the platform.

| State Type | Visual Presentation | Trigger Condition | Source Implementation | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Loading** | Indeterminate spinner, progress bars | Initial page fetch, api queries pending | `components/ui/LoadingState.tsx` | `RUNTIME_OBSERVED` |
| **Skeleton** | Gray pulsed layout boxes | Dashboard stats, card feeds loading | `components/dashboard/StatCardGradient.tsx` | `RUNTIME_OBSERVED` |
| **Empty** | Illustration, friendly description, "Create" CTA | Properties/Leads query returns zero rows | `components/ui/ErrorState.tsx` | `RUNTIME_OBSERVED` |
| **Validation** | Red outline, helper inline text, focus shift | Submitting empty wizard fields, invalid OTP | `components/auth/MobileOtpForm.tsx` | `RUNTIME_OBSERVED` |
| **Success** | Success tick icon, green banner, "View" shortcut | Subscription checkout complete, post wizard success | `components/forms/wizard/MediaUploadStep.tsx` | `RUNTIME_OBSERVED` |
| **API Error** | Alert banner, retry button, system log | API call returns 500 error code | `components/ui/ErrorState.tsx` | `RUNTIME_OBSERVED` |
| **Permission** | Locked module banner, "Go Back" action button | User role does not match staffing permission | `src/app/unauthorized/page.tsx` | `RUNTIME_OBSERVED` |
| **Session Expired** | Automatic logout, login popup trigger | Supabase auth token expires | `src/lib/auth/session.ts` | `RUNTIME_OBSERVED` |

---

## 3. Viewport Responsive Matrix

Below is the responsive layout conversion mapping across critical widths for key route shells.

| Route Shell | Viewport Width | Sidebar | Bottom Nav | Sticky elements | Layout Conversion / Wrapping |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public Shell** | **320px - 430px** | Hidden | Hidden | Sticky CTA Call/Enquire | Header becomes single logo + compact hamburger icon. Cards wrap in single column list. |
| **Public Shell** | **768px** | Hidden | Hidden | None | Grid transforms to 2 columns for card lists. |
| **Public Shell** | **1024px - 1440px** | Hidden | Hidden | Contact Sidebar | Standard 3 column layout. Cards display in 3/4 column grids. |
| **Dashboard Shell** | **320px - 430px** | Hidden | Active (5 tabs) | Post FAB button | Title bar is compact, sidebar is replaced by hamburger drawer. Grid stats wrap to 1 column. |
| **Dashboard Shell** | **768px** | Hidden | Active (5 tabs) | Post FAB button | Grid stats transform to 2 columns. |
| **Dashboard Shell** | **1024px - 1440px** | Expanded | Hidden | Collapsible sidebar | Full sidebar rail (240px) or compact rail (64px). Stats display in 4 column row. |
| **Admin Shell** | **320px - 430px** | Hidden | Hidden | None | Breadcrumbs hide. Data tables transform to single card rows. |
| **Admin Shell** | **1024px - 1440px** | Visible | Hidden | Filter Bar | Full graphite left nav sidebar. Dense data rows. |
