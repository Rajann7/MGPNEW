/**
 * Enquiry form presentation config (shared client + server).
 * Ported behavior from the previous project's contact/lead flow.
 */

/** Interest types a sender can pick in the enquiry form. Must match the
 * leads_interest_type_check DB constraint. */
export const INTEREST_TYPES = [
  { value: "call_me", label: "Call me back" },
  { value: "site_visit", label: "Schedule a site visit" },
  { value: "price", label: "Need price details" },
  { value: "photos", label: "Need more photos" },
  { value: "location", label: "Need location details" },
  { value: "general", label: "General enquiry" },
] as const;

export type InterestType = (typeof INTEREST_TYPES)[number]["value"];

export const INTEREST_VALUES: string[] = INTEREST_TYPES.map((t) => t.value);

/** Valid CRM stage filter values for the admin leads queue. */
export const CRM_STAGE_FILTERS: string[] = [
  "new",
  "contacted",
  "interested",
  "follow_up",
  "site_visit",
  "proposal",
  "negotiation",
  "converted",
  "lost",
  "closed",
];

/** Partially masked mobile for display in the enquiry form — never the full
 * number in client payloads. Returns null when no usable number exists. */
export function maskMobile(mobile: string | null | undefined): string | null {
  if (!mobile) return null;
  const digits = mobile.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return null;
  return `+91 ${digits.slice(0, 2)}••••${digits.slice(-3)}`;
}
