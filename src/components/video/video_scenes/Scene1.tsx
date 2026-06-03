import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="1"
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Scanline opening */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        style={{ background: 'linear-gradient(180deg, black 0%, transparent 100%)' }}
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: phase >= 1 ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
      />

      <div className="flex flex-col items-center text-center px-[8vw] z-10 gap-[3vh]">
        {/* Emoji slam */}
        <motion.div
          className="text-[18vw] leading-none"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: phase >= 1 ? 1 : 0, rotate: phase >= 1 ? 0 : -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >✈️</motion.div>

        <div className="overflow-hidden">
          <motion.div
            className="text-[11vw] font-display font-black text-white leading-none tracking-tight"
            initial={{ y: '110%' }} animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            POV:
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="text-[7.5vw] font-body font-bold text-[#E8C97A] leading-tight"
            initial={{ y: '110%' }} animate={{ y: phase >= 3 ? '0%' : '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Your bag just broke
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="text-[7vw] font-body font-bold text-white/80 leading-tight"
            initial={{ y: '110%' }} animate={{ y: phase >= 3 ? '0%' : '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          >
            at the airport 😭
          </motion.div>
        </div>

        <motion.div
          className="text-[5.5vw] font-arabic text-white/50 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 15 }}
          transition={{ duration: 0.5 }}
        >
          حقيبتك كسرت بالمطار 😭
        </motion.div>

        {/* Laugh count */}
        <motion.div
          className="mt-[2vh] flex items-center gap-[3vw]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0.8 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          <span className="text-[6vw]">👇</span>
          <span className="text-[4vw] font-body text-white/60 uppercase tracking-widest">Watch this</span>
          <span className="text-[6vw]">👇</span>
        </motion.div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />
    </motion.div>
  );
}
