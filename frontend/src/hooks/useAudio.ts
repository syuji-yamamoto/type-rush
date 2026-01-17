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
  const lastBgmSrcRef = useRef<string | null>(null);
  const lastBgmLoopRef = useRef<boolean>(false);

  const [config, setConfig] = useState<{
    bgm: AudioConfig;
    se: AudioConfig;
  }>(() => {
    // 初期化時にlocalStorageから設定を読み込み
    const savedConfig = localStorage.getItem("audioConfig");
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (error) {
        console.error("Failed to parse audio config:", error);
      }
    }
    return {
      bgm: { volume: 0.5, enabled: true },
      se: { volume: 0.5, enabled: true },
    };
  });

  // BGMとSEで共通の音量設定を使用
  const commonVolume = config.bgm.volume;

  // クリーンアップ処理：コンポーネントのアンマウント時に音声リソースを解放
  useEffect(() => {
    return () => {
      // クリーンアップ処理
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
      seRefs.current.forEach((audio) => audio.pause());
      seRefs.current = [];
    };
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
        // 既に同じBGMが再生中の場合は何もしない
        if (
          bgmRef.current &&
          lastBgmSrcRef.current === src &&
          !bgmRef.current.paused
        ) {
          return;
        }

        // 既存のBGMを停止
        if (bgmRef.current) {
          bgmRef.current.pause();
          bgmRef.current.currentTime = 0;
          bgmRef.current = null;
        }

        const audio = new Audio(src);
        audio.loop = loop;
        audio.volume = commonVolume;
        audio.preload = "auto"; // 事前読み込みを有効化

        // 音声ファイルのロードを待ってから再生
        audio.addEventListener(
          "canplaythrough",
          () => {
            audio.play().catch((error) => {
              console.error("Failed to play BGM:", error);
            });
          },
          { once: true }
        );

        // ロード開始
        audio.load();

        bgmRef.current = audio;
        // 最後に再生したBGMの情報を保存
        lastBgmSrcRef.current = src;
        lastBgmLoopRef.current = loop;
      } else {
        // SE再生（複数同時再生可能）
        const audio = new Audio(src);
        audio.volume = commonVolume;

        audio.play().catch((error) => {
          console.error("Failed to play SE:", error);
        });

        // 再生完了後に参照を削除（イベントリスナーのクリーンアップも含む）
        const handleEnded = () => {
          seRefs.current = seRefs.current.filter((ref) => ref !== audio);
          audio.removeEventListener("ended", handleEnded);
        };
        audio.addEventListener("ended", handleEnded);

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
        // イベントリスナーもクリーンアップ
        audio.removeEventListener("ended", audio.onended as EventListener);
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

    // SEが無効化された場合は停止
    if (type === "se" && !enabled) {
      seRefs.current.forEach((audio) => {
        audio.pause();
      });
      seRefs.current = [];
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
