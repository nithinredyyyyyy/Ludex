import { expect, test } from "@playwright/test";

test("SEO files are emitted as valid static content with all intended routes", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toContain(
    "https://ludex-cmn.pages.dev/sitemap.xml",
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(sitemap.headers()["content-type"]).toMatch(
    /(?:application|text)\/xml/,
  );
  const xml = await sitemap.text();
  expect(xml).toContain("<urlset");
  expect(xml).not.toContain('<div id="root"');
  const routes = [
    ...xml.matchAll(/<loc>https:\/\/ludex-cmn\.pages\.dev([^<]+)<\/loc>/g),
  ].map((match) => match[1]);
  expect(routes).toHaveLength(112);
  expect(new Set(routes).size).toBe(routes.length);
});

test("CEGC standings use fallbacks for the two blocked external logos", async ({
  page,
}) => {
  const blockedLogoRequests: string[] = [];
  page.on("request", (request) => {
    if (
      /8bit_allmode\.png|Revenant_XSpark_2026_allmode\.png/i.test(request.url())
    ) {
      blockedLogoRequests.push(request.url());
    }
  });
  await page.goto("/tournaments/cegc-2026");
  await expect(
    page.getByRole("heading", {
      name: "Chennai Esports Global Championship 2026",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/16 Group A and 12 Group B matches/),
  ).toBeVisible();
  expect(blockedLogoRequests).toEqual([]);
});

test("article metadata includes the canonical and NewsArticle JSON-LD", async ({
  page,
}) => {
  await page.goto("/news/google-play-arena-launch");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Google Play and NODWIN Gaming/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://ludex-cmn.pages.dev/news/google-play-arena-launch",
  );
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(jsonLd ?? "null")).toMatchObject({
    "@type": "NewsArticle",
    headline: expect.stringContaining("Google and NODWIN Gaming"),
  });
});
