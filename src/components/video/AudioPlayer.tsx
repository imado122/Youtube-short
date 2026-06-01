import { useEffect } from 'react';

export function AudioPlayer() {
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let pulseInterval: ReturnType<typeof setInterval> | null = null;

    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 3);
      master.connect(ctx.destination);

      function osc(freq: number, type: OscillatorType, gainVal: number, lfoFreq?: number, lfoDepth?: number) {
        if (!ctx) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = gainVal;
        o.connect(g);
        g.connect(master);
        if (lfoFreq && lfoDepth) {
          const lfo = ctx.createOscillator();
          const lg = ctx.createGain();
          lfo.frequency.value = lfoFreq;
          lg.gain.value = lfoDepth;
          lfo.connect(lg);
          lg.connect(o.frequency);
          lfo.start();
        }
        o.start();
        return o;
      }

      // Luxury ambient drone — A minor atmosphere
      osc(55,  'sine',     0.55);          // A1 deep sub bass
      osc(110, 'sine',     0.20);          // A2 bass
      osc(220, 'triangle', 0.08);          // A3 mid
      osc(330, 'sine',     0.05, 0.4, 8);  // E4 fifth, slow vibrato
      osc(440, 'sine',     0.03, 0.25, 5); // A4 shimmer
      osc(660, 'sine',     0.02, 0.6, 10); // E5 high shimmer

      // Rhythmic accent pulse every 2 seconds
      pulseInterval = setInterval(() => {
        if (!ctx) return;
        const p = ctx.createOscillator();
        const pg = ctx.createGain();
        p.type = 'sine';
        p.frequency.setValueAtTime(110, ctx.currentTime);
        p.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.3);
        pg.gain.setValueAtTime(0.25, ctx.currentTime);
        pg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        p.connect(pg);
        pg.connect(master);
        p.start();
        p.stop(ctx.currentTime + 0.65);
      }, 2000);

    } catch {
      // Audio not supported in this environment — silently skip
    }

    return () => {
      if (pulseInterval) clearInterval(pulseInterval);
      if (ctx) {
        try {
          ctx.close();
        } catch { /* ignore */ }
      }
    };
  }, []);

  return null;
}
