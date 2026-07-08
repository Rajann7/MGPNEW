import { redirect } from "next/navigation";

// Invites are managed inline on /admin/staff (single page, single source of truth).
// This route exists for URL-structure compatibility with the phase spec.
export default function StaffInvitesRedirectPage() {
  redirect("/admin/staff");
}
