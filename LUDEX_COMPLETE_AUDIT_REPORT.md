# LUDEX / CORE Esports — Complete Website Audit & Production QA

**Audit date:** November 6, 2026  
**Audited workspace:** `CORE_Esportsr`  
**Audit mode:** Read-only review of application source/configuration, browser-based route and interaction checks, and local build/package checks. The only file created during this review is this report. No application source or deployment configuration was changed.

## Executive summary

The React + TypeScript + Vite application builds successfully and its main sections, nested detail routes, navigation, filtering, local favorites, search, and pick’em flow were exercised in the browser. All 117 route visits in the smoke-test inventory rendered a page, and 37 tournament details were reachable by direct URL.

The site is not yet production-ready. The review found two visible narrow-screen clipping problems, a reproducible duplicate React key warning on PMGC 2023, and live CEGC 2026 standings that are behind the latest checked event results. There is no automated web test or lint script, route chunks are not split, and the user-facing pick’em selections are local-device only. Core Web Vitals, assistive-technology behavior, real-device behavior, native Capacitor builds, and Cloudflare deployment behavior were not measured.

## Release recommendation

**Hold for the listed high/medium findings to be addressed and rechecked before production release.** The build and npm dependency audit pass, but those do not compensate for inaccurate live standings or content clipping on small screens.

## Scope and evidence

Reviewed the React application, route definitions, data modules, styles, package scripts/dependencies, static metadata, public assets, redirect rule, README deployment notes, and repository status. Exercised the running Vite app in a desktop browser using direct route loads, viewport changes, navigation, controls, local persistence, and browser console observation. Ran the production build, npm dependency audits, package-script checks, and route/asset checks.

The app’s own README identifies the data as a bundled snapshot that does not refresh live. The sample data should therefore be treated as application content, not an authoritative live feed. One live CEGC result comparison was performed against the event page during this audit; external pages that could not be fetched by the audit browser are marked unverified rather than broken.

## Application and deployment architecture

- **Stack:** React 19, TypeScript 5.7, Vite 8, React Router 7, Lucide React, Capacitor 8 for Android and iOS.
- **Build command:** `npm run build` runs `tsc -b && vite build`.
- **Deployment output:** `dist/`.
- **SPA fallback:** `public/_redirects` contains `/* /index.html 200`, suitable for a Cloudflare Pages-style SPA fallback. It also means unknown paths can receive HTTP 200 at the hosting layer while the client displays its custom 404 (a soft-404 risk for crawlers and monitoring).
- **Configuration:** No `wrangler.toml` was present. Cloudflare Pages can be configured through its project settings; this audit did not deploy or validate a Cloudflare project.
- **Other deploy notes:** README includes Vercel and Netlify build/publish instructions. No backend, live API, database, or required environment variables were found.
- **Repository state:** No application changes were made for this audit. The report is the only new file.

## Route and page coverage

The following direct-route smoke checks rendered a route title and page content, with no route-render failure:

- Primary pages: Home, Tournaments, Teams, Rankings, Pick’ems, News, Calendar, Search, Favorites, and an unknown path/custom 404.
- Detail routes: 37 tournament records, 10 team profiles, 50 player profiles, and 5 news articles.
- The tournament detail table of contents was checked on CEGC 2026 and BGIS 2026; each inspected anchor target existed.
- Desktop navigation, mobile bottom navigation/More menu, in-app back/forward navigation, and clickable detail links were exercised.

**Route smoke result: 117 route visits passed; 0 route visits failed to render.** This is browser smoke coverage, not an automated route test suite. A rendered page does not prove every field is factually correct or every external destination is available.

## Functional checks

