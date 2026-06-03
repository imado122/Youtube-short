import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CHEAP = [
  { emoji: '💀', text: 'Breaks on flight 1' },
  { emoji: '😤', text: 'Wheel falls off' },
  { emoji: '💸', text: 'Bought new one anyway' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2000),
      setTimeout(() => setPhase(5), 2600),
      setTimeout(() => setPhase(6), 3800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="2"
      className="absolute inset-0 overflow-hidden flex flex-col bg-black"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Red tint background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(180,20,20,0.15) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Top label */}
      <motion.div
        className="relative z-10 pt-[8vh] pb-[3vh] flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[4vw] font-body tracking-[0.5em] text-white/40 uppercase">The usual story</div>
        <div className="text-[10vw] font-display font-black text-white mt-[1vh] leading-none">Cheap Bag 🛅</div>
        <div className="text-[5vw] font-arabic text-white/50 mt-[1vh]">الحقيبة الرخيصة</div>
      </motion.div>

      {/* Strike-through price */}
      <motion.div
        className="relative z-10 flex justify-center my-[2vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative inline-block">
          <span className="text-[6vw] font-body text-white/30">Paid $20... spent $200 replacing it</span>
          <motion.div
            className="absolute top-1/2 left-0 h-[3px] bg-red-500"
            initial={{ width: 0 }} animate={{ width: phase >= 3 ? '100%' : 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Fail list */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-[8vw] gap-[2.5vh]">
        {CHEAP.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-[4vw] px-[5vw] py-[2.5vh] rounded-[3vw]"
            style={{ background: 'rgba(200,30,30,0.12)', border: '1px solid rgba(200,30,30,0.25)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: phase >= 3 + i ? 1 : 0, x: phase >= 3 + i ? 0 : -50 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[9vw] flex-shrink-0">{item.emoji}</span>
            <span className="text-[5.5vw] font-body font-bold text-white">{item.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Arrow / transition hint */}
      <motion.div
        className="relative z-10 pb-[6vh] flex flex-col items-center gap-[1.5vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[4vw] font-body text-white/40 uppercase tracking-widest">There's a better way...</div>
        <motion.div
          className="text-[8vw]"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        >👇</motion.div>
      </motion.div>
    </motion.div>
  );
}
