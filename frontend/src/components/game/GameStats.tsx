import { Timer, Zap, CheckCircle } from "lucide-react";
import type { Difficulty } from "../../types/types";
import { GAME_DURATION_SECONDS } from "../../config/gameConstants";

interface GameStatsProps {
  timeLeft: number;
  kpm: number;
  wordsCompleted: number;
  difficulty: Difficulty;
  getDifficultyLabel: (diff: Difficulty) => string;
}

export function GameStats({
  timeLeft,
  kpm,
  wordsCompleted,
  difficulty,
  getDifficultyLabel,
}: GameStatsProps) {
  const progress = (timeLeft / GAME_DURATION_SECONDS) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="mb-6">
      {/* プログレスバー */}
      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
            isUrgent
              ? "bg-red-500"
              : "bg-gradient-to-r from-cyan-500 to-purple-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ステータス表示 */}
      <div className="flex justify-between items-center">
        <div
          className={`flex items-center gap-2 text-4xl font-bold ${
            isUrgent ? "text-red-400 animate-timer-blink" : "text-cyan-400"
          }`}
        >
          <Timer className="w-8 h-8" />
          {timeLeft}秒
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-300">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-white">{kpm}</span>
            <span className="text-sm">KPM</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="font-bold text-white">{wordsCompleted}</span>
          </div>
          <span className="text-gray-500 text-sm">
            {getDifficultyLabel(difficulty)}
          </span>
        </div>
      </div>
    </div>
  );
}
