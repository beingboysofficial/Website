// @ts-check
// Live-site parity features: search overlay, product description,
// recommendations, cart empty-state extras.
import { test, expect } from "@playwright/test";

test("header search overlay finds products", async ({ page }) => {
  await page.goto("/Home.dc.html");
  await page.locator('a[title="Search"]').click();
  await page.getByLabel("Search products").fill("porsche");
  await expect(page.getByRole("link", { name: /Porsche 911 GT3 - RED/ }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("Search products")).toBeHidden();
});

test("product description renders with Read more toggle", async ({ page }) => {
  await page.goto("/Product.dc.html?p=mitsubishi-xtreme-sport");
  await expect(page.getByText("1:10 Large 4WD Electric RC Drift Car").first()).toBeVisible();
  await page.getByRole("button", { name: /Read more/ }).click();
  await expect(page.getByRole("button", { name: /Read less/ })).toBeVisible();
});

test("product page shows You may also like", async ({ page }) => {
  await page.goto("/Product.dc.html?p=mitsubishi-xtreme-sport");
  await expect(page.getByRole("heading", { name: "You may also like" })).toBeVisible();
});

test("empty cart shows account prompt and Featured Collection", async ({ page }) => {
  await page.goto("/Cart.dc.html");
  await expect(page.getByText("Your cart is empty")).toBeVisible();
  await expect(page.getByText("Have an account?")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Featured Collection" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Porsche 911 GT3 - RED/ }).first()).toBeVisible();
});

test("hamburger opens the nav drawer at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/Home.dc.html");
  await page.locator('a[title="Menu"]').click();
  await expect(page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Crawlers" })).toBeVisible();
  await page.keyboard.press("Escape");
});

test("footer shows policy links", async ({ page }) => {
  await page.goto("/Home.dc.html");
  await expect(page.getByRole("link", { name: "Terms of service" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Privacy policy" })).toBeVisible();
});

test("footer policy links open local policy pages", async ({ page }) => {
  await page.goto("/Home.dc.html");
  await page.getByRole("link", { name: "Refund policy" }).click();
  await expect(page).toHaveURL(/Policy\.dc(\.html)?\?p=refund-policy/);
  await expect(page.getByRole("heading", { name: "Refund policy" })).toBeVisible();
  await expect(page.getByText(/No Refund Policy/i).first()).toBeVisible();
});

test("contact page shows email and phone", async ({ page }) => {
  await page.goto("/Contact.dc.html");
  await expect(page.getByText("beingboysofficial@gmail.com")).toBeVisible();
  await expect(page.getByText("7339323952")).toBeVisible();
});
