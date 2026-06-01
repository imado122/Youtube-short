import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  open: 8000,
  build: 8000,
  showcase: 10000,
  energy: 10000,
  close: 9000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  open: Scene1,
  build: Scene2,
  showcase: Scene3,
  energy: Scene4,
  close: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black text-white font-body selection:bg-accent selection:text-white">
      {/* Persistent Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)` }}
        animate={{
          scale: [1, 1.2, 1.1, 1.3, 1.05][sceneIndex] ?? 1,
          rotate: [0, 5, -5, 10, 0][sceneIndex] ?? 0,
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }}
          animate={{
            x: ['-20%', '50%', '-10%', '30%', '-20%'][sceneIndex] ?? '-20%',
            y: ['-10%', '30%', '50%', '-20%', '-10%'][sceneIndex] ?? '-10%',
            scale: [1, 1.5, 0.8, 1.2, 1][sceneIndex] ?? 1,
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-15"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }}
          animate={{
            x: ['40%', '-10%', '60%', '-30%', '40%'][sceneIndex] ?? '40%',
            y: ['40%', '60%', '-10%', '50%', '40%'][sceneIndex] ?? '40%',
            scale: [1.2, 0.9, 1.4, 0.8, 1.2][sceneIndex] ?? 1.2,
          }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
      </div>

      {/* Persistent Grid Element */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-grid.png)` }}
        animate={{
          opacity: sceneIndex === 3 ? 0.6 : 0,
          scale: sceneIndex === 3 ? 1 : 1.5,
          y: sceneIndex === 3 ? '0%' : '10%',
        }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent Animated Accents */}
      <motion.div
        className="absolute h-[2px] bg-[var(--color-primary)] z-10 pointer-events-none"
        animate={{
          left: ['0%', '20%', '80%', '10%', '50%'][sceneIndex] ?? '0%',
          width: ['100%', '40%', '10%', '80%', '0%'][sceneIndex] ?? '100%',
          top: ['50%', '80%', '20%', '60%', '50%'][sceneIndex] ?? '50%',
          opacity: sceneIndex === 4 ? 0 : 0.8,
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
