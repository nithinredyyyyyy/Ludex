import { expect, test } from "@playwright/test";

const widths = [360, 375, 390, 430, 768, 1024, 1366, 1920];

test("every sitemap route renders without console errors or unintended horizontal overflow at all target widths", async ({
  page,
}) => {
  test.setTimeout(600_000);
  await page.route("https://**/*", (request) => request.abort());
  const browserIssues: string[] = [];
  let blockedExternalResources = 0;
  page.on("console", (message) => {
    if (["warning", "error"].includes(message.type())) {
      if (
        message.type() === "error" &&
        message.text() === "Failed to load resource: net::ERR_FAILED"
      ) {
        blockedExternalResources += 1;
      } else {
        browserIssues.push(`${message.type()}: ${message.text()}`);
      }
    }
  });
  page.on("pageerror", (error) => browserIssues.push(error.message));

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const routes = [
    ...sitemap.matchAll(/<loc>https:\/\/ludex-cmn\.pages\.dev([^<]+)<\/loc>/g),
  ].map((match) => match[1]);
  expect(routes.length).toBeGreaterThan(100);
  expect(new Set(routes).size).toBe(routes.length);

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1").first()).toBeVisible();
      const invalidHeading = await page.locator("main h1").first().innerText();
      expect(
        invalidHeading,
        `${route} resolved to a not-found page`,
      ).not.toMatch(/not found|can’t find/i);
      const overflowing = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .filter((element) => !element.closest("[data-horizontal-scroll]"))
          .filter((element) => {
            const style = getComputedStyle(element);
            const clippedTableHeader =
              element.tagName === "THEAD" &&
              style.position === "absolute" &&
              style.clipPath !== "none";
            const intentionalEllipsis =
              style.textOverflow === "ellipsis" && style.overflow === "hidden";
            return !clippedTableHeader && !intentionalEllipsis;
          })
          .map((element) => ({
            tag: element.tagName.toLowerCase(),
            className:
              typeof element.className === "string" ? element.className : "",
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
          })),
      );
      expect(
        overflowing,
        `${route} at ${width}px: ${JSON.stringify(overflowing)}`,
      ).toEqual([]);
    }
  }
  expect(browserIssues).toEqual([]);
  test.info().annotations.push({
    type: "network note",
    description: `${blockedExternalResources} external resource requests were blocked by the restricted test network; route and rendering checks still completed.`,
  });
});
