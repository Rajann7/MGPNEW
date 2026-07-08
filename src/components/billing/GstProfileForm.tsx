"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updateGstProfile } from "@/lib/actions/billing";
import type { GstProfile } from "@/types";

export function GstProfileForm({ initial }: { initial: GstProfile | null }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isB2b, setIsB2b] = useState(initial?.is_b2b ?? false);

  function onSubmit(formData: FormData) {
    setMsg(null);
    start(async () => {
      const res = await updateGstProfile({
        legalName: String(formData.get("legalName") ?? ""),
        gstin: String(formData.get("gstin") ?? ""),
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        stateCode: String(formData.get("stateCode") ?? ""),
        pinCode: String(formData.get("pinCode") ?? ""),
        isB2b,
        invoiceEmail: String(formData.get("invoiceEmail") ?? ""),
      });
      if (res.success) {
        setMsg({ ok: true, text: "Billing details saved." });
        router.refresh();
      } else if (res.error === "GST_PROFILE_INVALID")
        setMsg({
          ok: false,
          text: res.fieldErrors?.gstin?.[0] ?? "Invalid GST details.",
        });
      else setMsg({ ok: false, text: "Could not save billing details." });
    });
  }

  const input =
    "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-brand focus:outline-none";

  return (
    <form action={onSubmit} className="max-w-lg flex flex-col gap-4">
      {msg && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700 border border-red-100"}`}
        >
          {msg.text}
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={isB2b}
          onChange={(e) => setIsB2b(e.target.checked)}
          className="rounded border-zinc-300"
        />
        I need a GST (B2B) invoice
      </label>

      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          Billing legal name
        </label>
        <input
          name="legalName"
          defaultValue={initial?.legal_name ?? ""}
          className={input}
          placeholder="Full legal / business name"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          GSTIN {isB2b && <span className="text-red-500">*</span>}
        </label>
        <input
          name="gstin"
          defaultValue={initial?.gstin ?? ""}
          className={input}
          placeholder="15-character GSTIN"
          maxLength={15}
          style={{ textTransform: "uppercase" }}
        />
        <p className="mt-1 text-[11px] text-zinc-400">
          Format is validated. We do not verify GSTIN with any government
          service.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          Billing address
        </label>
        <textarea
          name="address"
          defaultValue={initial?.address ?? ""}
          className={input}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1">
            City
          </label>
          <input
            name="city"
            defaultValue={initial?.city ?? ""}
            className={input}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1">
            State code
          </label>
          <input
            name="stateCode"
            defaultValue={initial?.state_code ?? ""}
            className={input}
            placeholder="24"
            maxLength={2}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1">
            PIN
          </label>
          <input
            name="pinCode"
            defaultValue={initial?.pin_code ?? ""}
            className={input}
            maxLength={10}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          Invoice email
        </label>
        <input
          name="invoiceEmail"
          type="email"
          defaultValue={initial?.invoice_email ?? ""}
          className={input}
          placeholder="invoices@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60 w-fit"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />} Save billing
        details
      </button>
    </form>
  );
}
