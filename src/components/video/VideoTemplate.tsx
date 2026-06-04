import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { AudioPlayer } from './AudioPlayer';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  hook:     5000,
  problem:  7000,
  contrast: 8000,
  features: 8000,
  cta:      10000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook:     Scene1,
  problem:  Scene2,
  contrast: Scene3,
  features: Scene4,
  cta:      Scene5,
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
  const { currentSceneKey } = useVideoPlayer({ durations, loop });
  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  const SceneComponent = SCENE_COMPONENTS[currentSceneKey];
  return (
    <div className="w-full h-screen overflow-hidden relative bg-black text-white font-body">
      <AudioPlayer />
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
