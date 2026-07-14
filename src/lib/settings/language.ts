/** Shared UI language options (constrained to profiles.language_preference CHECK). */
export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "gu", label: "ગુજરાતી (Gujarati)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
] as const;

export type LanguageValue = (typeof LANGUAGE_OPTIONS)[number]["value"];
