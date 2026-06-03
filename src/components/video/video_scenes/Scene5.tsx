import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 750),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 4000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="5"
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-[#060504]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full bg image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/luggage-hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1.0 : 1.05, opacity: phase >= 1 ? 0.22 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/95" />

      {/* Corner accents */}
      {['top-[3vh] left-[4vw] border-t border-l','top-[3vh] right-[4vw] border-t border-r','bottom-[3vh] left-[4vw] border-b border-l','bottom-[3vh] right-[4vw] border-b border-r'].map((cls, i) => (
        <motion.div key={i} className={`absolute w-[8vw] h-[4vh] border-[#E8C97A]/40 ${cls}`}
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }} />
      ))}

      <div className="relative z-10 flex flex-col items-center px-[8vw] text-center gap-[3vh] w-full">
        {/* Brand name */}
        <div className="overflow-hidden">
          <motion.div
            className="text-[17vw] font-display font-bold text-[#E8C97A] leading-none"
            initial={{ y: '110%' }} animate={{ y: phase >= 1 ? '0%' : '110%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>Al Nasme</motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="text-[7vw] font-arabic text-white/70 leading-none"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>النسمة للحقائب الفاخرة</motion.div>
        </div>

        {/* Gold divider */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent w-[75vw]"
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.9 }} />

        {/* Shop Now button */}
        <motion.div
          className="relative px-[12vw] py-[3vh] w-full"
          style={{ border: '1px solid rgba(232,201,122,0.55)', background: 'rgba(232,201,122,0.10)' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.92 }}
          transition={{ duration: 0.7 }}>
          {/* Pulse shimmer */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.15), transparent)' }} />
          <div className="text-[6vw] font-body font-bold text-white tracking-[0.25em] uppercase text-center">
            Shop Now · اطلب الآن
          </div>
        </motion.div>

        {/* Website URL */}
        <motion.div
          className="flex flex-col items-center gap-[1.5vh]"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 15 }}
          transition={{ duration: 0.8 }}>
          <div className="text-[3.5vw] font-body text-[#E8C97A] tracking-[0.15em] text-center">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
          <div className="text-[3vw] font-body text-white/45 tracking-widest">
            📱 ORDER ON WHATSAPP
          </div>
        </motion.div>

        {/* Since 1985 */}
        <motion.div
          className="flex items-center gap-[3vw]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 0.8 }}>
          <div className="h-[1px] w-[12vw] bg-[#E8C97A]/30" />
          <span className="text-[2.8vw] font-body tracking-[0.4em] text-[#E8C97A]/50 uppercase">Since 1985</span>
          <div className="h-[1px] w-[12vw] bg-[#E8C97A]/30" />
        </motion.div>
      </div>

      {/* Bottom gold pulse */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent"
        animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }} />
    </motion.div>
  );
}
