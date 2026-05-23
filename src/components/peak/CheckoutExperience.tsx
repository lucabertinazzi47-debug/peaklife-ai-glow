import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Minus,
  Plus,
  Shield,
  Sparkles,
  Tag,
  Truck,
  User,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CartItem = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  quantity: number;
  subscribe: boolean;
  gradient: string;
  accent: string;
};

const initialCart: CartItem[] = [
  {
    id: "foundation",
    name: "Foundation Daily",
    tagline: "72 micronutrients · phase 1",
    price: 79,
    quantity: 1,
    subscribe: true,
    gradient: "from-[oklch(0.5_0.18_22)] to-[oklch(0.3_0.12_22)]",
    accent: "Foundation",
  },
  {
    id: "deep-sleep",
    name: "Deep Sleep Protocol",
    tagline: "Magnesium · Glycine · Apigenin",
    price: 64,
    quantity: 1,
    subscribe: true,
    gradient: "from-[oklch(0.35_0.12_280)] to-[oklch(0.2_0.08_280)]",
    accent: "Sleep",
  },
  {
    id: "focus",
    name: "Cognitive Focus",
    tagline: "Alpha-GPC · L-Theanine · Lion's Mane",
    price: 72,
    quantity: 2,
    subscribe: false,
    gradient: "from-[oklch(0.55_0.18_55)] to-[oklch(0.35_0.14_55)]",
    accent: "Focus",
  },
];

const steps = ["Contact", "Shipping", "Payment"] as const;
type Step = (typeof steps)[number];

const shippingOptions = [
  { id: "standard", label: "Standard", eta: "3–5 business days", price: 0, badge: "Free" },
  { id: "express", label: "Express", eta: "1–2 business days", price: 12, badge: "Fast" },
  { id: "carbon", label: "Carbon-Neutral Air", eta: "Next day · offset", price: 24, badge: "Eco+" },
] as const;

const paymentMethods = [
  { id: "card", label: "Card", icon: CreditCard, hint: "Visa · Mastercard · Amex" },
  { id: "apple", label: "Apple Pay", icon: Wallet, hint: "Touch / Face ID" },
  { id: "klarna", label: "Klarna", icon: Sparkles, hint: "4 interest-free payments" },
] as const;

