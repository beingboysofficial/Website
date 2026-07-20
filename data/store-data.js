// Being Boys — store data scraped from live site (beingboys.com), July 2026.
// NOTE: image URLs point at Shopify CDN — user will replace with local uploads in images/ later.
// Prices in INR. compareAt = struck-through "Regular price"; null = no sale.
// description fields TODO: fetch from individual product pages next session (user said "pull rest from live site").

const CDN = "https://beingboys.com/cdn/shop/files/";
const CDNC = "https://beingboys.com/cdn/shop/collections/";

export const store = {
  name: "Being Boys",
  tagline: "For the Boy in every Man",
  announcement: "HURRY UP! ONLY FEW STOCKS LEFT!",
  instagram: "https://www.instagram.com/beingboysofficial/",
  about: "BeingBoys is a passionate community and online store where the thrill of RC cars, drift culture, and action toys brings people together—no matter their age. Rooted in trust and great service, we offer fast support, hassle-free returns, and honest product guidance so every purchase feels secure.",
  nav: [
    { label: "Home", href: "Home.dc.html" },
    { label: "High performance RC's", href: "Collection.dc.html?c=rc-cars" },
    { label: "Mini RC Drift Cars", href: "Collection.dc.html?c=mini-rc-drift-cars" },
    { label: "Desktop cars", href: "Collection.dc.html?c=tiny-desktop-cars" },
    { label: "Crawlers", href: "Collection.dc.html?c=crawlers" },
    { label: "Contact", href: "Contact.dc.html" }
  ],
  policies: ["Privacy policy", "Refund policy", "Terms of service", "Shipping policy", "Contact information"]
};

export const collections = [
  { handle: "mini-rc-drift-cars", title: "Mini RC Drift Cars", image: CDNC + "1000063220.jpg?v=1768594308" },
  { handle: "rc-cars", title: "High Performance RC's", image: CDNC + "IMG-20241121-WA0019.jpg?v=1768594329" },
  { handle: "crawlers", title: "Crawlers", image: CDNC + "PXL_20260110_063659620.jpg?v=1768594348" },
  { handle: "tiny-desktop-cars", title: "Tiny Desktop Cars", image: CDNC + "Porsche-canva.png?v=1763772931" }
];

