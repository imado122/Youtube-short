import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 120),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3300),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="1" className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #03060F 0%, #080D1F 60%, #040810 100%)' }}>

      {/* Lined paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 38px, rgba(255,255,255,0.8) 38px, rgba(255,255,255,0.8) 40px)', backgroundSize: '100% 40px' }} />

      {/* Red margin line */}
      <motion.div className="absolute top-0 bottom-0 w-[2px] bg-red-500/20"
        style={{ left: '12vw' }}
        initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }} />

      {/* Top stamp */}
      <motion.div className="absolute top-[5vh] left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="px-[6vw] py-[1.2vh] rounded-full"
          style={{ background: 'rgba(231,76,60,0.12)', border: '1.5px solid rgba(231,76,60,0.40)' }}>
          <span className="text-[4.5vw] font-arabic font-bold text-red-400 tracking-wide">بكالوريا ٢٠٢٥ 📝</span>
        </div>
      </motion.div>

      <div className="flex flex-col items-center text-center px-[8vw] gap-[3vh] z-10">

        {/* Big emoji */}
        <motion.div className="text-[18vw] leading-none"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: phase >= 1 ? 1 : 0, rotate: phase >= 1 ? 0 : -15 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
          🤔
        </motion.div>

        {/* Arabic question */}
        <div className="overflow-hidden w-full">
          <motion.div className="text-[9vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            أصعب سؤال
          </motion.div>
        </div>
        <div className="overflow-hidden w-full">
          <motion.div className="text-[8vw] font-arabic font-black text-white leading-tight text-center"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}>
            في البكالوريا... 😅
          </motion.div>
        </div>

        {/* Suspense dots */}
        <motion.div className="flex gap-[3vw]"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}>
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.div key={i} className="w-[3vw] h-[3vw] rounded-full bg-[#E8C97A]"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, delay: d, repeat: Infinity }} />
          ))}
        </motion.div>

        {/* PUNCHLINE */}
        <motion.div className="w-full px-[4vw] py-[3vh] rounded-[3vw]"
          style={{ background: 'rgba(232,201,122,0.10)', border: '2px solid rgba(232,201,122,0.50)' }}
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, scale: phase >= 4 ? 1 : 0.88, y: phase >= 4 ? 0 : 10 }}
          transition={{ duration: 0.55, type: 'spring' }}>
          <div className="text-[7vw] font-arabic font-black text-[#E8C97A] leading-tight text-center">
            أي حقيبة تشتري
          </div>
          <div className="text-[6.5vw] font-arabic font-black text-white leading-tight text-center">
            بعد الامتحان؟ 😂
          </div>
        </motion.div>

        <motion.div className="text-[4vw] font-body text-white/35 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 0.5 }}>
          The hardest Bac question: which bag for your post-exam trip? 😂
        </motion.div>
      </div>
    </div>
  );
}
