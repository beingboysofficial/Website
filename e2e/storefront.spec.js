// @ts-check
import { test, expect } from "@playwright/test";

// Pages are client-rendered by support.js — assertions auto-wait for hydration.
// The header cart badge renders its count inside a .sc-interp text node.
const badgeSel = 'a[title="Cart"] .sc-interp';

test("home page renders hero, nav, and featured content", async ({ page }) => {
  await page.goto("/Home.dc.html");
  await expect(page.getByRole("link", { name: "Being Boys" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "High performance RC's" }).first()).toBeVisible();
  await expect(page.getByText("HURRY UP! ONLY FEW STOCKS LEFT!")).toBeVisible();
});

test("index.html redirects to home", async ({ page }) => {
  await page.goto("/");
  // Cloudflare serves clean URLs (Home.dc), local serve keeps Home.dc.html — accept either
  await expect(page).toHaveURL(/Home\.dc(\.html)?/);
});

test("collection page lists its products", async ({ page }) => {
  await page.goto("/Collection.dc.html?c=rc-cars");
  await expect(page.getByText("Mitsubishi Xtreme Sport").first()).toBeVisible();
});

test("contact page loads", async ({ page }) => {
  await page.goto("/Contact.dc.html");
  await expect(page.getByRole("link", { name: "Being Boys" }).first()).toBeVisible();
});

test("sold-out product disables add to cart", async ({ page }) => {
  await page.goto("/Product.dc.html?p=bumble-bee-yellow-mustang");
  const btn = page.getByRole("button", { name: "Sold out" });
  await expect(btn).toBeVisible();
  await expect(btn).toBeDisabled();
});

test("buy journey: product, add to cart, adjust qty, remove", async ({ page }) => {
  // Add to cart from product page
  await page.goto("/Product.dc.html?p=mitsubishi-xtreme-sport");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.locator(badgeSel)).toHaveText("1");

  // Cart page shows the item with correct price (survives navigation via localStorage)
  await page.goto("/Cart.dc.html");
  await expect(page.getByRole("link", { name: "Mitsubishi Xtreme Sport" }).first()).toBeVisible();
  await expect(page.getByText("Rs. 7,199.00").first()).toBeVisible();

  // Increase quantity doubles the total
  await page.getByTitle("Increase quantity").click();
  await expect(page.getByText("Rs. 14,398.00").first()).toBeVisible();

  // Remove leads to empty state
  await page.getByTitle("Remove").click();
  await expect(page.getByText("Your cart is empty")).toBeVisible();
  await expect(page.locator(badgeSel)).toHaveText("0");
});

test("cart persists across reload", async ({ page }) => {
  await page.goto("/Product.dc.html?p=mitsubishi-xtreme-sport");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.locator(badgeSel)).toHaveText("1");

  await page.reload();
  await expect(page.locator(badgeSel)).toHaveText("1");
});
