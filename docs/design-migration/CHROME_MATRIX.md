# CHROME_MATRIX

Per-screen chrome (MGP_FULL_DESIGN_MIGRATION_MASTER §3.5). Chrome is **screen-specific** — never assume a header/footer/sidebar/bottom-nav/sticky-CTA applies globally. `Y`=present in the mapped design target, `—`=absent, `M`=mobile-only, `D`=desktop-only.

| Screen ID | Design target | Header | Topbar | Sidebar | Bottom Nav | Sticky CTA | Footer | Shell | Notes |
|-----------|---------------|--------|--------|---------|-----------|-----------|--------|-------|-------|
| B2-auth-overlay | Auth (login/register/OTP, screens 1–11,13) | — | — | — | — | — | — | none (overlay: desktop centered modal / mobile bottom sheet over the current page) | backdrop rgba(24,24,27,.45); NOT a site-chrome page; `/login` route hosts same overlay on a neutral bg |
| B2-suspended | Suspended account (12) | contextual back ("Account status", `M`) | — | — | — | — | — | full-stop page (no site header/footer/nav) | app-like back-header per §3A; no bypass |
| B2-staff-login | Staff login (14–15) | MGP Staff Portal wordmark only | — | — | — | — | — | graphite full page (#18181b), **noindex** | email+password/Google; no site header, no bottom nav, no public register |
| B2-staff-invite | Staff invite acceptance (16) | Staff Portal wordmark (in card) | — | — | — | — | — | centered card on #fafafa, **noindex** | token-based; no site chrome |
| B3-home | Public home | Y (full nav + mega `lg+`) | — | — | — | — | Y | Public | header carries city + mega-menu; footer graphite |
| B3-search | Search results | Y (condensed/desktop; contextual back `M`) | filter bar | Y (filters, `D`) | — | — | — (no footer) | Public (search) | mobile: contextual back-header + query + map icon; filters → bottom sheet |
| B4-report | Report content modal/sheet (8) | — | — | — | — | — | — | none (overlay: desktop centered modal / mobile bottom sheet, role=dialog) | ReportModal trigger on property/project detail; auth-required, honest login prompt for guests |
| B4-property | Property detail | contextual back (`M`) | — | — | — | Y (`M` contact CTA bar) | Y (`D`) | Detail | DetailCTABar sticky on mobile; gallery + breadcrumbs |
| B4-project | Project detail | contextual back (`M`) | — | — | — | Y (`M`) | Y (`D`) | Detail | RERA disclaimer block |
| B5-wizards | Posting wizards | contextual back (`M`) | breadcrumb | Y (dashboard, `D`) | — | Y (footer: Back·Save Draft·Continue) | — | Dashboard | stepper header; step panel only changes |
| B6-owner | Owner dashboard | — | Y (dashboard topbar) | Y (`D` drawer `M`) | Y (`M`: Home·Search·Post FAB·Leads·Profile) | — | — | Dashboard | bottom-nav order LOCKED |
| B7-broker | Broker dashboard | — | Y | Y (`D`/drawer `M`) | Y (`M`) | — | — | Dashboard | Kanban is `D`-only; mobile falls back to list |
| B8-builder | Builder dashboard | — | Y | Y (`D`/drawer `M`) | Y (`M`) | — | — | Dashboard | agents/ads modules |
| B9-leads | Lead / shared detail | — | Y | Y (`D`/drawer `M`) | Y (`M`) | — | — | Dashboard | lead drawer/detail |
| B10-billing | Billing / plans | mixed (pricing = public header/footer; dashboard billing = dashboard shell) | — | Y (dashboard variants) | Y (`M`, dashboard) | — | Y (pricing only) | Public + Dashboard | invoice = printable, no shell |
| B11–B15-admin | Admin modules | — | Y (admin topbar) | Y (admin drawer `M`) | — (admin has NO bottom nav) | — | — | Admin (graphite) | admin shell distinct from public/dashboard |
| B16-content | Public content/legal | Y (public) | — | — | — | — | Y | Public | legal/blog use public shell |
| B17-calc | EMI / Stamp-duty / Unit-converter tool pages | Y (public) | — | — | — | — | Y | Public | standalone public tool pages |
| B17-compare-tray | Compare tray (9a) | — | — | — | — | Y (`M`+`D` sticky bottom bar over search) | — | none (overlay) | floats over `/search`; not a page |
| B17-compare-table | Full comparison table (9b) | contextual back (`M`) | — | — | — | — | — | Compare page | `/compare`, no footer |
| B17-pwa-install | Install prompt (1) | — | — | — | — | Y (`M` bottom banner) | — | none (overlay) | overlays current chrome |
| B17-offline | Offline banner (2) | strip above header | — | — | — | — | — | none (overlay) | layout-safe banner |
| B17-update | App update toast (11) | — | — | — | — | — (non-blocking toast) | — | none (overlay) | PWA toast |
| B17-lang | Language selector (3) | part of header dropdown | — | — | — | — | — | SC (header) | header control, not a page |
| B17-theme | Theme toggle (4) | — | — | — | — | — | — | SC | token swap, no redesign |
| B17-consent | Analytics consent (10) | — | — | — | — | Y (bottom-left `D` / bottom-sheet `M`) | — | none (overlay) | first-visit overlay |
| B17-a11y | Accessibility quick-settings (12) | — | — | — | — | — | — | overlay panel/drawer | quick-settings panel |

**Rule reminder:** shared-shell reuse must not force the same chrome onto targets whose mapped design differs (e.g., admin ≠ dashboard bottom-nav; search has no footer; invoice has no shell). Verify chrome per target during implementation.
