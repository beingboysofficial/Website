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

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel). The homepage contact form uses `data-netlify="true"` and only submits on Netlify.

## TODO

- [ ] Replace Shopify CDN image URLs with local copies in `images/`
- [ ] Add product descriptions (fetch from live product pages)
