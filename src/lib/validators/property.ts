import { z } from "zod";

export const PROPERTY_CATEGORIES = [
  "residential",
  "commercial",
  "industrial",
  "land_plot",
  "pg_hostel_room",
  "business",
] as const;

export const PROPERTY_TYPES_BY_CATEGORY: Record<string, string[]> = {
  residential: [
    "flat_apartment",
    "tenament",
    "bungalow",
    "villa",
    "row_house",
    "farm_house",
    "penthouse",
    "studio",
    "independent_house",
  ],
  commercial: [
    "shop",
    "office",
    "showroom",
    "commercial_land",
    "commercial_building",
    "co_working_space",
    "warehouse_commercial",
  ],
  industrial: [
    "industrial_shed",
    "factory",
    "warehouse",
    "industrial_land",
    "industrial_plot",
    "cold_storage",
    "manufacturing_unit",
  ],
  land_plot: [
    "residential_plot",
    "commercial_plot",
    "industrial_plot",
    "agricultural_land",
    "non_agricultural_land",
    "farm_land",
    "open_land",
  ],
  pg_hostel_room: [
    "pg",
    "hostel",
    "room",
    "shared_room",
    "single_room",
    "paying_guest",
  ],
  business: [
    "running_business",
    "franchise",
    "hotel_restaurant_business",
    "shop_business",
    "office_business",
    "industrial_business",
  ],
};

export const ALL_PROPERTY_TYPES = Object.values(
  PROPERTY_TYPES_BY_CATEGORY
).flat();

export const PROPERTY_PURPOSES = [
  "sell",
  "rent",
  "lease",
  "pg",
  "business_sale",
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

export const PropertyDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  purpose: z.enum(PROPERTY_PURPOSES),
  category: z.enum(PROPERTY_CATEGORIES),
  property_type: z.string().min(1, "Property type is required"),
  description: z.string().max(5000).optional(),

  // Pricing
  price: z.number().positive().nullable().optional(),
  rent_amount: z.number().positive().nullable().optional(),
  deposit_amount: z.number().positive().nullable().optional(),
  maintenance_amount: z.number().positive().nullable().optional(),
  price_negotiable: z.boolean().default(false),

  // Area
  area_value: z.number().positive().nullable().optional(),
  area_unit: z.enum(AREA_UNITS).nullable().optional(),
  built_up_area: z.number().positive().nullable().optional(),
  carpet_area: z.number().positive().nullable().optional(),
  plot_area: z.number().positive().nullable().optional(),

  // Details
  bedrooms: z.number().int().min(0).max(20).nullable().optional(),
  bathrooms: z.number().int().min(0).max(20).nullable().optional(),
  balconies: z.number().int().min(0).max(10).nullable().optional(),
  floor_number: z.number().int().min(-3).max(200).nullable().optional(),
  total_floors: z.number().int().min(1).max(200).nullable().optional(),
  furnishing_status: z
    .enum(["unfurnished", "semi_furnished", "fully_furnished"])
    .nullable()
    .optional(),
  property_age: z
    .enum([
      "new_construction",
      "under_1_year",
      "1_to_3_years",
      "3_to_5_years",
      "5_to_10_years",
      "above_10_years",
    ])
    .nullable()
    .optional(),
  possession_status: z
    .enum(["ready_to_move", "under_construction", "on_request"])
    .nullable()
    .optional(),
  available_from: z.string().nullable().optional(),
  facing: z
    .enum([
      "north",
      "south",
      "east",
      "west",
      "north_east",
      "north_west",
      "south_east",
      "south_west",
    ])
    .nullable()
    .optional(),
  parking: z.enum(["none", "open", "covered", "both"]).nullable().optional(),
  amenities: z.array(z.string()).default([]),
  extra_attributes: z.record(z.string(), z.unknown()).default({}),

  // Location (text-based for now)
  city_text: z.string().max(100).optional(),
  locality_text: z.string().max(100).optional(),
  building_name: z.string().max(200).optional(),
  landmark: z.string().max(200).optional(),
  address_line: z.string().max(500).optional(),
  pin_code: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be 6 digits")
    .optional()
    .or(z.literal("")),

  // Contact & map
  contact_visibility: z
    .enum([
      "hidden",
      "show_after_login",
      "show_after_approval",
      "show_to_verified_users",
      "public",
    ])
    .default("show_after_login"),
  map_visibility: z.enum(["hidden", "approximate", "exact"]).default("hidden"),
});

export const PropertySubmitSchema = PropertyDraftSchema.extend({
  title: z.string().min(5).max(200),
  purpose: z.enum(PROPERTY_PURPOSES),
  category: z.enum(PROPERTY_CATEGORIES),
  property_type: z.string().min(1),
  city_text: z.string().min(2, "City is required").max(100),
})
  .refine(
    (d) => {
      if (["sell", "business_sale"].includes(d.purpose)) {
        return d.price != null && d.price > 0;
      }
      return true;
    },
    { message: "Price is required for sale listings", path: ["price"] }
  )
  .refine(
    (d) => {
      if (["rent", "lease", "pg"].includes(d.purpose)) {
        return d.rent_amount != null && d.rent_amount > 0;
      }
      return true;
    },
    {
      message: "Rent amount is required for rent/lease/PG listings",
      path: ["rent_amount"],
    }
  );

export type PropertyDraftInput = z.infer<typeof PropertyDraftSchema>;
export type PropertySubmitInput = z.infer<typeof PropertySubmitSchema>;
