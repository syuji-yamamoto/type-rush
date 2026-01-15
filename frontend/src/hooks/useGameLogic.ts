import { useState, useEffect, useRef } from "react";
import { useAudioContext } from "../contexts/AudioContext";
import type { Difficulty, Language } from "../api/sampleText";
import {
  fetchRandomTextWithFallback,
  getFallbackText,
} from "../api/sampleText";
import type { JapaneseText } from "../types/types";
import {
  GAME_DURATION_SECONDS,
  TIMER_INTERVAL_MS,
  INPUT_FOCUS_DELAY_MS,
} from "../config/gameConstants";

/**
 * ゲーム状態のインターフェース
 */
export interface GameState {
  /** ゲームの現在の状態 */
  status: "ready" | "playing" | "finished";
  /** 選択中の言語 */
  language: Language;
  /** 選択中の難易度 */
  difficulty: Difficulty;
  /** 現在のテキスト（ローマ字または英語） */
  currentText: string;
  /** 現在の日本語テキスト */
  currentJapaneseText: JapaneseText | null;
  /** ユーザーの入力 */
  userInput: string;
  /** 残り時間（秒） */
  timeLeft: number;
  /** 正解した文字数 */
  correctChars: number;
  /** 入力した文字数の合計 */
  totalChars: number;
  /** 完了した単語数 */
  wordsCompleted: number;
  /** ローディング状態 */
  isLoading: boolean;
  /** セッションID */
  currentSessionId: string | null;
  /** IME警告の表示状態 */
  imeWarning: boolean;
  /** エラー状態 */
  hasError: boolean;
  /** 使用済みテキストIDリスト */
  usedTextIds: number[];
}

/**
 * ゲーム操作のインターフェース
 */
export interface GameActions {
  /** 言語を設定 */
  setLanguage: (language: Language) => void;
  /** 難易度を設定 */
  setDifficulty: (difficulty: Difficulty) => void;
  /** ゲームを開始 */
  startGame: () => Promise<void>;
  /** 入力を処理 */
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  /** IME入力開始を処理 */
  handleCompositionStart: () => void;
  /** IME入力終了を処理 */
  handleCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
  /** 入力フィールドのref */
  inputRef: React.RefObject<HTMLInputElement>;
}

/**
 * ゲームのメインロジックを管理するカスタムフック
 * ゲームの状態管理、タイマー、テキスト取得、入力処理などを提供します
 */
export const useGameLogic = () => {
  const {
    playGameBGM,
    playCorrectSE,
    playIncorrectSE,
    stopBGM,
    playResultBGM,
  } = useAudioContext();

  // 状態管理
  const [gameState, setGameState] = useState<GameState["status"]>("ready");
  const [language, setLanguage] = useState<Language>("japanese");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [currentText, setCurrentText] = useState("");
  const [currentJapaneseText, setCurrentJapaneseText] =
    useState<JapaneseText | null>(null);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [imeWarning, setImeWarning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [usedTextIds, setUsedTextIds] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * APIからランダムなテキストを取得（使用済みテキストを除外）
   */
  const fetchRandomText = async (): Promise<{ text: string; id?: number }> => {
    setIsLoading(true);
    try {
      const result = await fetchRandomTextWithFallback(
        language,
        difficulty,
        usedTextIds
      );
      setCurrentJapaneseText(result.japaneseText);
      return { text: result.text, id: result.id };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 次のテキストを取得して設定
   */
  const getNextText = async () => {
    try {
      const result = await fetchRandomText();
      setCurrentText(result.text);

      // テキストIDがある場合は使用済みリストに追加
      if (result.id !== undefined) {
        setUsedTextIds((prev) => [...prev, result.id!]);
      }
    } catch (error) {
      console.error("次のテキストの取得に失敗しました:", error);

      // 想定外のエラー発生時もゲームが継続できるようにローカルフォールバックを使用
      const fallbackResult = getFallbackText(language);
      setCurrentJapaneseText(fallbackResult.japaneseText);
      setCurrentText(fallbackResult.text);
    }
  };

  /**
   * ゲームを開始
   */
  const startGame = async () => {
    setGameState("playing");
    setUserInput("");
    setTimeLeft(GAME_DURATION_SECONDS);
    setCorrectChars(0);
    setTotalChars(0);
    setWordsCompleted(0);
    setHasError(false);
    setUsedTextIds([]); // 使用済みテキストIDリストをリセット
    setCurrentSessionId(`${Date.now()}-${Math.random()}`);

    // 難易度に応じたBGMを再生
    playGameBGM(difficulty);

    await getNextText();
    // レンダリング後に確実にフォーカスを当てる
    setTimeout(() => {
      inputRef.current?.focus();
    }, INPUT_FOCUS_DELAY_MS);
  };

  /**
   * 入力を処理
   */
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const addedChar = value[newLength - 1];
      const expectedChar = currentText[newLength - 1];

      setTotalChars((prev) => prev + 1);

      if (addedChar === expectedChar) {
        // 正解の場合のみ入力を受け付ける
        setCorrectChars((prev) => prev + 1);
        setUserInput(value);
        // IME警告を消す
        if (imeWarning) {
          setImeWarning(false);
        }

        // 全文完成チェック
        if (value === currentText) {
          setWordsCompleted((prev) => prev + 1);
          setUserInput("");
          playCorrectSE();
          await getNextText();
          // テキスト完了後、inputフィールドに自動フォーカスを戻す
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }
      } else {
        // 不正解の場合
        playIncorrectSE();
        setUserInput(value);
        setHasError(true);
      }
    } else if (newLength < prevLength) {
      // 削除時は入力を受け付ける
      setUserInput(value);
      // エラー状態をクリア
      if (hasError) {
        setHasError(false);
      }
    }
  };

  /**
   * IME入力の開始を処理
   */
  const handleCompositionStart = () => {
    setImeWarning(true);
  };

  /**
   * IME入力の終了を処理
   */
  const handleCompositionEnd = (
    _e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setTimeout(() => {
      setImeWarning(false);
    }, 0);
  };

  /**
   * タイマー処理
   */
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("finished");
          stopBGM();
          playResultBGM();
          return 0;
        }
        return prev - 1;
      });
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [gameState, stopBGM, playResultBGM]);

  const state: GameState = {
    status: gameState,
    language,
    difficulty,
    currentText,
    currentJapaneseText,
    userInput,
    timeLeft,
    correctChars,
    totalChars,
    wordsCompleted,
    isLoading,
    currentSessionId,
    imeWarning,
    hasError,
    usedTextIds,
  };

  const actions: GameActions = {
    setLanguage,
    setDifficulty,
    startGame,
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    inputRef,
  };

  return { state, actions };
};
