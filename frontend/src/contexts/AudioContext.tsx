import React, { createContext, useContext, ReactNode } from "react";
import { useAudioConfig } from "../hooks/useAudioConfig";
import { useBGM } from "../hooks/useBGM";
import { useSoundEffect } from "../hooks/useSoundEffect";
import type { BGMScene } from "../config/audioConfig";

export type { BGMScene } from "../config/audioConfig";

interface AudioContextValue {
  setBGMScene: (scene: BGMScene) => void;
  playCorrectSE: () => void;
  playIncorrectSE: () => void;
  playResultSE: () => void;
  resetResultSEPlayed: () => void;
  setBGMEnabled: (enabled: boolean) => void;
  setSEEnabled: (enabled: boolean) => void;
  setBGMVolume: (volume: number) => void;
  setSEVolume: (volume: number) => void;
  config: {
    bgmVolume: number;
    seVolume: number;
    bgmEnabled: boolean;
    seEnabled: boolean;
  };
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const audioConfig = useAudioConfig();
  const { config } = audioConfig;

  const bgm = useBGM({
    volume: config.bgmVolume,
    enabled: config.bgmEnabled,
  });

  const se = useSoundEffect({
    volume: config.seVolume,
    enabled: config.seEnabled,
  });

  const value: AudioContextValue = {
    setBGMScene: bgm.setBGMScene,
    playCorrectSE: se.playCorrect,
    playIncorrectSE: se.playIncorrect,
    playResultSE: se.playResult,
    resetResultSEPlayed: se.resetResultPlayed,
    setBGMEnabled: audioConfig.setBGMEnabled,
    setSEEnabled: audioConfig.setSEEnabled,
    setBGMVolume: audioConfig.setBGMVolume,
    setSEVolume: audioConfig.setSEVolume,
    config,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
};

export const useAudioContext = (): AudioContextValue => {
  const context = useContext(AudioCtx);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
