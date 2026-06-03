import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 3000),
      setTimeout(() => setPhase(5), 4800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="2"
      className="absolute inset-0 bg-[#080604] overflow-hidden flex flex-col items-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle grid bg */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-grid.png)`,
          backgroundSize: 'cover',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(232,201,122,0.10) 0%, transparent 65%)' }}
      />

      {/* Top brand name */}
      <motion.div
        className="relative z-10 mt-[8vh] flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-[3.5vw] font-body tracking-[0.6em] text-[#E8C97A]/60 uppercase mb-1">Premium Collection</div>
        <div className="h-[1px] w-[25vw] bg-[#E8C97A]/30 my-[1.5vh]" />
      </motion.div>

      {/* Suitcase hero — centered portrait */}
      <motion.div className="relative z-20 flex-1 flex items-center justify-center w-full px-[8vw]">
        {/* Gold glow */}
        <motion.div
          className="absolute w-[70vw] h-[70vw] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(232,201,122,0.18) 0%, transparent 70%)' }}
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: phase >= 1 ? 1 : 0.5, opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
          className="relative w-[72vw] h-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 30px rgba(232,201,122,0.22)) drop-shadow(0 20px 50px rgba(0,0,0,0.9))' }}
          initial={{ opacity: 0, y: '8vh', scale: 0.88 }}
          animate={{
            opacity: phase >= 2 ? 1 : 0,
            y: phase >= 2 ? 0 : '8vh',
            scale: phase >= 2 ? 1 : 0.88,
          }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 60, damping: 18 }}
        />
      </motion.div>

      {/* Bottom info block */}
      <motion.div
        className="relative z-10 w-full flex flex-col items-center pb-[8vh] px-[8vw] gap-[2vh]"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: phase >= 3 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="overflow-hidden">
          <motion.div
            className="text-[14vw] font-display font-bold text-[#E8C97A] leading-none text-center tracking-wide"
            initial={{ y: '105%' }} animate={{ y: phase >= 3 ? '0%' : '105%' }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >Al Nasme</motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="text-[7vw] font-arabic text-white/70 leading-none text-center"
            initial={{ y: '105%' }} animate={{ y: phase >= 3 ? '0%' : '105%' }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.1 }}
          >النسمة للحقائب الفاخرة</motion.div>
        </div>
        {/* Stars */}
        <motion.div
          className="flex items-center gap-[1.5vw] mt-[1vh]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          {'★★★★★'.split('').map((s,i) => (
            <motion.span key={i} className="text-[5vw] text-[#E8C97A]"
              initial={{ scale: 0 }} animate={{ scale: phase >= 4 ? 1 : 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, type: 'spring' }}>{s}</motion.span>
          ))}
          <span className="text-[3vw] font-body text-white/40 ml-[2vw]">Since 1985</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
