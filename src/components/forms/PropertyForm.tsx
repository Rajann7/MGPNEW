"use client";

import { useState, useTransition } from "react";
import {
  createPropertyDraft,
  updatePropertyDraft,
  submitPropertyForApproval,
} from "@/lib/actions/properties";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES_BY_CATEGORY,
  PROPERTY_PURPOSES,
  AREA_UNITS,
} from "@/lib/validators/property";
import { Stepper } from "@/components/ui/Stepper";
import { FormField, SummaryRow } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { ImageIcon, Eye } from "lucide-react";
import type { Property } from "@/types";

const PURPOSE_LABELS: Record<string, string> = {
  sell: "Sell",
  rent: "Rent",
  lease: "Lease",
  pg: "PG / Hostel",
  business_sale: "Business Sale",
};

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  land_plot: "Land / Plot",
  pg_hostel_room: "PG / Hostel / Room",
  business: "Business",
};

const TYPE_LABELS: Record<string, string> = {
  flat_apartment: "Flat / Apartment",
  tenament: "Tenement",
  bungalow: "Bungalow",
  villa: "Villa",
  row_house: "Row House",
  farm_house: "Farm House",
  penthouse: "Penthouse",
  studio: "Studio",
  independent_house: "Independent House",
  shop: "Shop",
  office: "Office",
  showroom: "Showroom",
  commercial_land: "Commercial Land",
  commercial_building: "Commercial Building",
  co_working_space: "Co-Working Space",
  warehouse_commercial: "Warehouse (Commercial)",
  industrial_shed: "Industrial Shed",
  factory: "Factory",
  warehouse: "Warehouse",
  industrial_land: "Industrial Land",
  industrial_plot: "Industrial Plot",
  cold_storage: "Cold Storage",
  manufacturing_unit: "Manufacturing Unit",
  residential_plot: "Residential Plot",
  commercial_plot: "Commercial Plot",
  agricultural_land: "Agricultural Land",
  non_agricultural_land: "NA Land",
  farm_land: "Farm Land",
  open_land: "Open Land",
  pg: "PG",
  hostel: "Hostel",
  room: "Room",
  shared_room: "Shared Room",
  single_room: "Single Room",
  paying_guest: "Paying Guest",
  running_business: "Running Business",
  franchise: "Franchise",
  hotel_restaurant_business: "Hotel / Restaurant",
  shop_business: "Shop Business",
  office_business: "Office Business",
  industrial_business: "Industrial Business",
};

interface Props {
  existing?: Partial<Property>;
  mode: "create" | "edit";
}

// Post Property = 9 steps (design Batch 5 · 5A / docs/06). Step 9 "Submitted" is
// the success confirmation. The interactive wizard runs steps 1–8 (Preview submits).
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
const LAST_INPUT_STEP = 8 as const;

const STEPS = [
  "Basics",
  "Type & Purpose",
  "Price & Area",
  "Location",
  "Amenities",
  "Media",
  "Contact",
  "Preview",
  "Submitted",
];

/** Per-block "Edit" link inside the Preview frame (module-scope: stable component). */
function EditLink({ onEdit }: { onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="text-xs font-medium text-brand hover:text-brand-hover"
    >
      Edit
    </button>
  );
}

