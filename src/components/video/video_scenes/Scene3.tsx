import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 8500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center perspective-[1000px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-[var(--color-primary)]/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'bottom' }}
      />
      
      <div className="relative z-10 w-full flex justify-center items-center gap-[5vw]">
         <motion.div
           className="w-[20vw] h-[30vw] bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden"
           initial={{ rotateY: 90, z: -500, opacity: 0 }}
           animate={phase >= 2 ? { rotateY: 0, z: 0, opacity: 1 } : { rotateY: 90, z: -500, opacity: 0 }}
           transition={{ type: 'spring', stiffness: 80, damping: 20 }}
         >
            <div className="text-[3vw] font-mono font-bold text-white">01</div>
         </motion.div>

         <motion.div
           className="w-[20vw] h-[30vw] bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden"
           initial={{ rotateY: 90, z: -500, opacity: 0 }}
           animate={phase >= 2 ? { rotateY: 0, z: 0, opacity: 1, y: -50 } : { rotateY: 90, z: -500, opacity: 0 }}
           transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
         >
            <div className="text-[3vw] font-mono font-bold text-[var(--color-accent)]">02</div>
         </motion.div>

         <motion.div
           className="w-[20vw] h-[30vw] bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden"
           initial={{ rotateY: 90, z: -500, opacity: 0 }}
           animate={phase >= 2 ? { rotateY: 0, z: 0, opacity: 1 } : { rotateY: 90, z: -500, opacity: 0 }}
           transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.4 }}
         >
            <div className="text-[3vw] font-mono font-bold text-[var(--color-primary)]">03</div>
         </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[10vh] w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-[4vw] font-display font-bold uppercase tracking-widest text-white">
          Precision
        </h2>
      </motion.div>
    </motion.div>
  );
}