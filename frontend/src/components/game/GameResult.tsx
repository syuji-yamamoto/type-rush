import { Link } from "react-router-dom";
import type { Difficulty, Language } from "../../api/sampleText";

interface GameResultProps {
  wpm: number;
  accuracy: number;
  wordsCompleted: number;
  correctChars: number;
  language: Language;
  difficulty: Difficulty;
  isAuthenticated: boolean;
  scoreSaved: boolean;
  isSaving: boolean;
  onSaveScore: () => void;
  onRestart: () => void;
  getDifficultyLabel: (diff: Difficulty) => string;
}

export function GameResult({
  wpm,
  accuracy,
  wordsCompleted,
  correctChars,
  language,
  difficulty,
  isAuthenticated,
  scoreSaved,
  isSaving,
  onSaveScore,
  onRestart,
  getDifficultyLabel,
}: GameResultProps) {
  return (
    <div className="text-center">
      <h2 className="text-4xl text-white mb-8">結果</h2>
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-2 gap-6 text-left">
          <div>
            <p className="text-gray-400">WPM</p>
            <p className="text-4xl font-bold text-cyan-400">{wpm}</p>
          </div>
          <div>
            <p className="text-gray-400">精度</p>
            <p className="text-4xl font-bold text-green-400">{accuracy}%</p>
          </div>
          <div>
            <p className="text-gray-400">完了した文章</p>
            <p className="text-2xl text-white">{wordsCompleted}</p>
          </div>
          <div>
            <p className="text-gray-400">正確な文字数</p>
            <p className="text-2xl text-white">{correctChars}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            言語: {language === "english" ? "English" : "日本語"} / 難易度:{" "}
            {getDifficultyLabel(difficulty)}
          </p>
        </div>

        {/* スコア保存セクション（上級のみ） */}
        {isAuthenticated && difficulty === "advanced" && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            {scoreSaved ? (
              <p className="text-green-400">
                ✅ スコアを保存しました！
                <Link
                  to="/results"
                  className="underline ml-2 hover:text-green-300"
                >
                  履歴を見る
                </Link>
              </p>
            ) : (
              <button
                onClick={onSaveScore}
                disabled={isSaving}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {isSaving ? "保存中..." : "🏆 スコアを保存"}
              </button>
            )}
          </div>
        )}
        {isAuthenticated && difficulty !== "advanced" && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-yellow-400 text-sm">
              💡 上級をクリアするとスコアを保存できます
            </p>
          </div>
        )}
        {!isAuthenticated && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-yellow-400 text-sm">
              💡{" "}
              <Link to="/login" className="underline hover:text-yellow-300">
                ログイン
              </Link>
              して上級をクリアするとスコアを保存できます
            </p>
          </div>
        )}
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
