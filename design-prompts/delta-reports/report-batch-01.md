# Batch 1 — Design System + Shared UI Patterns

Source: batch_1_Design_System_Standalone_.txt (TEMPLATE section = static HTML design canvas; the JS resources are only the lucide icon bundle + dc-runtime, no app JSX).

## Screens/components present in design (full inventory)

Sticky anchor nav: 1 Foundations · 2 Components · 3 Nav Shells · 4 Overlays · 5 Screen States · 6 Form Wizard · 7 Sticky CTA · Rules

Section 1 — Foundations
- Color tokens: brand #0F6B5C, brand-hover #0C5648, brand-soft #E7F2EF, success #16A34A, warning #D97706, error #DC2626, info #2563EB, zinc 50-900 neutrals
- Type scale (Inter): display 40/48 600, h1 30/38, h2 24/32, h3 20/28, h4 16/24, body-lg 16/26, body 14/22, body-sm 13/20, caption 12/18, label 13/16 500 — all with real-estate sample text
- Spacing ruler 4/8/12/16/24/32/48; Radius 16 (cards) / 10 (buttons-inputs) / full (pills); Shadows sm/md/lg
- Icon set: Lucide outline, 1.75px stroke (rendered by lucide JS bundle; grid placeholder in HTML)

Section 2 — Core Components
- Buttons: primary/secondary/ghost/destructive x default/hover/active/loading (Saving…, Deleting…)/disabled/small
- Inputs: text (default/focus/error/disabled), textarea (min 30 chars), select (city list), search input w/ leading icon, phone +91 prefix, OTP 6-box with auto-advance AND Resend in 0:24 countdown, date-picker trigger, checkbox, radio (Sale/Rent), toggle
- Status badges (EntityStatusBadge): Draft, Pending, Approved, Rejected, Needs changes, Paused, Expired, Verified, RERA Verified
- Cards: property card (Verified badge, Rs 85 L, spec chips 1450 sq ft / Ready to move / East facing, Posted by Owner tag), project card (RERA Verified, price range 62 L - 1.4 Cr, builder avatar + possession date), stat card + StatCardGradient variant (Views 1284 with "+18% this week" trend chip; Leads 37), list-row lead card, base card spec (white, 1px zinc-200, r16, shadow sm to md on hover)
- Avatars sm/md/lg + verified-badge overlay
- Dropdown menu (open): profile menu (My profile / My listings / Settings / Log out)
- Tabs: underline w/ counts (Active 12 / Pending 3 / Expired 5) + segmented pill (Buy / Rent / Projects)
- Tooltip (Complete verification first, on disabled Post Project)
- Pagination (1 2 3 … 14)
- Progress: linear (upload 4 of 6, 68%), stepped x 3 variants incl. compact mobile Step 3 of 7 Pricing

Section 3 — Global Navigation Shells
- 3A Public header desktop: 3-zone [Brand+City | Search flex-1 | Login/Register]; mega-menu open (Buy/Rent/Projects/Cities/For Owners-Brokers-Builders) with columns PROPERTY TYPES, POPULAR LOCALITIES, POPULAR CITIES, QUICK LINKS + promo tile (Post your property free · Verified listings get 3x more enquiries · Get started); logged-in variant (avatar + first name)
- 3B Public header mobile 390px: brand + city pill + hamburger; always-visible tappable search bar below (Search in Ahmedabad…); drawer open with nav, role CTA (Are you an Owner, Broker or Builder? Post property free), Login/Register, legal footer (About Terms Privacy RERA Info)
- 3C Contextual mobile header 56px, 3 variants: detail page, dashboard sub-page (Post Property · Save Draft), admin (Verification Review); back-button rule annotated
- 3D Dashboard shell desktop: 240px sidebar (Overview / My Listings 12 / Leads / Performance / Profile & KYC) + 64px collapsed icon-rail both shown; topbar breadcrumb + search + notification dropdown open + profile dropdown open; stat cards row (Active listings 12 / Total views 4208 / Leads this month 37)
- 3E Dashboard shell mobile: contextual header + 5-item bottom nav (Home · Search · Post · Leads · Profile) + left drawer open over dimmed overlay; order rule annotated
- 3F Admin/Staff shell: graphite palette, MGP Admin brand, Verification Manager example, permission-scoped nav (Verification Queue 24 / Listings / Users; Billing, Ads Manager, System marked no access); note: admin mobile = drawer only, no bottom nav

