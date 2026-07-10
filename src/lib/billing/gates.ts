import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import {
  getActiveSubscription,
  isSubscriptionActive,
} from "@/lib/billing/subscription";
import { financialYear } from "@/lib/billing/gst";
import type { GateResult, Plan } from "@/types";

/**
 * Posting / feature gates.
 *
 * Enforcement is controlled by the BILLING_GATES_ENFORCED env flag. This is
 * NOT a fake pass: when the flag is OFF the gate returns
 * { allowed: true, reason: "gates_not_enforced" } — an honest, documented
 * soft-launch state (see brain.md / FEATURE_REGISTRY.md). When ON, the gate
 * uses the user's REAL active plan limits and REAL usage counts. Free plans
 * are real DB rows, so a user with no paid plan is still evaluated against
 * their role's free-plan limits (fallback lookup below).
 */

export function gatesEnforced(): boolean {
  return process.env.BILLING_GATES_ENFORCED === "true";
}

/** Resolve the plan that currently governs a profile: active sub's plan, else the role free plan. */
async function resolveGoverningPlan(
  profileId: string,
  role: string
): Promise<Plan | null> {
  const admin = createServiceClient();
  const sub = await getActiveSubscription(profileId, role);
  if (isSubscriptionActive(sub) && sub?.plan_id) {
    const { data } = await admin
      .from("plans")
      .select("*")
      .eq("id", sub.plan_id)
      .maybeSingle();
    if (data) return data as Plan;
  }
  // Fallback: the role's free plan (real row).
  const { data: free } = await admin
    .from("plans")
    .select("*")
    .eq("role", role)
    .eq("billing_cycle", "free")
    .eq("is_active", true)
    .maybeSingle();
  return (free as Plan) ?? null;
}

const FEATURE_BY_TARGET: Record<string, string> = {
  property: "property_posts_limit",
  project: "project_posts_limit",
  requirement: "requirement_posts_limit",
};

/** Table + owner-column for each posting target's live-state count. */
const ENTITY_TABLE_BY_TARGET: Record<
  "property" | "project" | "requirement",
  { table: string; ownerColumn: string }
> = {
  property: { table: "properties", ownerColumn: "owner_profile_id" },
  project: { table: "projects", ownerColumn: "builder_profile_id" },
  requirement: { table: "requirements", ownerColumn: "created_by_profile_id" },
};

/**
 * Real live count of the profile's currently-active postings (not deleted,
 * not rejected/expired) for this target. Posting limits are a live-state
 * meter (like active listings), not a lifetime event count — a mutable
 * `usage_counters` ledger can drift from reality (e.g. listings created
 * before gates were enabled, or via any path that didn't increment it),
 * silently letting a user exceed their real limit. CLAUDE.md §"Do not use a
 * generic counter if the feature is active listings... another live-state
 * meter" — this counts the actual rows instead.
 */
async function getActiveEntityCount(
  profileId: string,
  target: "property" | "project" | "requirement"
): Promise<number> {
  const { table, ownerColumn } = ENTITY_TABLE_BY_TARGET[target];
  const admin = createServiceClient();
  const { count } = await admin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq(ownerColumn, profileId)
    .is("deleted_at", null)
    .not("status", "in", "(rejected,expired)");
  return count ?? 0;
}

/**
 * Gate a posting action (property/project/requirement submit).
 * Returns a GateResult; caller denies only when allowed === false.
 */
export async function checkPostingGate(
  profileId: string,
  role: string,
  target: "property" | "project" | "requirement"
): Promise<GateResult> {
  if (!gatesEnforced()) {
    return { allowed: true, reason: "gates_not_enforced" };
  }

  const featureKey = FEATURE_BY_TARGET[target];
  const plan = await resolveGoverningPlan(profileId, role);
  if (!plan) {
    return { allowed: false, reason: "no_active_plan", featureKey };
  }

  const limit = plan.limits?.[featureKey];
  if (limit === undefined || limit === null) {
    // No limit defined for this feature on this plan => not offered by plan.
    return {
      allowed: false,
      reason: "role_not_allowed",
      featureKey,
      planName: plan.name,
    };
  }

  const used = await getActiveEntityCount(profileId, target);
  if (used >= limit) {
    return {
      allowed: false,
      reason: "limit_exceeded",
      featureKey,
      limit,
      used,
      planName: plan.name,
    };
  }
  return {
    allowed: true,
    reason: "ok",
    featureKey,
    limit,
    used,
    planName: plan.name,
  };
}

/** Current usage count for a feature in the current FY period. */
export async function getUsage(
  profileId: string,
  featureKey: string
): Promise<number> {
  const admin = createServiceClient();
  const { data } = await admin
    .from("usage_counters")
    .select("used_count")
    .eq("profile_id", profileId)
    .eq("feature_key", featureKey)
    .order("period_start", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.used_count ?? 0;
}

/** Increment usage after a successful gated action (server-only). */
export async function incrementUsage(
  profileId: string,
  role: string,
  featureKey: string
): Promise<void> {
  const admin = createServiceClient();
  const periodStart = new Date().toISOString().slice(0, 10);
  // Single atomic upsert via RPC (INSERT … ON CONFLICT DO UPDATE) — no
  // read-then-write race under concurrent submissions (Batch 5 §310, §371).
  const { error } = await admin.rpc("mgp_increment_usage", {
    p_profile_id: profileId,
    p_role: role,
    p_feature_key: featureKey,
    p_period_start: periodStart,
  });
  if (error) {
    // Migration 20260710120000 not applied yet — fall back to the legacy
    // upsert so usage is still recorded (racy but never silently dropped).
    console.error("[incrementUsage] RPC failed, fallback:", error.code);
    const { data: existing } = await admin
      .from("usage_counters")
      .select("id, used_count")
      .eq("profile_id", profileId)
      .eq("feature_key", featureKey)
      .eq("period_start", periodStart)
      .maybeSingle();
    if (existing) {
      await admin
        .from("usage_counters")
        .update({ used_count: existing.used_count + 1 })
        .eq("id", existing.id);
    } else {
      await admin.from("usage_counters").insert({
        profile_id: profileId,
        role,
        feature_key: featureKey,
        period_start: periodStart,
        used_count: 1,
      });
    }
  }
}

/** Summary for the billing dashboard (real counts, never fabricated). */
export interface UsageSummaryRow {
  featureKey: string;
  used: number;
  limit: number | null;
}

export async function getUsageSummary(
  profileId: string,
  role: string
): Promise<{
  planName: string | null;
  enforced: boolean;
  rows: UsageSummaryRow[];
}> {
  const plan = await resolveGoverningPlan(profileId, role);
  const limits = plan?.limits ?? {};
  const rows: UsageSummaryRow[] = [];
  for (const key of Object.keys(limits)) {
    const used = await getUsage(profileId, key);
    rows.push({ featureKey: key, used, limit: limits[key] ?? null });
  }
  return { planName: plan?.name ?? null, enforced: gatesEnforced(), rows };
}

export { financialYear };
