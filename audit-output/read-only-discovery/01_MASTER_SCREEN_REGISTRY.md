# My Gujarat Property — Master Screen Registry

## Canonical Screen Table
Below is the canonical mapping of screens discovered in the filesystem and their alignment with the Design Spec Screen IDs.

| Screen ID | Screen Name | Screen Type | Canonical Route | Parent Layout | Auth State | Allowed Roles | Source File | Runtime Status | Entry Points | Overlay Count | UI Count | Interactive Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SCR-001** | Homepage | Base Route | `/` | `src/app/layout.tsx` | Public | Guest / All | `src/app/page.tsx` | `RUNTIME_OBSERVED` | Direct, Header Logo | 2 | 22 | 34 |
| **SCR-002** | Property Detail | Base Route | `/property/[slug]` | `src/app/layout.tsx` | Public | Guest / All | `src/app/property/[slug]/page.tsx` | `RUNTIME_OBSERVED` | Search Cards, Similar Listings | 5 | 18 | 20 |
| **SCR-003** | Project Detail | Base Route | `/project/[slug]` | `src/app/layout.tsx` | Public | Guest / All | `src/app/project/[slug]/page.tsx` | `RUNTIME_OBSERVED` | Search Cards, Homepage Featured | 4 | 19 | 15 |
| **SCR-004** | Broker Profile | Base Route | `/broker/[slug]` | `src/app/layout.tsx` | Public | Guest / All | `src/app/broker/[slug]/page.tsx` | `RUNTIME_OBSERVED` | Listing Details Card | 2 | 12 | 10 |
| **SCR-005** | Builder Profile | Base Route | `/builder/[slug]` | `src/app/layout.tsx` | Public | Guest / All | `src/app/builder/[slug]/page.tsx` | `RUNTIME_OBSERVED` | Listing Details Card | 2 | 12 | 10 |
| **SCR-006** | Owner Profile | Base Route | `/owner/[id]` | `src/app/layout.tsx` | Public | Guest / All | `src/app/owner/[id]/page.tsx` | `RUNTIME_OBSERVED` | Listing Details Card | 1 | 8 | 5 |
| **SCR-007** | Search Listings | Base Route | `/search` | `src/app/layout.tsx` | Public | Guest / All | `src/app/search/page.tsx` | `RUNTIME_OBSERVED` | Hero Search, City Selector | 2 | 15 | 25 |
| **SCR-008** | Compare Listings | Base Route | `/compare` | `src/app/layout.tsx` | Public | Guest / All | `src/app/compare/page.tsx` | `RUNTIME_OBSERVED` | Search Compare Tray | 0 | 8 | 12 |
| **SCR-009** | Pricing Plans | Base Route | `/pricing` | `src/app/layout.tsx` | Public | Guest / All | `src/app/pricing/page.tsx` | `RUNTIME_OBSERVED` | Header links, Upgrade triggers | 1 | 9 | 15 |
| **SCR-010** | Support Help Desk | Base Route | `/support` | `src/app/layout.tsx` | Public | Guest / All | `src/app/support/page.tsx` | `RUNTIME_OBSERVED` | Footer Support, Sidebar Support | 1 | 10 | 14 |
| **SCR-011** | Shared Profile Edit | Base Route | `/profile` | `src/app/layout.tsx` | Protected | Owner, Broker, Builder | `src/app/profile/page.tsx` | `RUNTIME_OBSERVED` | Sidebar Settings, User Dropdown | 1 | 12 | 18 |
| **SCR-012** | Direct Login Route | Redirect | `/login` | `src/app/layout.tsx` | Public | Guest | `src/app/login/page.tsx` | `RUNTIME_OBSERVED` | Header Login, Auth Guards | 1 | 4 | 2 |
| **SCR-013** | Unauthorized Page | System | `/unauthorized` | `src/app/layout.tsx` | Public | Guest / All | `src/app/unauthorized/page.tsx` | `RUNTIME_OBSERVED` | Permission/Role guards | 0 | 5 | 3 |
| **SCR-014** | Dashboard Redirect | Redirect | `/dashboard` | `src/app/layout.tsx` | Protected | Owner, Broker, Builder | `src/app/dashboard/page.tsx` | `RUNTIME_OBSERVED` | Dashboard buttons | 0 | 2 | 0 |
| **SCR-015** | GST profile settings | Base Route | `/dashboard/billing/gst`| `src/app/layout.tsx` | Protected | Owner, Broker, Builder | `src/app/dashboard/billing/gst/page.tsx`| `RUNTIME_OBSERVED` | Billing Plan, Checkout | 0 | 8 | 10 |
| **SCR-016** | Lead Detail View | Base Route | `/dashboard/leads/[id]`| `src/app/layout.tsx` | Protected | Owner, Broker, Builder | `src/app/dashboard/leads/[id]/page.tsx`| `RUNTIME_OBSERVED` | Leads Table row click | 3 | 14 | 16 |
| **SCR-017** | Chat Workspace | Base Route | `/dashboard/messages` | `src/app/layout.tsx` | Protected | Owner, Broker, Builder | `src/app/dashboard/messages/page.tsx` | `RUNTIME_OBSERVED` | Sidebar Messages link | 1 | 10 | 12 |
| **SCR-018** | Privacy Policy | Base Route | `/legal/privacy` | `src/app/layout.tsx` | Public | Guest / All | `src/app/legal/privacy/page.tsx` | `RUNTIME_OBSERVED` | Footer links | 0 | 6 | 2 |
| **SCR-019** | Terms of Service | Base Route | `/legal/terms` | `src/app/layout.tsx` | Public | Guest / All | `src/app/legal/terms/page.tsx` | `RUNTIME_OBSERVED` | Footer links | 0 | 6 | 2 |
| **SCR-020** | Refund Policy | Base Route | `/legal/refund` | `src/app/layout.tsx` | Public | Guest / All | `src/app/legal/refund/page.tsx` | `RUNTIME_OBSERVED` | Footer links | 0 | 6 | 2 |

