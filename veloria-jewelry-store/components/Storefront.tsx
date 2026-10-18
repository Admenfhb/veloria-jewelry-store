 "use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="scene-loading">Preparing the 3D experience…</div>
});

type Product = {
  id: number; name: string; category: string; price: number; label: string; image: string;
  description: string; metal: string; material: string; tone: string;
};

const products: Product[] = [
  { id: 1, name: "The Sol Ring", category: "Rings", price: 890, label: "BESTSELLER", image: "photo-1605100804763-247f67b3557e", description: "A sculptural gold band crowned with a luminous stone. Designed to become part of your everyday ritual.", metal: "18k gold", material: "Lab-grown diamond", tone: "Yellow gold" },
  { id: 2, name: "Luna Pendant", category: "Necklaces", price: 640, label: "NEW", image: "photo-1599643478518-a784e5dc4c8f", description: "A quiet point of light, suspended on a fine chain. Understated, personal, unforgettable.", metal: "18k gold vermeil", material: "White sapphire", tone: "Yellow gold" },
  { id: 3, name: "Sculpted Hoops", category: "Earrings", price: 520, label: "", image: "photo-1535632066927-ab7c9ab60908", description: "Softly sculpted hoops with a confident silhouette and a comfortable, considered fit.", metal: "Recycled sterling silver", material: "Polished finish", tone: "Silver" },
  { id: 4, name: "Eclipse Cuff", category: "Bracelets", price: 760, label: "LIMITED", image: "photo-1611591437281-460bfbe1220a", description: "A fluid cuff that catches the light from every angle. A modern heirloom with an organic edge.", metal: "18k rose gold vermeil", material: "High-polish finish", tone: "Rose gold" },
  { id: 5, name: "Orbit Signet", category: "Rings", price: 710, label: "", image: "photo-1603561591411-07134e71a2a9", description: "A contemporary signet with softened edges, made for stacking or wearing alone.", metal: "18k gold vermeil", material: "Polished finish", tone: "Yellow gold" },
  { id: 6, name: "Dawn Drop Earrings", category: "Earrings", price: 580, label: "NEW", image: "photo-1617038220319-276d3cfab638", description: "Delicate drops that move with you, bringing a subtle shimmer to day and evening.", metal: "Sterling silver", material: "Cubic zirconia", tone: "Silver" }
];

