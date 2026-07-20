// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/Home.dc.html",
  "/Collection.dc.html?c=rc-cars",
  "/Product.dc.html?p=mitsubishi-xtreme-sport",
  "/Cart.dc.html",
  "/Contact.dc.html",
];

// Runs on chromium only — axe results are engine-independent.
test.skip(({ browserName, isMobile }) => browserName !== "chromium" || !!isMobile);

for (const path of pages) {
  test(`a11y scan: ${path}`, async ({ page }) => {
    await page.goto(path);
    // Wait for client-side render before scanning
    await expect(page.getByRole("link", { name: "Being Boys" }).first()).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(v => v.impact === "critical" || v.impact === "serious");
    const summary = serious.map(v => `${v.impact}: ${v.id} — ${v.help} (${v.nodes.length} nodes)`).join("\n");
    expect(serious, summary).toEqual([]);
  });
}
