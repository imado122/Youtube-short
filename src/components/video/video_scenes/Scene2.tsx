import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    x: (Math.sin(i * 127.1 + 1) * 0.5 + 0.5) * 100,
    y: (Math.sin(i * 311.7 + 2) * 0.5 + 0.5) * 100,
    r: (Math.sin(i * 61.3 + 3) * 0.5 + 0.5) * 1.5 + 0.5,
    d: (Math.sin(i * 17.4 + 4) * 0.5 + 0.5) * 3,
    dur: 2 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 2,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.dur, delay: s.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

const LEFT = [
  { e: '💀', t: 'تكسر بأول رحلة' },
  { e: '😤', t: 'تبكي في المطار' },
  { e: '💸', t: 'تشتري ثانية' },
];
const RIGHT = [
  { e: '✅', t: 'تدوم ٤٠ سنة' },
  { e: '😎', t: 'تمشي بفخر' },
  { e: '🏆', t: 'مرة واحدة للأبد' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1700),
      setTimeout(() => setPhase(5), 2200),
      setTimeout(() => setPhase(6), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="2" className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #04040F 0%, #080318 100%)' }}>

      <Starfield />

      {/* Purple glow left, blue right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[50vw] h-[80vw] rounded-full"
          style={{ top: '20%', left: '-10%', background: 'radial-gradient(ellipse, rgba(180,30,30,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div className="absolute w-[50vw] h-[80vw] rounded-full"
          style={{ top: '20%', right: '-10%', background: 'radial-gradient(ellipse, rgba(0,180,100,0.10) 0%, transparent 70%)', filter: 'blur(20px)' }} />
      </div>

      {/* Header */}
      <motion.div className="relative z-10 pt-[7vh] flex flex-col items-center gap-[0.8vh]"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-[4vw] font-body tracking-[0.4em] text-white/30 uppercase">The universe of luggage</div>
        <div className="text-[8vw] font-arabic font-black text-white leading-none">مقارنة كونية 🌌</div>
      </motion.div>

      {/* VS comparison */}
      <div className="relative z-10 flex-1 flex gap-[3vw] px-[4vw] mt-[3vh] pb-[4vh]">

        {/* LEFT — bad */}
        <motion.div className="flex-1 flex flex-col gap-[2vh] rounded-[3vw] px-[3vw] py-[3vh]"
          style={{ background: 'rgba(200,30,30,0.08)', border: '1px solid rgba(200,30,30,0.25)' }}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: phase >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.55 }}>
          <div className="text-[5vw] font-arabic font-bold text-red-400 text-center">حقيبة عادية ❌</div>
          <div className="text-[3vw] font-body text-white/30 text-center">Ordinary bag</div>
          <div className="w-full h-[1px] bg-red-500/20" />
          {LEFT.map((item, i) => (
            <motion.div key={i} className="flex items-center gap-[2vw]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: phase >= 3 + i ? 1 : 0, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}>
              <span className="text-[7vw]">{item.e}</span>
              <span className="text-[4vw] font-arabic text-white/70 leading-tight">{item.t}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* VS badge */}
        <div className="flex items-center justify-center">
          <motion.div className="text-[5vw] font-black text-[#E8C97A] font-body"
            initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}>VS</motion.div>
        </div>

        {/* RIGHT — Al Nasme */}
        <motion.div className="flex-1 flex flex-col gap-[2vh] rounded-[3vw] px-[3vw] py-[3vh]"
          style={{ background: 'rgba(232,201,122,0.08)', border: '1px solid rgba(232,201,122,0.30)' }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: phase >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.55 }}>
          <div className="text-[5vw] font-arabic font-bold text-[#E8C97A] text-center">النسمة ✅</div>
          <div className="text-[3vw] font-body text-white/30 text-center">Al Nasme</div>
          <div className="w-full h-[1px] bg-yellow-400/20" />
          {RIGHT.map((item, i) => (
            <motion.div key={i} className="flex items-center gap-[2vw]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: phase >= 3 + i ? 1 : 0, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}>
              <span className="text-[7vw]">{item.e}</span>
              <span className="text-[4vw] font-arabic text-white/80 leading-tight">{item.t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Punchline */}
      <motion.div className="relative z-10 pb-[5vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}>
        <div className="text-[6vw] font-arabic text-[#E8C97A] font-bold">الاختيار واضح 🚀</div>
        <div className="text-[4vw] font-body text-white/30">The choice is clear</div>
      </motion.div>
    </div>
  );
}
