import "server-only";

import { assertMockOtpAllowed } from "@/config/guards";
import type { OtpProviderPort, ProviderReadiness } from "@/server/ports";

/**
 * Development-only mock OTP adapter. Guarded twice:
 * readiness() reports blocked in production, and sendOtp() throws via
 * assertMockOtpAllowed(). The actual OTP flow migrates to this port in P05;
 * until then src/lib/auth/actions.ts keeps its own equivalent guard.
 */
export function devMockOtp(): OtpProviderPort {
  return {
    name: "otp:dev-mock",
    readiness(): ProviderReadiness {
      if (process.env.NODE_ENV === "production") {
        return {
          status: "blocked",
          reason: "Development mock OTP is blocked in production.",
        };
      }
      return { status: "ready", mode: "development" };
    },
    async sendOtp() {
      assertMockOtpAllowed();
      return { sent: true };
    },
  };
}