export const products = [
  // ---- High Performance RC's (rc-cars) ----
  { handle: "mitsubishi-xtreme-sport", title: "Mitsubishi Xtreme Sport", collection: "rc-cars",
    price: 7199, compareAt: 9999, soldOut: false, spec: "Upto 70km - 4WD Drift RC",
    images: [
      CDN + "beingboys-mitsubishi-xtreme-sport-remote-controlled-rc-car-india-cones.jpg?v=1770543862",
      CDN + "beingboys-mitsubishi-xtreme-sport-remote-controlled-rc-car-india.jpg?v=1768593202",
      CDN + "beingboys-mitsubishi-xtreme-sport-rc-car-chennai-india-drift-front-view.jpg?v=1768593202",
      CDN + "beingboys-mitsubishi-xtreme-sport-racing-drift-rc-chennai.jpg?v=1768593202",
      CDN + "beingboys-xtreme-sport-rc-community-drift-cars-india.jpg?v=1768593202",
      CDN + "beingboys-mitsubishi-xtreme-sport-rc-culture-outdoor-rc.jpg?v=1768593202",
      CDN + "PXL_20251121_080601458.jpg?v=1768593202",
      CDN + "PXL_20251121_080640445.jpg?v=1768593202"
    ] },
  { handle: "black-green-mustang-mini", title: "Dodge Challenger Brushless Beast - Black", collection: "rc-cars",
    price: 11999, compareAt: 19999, soldOut: false,
    images: [CDN + "beingboys-dodge-challenger-brushless-beast-black-rc-car-chennai-india-drift-specs.jpg?v=1770543972"] },
  { handle: "bumble-bee-yellow-mustang", title: "Chevrolet Camaro - Bumble Bee", collection: "rc-cars",
    price: 6999, compareAt: 9999, soldOut: true,
    images: [CDN + "beingboys-chevrolet-camaro-bumblebee-rc-car-chennai-india-drift-front-view.jpg?v=1768593116"] },
  { handle: "dodge-challenger-beast-brushless", title: "Dodge Challenger Brushed Beast - Fury", collection: "rc-cars",
    price: 9999, compareAt: 19999, soldOut: false,
    images: [CDN + "beingboys-dodge-challenger-brushed-beast-fury-rc-car-chennai-india-drift-speed.jpg?v=1770544507"] },
  { handle: "ford-street-gt-black", title: "Nissan Skyline GT Street - Black", collection: "rc-cars",
    price: 7199, compareAt: 14999, soldOut: true,
    images: [CDN + "beingboys-nissan-skyline-gt-street-rc-car-chennai-india-drift-side.jpg?v=1770545943"] },
  { handle: "toyota-panda", title: "Toyota Panda - B&W", collection: "rc-cars", alsoIn: ["mini-rc-drift-cars"],
    price: 3999, compareAt: 5999, soldOut: false,
    images: [CDN + "A82BEA1A-EEBE-4711-9227-2A5BA056F184.jpg?v=1779290799", CDN + "42347A33-B607-4A1B-B1FC-8ED111278237.jpg?v=1779290824"] },

  // ---- Mini RC Drift Cars ----
  { handle: "porsche-911-gt3", title: "Porsche 911 GT3 - RED", collection: "mini-rc-drift-cars",
    price: 1999, compareAt: 3999, soldOut: false, featured: true,
    images: [CDN + "94AC45BD-27A2-471A-A621-EF3D03D041FE.jpg?v=1778813604", CDN + "A7DA381B-A5F3-4126-8EC7-7D7CD8E6E4B3.jpg?v=1778813645"] },
  { handle: "toyota-black-mamba-rc", title: "Toyota - Black Mamba RC", collection: "mini-rc-drift-cars",
    price: 3999, compareAt: 5999, soldOut: false, featured: true,
    images: [CDN + "1A6379B4-67A3-47FF-8670-0B56A8597B11.jpg?v=1777083480", CDN + "8A6C913D-70C0-47D9-A0C3-ECE63804085E.jpg?v=1777083481"] },
  { handle: "nissan-gt-r-godzilla", title: "Nissan GT-R Godzilla - Black", collection: "mini-rc-drift-cars",
    price: 1499, compareAt: 3999, soldOut: false, featured: true,
    images: [CDN + "beingboys_nissan_gtr_godzilla_rc_car_chennai_india_drift_front_view.jpg?v=1770542878", CDN + "beingboys_nissan_gtr_godzilla_racing_rc_car_india_side_profile.jpg?v=1770542921"] },
  { handle: "dodge-challenger-muscle-x", title: "Dodge Challenger Muscle - Red", collection: "mini-rc-drift-cars",
    price: 1999, compareAt: 3999, soldOut: true,
    images: [CDN + "beingboys-dodge-challenger-muscle-rc-car-chennai-drift-front-view.jpg?v=1765734482"] },
  { handle: "porsche-911", title: "Porsche 911 GT3 Gallop Xtreme", collection: "mini-rc-drift-cars",
    price: 1699, compareAt: 3999, soldOut: true,
    images: [CDN + "beingboys_porsche_911_gt3_gallop_xtreme_rc_car_chennai_india_drift_front_view.jpg?v=1770543271"] },
  { handle: "dodge-challenger-muscle-blue", title: "Dodge Challenger Muscle - Blue", collection: "mini-rc-drift-cars",
    price: 2199, compareAt: 3999, soldOut: false,
    images: [CDN + "beingboys-dodge-challenger-muscle-rc-car-chennai-india-drift-front-view-cones.jpg?v=1770543610"] },
  { handle: "nissan-gt-r-godzilla-red", title: "Nissan GT-R Godzilla - Red", collection: "mini-rc-drift-cars",
    price: 2199, compareAt: 3999, soldOut: false, spec: "Upto 30km - 4WD Drift RC",
    images: [CDN + "beingboys-nissan-gtr-godzilla-rc-car-chennai-india-drift-front-view..jpg?v=1765734189"] },
  { handle: "dodge-challenger-muscle-yellow", title: "Dodge Challenger Muscle - Yellow", collection: "mini-rc-drift-cars",
    price: 2199, compareAt: 3999, soldOut: false, spec: "Upto 30km - 4WD Drift RC",
    images: [CDN + "beingboys-dodge-challenger-muscle-rc-car-chennai-india-drift-front-view-cone.jpg?v=1770543691", CDN + "beingboys-dodge-challenger-muscle-rc-car-chennai-india-drift-front-view.jpg?v=1768593677"] },
  { handle: "buggy-storm-rc-red", title: "Buggy Storm - RC Red", collection: "mini-rc-drift-cars",
    price: 4999, compareAt: 6999, soldOut: false,
    images: [CDN + "EBD5780D-2C3D-492B-86DA-ABB9453744FC.jpg?v=1777083222"] },

  // ---- Tiny Desktop Cars ----
  { handle: "mustang-hoonicorn-crawler", title: "Mustang Hoonicorn Desktop RC car", collection: "tiny-desktop-cars",
    price: 6999, compareAt: 9999, soldOut: true,
    images: [CDN + "PXL_20251101_061710716_1df225f6-9091-4f6f-bff9-4fffa4f8ccd3.jpg?v=1763772808"] },
  { handle: "porsche-mini-desktop", title: "Porsche mini desktop", collection: "tiny-desktop-cars",
    price: 9999, compareAt: 14999, soldOut: true,
    images: [CDN + "Porsche-canva.png?v=1763772628"] },

  // ---- Crawlers ----
  { handle: "crawler-high-speed-rc", title: "Crawler High speed RC - Outdoor", collection: "crawlers",
    price: 14999, compareAt: null, soldOut: true,
    images: [CDN + "beingboys-crawler-high-speed-rc-car-chennai-india-offroad..jpg?v=1770545295"] }
];

