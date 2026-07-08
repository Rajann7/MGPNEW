// One-off dev seed script — creates a test Super Admin staff account for
// manual verification of Prompt 07. Development use only. Uses the service
// role key already configured in .env.local (never printed by this script).
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment."
  );
  process.exit(1);
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const EMAIL = "testsuperadmin@mgptest.dev";
const PASSWORD = "TestSuperAdmin@123";

async function main() {
  // 1. Create or find the auth user
  let userId;
  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
    }
  );

  if (createErr) {
    if (
      createErr.message?.includes("already been registered") ||
      createErr.code === "email_exists"
    ) {
      const { data: list } = await admin.auth.admin.listUsers();
      const existing = list.users.find((u) => u.email === EMAIL);
      if (!existing) throw createErr;
      userId = existing.id;
      console.log("Auth user already exists:", userId);
    } else {
      throw createErr;
    }
  } else {
    userId = created.user.id;
    console.log("Auth user created:", userId);
  }

  // 2. Create or update the staff_profiles row
  const { data: existingStaff } = await admin
    .from("staff_profiles")
    .select("id")
    .eq("email", EMAIL)
    .maybeSingle();

  if (existingStaff) {
    const { error } = await admin
      .from("staff_profiles")
      .update({
        auth_user_id: userId,
        staff_status: "active",
        internal_role: "super_admin",
      })
      .eq("id", existingStaff.id);
    if (error) throw error;
    console.log("staff_profiles row updated:", existingStaff.id);
  } else {
    const { data, error } = await admin
      .from("staff_profiles")
      .insert({
        auth_user_id: userId,
        email: EMAIL,
        full_name: "Test Super Admin",
        internal_role: "super_admin",
        staff_status: "active",
      })
      .select("id")
      .single();
    if (error) throw error;
    console.log("staff_profiles row created:", data.id);
  }

  console.log("\nDone. Login at /admin/login with:");
  console.log("  Email:", EMAIL);
  console.log("  Password: (see scripts/seed-super-admin.mjs)");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
