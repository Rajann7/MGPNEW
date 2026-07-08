/**
 * Report categories — user-facing labels mapped to the real `user_reports.category`
 * enum (check constraint in migration 20260701160000). Full relevant set for a
 * listing report, sourced from the DB enum (not a design sample subset).
 *
 * Kept in a plain (non-"use server") module so it can be imported by both the
 * client `ReportModal` and the server action without violating the rule that a
 * "use server" file may only export async functions.
 */
export const REPORT_CATEGORIES: { value: string; label: string }[] = [
  { value: "spam", label: "Spam or advertising" },
  { value: "duplicate", label: "Duplicate listing" },
  { value: "fraud", label: "Fraud / suspicious" },
  { value: "wrong_information", label: "Incorrect information" },
  { value: "illegal_content", label: "Inappropriate / illegal content" },
  { value: "abuse", label: "Abusive or harassing" },
  { value: "other", label: "Other" },
];

export const REPORT_CATEGORY_VALUES = new Set(
  REPORT_CATEGORIES.map((c) => c.value)
);
