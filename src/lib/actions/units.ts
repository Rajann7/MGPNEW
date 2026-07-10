"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { ProjectWingsSchema } from "@/lib/validators/project";
import type {
  ActionResult,
  ProjectUnit,
  ProjectWing,
  UnitAvailabilityStatus,
} from "@/types";
import { z } from "zod";

// ============================================================
// Design Batch 5 · 5D — Builder Unit Inventory
// Structured wings, idempotent unit generation, bounded listing,
// single/bulk mutations with stale-version protection and audit.
// ============================================================

/** Allowed status transitions (Batch 5 §250). Sold reversal is not offered. */
const UNIT_TRANSITIONS: Record<string, UnitAvailabilityStatus[]> = {
  available: ["booked", "sold", "on_hold", "hidden"],
  booked: ["available", "sold", "on_hold"],
  on_hold: ["available", "booked", "sold"],
  hidden: ["available"],
  not_released: ["available"],
  sold: [],
};

type RequireOwnProjectError = "AUTH_REQUIRED" | "ENTITY_NOT_FOUND" | "FORBIDDEN";

async function requireOwnProject(
  projectId: string
): Promise<
  | { error: RequireOwnProjectError }
  | {
      profile: NonNullable<Awaited<ReturnType<typeof getCurrentProfile>>>;
      supabase: Awaited<ReturnType<typeof createClient>>;
      project: {
        id: string;
        builder_profile_id: string | null;
        status: string | null;
        deleted_at: string | null;
      };
    }
> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "AUTH_REQUIRED" };
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("id, builder_profile_id, status, deleted_at")
    .eq("id", projectId)
    .maybeSingle();
  if (!project || project.deleted_at) return { error: "ENTITY_NOT_FOUND" };
  if (project.builder_profile_id !== profile.id) return { error: "FORBIDDEN" };
  return { profile, supabase, project };
}

// ============================================================
// Wings
// ============================================================

export async function getProjectWings(
  projectId: string
): Promise<ActionResult<ProjectWing[]>> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };
  const { data, error } = await ctx.supabase
    .from("project_wings")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order")
    .order("wing_name");
  if (error) {
    console.error("[getProjectWings] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return { success: true, data: data ?? [] };
}

/**
 * Replace-style save of the wizard's wing rows. Wings whose units are already
 * generated are never silently deleted or resized (Batch 5 §160) — attempts
 * to remove/shrink them return STRUCTURE_LOCKED with the wing names.
 */
export async function saveProjectWings(
  projectId: string,
  wingsInput: unknown
): Promise<ActionResult<{ wings: ProjectWing[]; totalUnits: number }>> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const parsed = ProjectWingsSchema.safeParse(wingsInput);
  if (!parsed.success) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { wings: parsed.error.issues.map((i) => i.message) },
    };
  }
  const wings = parsed.data;

  const { data: existing } = await ctx.supabase
    .from("project_wings")
    .select("*")
    .eq("project_id", projectId);
  const existingByName = new Map(
    (existing ?? []).map((w) => [w.wing_name.trim().toUpperCase(), w])
  );

  // Guard: generated wings cannot be removed or shrunk from the wizard.
  const incomingNames = new Set(
    wings.map((w) => w.wing_name.trim().toUpperCase())
  );
  const locked: string[] = [];
  for (const w of existing ?? []) {
    if (!w.units_generated) continue;
    const inc = wings.find(
      (x) => x.wing_name.trim().toUpperCase() === w.wing_name.trim().toUpperCase()
    );
    if (
      !incomingNames.has(w.wing_name.trim().toUpperCase()) ||
      (inc && (inc.floors < w.floors || inc.units_per_floor < w.units_per_floor))
    ) {
      locked.push(w.wing_name);
    }
  }
  if (locked.length > 0) {
    return {
      success: false,
      error: "STRUCTURE_LOCKED",
      fieldErrors: { wings: locked },
    };
  }

  // Delete removed (non-generated) wings
  const toDelete = (existing ?? []).filter(
    (w) =>
      !w.units_generated &&
      !incomingNames.has(w.wing_name.trim().toUpperCase())
  );
  if (toDelete.length > 0) {
    await ctx.supabase
      .from("project_wings")
      .delete()
      .in(
        "id",
        toDelete.map((w) => w.id)
      );
  }

  // Upsert incoming wings
  for (let i = 0; i < wings.length; i++) {
    const w = wings[i];
    const match = existingByName.get(w.wing_name.trim().toUpperCase());
    if (match) {
      const { error } = await ctx.supabase
        .from("project_wings")
        .update({
          wing_name: w.wing_name.trim(),
          floors: w.floors,
          units_per_floor: w.units_per_floor,
          sort_order: i,
        })
        .eq("id", match.id);
      if (error) return { success: false, error: "UNKNOWN_ERROR" };
    } else {
      const { error } = await ctx.supabase.from("project_wings").insert({
        project_id: projectId,
        wing_name: w.wing_name.trim(),
        floors: w.floors,
        units_per_floor: w.units_per_floor,
        sort_order: i,
      });
      if (error) return { success: false, error: "UNKNOWN_ERROR" };
    }
  }

  const { data: saved } = await ctx.supabase
    .from("project_wings")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order");
  const totalUnits = (saved ?? []).reduce(
    (sum, w) => sum + w.floors * w.units_per_floor,
    0
  );

  // Keep the project's summary totals real (public detail aggregates)
  await ctx.supabase
    .from("projects")
    .update({
      total_wings: (saved ?? []).length || null,
      total_units: totalUnits || null,
    })
    .eq("id", projectId);

  return { success: true, data: { wings: saved ?? [], totalUnits } };
}

