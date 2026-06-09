# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCPFlix is a Next.js 15 web app that serves as a movie catalog hub for student films produced at EEEP Maria Célia Pinheiro Falcão. It uses Supabase for the database and authentication, and Resend for uptime email alerts.

## Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm run lint      # ESLint
npm run uptime    # Run uptime checker (pings Supabase and emails admin)
```

There are no automated tests. `npm test` only validates env vars.

Linting/formatting uses **Biome** (with `ultracite` preset) — run it via:
```bash
npx biome check --write .
```

## Environment Variables

All required vars are in `.env.example`:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — client-side Supabase access
- `RESEND_API_KEY` — starts with `re_`, for the uptime notifier
- `ADMIN_EMAIL` — receives uptime alert emails

Env vars are validated with Zod at import time in `src/lib/client.ts` (client vars) and `src/lib/server.ts` (server vars). Add new env vars to the appropriate schema there; the app will throw at startup if they're missing/invalid.

## Architecture

### Route Structure

The app uses Next.js App Router with route groups:
- `src/app/(public)/` — unauthenticated routes: `/` (landing), `/login`, `/register`
- `src/app/(private)/` — authenticated routes: `/dashboard`, `/fav`, `/movie/[id]`
- `src/app/(public)/dev/[page]/` — placeholder for in-development pages

### Auth Flow

Auth is **client-side only** via Supabase JS SDK. There is no middleware or server-side session check. Protected pages call the `useAuth()` hook (from `src/auth/checkAuth.tsx`) which checks `supabase.auth.getUser()` and redirects to `/login` or `/dashboard` as needed. User metadata (name, favs array) is stored in Supabase `user_metadata`.

### Data Access

All Supabase queries happen directly in client components — there are no API routes. The singleton client is exported from `src/lib/supabaseClient.ts`. The `movies` table joins to `category` via `category_id`. The `fav` feature stores an array of movie IDs in `user_metadata.favs`.

### Uptime Checker

`src/lib/uptimeChecker.ts` is a standalone script (not part of the Next.js app) that hits the Supabase REST API and sends a status email via Resend. It's meant to run as a cron job via `npm run uptime`.

### Component Conventions

- All page-level components in `(private)/` call `useAuth()` or `CheckAuth()` as the first line — this is the auth guard pattern used throughout.
- `src/components/` holds shared UI components. Shadcn/ui components (Card, Alert, etc.) live in `src/components/ui/`.
- Tailwind CSS with dark mode enabled by default (`dark` class on `<html>`).
