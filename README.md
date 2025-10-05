# CineBrowse

A modern, responsive movie browsing app built with Next.js App Router. Explore curated titles, view details, and manage a watchlist with a polished UI.

## Quick start

```bash
# 1) Install dependencies (use your preferred manager)
npm install
# or
yarn
# or
pnpm install

# 2) Run the dev server (http://localhost:3000)
npm run dev

# 3) Create a production build, then start
npm run build && npm start
```

## Scripts

- **dev**: Start Next.js in development mode
- **build**: Build the production bundle
- **start**: Start the production server
- **lint**: Run Next.js lint (ESLint)

Scripts come from `package.json` and target Next.js 14.

## Tech stack

- **Framework**: Next.js 14 (App Router, TypeScript, image optimization disabled for local assets)
- **UI & Styling**: Tailwind CSS v4, Radix UI primitives, `lucide-react`, `geist` fonts
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Charts & Carousels**: `recharts`, `embla-carousel-react`
- **State/Theme**: `next-themes`
- **Analytics**: `@vercel/analytics`

## Project structure

```
app/
  layout.tsx            # Root layout, fonts, providers, navbar/footer, analytics
  page.tsx              # Home route -> movie browser
  login/page.tsx        # Login page
  signup/page.tsx       # Signup page
  title/[id]/page.tsx   # Title detail page (dynamic)
  watchlist/page.tsx    # Watchlist page
components/             # UI and feature components (cards, rows, modals, navbar, etc.)
components/ui/          # Reusable UI primitives built on Radix + Tailwind
data/movies.json        # Seed movie data
lib/                    # Types and utilities
public/                 # Static assets (posters, placeholders)
styles/                 # Global styles
```

## Core routes

- `/` — Home, shows featured content and rows
- `/title/[id]` — Movie details page populated from `data/movies.json`
- `/watchlist` — User watchlist (local client state)
- `/login`, `/signup` — Auth UI pages (form-only scaffolding)

## Features

- **Responsive UI** with Tailwind CSS and accessible Radix components
- **Movie details** view with hero backdrop, metadata, and poster
- **Watchlist** link entry point and navigation via `Navbar`
- **Client-side data** via `data/movies.json` and image assets in `public/`
- **Theming** via providers and `next-themes`
- **Analytics** integrated in root layout

## Configuration

- `next.config.mjs`
  - `images.unoptimized: true` (serves local images without Next Image Optimization)
  - `eslint.ignoreDuringBuilds: true`, `typescript.ignoreBuildErrors: true` (developer convenience)
- `tsconfig.json`
  - Strict TypeScript settings, path alias `@/*` to project root

## Development notes

- Fonts are loaded in `app/layout.tsx` (`Poppins`, `GeistMono`).
- Global shell is provided by `Providers` in `app/providers.tsx`, with `Navbar` and `Footer` wrapped in `Suspense`.
- Home route renders `components/home-browser`.
- Title details page reads from `data/movies.json` using the dynamic route param.

## Data and assets

- Movie posters live under `public/images/posters/*.jpg`.
- Placeholder images exist in `public/` for missing assets.
- Sample data structure is defined with TypeScript types in `lib/types.ts`.

## Accessibility & UX

- Uses Radix primitives for accessible components.
- Keyboard-friendly navigation and focus states via Tailwind.

## Deployment

This app can be deployed to any Node-compatible host or to Vercel.

```bash
# Build
npm run build
# Start
npm start
```

On Vercel, import the repo and build settings are detected automatically for Next.js.

## License

MIT — see `LICENSE` (add a license file if you plan to open-source).

## Credits

- UI primitives from Radix UI and Tailwind CSS community
- Icons by `lucide-react`
- Analytics via Vercel Analytics
