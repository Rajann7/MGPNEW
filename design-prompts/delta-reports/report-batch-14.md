# report-batch-14

## Batch 14 — Admin CMS / SEO / Blog / Legal / Location

### Screens/components present in design (full inventory)

Anchor nav / section groups: #c-cms (1-5 CMS/Blog/Legal), #c-seo (6-9 SEO/Redirects/Sitemap), #c-loc (10-11 Locations), plus a 12th section (#c-i18n) not in the top nav.

1. CMS pages list — search box, New page button, columns PAGE/SLUG/STATUS/EDITED. Rows: About Us /about Published; How Verification Works /verification Draft; RERA Guide /guides/rera Published. Footer note: loading=shimmer, empty="No pages yet"+CTA, error=banner+Retry (Batch 1 §5).
2. CMS page editor — back button, title, "Draft · autosaved 2 min ago", status chip, Preview + Publish… buttons. Body: title input, slug input with mygujaratproperty.com/ live URL, WYSIWYG toolbar (Bold/Italic/H2 | List/Link/Image/Quote), content block preview (heading + paragraphs + dashed image block), honest-copy note. Right SEO sidebar: Meta title (54/60 counter), Meta description (143/160 counter), Canonical URL, Indexable toggle, live Google search preview.
3. Blog posts list — columns POST/AUTHOR/STATUS/PUBLISHED, category+tag chips per row, author "Content team", dates / "—" for draft.
4. Blog editor additions — dashed "BLOG-ONLY ADDITIONS": Featured image upload, category chips ("Guides ×","+ category"), Excerpt (max 160). Same chrome as CMS.
5. Legal pages list + editor — restricted list (Terms of Use /terms Published·v6; Privacy Policy /privacy "v7 awaiting sign-off"). Amber shield banner: legal-review sign-off required, Publish disabled. Inline editor banner with "requested from legal@ on 2 Jul".
6. Per-page metadata (SEO settings) — search, "1,842 pages", columns PAGE/META(inline edit)/INDEXED. Active inline-edit row with "Enter saves, Esc cancels". Noindex row dimmed with toggle off.
7. Redirect manager — "Redirects · 48", Add redirect, columns FROM→TO/TYPE/HITS/actions, 301/302 pills, hits (3,204/87), edit+delete icons.
8. Redirect form loop prevention — From/To inputs (red-bordered), red loop-detected banner, 301/302 segmented toggle, disabled Save (not-allowed cursor).
9. Sitemap status — sitemap.xml card, "Last generated 3 Jul 2026 04:00 IST · 1,842 pages", Regenerate, "EXCLUDED — TRANSPARENCY LIST (214 pages)" with reasons (thin/parameterized/expired).
10. Location hierarchy tree — search, "Level: All" filter, indented tree India→Gujarat→Ahmedabad→Ahmedabad City→West Zone→Satellite→Shrinand Residency + Bopal. Per-node "Add child". Footer: taluka collapses when identical to city; new nodes from Missing-Location queue (Batch 11 §16).
11. Location create/edit multilingual — Name English/Gujarati/Hindi, aliases chip input, Parent select, Active toggle, Save.
12. Missing translation tracker — "148 strings missing translations", language filter chips (ગુજરાતી/हिन्दी), Status filter, columns ENGLISH SOURCE/ગુજરાતી/STATUS. Rows: Translated, Pending (inline input), Pending (missing italic).

### ADD-ON features/screens in design NOT in the prompt (deltas)

- Autosave state in CMS editor ("Draft · autosaved 2 min ago") — not requested.
- Live SEO character counters (54/60 title, 143/160 description) — beyond listing the fields.
- Live Google-style search snippet preview (blue title / green URL) in SEO sidebar — not requested.
- Legal versioning + sign-off audit detail ("v6", "v7 awaiting sign-off", "requested from legal@ on 2 Jul") — prompt asked only for a generic approval banner.
- Cross-screen count cohesion (1,842 pages reused on both SEO table and sitemap).
- Redirect hit-count surfaced as decision rationale (3,204 hits on high-traffic redirect).
- Explicit disabled Save with not-allowed cursor on redirect loop — concrete blocked-state.
- Location tree cross-module integration: pending children fed from Batch 11 §16 Missing-Location queue.
- "Taluka collapses when identical to city" hierarchy simplification rule.
- Locality listing counts inside tree ("214 listings","168 listings").
- Aliases resolve-in-search explainer tying aliases to typo-tolerant Gujarat search.
- Screen 12 (translation tracker) missing from top anchor nav — minor inconsistency.
- Honest-copy compliance modeled on-screen with explicit reminder note.

### Items in prompt MISSING from design

- Explicit mobile/table→card layouts and "desktop then mobile per screen" — extract is desktop-only multi-column grids; no mobile card variants or contextual mobile back-button views.
- Full category/tag selector UI for blog (only chips + "+ category" shown, no picker/management).
- No standalone Preview screen (Preview is only a button).

### Notable UX patterns

- One editor chrome across CMS/Blog/Legal; type differences shown as additive dashed blocks, not separate tools.
- Never-silent publish (Publish… ellipsis, draft chips, autosave, legal publish disabled until sign-off).
- Transparency-first SEO (sitemap exclusion list, noindex toggles for thin/parameterized pages).
- Inline quick-edit with Enter-saves/Esc-cancels (SEO metadata + translations).
- Multilingual-native forms with real Gujarati/Hindi script.
- Dark pill-anchor top nav; white-first content matching Batches 11-13.
