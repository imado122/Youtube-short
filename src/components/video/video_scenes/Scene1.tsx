import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 6500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/luggage-hero.png`}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          initial={{ scale: 1.2 }}
          animate={{
            scale: phase >= 4 ? 1.3 : 1,
            opacity: phase >= 4 ? 0 : 0.6
          }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-transparent opacity-80" />
      </div>

      <div className="z-10 text-center flex flex-col items-center justify-center pt-[20vh]">
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
          className="mt-[10vh] flex items-center justify-center gap-4 text-[1.5vw] font-body tracking-[0.3em] text-[var(--color-text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <span>THE BREEZE</span>
          <span className="text-[var(--color-primary)] text-2xl">•</span>
          <span className="font-arabic tracking-normal text-[2vw]">منذ ١٩٨٥</span>
        </motion.div>
      </div>
    </motion.div>
  );
}