import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/peak/Navbar";
import { Hero } from "@/components/peak/Hero";
import { Marquee } from "@/components/peak/Marquee";
import { Products } from "@/components/peak/Products";
import { Science } from "@/components/peak/Science";
import { StackBuilder } from "@/components/peak/StackBuilder";
import { Testimonials } from "@/components/peak/Testimonials";
import { Newsletter } from "@/components/peak/Newsletter";
import { Footer } from "@/components/peak/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeakLife — AI-engineered supplements for peak performance" },
      { name: "description", content: "Clinically-dosed formulas, personalized by AI. Build your stack with PeakLife — the modern wellness platform for operators, athletes, and longevity-minded humans." },
      { property: "og:title", content: "PeakLife — Engineer your peak performance" },
      { property: "og:description", content: "Clinically-dosed supplements, calibrated to your biology by AI." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <Science />
      <StackBuilder />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
