"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { LANGUAGE_OPTIONS, type LanguageValue } from "@/lib/settings/language";
import type { ActionResult } from "@/types";

/**
 * Persists the signed-in user's UI language preference to
 * profiles.language_preference (real, RLS-scoped update — a user can only
 * update their own row). Values are constrained to the DB CHECK set.
 */
export async function updateLanguagePreference(
  language: string
): Promise<ActionResult<{ language: LanguageValue }>> {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "AUTH_REQUIRED" };

  if (!LANGUAGE_OPTIONS.some((o) => o.value === language)) {
    return { success: false, error: "VALIDATION_ERROR" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ language_preference: language })
    .eq("id", profile.id);

  if (error) return { success: false, error: "UNKNOWN_ERROR" };

  revalidatePath("/dashboard/owner/settings");
  revalidatePath("/dashboard/broker/settings");
  revalidatePath("/dashboard/builder/settings");
  return { success: true, data: { language: language as LanguageValue } };
}
