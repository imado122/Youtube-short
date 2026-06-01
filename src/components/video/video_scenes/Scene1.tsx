import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 6000), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/50"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/hero-shape.png`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-auto object-contain opacity-50 mix-blend-screen"
          animate={{
            rotate: [0, 90],
            scale: phase >= 4 ? 3 : 1,
            opacity: phase >= 4 ? 0 : 0.5
          }}
          transition={{ duration: 20, ease: 'linear' }}
        />
      </div>

      <div className="z-10 text-center uppercase tracking-tighter mix-blend-difference">
        <div className="overflow-hidden">
          <motion.h1 
            className="text-[12vw] font-display font-black leading-none text-white"
            initial={{ y: '100%' }}
            animate={{ y: phase >= 1 ? '0%' : '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Motion
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-[-2vw]">
          <motion.h1 
            className="text-[12vw] font-display font-black leading-none text-outline-primary"
            initial={{ y: '-100%' }}
            animate={{ y: phase >= 2 ? '0%' : '-100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Craft
          </motion.h1>
        </div>
        
        <motion.div
          className="mt-8 text-[1.5vw] font-mono tracking-widest text-[var(--color-secondary)] opacity-80"
          initial={{ opacity: 0, letterSpacing: '1vw' }}
          animate={{ opacity: phase >= 3 ? 0.8 : 0, letterSpacing: phase >= 3 ? '0.2vw' : '1vw' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          STUDIO SHOWREEL 2025
        </motion.div>
      </div>
    </motion.div>
  );
}