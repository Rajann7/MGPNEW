import { describe, expect, it } from "vitest";

import { createServerContainer } from "@/server/index";
import { ACTORS, NEGATIVE_ACCESS_CASES, WORKSPACES } from "../fixtures/actors";

const baseEnv = {
  NODE_ENV: "test",
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
} as unknown as NodeJS.ProcessEnv;

describe("composition root", () => {
  it("resolves honest not-configured adapters when providers are absent", () => {
    const c = createServerContainer(baseEnv);
    expect(c.email.readiness().status).toBe("setup_required");
    expect(c.payment.readiness().status).toBe("setup_required");
    expect(c.media.readiness().status).toBe("setup_required");
    expect(c.otp.readiness().status).toBe("setup_required");
  });

  it("never fakes provider success: not-configured OTP refuses to send", async () => {
    const c = createServerContainer(baseEnv);
    await expect(c.otp.sendOtp("+915550000001", "login")).rejects.toThrow(
      /SETUP_REQUIRED/
    );
  });

  it("selects dev mock OTP only outside production", () => {
    const dev = createServerContainer({
      ...baseEnv,
      OTP_PROVIDER: "dev_mock",
    } as NodeJS.ProcessEnv);
    expect(dev.otp.name).toBe("otp:dev-mock");

    const prod = createServerContainer({
      ...baseEnv,
      NODE_ENV: "production",
      OTP_PROVIDER: "dev_mock",
    } as NodeJS.ProcessEnv);
    expect(prod.otp.name).toBe("otp:not-configured");
  });
});

describe("synthetic fixtures", () => {
  it("provides all three public roles plus staff and guest", () => {
    const roles = new Set(
      Object.values(ACTORS)
        .map((a) => a.publicRole)
        .filter(Boolean)
    );
    expect(roles).toEqual(new Set(["owner", "broker", "builder"]));
    expect(ACTORS.staff_admin.isStaff).toBe(true);
    expect(ACTORS.guest.publicRole).toBeNull();
  });

  it("uses only synthetic identities (no real-looking data)", () => {
    for (const a of Object.values(ACTORS)) {
      if (a.mobile) expect(a.mobile).toMatch(/^\+91555/);
      if (a.email) expect(a.email).toMatch(/@test\.mgp\.invalid$/);
    }
  });

  it("defines cross-ownership negative cases for File 40 tests", () => {
    expect(NEGATIVE_ACCESS_CASES.length).toBeGreaterThanOrEqual(4);
    for (const c of NEGATIVE_ACCESS_CASES) {
      expect(WORKSPACES[c.targetWorkspace] ?? c.targetWorkspace).toBeTruthy();
      expect(c.expect).toBe("denied");
    }
  });
});
