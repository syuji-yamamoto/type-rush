// テキストカテゴリ
export type TextCategory =
  | "daily" // 日常表現
  | "programming" // プログラミング用語・文章
  | "business" // ビジネス表現
  | "proverb"; // ことわざ・名言

// 難易度
export type Difficulty = "beginner" | "intermediate" | "advanced";

// 言語
export type Language = "english" | "japanese";

// 英語テキストエントリ
export interface EnglishTextEntry {
  id: string;
  text: string;
  category?: TextCategory;
}

// 日本語テキストエントリ
export interface JapaneseTextEntry {
  id: string;
  display: string;
  reading: string;
  romaji: string;
  romajiVariants: string[];
  category?: TextCategory;
}

// 日本語サンプルテキスト（表示用、読み仮名、ローマ字）- ゲーム内で使用
export type JapaneseText = {
  display: string; // 表示するテキスト（漢字含む）
  reading: string; // 読み仮名（ひらがな）
  romaji: string; // ローマ字（デフォルト表示用）
  romajiVariants: string[]; // ローマ字のバリエーション（複数の入力方法を許容）
};

// テキスト取得結果
export interface FetchTextResult {
  text: string;
  textVariants: string[];
  japaneseText: JapaneseText | null;
}