| Area | Result | Evidence / limitation |
|---|---|---|
| Tournament status filters | Pass | All, Completed (31), Upcoming (5), Live now (1) produced expected groups. Series/year filtering was exercised. |
| Tournament archive | Pass with data caveat | 31 requested archive editions are present; BGMS Season 5 is labeled as `bgms-2026`. CEGC 2025 is an additional archive entry. Four additional upcoming event entries are present, for 37 tournament records overall. |
| Tournament detail navigation | Pass | Direct loads and in-app detail links worked for all 37 records. |
| Teams and player pages | Pass | 10 team routes and all 50 player profile routes rendered. |
| News | Pass | All five article routes rendered and category filters changed the displayed stories. |
| Search | Pass | Positive query returned matches; a deliberately unmatched query showed an empty state. |
| Favorites | Pass | Save, reload persistence, remove, and empty state behaved as expected using browser storage. |
| Pick’ems | Pass for local flow | Incomplete submission was rejected with an error message; complete selections saved, survived reload, and cleared. Picks are local to the device/browser and do not submit to a shared service or official scoring backend. |
| Calendar | Pass | Month navigation, date selection, event opening, and browser back/forward were exercised. |
| Mobile menu | Pass | At mobile width the More menu opened; selecting Pick’ems navigated and closed the menu. |
| Custom 404 | Pass in app | Unknown route displayed custom not-found content. The hosting fallback’s HTTP 200 can still create a soft-404 for crawlers. |
| External destinations | Partial / unverified | Some external pages loaded; Liquipedia returned an access-denied response to the audit browser and Esportstats did not finish loading. These outcomes do not prove those sites are broken. No exhaustive external link crawler was run. |

## Tournament data and standings

The requested 31-edition tournament archive is represented in the local dataset. Additional records include CEGC 2025, live CEGC 2026, and four other upcoming events. Static archive result details are incomplete in places: the page itself labels results as unavailable where there is no full standings table. That is transparent but should be distinguished from “complete standings.”

**Live CEGC 2026 discrepancy (High):** the app’s CEGC results section is marked “Updated Nov 5, 2026” and shows Group B through Match 11. The event page checked on November 6 displayed the event at Match #24 and Team Outrage at 113 points / 69 eliminations, while the app snapshot showed 112 / 68 through Match 11. The local page is therefore behind the checked event state. This is expected from bundled data, but a live event view should either refresh from an owned data source or visibly state its as-of time and avoid implying current standings.

Other data-quality risks:

- The global season data and rankings use different “last updated” labels in UI/README references (season review Nov 5, standings Oct 18, and selected-board labels seen as Nov 6). Make the snapshot date and board date consistent and explicit.
- Tournament participants, stage detail, prize distributions, and complete match-by-match tables vary by record; a detail route existing is not equivalent to a complete event page.
- Data is embedded in source files, so corrections require a code release and cannot be refreshed independently.
- No data schema validation or duplicate-ID/participant consistency test is configured.

## Responsive and visual review

The intended light dashboard design is generally present: neutral backgrounds, restrained CORE red accents, rounded cards, a desktop sidebar, and mobile bottom navigation. The desktop home view was visually reviewed at 1366×768. The CEGC detail page was checked at nine viewport sizes: 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×812, and 360×800. Fifteen main routes were also checked at 360px width.

At those inspected sizes, the document root did not report horizontal overflow. However, overflow is clipped inside components, so that root-level metric missed two visible defects:

1. **CEGC detail at 360×800 (Medium):** the event identity/logo and title overlap, and the inner detail grid has a measured scroll width of 529px against a 315px content width. The page clips this inner content rather than expanding the document, so users cannot see all of it.
2. **Rankings at 360×800 (Medium):** the three-card summary row measures 336px against a 315px content width; the third card is clipped. The page root still fits the viewport.

The other sampled pages were usable at 360px in the browser. Tablet layouts were sampled at 768px and 1024px on the tournament detail. This does not replace testing on actual iOS/Android hardware, browser chrome, safe-area insets, or touch devices.

## Accessibility review

