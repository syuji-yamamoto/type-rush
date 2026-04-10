import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Music2, Settings } from "lucide-react";
import { useAudioContext } from "../contexts/AudioContext";

interface AudioControlProps {
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  className = "",
}) => {
  const {
    setBGMEnabled,
    setSEEnabled,
    setBGMVolume,
    setSEVolume,
    config,
  } = useAudioContext();

  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // パネル外クリックで閉じる
  useEffect(() => {
    if (!showPanel) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPanel]);

  return (
    <div className={`relative ${className}`} ref={panelRef}>
      {/* トグルボタン行 */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setBGMEnabled(!config.bgmEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
            config.bgmEnabled
              ? "text-cyan-400 hover:text-cyan-300 bg-slate-700/50"
              : "text-gray-500 hover:text-gray-400 bg-slate-800/50"
          }`}
          aria-label={config.bgmEnabled ? "BGMをオフにする" : "BGMをオンにする"}
          title={config.bgmEnabled ? "BGMをオフ" : "BGMをオン"}
        >
          {config.bgmEnabled ? (
            <Music className="w-4 h-4" />
          ) : (
            <Music2 className="w-4 h-4" />
          )}
          <span className="text-xs">BGM</span>
        </button>
        <button
          onClick={() => setSEEnabled(!config.seEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
            config.seEnabled
              ? "text-cyan-400 hover:text-cyan-300 bg-slate-700/50"
              : "text-gray-500 hover:text-gray-400 bg-slate-800/50"
          }`}
          aria-label={config.seEnabled ? "SEをオフにする" : "SEをオンにする"}
          title={config.seEnabled ? "SEをオフ" : "SEをオン"}
        >
          {config.seEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
          <span className="text-xs">SE</span>
        </button>
        <button
          onClick={() => setShowPanel((prev) => !prev)}
          className={`p-1.5 rounded-md text-sm transition-colors ${
            showPanel
              ? "text-cyan-400 bg-slate-700/50"
              : "text-gray-500 hover:text-gray-400 bg-slate-800/50"
          }`}
          aria-label="音量設定"
          title="音量設定"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* 音量パネル */}
      {showPanel && (
        <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl z-50 w-52">
          <div className="space-y-4">
            <VolumeSlider
              label="BGM"
              icon={<Music className="w-3.5 h-3.5" />}
              value={config.bgmVolume}
              enabled={config.bgmEnabled}
              onChange={setBGMVolume}
            />
            <VolumeSlider
              label="SE"
              icon={<Volume2 className="w-3.5 h-3.5" />}
              value={config.seVolume}
              enabled={config.seEnabled}
              onChange={setSEVolume}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function VolumeSlider({
  label,
  icon,
  value,
  enabled,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  enabled: boolean;
  onChange: (v: number) => void;
}) {
  return (
    <div className={enabled ? "opacity-100" : "opacity-40"}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-cyan-400">{icon}</span>
        <span className="text-xs text-gray-300 font-medium">{label}</span>
        <span className="text-xs text-gray-500 ml-auto">
          {Math.round(value * 100)}%
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(value * 100)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        disabled={!enabled}
        className="w-full h-1.5 bg-slate-600 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
