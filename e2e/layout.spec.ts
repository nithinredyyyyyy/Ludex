import { expect, test } from "@playwright/test";

const widths = [360, 375, 390, 430, 768, 1024, 1366, 1920];
const routes = ["/tournaments/cegc-2026", "/rankings"];

test("BGIS detail fits at tablet width", async ({ page }) => {
  await page.route("https://**/*", (request) => request.abort());
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/tournaments/bgis-2026", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1")).toBeVisible();
  const overflowing = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .filter((element) => !element.closest("[data-horizontal-scroll]"))
      .filter((element) => {
        const style = getComputedStyle(element);
        return !(
          style.textOverflow === "ellipsis" && style.overflow === "hidden"
        );
      })
      .map((element) => ({
        tag: element.tagName,
        parent: element.parentElement?.outerHTML.slice(0, 600),
        html: element.outerHTML.slice(0, 400),
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      })),
  );
  expect(overflowing, JSON.stringify(overflowing)).toEqual([]);
});

for (const width of widths) {
  for (const route of routes) {
    test(`${route} has no unintended inner overflow at ${width}px`, async ({
      page,
    }) => {
      await page.route("https://**/*", (request) => request.abort());
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1")).toBeVisible();
      const overflowing = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .filter((element) => !element.closest("[data-horizontal-scroll]"))
          .filter((element) => {
            const style = getComputedStyle(element);
            const visuallyHiddenHeader =
              element.tagName === "THEAD" &&
              style.position === "absolute" &&
              style.clipPath !== "none";
            const intentionalEllipsis =
              style.textOverflow === "ellipsis" && style.overflow === "hidden";
            return !visuallyHiddenHeader && !intentionalEllipsis;
          })
          .map((element) => ({
            tag: element.tagName.toLowerCase(),
            className:
              typeof element.className === "string" ? element.className : "",
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
          })),
      );
      expect(overflowing, JSON.stringify(overflowing)).toEqual([]);
    });
  }
}

test("PMGC 2023 detail renders without React key warnings", async ({
  page,
}) => {
  await page.route("https://**/*", (request) => request.abort());
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (
      ["warning", "error"].includes(message.type()) &&
      /unique "key" prop|same key/i.test(message.text())
    ) {
      warnings.push(message.text());
    }
  });
  await page.goto("/tournaments/pmgc-2023", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "PUBG Mobile Global Championship 2023" }),
  ).toBeVisible();
  await expect.poll(() => warnings).toEqual([]);
});

test("every tournament detail route renders without React key warnings", async ({
  page,
}) => {
  await page.route("https://**/*", (request) => request.abort());
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (
      ["warning", "error"].includes(message.type()) &&
      /unique "key" prop|same key/i.test(message.text())
    ) {
      warnings.push(message.text());
    }
  });
  await page.goto("/tournaments", { waitUntil: "domcontentloaded" });
  const links = await page
    .locator(".tournament-card .tournament-title")
    .evaluateAll((anchors) =>
      anchors
        .map((anchor) => (anchor as HTMLAnchorElement).getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );
  for (const route of links) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    expect(warnings, `React key warning on ${route}`).toEqual([]);
  }
});

test("mobile navigation exposes More and follows a screen destination", async ({
  page,
}) => {
  await page.route("https://**/*", (request) => request.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("button", { name: "More" }).click();
  await expect(page.locator("#mobile-more-menu")).toBeVisible();
  await page
    .locator("#mobile-more-menu")
    .getByRole("link", { name: "Pick'ems" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Live Pick’ems" }),
  ).toBeVisible();
});
