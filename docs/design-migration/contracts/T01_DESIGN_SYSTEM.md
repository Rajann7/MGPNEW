# Contract — T01 · Design System (Batch 1) — fresh rebuild

**STATUS: FINAL COMPLETE (50/50 targets) — 2026-07-08.** Authenticated shells re-rendered live (owner + super-admin sessions); UNVERIFIED-AUTH closed. Total 4 mismatches fixed: Inter font · 1024 header overflow (2026-07-04) · **3E dashboard mobile bottom nav → locked 5-item Home·Search·Post-FAB·Leads·Profile** · **3F admin mobile → removed design-forbidden bottom nav, added contextual-header drawer** (2026-07-08). VISUAL/FUNCTIONAL/RESPONSIVE/REGRESSION = PASS. Evidence: verification/T01_VERIFY.md · Class: DESIGN_SYSTEM_REFERENCE / SHARED_COMPONENT (no routes — §3.2).
> Changed 2026-07-08: `src/components/dashboard/DashboardMobileTabBar.tsx`, `src/components/dashboard/navConfig.ts` (getMobileTabs), `src/components/layout/AdminShell.tsx`, `src/components/layout/AdminTopbar.tsx`, `src/components/layout/AdminMobileDrawer.tsx` (new), `src/lib/admin/navConfig.ts` (removed getAdminMobileTabs), 17 `src/app/admin/**/page.tsx` (dropped mobileTabs prop).

## Second fix (2026-07-04, from fresh responsive audit)
`src/components/layout/PublicHeaderClient.tsx`: primary-nav breakpoint `lg`→`xl`. The Inter font (correctly wider than the prior system font) tipped the header over at exactly 1024px (nav+search+auth didn't fit → 24px page overflow, search box collapsed to 0). Nav now appears at `xl` (1280, the design's desktop width); 1024–1279 shows the roomy brand·city·search·auth bar. Re-verified: 1024 clean, 1280/1440 nav shown no overflow. Affected consumers (shared header): home `/`, `/property|project|broker|builder/[slug]`, `/legal/*`, `/support`, `/pricing` — header markup identical; home reverified live as representative.
**Design source:** `batch 1 - Design System (Standalone).html` (decoded workspace).

## Fresh token audit (extracted from actual Batch 1 source, not memory)
| Token | Batch 1 authority | Code (globals.css / layout) | Verdict |
|---|---|---|---|
| Sans font | **Inter** (`font-family:Inter,…`; 691 mentions) | was Geist + body hardcoded system stack | **FIXED → Inter** |
| Brand | `#0F6B5C` (158×) | `--brand:#0f6b5c` | ✓ match |
| Brand hover | `#0C5648` | `--brand-hover:#0c5648` | ✓ match |
| Brand soft | `#E7F2EF` | `--brand-soft:#e7f2ef` | ✓ match |
| Radius | control 10px, card 16px, full | `--radius-card:12px`?→ cards use rounded-2xl(16)/rounded-[10px] utilities | ✓ (utilities match; card token 12 is legacy, components use 16 directly) |
| Neutrals | zinc scale (#F4F4F5/#E4E4E7/#71717A/#3F3F46/#18181B…) | Tailwind zinc utilities in components | ✓ match |
| Semantics | error #DC2626, success #16A34A, warning #D97706, privacy amber #FFFBEB/#FDE68A/#B45309 | globals semantic tokens + utilities | ✓ match |

## Change made (shared)
- `src/app/layout.tsx`: `Geist`→`Inter` (weights 400/500/600/700) loaded into `--font-geist-sans` (var name kept → zero downstream token churn).
- `src/app/globals.css`: `body` font-family now uses `var(--font-geist-sans)` (Inter) first, instead of a hardcoded system stack that previously overrode any loaded font.

## Affected consumers (shared font change = ALL screens)
Every route. Regression reverification targeted at guest-accessible canonicals (home `/`, search `/search`) + build (compiles all 40 routes). Authenticated screens inherit the same token; their live re-render = UNVERIFIED-AUTH.

## T01 targets (all REFERENCE/SHARED — no separate route builds)
Tokens/type/spacing/radius/shadow/icons (DSR) · buttons/inputs/badges/cards/avatars/dropdown/tabs/tooltip/pagination/progress (SC, in `components/ui/*`) · shells 3A–3F (SC) · overlays modal/dialog/sheet/toasts/popover/notif/filter/share/drawer/gallery (SC/MD) · universal states loading/empty/error/setup + table→card (DSR) · form wizard pattern (SC) · mobile sticky CTA (SC). These are consumed by real screens (already built); Batch 1 itself is not an app route (master §3.2). Fresh audit result: token set matches except font (now fixed).

## Verification plan
- lint/type/build now. Fresh VISUAL: computed `font-family` on `/` and `/search` must resolve to Inter. Fresh RESPONSIVE: no overflow 320–1440 on public consumers. REGRESSION: build 40/40 + guest routes render + guards. Authenticated consumer re-render = UNVERIFIED-AUTH.
