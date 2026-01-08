import { useRef, useCallback, useState, useEffect } from "react";

export type AudioType = "bgm" | "se";

interface AudioConfig {
  volume: number;
  enabled: boolean;
}

interface UseAudioReturn {
  play: (src: string, type: AudioType, loop?: boolean) => void;
  stop: (type?: AudioType) => void;
  setVolume: (volume: number) => void;
  setEnabled: (type: AudioType, enabled: boolean) => void;
  config: {
    bgm: AudioConfig;
    se: AudioConfig;
  };
}

export const useAudio = (): UseAudioReturn => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const seRefs = useRef<HTMLAudioElement[]>([]);

  const [config, setConfig] = useState<{
    bgm: AudioConfig;
    se: AudioConfig;
  }>({
    bgm: { volume: 0.5, enabled: true },
    se: { volume: 0.5, enabled: true },
  });

  // BGMとSEで共通の音量設定を使用
  const commonVolume = config.bgm.volume;

  useEffect(() => {
    // ローカルストレージから設定を読み込み
    const savedConfig = localStorage.getItem("audioConfig");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
      } catch (error) {
        console.error("Failed to parse audio config:", error);
      }
    }
  }, []);

  useEffect(() => {
    // 設定をローカルストレージに保存
    localStorage.setItem("audioConfig", JSON.stringify(config));
  }, [config]);

  const play = useCallback(
    (src: string, type: AudioType, loop = false) => {
      if (!config[type].enabled) return;

      if (type === "bgm") {
        // BGM再生
        if (bgmRef.current) {
          bgmRef.current.pause();
          bgmRef.current = null;
        }

        const audio = new Audio(src);
        audio.loop = loop;
        audio.volume = commonVolume;

        audio.play().catch((error) => {
          console.error("Failed to play BGM:", error);
        });

        bgmRef.current = audio;
      } else {
        // SE再生（複数同時再生可能）
        const audio = new Audio(src);
        audio.volume = commonVolume;

        audio.play().catch((error) => {
          console.error("Failed to play SE:", error);
        });

        // 再生完了後に参照を削除
        audio.addEventListener("ended", () => {
          seRefs.current = seRefs.current.filter((ref) => ref !== audio);
        });

        seRefs.current.push(audio);
      }
    },
    [config, commonVolume]
  );

  const stop = useCallback((type?: AudioType) => {
    if (!type || type === "bgm") {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    }

    if (!type || type === "se") {
      seRefs.current.forEach((audio) => {
        audio.pause();
      });
      seRefs.current = [];
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));

    setConfig((prev) => ({
      bgm: { ...prev.bgm, volume: clampedVolume },
      se: { ...prev.se, volume: clampedVolume },
    }));

    // 現在再生中の音声の音量も更新
    if (bgmRef.current) {
      bgmRef.current.volume = clampedVolume;
    }

    seRefs.current.forEach((audio) => {
      audio.volume = clampedVolume;
    });
  }, []);

  const setEnabled = useCallback((type: AudioType, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      [type]: { ...prev[type], enabled },
    }));

    // BGMが無効化された場合は停止
    if (type === "bgm" && !enabled && bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current = null;
    }
  }, []);

  return {
    play,
    stop,
    setVolume,
    setEnabled,
    config,
  };
};
