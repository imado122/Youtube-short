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
    <div className="w-full h-screen overflow-hidden relative bg-[var(--color-bg-dark)] text-white font-body selection:bg-[var(--color-primary)] selection:text-[var(--color-bg-dark)]">
      {/* Persistent Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-luxury.png)` }}
        animate={{
          scale: [1, 1.05, 1.1, 1.05, 1][sceneIndex] ?? 1,
          rotate: [0, 2, -2, 1, 0][sceneIndex] ?? 0,
        }}
        transition={{ duration: 8, ease: 'easeInOut' }}
      />
      
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />

      {/* Persistent Animated Accents */}
      <motion.div
        className="absolute h-[1px] bg-[var(--color-primary)] z-10 pointer-events-none"
        animate={{
          left: ['0%', '10%', '70%', '10%', '20%'][sceneIndex] ?? '0%',
          width: ['0%', '30%', '15%', '50%', '60%'][sceneIndex] ?? '0%',
          top: ['15%', '85%', '25%', '65%', '50%'][sceneIndex] ?? '50%',
          opacity: sceneIndex === 0 || sceneIndex === 4 ? 0 : 0.4,
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}