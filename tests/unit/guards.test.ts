import { describe, expect, it } from "vitest";

import {
  assertDebugRoutesAllowed,
  assertMockOtpAllowed,
  assertMockProviderAllowed,
  assertNotProduction,
  isProduction,
} from "@/config/guards";

describe("production guards", () => {
  it("isProduction distinguishes environments", () => {
    expect(isProduction("production")).toBe(true);
    expect(isProduction("development")).toBe(false);
    expect(isProduction("test")).toBe(false);
    expect(isProduction(undefined)).toBe(false);
  });

  it("blocks seed/reset-style features in production", () => {
    expect(() => assertNotProduction("db:seed", "production")).toThrow(
      /PRODUCTION_GUARD/
    );
    expect(() => assertNotProduction("db:seed", "development")).not.toThrow();
  });

  it("blocks mock OTP in production even when configured", () => {
    expect(() => assertMockOtpAllowed("dev_mock", "production")).toThrow(
      /blocked in production/
    );
  });

  it("blocks mock OTP when provider is not dev_mock", () => {
    expect(() => assertMockOtpAllowed("real_sms", "development")).toThrow(
      /requires OTP_PROVIDER=dev_mock/
    );
    expect(() => assertMockOtpAllowed(undefined, "development")).toThrow();
  });

  it("allows mock OTP only in non-production with dev_mock", () => {
    expect(() => assertMockOtpAllowed("dev_mock", "development")).not.toThrow();
    expect(() => assertMockOtpAllowed("dev_mock", "test")).not.toThrow();
  });

  it("blocks mock provider success paths in production", () => {
    expect(() =>
      assertMockProviderAllowed("razorpay-mock", "production")
    ).toThrow(/PRODUCTION_GUARD/);
    expect(() =>
      assertMockProviderAllowed("razorpay-mock", "development")
    ).not.toThrow();
  });

  it("blocks debug routes in production", () => {
    expect(() => assertDebugRoutesAllowed("production")).toThrow(
      /PRODUCTION_GUARD/
    );
    expect(() => assertDebugRoutesAllowed("development")).not.toThrow();
  });
});
