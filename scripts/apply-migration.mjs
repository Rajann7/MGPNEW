// Dev helper — applies a single SQL migration file to the live Supabase DB
// via a direct postgres connection. Usage:
//   node --env-file=.env.local scripts/apply-migration.mjs supabase/migrations/<file>.sql
import pg from "pg";
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node apply-migration.mjs <path-to-sql>");
  process.exit(1);
}

const ref = process.env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/([^.]+)\./)[1];
const pw = process.env.SUPABASE_DB_PASSWORD;
const cs = `postgresql://postgres:${encodeURIComponent(pw)}@db.${ref}.supabase.co:5432/postgres`;

const sql = readFileSync(file, "utf8");
const client = new pg.Client({ connectionString: cs, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log(`Applied migration: ${file}`);
} catch (e) {
  console.error(`FAILED applying ${file}:`, e.message);
  process.exit(1);
} finally {
  await client.end();
}
