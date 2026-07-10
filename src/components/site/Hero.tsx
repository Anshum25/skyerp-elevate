import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Methodology } from "./Methodology";
import { Globe } from "./Globe";

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
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-ember opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background pointer-events-none" />
      </div>

      {/* Interactive globe — bleeds off the right edge, cropped by the section's overflow-hidden */}
      <div className="absolute right-0 top-12 hidden h-[560px] w-[70vw] max-w-[760px] translate-x-1/4 sm:block lg:top-8 lg:h-[820px] lg:max-w-[920px]">
        <Globe />
      </div>

      <div
        className="relative px-4 sm:px-6 w-full"
        style={{ maxWidth: '1650px', margin: '0 auto' }}
      >

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full gradient-ember">
              <Sparkles className="h-2.5 w-2.5 text-foreground" />
            </span>
            SkyAI Copilot 3.0 is live — automate 60% of back-office work
            <ArrowRight className="h-3 w-3 opacity-70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
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
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80"
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
              className="gradient-ember shadow-ember h-12 rounded-xl px-6 text-foreground hover:opacity-95"
            >
              Schedule a live demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-foreground/20 bg-foreground/10 px-6 text-foreground backdrop-blur hover:bg-foreground/10"
            >
              <PlayCircle className="mr-1 h-5 w-5" /> Watch 2-min tour
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80"
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
            <div className="text-xs font-medium uppercase tracking-wider text-foreground/80">
              Trusted by 4,200+ global teams
            </div>
            <div className="mask-fade-x mt-4 overflow-hidden">
              <div className="flex w-max animate-marquee gap-10">
                {[...trustLogos, ...trustLogos].map((l, i) => (
                  <div
                    key={i}
                    className="font-display text-lg font-semibold tracking-tight text-foreground/80"
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/80"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-foreground/20 pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-foreground/10" />
        </motion.div>
      </motion.div>
      <div className="relative mt-24 w-full">
        <Methodology />
      </div>
    </section>
  );
}
