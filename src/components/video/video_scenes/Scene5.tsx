import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 4000),
      setTimeout(() => setPhase(4), 7000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black"
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
       <div className="z-10 text-center">
         <motion.div
           className="w-[15vw] h-[15vw] mx-auto mb-8 relative"
           initial={{ scale: 0, rotate: 180 }}
           animate={phase >= 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
           transition={{ type: 'spring', stiffness: 100, damping: 20 }}
         >
           <div className="absolute inset-0 border-4 border-white rounded-full" />
           <div className="absolute inset-4 border-4 border-[var(--color-primary)] rounded-full" />
           <div className="absolute inset-8 bg-[var(--color-accent)] rounded-full" />
         </motion.div>

         <motion.h2
           className="text-[6vw] font-display font-bold text-white uppercase tracking-widest"
           initial={{ opacity: 0, y: 20 }}
           animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
           transition={{ duration: 1 }}
         >
           Nexus Studio
         </motion.h2>

         <motion.div
           className="text-[1.5vw] font-mono text-white/50 tracking-[0.5em] mt-4"
           initial={{ opacity: 0 }}
           animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
           transition={{ duration: 1 }}
         >
           WWW.NEXUS.DESIGN
         </motion.div>
       </div>
    </motion.div>
  );
}