// ============================================================
// Hard production guards (Phase 3 foundation).
// Every development-only capability MUST pass through one of
// these guards so it cannot reach production silently:
//   - dev/mock OTP            → assertMockOtpAllowed()
//   - mock payment/provider   → assertMockProviderAllowed()
//   - seed/reset scripts      → assertNotProduction()
//   - debug routes            → assertDebugRoutesAllowed()
// ============================================================

export function isProduction(
  env: string | undefined = process.env.NODE_ENV
): boolean {
  return env === "production";
}

/** Generic guard for seed/reset/dev-only commands. */
export function assertNotProduction(
  feature: string,
  env: string | undefined = process.env.NODE_ENV
): void {
  if (isProduction(env)) {
    throw new Error(
      `[PRODUCTION_GUARD] "${feature}" is development-only and is blocked in production.`
    );
  }
}

/**
 * Dev/mock OTP may run only when BOTH conditions hold:
 * NODE_ENV !== production AND OTP_PROVIDER === "dev_mock".
 * In production with dev_mock configured, fail loudly (misconfiguration).
 */
export function assertMockOtpAllowed(
  otpProvider: string | undefined = process.env.OTP_PROVIDER,
  env: string | undefined = process.env.NODE_ENV
): void {
  if (isProduction(env)) {
    throw new Error(
      "[PRODUCTION_GUARD] Development mock OTP is blocked in production. Configure a real OTP provider."
    );
  }
  if (otpProvider !== "dev_mock") {
    throw new Error(
      `[PRODUCTION_GUARD] Mock OTP requires OTP_PROVIDER=dev_mock (got "${otpProvider ?? "unset"}").`
    );
  }
}

/** Mock/test provider success paths (payments etc.) are blocked in production. */
export function assertMockProviderAllowed(
  providerName: string,
  env: string | undefined = process.env.NODE_ENV
): void {
  if (isProduction(env)) {
    throw new Error(
      `[PRODUCTION_GUARD] Mock/test provider "${providerName}" success paths are blocked in production.`
    );
  }
}

/** Debug/diagnostic routes must call this in their handler. */
export function assertDebugRoutesAllowed(
  env: string | undefined = process.env.NODE_ENV
): void {
  assertNotProduction("debug route", env);
}
