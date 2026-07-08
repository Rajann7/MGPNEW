# Batch 16 — Public Legal/CMS/Blog/Help/Support Pages

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 16 of 17 — the full set of public-facing legal, CMS, blog, and help/support pages (the content these are meant to display is authored via the admin CMS tools shown in Batch 14 — this batch is the reader-facing side).

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, public header (3-zone desktop + hamburger mobile) and footer from Batch 1. Specifically re-apply:
- App-like contextual header WITH BACK BUTTON on every mobile inner page.
- Breadcrumb on desktop for all inner pages.
- No fake claims in any sample copy ("No.1", "100% verified", "guaranteed" are forbidden even as placeholder text).
- Mobile-first: 390px → 768px → 1280px+, no horizontal scroll, comfortable reading line-length (max-w-prose on body text).

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN

1. **About Page** — mission/story section, team or values section, trust-focused qualitative copy (no fake stats).
2. **Contact Page** — contact form (name/email/subject/message), office-address block, map embed (with Setup-Required fallback shown), alternate contact channels list.
3. **FAQ / Help Center Page** — searchable FAQ with category tabs, accordion-style Q&A, "Still need help? Raise a ticket" CTA at bottom.
4. **Safety Guidelines Page** — icon-illustrated safety tips (never share OTP, verify before advance payment, meet in safe locations), clean editorial layout.
5. **Terms & Conditions Page** — long-form legal text layout: sticky in-page table-of-contents sidebar (desktop) / collapsible TOC (mobile), numbered sections, "Last updated" date visible at top.
6. **Privacy Policy Page** — same long-form layout pattern as T&C (reuse identical structure).
7. **Cookie Policy Page** — same layout pattern, plus an embedded "Manage Cookie Preferences" button that opens the cookie preference modal (design that modal here too: essential/analytics/marketing toggles, save button).
8. **Refund Policy Page** — same layout pattern.
9. **Cancellation Policy Page** — same layout pattern.
10. **Listing Policy Page** — same layout pattern, this one may include a short do's/don'ts icon-list at top before the legal text.
11. **Advertising Policy Page** — same layout pattern.
12. **Verification Policy Page** — same layout pattern.
13. **Payment Policy Page** — same layout pattern.
14. **Disclaimer Page** — shorter page, prominent callout box: "My Gujarat Property is an online listing and lead marketplace. We are not the owner of listed properties and do not provide legal or financial advice."
15. **Grievance/Support Policy Page** — same layout pattern, includes grievance-officer contact block (name/email/response-time commitment).
16. **Blog Listing Page** — category/tag filter chips, article card grid (image, title, excerpt, author, read-time, date), pagination, empty-category state.
17. **Blog Post Detail Page** — hero image, title, author byline with avatar, reading-progress bar (mobile), rich content body (max-w-prose), related-posts strip at bottom, share buttons.
18. **Support/Contact Form Page (guest, rate-limited)** — same form as Contact Page but annotate the guest rate-limit note ("You can submit up to 3 requests per hour").
19. **Support Ticket Status Tracker (logged-in)** — list of the user's own tickets with status chips, click-through to a read-only thread view (reply box only if ticket is open).
20. **Cookie Preference Manager Modal (standalone, revisitable from footer link)** — same as embedded in #7, shown as its own dedicated screen state too, both desktop modal and mobile bottom sheet.

Reuse ONE shared "legal document layout" component across screens 5–13 and 15 — same TOC pattern, same typography, same spacing — so switching between any two legal pages feels seamless, not like different templates.
