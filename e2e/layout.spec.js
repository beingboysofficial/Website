// @ts-check
// Layout regression: no page may scroll horizontally on phone widths.
// This is the objective check for "mobile compatible" — it catches
// desktop-only grids, fixed paddings, and overflowing elements.
import { test, expect } from "@playwright/test";

const pages = [
  "/Home.dc.html",
  "/Collection.dc.html?c=rc-cars",
  "/Collection.dc.html?c=mini-rc-drift-cars",
  "/Product.dc.html?p=mitsubishi-xtreme-sport",
  "/Cart.dc.html",
  "/Contact.dc.html",
];
const widths = [320, 375, 430];

// Viewports are set explicitly below — run once, on chromium only.
test.skip(({ browserName, isMobile }) => browserName !== "chromium" || !!isMobile);

for (const width of widths) {
  for (const path of pages) {
    test(`no horizontal overflow at ${width}px: ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 850 });
      await page.goto(path);
      await expect(page.getByRole("link", { name: "Being Boys" }).first()).toBeVisible();
      await page.waitForTimeout(300); // settle post-hydration layout
      const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollW, `page scrolls horizontally (${scrollW}px wide)`).toBeLessThanOrEqual(width + 1);
    });
  }
}

test("cart with items has no overflow at 375px", async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || isMobile);
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/Cart.dc.html");
  await page.evaluate(() => localStorage.setItem("bb-cart", JSON.stringify({ "mitsubishi-xtreme-sport": 2, "porsche-911-gt3": 1 })));
  await page.reload();
  await expect(page.getByText("Estimated total", { exact: true })).toBeVisible();
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollW).toBeLessThanOrEqual(376);
});