const imageUrl = (id: string, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

export default function Storefront() {
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState("Featured");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [tone, setTone] = useState("Yellow gold");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("veloria-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch { /* Keep the storefront usable if storage is unavailable. */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("veloria-cart", JSON.stringify(cart)); } catch { /* Storage is optional. */ }
  }, [cart]);

  const visibleProducts = useMemo(() => {
    let list = products.filter((p) => (category === "All pieces" || p.category === category) && `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === "Price: low to high") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Newest") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [category, sort, search]);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (products.find((p) => p.id === item.id)?.price ?? 0) * item.qty, 0);
  const addToCart = (id: number) => {
    setCart((current) => current.some((item) => item.id === id)
      ? current.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      : [...current, { id, qty: 1 }]);
    setNotice("Added to your bag");
    window.setTimeout(() => setNotice(""), 2200);
  };
  const changeQty = (id: number, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);

  return (
    <main>
      <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $250 <span>✦</span> CRAFTED TO BE KEPT</div>
      <header className="site-header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMobileMenu(false)}>Shop all</a><a href="#collection" onClick={() => { setCategory("Rings"); setMobileMenu(false); }}>Rings</a><a href="#collection" onClick={() => { setCategory("Necklaces"); setMobileMenu(false); }}>Necklaces</a>
        </nav>
        <a href="#" className="wordmark" aria-label="VELORIA home">VELORIA<span>®</span></a>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
          <a className="header-about" href="#story">Our story</a>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18} /><span>Bag ({count})</span></button>
        </div>
      </header>
      {searchOpen && <div className="search-bar"><Search size={17} /><input autoFocus value={search} onChange={(e) => { setSearch(e.target.value); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Search pieces…" aria-label="Search pieces" /><button className="icon-button" onClick={() => { setSearch(""); setSearchOpen(false); }} aria-label="Close search"><X size={18} /></button></div>}

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />THE ART OF EVERYDAY LUXURY</p>
          <h1>Made to be<br /><em>kept forever.</em></h1>
          <p className="hero-description">Modern heirlooms. Thoughtfully made. Jewellery that feels like you — today, and for all the days to come.</p>
          <div className="hero-actions"><a href="#collection" className="button button-gold">Discover the collection <ArrowRight size={16} /></a><a href="#story" className="text-link">Our philosophy <ArrowDownRight size={16} /></a></div>
          <div className="hero-footnote"><span>01 / 03</span><span className="footnote-line" /><span>THE SOL COLLECTION</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow" />
          <Scene3D tone={tone} />
          <div className="hero-product-note"><span className="note-dot" /><div><small>FEATURED PIECE</small><strong>The Sol Ring</strong><span>18k gold · luminous stone</span></div><b>{money(890)}</b></div>
          <div className="vertical-label">OBJECTS OF LASTING BEAUTY · VOL. 01</div>
        </div>
        <a className="scroll-cue" href="#collection"><span />SCROLL TO DISCOVER</a>
      </section>

      <section className="trust-strip" aria-label="Our values">
        <div><Sparkles size={17} /><span>Considered design</span></div><div><span className="trust-star">✳</span><span>Made for everyday</span></div><div><Check size={17} /><span>Quality, always</span></div><div><span className="trust-star">✧</span><span>Gift-ready packaging</span></div>
      </section>

      <section className="collection section-pad" id="collection">
        <div className="section-heading">
          <div><p className="eyebrow">THE VELORIA EDIT</p><h2>Pieces with <em>presence.</em></h2></div>
          <a className="text-link desktop-link" href="#story">A little about us <ArrowRight size={16} /></a>
        </div>
        <div className="collection-toolbar">
          <div className="category-tabs" role="group" aria-label="Filter by category">
            {["All pieces", "Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => <button key={item} className={category === item ? "tab active" : "tab"} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="sort-label">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={14} /></label>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product, index) => <motion.article className="product-card" key={product.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.42, delay: (index % 3) * 0.07 }}>
            <div className="product-image-wrap">
              <button className="product-image-button" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}><img src={imageUrl(product.image)} alt={`${product.name} jewellery`} loading="lazy" /><span className="quick-view">Quick view <ArrowRight size={14} /></span></button>
              {product.label && <span className="product-label">{product.label}</span>}
              <button className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} aria-label={favorites.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              <button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to bag`}><Plus size={17} /></button>
            </div>
            <div className="product-meta"><div><h3><button onClick={() => setSelected(product)}>{product.name}</button></h3><p>{product.metal}</p></div><strong>{money(product.price)}</strong></div>
          </motion.article>)}
        </div>
        {visibleProducts.length === 0 && <div className="no-results">No pieces found. Try another search or category.</div>}
        <p className="demo-disclaimer">Preview catalogue · Product names, pricing and stock are demonstration data and must be verified before launch.</p>
        <div className="center-action"><a href="#story" className="button button-outline">Explore our world <ArrowRight size={16} /></a></div>
      </section>

      <section className="story" id="story">
        <div className="story-image"><img src={imageUrl("photo-1611652022419-a9419f74343d", 1200)} alt="Close-up of refined gold jewellery" loading="lazy" /><span className="image-caption">FORM, LIGHT, FEELING — THE VELORIA APPROACH</span></div>
        <div className="story-copy"><p className="eyebrow">BEHIND EVERY DETAIL</p><h2>Less, but<br /><em>meaningful.</em></h2><p>We believe the pieces you reach for most should be the ones that mean the most. Every curve, finish and detail begins with a simple question: will you still love it years from now?</p><p>VELORIA is a study in quiet confidence — jewellery made to become part of your story, not just your outfit.</p><a className="text-link" href="#newsletter">Get to know us <ArrowRight size={16} /></a><div className="signature">The VELORIA Studio <span>✦</span></div></div>
      </section>

      <section className="craft section-pad">
        <div className="craft-intro"><p className="eyebrow">A CLOSER LOOK</p><h2>Beauty in every<br /><em>small thing.</em></h2><p>Good design is felt as much as it is seen. We obsess over the details that make a piece feel just right.</p></div>
        <div className="craft-points"><div><span>01</span><div><h3>Thoughtful materials</h3><p>Clear information about metals, finishes and stones — so you can choose with confidence.</p></div><ArrowDownRight size={19} /></div><div><span>02</span><div><h3>Designed to live in</h3><p>Versatile silhouettes made to move from your everyday to your most memorable moments.</p></div><ArrowDownRight size={19} /></div><div><span>03</span><div><h3>Details worth keeping</h3><p>Considered finishing, careful presentation and support beyond the moment you unwrap it.</p></div><ArrowDownRight size={19} /></div></div>
      </section>

      <section className="newsletter section-pad" id="newsletter"><div><p className="eyebrow">LETTERS FROM VELORIA</p><h2>A little light<br /><em>in your inbox.</em></h2><p>First looks, thoughtful notes and 10% off your first order.</p></div><form onSubmit={(e) => { e.preventDefault(); setNotice("Thank you — newsletter demo submitted."); window.setTimeout(() => setNotice(""), 3000); }}><label htmlFor="email">YOUR EMAIL ADDRESS</label><div className="email-field"><input id="email" type="email" placeholder="you@example.com" required /><button type="submit" aria-label="Subscribe to newsletter"><ArrowRight /></button></div><small>By subscribing, you agree to receive occasional emails from VELORIA. Demo form only.</small></form></section>

      <footer className="footer"><div className="footer-top"><a href="#" className="wordmark footer-wordmark">VELORIA<span>®</span></a><p>Objects of lasting beauty.</p><a className="back-top" href="#">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© 2026 VELORIA STUDIO · DEMO STORE</span><div><a href="#story">Our story</a><a href="#collection">Shop</a><a href="mailto:hello@example.com">Contact</a></div><span>MADE WITH INTENTION ✦</span></div></footer>

      <AnimatePresence>{cartOpen && <><motion.button className="drawer-scrim" aria-label="Close bag" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.28 }}>
        <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
        {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={31} /><h3>Your bag is waiting.</h3><p>Find a piece that feels like you.</p><button className="button button-gold" onClick={() => setCartOpen(false)}>Explore the collection <ArrowRight size={16} /></button></div> : <>
          <div className="cart-items">{cart.map((item) => { const p = products.find((x) => x.id === item.id)!; return <div className="cart-item" key={p.id}><img src={imageUrl(p.image, 300)} alt={p.name} /><div className="cart-item-info"><h3>{p.name}</h3><p>{p.metal}</p><strong>{money(p.price)}</strong><div className="qty-control"><button onClick={() => changeQty(p.id, -1)} aria-label={`Decrease ${p.name} quantity`}><Minus size={12} /></button><span>{item.qty}</span><button onClick={() => changeQty(p.id, 1)} aria-label={`Increase ${p.name} quantity`}><Plus size={12} /></button></div></div><button className="remove-item" onClick={() => setCart((c) => c.filter((x) => x.id !== p.id))}>Remove</button></div>; })}</div>
          <div className="cart-summary"><p><span>Subtotal</span><strong>{money(subtotal)}</strong></p><small>Shipping and taxes are calculated at checkout.</small><button className="button button-gold checkout-button" onClick={() => setNotice("Demo checkout only — connect a secure payment provider before launch.")}>Continue to checkout <ArrowRight size={16} /></button><small className="checkout-note">Checkout is not connected. No payment will be taken.</small></div>
        </>}
      </motion.aside></>}</AnimatePresence>

      <AnimatePresence>{selected && <><motion.button className="modal-scrim" aria-label="Close product details" onClick={() => setSelected(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.div className="product-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}><button className="modal-close icon-button" onClick={() => setSelected(null)} aria-label="Close details"><X /></button><div className="modal-image"><img src={imageUrl(selected.image, 900)} alt={selected.name} /></div><div className="modal-details"><p className="eyebrow">{selected.category.toUpperCase()} · VELORIA EDIT</p><h2>{selected.name}</h2><strong className="modal-price">{money(selected.price)}</strong><p className="modal-description">{selected.description}</p><div className="spec-row"><span>Material</span><strong>{selected.metal}</strong></div><div className="spec-row"><span>Stone / finish</span><strong>{selected.material}</strong></div><div className="tone-picker"><span>Metal tone</span><div>{["Yellow gold", "Rose gold", "Silver"].map((t) => <button key={t} className={tone === t ? "tone-option selected" : "tone-option"} onClick={() => setTone(t)}><i className={`tone-dot ${t.toLowerCase().replace(" ", "-")}`} />{t}</button>)}</div></div><button className="button button-gold modal-add" onClick={() => { addToCart(selected.id); setSelected(null); setCartOpen(true); }}>Add to bag — {money(selected.price)} <ArrowRight size={16} /></button><p className="modal-disclaimer">Demo product details. Confirm materials, sizing, availability and policies before selling.</p></div></motion.div></>}</AnimatePresence>
      <AnimatePresence>{notice && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>{notice}<Check size={16} /></motion.div>}</AnimatePresence>
    </main>
  );
}
