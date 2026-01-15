import type { JapaneseText } from "../../types/types";
import type { Language } from "../../api/sampleText";

interface TypingAreaProps {
  isLoading: boolean;
  language: Language;
  currentJapaneseText: JapaneseText | null;
  currentText: string;
  userInput: string;
}

export function TypingArea({
  isLoading,
  language,
  currentJapaneseText,
  currentText,
  userInput,
}: TypingAreaProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-4">
      {isLoading ? (
        <div className="text-center text-gray-400 py-8">読み込み中...</div>
      ) : (
        <>
          {/* 日本語の場合：ルビ表示 */}
          {language === "japanese" && currentJapaneseText && (
            <div className="mb-4">
              <p className="text-3xl text-white mb-2 leading-relaxed">
                <ruby>
                  {currentJapaneseText.display.split("").map((char, index) => {
                    return (
                      <span key={index} className="text-4xl font-bold">
                        {char}
                      </span>
                    );
                  })}
                  <rt className="text-gray-400 text-base font-bold">
                    {currentJapaneseText.reading}
                  </rt>
                </ruby>
              </p>
            </div>
          )}

          {/* ローマ字/英語表示 */}
          <p className="text-2xl text-gray-300 font-mono mb-4 leading-relaxed">
            {currentText.split("").map((char, index) => {
              let className = "text-gray-400";
              if (index < userInput.length) {
                className =
                  userInput[index] === char ? "text-green-400" : "text-red-400";
              }
              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
          </p>
        </>
      )}
    </div>
  );
}
