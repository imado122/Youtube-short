import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    x: (Math.sin(i * 127.1) * 0.5 + 0.5) * 100,
    color: ['#E8C97A','#27AE60','#E74C3C','#3498DB','#F39C12','#ffffff'][i % 6],
    size: 2 + (Math.sin(i * 61.3) * 0.5 + 0.5) * 4,
    delay: (Math.sin(i * 17.4) * 0.5 + 0.5) * 1.5,
    dur: 2 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 2,
    rotate: Math.sin(i * 33.7) * 360,
  })), []);
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pieces.map((p, i) => (
        <motion.div key={i} className="absolute rounded-sm"
          style={{ left: `${p.x}%`, top: '-5%', width: p.size, height: p.size * 0.6, background: p.color }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '120vh', rotate: p.rotate, opacity: [1, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn', repeat: Infinity, repeatDelay: 0.5 }} />
      ))}
    </div>
  );
}

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2700),
      setTimeout(() => setPhase(5), 4200),
      setTimeout(() => setPhase(6), 6000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="3" className="absolute inset-0 overflow-hidden flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #030A05 0%, #050F08 50%, #040810 100%)' }}>

      <Confetti active={phase >= 2} />

      {/* Green success glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 35%, rgba(39,174,96,0.18) 0%, transparent 65%)', filter: 'blur(20px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.2 }} />

      {/* Banner */}
      <motion.div className="relative z-10 pt-[7vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.85 }}
        transition={{ duration: 0.55, type: 'spring' }}>
        <div className="px-[6vw] py-[1.5vh] rounded-full"
          style={{ background: 'rgba(39,174,96,0.15)', border: '1.5px solid rgba(39,174,96,0.50)' }}>
          <span className="text-[5vw] font-arabic font-bold text-green-400">🎓 مبروك البكالوريا!</span>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center mt-[2vh] px-[6vw]">
        <div className="overflow-hidden w-full">
          <motion.div className="text-[9.5vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            بعد كل هالتعب...
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div className="text-[9vw] font-arabic font-black text-[#E8C97A] leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}>
            وقت السفر! ✈️
          </motion.div>
        </div>
      </div>

      {/* Suitcase with graduation cap overlay */}
      <motion.div className="relative z-20 mt-[2vh] flex justify-center"
        initial={{ opacity: 0, y: '6vh', scale: 0.88 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : '6vh', scale: phase >= 3 ? 1 : 0.88 }}
        transition={{ duration: 1, type: 'spring', stiffness: 65 }}>
        <motion.div animate={phase >= 3 ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="relative">
            <img src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
              className="w-[58vw] h-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 25px rgba(39,174,96,0.40))' }} />
            {/* Graduation cap on top */}
            <motion.div className="absolute -top-[8vw] left-1/2 text-[14vw] leading-none"
              style={{ transform: 'translateX(-50%)' }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: phase >= 3 ? 1 : 0, rotate: phase >= 3 ? 0 : -20 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 250 }}>
              🎓
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tag line */}
      <motion.div className="relative z-10 mt-[2.5vh] flex flex-col items-center gap-[1.5vh] px-[6vw]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 15 }}
        transition={{ duration: 0.6 }}>
        <div className="text-center px-[4vw] py-[2vh] rounded-[2.5vw]"
          style={{ background: 'rgba(232,201,122,0.08)', border: '1px solid rgba(232,201,122,0.25)' }}>
          <div className="text-[6vw] font-arabic font-bold text-[#E8C97A]">هدية النجاح المثالية 🧳</div>
          <div className="text-[4vw] font-body text-white/40 mt-[0.5vh]">The perfect graduation gift</div>
        </div>
      </motion.div>

      <motion.div className="relative z-10 mt-[2vh] text-[3.5vw] font-body text-white/20 tracking-widest uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}>
        حقائب النسمة · Syrian craftsmanship since 1985
      </motion.div>
    </div>
  );
}
