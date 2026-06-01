import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 8000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ scale: 2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="z-10 text-center flex flex-col items-center">
        <motion.div
          className="text-[8vw] font-display font-black text-white italic uppercase"
          initial={{ skewX: 20, x: -100, opacity: 0 }}
          animate={phase >= 1 ? { skewX: 0, x: 0, opacity: 1 } : { skewX: 20, x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          High
        </motion.div>
        
        <motion.div
          className="text-[14vw] font-display font-black text-outline-accent italic uppercase leading-none"
          initial={{ skewX: -20, x: 100, opacity: 0 }}
          animate={phase >= 2 ? { skewX: 0, x: 0, opacity: 1 } : { skewX: -20, x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          Voltage
        </motion.div>

        <motion.div
          className="mt-8 bg-white text-black font-mono px-6 py-2 text-[1.5vw] font-bold uppercase tracking-wider"
          initial={{ scaleX: 0 }}
          animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0 }}
        >
          Pushing the Limits
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 border-[4vw] border-[var(--color-primary)] mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? [0, 1, 0, 1, 0.5] : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}