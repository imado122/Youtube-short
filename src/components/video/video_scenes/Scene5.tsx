import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => setPhase(6), 5500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="5"
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-[#050403]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero bg */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/luggage-hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1.01 : 1.06, opacity: phase >= 1 ? 0.20 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/92 via-black/65 to-black/97" />

      {/* Corner brackets */}
      {['top-[3.5vh] left-[5vw] border-t border-l','top-[3.5vh] right-[5vw] border-t border-r',
        'bottom-[3.5vh] left-[5vw] border-b border-l','bottom-[3.5vh] right-[5vw] border-b border-r'].map((cls, i) => (
        <motion.div key={i} className={`absolute w-[7vw] h-[3.5vh] border-[#E8C97A]/40 ${cls}`}
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: i * 0.07 }} />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-[8vw] gap-[3vh] w-full">
        {/* Punchline */}
        <motion.div
          className="text-[6vw] font-body font-bold text-white/70 leading-tight"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -15 }}
          transition={{ duration: 0.5 }}
        >
          Don't let your bag embarrass you 😤
        </motion.div>
        <motion.div
          className="text-[5vw] font-arabic text-white/50"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          لا تحرج نفسك بحقيبة رخيصة
        </motion.div>

        {/* Brand reveal */}
        <div className="overflow-hidden">
          <motion.div
            className="text-[16vw] font-display font-black text-[#E8C97A] leading-none"
            initial={{ y: '105%' }} animate={{ y: phase >= 2 ? '0%' : '105%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >Al Nasme</motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="text-[6.5vw] font-arabic text-white/65 leading-none"
            initial={{ y: '105%' }} animate={{ y: phase >= 3 ? '0%' : '105%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >النسمة للحقائب الفاخرة</motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent w-[80vw]"
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* CTA button — pulses */}
        <motion.div
          className="relative w-full py-[3.5vh] overflow-hidden"
          style={{ border: '2px solid rgba(232,201,122,0.7)', background: 'rgba(232,201,122,0.12)', borderRadius: '3vw' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, scale: phase >= 4 ? 1 : 0.9 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.25), transparent)' }}
          />
          <div className="text-[7vw] font-body font-black text-white tracking-[0.15em] uppercase text-center">
            Shop Now 🛒
          </div>
          <div className="text-[5vw] font-arabic text-white/70 text-center mt-[0.5vh]">اطلب الآن</div>
        </motion.div>

        {/* Website */}
        <motion.div
          className="flex flex-col items-center gap-[1.2vh]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[3.8vw] font-body text-[#E8C97A] tracking-[0.12em] text-center">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
          <div className="text-[3.2vw] font-body text-white/40">
            #AlNasme #النسمة #حقائب_سفر
          </div>
        </motion.div>

        {/* Since 1985 */}
        <motion.div
          className="flex items-center gap-[3vw]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="h-[1px] flex-1 bg-[#E8C97A]/20" />
          <span className="text-[2.5vw] font-body tracking-[0.4em] text-[#E8C97A]/40 uppercase">Premium since 1985</span>
          <div className="h-[1px] flex-1 bg-[#E8C97A]/20" />
        </motion.div>
      </div>

      {/* Bottom glow pulse */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }}
      />
    </motion.div>
  );
}
