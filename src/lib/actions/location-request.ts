"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import type { ActionResult } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^(\+91)?[6-9]\d{9}$/;

/**
 * Missing-location request (search empty-state modal). Real capture into
 * public.location_requests — no fake "we'll notify you" without a record.
 * Contact must look like an email or an Indian mobile.
 */
export async function requestLocation(
  locationText: string,
  contactText: string
): Promise<ActionResult<{ ok: true }>> {
  const location = locationText.trim();
  const contact = contactText.trim();

  if (location.length < 2) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { location: ["Enter the area you're looking in"] },
    };
  }
  const normalizedMobile = contact.replace(/\s/g, "");
  const isValidContact =
    EMAIL_RE.test(contact) || MOBILE_RE.test(normalizedMobile);
  if (!isValidContact) {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { contact: ["Enter a valid email or mobile number"] },
    };
  }

  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const { error } = await supabase.from("location_requests").insert({
    location_text: location.slice(0, 200),
    contact_text: contact.slice(0, 200),
    requester_profile_id: profile?.id ?? null,
    source: "search_empty_state",
  });

  if (error) {
    console.error("[requestLocation] insert error:", error.code);
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return { success: true, data: { ok: true } };
}
