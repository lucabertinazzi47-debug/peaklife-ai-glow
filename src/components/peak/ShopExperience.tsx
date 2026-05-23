import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Check,
  Star,
  Loader2,
  ChevronDown,
  Trash2,
  ArrowRight,
  Leaf,
  FlaskConical,
  Moon,
  Brain,
  Heart,
  Zap,
  Dumbbell,
  ShieldCheck,
} from "lucide-react";

type Category =
  | "All"
  | "Foundation"
  | "Focus"
  | "Sleep"
  | "Energy"
  | "Recovery"
  | "Longevity"
  | "Hormonal";

type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  hue: number;
  ingredients: string[];
  badges: ("Vegan" | "NSF" | "Third-party tested" | "Subscribe & save")[];
  bestseller?: boolean;
  new?: boolean;
};

const PRODUCTS: Product[] = [
  { id: "foundation", name: "Foundation", category: "Foundation", tagline: "26 essentials, clinically dosed", price: 79, rating: 4.9, reviews: 2841, hue: 22, ingredients: ["Vitamin D3", "K2", "Magnesium", "Zinc"], badges: ["NSF", "Third-party tested", "Subscribe & save"], bestseller: true },
  { id: "focus", name: "Focus", category: "Focus", tagline: "Lion's Mane · L-Theanine · Alpha-GPC", price: 64, rating: 4.8, reviews: 1622, hue: 14, ingredients: ["Lion's Mane", "L-Theanine", "Alpha-GPC", "Bacopa"], badges: ["Vegan", "Third-party tested"] },
  { id: "recovery", name: "Recovery", category: "Sleep", tagline: "Magnesium glycinate · Apigenin · Glycine", price: 58, rating: 4.9, reviews: 3120, hue: 28, ingredients: ["Mg Glycinate", "Apigenin", "Glycine", "L-Theanine"], badges: ["Vegan", "NSF"], bestseller: true },
  { id: "vitality", name: "Vitality", category: "Hormonal", tagline: "Tongkat Ali · Ashwagandha KSM-66", price: 84, rating: 4.7, reviews: 904, hue: 18, ingredients: ["Tongkat Ali", "Ashwagandha", "Boron"], badges: ["Third-party tested"] },
  { id: "ignite", name: "Ignite", category: "Energy", tagline: "Clean caffeine · CoQ10 · B-complex", price: 49, rating: 4.6, reviews: 712, hue: 32, ingredients: ["Caffeine", "L-Theanine", "CoQ10", "B12"], badges: ["Subscribe & save"], new: true },
  { id: "endure", name: "Endure", category: "Recovery", tagline: "Creatine · Beta-Alanine · Electrolytes", price: 54, rating: 4.8, reviews: 1180, hue: 20, ingredients: ["Creatine", "Beta-Alanine", "Sodium", "Potassium"], badges: ["NSF", "Vegan"] },
  { id: "longevity", name: "Longevity", category: "Longevity", tagline: "NMN · Resveratrol · Spermidine", price: 119, rating: 4.7, reviews: 488, hue: 12, ingredients: ["NMN", "Resveratrol", "Spermidine", "Quercetin"], badges: ["Third-party tested"], new: true },
  { id: "calm", name: "Calm", category: "Sleep", tagline: "Ashwagandha · Saffron · L-Theanine", price: 46, rating: 4.8, reviews: 2002, hue: 26, ingredients: ["Ashwagandha", "Saffron", "L-Theanine"], badges: ["Vegan", "Subscribe & save"] },
  { id: "omega", name: "Omega+", category: "Foundation", tagline: "Triglyceride EPA/DHA · Astaxanthin", price: 39, rating: 4.9, reviews: 4310, hue: 24, ingredients: ["EPA", "DHA", "Astaxanthin"], badges: ["Third-party tested", "NSF"] },
  { id: "greens", name: "Daily Greens", category: "Foundation", tagline: "Spirulina · Spinach · Adaptogens", price: 69, rating: 4.6, reviews: 1850, hue: 30, ingredients: ["Spirulina", "Spinach", "Reishi", "Ginger"], badges: ["Vegan", "Subscribe & save"] },
  { id: "shield", name: "Shield", category: "Foundation", tagline: "Vitamin C · Quercetin · Elderberry", price: 42, rating: 4.7, reviews: 980, hue: 16, ingredients: ["Vitamin C", "Quercetin", "Elderberry", "Zinc"], badges: ["Vegan"] },
  { id: "deep", name: "Deep", category: "Sleep", tagline: "Glycine · Magnesium · GABA", price: 52, rating: 4.8, reviews: 1340, hue: 28, ingredients: ["Glycine", "Magnesium", "GABA"], badges: ["Third-party tested"] },
];

