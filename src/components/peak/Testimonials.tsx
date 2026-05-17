import { motion } from "framer-motion";

const reviews = [
  { q: "Cleared my afternoon fog within a week. Sleep finally feels restorative.", a: "Maya R.", role: "Founder, Lumen" },
  { q: "The only stack I've stayed on for more than 3 months. Bloodwork doesn't lie.", a: "Dr. Adrian K.", role: "Cardiologist" },
  { q: "Replaced six bottles on my counter with two. Training PRs back-to-back.", a: "Jordan T.", role: "Pro triathlete" },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm text-primary mb-3 font-medium">12,400+ five-star reviews</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
          Operators, athletes, doctors.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-[20px] bg-card border border-border p-7 shadow-card flex flex-col"
          >
            <div className="text-primary text-lg mb-4">★★★★★</div>
            <blockquote className="font-display text-xl leading-snug text-balance flex-1">
              "{r.q}"
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-border text-sm">
              <div className="font-medium">{r.a}</div>
              <div className="text-muted-foreground text-xs">{r.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
