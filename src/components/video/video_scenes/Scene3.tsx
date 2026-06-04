import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    x: (Math.sin(i * 127.1 + 1) * 0.5 + 0.5) * 100,
    y: (Math.sin(i * 311.7 + 2) * 0.5 + 0.5) * 100,
    r: (Math.sin(i * 61.3 + 3) * 0.5 + 0.5) * 2 + 0.5,
    d: (Math.sin(i * 17.4 + 4) * 0.5 + 0.5) * 4,
    dur: 2.5 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 3,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.dur, delay: s.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 3000),
      setTimeout(() => setPhase(5), 4500),
      setTimeout(() => setPhase(6), 6000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="3" className="absolute inset-0 overflow-hidden flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #03030E 0%, #080528 50%, #050315 100%)' }}>

      <Starfield />

      {/* Central nebula glow behind suitcase */}
      <motion.div className="absolute w-[90vw] h-[90vw] rounded-full"
        style={{ top: '15%', left: '5%', background: 'radial-gradient(ellipse, rgba(138,43,226,0.20) 0%, rgba(0,80,200,0.10) 40%, transparent 70%)', filter: 'blur(25px)' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.7 }}
        transition={{ duration: 2 }} />

      {/* Orbit ring */}
      {phase >= 2 && (
        <motion.div className="absolute w-[80vw] h-[80vw] rounded-full"
          style={{ top: '12%', left: '10%', border: '1px solid rgba(232,201,122,0.12)' }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }} />
      )}

      {/* Floating suitcase — the star of the show */}
      <motion.div className="relative z-20 mt-[8vh]"
        initial={{ opacity: 0, y: '8vh', scale: 0.85 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : '8vh', scale: phase >= 2 ? 1 : 0.85 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 60, damping: 14 }}>
        <motion.div
          animate={phase >= 2 ? { y: [0, -12, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
          <img src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
            className="w-[68vw] h-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 35px rgba(138,43,226,0.45)) drop-shadow(0 0 15px rgba(232,201,122,0.25))' }} />
        </motion.div>
      </motion.div>

      {/* Brand */}
      <div className="relative z-10 flex flex-col items-center px-[6vw] gap-[1.8vh] mt-[2vh]">
        <div className="overflow-hidden">
          <motion.div className="text-[14vw] font-display font-black text-[#E8C97A] leading-none text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 3 ? '0%' : '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            النسمة
          </motion.div>
        </div>
        <motion.div className="text-[5vw] font-body text-white/40 tracking-[0.3em] uppercase text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.6 }}>
          Al Nasme · Since 1985
        </motion.div>

        {/* Fun caption */}
        <motion.div className="text-center px-[3vw] py-[1.5vh] rounded-[2vw]"
          style={{ background: 'rgba(232,201,122,0.07)', border: '1px solid rgba(232,201,122,0.20)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.9 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <div className="text-[5.5vw] font-arabic text-white font-bold">مصنوعة على الأرض... تتحمل كل الكواكب 🪐</div>
          <div className="text-[3.5vw] font-body text-white/40 mt-[0.5vh]">Made on Earth. Built for everywhere.</div>
        </motion.div>

        <motion.div className="text-[3.5vw] font-body text-white/20 tracking-widest uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}>
          جودة · جمال · ضمان
        </motion.div>
      </div>
    </div>
  );
}
