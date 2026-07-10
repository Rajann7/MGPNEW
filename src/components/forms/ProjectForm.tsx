"use client";

import { useState, useTransition } from "react";
import { ShieldCheck, Check } from "lucide-react";
import {
  createProjectDraft,
  updateProjectDraft,
  submitProjectForApproval,
} from "@/lib/actions/projects";
import { MediaUploadStep } from "@/components/forms/wizard/MediaUploadStep";
import { WizardFooter } from "@/components/forms/wizard/WizardFooter";
import { useWizardAutosave } from "@/components/forms/wizard/useWizardAutosave";
import {
  PROJECT_TYPES,
  PROJECT_CATEGORIES,
  PROJECT_PURPOSES,
} from "@/lib/validators/project";
import { Stepper } from "@/components/ui/Stepper";
import { FormField, SummaryRow } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import type { Project } from "@/types";

const PURPOSE_LABELS: Record<string, string> = {
  sell: "Sell",
  rent: "Rent",
  lease: "Lease",
};

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  land_plot: "Land / Plot",
  township: "Township",
  mixed_use: "Mixed Use",
  society: "Society",
  industrial_zone: "Industrial Zone",
};

const TYPE_LABELS: Record<string, string> = {
  apartment_project: "Apartment Project",
  villa_project: "Villa Project",
  plotting_project: "Plotting Project",
  commercial_project: "Commercial Project",
  industrial_project: "Industrial Project",
  township_project: "Township Project",
  mixed_use_project: "Mixed Use Project",
  society_project: "Society Project",
  industrial_zone_project: "Industrial Zone Project",
};

const CONSTRUCTION_STATUS_LABELS: Record<string, string> = {
  pre_launch: "Pre-Launch",
  under_construction: "Under Construction",
  nearing_possession: "Nearing Possession",
  ready_to_move: "Ready to Move",
  completed: "Completed",
};

const PROJECT_AMENITIES = [
  "Clubhouse",
  "Swimming pool",
  "Gymnasium",
  "Children's play area",
  "Landscaped garden",
  "24x7 security",
  "Power backup",
  "Covered parking",
  "Lift",
  "Indoor games",
];

/** Gujarat RERA reference format: PR/GJ/CITY/YYYY/NNNNN — light live mask. */
const RERA_PATTERN = /^PR\/GJ\/[A-Z]+\/\d{4}\/\d+$/;
function maskRera(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9/]/g, "")
    .slice(0, 40);
}

