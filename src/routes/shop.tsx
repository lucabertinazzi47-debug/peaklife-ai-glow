import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/peak/Navbar";
import { Footer } from "@/components/peak/Footer";
import { ShopExperience } from "@/components/peak/ShopExperience";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — PeakLife clinical supplement collection" },
      { name: "description", content: "Browse PeakLife's full collection of clinically-dosed supplements. Filter by goal, ingredient, and certification, or let our AI find your perfect stack." },
      { property: "og:title", content: "Shop the PeakLife collection" },
      { property: "og:description", content: "AI-curated, clinically-dosed supplements engineered for peak performance." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ShopExperience />
      <Footer />
    </main>
  );
}