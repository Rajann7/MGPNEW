"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { X, Plus, ChevronDown } from "lucide-react";
import {
  saveProjectWings,
  generateWingUnits,
  listProjectUnits,
  updateProjectUnit,
  bulkUpdateUnitStatus,
  bulkUpdateUnitPrice,
} from "@/lib/actions/units";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { FormField } from "@/components/ui/FormField";
import type { ProjectWing, ProjectUnit, UnitAvailabilityStatus } from "@/types";

const STATUS_LABELS: Record<UnitAvailabilityStatus, string> = {
  available: "Available",
  booked: "Booked",
  sold: "Sold",
  on_hold: "On Hold",
  not_released: "Not Released",
  hidden: "Hidden",
};

const STATUS_CLASSES: Record<UnitAvailabilityStatus, string> = {
  available: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
  booked: "bg-amber-500/10 border-amber-500/20 text-amber-600",
  sold: "bg-zinc-500/10 border-zinc-500/20 text-zinc-500",
  on_hold: "bg-orange-500/10 border-orange-500/20 text-orange-600",
  not_released: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  hidden: "bg-red-500/10 border-red-500/20 text-red-600",
};

function UnitStatusBadge({ status }: { status: UnitAvailabilityStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in to continue.",
  FORBIDDEN: "You don't have access to this project.",
  ENTITY_NOT_FOUND: "Not found.",
  VALIDATION_ERROR: "Please check the values entered.",
  STRUCTURE_LOCKED:
    "Units already generated for this wing — reduce/remove blocked.",
  TOO_MANY_UNITS: "That would generate too many units at once (max 5,000).",
  STALE_VERSION: "This unit changed elsewhere — reloaded the latest values.",
  INVALID_STATUS_TRANSITION:
    "That status change isn't allowed from the current status.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

interface Props {
  projectId: string;
  initialWings: ProjectWing[];
  initialUnits: ProjectUnit[];
  initialTotal: number;
  initialStatusCounts: Record<string, number>;
}

export function UnitInventoryClient({
  projectId,
  initialWings,
  initialUnits,
  initialTotal,
  initialStatusCounts,
}: Props) {
  const [wings, setWings] = useState<ProjectWing[]>(initialWings);
  const [wingRows, setWingRows] = useState<
    { wing_name: string; floors: string; units_per_floor: string }[]
  >(
    initialWings.length > 0
      ? initialWings.map((w) => ({
          wing_name: w.wing_name,
          floors: String(w.floors),
          units_per_floor: String(w.units_per_floor),
        }))
      : [{ wing_name: "", floors: "", units_per_floor: "" }]
  );
  const [wingError, setWingError] = useState<string | null>(null);
  const [wingSaved, setWingSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [genMessage, setGenMessage] = useState<Record<string, string>>({});

  const [units, setUnits] = useState<ProjectUnit[]>(initialUnits);
  const [total, setTotal] = useState(initialTotal);
  const [statusCounts, setStatusCounts] =
    useState<Record<string, number>>(initialStatusCounts);
  const [wingFilter, setWingFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [listError, setListError] = useState<string | null>(null);
  const [editingUnit, setEditingUnit] = useState<ProjectUnit | null>(null);

  async function refreshUnits(overrides?: {
    wingId?: string | null;
    status?: string | null;
  }) {
    setListError(null);
    const res = await listProjectUnits(projectId, {
      wingId:
        overrides?.wingId !== undefined ? overrides.wingId : wingFilter || null,
      status: (overrides?.status !== undefined
        ? overrides.status
        : statusFilter || null) as UnitAvailabilityStatus | null,
      page: 1,
      limit: 100,
    });
    if (!res.success) {
      setListError(ERR[res.error] ?? res.error);
      return;
    }
    setUnits(res.data.items);
    setTotal(res.data.total);
    setStatusCounts(res.data.statusCounts);
    setSelected(new Set());
  }

  function updateWingRow(
    i: number,
    field: "wing_name" | "floors" | "units_per_floor",
    value: string
  ) {
    setWingRows((prev) =>
      prev.map((r, ri) => (ri === i ? { ...r, [field]: value } : r))
    );
    setWingSaved(false);
  }

  function addWingRow() {
    setWingRows((prev) => [
      ...prev,
      { wing_name: "", floors: "", units_per_floor: "" },
    ]);
    setWingSaved(false);
  }

  function removeWingRow(i: number) {
    setWingRows((prev) => prev.filter((_, ri) => ri !== i));
    setWingSaved(false);
  }

  function saveWings() {
    setWingError(null);
    const parsed = wingRows
      .filter((r) => r.wing_name.trim())
      .map((r) => ({
        wing_name: r.wing_name.trim(),
        floors: parseInt(r.floors, 10) || 0,
        units_per_floor: parseInt(r.units_per_floor, 10) || 0,
      }));
    if (parsed.length === 0) {
      setWingError("Add at least one wing before saving.");
      return;
    }
    startTransition(async () => {
      const res = await saveProjectWings(projectId, parsed);
      if (!res.success) {
        setWingError(
          "fieldErrors" in res && res.fieldErrors?.wings
            ? `Wing(s) already generated, can't shrink/remove: ${res.fieldErrors.wings.join(", ")}`
            : (ERR[res.error] ?? res.error)
        );
        return;
      }
      setWings(res.data.wings);
      setWingSaved(true);
    });
  }

  function handleGenerate(wingId: string) {
    setGenMessage((prev) => ({ ...prev, [wingId]: "" }));
    startTransition(async () => {
      const res = await generateWingUnits(projectId, wingId);
      if (!res.success) {
        setGenMessage((prev) => ({
          ...prev,
          [wingId]: ERR[res.error] ?? res.error,
        }));
        return;
      }
      setGenMessage((prev) => ({
        ...prev,
        [wingId]: `${res.data.created} unit(s) created${res.data.skipped ? `, ${res.data.skipped} already existed` : ""}.`,
      }));
      setWings((prev) =>
        prev.map((w) => (w.id === wingId ? { ...w, units_generated: true } : w))
      );
      refreshUnits();
    });
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function toggleSelectAll() {
    setSelected((prev) =>
      prev.size === units.length ? new Set() : new Set(units.map((u) => u.id))
    );
  }

  function handleBulkStatus(status: UnitAvailabilityStatus) {
    if (selected.size === 0) return;
    startTransition(async () => {
      const res = await bulkUpdateUnitStatus(projectId, {
        unitIds: Array.from(selected),
        status,
      });
      if (!res.success) {
        setListError(ERR[res.error] ?? res.error);
        return;
      }
      await refreshUnits();
    });
  }

  function handleBulkPrice() {
    if (selected.size === 0) return;
    const raw = window.prompt("New price for selected units (₹)");
    if (!raw) return;
    const price = parseFloat(raw);
    if (!Number.isFinite(price) || price < 0) return;
    startTransition(async () => {
      const res = await bulkUpdateUnitPrice(projectId, {
        unitIds: Array.from(selected),
        price,
      });
      if (!res.success) {
        setListError(ERR[res.error] ?? res.error);
        return;
      }
      await refreshUnits();
    });
  }

  const wingOptions = wings;

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------ */}
      {/* Wings editor */}
      {/* ------------------------------------------------------------ */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-zinc-900 mb-1">
          Wings / Towers
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          Define wing structure, then generate units for each wing. Wings with
          units already generated can be edited but not shrunk or removed.
        </p>

        <div className="space-y-3">
          {wingRows.map((row, i) => {
            const existingWing = wings.find(
              (w) => w.wing_name === row.wing_name
            );
            return (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end"
              >
                <FormField label="Wing Name">
                  <input
                    type="text"
                    value={row.wing_name}
                    onChange={(e) =>
                      updateWingRow(i, "wing_name", e.target.value)
                    }
                    placeholder="e.g. A"
                    maxLength={50}
                    className="form-input"
                  />
                </FormField>
                <FormField label="Floors">
                  <input
                    type="number"
                    min="1"
                    value={row.floors}
                    onChange={(e) => updateWingRow(i, "floors", e.target.value)}
                    className="form-input sm:w-24"
                  />
                </FormField>
                <FormField label="Units / Floor">
                  <input
                    type="number"
                    min="1"
                    value={row.units_per_floor}
                    onChange={(e) =>
                      updateWingRow(i, "units_per_floor", e.target.value)
                    }
                    className="form-input sm:w-28"
                  />
                </FormField>
                <button
                  type="button"
                  onClick={() => removeWingRow(i)}
                  disabled={!!existingWing?.units_generated}
                  aria-label="Remove wing"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addWingRow}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover"
          >
            <Plus className="h-4 w-4" /> Add wing
          </button>
          <Button
            type="button"
            size="sm"
            onClick={saveWings}
            loading={isPending}
          >
            Save Wings
          </Button>
          {wingSaved && (
            <span className="text-xs text-emerald-600">Saved.</span>
          )}
        </div>

        {wingError && (
          <Alert tone="danger" className="mt-3">
            {wingError}
          </Alert>
        )}

        {wings.length > 0 && (
          <div className="mt-5 divide-y divide-zinc-100 border-t border-zinc-100">
            {wings.map((w) => (
              <div
                key={w.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div className="text-sm">
                  <span className="font-medium text-zinc-900">
                    Wing {w.wing_name}
                  </span>{" "}
                  <span className="text-zinc-500">
                    · {w.floors} floors × {w.units_per_floor}/floor ={" "}
                    {w.floors * w.units_per_floor} units
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {genMessage[w.id] && (
                    <span className="text-xs text-zinc-500">
                      {genMessage[w.id]}
                    </span>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant={w.units_generated ? "outline" : "primary"}
                    onClick={() => handleGenerate(w.id)}
                    loading={isPending}
                  >
                    {w.units_generated ? "Re-run Generate" : "Generate Units"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Units list */}
      {/* ------------------------------------------------------------ */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-zinc-900">Units ({total})</h2>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={wingFilter}
              onChange={(e) => {
                setWingFilter(e.target.value);
                refreshUnits({ wingId: e.target.value || null });
              }}
              className="form-select !w-auto text-sm"
            >
              <option value="">All wings</option>
              {wingOptions.map((w) => (
                <option key={w.id} value={w.id}>
                  Wing {w.wing_name}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                refreshUnits({ status: e.target.value || null });
              }}
              className="form-select !w-auto text-sm"
            >
              <option value="">All statuses</option>
              {(Object.keys(STATUS_LABELS) as UnitAvailabilityStatus[]).map(
                (s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]} ({statusCounts[s] ?? 0})
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {listError && (
          <Alert tone="danger" className="mb-3">
            {listError}
          </Alert>
        )}

        {units.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-400">
            No units yet. Generate units from a wing above.
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    <th className="w-8 py-2">
                      <input
                        type="checkbox"
                        checked={
                          selected.size === units.length && units.length > 0
                        }
                        onChange={toggleSelectAll}
                        aria-label="Select all units"
                        className="h-4 w-4 rounded accent-brand"
                      />
                    </th>
                    <th className="py-2">Unit No.</th>
                    <th className="py-2">Floor</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Area</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Status</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {units.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-zinc-50 hover:bg-zinc-50"
                    >
                      <td className="py-2">
                        <input
                          type="checkbox"
                          checked={selected.has(u.id)}
                          onChange={() => toggleSelect(u.id)}
                          aria-label={`Select unit ${u.unit_number}`}
                          className="h-4 w-4 rounded accent-brand"
                        />
                      </td>
                      <td className="py-2 font-medium text-zinc-900">
                        {u.unit_number}
                      </td>
                      <td className="py-2 text-zinc-600">
                        {u.floor_number ?? "—"}
                      </td>
                      <td className="py-2 text-zinc-600">
                        {u.unit_type ?? "—"}
                      </td>
                      <td className="py-2 text-zinc-600">
                        {u.area_value ? `${u.area_value} sq ft` : "—"}
                      </td>
                      <td className="py-2 text-zinc-600">
                        {u.price ? `₹${u.price.toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="py-2">
                        <UnitStatusBadge status={u.availability_status} />
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          onClick={() => setEditingUnit(u)}
                          className="text-xs font-medium text-brand hover:text-brand-hover"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile accordion cards */}
            <div className="space-y-2 sm:hidden">
              {units.map((u) => (
                <div
                  key={u.id}
                  className="rounded-xl border border-zinc-200 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selected.has(u.id)}
                        onChange={() => toggleSelect(u.id)}
                        aria-label={`Select unit ${u.unit_number}`}
                        className="h-4 w-4 rounded accent-brand"
                      />
                      <span className="font-medium text-zinc-900">
                        {u.unit_number}
                      </span>
                    </label>
                    <UnitStatusBadge status={u.availability_status} />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-zinc-500">
                    <span>Floor: {u.floor_number ?? "—"}</span>
                    <span>Type: {u.unit_type ?? "—"}</span>
                    <span>
                      Area: {u.area_value ? `${u.area_value} sq ft` : "—"}
                    </span>
                    <span>
                      Price:{" "}
                      {u.price ? `₹${u.price.toLocaleString("en-IN")}` : "—"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingUnit(u)}
                    className="mt-2 text-xs font-medium text-brand hover:text-brand-hover"
                  >
                    Edit unit
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div
            className="sticky bottom-16 z-10 -mx-5 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 bg-white/95 px-5 py-3 backdrop-blur sm:static sm:-mx-6 sm:mx-0 sm:rounded-xl sm:border sm:px-4"
            style={{
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            }}
          >
            <span className="text-sm font-medium text-zinc-700">
              {selected.size} selected
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatus("available")}
                loading={isPending}
              >
                Mark Available
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatus("booked")}
                loading={isPending}
              >
                Mark Booked
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatus("sold")}
                loading={isPending}
              >
                Mark Sold
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatus("on_hold")}
                loading={isPending}
              >
                On Hold
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleBulkPrice}
                loading={isPending}
              >
                Update Price…
              </Button>
            </div>
          </div>
        )}
      </section>

      {editingUnit && (
        <UnitEditDialog
          projectId={projectId}
          unit={editingUnit}
          onClose={() => setEditingUnit(null)}
          onSaved={() => {
            setEditingUnit(null);
            refreshUnits();
          }}
        />
      )}
    </div>
  );
}

function UnitEditDialog({
  projectId,
  unit,
  onClose,
  onSaved,
}: {
  projectId: string;
  unit: ProjectUnit;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [price, setPrice] = useState(unit.price ? String(unit.price) : "");
  const [status, setStatus] = useState<UnitAvailabilityStatus>(
    unit.availability_status
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function save() {
    setError(null);
    startTransition(async () => {
      const res = await updateProjectUnit(projectId, unit.id, {
        price: price ? parseFloat(price) : null,
        availability_status: status,
        version: unit.version,
      });
      if (!res.success) {
        setError(ERR[res.error] ?? res.error);
        return;
      }
      onSaved();
    });
  }

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-[rgba(24,24,27,0.45)]"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Edit unit ${unit.unit_number}`}
        className="relative z-10 w-full rounded-t-[20px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] sm:max-w-[420px] sm:rounded-[16px]"
      >
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-zinc-300" />
        </div>
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <span className="text-[15px] font-semibold text-zinc-900">
            Unit {unit.unit_number}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <FormField label="Price (₹)">
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={unit.availability_status === "sold"}
              placeholder="Optional"
              className="form-input"
            />
            {unit.availability_status === "sold" && (
              <p className="mt-1 text-xs text-zinc-400">
                Price is locked once a unit is sold.
              </p>
            )}
          </FormField>

          <FormField label="Status">
            <div className="relative">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as UnitAvailabilityStatus)
                }
                className="form-select appearance-none pr-9"
              >
                {(Object.keys(STATUS_LABELS) as UnitAvailabilityStatus[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  )
                )}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-zinc-400" />
            </div>
          </FormField>

          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={save} loading={isPending}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
