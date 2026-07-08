# Batch 2 — Auth Flows

Source: batch_2_Auth_Flows_Standalone_.txt (TEMPLATE static-HTML canvas; JS resources = lucide bundle + dc-runtime only).

## Screens/components present in design (full inventory)

Anchor nav: Phone > OTP · Error/Limit States · Register + Roles · Terminal States · Staff Portal · Redirect Rule

Screens 1-4 — Phone entry to OTP login (annotated: auth is an OVERLAY on the page the user was on — desktop centered modal, mobile bottom sheet, same component two containers)
1. Mobile number entry — desktop modal + mobile bottom sheet: IN flag +91 prefix, 10-digit input, Terms of Use + Privacy Policy consent checkbox, Continue button; annotation: Continue stays disabled until consent ticked AND 10 digits entered
2. Checking state — "Checking…" with field locked during number lookup
3. Existing user OTP login (desktop modal) — "Welcome back", masked "OTP sent to +91 9XXXX XX210" with Change link, 6-box OTP (first box auto-focused, auto-advance, AUTO-SUBMIT on 6th digit), Verify & login, Resend OTP link
4. Resend cooldown (mobile sheet) — "OTP sent" toast chip, "Resend OTP in 0:28 · link disabled during cooldown"

Screens 5-7, 11 — Error / rate-limit / unavailable ("honest full-stop states — no bypasses, no fake success")
5. Wrong/expired OTP — error banner "Incorrect or expired OTP. 2 attempts left." + Try again state
6. Rate-limited full stop — "Too many attempts… paused. Try again in 15 minutes." + "Back to browsing" CTA; annotated no bypass/no alternate path
7. Unregistered number — "This number isn't registered… Create a free account to continue?" + Create account + "Use a different number"
11. OTP provider unavailable — neutral banner "SMS OTP temporarily unavailable… try again in a few minutes" + Try again (never fake-success)

Screens 8-10 — Role selection & registration
8. Role selector desktop modal — "Who are you? This decides your dashboard and what you can post." 3 cards: Owner (sell/rent own property, manage enquiries), Broker/Agent (multiple client properties, leads at scale), Builder/Developer (post RERA projects, inventory, possession plans); dynamic CTA "Continue as Owner"
9. Registration form mobile sheet — "Registering as Owner" chip with Change link, Full name*, Email (optional, helper: used for receipts and account recovery), mobile prefilled+locked from previous step, mandatory Terms+Privacy checkbox, "Send OTP to verify"
10. OTP verify (registration) — "Verify your number / Last step — OTP sent to +91 9XXXX XX345", "Verify & create account", same pattern as screen 3

Screens 12-13 — Terminal states
12. Suspended account (mobile 390px full stop) — "Account suspended… on 28 June 2026 for a listing-policy violation. Your listings are hidden while suspended." + Contact support + Read listing policy; annotated no bypass or re-login loop
13. Success — "You're in, Rajesh / Redirecting to your dashboard…" with dashboard skeleton behind

Post-login redirect intent rule — annotated + small INTENT FLOW diagram: Header Login -> OTP -> Home/Dashboard; Tap "Enquire Now" -> OTP -> Enquiry sent (same page)

Screens 14-16 — Admin/Staff portal (full pages, graphite branding, email+password only, noindex, no OTP, no public register)
14. Staff login desktop full page — "MGP Staff Portal", meta robots noindex/nofollow annotation, Work email + Password, Forgot password?, Sign in, "or" divider + Continue with Google, note "No public registration. Access is invite-only."; separate mobile 390px variant shown
15. Invalid credentials + lockout — "Invalid email or password. 2 attempts remaining before a 30-minute lockout." AND locked state "Account locked. Too many failed attempts. Locked until 14:45 IST. Your admin was notified." + Contact your admin
16. Staff invite acceptance — token-based: "Priya Nair (Super Admin) invited you to join as Verification Manager", invited email read-only, set password (policy: min 12 chars, 1 number, 1 symbol), read-only permissions preview ("YOU'LL HAVE ACCESS TO": Verification queue review/approve, Listings read/flag, Billing/Ads/System no access), Decline + Accept invite & join, footer "Invite token expires in 6 days · single use"

## ADD-ON features in the design NOT in the prompt (deltas)
1. Auto-submit on 6th OTP digit (prompt only asked auto-focus first box). Screen 3.
2. "Change" number link next to the masked OTP destination. Screen 3.
3. Attempt counters everywhere: "2 attempts left" on wrong OTP (screen 5) and "2 attempts remaining before a 30-minute lockout" on staff login (screen 15) — prompt asked for error states but not explicit remaining-attempt counts.
4. "Back to browsing" recovery CTA on the rate-limited full stop (screen 6).
5. "Use a different number" secondary action on the unregistered-number prompt (screen 7).
6. Role chip with Change link on the registration form ("Registering as Owner · Change") allowing role re-selection without restarting. Screen 9.
7. Email helper copy "Used for receipts and account recovery" (screen 9).
8. Suspension detail pattern: suspension date + reason category (listing-policy violation) + consequence ("your listings are hidden") + "Read listing policy" secondary CTA. Screen 12 — prompt asked only for status + support link.
9. Personalized success ("You're in, Rajesh"). Screen 13.
10. Staff lockout operational details: lockout until an exact time (14:45 IST), "Your admin was notified", "Contact your admin" CTA. Screen 15.
11. Invite metadata: inviter name + inviter role (Priya Nair, Super Admin), password complexity policy line, invite expiry ("expires in 6 days · single use"). Screen 16 — richer than prompt asked.
12. Consent-gated Continue rule annotation (disabled until checkbox + 10 digits). Screen 1.
13. "OTP sent" confirmation chip/toast inside the resend-cooldown sheet. Screen 4.

## Items in the prompt MISSING from the design
- None of the 16 screens are missing. Minor: screen 13 "checkmark animation placeholder" and screen 8 role-card icons are visual details not verifiable from text extraction; screen 5's red-border-on-boxes styling likewise CSS-level. No functional gaps found.

## Design tokens / notes
- Inherits Batch 1 tokens (footer note: "Tokens, shells and patterns inherited from Batch 1 without deviation")
- Staff portal: graphite branding "MGP Staff Portal", full page not popup, email+password + Google only, noindex
- Masked-number convention: +91 9XXXX XX210; OTP cooldown format 0:28; rate-limit window 15 min; staff lockout 30 min