// Home hero slideshow (3 slides) — heading, sub, product link, image
export const heroSlides = [
  { heading: "NISSAN GTR - Godzilla", sub: "Upto 30km - 4WD Drift RC", handle: "nissan-gt-r-godzilla-red",
    image: CDN + "beingboys-nissan-gtr-godzilla-rc-car-chennai-india-drift-front-view..jpg?v=1765734189&width=3840" },
  { heading: "DODGE CHALLENGER - Striped Yellow", sub: "Upto 30km - 4WD Drift RC", handle: "dodge-challenger-muscle-yellow",
    image: CDN + "beingboys-dodge-challenger-muscle-rc-car-chennai-india-drift-front-view.jpg?v=1768593677&width=3840" },
  { heading: "Mitsubishi Xtreme Sport - White", sub: "Upto 70km - 4WD Drift RC", handle: "mitsubishi-xtreme-sport",
    image: CDN + "beingboys-mitsubishi-xtreme-sport-remote-controlled-rc-car-india-cones.jpg?v=1770543862&width=3840" }
];

// Homepage "Featured products" grid order (4): porsche-911-gt3, toyota-panda, toyota-black-mamba-rc, nissan-gt-r-godzilla
export const featuredHandles = ["porsche-911-gt3", "toyota-panda", "toyota-black-mamba-rc", "nissan-gt-r-godzilla"];
// Homepage featured-product spotlight: mitsubishi-xtreme-sport (qty picker + add to cart + view full details)

export const faqs = [
  { q: "Do you ship outside Chennai?", a: "Yes, we deliver <b>Pan India</b> with fast delivery across all major cities." },
  { q: "How fast do BeingBoys RC cars go?", a: "Depending on the model:<ul><li>Mini drift RC cars: <b>15\u201325 km/h</b></li><li>Hobby drift/racing RC cars: <b>30\u201350 km/h</b></li><li>Brushless high-performance models: <b>60\u201370+ km/h</b></li></ul>" },
  { q: "What\u2019s the battery life?", a: "Most RC cars run for <b>15\u201325 minutes</b> per charge depending on speed and terrain. We also offer models with <b>swap batteries</b> for extended play." },
  { q: "What payment methods do you accept?", a: "<ul><li>UPI</li><li>Razorpay</li><li>Credit/Debit Cards</li><li>EMI</li><li>Wallets</li><li>Net banking</li></ul>" },
  { q: "Do you offer replacements?", a: "Yes — BeingBoys offers <b>7-Day Replacement</b> for defective or damaged units caused during delivery. We are one of the few RC brands in India with such a policy." },
  { q: "How long should I charge the battery?", a: "Typically <b>1\u20132 hours</b> depending on the model. Always use the <b>included USB charger</b> and avoid overcharging." }
];

export function money(n) {
  return "Rs. " + n.toLocaleString("en-IN", { minimumFractionDigits: 2 }) + "";
}
