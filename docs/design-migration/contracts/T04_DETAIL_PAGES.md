# Screen Contract — T04 · Detail Pages (Batch 4)

**Design source:** `batch 4 - Detail Pages (Standalone).html` → `scratchpad/design-extract/batch4.decoded.html` (7 H2 sections, 14 frames, 21 manifest targets). **Status:** fresh-audited + RUNTIME-VERIFIED 2026-07-08 (headless Chromium) and **RE-VERIFIED 2026-07-08 (b) via preview_\* MCP** (property/project/broker/builder detail desktop+mobile, sticky CTA, 404 unavailable, compare, Report modal guest+logged-in submit→persist→cleanup; 320/390/1280 clean; no T04 source changed). VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION PASS. **FINAL: COMPLETE for all buildable Batch-4 targets;** T04-16 Claim (FUNCTIONALITY_GAP — needs unclaimed-profile/RERA model [Batch 8/11] + R2 upload [provider]) and T04-19 fullscreen gallery (provider-gated R2 media) are documented gated deferrals (§5.4/§5.5), no fake control shipped (Claim CTA verified absent on real claimed profiles).

## Canonical targets & routes/components
| Target | Route / Component |
|---|---|
| Property detail | `/property/[slug]` + `DetailGallery`, `DetailCTABar`, `ReportModal`, `Breadcrumbs`, `SeoJsonLd` |
| Project detail | `/project/[slug]` (+ same detail components) |
| Requirement scoped visibility | masked-until-proposal (no public page) |
| Broker public profile | `/broker/[slug]` |
| Builder microsite | `/builder/[slug]` |
| Owner public-safe profile | minimal role-label-only surface |
| Report modal/sheet | `ReportModal` + `submitReport` + `REPORT_CATEGORIES` |
| Fullscreen gallery | `DetailGallery` (provider-gated placeholder) |
| Comparison | `/compare` (CompareView) |
| Unavailable | `notFound()` → `UnavailableEntityState` (404 + noindex) |

## Legacy UI removed / fixes / new
- **New:** Report content modal/sheet end-to-end (was GAP). `src/lib/reports/config.ts` (categories from real `user_reports.category` enum), `src/lib/actions/reports.ts` (`submitReport`, auth-required, rate-limited), `src/components/detail/ReportModal.tsx` (desktop modal / mobile sheet, dialog a11y), wired into property + project detail.
- **Bug fixed:** `REPORT_CATEGORIES` moved out of the `"use server"` action file (illegal non-async export) → plain module.

## Functionality preserved (do NOT change)
Contact/enquiry privacy masking (no number leak), login-gated enquiry/report, unavailable→404+noindex (no soft-404), compare tray/table, requirement scoped visibility, broker/builder public views, SEO json-ld + canonical.

## New functionality
Report content report → `user_reports` moderation queue (status=pending); rate-limited (no duplicate pending per target + daily cap 10); guests get an honest login prompt (no fake success).

## Data completeness
Report categories = full relevant real enum set (spam/duplicate/fraud/wrong_information/illegal_content/abuse/other), not the design's 5-item sample.

## Deferred (honest)
- **Claim profile (T04-16):** needs `profile_claims` table + verification queue (future admin/verification phase); no fake control shipped.
- **Fullscreen gallery (T04-19):** provider-gated on R2 media (Prompt 10/12); honest placeholder now.

## Responsive contract
Detail pages = public header + footer; mobile sticky CTA (`sticky bottom-0`, `sm:static`) never covers content. Report overlay = bottom sheet (mobile) / centered modal (sm+). Verified 0 page-overflow 320–1440 across all detail routes (66 probes).
