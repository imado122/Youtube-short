import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, v => Math.round(v).toString());
  useEffect(() => {
    const ctrl = animate(mv, to, { duration, ease: 'easeOut' });
    return ctrl.stop;
  }, [to, duration, mv]);
  return <motion.span>{display}</motion.span>;
}

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(5), 5500),
      setTimeout(() => setPhase(6), 8500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #140E00 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7 }}
    >
      {/* Diagonal gold lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-[#E8C97A]/8"
          style={{ top: `${15 + i * 18}%`, left: '-10%', width: '120%', transform: 'rotate(-8deg)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
      ))}

      {/* Header */}
      <motion.div
        className="absolute top-[6vh] left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -15 }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-[1.6vw] font-body tracking-[0.6em] text-[#E8C97A]/60 uppercase">
          Why Al Nasme?
        </span>
      </motion.div>

      {/* Big 40 Years */}
      <div className="absolute left-0 right-0 top-[14vh] flex flex-col items-center z-10">
        <div className="flex items-end gap-[2vw]">
          <motion.div
            className="font-display font-black text-[#E8C97A] leading-none"
            style={{ fontSize: '22vw', lineHeight: 0.9 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.6 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {phase >= 2 ? <CountUp to={40} duration={1.5} /> : '0'}
          </motion.div>
          <motion.div
            className="mb-[4vw] flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="text-[4vw] font-display text-white font-bold leading-none">YEARS</span>
            <span className="text-[2vw] font-body text-[#E8C97A]/70 tracking-widest uppercase">of craft</span>
          </motion.div>
        </div>

        {/* Sub text */}
        <motion.p
          className="text-[2.5vw] font-body text-white/60 tracking-[0.2em] uppercase text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 15 }}
          transition={{ duration: 0.8 }}
        >
          Premium Syrian Craftsmanship
        </motion.p>
        <motion.p
          className="text-[2.8vw] font-arabic text-white/50 text-center mt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          أربعون عاماً من الحرفية الفاخرة
        </motion.p>
      </div>

      {/* Stats row */}
      <div className="absolute bottom-[8vh] left-0 right-0 flex justify-center gap-[6vw] z-10 px-[8vw]">
        {[
          { num: 40, suffix: '+', label: 'Years', arabic: 'سنة' },
          { num: 1000, suffix: '+', label: 'Travelers', arabic: 'مسافر' },
          { num: 100, suffix: '%', label: 'Guaranteed', arabic: 'ضمان' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase >= 4 + i * 0.5 ? 1 : 0, y: phase >= 4 + i * 0.5 ? 0 : 30 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          >
            <div className="text-[5vw] font-display font-bold text-[#E8C97A] leading-none">
              {phase >= 4 ? <><CountUp to={stat.num} duration={1.2} />{stat.suffix}</> : `0${stat.suffix}`}
            </div>
            <div className="text-[1.6vw] font-body tracking-widest text-white/50 uppercase">{stat.label}</div>
            <div className="text-[1.8vw] font-arabic text-white/35">{stat.arabic}</div>
          </motion.div>
        ))}
      </div>

      {/* Horizontal divider */}
      <motion.div
        className="absolute bottom-[22vh] left-[10vw] right-[10vw] h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A]/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase >= 4 ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
    </motion.div>
  );
}
