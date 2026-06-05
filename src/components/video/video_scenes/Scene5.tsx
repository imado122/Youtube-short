import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 55 }, (_, i) => ({
    x: (Math.sin(i * 127.1) * 0.5 + 0.5) * 100,
    color: ['#E8C97A','#27AE60','#E74C3C','#3498DB','#F39C12','#9B59B6','#ffffff'][i % 7],
    size: 2.5 + (Math.sin(i * 61.3) * 0.5 + 0.5) * 4,
    delay: (Math.sin(i * 17.4) * 0.5 + 0.5) * 2,
    dur: 2.5 + (Math.sin(i * 43.1) * 0.5 + 0.5) * 2.5,
    rotate: Math.sin(i * 33.7) * 400,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pieces.map((p, i) => (
        <motion.div key={i} className="absolute rounded-sm"
          style={{ left: `${p.x}%`, top: '-5%', width: p.size, height: p.size * 0.55, background: p.color }}
          animate={{ y: '115vh', rotate: p.rotate, opacity: [1, 1, 0.5, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn', repeat: Infinity, repeatDelay: 0.8 }} />
      ))}
    </div>
  );
}

export function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2900),
      setTimeout(() => setPhase(5), 4200),
      setTimeout(() => setPhase(6), 6000),
      setTimeout(() => setPhase(7), 7800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="5" className="absolute inset-0 overflow-hidden flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #03070A 0%, #060D0B 50%, #040A12 100%)' }}>

      <Confetti />

      {/* Green + gold radial glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 40%, rgba(39,174,96,0.15) 0%, rgba(232,201,122,0.06) 50%, transparent 70%)' }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-[6vw] gap-[2.5vh] w-full pt-[7vh]">

        {/* Celebration headline */}
        <motion.div className="text-[16vw] leading-none"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: phase >= 1 ? 1 : 0, rotate: phase >= 1 ? 0 : -20 }}
          transition={{ type: 'spring', stiffness: 250, damping: 14 }}>
          🎉
        </motion.div>

        <div className="overflow-hidden w-full">
          <motion.div className="text-[9.5vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 1 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            مبروك لكل ناجح
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div className="text-[8.5vw] font-arabic font-black text-[#E8C97A] leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            في البكالوريا 🎓
          </motion.div>
        </div>
        <motion.div className="text-[4.5vw] font-body text-white/40"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          Congratulations to all Bac graduates! 🎓
        </motion.div>

        {/* Divider */}
        <motion.div className="h-[1.5px] w-[65vw]"
          style={{ background: 'linear-gradient(90deg, transparent, #E8C97A, transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8 }} />

        {/* Phone block */}
        <motion.div className="w-full py-[3.2vh] px-[5vw] rounded-[3vw] flex flex-col items-center gap-[1vh] relative overflow-hidden"
          style={{ background: 'rgba(232,201,122,0.08)', border: '2px solid rgba(232,201,122,0.50)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9 }}
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
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[3.8vw] font-body text-[#E8C97A]/65">
            🌐 alnasme.shamsaver1.workers.dev
          </div>
        </motion.div>

        {/* Shipping */}
        <motion.div className="flex items-center gap-[3vw] px-[5vw] py-[2vh] rounded-[3vw]"
          style={{ background: 'rgba(39,174,96,0.10)', border: '1px solid rgba(39,174,96,0.30)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.88 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <span className="text-[8vw]">🌍</span>
          <div className="flex flex-col">
            <span className="text-[5.5vw] font-arabic font-bold text-white">شحن لكل أرجاء العالم</span>
            <span className="text-[3.8vw] font-body text-white/45">Worldwide Shipping Available</span>
          </div>
        </motion.div>

        {/* Hashtags */}
        <motion.div className="text-[3vw] font-body text-white/25 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}>
          #بكالوريا_2025 #AlNasme #النسمة #حقائب_سفر #بكالوريا #Shorts 🎓
        </motion.div>
      </div>
    </div>
  );
}
