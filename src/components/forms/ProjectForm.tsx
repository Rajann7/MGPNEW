"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Plus, Trash2, Layers } from "lucide-react";
import {
  createProjectDraft,
  updateProjectDraft,
  submitProjectForApproval,
} from "@/lib/actions/projects";
import {
  getProjectWings,
  saveProjectWings,
  generateWingUnits,
} from "@/lib/actions/units";
import { MediaUploadStep } from "@/components/forms/wizard/MediaUploadStep";
import { WizardFooter } from "@/components/forms/wizard/WizardFooter";
import { useWizardAutosave } from "@/components/forms/wizard/useWizardAutosave";
import { WizardProgress } from "@/components/forms/WizardProgress";
import {
  PROJECT_TYPES,
  PROJECT_CATEGORIES,
  PROJECT_PURPOSES,
  PROJECT_AMENITIES,
} from "@/lib/validators/project";
import { FormField, SummaryRow } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import type { Project, ProjectWing } from "@/types";

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

/** Gujarat RERA reference format: PR/GJ/CITY/YYYY/NNNNN — light live mask. */
const RERA_PATTERN = /^PR\/GJ\/[A-Z]+\/\d{4}\/\d+$/;
function maskRera(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9/]/g, "")
    .slice(0, 40);
}

const chip = (active: boolean) =>
  [
    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
    active
      ? "border-brand bg-brand-soft text-brand"
      : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
  ].join(" ");

interface Props {
  existing?: Partial<Project>;
  mode: "create" | "edit";
  /** Where the mobile contextual header's back chevron / Step 1 Back returns to. */
  dashboardHref: string;
  /** Real verified Builder Profile — Developer field is prefilled and locked
   * from this, never a free-typed name (Batch 5 §136-138). */
  developerName: string | null;
  developerVerificationStatus: string | null;
}

// Post Project = 10 steps (Batch 5 §132). Step 10 "Submitted" is the success
// confirmation; the interactive wizard runs steps 1-9 (Preview submits).
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const LAST_INPUT_STEP = 9 as const;

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
  "Submitted",
];

/** Per-block "Edit" link inside the Preview frame. */
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

type WingRow = {
  key: string;
  id?: string;
  wing_name: string;
  floors: string;
  units_per_floor: string;
  units_generated?: boolean;
};

