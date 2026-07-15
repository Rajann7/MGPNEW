"use client";

import { formatINR } from "@/lib/billing/format";
import type { Invoice, InvoiceLineItem } from "@/types";

export function InvoiceDetailClient({
  invoice,
  lineItems,
}: {
  invoice: Invoice;
  lineItems: InvoiceLineItem[];
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
          >
            Print
          </button>
          <a
            href={`/api/invoices/${invoice.id}/pdf`}
            className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-hover"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-8 print:border-0 print:shadow-none">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">My Gujarat Property</h1>
            <p className="text-xs text-zinc-500">Tax Invoice</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-zinc-900">
              {invoice.invoice_number ?? "—"}
            </p>
            <p className="text-xs text-zinc-500">
              {invoice.issued_at
                ? new Date(invoice.issued_at).toLocaleDateString("en-IN")
                : "—"}
            </p>
            <p className="text-xs text-zinc-500">FY {invoice.financial_year ?? "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide mb-1">
              Billed To
            </p>
            <p className="text-zinc-800">{invoice.buyer_legal_name ?? "—"}</p>
            {invoice.buyer_gstin && (
              <p className="text-zinc-500">GSTIN: {invoice.buyer_gstin}</p>
            )}
            {invoice.buyer_address && (
              <p className="text-zinc-500">{invoice.buyer_address}</p>
            )}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide mb-1">
              Place of Supply
            </p>
            <p className="text-zinc-800">{invoice.place_of_supply ?? "—"}</p>
            <p className="text-zinc-500 mt-2">
              {invoice.is_b2b ? "B2B invoice" : "B2C invoice"}
            </p>
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="text-left text-xs text-zinc-400 border-b border-zinc-200">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Taxable</th>
              <th className="py-2 text-right">GST %</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((li) => (
              <tr key={li.id} className="border-b border-zinc-100">
                <td className="py-2 text-zinc-800">{li.description}</td>
                <td className="py-2 text-right text-zinc-600">{li.quantity}</td>
                <td className="py-2 text-right text-zinc-600">
                  {formatINR(li.taxable_amount)}
                </td>
                <td className="py-2 text-right text-zinc-600">
                  {li.gst_rate_percent}%
                </td>
                <td className="py-2 text-right text-zinc-800">
                  {formatINR(li.line_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-56 flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Taxable amount</span>
              <span className="text-zinc-800">{formatINR(invoice.taxable_amount)}</span>
            </div>
            {invoice.cgst_amount > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-500">CGST</span>
                <span className="text-zinc-800">{formatINR(invoice.cgst_amount)}</span>
              </div>
            )}
            {invoice.sgst_amount > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-500">SGST</span>
                <span className="text-zinc-800">{formatINR(invoice.sgst_amount)}</span>
              </div>
            )}
            {invoice.igst_amount > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-500">IGST</span>
                <span className="text-zinc-800">{formatINR(invoice.igst_amount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-zinc-900 border-t border-zinc-200 pt-1.5">
              <span>Total</span>
              <span>{formatINR(invoice.total_amount)}</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-zinc-400">
          This is a computer-generated invoice and does not require a physical
          signature. Status: <span className="capitalize">{invoice.status}</span>.
        </p>
      </div>
    </div>
  );
}
