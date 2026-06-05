import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LEFT_ITEMS = [
  { e: '😭', t: 'بيكي من الدراسة' },
  { e: '📚', t: 'كتب من كل مكان' },
  { e: '☕', t: 'قهوة ٥ صحيح' },
  { e: '😰', t: 'ما نام من أسبوع' },
];
const RIGHT_ITEMS = [
  { e: '😎', t: 'ثقة بنفسه' },
  { e: '🧳', t: 'حجز رحلة كمان' },
  { e: '✅', t: 'حقيبة النسمة جاهزة' },
  { e: '🎉', t: 'مستنى ينخلص' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 750),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1650),
      setTimeout(() => setPhase(5), 2100),
      setTimeout(() => setPhase(6), 4800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div data-scene="2" className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #04060F 0%, #080A1A 100%)' }}>

      {/* Header */}
      <motion.div className="relative z-10 pt-[7vh] flex flex-col items-center gap-[1vh]"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-[4vw] font-body tracking-[0.4em] text-white/25 uppercase">Types of Bac students</div>
        <div className="text-[8.5vw] font-arabic font-black text-white leading-none">نوعان من الطلاب 😭😎</div>
        <div className="mt-[1.5vh] h-[2px] w-[50vw]"
          style={{ background: 'linear-gradient(90deg, rgba(231,76,60,0.6), transparent, rgba(232,201,122,0.6))' }} />
      </motion.div>

      {/* Two columns */}
      <div className="relative z-10 flex-1 flex gap-[3vw] px-[4vw] mt-[3vh] pb-[4vh]">

        {/* LEFT — stressed student */}
        <motion.div className="flex-1 flex flex-col gap-[2vh] rounded-[3vw] px-[3vw] py-[3vh]"
          style={{ background: 'rgba(231,76,60,0.08)', border: '1.5px solid rgba(231,76,60,0.30)' }}
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: phase >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.55 }}>
          <div className="text-center">
            <div className="text-[9vw]">😰</div>
            <div className="text-[4.8vw] font-arabic font-bold text-red-400">الطالب العادي</div>
          </div>
          <div className="h-[1px] bg-red-500/20" />
          {LEFT_ITEMS.map((item, i) => (
            <motion.div key={i} className="flex items-center gap-[2vw]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: phase >= 3 + Math.floor(i / 1.5) ? 1 : 0, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}>
              <span className="text-[6.5vw]">{item.e}</span>
              <span className="text-[3.8vw] font-arabic text-white/70 leading-tight">{item.t}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* VS */}
        <div className="flex items-center">
          <motion.div className="text-[5vw] font-black text-[#E8C97A] font-body"
            initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}>VS</motion.div>
        </div>

        {/* RIGHT — Al Nasme student */}
        <motion.div className="flex-1 flex flex-col gap-[2vh] rounded-[3vw] px-[3vw] py-[3vh]"
          style={{ background: 'rgba(39,174,96,0.08)', border: '1.5px solid rgba(39,174,96,0.30)' }}
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: phase >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.55 }}>
          <div className="text-center">
            <div className="text-[9vw]">😎</div>
            <div className="text-[4.8vw] font-arabic font-bold text-green-400">طالب النسمة</div>
          </div>
          <div className="h-[1px] bg-green-500/20" />
          {RIGHT_ITEMS.map((item, i) => (
            <motion.div key={i} className="flex items-center gap-[2vw]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: phase >= 3 + Math.floor(i / 1.5) ? 1 : 0, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}>
              <span className="text-[6.5vw]">{item.e}</span>
              <span className="text-[3.8vw] font-arabic text-white/80 leading-tight">{item.t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className="relative z-10 pb-[4vh] flex justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}>
        <div className="text-[6vw] font-arabic text-[#E8C97A] font-bold">كن من الفريق الثاني 😎</div>
      </motion.div>
    </div>
  );
}
