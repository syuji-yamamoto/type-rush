import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import type { JapaneseText } from "../types/types";

const japaneseTexts: JapaneseText[] = [
  {
    display: "今日はいい天気ですね",
    reading: "きょうはいいてんきですね",
    romaji: "kyouhaiitenkindesune",
  },
  {
    display: "プログラミングは楽しい",
    reading: "ぷろぐらみんぐはたのしい",
    romaji: "puroguraminguhatanoshii",
  },
  {
    display: "練習すれば上達します",
    reading: "れんしゅうすればじょうたつします",
    romaji: "renshuusurebajotatusimasu",
  },
  {
    display: "リアクトは便利なライブラリです",
    reading: "りあくとはべんりならいぶらりです",
    romaji: "riakutohabennrinaraiburari",
  },
  {
    display: "タイプスクリプトを使おう",
    reading: "たいぷすくりぷとをつかおう",
    romaji: "taipusukuriputowotsukaou",
  },
];

// 英語サンプルテキスト
const sampleTexts = [
  "the quick brown fox jumps over the lazy dog",
  "programming is the art of telling a computer what to do",
  "practice makes perfect when it comes to typing",
  "react is a javascript library for building user interfaces",
  "typescript adds static type checking to javascript",
];

function Game() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready"
  );
  const [language, setLanguage] = useState<"english" | "japanese">("english");
  const [currentText, setCurrentText] = useState("");
  const [currentJapaneseText, setCurrentJapaneseText] =
    useState<JapaneseText | null>(null);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // テキストをランダムに選択
  const getRandomText = useCallback(() => {
    if (language === "japanese") {
      const text =
        japaneseTexts[Math.floor(Math.random() * japaneseTexts.length)];
      setCurrentJapaneseText(text);
      return text.romaji;
    } else {
      setCurrentJapaneseText(null);
      return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    }
  }, [language]);

  // ゲーム開始
  const startGame = useCallback(() => {
    setGameState("playing");
    setCurrentText(getRandomText());
    setUserInput("");
    setTimeLeft(60);
    setCorrectChars(0);
    setTotalChars(0);
    setWordsCompleted(0);
    inputRef.current?.focus();
  }, [getRandomText]);

  // タイマー
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 入力処理
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "playing" || isComposing) return;

    const value = e.target.value.toLowerCase();
    setUserInput(value);
    setTotalChars((prev) => prev + 1);

    // 正解チェック
    if (value === currentText) {
      console.log(value);

      setCorrectChars((prev) => prev + currentText.length);
      setWordsCompleted((prev) => prev + 1);
      setCurrentText(getRandomText());
      setUserInput("");
    } else if (currentText.startsWith(value)) {
      // 途中まで正解
    }
  };

  // IME入力の開始・終了を検知
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    // IME確定後の入力処理
    if (gameState === "playing") {
      const value = (e.target as HTMLInputElement).value.toLowerCase();
      setUserInput(value);
      setTotalChars((prev) => prev + 1);

      if (value === currentText) {
        setCorrectChars((prev) => prev + currentText.length);
        setWordsCompleted((prev) => prev + 1);
        setCurrentText(getRandomText());
        setUserInput("");
      }
    }
  };

  // WPM計算
  const calculateWPM = () => {
    const minutes = (60 - timeLeft) / 60 || 1;
    return Math.round(correctChars / 5 / minutes);
  };

  // 精度計算
  const calculateAccuracy = () => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* ヘッダー */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-gray-300 hover:text-white">
          ← ホームに戻る
        </Link>
      </div>

      {/* 音量コントロール */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-gray-300 hover:text-white"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24"
          disabled={isMuted}
        />
      </div>

      {/* ゲーム画面 */}
      <div className="w-full max-w-2xl">
        {gameState === "ready" && (
          <div className="text-center">
            <h2 className="text-3xl text-white mb-8">準備はいいですか？</h2>

            {/* 言語選択 */}
            <div className="mb-8">
              <p className="text-gray-300 mb-4">言語を選択:</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setLanguage("english")}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    language === "english"
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("japanese")}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    language === "japanese"
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  日本語
                </button>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              スタート
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div>
            {/* タイマーとスコア */}
            <div className="flex justify-between mb-8">
              <div className="text-4xl font-bold text-cyan-400">
                {timeLeft}秒
              </div>
              <div className="text-right">
                <div className="text-gray-300">WPM: {calculateWPM()}</div>
                <div className="text-gray-300">完了: {wordsCompleted}</div>
              </div>
            </div>

            {/* タイピングエリア */}
            <div className="bg-slate-800 rounded-lg p-6 mb-4">
              {/* 日本語の場合：ルビ表示 */}
              {language === "japanese" && currentJapaneseText && (
                <div className="mb-4">
                  <p className="text-3xl text-white mb-2 leading-relaxed">
                    {currentJapaneseText.display
                      .split("")
                      .map((char, index) => {
                        // 入力状態に基づく色分け
                        let rubyClassName = "text-gray-400 text-sm";

                        // 簡易的な進捗計算（入力の進行度合い）
                        const progress = userInput.length / currentText.length;
                        const charProgress =
                          index / currentJapaneseText.display.length;

                        if (charProgress < progress) {
                          // 入力済みの部分
                          const isCorrect = currentText.startsWith(userInput);
                          rubyClassName = isCorrect
                            ? "text-green-400 text-sm font-bold"
                            : "text-red-400 text-sm font-bold";
                        }

                        return (
                          <ruby key={index}>
                            {char}
                            <rt className={rubyClassName}>
                              {currentJapaneseText.reading[index] || ""}
                            </rt>
                          </ruby>
                        );
                      })}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    ローマ字入力: {currentJapaneseText.romaji}
                  </div>
                </div>
              )}

              {/* ローマ字/英語表示 */}
              <p className="text-2xl text-gray-300 font-mono mb-4 leading-relaxed">
                {currentText.split("").map((char, index) => {
                  let className = "text-gray-500";
                  if (index < userInput.length) {
                    className =
                      userInput[index] === char
                        ? "text-green-400"
                        : "text-red-400 bg-red-900/30";
                  } else if (index === userInput.length) {
                    className = "text-white border-l-2 border-cyan-400";
                  }
                  return (
                    <span key={index} className={className}>
                      {char}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* 入力フィールド */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInput}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              className="w-full bg-slate-700 text-white text-xl p-4 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={
                language === "japanese" ? "ローマ字で入力..." : "ここに入力..."
              }
              autoFocus
            />
          </div>
        )}

        {gameState === "finished" && (
          <div className="text-center">
            <h2 className="text-4xl text-white mb-8">結果</h2>
            <div className="bg-slate-800 rounded-lg p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-gray-400">WPM</p>
                  <p className="text-4xl font-bold text-cyan-400">
                    {calculateWPM()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">精度</p>
                  <p className="text-4xl font-bold text-green-400">
                    {calculateAccuracy()}%
                  </p>
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
            </div>
            <div className="space-x-4">
              <button
                onClick={startGame}
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
        )}
      </div>
    </div>
  );
}

export default Game;
