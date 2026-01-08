import React from "react";
import { useAudioContext } from "../contexts/AudioContext";

interface AudioControlProps {
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  className = "",
}) => {
  const {
    setVolume: setAudioVolume,
    setBGMEnabled,
    setSEEnabled,
    config,
  } = useAudioContext();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setBGMEnabled(!config.bgm.enabled)}
          className="text-gray-300 hover:text-white text-sm"
          title={config.bgm.enabled ? "BGMをオフ" : "BGMをオン"}
        >
          BGM: {config.bgm.enabled ? "🔊" : "🔇"}
        </button>
        <button
          onClick={() => setSEEnabled(!config.se.enabled)}
          className="text-gray-300 hover:text-white text-sm"
          title={config.se.enabled ? "SEをオフ" : "SEをオン"}
        >
          SE: {config.se.enabled ? "🔊" : "🔇"}
        </button>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={config.bgm.volume * 100}
        onChange={(e) => setAudioVolume(Number(e.target.value) / 100)}
        className="w-24"
        title="音量調節"
      />
      <span className="text-gray-300 text-sm w-8">
        {Math.round(config.bgm.volume * 100)}
      </span>
    </div>
  );
};
