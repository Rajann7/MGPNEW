"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  createPropertyDraft,
  updatePropertyDraft,
  autosavePropertyDraft,
  submitPropertyForApproval,
} from "@/lib/actions/properties";
import { WizardFooter } from "@/components/forms/wizard/WizardFooter";
import { useWizardAutosave } from "@/components/forms/wizard/useWizardAutosave";
import { MediaUploadStep } from "@/components/forms/wizard/MediaUploadStep";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES_BY_CATEGORY,
  PROPERTY_PURPOSES,
  AREA_UNITS,
} from "@/lib/validators/property";
import { WizardProgress } from "@/components/forms/WizardProgress";
import { GUJARAT_CITIES } from "@/components/location/CityProvider";
import { FormField, SummaryRow } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { Eye, ArrowLeft } from "lucide-react";
import type { Property } from "@/types";

/** Canonical property amenities master list (design Batch 5 · 5A step 5) —
 * grouped like the wireframe (Basic / Safety / Lifestyle). Real, persisted
 * checklist — the old step 5 hardcoded `amenities: []` and never actually
 * collected this; ad-hoc list precedent already exists for projects
 * (ProjectForm's PROJECT_AMENITIES). */
const AMENITY_GROUPS: { group: string; items: string[] }[] = [
  {
    group: "Basic",
    items: ["parking", "lift", "power_backup", "water_supply"],
  },
  {
    group: "Safety",
    items: ["24x7_security", "cctv", "fire_safety", "gated_society"],
  },
  {
    group: "Lifestyle",
    items: [
      "swimming_pool",
      "gymnasium",
      "landscaped_garden",
      "children_play_area",
      "clubhouse",
      "indoor_games",
    ],
  },
];

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
  /** Where the mobile contextual header's back chevron returns to. */
  dashboardHref: string;
  /** Poster's own verified Profile mobile (Batch 5 §106-107) — never an arbitrary/unverified number. */
  profileMobile: string | null;
  profileMobileVerified: boolean;
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

