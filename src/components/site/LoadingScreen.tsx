import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-black to-slate-900 overflow-hidden">
      
      {/* Logo Container with Float Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Neon blue ambient glow behind the logo */}
        <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 rounded-full mix-blend-screen pointer-events-none"></div>

        <motion.img
          src="/erpnextlogo.png" // Update this path to where your logo is stored
          alt="SKY ERP"
          className="relative z-10 w-72 md:w-96 h-auto drop-shadow-2xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Premium Gradient Loading Bar */}
      <div className="mt-14 w-64 md:w-80 h-[2px] bg-gray-800 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(37,99,235,0.4)]">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700"
          initial={{ left: "-100%", width: "50%" }}
          animate={{ left: "100%" }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Futuristic Status Text */}
      <motion.div
        className="mt-6 text-cyan-500/80 font-medium tracking-[0.25em] text-xs uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Initializing Architecture...
      </motion.div>
      
    </div>
  );
};

export default LoadingScreen;
