import "server-only";

import { getServerEnv } from "@/config/env";
import { devMockOtp } from "@/server/adapters/dev-otp";
import {
  notConfiguredEmail,
  notConfiguredMedia,
  notConfiguredOtp,
  notConfiguredPayment,
} from "@/server/adapters/not-configured";
import type {
  EmailProviderPort,
  MediaStoragePort,
  OtpProviderPort,
  PaymentProviderPort,
} from "@/server/ports";

// ============================================================
// Composition root (Phase 3).
// The single controlled place where environment is validated and
// provider adapters are selected. Feature code depends on ports,
// never on process.env or concrete SDKs.
// Real adapters (SMS OTP, Email, Razorpay port, media) are wired
// in their owning phases (P05/P08/P11/P06).
// ============================================================

export interface ServerContainer {
  otp: OtpProviderPort;
  email: EmailProviderPort;
  payment: PaymentProviderPort;
  media: MediaStoragePort;
}

export function createServerContainer(
  source: NodeJS.ProcessEnv = process.env
): ServerContainer {
  const env = getServerEnv(source);

  const otp: OtpProviderPort =
    env.OTP_PROVIDER === "dev_mock" && env.NODE_ENV !== "production"
      ? devMockOtp()
      : notConfiguredOtp(); // real SMS adapter lands in P05

  return {
    otp,
    email: notConfiguredEmail(), // real adapter lands in P08 foundation
    payment: notConfiguredPayment(), // Razorpay port extraction lands in P11
    media: notConfiguredMedia(), // storage decision (DEC-013) lands in P06
  };
}
