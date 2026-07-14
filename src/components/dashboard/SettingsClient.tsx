"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Languages,
  Bell,
  ShieldCheck,
  Wallet,
  UserCircle,
  LifeBuoy,
  Check,
  ChevronRight,
} from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { updateLanguagePreference } from "@/lib/actions/settings";
import { LANGUAGE_OPTIONS } from "@/lib/settings/language";

const ERR: Record<string, string> = {
  AUTH_REQUIRED: "Please log in again.",
  VALIDATION_ERROR: "That language isn't supported.",
  UNKNOWN_ERROR: "Couldn't save. Please try again.",
};

export function SettingsClient({
  currentLanguage,
  accountStatus,
  verificationStatus,
  memberSince,
  quickLinks,
}: {
  currentLanguage: string;
  accountStatus: string;
  verificationStatus: string;
  memberSince: string;
  quickLinks: { verification: string; billing: string };
}) {
  const [language, setLanguage] = useState(currentLanguage);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSelect(value: string) {
    if (value === language || isPending) return;
    const previous = language;
    setLanguage(value);
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const res = await updateLanguagePreference(value);
      if (!res.success) {
        setLanguage(previous); // honest rollback
        setError(ERR[res.error ?? "UNKNOWN_ERROR"] ?? "Couldn't save.");
        return;
      }
      setSaved(true);
    });
  }

  return (
    <div className="space-y-4">
      {/* Language — real, persisted preference */}
      <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Languages className="h-4.5 w-4.5 text-brand" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-ink">Language</h3>
        </div>
        <p className="mb-3 text-xs text-muted">
          Choose the language for your interface. Saved to your account.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {LANGUAGE_OPTIONS.map((opt) => {
            const active = language === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                disabled={isPending}
                onClick={() => onSelect(opt.value)}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                  active
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border text-ink hover:bg-bg"
                }`}
              >
                {opt.label}
                {active && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        {saved && !error && (
          <p className="mt-2.5 text-xs font-medium text-emerald-600">
            Language preference saved.
          </p>
        )}
        {error && (
          <Alert tone="danger" className="mt-2.5">
            {error}
          </Alert>
        )}
      </section>

      {/* Notification channels — honest status, not fake toggles */}
      <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bell className="h-4.5 w-4.5 text-brand" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-ink">Notifications</h3>
        </div>
        <ul className="divide-y divide-border text-sm">
          <ChannelRow
            label="In-app notifications"
            status="on"
            note="Always on — shown in your notification bell."
          />
          <ChannelRow
            label="Email"
            status="setup"
            note="Setup Required — email provider not yet configured."
          />
          <ChannelRow
            label="SMS"
            status="setup"
            note="Setup Required — SMS provider not yet configured."
          />
          <ChannelRow
            label="WhatsApp"
            status="setup"
            note="Setup Required — WhatsApp provider not yet configured."
          />
        </ul>
      </section>

      {/* Account — real read-only info + real links */}
      <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-ink">Account</h3>
        <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
          <Field label="Status" value={cap(accountStatus)} />
          <Field label="Verification" value={cap(verificationStatus.replace(/_/g, " "))} />
          <Field label="Member since" value={memberSince} />
        </dl>
        <div className="mt-4 space-y-2">
          <SettingLink href="/profile" icon={UserCircle} label="Edit profile" />
          <SettingLink
            href={quickLinks.verification}
            icon={ShieldCheck}
            label="Verification"
          />
          <SettingLink href={quickLinks.billing} icon={Wallet} label="Billing & invoices" />
          <SettingLink href="/support" icon={LifeBuoy} label="Support & account help" />
        </div>
      </section>
    </div>
  );
}

function ChannelRow({
  label,
  status,
  note,
}: {
  label: string;
  status: "on" | "setup";
  note: string;
}) {
  return (
    <li className="flex items-start justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="font-medium text-ink">{label}</p>
        <p className="text-xs text-muted">{note}</p>
      </div>
      <span
        className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
          status === "on"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
            : "border-amber-500/20 bg-amber-500/10 text-amber-600"
        }`}
      >
        {status === "on" ? "On" : "Setup Required"}
      </span>
    </li>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}

function SettingLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof UserCircle;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg"
    >
      <Icon className="h-4.5 w-4.5 text-muted" aria-hidden="true" />
      {label}
      <ChevronRight className="ml-auto h-4 w-4 text-muted" aria-hidden="true" />
    </Link>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
