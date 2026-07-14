# User Journey Matrix

End-to-end journeys, populated as batches cover the routes they touch. Empty until Batch 1+ runs journey-level (not just screen-level) verification.

## Verified this session (Phase 0, incidental to dashboard-home fix)

| Journey | Role | Steps | Result |
|---|---|---|---|
| Mobile-OTP login → dashboard home | Broker | `/login` → enter mobile → OTP `123456` → redirect | PASS — landed on `/dashboard/broker`, real session cookie |
| Mobile-OTP login → dashboard home | Builder | `/login` → enter mobile → OTP `123456` → redirect | PASS — landed on `/dashboard/builder`, real session cookie |

No other journeys audited yet. See [IMPLEMENTATION_PROGRESS.md](IMPLEMENTATION_PROGRESS.md) for batch plan.
