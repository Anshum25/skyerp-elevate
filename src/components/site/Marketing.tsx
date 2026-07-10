import { motion } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader } from "./primitives";
import { Star, Quote, ChevronDown, Check, ArrowRight, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* --- Testimonials --- */
const quotes = [
  { name: "Aditi Rao", role: "CFO, Northwind Industries", quote: "SkyERP cut our monthly close from 12 days to 3. The AI copilot alone paid for itself in a quarter.", stars: 5 },
  { name: "Marcus Chen", role: "COO, Globex Manufacturing", quote: "We replaced three legacy systems with SkyERP and doubled throughput without adding headcount.", stars: 5 },
  { name: "Sara Ibrahim", role: "VP Ops, ACME Retail", quote: "Rolled out to 340 stores in 8 weeks. The mobile experience is unlike any ERP we've used.", stars: 5 },
  { name: "David Park", role: "CIO, Stark Group", quote: "Finally, an ERP that our engineers, finance and shop floor actually enjoy using.", stars: 5 },
];

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow="Loved by leaders"
        title={<>What operators <span className="text-gradient-brand">say about SkyERP.</span></>}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05 }}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-elevated"
          >
            <Quote className="h-6 w-6 text-sky-brand/60" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
              "{q.quote}"
            </blockquote>
            <div className="mt-4 flex items-center gap-1 text-ember">
              {Array.from({ length: q.stars }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <figcaption className="mt-3 border-t border-border pt-3">
              <div className="text-sm font-semibold text-foreground">{q.name}</div>
              <div className="text-xs text-muted-foreground">{q.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* --- ROI Calculator --- */
export function ROICalculator() {
  const [users, setUsers] = useState(120);
  const [rev, setRev] = useState(25);
  const saved = Math.round(users * 850 + rev * 42000);
  const hours = Math.round(users * 6.4);
  const payback = Math.max(2, Math.round(180000 / Math.max(1, saved / 12)));

  return (
    <Section id="roi" className="bg-secondary/40">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-brand/20 bg-sky-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-brand">
            <Calculator className="h-3.5 w-3.5" /> ROI calculator
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            See your first-year <span className="text-gradient-brand">SkyERP savings.</span>
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Tell us about your business — we'll model the productivity gains,
            hours saved and payback window in real time.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground">Employees</Label>
              <div className="mt-1 text-2xl font-bold">{users}</div>
              <input
                type="range" min={20} max={2000} value={users}
                onChange={(e) => setUsers(+e.target.value)}
                className="mt-2 w-full accent-[oklch(0.72_0.14_235)]"
                aria-label="Number of employees"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground">Annual revenue ($M)</Label>
              <div className="mt-1 text-2xl font-bold">${rev}M</div>
              <input
                type="range" min={1} max={500} value={rev}
                onChange={(e) => setRev(+e.target.value)}
                className="mt-2 w-full accent-[oklch(0.72_0.18_45)]"
                aria-label="Annual revenue in millions"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "Annual savings", v: `$${saved.toLocaleString()}`, c: "gradient-brand" },
              { l: "Hours saved / mo", v: `${hours.toLocaleString()}h`, c: "gradient-ember" },
              { l: "Payback", v: `${payback} mo`, c: "bg-mint" },
            ].map((m) => (
              <div key={m.l} className="rounded-xl border border-border bg-background p-4">
                <div className={cn("h-1 w-8 rounded-full", m.c)} />
                <div className="mt-2 text-xs text-muted-foreground">{m.l}</div>
                <div className="mt-0.5 font-display text-lg font-bold">{m.v}</div>
              </div>
            ))}
          </div>

          <Button className="mt-6 h-11 w-full gradient-ember text-white shadow-ember">
            Get a personalized report <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}

/* --- Pricing --- */
const tiers = [
  {
    name: "Starter",
    price: "$29",
    per: "/user / mo",
    tagline: "For growing teams up to 50 users.",
    features: ["Core Finance + CRM + Inventory", "Standard integrations", "8×5 support", "1 TB storage"],
  },
  {
    name: "Business",
    price: "$79",
    per: "/user / mo",
    tagline: "Most popular — for scaling companies.",
    features: ["Everything in Starter", "Manufacturing + HRMS + Projects", "SkyAI Copilot included", "24×7 support", "SSO & audit logs"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "annual",
    tagline: "For global, regulated operations.",
    features: ["All modules + industry packs", "Dedicated success team", "Private cloud / on-prem", "99.99% SLA", "Custom compliance"],
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Simple pricing"
        title={<>Plans that scale <span className="text-gradient-brand">with you.</span></>}
        description="Start with what you need, add modules as you grow. No forced bundles, no punitive contracts."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "relative flex flex-col rounded-3xl border p-6 transition sm:p-8",
              t.highlight
                ? "border-sky-brand/40 bg-card shadow-brand"
                : "border-border bg-card hover:shadow-elevated",
            )}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-ember px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-ember">
                Most popular
              </div>
            )}
            <div className="font-display text-lg font-semibold">{t.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">{t.tagline}</div>
            <div className="mt-6 flex items-baseline gap-1">
              <div className="font-display text-5xl font-bold tracking-tight">{t.price}</div>
              <div className="text-sm text-muted-foreground">{t.per}</div>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className={cn(
                "mt-8 h-11",
                t.highlight ? "gradient-ember text-white shadow-ember" : "",
              )}
              variant={t.highlight ? "default" : "outline"}
            >
              {t.name === "Enterprise" ? "Talk to sales" : "Start free trial"}
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* --- FAQ --- */
const faqs = [
  { q: "How long does implementation take?", a: "Typical mid-market rollouts go live in 4–8 weeks using our industry blueprints. Enterprise rollouts range 3–6 months." },
  { q: "Can SkyERP replace SAP, Oracle or Odoo?", a: "Yes. We provide certified migration paths from SAP ECC/S/4, Oracle NetSuite/EBS, Microsoft Dynamics and Odoo, including historical data." },
  { q: "Where is my data hosted?", a: "SkyERP runs on AWS, Azure and GCP in 14 regions. You choose the region; data never leaves it. Private cloud and on-prem are available on Enterprise." },
  { q: "Is SkyAI trained on our data?", a: "No. Your data is never used to train shared models. SkyAI uses in-context retrieval and per-tenant fine-tunes that live inside your environment." },
  { q: "Do you support offline / edge?", a: "Yes — POS, warehouse and field service modules work fully offline and sync when back online." },
  { q: "What compliance frameworks are covered?", a: "SOC 2 Type II, ISO 27001, GDPR, HIPAA, PCI DSS, and India DPDPA. Industry-specific packs cover GxP, IFRS and local tax." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-secondary/40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-brand/20 bg-sky-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-brand">
            <Sparkles className="h-3.5 w-3.5" /> FAQ
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Can't find what you're looking for?{" "}
            <a href="#contact" className="font-semibold text-sky-brand hover:underline">
              Talk to an expert →
            </a>
          </p>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180 text-sky-brand",
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* --- CTA + Contact --- */
export function DemoContactCard({
  className,
  embedded = false,
}: {
  className?: string;
  embedded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden p-8 sm:p-14",
        embedded
          ? "rounded-t-[2rem] rounded-b-none border-0 bg-card pb-8 shadow-none outline-none ring-0 sm:pb-10 dark:gradient-navy"
          : "rounded-[2rem] border border-border bg-card shadow-elevated dark:border-transparent dark:gradient-navy",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40 dark:opacity-70" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember/20 blur-3xl animate-float-slow" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-brand/20 bg-sky-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-brand dark:border-white/15 dark:bg-white/5 dark:text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-ember" /> Book a live demo
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl dark:text-white">
            Ready to modernize your enterprise{" "}
            <span className="text-gradient-brand">on one platform?</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground sm:text-lg dark:text-white/70">
            See SkyERP tailored to your industry in a 30-minute walkthrough. No
            slides. Real data, real workflows, real answers.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 dark:text-white/70">
            {[
              "Personalized demo",
              "Industry blueprint",
              "ROI + migration plan",
              "Reference customer intro",
            ].map((x) => (
              <li key={x} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-mint" /> {x}
              </li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-2xl border border-border bg-secondary/60 p-6 shadow-sm dark:glass-dark dark:shadow-elevated"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground dark:text-white/70">
                  First name
                </Label>
                <Input
                  required
                  className="mt-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                  placeholder="Jane"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground dark:text-white/70">
                  Last name
                </Label>
                <Input
                  required
                  className="mt-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground dark:text-white/70">
                Work email
              </Label>
              <Input
                required
                type="email"
                className="mt-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                placeholder="jane@company.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground dark:text-white/70">
                  Company
                </Label>
                <Input
                  required
                  className="mt-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                  placeholder="ACME"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground dark:text-white/70">
                  Employees
                </Label>
                <Input
                  className="mt-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                  placeholder="100–500"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-2 h-11 w-full gradient-ember text-white shadow-ember"
            >
              Schedule my demo <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <p className="text-center text-[11px] text-muted-foreground dark:text-white/50">
              By submitting you agree to our privacy policy. No spam, ever.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <Section id="contact" className="overflow-hidden">
      <DemoContactCard />
    </Section>
  );
}
