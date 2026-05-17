const logos = ["FORBES", "WIRED", "GQ", "MEN'S HEALTH", "TECHCRUNCH", "VOGUE", "ATHLETIC", "BLOOMBERG"];
export function Marquee() {
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">As featured in</p>
      <div className="flex gap-16 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className="font-display text-2xl font-bold text-muted-foreground/60 tracking-tight">{l}</span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
