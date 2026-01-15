import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
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
    result: new URL("../assets/bgm/result.mp3", import.meta.url).href,
  },
  se: {
    correct: new URL("../assets/se/correct.mp3", import.meta.url).href,
    incorrect: new URL("../assets/se/incorrect.mp3", import.meta.url).href,
  },
} as const;

interface AudioContextValue {
  playMenuBGM: () => void;
  playGameBGM: (difficulty: "beginner" | "intermediate" | "advanced") => void;
  playResultBGM: () => void;
  playCorrectSE: () => void;
  playIncorrectSE: () => void;
  stopBGM: () => void;
  stopAllAudio: () => void;
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

  const playMenuBGM = useCallback(() => {
    audio.play(AUDIO_PATHS.bgm.menu, "bgm", true);
  }, [audio]);

  const playGameBGM = useCallback(
    (difficulty: "beginner" | "intermediate" | "advanced") => {
      audio.play(AUDIO_PATHS.bgm[difficulty], "bgm", true);
    },
    [audio]
  );

  const playResultBGM = useCallback(() => {
    audio.play(AUDIO_PATHS.bgm.result, "bgm", false);
  }, [audio]);

  const playCorrectSE = useCallback(() => {
    audio.play(AUDIO_PATHS.se.correct, "se");
  }, [audio]);

  const playIncorrectSE = useCallback(() => {
    audio.play(AUDIO_PATHS.se.incorrect, "se");
  }, [audio]);

  const stopBGM = useCallback(() => {
    audio.stop("bgm");
  }, [audio]);

  const stopAllAudio = useCallback(() => {
    audio.stop();
  }, [audio]);

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

  const contextValue: AudioContextValue = {
    playMenuBGM,
    playGameBGM,
    playResultBGM,
    playCorrectSE,
    playIncorrectSE,
    stopBGM,
    stopAllAudio,
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
