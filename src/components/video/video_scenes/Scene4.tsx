import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FEATURES = [
  { emoji: '⚡', title: 'So light,', sub: "you'll forget you packed" },
  { emoji: '🛡️', title: 'So tough,', sub: 'baggage handlers gave up' },
  { emoji: '🎯', title: 'So smooth,', sub: '360° wheels glide anywhere' },
  { emoji: '🔒', title: 'So secure,', sub: 'locked tighter than your secrets 😂' },
];

export function Scene4() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1850),
      setTimeout(() => setPhase(5), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="4"
      className="absolute inset-0 overflow-hidden flex flex-col bg-[#070604]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Subtle texture bg */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)`,
          backgroundSize: 'cover',
        }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 pt-[7vh] pb-[3vh] flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[3.5vw] font-body tracking-[0.6em] text-[#E8C97A]/60 uppercase">Why it wins</div>
        <div className="text-[8vw] font-display font-black text-white leading-none mt-[1vh]">Built Different</div>
        <div className="text-[5vw] font-arabic text-white/40 mt-[0.5vh]">مختلفة تماماً</div>
        <div className="h-[1px] w-[30vw] bg-[#E8C97A]/30 mt-[2vh]" />
      </motion.div>

      {/* Feature cards — staggered slam in */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-[6vw] gap-[2.2vh]">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-[4vw] px-[4vw] py-[2.8vh] rounded-[3vw]"
            style={{
              background: 'linear-gradient(90deg, rgba(232,201,122,0.08) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(232,201,122,0.18)',
            }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.95 }}
            animate={{
              opacity: phase >= 2 + i ? 1 : 0,
              x: phase >= 2 + i ? 0 : (i % 2 === 0 ? -60 : 60),
              scale: phase >= 2 + i ? 1 : 0.95,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10vw] flex-shrink-0">{f.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[5.5vw] font-display font-bold text-[#E8C97A] leading-tight">{f.title}</span>
              <span className="text-[4.2vw] font-body text-white/70 leading-snug">{f.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom website pill */}
      <motion.div
        className="relative z-10 pb-[5vh] flex justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[2.8vw] font-body tracking-[0.2em] text-[#E8C97A]/50 uppercase">
          alnasme.shamsaver1.workers.dev
        </span>
      </motion.div>
    </motion.div>
  );
}
