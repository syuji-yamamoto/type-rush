import type { Difficulty, Language } from "../../types/types";

interface GameSetupProps {
  language: Language;
  difficulty: Difficulty;
  isLoading: boolean;
  isAuthenticated: boolean;
  availableDifficulties: Difficulty[];
  onLanguageChange: (language: Language) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
  getDifficultyLabel: (diff: Difficulty) => string;
}

export function GameSetup({
  language,
  difficulty,
  isLoading,
  availableDifficulties,
  onLanguageChange,
  onDifficultyChange,
  onStart,
  getDifficultyLabel,
}: GameSetupProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl text-white mb-8">準備はいいですか？</h2>

      {/* 言語選択 */}
      <div className="mb-6">
        <p className="text-gray-300 mb-4">言語を選択:</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onLanguageChange("japanese")}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              language === "japanese"
                ? "bg-cyan-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            日本語
          </button>
          <button
            onClick={() => onLanguageChange("english")}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              language === "english"
                ? "bg-cyan-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* 難易度選択 */}
      <div className="mb-8">
        <p className="text-gray-300 mb-4">難易度を選択:</p>
        <div className="flex justify-center gap-4">
          {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
            (diff) => {
              const isAvailable = availableDifficulties.includes(diff);
              return (
                <button
                  key={diff}
                  onClick={() => isAvailable && onDifficultyChange(diff)}
                  disabled={!isAvailable}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    difficulty === diff
                      ? "bg-cyan-500 text-white"
                      : isAvailable
                      ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {getDifficultyLabel(diff)}
                </button>
              );
            }
          )}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={isLoading}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "読み込み中..." : "スタート"}
      </button>
    </div>
  );
}
