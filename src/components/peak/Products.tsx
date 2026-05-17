import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const products = [
  { name: "Foundation", tag: "Daily essentials", price: 79, hue: 22, desc: "26 micronutrients, clinically dosed" },
  { name: "Focus", tag: "Cognitive", price: 64, hue: 14, desc: "Lion's Mane · L-Theanine · Alpha-GPC" },
  { name: "Recovery", tag: "Sleep & repair", price: 58, hue: 28, desc: "Magnesium glycinate · Apigenin · Glycine" },
  { name: "Vitality", tag: "Hormonal", price: 84, hue: 18, desc: "Tongkat Ali · Ashwagandha KSM-66" },
];

export function Products() {
  return (
    <section className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div>
          <p className="text-sm text-primary mb-3 font-medium">The collection</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-2xl">
            Four formulas. Engineered to stack.
          </h2>
        </div>
        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">View all →</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative rounded-[20px] bg-card border border-border overflow-hidden shadow-card cursor-pointer"
          >
            <div
              className="aspect-[4/5] relative overflow-hidden"
              style={{ background: `radial-gradient(circle at 50% 60%, oklch(0.5 0.22 ${p.hue} / 0.5), oklch(0.13 0 0))` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-32 h-44 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 shadow-2xl flex items-end justify-center pb-6"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-white/70">{p.name.toUpperCase()}</span>
                </motion.div>
              </div>
              <div className="absolute top-3 left-3 text-[10px] tracking-widest uppercase text-white/60 glass rounded-full px-2.5 py-1">
                {p.tag}
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </div>
                <div className="font-display font-bold">${p.price}</div>
              </div>
              <button className="mt-4 w-full h-11 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Plus className="h-4 w-4" /> Add to stack
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
