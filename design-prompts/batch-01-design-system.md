# Batch 1 — Design System + Shared UI Patterns (Foundation)

Paste everything below into the AI design tool.

---

ROLE: You are a senior product designer at an Apple-caliber design studio. Design a PREMIUM, high-fidelity DESIGN SYSTEM + SHARED UI PATTERN LIBRARY for a real-estate marketplace. This is BATCH 1 of a 17-batch full-site wireframe project — everything you create here becomes the fixed foundation that every future screen must reuse without deviation.

PRODUCT: "My Gujarat Property" — a Gujarat (India) real-estate marketplace. Roles: Guest, Owner, Broker/Agent, Builder/Developer, Super Admin, Admin, and permission-based Staff (Verification/Support/Content/SEO/Ads/Billing/Payment/City/User/Notification/System/Security/Reports/Audit Manager). Mobile-first — 80% of real users are Owners on mobile phones — but desktop must feel equally premium.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic HTML, no backend, no lorem-heavy filler, real-sounding sample content only. Clearly labeled sections with sticky in-page anchor nav at top so I can jump between sections.

## DESIGN LANGUAGE (lock this in — do not deviate in later batches)
- White-first, generous whitespace, calm and confident hierarchy — feels like a $1M SaaS product, not a template.
- Font: Inter (or system-ui fallback). Headings weight 500–600, body 400, labels 500. Generous line-height (1.5+).
- ONE premium accent color: a refined deep emerald/teal (e.g. #0F6B5C family) used sparingly for primary actions, active states, links. Neutrals (zinc/slate scale) carry everything else.
- Radius: cards/panels 16px, buttons/inputs/controls 10px, pills/badges full-round.
- Shadows: soft and subtle only — never harsh drop shadows. Borders: 0.5–1px hairline (zinc-100/zinc-200).
- Spacing scale: 4/8/12/16/24/32/48 — nothing off-scale.
- Icons: outline style, consistent stroke width (Lucide/Heroicons style) — never mix icon sets.
- Micro-interactions: hover lift (translateY -1 to -2px + shadow increase), 150–200ms ease transitions. No neon, no heavy gradients, no glassmorphism.

## SECTION 1 — FOUNDATIONS (render as a style guide)
- Color tokens swatch grid: brand (+hover/+soft tint), neutrals scale (zinc 50–900), semantic (success/warning/error/info), each with hex + usage label.
- Type scale: display, h1–h4, body-lg, body, body-sm, caption, label — each rendered with actual sample text and px/line-height noted.
- Spacing scale ruler visual.
- Radius scale visual (buttons vs cards vs pills).
- Shadow scale (sm/md/lg) rendered on cards.
- Icon set sample grid (20+ icons: home, search, heart, bell, user, menu, chevron-left/right/down, filter, map-pin, phone, message, calendar, upload, check, x, alert-triangle, info, lock, shield-check, trending-up, building, layout-grid).

## SECTION 2 — CORE COMPONENTS
- Buttons: primary, secondary, ghost, destructive, disabled — each in default/hover/active/loading (spinner + disabled) states, in both normal and small sizes.
- Inputs: text, textarea, select, search input, phone input (with country code), OTP input (6-box), date picker trigger, checkbox, radio, toggle switch — each in default/focus/error/disabled/filled states, with label + helper text + error message pattern.
- Badges/status chips: draft, pending, approved, rejected, need-changes, paused, expired, verified, RERA-verified — using EntityStatusBadge-style colored pill pattern (neutral base, colored dot/text, never all-caps shouting).
- Cards: base card, property card (image, price, title, location, spec chips, heart/save icon, "posted by" tag), project card (price range, RERA badge, builder name), stat card (with gradient variant — StatCardGradient style), list-row card.
- Avatar component: sizes sm/md/lg, with fallback initials, verified-badge overlay variant.
- Dropdown menu: base pattern (used for profile menu, action menus, filter menus).
- Tabs: underline style and segmented/pill style.
- Tooltip.
- Pagination control.
- Progress indicator: linear (upload progress) and stepped (multi-step form wizard — show 3 variants: numbered circles, connected line with checkmarks, and compact mobile version showing "Step 3 of 7" with progress bar).

## SECTION 3 — GLOBAL NAVIGATION SHELLS (the most critical section — every future batch must match these EXACTLY)

**3A. PUBLIC HEADER — DESKTOP (show OPEN mega-menu state)**
- Strict 3-zone layout: [Brand+City | Search (flex-1) | Auth controls]. Brand "My Gujarat Property" never wraps, divider + city selector flex-shrink-0.
- Below/integrated: mega-menu nav bar — "Buy", "Rent", "Projects", "Cities", "For Owners/Brokers/Builders" — show ONE open with rich multi-column dropdown panel (property types, popular localities, popular cities, quick links, a small promo tile).
- Notification bell (with unread dot) + Login/Register buttons shown; ALSO show the logged-in variant of the same header (avatar + name replacing Login/Register).

**3B. PUBLIC HEADER — MOBILE (390px)**
- Compact: brand + city pill + hamburger icon only. Search is a tappable bar below header (not hidden).
- Show hamburger drawer OPEN: full-screen slide-in menu with nav links, role CTA, login/register or profile section, legal links footer.

**3C. APP-LIKE CONTEXTUAL HEADER — MOBILE (used on every inner/detail/dashboard sub-page — THIS IS MANDATORY ON EVERY MOBILE SCREEN GOING FORWARD)**
- Fixed top bar, 56px height: back-chevron button (left) + page title (center, truncates) + 1-2 contextual right actions (e.g. share/save/filter/menu icon).
- Show 3 variants: (a) detail page context ("← Property Title · Share/Save icons"), (b) dashboard sub-page context ("← Post Property · Save Draft"), (c) admin queue context ("← Verification Review · ⋮ menu").
- Rule: back button MUST be present on every non-root mobile screen — annotate this rule directly on the artboard as a callout note.

**3D. DASHBOARD SHELL — DESKTOP (Owner/Broker/Builder)**
- Left sidebar (240px), collapsible to icon-rail (64px) — show BOTH states. Role-aware nav items with icon+label+active-highlight (brand color left-border + soft bg).
- Top bar: breadcrumb (with clickable back segment) + global search + notification bell (open dropdown state) + profile dropdown (open state, w-52 rounded-xl shadow-lg).
- Content area with example stat cards row.

**3E. DASHBOARD SHELL — MOBILE**
- Contextual header (per 3C) at top.
- Bottom navigation bar, 5 items fixed (Home, Search, Post [center, elevated/accent], Leads, Profile) — show active state on one item. This EXACT bottom nav must be annotated as "appears on every dashboard mobile screen, all batches."
- Sidebar becomes a drawer (slide from left, overlay dims background, tap-outside closes, drawer-content-click does not close).

**3F. ADMIN/STAFF SHELL — DESKTOP + MOBILE**
- Same sidebar+topbar pattern as 3D/3E but neutral graphite palette (not brand-teal) to visually distinguish internal tools from user-facing dashboards; permission-scoped nav example (show 3 items grayed/hidden-style vs available).
- Mobile: contextual header + drawer (no bottom nav for admin — annotate why: admin is desktop-primary, but drawer must still work on mobile for emergency use).

## SECTION 4 — OVERLAY PATTERNS (show every one in OPEN state)
- Generic modal (desktop, centered, max-w-lg, overlay click closes, inside-click does not).
- Generic bottom sheet (mobile equivalent of above, drag-handle, rounded top corners, locks background scroll).
- Confirmation dialog (destructive action, e.g. "Delete listing?" with cancel/confirm-danger buttons).
- Toast/alert notification (success, error, info variants, top-right desktop / top mobile, auto-dismiss).
- Notification dropdown (desktop, open, grouped by today/earlier, mark-all-read, empty state variant too).
- Notification bottom sheet (mobile, open, same content).
- Filter bottom sheet (mobile) — showing applied filter chips + apply/clear sticky footer buttons.
- Right-side detail drawer (desktop, e.g. lead detail slide-in from right, 480px wide, close button, scrollable content, sticky action footer).
- Fullscreen image gallery viewer overlay (swipe dots, close X, counter "3/12").
- Share sheet (mobile bottom sheet) and share popover (desktop).

## SECTION 5 — UNIVERSAL SCREEN STATES (show each using ONE example module, e.g. "Leads list", so the pattern is transferable)
- Loading state: skeleton screen (cards + table row skeletons, shimmer style).
- Empty state: MUST be actionable, never a dead end — icon/illustration + heading + 1-line explanation + primary CTA button (e.g. "No leads yet" → "Share your listing" button). Show 3 variants: dashboard empty, search empty, admin queue empty (zero-pending "All caught up" positive variant).
- Error state: inline error banner + retry button, and a full-page error variant (safe, no stack traces).
- Unauthorized/Forbidden state (full page, "You don't have permission" + safe redirect CTA).
- Setup-required state (provider missing — neutral info banner, e.g. "WhatsApp notifications: Setup Required", not fake-active).
- Disabled state with reason tooltip (e.g. disabled "Post Project" button with "Complete verification first" helper text).
- Table → card responsive transform: show the SAME dataset as a desktop table AND as mobile stacked cards side by side.

## SECTION 6 — FORM WIZARD PATTERN (multi-step, will be reused for property/project/requirement/ad posting in later batches)
- Desktop: horizontal stepped progress header + form panel + sticky footer with Back/Save Draft/Continue buttons.
- Mobile: compact "Step 3 of 7" progress bar under contextual header + form fields + STICKY BOTTOM ACTION BAR (fixed, safe-area-aware, Back ghost button + Continue primary button, must never cover content — show content scrolled state proving no overlap).
- Show a validation error state within the form (field-level red border + message + error summary at top on submit attempt).

## SECTION 7 — MOBILE STICKY CTA (detail pages)
- Property/Project detail page bottom sticky bar: "Call" + "Message"/"Enquire Now" buttons, safe-area padding, must sit above bottom nav ONLY when not inside dashboard (annotate the two contexts: public detail page = sticky CTA only; dashboard = sticky CTA + bottom nav stacked, showing correct spacing so neither overlaps content).

## CONSISTENCY RULES (annotate these explicitly on the artboard as a checklist note, since every future batch must obey them)
- Every mobile inner screen has the contextual header WITH back button — no exceptions.
- Every dashboard mobile screen has the same 5-item bottom nav in the same order.
- Every public page has the same header/footer.
- Every list/table has loading, empty (actionable), and error states designed — not just the "happy path."
- Every destructive action has a confirmation dialog.
- Every modal has both desktop (modal) and mobile (bottom sheet) versions.
- No dead buttons, no "#" links, no fake counts/badges anywhere, ever.

QUALITY BAR: Pixel-consistent spacing/radius/shadow across every component. Accessible (visible focus rings, labeled icon buttons, AA contrast). Clean commented HTML suitable for handing to developers.

Render order: Section 1 → 2 → 3 (A through F in order) → 4 → 5 → 6 → 7, each clearly labeled with a heading and short description, desktop examples before mobile examples within each section.
