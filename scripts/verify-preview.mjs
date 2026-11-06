/* global process, fetch, URL, console */
import { existsSync } from "node:fs";

const origin = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";

async function get(path) {
  const response = await fetch(new URL(path, origin));
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return { response, body: await response.text() };
}

function assertContentType(response, path, expected) {
  const actual = response.headers.get("content-type") ?? "";
  if (!actual.toLowerCase().includes(expected)) {
    throw new Error(
      `${path} content type was ${actual}; expected ${expected}.`,
    );
  }
}

const { response: indexResponse, body: index } = await get("/");
assertContentType(indexResponse, "/", "text/html");
if (!index.includes('id="root"'))
  throw new Error("Preview did not serve the SPA index.");
if (index.includes("%CANONICAL_BASE_URL%"))
  throw new Error("Canonical base placeholder was not replaced.");
if (!index.includes("https://ludex-cmn.pages.dev/"))
  throw new Error("Expected canonical metadata is missing.");
if (!index.includes('rel="canonical"'))
  throw new Error("Static canonical link is missing from index.html.");

const jsPath = index.match(/src="([^"]+\.js)"/)?.[1];
const cssPath = index.match(/href="([^"]+\.css)"/)?.[1];
if (!jsPath || !cssPath)
  throw new Error("Built JS or CSS reference is missing.");
for (const [asset, type] of [
  [jsPath, "javascript"],
  [cssPath, "text/css"],
  ["/favicon.svg", "image/svg+xml"],
  ["/og-core-esports.svg", "image/svg+xml"],
  ["/robots.txt", "text/plain"],
]) {
  const { response } = await get(asset);
  assertContentType(response, asset, type);
  console.log(`${asset} 200`);
}
for (const config of ["dist/_headers", "dist/_redirects"]) {
  if (!existsSync(config))
    throw new Error(`Cloudflare config missing: ${config}`);
  console.log(`${config} exists in build output`);
}

const { response: sitemapResponse, body: sitemap } = await get("/sitemap.xml");
assertContentType(sitemapResponse, "/sitemap.xml", "xml");
if (!sitemap.includes("<urlset") || sitemap.includes('<div id="root"')) {
  throw new Error("/sitemap.xml is not valid sitemap XML.");
}
const routes = [
  ...sitemap.matchAll(/<loc>https:\/\/ludex-cmn\.pages\.dev([^<]+)<\/loc>/g),
].map((match) => match[1]);
if (routes.length !== 112)
  throw new Error(`Sitemap contains ${routes.length} routes; expected 112.`);
if (new Set(routes).size !== routes.length)
  throw new Error("Sitemap contains duplicate routes.");
const { body: robots } = await get("/robots.txt");
if (!robots.includes("https://ludex-cmn.pages.dev/sitemap.xml")) {
  throw new Error("robots.txt does not reference the production sitemap.");
}
for (const route of routes) {
  const { body } = await get(route);
  if (!body.includes('id="root"'))
    throw new Error(`${route} did not return SPA fallback HTML.`);
}
console.log(
  `${routes.length} generated sitemap routes return the built SPA index.`,
);
