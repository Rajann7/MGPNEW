"use client";

import { useState, useTransition } from "react";
import {
  Home,
  Building2,
  SquareDashed,
  Store,
  Check,
  Lock,
} from "lucide-react";
import {
  createRequirementDraft,
  updateRequirementDraft,
  submitRequirementForApproval,
} from "@/lib/actions/requirements";
import {
  REQUIREMENT_PURPOSES,
  REQUIREMENT_CATEGORIES,
} from "@/lib/validators/requirement";
import { Stepper } from "@/components/ui/Stepper";
import { FormField, SummaryRow } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { WizardFooter } from "@/components/forms/wizard/WizardFooter";
import { useWizardAutosave } from "@/components/forms/wizard/useWizardAutosave";
import type { Requirement } from "@/types";

const PURPOSE_LABELS: Record<string, string> = {
  buy: "Buy",
  rent: "Rent",
  lease: "Lease",
  pg: "PG / Hostel",
  business_buy: "Business Buy",
};

const CATEGORY_META: Record<string, { label: string; Icon: typeof Home }> = {
  residential: { label: "Residential", Icon: Building2 },
  commercial: { label: "Commercial", Icon: Store },
  industrial: { label: "Industrial", Icon: Store },
  land_plot: { label: "Land / Plot", Icon: SquareDashed },
  pg_hostel_room: { label: "PG / Hostel / Room", Icon: Home },
  business: { label: "Business", Icon: Store },
  project: { label: "Project", Icon: Building2 },
};

const TIMELINES: { value: string; label: string }[] = [
  { value: "immediately", label: "Immediate" },
  { value: "within_1_month", label: "Within 1 month" },
  { value: "1_to_3_months", label: "1–3 months" },
  { value: "3_to_6_months", label: "3–6 months" },
  { value: "", label: "Flexible" },
];

const SPEC_AMENITIES = ["Covered parking", "Lift", "Gated society", "Garden"];

// Namespaced tags persisted inside the real `preferred_amenities` text[] column,
// so the design's extra preferences survive without inventing new DB columns.
const TAG_LOAN = "pref:loan_pre_approved";
const TAG_CALLS_OK = "pref:brokers_calls_ok";
const TAG_INAPP_ONLY = "pref:brokers_inapp_only";

