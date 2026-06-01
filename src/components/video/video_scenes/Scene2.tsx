import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setPhase(5), 5500),
      setTimeout(() => setPhase(6), 7200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#0A0A0A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: '-5%' }}
      transition={{ duration: 0.8 }}
    >
      {/* Dark radial gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, #1a1208 0%, #0A0A0A 65%)' }}
      />

      {/* Airport bg image, blurred */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=60)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
        }}
      />

      {/* Gold glow behind suitcase */}
      <motion.div
        className="absolute right-[8vw] top-[10vh] w-[50vw] h-[80vh] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,201,122,0.12) 0%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.6 }}
        transition={{ duration: 1.5 }}
      />

      {/* Suitcase hero */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/suitcase-single.png`}
        className="absolute right-[5vw] top-[8vh] h-[82vh] w-auto object-contain z-20"
        style={{ filter: 'drop-shadow(0 0 40px rgba(232,201,122,0.25)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))' }}
        initial={{ opacity: 0, x: '15vw', scale: 0.85 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          x: phase >= 1 ? 0 : '15vw',
          scale: phase >= 1 ? 1 : 0.85,
          y: [0, -8, 0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
      />

      {/* Left side text stack */}
      <div className="absolute left-[8vw] top-0 bottom-0 flex flex-col justify-center z-30 w-[44vw]">
        {/* Gold rule */}
        <motion.div
          className="h-[2px] bg-[#E8C97A] mb-6"
          initial={{ width: 0 }}
          animate={{ width: phase >= 2 ? '8vw' : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="overflow-hidden">
          <motion.h1
            className="text-[9vw] font-display font-bold text-[#E8C97A] leading-none"
            initial={{ y: '105%' }}
            animate={{ y: phase >= 2 ? '0%' : '105%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Al Nasme
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-1">
          <motion.h2
            className="text-[5.5vw] font-arabic text-white/80 leading-none"
            initial={{ y: '105%' }}
            animate={{ y: phase >= 3 ? '0%' : '105%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            النسمة
          </motion.h2>
        </div>

        <motion.div
          className="mt-6 text-[2vw] font-body tracking-[0.3em] text-white/50 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Premium · Luggage · Damascus
        </motion.div>

        {/* Stars */}
        <motion.div
          className="mt-5 flex gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.8 }}
        >
          {['★','★','★','★','★'].map((s, i) => (
            <motion.span
              key={i}
              className="text-[2.5vw] text-[#E8C97A]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: phase >= 5 ? 1 : 0, scale: phase >= 5 ? 1 : 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >{s}</motion.span>
          ))}
          <motion.span
            className="text-[1.8vw] font-body text-white/50 ml-2 self-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Trusted since 1985
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8C97A]/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
