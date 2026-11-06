/* global process, fetch, URL, console */
const origin = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";

async function get(path) {
  const response = await fetch(new URL(path, origin));
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return { response, body: await response.text() };
}

const { body: index } = await get("/");
if (!index.includes('id="root"'))
  throw new Error("Preview did not serve the SPA index.");
if (index.includes("%CANONICAL_BASE_URL%"))
  throw new Error("Canonical base placeholder was not replaced.");
if (!index.includes("https://ludex-cmn.pages.dev/"))
  throw new Error("Expected canonical metadata is missing.");

const jsPath = index.match(/src="([^"]+\.js)"/)?.[1];
const cssPath = index.match(/href="([^"]+\.css)"/)?.[1];
if (!jsPath || !cssPath)
  throw new Error("Built JS or CSS reference is missing.");
for (const asset of [
  jsPath,
  cssPath,
  "/favicon.svg",
  "/og-core-esports.svg",
  "/robots.txt",
  "/_headers",
  "/_redirects",
]) {
  await get(asset);
  console.log(`${asset} 200`);
}

const { body: sitemap } = await get("/sitemap.xml");
const routes = [
  ...sitemap.matchAll(/<loc>https:\/\/ludex-cmn\.pages\.dev([^<]+)<\/loc>/g),
].map((match) => match[1]);
if (routes.length < 100)
  throw new Error(`Sitemap only contains ${routes.length} routes.`);
for (const route of routes) {
  const { body } = await get(route);
  if (!body.includes('id="root"'))
    throw new Error(`${route} did not return SPA fallback HTML.`);
}
console.log(
  `${routes.length} generated sitemap routes return the built SPA index.`,
);
