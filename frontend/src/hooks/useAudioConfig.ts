import { useState, useEffect, useCallback } from "react";
import {
  AUDIO_DEFAULTS,
  AUDIO_CONFIG_STORAGE_KEY,
} from "../config/audioConfig";

export interface AudioConfigState {
  bgmVolume: number;
  seVolume: number;
  bgmEnabled: boolean;
  seEnabled: boolean;
}

export interface UseAudioConfigReturn {
  config: AudioConfigState;
  setBGMVolume: (volume: number) => void;
  setSEVolume: (volume: number) => void;
  setBGMEnabled: (enabled: boolean) => void;
  setSEEnabled: (enabled: boolean) => void;
}

function loadConfig(): AudioConfigState {
  try {
    const saved = localStorage.getItem(AUDIO_CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        bgmVolume: parsed.bgm?.volume ?? AUDIO_DEFAULTS.bgmVolume,
        seVolume: parsed.se?.volume ?? AUDIO_DEFAULTS.seVolume,
        bgmEnabled: parsed.bgm?.enabled ?? AUDIO_DEFAULTS.bgmEnabled,
        seEnabled: parsed.se?.enabled ?? AUDIO_DEFAULTS.seEnabled,
      };
    }
  } catch {
    // ignore parse errors
  }
  return {
    bgmVolume: AUDIO_DEFAULTS.bgmVolume,
    seVolume: AUDIO_DEFAULTS.seVolume,
    bgmEnabled: AUDIO_DEFAULTS.bgmEnabled,
    seEnabled: AUDIO_DEFAULTS.seEnabled,
  };
}

function saveConfig(config: AudioConfigState): void {
  const legacy = {
    bgm: { volume: config.bgmVolume, enabled: config.bgmEnabled },
    se: { volume: config.seVolume, enabled: config.seEnabled },
  };
  localStorage.setItem(AUDIO_CONFIG_STORAGE_KEY, JSON.stringify(legacy));
}

export const useAudioConfig = (): UseAudioConfigReturn => {
  const [config, setConfig] = useState<AudioConfigState>(loadConfig);

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const setBGMVolume = useCallback((volume: number) => {
    setConfig((prev) => ({ ...prev, bgmVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setSEVolume = useCallback((volume: number) => {
    setConfig((prev) => ({ ...prev, seVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setBGMEnabled = useCallback((enabled: boolean) => {
    setConfig((prev) => ({ ...prev, bgmEnabled: enabled }));
  }, []);

  const setSEEnabled = useCallback((enabled: boolean) => {
    setConfig((prev) => ({ ...prev, seEnabled: enabled }));
  }, []);

  return { config, setBGMVolume, setSEVolume, setBGMEnabled, setSEEnabled };
};
