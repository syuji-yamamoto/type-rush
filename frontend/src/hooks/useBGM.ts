import { useRef, useCallback, useEffect } from "react";
import {
  AUDIO_PATHS,
  BGM_FADE_DURATION_MS,
  type BGMScene,
} from "../config/audioConfig";

interface UseBGMOptions {
  volume: number;
  enabled: boolean;
}

export interface UseBGMReturn {
  setBGMScene: (scene: BGMScene) => void;
  currentScene: () => BGMScene;
}

export const useBGM = ({ volume, enabled }: UseBGMOptions): UseBGMReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSceneRef = useRef<BGMScene>("silent");
  const fadeTimerRef = useRef<number | null>(null);

  const cancelFade = () => {
    if (fadeTimerRef.current !== null) {
      cancelAnimationFrame(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeOut = useCallback(
    (audio: HTMLAudioElement, onComplete: () => void) => {
      cancelFade();
      const startVolume = audio.volume;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / BGM_FADE_DURATION_MS, 1);
        audio.volume = startVolume * (1 - progress);

        if (progress < 1) {
          fadeTimerRef.current = requestAnimationFrame(tick);
        } else {
          audio.pause();
          audio.currentTime = 0;
          fadeTimerRef.current = null;
          onComplete();
        }
      };

      fadeTimerRef.current = requestAnimationFrame(tick);
    },
    []
  );

  const fadeIn = useCallback(
    (audio: HTMLAudioElement, targetVolume: number) => {
      cancelFade();
      audio.volume = 0;
      audio.play().catch((err) => console.error("BGM再生失敗:", err));

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / BGM_FADE_DURATION_MS, 1);
        audio.volume = targetVolume * progress;

        if (progress < 1) {
          fadeTimerRef.current = requestAnimationFrame(tick);
        } else {
          fadeTimerRef.current = null;
        }
      };

      fadeTimerRef.current = requestAnimationFrame(tick);
    },
    []
  );

  const playBGM = useCallback(
    (scene: BGMScene) => {
      if (scene === "silent") {
        if (audioRef.current && !audioRef.current.paused) {
          fadeOut(audioRef.current, () => {
            audioRef.current = null;
          });
        }
        return;
      }

      const src = AUDIO_PATHS.bgm[scene];
      if (!src) return;

      const startNew = () => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.preload = "auto";
        audioRef.current = audio;

        audio.addEventListener(
          "canplaythrough",
          () => {
            if (audioRef.current === audio) {
              fadeIn(audio, volume);
            }
          },
          { once: true }
        );

        audio.load();
      };

      if (audioRef.current && !audioRef.current.paused) {
        fadeOut(audioRef.current, startNew);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        startNew();
      }
    },
    [volume, fadeOut, fadeIn]
  );

  const setBGMScene = useCallback(
    (scene: BGMScene) => {
      if (currentSceneRef.current === scene) return;
      currentSceneRef.current = scene;

      if (!enabled) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        return;
      }

      playBGM(scene);
    },
    [enabled, playBGM]
  );

  // BGM有効/無効の切り替え
  useEffect(() => {
    if (enabled) {
      const scene = currentSceneRef.current;
      if (scene !== "silent" && !audioRef.current) {
        playBGM(scene);
      }
    } else {
      cancelFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [enabled, playBGM]);

  // 音量変更の反映
  useEffect(() => {
    if (audioRef.current && !audioRef.current.paused && fadeTimerRef.current === null) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      cancelFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const currentScene = useCallback(() => currentSceneRef.current, []);

  return { setBGMScene, currentScene };
};