export function ProjectForm({
  existing,
  mode,
  dashboardHref,
  developerName,
  developerVerificationStatus,
}: Props) {
  const initialStep = Math.min(
    LAST_INPUT_STEP,
    Math.max(1, existing?.current_step ?? 1)
  ) as Step;
  const [step, setStep] = useState<Step>(initialStep);
  const [isPending, startTransition] = useTransition();
  const submitInFlightRef = useRef(false);

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
    construction_status: existing?.construction_status ?? "",
    possession_date: existing?.possession_date ?? "",
    launch_date: existing?.launch_date ?? "",
    phase_name: existing?.phase_name ?? "",
    construction_percentage:
      existing?.construction_percentage?.toString() ?? "",
    progress_note: existing?.progress_note ?? "",
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
    preferred_contact_time: existing?.preferred_contact_time ?? "anytime",
  });
  const [amenities, setAmenities] = useState<string[]>(
    (existing?.amenities as string[] | undefined) ?? []
  );

  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [savedId, setSavedId] = useState<string | null>(existing?.id ?? null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Structured Wing/Tower/Unit editor (Batch 5 §152-161) — backed by the
  // real `project_wings` table, not flat total_* counters.
  const [wings, setWings] = useState<WingRow[]>([]);
  const [wingsLoaded, setWingsLoaded] = useState(false);
  const [wingError, setWingError] = useState<string | null>(null);
  const [wingSaving, setWingSaving] = useState(false);
  const [generatingWing, setGeneratingWing] = useState<string | null>(null);
  const [generateMsg, setGenerateMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!savedId || wingsLoaded) return;
    getProjectWings(savedId).then((res) => {
      if (res.success) {
        setWings(
          res.data.map((w: ProjectWing) => ({
            key: w.id,
            id: w.id,
            wing_name: w.wing_name,
            floors: String(w.floors),
            units_per_floor: String(w.units_per_floor),
            units_generated: w.units_generated,
          }))
        );
      }
      setWingsLoaded(true);
    });
  }, [savedId, wingsLoaded]);

  function addWingRow() {
    setWings((prev) => [
      ...prev,
      {
        key: crypto.randomUUID(),
        wing_name: "",
        floors: "",
        units_per_floor: "",
      },
    ]);
  }
  function updateWingRow(key: string, patch: Partial<WingRow>) {
    setWings((prev) =>
      prev.map((w) => (w.key === key ? { ...w, ...patch } : w))
    );
  }
  function removeWingRow(key: string) {
    setWings((prev) => prev.filter((w) => w.key !== key));
  }

  async function saveWings(): Promise<boolean> {
    if (!savedId) return false;
    setWingError(null);
    const valid = wings.filter(
      (w) => w.wing_name.trim() && w.floors && w.units_per_floor
    );
    if (valid.length === 0) return true;
    setWingSaving(true);
    const res = await saveProjectWings(
      savedId,
      valid.map((w) => ({
        wing_name: w.wing_name.trim(),
        floors: parseInt(w.floors, 10),
        units_per_floor: parseInt(w.units_per_floor, 10),
      }))
    );
    setWingSaving(false);
    if (!res.success) {
      setWingError(
        res.error === "STRUCTURE_LOCKED"
          ? `Can't shrink/remove wing(s) with units already generated: ${(res.fieldErrors?.wings ?? []).join(", ")}`
          : "Couldn't save wings — please check the values."
      );
      return false;
    }
    setWings(
      res.data.wings.map((w) => ({
        key: w.id,
        id: w.id,
        wing_name: w.wing_name,
        floors: String(w.floors),
        units_per_floor: String(w.units_per_floor),
        units_generated: w.units_generated,
      }))
    );
    return true;
  }

  async function handleGenerateUnits(wingId: string) {
    if (!savedId) return;
    setGeneratingWing(wingId);
    const res = await generateWingUnits(savedId, wingId);
    setGeneratingWing(null);
    if (res.success) {
      setGenerateMsg((prev) => ({
        ...prev,
        [wingId]: `${res.data.created} unit${res.data.created === 1 ? "" : "s"} generated (${res.data.total} total)`,
      }));
      setWings((prev) =>
        prev.map((w) => (w.id === wingId ? { ...w, units_generated: true } : w))
      );
    } else {
      setGenerateMsg((prev) => ({ ...prev, [wingId]: "Generation failed" }));
    }
  }

  const wingsTotalUnits = wings.reduce((sum, w) => {
    const f = parseInt(w.floors, 10) || 0;
    const u = parseInt(w.units_per_floor, 10) || 0;
    return sum + f * u;
  }, 0);

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
      project_type: (form.project_type || undefined) as
        Project["project_type"] | undefined,
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
      unit_configurations: [],
      construction_status: (form.construction_status ||
        undefined) as Project["construction_status"],
      possession_date: form.possession_date || undefined,
      launch_date: form.launch_date || undefined,
      phase_name: form.phase_name || undefined,
      construction_percentage: form.construction_percentage
        ? parseInt(form.construction_percentage, 10)
        : undefined,
      progress_note: form.progress_note || undefined,
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
      preferred_contact_time: form.preferred_contact_time as
        "anytime" | "morning_9_1" | "evening_5_9",
      current_step: step,
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
      if (!saved) return;
      if (step === 4) {
        const wingsOk = await saveWings();
        if (!wingsOk) return;
      }
      setStep((s) => Math.min(LAST_INPUT_STEP, s + 1) as Step);
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

  async function handleSubmit() {
    if (!savedId || submitInFlightRef.current) return;
    submitInFlightRef.current = true;
    setServerError(null);
    startTransition(async () => {
      const res = await submitProjectForApproval(savedId, buildPayload());
      submitInFlightRef.current = false;
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return;
      }
      setSubmitSuccess(true);
    });
  }

  if (submitSuccess) {
    // Step 10 · Submitted
    return (
      <SuccessScreen
        title="Project submitted for review"
        description="Our team will verify your RERA registration before approval — typically 1-2 business days. It will not be visible publicly until approved."
        actionLabel="View My Projects"
        actionHref="/dashboard/builder/projects"
      >
        {form.rera_registered && (
          <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold text-[#3B4FC0]">
            <ShieldCheck className="h-3 w-3" />
            Pending · RERA check
          </div>
        )}
      </SuccessScreen>
    );
  }

  const reraValid = !form.rera_number || RERA_PATTERN.test(form.rera_number);
  const errorCount = Object.keys(fieldErrors).length;

  return (
    <div className="mx-auto max-w-2xl pb-20 lg:pb-0">
      {/* Mobile/tablet contextual header (design Batch 5 shell) */}
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
          Post a Project
        </span>
        {savedId ? (
          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                await saveNow();
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
          {Object.values(fieldErrors)
            .map((e) => e[0])
            .join(", ")}
        </Alert>
      )}

      {serverError && (
        <Alert tone="danger" className="mb-4">
          {serverError === "ROLE_NOT_ALLOWED"
            ? "Only Builder accounts can post projects."
            : serverError === "LIMIT_EXCEEDED"
              ? "You've reached your plan's project posting limit."
              : serverError === "SUBSCRIPTION_REQUIRED"
                ? "An active subscription is required to submit a project."
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

            <FormField label="Developer">
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5">
                <span className="text-sm font-medium text-zinc-800">
                  {developerName ?? "Complete your Builder profile"}
                </span>
                {developerVerificationStatus === "verified" ? (
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
                Prefilled from your verified builder profile — can&rsquo;t be
                changed here.
              </p>
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
            <FormField label="Description" required>
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

            {form.rera_registered ? (
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
                    Format: PR/GJ/CITY/YYYY/NNNNN — format valid means syntax
                    only, not RERA verification.
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
            ) : (
              <Alert tone="warning">
                RERA registration pending — no fake number is shown. A project
                cannot go live without RERA verification unless our team grants
                an explicit, audited exception.
              </Alert>
            )}

            <Alert tone="warning">
              RERA is not verified automatically. Buyers should independently
              verify at <strong>rera.gujarat.gov.in</strong>. No fake RERA badge
              is shown — our team checks RERA before approval, and a project
              cannot publish without a verified RERA registration or an
              explicit, audited admin exception.
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
                placeholder="e.g. Near VR Mall — 1.2 km"
                maxLength={200}
                className="form-input"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                e.g. &ldquo;VR Mall — 1.2 km&rdquo;
              </p>
            </FormField>
            <FormField label="Address Line">
              <input
                type="text"
                value={form.address_line}
                onChange={(e) => setField("address_line", e.target.value)}
                placeholder="Street / plot address"
                maxLength={500}
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
                placeholder="6-digit PIN"
                className="form-input"
                inputMode="numeric"
              />
            </FormField>
          </div>
        )}

        {/* STEP 4 · WINGS / TOWERS / UNITS (structured, backed by project_wings) */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Wings / towers / units
            </h2>

            {wingError && <Alert tone="danger">{wingError}</Alert>}

            {!savedId ? (
              <div className="rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                <p className="text-sm font-medium text-zinc-700">
                  Save this project first
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Complete Step 1 — a draft is created automatically.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {wings.map((w) => (
                    <div
                      key={w.key}
                      className="rounded-xl border border-zinc-200 p-3.5"
                    >
                      <div className="grid grid-cols-3 gap-2.5">
                        <FormField label="Wing Name">
                          <input
                            type="text"
                            value={w.wing_name}
                            onChange={(e) =>
                              updateWingRow(w.key, {
                                wing_name: e.target.value,
                              })
                            }
                            placeholder="e.g. A"
                            maxLength={50}
                            disabled={!!w.units_generated}
                            className="form-input"
                          />
                        </FormField>
                        <FormField label="Floors">
                          <input
                            type="number"
                            value={w.floors}
                            onChange={(e) =>
                              updateWingRow(w.key, { floors: e.target.value })
                            }
                            min="1"
                            className="form-input"
                          />
                        </FormField>
                        <FormField label="Units / Floor">
                          <input
                            type="number"
                            value={w.units_per_floor}
                            onChange={(e) =>
                              updateWingRow(w.key, {
                                units_per_floor: e.target.value,
                              })
                            }
                            min="1"
                            className="form-input"
                          />
                        </FormField>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {w.id && (
                            <button
                              type="button"
                              onClick={() => handleGenerateUnits(w.id!)}
                              disabled={
                                generatingWing === w.id ||
                                !w.floors ||
                                !w.units_per_floor
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand-soft/70 disabled:opacity-50"
                            >
                              <Layers className="h-3.5 w-3.5" />
                              {w.units_generated
                                ? "Regenerate units"
                                : generatingWing === w.id
                                  ? "Generating…"
                                  : "Generate units"}
                            </button>
                          )}
                          {generateMsg[w.id ?? ""] && (
                            <span className="text-xs text-zinc-500">
                              {generateMsg[w.id ?? ""]}
                            </span>
                          )}
                        </div>
                        {!w.units_generated && (
                          <button
                            type="button"
                            onClick={() => removeWingRow(w.key)}
                            aria-label="Remove wing"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={addWingRow}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-sm font-medium text-zinc-700 hover:border-brand/40"
                  >
                    <Plus className="h-4 w-4" /> Add wing
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      startTransition(async () => {
                        await saveWings();
                      })
                    }
                    disabled={wingSaving}
                    className="text-xs font-medium text-brand disabled:opacity-50"
                  >
                    {wingSaving ? "Saving…" : "Save wings"}
                  </button>
                </div>

                {wings.length > 0 && (
                  <p className="text-sm font-medium text-zinc-700">
                    {wings.length} wing{wings.length === 1 ? "" : "s"} ·{" "}
                    {wingsTotalUnits} units total
                  </p>
                )}
              </>
            )}

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
              Individual unit price/status is managed from the project&rsquo;s
              Unit Inventory after approval.
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
                onChange={(e) =>
                  setField("construction_status", e.target.value)
                }
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
              <FormField label="Possession Date" required>
                <input
                  type="date"
                  value={form.possession_date}
                  onChange={(e) => setField("possession_date", e.target.value)}
                  className="form-input"
                />
              </FormField>
            </div>
            <FormField label="Current Construction %">
              <input
                type="number"
                value={form.construction_percentage}
                onChange={(e) =>
                  setField(
                    "construction_percentage",
                    e.target.value.replace(/\D/g, "").slice(0, 3)
                  )
                }
                min="0"
                max="100"
                placeholder="e.g. 64"
                className="form-input"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                Your real, current progress — never auto-derived from status.
                Shown to buyers on the project page and updated later from your
                Builder Dashboard.
              </p>
            </FormField>
            <FormField label="Progress Note">
              <input
                type="text"
                value={form.progress_note}
                onChange={(e) => setField("progress_note", e.target.value)}
                placeholder="e.g. Tower A structure complete, finishing in progress"
                maxLength={500}
                className="form-input"
              />
            </FormField>
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
            <FormField label="360° Tour Link (optional)">
              <input
                type="url"
                value={form.virtual_tour_url}
                onChange={(e) => setField("virtual_tour_url", e.target.value)}
                placeholder="https://…"
                className="form-input"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                If left empty, the public project page shows an honest
                &ldquo;Setup Required&rdquo; state — never a broken embed or
                fake tour.
              </p>
            </FormField>
          </div>
        )}

        {/* STEP 8 · CONTACT */}
        {step === 8 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Contact</h2>

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
                    className={chip(form.preferred_contact_time === o.v)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </FormField>

            <Alert tone="info">
              Project contact is shown to logged-in users on the detail page
              after they reveal it — guests must log in first. Your number is
              never exposed in public listings or search.
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
            <h2 className="text-lg font-bold text-zinc-900">
              Preview &amp; submit
            </h2>

            <div className="space-y-3 rounded-xl bg-zinc-50 p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <SummaryRow label="Project Name" value={form.project_name} />
                <EditLink onEdit={() => goToStep(1)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow label="Developer" value={developerName ?? "—"} />
                <EditLink onEdit={() => goToStep(1)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <SummaryRow
                    label="Type"
                    value={TYPE_LABELS[form.project_type] ?? form.project_type}
                  />
                  <SummaryRow
                    label="RERA"
                    value={
                      form.rera_registered
                        ? `${form.rera_number || "—"} (pending team verification)`
                        : "RERA registration pending"
                    }
                  />
                </div>
                <EditLink onEdit={() => goToStep(2)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow label="City" value={form.city_text || "—"} />
                <EditLink onEdit={() => goToStep(3)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow
                  label="Units"
                  value={`${wings.length} wing${wings.length === 1 ? "" : "s"} · ${wingsTotalUnits} units`}
                />
                <EditLink onEdit={() => goToStep(4)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow
                  label="Amenities"
                  value={
                    amenities.length > 0 ? `${amenities.length} selected` : "—"
                  }
                />
                <EditLink onEdit={() => goToStep(5)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow
                  label="Timeline"
                  value={
                    (CONSTRUCTION_STATUS_LABELS[form.construction_status] ??
                      form.construction_status ??
                      "—") +
                    (form.construction_percentage
                      ? ` · ${form.construction_percentage}% complete`
                      : "")
                  }
                />
                <EditLink onEdit={() => goToStep(6)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow
                  label="Media"
                  value={
                    form.virtual_tour_url || form.video_url
                      ? "Video/Tour added"
                      : "No video/tour link"
                  }
                />
                <EditLink onEdit={() => goToStep(7)} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <SummaryRow
                  label="Contact"
                  value={form.preferred_contact_time.replace(/_/g, " ")}
                />
                <EditLink onEdit={() => goToStep(8)} />
              </div>
            </div>

            {form.rera_registered && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold text-[#3B4FC0]">
                <ShieldCheck className="h-3 w-3" />
                Pending · RERA check
              </div>
            )}

            <Alert tone="info">
              Our team will verify your RERA registration before approval —
              typically 1-2 business days. Project is reviewed before going
              public — it submits as <strong>Pending</strong>. No RERA
              verification badge is issued automatically.
            </Alert>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600">
              By submitting, you confirm this project information is accurate.
              My Gujarat Property is a listing platform — all project documents
              (RERA, approvals) must be independently verified before any
              transaction.
            </div>
          </div>
        )}

        <WizardFooter
          step={step}
          lastInputStep={LAST_INPUT_STEP}
          isPending={isPending}
          saveStatus={saveStatus}
          canSaveDraft={!!savedId}
          submitLabel="Submit for review"
          onBack={handleBack}
          onSaveDraft={() =>
            startTransition(async () => {
              await saveNow();
            })
          }
          onContinue={handleNext}
          onSubmit={handleSubmit}
          backHref={dashboardHref}
        />
      </div>
    </div>
  );
}
