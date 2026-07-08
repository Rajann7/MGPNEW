import "server-only";

/**
 * GST helpers — basic, configurable. NOT tax advice, no GST verification API.
 * Place-of-supply logic: platform is registered in Gujarat (state code "24").
 * Intra-state (buyer state == seller state) => CGST + SGST; else IGST.
 */

export const SELLER_STATE_CODE = "24"; // Gujarat — configurable placeholder

/** Basic GSTIN format check (15 chars). Format-only, no external verification. */
export function isValidGstinFormat(gstin: string): boolean {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
    gstin.trim().toUpperCase()
  );
}

export interface GstBreakdown {
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  ratePercent: number;
  intraState: boolean;
}

/**
 * Compute GST from a payable total.
 * @param payableTotal  the amount the buyer pays (INR major units)
 * @param ratePercent   GST rate (e.g. 18)
 * @param inclusive     true => payableTotal already includes GST (back-calc)
 * @param buyerStateCode buyer's state code; null => treat as seller state (B2C intra)
 */
export function computeGst(
  payableTotal: number,
  ratePercent: number,
  inclusive: boolean,
  buyerStateCode: string | null
): GstBreakdown {
  const intraState = !buyerStateCode || buyerStateCode === SELLER_STATE_CODE;
  const rate = ratePercent / 100;

  let taxable: number;
  let tax: number;
  if (inclusive) {
    taxable = round2(payableTotal / (1 + rate));
    tax = round2(payableTotal - taxable);
  } else {
    taxable = round2(payableTotal);
    tax = round2(payableTotal * rate);
  }
  const total = round2(taxable + tax);

  if (intraState) {
    const half = round2(tax / 2);
    return {
      taxableAmount: taxable,
      cgst: half,
      sgst: round2(tax - half),
      igst: 0,
      total,
      ratePercent,
      intraState,
    };
  }
  return {
    taxableAmount: taxable,
    cgst: 0,
    sgst: 0,
    igst: tax,
    total,
    ratePercent,
    intraState,
  };
}

/** Indian financial year label for a date, e.g. 2026-07-02 -> "26-27". */
export function financialYear(date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1; // 1-12
  const startYear = m >= 4 ? y : y - 1; // FY starts in April
  const a = String(startYear).slice(-2);
  const b = String(startYear + 1).slice(-2);
  return `${a}-${b}`;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
