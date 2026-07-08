# Batch 17 — Advanced/PWA/Localization/Calculators/Comparison Tools

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 17 of 17 — the FINAL batch — Advanced features, PWA behaviors, localization affordances, and utility calculator/comparison tools. After this batch, every screen in the platform has been covered A to Z.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, public header/footer and dashboard shells from Batch 1, matching every prior batch exactly. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on every mobile inner page.
- No fake claims in calculator disclaimers — clearly state these are estimates, not legal/financial advice.
- No fake translated content — untranslated content must show an honest fallback (source language + subtle "translation pending" indicator), never garbled machine text presented as final.
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **PWA Install Prompt (subtle banner, mobile)** — non-intrusive bottom banner: "Add My Gujarat Property to your home screen" + Install/Dismiss buttons, dismissible-and-remembered state.
2. **Offline / Slow-Network Banner** — top banner variant: "You're offline — showing saved content" with a retry icon; annotate that it appears above the header without pushing layout awkwardly.
3. **Language Selector (header/footer placement)** — dropdown showing English (active) / Gujarati / Hindi (future — shown as "Coming soon" disabled option or fully enabled if in scope), flag/script preview per option.
4. **Theme Toggle (light/dark/system)** — segmented control in profile/settings menu, PLUS show one representative dashboard screen (e.g. Overview stat cards) rendered in a dark-mode preview alongside its light-mode counterpart to prove the token system supports both without redesign.
5. **City/Locality Search — Typo/Transliteration Tolerance example** — a small annotated mockup showing a search input where a Gujarati-script or misspelled query ("amdavad", "rajkot", "surat") still resolves to correct suggestions in a dropdown — illustrate the concept visually with example input/output pairs, not a functional demo.
6. **EMI Calculator Page** — loan amount/interest-rate/tenure sliders or inputs, calculated EMI result card, amortization mini-chart, prominent disclaimer callout ("This is an estimate for informational purposes only, not financial advice"), "Enquire about home loan assistance" CTA if applicable (Setup-Required state if no loan-partner integration).
7. **Stamp Duty Calculator Page** — state/city selector, property value input, buyer-type toggle (male/female/joint — reflecting real Gujarat stamp-duty rules), calculated result card, legal-review-required disclaimer callout.
8. **Unit Converter Tool** — sqft/sqyd/sqm/acre/guntha/bigha converter (Gujarat-relevant units), simple input+output card, common-conversions reference table below.
9. **Property/Project Comparison Page — Advanced state** — building on the basic version from Batch 4: show the "Add to Compare" interaction starting point (a compare-tray sticky bar at the bottom of search results that accumulates items, "Compare (3)" button), then the full comparison table it leads to.
10. **Analytics/Tracking Consent Banner (first-visit, cookie-adjacent but analytics-specific if separated in your consent model)** — accept/customize buttons, links to Cookie Policy.
11. **App Update Available Banner (PWA)** — "A new version is available" + Refresh button, non-blocking.
12. **Accessibility Quick-Settings (optional, if in scope)** — font-size adjuster, high-contrast toggle, shown as a small panel accessible from footer or settings.

Close this batch with a **final consistency checklist page** (one summary artboard, not a real product screen) listing every shared pattern established across all 17 batches (header, contextual mobile header, bottom nav, sidebar, back button, empty/loading/error states, modal/bottom-sheet pairing, status badge colors, wizard pattern, sticky CTA) as a visual reference sheet — this becomes the developer handoff QA checklist for implementation.
