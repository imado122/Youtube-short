import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 5000),
      setTimeout(() => setPhase(6), 7000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#060504]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Full background luggage image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/luggage-hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1.02 : 1.1, opacity: phase >= 1 ? 0.25 : 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/95" />

      {/* Gold corner lines */}
      {[
        'top-[3vh] left-[3vw] border-t border-l',
        'top-[3vh] right-[3vw] border-t border-r',
        'bottom-[3vh] left-[3vw] border-b border-l',
        'bottom-[3vh] right-[3vw] border-b border-r',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-[4vw] h-[4vw] border-[#E8C97A]/40 ${cls}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-[10vw]">
        {/* Brand */}
        <div className="overflow-hidden mb-2">
          <motion.div
            className="text-[10vw] font-display font-bold text-[#E8C97A] leading-none text-center"
            initial={{ y: '105%' }}
            animate={{ y: phase >= 1 ? '0%' : '105%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Al Nasme
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="text-[5vw] font-arabic text-white/70 text-center leading-none"
            initial={{ y: '105%' }}
            animate={{ y: phase >= 2 ? '0%' : '105%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            النسمة للحقائب الفاخرة
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-6 h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent w-[50vw]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* CTA button style */}
        <motion.div
          className="relative px-[6vw] py-[2vw] mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9 }}
          transition={{ duration: 0.8 }}
          style={{ border: '1px solid rgba(232,201,122,0.5)', background: 'rgba(232,201,122,0.08)' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.12), transparent)' }}
          />
          <div className="text-[3.5vw] font-body font-bold text-white tracking-[0.3em] uppercase text-center">
            Shop Now · اطلب الآن
          </div>
        </motion.div>

        {/* Website URL */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 15 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[2vw] font-body tracking-[0.2em] text-[#E8C97A] uppercase text-center">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
          <div className="text-[1.8vw] font-body text-white/40 tracking-widest">
            📱 ORDER ON WHATSAPP
          </div>
        </motion.div>

        {/* Since 1985 badge */}
        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="h-[1px] w-[6vw] bg-[#E8C97A]/30" />
          <span className="text-[1.5vw] font-body tracking-[0.4em] text-[#E8C97A]/50 uppercase">Since 1985</span>
          <div className="h-[1px] w-[6vw] bg-[#E8C97A]/30" />
        </motion.div>
      </div>

      {/* Bottom pulsing glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
