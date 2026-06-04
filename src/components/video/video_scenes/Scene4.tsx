import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    x: (Math.sin(i * 127.1 + 1) * 0.5 + 0.5) * 100,
    y: (Math.sin(i * 311.7 + 2) * 0.5 + 0.5) * 100,
    r: (Math.sin(i * 61.3 + 3) * 0.5 + 0.5) * 1.8 + 0.4,
    d: (Math.sin(i * 17.4 + 4) * 0.5 + 0.5) * 3,
    dur: 2 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 2.5,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: s.dur, delay: s.d, repeat: Infinity }} />
      ))}
    </div>
  );
}

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const [digits, setDigits] = useState('');
  const PHONE = '+963 983 541 883';

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2400),
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
      style={{ background: 'linear-gradient(180deg, #03030E 0%, #060420 100%)' }}>

      <Starfield />

      {/* Radar ping rings */}
      {phase >= 2 && [0, 0.6, 1.2].map((delay, i) => (
        <motion.div key={i} className="absolute w-[30vw] h-[30vw] rounded-full"
          style={{ border: '1px solid rgba(232,201,122,0.25)' }}
          animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeOut' }} />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[3vh] w-full">

        {/* Mission control label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[4vw] font-body tracking-[0.6em] text-[#E8C97A]/50 uppercase">Mission Control</div>
          <div className="text-[8vw] font-arabic font-black text-white leading-tight">مركز القيادة 📡</div>
        </motion.div>

        {/* Signal emoji */}
        <motion.div className="text-[15vw] leading-none"
          initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 14 }}>
          📡
        </motion.div>

        {/* Phone number — typewriter */}
        <motion.div className="w-full py-[4vh] px-[5vw] rounded-[3vw] relative overflow-hidden flex flex-col items-center gap-[1.5vh]"
          style={{ background: 'rgba(232,201,122,0.07)', border: '2px solid rgba(232,201,122,0.50)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.88 }}
          transition={{ duration: 0.65, type: 'spring' }}>
          {/* Shimmer */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.15), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
          <div className="text-[5vw] font-arabic text-white/50">اتصل أو واتساب 👇</div>
          <div className="text-[10.5vw] font-display font-black text-[#E8C97A] tracking-wider leading-none font-mono">
            {digits}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>|</motion.span>
          </div>
          <div className="text-[4vw] font-body text-white/35 tracking-wider">Call / WhatsApp</div>
        </motion.div>

        {/* Channel icons */}
        <motion.div className="flex gap-[8vw]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          {[['📱','واتساب'],['📞','اتصال'],['💬','رسالة']].map(([ic, lb], i) => (
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
