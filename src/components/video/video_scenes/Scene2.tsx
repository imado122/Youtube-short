import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PAINS = [
  { ar: 'السوستة فتحت وحالها', en: 'Zipper broke on its own', emoji: '😭' },
  { ar: 'العجلة طارت بالمطار', en: 'Wheel snapped at airport', emoji: '💀' },
  { ar: 'المقبض انكسر بيدك', en: 'Handle snapped mid-trip', emoji: '🤦' },
  { ar: 'دفعت للإصلاح أكثر من سعرها', en: 'Repair cost more than the bag', emoji: '💸' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3300),
      setTimeout(() => setPhase(6), 4800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="2" className="absolute inset-0 bg-[#0a0202] flex flex-col overflow-hidden">

      {/* Red glow bg */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(192,57,43,0.18) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }} />

      {/* Header */}
      <motion.div className="relative z-10 pt-[8vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-[4vw] font-body tracking-[0.5em] text-white/30 uppercase">مشاكل الحقائب الرخيصة</div>
        <div className="text-[9vw] font-arabic font-black text-white leading-none">هل عشت هيك؟ 😤</div>
        <div className="text-[4.5vw] font-body text-white/40">Sound familiar?</div>
        <div className="mt-[1.5vh] w-[40vw] h-[2px] bg-red-600/60" />
      </motion.div>

      {/* Pain cards — rapid slam one by one */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-[5vw] gap-[2vh]">
        {PAINS.map((p, i) => (
          <motion.div key={i}
            className="flex items-center gap-[4vw] px-[5vw] py-[2.8vh] rounded-[3vw]"
            style={{ background: 'rgba(192,57,43,0.10)', border: '1.5px solid rgba(192,57,43,0.30)' }}
            initial={{ opacity: 0, x: -70, scale: 0.94 }}
            animate={{ opacity: phase >= 2 + i ? 1 : 0, x: phase >= 2 + i ? 0 : -70, scale: phase >= 2 + i ? 1 : 0.94 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-[10vw] flex-shrink-0">{p.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[5.8vw] font-arabic font-bold text-white leading-snug text-right">{p.ar}</span>
              <span className="text-[3.8vw] font-body text-white/40 leading-tight">{p.en}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transition hint */}
      <motion.div className="relative z-10 pb-[5vh] flex flex-col items-center gap-[1.5vh]"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}>
        <div className="text-[6vw] font-arabic text-[#E8C97A]">في حل لهاد الموضوع 👇</div>
        <motion.div className="text-[7vw]"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}>
          👇
        </motion.div>
      </motion.div>
    </div>
  );
}
