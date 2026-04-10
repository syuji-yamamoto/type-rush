import React from "react";
import { Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { useAudioContext } from "../contexts/AudioContext";

interface AudioControlProps {
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  className = "",
}) => {
  const { setBGMEnabled, setSEEnabled, config } = useAudioContext();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setBGMEnabled(!config.bgm.enabled)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
          config.bgm.enabled
            ? "text-cyan-400 hover:text-cyan-300 bg-slate-700/50"
            : "text-gray-500 hover:text-gray-400 bg-slate-800/50"
        }`}
        aria-label={config.bgm.enabled ? "BGMをオフにする" : "BGMをオンにする"}
        title={config.bgm.enabled ? "BGMをオフ" : "BGMをオン"}
      >
        {config.bgm.enabled ? (
          <Music className="w-4 h-4" />
        ) : (
          <Music2 className="w-4 h-4" />
        )}
        <span className="text-xs">BGM</span>
      </button>
      <button
        onClick={() => setSEEnabled(!config.se.enabled)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
          config.se.enabled
            ? "text-cyan-400 hover:text-cyan-300 bg-slate-700/50"
            : "text-gray-500 hover:text-gray-400 bg-slate-800/50"
        }`}
        aria-label={config.se.enabled ? "SEをオフにする" : "SEをオンにする"}
        title={config.se.enabled ? "SEをオフ" : "SEをオン"}
      >
        {config.se.enabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
        <span className="text-xs">SE</span>
      </button>
    </div>
  );
};
