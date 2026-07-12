import { describe, expect, it } from "vitest";

import { getClientEnv, getServerEnv, isProviderConfigured } from "@/config/env";

const validBase = {
  NODE_ENV: "test",
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
} as unknown as NodeJS.ProcessEnv;

describe("centralized env validation", () => {
  it("accepts a minimal valid server environment", () => {
    const env = getServerEnv(validBase);
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
    expect(env.NODE_ENV).toBe("test");
  });

  it("fails fast with a readable message when required vars are missing", () => {
    expect(() => getServerEnv({} as NodeJS.ProcessEnv)).toThrow(
      /Invalid server environment: .*NEXT_PUBLIC_SUPABASE_URL/
    );
  });

  it("rejects malformed values", () => {
    expect(() =>
      getServerEnv({
        ...validBase,
        NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
      } as NodeJS.ProcessEnv)
    ).toThrow(/NEXT_PUBLIC_SUPABASE_URL/);
    expect(() =>
      getServerEnv({
        ...validBase,
        RAZORPAY_MODE: "sandbox",
      } as NodeJS.ProcessEnv)
    ).toThrow(/RAZORPAY_MODE/);
  });

  it("treats providers as optional (Setup Required, not failure)", () => {
    const env = getServerEnv(validBase);
    expect(env.EMAIL_PROVIDER).toBeUndefined();
    expect(isProviderConfigured("EMAIL_PROVIDER", validBase)).toBe(false);
    expect(
      isProviderConfigured("EMAIL_PROVIDER", {
        ...validBase,
        EMAIL_PROVIDER: "resend",
      } as NodeJS.ProcessEnv)
    ).toBe(true);
  });

  it("validates client env separately", () => {
    expect(() => getClientEnv(validBase)).not.toThrow();
    expect(() => getClientEnv({} as NodeJS.ProcessEnv)).toThrow(
      /Invalid client environment/
    );
  });
});
