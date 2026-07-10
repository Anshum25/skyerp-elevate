import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DemoContactCard } from "./Marketing";

export function LetsWorkTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to animation values
  // 0.0 -> 0.5: Expand circle, move text up
  // 0.5 -> 0.9: Slide up the CTA form
  
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [1, 40]);
  const circleY = useTransform(scrollYProgress, [0, 0.5], ["-50%", "-60%"]);
  
  const headlineTop = useTransform(scrollYProgress, [0, 0.5], ["50%", "20%"]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.5], [1, 3.5]);

  const ctaY = useTransform(scrollYProgress, [0.4, 0.85], [800, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

  return (
    <section id="contact" className="relative">
      {/* Desktop (Sticky Animation) */}
      <div 
        ref={containerRef}
        className="relative hidden md:block h-[300vh] w-full bg-background"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Expanding Circle */}
          <motion.div
            style={{ 
              scale: circleScale, 
              y: circleY,
              x: "-50%" 
            }}
            className="absolute left-1/2 top-1/2 z-10 h-[200px] w-[200px] origin-center rounded-full gradient-ember shadow-ember"
          />

          {/* Headline Text */}
          <motion.h2
            style={{ 
              top: headlineTop, 
              scale: headlineScale, 
              y: "-50%", 
              x: "-50%" 
            }}
            className="absolute left-1/2 z-20 whitespace-nowrap font-display text-base font-bold uppercase tracking-[0.24em] text-white sm:text-lg"
          >
            Let&apos;s work
          </motion.h2>

          {/* Contact Card */}
          <motion.div
            style={{ 
              y: ctaY, 
              opacity: ctaOpacity 
            }}
            className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-7xl px-4 sm:px-6"
          >
            <DemoContactCard embedded />
          </motion.div>
        </div>
      </div>

      {/* Mobile (Static Fallback) */}
      <div className="bg-background py-20 sm:py-28 md:hidden">
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
