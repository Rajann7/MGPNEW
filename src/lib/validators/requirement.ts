import { z } from "zod";

export const REQUIREMENT_PURPOSES = [
  "buy",
  "rent",
  "lease",
  "pg",
  "business_buy",
] as const;

export const REQUIREMENT_CATEGORIES = [
  "residential",
  "commercial",
  "industrial",
  "land_plot",
  "pg_hostel_room",
  "business",
  "project",
] as const;

export const AREA_UNITS = [
  "sq_ft",
  "sq_m",
  "sq_yd",
  "acre",
  "bigha",
  "guntha",
  "hectare",
] as const;

export const RequirementDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  purpose: z.enum(REQUIREMENT_PURPOSES),
  category: z.enum(REQUIREMENT_CATEGORIES),
  requirement_type: z.string().max(100).optional(),
  description: z.string().max(3000).optional(),

  // Budget
  budget_min: z.number().positive().nullable().optional(),
  budget_max: z.number().positive().nullable().optional(),
  rent_min: z.number().positive().nullable().optional(),
  rent_max: z.number().positive().nullable().optional(),

  // Area
  area_min: z.number().positive().nullable().optional(),
  area_max: z.number().positive().nullable().optional(),
  area_unit: z.enum(AREA_UNITS).nullable().optional(),

  // Preferences
  bedrooms_min: z.number().int().min(0).max(20).nullable().optional(),
  bedrooms_max: z.number().int().min(0).max(20).nullable().optional(),
  preferred_floor: z.string().max(100).optional(),
  furnishing_preference: z
    .enum(["any", "unfurnished", "semi_furnished", "fully_furnished"])
    .nullable()
    .optional(),
  possession_timeline: z
    .enum([
      "immediately",
      "within_1_month",
      "1_to_3_months",
      "3_to_6_months",
      "6_to_12_months",
      "above_1_year",
      "flexible",
    ])
    .nullable()
    .optional(),
  preferred_amenities: z.array(z.string()).default([]),

  // Location
  city_text: z.string().max(100).optional(),
  preferred_localities_text: z.string().max(500).optional(),

  // Privacy
  contact_visibility: z
    .enum([
      "hidden",
      "show_after_login",
      "show_after_approval",
      "show_to_verified_users",
      "public",
    ])
    .default("show_after_login"),
});

export const RequirementSubmitSchema = RequirementDraftSchema.extend({
  title: z.string().min(5).max(200),
  city_text: z.string().min(2, "City is required").max(100),
})
  .refine(
    (d) => {
      if (["buy", "business_buy"].includes(d.purpose)) {
        return d.budget_max != null && d.budget_max > 0;
      }
      return true;
    },
    {
      message: "Maximum budget is required for buy requirements",
      path: ["budget_max"],
    }
  )
  .refine(
    (d) => {
      if (["rent", "lease", "pg"].includes(d.purpose)) {
        return d.rent_max != null && d.rent_max > 0;
      }
      return true;
    },
    {
      message: "Maximum rent is required for rent/lease/PG requirements",
      path: ["rent_max"],
    }
  )
  .refine(
    (d) =>
      d.budget_min == null ||
      d.budget_max == null ||
      d.budget_max >= d.budget_min,
    { message: "Max budget must be >= min budget", path: ["budget_max"] }
  );

export type RequirementDraftInput = z.infer<typeof RequirementDraftSchema>;
export type RequirementSubmitInput = z.infer<typeof RequirementSubmitSchema>;
