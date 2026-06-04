import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.sin(i * 127.1 + 1) * 0.5 + 0.5) * 100,
    y: (Math.sin(i * 311.7 + 2) * 0.5 + 0.5) * 100,
    r: (Math.sin(i * 61.3 + 3) * 0.5 + 0.5) * 2 + 0.6,
    d: (Math.sin(i * 17.4 + 4) * 0.5 + 0.5) * 4,
    dur: 2 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 3,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.dur, delay: s.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="1" className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #04040F 0%, #0A0520 50%, #060318 100%)' }}>

      <Starfield />

      {/* Nebula glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute w-[80vw] h-[60vw] rounded-full"
          style={{ top: '5%', left: '10%', background: 'radial-gradient(ellipse, rgba(138,43,226,0.14) 0%, transparent 70%)', filter: 'blur(30px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 2 }} />
        <motion.div className="absolute w-[60vw] h-[50vw] rounded-full"
          style={{ bottom: '10%', right: '0%', background: 'radial-gradient(ellipse, rgba(0,100,220,0.12) 0%, transparent 70%)', filter: 'blur(25px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 2, delay: 0.5 }} />
      </div>

      {/* Shooting star */}
      {phase >= 2 && (
        <motion.div className="absolute h-[1.5px] rounded-full"
          style={{ width: '30vw', background: 'linear-gradient(90deg, transparent, white, rgba(232,201,122,0.8))', top: '20%', left: '-30vw', rotate: -25 }}
          animate={{ x: ['0vw', '160vw'] }}
          transition={{ duration: 0.9, ease: 'easeIn' }} />
      )}

      <div className="relative z-10 flex flex-col items-center text-center px-[7vw] gap-[3vh]">

        {/* Rocket launch */}
        <motion.div className="text-[20vw] leading-none"
          initial={{ y: '10vh', opacity: 0 }}
          animate={{ y: phase >= 1 ? 0 : '10vh', opacity: phase >= 1 ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
          🔭
        </motion.div>

        {/* Arabic hook */}
        <div className="overflow-hidden w-full">
          <motion.div className="text-[8.5vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            ناسا تبحث عن أقوى مادة في الكون
          </motion.div>
        </div>

        {/* English */}
        <motion.div className="text-[4.8vw] font-body font-semibold text-white/40 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          NASA is searching for the strongest material in the universe...
        </motion.div>

        {/* Gold punchline divider */}
        <motion.div className="w-[55vw] h-[1.5px]"
          style={{ background: 'linear-gradient(90deg, transparent, #E8C97A, transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.8 }} />

        {/* Punchline */}
        <motion.div
          className="text-[7.5vw] font-arabic font-black text-[#E8C97A] text-center leading-tight"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.85 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          النسمة سبقتهم بـ٤٠ سنة 😂
        </motion.div>
        <motion.div className="text-[4vw] font-body text-white/40 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          Al Nasme beat them by 40 years 😂
        </motion.div>
      </div>
    </div>
  );
}
