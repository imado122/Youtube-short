import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3500),
      setTimeout(() => setPhase(6), 5500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      data-scene="3"
      className="absolute inset-0 overflow-hidden flex flex-col bg-black"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Gold glow */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(232,201,122,0.18) 0%, transparent 65%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Transition text */}
      <motion.div
        className="relative z-10 pt-[8vh] flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.85 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-[4vw] font-body tracking-[0.4em] text-[#E8C97A]/70 uppercase mb-[1vh]">Meet the upgrade</div>
        <div className="text-[7.5vw] font-display font-black text-[#E8C97A] leading-none text-center">Al Nasme users:</div>
        <div className="text-[5.5vw] font-arabic text-white/60 mt-[1vh]">أصحاب حقائب النسمة:</div>
      </motion.div>

      {/* Reaction emojis */}
      <motion.div
        className="relative z-10 flex justify-center gap-[3vw] mt-[3vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        {['😎','🧳','💪'].map((e, i) => (
          <motion.span key={i} className="text-[14vw]"
            initial={{ scale: 0 }}
            animate={{ scale: phase >= 2 ? 1 : 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          >{e}</motion.span>
        ))}
      </motion.div>

      {/* Suitcase image */}
      <motion.div className="relative z-20 flex justify-center mt-[2vh]">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
          className="w-[65vw] h-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 25px rgba(232,201,122,0.30))' }}
          initial={{ opacity: 0, y: '5vh', scale: 0.9 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : '5vh', scale: phase >= 3 ? 1 : 0.9 }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 80 }}
        />
      </motion.div>

      {/* Punchline */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-end pb-[6vh] px-[8vw] gap-[2vh]"
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[6.5vw] font-display font-black text-white leading-tight">
            40 years.
          </div>
          <div className="text-[6vw] font-display font-black text-[#E8C97A] leading-tight">
            Still going strong. 💪
          </div>
          <div className="text-[4.5vw] font-arabic text-white/50 mt-[1vh]">٤٠ سنة ولا تكسر!</div>
        </motion.div>

        <motion.div
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A]/40 to-transparent"
          initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="text-[3.5vw] font-body text-white/40 uppercase tracking-widest text-center"
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          Syrian craftsmanship since 1985
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