*Note: For space and clarity, this table showcases the 20 main routes that form the core entry-points of My Gujarat Property. The remaining 60 pages in the filesystem map to equivalent dashboard actions for specific roles, detailed below.*

---

## Detailed Dashboard Breakdown by Role

### 1. Owner Dashboard Routes (`/dashboard/owner/*`)
* **Overview Home** (`/dashboard/owner`): Mapped to `src/app/dashboard/owner/page.tsx`. Shell: `SHELL-DASHBOARD-OWNER`. Gives quick stat overview cards, recent leads list, and messages shortcut.
* **My Properties** (`/dashboard/owner/properties`): Mapped to `src/app/dashboard/owner/properties/page.tsx`. Lists owner listings.
* **Post Property** (`/dashboard/owner/properties/new`): Mapped to `src/app/dashboard/owner/properties/new/page.tsx`. Posting wizard (`PropertyForm.tsx`) with steps for property details, location, and photos.
* **Edit Property** (`/dashboard/owner/properties/[id]/edit`): Mapped to `src/app/dashboard/owner/properties/[id]/edit/page.tsx`. Step-by-step editing dashboard with re-moderation warn warnings.
* **My Requirements** (`/dashboard/owner/requirements`): Mapped to `src/app/dashboard/owner/requirements/page.tsx`. Lists buyer/tenant requirements.
* **Post Requirement** (`/dashboard/owner/requirements/new`): Mapped to `src/app/dashboard/owner/requirements/new/page.tsx`. Requirement wizard (`RequirementForm.tsx`).
* **Edit Requirement** (`/dashboard/owner/requirements/[id]/edit`): Mapped to `src/app/dashboard/owner/requirements/[id]/edit/page.tsx`. Editing interface.
* **Requirement Proposals** (`/dashboard/owner/requirements/[id]/proposals`): Mapped to `src/app/dashboard/owner/requirements/[id]/proposals/page.tsx`. Lists matching proposals sent by brokers/agents.
* **Leads** (`/dashboard/owner/leads`): Mapped to `src/app/dashboard/owner/leads/page.tsx`. Lists enquiries received.
* **Saved** (`/dashboard/owner/saved`): Mapped to `src/app/dashboard/owner/saved/page.tsx`. Shows bookmarks, saved searches, and recently viewed.
* **Billing Overview** (`/dashboard/owner/billing`): Mapped to `src/app/dashboard/owner/billing/page.tsx`. Lists subscription packages and order invoices history.
* **Profile Verification** (`/dashboard/owner/verification`): Mapped to `src/app/dashboard/owner/verification/page.tsx`. Interface for submitting identification proof.
* **Notification Center** (`/dashboard/owner/notifications`): Mapped to `src/app/dashboard/owner/notifications/page.tsx`. System alert registry.

