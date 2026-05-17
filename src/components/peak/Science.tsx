import { motion } from "framer-motion";
import { FlaskConical, Microscope, ShieldCheck, Activity } from "lucide-react";
import ingredients from "@/assets/ingredients-bg.jpg";

const items = [
  { icon: FlaskConical, title: "Clinical doses", text: "Every ingredient meets the dose used in peer-reviewed studies." },
  { icon: Microscope, title: "Third-party tested", text: "Each batch validated by independent ISO-17025 labs." },
  { icon: ShieldCheck, title: "No fillers", text: "No silica, magnesium stearate, or proprietary blends. Ever." },
  { icon: Activity, title: "Bioavailable forms", text: "Methylated B-vitamins, chelated minerals, liposomal delivery." },
];

export function Science() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={ingredients} alt="" loading="lazy" width={1600} height={1000} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-primary mb-3 font-medium">Science-first formulation</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Built on evidence. Not influencer marketing.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[20px] p-6 hover:border-primary/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
