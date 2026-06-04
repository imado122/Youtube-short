import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 4000),
      setTimeout(() => setPhase(6), 6000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="5" className="absolute inset-0 bg-black flex flex-col items-center overflow-hidden">

      {/* BG */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 55%, rgba(232,201,122,0.15) 0%, transparent 65%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }} />

      {/* Top red+gold stripe */}
      <motion.div className="absolute top-0 left-0 right-0 flex h-[1.8vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}>
        <div className="flex-1 bg-[#c0392b]" />
        <div className="flex-1 bg-[#E8C97A]" />
        <div className="flex-1 bg-[#c0392b]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[2.5vh] w-full pt-[8vh]">

        {/* Main CTA Arabic */}
        <div className="overflow-hidden w-full">
          <motion.div className="text-[9.5vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 1 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            لا تضيّع فرصتك
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div className="text-[8.5vw] font-arabic font-black text-[#E8C97A] leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            اطلب النسمة الآن! 🧳
          </motion.div>
        </div>
        <motion.div className="text-[5vw] font-body font-semibold text-white/50"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          Order Al Nasme now!
        </motion.div>

        {/* Divider */}
        <motion.div className="h-[2px] w-[70vw]"
          style={{ background: 'linear-gradient(90deg, transparent, #E8C97A, transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.7 }} />

        {/* Phone number block */}
        <motion.div className="w-full py-[3vh] px-[5vw] rounded-[3vw] flex flex-col items-center gap-[1vh]"
          style={{ background: 'rgba(232,201,122,0.10)', border: '2px solid rgba(232,201,122,0.50)' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.92 }}
          transition={{ duration: 0.6, type: 'spring' }}>
          <motion.div
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.20), transparent)' }}
            className="absolute inset-0 rounded-[3vw] pointer-events-none"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} />
          <div className="text-[5vw] font-arabic text-white/60">📞 للتواصل والطلب</div>
          <div className="text-[10.5vw] font-display font-black text-[#E8C97A] tracking-wide leading-none">
            +963 983 541 883
          </div>
          <div className="text-[4vw] font-body text-white/40">WhatsApp / Call</div>
        </motion.div>

        {/* Website */}
        <motion.div className="flex flex-col items-center gap-[1vh]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 10 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[3.8vw] font-body text-[#E8C97A]/70 tracking-wide">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
        </motion.div>

        {/* Shipping badge */}
        <motion.div className="flex items-center gap-[3vw] px-[6vw] py-[2vh] rounded-[3vw]"
          style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.35)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.9 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <span className="text-[8vw]">🌍</span>
          <div className="flex flex-col">
            <span className="text-[5.5vw] font-arabic font-bold text-white">شحن لكل العالم</span>
            <span className="text-[4vw] font-body text-white/50">Worldwide Shipping</span>
          </div>
        </motion.div>

        {/* Hashtags */}
        <motion.div className="text-[3.2vw] font-body text-white/30 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}>
          #AlNasme #النسمة #حقائب_سفر #Syria #Shorts
        </motion.div>
      </div>

      {/* Bottom stripe */}
      <motion.div className="absolute bottom-0 left-0 right-0 flex h-[1.8vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}>
        <div className="flex-1 bg-[#E8C97A]" />
        <div className="flex-1 bg-[#c0392b]" />
        <div className="flex-1 bg-[#E8C97A]" />
      </motion.div>
    </div>
  );
}
