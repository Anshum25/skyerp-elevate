import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Hide loader after 3.5 seconds
    const timer = setTimeout(() => {
      setDone(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-black to-slate-900 overflow-hidden"
          aria-hidden={done}
          role="status"
          aria-label="Loading SkyERP"
        >
          <div className="relative flex flex-col items-center justify-center p-10">
            {/* Background Pulse / Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.15, scale: 1.2 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 bg-blue-500 blur-[80px] rounded-full mix-blend-screen pointer-events-none"
            />

            <div className="relative overflow-hidden">
              {/* Main Logo with Wipe Reveal */}
              <motion.img
                src="/erpnextlogo.png"
                alt="SKY ERP"
                className="relative z-10 w-72 md:w-96 h-auto drop-shadow-xl"
                initial={{
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // Fully hidden to the left
                  filter: "blur(10px) brightness(2)",
                }}
                animate={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Fully revealed
                  filter: "blur(0px) brightness(1)",
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 1, 0.5, 1], // Custom smooth easing
                  delay: 0.2,
                }}
              />

              {/* Shimmer / Light Sweep Effect */}
              <motion.div
                className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-12 z-20 mix-blend-overlay"
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: 1.2, // Starts just as the wipe finishes
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </div>

            {/* Continuous Floating Animation Post-Reveal */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5, // Wait for initial reveal
              }}
            />
          </div>

          {/* Loading Progress indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center mt-12"
          >
            <div className="flex gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
