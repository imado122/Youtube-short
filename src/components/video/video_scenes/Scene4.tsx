import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 8500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const pillars = [
    { num: "01", text: "CRAFTED IN DAMASCUS" },
    { num: "02", text: "SILICON SHELL" },
    { num: "03", text: "40 YEARS PROVEN" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0, y: '20%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 border-[1px] border-[var(--color-deep)]/30 m-[5vw]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1 : 0.9, opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 border-[1px] border-[var(--color-primary)]/40 m-[6vw]"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1 : 1.1, opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="z-10 w-full px-[10vw] flex flex-col gap-12 relative">
        <motion.div
          className="absolute -top-[15vh] right-[10vw] text-[20vw] font-display font-black text-white/[0.03] leading-none select-none pointer-events-none"
          animate={{ x: phase >= 5 ? '5vw' : '0vw' }}
          transition={{ duration: 8, ease: 'linear' }}
        >
          WHY
        </motion.div>

        {pillars.map((pillar, i) => (
          <div key={pillar.num} className={`flex items-center gap-8 ${i === 1 ? 'ml-[15vw]' : i === 2 ? 'ml-[5vw]' : ''}`}>
            <motion.div
              className="text-[8vw] font-display font-bold text-[var(--color-accent)] leading-none italic"
              initial={{ opacity: 0, x: -50 }}
              animate={phase >= 2 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {pillar.num}
            </motion.div>
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                className="absolute left-0 bottom-0 h-[2px] bg-[var(--color-primary)]/50"
                initial={{ width: 0 }}
                animate={{ width: phase >= 2 + i ? '100%' : 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="text-[4vw] font-body font-light text-[var(--color-text-primary)] tracking-widest pb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={phase >= 2 + i ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {pillar.text}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}