// ============================================================
// Unit generation (idempotent)
// ============================================================

/**
 * Generate units for a wing: floors × units/floor, numbered `A-101 … A-114`
 * style (wing prefix + floor*100 + index). Idempotent: a unique index on
 * (project_id, unit_number) plus upsert-ignore means repeated Generate never
 * duplicates units (Batch 5 §158, §335).
 */
export async function generateWingUnits(
  projectId: string,
  wingId: string
): Promise<ActionResult<{ created: number; skipped: number; total: number }>> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const { data: wing } = await ctx.supabase
    .from("project_wings")
    .select("*")
    .eq("id", wingId)
    .eq("project_id", projectId)
    .maybeSingle();
  if (!wing) return { success: false, error: "ENTITY_NOT_FOUND" };

  const rows: Record<string, unknown>[] = [];
  const prefix = wing.wing_name.trim();
  for (let floor = 1; floor <= wing.floors; floor++) {
    for (let u = 1; u <= wing.units_per_floor; u++) {
      rows.push({
        project_id: projectId,
        wing_id: wing.id,
        wing_name: prefix,
        floor_number: floor,
        unit_number: `${prefix}-${floor * 100 + u}`,
        availability_status: "available",
      });
    }
  }

  // Bounded safety: never generate unbounded inventory in one call
  if (rows.length > 5000)
    return { success: false, error: "TOO_MANY_UNITS" };

  const { count: existingCount } = await ctx.supabase
    .from("project_units")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId)
    .eq("wing_id", wing.id);

  // Upsert with ignoreDuplicates → conflict rows silently skipped (idempotent)
  const { error } = await ctx.supabase
    .from("project_units")
    .upsert(rows, {
      onConflict: "project_id,unit_number",
      ignoreDuplicates: true,
    });
  if (error) {
    console.error("[generateWingUnits] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  const { count: afterCount } = await ctx.supabase
    .from("project_units")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId)
    .eq("wing_id", wing.id);

  const created = (afterCount ?? 0) - (existingCount ?? 0);
  await ctx.supabase
    .from("project_wings")
    .update({ units_generated: true })
    .eq("id", wing.id);

  return {
    success: true,
    data: {
      created,
      skipped: rows.length - created,
      total: afterCount ?? rows.length,
    },
  };
}

// ============================================================
// Inventory listing (bounded, filtered)
// ============================================================

export async function listProjectUnits(
  projectId: string,
  opts: {
    wingId?: string | null;
    status?: UnitAvailabilityStatus | null;
    page?: number;
    limit?: number;
  } = {}
): Promise<
  ActionResult<{
    items: ProjectUnit[];
    total: number;
    statusCounts: Record<string, number>;
  }>
> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const page = Math.max(1, opts.page ?? 1);
  const limit = Math.min(100, Math.max(1, opts.limit ?? 50));
  const offset = (page - 1) * limit;

  let query = ctx.supabase
    .from("project_units")
    .select("*", { count: "exact" })
    .eq("project_id", projectId);
  if (opts.wingId) query = query.eq("wing_id", opts.wingId);
  if (opts.status) query = query.eq("availability_status", opts.status);

  const { data, error, count } = await query
    .order("wing_name")
    .order("floor_number")
    .order("unit_number")
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[listProjectUnits] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  // Real per-status counts for the current wing scope (never fabricated)
  let countQuery = ctx.supabase
    .from("project_units")
    .select("availability_status")
    .eq("project_id", projectId)
    .limit(5000);
  if (opts.wingId) countQuery = countQuery.eq("wing_id", opts.wingId);
  const { data: statusRows } = await countQuery;
  const statusCounts: Record<string, number> = {};
  for (const r of statusRows ?? []) {
    statusCounts[r.availability_status] =
      (statusCounts[r.availability_status] ?? 0) + 1;
  }

  return {
    success: true,
    data: { items: data ?? [], total: count ?? 0, statusCounts },
  };
}

// ============================================================
// Single unit edit (price/status) with stale-version protection
// ============================================================

const UnitEditSchema = z.object({
  price: z.number().nonnegative().max(10_000_000_000).nullable().optional(),
  availability_status: z
    .enum(["available", "booked", "sold", "on_hold", "hidden", "not_released"])
    .optional(),
  version: z.number().int().min(1),
});

export async function updateProjectUnit(
  projectId: string,
  unitId: string,
  input: unknown
): Promise<ActionResult<{ unit: ProjectUnit } | null>> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const parsed = UnitEditSchema.safeParse(input);
  if (!parsed.success)
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };

  const { data: unit } = await ctx.supabase
    .from("project_units")
    .select("*")
    .eq("id", unitId)
    .eq("project_id", projectId)
    .maybeSingle();
  if (!unit) return { success: false, error: "ENTITY_NOT_FOUND" };

  // Stale-version protection (Batch 5 §273): a teammate saved since this
  // edit sheet was opened → refuse, client reloads latest.
  if (unit.version !== parsed.data.version)
    return { success: false, error: "STALE_VERSION" };

  const newStatus = parsed.data.availability_status ?? unit.availability_status;
  if (
    newStatus !== unit.availability_status &&
    !UNIT_TRANSITIONS[unit.availability_status]?.includes(newStatus)
  ) {
    return { success: false, error: "INVALID_STATUS_TRANSITION" };
  }

  const newPrice =
    parsed.data.price !== undefined ? parsed.data.price : unit.price;

  const { data: updated, error } = await ctx.supabase
    .from("project_units")
    .update({ price: newPrice, availability_status: newStatus })
    .eq("id", unitId)
    .eq("version", parsed.data.version)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("[updateProjectUnit] DB error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  if (!updated) return { success: false, error: "STALE_VERSION" };

  // Audit history (immutable rows)
  await ctx.supabase.from("project_unit_events").insert({
    unit_id: unitId,
    project_id: projectId,
    actor_profile_id: ctx.profile.id,
    action:
      newStatus !== unit.availability_status ? "status_change" : "price_change",
    old_status: unit.availability_status,
    new_status: newStatus,
    old_price: unit.price,
    new_price: newPrice,
    source: "single",
  });

  await syncProjectAvailableUnits(ctx.supabase, projectId);
  return { success: true, data: { unit: updated } };
}

// ============================================================
// Bulk actions (conditional updates + honest partial results)
// ============================================================

const BulkStatusSchema = z.object({
  unitIds: z.array(z.string().uuid()).min(1).max(200),
  status: z.enum(["available", "booked", "sold", "on_hold"]),
});

export async function bulkUpdateUnitStatus(
  projectId: string,
  input: unknown
): Promise<
  ActionResult<{ updated: number; skipped: { id: string; reason: string }[] }>
> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const parsed = BulkStatusSchema.safeParse(input);
  if (!parsed.success)
    return { success: false, error: "VALIDATION_ERROR" };

  const { unitIds, status } = parsed.data;
  const { data: units } = await ctx.supabase
    .from("project_units")
    .select("id, availability_status, price, version")
    .eq("project_id", projectId)
    .in("id", unitIds);

  const found = new Map((units ?? []).map((u) => [u.id, u]));
  const skipped: { id: string; reason: string }[] = [];
  let updated = 0;

  for (const id of unitIds) {
    const u = found.get(id);
    if (!u) {
      skipped.push({ id, reason: "not_found" });
      continue;
    }
    if (u.availability_status === status) {
      skipped.push({ id, reason: "already_in_status" });
      continue;
    }
    if (!UNIT_TRANSITIONS[u.availability_status]?.includes(status)) {
      skipped.push({ id, reason: `invalid_from_${u.availability_status}` });
      continue;
    }
    // Conditional update: version guard means a concurrent edit skips
    // rather than being overwritten (bulk idempotency, §259-261).
    const { data: row } = await ctx.supabase
      .from("project_units")
      .update({ availability_status: status })
      .eq("id", id)
      .eq("version", u.version)
      .select("id")
      .maybeSingle();
    if (!row) {
      skipped.push({ id, reason: "stale" });
      continue;
    }
    updated += 1;
    await ctx.supabase.from("project_unit_events").insert({
      unit_id: id,
      project_id: projectId,
      actor_profile_id: ctx.profile.id,
      action: "status_change",
      old_status: u.availability_status,
      new_status: status,
      old_price: u.price,
      new_price: u.price,
      source: "bulk",
    });
  }

  await syncProjectAvailableUnits(ctx.supabase, projectId);
  return { success: true, data: { updated, skipped } };
}

const BulkPriceSchema = z.object({
  unitIds: z.array(z.string().uuid()).min(1).max(200),
  price: z.number().nonnegative().max(10_000_000_000),
});

export async function bulkUpdateUnitPrice(
  projectId: string,
  input: unknown
): Promise<
  ActionResult<{ updated: number; skipped: { id: string; reason: string }[] }>
> {
  const ctx = await requireOwnProject(projectId);
  if ("error" in ctx) return { success: false, error: ctx.error };

  const parsed = BulkPriceSchema.safeParse(input);
  if (!parsed.success)
    return { success: false, error: "VALIDATION_ERROR" };

  const { unitIds, price } = parsed.data;
  const { data: units } = await ctx.supabase
    .from("project_units")
    .select("id, availability_status, price, version")
    .eq("project_id", projectId)
    .in("id", unitIds);

  const found = new Map((units ?? []).map((u) => [u.id, u]));
  const skipped: { id: string; reason: string }[] = [];
  let updated = 0;

  for (const id of unitIds) {
    const u = found.get(id);
    if (!u) {
      skipped.push({ id, reason: "not_found" });
      continue;
    }
    if (u.availability_status === "sold") {
      skipped.push({ id, reason: "sold_unit_price_locked" });
      continue;
    }
    const { data: row } = await ctx.supabase
      .from("project_units")
      .update({ price })
      .eq("id", id)
      .eq("version", u.version)
      .select("id")
      .maybeSingle();
    if (!row) {
      skipped.push({ id, reason: "stale" });
      continue;
    }
    updated += 1;
    await ctx.supabase.from("project_unit_events").insert({
      unit_id: id,
      project_id: projectId,
      actor_profile_id: ctx.profile.id,
      action: "price_change",
      old_status: u.availability_status,
      new_status: u.availability_status,
      old_price: u.price,
      new_price: price,
      source: "bulk",
    });
  }

  return { success: true, data: { updated, skipped } };
}

/** Keep the public project card's Available count real (Batch 5 §278-279). */
async function syncProjectAvailableUnits(
  supabase: Awaited<ReturnType<typeof createClient>>,
  projectId: string
) {
  const { count } = await supabase
    .from("project_units")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId)
    .eq("availability_status", "available");
  await supabase
    .from("projects")
    .update({ available_units: count ?? 0 })
    .eq("id", projectId);
}
