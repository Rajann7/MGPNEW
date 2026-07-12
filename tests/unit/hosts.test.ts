import { describe, expect, it } from "vitest";

import {
  buildHostUrl,
  getHostContext,
  wrongHostRedirect,
} from "@/config/hosts";

describe("canonical host model (Phase 4)", () => {
  it("resolves host contexts from hostnames", () => {
    expect(getHostContext("mygujaratproperty.com")).toBe("public");
    expect(getHostContext("www.mygujaratproperty.com")).toBe("public");
    expect(getHostContext("broker.mygujaratproperty.com")).toBe("broker");
    expect(getHostContext("builder.mygujaratproperty.com")).toBe("builder");
    expect(getHostContext("account.mygujaratproperty.com")).toBe("internal");
    expect(getHostContext("localhost:3000")).toBe("public");
    expect(getHostContext("broker.localhost:3000")).toBe("broker");
    expect(getHostContext("account.localhost:3000")).toBe("internal");
    expect(getHostContext(null)).toBe("public");
  });

  it("does not create dynamic tenant subdomains (MGP-IA-017)", () => {
    expect(getHostContext("someagency.mygujaratproperty.com")).toBe("public");
  });

  it("customer /account/* stays on the public host (distinct from account.<domain>)", () => {
    // /account paths are NOT owned by the internal host — no redirect.
    expect(wrongHostRedirect("public", "/account/profile")).toBeNull();
    expect(wrongHostRedirect("public", "/account")).toBeNull();
  });

  it("redirects host-owned paths from the wrong host", () => {
    expect(wrongHostRedirect("public", "/admin/users")).toEqual({
      targetContext: "internal",
    });
    expect(wrongHostRedirect("public", "/dashboard/broker/leads")).toEqual({
      targetContext: "broker",
    });
    expect(wrongHostRedirect("broker", "/dashboard/builder")).toEqual({
      targetContext: "builder",
    });
    expect(wrongHostRedirect("internal", "/admin")).toBeNull();
    expect(wrongHostRedirect("broker", "/dashboard/broker/leads")).toBeNull();
  });

  it("builds equivalent URLs on the target host", () => {
    expect(
      buildHostUrl("mygujaratproperty.com", "internal", "/admin/users?x=1")
    ).toBe("https://account.mygujaratproperty.com/admin/users?x=1");
    expect(
      buildHostUrl("broker.mygujaratproperty.com", "public", "/search")
    ).toBe("https://mygujaratproperty.com/search");
    expect(buildHostUrl("localhost:3000", "broker", "/dashboard/broker")).toBe(
      "http://broker.localhost:3000/dashboard/broker"
    );
  });
});
