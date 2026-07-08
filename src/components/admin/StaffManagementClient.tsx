"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { FormField } from "@/components/ui/FormField";
import {
  inviteStaff,
  revokeStaffInvite,
  disableStaff,
  enableStaff,
} from "@/lib/actions/admin/staff";
import type { StaffProfile, StaffInvite, InternalRole } from "@/types";

const INTERNAL_ROLES: InternalRole[] = [
  "admin",
  "verification_manager",
  "support_manager",
  "content_manager",
  "seo_manager",
  "ads_manager",
  "billing_manager",
  "payment_manager",
  "city_manager",
  "user_manager",
  "notification_manager",
  "system_manager",
  "security_manager",
  "reports_manager",
  "audit_manager",
];

const STATUS_CLASS: Record<string, string> = {
  invited: "bg-blue-50 text-blue-700 border-blue-100",
  active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  disabled: "bg-zinc-100 text-zinc-500 border-zinc-200",
  suspended: "bg-amber-50 text-amber-700 border-amber-100",
  deleted: "bg-red-50 text-red-600 border-red-100",
};

export function StaffManagementClient({
  canManageStaff,
  initialStaff,
  initialInvites,
  currentStaffId,
}: {
  canManageStaff: boolean;
  initialStaff: StaffProfile[];
  initialInvites: StaffInvite[];
  currentStaffId: string;
}) {
  const router = useRouter();
  const [staffList, setStaffList] = useState(initialStaff);
  const [invites, setInvites] = useState(initialInvites);

  // router.refresh() re-fetches the server payload as new props, but this
  // component's local state (for optimistic updates) doesn't reset on its
  // own — adjust it during render (not in an effect) when the props change,
  // per https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevInitialStaff, setPrevInitialStaff] = useState(initialStaff);
  if (initialStaff !== prevInitialStaff) {
    setPrevInitialStaff(initialStaff);
    setStaffList(initialStaff);
  }
  const [prevInitialInvites, setPrevInitialInvites] = useState(initialInvites);
  if (initialInvites !== prevInitialInvites) {
    setPrevInitialInvites(initialInvites);
    setInvites(initialInvites);
  }
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InternalRole>("support_manager");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [disableReason, setDisableReason] = useState<Record<string, string>>(
    {}
  );
  const [isPending, startTransition] = useTransition();

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await inviteStaff(email, role);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setMessage(result.message ?? "Invite created.");
      setEmail("");
      router.refresh();
    });
  }

  function handleRevoke(id: string) {
    startTransition(async () => {
      const result = await revokeStaffInvite(id);
      if (result.success) {
        setInvites((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: "revoked" } : i))
        );
      }
    });
  }

  function handleDisable(id: string) {
    const reason = disableReason[id]?.trim();
    if (!reason || reason.length < 3) {
      setError("Enter a reason (min 3 characters) before disabling.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await disableStaff(id, reason);
      if (!result.success) {
        setError(
          result.fieldErrors?.staff?.[0] ??
            result.fieldErrors?.self?.[0] ??
            result.error
        );
        return;
      }
      setStaffList((prev) =>
        prev.map((s) => (s.id === id ? { ...s, staff_status: "disabled" } : s))
      );
      router.refresh();
    });
  }

  function handleEnable(id: string) {
    startTransition(async () => {
      const result = await enableStaff(id);
      if (result.success) {
        setStaffList((prev) =>
          prev.map((s) => (s.id === id ? { ...s, staff_status: "active" } : s))
        );
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {canManageStaff && (
        <Card>
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Invite Staff
          </h2>
          <form
            onSubmit={handleInvite}
            className="flex flex-col sm:flex-row gap-3 items-start"
          >
            <div className="flex-1 w-full">
              <FormField label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@example.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </FormField>
            </div>
            <div className="w-full sm:w-56">
              <FormField label="Functional Role">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as InternalRole)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  {INTERNAL_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
            <Button type="submit" loading={isPending} className="mt-6">
              Send Invite
            </Button>
          </form>
          {message && (
            <Alert tone="success" className="mt-3">
              {message}
            </Alert>
          )}
          {error && (
            <Alert tone="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Card>
      )}

      <Card>
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">
          Staff ({staffList.length})
        </h2>
        <div className="flex flex-col divide-y divide-zinc-100">
          {staffList.map((s) => (
            <div
              key={s.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/staff/${s.id}`}
                  className="text-sm font-medium text-zinc-900 hover:underline"
                >
                  {s.full_name}
                </Link>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {s.email} ·{" "}
                  <span className="capitalize">
                    {s.internal_role.replace(/_/g, " ")}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${STATUS_CLASS[s.staff_status] ?? ""}`}
                >
                  {s.staff_status}
                </span>
                {canManageStaff &&
                  s.id !== currentStaffId &&
                  (s.staff_status === "active" ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Reason"
                        value={disableReason[s.id] ?? ""}
                        onChange={(e) =>
                          setDisableReason((prev) => ({
                            ...prev,
                            [s.id]: e.target.value,
                          }))
                        }
                        className="w-28 px-2 py-1 text-xs rounded-lg border border-zinc-300"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => handleDisable(s.id)}
                      >
                        Disable
                      </Button>
                    </div>
                  ) : s.staff_status === "disabled" ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={isPending}
                      onClick={() => handleEnable(s.id)}
                    >
                      Enable
                    </Button>
                  ) : null)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">
          Pending Invites (
          {invites.filter((i) => i.status === "pending").length})
        </h2>
        {invites.length === 0 ? (
          <p className="text-sm text-zinc-400">No invites yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-100">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="py-3 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {inv.email}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 capitalize">
                    {inv.internal_role.replace(/_/g, " ")} · expires{" "}
                    {new Date(inv.expires_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full border capitalize bg-zinc-50 text-zinc-600 border-zinc-200">
                    {inv.status}
                  </span>
                  {inv.status === "pending" && canManageStaff && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleRevoke(inv.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