export function PropertyForm({
  existing,
  mode,
  dashboardHref,
  profileMobile,
  profileMobileVerified,
}: Props) {
  // Resume the exact persisted wizard step (Batch 5 §38-39)
  const initialStep = Math.min(
    LAST_INPUT_STEP,
    Math.max(1, existing?.current_step ?? 1)
  ) as Step;
  const [step, setStep] = useState<Step>(initialStep);
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
    property_age: existing?.property_age ?? "",
    maintenance_amount: existing?.maintenance_amount?.toString() ?? "",
    plot_area: existing?.plot_area?.toString() ?? "",
    available_from: existing?.available_from ?? "",
    amenities: existing?.amenities ?? ([] as string[]),
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
    preferred_contact_time: existing?.preferred_contact_time ?? "anytime",
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorMeta, setServerErrorMeta] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [savedId, setSavedId] = useState<string | null>(existing?.id ?? null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Belt-and-suspenders duplicate-submit guard (Batch 5 §129): closes the
  // race where a second real click lands before `isPending` re-renders.
  // The server's conditional status transition is the real authority.
  const submitInFlightRef = useRef(false);

  // Additional Details — free-form key/value extras (design's "extra field
  // section"), persisted to the real `extra_attributes` jsonb column
  // (previously hardcoded to `{}` and never actually collected).
  const [extraDetails, setExtraDetails] = useState<
    { key: string; value: string }[]
  >(
    existing?.extra_attributes && typeof existing.extra_attributes === "object"
      ? Object.entries(existing.extra_attributes as Record<string, string>).map(
          ([key, value]) => ({ key, value: String(value) })
        )
      : []
  );

  const availableTypes = PROPERTY_TYPES_BY_CATEGORY[form.category] ?? [];

  // Property-type/purpose-aware field visibility (design Batch 5 · 5A —
  // fields shown must match what's actually meaningful for the selected
  // category/type/purpose combination, not a one-size-fits-all form).
  const isLand = form.category === "land_plot";
  const isBusinessSale = form.category === "business";
  const isPgRoom = form.category === "pg_hostel_room";
  const showPriceField = ["sell", "business_sale"].includes(form.purpose);
  const showRentField = ["rent", "lease", "pg"].includes(form.purpose);
  const showBedrooms = form.category === "residential" || isPgRoom;
  const showFloors = !isLand && !isBusinessSale;
  const showBuiltCarpetArea = !isLand && !isBusinessSale;
  const showPlotArea = isLand;
  const showFurnishingParkingFacing = !isLand && !isBusinessSale;
  const showPossessionAge = !isBusinessSale;

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
      property_age: (form.property_age || undefined) as
        | "new_construction"
        | "under_1_year"
        | "1_to_3_years"
        | "3_to_5_years"
        | "5_to_10_years"
        | "above_10_years"
        | undefined,
      maintenance_amount: form.maintenance_amount
        ? parseFloat(form.maintenance_amount)
        : undefined,
      plot_area: form.plot_area ? parseFloat(form.plot_area) : undefined,
      available_from: form.available_from || undefined,
      amenities: form.amenities,
      extra_attributes: Object.fromEntries(
        extraDetails
          .filter((d) => d.key.trim() && d.value.trim())
          .map((d) => [d.key.trim(), d.value.trim()])
      ),
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
      preferred_contact_time: form.preferred_contact_time as
        "anytime" | "morning_9_1" | "evening_5_9",
      current_step: step,
    };
  }

  // Last server timestamp we observed — optimistic-concurrency token so an
  // older in-flight autosave can never clobber newer data (Batch 5 §37).
  const baseUpdatedAtRef = useRef<string | null>(existing?.updated_at ?? null);
  const savedIdRef = useRef<string | null>(existing?.id ?? null);

  // Autosave only ever touches unsubmitted revisions — a published listing
  // being edited (edit-after-approval) is saved solely on explicit actions.
  const autosaveEligible =
    mode === "create" ||
    ["draft", "need_changes", "rejected"].includes(existing?.status ?? "");

  async function saveDraft() {
    setServerError(null);
    const payload = buildPayload();

    if (autosaveEligible) {
      const res = await autosavePropertyDraft(
        savedIdRef.current,
        payload,
        baseUpdatedAtRef.current
      );
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
      savedIdRef.current = res.data.id;
      setSavedId(res.data.id);
      if (res.data.conflict) {
        setServerError("DRAFT_CONFLICT");
        return false;
      }
      baseUpdatedAtRef.current = res.data.updated_at;
      return true;
    }

    // Published/paused listing edit — explicit update only (no autosave)
    if (savedIdRef.current) {
      const res = await updatePropertyDraft(savedIdRef.current, payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
      return true;
    }
    const res = await createPropertyDraft(payload);
    if (!res.success) {
      setServerError(res.error);
      if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
      return false;
    }
    savedIdRef.current = res.data.id;
    setSavedId(res.data.id);
    return true;
  }

  // Debounced autosave — creates the server draft at the earliest valid
  // point (step 1 title typed) and keeps it fresh as the user types (§34).
  const { status: saveStatus, saveNow } = useWizardAutosave({
    enabled: autosaveEligible && form.title.trim().length >= 5,
    fingerprint: JSON.stringify({ form, extraDetails, step }),
    save: saveDraft,
  });

  async function handleNext() {
    setServerError(null);
    // Client-side step validation — every required field is checked before
    // Continue is allowed to proceed, matching what the server will enforce
    // (design Batch 5: "N fields need attention" banner + red borders).
    const stepErrors: Record<string, string[]> = {};
    if (step === 1) {
      if (!form.title.trim() || form.title.length < 5) {
        stepErrors.title = ["Title must be at least 5 characters"];
      }
      if (!form.description.trim() || form.description.trim().length < 30) {
        stepErrors.description = ["Description must be at least 30 characters"];
      }
    }
    if (step === 2) {
      if (!form.property_type) {
        stepErrors.property_type = ["Please select a property type"];
      }
    }
    if (step === 3) {
      if (showPriceField && (!form.price || parseFloat(form.price) <= 0)) {
        stepErrors.price = ["Sale price is required"];
      }
      if (
        showRentField &&
        (!form.rent_amount || parseFloat(form.rent_amount) <= 0)
      ) {
        stepErrors.rent_amount = ["Monthly rent / lease is required"];
      }
    }
    if (step === 4) {
      if (!form.city_text.trim()) {
        stepErrors.city_text = ["City is required"];
      }
    }
    if (Object.keys(stepErrors).length > 0) {
      setFieldErrors(stepErrors);
      return;
    }

    // `PropertyDraftSchema` accepts a null purpose/category/property_type
    // while status="draft" (Batch 5 §16-18) — so Step 1 now persists a real
    // server draft on title alone instead of only advancing locally, closing
    // the "type Step 1 → close tab → lose it" gap the old workaround left.
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
    if (!savedId || submitInFlightRef.current) return;
    submitInFlightRef.current = true;
    setServerError(null);
    setServerErrorMeta(null);
    startTransition(async () => {
      const payload = buildPayload();
      const res = await submitPropertyForApproval(savedId, payload);
      submitInFlightRef.current = false;
      if (!res.success) {
        setServerError(res.error);
        setServerErrorMeta(res.meta ?? null);
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

  const errorCount = Object.keys(fieldErrors).length;
  const errorFieldLabels: Record<string, string> = {
    title: "Listing title",
    description: "Description",
    property_type: "Property type",
    city_text: "City",
    price: "Sale price",
    rent_amount: "Monthly rent",
    carpet_area: "Carpet area",
  };

  return (
    <div className="mx-auto max-w-2xl pb-20 lg:pb-0">
      {/* Mobile/tablet contextual header (design Batch 5 shell) — the
       * DashboardShellV2 sidebar/topbar only appear at `lg` (1024px), so this
       * header must stay visible through tablet too, not just below `sm`
       * (640px) — a real gap caught live: 640-1023px showed no header at
       * all. */}
      <div className="-mx-4 mb-4 flex h-14 items-center justify-between border-b border-zinc-100 bg-white px-4 lg:hidden">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href={dashboardHref}
            aria-label="Back to dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <span className="truncate text-sm font-semibold text-zinc-900">
          Post a Property
        </span>
        {savedId ? (
          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                await saveDraft();
              })
            }
            disabled={isPending}
            className="text-xs font-medium text-brand disabled:opacity-50"
          >
            Save Draft
          </button>
        ) : (
          <span className="w-[64px]" aria-hidden="true" />
        )}
      </div>

      <WizardProgress steps={STEPS.slice(0, LAST_INPUT_STEP)} current={step} />

      {errorCount > 0 && (
        <Alert tone="danger" className="mb-4">
          <strong>
            {errorCount} field{errorCount > 1 ? "s" : ""} need
            {errorCount > 1 ? "" : "s"} attention
          </strong>{" "}
          —{" "}
          {Object.keys(fieldErrors)
            .map((k) => errorFieldLabels[k] ?? k)
            .join(", ")}
        </Alert>
      )}

      {serverError && (
        <Alert tone="danger" className="mb-4">
          {serverError === "ROLE_NOT_ALLOWED"
            ? "Your account role is not allowed to post properties."
            : serverError === "AUTH_REQUIRED"
              ? "Please log in to continue."
              : serverError === "VALIDATION_ERROR"
                ? "Please fix the errors below."
                : serverError === "MEDIA_REQUIRED"
                  ? `Add at least ${serverErrorMeta?.photosRequired ?? 3} photos before submitting — you have ${serverErrorMeta?.photoCount ?? 0} so far. Go to the Media step to add more.`
                  : serverError === "LIMIT_EXCEEDED"
                    ? `You've used ${serverErrorMeta?.used ?? "all"}${serverErrorMeta?.limit != null ? ` of ${serverErrorMeta.limit}` : ""} listings on your ${serverErrorMeta?.planName ?? "current"} plan. Upgrade your plan to post more.`
                    : serverError === "SUBSCRIPTION_REQUIRED"
                      ? "Your plan doesn't include posting properties. Upgrade to continue."
                      : serverError === "STRUCTURE_LOCKED"
                        ? "Some values can't be changed right now."
                        : serverError === "DRAFT_CONFLICT"
                          ? "This draft was updated somewhere else (another tab?). Reload to continue from the latest version."
                          : "Something went wrong. Please try again."}
          {serverError === "LIMIT_EXCEEDED" && (
            <>
              {" "}
              <a href="/pricing" className="font-semibold underline">
                View plans
              </a>
            </>
          )}
          {serverError === "DRAFT_CONFLICT" && (
            <>
              {" "}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="font-semibold underline"
              >
                Reload
              </button>
            </>
          )}
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

            <FormField
              label="Description"
              required
              error={fieldErrors.description?.[0]}
              hint="Min 30 characters"
            >
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={5}
                maxLength={5000}
                placeholder="Describe the property, key features, surroundings…"
                className="form-input resize-none"
                aria-required="true"
              />
              <p
                className={
                  form.description.trim().length > 0 &&
                  form.description.trim().length < 30
                    ? "text-xs text-amber-600 mt-1"
                    : "text-xs text-zinc-400 mt-1"
                }
              >
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
            <h2 className="text-lg font-bold text-zinc-900">
              Price &amp; Area
            </h2>

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

            <FormField label="Maintenance / Society Charges (₹/month)">
              <input
                type="number"
                value={form.maintenance_amount}
                onChange={(e) => setField("maintenance_amount", e.target.value)}
                min="0"
                placeholder="Optional"
                className="form-input"
              />
            </FormField>

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
              <FormField label="Plot Area (sq ft)">
                <input
                  type="number"
                  value={form.plot_area}
                  onChange={(e) => setField("plot_area", e.target.value)}
                  min="0"
                  placeholder="Total plot area"
                  className="form-input"
                />
              </FormField>
            )}

            {showBuiltCarpetArea && (
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
              <select
                value={form.city_text}
                onChange={(e) => setField("city_text", e.target.value)}
                className="form-select"
                aria-required="true"
              >
                <option value="">Select city…</option>
                {GUJARAT_CITIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
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

            {showFurnishingParkingFacing && (
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
            )}

            {showPossessionAge && (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Possession Status">
                  <select
                    value={form.possession_status}
                    onChange={(e) =>
                      setField("possession_status", e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="">—</option>
                    <option value="ready_to_move">Ready to Move</option>
                    <option value="under_construction">
                      Under Construction
                    </option>
                    <option value="on_request">On Request</option>
                  </select>
                </FormField>
                <FormField label="Property Age">
                  <select
                    value={form.property_age}
                    onChange={(e) => setField("property_age", e.target.value)}
                    className="form-select"
                  >
                    <option value="">—</option>
                    <option value="new_construction">New Construction</option>
                    <option value="under_1_year">Under 1 Year</option>
                    <option value="1_to_3_years">1–3 Years</option>
                    <option value="3_to_5_years">3–5 Years</option>
                    <option value="5_to_10_years">5–10 Years</option>
                    <option value="above_10_years">Above 10 Years</option>
                  </select>
                </FormField>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {showFurnishingParkingFacing && (
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
              )}
              <FormField label="Available From">
                <input
                  type="date"
                  value={form.available_from}
                  onChange={(e) => setField("available_from", e.target.value)}
                  className="form-input"
                />
              </FormField>
            </div>

            <FormField label="Amenities">
              <div className="space-y-3">
                {/* Type-aware amenity groups (Batch 5 §89): Lifestyle
                 * amenities (garden, gym, kids' play area…) aren't
                 * meaningful on Land/Plot or Business-sale listings. */}
                {AMENITY_GROUPS.filter(
                  (g) =>
                    !(g.group === "Lifestyle" && (isLand || isBusinessSale))
                ).map((g) => (
                  <div key={g.group}>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      {g.group}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((a) => {
                        const selected = form.amenities.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() =>
                              setField(
                                "amenities",
                                selected
                                  ? form.amenities.filter((x) => x !== a)
                                  : [...form.amenities, a]
                              )
                            }
                            aria-pressed={selected}
                            className={[
                              "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all",
                              selected
                                ? "border-brand bg-brand-soft text-brand"
                                : "border-zinc-200 bg-white text-zinc-600 hover:border-brand/40",
                            ].join(" ")}
                          >
                            {a.replace(/_/g, " ")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </FormField>

            <FormField
              label="Additional Details"
              hint="Anything else worth mentioning — e.g. Wash Rooms: 2, Water Source: Borewell."
            >
              <div className="space-y-2">
                {extraDetails.map((d, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={d.key}
                      onChange={(e) =>
                        setExtraDetails((prev) =>
                          prev.map((x, xi) =>
                            xi === i ? { ...x, key: e.target.value } : x
                          )
                        )
                      }
                      placeholder="Label (e.g. Wash Rooms)"
                      maxLength={60}
                      className="form-input flex-1"
                    />
                    <input
                      type="text"
                      value={d.value}
                      onChange={(e) =>
                        setExtraDetails((prev) =>
                          prev.map((x, xi) =>
                            xi === i ? { ...x, value: e.target.value } : x
                          )
                        )
                      }
                      placeholder="Value"
                      maxLength={100}
                      className="form-input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setExtraDetails((prev) =>
                          prev.filter((_, xi) => xi !== i)
                        )
                      }
                      aria-label="Remove detail"
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setExtraDetails((prev) => [...prev, { key: "", value: "" }])
                  }
                  className="text-xs font-medium text-brand hover:text-brand-hover"
                >
                  + Add detail
                </button>
              </div>
            </FormField>
          </div>
        )}

        {/* STEP 6: Media (real Supabase Storage upload) */}
        {step === 6 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Photos &amp; Media
            </h2>
            <MediaUploadStep ownerType="property" ownerId={savedId} />
          </div>
        )}

        {/* STEP 7: Contact */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Contact &amp; Visibility
            </h2>

            <FormField label="Confirm Contact Number">
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5">
                <span className="text-sm font-medium text-zinc-800">
                  {profileMobile ? `+91 ${profileMobile}` : "No mobile on file"}
                </span>
                {profileMobileVerified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
                    Not verified
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-zinc-400">
                Your number stays hidden until you approve a reveal request.
              </p>
            </FormField>

            <FormField label="Preferred Contact Time">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { v: "anytime", label: "Anytime" },
                    { v: "morning_9_1", label: "9 AM – 1 PM" },
                    { v: "evening_5_9", label: "5 – 9 PM" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setField("preferred_contact_time", o.v)}
                    aria-pressed={form.preferred_contact_time === o.v}
                    className={[
                      "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                      form.preferred_contact_time === o.v
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
                    ].join(" ")}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </FormField>

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
                Maps render only after the maps provider is configured (Phase
                11) — this preference is stored now.
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

        <WizardFooter
          step={step}
          lastInputStep={LAST_INPUT_STEP}
          isPending={isPending}
          saveStatus={saveStatus}
          canSaveDraft={!!savedId}
          submitLabel="Submit for Approval"
          onBack={handleBack}
          onSaveDraft={() =>
            startTransition(async () => {
              await saveNow();
            })
          }
          onContinue={handleNext}
          onSubmit={handleSubmitForApproval}
          backHref={dashboardHref}
        />
      </div>
    </div>
  );
}
