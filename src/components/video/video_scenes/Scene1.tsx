import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2300),
      setTimeout(() => setPhase(5), 3400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="1" className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Animated BG gradient burst */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,201,122,0.12) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }} />

      {/* Top bar accent */}
      <motion.div className="absolute top-0 left-0 right-0 h-[1.2vh]"
        style={{ background: 'linear-gradient(90deg, #c0392b, #E8C97A, #c0392b)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }} />

      <div className="flex flex-col items-center text-center px-[6vw] gap-[3vh] z-10 w-full">

        {/* Emoji attention-grab */}
        <motion.div className="text-[20vw] leading-none"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: phase >= 1 ? 1 : 0, rotate: phase >= 1 ? 0 : -15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 14 }}>
          🧳
        </motion.div>

        {/* Arabic — primary, HUGE */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="text-[10vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            متى آخر مرة
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div
            className="text-[9.5vw] font-arabic font-black text-[#E8C97A] leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}>
            كسرت حقيبتك؟ 😭
          </motion.div>
        </div>

        {/* English sub */}
        <motion.div className="text-[5vw] font-body font-semibold text-white/50 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          When did your bag last break?
        </motion.div>

        {/* Divider */}
        <motion.div className="w-[50vw] h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #E8C97A, transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.7 }} />

        {/* Watch hook */}
        <motion.div className="flex items-center gap-[3vw]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.5 }}>
          <span className="text-[5vw] font-arabic text-white/60">ابقَ لأخر الفيديو 👇</span>
        </motion.div>
      </div>

      {/* Bottom bar accent */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-[1.2vh]"
        style={{ background: 'linear-gradient(90deg, #c0392b, #E8C97A, #c0392b)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} />
    </div>
  );
}
