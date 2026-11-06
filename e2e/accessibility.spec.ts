import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  ["home", "/"],
  ["tournaments", "/tournaments"],
  ["tournament detail", "/tournaments/cegc-2026"],
  ["rankings", "/rankings"],
  ["pickems", "/pickems"],
  ["search", "/search"],
] as const;

for (const [name, path] of pages) {
  test(`${name} has no automated axe WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        targets: nodes.map(({ target, any }) => ({
          target,
          details: any.map(({ data, failureSummary }) => ({
            data,
            failureSummary,
          })),
        })),
      })),
    ).toEqual([]);
  });
}

test("route metadata updates canonical/title and clears not-found noindex", async ({
  page,
}) => {
  await page.goto("/tournaments/cegc-2026");
  await expect(page).toHaveTitle(/Chennai Esports Global Championship 2026/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://ludex-cmn.pages.dev/tournaments/cegc-2026",
  );
  await page.goto("/not-a-route");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
  await page.goto("/rankings");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("mobile navigation keeps active state and hides the desktop shortcut hint", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/tournaments");
  const mobileNav = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNav.locator('[aria-current="page"]')).toHaveCount(1);
  await expect(page.locator(".global-search kbd")).toBeHidden();
  const controls = mobileNav.locator("a, button");
  const targetSizes = await controls.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        name: element.textContent?.trim(),
        width: rect.width,
        height: rect.height,
      };
    }),
  );
  expect(
    targetSizes.every(({ width, height }) => width >= 44 && height >= 44),
  ).toBe(true);
  await mobileNav.getByRole("button", { name: "More" }).click();
  await expect(page.locator("#mobile-more-menu")).toBeVisible();
  await page
    .locator("#mobile-more-menu")
    .getByRole("link", { name: "Favorites" })
    .click();
  await expect(page).toHaveURL(/\/favorites$/);
});
