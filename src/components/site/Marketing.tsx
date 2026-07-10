import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader } from "./primitives";
import { Star, Quote, ChevronDown, Check, ArrowRight, ArrowLeft, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* --- Testimonials --- */
const testimonials = [
  {
    company: "Northwind Industries",
    name: "Aditi Rao",
    role: "CFO",
    quote: "SkyERP cut our monthly close from 12 days to 3. The AI copilot alone paid for itself in a quarter.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Close Time", value: "75% faster" },
      { label: "ROI", value: "< 3 months" }
    ]
  },
  {
    company: "Globex Manufacturing",
    name: "Marcus Chen",
    role: "COO",
    quote: "We replaced three legacy systems with SkyERP and doubled throughput without adding headcount.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Throughput", value: "2x" },
      { label: "Legacy systems replaced", value: "3" }
    ]
  },
  {
    company: "ACME Retail",
    name: "Sara Ibrahim",
    role: "VP Ops",
    quote: "Rolled out to 340 stores in 8 weeks. The mobile experience is unlike any ERP we've used.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Stores", value: "340" },
      { label: "Rollout", value: "8 weeks" }
    ]
  },
  {
    company: "Stark Group",
    name: "David Park",
    role: "CIO",
    quote: "Finally, an ERP that our engineers, finance and shop floor actually enjoy using. The transition was seamless.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "User Adoption", value: "98%" },
      { label: "Uptime", value: "99.99%" }
    ]
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <Section id="testimonials" className="overflow-hidden" container={false}>
      <div className="text-center mx-auto max-w-3xl mb-16 px-4 mt-20 sm:mt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-brand/20 bg-sky-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-brand mb-6">
          <Star className="h-3.5 w-3.5" /> Customer Success
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Real results from <span className="text-gradient-brand">real companies</span>
        </h2>
        <p className="mt-6 text-muted-foreground sm:text-lg max-w-2xl mx-auto">
          Discover how organizations across manufacturing, retail, and technology use SkyERP to transform their operations.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] overflow-hidden h-[600px] lg:h-[750px] flex items-center justify-center mb-20 sm:mb-28">
        {testimonials.map((t, idx) => {
          let diff = idx - currentIndex;
          const len = testimonials.length;
          
          if (diff < -1) diff += len;
          if (diff > 1) diff -= len;
          
          const isCenter = diff === 0;
          const isPrev = diff === -1;
          const isNext = diff === 1;
          const isHidden = Math.abs(diff) > 1;

          return (
            <motion.div
              key={t.name}
              className="absolute w-[95%] lg:w-[1000px] xl:w-[1100px] h-[550px] lg:h-[650px]"
              animate={{
                x: isCenter ? '0%' : isPrev ? '-85%' : isNext ? '85%' : diff < 0 ? '-150%' : '150%',
                scale: isCenter ? 1 : 0.85,
                opacity: isCenter ? 1 : isHidden ? 0 : 0.4,
                zIndex: isCenter ? 10 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => {
                if (isPrev) prev();
                if (isNext) next();
              }}
              style={{ cursor: isCenter ? 'default' : 'pointer' }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-secondary/30 border border-border shadow-elevated grid lg:grid-cols-2">
                {/* Image side */}
                <div className="relative h-64 lg:h-full overflow-hidden">
                  <img 
                      src={t.image} 
                      alt={t.company} 
                      className="absolute inset-0 h-full w-full object-cover" 
                  />
                </div>
                
                {/* Content side */}
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-card/80 backdrop-blur-xl lg:border-l lg:border-border/50">
                  <Quote className="h-10 w-10 lg:h-12 lg:w-12 text-sky-brand/40 mb-6 lg:mb-8 shrink-0" />
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium leading-[1.3] text-foreground mb-8 lg:mb-10">
                    "{t.quote}"
                  </blockquote>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg lg:text-xl text-foreground">{t.name}</div>
                      <div className="text-muted-foreground text-sm lg:text-base mt-1">{t.role}, {t.company}</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 lg:mt-10 lg:pt-8 border-t border-border grid grid-cols-2 gap-6 lg:gap-10">
                    {t.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-3xl md:text-4xl font-display font-bold text-sky-brand mb-1 lg:mb-2">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
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
          ? "rounded-t-[2.5rem] sm:rounded-t-[3rem] rounded-b-none border-t border-border bg-white pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] outline-none ring-0 sm:pb-16 dark:bg-slate-950"
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
