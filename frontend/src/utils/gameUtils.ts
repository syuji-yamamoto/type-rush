import type { Difficulty } from "../types/types";
import {
  STANDARD_CHARS_PER_WORD,
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
 * KPM（Keystrokes Per Minute）を計算
 * 言語に依存せず、キーストローク数/分で統一的に評価する
 * @param correctChars 正解した文字数（＝キーストローク数）
 * @param timeLeft 残り時間（秒）
 * @returns 計算されたKPM
 */
export const calculateKPM = (
  correctChars: number,
  timeLeft: number
): number => {
  const minutes =
    (GAME_DURATION_SECONDS - timeLeft) / 60 || MINIMUM_ELAPSED_MINUTES;
  return Math.round(correctChars / minutes);
};

/**
 * WPM換算値を計算（参考値として表示用）
 * KPMを標準WPM換算（5キーストローク = 1ワード）で変換
 * @param kpm KPM値
 * @returns WPM換算値
 */
export const calculateWPMEquivalent = (kpm: number): number => {
  return Math.round(kpm / STANDARD_CHARS_PER_WORD);
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