const CATEGORIES: { key: Category; icon: typeof Leaf; count?: number }[] = [
  { key: "All", icon: Sparkles },
  { key: "Foundation", icon: Leaf },
  { key: "Focus", icon: Brain },
  { key: "Sleep", icon: Moon },
  { key: "Energy", icon: Zap },
  { key: "Recovery", icon: Dumbbell },
  { key: "Longevity", icon: Heart },
  { key: "Hormonal", icon: FlaskConical },
];

const BADGES = ["Vegan", "NSF", "Third-party tested", "Subscribe & save"] as const;
const AI_SUGGESTIONS = [
  "Help me sleep deeper",
  "Sharper focus for deep work",
  "Recover faster from training",
  "Energy without the crash",
];

type CartItem = { id: string; qty: number };

export function ShopExperience() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [aiActive, setAiActive] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiMatches, setAiMatches] = useState<string[] | null>(null);
  const [priceMax, setPriceMax] = useState(150);
  const [activeBadges, setActiveBadges] = useState<string[]>([]);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [cart, setCart] = useState<CartItem[]>([{ id: "foundation", qty: 1 }, { id: "recovery", qty: 2 }]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleBadge = (b: string) =>
    setActiveBadges((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]));

  const runAiSearch = (q: string) => {
    setQuery(q);
    setAiActive(true);
    setAiThinking(true);
    setAiMatches(null);
    const lower = q.toLowerCase();
    setTimeout(() => {
      const scored = PRODUCTS.map((p) => {
        const blob = (p.name + " " + p.tagline + " " + p.category + " " + p.ingredients.join(" ")).toLowerCase();
        let score = 0;
        lower.split(/\s+/).filter(Boolean).forEach((w) => { if (blob.includes(w)) score += 2; });
        if (lower.includes("sleep") && p.category === "Sleep") score += 5;
        if (lower.includes("focus") && p.category === "Focus") score += 5;
        if (lower.includes("energy") && p.category === "Energy") score += 5;
        if (lower.includes("recover") && (p.category === "Recovery" || p.category === "Sleep")) score += 4;
        if (lower.includes("train") && p.category === "Recovery") score += 3;
        return { id: p.id, score };
      }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map((s) => s.id);
      setAiMatches(scored.length ? scored : PRODUCTS.slice(0, 3).map((p) => p.id));
      setAiThinking(false);
    }, 900);
  };

  const clearAi = () => { setAiActive(false); setAiMatches(null); setQuery(""); };

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === "All" || p.category === category);
    if (!aiActive && query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => (p.name + " " + p.tagline + " " + p.ingredients.join(" ")).toLowerCase().includes(q));
    }
    list = list.filter((p) => p.price <= priceMax);
    if (activeBadges.length) list = list.filter((p) => activeBadges.every((b) => p.badges.includes(b as never)));
    if (aiActive && aiMatches) {
      list = list.filter((p) => aiMatches.includes(p.id))
        .sort((a, b) => aiMatches.indexOf(a.id) - aiMatches.indexOf(b.id));
      return list;
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [category, query, aiActive, aiMatches, priceMax, activeBadges, sort]);

  const addToCart = (id: string) =>
    setCart((p) => p.find((i) => i.id === id) ? p.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...p, { id, qty: 1 }]);
  const setQty = (id: string, qty: number) =>
    setCart((p) => qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => i.id === id ? { ...i, qty } : i));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.qty * (PRODUCTS.find((p) => p.id === i.id)?.price ?? 0), 0);

  return (
    <div className="relative pt-28 md:pt-32 pb-32">
      {/* Header */}
      <header className="px-6 max-w-7xl mx-auto">
        <p className="text-sm text-primary font-medium mb-3">The collection</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-3xl">
          Engineered formulas. <span className="text-muted-foreground">Find yours.</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          {PRODUCTS.length} clinically-dosed products. Describe a goal — our AI will surface the precise stack for you.
        </p>

        {/* AI search */}
        <div className="mt-8 relative">
          <div className="glass rounded-2xl p-2 md:p-3 flex items-center gap-2 shadow-card">
            <div className="pl-3 pr-1 flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="hidden sm:inline text-xs font-semibold tracking-widest uppercase">AI</span>
            </div>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (aiActive) setAiActive(false); }}
              onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) runAiSearch(query); }}
              placeholder="Describe your goal — e.g. ‘sleep deeper and wake refreshed’"
              className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-muted-foreground py-2"
            />
            {aiActive && (
              <button onClick={clearAi} className="h-9 w-9 grid place-items-center rounded-full hover:bg-accent/60 transition-colors text-muted-foreground" aria-label="Clear AI search">
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => query.trim() && runAiSearch(query)}
              disabled={!query.trim() || aiThinking}
              className="h-11 px-4 md:px-5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_-8px_var(--primary)]"
            >
              {aiThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="hidden sm:inline">Find my stack</span>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {AI_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => runAiSearch(s)} className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
                {s}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {aiActive && !aiThinking && aiMatches && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-primary font-medium"><Check className="h-4 w-4" /> AI found {aiMatches.length} matches</span>
                <span className="opacity-60">tailored to “{query}”</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Body */}
      <div className="mt-10 px-6 max-w-7xl mx-auto grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sticky sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <FilterPanel
              category={category} setCategory={setCategory}
              priceMax={priceMax} setPriceMax={setPriceMax}
              activeBadges={activeBadges} toggleBadge={toggleBadge}
            />
          </div>
        </aside>

        {/* Main */}
        <section>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button onClick={() => setMobileFilters(true)} className="lg:hidden h-10 px-4 rounded-full glass text-sm flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{filtered.length}</span> products
              {category !== "All" && <> · <span className="text-foreground">{category}</span></>}
            </div>
            <div className="ml-auto relative">
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="appearance-none h-10 pl-4 pr-9 rounded-full glass text-sm cursor-pointer">
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price · Low</option>
                <option value="price-desc">Price · High</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Active chips */}
          {(activeBadges.length > 0 || priceMax < 150 || aiActive) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {aiActive && (
                <Chip onClear={clearAi}><Sparkles className="h-3 w-3" /> AI: {query}</Chip>
              )}
              {activeBadges.map((b) => (
                <Chip key={b} onClear={() => toggleBadge(b)}>{b}</Chip>
              ))}
              {priceMax < 150 && <Chip onClear={() => setPriceMax(150)}>Under ${priceMax}</Chip>}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border p-12 text-center text-muted-foreground">
              No products match your filters. Try widening your search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onAdd={() => addToCart(p.id)} aiRank={aiActive && aiMatches ? aiMatches.indexOf(p.id) + 1 : null} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile filters */}
      <AnimatePresence>
        {mobileFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }} className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface border-t border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold">Filters</h3>
                <button onClick={() => setMobileFilters(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-accent/60"><X className="h-4 w-4" /></button>
              </div>
              <FilterPanel category={category} setCategory={setCategory} priceMax={priceMax} setPriceMax={setPriceMax} activeBadges={activeBadges} toggleBadge={toggleBadge} />
              <button onClick={() => setMobileFilters(false)} className="mt-8 w-full h-12 rounded-full bg-foreground text-background font-medium">Show {filtered.length} products</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cart */}
      <FloatingCart
        cart={cart} products={PRODUCTS} count={cartCount} subtotal={cartSubtotal}
        open={cartOpen} setOpen={setCartOpen} setQty={setQty}
      />
    </div>
  );
}

