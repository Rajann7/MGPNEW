# Batch 2 — Auth Flows (OTP Popup, Role Selection, Admin/Staff Login)

Paste everything below into the AI design tool.

---

ROLE: You are the same senior product designer continuing the "My Gujarat Property" design system project. This is Batch 2 of 17 — Auth Flows.

MANDATORY CONSISTENCY — reuse the EXACT design system, tokens, and shell patterns already established in Batch 1 (Design System + Shared UI Patterns). Do not invent new colors, radii, shadows, fonts, icon styles, or navigation shells. Specifically re-apply, without exception, on every screen you generate in this batch:
- The same brand teal accent, zinc neutrals, Inter font, 16px card / 10px control radius, soft shadows.
- Public header (3-zone desktop + hamburger mobile) on every public page.
- App-like contextual header WITH BACK BUTTON on every mobile inner/detail/dashboard page — no exceptions.
- Dashboard shell (sidebar desktop / bottom-nav+drawer mobile) on every dashboard screen, same 5-item bottom nav order (Home, Search, Post, Leads, Profile) for Owner/Broker/Builder.
- Admin shell (graphite sidebar, no bottom nav, drawer on mobile) on every admin/staff screen.
- Every list/table screen must show its loading (skeleton), empty (actionable, non-dead-end), and error states — not just happy path.
- Every destructive action has a confirmation dialog; every modal has a desktop + mobile bottom-sheet version.
- No fake data, no fake counts, no dead buttons, no "#" links, no fake badges/verified/payment success.
- Mobile-first: design at 390px first, then 768px, then 1280px+, no horizontal scroll, sticky bars never cover content.

OUTPUT FORMAT: Single responsive HTML file, Tailwind via CDN, semantic commented HTML, real-sounding sample content, clearly labeled sections with in-page anchor nav. Show desktop then mobile for each screen.

## SCREENS TO DESIGN (each in OPEN/active state, desktop centered-modal + mobile bottom-sheet variants unless noted)

1. Mobile number entry step — phone input with +91 flag prefix, "Continue" button, terms/privacy consent checkbox line.
2. Checking mobile — loading state (spinner + "Checking...").
3. Existing user — OTP login step — 6-box OTP input, masked number shown ("OTP sent to +91 9XXXX XX210"), auto-focus first box.
4. OTP sent / resend cooldown state — "Resend OTP in 0:28" countdown, disabled resend link.
5. Wrong OTP / expired OTP error state — red error banner above OTP boxes, boxes get red border, "Try again" state.
6. Rate-limited state — "Too many attempts. Try again in 15 minutes." full-stop state, no bypass shown.
7. Unregistered mobile → register prompt — "This number isn't registered. Create an account?" with CTA.
8. Role selector step — 3 large tappable cards: Owner / Broker-Agent / Builder-Developer, each with icon, 1-line description of what they can do, radio-style selection.
9. Registration form — name, email (optional), mobile (prefilled), role (from step 8), Terms+Privacy checkbox (mandatory, linked).
10. OTP verify step (registration) — same OTP pattern as #3.
11. Provider setup-required / OTP unavailable state — neutral banner: "SMS OTP temporarily unavailable, try again shortly" (never fake-success).
12. Suspended/banned account state — full-stop screen explaining account status + support contact link, no bypass.
13. Success / redirecting state — checkmark animation placeholder + "Redirecting to your dashboard..." with skeleton preview behind.
14. Admin/Staff login page (full page, NOT popup, desktop+mobile) — email + password fields, Google login button, small "Staff Portal" branding distinct from public brand styling (noindex annotation), NO mobile-OTP option, NO public register link.
15. Admin/Staff login — error/rate-limited state — invalid credentials banner + lockout state after N attempts.
16. Staff invite acceptance page — token-based, shows invited email (read-only), set-password form, role/permissions preview (read-only summary of what they'll be able to access), accept/decline buttons.

Annotate on the artboard: post-login redirect intent rule — "Login via header button → home/dashboard. Login triggered by inquiry/save/search action → returns to that exact action." Show one small diagram illustrating this.
