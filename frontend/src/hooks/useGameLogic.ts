import { useState, useEffect, useRef } from "react";
import { useAudioContext } from "../contexts/AudioContext";
import type { Difficulty, Language, JapaneseText } from "../types/types";
import { getRandomText } from "../data";
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
  /** 現在のテキストのバリエーション一覧 */
  currentTextVariants: string[];
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
  usedTextIds: string[];
  /** 現在のコンボ数 */
  combo: number;
  /** 最大コンボ数 */
  maxCombo: number;
  /** 直前の入力が正解だったか（アニメーション用） */
  lastInputCorrect: boolean | null;
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
  startGame: () => void;
  /** 入力を処理 */
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
 * BGM管理はBGMManagerコンポーネントが担当するため、このフックではSE再生のみを処理します
 */
export const useGameLogic = () => {
  const { playCorrectSE, playIncorrectSE } = useAudioContext();

  // 状態管理
  const [gameState, setGameState] = useState<GameState["status"]>("ready");
  const [language, setLanguage] = useState<Language>("japanese");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [currentText, setCurrentText] = useState("");
  const [currentTextVariants, setCurrentTextVariants] = useState<string[]>([]);
  const [currentJapaneseText, setCurrentJapaneseText] =
    useState<JapaneseText | null>(null);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [isLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [imeWarning, setImeWarning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [usedTextIds, setUsedTextIds] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ローカルデータからランダムなテキストを取得して設定
   */
  const getNextText = () => {
    const result = getRandomText(language, difficulty, usedTextIds);
    setCurrentJapaneseText(result.japaneseText);
    setCurrentText(result.text);
    setCurrentTextVariants(result.textVariants);
    setUsedTextIds((prev) => [...prev, result.id]);
  };

  /**
   * ゲームを開始
   * BGMの切り替えはBGMManagerが状態変化を検知して自動的に行います
   */
  const startGame = () => {
    setGameState("playing");
    setUserInput("");
    setTimeLeft(GAME_DURATION_SECONDS);
    setCorrectChars(0);
    setTotalChars(0);
    setWordsCompleted(0);
    setHasError(false);
    setCombo(0);
    setMaxCombo(0);
    setLastInputCorrect(null);
    setUsedTextIds([]); // 使用済みテキストIDリストをリセット
    setCurrentTextVariants([]); // テキストバリエーションをリセット
    setCurrentSessionId(`${Date.now()}-${Math.random()}`);

    getNextText();
    // レンダリング後に確実にフォーカスを当てる
    setTimeout(() => {
      inputRef.current?.focus();
    }, INPUT_FOCUS_DELAY_MS);
  };

  /**
   * 入力されたテキストにマッチするバリエーションを検索
   * ユーザーの入力に前方一致するバリエーションを返す
   */
  const findMatchingVariant = (input: string): string | null => {
    if (currentTextVariants.length === 0) return null;
    
    // 入力に前方一致するバリエーションを探す
    const matchingVariant = currentTextVariants.find(
      (variant) => variant.startsWith(input)
    );
    
    return matchingVariant || null;
  };

  /**
   * 入力を処理
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // バリエーションを使った判定
      const matchingVariant = findMatchingVariant(value);
      
      if (matchingVariant) {
        // マッチするバリエーションがある場合
        setCorrectChars((prev) => prev + 1);
        setTotalChars((prev) => prev + 1);
        setUserInput(value);
        setLastInputCorrect(true);
        setCombo((prev) => {
          const next = prev + 1;
          setMaxCombo((max) => Math.max(max, next));
          return next;
        });

        // 表示テキストを動的に変更（マッチしたバリエーションに切り替え）
        if (matchingVariant !== currentText) {
          setCurrentText(matchingVariant);
        }

        // IME警告を消す
        if (imeWarning) {
          setImeWarning(false);
        }

        // 全文完成チェック
        if (value === matchingVariant) {
          setWordsCompleted((prev) => prev + 1);
          setUserInput("");
          playCorrectSE();
          getNextText();
          // テキスト完了後、inputフィールドに自動フォーカスを戻す
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }
      } else {
        // マッチするバリエーションがない場合は不正解
        setTotalChars((prev) => prev + 1);
        playIncorrectSE();
        setUserInput(value);
        setHasError(true);
        setLastInputCorrect(false);
        setCombo(0);
      }
    } else if (newLength < prevLength) {
      // 削除時は入力を受け付ける
      setUserInput(value);
      // エラー状態をクリア
      if (hasError) {
        setHasError(false);
      }
      
      // 削除後に再度マッチするバリエーションを探して表示テキストを更新
      if (value.length > 0) {
        const matchingVariant = findMatchingVariant(value);
        if (matchingVariant && matchingVariant !== currentText) {
          setCurrentText(matchingVariant);
        }
      } else {
        // 入力が空の場合はデフォルトのテキスト（最初のバリエーション）に戻す
        if (currentTextVariants.length > 0 && currentText !== currentTextVariants[0]) {
          setCurrentText(currentTextVariants[0]);
        }
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
   * ゲーム終了時のBGM停止と終了SE再生はBGMManagerが担当
   */
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
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [gameState]);

  const state: GameState = {
    status: gameState,
    language,
    difficulty,
    currentText,
    currentTextVariants,
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
    combo,
    maxCombo,
    lastInputCorrect,
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
