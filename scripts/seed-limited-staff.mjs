// One-off dev seed script — creates a test staff account with NO granted
// permissions (functional role: support_manager) to verify permission-aware
// nav/denial live for Prompt 07 verification. Development use only.
import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

const EMAIL = "testlimitedstaff@mgptest.dev";
const PASSWORD = "TestLimitedStaff@123";

async function main() {
  let userId;
  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
    }
  );

  if (createErr) {
    if (createErr.code === "email_exists") {
      const { data: list } = await admin.auth.admin.listUsers();
      userId = list.users.find((u) => u.email === EMAIL)?.id;
    } else {
      throw createErr;
    }
  } else {
    userId = created.user.id;
  }

  const { data: existingStaff } = await admin
    .from("staff_profiles")
    .select("id")
    .eq("email", EMAIL)
    .maybeSingle();

  if (existingStaff) {
    await admin
      .from("staff_profiles")
      .update({
        auth_user_id: userId,
        staff_status: "active",
        internal_role: "support_manager",
      })
      .eq("id", existingStaff.id);
    console.log("Updated existing staff_profiles row:", existingStaff.id);
  } else {
    const { data, error } = await admin
      .from("staff_profiles")
      .insert({
        auth_user_id: userId,
        email: EMAIL,
        full_name: "Test Limited Staff",
        internal_role: "support_manager",
        staff_status: "active",
      })
      .select("id")
      .single();
    if (error) throw error;
    console.log("Created staff_profiles row:", data.id);
    // Intentionally NO staff_permissions rows granted — this account should
    // see every non-dashboard nav item disabled and be denied every module.
  }

  console.log("\nLogin at /admin/login with:");
  console.log("  Email:", EMAIL);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
