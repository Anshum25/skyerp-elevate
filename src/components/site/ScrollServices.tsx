import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Database,
  Cpu,
  Plug,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Eyebrow } from "./primitives";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { n: "01", icon: Compass, title: "Discovery & Blueprint", desc: "Map your processes to a prebuilt industry blueprint in days, not months." },
  { n: "02", icon: Database, title: "Data Migration", desc: "Clean, validate, and move years of records with zero downtime." },
  { n: "03", icon: Cpu, title: "Configuration & AI Setup", desc: "Tune workflows, roles, and SkyAI copilots to how your teams actually work." },
  { n: "04", icon: Plug, title: "Integrations", desc: "Connect banks, marketplaces, and 200+ apps through native connectors." },
  { n: "05", icon: Rocket, title: "Go-Live & Adoption", desc: "Phased rollout with hypercare support and role-based training." },
  { n: "06", icon: TrendingUp, title: "Continuous Optimization", desc: "Quarterly reviews and AI-driven recommendations as you scale." },
];

export function ScrollServices() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Below md, we fall back to a plain swipeable carousel — no pin/scrub.
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getDistance = () => {
        if (!track) return 0;
        // With the parent as flex-col, track.scrollWidth is 100% accurate instantly
        // because the browser doesn't try to shrink it as a row flex item.
        return track.scrollWidth - window.innerWidth;
      };

      // Extra vertical scroll room beyond the raw horizontal distance, so the
      const SCROLL_LENGTH_MULTIPLIER = 2;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance() * SCROLL_LENGTH_MULTIPLIER}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
        <Eyebrow>What we deliver</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          From kickoff to go-live,{" "}
          <span className="text-gradient-brand">we run the whole rollout.</span>
        </h2>
      </div>

      <div
        ref={pinRef}
        className="relative md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5vw] pb-6 [scrollbar-width:none] md:snap-none md:overflow-visible md:px-[10vw] lg:px-[12.5vw] xl:px-[15vw] md:pb-0 [&::-webkit-scrollbar]:hidden w-full"
        >
          {services.map((s) => (
            <div
              key={s.n}
              className="group relative flex h-[75vh] w-[90vw] shrink-0 snap-start flex-col justify-between rounded-[2rem] border border-border bg-card p-10 shadow-elevated sm:h-[80vh] sm:p-14 md:h-[70vh] md:w-[80vw] lg:w-[75vw] xl:w-[70vw]"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-sky-brand/10 text-sky-brand transition group-hover:gradient-brand group-hover:text-white sm:h-24 sm:w-24">
                  <s.icon className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
                <div className="font-display text-7xl font-bold leading-none text-sky-brand/15 transition group-hover:text-sky-brand/25 sm:text-8xl lg:text-9xl">
                  {s.n}
                </div>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
