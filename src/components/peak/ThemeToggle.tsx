import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle theme"
      className="relative h-9 w-16 rounded-full glass flex items-center px-1 transition-colors"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="h-7 w-7 rounded-full bg-gradient-primary glow-primary flex items-center justify-center text-primary-foreground"
        style={{ marginLeft: light ? "auto" : 0 }}
      >
        {light ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </motion.div>
    </button>
  );
}
