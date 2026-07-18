// Shared cart state (localStorage) for Being Boys static store
export const KEY = "bb-cart";
export function getCart() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}
export function saveCart(c) { localStorage.setItem(KEY, JSON.stringify(c)); }
export function addToCart(handle, qty) {
  const c = getCart(); c[handle] = (c[handle] || 0) + (qty || 1); saveCart(c); return c;
}
export function setQty(handle, qty) {
  const c = getCart(); if (qty <= 0) { delete c[handle]; } else { c[handle] = qty; } saveCart(c); return c;
}
export function cartCount() {
  const c = getCart(); let n = 0; for (const k in c) n += c[k]; return n;
}
