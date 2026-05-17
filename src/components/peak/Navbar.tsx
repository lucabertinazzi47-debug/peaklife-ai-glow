import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = ["Shop", "Stack Builder", "Science", "Community", "Journal"];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="glass rounded-full pl-5 pr-2 py-2 flex items-center gap-2 md:gap-6 shadow-card max-w-5xl w-full">
        <a href="/" className="flex items-center gap-2 font-display font-bold tracking-tight text-base md:text-lg">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary glow-primary">
            <span className="absolute inset-0 rounded-lg bg-gradient-primary blur-md opacity-60" />
            <Sparkles className="relative h-4 w-4 text-primary-foreground" />
          </span>
          PeakLife
        </a>
        <ul className="hidden md:flex items-center gap-1 ml-4 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-accent/60 transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button className="h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="ml-1 text-xs opacity-60">2</span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
