import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FEATURES = [
  {
    icon: '⚡',
    title: 'ULTRA-LIGHT',
    titleAr: 'وزن خفيف',
    desc: 'Silicon shell tech — half the weight',
    color: '#E8C97A',
  },
  {
    icon: '🛡️',
    title: 'INDESTRUCTIBLE',
    titleAr: 'لا تُكسر',
    desc: 'Built to survive every conveyor belt',
    color: '#E8C97A',
  },
  {
    icon: '✈️',
    title: 'TSA APPROVED',
    titleAr: 'معتمدة دولياً',
    desc: '4 spinner wheels · 360° smooth roll',
    color: '#E8C97A',
  },
  {
    icon: '🔒',
    title: 'SECURE LOCK',
    titleAr: 'قفل آمن',
    desc: 'Combination TSA-approved lock built-in',
    color: '#E8C97A',
  },
];

export function Scene4() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 3200),
      setTimeout(() => setPhase(6), 4200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#0A0A0A]"
      initial={{ opacity: 0, y: '3%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Luggage image faded bg */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[40vw] opacity-15"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/luggage-hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-[50vw] bg-gradient-to-r from-[#0A0A0A] to-transparent" />

      {/* Header */}
      <motion.div
        className="absolute top-[5vh] left-[8vw]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -20 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-[1.6vw] font-body tracking-[0.5em] text-[#E8C97A]/60 uppercase mb-1">What sets us apart</div>
        <div className="text-[2vw] font-arabic text-white/40">ما يميزنا</div>
      </motion.div>

      {/* Feature cards grid */}
      <div className="absolute inset-0 flex items-center px-[8vw] pt-[12vh]">
        <div className="grid grid-cols-2 gap-[2vw] w-full">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-[1vw] p-[2.5vw]"
              style={{
                background: 'linear-gradient(135deg, rgba(232,201,122,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(232,201,122,0.15)',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: phase >= 2 + i * 0.8 ? 1 : 0,
                y: phase >= 2 + i * 0.8 ? 0 : 30,
                scale: phase >= 2 + i * 0.8 ? 1 : 0.95,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hover shimmer */}
              <motion.div
                className="absolute inset-0 opacity-0"
                style={{ background: 'linear-gradient(135deg, rgba(232,201,122,0.08) 0%, transparent 100%)' }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, delay: 2 + i * 0.3, repeat: Infinity, repeatDelay: 3 }}
              />

              <div className="text-[3.5vw] mb-[1vw]">{f.icon}</div>
              <div className="text-[2.8vw] font-display font-bold text-[#E8C97A] leading-none mb-1 tracking-wide">
                {f.title}
              </div>
              <div className="text-[1.8vw] font-arabic text-white/50 mb-[1vw]">{f.titleAr}</div>
              <div className="h-[1px] bg-[#E8C97A]/20 mb-[1vw] w-[60%]" />
              <div className="text-[1.6vw] font-body font-light text-white/60 leading-relaxed">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom website teaser */}
      <motion.div
        className="absolute bottom-[4vh] left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-[1.6vw] font-body tracking-[0.3em] text-[#E8C97A]/50 uppercase">
          alnasme.shamsaver1.workers.dev
        </span>
      </motion.div>
    </motion.div>
  );
}
