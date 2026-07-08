# Supabase Migrations

Migration files live in this folder.

## Naming convention

Use timestamp-prefix format:

```
YYYYMMDD_HHMMSS_description.sql
```

Example:
```
20260630_000001_create_users_profiles.sql
```

## Rules

- Every table/column/enum/index/trigger/function/RLS policy change must have a migration file.
- Migrations must be idempotent where possible.
- Include rollback notes as SQL comments at the top.
- Never destructively drop tables/columns without approval and backup.
- Never put service role key or secrets inside migration files.
- RLS must be included in the same migration as the table it protects.

## Running migrations

Apply via Supabase CLI:

```bash
supabase db push
```

Or paste into Supabase SQL Editor for manual apply.
