import "server-only";

import type {
  EmailProviderPort,
  OtpProviderPort,
  PaymentProviderPort,
  MediaStoragePort,
  ProviderReadiness,
} from "@/server/ports";

// A missing provider is honest: it reports setup_required and throws on use.

function setupRequired(name: string): ProviderReadiness {
  return {
    status: "setup_required",
    reason: `${name} is not configured. Set the provider environment variables.`,
  };
}

function refuse(name: string): never {
  throw new Error(
    `[SETUP_REQUIRED] ${name} is not configured; refusing to pretend the operation succeeded.`
  );
}

export function notConfiguredOtp(): OtpProviderPort {
  return {
    name: "otp:not-configured",
    readiness: () => setupRequired("OTP provider"),
    sendOtp: async () => refuse("OTP provider"),
  };
}

export function notConfiguredEmail(): EmailProviderPort {
  return {
    name: "email:not-configured",
    readiness: () => setupRequired("Email provider"),
    sendEmail: async () => refuse("Email provider"),
  };
}

export function notConfiguredPayment(): PaymentProviderPort {
  return {
    name: "payment:not-configured",
    readiness: () => setupRequired("Payment provider"),
  };
}

export function notConfiguredMedia(): MediaStoragePort {
  return {
    name: "media:not-configured",
    readiness: () => setupRequired("Media storage"),
  };
}
