# AI Agent Instructions for this Next.js Coloring Page Template

This codebase is a modern, high-performance, multi-language Next.js App Router website for printable coloring pages and educational craft sheets.

## 📐 Architecture & Technology Stack
- **Framework:** Next.js 16+ (App Router, React 19, TypeScript, Turbopack)
- **Styling:** Vanilla CSS Modules + global CSS variables (`src/app/globals.css`) + Framer Motion
- **Internationalization (i18n):** Multi-language routing via `src/app/[lang]/` (supported: `nl`, `en`, `de`, `fr`)
- **Data Layer:** Flat JSON architecture stored in `src/data/{lang}/`
  - `main-hubs.json` (top-level categories)
  - `themes.json` (sub-themes)
  - `coloring-pages.json` & `themes-data/*.json` (individual printable pages)
  - `featured-pages.json` & `age-pages.json`
- **Search System:** Client-side static search index generated via `scripts/generate-search-index.js` into `public/search-index-{lang}.json`.
- **Image Proxy & Watermark:** `src/app/api/proxy-image/route.ts` and `src/components/PrintDownloadButtons.tsx` (handles A4 downloads with dynamic canvas watermarking).
- **Pinterest Feed:** `src/app/api/pinterest-feed/route.ts` generates dynamic RSS feeds for automated Pinterest business pinning.

## 🛠️ Key Commands
- `npm install`: Install dependencies
- `npm run dev`: Run local development server at `http://localhost:3000`
- `npm run generate:search`: Rebuild search indices in `public/`
- `npm run build`: Build production standalone application (automatically runs `generate:search` prebuild)
- `npm run start`: Start production server

## 🚨 Development Guidelines for AI Agents
1. **Never break static generation:** All dynamic params (`[lang]`, `[mainHubSlug]`, `[themeSlug]`, `[ageSlug]`, `[slug]`) use `generateStaticParams()` from `src/lib/api.ts`. Ensure data integrity so pre-rendering always succeeds.
2. **Preserve multi-language support:** When adding new pages or features, ensure translations in `src/lib/i18n.ts` and data in all 4 language directories (`nl`, `en`, `de`, `fr`) are maintained.
3. **Responsive & Mobile First:** Maintain touch targets, fast modal previews (`PrintPreviewModal`), and responsive grid layouts.
4. **No heavy database requirements:** Keep the flat-file JSON architecture fast, memory-efficient, and easy to deploy on DigitalOcean App Platform or Vercel.
