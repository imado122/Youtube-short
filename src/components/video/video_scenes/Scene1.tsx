import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 4200),
      setTimeout(() => setPhase(6), 6800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: phase >= 6 ? 1.2 : 1.05 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1280&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      {/* Scanline sweep on entry */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: phase >= 1 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(232,201,122,0.08) 50%, transparent 100%)' }}
      />

      {/* Top label */}
      <motion.div
        className="absolute top-[8vh] left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : -20 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[1.8vw] font-body tracking-[0.5em] text-[#E8C97A]/80 uppercase">
          Al Nasme · النسمة
        </span>
      </motion.div>

      {/* Main hook text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-[8vw]">
        <div className="overflow-hidden">
          <motion.div
            className="text-[6vw] font-display font-bold text-white/90 text-center leading-tight tracking-wide"
            initial={{ y: '110%' }}
            animate={{ y: phase >= 1 ? '0%' : '110%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            هذه ليست مجرد حقيبة
          </motion.div>
        </div>

        <div className="overflow-hidden mt-3">
          <motion.div
            className="text-[4.5vw] font-body font-light text-[#E8C97A] text-center tracking-widest uppercase"
            initial={{ y: '110%' }}
            animate={{ y: phase >= 2 ? '0%' : '110%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            This is your statement.
          </motion.div>
        </div>

        {/* Animated gold divider */}
        <motion.div
          className="my-8 h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent"
          initial={{ width: 0 }}
          animate={{ width: phase >= 3 ? '60vw' : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Sub tagline */}
        <motion.div
          className="text-[2.8vw] font-body font-light text-white/70 text-center tracking-[0.25em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Premium Luggage · Since 1985
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-[6vh] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 5 ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-[1px] bg-[#E8C97A]"
            animate={{ height: ['0px', '40px', '0px'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-[4vh] left-[4vw] w-[3vw] h-[3vw] border-t-[1px] border-l-[1px] border-[#E8C97A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-[4vh] right-[4vw] w-[3vw] h-[3vw] border-t-[1px] border-r-[1px] border-[#E8C97A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-[4vh] left-[4vw] w-[3vw] h-[3vw] border-b-[1px] border-l-[1px] border-[#E8C97A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-[4vh] right-[4vw] w-[3vw] h-[3vw] border-b-[1px] border-r-[1px] border-[#E8C97A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}
