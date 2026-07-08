import { motion } from "framer-motion";
import { Section, SectionHeader, Counter, Reveal } from "./primitives";
import {
  Shield,
  Zap,
  Globe,
  Brain,
  TrendingUp,
  Layers,
  Bot,
  FileText,
  Search,
  Mic,
  BarChart3,
  Sparkles,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhySkyERP() {
  const stats = [
    { v: 4200, s: "+", l: "Enterprises live" },
    { v: 68, s: "%", l: "Faster close" },
    { v: 42, s: "M", l: "Docs auto-processed / mo" },
    { v: 99.99, s: "%", l: "Platform uptime" },
  ];
  const items = [
    { icon: Brain, title: "AI-native by design", desc: "Copilots embedded in every module — not bolted on." },
    { icon: Shield, title: "Enterprise-grade security", desc: "SOC 2, ISO 27001, GDPR, HIPAA, RLS everywhere." },
    { icon: Globe, title: "Global from day one", desc: "42 languages, 180 currencies, local tax packs." },
    { icon: Zap, title: "Deploys in 4 weeks", desc: "Prebuilt industry blueprints. No 12-month projects." },
    { icon: Layers, title: "One data model", desc: "Finance, ops, HR, and CX on the same source of truth." },
    { icon: TrendingUp, title: "Scales with you", desc: "From 50 to 50,000 users on the same platform." },
  ];
  return (
    <Section id="why">
      <SectionHeader
        eyebrow="Why SkyERP"
        title={<>Built for the enterprise. <span className="text-gradient-brand">Loved by operators.</span></>}
        description="An ERP that finally keeps up with your business — modular, AI-native, and ready for the way modern teams actually work."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-elevated sm:grid-cols-4 sm:p-8">
        {stats.map((s) => (
          <Reveal key={s.l} className="text-center">
            <div className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <Counter value={s.v} suffix={s.s} />
            </div>
            <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
              {s.l}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative rounded-2xl border border-border bg-card p-6 transition hover:border-sky-brand/40"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-sky-brand/10 text-sky-brand transition group-hover:gradient-brand group-hover:text-white">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function AISection() {
  const capabilities = [
    { icon: Bot, title: "AI Chatbot", desc: "Ask, act, automate — in natural language." },
    { icon: FileText, title: "AI Reports", desc: "Generate any report from a prompt." },
    { icon: BarChart3, title: "Predictive Analytics", desc: "Forecast demand, churn & cash." },
    { icon: Search, title: "AI Search", desc: "Unified search across every module." },
    { icon: Mic, title: "Voice Assistant", desc: "Log entries hands-free on the floor." },
    { icon: Workflow, title: "Workflow Automation", desc: "Design agents in a visual studio." },
    { icon: TrendingUp, title: "AI Forecasting", desc: "ML models on your historical data." },
    { icon: Sparkles, title: "Recommendations", desc: "Next best action, per user, per role." },
    { icon: FileText, title: "Document AI + OCR", desc: "Parse invoices, POs, contracts instantly." },
  ];

  return (
    <Section id="ai" className="overflow-hidden gradient-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-sky-brand/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-ember/15 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />

      <div className="relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-brand/30 bg-sky-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-brand">
            <Sparkles className="h-3 w-3" /> SkyAI Copilot
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            An AI copilot for <span className="text-gradient-brand">every workflow.</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/70 sm:text-lg">
            SkyAI reads your data, drafts your work, forecasts what's next, and
            executes with your approval — from AP reconciliation to demand planning.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="gradient-ember shadow-ember h-12 rounded-xl text-white">
              Explore SkyAI <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10">
              See it in action
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">SkyAI · CFO copilot</div>
                <p className="mt-1 text-sm text-white/80">
                  "Q3 gross margin dropped 2.1pp mainly from freight costs on Route 14.
                  I've drafted 3 renegotiation scenarios with your top carriers —
                  <span className="text-sky-brand"> review »</span>"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-sky-brand/40 hover:bg-white/10"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand">
                <c.icon className="h-4 w-4 text-white" />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-white">{c.title}</h4>
              <p className="mt-1 text-xs text-white/60">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
