/**
 * ゲーム設定の定数
 * ゲーム全体で使用される定数を一元管理します
 */

/** ゲーム時間（秒） */
export const GAME_DURATION_SECONDS = 60;

/** タイマー更新間隔（ミリ秒） */
export const TIMER_INTERVAL_MS = 1000;

/** 入力フィールドにフォーカスを当てる遅延時間（ミリ秒） */
export const INPUT_FOCUS_DELAY_MS = 100;

/** 日本語(ローマ字)の1ワードあたりの文字数換算 */
export const CHARS_PER_WORD_JAPANESE = 10;

/** 英語の1ワードあたりの文字数換算 */
export const CHARS_PER_WORD_ENGLISH = 5;

/** 精度のデフォルト値（%） */
export const DEFAULT_ACCURACY = 100;

/** 最小経過時間（分） - WPM計算でゼロ除算を防ぐため */
export const MINIMUM_ELAPSED_MINUTES = 0.1;