export function CheckoutExperience() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [step, setStep] = useState<Step>("Contact");
  const [shipping, setShipping] = useState<string>("standard");
  const [payment, setPayment] = useState<string>("card");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const stepIndex = steps.indexOf(step);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const subDiscount = cart.reduce(
      (sum, i) => (i.subscribe ? sum + i.price * i.quantity * 0.15 : sum),
      0,
    );
    const shippingCost = shippingOptions.find((s) => s.id === shipping)?.price ?? 0;
    const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
    const taxBase = subtotal - subDiscount - promoDiscount;
    const tax = Math.max(0, taxBase) * 0.08;
    const total = Math.max(0, taxBase) + shippingCost + tax;
    return { subtotal, subDiscount, shippingCost, promoDiscount, tax, total };
  }, [cart, shipping, promoApplied]);

  const updateQty = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    );

  const toggleSub = (id: string) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, subscribe: !i.subscribe } : i)));

  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "PEAK10") {
      setPromoApplied(true);
      toast.success("Promo PEAK10 applied — 10% off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const next = () => {
    const i = steps.indexOf(step);
    if (i < steps.length - 1) setStep(steps[i + 1]);
  };
  const back = () => {
    const i = steps.indexOf(step);
    if (i > 0) setStep(steps[i - 1]);
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1400));
    setPlacing(false);
    setPlaced(true);
  };

  if (placed) return <OrderConfirmation total={totals.total} />;

  return (
    <section className="relative pt-28 pb-24 px-4 md:px-8">
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> 256-bit encrypted · PCI-DSS compliant
          </div>
        </div>

        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            Checkout
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Three quick steps. Your stack ships carbon-neutral with a 90-day performance guarantee.
          </p>
        </header>

        <Stepper current={stepIndex} />

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 mt-10">
          {/* Left — form */}
          <div className="glass rounded-3xl p-6 md:p-10 shadow-card">
            <AnimatePresence mode="wait">
              {step === "Contact" && (
                <StepShell key="contact" title="Contact" icon={<Mail className="h-4 w-4" />}>
                  <ContactForm />
                </StepShell>
              )}
              {step === "Shipping" && (
                <StepShell key="shipping" title="Shipping" icon={<Truck className="h-4 w-4" />}>
                  <ShippingForm shipping={shipping} setShipping={setShipping} />
                </StepShell>
              )}
              {step === "Payment" && (
                <StepShell key="payment" title="Payment" icon={<CreditCard className="h-4 w-4" />}>
                  <PaymentForm payment={payment} setPayment={setPayment} />
                </StepShell>
              )}
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between gap-3">
              <button
                onClick={back}
                disabled={stepIndex === 0}
                className="h-11 px-5 rounded-full border border-border text-sm text-foreground hover:bg-accent/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step !== "Payment" ? (
                <button
                  onClick={next}
                  className="h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={placing || cart.length === 0}
                  className="h-11 px-6 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold glow-primary hover:opacity-95 transition-opacity inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {placing ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                      Securing payment…
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Pay ${totals.total.toFixed(2)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right — order summary */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="glass rounded-3xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg font-semibold">Your stack</h2>
                <span className="text-xs text-muted-foreground">
                  {cart.reduce((n, i) => n + i.quantity, 0)} items
                </span>
              </div>

              <ul className="space-y-4">
                {cart.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex gap-3"
                  >
                    <div
                      className={cn(
                        "relative h-16 w-16 rounded-2xl bg-gradient-to-br shrink-0 flex items-center justify-center text-[10px] tracking-widest uppercase text-white/80",
                        item.gradient,
                      )}
                    >
                      {item.accent}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.tagline}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="h-7 w-7 grid place-items-center text-muted-foreground hover:text-foreground"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="h-7 w-7 grid place-items-center text-muted-foreground hover:text-foreground"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSub(item.id)}
                        className={cn(
                          "mt-2 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full border transition-colors",
                          item.subscribe
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Zap className="h-3 w-3" />
                        Subscribe & save 15%
                      </button>
                    </div>
                  </motion.li>
                ))}
                {cart.length === 0 && (
                  <li className="text-sm text-muted-foreground text-center py-8">
                    Your cart is empty.
                  </li>
                )}
              </ul>

              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo code"
                      className="w-full h-10 pl-9 pr-3 rounded-full bg-surface border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="h-10 px-4 rounded-full border border-border text-sm hover:bg-accent/40 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-xs text-primary inline-flex items-center gap-1">
                    <Check className="h-3 w-3" /> PEAK10 active
                  </p>
                )}
              </div>

              <dl className="mt-6 space-y-2 text-sm">
                <Row label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
                {totals.subDiscount > 0 && (
                  <Row
                    label="Subscribe & Save"
                    value={`−$${totals.subDiscount.toFixed(2)}`}
                    accent
                  />
                )}
                {totals.promoDiscount > 0 && (
                  <Row label="Promo" value={`−$${totals.promoDiscount.toFixed(2)}`} accent />
                )}
                <Row
                  label="Shipping"
                  value={totals.shippingCost === 0 ? "Free" : `$${totals.shippingCost.toFixed(2)}`}
                />
                <Row label="Tax (est.)" value={`$${totals.tax.toFixed(2)}`} />
                <div className="pt-3 mt-1 border-t border-border flex items-baseline justify-between">
                  <span className="font-display text-base">Total</span>
                  <span className="font-display text-2xl font-semibold tabular-nums">
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
              <Trust icon={<Shield className="h-3.5 w-3.5" />} label="90-day guarantee" />
              <Trust icon={<Leaf className="h-3.5 w-3.5" />} label="Carbon neutral" />
              <Trust icon={<Lock className="h-3.5 w-3.5" />} label="Encrypted checkout" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3 md:gap-5">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-3 md:gap-5 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "relative h-8 w-8 rounded-full grid place-items-center text-xs font-medium border transition-all",
                  done && "bg-primary border-primary text-primary-foreground",
                  active && "bg-foreground border-foreground text-background glow-primary",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline truncate",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-border relative overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-primary origin-left"
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-4">
        {icon}
        <span>{title}</span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 tracking-tight">
        {stepCopy[title as Step]}
      </h2>
      {children}
    </motion.div>
  );
}

const stepCopy: Record<Step, string> = {
  Contact: "Where should we send your order updates?",
  Shipping: "Where should we deliver your stack?",
  Payment: "Pay securely — encrypted end-to-end.",
};

function ContactForm() {
  return (
    <div className="grid gap-4">
      <Field label="Email" icon={<Mail className="h-4 w-4" />}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@peaklife.com"
          className={inputCls}
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="First name" icon={<User className="h-4 w-4" />}>
          <input autoComplete="given-name" placeholder="Alex" className={inputCls} />
        </Field>
        <Field label="Last name">
          <input autoComplete="family-name" placeholder="Rivera" className={inputCls} />
        </Field>
      </div>
      <label className="flex items-center gap-2 mt-2 text-sm text-muted-foreground select-none cursor-pointer">
        <input type="checkbox" defaultChecked className="accent-[oklch(0.64_0.23_22)]" />
        Email me biomarker tips & subscriber-only drops
      </label>
    </div>
  );
}

