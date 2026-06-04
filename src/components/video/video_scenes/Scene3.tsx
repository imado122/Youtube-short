import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 4000),
      setTimeout(() => setPhase(6), 5800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="3" className="absolute inset-0 bg-black flex flex-col overflow-hidden">

      {/* Gold glow */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,201,122,0.16) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }} />

      {/* "The answer" banner */}
      <motion.div className="relative z-10 pt-[7vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.9 }}
        transition={{ duration: 0.5, type: 'spring' }}>
        <div className="px-[6vw] py-[1.2vh] rounded-full"
          style={{ background: 'rgba(232,201,122,0.14)', border: '1px solid rgba(232,201,122,0.40)' }}>
          <span className="text-[4.5vw] font-arabic text-[#E8C97A] tracking-wider">الحل الوحيد الحقيقي</span>
        </div>
      </motion.div>

      {/* Brand name — MASSIVE */}
      <div className="relative z-10 flex flex-col items-center mt-[2vh]">
        <div className="overflow-hidden">
          <motion.div className="text-[18vw] font-display font-black text-[#E8C97A] leading-none text-center"
            initial={{ y: '105%' }} animate={{ y: phase >= 2 ? '0%' : '105%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            النسمة
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div className="text-[8vw] font-display font-black text-white/60 leading-none"
            initial={{ y: '105%' }} animate={{ y: phase >= 2 ? '0%' : '105%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}>
            Al Nasme
          </motion.div>
        </div>
      </div>

      {/* Product image — centre stage */}
      <motion.div className="relative z-20 flex justify-center mt-[1vh] flex-1 items-center">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
          className="w-[62vw] h-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 30px rgba(232,201,122,0.35))' }}
          initial={{ opacity: 0, y: '6vh', scale: 0.88 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : '6vh', scale: phase >= 3 ? 1 : 0.88 }}
          transition={{ duration: 1, type: 'spring', stiffness: 70 }} />
      </motion.div>

      {/* Trust badge */}
      <motion.div className="relative z-10 pb-[4vh] flex flex-col items-center gap-[1.5vh] px-[6vw]"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
        transition={{ duration: 0.6 }}>
        <div className="flex gap-[4vw] w-full justify-center">
          {[['✅','جودة عالية'],['✅','٤٠ سنة خبرة'],['✅','ضمان كامل']].map(([ic,txt],i) => (
            <motion.div key={i}
              className="flex flex-col items-center gap-[1vh] px-[3vw] py-[2vh] rounded-[2.5vw]"
              style={{ background: 'rgba(232,201,122,0.09)', border: '1px solid rgba(232,201,122,0.22)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: phase >= 5 + (i > 0 ? i * 0.5 : 0) ? 1 : 0, scale: phase >= 5 ? 1 : 0.8 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}>
              <span className="text-[6vw]">{ic}</span>
              <span className="text-[3.5vw] font-arabic text-[#E8C97A] text-center leading-tight">{txt}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="text-[4vw] font-body text-white/30 tracking-widest uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          Syrian craftsmanship since 1985
        </motion.div>
      </motion.div>
    </div>
  );
}
