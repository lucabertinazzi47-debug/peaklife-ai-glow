import { ArrowRight } from "lucide-react";
export function Newsletter() {
  return (
    <section className="px-6 pb-24 md:pb-36">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[36px] bg-gradient-primary p-10 md:p-20 text-primary-foreground glow-primary">
        <div className="absolute inset-0 noise opacity-40" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
              The Briefing.
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-md">
              Weekly research notes from our science team. New studies, ingredient deep-dives, no fluff.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 glass rounded-full p-2 bg-black/20 border-white/20">
            <input
              type="email" placeholder="you@peak.life"
              className="flex-1 bg-transparent px-4 outline-none placeholder:text-white/60"
            />
            <button className="h-12 px-6 rounded-full bg-foreground text-background font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