function ShippingForm({
  shipping,
  setShipping,
}: {
  shipping: string;
  setShipping: (v: string) => void;
}) {
  return (
    <div className="grid gap-4">
      <Field label="Address" icon={<MapPin className="h-4 w-4" />}>
        <input autoComplete="street-address" placeholder="123 Performance Way" className={inputCls} />
      </Field>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="City">
          <input autoComplete="address-level2" placeholder="San Francisco" className={inputCls} />
        </Field>
        <Field label="State">
          <input autoComplete="address-level1" placeholder="CA" className={inputCls} />
        </Field>
        <Field label="ZIP">
          <input autoComplete="postal-code" placeholder="94110" className={inputCls} />
        </Field>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium mb-3">Delivery speed</p>
        <div className="grid gap-2">
          {shippingOptions.map((opt) => {
            const active = shipping === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setShipping(opt.id)}
                className={cn(
                  "text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4",
                  active
                    ? "border-primary bg-primary/5 glow-primary"
                    : "border-border hover:border-foreground/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full border-2 grid place-items-center",
                      active ? "border-primary" : "border-muted-foreground",
                    )}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {opt.label}{" "}
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-primary">
                        {opt.badge}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.eta}</p>
                  </div>
                </div>
                <span className="text-sm font-medium tabular-nums">
                  {opt.price === 0 ? "Free" : `$${opt.price.toFixed(2)}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PaymentForm({
  payment,
  setPayment,
}: {
  payment: string;
  setPayment: (v: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-3 gap-2">
        {paymentMethods.map((m) => {
          const Icon = m.icon;
          const active = payment === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setPayment(m.id)}
              className={cn(
                "p-3 rounded-2xl border transition-all text-left",
                active
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground/30",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-2", active ? "text-primary" : "text-muted-foreground")} />
              <p className="text-sm font-medium">{m.label}</p>
              <p className="text-[11px] text-muted-foreground hidden sm:block">{m.hint}</p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {payment === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-4"
          >
            <Field label="Card number" icon={<CreditCard className="h-4 w-4" />}>
              <input
                inputMode="numeric"
                placeholder="1234 1234 1234 1234"
                className={inputCls}
                autoComplete="cc-number"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry">
                <input placeholder="MM / YY" className={inputCls} autoComplete="cc-exp" />
              </Field>
              <Field label="CVC">
                <input placeholder="123" className={inputCls} autoComplete="cc-csc" />
              </Field>
            </div>
            <Field label="Name on card">
              <input placeholder="Alex Rivera" className={inputCls} autoComplete="cc-name" />
            </Field>
          </motion.div>
        )}
        {payment === "apple" && (
          <motion.div
            key="apple"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-6 rounded-2xl border border-border text-center text-sm text-muted-foreground"
          >
            You'll authenticate with Apple Pay on the next step.
          </motion.div>
        )}
        {payment === "klarna" && (
          <motion.div
            key="klarna"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-6 rounded-2xl border border-border text-sm text-muted-foreground"
          >
            Split your order into 4 interest-free payments. Klarna will guide you through approval after placing your order.
          </motion.div>
        )}
      </AnimatePresence>

      <label className="flex items-center gap-2 text-sm text-muted-foreground select-none cursor-pointer">
        <input type="checkbox" defaultChecked className="accent-[oklch(0.64_0.23_22)]" />
        Billing address same as shipping
      </label>
    </div>
  );
}

const inputCls =
  "w-full h-11 px-4 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground transition-colors";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5 mb-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("tabular-nums", accent && "text-primary")}>{value}</span>
    </div>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-2xl px-3 py-2.5 flex items-center gap-1.5 justify-center text-center">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function OrderConfirmation({ total }: { total: number }) {
  return (
    <section className="relative min-h-[80vh] pt-32 pb-24 px-4 grid place-items-center">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-10 md:p-14 max-w-xl text-center shadow-card"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
          className="h-16 w-16 rounded-2xl bg-gradient-primary glow-primary grid place-items-center mx-auto mb-6"
        >
          <Check className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Order confirmed</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
          Your stack is in motion.
        </h1>
        <p className="text-muted-foreground mt-4">
          We charged <span className="text-foreground font-medium">${total.toFixed(2)}</span>. A
          receipt is on its way — and your AI coach is already calibrating your day-1 protocol.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="h-11 px-6 rounded-full border border-border text-sm hover:bg-accent/40 transition-colors inline-flex items-center justify-center"
          >
            Back home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}