# Design Prompts — My Gujarat Property (A to Z Wireframe Project)

This folder contains 17 self-contained, copy-paste-ready prompts for an AI design tool
(Claude Artifacts / Claude Design / v0-style) to generate a complete, production-grade,
premium Apple-style wireframe set for the entire "My Gujarat Property" platform.

## How to use
1. Paste `batch-01-design-system.md` FIRST. Its output (the design system + shared shell
   patterns) is the fixed foundation every later batch must match.
2. Paste batches 02–17 in order (or reorder by priority — Owner/Broker/Builder dashboards
   are highest real-world priority since ~80% of users are mobile Owners).
3. Each batch file is fully self-contained — it repeats the consistency rules so the design
   tool never drifts from Batch 1's system, even in a fresh chat.
4. After each batch's HTML output is generated, hand it back for review before implementing
   into the actual Next.js + Tailwind codebase (no working feature should ever be broken by
   a design pass — this is wireframe/reference only).

## Batch Index
| File | Batch | Content |
|---|---|---|
| batch-01-design-system.md | 1 | Design System + Shared UI Patterns (foundation) |
| batch-02-auth-flows.md | 2 | Auth: OTP popup, role selection, admin/staff login |
| batch-03-public-home-search.md | 3 | Public Home + Search Results |
| batch-04-detail-profiles.md | 4 | Property/Project/Requirement Detail + Public Profiles |
| batch-05-posting-wizards.md | 5 | Property/Project/Requirement Posting Wizards |
| batch-06-owner-dashboard.md | 6 | Owner Dashboard (all modules) |
| batch-07-broker-dashboard.md | 7 | Broker/Agent Dashboard (all modules) |
| batch-08-builder-dashboard.md | 8 | Builder/Developer Dashboard (all modules) |
| batch-09-leads-crm-messaging.md | 9 | Leads/CRM/Proposals/Messaging/Site Visits |
| batch-10-billing-payment.md | 10 | Billing/Payment/Pricing (public + all dashboards) |
| batch-11-admin-user-moderation.md | 11 | Admin: User/Staff/Role Mgmt + Moderation Queues |
| batch-12-admin-billing.md | 12 | Admin: Billing/Plans/Coupons/Trials/Invoices |
| batch-13-admin-ads-notifications-system.md | 13 | Admin: Ads/Notifications/Provider/System/Feature Flags |
| batch-14-admin-cms-seo-location.md | 14 | Admin: CMS/SEO/Blog/Legal/Location |
| batch-15-admin-audit-security-reports.md | 15 | Admin: Audit/Security/Reports/Support/Fraud |
| batch-16-legal-cms-blog-help.md | 16 | Public Legal/CMS/Blog/Help/Support pages |
| batch-17-advanced-pwa-tools.md | 17 | Advanced/PWA/Localization/Calculators/Comparison |

## Non-negotiable rules baked into every batch (from CLAUDE.md)
- No fake UI, fake data, fake counts, fake leads, fake views, fake payment success, fake
  verified/RERA badges.
- No dead buttons, no `href="#"`, no incomplete feature shown as working.
- Mobile-first (390px) → tablet (768px) → desktop (1280px+), no horizontal scroll.
- Every mobile inner screen has a contextual header WITH a back button — no exceptions.
- Every dashboard mobile screen has the same 5-item bottom nav in the same order.
- Every list/table has loading, empty (actionable), and error states designed.
- Every destructive action has a confirmation dialog.
- Every modal has both desktop (modal) and mobile (bottom sheet) versions.
- Contact number stays hidden unless reveal rules permit it.
- Admin/staff screens are visually distinct (graphite, not brand teal) from user dashboards.
