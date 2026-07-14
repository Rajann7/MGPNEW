// Dev-only seed — creates a varied set of site_visits for the Test Owner
// account (fc70fa9d…) so the Owner Site Visits screen (B6-S08) can be
// manually verified across every status / tab / action branch.
//
// NOT for production. Every row it creates is tracked in
// scripts/dev-site-visits.fixture.json so it can be removed cleanly:
//
//   node --env-file=.env.local scripts/seed-dev-site-visits.mjs          # seed
//   node --env-file=.env.local scripts/seed-dev-site-visits.mjs --clean  # remove
//
// Uses the service role key from .env.local (never printed).
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const FIXTURE_FILE = new URL("./dev-site-visits.fixture.json", import.meta.url);

// Real, existing dev rows (verified present before seeding).
const OWNER = "fc70fa9d-22fd-41dd-a20b-4e6fe5bc298c"; // Test Owner (host)
const BROKER = "0219006f-98a2-42ab-984f-3fff86f98a64"; // Test Broker
const OTHER_OWNER = "72e1ba3d-3f5d-4339-8fcb-aed8b63b054d"; // "My" owner
const BUILDER_HOST = "e1537bf9-3240-4213-982c-5acc6f5844fb"; // hosts a project

const PROP_SATELLITE = "a61d686c-bd13-4b31-93ed-22a9070e8a3d"; // published
const PROP_RAJKOT = "cb9c68c6-918a-4875-9ac5-555dff3450a2"; // published
const PROJ_SKYLINE = "1b51612e-dfb4-452c-a860-fcefae77668c"; // published

const LEAD_BROKER_PROP = "ffa459f3-5ae6-4859-b03e-2b47d0cbcf0f";
const LEAD_OTHEROWNER_PROP = "166d7400-95a1-4ea6-abc6-7d645bd45ff5";
const LEAD_OWNER_PROJECT = "e0d22694-f591-4943-af34-00ea048df7db";

const day = (n) => new Date(Date.now() + n * 86400000).toISOString();

async function clean() {
  if (!existsSync(FIXTURE_FILE)) {
    console.log("No fixture file — nothing to clean.");
    return;
  }
  const ids = JSON.parse(readFileSync(FIXTURE_FILE, "utf8"));
  const { error } = await admin.from("site_visits").delete().in("id", ids);
  if (error) {
    console.error("Clean failed:", error.message);
    process.exit(1);
  }
  rmSync(FIXTURE_FILE);
  console.log(`Removed ${ids.length} dev site-visit fixtures.`);
}

async function seed() {
  if (existsSync(FIXTURE_FILE)) {
    console.log("Fixtures already seeded (fixture file exists). Run --clean first to re-seed.");
    return;
  }
  // Owner is HOST in most rows; one row makes owner the REQUESTER to exercise
  // the "Hosted by" display branch.
  const rows = [
    // Upcoming · requested → shows host Accept/Reject
    {
      lead_id: LEAD_BROKER_PROP,
      property_id: PROP_SATELLITE,
      requester_profile_id: BROKER,
      host_profile_id: OWNER,
      status: "requested",
      meeting_location_type: "at_property",
      meeting_note: "Keen to see it this week — evenings work best.",
    },
    // Upcoming · rescheduled (future)
    {
      lead_id: LEAD_OTHEROWNER_PROP,
      property_id: PROP_RAJKOT,
      requester_profile_id: OTHER_OWNER,
      host_profile_id: OWNER,
      status: "rescheduled",
      scheduled_at: day(3),
      meeting_location_type: "office",
      meeting_note: "Moved from Tuesday, thanks.",
    },
    // Past · completed
    {
      lead_id: LEAD_BROKER_PROP,
      property_id: PROP_SATELLITE,
      requester_profile_id: BROKER,
      host_profile_id: OWNER,
      status: "completed",
      scheduled_at: day(-4),
      meeting_location_type: "at_property",
    },
    // Past · cancelled (with real cancel reason)
    {
      lead_id: LEAD_OTHEROWNER_PROP,
      property_id: PROP_RAJKOT,
      requester_profile_id: OTHER_OWNER,
      host_profile_id: OWNER,
      status: "cancelled",
      scheduled_at: day(-2),
      meeting_location_type: "other",
      cancel_reason: "Buyer had to travel; will rebook next week.",
    },
    // Upcoming · owner is the REQUESTER (isHost=false → "Hosted by")
    {
      lead_id: LEAD_OWNER_PROJECT,
      project_id: PROJ_SKYLINE,
      requester_profile_id: OWNER,
      host_profile_id: BUILDER_HOST,
      status: "scheduled",
      scheduled_at: day(5),
      meeting_location_type: "at_property",
      meeting_note: "Looking forward to the walkthrough.",
    },
  ];

  const { data, error } = await admin.from("site_visits").insert(rows).select("id");
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  const ids = data.map((r) => r.id);
  writeFileSync(FIXTURE_FILE, JSON.stringify(ids, null, 2));
  console.log(`Seeded ${ids.length} dev site-visit fixtures. Tracked in ${FIXTURE_FILE.pathname}`);
}

if (process.argv.includes("--clean")) await clean();
else await seed();