- The global search field has an accessible label and the main navigation has text labels.
- Detail sections use heading structure and visible text controls; some buttons expose accessible labels.
- No axe or equivalent automated accessibility audit was available, and screen-reader/keyboard-only testing was not completed.
- The search UI displays a `⌘ K` hint (`src/App.tsx`, line 93), but no matching keydown handler was found in the inspected application code. Treat the shortcut as nonfunctional until implemented or remove the hint.
- The base stylesheet removes the input outline (`src/styles.css`, line 2). Some individual controls define `:focus-visible`, but a consistent visible focus treatment was not verified across the whole app. Keyboard accessibility needs a dedicated pass.
- Reduced-motion preferences were not found in the reviewed styles.
- Touch targets and text contrast were not measured systematically against WCAG criteria.

## SEO and metadata

Positive findings:

- `index.html` includes `lang="en"`, responsive viewport metadata, theme color, a description, favicon, Open Graph site/title/description, and a default page title.
- The application updates document title/description on route changes, as observed during direct route checks.
- The custom in-app not-found view is present.

Gaps and risks:

- No canonical link, Open Graph image, Twitter card metadata, `robots.txt`, or sitemap was found.
- Route-specific metadata is applied client-side in an SPA. Social scrapers and crawlers that do not execute JavaScript may only see the default `index.html` metadata.
- The SPA rewrite returns a 200 fallback for unknown routes, potentially producing soft-404 indexing and monitoring behavior.
- No structured data (for example, event/article metadata) was verified.

## Security and privacy review

- `npm audit --audit-level=low` and `npm audit --omit=dev --audit-level=low` both completed with **0 vulnerabilities** on November 6, 2026.
- No application secrets, `.env` files, `eval`, unsafe HTML injection sink, or application-level `fetch`/XHR usage were found in the inspected app source. The current app relies on bundled content and browser storage.
- External links opened in a new tab were observed with `rel="noreferrer"` where applicable.
- No Content Security Policy or security response-header configuration was found in the project. Review and configure appropriate headers at the hosting layer before production; test any CSP against the app and Capacitor webview before enforcing it.
- Favorites and pick’em selections are browser/device-local. Do not represent them as account-synced or server-backed.
- This was a source/configuration review, not a penetration test, privacy-law assessment, or native mobile security assessment.

## Performance and assets

`npm run build` completed successfully. The production build reported:

| Artifact | Size | Gzip |
|---|---:|---:|
| `dist/index.html` | 0.86 kB | 0.42 kB |
| CSS bundle | 96.28 kB | 18.55 kB |
| JavaScript bundle | 525.95 kB | 140.67 kB |

Vite warns that the minified JavaScript chunk exceeds 500 kB. Routes are not code-split/lazy-loaded, so the full application bundle is downloaded for the initial app load. Consider route-level lazy loading and then remeasure.

Sixteen public assets totaling 294,279 bytes (about 287.4 KiB) were inventoried. No image compression work was performed; the inspected logos are relatively lightweight. No Lighthouse run or lab/field Core Web Vitals were available. **LCP, CLS, INP, TBT, and performance scores are not measured.**

## Test infrastructure and reproducibility

- `npm run build`: **Pass** (TypeScript project build and Vite production build).
- `npm audit --audit-level=low`: **Pass**, 0 vulnerabilities.
- `npm audit --omit=dev --audit-level=low`: **Pass**, 0 vulnerabilities.
- `npm test -- --run`: **Not configured**; npm reports a missing `test` script.
- `npm run lint`: **Not configured**; npm reports a missing `lint` script.
- No Playwright, Vitest, Jest, ESLint, Axe, or Lighthouse test tooling was installed at the project root.
- Browser checks described here were performed manually/through browser automation in this audit session; they are not checked into the repository and will not run in CI.

## Findings by severity

