# MEDVIDHI Website

Official web platform for **MEDVIDHI** — continuous health memory and right-care navigation platform.

## Overview

MEDVIDHI is engineered to bridge the clinical context gap across patient care journeys. The platform brings symptoms, reports, medications, and previous consultations into an organized, continuous health memory that helps patients explore relevant medical expertise and prepare 30-second doctor briefs for clearer consultations.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Custom CSS with strict monochrome design system tokens (`tokens.css`, `globals.css`)
- **Typography:** Plus Jakarta Sans (Display & Body), Cormorant Garamond (Editorial Serif), JetBrains Mono (Metadata), Kalam (Handwritten accents)
- **Icons:** Lucide React
- **Animations:** Framer Motion + native CSS GPU animations
- **Backend Services:** Supabase (Client-side integration via publishable/anon key)
- **Deployment Target:** Cloudflare Pages (Static Vite build)

---

## Local Development

### Prerequisites

- Node.js 18+ (tested with Node 20 / 22 / 24)
- npm 9+

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hellomedvai-dotcom/winter.git
   cd winter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Add your public Supabase URL and Publishable/Anon key to `.env.local`:
   ```ini
   VITE_APP_ENV=development
   VITE_SITE_URL=http://localhost:3000
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```
   *(Note: Never place service-role keys or private secrets in frontend environment files).*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

---

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Runs TypeScript compilation (`tsc -b`) and bundles for production (`vite build`).
- `npm run preview`: Locally previews the production build from `dist/`.
- `npm run typecheck`: Runs strict TypeScript check (`tsc --noEmit`).

---

## Cloudflare Pages Deployment Configuration

- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Production branch:** `main`

### Environment Variables required in Cloudflare Pages Dashboard:
- `VITE_APP_ENV`: `production`
- `VITE_SITE_URL`: `https://medvidhi.com` (or your custom domain)
- `VITE_SUPABASE_URL`: *(Your Supabase project URL)*
- `VITE_SUPABASE_PUBLISHABLE_KEY`: *(Your Supabase anon/publishable key)*

---

## License

Proprietary. All rights reserved by MEDVIDHI.
