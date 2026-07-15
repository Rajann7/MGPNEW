import { createClient } from "@supabase/supabase-js";
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await admin
  .from("payment_orders")
  .select("*")
  .eq("purpose", "add_on")
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();
console.log(JSON.stringify(data));
