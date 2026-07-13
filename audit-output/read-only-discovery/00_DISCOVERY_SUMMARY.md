# My Gujarat Property — Read-Only Discovery Summary

## Audit Details
* **Audit Date and Time:** 2026-07-13T16:55:44+05:30
* **Project Root:** `C:\mgpweb`
* **Running Website URL:** `http://localhost:3000`
* **Git Branch:** `redesign`
* **Git Commit Hash:** `d5b0c22ca319e8da96e191e9760eebd1ce19d4f5`
* **Framework Discovered:** Next.js 16.2.9 (App Router), React 19.2.4, Tailwind CSS v4, Supabase Auth/PostgreSQL, `@supabase/ssr`

---

## Roles Discovered
1. **Guest:** Anonymous visitors who can browse properties, projects, prices, pricing plans, and search listings.
2. **Owner:** Public role representing private property owners who can post up to their limits, view their leads, and chat with enquirers.
3. **Broker:** Public role representing real estate brokers/agencies who have advanced listings management, client requirement feeds, CRM workspaces (kanban/list), and proposal management.
4. **Builder/Developer:** Public role representing property builders who can manage multiple projects, construction milestones, unit inventory, and run advertising campaigns.
5. **Admin:** Internal staff role with moderation, user suspension, and approval capabilities.
6. **Super Admin:** Internal staff role with full system management, provider settings configuration, and staff permissions control.
7. **Staff Managers (Capability-Scoped):** Under-the-hood roles (e.g. `verification_manager`, `billing_manager`, `ads_manager`, `seo_manager`, `audit_manager`) with granular access defined in `staff_permissions`.

> [!NOTE]
> ### LEGACY OR UNEXPECTED SURFACE DISCOVERED
> * **Builder Agents / Team Page** (`/dashboard/builder/agents`): Represents a future team assignment system. The page currently renders a read-only message: *"Adding agents and assigning permissions to your team will be available in a later phase. No invitations are sent yet."*
> * **Buyer / Tenant References:** While "Buyer" and "Tenant" are used in copy (e.g., "Buyer Requirements", "GST snapshots for buyers"), they are not separate roles in the database. Users seeking properties/rentals act as Guests or post Requirements under Owner/Broker accounts.

---

## Surface Count Metrics
The platform surface area is reconciled using the following formula:

$$\text{Total Website Surface} = \text{Unique Base Screens} + \text{Overlay States} + \text{Material Nested States} + \text{Role Render Variants}$$

$$133 = 80 + 32 + 15 + 6$$

| Metric | Count | Description |
| :--- | :--- | :--- |
| **Unique Base Screens** | **80** | routable Next.js `page.tsx` files inside `src/app/` |
| **Dynamic Screen Templates** | **29** | Pages with dynamic parameters (e.g., `[slug]`, `[id]`, `[userId]`) |
| **Route Aliases** | **5** | Redirect-only routes (e.g. `/dashboard`, `/admin/staff/invites`) |
| **Role Render Variants** | **6** | Shared routes with dynamic dashboard layouts depending on roles |
| **Overlay States** | **32** | Modals, drawers, and bottom sheets mapped to code components |
| **Material Nested States** | **15** | Materially independent workflow tabs (e.g., Saved tabs, Kanban views) |
| **Total Meaningful UI Components** | **185** | Reusable layout shells, listings cards, gallery grids, filters |
| **Total Interactive Controls** | **345** | Unique actionable controls mapped on pages and overlays |
| **Runtime-Observed Interactions** | **225** | Controls executed safely (navigating, tab toggles, modal open/close) |
| **Source-Mapped-Only Interactions** | **120** | Unsafe mutation controls (Save, Delete, Publish, Refund) inspected only |
| **Blocked Screens** | **42** | Routes blocked by auth redirect or required active database features |
| **Unreachable Screens** | **15** | Screen designs defined in registry but not routed in filesystem |

---

## Coverage Matrices

### Dashboard Route Breakdown by Role
* **Public/System Screens:** 14 routes (Homepage, Search, Property/Project Detail, Broker/Builder Profiles, Pricing, Legal pages, Direct Login)
* **Owner Dashboard Screens:** 12 routes
* **Broker Dashboard Screens:** 14 routes
* **Builder Dashboard Screens:** 13 routes
* **Admin Dashboard Screens:** 20 routes
* **Shared Account/System Screens:** 7 routes (leads detail, messages thread, profile settings, support tickets)

### Viewport Coverage Matrix
All routable screens support the following device widths via Tailwind breakpoints:
* **Mobile Portables:** 320px, 360px, 390px, 430px
* **Tablets:** 768px
* **Desktops:** 1024px, 1366px, 1440px

---

## Discovery Reports Folder
All generated audit artifacts are located in:
`audit-output/read-only-discovery/`

1. `00_DISCOVERY_SUMMARY.md` - Overall metrics, roles, limit statements, and formula reconciliation.
2. `01_MASTER_SCREEN_REGISTRY.md` - Route mappings, shells, allowed roles, parents, and entry/exit routes.
3. `02_UI_AND_INTERACTION_REGISTRY.md` - Element inventories with custom `UI-[SCREEN-ID]-001` keys.
4. `03_USER_FLOW_AND_NAVIGATION_MAP.md` - Matrices for role access, redirects, and step-by-step user pathways.
5. `04_STATE_RESPONSIVE_AND_OVERLAY_MATRIX.md` - Breakdowns of loading/skeleton states and modal/drawer behavior.
6. `05_DISCOVERY_GAPS_AND_HANDOFF.md` - Source/runtime mismatches, unreachable routes, and testing blockages.

---

## Final Read-Only Integrity Verification
* No application source files have been edited.
* No configuration files or package locks have been modified.
* No data mutations have been performed on the local or Supabase databases.
* Only the six allowed Markdown audit reports have been created.

**READ_ONLY_INTEGRITY_CONFIRMED**
