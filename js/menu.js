// Mobile navigation drawer, opened by the hamburger link (a[title="Menu"])
// that css/mobile.css reveals on phone widths. The drawer is appended to
// <body> outside <x-dc>, so the dc-runtime never re-renders it away.
// Uses event delegation for the same reason.

const LINKS = [
  ["Home", "Home.dc.html"],
  ["High performance RC's", "Collection.dc.html?c=rc-cars"],
  ["Mini RC Drift Cars", "Collection.dc.html?c=mini-rc-drift-cars"],
  ["Desktop cars", "Collection.dc.html?c=tiny-desktop-cars"],
  ["Crawlers", "Collection.dc.html?c=crawlers"],
  ["Contact", "Contact.dc.html"]
];

let backdrop = null;
let panel = null;

function build() {
  backdrop = document.createElement("div");
  backdrop.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:80;" +
    "opacity:0;transition:opacity .25s;";
  backdrop.addEventListener("click", closeMenu);

  panel = document.createElement("div");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Menu");
  panel.style.cssText =
    "position:fixed;top:0;bottom:0;left:0;width:min(320px,85vw);background:#ffffff;" +
    "z-index:81;transform:translateX(-105%);transition:transform .25s;" +
    "display:flex;flex-direction:column;padding:10px 0 24px;overflow-y:auto;" +
    "font-family:'Assistant','Helvetica Neue',Arial,sans-serif;";

  const close = document.createElement("button");
  close.setAttribute("aria-label", "Close menu");
  close.textContent = "×";
  close.style.cssText =
    "align-self:flex-end;background:none;border:none;font-size:28px;line-height:1;" +
    "padding:12px 18px;cursor:pointer;color:rgb(18,18,18);";
  close.addEventListener("click", closeMenu);
  panel.appendChild(close);

  const here = location.pathname.split("/").pop();
  for (const [label, href] of LINKS) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    const current = here && href.startsWith(here.replace(/\.html$/, ""));
    a.style.cssText =
      "padding:15px 26px;font-size:16px;color:rgb(18,18,18);text-decoration:none;" +
      (current ? "text-decoration:underline;text-underline-offset:4px;" : "");
    panel.appendChild(a);
  }

  document.body.appendChild(backdrop);
  document.body.appendChild(panel);
}

function openMenu() {
  if (!panel) build();
  backdrop.style.display = "block";
  panel.style.display = "flex";
  requestAnimationFrame(() => {
    backdrop.style.opacity = "1";
    panel.style.transform = "translateX(0)";
  });
  document.documentElement.style.overflow = "hidden";
}

function closeMenu() {
  if (!panel) return;
  backdrop.style.opacity = "0";
  panel.style.transform = "translateX(-105%)";
  document.documentElement.style.overflow = "";
}

document.addEventListener("click", e => {
  const t = e.target instanceof Element && e.target.closest('a[title="Menu"]');
  if (t) {
    e.preventDefault();
    openMenu();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeMenu();
});
