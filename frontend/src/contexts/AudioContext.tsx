import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useAudio } from "../hooks/useAudio";

// 音源パスの定数定義
export const AUDIO_PATHS = {
  bgm: {
    menu: new URL("../assets/bgm/menu.mp3", import.meta.url).href,
    beginner: new URL("../assets/bgm/beginner.mp3", import.meta.url).href,
    intermediate: new URL("../assets/bgm/intermediate.mp3", import.meta.url)
      .href,
    advanced: new URL("../assets/bgm/advanced.mp3", import.meta.url).href,
  },
  se: {
    correct: new URL("../assets/se/correct.mp3", import.meta.url).href,
    incorrect: new URL("../assets/se/incorrect.mp3", import.meta.url).href,
    result: new URL("../assets/se/result.mp3", import.meta.url).href,
  },
} as const;

// BGMシーンの型定義
export type BGMScene =
  | "menu" // /home, /login, /register, /results, /game(準備画面)
  | "game-beginner" // /game 初級
  | "game-intermediate" // /game 中級
  | "game-advanced" // /game 上級
  | "silent"; // BGMなし（ゲーム終了画面など）

interface AudioContextValue {
  // シーンベースのBGM管理
  setBGMScene: (scene: BGMScene) => void;
  currentBGMScene: BGMScene;

  // SE再生
  playCorrectSE: () => void;
  playIncorrectSE: () => void;
  playResultSE: () => void;

  // 設定管理
  setVolume: (volume: number) => void;
  setBGMEnabled: (enabled: boolean) => void;
  setSEEnabled: (enabled: boolean) => void;
  config: {
    bgm: {
      volume: number;
      enabled: boolean;
    };
    se: {
      volume: number;
      enabled: boolean;
    };
  };
}

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audio = useAudio();
  const currentSceneRef = useRef<BGMScene>("silent");
  const resultSEPlayedRef = useRef<boolean>(false);
  const previousBGMEnabledRef = useRef<boolean>(audio.config.bgm.enabled);

  // BGMシーンに対応するオーディオパスを取得
  const getBGMPathForScene = useCallback((scene: BGMScene): string | null => {
    switch (scene) {
      case "menu":
        return AUDIO_PATHS.bgm.menu;
      case "game-beginner":
        return AUDIO_PATHS.bgm.beginner;
      case "game-intermediate":
        return AUDIO_PATHS.bgm.intermediate;
      case "game-advanced":
        return AUDIO_PATHS.bgm.advanced;
      case "silent":
        return null;
      default:
        return null;
    }
  }, []);

  // BGMシーンを設定
  const setBGMScene = useCallback(
    (scene: BGMScene) => {
      // 同じシーンなら何もしない
      if (currentSceneRef.current === scene) {
        return;
      }

      currentSceneRef.current = scene;
      const bgmPath = getBGMPathForScene(scene);

      if (bgmPath) {
        audio.play(bgmPath, "bgm", true);
        // シーンが変わったらresult SE再生フラグをリセット
        resultSEPlayedRef.current = false;
      } else {
        audio.stop("bgm");
      }
    },
    [audio, getBGMPathForScene]
  );

  // SE再生関数
  const playCorrectSE = useCallback(() => {
    audio.play(AUDIO_PATHS.se.correct, "se");
  }, [audio]);

  const playIncorrectSE = useCallback(() => {
    audio.play(AUDIO_PATHS.se.incorrect, "se");
  }, [audio]);

  // ゲーム終了SE（一度だけ再生）
  const playResultSE = useCallback(() => {
    if (!resultSEPlayedRef.current) {
      audio.play(AUDIO_PATHS.se.result, "se");
      resultSEPlayedRef.current = true;
    }
  }, [audio]);

  // 設定変更関数
  const setBGMEnabled = useCallback(
    (enabled: boolean) => {
      audio.setEnabled("bgm", enabled);
    },
    [audio]
  );

  const setSEEnabled = useCallback(
    (enabled: boolean) => {
      audio.setEnabled("se", enabled);
    },
    [audio]
  );

  // BGM有効/無効の切り替えを監視して、適切に再生/停止
  useEffect(() => {
    const currentEnabled = audio.config.bgm.enabled;
    const previousEnabled = previousBGMEnabledRef.current;

    // BGMが有効化された場合、現在のシーンのBGMを再生
    if (currentEnabled && !previousEnabled) {
      const bgmPath = getBGMPathForScene(currentSceneRef.current);
      if (bgmPath) {
        audio.play(bgmPath, "bgm", true);
      }
    }

    previousBGMEnabledRef.current = currentEnabled;
  }, [audio, audio.config.bgm.enabled, getBGMPathForScene]);

  // コンポーネントのアンマウント時にオーディオをクリーンアップ
  useEffect(() => {
    return () => {
      audio.stop();
    };
  }, [audio]);

  const contextValue: AudioContextValue = {
    setBGMScene,
    currentBGMScene: currentSceneRef.current,
    playCorrectSE,
    playIncorrectSE,
    playResultSE,
    setVolume: audio.setVolume,
    setBGMEnabled,
    setSEEnabled,
    config: audio.config,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
