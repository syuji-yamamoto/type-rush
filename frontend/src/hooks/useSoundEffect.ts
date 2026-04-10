import { useRef, useCallback, useEffect } from "react";
import { AUDIO_PATHS, SE_POOL_MAX_SIZE } from "../config/audioConfig";

type SEKey = keyof typeof AUDIO_PATHS.se;

interface UseSoundEffectOptions {
  volume: number;
  enabled: boolean;
}

export interface UseSoundEffectReturn {
  playCorrect: () => void;
  playIncorrect: () => void;
  playResult: () => void;
  resetResultPlayed: () => void;
}

export const useSoundEffect = ({
  volume,
  enabled,
}: UseSoundEffectOptions): UseSoundEffectReturn => {
  const poolRef = useRef<HTMLAudioElement[]>([]);
  const resultPlayedRef = useRef(false);

  const playSE = useCallback(
    (key: SEKey) => {
      if (!enabled) return;

      const src = AUDIO_PATHS.se[key];
      const audio = new Audio(src);
      audio.volume = volume;

      audio.addEventListener(
        "error",
        () => {
          const code = audio.error?.code;
          const msg = audio.error?.message;
          console.error(`SE読み込み失敗 (${key}): code=${code}, message=${msg}, src=${src}`);
        },
        { once: true }
      );

      audio.play().catch((err) => console.error("SE再生失敗:", err));

      const handleEnded = () => {
        poolRef.current = poolRef.current.filter((a) => a !== audio);
        audio.removeEventListener("ended", handleEnded);
      };
      audio.addEventListener("ended", handleEnded);

      poolRef.current.push(audio);

      // プールサイズ制限（古いものから停止）
      while (poolRef.current.length > SE_POOL_MAX_SIZE) {
        const oldest = poolRef.current.shift();
        if (oldest) {
          oldest.pause();
          oldest.removeEventListener("ended", () => {});
        }
      }
    },
    [volume, enabled]
  );

  const playCorrect = useCallback(() => playSE("correct"), [playSE]);
  const playIncorrect = useCallback(() => playSE("incorrect"), [playSE]);

  const playResult = useCallback(() => {
    if (!resultPlayedRef.current) {
      playSE("result");
      resultPlayedRef.current = true;
    }
  }, [playSE]);

  const resetResultPlayed = useCallback(() => {
    resultPlayedRef.current = false;
  }, []);

  // クリーンアップ
  useEffect(() => {
    return () => {
      poolRef.current.forEach((audio) => audio.pause());
      poolRef.current = [];
    };
  }, []);

  // SE無効化時に全停止
  useEffect(() => {
    if (!enabled) {
      poolRef.current.forEach((audio) => audio.pause());
      poolRef.current = [];
    }
  }, [enabled]);

  return { playCorrect, playIncorrect, playResult, resetResultPlayed };
};
