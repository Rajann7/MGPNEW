# report-batch-17

## Batch 17 — Advanced / PWA / Localization / Tools (Final)

### Screens/components present in design (full inventory)

Teal accent. Anchor nav: 1-2 PWA banners, 3-5 Localization, 6-8 Calculators (+ 9 Comparison, 10-12 Consent/Update/A11y, 13 checklist). All 12 prompt screens + final consistency checklist present.

1. PWA install prompt (mobile bottom banner) — app icon, "Add to home screen / Faster access, works on slow networks", Not now + Install. Note: "Not now" remembered (localStorage) 30 days; only after 2+ sessions, never first visit.
2. Offline banner (above header, layout-safe) — dark bar "You're offline — showing saved content" + retry icon, then normal header + "Saved properties (available offline)" cards. Note: renders in normal flow above header, collapses when connectivity returns.
3. Language selector (open dropdown) — globe pill "English", options English (Default, checked, teal), ગુજરાતી (Gujarati), हिन्दी (Hindi, "Coming soon" disabled). Amber note: untranslated strings fall back to English with "translation pending" dot, never machine-garbled.
4. Theme toggle + dark-mode proof — Appearance segmented Light/Dark/System, side-by-side Light vs Dark stat cards ("Dark — same components, token swap only"), dark uses #18181b/#27272a, green→#4ADE80.
5. Transliteration-tolerant search — search box "amdavad" resolving to Ahmedabad ("matched amdavad"), example input→output table (amdavad→Ahmedabad, રાજકોટ→Rajkot, barodra→Vadodara alias Baroda+typo, gandhi nagar→Gandhinagar). Note: alias tables + fuzzy + Gujarati transliteration, server-side.
6. EMI calculator — 3 sliders (Loan amount ₹60L, Interest 8.6%, Tenure 20yr), result card Monthly EMI ₹52,430 + Principal/Interest/Total ₹1.26Cr, principal-vs-interest amortization mini bar chart, "estimate… not financial advice" disclaimer, Home-loan assistance Setup Required (Enquire once loan partner integrated).
7. Stamp duty calculator (Gujarat) — State/City selects, property value input, Buyer toggle Male/Female/Joint ("Female buyers pay no registration fee in Gujarat — toggle to compare"), result (Stamp duty 4.9% ₹4,16,500 + Registration 1% ₹85,000 = Total ₹5,01,500), legal-review disclaimer (jantri value/surcharges/Sub-Registrar).
8. Unit converter (Gujarat land units) — Value/From (sq ft) + swap, outputs sq yd/vaar, sq m, Guntha, Bigha (Gujarat), Acre; COMMON CONVERSIONS reference table (1 vaar=9 sqft, 1 guntha=1,089, 1 bigha=17,424, 1 acre=43,560). Note bigha varies by region.
9. Comparison — 9a compare tray (sticky bottom bar, 3 chips Silver Heights/Shivalik Skyline/Avadh Greens, Clear, Compare (3); note max 4, persists across pagination, above mobile bottom nav). 9b full comparison table (Price / Configuration / Price per sqft / RERA [Verified vs "— resale"] / Possession / CTA row Contact Owner vs Enquire), Project badges. Note: mobile scrolls horizontally with attribute column pinned, 2 visible.
10. Analytics consent (first visit) — "Help us improve MGP / No tracking until you choose", Cookie Policy link, Customize/Decline/Accept.
11. App update available (PWA non-blocking toast) — dark toast "A new version is available / Refresh to update — your work is saved", Refresh + dismiss. Note: bottom-center, deferred until screen idle, never mid-form.
12. Accessibility quick-settings — Text size A−/Default/A+, High contrast toggle, Reduce motion toggle (on). Note: from footer Accessibility link + Settings, persists per device.
13. Final consistency checklist (handoff QA) — 8 cards: Shells & navigation, Tokens, List states, Modals & sheets, Status badge colors, Wizards & forms, Honesty rules, Mobile rules; "Batch 17 of 17 — design coverage complete" banner.

### ADD-ON features/screens in design NOT in the prompt (deltas)

- PWA install banner display LOGIC spelled out: localStorage-remembered 30 days, suppressed on first visit, only after 2+ sessions — engagement gating not asked for.
- Offline banner ships with an actual "Saved properties (available offline)" content view, not just the banner — demonstrates offline data behavior.
- EMI calculator includes a principal-vs-interest amortization mini bar chart with "Yr 1 mostly interest → Yr 20 mostly principal" labels — richer than "amortization mini-chart".
- EMI Home-loan assistance shown as an explicit Setup Required provider state (Enquire CTA once loan partner integrated) — honest provider gating.
- Stamp duty calculator encodes real Gujarat rule (female buyers pay no registration fee) with a compare nudge, and cites jantri value / Sub-Registrar — domain-accurate beyond generic male/female/joint.
- Unit converter is Gujarat-specific (vaar, guntha, Gujarat bigha) with a caveat that bigha varies by region — localization depth.
- Transliteration examples include Gujarati-script input (રાજકોટ) and alias+typo compound (barodra→Vadodara via "Baroda") — beyond the prompt's simple misspellings.
- Comparison table mixes resale property (Contact Owner, RERA "—") vs projects (Enquire, RERA Verified) in one table — property/project cross-type comparison with correct per-type CTAs and RERA semantics.
- Compare tray stacking rule ("tray > bottom nav order", never covers card CTAs) — sticky-layering discipline.
- Theme toggle proves dark mode via token-swap-only claim with concrete dark hex values — implementation guidance embedded.
- App update toast explicitly defers until screen idle / never mid-wizard — interaction-safety rule.
- Accessibility panel persists per device and is reachable from two entry points (footer + Settings).
- Final consistency checklist is a full developer-QA handoff sheet covering ALL 17 batches (bottom-nav item list "Home·Search·Post·Leads·Profile", exact token hexes, status-badge color semantics, honesty rules, 44px hit targets, safe-area) — a spec artifact beyond a "visual reference sheet".
- data-screen-label attributes + light/dark theme param handling in the render harness (appTheme) — infra.

### Items in prompt MISSING from design

- Full "desktop then mobile for each screen" pairing — most screens shown at one representative viewport; mobile variants described in notes rather than fully rendered (e.g. analytics consent "bottom sheet mobile", accessibility "bottom sheet" not drawn).
- Language selector footer placement — only header dropdown shown (prompt said header/footer).
- Hindi shown as "Coming soon" disabled (prompt allowed either enabled or coming-soon — design chose coming-soon, so no Hindi active state).

### Notable UX patterns

- Honesty-first utilities: every calculator carries an estimate/not-advice disclaimer; untranslated text falls back to English with a pending indicator; providers gated as Setup Required.
- Layout-safe transient UI: offline banner in normal flow, update toast idle-deferred, compare tray layered above bottom nav without covering CTAs.
- Gujarat-domain accuracy across calculators (stamp duty rules, land units, transliteration).
- Token-swap dark mode (no redesign) proven side-by-side.
- Closes the 17-batch system with a single QA handoff checklist consolidating every shared pattern, token, and honesty rule.
