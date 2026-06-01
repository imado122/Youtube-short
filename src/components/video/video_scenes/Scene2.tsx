import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4500),
      setTimeout(() => setPhase(5), 6500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: '-10%' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/damascus-bg.png`}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
          initial={{ scale: 1.1, x: '5%' }}
          animate={{
            scale: phase >= 5 ? 1.2 : 1,
            x: phase >= 5 ? '-5%' : '0%'
          }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/80 to-transparent w-[70%]" />
      </div>

      <div className="absolute left-[10vw] top-[20vh] z-10 flex flex-col items-start text-left max-w-[50vw]">
        <motion.div
          className="h-[1px] bg-[var(--color-primary)] mb-6"
          initial={{ width: 0 }}
          animate={{ width: phase >= 1 ? '10vw' : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        
        <div className="overflow-hidden">
          <motion.h2 
            className="text-[8vw] font-display font-bold text-[var(--color-primary)] leading-tight"
            initial={{ y: '100%', rotate: 5 }}
            animate={{ y: phase >= 2 ? '0%' : '100%', rotate: phase >= 2 ? 0 : 5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Since 1985
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mt-6">
          <motion.p 
            className="text-[2.5vw] font-body font-light text-[var(--color-text-primary)]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: phase >= 3 ? '0%' : '100%', opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            40 years of Syrian craft
          </motion.p>
        </div>
        
        <div className="overflow-hidden mt-2">
          <motion.p 
            className="text-[3vw] font-arabic text-[var(--color-text-muted)]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: phase >= 4 ? '0%' : '100%', opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            ٤٠ عاماً من الحرفية السورية
          </motion.p>
        </div>
      </div>

      <motion.img
        src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
        className="absolute right-[5vw] top-[10vh] h-[80vh] w-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-20"
        initial={{ opacity: 0, x: '20vw', rotateY: -30 }}
        animate={{ 
          opacity: phase >= 2 ? 1 : 0, 
          x: phase >= 2 ? 0 : '20vw',
          rotateY: phase >= 2 ? 0 : -30,
          y: phase >= 5 ? '-5vh' : '0vh'
        }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 50, damping: 20 }}
      />
    </motion.div>
  );
}