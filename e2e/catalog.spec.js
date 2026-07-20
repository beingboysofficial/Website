// @ts-check
// Data-driven coverage: every product, every collection, multi-item cart combos.
// Test cases are generated from data/store-data.js — adding a product to the
// catalog automatically adds its tests.
import { test, expect } from "@playwright/test";
import { products, collections } from "../data/store-data.js";

const money = n => "Rs. " + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
const inCollection = (p, handle) => p.collection === handle || (p.alsoIn || []).includes(handle);
const badgeSel = 'a[title="Cart"] .sc-interp';

// ---- Every product page: title, price, buy-button state ----
for (const p of products) {
  test(`product: ${p.handle} (${p.soldOut ? "sold out" : "in stock"})`, async ({ page }) => {
    await page.goto(`/Product.dc.html?p=${p.handle}`);
    await expect(page.getByText(p.title).first()).toBeVisible();
    await expect(page.getByText(money(p.price)).first()).toBeVisible();

    if (p.soldOut) {
      await expect(page.getByRole("button", { name: "Sold out" })).toBeDisabled();
    } else {
      await expect(page.getByRole("button", { name: "Add to cart" })).toBeEnabled();
    }
  });
}

// ---- Every collection page: lists exactly its members ----
for (const c of collections) {
  test(`collection: ${c.handle} lists all its products`, async ({ page }) => {
    await page.goto(`/Collection.dc.html?c=${c.handle}`);
    await expect(page.getByRole("heading", { name: c.title })).toBeVisible();
    for (const p of products.filter(p => inCollection(p, c.handle))) {
      await expect(page.getByText(p.title).first()).toBeVisible();
    }
  });
}

// ---- Multi-product cart combination ----
const combo = [
  { handle: "toyota-panda", qty: 2 },
  { handle: "porsche-911-gt3", qty: 1 },
  { handle: "buggy-storm-rc-red", qty: 3 },
];

test("combo cart: three products, mixed quantities, correct subtotal", async ({ page }) => {
  const byHandle = Object.fromEntries(products.map(p => [p.handle, p]));
  let expectedCount = 0;

  for (const { handle, qty } of combo) {
    await page.goto(`/Product.dc.html?p=${handle}`);
    for (let i = 1; i < qty; i++) await page.getByTitle("Increase quantity").click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    expectedCount += qty;
    await expect(page.locator(badgeSel)).toHaveText(String(expectedCount));
  }

  await page.goto("/Cart.dc.html");
  let subtotal = 0;
  for (const { handle, qty } of combo) {
    const p = byHandle[handle];
    subtotal += p.price * qty;
    await expect(page.getByRole("link", { name: p.title }).first()).toBeVisible();
    await expect(page.getByText(money(p.price * qty)).first()).toBeVisible();
  }
  await expect(page.getByText("Estimated total", { exact: true })).toBeVisible();
  await expect(page.getByText(money(subtotal)).first()).toBeVisible();

  // Remove the middle item (rows render in insertion order) — subtotal recomputes
  const removed = byHandle["porsche-911-gt3"];
  await page.getByTitle("Remove").nth(1).click();
  await expect(page.getByRole("link", { name: removed.title })).toBeHidden();
  await expect(page.getByText(money(subtotal - removed.price)).first()).toBeVisible();
});

test("qty selector on product page carries into the cart", async ({ page }) => {
  await page.goto("/Product.dc.html?p=nissan-gt-r-godzilla");
  await page.getByTitle("Increase quantity").click();
  await page.getByTitle("Increase quantity").click(); // qty = 3
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.locator(badgeSel)).toHaveText("3");

  await page.goto("/Cart.dc.html");
  await expect(page.getByText(money(2199 * 3)).first()).toBeVisible();
});
