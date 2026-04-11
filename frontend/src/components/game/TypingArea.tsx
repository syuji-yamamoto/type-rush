import { useState, useEffect } from "react";
import type { JapaneseText } from "../../types/types";

interface TypingAreaProps {
  isLoading: boolean;
  currentJapaneseText: JapaneseText | null;
  currentText: string;
  userInput: string;
  lastInputCorrect: boolean | null;
}

export function TypingArea({
  isLoading,
  currentJapaneseText,
  currentText,
  userInput,
  lastInputCorrect,
}: TypingAreaProps) {
  const [shaking, setShaking] = useState(false);
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lastInputCorrect === true && userInput.length > 0) {
      setPulseIndex(userInput.length - 1);
      const timer = setTimeout(() => setPulseIndex(null), 200);
      return () => clearTimeout(timer);
    }
    if (lastInputCorrect === false) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 300);
      return () => clearTimeout(timer);
    }
  }, [lastInputCorrect, userInput.length]);

  return (
    <div
      className={`bg-slate-800 rounded-lg p-6 mb-4 transition-all ${
        shaking ? "animate-shake" : ""
      }`}
    >
      {isLoading ? (
        <div className="text-center text-gray-400 py-8">読み込み中...</div>
      ) : (
        <>
          {/* 日本語の場合：ルビ表示 */}
          {currentJapaneseText && (
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
          <p className="text-2xl text-gray-300 font-mono mb-4 leading-relaxed tracking-wider">
            {currentText.split("").map((char, index) => {
              let className = "text-gray-500 inline-block";
              if (index < userInput.length) {
                className =
                  userInput[index] === char
                    ? "text-green-400 inline-block"
                    : "text-red-400 inline-block";
              } else if (index === userInput.length) {
                className =
                  "text-white inline-block border-b-2 border-cyan-400";
              }
              if (index === pulseIndex) {
                className += " animate-char-pulse";
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
