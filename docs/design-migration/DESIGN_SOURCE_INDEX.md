# DESIGN_SOURCE_INDEX

**Authoritative design source:** `C:\Users\RAJAN\Documents\MGP DESIGN`
**Status:** VERIFIED · **TOTAL_DESIGN_BATCH_FILES = 17** (requirement met)
**Created:** 2026-07-04 · **Owner:** design-migration (MGP_FULL_DESIGN_MIGRATION_MASTER.md)

## Extraction workspace (non-destructive)
Original files are bundled artifacts (base64 payload + JSON-escaped HTML template sections). They are **never modified**. A decoded, searchable copy is generated separately at:

`…/scratchpad/design-extract/<batch>.decoded.html`

Decode method (PowerShell, reproducible): `Get-Content -Raw` → replace `\/`→`/`, `\uXXXX`→char, `\n`→newline, `\"`→`"`. Re-run to refresh.

## The 17 batch files (verified present)

| # | Batch | Filename | h3 screen headings* | Primary product area |
|---|-------|----------|--------------------:|----------------------|
| 1 | 1 | `batch 1 - Design System (Standalone).html` | 40 | Design system / tokens / shells / component specimens (DESIGN_SYSTEM_REFERENCE) |
| 2 | 2 | `batch 2- Auth Flows (Standalone).html` | 0† | Auth (login/register/OTP/staff portal/invite) |
| 3 | 3 | `Batch 3 - Public Home + Search (Standalone).html` | 11 | Public home, header/footer, search + results |
| 4 | 4 | `batch 4 - Detail Pages (Standalone).html` | 0† | Property/project detail pages |
| 5 | 5 | `Batch 5 - Posting Wizards (Standalone).html` | 0† | Post Property (9) / Project (10) / Requirement (7) wizards + unit inventory |
| 6 | 6 | `Batch 6 - Owner Dashboard (Standalone).html` | 37 | Owner dashboard modules |
| 7 | 7 | `Batch 7 - Broker Dashboard (Standalone).html` | 14 | Broker dashboard + CRM Kanban |
| 8 | 8 | `Batch 8 - Builder Dashboard (Standalone).html` | 20 | Builder dashboard + agents/ads |
| 9 | 9 | `Batch 9 - Shared Detail Views (Standalone) (1).html` | 14 | Shared detail/leads/proposals/site-visit views |
| 10 | 10 | `Batch 10 - Billing & Payments (Standalone).html` | 0† | Billing, plans, payments, GST, invoices |
| 11 | 11 | `Batch 11 - Admin Management (Standalone).html` | 0† | Admin users/moderation |
| 12 | 12 | `Batch 12 - Admin Billing (Standalone).html` | 0† | Admin billing |
| 13 | 13 | `Batch 13 - Admin Ads Notifications System (Standalone).html` | 16 | Admin ads / notifications / system |
| 14 | 14 | `Batch 14 - Admin CMS & SEO (Standalone).html` | 0† | Admin CMS / SEO / location |
| 15 | 15 | `Batch 15 - Admin Audit Security Reports (Standalone).html` | 8 | Admin audit / security / reports |
| 16 | 16 | `Batch 16 - Public Content Pages (Standalone).html` | 4 | Public content / legal / blog |
| 17 | 17 | `Batch 17 - Advanced PWA Localization Tools (Standalone).html` | 13 | PWA / localization / advanced tools |

Plus a supplementary folder **`for header sidebar mobile/`** (curated header + footer + home + mobile drawer export — already consumed in the 2026-07-04 header/footer/home + mobile-drawer work).

\* `<h3>`-based screen-heading count (partial, deterministic signal only).
† **0 does not mean no screens** — these batches label screens with `<h2>` / `data-screen-label` / section markers instead of `<h3>`. Per-batch heading-pattern detection is required to finalize counts (see SCREEN_MANIFEST resume point). `TOTAL_H3_SCREEN_HEADINGS = 177` is a floor, not the final target total.

## Reconciliation status
`TOTAL_DISCOVERED_DESIGN_TARGETS` = **IN_PROGRESS** (per-batch heading normalization pending for batches 2,4,5,10,11,12,14).
`TOTAL_UNMAPPED_TARGETS` = **NOT YET 0** → per master §3.4 / §75, full screen implementation of *new* targets must not be declared complete until this reaches 0. (Note: the bulk of batches 1–9 is already implemented from Prompts 01–09; see SCREEN_MANIFEST for per-area current status.)
