import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DemoContactCard } from "./Marketing";

gsap.registerPlugin(ScrollTrigger);

const CIRCLE_SIZE = 200;

function getCoverScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const diagonal = Math.hypot(vw, vh);
  return (diagonal / CIRCLE_SIZE) * 1.08;
}

function getTextScale() {
  const vw = window.innerWidth;
  if (vw < 640) return 2.8;
  if (vw < 1024) return 3.6;
  return 4.8;
}

export function LetsWorkTransition() {
  const pinRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const circle = circleRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    const staticBlock = staticRef.current;
    if (!pin || !circle || !headline || !cta || !staticBlock) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          reduceMotion: boolean;
        };

        if (!isDesktop || reduceMotion) {
          gsap.set(staticBlock, { display: "block" });
          gsap.set(pin, { display: "none" });
          return;
        }

        gsap.set(staticBlock, { display: "none" });
        gsap.set(pin, { display: "block" });
        gsap.set(cta, { yPercent: 100, opacity: 0 });
        gsap.set(headline, { xPercent: -50, yPercent: -50, left: "50%", top: "50%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "+=280%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          circle,
          { scale: 1 },
          { scale: getCoverScale, ease: "none", duration: 0.62 },
          0,
        );

        tl.fromTo(
          headline,
          { scale: 1, xPercent: -50, yPercent: -50, top: "50%" },
          { scale: getTextScale, ease: "none", duration: 0.62 },
          0,
        );

        tl.to(
          headline,
          {
            top: "22%",
            scale: getTextScale,
            ease: "none",
            duration: 0.18,
          },
          0.62,
        );

        tl.to(
          circle,
          {
            scale: () => getCoverScale() * 0.92,
            y: "-8%",
            ease: "none",
            duration: 0.18,
          },
          0.62,
        );

        tl.fromTo(
          cta,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "none", duration: 0.2 },
          0.72,
        );

        return () => tl.scrollTrigger?.kill();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="contact" className="relative">
      {/* Pinned scroll animation — desktop only */}
      <div
        ref={pinRef}
        className="relative hidden h-screen w-full overflow-hidden bg-background md:block"
      >
        <div
          ref={circleRef}
          className="absolute left-1/2 top-1/2 z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 origin-center rounded-full gradient-ember shadow-ember"
        />

        <h2
          ref={headlineRef}
          className="absolute left-1/2 z-20 whitespace-nowrap font-display text-base font-bold uppercase tracking-[0.24em] text-white sm:text-lg"
        >
          Let&apos;s work
        </h2>

        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-7xl px-4 sm:px-6"
        >
          <DemoContactCard embedded />
        </div>
      </div>

      {/* Static fallback — mobile & reduced motion */}
      <div ref={staticRef} className="bg-background py-20 sm:py-28 md:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full gradient-ember shadow-ember sm:h-32 sm:w-32">
              <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white sm:text-base">
                Let&apos;s work
              </span>
            </div>
          </div>
          <DemoContactCard />
        </div>
      </div>
    </section>
  );
}
