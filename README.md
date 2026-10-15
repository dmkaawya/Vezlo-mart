# Vezlo Mart — responsive front-end demo

## Included pages
- `index.html` — home, categories, feature highlights, featured products and reseller promotion
- `shop.html` — product search, category filtering, sorting and responsive cards
- `product.html` — gallery, variants, quantity, add-to-cart, buy-now, wishlist and related/recent products
- `cart.html` — quantity changes, remove, subtotal and checkout link
- `checkout.html` — four-step customer, compatible courier, payment and review flow

## Edit hard-coded data
- `assets/js/products.js`: product names, IDs, categories, prices, old prices, stock, images, variants, reseller pricing and product courier compatibility.
- `assets/js/config.js`: currency, public bank details, courier compatibility/combined package fees/estimates, WhatsApp destination, and tax configuration.
- `assets/css/vezlo.css`: theme, spacing, layout and responsive design.
- `assets/js/ui.js`: shared search and mobile menu interactions.
- `assets/js/store.js`: local demo cart, wishlist, theme and product card behavior.

Product photo URLs currently use Unsplash sample images; replace these with your public product image URLs. Use public Cloudinary delivery URLs only; never expose Cloudinary API secrets in front-end code.

## Run locally
Open `index.html` in a modern browser. If local-file restrictions affect scripts, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.

## Critical security limitations
This is a hard-coded front-end demo, not production security. It has no database, no server-side authentication, no trusted stock checks, and no server-side order submission. Cart, wishlist and order previews are stored in the user's browser and can be edited. Do not use it to accept real customer data or payments yet.

The checkout preview is deliberately labelled `DEMO_ONLY_NOT_SUBMITTED`. It does not create a real order, reserve stock, debit authoritative store credit, or send WhatsApp automatically. The WhatsApp message must be sent by the customer after opening WhatsApp; the destination remains a placeholder until configured. The bank details are placeholders. The tax rate defaults to zero and should only be configured if legally applicable.

## Database-ready later
The product catalog, public configuration and storefront functions are separated for a future database adapter. A real deployment needs server-side/Edge Function validation of product price, stock, discounts, courier compatibility and fee, tax, credit and order totals; authenticated roles; RLS policies on every relevant table; transactional store-credit ledger updates; audit logs; and server-side order persistence. Never put a Supabase service-role key or private token in these files. COD change must not become credit until cash receipt/settlement is verified.

## Test checklist
1. Navigate Home → Shop → Product → Cart → Checkout.
2. Test global/mobile search, category filter and sorting.
3. Add product, change quantity, remove product and reload.
4. Toggle dark/light mode.
5. Test product gallery thumbnails, variant selectors and wishlist buttons.
6. Complete each checkout step, test compatible courier display and bank detail copy buttons.
7. Confirm the Terms checkbox is required and final status says demo only/not submitted.
8. Test desktop and mobile widths. Internet is needed for sample Unsplash photos.
