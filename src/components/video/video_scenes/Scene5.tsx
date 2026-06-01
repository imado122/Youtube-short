import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 4000),
      setTimeout(() => setPhase(5), 7500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="z-10 text-center flex flex-col items-center justify-center">
        <div className="overflow-hidden">
          <motion.h1 
            className="text-[12vw] font-display font-bold leading-none text-[var(--color-primary)] tracking-wide"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: phase >= 1 ? '0%' : '100%', opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Al Nasme
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-4">
          <motion.h2 
            className="text-[6vw] font-arabic font-normal leading-none text-[var(--color-text-primary)] opacity-90"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: phase >= 2 ? '0%' : '100%', opacity: phase >= 2 ? 0.9 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            النسمة
          </motion.h2>
        </div>

        <motion.div
          className="h-[1px] bg-[var(--color-accent)] w-[40vw] my-10 opacity-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="text-[2.5vw] font-body tracking-[0.2em] text-[var(--color-text-primary)]">
            ORDER ON WHATSAPP
          </div>
          <div className="text-[3vw] font-arabic text-[var(--color-text-muted)]">
            واتساب: ٠٩٨٣٥٤١٨٨٣
          </div>
          <div className="text-[1.5vw] font-body tracking-[0.3em] text-[var(--color-primary)] mt-6 opacity-70">
            ALNASME.COM
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}