export function PropertyForm({ existing, mode }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [form, setForm] = useState({
    title: existing?.title ?? "",
    purpose: existing?.purpose ?? "sell",
    category: existing?.category ?? "residential",
    property_type: existing?.property_type ?? "",
    description: existing?.description ?? "",
    // Pricing
    price: existing?.price?.toString() ?? "",
    rent_amount: existing?.rent_amount?.toString() ?? "",
    deposit_amount: existing?.deposit_amount?.toString() ?? "",
    price_negotiable: existing?.price_negotiable ?? false,
    // Area
    area_value: existing?.area_value?.toString() ?? "",
    area_unit: existing?.area_unit ?? "sq_ft",
    built_up_area: existing?.built_up_area?.toString() ?? "",
    carpet_area: existing?.carpet_area?.toString() ?? "",
    // Details
    bedrooms: existing?.bedrooms?.toString() ?? "",
    bathrooms: existing?.bathrooms?.toString() ?? "",
    balconies: existing?.balconies?.toString() ?? "",
    floor_number: existing?.floor_number?.toString() ?? "",
    total_floors: existing?.total_floors?.toString() ?? "",
    furnishing_status: existing?.furnishing_status ?? "",
    possession_status: existing?.possession_status ?? "",
    facing: existing?.facing ?? "",
    parking: existing?.parking ?? "",
    // Location
    city_text: existing?.city_text ?? "",
    locality_text: existing?.locality_text ?? "",
    building_name: existing?.building_name ?? "",
    landmark: existing?.landmark ?? "",
    address_line: existing?.address_line ?? "",
    pin_code: existing?.pin_code ?? "",
    // Contact
    contact_visibility: existing?.contact_visibility ?? "show_after_login",
    map_visibility: existing?.map_visibility ?? "hidden",
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [savedId, setSavedId] = useState<string | null>(existing?.id ?? null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const availableTypes = PROPERTY_TYPES_BY_CATEGORY[form.category] ?? [];
  const showPriceField = ["sell", "business_sale"].includes(form.purpose);
  const showRentField = ["rent", "lease", "pg"].includes(form.purpose);
  const showBedrooms = ["residential", "pg_hostel_room"].includes(
    form.category
  );
  const showFloors = !["land_plot"].includes(form.category);
  const showPlotArea = ["land_plot", "residential"].includes(form.category);

  function setField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });
  }

  function buildPayload() {
    return {
      title: form.title,
      purpose: form.purpose,
      category: form.category,
      property_type: form.property_type,
      description: form.description || undefined,
      price: form.price ? parseFloat(form.price) : undefined,
      rent_amount: form.rent_amount ? parseFloat(form.rent_amount) : undefined,
      deposit_amount: form.deposit_amount
        ? parseFloat(form.deposit_amount)
        : undefined,
      price_negotiable: form.price_negotiable,
      area_value: form.area_value ? parseFloat(form.area_value) : undefined,
      area_unit: form.area_unit || undefined,
      built_up_area: form.built_up_area
        ? parseFloat(form.built_up_area)
        : undefined,
      carpet_area: form.carpet_area ? parseFloat(form.carpet_area) : undefined,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? parseInt(form.bathrooms) : undefined,
      balconies: form.balconies ? parseInt(form.balconies) : undefined,
      floor_number: form.floor_number ? parseInt(form.floor_number) : undefined,
      total_floors: form.total_floors ? parseInt(form.total_floors) : undefined,
      furnishing_status: (form.furnishing_status || undefined) as
        "unfurnished" | "semi_furnished" | "fully_furnished" | undefined,
      possession_status: (form.possession_status || undefined) as
        "ready_to_move" | "under_construction" | "on_request" | undefined,
      facing: form.facing || undefined,
      parking: (form.parking || undefined) as
        "none" | "open" | "covered" | "both" | undefined,
      amenities: [],
      extra_attributes: {},
      city_text: form.city_text || undefined,
      locality_text: form.locality_text || undefined,
      building_name: form.building_name || undefined,
      landmark: form.landmark || undefined,
      address_line: form.address_line || undefined,
      pin_code: form.pin_code || undefined,
      contact_visibility: form.contact_visibility as
        | "hidden"
        | "show_after_login"
        | "show_after_approval"
        | "show_to_verified_users"
        | "public",
      map_visibility: form.map_visibility as "hidden" | "approximate" | "exact",
    };
  }

  async function saveDraft() {
    setServerError(null);
    const payload = buildPayload();

    if (mode === "create" && !savedId) {
      const res = await createPropertyDraft(payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
      setSavedId(res.data.id);
    } else if (savedId) {
      const res = await updatePropertyDraft(savedId, payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
    }
    return true;
  }

  async function handleNext() {
    setServerError(null);
    // Client-side step validation (Basics → Type → Location gates)
    if (step === 1) {
      if (!form.title.trim() || form.title.length < 5) {
        setFieldErrors({ title: ["Title must be at least 5 characters"] });
        return;
      }
    }
    if (step === 2) {
      if (!form.property_type) {
        setFieldErrors({ property_type: ["Please select a property type"] });
        return;
      }
    }
    if (step === 4) {
      if (!form.city_text.trim()) {
        setFieldErrors({ city_text: ["City is required"] });
        return;
      }
    }

    startTransition(async () => {
      const saved = await saveDraft();
      if (saved) setStep((s) => Math.min(LAST_INPUT_STEP, s + 1) as Step);
    });
  }

  function goToStep(target: Step) {
    setServerError(null);
    setFieldErrors({});
    setStep(target);
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1) as Step);
    setServerError(null);
    setFieldErrors({});
  }

  async function handleSubmitForApproval() {
    if (!savedId) return;
    setServerError(null);
    startTransition(async () => {
      const payload = buildPayload();
      const res = await submitPropertyForApproval(savedId, payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return;
      }
      setSubmitSuccess(true);
    });
  }

  if (submitSuccess) {
    // Step 9 · Submitted
    return (
      <SuccessScreen
        title="Property Submitted for Approval"
        description="Your property has been submitted. Our team will review and approve it shortly. You will be notified when it is approved or if changes are needed."
        actionLabel="View My Properties"
        actionHref="/dashboard/owner/properties"
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Stepper steps={STEPS} current={step} />

      {serverError && (
        <Alert tone="danger" className="mb-4">
          {serverError === "ROLE_NOT_ALLOWED"
            ? "Your account role is not allowed to post properties."
            : serverError === "AUTH_REQUIRED"
              ? "Please log in to continue."
              : serverError === "VALIDATION_ERROR"
                ? "Please fix the errors below."
                : "Something went wrong. Please try again."}
        </Alert>
      )}

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* STEP 1: Basics */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Basics</h2>

            <FormField
              label="Listing Title"
              required
              error={fieldErrors.title?.[0]}
            >
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. 2 BHK Flat in Satellite, Ahmedabad"
                maxLength={200}
                className="form-input"
                aria-required="true"
              />
            </FormField>

            <FormField label="Description">
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={5}
                maxLength={5000}
                placeholder="Describe the property, key features, surroundings…"
                className="form-input resize-none"
              />
              <p className="text-xs text-zinc-400 mt-1">
                {form.description.length}/5000
              </p>
            </FormField>
          </div>
        )}

        {/* STEP 2: Type & Purpose */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Type &amp; Purpose
            </h2>

            <FormField label="Purpose" required>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setField("purpose", p)}
                    className={[
                      "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                      form.purpose === p
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-brand/40",
                    ].join(" ")}
                    aria-pressed={form.purpose === p}
                  >
                    {PURPOSE_LABELS[p]}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="Category" required>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROPERTY_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setField("category", c);
                      setField("property_type", "");
                    }}
                    className={[
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left",
                      form.category === c
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-brand/40",
                    ].join(" ")}
                    aria-pressed={form.category === c}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField
              label="Property Type"
              required
              error={fieldErrors.property_type?.[0]}
            >
              <select
                value={form.property_type}
                onChange={(e) => setField("property_type", e.target.value)}
                className="form-select"
                aria-required="true"
              >
                <option value="">Select type…</option>
                {availableTypes.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        )}

        {/* STEP 3: Price & Area */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Price &amp; Area</h2>

            {showPriceField && (
              <FormField
                label="Sale Price (₹)"
                required
                error={fieldErrors.price?.[0]}
              >
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                  min="0"
                  placeholder="e.g. 4500000"
                  className="form-input"
                  aria-required="true"
                />
              </FormField>
            )}

            {showRentField && (
              <>
                <FormField
                  label="Monthly Rent / Lease (₹)"
                  required
                  error={fieldErrors.rent_amount?.[0]}
                >
                  <input
                    type="number"
                    value={form.rent_amount}
                    onChange={(e) => setField("rent_amount", e.target.value)}
                    min="0"
                    placeholder="e.g. 15000"
                    className="form-input"
                    aria-required="true"
                  />
                </FormField>
                <FormField label="Security Deposit (₹)">
                  <input
                    type="number"
                    value={form.deposit_amount}
                    onChange={(e) => setField("deposit_amount", e.target.value)}
                    min="0"
                    placeholder="Optional"
                    className="form-input"
                  />
                </FormField>
              </>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.price_negotiable}
                onChange={(e) => setField("price_negotiable", e.target.checked)}
                className="w-4 h-4 rounded text-brand border-zinc-300"
              />
              <span className="text-sm text-zinc-700">Price is negotiable</span>
            </label>

            {/* Area */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Total Area">
                <input
                  type="number"
                  value={form.area_value}
                  onChange={(e) => setField("area_value", e.target.value)}
                  min="0"
                  placeholder="Area"
                  className="form-input"
                />
              </FormField>
              <FormField label="Unit">
                <select
                  value={form.area_unit}
                  onChange={(e) =>
                    setField(
                      "area_unit",
                      e.target.value as import("@/types").AreaUnit
                    )
                  }
                  className="form-select"
                >
                  {AREA_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {showPlotArea && (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Built-up Area (sq ft)">
                  <input
                    type="number"
                    value={form.built_up_area}
                    onChange={(e) => setField("built_up_area", e.target.value)}
                    min="0"
                    placeholder="Built-up area"
                    className="form-input"
                  />
                </FormField>
                <FormField label="Carpet Area (sq ft)">
                  <input
                    type="number"
                    value={form.carpet_area}
                    onChange={(e) => setField("carpet_area", e.target.value)}
                    min="0"
                    placeholder="Carpet area"
                    className="form-input"
                  />
                </FormField>
              </div>
            )}

            {showBedrooms && (
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Bedrooms">
                  <select
                    value={form.bedrooms}
                    onChange={(e) => setField("bedrooms", e.target.value)}
                    className="form-select"
                  >
                    <option value="">—</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                    <option value="9">9+</option>
                  </select>
                </FormField>
                <FormField label="Bathrooms">
                  <select
                    value={form.bathrooms}
                    onChange={(e) => setField("bathrooms", e.target.value)}
                    className="form-select"
                  >
                    <option value="">—</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Balconies">
                  <select
                    value={form.balconies}
                    onChange={(e) => setField("balconies", e.target.value)}
                    className="form-select"
                  >
                    <option value="">—</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            )}

            {showFloors && (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Floor Number">
                  <input
                    type="number"
                    value={form.floor_number}
                    onChange={(e) => setField("floor_number", e.target.value)}
                    placeholder="e.g. 3"
                    className="form-input"
                  />
                </FormField>
                <FormField label="Total Floors">
                  <input
                    type="number"
                    value={form.total_floors}
                    onChange={(e) => setField("total_floors", e.target.value)}
                    placeholder="e.g. 10"
                    className="form-input"
                  />
                </FormField>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Location */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Location</h2>
            <p className="text-sm text-zinc-500">
              Full location hierarchy will be available in a future update.
              Enter city and locality for now.
            </p>

            <FormField label="City" required error={fieldErrors.city_text?.[0]}>
              <input
                type="text"
                value={form.city_text}
                onChange={(e) => setField("city_text", e.target.value)}
                placeholder="e.g. Ahmedabad"
                maxLength={100}
                className="form-input"
                aria-required="true"
              />
            </FormField>

            <FormField label="Locality / Area">
              <input
                type="text"
                value={form.locality_text}
                onChange={(e) => setField("locality_text", e.target.value)}
                placeholder="e.g. Satellite, Bopal, Prahlad Nagar"
                maxLength={100}
                className="form-input"
              />
            </FormField>

            <FormField label="Society / Building Name">
              <input
                type="text"
                value={form.building_name}
                onChange={(e) => setField("building_name", e.target.value)}
                placeholder="Optional"
                maxLength={200}
                className="form-input"
              />
            </FormField>

            <FormField label="Address Line">
              <input
                type="text"
                value={form.address_line}
                onChange={(e) => setField("address_line", e.target.value)}
                placeholder="Street / plot / house no. (kept private until you choose to reveal)"
                maxLength={300}
                className="form-input"
              />
            </FormField>

            <FormField label="Landmark">
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => setField("landmark", e.target.value)}
                placeholder="e.g. Near Iscon Mall"
                maxLength={200}
                className="form-input"
              />
            </FormField>

            <FormField label="PIN Code">
              <input
                type="text"
                value={form.pin_code}
                onChange={(e) =>
                  setField(
                    "pin_code",
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="6-digit PIN code"
                className="form-input"
                inputMode="numeric"
                maxLength={6}
              />
            </FormField>

            <Alert tone="warning">
              Exact map location can be added in a future update. Location
              hierarchy (district, taluka, locality) coming in Phase 11.
            </Alert>
          </div>
        )}

        {/* STEP 5: Amenities */}
        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Amenities</h2>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Furnishing">
                <select
                  value={form.furnishing_status}
                  onChange={(e) =>
                    setField("furnishing_status", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="">Any</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi_furnished">Semi-Furnished</option>
                  <option value="fully_furnished">Fully Furnished</option>
                </select>
              </FormField>
              <FormField label="Parking">
                <select
                  value={form.parking}
                  onChange={(e) => setField("parking", e.target.value)}
                  className="form-select"
                >
                  <option value="">—</option>
                  <option value="none">None</option>
                  <option value="open">Open</option>
                  <option value="covered">Covered</option>
                  <option value="both">Both</option>
                </select>
              </FormField>
            </div>

            <FormField label="Possession Status">
              <select
                value={form.possession_status}
                onChange={(e) => setField("possession_status", e.target.value)}
                className="form-select"
              >
                <option value="">—</option>
                <option value="ready_to_move">Ready to Move</option>
                <option value="under_construction">Under Construction</option>
                <option value="on_request">On Request</option>
              </select>
            </FormField>

            <FormField label="Facing">
              <select
                value={form.facing}
                onChange={(e) => setField("facing", e.target.value)}
                className="form-select"
              >
                <option value="">Any</option>
                {[
                  "north",
                  "south",
                  "east",
                  "west",
                  "north_east",
                  "north_west",
                  "south_east",
                  "south_west",
                ].map((f) => (
                  <option key={f} value={f}>
                    {f
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </FormField>

            <Alert tone="info">
              A full amenity checklist (lift, security, power backup, clubhouse…)
              arrives with the media phase. Furnishing, parking and facing above
              are saved with your listing now.
            </Alert>
          </div>
        )}

        {/* STEP 6: Media placeholder */}
        {step === 6 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Photos &amp; Media
            </h2>
            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center bg-zinc-50">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ImageIcon
                  className="w-6 h-6 text-zinc-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-medium text-zinc-700 mb-1">
                Photo upload coming soon
              </p>
              <p className="text-xs text-zinc-400">
                Media storage (Cloudflare R2 + CDN) will be configured in a
                future phase. You can submit your property now and add photos
                later.
              </p>
              <span className="mt-3 inline-block text-xs bg-amber-50 text-amber-600 font-medium px-3 py-1 rounded-full">
                SETUP_REQUIRED — Phase 12
              </span>
            </div>
          </div>
        )}

        {/* STEP 7: Contact */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Contact &amp; Visibility
            </h2>

            <FormField label="Contact Visibility">
              <select
                value={form.contact_visibility}
                onChange={(e) =>
                  setField(
                    "contact_visibility",
                    e.target.value as import("@/types").ContactVisibility
                  )
                }
                className="form-select"
              >
                <option value="show_after_login">Show after login</option>
                <option value="show_after_approval">
                  Show after inquiry approved
                </option>
                <option value="show_to_verified_users">
                  Show to verified users only
                </option>
                <option value="hidden">Always hidden</option>
              </select>
              <p className="text-xs text-zinc-400 mt-1">
                Controls when buyers/brokers can see your contact number. Your
                number is never shown in public listings or search.
              </p>
            </FormField>

            <FormField label="Map Visibility">
              <select
                value={form.map_visibility}
                onChange={(e) =>
                  setField(
                    "map_visibility",
                    e.target.value as "hidden" | "approximate" | "exact"
                  )
                }
                className="form-select"
              >
                <option value="hidden">Hidden</option>
                <option value="approximate">Approximate area only</option>
                <option value="exact">Exact location</option>
              </select>
              <p className="text-xs text-zinc-400 mt-1">
                Maps render only after the maps provider is configured (Phase 11)
                — this preference is stored now.
              </p>
            </FormField>
          </div>
        )}

        {/* STEP 8: Preview (public detail layout in a "not yet live" frame) */}
        {step === 8 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Preview</h2>

            <div className="rounded-xl border-2 border-dashed border-brand/40 bg-brand-soft/40 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-brand/20 bg-brand-soft px-4 py-2.5">
                <Eye className="h-4 w-4 text-brand" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Preview — not yet live
                </span>
              </div>

              <div className="space-y-3 bg-white p-4 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <SummaryRow label="Title" value={form.title} />
                  <EditLink onEdit={() => goToStep(1)} />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <SummaryRow
                      label="Purpose"
                      value={PURPOSE_LABELS[form.purpose]}
                    />
                    <SummaryRow
                      label="Category"
                      value={CATEGORY_LABELS[form.category]}
                    />
                    <SummaryRow
                      label="Type"
                      value={
                        TYPE_LABELS[form.property_type] ?? form.property_type
                      }
                    />
                  </div>
                  <EditLink onEdit={() => goToStep(2)} />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    {showPriceField && form.price && (
                      <SummaryRow
                        label="Price"
                        value={`₹${parseFloat(form.price).toLocaleString("en-IN")}`}
                      />
                    )}
                    {showRentField && form.rent_amount && (
                      <SummaryRow
                        label="Rent"
                        value={`₹${parseFloat(form.rent_amount).toLocaleString("en-IN")}/mo`}
                      />
                    )}
                    {form.area_value && (
                      <SummaryRow
                        label="Area"
                        value={`${form.area_value} ${form.area_unit.replace(/_/g, " ")}`}
                      />
                    )}
                  </div>
                  <EditLink onEdit={() => goToStep(3)} />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <SummaryRow label="City" value={form.city_text || "—"} />
                    {form.locality_text && (
                      <SummaryRow label="Locality" value={form.locality_text} />
                    )}
                  </div>
                  <EditLink onEdit={() => goToStep(4)} />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <SummaryRow
                    label="Contact Visibility"
                    value={form.contact_visibility.replace(/_/g, " ")}
                  />
                  <EditLink onEdit={() => goToStep(7)} />
                </div>
              </div>
            </div>

            <Alert tone="info">
              <strong>What happens next:</strong> Your property will be
              submitted for admin review. It will not be visible publicly until
              approved. You will be notified when it is approved or needs
              changes.
            </Alert>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600">
              By submitting, you confirm this property information is accurate.
              My Gujarat Property is a listing platform — all property documents
              must be independently verified before any transaction.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
            >
              ← Back
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {savedId && step < LAST_INPUT_STEP && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  startTransition(async () => {
                    await saveDraft();
                  })
                }
                disabled={isPending}
              >
                Save Draft
              </Button>
            )}

            {step < LAST_INPUT_STEP && (
              <Button type="button" onClick={handleNext} loading={isPending}>
                {isPending ? "Saving…" : "Continue →"}
              </Button>
            )}

            {step === LAST_INPUT_STEP && (
              <Button
                type="button"
                onClick={handleSubmitForApproval}
                loading={isPending}
                disabled={!savedId}
              >
                {isPending ? "Submitting…" : "Submit for Approval"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
