import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

function CountUp({ to, dur = 1.5 }: { to: number; dur?: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, v => Math.round(v).toString());
  useEffect(() => { const c = animate(mv, to, { duration: dur, ease: 'easeOut' }); return c.stop; }, [to, dur, mv]);
  return <motion.span>{display}</motion.span>;
}

const STATS = [
  { num: 40, suf: '+', label: 'Years', ar: 'سنة' },
  { num: 1000, suf: '+', label: 'Customers', ar: 'عميل' },
  { num: 100, suf: '%', label: 'Guaranteed', ar: 'ضمان' },
  { num: 4, suf: '', label: 'Countries', ar: 'دول' },
];

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => setPhase(5), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="3"
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-between py-[6vh] px-[8vw]"
      style={{ background: 'linear-gradient(160deg, #0A0A0A 0%, #100B00 100%)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div key={i}
          className="absolute h-[1px] bg-[#E8C97A]/06 w-[120%]"
          style={{ top: `${20 + i*22}%`, transform: 'rotate(-6deg)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5, delay: i * 0.1 }} />
      ))}

      {/* Top label */}
      <motion.div className="z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-[3.5vw] font-body tracking-[0.5em] text-[#E8C97A]/60 uppercase">Why trust us?</div>
        <div className="text-[4vw] font-arabic text-white/40 mt-[0.5vh]">لماذا النسمة؟</div>
      </motion.div>

      {/* Big 40 years */}
      <motion.div className="z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.7 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-end gap-[2vw]">
          <span
            className="font-display font-black text-[#E8C97A] leading-none"
            style={{ fontSize: '35vw' }}
          >
            {phase >= 2 ? <CountUp to={40} dur={1.5} /> : '0'}
          </span>
        </div>
        <div className="text-[8vw] font-display font-bold text-white leading-none tracking-[0.2em] uppercase -mt-[2vh]">
          YEARS
        </div>
        <motion.div
          className="text-[4vw] font-arabic text-white/50 mt-[1.5vh]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.7 }}>
          من الحرفية السورية الفاخرة
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="z-10 h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A]/50 to-transparent w-full"
        initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.9 }} />

      {/* Stats grid 2x2 */}
      <div className="z-10 grid grid-cols-2 gap-[3vw] w-full">
        {STATS.map((s, i) => (
          <motion.div key={i}
            className="flex flex-col items-center py-[2vh] rounded-[2vw]"
            style={{ background: 'rgba(232,201,122,0.05)', border: '1px solid rgba(232,201,122,0.12)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}>
            <div className="text-[10vw] font-display font-bold text-[#E8C97A] leading-none">
              {phase >= 4 ? <><CountUp to={s.num} dur={1} />{s.suf}</> : `0${s.suf}`}
            </div>
            <div className="text-[3vw] font-body text-white/50 uppercase tracking-widest mt-[0.5vh]">{s.label}</div>
            <div className="text-[3.5vw] font-arabic text-white/30">{s.ar}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
