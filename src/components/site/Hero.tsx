import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Users,
  ShoppingCart,
  Boxes,
  BarChart3,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const trustLogos = ["ACME Corp", "Northwind", "Globex", "Umbrella", "Initech", "Hooli", "Wayne", "Stark"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const bgX = useTransform(glowX, (v) => `${v}%`);
  const bgY = useTransform(glowY, (v) => `${v}%`);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 gradient-navy"
    >
      {/* Mouse-following glow */}
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(600px circle at ${bgX.get()} ${bgY.get()}, oklch(0.72 0.14 235 / 0.25), transparent 40%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* Static mesh + grid */}
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40 mask-fade-b" />
      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-sky-brand/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-ember/15 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      {/* Particles */}
      <Particles />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full gradient-ember">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
            SkyAI Copilot 3.0 is live — automate 60% of back-office work
            <ArrowRight className="h-3 w-3 opacity-70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            The AI-native ERP <br />
            for{" "}
            <span className="text-gradient-brand animate-gradient-shift">
              modern enterprises
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            SkyERP unifies finance, supply chain, manufacturing, HR and CRM
            on a single cloud platform — powered by AI copilots that turn
            operations into outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="gradient-ember shadow-ember h-12 rounded-xl px-6 text-white hover:opacity-95"
            >
              Schedule a live demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-white backdrop-blur hover:bg-white/10"
            >
              <PlayCircle className="mr-1 h-5 w-5" /> Watch 2-min tour
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60"
          >
            {["SOC 2 Type II", "GDPR ready", "99.99% uptime SLA", "Deploy in 4 weeks"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mint" />
                {t}
              </li>
            ))}
          </motion.ul>

          {/* Trust marquee */}
          <div className="mt-12">
            <div className="text-xs font-medium uppercase tracking-wider text-white/40">
              Trusted by 4,200+ global teams
            </div>
            <div className="mask-fade-x mt-4 overflow-hidden">
              <div className="flex w-max animate-marquee gap-10">
                {[...trustLogos, ...trustLogos].map((l, i) => (
                  <div
                    key={i}
                    className="font-display text-lg font-semibold tracking-tight text-white/40"
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <HeroDashboard />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        y2: Math.random() * 100,
        dur: 8 + Math.random() * 8,
        delay: Math.random() * 4,
      })),
    [],
  );
  if (!mounted) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          initial={{ x: `${d.x1}%`, y: `${d.y1}%`, opacity: 0.2 }}
          animate={{ y: [`${d.y1}%`, `${d.y2}%`], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay }}
        />
      ))}
    </div>
  );
}
        />
      ))}
    </div>
  );
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Main dashboard */}
      <div className="relative rounded-3xl border border-white/10 bg-navy-2/70 p-5 backdrop-blur-xl shadow-elevated">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs font-medium text-white/50">
              SkyERP — Command Center
            </span>
          </div>
          <div className="text-[10px] text-white/40">Live</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Revenue", value: "$8.42M", up: "+18.4%", icon: TrendingUp, color: "from-sky-brand to-sky-brand-2" },
            { label: "Orders", value: "12,847", up: "+9.1%", icon: ShoppingCart, color: "from-ember to-ember-2" },
            { label: "Active Users", value: "3,204", up: "+4.7%", icon: Users, color: "from-mint to-sky-brand" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${k.color}`}>
                  <k.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-mint">{k.up}</span>
              </div>
              <div className="mt-2 text-lg font-bold text-white">{k.value}</div>
              <div className="text-[10px] text-white/50">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Revenue vs Forecast</div>
            <div className="flex gap-2 text-[10px] text-white/50">
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-brand" />Actual</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-ember" />Forecast</span>
            </div>
          </div>
          <Chart />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Boxes className="h-3.5 w-3.5 text-sky-brand" /> Inventory
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                ["SKU-001", 82],
                ["SKU-104", 46],
                ["SKU-220", 91],
              ].map(([s, v]) => (
                <div key={s as string} className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-white/50">{s}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full gradient-brand"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-white/70">{v}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <BarChart3 className="h-3.5 w-3.5 text-ember" /> CRM Pipeline
            </div>
            <div className="mt-3 flex items-end gap-1.5">
              {[40, 65, 48, 82, 55, 90, 72].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                  className="w-full max-w-3 rounded-t bg-gradient-to-t from-ember/40 to-ember"
                  style={{ height: `${h * 0.5}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating KPI card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute -left-6 top-24 hidden rounded-2xl border border-white/15 bg-navy-2/80 p-3 shadow-brand backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-white/50">Cash flow</div>
            <div className="text-sm font-bold text-white">$1.24M ↑</div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI assistant */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -right-4 bottom-16 hidden max-w-[220px] rounded-2xl border border-white/15 bg-navy-2/80 p-3 shadow-ember backdrop-blur-xl md:block"
      >
        <div className="flex items-start gap-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-ember">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-white">SkyAI Copilot</div>
            <div className="mt-1 text-[11px] leading-snug text-white/70">
              Stock for SKU-104 drops below reorder in ~6 days. Draft a PO?
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Chart() {
  const actual = "M0,50 C40,45 60,25 90,30 C120,35 150,10 190,15 C230,20 260,5 300,10";
  const fore = "M0,55 C40,52 60,40 90,42 C120,45 150,28 190,26 C230,24 260,18 300,15";
  return (
    <svg viewBox="0 0 300 70" className="h-24 w-full">
      <defs>
        <linearGradient id="fill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.14 235)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 235)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${actual} L300,70 L0,70 Z`}
        fill="url(#fill1)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />
      <motion.path
        d={actual}
        fill="none"
        stroke="oklch(0.72 0.14 235)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      />
      <motion.path
        d={fore}
        fill="none"
        stroke="oklch(0.72 0.18 45)"
        strokeWidth="2"
        strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.8 }}
      />
    </svg>
  );
}
