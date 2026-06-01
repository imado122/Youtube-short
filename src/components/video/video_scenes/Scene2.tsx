import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 4000),
      setTimeout(() => setPhase(5), 7000), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const words = ["WE", "BUILD", "WORLDS"];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center px-[10vw]"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full flex flex-col gap-4 z-10">
        {words.map((word, i) => (
          <div key={i} className="overflow-hidden">
            <motion.div
              className={`text-[9vw] font-display font-black uppercase leading-none ${i === 1 ? 'text-[var(--color-accent)]' : 'text-white'}`}
              initial={{ y: '100%', rotateZ: 10, opacity: 0 }}
              animate={phase >= i + 1 ? { y: '0%', rotateZ: 0, opacity: 1 } : { y: '100%', rotateZ: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div 
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border-[1px] border-[var(--color-primary)] rounded-full mix-blend-screen"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: phase >= 4 ? 1 : 0, opacity: phase >= 4 ? 0.4 : 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.div 
          className="absolute inset-0 border-[2px] border-[var(--color-accent)] rounded-full border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
}