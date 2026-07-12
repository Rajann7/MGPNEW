import "server-only";

// ============================================================
// Provider ports (Phase 3 skeletons).
// Server-only contracts; adapters are chosen exclusively by the
// composition root (src/server/index.ts). A missing provider is
// represented by a NotConfigured adapter that reports
// "setup_required" — it never fakes success.
// ============================================================

export type ProviderReadiness =
  | { status: "ready"; mode: "development" | "test" | "live" }
  | { status: "setup_required"; reason: string }
  | { status: "blocked"; reason: string };

export interface OtpProviderPort {
  readonly name: string;
  readiness(): ProviderReadiness;
  /** Sends an OTP; must never resolve successfully when not ready. */
  sendOtp(
    mobileE164: string,
    purpose: "login" | "register"
  ): Promise<{ sent: boolean }>;
}

export interface EmailProviderPort {
  readonly name: string;
  readiness(): ProviderReadiness;
  sendEmail(input: {
    toRedacted: string;
    template: string;
    data: Record<string, unknown>;
  }): Promise<{ queued: boolean }>;
}

export interface PaymentProviderPort {
  readonly name: string;
  readiness(): ProviderReadiness;
}

export interface MediaStoragePort {
  readonly name: string;
  readiness(): ProviderReadiness;
}
