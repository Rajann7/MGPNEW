import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { getCurrentProfile } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { formatINR } from "@/lib/billing/format";
import type { Invoice, InvoiceLineItem } from "@/types";

// Node runtime required: pdfkit streams via Node buffers.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Private, on-demand invoice PDF. Never cached/public — regenerated per
 * request from the immutable invoice + line item rows (same source of truth
 * as the on-screen invoice detail page), gated to the invoice's own profile.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  }

  const admin = createServiceClient();
  const { data: invoice } = await admin
    .from("invoices")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!invoice) {
    return NextResponse.json({ error: "ENTITY_NOT_FOUND" }, { status: 404 });
  }
  const inv = invoice as Invoice;
  if (inv.profile_id !== profile.id) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const { data: lineItems } = await admin
    .from("invoice_line_items")
    .select("*")
    .eq("invoice_id", id)
    .order("id");

  const pdfBuffer = await renderInvoicePdf(inv, (lineItems ?? []) as InvoiceLineItem[]);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${inv.invoice_number ?? inv.id}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}

function renderInvoicePdf(
  invoice: Invoice,
  lineItems: InvoiceLineItem[]
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(16).text("My Gujarat Property", { continued: false });
    doc.fontSize(9).fillColor("#71717a").text("Tax Invoice");
    doc.moveDown(1);

    doc.fillColor("#18181b").fontSize(11);
    doc.text(`Invoice: ${invoice.invoice_number ?? "—"}`);
    doc.text(
      `Date: ${invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString("en-IN") : "—"}`
    );
    doc.text(`FY: ${invoice.financial_year ?? "—"}`);
    doc.moveDown(1);

    doc.fontSize(10).fillColor("#71717a").text("Billed To");
    doc.fillColor("#18181b").fontSize(11);
    doc.text(invoice.buyer_legal_name ?? "—");
    if (invoice.buyer_gstin) doc.text(`GSTIN: ${invoice.buyer_gstin}`);
    if (invoice.buyer_address) doc.text(invoice.buyer_address);
    doc.moveDown(1);

    doc.fontSize(10).fillColor("#71717a");
    doc.text(`Place of Supply: ${invoice.place_of_supply ?? "—"}`);
    doc.text(invoice.is_b2b ? "B2B invoice" : "B2C invoice");
    doc.moveDown(1);

    // Line items table (simple grid, no external table lib).
    const startX = 50;
    let y = doc.y;
    const colWidths = [220, 60, 80, 60, 80];
    const headers = ["Description", "Qty", "Taxable", "GST %", "Total"];
    doc.fontSize(9).fillColor("#71717a");
    let x = startX;
    headers.forEach((h, i) => {
      doc.text(h, x, y, { width: colWidths[i], align: i === 0 ? "left" : "right" });
      x += colWidths[i];
    });
    y += 16;
    doc
      .moveTo(startX, y)
      .lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y)
      .strokeColor("#e4e4e7")
      .stroke();
    y += 6;

    doc.fillColor("#18181b").fontSize(10);
    for (const li of lineItems) {
      x = startX;
      const row = [
        li.description,
        String(li.quantity),
        formatINR(li.taxable_amount),
        `${li.gst_rate_percent}%`,
        formatINR(li.line_total),
      ];
      row.forEach((val, i) => {
        doc.text(val, x, y, { width: colWidths[i], align: i === 0 ? "left" : "right" });
        x += colWidths[i];
      });
      y += 18;
    }
    doc.y = y + 10;

    doc.fontSize(10);
    const summaryX = startX + 300;
    function summaryLine(label: string, value: string, bold = false) {
      doc.fontSize(bold ? 11 : 10).fillColor(bold ? "#18181b" : "#71717a");
      doc.text(label, summaryX, doc.y, { continued: true, width: 140 });
      doc.text(value, { align: "right", width: 140 });
    }
    summaryLine("Taxable amount", formatINR(invoice.taxable_amount));
    if (invoice.cgst_amount > 0) summaryLine("CGST", formatINR(invoice.cgst_amount));
    if (invoice.sgst_amount > 0) summaryLine("SGST", formatINR(invoice.sgst_amount));
    if (invoice.igst_amount > 0) summaryLine("IGST", formatINR(invoice.igst_amount));
    summaryLine("Total", formatINR(invoice.total_amount), true);

    doc.moveDown(3);
    doc
      .fontSize(8)
      .fillColor("#a1a1aa")
      .text(
        "This is a computer-generated invoice and does not require a physical signature.",
        startX,
        doc.y
      );

    doc.end();
  });
}