interface Props {
  existing?: Partial<Requirement>;
  mode: "create" | "edit";
  dashboardRole: "owner" | "broker";
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const STEPS = [
  "Looking For",
  "Location",
  "Budget",
  "Specifications",
  "Timeline",
  "Contact",
  "Preview",
];

const chip = (active: boolean) =>
  [
    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    active
      ? "border-brand bg-brand-soft text-brand"
      : "border-zinc-200 bg-white text-zinc-700 hover:border-brand/40",
  ].join(" ");

export function RequirementForm({ existing, mode, dashboardRole }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [isPending, startTransition] = useTransition();

  const existingAmenities = (existing?.preferred_amenities ?? []) as string[];

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    purpose: existing?.purpose ?? "buy",
    category: existing?.category ?? "residential",
    requirement_type: existing?.requirement_type ?? "",
    description: existing?.description ?? "",
    budget_min: existing?.budget_min?.toString() ?? "",
    budget_max: existing?.budget_max?.toString() ?? "",
    rent_min: existing?.rent_min?.toString() ?? "",
    rent_max: existing?.rent_max?.toString() ?? "",
    area_min: existing?.area_min?.toString() ?? "",
    area_max: existing?.area_max?.toString() ?? "",
    area_unit: existing?.area_unit ?? "sq_ft",
    bhk: existing?.bedrooms_max?.toString() ?? "",
    possession_timeline: existing?.possession_timeline ?? "",
    city_text: existing?.city_text ?? "",
    preferred_localities_text: existing?.preferred_localities_text ?? "",
    contact_visibility: existing?.contact_visibility ?? "show_after_login",
  });

  const [amenities, setAmenities] = useState<string[]>(
    existingAmenities.filter((a) => !a.startsWith("pref:"))
  );
  const [loanPreApproved, setLoanPreApproved] = useState(
    existingAmenities.includes(TAG_LOAN)
  );
  const [brokerContact, setBrokerContact] = useState<"inapp" | "calls">(
    existingAmenities.includes(TAG_CALLS_OK) ? "calls" : "inapp"
  );

  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [savedId, setSavedId] = useState<string | null>(existing?.id ?? null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const showBudget = ["buy", "business_buy"].includes(form.purpose);
  const showRent = ["rent", "lease", "pg"].includes(form.purpose);
  const showBedrooms = ["residential", "pg_hostel_room"].includes(
    form.category
  );

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
    const bhk = form.bhk ? parseInt(form.bhk) : undefined;
    const tags = [
      ...amenities,
      ...(loanPreApproved ? [TAG_LOAN] : []),
      brokerContact === "calls" ? TAG_CALLS_OK : TAG_INAPP_ONLY,
    ];
    return {
      title: form.title,
      purpose: form.purpose as Requirement["purpose"],
      category: form.category as Requirement["category"],
      requirement_type: form.requirement_type || undefined,
      description: form.description || undefined,
      budget_min: form.budget_min ? parseFloat(form.budget_min) : undefined,
      budget_max: form.budget_max ? parseFloat(form.budget_max) : undefined,
      rent_min: form.rent_min ? parseFloat(form.rent_min) : undefined,
      rent_max: form.rent_max ? parseFloat(form.rent_max) : undefined,
      area_min: form.area_min ? parseFloat(form.area_min) : undefined,
      area_max: form.area_max ? parseFloat(form.area_max) : undefined,
      area_unit: (form.area_unit || undefined) as Requirement["area_unit"],
      bedrooms_min: bhk,
      bedrooms_max: bhk,
      furnishing_preference: undefined,
      possession_timeline: (form.possession_timeline ||
        undefined) as Requirement["possession_timeline"],
      preferred_amenities: tags,
      city_text: form.city_text || undefined,
      preferred_localities_text: form.preferred_localities_text || undefined,
      contact_visibility:
        form.contact_visibility as Requirement["contact_visibility"],
    };
  }

  async function saveDraft(): Promise<boolean> {
    setServerError(null);
    const payload = buildPayload();
    if (mode === "create" && !savedId) {
      const res = await createRequirementDraft(payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
      setSavedId(res.data.id);
    } else if (savedId) {
      const res = await updateRequirementDraft(savedId, payload);
      if (!res.success) {
        setServerError(res.error);
        if ("fieldErrors" in res) setFieldErrors(res.fieldErrors ?? {});
        return false;
      }
    }
    return true;
  }

  const LAST_INPUT_STEP = 7 as const;
  const autosaveEligible =
    mode === "create" ||
    ["draft", "need_changes", "rejected"].includes(existing?.status ?? "");

  const { status: saveStatus, saveNow } = useWizardAutosave({
    enabled: autosaveEligible && form.title.trim().length >= 5,
    fingerprint: JSON.stringify({
      form,
      amenities,
      loanPreApproved,
      brokerContact,
      step,
    }),
    save: saveDraft,
  });

  async function handleNext() {
    setServerError(null);
    if (step === 1) {
      if (!form.title.trim() || form.title.length < 5) {
        setFieldErrors({ title: ["Title must be at least 5 characters"] });
        return;
      }
    }
    if (step === 2 && !form.city_text.trim()) {
      setFieldErrors({ city_text: ["City is required"] });
      return;
    }
    startTransition(async () => {
      const saved = await saveDraft();
      if (saved) setStep((s) => Math.min(7, s + 1) as Step);
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
      const res = await submitRequirementForApproval(savedId, buildPayload());
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
        title="Requirement submitted"
        description="Your requirement is now Pending review. Once our team approves it, it becomes visible to verified Brokers & Builders only — never public, never to guests."
        actionLabel="View My Requirements"
        actionHref={`/dashboard/${dashboardRole}/requirements`}
      />
    );
  }

  const localityChips = form.preferred_localities_text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper steps={STEPS} current={step} />

      {serverError && (
        <Alert tone="danger" className="mb-4">
          {serverError === "ROLE_NOT_ALLOWED"
            ? "Your account role cannot post requirements."
            : "Something went wrong. Please try again."}
        </Alert>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        {/* STEP 1 · LOOKING FOR */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              What are you looking for?
            </h2>
            <FormField label="Title" required error={fieldErrors.title?.[0]}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. Looking for 3 BHK in Satellite, Ahmedabad"
                maxLength={200}
                className="form-input"
                aria-required="true"
              />
            </FormField>
            <FormField label="Purpose" required>
              <div className="inline-flex flex-wrap gap-1 rounded-full bg-zinc-100 p-1">
                {REQUIREMENT_PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setField("purpose", p)}
                    aria-pressed={form.purpose === p}
                    className={[
                      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      form.purpose === p
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900",
                    ].join(" ")}
                  >
                    {PURPOSE_LABELS[p]}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Category" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {REQUIREMENT_CATEGORIES.map((c) => {
                  const { label, Icon } = CATEGORY_META[c];
                  const active = form.category === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setField("category", c)}
                      aria-pressed={active}
                      className={[
                        "flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-colors",
                        active
                          ? "border-[1.5px] border-brand bg-brand-soft"
                          : "border-zinc-200 hover:border-zinc-400",
                      ].join(" ")}
                    >
                      <Icon
                        className={
                          active
                            ? "h-5 w-5 text-brand"
                            : "h-5 w-5 text-zinc-500"
                        }
                      />
                      <span
                        className={[
                          "text-xs font-medium",
                          active ? "text-brand" : "text-zinc-700",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FormField>
          </div>
        )}

        {/* STEP 2 · LOCATION PREFERENCE */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Location preference
            </h2>
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
            <FormField label="Preferred localities">
              <input
                type="text"
                value={form.preferred_localities_text}
                onChange={(e) =>
                  setField("preferred_localities_text", e.target.value)
                }
                placeholder="Satellite, Bodakdev, Vastrapur…"
                maxLength={500}
                className="form-input"
              />
              <p className="mt-1.5 text-[11px] text-zinc-500">
                Separate with commas · up to 5 localities across cities.
              </p>
              {localityChips.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {localityChips.slice(0, 5).map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </FormField>
          </div>
        )}

        {/* STEP 3 · BUDGET RANGE */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Budget range</h2>
            {showRent ? (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Min rent (₹/mo)">
                  <input
                    type="number"
                    value={form.rent_min}
                    onChange={(e) => setField("rent_min", e.target.value)}
                    min="0"
                    placeholder="From"
                    className="form-input"
                  />
                </FormField>
                <FormField
                  label="Max rent (₹/mo)"
                  required
                  error={fieldErrors.rent_max?.[0]}
                >
                  <input
                    type="number"
                    value={form.rent_max}
                    onChange={(e) => setField("rent_max", e.target.value)}
                    min="0"
                    placeholder="Up to"
                    className="form-input"
                  />
                </FormField>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Min budget (₹)">
                  <input
                    type="number"
                    value={form.budget_min}
                    onChange={(e) => setField("budget_min", e.target.value)}
                    min="0"
                    placeholder="From"
                    className="form-input"
                  />
                </FormField>
                <FormField
                  label="Max budget (₹)"
                  required
                  error={fieldErrors.budget_max?.[0]}
                >
                  <input
                    type="number"
                    value={form.budget_max}
                    onChange={(e) => setField("budget_max", e.target.value)}
                    min="0"
                    placeholder="Up to"
                    className="form-input"
                  />
                </FormField>
              </div>
            )}
            {showBudget && (
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={loanPreApproved}
                  onChange={(e) => setLoanPreApproved(e.target.checked)}
                  className="h-[18px] w-[18px] rounded accent-brand"
                />
                <span className="text-sm text-zinc-700">Loan pre-approved</span>
              </label>
            )}
          </div>
        )}

        {/* STEP 4 · SPECIFICATIONS */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">Specifications</h2>
            {showBedrooms && (
              <FormField label="BHK">
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setField("bhk", form.bhk === n ? "" : n)}
                      aria-pressed={form.bhk === n}
                      className={chip(form.bhk === n)}
                    >
                      {n === "5" ? "4+ BHK" : `${n} BHK`}
                    </button>
                  ))}
                </div>
              </FormField>
            )}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Min area (sq ft)">
                <input
                  type="number"
                  value={form.area_min}
                  onChange={(e) => setField("area_min", e.target.value)}
                  min="0"
                  placeholder="Min area"
                  className="form-input"
                />
              </FormField>
              <FormField label="Max area (sq ft)">
                <input
                  type="number"
                  value={form.area_max}
                  onChange={(e) => setField("area_max", e.target.value)}
                  min="0"
                  placeholder="Any"
                  className="form-input"
                />
              </FormField>
            </div>
            <FormField label="Must-have amenities">
              <div className="flex flex-wrap gap-2">
                {SPEC_AMENITIES.map((a) => (
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
            </FormField>
            <FormField label="Notes (optional)">
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={3}
                maxLength={3000}
                placeholder="Any other preferences…"
                className="form-input resize-none"
              />
            </FormField>
          </div>
        )}

        {/* STEP 5 · TIMELINE */}
        {step === 5 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900">Timeline</h2>
            {TIMELINES.map((t) => {
              const active = form.possession_timeline === t.value;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setField("possession_timeline", t.value)}
                  aria-pressed={active}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors",
                    active
                      ? "border-[1.5px] border-brand bg-brand-soft"
                      : "border-zinc-200 hover:border-zinc-400",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-[18px] w-[18px] flex-shrink-0 rounded-full",
                      active
                        ? "border-[5.5px] border-brand bg-white"
                        : "border-[1.5px] border-zinc-300",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-sm font-medium",
                      active ? "text-brand" : "text-zinc-700",
                    ].join(" ")}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* STEP 6 · CONTACT PREFERENCE */}
        {step === 6 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Contact preference
            </h2>
            <FormField label="Who can see your contact?">
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
                <option value="show_after_approval">Show after approval</option>
                <option value="hidden">Always hidden</option>
              </select>
            </FormField>
            <FormField label="How should brokers reach you?">
              <div className="space-y-2.5">
                {[
                  { v: "inapp", label: "In-app proposals only" },
                  { v: "calls", label: "Calls are OK" },
                ].map((o) => {
                  const active = brokerContact === o.v;
                  return (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setBrokerContact(o.v as "inapp" | "calls")}
                      aria-pressed={active}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors",
                        active
                          ? "border-[1.5px] border-brand bg-brand-soft"
                          : "border-zinc-200 hover:border-zinc-400",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-[18px] w-[18px] flex-shrink-0 rounded-full",
                          active
                            ? "border-[5.5px] border-brand bg-white"
                            : "border-[1.5px] border-zinc-300",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-sm font-medium",
                          active ? "text-brand" : "text-zinc-700",
                        ].join(" ")}
                      >
                        {o.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FormField>
          </div>
        )}

        {/* STEP 7 · PREVIEW + SUBMIT */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-zinc-900">
              Preview &amp; submit
            </h2>
            <div className="space-y-3 rounded-xl bg-zinc-50 p-4 text-sm">
              <SummaryRow label="Title" value={form.title} />
              <SummaryRow
                label="Purpose"
                value={PURPOSE_LABELS[form.purpose]}
              />
              <SummaryRow
                label="Category"
                value={CATEGORY_META[form.category].label}
              />
              <SummaryRow label="City" value={form.city_text || "—"} />
              {form.bhk && (
                <SummaryRow
                  label="BHK"
                  value={form.bhk === "5" ? "4+ BHK" : `${form.bhk} BHK`}
                />
              )}
              {form.budget_max && (
                <SummaryRow
                  label="Max budget"
                  value={`₹${parseFloat(form.budget_max).toLocaleString("en-IN")}`}
                />
              )}
              {form.rent_max && (
                <SummaryRow
                  label="Max rent"
                  value={`₹${parseFloat(form.rent_max).toLocaleString("en-IN")}/mo`}
                />
              )}
              {loanPreApproved && (
                <SummaryRow label="Loan" value="Pre-approved" />
              )}
              <SummaryRow
                label="Brokers reach via"
                value={
                  brokerContact === "calls"
                    ? "Calls OK"
                    : "In-app proposals only"
                }
              />
            </div>

            <Alert tone="info">
              Requirements are reviewed before matching — yours goes to{" "}
              <strong>Pending</strong> on submit.
            </Alert>

            <div className="flex gap-2 rounded-xl bg-brand-soft px-3.5 py-3">
              <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
              <span className="text-[11px] leading-[1.5] text-[#0C5648]">
                Once approved, this is visible to verified Brokers &amp;
                Builders only — never public, never to guests.
              </span>
            </div>
          </div>
        )}

        <WizardFooter
          step={step}
          lastInputStep={LAST_INPUT_STEP}
          isPending={isPending}
          saveStatus={saveStatus}
          canSaveDraft={!!savedId}
          submitLabel="Submit requirement"
          onBack={handleBack}
          onSaveDraft={() =>
            startTransition(async () => {
              await saveNow();
            })
          }
          onContinue={handleNext}
          onSubmit={handleSubmit}
          backHref={`/dashboard/${dashboardRole}/requirements`}
        />
      </div>

      {step === 7 && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-400">
          <Check className="h-3 w-3" /> Draft saved · resume anytime from My
          Requirements
        </p>
      )}
    </div>
  );
}
