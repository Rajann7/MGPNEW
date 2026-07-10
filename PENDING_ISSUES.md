# PENDING_ISSUES.md

Tracks known, honestly-scoped-out gaps from completed phases — not bugs left unfixed, but items that need a
follow-up session (usually because they need a clean test account, separate authorization, or a live click-through
that wasn't possible in the verifying session). Cross-reference `brain.md` for full context per entry.

---

## Batch 5 · Section S1 — Post Property Wizard (Owner/Broker) — [2026-07-10]

Source: Manual verification pass, `brain.md` "Batch 5 S1 — Manual Verification pass" entry. Overall result for
this section was **PASS**; the items below are the honestly-scoped-out remainder, not failures.

1. **LIMIT_EXCEEDED UI not verified end-to-end live.**
   The posting-limit gate (`checkPostingGate` in `src/lib/billing/gates.ts`) was fixed this pass to use a real
   live count of active listings instead of a driftable usage counter (verified correct via direct DB query).
   But the test Owner account (mobile `9000000011`) has a pre-existing active trial subscription (limit 20)
   from earlier Prompt 09 billing testing that overrides the free plan (limit 2), so the actual "you've hit your
   plan limit" UI could not be triggered without mutating live billing/subscription data — which was correctly
   blocked by the session's safety guard and not forced without further authorization.
   **Next step:** either use a test account with no active subscription, or get explicit authorization to
   temporarily expire/adjust the test owner's trial subscription, then re-run the Submit flow expecting
   `LIMIT_EXCEEDED` and confirm the honest "used X of Y on <Plan>" message + Upgrade link render correctly.

2. **EditReapprovalGate's "Edit anyway" click-through not live-tested.**
   `src/components/forms/wizard/EditReapprovalGate.tsx` (Cancel / "Edit anyway" confirmation before editing a
   published/paused/rejected listing) was code-reviewed and wired into all 4 property edit pages, but the actual
   click-through (confirm → form renders → save → re-submission goes back to Pending) was not exercised live.
   **Next step:** as owner, edit a `published` listing, confirm the interstitial appears, click "Edit anyway",
   change a field, save/submit, and confirm the listing's `visibility_status` flips back to `private` /
   `approval_status` to `pending`.

3. **Live upload-failure → Retry click-through not reproduced.**
   `MediaUploadStep.tsx`'s per-file failed state + Retry button was verified via code review and passes
   lint/typecheck, but an actual failed upload (e.g. a real network error or a server-side rejection) was not
   reproduced live in the browser this pass — only the client-side oversized-file rejection message was
   confirmed by inspection, not by a live oversized-file drop.
   **Next step:** simulate a real upload failure (e.g. temporarily break the Storage bucket policy, or throttle
   network in devtools) and confirm the failed-state UI + Retry button + successful retry all work end-to-end.

4. **Broker Property Wizard not separately walked through end-to-end.**
   The Broker wizard shares the exact same `PropertyForm` component/code path as the Owner wizard, and was
   exercised as part of the cross-role/cross-user security tests (confirming role gates and ownership checks),
   but a full 9-step create→submit walkthrough as the Broker test account (mobile `9000000012`) specifically
   was not separately screenshotted/clicked through.
   **Next step:** repeat the Section S1 happy-path walkthrough logged in as Broker, confirming identical
   behavior to the Owner pass.

5. **1280px viewport not separately screenshotted.**
   Responsive verification covered 390px, 768px, 1024px, and 1366px. 1280px sits between two already-confirmed
   breakpoints (1024 and 1366) with no Tailwind breakpoint change in that range, so risk is low, but it was not
   explicitly captured.
   **Next step:** quick screenshot pass at 1280px to close out the full mandated breakpoint list.

6. **Dev/test data left in the database.**
   Several test properties (`LIMITTEST…`, `MANUALVERIFY…`, `QA Verify…`) remain under the test Owner account in
   draft/submitted status from this verification session. Harmless dev artifacts (not production data), safe to
   delete via the normal My Properties → Delete action whenever convenient.
