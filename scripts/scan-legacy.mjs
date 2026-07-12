#!/usr/bin/env node
// ============================================================
// Legacy feature scanner (Phase 4, rule 8-9).
// Static guard against reintroduction of constitutionally removed
// features: Maps/geolocation, WhatsApp, Push, non-OTP SMS,
// Site Visit, Reveal Number, Builder Agent, Buyer/Tenant roles,
// Agency/Real-Estate groups.
//
// Known pre-existing occurrences (pending removal in their owning
// phases per GAP register) live in the BASELINE allowlist below.
// The scan FAILS (exit 1) on any NEW occurrence, so removed
// features cannot creep back in while cleanup is in flight.
// Baseline entries may only shrink — removing legacy code should
// be accompanied by deleting its baseline entry.
// ============================================================

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "supabase/migrations", "tests", "scripts"];
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".sql", ".css"]);

/** Forbidden patterns. `id` keys the baseline. */
const PATTERNS = [
  {
    id: "maps",
    re: /google\s*maps|maps\.googleapis|navigator\.geolocation|\bgeolocation\b|\blatitude\b|\blongitude\b/i,
  },
  { id: "whatsapp", re: /whatsapp/i },
  { id: "push", re: /web[-_\s]?push|push[-_\s]?notification/i },
  {
    id: "non_otp_sms",
    re: /marketing[-_\s]?sms|sms[-_\s]?campaign|bulk[-_\s]?sms/i,
  },
  { id: "site_visit", re: /site[-_\s]?visit/i },
  {
    id: "reveal_number",
    re: /reveal[-_\s]?(number|contact|phone)|contact[-_\s]?reveal/i,
  },
  {
    id: "builder_agent",
    re: /builder[-_\s]?agent|dashboard\/builder\/agents/i,
  },
  {
    id: "legacy_roles",
    re: /\brole\s*[:=]\s*["'](buyer|tenant|agency|builder_agent)["']/i,
  },
];

// Baseline: file (posix rel path) -> pattern ids that are known/pending
// cleanup, or documented-safe mentions (comments, removal guards, quarantine).
const BASELINE = new Map(
  Object.entries({
    // --- pending P08 removal (GAP-011 site visits, GAP-012 reveal) ---
    "src/lib/actions/site-visits.ts": ["site_visit"],
    "src/lib/actions/contact.ts": ["reveal_number", "site_visit"],
    "src/lib/crm/events.ts": ["site_visit"],
    "src/lib/leads/inquiry-config.ts": ["site_visit"],
    "src/lib/notifications/create.ts": [
      "site_visit",
      "whatsapp",
      "push",
      "reveal_number",
    ],
    "src/app/admin/leads/page.tsx": ["site_visit"],
    "src/app/dashboard/leads/[id]/page.tsx": ["site_visit", "reveal_number"],
    "src/app/dashboard/owner/page.tsx": ["site_visit"],
    "src/components/leads/CrmStageBadge.tsx": ["site_visit"],
    "src/components/leads/LeadDetailClient.tsx": [
      "site_visit",
      "reveal_number",
    ],
    "src/components/leads/LeadKanbanBoard.tsx": ["site_visit"],
    "src/components/leads/LeadStageBadge.tsx": ["site_visit"],
    "src/components/leads/LeadStageTabs.tsx": ["site_visit"],
    "src/components/notifications/NotificationListClient.tsx": ["site_visit"],
    "src/components/public/HomeHowItWorks.tsx": ["site_visit"],
    "src/components/public/HomeRoleCards.tsx": ["site_visit"],
    "src/components/detail/DetailCTABar.tsx": ["reveal_number"],
    "src/components/detail/UnavailableEntityState.tsx": ["reveal_number"],
    "src/components/detail/DetailSections.tsx": ["maps"],
    "src/components/profile/ProfileContactButton.tsx": ["reveal_number"],
    "src/components/dashboard/NotificationBell.tsx": ["push", "whatsapp"],
    "src/lib/permissions/communication-permissions.ts": ["site_visit"],
    "src/lib/permissions/index.ts": ["reveal_number"],
    "src/types/index.ts": ["site_visit", "reveal_number"],
    "src/lib/actions/public-search.ts": ["reveal_number", "maps"],
    "src/lib/admin/providerStatus.ts": ["whatsapp", "maps", "push"],
    "src/lib/feature-flags/index.ts": ["whatsapp", "maps", "push"],
    "src/app/broker/[slug]/page.tsx": ["reveal_number"],
    "src/app/builder/[slug]/page.tsx": ["reveal_number"],
    "src/app/project/[slug]/page.tsx": ["reveal_number"],
    "src/app/property/[slug]/page.tsx": ["reveal_number"],
    "src/app/legal/privacy/page.tsx": ["reveal_number"],
    "src/app/legal/terms/page.tsx": ["reveal_number"],
    "src/components/forms/ProjectForm.tsx": ["reveal_number"],
    "src/components/forms/PropertyForm.tsx": ["reveal_number"],
    // --- schema pending archive-then-drop (DEC-012) ---
    "supabase/migrations/20260630130000_property_project_requirement_system.sql":
      ["maps"],
    "supabase/migrations/20260701140000_public_search_detail_profile_seo.sql": [
      "maps",
    ],
    "supabase/migrations/20260701160000_leads_crm_requirements_proposals_messages.sql":
      ["site_visit", "maps", "whatsapp", "reveal_number"],
    "supabase/migrations/20260702090000_leads_inquiry_form_fields.sql": [
      "site_visit",
    ],
    "supabase/migrations/20260710090000_contact_reveal_events_poster_identity.sql":
      ["reveal_number", "maps", "site_visit"],
    // Comment-only mention: migration header documents that Builder Agent stays removed.
    "supabase/migrations/20260712100000_broker_memberships_and_legacy_quarantine.sql":
      ["builder_agent"],
    "supabase/migrations/20260710163000_public_projects_view_progress_video.sql":
      ["maps"],
    // --- documented-safe: guards/tests/scanner reference the names to ban them ---
    "scripts/scan-legacy.mjs": [
      "maps",
      "whatsapp",
      "push",
      "non_otp_sms",
      "site_visit",
      "reveal_number",
      "builder_agent",
      "legacy_roles",
    ],
    "src/modules/identity/actors.ts": ["builder_agent"],
    "src/config/removed-features.ts": [
      "maps",
      "whatsapp",
      "push",
      "non_otp_sms",
      "site_visit",
      "reveal_number",
      "builder_agent",
    ],
    "tests/unit/removed-features.test.ts": [
      "maps",
      "whatsapp",
      "push",
      "non_otp_sms",
      "site_visit",
      "reveal_number",
      "builder_agent",
      "legacy_roles",
    ],
    "src/components/dashboard/navConfig.ts": ["site_visit", "builder_agent"],
    // Gone-redirect list references removed paths in order to block them (410 semantics).
    "src/proxy.ts": ["site_visit", "builder_agent"],
  }).map(([k, v]) => [k, new Set(v)])
);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      yield* walk(full);
    } else if (EXTS.has(full.slice(full.lastIndexOf(".")))) {
      yield full;
    }
  }
}

let newViolations = 0;
let baselineHits = 0;
const details = [];

for (const dir of SCAN_DIRS) {
  let base;
  try {
    base = statSync(join(ROOT, dir));
  } catch {
    continue;
  }
  if (!base.isDirectory()) continue;
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file).split(sep).join("/");
    const text = readFileSync(file, "utf8");
    for (const { id, re } of PATTERNS) {
      if (!re.test(text)) continue;
      const allowed = BASELINE.get(rel);
      if (allowed && allowed.has(id)) {
        baselineHits++;
      } else {
        newViolations++;
        const line = text.split(/\r?\n/).findIndex((l) => re.test(l)) + 1;
        details.push(`NEW ${id} in ${rel}:${line}`);
      }
    }
  }
}

console.log(
  `legacy-scan: ${baselineHits} baseline (pending-cleanup) hits, ${newViolations} NEW violations`
);
if (newViolations > 0) {
  for (const d of details) console.error("  " + d);
  console.error(
    "\nRemoved features must not be reintroduced (REM-001..009). " +
      "If this is legacy cleanup work, shrink the baseline instead of adding to it."
  );
  process.exit(1);
}
