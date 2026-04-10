import type { Difficulty } from "../../types/types";

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
  return (
    <div className="flex justify-between mb-8">
      <div className="text-4xl font-bold text-cyan-400">{timeLeft}秒</div>
      <div className="text-right">
        <div className="text-gray-300">KPM: {kpm}</div>
        <div className="text-gray-300">完了: {wordsCompleted}</div>
        <div className="text-gray-400 text-sm">
          {getDifficultyLabel(difficulty)}
        </div>
      </div>
    </div>
  );
}
