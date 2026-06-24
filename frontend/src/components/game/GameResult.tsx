import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Type, Keyboard, Flame, Share2, Check } from "lucide-react";
import type { Difficulty } from "../../types/types";
import { calculateWPMEquivalent } from "../../utils/gameUtils";
import { getRank } from "../../config/theme";

interface GameResultProps {
  kpm: number;
  accuracy: number;
  wordsCompleted: number;
  correctChars: number;
  maxCombo: number;
  difficulty: Difficulty;
  onRestart: () => void;
  getDifficultyLabel: (diff: Difficulty) => string;
}

export function GameResult({
  kpm,
  accuracy,
  wordsCompleted,
  correctChars,
  maxCombo,
  difficulty,
  onRestart,
  getDifficultyLabel,
}: GameResultProps) {
  const [copied, setCopied] = useState(false);
  const rankInfo = getRank(kpm);

  const handleShare = async () => {
    const text = [
      `TypeRush - タイピング結果`,
      `ランク: ${rankInfo.rank} (${rankInfo.label})`,
      `KPM: ${kpm} | 精度: ${accuracy}% | コンボ: ${maxCombo}`,
      `言語: 日本語 / ${getDifficultyLabel(difficulty)}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl text-white mb-4">結果</h2>

      {/* ランク表示 */}
      <div className="mb-6 animate-rank-reveal">
        <div
          className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 ${
            rankInfo.rank === "S"
              ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
              : rankInfo.rank === "A"
                ? "border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)]"
                : "border-slate-600"
          }`}
        >
          <span className={`text-5xl font-black ${rankInfo.color}`}>
            {rankInfo.rank}
          </span>
          <span className="text-gray-400 text-xs mt-1">{rankInfo.label}</span>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        {/* スタッツカード */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Keyboard className="w-4 h-4" />
              <span className="text-sm">KPM</span>
            </div>
            <p className="text-4xl font-bold text-cyan-400">{kpm}</p>
            <p className="text-gray-500 text-xs mt-1">
              WPM換算: {calculateWPMEquivalent(kpm)}
            </p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm">精度</span>
            </div>
            <p className="text-4xl font-bold text-green-400">{accuracy}%</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Type className="w-4 h-4" />
              <span className="text-sm">完了した文章</span>
            </div>
            <p className="text-2xl font-bold text-white">{wordsCompleted}</p>
            <p className="text-gray-500 text-xs mt-1">
              正確な文字数: {correctChars}
            </p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Flame className="w-4 h-4" />
              <span className="text-sm">最大コンボ</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{maxCombo}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            言語: 日本語 / 難易度: {getDifficultyLabel(difficulty)}
          </p>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
            title="結果をコピー"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">コピー済み</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>共有</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="space-x-4">
        <button
          onClick={onRestart}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
        >
          もう一度
        </button>
        <Link
          to="/"
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