function FilterPanel({
  category, setCategory, priceMax, setPriceMax, activeBadges, toggleBadge,
}: {
  category: Category; setCategory: (c: Category) => void;
  priceMax: number; setPriceMax: (n: number) => void;
  activeBadges: string[]; toggleBadge: (b: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Categories</h4>
        <ul className="space-y-1">
          {CATEGORIES.map(({ key, icon: Icon }) => {
            const count = key === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;
            const active = category === key;
            return (
              <li key={key}>
                <button onClick={() => setCategory(key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}>
                  <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                  <span className="flex-1 text-left">{key}</span>
                  <span className="text-xs opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Price</h4>
        <input type="range" min={20} max={150} step={5} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>$20</span><span className="text-foreground font-medium">Up to ${priceMax}</span><span>$150</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {BADGES.map((b) => {
            const active = activeBadges.includes(b);
            return (
              <button key={b} onClick={() => toggleBadge(b)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {active && <Check className="h-3 w-3" />}{b}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 text-primary font-medium text-sm mb-1"><ShieldCheck className="h-4 w-4" /> Quality guarantee</div>
        <p className="text-xs text-muted-foreground">Every batch is third-party tested for purity, potency, and heavy metals.</p>
      </div>
    </div>
  );
}

function Chip({ children, onClear }: { children: React.ReactNode; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs pl-3 pr-1.5 py-1.5 rounded-full glass">
      {children}
      <button onClick={onClear} className="h-5 w-5 grid place-items-center rounded-full hover:bg-accent" aria-label="Remove filter"><X className="h-3 w-3" /></button>
    </span>
  );
}

function ProductCard({ product, index, onAdd, aiRank }: { product: Product; index: number; onAdd: () => void; aiRank: number | null }) {
  const [adding, setAdding] = useState(false);
  const handle = () => { setAdding(true); onAdd(); setTimeout(() => setAdding(false), 900); };
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 6) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[22px] bg-card border border-border overflow-hidden shadow-card"
    >
      <div className="aspect-[4/5] relative overflow-hidden" style={{ background: `radial-gradient(circle at 50% 60%, oklch(0.5 0.22 ${product.hue} / 0.55), oklch(0.13 0 0))` }}>
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <div className="flex flex-col gap-1.5">
            {aiRank && (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase font-semibold glass rounded-full px-2.5 py-1 text-primary">
                <Sparkles className="h-3 w-3" /> AI #{aiRank}
              </span>
            )}
            {product.bestseller && <span className="text-[10px] tracking-widest uppercase font-semibold bg-foreground text-background rounded-full px-2.5 py-1">Bestseller</span>}
            {product.new && <span className="text-[10px] tracking-widest uppercase font-semibold bg-primary text-primary-foreground rounded-full px-2.5 py-1">New</span>}
          </div>
          <span className="text-[10px] tracking-widest uppercase text-white/70 glass rounded-full px-2.5 py-1">{product.category}</span>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <motion.div whileHover={{ scale: 1.06, rotate: -2 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-32 h-44 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 shadow-2xl flex flex-col items-center justify-end pb-6 gap-1">
            <span className="font-display text-[10px] tracking-[0.4em] text-white/40">PEAKLIFE</span>
            <span className="font-display text-xs tracking-[0.3em] text-white/85">{product.name.toUpperCase()}</span>
          </motion.div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.tagline}</p>
          </div>
          <div className="font-display font-bold text-lg shrink-0">${product.price}</div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-foreground"><Star className="h-3 w-3 fill-current text-primary" /> {product.rating}</span>
          <span className="opacity-60">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <span key={b} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">{b}</span>
          ))}
        </div>
        <button onClick={handle} className="mt-4 w-full h-11 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
          {adding ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add to stack</>}
        </button>
      </div>
    </motion.article>
  );
}

function FloatingCart({
  cart, products, count, subtotal, open, setOpen, setQty,
}: {
  cart: CartItem[]; products: Product[]; count: number; subtotal: number;
  open: boolean; setOpen: (b: boolean) => void; setQty: (id: string, qty: number) => void;
}) {
  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 240, damping: 20 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 pl-5 pr-6 rounded-full bg-foreground text-background shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
      >
        <span className="relative">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              {count}
            </motion.span>
          )}
        </span>
        <span className="text-sm font-medium">${subtotal}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70]">
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
              className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-surface border-l border-border flex flex-col"
            >
              <header className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="font-display text-xl font-bold">Your stack</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{count} item{count === 1 ? "" : "s"}</p>
                </div>
                <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-accent"><X className="h-4 w-4" /></button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 && (
                  <div className="text-center text-muted-foreground py-16">
                    <ShoppingBag className="h-8 w-8 mx-auto mb-3 opacity-40" />
                    Your stack is empty.
                  </div>
                )}
                {cart.map((i) => {
                  const p = products.find((x) => x.id === i.id);
                  if (!p) return null;
                  return (
                    <div key={i.id} className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden" style={{ background: `radial-gradient(circle at 50% 60%, oklch(0.5 0.22 ${p.hue} / 0.6), oklch(0.13 0 0))` }}>
                        <div className="h-full w-full grid place-items-center">
                          <div className="w-8 h-12 rounded-md bg-gradient-to-b from-neutral-900 to-black border border-white/10" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-display font-bold truncate">{p.name}</h4>
                          <span className="font-medium shrink-0">${p.price * i.qty}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 border border-border rounded-full">
                            <button onClick={() => setQty(i.id, i.qty - 1)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"><Minus className="h-3 w-3" /></button>
                            <span className="text-sm font-medium min-w-6 text-center">{i.qty}</span>
                            <button onClick={() => setQty(i.id, i.qty + 1)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"><Plus className="h-3 w-3" /></button>
                          </div>
                          <button onClick={() => setQty(i.id, 0)} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <footer className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span className="text-foreground font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subscribe & save</span><span className="text-primary font-medium">−15% applied</span>
                </div>
                <button disabled={cart.length === 0} className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_40px_-12px_var(--primary)]">
                  Checkout <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[11px] text-muted-foreground text-center">Free shipping on US orders over $75 · 60-day guarantee</p>
              </footer>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}