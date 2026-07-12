import { describe, expect, it } from "vitest";

import {
  assertFeatureNotRemoved,
  assertNotificationChannelAllowed,
} from "@/config/removed-features";
import {
  isRegistrableRole,
  NON_REGISTRABLE_ACTORS,
  PUBLIC_REGISTRATION_ROLES,
  resolveActor,
} from "@/modules/identity/actors";

describe("removed-feature runtime guards (Phase 4)", () => {
  it("blocks every removed feature identifier", () => {
    for (const f of [
      "maps",
      "geolocation",
      "whatsapp",
      "push",
      "non_otp_sms",
      "site_visit",
      "reveal_number",
      "builder_agent",
      "inquiry_type_selection",
    ]) {
      expect(() => assertFeatureNotRemoved(f)).toThrow(/REMOVED_FEATURE/);
    }
  });

  it("allows live features through", () => {
    expect(() => assertFeatureNotRemoved("direct_inquiry")).not.toThrow();
    expect(() => assertFeatureNotRemoved("email")).not.toThrow();
  });

  it("permits only in_app and email notification channels", () => {
    expect(() => assertNotificationChannelAllowed("in_app")).not.toThrow();
    expect(() => assertNotificationChannelAllowed("email")).not.toThrow();
    for (const ch of [
      "whatsapp",
      "push",
      "sms_marketing",
      "sms_utility",
      "pigeon",
    ]) {
      expect(() => assertNotificationChannelAllowed(ch)).toThrow(
        /REMOVED_FEATURE/
      );
    }
  });
});

describe("canonical actor model (Phase 4)", () => {
  const session = { userId: "u1" };
  const profile = (role: string) => ({
    id: "p1",
    public_role: role,
    account_status: "active",
  });

  it("public registration exposes exactly owner/broker/builder", () => {
    expect([...PUBLIC_REGISTRATION_ROLES]).toEqual([
      "owner",
      "broker",
      "builder",
    ]);
    expect(isRegistrableRole("owner")).toBe(true);
    for (const r of [
      "buyer",
      "tenant",
      "builder_agent",
      "agency",
      "admin",
      "broker_agent",
    ]) {
      expect(isRegistrableRole(r)).toBe(false);
    }
  });

  it("broker agent, staff, super admin and service are never registrable", () => {
    expect(NON_REGISTRABLE_ACTORS).toContain("broker_agent");
    expect(NON_REGISTRABLE_ACTORS).toContain("internal_staff");
    expect(NON_REGISTRABLE_ACTORS).toContain("super_admin");
    expect(NON_REGISTRABLE_ACTORS).toContain("service_principal");
  });

  it("resolves the base actor types", () => {
    expect(
      resolveActor({
        session: null,
        profile: null,
        staff: null,
        brokerMembership: null,
      }).type
    ).toBe("guest");
    expect(
      resolveActor({
        session,
        profile: null,
        staff: null,
        brokerMembership: null,
      }).type
    ).toBe("authenticated_account");
    expect(
      resolveActor({
        session,
        profile: profile("owner"),
        staff: null,
        brokerMembership: null,
      }).type
    ).toBe("owner_principal");
    expect(
      resolveActor({
        session,
        profile: profile("builder"),
        staff: null,
        brokerMembership: null,
      }).type
    ).toBe("builder_principal");
    expect(
      resolveActor({
        session,
        profile: profile("broker"),
        staff: null,
        brokerMembership: null,
      }).type
    ).toBe("broker_principal");
    expect(
      resolveActor({
        session,
        profile: profile("broker"),
        staff: { id: "s1", is_super_admin: false },
        brokerMembership: null,
      }).type
    ).toBe("internal_staff");
    expect(
      resolveActor({
        session,
        profile: null,
        staff: { id: "s1", is_super_admin: true },
        brokerMembership: null,
      }).type
    ).toBe("super_admin");
  });

  it("broker agent requires an active invitation-backed membership", () => {
    const actor = resolveActor({
      session,
      profile: profile("broker"),
      staff: null,
      brokerMembership: {
        workspace_broker_profile_id: "w1",
        status: "active",
        invitation_id: "inv1",
      },
    });
    expect(actor.type).toBe("broker_agent");
    expect(actor.viaInvitation).toBe(true);
    expect(actor.brokerWorkspaceId).toBe("w1");
  });

  it("quarantines membership without invitation instead of guessing", () => {
    expect(() =>
      resolveActor({
        session,
        profile: profile("broker"),
        staff: null,
        brokerMembership: {
          workspace_broker_profile_id: "w1",
          status: "active",
          invitation_id: null,
        },
      })
    ).toThrow(/LEGACY_QUARANTINE/);
  });

  it("quarantines legacy roles instead of converting them", () => {
    for (const legacy of [
      "buyer",
      "tenant",
      "builder_agent",
      "agency",
      "agency_group",
      "real_estate_group",
    ]) {
      expect(() =>
        resolveActor({
          session,
          profile: profile(legacy),
          staff: null,
          brokerMembership: null,
        })
      ).toThrow(/LEGACY_QUARANTINE/);
    }
  });

  it("quarantines unknown roles", () => {
    expect(() =>
      resolveActor({
        session,
        profile: profile("landlord_v2"),
        staff: null,
        brokerMembership: null,
      })
    ).toThrow(/LEGACY_QUARANTINE/);
  });
});
