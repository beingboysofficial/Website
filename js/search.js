// Header search overlay (parity with the live site's search).
// Self-contained: binds via event delegation so it survives dc-runtime
// re-renders; searches the static catalog client-side.
import { products } from "../data/store-data.js";

const money = n => "Rs. " + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

let overlay = null;

function build() {
  overlay = document.createElement("div");
  overlay.setAttribute("style", "position:fixed; inset:0; z-index:100; background:rgba(0,0,0,0.5); display:flex; align-items:flex-start; justify-content:center; padding-top:0;");
  overlay.innerHTML = `
    <div style="background:#ffffff; width:100%; padding:22px 50px; box-shadow:0 4px 20px rgba(0,0,0,0.2);">
      <div style="max-width:760px; margin:0 auto;">
        <div style="display:flex; gap:12px; align-items:center; border:1px solid rgb(18,18,18); padding:0 14px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(18,18,18)" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
          <input data-bb-search-input type="search" placeholder="Search" aria-label="Search products"
            style="flex:1; border:none; outline:none; padding:13px 0; font-size:15px; font-family:inherit;">
          <button data-bb-search-close aria-label="Close search" style="background:none; border:none; font-size:22px; cursor:pointer; padding:4px;">&#215;</button>
        </div>
        <div data-bb-search-results style="max-height:60vh; overflow-y:auto;"></div>
      </div>
    </div>`;
  overlay.addEventListener("click", e => {
    if (e.target === overlay || e.target.closest("[data-bb-search-close]")) close();
  });
  overlay.querySelector("[data-bb-search-input]").addEventListener("input", e => render(e.target.value));
  document.body.appendChild(overlay);
}

function render(q) {
  const box = overlay.querySelector("[data-bb-search-results]");
  const query = q.trim().toLowerCase();
  if (!query) { box.innerHTML = ""; return; }
  const hits = products.filter(p => p.title.toLowerCase().includes(query)).slice(0, 8);
  box.innerHTML = hits.length === 0
    ? `<div style="padding:20px 4px; font-size:14px; color:rgba(18,18,18,0.6);">No results for "${q.replace(/[<>&]/g, "")}"</div>`
    : hits.map(p => `
      <a href="Product.dc.html?p=${p.handle}" style="display:flex; gap:14px; align-items:center; padding:12px 4px; border-bottom:1px solid rgba(18,18,18,0.08); color:rgb(18,18,18); text-decoration:none;">
        <img src="${p.images[0]}" alt="" style="width:52px; height:52px; object-fit:cover; background:#f4f4f4;">
        <span style="flex:1; font-size:14px;">${p.title}</span>
        <span style="font-size:14px; font-weight:600;">${money(p.price)}</span>
      </a>`).join("");
}

function open() {
  if (!overlay) build();
  overlay.style.display = "flex";
  overlay.querySelector("[data-bb-search-input]").focus();
}

function close() {
  if (overlay) overlay.style.display = "none";
}

document.addEventListener("click", e => {
  const trigger = e.target.closest('a[title="Search"]');
  if (trigger) { e.preventDefault(); open(); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
