import pg from "pg";
const ref = process.env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/([^.]+)\./)[1];
const pw = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);
const candidates = [
  `postgresql://postgres:${pw}@db.${ref}.supabase.co:5432/postgres`,
  `postgresql://postgres.${ref}:${pw}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${ref}:${pw}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
];
for (const cs of candidates) {
  const c = new pg.Client({ connectionString: cs, ssl: { rejectUnauthorized: false } });
  try { await c.connect(); const r = await c.query("select current_database()"); console.log("OK:", cs.replace(pw,"****"), r.rows[0]); await c.end(); process.exit(0); }
  catch(e){ console.log("FAIL:", cs.replace(pw,"****"), e.message.slice(0,60)); }
}
process.exit(1);