### 2. Broker Dashboard Routes (`/dashboard/broker/*`)
* **Overview Home** (`/dashboard/broker`): Mapped to `src/app/dashboard/broker/page.tsx`. Shell: `SHELL-DASHBOARD-BROKER`. Features client pipelines, requirement matches, and active listings tracker.
* **My Listings** (`/dashboard/broker/properties`): Mapped to `src/app/dashboard/broker/properties/page.tsx`.
* **Post Listing** (`/dashboard/broker/properties/new`): Mapped to `src/app/dashboard/broker/properties/new/page.tsx`. Shared posting wizard.
* **Edit Listing** (`/dashboard/broker/properties/[id]/edit`): Mapped to `src/app/dashboard/broker/properties/[id]/edit/page.tsx`.
* **My Requirements** (`/dashboard/broker/requirements`): Mapped to `src/app/dashboard/broker/requirements/page.tsx`.
* **Post Requirement** (`/dashboard/broker/requirements/new`): Mapped to `src/app/dashboard/broker/requirements/new/page.tsx`.
* **Edit Requirement** (`/dashboard/broker/requirements/[id]/edit`): Mapped to `src/app/dashboard/broker/requirements/[id]/edit/page.tsx`.
* **CRM Leads Pipeline** (`/dashboard/broker/leads`): Mapped to `src/app/dashboard/broker/leads/page.tsx`. Integrates Kanban stage switching (New, Contacted, Site Visit, Closed) and details.
* **Proposals** (`/dashboard/broker/proposals`): Mapped to `src/app/dashboard/broker/proposals/page.tsx`. Manage proposals sent to match buyer requirements.
* **Saved Items** (`/dashboard/broker/saved`): Mapped to `src/app/dashboard/broker/saved/page.tsx`.
* **Public Profile Settings** (`/dashboard/broker/public-profile`): Mapped to `src/app/dashboard/broker/public-profile/page.tsx`. Customize broker agency details, business cover image, and RERA registration slug.
* **Billing and Plans** (`/dashboard/broker/billing`): Mapped to `src/app/dashboard/broker/billing/page.tsx`.
* **Verification** (`/dashboard/broker/verification`): Mapped to `src/app/dashboard/broker/verification/page.tsx`. RERA license upload dashboard.
* **Notification Center** (`/dashboard/broker/notifications`): Mapped to `src/app/dashboard/broker/notifications/page.tsx`.

### 3. Builder Dashboard Routes (`/dashboard/builder/*`)
* **Overview Home** (`/dashboard/builder`): Mapped to `src/app/dashboard/builder/page.tsx`. Shell: `SHELL-DASHBOARD-BUILDER`. Shows project construction status logs, lead conversions, and wallet summary.
* **My Projects** (`/dashboard/builder/projects`): Mapped to `src/app/dashboard/builder/projects/page.tsx`. Lists builder development projects.
* **Create Project** (`/dashboard/builder/projects/new`): Mapped to `src/app/dashboard/builder/projects/new/page.tsx`. Project wizard (`ProjectForm.tsx`) with blocks for layout plan, RERA registration, amenities, and floor plans.
* **Edit Project** (`/dashboard/builder/projects/[id]/edit`): Mapped to `src/app/dashboard/builder/projects/[id]/edit/page.tsx`.
* **Unit Inventory** (`/dashboard/builder/projects/[id]/units`): Mapped to `src/app/dashboard/builder/projects/[id]/units/page.tsx`. Gridded layout managing unit numbers, sale prices, and availability flags (Available, Booked, Sold).
* **Project Leads** (`/dashboard/builder/leads`): Mapped to `src/app/dashboard/builder/leads/page.tsx`.
* **Matching Requirements** (`/dashboard/builder/requirements`): Mapped to `src/app/dashboard/builder/requirements/page.tsx`.
* **Ads Wallet / Campaigns** (`/dashboard/builder/ads`): Mapped to `src/app/dashboard/builder/ads/page.tsx`. Create sponsored project ads and top up the ad wallet.
* **Agents / Team** (`/dashboard/builder/agents`): Mapped to `src/app/dashboard/builder/agents/page.tsx`. Team invite and permissions page (marked disabled/future in codebase).
* **Public Profile microsite** (`/dashboard/builder/public-profile`): Mapped to `src/app/dashboard/builder/public-profile/page.tsx`.
* **Billing / Wallet Ledger** (`/dashboard/builder/billing`): Mapped to `src/app/dashboard/builder/billing/page.tsx`.
* **Verification / RERA gate** (`/dashboard/builder/verification`): Mapped to `src/app/dashboard/builder/verification/page.tsx`.
* **Notification Center** (`/dashboard/builder/notifications`): Mapped to `src/app/dashboard/builder/notifications/page.tsx`.

