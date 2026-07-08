"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  suspendUser,
  banUser,
  restoreUser,
  addUserInternalNote,
} from "@/lib/actions/admin/users";
import type { Profile } from "@/types";

export function UserDetailClient({
  profile,
  propertyCount,
  projectCount,
  requirementCount,
  initialNotes,
  canUpdate,
}: {
  profile: Profile;
  propertyCount: number;
  projectCount: number;
  requirementCount: number;
  initialNotes: {
    id: string;
    note: string;
    created_at: string;
    staff_profile_id: string | null;
  }[];
  canUpdate: boolean;
}) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runStatusAction(action: typeof suspendUser) {
    if (reason.trim().length < 3) {
      setError("Enter a reason (min 3 characters).");
      return;
    }
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await action(profile.id, reason.trim());
      if (!result.success) {
        setError(result.error);
        return;
      }
      setMessage("Account status updated.");
      setReason("");
      router.refresh();
    });
  }

  function handleAddNote() {
    if (note.trim().length < 2) return;
    startTransition(async () => {
      const result = await addUserInternalNote(profile.id, note.trim());
      if (result.success) {
        setNotes((prev) => [
          {
            id: crypto.randomUUID(),
            note: note.trim(),
            created_at: new Date().toISOString(),
            staff_profile_id: null,
          },
          ...prev,
        ]);
        setNote("");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Profile
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 text-sm">
          <span className="text-zinc-500">Name</span>
          <span className="col-span-2 font-medium text-zinc-900">
            {profile.full_name}
          </span>
          <span className="text-zinc-500">Role</span>
          <span className="col-span-2 font-medium text-zinc-900 capitalize">
            {profile.public_role}
          </span>
          <span className="text-zinc-500">Status</span>
          <span className="col-span-2 font-medium text-zinc-900 capitalize">
            {profile.account_status}
          </span>
          <span className="text-zinc-500">Verification</span>
          <span className="col-span-2 font-medium text-zinc-900 capitalize">
            {profile.verification_status.replace(/_/g, " ")}
          </span>
          <span className="text-zinc-500">Email</span>
          <span className="col-span-2 font-medium text-zinc-900">
            {profile.email ?? "—"}
          </span>
          <span className="text-zinc-500">Mobile</span>
          <span className="col-span-2 font-medium text-zinc-900">
            {profile.mobile ?? "—"}
          </span>
          <span className="text-zinc-500">Joined</span>
          <span className="col-span-2 font-medium text-zinc-900">
            {new Date(profile.created_at).toLocaleDateString()}
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <p className="text-xs text-zinc-500">Properties</p>
          <p className="text-xl font-bold text-zinc-900">{propertyCount}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-zinc-500">Projects</p>
          <p className="text-xl font-bold text-zinc-900">{projectCount}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-zinc-500">Requirements</p>
          <p className="text-xl font-bold text-zinc-900">{requirementCount}</p>
        </Card>
      </div>

      {canUpdate && (
        <Card>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Account Actions
          </p>
          <input
            type="text"
            placeholder="Reason (required for suspend/ban/restore)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={isPending}
              onClick={() => runStatusAction(suspendUser)}
            >
              Suspend
            </Button>
            <Button
              size="sm"
              variant="destructive"
              disabled={isPending}
              onClick={() => runStatusAction(banUser)}
            >
              Ban
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => runStatusAction(restoreUser)}
            >
              Restore
            </Button>
          </div>
          {error && (
            <Alert tone="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {message && (
            <Alert tone="success" className="mt-3">
              {message}
            </Alert>
          )}
        </Card>
      )}

      <Card>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Internal Notes (Staff Only)
        </p>
        {canUpdate && (
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add an internal note…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
            <Button size="sm" disabled={isPending} onClick={handleAddNote}>
              Add
            </Button>
          </div>
        )}
        {notes.length === 0 ? (
          <p className="text-sm text-zinc-400">No internal notes yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((n) => (
              <div
                key={n.id}
                className="text-sm bg-zinc-50 rounded-lg px-3 py-2"
              >
                <p className="text-zinc-800">{n.note}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
