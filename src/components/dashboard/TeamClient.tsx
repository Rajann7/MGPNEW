"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Copy, Check, Shield, MoreVertical } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import {
  inviteTeamMember,
  updateTeamMemberPermissions,
  setTeamMemberStatus,
  type TeamMember,
} from "@/lib/actions/team";
import {
  TEAM_PERMISSIONS,
  type TeamPermissionKey,
  type TeamPermissions,
} from "@/lib/team/permissions";

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in again.",
  VALIDATION_ERROR: "Enter a name and an email or mobile.",
  DUPLICATE: "This person is already on your team.",
  FORBIDDEN: "You can't manage this member.",
  NOT_ACCEPTED: "They must accept the invite before being activated.",
  ENTITY_NOT_FOUND: "That member no longer exists.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

const STATUS_META: Record<TeamMember["status"], { label: string; cls: string }> = {
  invited: { label: "Invited", cls: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  active: { label: "Active", cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  suspended: { label: "Suspended", cls: "bg-red-500/10 text-red-600 border-red-500/20" },
  removed: { label: "Removed", cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
};

function emptyPerms(): TeamPermissions {
  return Object.fromEntries(
    TEAM_PERMISSIONS.map((p) => [p.key, false])
  ) as TeamPermissions;
}

export function TeamClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(initialMembers.length === 0);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // invite form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [title, setTitle] = useState("");
  const [perms, setPerms] = useState<TeamPermissions>(emptyPerms());

  function submitInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInviteLink(null);
    startTransition(async () => {
      const res = await inviteTeamMember({ name, email, mobile, title, permissions: perms });
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      const link = `${window.location.origin}/team/invite?token=${res.data.inviteToken}`;
      setInviteLink(link);
      setName("");
      setEmail("");
      setMobile("");
      setTitle("");
      setPerms(emptyPerms());
      router.refresh();
    });
  }

  function togglePerm(m: TeamMember, key: TeamPermissionKey) {
    const next = { ...m.permissions, [key]: !m.permissions[key] };
    setError(null);
    startTransition(async () => {
      const res = await updateTeamMemberPermissions(m.id, next);
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      router.refresh();
    });
  }

  function changeStatus(m: TeamMember, status: "active" | "suspended" | "removed") {
    setError(null);
    startTransition(async () => {
      const res = await setTeamMemberStatus(m.id, status);
      if (!res.success) {
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Error");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-ink">Your team</h2>
          <p className="text-xs text-muted">
            Invite agents and control exactly what each can do.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowInvite((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
        >
          <UserPlus className="h-4 w-4" /> Invite agent
        </button>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      {showInvite && (
        <form onSubmit={submitInvite} className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">Invite a new agent</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="form-input w-full" placeholder="Agent name" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Title <span className="font-normal text-muted">(optional)</span></span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-input w-full" placeholder="e.g. Sales Agent" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input w-full" placeholder="agent@example.com" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Mobile</span>
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-input w-full" placeholder="10-digit mobile" />
            </label>
          </div>
          <div className="mt-3">
            <span className="mb-1.5 block text-xs font-medium text-ink">Permissions</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TEAM_PERMISSIONS.map((p) => (
                <label key={p.key} className="flex items-start gap-2 rounded-lg border border-border p-2.5 text-xs">
                  <input
                    type="checkbox"
                    checked={perms[p.key]}
                    onChange={() => setPerms((prev) => ({ ...prev, [p.key]: !prev[p.key] }))}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-medium text-ink">{p.label}</span>
                    <span className="block text-muted">{p.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted">
            Email/SMS delivery isn&apos;t configured yet, so we&apos;ll show you a
            secure invite link to share manually — nothing is auto-sent.
          </p>
          <button type="submit" disabled={isPending} className="mt-3 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60">
            {isPending ? "Creating invite…" : "Create invite"}
          </button>

          {inviteLink && (
            <div className="mt-3 rounded-lg border border-brand/30 bg-brand-soft p-3">
              <p className="text-xs font-medium text-brand">Invite created — share this link:</p>
              <div className="mt-1.5 flex items-center gap-2">
                <input readOnly value={inviteLink} className="form-input w-full text-xs" onFocus={(e) => e.currentTarget.select()} />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(inviteLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-2 text-xs font-medium text-ink"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Roster */}
      {initialMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
          <Users className="mb-3 h-9 w-9 text-muted" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink">No team members yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            Invite agents to help manage your projects, leads and proposals.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {initialMembers.map((m) => (
            <li key={m.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {(m.invited_name ?? m.invited_email ?? "?").charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {m.invited_name ?? m.invited_email ?? m.invited_mobile}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {m.title ?? "Agent"}
                        {m.invited_email ? ` · ${m.invited_email}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_META[m.status].cls}`}>
                    {STATUS_META[m.status].label}
                  </span>
                  <MemberMenu member={m} onStatus={changeStatus} disabled={isPending} />
                </div>
              </div>

              {/* Permission toggles */}
              <div className="mt-3 border-t border-border pt-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
                  <Shield className="h-3.5 w-3.5 text-brand" /> Permissions
                </p>
                <div className="flex flex-wrap gap-2">
                  {TEAM_PERMISSIONS.map((p) => {
                    const on = m.permissions?.[p.key];
                    return (
                      <button
                        key={p.key}
                        type="button"
                        disabled={isPending || m.status === "suspended"}
                        onClick={() => togglePerm(m, p.key)}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors disabled:opacity-50 ${
                          on
                            ? "border-brand bg-brand-soft text-brand"
                            : "border-border bg-bg text-muted hover:text-ink"
                        }`}
                      >
                        {on ? "✓ " : ""}
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MemberMenu({
  member,
  onStatus,
  disabled,
}: {
  member: TeamMember;
  onStatus: (m: TeamMember, s: "active" | "suspended" | "removed") => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Member actions"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1.5 text-muted hover:bg-bg"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-border bg-surface py-1 shadow-lg">
            {member.status !== "active" && (
              <button type="button" disabled={disabled} onClick={() => { setOpen(false); onStatus(member, "active"); }} className="block w-full px-3 py-2 text-left text-xs text-ink hover:bg-bg disabled:opacity-50">
                Activate
              </button>
            )}
            {member.status !== "suspended" && (
              <button type="button" disabled={disabled} onClick={() => { setOpen(false); onStatus(member, "suspended"); }} className="block w-full px-3 py-2 text-left text-xs text-ink hover:bg-bg disabled:opacity-50">
                Suspend
              </button>
            )}
            <button type="button" disabled={disabled} onClick={() => { setOpen(false); onStatus(member, "removed"); }} className="block w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-500/10 disabled:opacity-50">
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}
