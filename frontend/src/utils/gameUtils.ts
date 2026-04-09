import type { Difficulty, Language } from "../api/sampleText";
import {
  CHARS_PER_WORD_JAPANESE,
  CHARS_PER_WORD_ENGLISH,
  DEFAULT_ACCURACY,
  MINIMUM_ELAPSED_MINUTES,
  GAME_DURATION_SECONDS,
} from "../config/gameConstants";

/**
 * 難易度ラベルを取得
 * @param difficulty 難易度
 * @returns 日本語の難易度ラベル
 */
export const getDifficultyLabel = (difficulty: Difficulty): string => {
  switch (difficulty) {
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

/**
 * 言語ごとの1ワードを構成する文字数を取得
 * 英語: 5文字 = 1ワード（一般的なWPM定義）
 * 日本語(ローマ字): 1語あたりの入力文字数が多くなるため、補正として大きめの値を使用
 * @param language 言語
 * @returns 1ワードあたりの文字数
 */
export const getCharsPerWord = (language: Language): number => {
  switch (language) {
    case "japanese":
      return CHARS_PER_WORD_JAPANESE;
    default:
      return CHARS_PER_WORD_ENGLISH;
  }
};

/**
 * WPM（Words Per Minute）を計算
 * @param correctChars 正解した文字数
 * @param timeLeft 残り時間（秒）
 * @param language 言語
 * @returns 計算されたWPM
 */
export const calculateWPM = (
  correctChars: number,
  timeLeft: number,
  language: Language
): number => {
  const minutes =
    (GAME_DURATION_SECONDS - timeLeft) / 60 || MINIMUM_ELAPSED_MINUTES;
  const charsPerWord = getCharsPerWord(language);
  return Math.round(correctChars / charsPerWord / minutes);
};

/**
 * 精度（Accuracy）を計算
 * @param correctChars 正解した文字数
 * @param totalChars 入力した文字数の合計
 * @returns 計算された精度（%）
 */
export const calculateAccuracy = (
  correctChars: number,
  totalChars: number
): number => {
  if (totalChars === 0) return DEFAULT_ACCURACY;
  return Math.round((correctChars / totalChars) * DEFAULT_ACCURACY);
};

/**
 * 利用可能な難易度を取得
 * 全難易度をログイン不要でプレイ可能
 * @returns 利用可能な難易度の配列
 */
export const getAvailableDifficulties = (): Difficulty[] => {
  return ["beginner", "intermediate", "advanced"];
};
