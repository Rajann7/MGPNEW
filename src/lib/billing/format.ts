/** Client-safe currency + billing display helpers (no server-only imports). */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

const CYCLE_LABEL: Record<string, string> = {
  monthly: "/month",
  quarterly: "/quarter",
  yearly: "/year",
  one_time: " one-time",
  trial: " trial",
  free: "",
};

export function billingCycleSuffix(cycle: string): string {
  return CYCLE_LABEL[cycle] ?? "";
}

export function featureKeyLabel(key: string): string {
  const map: Record<string, string> = {
    property_posts_limit: "Property posts",
    project_posts_limit: "Project posts",
    requirement_posts_limit: "Requirement posts",
    active_listing_limit: "Active listings",
    contact_unlock_limit: "Contact unlocks",
    agent_limit: "Agents",
  };
  return map[key] ?? key.replace(/_/g, " ");
}
