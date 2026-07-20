# Being Boys — Static Storefront

Static rebuild of the [Being Boys](https://beingboys.com) RC-car store ("For the Boy in every Man") — a Chennai-based shop for RC drift cars, crawlers, and desktop cars. Built as self-contained HTML pages with a small client-side runtime; no backend required.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Redirects to `Home.dc.html` |
| `Home.dc.html` | Hero slideshow, featured products, collections, FAQ, contact form |
| `Collection.dc.html?c=<handle>` | Collection listing (`rc-cars`, `mini-rc-drift-cars`, `tiny-desktop-cars`, `crawlers`) |
| `Product.dc.html?p=<handle>` | Product detail with gallery and add-to-cart |
| `Cart.dc.html` | Cart (persisted in `localStorage`) |
| `Contact.dc.html` | Contact page |

## Structure

```
├── index.html            # redirect to Home.dc.html
├── *.dc.html             # pages: DC-format templates + inline component logic
├── support.js            # GENERATED dc-runtime (do not edit by hand)
├── data/
│   └── store-data.js     # catalog: collections, products, hero slides, FAQs
└── js/
    └── cart.js           # localStorage cart helpers
```

- **`*.dc.html`** pages use `{{ }}` bindings, `<sc-for>` loops, and an inline `class Component extends DCLogic` script, rendered client-side by `support.js`.
- **`support.js`** is generated from `dc-runtime/src/*.ts` — do not edit; rebuild with `cd dc-runtime && bun run build` (source not included in this repo).
- **`data/store-data.js`** is the single source of truth for the catalog. Prices in INR. Image URLs currently point at the Shopify CDN (`beingboys.com/cdn/...`).

## Run locally

The pages use ES module `import()`, so they must be served over HTTP (opening via `file://` will not work):

```bash
npx serve .
# or
python -m http.server 8000
```

Then open http://localhost:8000/

## Testing

```bash
npm install
npx playwright install   # one-time browser download
npm test                 # E2E + a11y across Chromium/Firefox/WebKit/mobile
npm run test:headed      # watch it run in a visible Chromium
```

- `e2e/storefront.spec.js` — user journeys: home, collections, product, add-to-cart, qty/remove, persistence
- `e2e/catalog.spec.js` — generated from `data/store-data.js`: every product page (title, price, stock state), every collection listing, and multi-product cart combinations. New catalog entries are covered automatically.
- `e2e/a11y.spec.js` — axe-core scan of every page; fails on critical/serious WCAG violations
- `npm run test:slow` — headed Chromium with a 700 ms pause between every action, for watching runs at human speed (any run accepts `SLOWMO=<ms>`)
- `lighthouserc.json` — Lighthouse CI budgets (a11y ≥ 0.9 blocking; perf/SEO/best-practices warn). Note: `lhci autorun` errors on Windows during temp-profile cleanup (audits still run); it works normally in CI/Linux.
- `serve.json` — disables `serve`'s clean-URLs so `?c=`/`?p=` query routing works; tests and local serving both depend on it
- CI: `.github/workflows/quality.yml` runs gitleaks (secrets), lychee (links), Playwright, and Lighthouse CI on every push/PR, **daily at 7:00 AM IST**, and on demand (Actions → Quality → Run workflow)
- Set `BASE_URL=https://your-deployed-site` to run the Playwright suite against production instead of the local copy

Known console noise (harmless, inherent to dc-runtime templates living in the DOM): the browser fetches the literal `{{ slide.image }}` / `{{ mainImage }}` img src once before hydration (one 404 each), and number inputs warn about the `{{ pFrom }}`/`{{ pTo }}` placeholder values. Real images/values load correctly right after.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel). The homepage contact form uses `data-netlify="true"` and only submits on Netlify.

## TODO

- [ ] Replace Shopify CDN image URLs with local copies in `images/`
- [ ] Add product descriptions (fetch from live product pages)
