export const CLOSE_REASONS = [
  "not_interested",
  "budget_mismatch",
  "location_mismatch",
  "went_with_another",
  "unreachable",
  "invalid_requirement",
  "converted_offline",
  "duplicate",
  "spam",
  "other",
] as const;

export function isValidCloseReason(
  reason: string
): reason is (typeof CLOSE_REASONS)[number] {
  return (CLOSE_REASONS as readonly string[]).includes(reason);
}