| ID | Severity | Finding | Evidence / impact |
|---|---|---|---|
| F-01 | High | Live CEGC 2026 standings lag behind the checked event state | App labels the Group B table through Match 11 and updated Nov 5 in `src/App.tsx`, line 381; checked event page on Nov 6 showed Match #24 and Outrage 113/69. Affects trust in live results. |
| F-02 | Medium | Narrow mobile tournament detail content is clipped | At 360px, event detail inner width is 529px vs 315px available; hero identity overlaps. Document-level overflow detection alone does not catch it. |
| F-03 | Medium | Narrow mobile rankings summary clips the third summary card | At 360px, summary row is 336px vs 315px available. |
| F-04 | Medium | Duplicate React list keys on PMGC 2023 | A browser console warning was reproducible on `/tournaments/pmgc-2023`: duplicate key `Stalwart Esports`. The fallback podium in `src/App.tsx`, line 379, uses the team name as the key while PMGC 2023 data in `src/data.ts`, lines 152 and 195, has Stalwart as both runner-up and third place. This can cause unstable list reconciliation and signals inconsistent podium data. |
| F-05 | Medium | No automated web test or lint scripts | `package.json` has build/dev/preview/Capacitor scripts only; `npm test` and `npm run lint` fail because scripts are absent. Regression checks are not repeatable in CI. |
| F-06 | Medium | Pick’ems are local-only | Browser storage persists picks on the current device; there is no account, API submission, shared leaderboard, or official scoring integration. |
| F-07 | Low | Initial JavaScript chunk exceeds Vite’s 500 kB warning threshold | Build output is 525.95 kB raw / 140.67 kB gzip and routes are not split. Impacts initial transfer/parse cost, especially on slower phones. |
| F-08 | Low | Search shortcut hint is not implemented | `⌘ K` is visible at `src/App.tsx:93`; no corresponding key handler was found. |
| F-09 | Low | SEO crawler coverage is incomplete | No canonical, sitemap, robots file, social image/card metadata; SPA route metadata depends on JavaScript; catch-all rewrite can return 200 on missing routes. |
| F-10 | Low | Focus and reduced-motion support need a full accessibility pass | Global input outline is suppressed in `src/styles.css:2`; consistent focus states/reduced-motion and WCAG contrast were not verified. |
| F-11 | Informational | Several external source pages could not be verified from the audit browser | Access denied/timeouts are inconclusive; no broken-link claim is made. Repeat with a normal network/browser or a deployed link checker. |

## Manual checks required before release

1. Test the 360px layouts and representative pages on physical iPhone and Android devices, including safe-area behavior, portrait/landscape, touch, and mobile browser address-bar changes.
2. Build and launch both native Capacitor projects on supported toolchains: Android Studio/Android SDK and macOS/Xcode for iOS. This review did not compile or launch native apps.
3. Test keyboard-only navigation, VoiceOver/TalkBack, focus visibility, contrast, and reduced-motion behavior.
4. Run Lighthouse or equivalent on a production-like deployment and capture real/lab LCP, CLS, INP, and performance results.
5. Verify actual Cloudflare Pages build settings, SPA route fallback, response headers, custom domain/TLS, and 404 HTTP behavior after deployment.
6. Recheck external links from an unrestricted browser and validate factual tournament data against an agreed update process.

## Suggested remediation order

1. Correct CEGC live standings and show an unambiguous “data as of” timestamp; establish how live results refresh.
2. Fix CEGC detail and Rankings card layout at 360px, then repeat the full viewport matrix.
3. Fix the PMGC 2023 podium/data inconsistency and use stable unique list keys.
4. Add repeatable automated route/component tests and linting to `package.json` and CI.
5. Decide whether Pick’ems are deliberately local-only or require backend persistence/scoring, and label the feature accordingly.
6. Add route-level code splitting; then profile production performance.
7. Complete the accessibility, SEO, security-header, and external-link checks listed above.

## Overall status

- **Build:** Pass.
- **Dependency audit:** Pass, 0 findings from npm audit at the audit date.
- **Route smoke tests:** Pass, 117/117 route visits rendered.
- **Core browser interactions:** Pass for tested local behavior.
- **Responsive review:** Partial; two mobile clipping defects found.
- **Live data accuracy:** Fail for the checked CEGC live snapshot; other static datasets were not independently fact-checked in full.
- **Automated test/lint coverage:** Not configured.
- **Native device / Cloudflare production verification:** Requires manual testing.

---

**Audit limitation:** This report describes the repository and browser state observed on November 6, 2026. It is not a certification, penetration test, complete independent fact-check of all tournament/player records, or proof of production behavior.
