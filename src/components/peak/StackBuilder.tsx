import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const goals = ["Energy", "Sleep", "Focus", "Recovery", "Longevity", "Strength"];
const stack = [
  { name: "Foundation", dose: "2 caps · AM" },
  { name: "Focus", dose: "1 cap · AM" },
  { name: "Recovery", dose: "2 caps · PM" },
];

export function StackBuilder() {
  return (
    <section className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-[36px] overflow-hidden bg-card border border-border p-8 md:p-16 shadow-card">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-6">
              <Sparkles className="h-3 w-3 text-primary" /> AI Stack Builder
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Tell us your goals. We build your stack.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-md">
              Answer 12 questions. Our model cross-references 8,000+ studies to design a regimen for your biology.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {goals.map((g) => (
                <button key={g} className="px-4 py-2 rounded-full glass text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  {g}
                </button>
              ))}
            </div>
            <button className="mt-10 h-14 px-7 rounded-full bg-gradient-primary text-primary-foreground font-medium glow-primary inline-flex items-center gap-2">
              Start the quiz <Sparkles className="h-4 w-4" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-[28px] p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Your stack</div>
                <div className="font-display text-2xl font-bold mt-1">Cognitive · Recovery</div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold">$184</div>
                <div className="text-xs text-muted-foreground line-through">$221</div>
              </div>
            </div>
            <div className="space-y-3">
              {stack.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl bg-background/50 border border-border p-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary glow-primary flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.dose}</div>
                  </div>
                  <div className="text-sm font-medium">Match 96%</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Free shipping · Cancel anytime</span>
              <span className="text-primary font-medium">17% bundle off</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
