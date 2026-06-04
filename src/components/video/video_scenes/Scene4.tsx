import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const [digits, setDigits] = useState('');
  const PHONE = '+963 983 541 883';

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // Typewriter effect for phone number
  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDigits(PHONE.slice(0, i));
      if (i >= PHONE.length) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div data-scene="4" className="absolute inset-0 bg-[#050403] flex flex-col items-center justify-center overflow-hidden">

      {/* Warm gold glow */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(232,201,122,0.13) 0%, transparent 65%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }} />

      {/* Pulsing ring behind phone */}
      {phase >= 3 && (
        <motion.div className="absolute w-[70vw] h-[70vw] rounded-full"
          style={{ border: '1px solid rgba(232,201,122,0.15)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[3vh] w-full">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[5vw] font-arabic text-white/50">تواصل معنا الآن</div>
          <div className="text-[4vw] font-body text-white/30 tracking-widest uppercase">Contact Us Now</div>
        </motion.div>

        {/* Phone emoji */}
        <motion.div className="text-[15vw] leading-none"
          initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          📞
        </motion.div>

        {/* THE PHONE NUMBER — typewriter, big, gold */}
        <motion.div
          className="w-full px-[4vw] py-[4vh] rounded-[3vw] flex flex-col items-center gap-[1.5vh]"
          style={{ background: 'rgba(232,201,122,0.08)', border: '2px solid rgba(232,201,122,0.45)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9 }}
          transition={{ duration: 0.6, type: 'spring' }}>
          {/* Shimmer effect */}
          <motion.div className="absolute inset-0 rounded-[3vw] overflow-hidden pointer-events-none">
            <motion.div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.18), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
          </motion.div>
          <div className="text-[10vw] font-display font-black text-[#E8C97A] tracking-wider leading-none font-mono">
            {digits}<span className="opacity-60 animate-pulse">|</span>
          </div>
          <div className="text-[4.5vw] font-arabic text-white/60">اتصل أو واتساب</div>
          <div className="text-[3.5vw] font-body text-white/40">Call or WhatsApp</div>
        </motion.div>

        {/* WhatsApp / Call icons row */}
        <motion.div className="flex gap-[6vw] mt-[1vh]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 10 }}
          transition={{ duration: 0.5 }}>
          {[['📱','WhatsApp'],['📞','Call'],['🌐','Website']].map(([ic,lbl],i) => (
            <div key={i} className="flex flex-col items-center gap-[1vh]">
              <span className="text-[9vw]">{ic}</span>
              <span className="text-[3vw] font-body text-white/40 uppercase tracking-wider">{lbl}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
