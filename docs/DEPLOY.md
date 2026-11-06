# Cloudflare Pages build settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22` (`NODE_VERSION=22` in Pages environment variables)
- Production branch: `main`
- SPA routing: `public/_redirects` rewrites nested paths to `/index.html`

The same Vite build copies the Capacitor web assets and emits `sitemap.xml`.
This guide records configuration only; it does not claim a Cloudflare preview or
production deployment was tested.
