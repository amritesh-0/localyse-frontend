# Localyse Frontend

Frontend application for the Localyse platform, built with React, TypeScript, and Vite.  
It includes public marketing pages, authentication flows, onboarding, and role-based dashboards for businesses and influencers.

## Tech Stack

- React 18
- TypeScript
- Vite 5
- React Router
- Tailwind CSS
- Axios
- Framer Motion

## Project Structure

```text
frontend/
  public/              # Static assets
  src/
    components/        # Shared and feature UI components
    context/           # React context providers (auth)
    pages/             # Route-level pages
    services/          # API service modules
    utils/             # Utilities and route guards
    App.tsx            # Route definitions
    main.tsx           # App entrypoint
  vite.config.ts
  vercel.json
```

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build locally:

```bash
npm run preview
```

Default dev URL: `http://localhost:5173`

## Environment Variables

Create `.env` in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Notes:

- `VITE_API_BASE_URL` should point to the backend API origin.
- If omitted, the app falls back to `http://localhost:5000` in service modules.

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview built app
- `npm run lint` - run ESLint

## Routing Overview

Main routes are defined in `src/App.tsx`:

- Public pages: `/`, `/about`, `/contact`, `/features`, policy pages
- Auth: `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`, `/verify-otp`
- Onboarding: `/onboarding/business`, `/onboarding/influencer`, `/onboarding/linksocials`
- Influencer dashboard: `/dashboard/influencer/*` (protected role route)
- Business dashboard: `/dashboard/business/*` (protected role route)

## Build and Deployment

- Build output directory: `dist/` (configured in `vite.config.ts`)
- Vercel config is defined in `vercel.json`
- SPA fallback routing is configured to serve `index.html` for non-file paths
- `/sitemap.xml` and `/robots.txt` are proxied via backend URLs in `vercel.json`

## Security Notes

- Do not store secrets in frontend env vars.
- Any `VITE_*` variable is exposed to client-side code.
- Keep API keys and credentials only in backend services.

## License

ISC
