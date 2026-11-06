# SEO notes

The app sets a canonical URL, title, description, Open Graph fields, Twitter
card fields, and `og:url` after client-side navigation. The canonical base is
defined once as `canonicalBaseUrl` in `src/sitemap.ts`.

Route metadata is client-side only. Non-JavaScript crawlers and social preview
scrapers receive the default metadata in `index.html`; prerendering or
server-side rendering would be required for fully route-specific previews.
Unknown routes add `noindex` while the not-found view is active and remove it
again after navigation.

The Vite build emits `dist/sitemap.xml` from the tournament, team, player, news,
and static route data. `public/robots.txt` points crawlers to that sitemap.
Event JSON-LD is omitted because the current event date fields do not provide
reliable machine-readable start and end timestamps. NewsArticle JSON-LD is
added only for article routes with a parseable publication date.

Cloudflare Pages receives a `Content-Security-Policy-Report-Only` header. It is
report-only and does not block app resources. Review reports before considering
an enforced policy.
