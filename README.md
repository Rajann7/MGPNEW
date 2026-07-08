# My Gujarat Property

Gujarat's trusted real estate marketplace.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Cloudflare R2 + CDN
- **Payments**: Razorpay

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
# Fill in real values — never commit .env.local
```

Required minimum for dev:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run development server

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

### 5. Type check

```bash
npm run typecheck
```

### 6. Lint

```bash
npm run lint
```

## Providers requiring setup

The following providers need configuration before their features work.
See `API_PROVIDER_STATUS.md` for current status.

- OTP / SMS provider
- Email provider
- WhatsApp
- Razorpay (payment)
- Cloudflare R2 / CDN (media storage)
- Google Maps
- Cloudflare Turnstile (bot protection)
- Analytics / Error tracking

## Documentation

All project documentation is in the root and `docs/` folder.
Claude Code prompt files are in `prompts/`.

See `brain.md` for current project status and resume guide.
See `CLAUDE.md` for all coding and workflow rules.

## Security

- Never commit `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only — never expose to client
- RLS is enforced on all sensitive database tables
