import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4500),
      setTimeout(() => setPhase(5), 5500),
      setTimeout(() => setPhase(6), 8500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/bg-luxury.png`}
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-color-dodge"
          initial={{ scale: 1.2, rotate: -5 }}
          animate={{ scale: phase >= 6 ? 1.3 : 1, rotate: phase >= 6 ? -2 : 0 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)] via-transparent to-[var(--color-bg-dark)] opacity-90" />
      </div>

      <motion.img
        src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
        className="absolute left-[10vw] top-[15vh] h-[70vh] w-auto object-contain drop-shadow-[0_0_50px_rgba(202,138,4,0.15)] z-20"
        initial={{ opacity: 0, y: '20vh', scale: 0.8 }}
        animate={{ 
          opacity: phase >= 1 ? 1 : 0, 
          y: phase >= 1 ? '0vh' : '20vh',
          scale: phase >= 1 ? 1 : 0.8,
          x: phase >= 6 ? '-5vw' : '0vw'
        }}
        transition={{ duration: 2, type: 'spring', stiffness: 50, damping: 20 }}
      />

      <div className="absolute right-[10vw] top-[25vh] z-30 flex flex-col items-start text-left w-[40vw]">
        <div className="overflow-hidden mb-2">
          <motion.h2 
            className="text-[7vw] font-display font-bold text-[var(--color-primary)] leading-none uppercase tracking-wide"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: phase >= 2 ? '0%' : '100%', opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Unbreakable.
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mb-10">
          <motion.p 
            className="text-[2vw] font-body text-[var(--color-text-primary)] opacity-90 tracking-widest uppercase"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: phase >= 2 ? '0%' : '100%', opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Silicon technology <span className="text-[var(--color-accent)]">•</span> Built to last
          </motion.p>
        </div>

        <div className="flex flex-col gap-6 mt-4 w-full">
          {['LIGHTWEIGHT', 'DURABLE', 'ELEGANT'].map((feature, i) => (
            <motion.div
              key={feature}
              className="flex items-center gap-4 bg-gradient-to-r from-[var(--color-bg-light)] to-transparent p-4 border-l-[3px] border-[var(--color-accent)]"
              initial={{ x: '50px', opacity: 0 }}
              animate={phase >= 3 + i ? { x: 0, opacity: 1 } : { x: '50px', opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[1.5vw] font-body font-semibold tracking-widest text-[var(--color-text-primary)]">
                {feature}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}