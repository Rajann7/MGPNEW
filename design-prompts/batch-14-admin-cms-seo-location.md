# Batch 14 — Admin: CMS/SEO/Blog/Legal/Location

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 14 of 17 — Admin CMS, SEO, Blog, Legal Pages and Location Hierarchy Management.

MANDATORY CONSISTENCY — reuse the Admin Shell and all design tokens from Batch 1, matching Batches 11–13's admin visual language exactly. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on mobile admin sub-pages.
- Every list has loading, empty, and error states.
- Publish actions show draft/preview/publish states clearly (never silently live).
- No fake SEO claims (no "No.1", "100% verified", "guaranteed" copy allowed anywhere, including in placeholder sample content — model good copy here).

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **CMS Pages List** — table→card, page title, slug, status (Draft/Published), last-edited.
2. **CMS Page Editor** — title, slug (with URL preview), rich-text/block content editor area (represent as a simplified WYSIWYG toolbar + content blocks, not a full editor build), SEO fields sidebar (meta title/description/canonical), Draft/Preview/Publish button group.
3. **Blog Posts List** — table→card, category/tag chips, author, status, published-date.
4. **Blog Post Editor** — same editor pattern as CMS, plus featured-image upload, category/tag selector, excerpt field.
5. **Legal Pages List/Editor** — same list+editor pattern, restricted-permission note ("Legal content changes require Content Manager + legal-review sign-off" — show as an inline approval-required banner within the editor for this content type).
6. **SEO Settings Page (per-page metadata)** — searchable table of all indexable pages with meta-title/description quick-edit inline, indexed/noindex toggle per row.
7. **Redirect Manager List** — table of redirects (from/to URL, type 301/302, hit-count), add/edit/delete actions.
8. **Redirect Create/Edit Form** — from-path, to-path, type selector, validation (prevent redirect loops — show an inline warning state example).
9. **Sitemap Status/Generation View** — last-generated timestamp, page-count included, "Regenerate" button, excluded-pages list (thin/empty pages correctly excluded, shown as a transparency list).
10. **Location Hierarchy Admin (tree/table view)** — expandable tree: Country → State → District → Taluka → City → Area → Locality → Society, add-child action per node, search/filter.
11. **Location Create/Edit Form** — name (English), name (Gujarati), name (Hindi), aliases/common-spellings chip input, parent-location selector, active toggle.
12. **Translation/Localization Admin — Missing Translation Tracker** — table of strings/content missing Gujarati or Hindi translation, filter by language, status (translated/pending), inline edit.

Keep the CMS/Blog editor layout (2, 4, 5) visually identical across all three content types — same toolbar, same SEO sidebar position, same publish-button group — so it reads as one consistent content-editing system, not three different tools.
