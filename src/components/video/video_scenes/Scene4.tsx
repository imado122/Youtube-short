import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const [digits, setDigits] = useState('');
  const PHONE = '+963 983 541 883';

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 750),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 4200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const iv = setInterval(() => { i++; setDigits(PHONE.slice(0, i)); if (i >= PHONE.length) clearInterval(iv); }, 65);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div data-scene="4" className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #04050F 0%, #070A18 100%)' }}>

      {/* Gold glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 60% at 50% 50%, rgba(232,201,122,0.12) 0%, transparent 65%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }} />

      {/* Pulse rings */}
      {phase >= 2 && [0, 0.7, 1.4].map((delay, i) => (
        <motion.div key={i} className="absolute w-[28vw] h-[28vw] rounded-full"
          style={{ border: '1.5px solid rgba(232,201,122,0.22)' }}
          animate={{ scale: [1, 3.8], opacity: [0.7, 0] }}
          transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeOut' }} />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[3vh] w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[8vw] font-arabic font-black text-white leading-tight">اطلب هدية التخرج</div>
          <div className="text-[6.5vw] font-arabic text-[#E8C97A] font-bold">الآن! 🎓🧳</div>
          <div className="text-[4vw] font-body text-white/35 mt-[1vh]">Order the graduation gift now!</div>
        </motion.div>

        {/* Fun joke line */}
        <motion.div
          className="px-[5vw] py-[2vh] rounded-[2.5vw]"
          style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.25)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.9 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <div className="text-[5.5vw] font-arabic font-bold text-white">
            للناجح <span className="text-green-400">🎉</span> وللي ما نجح <span className="text-red-400">😅</span>
          </div>
          <div className="text-[4.5vw] font-arabic text-white/60 mt-[0.5vh]">
            الرحلة علاج للحالتين! 😂
          </div>
        </motion.div>

        {/* THE PHONE NUMBER */}
        <motion.div className="w-full py-[4vh] px-[5vw] rounded-[3vw] relative overflow-hidden flex flex-col items-center gap-[1.5vh]"
          style={{ background: 'rgba(232,201,122,0.08)', border: '2px solid rgba(232,201,122,0.55)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.88 }}
          transition={{ duration: 0.65, type: 'spring' }}>
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.18), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
          <div className="text-[5vw] font-arabic text-white/55">📞 اتصل أو واتساب</div>
          <div className="text-[10.5vw] font-display font-black text-[#E8C97A] tracking-wider leading-none font-mono">
            {digits}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.75, repeat: Infinity }}>|</motion.span>
          </div>
          <div className="text-[4vw] font-body text-white/35">Call / WhatsApp</div>
        </motion.div>

        <motion.div className="flex gap-[8vw]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          {[['📱','واتساب'],['📞','اتصال'],['🌐','موقع']].map(([ic, lb], i) => (
            <div key={i} className="flex flex-col items-center gap-[1vh]">
              <span className="text-[10vw]">{ic}</span>
              <span className="text-[3.5vw] font-arabic text-white/40">{lb}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
