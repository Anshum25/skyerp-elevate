import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We map your processes, data and goals to design the ideal architecture.",
    longDesc: "During the discovery phase, our domain experts conduct deep-dive workshops with your key stakeholders. We meticulously analyze your existing workflows, identify bottlenecks, and map out a comprehensive, future-proof blueprint tailored specifically to your organizational objectives and growth trajectory.",
  },
  {
    num: "02",
    title: "Configure",
    desc: "Prebuilt industry templates get tailored to your exact operations.",
    longDesc: "Rather than starting from scratch, we leverage industry-specific templates as a foundation. Our team then configures data models, user roles, and UI layouts to perfectly match your proprietary operational requirements, ensuring a bespoke fit without the custom-build timeline.",
  },
  {
    num: "03",
    title: "Migrate",
    desc: "Secure, validated data migration with zero-downtime cutover planning.",
    longDesc: "Data integrity is critical. We employ automated ETL (Extract, Transform, Load) pipelines to cleanse, validate, and securely migrate your legacy data into the new architecture. Our robust cutover planning guarantees minimal disruption and zero downtime for your active operations.",
  },
  {
    num: "04",
    title: "Integrate",
    desc: "Seamlessly connect your existing tools and third-party applications.",
    longDesc: "No system operates in a vacuum. We establish secure, real-time API connections with your existing tech stack—including CRMs, payment gateways, and specialized enterprise tools—creating a unified ecosystem where data flows synchronously across all platforms.",
  },
  {
    num: "05",
    title: "Deploy",
    desc: "Phased rollout with comprehensive training and hypercare support.",
    longDesc: "We ensure user adoption through targeted, role-based training programs and intuitive documentation. Following the initial launch, our dedicated hypercare team provides immediate, round-the-clock support to quickly resolve any friction points and ensure a smooth operational transition.",
  }
];

interface MethodologyCardProps extends HTMLMotionProps<"div"> {
  step: typeof steps[0];
  align?: "left" | "right";
}

function MethodologyCard({ 
  step, 
  align = "left",
  className, 
  children,
  ...props
}: MethodologyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        className, 
        "cursor-pointer group transition-colors duration-300 hover:bg-[#2f2723]/95 dark:hover:bg-[#221c19]/95 hover:border-blue-500/30 flex",
        align === "left" ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse",
        isHovered ? "md:w-[608px]" : "w-full md:w-[320px]",
        "gap-8"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
      {...props}
    >
      {children}
      <motion.div layout="position" className="relative z-10 w-full md:w-[256px] shrink-0">
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{step.num}</h3>
        <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
        <p className="text-sm text-zinc-300/80 leading-relaxed">
          {step.desc}
        </p>
      </motion.div>
      
      {isHovered && (
        <motion.div
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={cn(
            "relative z-10 flex-1 flex items-center border-white/10 pt-4 md:pt-0 border-t",
            align === "left" ? "md:border-t-0 md:border-l md:pl-6" : "md:border-t-0 md:border-r md:pr-6"
          )}
        >
          <p className="text-sm text-zinc-400 leading-relaxed">
            {step.longDesc}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });

  const path1Length = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const path3Length = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const path4Length = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  
  // Opacity for the cards
  const opacity1 = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <div className="relative z-10 w-full py-16 sm:py-24 flex flex-col items-center">
      <div className="text-center max-w-2xl px-4 mb-20">
        <p className="text-lg md:text-xl font-medium text-foreground/70 tracking-tight">
          A proven, low-risk methodology that gets you live fast and keeps you optimizing — <span className="text-foreground">follow the line.</span>
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[1080px] hidden md:block"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 800 1080" 
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
          {/* Path 3: Card 3 Right (320, 540) to Card 4 Top (640, 660) */}
          <motion.path
            d="M 320 540 C 450 540, 640 560, 640 660"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: path3Length }}
          />
          {/* Path 4: Card 4 Left (480, 760) to Card 5 Top (160, 880) */}
          <motion.path
            d="M 480 760 C 350 760, 160 780, 160 880"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: path4Length }}
          />
        </svg>

        {/* Card 1 */}
        <MethodologyCard 
          step={steps[0]}
          align="left"
          style={{ opacity: opacity1 }}
          className="absolute top-0 left-0 min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-[160px] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] left-[320px] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
        </MethodologyCard>

        {/* Card 2 */}
        <MethodologyCard 
          step={steps[1]}
          align="right"
          style={{ opacity: opacity2 }}
          className="absolute top-[220px] right-0 min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-[160px] -mr-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] right-[320px] -mr-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
        </MethodologyCard>

        {/* Card 3 */}
        <MethodologyCard 
          step={steps[2]}
          align="left"
          style={{ opacity: opacity3 }}
          className="absolute top-[440px] left-0 min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-[160px] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] left-[320px] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
        </MethodologyCard>

        {/* Card 4 */}
        <MethodologyCard 
          step={steps[3]}
          align="right"
          style={{ opacity: opacity4 }}
          className="absolute top-[660px] right-0 min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-[160px] -mr-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
          <div className="absolute top-[100px] right-[320px] -mr-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
        </MethodologyCard>

        {/* Card 5 */}
        <MethodologyCard 
          step={steps[4]}
          align="left"
          style={{ opacity: opacity5 }}
          className="absolute top-[880px] left-0 min-h-[160px] bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-[160px] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
        </MethodologyCard>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-8 px-4 w-full max-w-sm">
        {steps.map((step, i) => (
          <MethodologyCard
            key={i}
            step={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#27211e]/90 dark:bg-[#1a1513]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl relative"
          >
            <div className="absolute left-8 top-0 -mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-background" />
            {i !== 0 && (
              <div className="absolute left-[37px] -top-8 h-8 w-0.5 bg-blue-600/30" />
            )}
          </MethodologyCard>
        ))}
      </div>
    </div>
  );
}
