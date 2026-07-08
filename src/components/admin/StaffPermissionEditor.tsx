"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { updateStaffPermissions } from "@/lib/actions/admin/staff";
import type { StaffPermission, PermissionModule } from "@/types";

const MODULES: PermissionModule[] = [
  "users",
  "staff",
  "properties",
  "projects",
  "requirements",
  "verification",
  "support",
  "reports",
  "fraud",
  "billing",
  "payments",
  "plans",
  "coupons",
  "trials",
  "ads",
  "notifications",
  "providers",
  "settings",
  "feature_flags",
  "cms",
  "blog",
  "legal",
  "seo",
  "locations",
  "audit_logs",
  "system_health",
  "security",
  "exports",
];

const BASIC_ACTIONS: (keyof StaffPermission)[] = [
  "can_read",
  "can_create",
  "can_update",
  "can_approve",
  "can_reject",
  "can_delete",
  "can_export",
  "can_bulk_action",
  "can_view_sensitive",
];

const HIGH_RISK_ACTIONS: (keyof StaffPermission)[] = [
  "can_manage_provider",
  "can_manage_security",
  "can_manage_payment",
  "can_manage_staff",
  "can_manage_feature_flags",
  "can_manage_system",
];

const ACTION_LABELS: Partial<Record<keyof StaffPermission, string>> = {
  can_read: "Read",
  can_create: "Create",
  can_update: "Update",
  can_approve: "Approve",
  can_reject: "Reject",
  can_delete: "Delete",
  can_export: "Export",
  can_bulk_action: "Bulk Action",
  can_view_sensitive: "View Sensitive",
  can_manage_provider: "Manage Provider",
  can_manage_security: "Manage Security",
  can_manage_payment: "Manage Payment",
  can_manage_staff: "Manage Staff",
  can_manage_feature_flags: "Manage Feature Flags",
  can_manage_system: "Manage System",
};

export function StaffPermissionEditor({
  staffId,
  isSelf,
  initialPermissions,
}: {
  staffId: string;
  isSelf: boolean;
  initialPermissions: StaffPermission[];
}) {
  const router = useRouter();
  const [selectedModule, setSelectedModule] =
    useState<PermissionModule>("properties");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const permissionsByModule = Object.fromEntries(
    initialPermissions.map((p) => [p.module, p])
  );
  const current = permissionsByModule[selectedModule];

  function buildDraft(
    perm: StaffPermission | undefined
  ): Record<string, boolean> {
    const entries: [string, boolean][] = [
      ...BASIC_ACTIONS,
      ...HIGH_RISK_ACTIONS,
    ].map((a) => [a, Boolean(perm?.[a])]);
    return Object.fromEntries(entries);
  }

  const [draft, setDraft] = useState<Record<string, boolean>>(
    buildDraft(current)
  );

  function selectModule(mod: PermissionModule) {
    setSelectedModule(mod);
    setDraft(buildDraft(permissionsByModule[mod]));
    setMessage(null);
    setError(null);
  }

  function handleSave() {
    if (isSelf) {
      setError("You cannot edit your own permissions.");
      return;
    }
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await updateStaffPermissions(
        staffId,
        selectedModule,
        draft
      );
      if (!result.success) {
        setError(result.fieldErrors?.self?.[0] ?? result.error);
        return;
      }
      setMessage(`Permissions updated for "${selectedModule}".`);
      router.refresh();
    });
  }

  if (isSelf) {
    return (
      <Alert tone="warning">
        You cannot view or edit your own permissions here. Ask another Super
        Admin/Admin to manage your access.
      </Alert>
    );
  }

  return (
    <Card>
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">
        Module Permissions
      </h2>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {MODULES.map((mod) => (
          <button
            key={mod}
            type="button"
            onClick={() => selectModule(mod)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              selectedModule === mod
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            {mod.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
        Standard Actions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {BASIC_ACTIONS.map((action) => (
          <label
            key={action}
            className="flex items-center gap-2 text-sm text-zinc-700"
          >
            <input
              type="checkbox"
              checked={draft[action] ?? false}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, [action]: e.target.checked }))
              }
              className="rounded border-zinc-300"
            />
            {ACTION_LABELS[action]}
          </label>
        ))}
      </div>

      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
        High-Risk Actions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {HIGH_RISK_ACTIONS.map((action) => (
          <label
            key={action}
            className="flex items-center gap-2 text-sm text-zinc-700"
          >
            <input
              type="checkbox"
              checked={draft[action] ?? false}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, [action]: e.target.checked }))
              }
              className="rounded border-zinc-300"
            />
            {ACTION_LABELS[action]}
          </label>
        ))}
      </div>

      {error && (
        <Alert tone="danger" className="mb-3">
          {error}
        </Alert>
      )}
      {message && (
        <Alert tone="success" className="mb-3">
          {message}
        </Alert>
      )}

      <Button size="sm" loading={isPending} onClick={handleSave}>
        Save Permissions For &quot;{selectedModule}&quot;
      </Button>
    </Card>
  );
}
