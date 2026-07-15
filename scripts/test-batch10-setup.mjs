import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const admin = createClient(url, key);

// Test coupon: 10% off, owner role, active.
const { data: existingCoupon } = await admin
  .from("coupons")
  .select("id")
  .eq("code", "TEST10")
  .maybeSingle();
if (!existingCoupon) {
  await admin.from("coupons").insert({
    code: "TEST10",
    discount_type: "percentage",
    discount_value: 10,
    applies_role: "owner",
    min_amount: 0,
    usage_limit: 100,
    per_user_limit: 5,
    is_active: true,
  });
  console.log("Created coupon TEST10");
} else {
  console.log("Coupon TEST10 already exists");
}

// Test add-on for owner role.
const { data: existingAddOn } = await admin
  .from("add_ons")
  .select("id")
  .eq("add_on_code", "extra_boost_5")
  .maybeSingle();
if (!existingAddOn) {
  const { data } = await admin
    .from("add_ons")
    .insert({
      add_on_code: "extra_boost_5",
      role: "owner",
      name: "5 Extra Listing Boosts",
      description: "Boost 5 additional listings to top of search results.",
      price_amount: 99,
      quantity_grant: 5,
      feature_key: "listing_boost_credits",
      is_active: true,
      is_public: true,
    })
    .select("id")
    .single();
  console.log("Created add-on extra_boost_5:", data.id);
} else {
  console.log("Add-on extra_boost_5 already exists:", existingAddOn.id);
}

// Clean up the stale pending payment_order noticed in the UI (dev leftover from
// an earlier test session that never completed checkout) so the banner reflects
// only real in-progress state during this verification pass.
const { data: staleOrders } = await admin
  .from("payment_orders")
  .select("id, status, created_at")
  .in("status", ["created", "checkout_started", "payment_authorized"])
  .order("created_at", { ascending: false });
console.log("Pending orders found:", JSON.stringify(staleOrders));

const { data: invoices } = await admin.from("invoices").select("id, invoice_number").order("created_at", { ascending: false }).limit(5);
console.log("Recent invoices:", JSON.stringify(invoices));