Section 4 — Overlays (all shown open)
- Generic modal desktop (Report this listing), destructive confirm (Delete this listing? — warns its 37 leads will be removed), mobile bottom sheet equivalent (drag handle, scroll lock, safe-area)
- Toasts: success (Listing published), error (Upload failed — Photo 5 exceeds 10 MB), info (Draft saved — Resume anytime from My Listings)
- Share popover desktop (WhatsApp / Copy link / Email / Download brochure) + mobile share sheet (WhatsApp / Copy link / Email / More)
- Notification dropdown desktop (TODAY/EARLIER groups, Mark all read) + empty variant (You are all caught up) + mobile notification bottom sheet
- Filter bottom sheet mobile: APPLIED chips (3 BHK / 60L-1Cr / Ready to move), PROPERTY TYPE options, Clear all + Show 142 results sticky footer
- Right-side lead detail drawer 480px: masked phone "+91 98790 44xxx · reveals on contact", lead message quote, chips (New lead / Budget 80-90L), Call + Message footer
- Fullscreen gallery viewer (photo 3 — living room, counter 3 / 12)

Section 5 — Universal Screen States (Leads list module)
- Skeleton + shimmer loading; actionable empty x3 (No leads yet -> Share your listing; search-empty No matches in Bopal under 40L -> Remove price filter; admin All caught up)
- Inline error + Retry; full-page error (We have been notified. No technical details + Reload); Forbidden (Billing is limited to the Billing Manager role + Back to my dashboard); Setup-required (WhatsApp notifications: Setup Required + Set up, never fake-active note); disabled-with-reason (Post Project)
- Table-to-card transform (same 3-lead dataset, desktop table + mobile stacked cards)

Section 6 — Form Wizard
- Desktop: stepped header (Basics / Location done, 3 Pricing, 4 Photos), error summary banner (2 fields need attention — Expected price, Maintenance amount), field-level errors, negotiable Yes/No radio, optional Booking amount, sticky footer Back / Save Draft / Continue
- Mobile: contextual header (Post Property · Save Draft), Step 3 of 7 Pricing bar, sticky safe-area action bar, scrolled-content proof annotation

Section 7 — Mobile Sticky CTA
- Context A public detail: sticky Call + Enquire Now only
- Context B dashboard lead detail: Call + Message CTA stacked above bottom nav, padding annotations

Consistency rules checklist rendered as final artboard note (7 rules + token summary line).

## ADD-ON features in the design NOT in the prompt (deltas)

Design is a very faithful render of the prompt; add-ons are small refinements:
1. OTP resend countdown — "Resend in 0:24" timer on the OTP input (prompt asked only for 6-box OTP). Section 2 Inputs.
2. Share popover "Download brochure" action — extra 4th action in desktop share popover. Section 4.
3. Lead drawer contact masking pattern — "+91 98790 44xxx · reveals on contact" plus Budget 80-90L chip in the right-side drawer; concrete contact-privacy micro-pattern not spelled out in the prompt (but mandated by CLAUDE.md). Section 4.
4. Stat-card trend chip — "+18% this week" delta indicator on the Views stat card. Section 2.
5. Sidebar count badges — "My Listings 12" and admin "Verification Queue 24" numeric nav badges. Sections 3D/3F.
6. Mega-menu QUICK LINKS curated content — Ready to move / Under 50 Lakh / Verified by owner / New this week. Section 3A.
7. Confirmation dialog consequence copy — delete dialog explicitly warns the listing's 37 leads will be permanently removed (cascade-consequence messaging). Section 4.
8. Toast third variant "Draft saved / Resume anytime from My Listings" — draft-recovery hint pattern. Section 4.
9. Token summary footer line locking exact hexes and scales for all later batches.

## Items in the prompt MISSING from the design
- Icon set sample grid: HTML has a placeholder populated by the bundled lucide JS at runtime — the 20+ named icons cannot be verified from static extraction, but the grid slot + "Lucide outline, 1.75px stroke, never mixed" label exist. Not a real gap.
- Notification-bell unread dot (3A) and micro-interaction specs (hover lift, 150-200ms) are icon/CSS-level details not verifiable from text extraction.
- Everything else in the prompt (all 7 sections, all states) is present.

## Design tokens / notes
- Accent: #0F6B5C (hover #0C5648, soft #E7F2EF); semantic #16A34A / #D97706 / #DC2626 / #2563EB; zinc neutrals
- Font: Inter 400/500/600; radius 16/10/full; shadows sm/md/lg; spacing 4-8-12-16-24-32-48
- Icons: Lucide outline 1.75px stroke (lucide v1.23.0 bundle embedded)
- Bottom-nav order (locked, all batches): Home · Search · Post · Leads · Profile
- Admin shell: neutral graphite palette, MGP Admin brand, desktop-primary, no bottom nav
- Sample data locale: Ahmedabad/Surat/Vadodara/Rajkot/Gandhinagar; lakh/crore pricing; RERA terminology
