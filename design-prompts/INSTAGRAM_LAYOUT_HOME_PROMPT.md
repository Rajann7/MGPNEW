# Instagram-Layout Home Page — Full Prompt (Desktop + Mobile)

Paste this whole file as one prompt into Claude (design/artifact). Self-contained — no prior chat context needed.

---

## Brief

Recreate Instagram's UI layout/component structure 1:1 (grid, spacing, proportions, icon positions, card anatomy, stories bar, bottom nav, story viewer, reels viewer) for the home page of **My Gujarat Property**, a real-estate marketplace. Structural clone only — every piece of content is real-estate content, never social content. Do not use Instagram's logo, wordmark, camera icon, or any Meta trademark/asset — skeleton is Instagram's, skin is My Gujarat Property's.

## Design tokens (apply on top of the cloned structure)

- Brand `#0F6B5C`, hover `#0C5648`, soft `#E7F2EF` (replaces Instagram's blue/gradient accents)
- Font Inter 400/500/600
- Radius 16/10/full
- Spacing scale 4-8-12-16-24-32-48
- White background, black/gray text, no gradients, no glassmorphism, no neon

## Content mapping (Instagram element → real-estate element)

- Stories bar → "Featured & Verified" rail. Circle = featured project / verified listing collection / top broker. Ring: brand-green = verified/RERA, gray = unverified, dimmed = already viewed. First circle = "+" "Post your listing".
- Story viewer (full-screen, progress-bar segments, tap L/R navigate, hold to pause, swipe down close) → listing photo/video viewer; reply-bar at bottom becomes "Send Enquiry" input.
- Explore (compass icon) → "Explore Listings" masonry grid with filters.
- Reels (clapperboard icon, vertical swipe feed) → "Property Video Tours" (site-visit walkthroughs, drone shots, builder promo videos), same vertical swipe-up-for-next UI, mute/unmute icon, price/locality/"View Property" overlay CTA.
- Feed post card, same order top-to-bottom:
  1. Header row: avatar 32px + name + verified badge + "···" menu + timestamp → owner/broker/builder avatar + RERA/verified badge
  2. Media: same aspect-ratio/carousel/dot-indicator behavior → property photos/video carousel
  3. Action row (heart/comment/share left, bookmark right) → heart = shortlist (double-tap image also triggers, burst animation, must persist to DB), comment = open enquiry sheet, share = native share, bookmark = save
  4. "X likes" line → "X people shortlisted this" — only if real count > 0, never fake, omit if zero
  5. Caption line → price + config + locality (bold) + short description, "…more" truncation
  6. "View all X comments" → "View all X enquiries" — only if real
  7. Timestamp → "2 HOURS AGO" style, uppercase small gray
- Messages (paper-plane icon) → real Leads/Enquiries inbox
- Notifications (heart icon) → real notification bell, real unread badge count
- Right sidebar (desktop, exact Instagram layout: small profile card + "Suggested for you" list) → logged-in user mini card + "Recommended listings for you" (small thumbnail + title + subtitle + "View" button), based on real saved searches/location, never random

## Desktop spec (1366px / 1024px)

Header ~54px height, exact Instagram desktop header proportions: brand wordmark + city pill left, search pill center (placeholder "Search city, locality, project…"), icon row right in Instagram's exact order (Home, Explore, Reels, Messages, Notifications, Avatar) mapped as above.

Center column = feed as specified. Right sidebar sticky, as specified.

## Mobile spec (390 / 360 / 320 / 430px)

Top header: wordmark + city pill left (must not wrap), heart(notifications) + paper-plane(messages) icons right — exact Instagram mobile header layout.

Stories bar: same circle size/spacing (~56-60px) as desktop spec.

Feed: identical card anatomy, full device width, same vertical rhythm as Instagram mobile.

Bottom tab bar: exact Instagram bottom-nav visual style (5 icons, center one raised/distinct) but **order is locked per project spec, do not use Instagram's order**: Home · Search · Post (raised center FAB, role-aware: Owner/Broker → property, Builder → project only) · Leads · Profile.

## Required states (all screens)

Loading skeleton feed, empty feed (actionable CTA to adjust filters), error (safe message, no raw errors), unauthenticated (guest sees public feed; shortlist/enquire/comment taps redirect to login and return to same listing after). Contact number stays hidden/blurred until login per platform rule.

## Interaction safety

Images `draggable=false`, double-tap zone isolated from single-tap navigation, bottom sheets lock background scroll, every icon (heart/comment/share/bookmark/bell/paper-plane) wired to a real action — no dead icons; if a feature isn't ready, show it disabled with a visible honest reason instead of faking it.

## Verification widths

Desktop: 1366, 1024. Mobile: 430, 390, 360, 320. No horizontal scroll, no overlap, brand name never wraps, stories rail never clips, bottom nav never covers content.

## Hard constraints

No Instagram logo/wordmark/trademark/brand assets. No fake counts/likes/stats — real data or omitted. This is an original real-estate product borrowing Instagram's layout patterns only.
