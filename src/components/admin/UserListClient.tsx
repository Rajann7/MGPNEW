"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { listUsers } from "@/lib/actions/admin/users";
import type { Profile, PublicRole, AccountStatus } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-blue-50 text-blue-700 border-blue-100",
  suspended: "bg-amber-50 text-amber-700 border-amber-100",
  banned: "bg-red-50 text-red-600 border-red-100",
  deleted: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export function UserListClient({
  initialItems,
  initialTotal,
}: {
  initialItems: Profile[];
  initialTotal: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [role, setRole] = useState<PublicRole | "">("");
  const [status, setStatus] = useState<AccountStatus | "">("");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  function applyFilters() {
    startTransition(async () => {
      const result = await listUsers({
        role: role || undefined,
        status: status || undefined,
        search: search || undefined,
      });
      if (result.success) {
        setItems(result.data.items);
        setTotal(result.data.total);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search name, email, mobile…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as PublicRole | "")}
            className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          >
            <option value="">All roles</option>
            <option value="owner">Owner</option>
            <option value="broker">Broker</option>
            <option value="builder">Builder</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AccountStatus | "")}
            className="px-3 py-2 rounded-lg border border-zinc-300 text-sm"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
            <option value="deleted">Deleted</option>
          </select>
          <button
            type="button"
            onClick={applyFilters}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-semibold disabled:opacity-60"
          >
            Filter
          </button>
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting your filters."
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_100px_120px_140px] gap-2 px-4 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-100">
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined</span>
          </div>
          <div className="flex flex-col divide-y divide-zinc-100">
            {items.map((u) => (
              <Link
                key={u.id}
                href={`/admin/users/${u.id}`}
                className="grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_140px] gap-1 sm:gap-2 px-4 py-3 hover:bg-zinc-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {u.display_name ?? u.full_name}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {u.email ?? u.mobile ?? "—"}
                  </p>
                </div>
                <span className="text-sm text-zinc-600 capitalize">
                  {u.public_role}
                </span>
                <span
                  className={`inline-flex w-fit items-center text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${STATUS_CLASS[u.account_status] ?? ""}`}
                >
                  {u.account_status}
                </span>
                <span className="text-xs text-zinc-400">
                  {new Date(u.created_at).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}
      <p className="text-xs text-zinc-400">
        {total} total user(s) — showing {items.length}
      </p>
    </div>
  );
}
