import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.jpg";

export function Hero() {
  return (
    <section className="relative bg-hero overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="absolute inset-0 noise" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/20 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            AI-personalized supplementation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance tracking-tight"
          >
            Engineer your<br/>
            <span className="bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text text-transparent">
              peak performance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            Clinically-dosed formulas, calibrated to your biology by AI. One stack. Zero guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button className="group h-14 px-7 rounded-full bg-gradient-primary text-primary-foreground font-medium glow-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <Sparkles className="h-4 w-4" />
              Build my stack
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="h-14 px-7 rounded-full glass text-foreground font-medium hover:bg-accent transition-colors">
              Shop formulas
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
          >
            <div>
              <div className="font-display text-2xl font-bold text-foreground">98%</div>
              report results in 30 days
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold text-foreground">4.9★</div>
              from 12,400+ reviews
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative aspect-square max-w-lg mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-glow blur-3xl" />
          <motion.img
            src={heroBottle} alt="PeakLife signature supplement bottle"
            width={1024} height={1024}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full object-cover rounded-3xl shadow-card"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
            className="absolute -left-4 md:-left-10 top-12 glass rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-card"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="text-sm">
              <div className="font-medium">AI-matched</div>
              <div className="text-muted-foreground text-xs">96% biomarker fit</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
            className="absolute -right-2 md:-right-6 bottom-16 glass rounded-2xl p-4 shadow-card"
          >
            <div className="text-xs text-muted-foreground">Daily dose</div>
            <div className="font-display text-2xl font-bold">2 caps · AM</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