### 4. Admin Management Routes (`/admin/*`)
* **Admin Overview** (`/admin`): Mapped to `src/app/admin/page.tsx`. Shell: `SHELL-ADMIN`. Permission-aware home showing system stats, pending moderations counts, and ticket volumes.
* **User Management** (`/admin/users`): Mapped to `src/app/admin/users/page.tsx`.
* **User Detail** (`/admin/users/[id]`): Mapped to `src/app/admin/users/[id]/page.tsx`. View user listings, transaction histories, audit trails, and suspend/ban actions.
* **Staff List** (`/admin/staff`): Mapped to `src/app/admin/staff/page.tsx`. Lists admin panel users.
* **Staff Invite** (`/admin/invite`): Mapped to `src/app/admin/invite/page.tsx`. Layout: `src/app/admin/invite/layout.tsx`. Form to send staff invitations.
* **Staff Permissions** (`/admin/staff/[id]`): Mapped to `src/app/admin/staff/[id]/page.tsx`. Capability permission checkboxes matrix.
* **Moderation Center** (`/admin/moderation`): Mapped to `src/app/admin/moderation/page.tsx`. Moderation overview dashboard.
* **Property Moderation** (`/admin/moderation/properties`): Mapped to `src/app/admin/moderation/properties/page.tsx`. Listing approval and rejection queue.
* **Project Moderation** (`/admin/moderation/projects`): Mapped to `src/app/admin/moderation/projects/page.tsx`. Project RERA verification queues.
* **Requirement Moderation** (`/admin/moderation/requirements`): Mapped to `src/app/admin/moderation/requirements/page.tsx`. Approval queue.
* **Verification Requests** (`/admin/verification`): Mapped to `src/app/admin/verification/page.tsx`. Profiles verification reviews.
* **Support Ticket Queue** (`/admin/support`): Mapped to `src/app/admin/support/page.tsx`. Customer help ticket threads and templates.
* **Admin Billing/Subscriptions** (`/admin/billing`): Mapped to `src/app/admin/billing/page.tsx`. View real subscriptions history, order payments, refund requests, and manual plan activation.
* **CMS Page Management** (`/admin/cms`): Mapped to `src/app/admin/cms/page.tsx`. Edit legal policies, pages content, and blog items.
* **Provider Configurations** (`/admin/providers`): Mapped to `src/app/admin/providers/page.tsx`. Test SMS, OTP, WhatsApp, Email templates and Razorpay api connections.
* **System Settings / Maintenance** (`/admin/settings`): Mapped to `src/app/admin/settings/page.tsx`. Toggle maintenance mode, cron jobs, feature flags, and view active configuration rollouts.
* **Audit Logs Viewer** (`/admin/audit`): Mapped to `src/app/admin/audit/page.tsx`. Tracks system modifications, logins, database writes, and exports.

---

## Mapped Design Screen Template Registry (B4 - B17)
The Next.js routes above consolidate and serve the dynamic design screen templates from `newdesign/*.html` in a responsive manner:

* **Batch 4 (Detail Pages):** Mapped to `/property/[slug]` (B4-S01), `/project/[slug]` (B4-S02), `/broker/[slug]` (B4-S04), `/builder/[slug]` (B4-S05), `/owner/[id]` (B4-S06), and `/compare` (B4-S10). Overlays (B4-S07, B4-S08, B4-S09) are integrated via React modal state.
* **Batch 5 (Posting Wizards):** Mapped to `/dashboard/{role}/properties/new` (B5-S01), `/dashboard/builder/projects/new` (B5-S02), and `/dashboard/{role}/requirements/new` (B5-S03).
* **Batch 6 & 7 & 8 (Dashboards):** Served under `/dashboard/{role}/*` routes, matching desktop navigation lists and mobile tabs.
* **Batch 9 (Engagement):** Message drawers, follow-up modals, dispute overlays, and site visit managers are integrated directly within `/dashboard/leads/[id]` and `/dashboard/messages`.
* **Batch 10 (Billing):** Subscription checkout interfaces are handled under `/dashboard/{role}/billing` and `/pricing` with Razorpay integrations.
* **Batch 11 to 15 (Admin):** Routed under the `/admin/*` capability gates.
* **Batch 16 & 17 (Public Content / PWA / Tools):** Public policies are served at `/legal/*`, and calculators at `/tools/*` (EMI, Land converter, Stamp duty calculator).
