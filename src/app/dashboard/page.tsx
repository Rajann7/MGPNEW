import { getCurrentProfile } from "@/lib/auth/session";
import { getDashboardRoute } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?redirectTo=/dashboard");
  }

  // Redirect to role-specific dashboard
  redirect(getDashboardRoute(profile.public_role));
}
