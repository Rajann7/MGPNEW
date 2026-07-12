// ============================================================
// Canonical host model (Phase 4 / Files 09 & 21).
//   HOST-PUBLIC   <root-domain>          public + Owner (/owner) + customer /account/*
//   HOST-BROKER   broker.<root-domain>   Broker principal + Broker Agent workspace
//   HOST-BUILDER  builder.<root-domain>  Builder workspace
//   HOST-INTERNAL account.<root-domain>  Admin/Staff/Super Admin operations
// Customer self-service /account/* lives on HOST-PUBLIC and is distinct
// from the internal account.<root-domain> host (MGP-IA rule).
// No dynamic tenant subdomains (MGP-IA-017).
// ============================================================

export type HostContext = "public" | "broker" | "builder" | "internal";

const HOST_SUBDOMAINS: Record<string, HostContext> = {
  broker: "broker",
  builder: "builder",
  account: "internal",
};

/** Strips port; lowercases. */
function normalizeHostname(host: string): string {
  return host.toLowerCase().split(":")[0];
}

/**
 * Resolves the host context from a Host header value.
 * Works for production (<sub>.<root-domain>) and local dev
 * (broker.localhost, builder.localhost, account.localhost, 127.0.0.1).
 * Unknown subdomains resolve to "public" (root canonical behavior).
 */
export function getHostContext(host: string | null | undefined): HostContext {
  if (!host) return "public";
  const hostname = normalizeHostname(host);
  const firstLabel = hostname.split(".")[0];
  if (hostname !== firstLabel && firstLabel in HOST_SUBDOMAINS) {
    return HOST_SUBDOMAINS[firstLabel];
  }
  return "public";
}

/** Path prefixes that are ONLY valid on a given host context. */
export const HOST_OWNED_PATHS: Record<HostContext, string[]> = {
  public: [], // public host serves everything not owned by another host
  broker: ["/dashboard/broker"],
  builder: ["/dashboard/builder"],
  internal: ["/admin"],
};

/**
 * Where a request on the wrong host should go (Phase 4 rule 7:
 * safe wrong-host redirection, never a dead end).
 * Returns null when the path is fine on the given host.
 */
export function wrongHostRedirect(
  context: HostContext,
  pathname: string
): { targetContext: HostContext } | null {
  for (const [ctx, prefixes] of Object.entries(HOST_OWNED_PATHS) as [
    HostContext,
    string[],
  ][]) {
    for (const prefix of prefixes) {
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        return ctx === context ? null : { targetContext: ctx };
      }
    }
  }
  return null;
}

/**
 * Builds the equivalent URL on the target host context, preserving path
 * and query. Root domain is derived from the current hostname.
 */
export function buildHostUrl(
  currentHost: string,
  targetContext: HostContext,
  pathAndQuery: string
): string {
  const hostname = normalizeHostname(currentHost);
  const port = currentHost.includes(":") ? `:${currentHost.split(":")[1]}` : "";
  const labels = hostname.split(".");
  const rootDomain =
    labels.length > 1 && labels[0] in HOST_SUBDOMAINS
      ? labels.slice(1).join(".")
      : hostname;
  const sub =
    targetContext === "public"
      ? ""
      : targetContext === "internal"
        ? "account."
        : `${targetContext}.`;
  const protocol = rootDomain === "localhost" ? "http" : "https";
  return `${protocol}://${sub}${rootDomain}${port}${pathAndQuery}`;
}