interface Props {
  existing?: Partial<Project>;
  mode: "create" | "edit";
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
const STEPS = [
  "Basics",
  "Type & RERA",
  "Location",
  "Units",
  "Amenities",
  "Timeline",
  "Media",
  "Contact",
  "Preview",
];

const chip = (active: boolean) =>
  [
    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
    active
      ? "border-brand bg-brand-soft text-brand"
      : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
  ].join(" ");

export function ProjectForm({ existing, mode }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    project_name: existing?.project_name ?? "",
    project_type: existing?.project_type ?? "",
    category: existing?.category ?? "residential",
    purpose: existing?.purpose ?? "sell",
    short_description: existing?.short_description ?? "",
    description: existing?.description ?? "",
    price_min: existing?.price_min?.toString() ?? "",
    price_max: existing?.price_max?.toString() ?? "",
    price_visible: existing?.price_visible ?? true,
    total_area_value: existing?.total_area_value?.toString() ?? "",
    total_area_unit: existing?.total_area_unit ?? "sq_ft",
    total_towers: existing?.total_towers?.toString() ?? "",
    total_wings: existing?.total_wings?.toString() ?? "",
    total_floors: existing?.total_floors?.toString() ?? "",
    total_units: existing?.total_units?.toString() ?? "",
    construction_status: existing?.construction_status ?? "",
    possession_date: existing?.possession_date ?? "",
    launch_date: existing?.launch_date ?? "",
    phase_name: existing?.phase_name ?? "",
    rera_registered: existing?.rera_registered ?? false,
    rera_number: existing?.rera_number ?? "",
    rera_status: existing?.rera_status ?? "",
    rera_valid_until: existing?.rera_valid_until ?? "",
    rera_disclaimer_required: existing?.rera_disclaimer_required ?? true,
    city_text: existing?.city_text ?? "",
    locality_text: existing?.locality_text ?? "",
    landmark: existing?.landmark ?? "",
    address_line: existing?.address_line ?? "",
    pin_code: existing?.pin_code ?? "",
    map_visibility: existing?.map_visibility ?? "approximate",
    virtual_tour_url: existing?.virtual_tour_url ?? "",
    video_url: existing?.video_url ?? "",
  });
  const [amenities, setAmenities] = useState<string[]>(
    (existing?.amenities as string[] | undefined) ?? []
  );

  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [savedId, setSavedId] = useState<string | null>(existing?.id ?? null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  function toggleAmenity(a: string) {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }

  function buildPayload() {
    return {
      project_name: form.project_name,
      project_type: form.project_type as Project["project_type"],
      category: form.category as Project["category"],
      purpose: form.purpose as Project["purpose"],
      short_description: form.short_description || undefined,
      description: form.description || undefined,
      price_min: form.price_min ? parseFloat(form.price_min) : undefined,
      price_max: form.price_max ? parseFloat(form.price_max) : undefined,
      price_visible: form.price_visible,
      total_area_value: form.total_area_value
        ? parseFloat(form.total_area_value)
        : undefined,
      total_area_unit: (form.total_area_unit ||
        undefined) as Project["total_area_unit"],
      total_towers: form.total_towers ? parseInt(form.total_towers) : undefined,
      total_wings: form.total_wings ? parseInt(form.total_wings) : undefined,
      total_floors: form.total_floors ? parseInt(form.total_floors) : undefined,
      total_units: form.total_units ? parseInt(form.total_units) : undefined,
      unit_configurations: [],
      construction_status: (form.construction_status ||
        undefined) as Project["construction_status"],
      possession_date: form.possession_date || undefined,
      launch_date: form.launch_date || undefined,
      phase_name: form.phase_name || undefined,
      rera_registered: form.rera_registered,
      rera_number: form.rera_number || undefined,
      rera_status: (form.rera_status || undefined) as Project["rera_status"],
      rera_valid_until: form.rera_valid_until || undefined,
      rera_disclaimer_required: form.rera_disclaimer_required,
      amenities,
      specifications: {},
      city_text: form.city_text || undefined,
      locality_text: form.locality_text || undefined,
      landmark: form.landmark || undefined,
      address_line: form.address_line || undefined,
      pin_code: form.pin_code || undefined,
      map_visibility: form.map_visibility as "hidden" | "approximate" | "exact",
      virtual_tour_url: form.virtual_tour_url || undefined,
      video_url: form.video_url || undefined,
    };
  }

  async function saveDraft(): Promise<boolean> {
    setServerError(null);
    const payload = buildPayload();
    if (mode === "create" && !savedId) {
      const res = await createProjectDraft(payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
      setSavedId(res.data.id);
    } else if (savedId) {
      const res = await updateProjectDraft(savedId, payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
    }
    return true;
  }

  const LAST_INPUT_STEP = 9 as const;
  const autosaveEligible =
    mode === "create" ||
    ["draft", "need_changes", "rejected"].includes(existing?.status ?? "");

  const { status: saveStatus, saveNow } = useWizardAutosave({
    enabled: autosaveEligible && form.project_name.trim().length >= 3,
    fingerprint: JSON.stringify({ form, amenities, step }),
    save: saveDraft,
  });

  async function handleNext() {
    setServerError(null);
    if (step === 1) {
      if (!form.project_name.trim() || form.project_name.length < 3) {
        setFieldErrors({
          project_name: ["Project name must be at least 3 characters"],
        });
        return;
      }
    }
    if (step === 2) {
      if (!form.project_type) {
        setFieldErrors({ project_type: ["Please select a project type"] });
        return;
      }
      if (form.rera_registered && !form.rera_number.trim()) {
        setFieldErrors({
          rera_number: ["RERA number is required when RERA registered"],
        });
        return;
      }
    }
    if (step === 3 && !form.city_text.trim()) {
      setFieldErrors({ city_text: ["City is required"] });
      return;
    }
    startTransition(async () => {
      const saved = await saveDraft();
      if (saved) setStep((s) => Math.min(9, s + 1) as Step);
    });
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1) as Step);
    setServerError(null);
    setFieldErrors({});
  }

  async function handleSubmit() {
    if (!savedId) return;
    setServerError(null);
    startTransition(async () => {
      const res = await submitProjectForApproval(savedId, buildPayload());
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return;
      }
      setSubmitSuccess(true);
    });
  }

  if (submitSuccess) {
    return (
      <SuccessScreen
        title="Project submitted for approval"
        description="Your project is Pending review — it will not be visible publicly until our team approves it. RERA details are verified before approval; no RERA badge is issued automatically."
        actionLabel="View My Projects"
        actionHref="/dashboard/builder/projects"
      />
    );
  }

  const reraValid = !form.rera_number || RERA_PATTERN.test(form.rera_number);

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper steps={STEPS} current={step} />

      {serverError && (
        <Alert tone="danger" className="mb-4">
          {serverError === "ROLE_NOT_ALLOWED"
            ? "Only Builder accounts can post projects."
            : "Something went wrong. Please try again."}
        </Alert>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        {/* STEP 1 · PROJECT BASICS */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Project basics</h2>
            <FormField
              label="Project Name"
              required
              error={fieldErrors.project_name?.[0]}
            >
              <input
                type="text"
                value={form.project_name}
                onChange={(e) => setField("project_name", e.target.value)}
                placeholder="e.g. Sankalp Grand Vista"
                maxLength={200}
                className="form-input"
                aria-required="true"
              />
            </FormField>
            <FormField label="Purpose" required>
              <div className="flex gap-2">
                {PROJECT_PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setField("purpose", p)}
                    aria-pressed={form.purpose === p}
                    className={[
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                      form.purpose === p
                        ? "border-brand bg-brand text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
                    ].join(" ")}
                  >
                    {PURPOSE_LABELS[p]}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Category" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PROJECT_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setField("category", c);
                      setField("project_type", "");
                    }}
                    aria-pressed={form.category === c}
                    className={[
                      "rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors",
                      form.category === c
                        ? "border-brand bg-brand text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
                    ].join(" ")}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Short Description">
              <input
                type="text"
                value={form.short_description}
                onChange={(e) => setField("short_description", e.target.value)}
                placeholder="One-line tagline for the project"
                maxLength={300}
                className="form-input"
              />
            </FormField>
          </div>
        )}

        {/* STEP 2 · TYPE & RERA (gate + live format mask) */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Type &amp; RERA</h2>
            <FormField
              label="Project Type"
              required
              error={fieldErrors.project_type?.[0]}
            >
              <select
                value={form.project_type}
                onChange={(e) => setField("project_type", e.target.value)}
                className="form-select"
                aria-required="true"
              >
                <option value="">Select type…</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </FormField>

            <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-200 p-3.5">
              <input
                type="checkbox"
                checked={form.rera_registered}
                onChange={(e) => setField("rera_registered", e.target.checked)}
                className="h-[18px] w-[18px] rounded accent-brand"
              />
              <span className="text-sm font-medium text-zinc-800">
                This project is RERA registered
              </span>
            </label>

            {form.rera_registered && (
              <>
                <FormField
                  label="RERA Number"
                  required
                  error={fieldErrors.rera_number?.[0]}
                >
                  <input
                    type="text"
                    value={form.rera_number}
                    onChange={(e) =>
                      setField("rera_number", maskRera(e.target.value))
                    }
                    placeholder="PR/GJ/AHMEDABAD/2026/01234"
                    className="form-input font-mono"
                  />
                  <p
                    className={[
                      "mt-1.5 text-[11px]",
                      form.rera_number && !reraValid
                        ? "text-amber-600"
                        : "text-zinc-500",
                    ].join(" ")}
                  >
                    Format: PR/GJ/CITY/YYYY/NNNNN
                    {form.rera_number
                      ? reraValid
                        ? " · looks valid"
                        : " · check the format"
                      : ""}
                  </p>
                </FormField>
                <FormField label="RERA Status">
                  <select
                    value={form.rera_status}
                    onChange={(e) => setField("rera_status", e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select…</option>
                    <option value="applied">Applied</option>
                    <option value="registered">Registered</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </FormField>
                <FormField label="RERA Valid Until">
                  <input
                    type="date"
                    value={form.rera_valid_until}
                    onChange={(e) =>
                      setField("rera_valid_until", e.target.value)
                    }
                    className="form-input"
                  />
                </FormField>
              </>
            )}

            <Alert tone="warning">
              RERA is not verified automatically. Buyers should independently
              verify at <strong>rera.gujarat.gov.in</strong>. No fake RERA badge
              is shown — our team checks RERA before approval.
            </Alert>
          </div>
        )}

        {/* STEP 3 · LOCATION */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Location</h2>
            <FormField label="City" required error={fieldErrors.city_text?.[0]}>
              <input
                type="text"
                value={form.city_text}
                onChange={(e) => setField("city_text", e.target.value)}
                placeholder="e.g. Surat"
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
                placeholder="e.g. Vesu, Shela"
                maxLength={100}
                className="form-input"
              />
            </FormField>
            <FormField label="Landmark">
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => setField("landmark", e.target.value)}
                placeholder="e.g. Near VR Mall"
                maxLength={200}
                className="form-input"
              />
            </FormField>
            <FormField label="PIN Code">
              <input
                type="text"
                value={form.pin_code}
                onChange={(e) =>
                  setField("pin_code", e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="6-digit PIN"
                className="form-input"
                inputMode="numeric"
              />
            </FormField>
          </div>
        )}

        {/* STEP 4 · WINGS / TOWERS / UNITS */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Wings / towers / units
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Total Towers">
                <input
                  type="number"
                  value={form.total_towers}
                  onChange={(e) => setField("total_towers", e.target.value)}
                  min="1"
                  placeholder="e.g. 4"
                  className="form-input"
                />
              </FormField>
              <FormField label="Total Wings">
                <input
                  type="number"
                  value={form.total_wings}
                  onChange={(e) => setField("total_wings", e.target.value)}
                  min="1"
                  placeholder="e.g. 8"
                  className="form-input"
                />
              </FormField>
              <FormField label="Total Floors">
                <input
                  type="number"
                  value={form.total_floors}
                  onChange={(e) => setField("total_floors", e.target.value)}
                  min="1"
                  placeholder="e.g. 14"
                  className="form-input"
                />
              </FormField>
              <FormField label="Total Units">
                <input
                  type="number"
                  value={form.total_units}
                  onChange={(e) => setField("total_units", e.target.value)}
                  min="1"
                  placeholder="e.g. 240"
                  className="form-input"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Min Price (₹)">
                <input
                  type="number"
                  value={form.price_min}
                  onChange={(e) => setField("price_min", e.target.value)}
                  min="0"
                  placeholder="Starting from"
                  className="form-input"
                />
              </FormField>
              <FormField label="Max Price (₹)">
                <input
                  type="number"
                  value={form.price_max}
                  onChange={(e) => setField("price_max", e.target.value)}
                  min="0"
                  placeholder="Up to"
                  className="form-input"
                />
              </FormField>
            </div>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={form.price_visible}
                onChange={(e) => setField("price_visible", e.target.checked)}
                className="h-[18px] w-[18px] rounded accent-brand"
              />
              <span className="text-sm text-zinc-700">Show price publicly</span>
            </label>
            <p className="text-[11px] text-zinc-500">
              Per-unit inventory (Tower / floor / On-hold status) is managed from
              the project&rsquo;s Unit Inventory after approval.
            </p>
          </div>
        )}

        {/* STEP 5 · AMENITIES */}
        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {PROJECT_AMENITIES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  aria-pressed={amenities.includes(a)}
                  className={chip(amenities.includes(a))}
                >
                  {a}
                </button>
              ))}
            </div>
            <FormField label="Full Description">
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={4}
                maxLength={10000}
                placeholder="Describe the project, specifications and USPs…"
                className="form-input resize-none"
              />
            </FormField>
          </div>
        )}

        {/* STEP 6 · TIMELINES & PROGRESS */}
        {step === 6 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Timelines &amp; progress
            </h2>
            <FormField label="Construction Status">
              <select
                value={form.construction_status}
                onChange={(e) => setField("construction_status", e.target.value)}
                className="form-select"
              >
                <option value="">Select…</option>
                {Object.entries(CONSTRUCTION_STATUS_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Launch Date">
                <input
                  type="date"
                  value={form.launch_date}
                  onChange={(e) => setField("launch_date", e.target.value)}
                  className="form-input"
                />
              </FormField>
              <FormField label="Possession Date">
                <input
                  type="date"
                  value={form.possession_date}
                  onChange={(e) => setField("possession_date", e.target.value)}
                  className="form-input"
                />
              </FormField>
            </div>
            <FormField label="Phase Name">
              <input
                type="text"
                value={form.phase_name}
                onChange={(e) => setField("phase_name", e.target.value)}
                placeholder="e.g. Phase 1, Tower A"
                maxLength={100}
                className="form-input"
              />
            </FormField>
          </div>
        )}

        {/* STEP 7 · MEDIA (real Supabase Storage upload) */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Media</h2>
            <MediaUploadStep
              ownerType="project"
              ownerId={savedId}
              allowBrochure
            />
            <FormField label="Project Video URL (optional)">
              <input
                type="url"
                value={form.video_url}
                onChange={(e) => setField("video_url", e.target.value)}
                placeholder="https://…"
                className="form-input"
              />
            </FormField>
            <FormField label="Virtual Tour / 360° URL (optional)">
              <input
                type="url"
                value={form.virtual_tour_url}
                onChange={(e) => setField("virtual_tour_url", e.target.value)}
                placeholder="https://…"
                className="form-input"
              />
            </FormField>
          </div>
        )}

        {/* STEP 8 · CONTACT */}
        {step === 8 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Contact</h2>
            <Alert tone="info">
              Project contact is shown to logged-in users on the detail page.
              Guests must log in first — your number is never exposed publicly.
            </Alert>
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
                <option value="approximate">Approximate area only</option>
                <option value="exact">Exact location</option>
                <option value="hidden">Hidden</option>
              </select>
            </FormField>
          </div>
        )}

        {/* STEP 9 · PREVIEW */}
        {step === 9 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Preview &amp; submit</h2>
            <div className="space-y-3 rounded-xl bg-zinc-50 p-4 text-sm">
              <SummaryRow label="Project Name" value={form.project_name} />
              <SummaryRow
                label="Type"
                value={TYPE_LABELS[form.project_type] ?? form.project_type}
              />
              <SummaryRow label="Purpose" value={PURPOSE_LABELS[form.purpose]} />
              <SummaryRow label="City" value={form.city_text || "—"} />
              {form.total_units && (
                <SummaryRow label="Units" value={form.total_units} />
              )}
              {amenities.length > 0 && (
                <SummaryRow label="Amenities" value={`${amenities.length} selected`} />
              )}
              {form.construction_status && (
                <SummaryRow
                  label="Status"
                  value={
                    CONSTRUCTION_STATUS_LABELS[form.construction_status] ??
                    form.construction_status
                  }
                />
              )}
            </div>

            {form.rera_registered && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold text-[#3B4FC0]">
                <ShieldCheck className="h-3 w-3" />
                Pending · RERA check
              </div>
            )}

            <Alert tone="info">
              Project is reviewed by our team before going public — it submits as{" "}
              <strong>Pending</strong>. The RERA disclaimer is shown to buyers; no
              RERA verification badge is issued automatically.
            </Alert>
          </div>
        )}

        <WizardFooter
          step={step}
          lastInputStep={LAST_INPUT_STEP}
          isPending={isPending}
          saveStatus={saveStatus}
          canSaveDraft={!!savedId}
          submitLabel="Submit for approval"
          onBack={handleBack}
          onSaveDraft={() => startTransition(async () => { await saveNow(); })}
          onContinue={handleNext}
          onSubmit={handleSubmit}
          backHref="/dashboard/builder/projects"
        />
      </div>

      {step === 9 && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-400">
          <Check className="h-3 w-3" /> Draft saved · resume anytime from My
          Projects
        </p>
      )}
    </div>
  );
}
