import { Sparkles } from "lucide-react";
const cols = {
  Shop: ["Foundation", "Focus", "Recovery", "Vitality", "Bundles"],
  Company: ["Science", "About", "Journal", "Careers", "Press"],
  Support: ["Help center", "Subscriptions", "Returns", "Contact"],
};
export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="h-7 w-7 rounded-lg bg-gradient-primary glow-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            PeakLife
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Precision supplementation engineered with AI. Made in California. Tested everywhere.
          </p>
        </div>
        {Object.entries(cols).map(([title, items]) => (
          <div key={title}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{title}</div>
            <ul className="space-y-2.5 text-sm">
              {items.map((i) => (
                <li key={i}><a href="#" className="hover:text-primary transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-border flex flex-wrap gap-4 justify-between text-xs text-muted-foreground">
        <span>© 2026 PeakLife Sciences, Inc.</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}
