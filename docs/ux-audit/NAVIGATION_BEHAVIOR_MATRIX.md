# Navigation Behavior Matrix

Populated per-screen as each batch audits it. Only screens actually verified in a browser are filled in below; everything else remains in [COMPLETE_SCREEN_REGISTRY.md](COMPLETE_SCREEN_REGISTRY.md) at `DISCOVERED` until its batch runs.

| Screen | Entry points | Presentation | Global nav visible | Contextual header | Primary action | Back | Close | Cancel | Success dest. | Mobile behavior | State preserved |
|---|---|---|---|---|---|---|---|---|---|---|---|
| OWN-01 `/dashboard/owner` | Login redirect, sidebar "Home", bottom-nav "Home" | dashboard-home | Yes (DashboardShellV2 sidebar + bottom nav) | "Overview" breadcrumb, greeting | Post Property | N/A (root of dashboard) | N/A | N/A | N/A | Bottom-nav 5-slot, stat cards stack, table→cards | N/A (landing page) |
| BRK-01 `/dashboard/broker` | Login redirect, sidebar "Home" | dashboard-home | Yes | "Overview" breadcrumb, greeting | Post Property | N/A | N/A | N/A | N/A | Same pattern as OWN-01 | N/A |
| BLD-01 `/dashboard/builder` | Login redirect, sidebar "Home" | dashboard-home | Yes | "Overview" breadcrumb, greeting | Post Project | N/A | N/A | N/A | N/A | Same pattern as OWN-01 | N/A |

All three verified live via mobile-OTP test-account login this session (2026-07-14) — screenshots taken, console clean, Action Cards + Account Status confirmed intact below the fold.
