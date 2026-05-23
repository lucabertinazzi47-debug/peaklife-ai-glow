import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/peak/Navbar";
import { Footer } from "@/components/peak/Footer";
import { CheckoutExperience } from "@/components/peak/CheckoutExperience";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — PeakLife" },
      { name: "description", content: "Secure checkout for your PeakLife stack. Free carbon-neutral shipping, 90-day guarantee, encrypted payments." },
      { property: "og:title", content: "Checkout — PeakLife" },
      { property: "og:description", content: "Secure, encrypted checkout for your personalized PeakLife stack." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CheckoutExperience />
      <Footer />
    </main>
  );
}