import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    x: (Math.sin(i * 127.1 + 1) * 0.5 + 0.5) * 100,
    y: (Math.sin(i * 311.7 + 2) * 0.5 + 0.5) * 100,
    r: (Math.sin(i * 61.3 + 3) * 0.5 + 0.5) * 2.2 + 0.5,
    d: (Math.sin(i * 17.4 + 4) * 0.5 + 0.5) * 4,
    dur: 2 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 3,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: s.dur, delay: s.d, repeat: Infinity }} />
      ))}
    </div>
  );
}

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => setPhase(6), 5500),
      setTimeout(() => setPhase(7), 7500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="5" className="absolute inset-0 overflow-hidden flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #04040F 0%, #0A0625 60%, #050218 100%)' }}>

      <Starfield />

      {/* Big nebula glow */}
      <motion.div className="absolute w-[100vw] h-[80vw] rounded-full"
        style={{ top: '10%', left: 0, background: 'radial-gradient(ellipse, rgba(100,20,200,0.18) 0%, rgba(0,60,180,0.08) 50%, transparent 70%)', filter: 'blur(30px)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Rocket launch animation */}
      {phase >= 1 && (
        <motion.div className="absolute text-[12vw] z-20"
          initial={{ bottom: '-15vh', x: '35vw' }}
          animate={{ bottom: ['- 15vh', '110vh'] }}
          transition={{ duration: 3.5, ease: [0.4, 0, 0.6, 1], delay: 0.8 }}>
          🚀
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[2.5vh] w-full pt-[7vh]">

        {/* Headline Arabic */}
        <div className="overflow-hidden w-full">
          <motion.div className="text-[9vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 1 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            مهمتك القادمة
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div className="text-[8.5vw] font-arabic font-black text-[#E8C97A] leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            تبدأ بحقيبة النسمة 🧳
          </motion.div>
        </div>
        <motion.div className="text-[4.5vw] font-body font-semibold text-white/40"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          Your next journey starts with Al Nasme
        </motion.div>

        {/* Divider */}
        <motion.div className="h-[1.5px] w-[65vw]"
          style={{ background: 'linear-gradient(90deg, transparent, #E8C97A, transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8 }} />

        {/* Phone block */}
        <motion.div className="w-full py-[3vh] px-[5vw] rounded-[3vw] flex flex-col items-center gap-[1vh] relative overflow-hidden"
          style={{ background: 'rgba(232,201,122,0.08)', border: '2px solid rgba(232,201,122,0.45)' }}
          initial={{ opacity: 0, scale: 0.90 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.90 }}
          transition={{ duration: 0.6, type: 'spring' }}>
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.18), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }} />
          <div className="text-[5vw] font-arabic text-white/50">📞 للطلب والتواصل</div>
          <div className="text-[10vw] font-display font-black text-[#E8C97A] tracking-wide leading-none">
            +963 983 541 883
          </div>
          <div className="text-[3.8vw] font-body text-white/35">WhatsApp · Call</div>
        </motion.div>

        {/* Website */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 8 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[3.8vw] font-body text-[#E8C97A]/65 tracking-wide">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
        </motion.div>

        {/* Worldwide badge */}
        <motion.div className="flex items-center gap-[3vw] px-[5vw] py-[2vh] rounded-[3vw]"
          style={{ background: 'rgba(100,20,200,0.15)', border: '1px solid rgba(138,43,226,0.30)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.88 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <span className="text-[8vw]">🌍</span>
          <div className="flex flex-col text-right">
            <span className="text-[5.5vw] font-arabic font-bold text-white">شحن لكل أرجاء الكوكب</span>
            <span className="text-[3.8vw] font-body text-white/45">Worldwide Shipping</span>
          </div>
        </motion.div>

        {/* Hashtags */}
        <motion.div className="text-[3vw] font-body text-white/25 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}>
          #AlNasme #النسمة #حقائب_فاخرة #Syria #Shorts 🚀
        </motion.div>
      </div>
    </div>
  );
}
