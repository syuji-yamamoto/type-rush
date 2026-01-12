import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import type { JapaneseText } from "../types/types";
import {
  getRandomSampleText,
  type Difficulty,
  type Language,
} from "../api/sampleText";
import { saveScore } from "../api/score";
import { useAuth } from "../contexts/AuthContext";
import { useAudioContext } from "../contexts/AudioContext";
import { AudioControl } from "../components/AudioControl";

// フォールバック用のローカルテキスト（API障害時用）
const fallbackJapaneseTexts: JapaneseText[] = [
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
];

const fallbackEnglishTexts = [
  "the quick brown fox jumps over the lazy dog",
  "programming is the art of telling a computer what to do",
];

function Game() {
  const { isAuthenticated } = useAuth();
  const {
    playMenuBGM,
    playGameBGM,
    playCorrectSE,
    playIncorrectSE,
    stopBGM,
    playResultBGM,
  } = useAudioContext();
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready"
  );
  const [language, setLanguage] = useState<Language>("japanese");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [currentText, setCurrentText] = useState("");
  const [currentJapaneseText, setCurrentJapaneseText] =
    useState<JapaneseText | null>(null);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [imeWarning, setImeWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 利用可能な難易度を取得
  const getAvailableDifficulties = (): Difficulty[] => {
    if (isAuthenticated) {
      return ["beginner", "intermediate", "advanced"];
    }
    return ["beginner"];
  };

  useEffect(() => {
    // ページマウント時にメニューBGMを再生（マウント時のみ実行）
    playMenuBGM();

    // コンポーネントのアンマウント時にBGMを停止
    return () => {
      stopBGM();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // APIからテキストを取得
  const fetchRandomText = useCallback(async (): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await getRandomSampleText(language, difficulty);

      if (language === "japanese") {
        setCurrentJapaneseText({
          display: response.display_text || "",
          reading: response.reading || "",
          romaji: response.text,
        });
        return response.text;
      } else {
        setCurrentJapaneseText(null);
        return response.text;
      }
    } catch (error) {
      console.error("サンプルテキストの取得に失敗しました:", error);
      // フォールバック：ローカルテキストを使用
      if (language === "japanese") {
        const text =
          fallbackJapaneseTexts[
            Math.floor(Math.random() * fallbackJapaneseTexts.length)
          ];
        setCurrentJapaneseText(text);
        return text.romaji;
      } else {
        setCurrentJapaneseText(null);
        return fallbackEnglishTexts[
          Math.floor(Math.random() * fallbackEnglishTexts.length)
        ];
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, difficulty]);

  // 次のテキストを取得
  const getNextText = useCallback(async () => {
    try {
      const text = await fetchRandomText();
      setCurrentText(text);
    } catch (error) {
      console.error("次のテキストの取得に失敗しました:", error);

      // 想定外のエラー発生時もゲームが継続できるようにローカルフォールバックを使用
      if (language === "japanese") {
        const text =
          fallbackJapaneseTexts[
            Math.floor(Math.random() * fallbackJapaneseTexts.length)
          ];
        setCurrentJapaneseText(text);
        setCurrentText(text.romaji);
      } else {
        setCurrentJapaneseText(null);
        const text =
          fallbackEnglishTexts[
            Math.floor(Math.random() * fallbackEnglishTexts.length)
          ];
        setCurrentText(text);
      }
    }
  }, [fetchRandomText, language]);
  // ゲーム開始
  const startGame = useCallback(async () => {
    setGameState("playing");
    setUserInput("");
    setTimeLeft(60);
    setCorrectChars(0);
    setTotalChars(0);
    setWordsCompleted(0);
    setScoreSaved(false);
    setCurrentSessionId(`${Date.now()}-${Math.random()}`);

    // 難易度に応じたBGMを再生
    playGameBGM(difficulty);

    await getNextText();
    // setTimeoutを使用して、レンダリング後に確実にフォーカスを当てる
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [getNextText, playGameBGM, difficulty]);

  // タイマー
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("finished");
          stopBGM(); // ゲーム終了時にBGMを停止
          playResultBGM(); // 結果BGMを再生
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, stopBGM, playResultBGM]);

  // 難易度表示用のラベル
  const getDifficultyLabel = (diff: Difficulty): string => {
    switch (diff) {
      case "beginner":
        return "初級";
      case "intermediate":
        return "中級";
      case "advanced":
        return "上級";
      default:
        return "中級";
    }
  };

  // 入力処理
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // IME入力中はonChangeイベントが発火しないため、isComposingチェックは不要
    // （ただしgameStateのチェックは必要）
    if (gameState !== "playing") return;

    const value = e.target.value.toLowerCase();
    const prevLength = userInput.length;
    const newLength = value.length;

    // 文字が追加された場合のみ処理（削除時は無視）
    if (newLength > prevLength) {
      // 追加された文字の正誤判定
      const addedChar = value[newLength - 1]; // ユーザーが追加した文字
      const expectedChar = currentText[newLength - 1]; // 期待される文字

      setTotalChars((prev) => prev + 1);

      if (addedChar === expectedChar) {
        // 正解の場合のみ入力を受け付ける
        setCorrectChars((prev) => prev + 1);
        setUserInput(value);
        // 正常に入力できているので、IME警告を消す
        if (imeWarning) {
          setImeWarning(false);
        }

        // 正解チェック（全文完成したか）
        if (value === currentText) {
          setWordsCompleted((prev) => prev + 1);
          setUserInput("");
          // 単語完成時の正解SE
          playCorrectSE();
          await getNextText();
          // テキスト完了後、inputフィールドに自動フォーカスを戻す
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }
      } else {
        // 不正解の場合は入力を受け付けず、SEのみ再生
        playIncorrectSE();
      }
    } else if (newLength < prevLength) {
      // 削除時は入力を受け付ける
      setUserInput(value);
    }
  };

  // IME入力の開始・終了を検知
  const handleCompositionStart = () => {
    // 全角入力の警告を表示
    setImeWarning(true);
  };

  const handleCompositionEnd = async (
    _e: React.CompositionEvent<HTMLInputElement>
  ) => {
    // setTimeoutを使用して、onChangeイベントの後に確実に状態をリセット
    setTimeout(() => {
      // 警告を非表示
      setImeWarning(false);
    }, 0);
    // IME確定後の入力処理
    // 注意: onChangeイベントで処理されるため、ここでは状態更新は行わない
  };

  // 言語ごとの「1ワード」を構成する文字数を返す
  // 英語: 5文字 = 1ワード（一般的なWPM定義）
  // 日本語(ローマ字): 1語あたりの入力文字数が多くなるため、補正として大きめの値を使用
  const getCharsPerWord = (lang: Language): number => {
    switch (lang) {
      case "japanese":
        return 10;
      default:
        return 5;
    }
  };

  // WPM計算
  const calculateWPM = () => {
    const minutes = (60 - timeLeft) / 60 || 1;
    const charsPerWord = getCharsPerWord(language);
    return Math.round(correctChars / charsPerWord / minutes);
  };

  // 精度計算
  const calculateAccuracy = () => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  };

  // スコア保存（上級クリア時のみ）
  const handleSaveScore = async () => {
    if (
      !isAuthenticated ||
      difficulty !== "advanced" ||
      scoreSaved ||
      !currentSessionId
    )
      return;

    setIsSaving(true);
    try {
      await saveScore({
        wpm: calculateWPM(),
        accuracy: calculateAccuracy(),
        correct_chars: correctChars,
        words_completed: wordsCompleted,
        language,
        difficulty: "advanced",
      });
      setScoreSaved(true);
      // セッションIDをクリアして、このセッションでは再保存できないようにする
      setCurrentSessionId(null);
    } catch (error) {
      console.error("スコアの保存に失敗しました:", error);
    } finally {
      setIsSaving(false);
    }
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
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>

      {/* ゲーム画面 */}
      <div className="w-full max-w-2xl">
        {gameState === "ready" && (
          <div className="text-center">
            <h2 className="text-3xl text-white mb-8">準備はいいですか？</h2>

            {/* 言語選択 */}
            <div className="mb-6">
              <p className="text-gray-300 mb-4">言語を選択:</p>
              <div className="flex justify-center gap-4">
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
              </div>
            </div>

            {/* 難易度選択 */}
            <div className="mb-8">
              <p className="text-gray-300 mb-4">難易度を選択:</p>
              <div className="flex justify-center gap-4">
                {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
                  (diff) => {
                    const isAvailable =
                      getAvailableDifficulties().includes(diff);
                    return (
                      <button
                        key={diff}
                        onClick={() => isAvailable && setDifficulty(diff)}
                        disabled={!isAvailable}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${
                          difficulty === diff
                            ? "bg-cyan-500 text-white"
                            : isAvailable
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                            : "bg-gray-700 text-gray-500 cursor-not-allowed"
                        }`}
                        title={!isAvailable ? "ログインすると利用可能" : ""}
                      >
                        {getDifficultyLabel(diff)}
                        {!isAvailable && " 🔒"}
                      </button>
                    );
                  }
                )}
              </div>
              {!isAuthenticated && (
                <p className="text-yellow-400 text-sm mt-4">
                  💡{" "}
                  <Link to="/login" className="underline hover:text-yellow-300">
                    ログイン
                  </Link>
                  すると中級・上級がプレイできます
                </p>
              )}
            </div>

            <button
              onClick={startGame}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "読み込み中..." : "スタート"}
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
                <div className="text-gray-400 text-sm">
                  {getDifficultyLabel(difficulty)}
                </div>
              </div>
            </div>

            {/* タイピングエリア */}
            <div className="bg-slate-800 rounded-lg p-6 mb-4">
              {isLoading ? (
                <div className="text-center text-gray-400 py-8">
                  読み込み中...
                </div>
              ) : (
                <>
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
                            const progress =
                              userInput.length / currentText.length;
                            const charProgress =
                              index / currentJapaneseText.display.length;

                            if (charProgress < progress) {
                              // 入力済みの部分
                              const isCorrect =
                                currentText.startsWith(userInput);
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
                </>
              )}
            </div>

            {/* IME警告 */}
            {imeWarning && (
              <div className="mb-2 p-3 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-300 text-sm">
                ⚠️ 全角入力モードになっています。半角英数字で入力してください。
              </div>
            )}

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
              disabled={isLoading}
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
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  言語: {language === "english" ? "English" : "日本語"} /
                  難易度: {getDifficultyLabel(difficulty)}
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
                      onClick={handleSaveScore}
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
                    <Link
                      to="/login"
                      className="underline hover:text-yellow-300"
                    >
                      ログイン
                    </Link>
                    して上級をクリアするとスコアを保存できます
                  </p>
                </div>
              )}
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
