import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We map your processes, data and goals to design the ideal architecture.",
  },
  {
    num: "02",
    title: "Configure",
    desc: "Prebuilt industry templates get tailored to your exact operations.",
  },
  {
    num: "03",
    title: "Migrate",
    desc: "Secure, validated data migration with zero-downtime cutover planning.",
  }
];

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });

  // The first segment draws from 0 to 0.45 of scroll
  // The second segment draws from 0.45 to 0.9 of scroll
  const path1Length = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);
  
  // Opacity for the cards
  const opacity1 = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <div className="relative z-10 w-full py-16 sm:py-24 flex flex-col items-center">
      <div className="text-center max-w-2xl px-4 mb-20">
        <p className="text-lg md:text-xl font-medium text-foreground/70 tracking-tight">
          A proven, low-risk methodology that gets you live fast and keeps you optimizing — <span className="text-foreground">follow the line.</span>
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[640px] hidden md:block"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 800 640" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path 1: Card 1 Right (320, 100) to Card 2 Top (640, 220) */}
          <motion.path
            d="M 320 100 C 450 100, 640 120, 640 220"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: path1Length }}
          />
          {/* Path 2: Card 2 Left (480, 320) to Card 3 Top (160, 440) */}
          <motion.path
            d="M 480 320 C 350 320, 160 340, 160 440"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: path2Length }}
          />
        </svg>

        {/* Card 1 */}
        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute top-0 left-0 w-[320px] min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] right-0 -mr-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          
          <h3 className="text-2xl font-bold text-white mb-1">01</h3>
          <h4 className="text-lg font-bold text-white mb-3">Discover</h4>
          <p className="text-sm text-zinc-300/80 leading-relaxed">
            We map your processes, data and goals to design the ideal architecture.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          style={{ opacity: opacity2 }}
          className="absolute top-[220px] right-0 w-[320px] min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] left-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          
          <h3 className="text-2xl font-bold text-white mb-1">02</h3>
          <h4 className="text-lg font-bold text-white mb-3">Configure</h4>
          <p className="text-sm text-zinc-300/80 leading-relaxed">
            Prebuilt industry templates get tailored to your exact operations.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          style={{ opacity: opacity3 }}
          className="absolute top-[440px] left-0 w-[320px] min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          
          <h3 className="text-2xl font-bold text-white mb-1">03</h3>
          <h4 className="text-lg font-bold text-white mb-3">Migrate</h4>
          <p className="text-sm text-zinc-300/80 leading-relaxed">
            Secure, validated data migration with zero-downtime cutover planning.
          </p>
        </motion.div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-8 px-4 w-full max-w-sm">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl relative"
          >
            <div className="absolute left-8 top-0 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
            {i !== 0 && (
              <div className="absolute left-[37px] -top-8 h-8 w-0.5 bg-blue-600/30" />
            )}
            <h3 className="text-2xl font-bold text-white mb-1">{step.num}</h3>
            <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
            <p className="text-sm text-zinc-300/80 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
