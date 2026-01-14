import { useState, useEffect, useCallback, useRef } from "react";
import type { JapaneseText } from "../types/types";
import {
  type Difficulty,
  type Language,
  fetchRandomTextWithFallback,
  getFallbackText,
} from "../api/sampleText";
import { saveScore } from "../api/score";
import { useAuth } from "../contexts/AuthContext";
import { useAudioContext } from "../contexts/AudioContext";
import { GameHeader } from "../components/game/GameHeader";
import { GameSetup } from "../components/game/GameSetup";
import { GameStats } from "../components/game/GameStats";
import { TypingArea } from "../components/game/TypingArea";
import { IMEWarning } from "../components/game/IMEWarning";
import { GameResult } from "../components/game/GameResult";

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
  const [hasError, setHasError] = useState(false);
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
      const result = await fetchRandomTextWithFallback(language, difficulty);
      setCurrentJapaneseText(result.japaneseText);
      return result.text;
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
      const fallbackResult = getFallbackText(language);
      setCurrentJapaneseText(fallbackResult.japaneseText);
      setCurrentText(fallbackResult.text);
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
    setHasError(false);
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
      // エラー中は新しい入力を受け付けない
      if (hasError) {
        return;
      }

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
        // 不正解の場合は赤色で表示するが、次の入力は受け付けない
        playIncorrectSE();
        setUserInput(value);
        setHasError(true);
      }
    } else if (newLength < prevLength) {
      // 削除時は入力を受け付ける
      setUserInput(value);
      // エラー状態をクリア（正しい位置まで戻ったら）
      if (hasError) {
        // 最後の文字を削除したら、エラー状態を解除
        setHasError(false);
      }
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
      <GameHeader />

      {/* ゲーム画面 */}
      <div className="w-full max-w-2xl">
        {gameState === "ready" && (
          <GameSetup
            language={language}
            difficulty={difficulty}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            availableDifficulties={getAvailableDifficulties()}
            onLanguageChange={setLanguage}
            onDifficultyChange={setDifficulty}
            onStart={startGame}
            getDifficultyLabel={getDifficultyLabel}
          />
        )}

        {gameState === "playing" && (
          <div>
            <GameStats
              timeLeft={timeLeft}
              wpm={calculateWPM()}
              wordsCompleted={wordsCompleted}
              difficulty={difficulty}
              getDifficultyLabel={getDifficultyLabel}
            />

            <TypingArea
              isLoading={isLoading}
              language={language}
              currentJapaneseText={currentJapaneseText}
              currentText={currentText}
              userInput={userInput}
            />

            <IMEWarning show={imeWarning} />

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
          <GameResult
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            wordsCompleted={wordsCompleted}
            correctChars={correctChars}
            language={language}
            difficulty={difficulty}
            isAuthenticated={isAuthenticated}
            scoreSaved={scoreSaved}
            isSaving={isSaving}
            onSaveScore={handleSaveScore}
            onRestart={startGame}
            getDifficultyLabel={getDifficultyLabel}
          />
        )}
      </div>
    </div>
  );
}

export default Game;
