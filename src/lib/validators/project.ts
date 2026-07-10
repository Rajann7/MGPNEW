import { z } from "zod";

export const PROJECT_TYPES = [
  "apartment_project",
  "villa_project",
  "plotting_project",
  "commercial_project",
  "industrial_project",
  "township_project",
  "mixed_use_project",
  "society_project",
  "industrial_zone_project",
] as const;

export const PROJECT_CATEGORIES = [
  "residential",
  "commercial",
  "industrial",
  "land_plot",
  "township",
  "mixed_use",
  "society",
  "industrial_zone",
] as const;

export const PROJECT_PURPOSES = ["sell", "rent", "lease"] as const;

export const AREA_UNITS = [
  "sq_ft",
  "sq_m",
  "sq_yd",
  "acre",
  "bigha",
  "guntha",
  "hectare",
] as const;

export const ProjectDraftSchema = z.object({
  project_name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(200),
  project_type: z.enum(PROJECT_TYPES),
  category: z.enum(PROJECT_CATEGORIES),
  purpose: z.enum(PROJECT_PURPOSES),
  short_description: z.string().max(300).optional(),
  description: z.string().max(10000).optional(),

  // Pricing
  price_min: z.number().positive().nullable().optional(),
  price_max: z.number().positive().nullable().optional(),
  price_visible: z.boolean().default(true),

  // Scale
  total_area_value: z.number().positive().nullable().optional(),
  total_area_unit: z.enum(AREA_UNITS).nullable().optional(),
  total_towers: z.number().int().min(1).max(999).nullable().optional(),
  total_wings: z.number().int().min(1).max(999).nullable().optional(),
  total_floors: z.number().int().min(1).max(999).nullable().optional(),
  total_units: z.number().int().min(1).nullable().optional(),
  available_units: z.number().int().min(0).nullable().optional(),
  unit_configurations: z.array(z.unknown()).default([]),

  // Timeline
  construction_status: z
    .enum([
      "pre_launch",
      "under_construction",
      "nearing_possession",
      "ready_to_move",
      "completed",
    ])
    .nullable()
    .optional(),
  possession_date: z.string().nullable().optional(),
  launch_date: z.string().nullable().optional(),
  phase_name: z.string().max(100).optional(),

  // RERA
  rera_registered: z.boolean().default(false),
  rera_number: z.string().max(100).optional(),
  rera_status: z
    .enum(["not_registered", "applied", "registered", "expired", "cancelled"])
    .nullable()
    .optional(),
  rera_valid_until: z.string().nullable().optional(),
  rera_disclaimer_required: z.boolean().default(true),

  amenities: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.unknown()).default({}),

  // Location
  city_text: z.string().max(100).optional(),
  locality_text: z.string().max(100).optional(),
  landmark: z.string().max(200).optional(),
  address_line: z.string().max(500).optional(),
  pin_code: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be 6 digits")
    .optional()
    .or(z.literal("")),
  map_visibility: z
    .enum(["hidden", "approximate", "exact"])
    .default("approximate"),

  // Media
  virtual_tour_url: z.string().url().optional().or(z.literal("")),
  video_url: z.string().url().optional().or(z.literal("")),

  // Contact (Batch 5 Contact step)
  preferred_contact_time: z
    .enum(["anytime", "morning_9_1", "evening_5_9"])
    .nullable()
    .optional(),

  // Wizard step persistence (resume exact step — Batch 5 §38)
  current_step: z.number().int().min(1).max(20).optional(),
});

/** One wing/tower row of the Batch 5 Step 4 structured wing editor. */
export const ProjectWingSchema = z.object({
  wing_name: z.string().min(1, "Wing name is required").max(50),
  floors: z.number().int().min(1).max(200),
  units_per_floor: z.number().int().min(1).max(50),
});

export const ProjectWingsSchema = z
  .array(ProjectWingSchema)
  .max(50)
  .refine(
    (wings) =>
      new Set(wings.map((w) => w.wing_name.trim().toUpperCase())).size ===
      wings.length,
    { message: "Wing names must be unique" }
  );

export type ProjectWingInput = z.infer<typeof ProjectWingSchema>;

export const ProjectSubmitSchema = ProjectDraftSchema.extend({
  project_name: z.string().min(3).max(200),
  city_text: z.string().min(2, "City is required").max(100),
  construction_status: z.enum([
    "pre_launch",
    "under_construction",
    "nearing_possession",
    "ready_to_move",
    "completed",
  ]),
})
  .refine(
    (d) => !d.rera_registered || (d.rera_number && d.rera_number.length > 3),
    {
      message: "RERA number is required when RERA registered is checked",
      path: ["rera_number"],
    }
  )
  .refine(
    (d) =>
      d.price_min == null || d.price_max == null || d.price_max >= d.price_min,
    { message: "Max price must be >= min price", path: ["price_max"] }
  );

export type ProjectDraftInput = z.infer<typeof ProjectDraftSchema>;
export type ProjectSubmitInput = z.infer<typeof ProjectSubmitSchema>;
