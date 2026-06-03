import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FEATURES = [
  { icon: '⚡', en: 'ULTRA-LIGHT', ar: 'وزن خفيف جداً', desc: 'Silicon shell — half the weight of standard luggage' },
  { icon: '🛡️', en: 'UNBREAKABLE', ar: 'لا تُكسر أبداً', desc: 'Survives every conveyor belt & airport handler' },
  { icon: '✈️', en: 'TSA APPROVED', ar: 'معتمدة دولياً', desc: '360° spinner wheels · smooth on any surface' },
  { icon: '🔒', en: 'SECURE LOCK', ar: 'قفل آمن مدمج', desc: 'Built-in combination lock · peace of mind' },
];

export function Scene4() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1900),
      setTimeout(() => setPhase(5), 2500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="4"
      className="absolute inset-0 overflow-hidden flex flex-col bg-[#0A0A0A]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Faded luggage bg */}
      <motion.div
        className="absolute right-0 bottom-0 w-[50vw] h-[50vh] opacity-8"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/luggage-hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          opacity: 0.08,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      {/* Header */}
      <motion.div
        className="z-10 flex flex-col items-center pt-[7vh] pb-[3vh]"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-[3.5vw] font-body tracking-[0.5em] text-[#E8C97A]/60 uppercase">What sets us apart</div>
        <div className="text-[4.5vw] font-arabic text-white/40 mt-[0.5vh]">ما يميزنا</div>
        <div className="h-[1px] w-[20vw] bg-[#E8C97A]/30 mt-[2vh]" />
      </motion.div>

      {/* Feature list */}
      <div className="z-10 flex-1 flex flex-col justify-center px-[6vw] gap-[2vh]">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-[4vw] px-[4vw] py-[2.5vh] rounded-[2.5vw]"
            style={{
              background: 'linear-gradient(90deg, rgba(232,201,122,0.07) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(232,201,122,0.15)',
            }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: phase >= 2 + i ? 1 : 0, x: phase >= 2 + i ? 0 : (i % 2 === 0 ? -40 : 40) }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Shimmer on mount */}
            <div className="text-[8vw] flex-shrink-0">{f.icon}</div>
            <div className="flex flex-col flex-1">
              <div className="text-[5vw] font-display font-bold text-[#E8C97A] leading-tight tracking-wide">{f.en}</div>
              <div className="text-[3.8vw] font-arabic text-white/55 leading-none">{f.ar}</div>
              <div className="text-[2.8vw] font-body font-light text-white/40 leading-snug mt-[0.5vh]">{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Website teaser at bottom */}
      <motion.div
        className="z-10 flex justify-center pb-[5vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }}
        transition={{ duration: 0.8 }}>
        <span className="text-[2.8vw] font-body tracking-[0.25em] text-[#E8C97A]/50 uppercase">
          alnasme.shamsaver1.workers.dev
        </span>
      </motion.div>
    </motion.div>
  );
}
