# Cloudflare Pages build settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22` (`NODE_VERSION=22` in Pages environment variables)
- Production branch: `main`
- Preview branch: `audit-fixes` (Cloudflare Pages branch previews must be enabled for the project)
- SPA routing: `public/_redirects` rewrites nested paths to `/index.html`

The same Vite build copies the Capacitor web assets and emits `sitemap.xml`.
This guide records configuration only; it does not claim a Cloudflare preview or
production deployment was tested.

## Create a branch preview

With the project Git integration enabled, push `audit-fixes` and wait for its
Cloudflare Pages deployment to finish. The expected branch URL is
`https://audit-fixes.ludex-cmn.pages.dev/`; confirm the actual URL in the Pages
project's Deployments view before sharing it. The production branch remains
`main`. If the project is not connected to Git, a project member with Cloudflare
access can build this branch and run:

```sh
npx wrangler pages deploy dist --project-name ludex-cmn --branch audit-fixes
```

This uploads a preview deployment and does not change the production branch.

Verify the preview with:

```sh
npm run build
PREVIEW_URL=https://audit-fixes.ludex-cmn.pages.dev node scripts/verify-preview.mjs
```

Then run the Playwright route and accessibility suites against the preview, and
inspect its response headers in browser DevTools or with `curl -I`. Do not
promote it until direct nested-route refreshes, static XML/text content types,
assets, metadata, and configured headers have been checked at the actual
preview URL.
