// 日本語サンプルテキスト（表示用、読み仮名、ローマ字）
export type JapaneseText = {
  display: string; // 表示するテキスト（漢字含む）
  reading: string; // 読み仮名（ひらがな）
  romaji: string; // ローマ字（デフォルト表示用）
  romajiVariants: string[]; // ローマ字のバリエーション（複数の入力方法を許容）
};
