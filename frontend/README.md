# CronPing Dashboard

Modern SaaS-style frontend for the CronPing backend.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- shadcn/ui-style component primitives
- Axios
- Framer Motion

## Features

- Public landing page at `/`
- Protected dashboard at `/dashboard`
- Dashboard metrics from `GET /api/system/stats`
- Jobs table from `GET /api/jobs`
- Create monitor modal via `POST /api/jobs`
- Pause and delete actions
- Per-job logs via `GET /api/jobs/{id}/logs`
- Light/dark mode
- Responsive sidebar and navbar
- Login/register screen for JWT auth

## Setup

1. Copy the example env file and adjust if needed.
2. Install dependencies.
3. Run the frontend.

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

The app defaults to `http://localhost:3000` and calls the backend at `http://localhost:8080`.

## Routes

- `/` — marketing landing page
- `/login` — authentication screen
- `/dashboard` — overview metrics
- `/jobs` — monitor management
- `/jobs/[id]` — per-monitor logs

## Demo credentials

You can register or log in with:

- Email: `demo@cronping.local`
- Password: `DemoPass123!`

## Notes

- The backend now allows local CORS for `http://localhost:3000`.
- Protected API routes require a JWT from `/api/auth/login` or `/api/auth/register`.
- The GitHub/repository link on the landing page is intentionally left as a placeholder for you to add later.
