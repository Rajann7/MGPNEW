# My Gujarat Property — Discovery Gaps and Handoff Document

This report outlines differences between the design specifications and runtime behavior, lists legacy surfaces, notes areas unsafe to execute, and details screens ready or blocked for Phase 2 testing.

---

## 1. Discovered Gaps and Mismatches

### 1.1 Unrouted Screen Designs
* **Public Requirement Detail** (`B4-S03`): The design specifies a route at `/requirement/[displayId]`. However, there is no corresponding directory or `page.tsx` file inside `src/app/`. The public requirement details are currently unreachable.
* **Sitemap Exclusion Manager** (`B14-S09`): Designed as a tool to manually exclude URLs from the sitemap. This surface is not routed in the Next.js filesystem.
* **Gujarat Land Unit Converter Settings** (`B17-08`): Renders as a calculator on the front end, but has no Admin settings route implemented to update conversion ratios.

### 1.2 Disabled or Placeholder Features (Reachable but Stubbed)
* **Builder Team Management** (`/dashboard/builder/agents`): Mapped to `src/app/dashboard/builder/agents/page.tsx`. Active route, but invitation and permissions editing buttons render disabled alerts: *"Adding agents and assigning permissions to your team will be available in a later phase. No invitations are sent yet."*
* **Owner Analytics and Settings**: Mapped in `navConfig.ts` with `disabled: true`. Navigating directly to these routes results in stubs or page not found exceptions.
* **Refund Tracker** (`/dashboard/{role}/billing/refunds`): Mapped to stubs. The interface to track processed refunds is not yet fully connected to user-facing dashboards.

### 1.3 Legacy or Unexpected Surfaces
* **Buyer and Tenant Labeling:** Found in multiple UI blocks (e.g. *"Post buyer requirements"* in Broker dashboard, *"Intra-state CGST for buyers"* in billing libraries). These are visual helpers and do not reflect separate PostgreSQL role tables.
* **Broker Agency Invites:** References to agency sub-agents are present in visual labels, but the system utilizes the consolidated `broker` profile role under a unified dashboard.

---

## 2. Unsafe to Execute Controls
The following interactive elements have been source-mapped but **not executed** to prevent persistent mutation of application or third-party data:

1. **Submit Listing (`PropertyForm`/`ProjectForm`):** The "Submit for Moderation" control writes records to Supabase tables and triggers system webhook events.
2. **Buy Subscription Plan (`RazorpayCheckout`):** The "Pay Now" control launches Razorpay test or live checkout frames. Mutates order tables and handles payment callback logic.
3. **Admin Moderation Approval / Rejection (`ModerationIndexPage`):** Approving/rejecting properties inside `/admin/moderation` changes listing status fields in the database.
4. **Staff Permissions Edit (`StaffDetailPage`):** Clicking checkboxes in `/admin/staff/[id]` writes updated staff authorization arrays.
5. **Suspend or Ban User (`AdminUserDetailPage`):** "Suspend User" toggles the status field on the user profile row to `suspended`.
6. **Refund Decision (`RefundDetail`):** Approving refunds communicates with Razorpay APIs and writes ledger credits.

---

## 3. Phase 2 Handoff Registry

### 3.1 Screens Ready for Phase 2 Testing
These screens are fully routed and integrated, and can be safely tested using local mock logins:

1. **Homepage** (`/`): Mapped to `src/app/page.tsx`. Ready to verify search inputs, category routes, and header overlays.
2. **Search Listings** (`/search`): Mapped to `src/app/search/page.tsx`. Ready to verify search filters, sorting, and comparison tray triggers.
3. **Property Detail** (`/property/[slug]`): Mapped to `src/app/property/[slug]/page.tsx`. Ready to verify gallery slideshows, masked contacts, and detail cards.
4. **Project Detail** (`/project/[slug]`): Mapped to `src/app/project/[slug]/page.tsx`. Ready to verify layout tabs and brochure download hooks.
5. **Login Dialog** (`AuthModal`): Ready to verify OTP validation input patterns and role-selection callbacks.
6. **Owner/Broker Dashboard Home**: Ready to verify stats layout blocks and notifications links.
7. **Public Profile settings**: Ready to verify metadata form bindings.
8. **Admin Audit Viewer** (`/admin/audit`): Ready to verify read-only logs rendering.

### 3.2 Screens Blocked from Phase 2 Testing
These screens cannot be verified functionally due to missing data structures or stubbed layouts:

1. **Requirement Detail** (`/requirement/[displayId]`): Blocked due to missing `page.tsx` routing files.
2. **Builder Agents Invites** (`/dashboard/builder/agents`): Blocked because invitation and team assignments are disabled in the source.
3. **Site Visits dispute reviews** (`/admin/reviews/site-visit-disputes/[id]`): Blocked because site visits disputes are stubbed and lack data loaders.
4. **Manual Subscription Activation** (`/admin/billing/manual-activation`): Blocked from functional testing to protect pricing integrity.
