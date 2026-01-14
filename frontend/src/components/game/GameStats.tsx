import type { Difficulty } from "../../api/sampleText";

interface GameStatsProps {
  timeLeft: number;
  wpm: number;
  wordsCompleted: number;
  difficulty: Difficulty;
  getDifficultyLabel: (diff: Difficulty) => string;
}

export function GameStats({
  timeLeft,
  wpm,
  wordsCompleted,
  difficulty,
  getDifficultyLabel,
}: GameStatsProps) {
  return (
    <div className="flex justify-between mb-8">
      <div className="text-4xl font-bold text-cyan-400">{timeLeft}秒</div>
      <div className="text-right">
        <div className="text-gray-300">WPM: {wpm}</div>
        <div className="text-gray-300">完了: {wordsCompleted}</div>
        <div className="text-gray-400 text-sm">
          {getDifficultyLabel(difficulty)}
        </div>
      </div>
    </div>
  );
}
