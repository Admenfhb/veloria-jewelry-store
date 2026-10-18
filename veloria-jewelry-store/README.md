# VELORIA — Luxury Jewellery Storefront

A responsive Next.js demo storefront with a dark editorial visual system, gold accents, a 3D ring scene (React Three Fiber), product filtering/sorting, wishlist toggles, quick-view product details, and a persistent local demo cart.

## Requirements
- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

Production build:
```bash
npm run build
npm start
```

## Included
- Responsive home page and collection catalogue
- Demo products, category filters, search and sorting
- Interactive 3D demo ring using Three.js / React Three Fiber
- Drag-to-orbit controls, studio environment, floating animation
- Product detail modal and metal-tone controls for the demo model
- Wishlist toggle
- Side-cart with quantity controls and localStorage persistence
- Newsletter demo form and checkout placeholder
- Reduced-motion CSS preference, semantic labels and focus styles
- Metadata and Open Graph defaults

## Before going live
This is a front-end demo, not a production commerce system. Do not treat sample products, prices, materials, shipping details or availability as verified real inventory.

1. Replace the sample catalogue in `components/Storefront.tsx` with verified product data.
2. Replace Unsplash images with licensed product photography you own or have permission to use.
3. Replace the procedural 3D ring in `components/Scene3D.tsx` with your real `.glb` / `.gltf` asset. For example, use `useGLTF` from `@react-three/drei`, and make sure the model has optimized meshes and textures.
4. Connect Shopify or another commerce backend for product inventory, checkout, taxes, shipping, orders, refunds and customer accounts. Keep secret keys server-side; never expose them via `NEXT_PUBLIC_*`.
5. Connect the newsletter form to a real provider and add consent/privacy handling.
6. Replace the placeholder `metadataBase` URL in `app/layout.tsx` with your production domain.
7. Add your actual return, shipping, privacy, terms, warranty, size-guide and contact pages.
8. Test keyboard accessibility, screen readers, mobile devices, WebGL failure fallback, image loading and reduced-motion behavior.
9. Add analytics/cookie consent only as appropriate for your audience and jurisdiction.

## Currency
The sample storefront uses USD for display only. Update the `money()` function in `components/Storefront.tsx` for your launch currency and ensure backend prices are authoritative.

## 3D note
The current 3D object is a procedural demo ring, not a scanned or production jewellery model. The selected metal tone affects the demo ring's material; the product cards and images are illustrative placeholders.

## Security
No payment card data is collected or stored. The checkout button deliberately displays a demo notice. Integrate a hosted checkout/payment provider before accepting orders.
