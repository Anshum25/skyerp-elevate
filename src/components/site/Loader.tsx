import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center gradient-navy"
          aria-hidden={done}
          role="status"
          aria-label="Loading SkyERP"
        >
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-sky-brand/60"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_40px_rgba(56,189,248,0.5)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <defs>
                <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.14 235)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.17 250)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M20 65 Q20 35 50 35 Q80 35 80 60 M35 65 L65 65 M50 65 L50 85"
                fill="none"
                stroke="url(#lg)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="220"
                strokeDashoffset="220"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="22"
                r="4"
                fill="oklch(0.72 0.18 45)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              />
            </motion.svg>

            <div className="flex flex-col items-center gap-3">
              <div className="font-display text-2xl font-bold tracking-tight text-white">
                Sky<span className="text-gradient-brand">ERP</span>
              </div>
              <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full gradient-brand"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs font-medium tabular-nums text-white/60">
                {progress}% • initializing intelligence
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
