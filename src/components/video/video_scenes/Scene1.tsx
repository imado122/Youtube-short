import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="1"
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full bg image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-luxury.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1.02 : 1.08, opacity: phase >= 1 ? 0.45 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* Corner accents */}
      {['top-[4vh] left-[5vw] border-t border-l','top-[4vh] right-[5vw] border-t border-r','bottom-[4vh] left-[5vw] border-b border-l','bottom-[4vh] right-[5vw] border-b border-r'].map((cls, i) => (
        <motion.div key={i} className={`absolute w-[8vw] h-[4vh] border-[#E8C97A]/50 ${cls}`}
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }} />
      ))}

      {/* Brand pill */}
      <motion.div
        className="absolute top-[10vh] px-[6vw] py-[1vh] border border-[#E8C97A]/40 bg-[#E8C97A]/08"
        style={{ background: 'rgba(232,201,122,0.08)' }}
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[3.5vw] font-body tracking-[0.5em] text-[#E8C97A] uppercase">Al Nasme · النسمة</span>
      </motion.div>

      {/* Main text block */}
      <div className="relative z-10 flex flex-col items-center px-[8vw] text-center gap-[2vh]">
        <div className="overflow-hidden">
          <motion.div
            className="font-arabic text-[9vw] text-white/90 leading-tight"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            هذه ليست مجرد حقيبة
          </motion.div>
        </div>

        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent w-[70vw]"
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="overflow-hidden">
          <motion.div
            className="font-display font-bold text-[11vw] text-[#E8C97A] leading-none tracking-wide"
            initial={{ y: '110%' }} animate={{ y: phase >= 3 ? '0%' : '110%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            THIS IS YOUR
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="font-display font-bold text-[13vw] text-white leading-none tracking-wide"
            initial={{ y: '110%' }} animate={{ y: phase >= 3 ? '0%' : '110%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            STATEMENT.
          </motion.div>
        </div>

        <motion.div
          className="mt-[2vh] text-[3.5vw] font-body text-white/50 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Premium Luggage · Since 1985
        </motion.div>
      </div>

      {/* Animated scroll line */}
      <motion.div className="absolute bottom-[8vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <motion.div className="w-[1px] bg-[#E8C97A]"
          animate={{ height: ['0px', '6vh', '0px'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }} />
      </motion.div>
    </motion.div>
  );
}
