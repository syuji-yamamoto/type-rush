import type {
  Language,
  Difficulty,
  EnglishTextEntry,
  JapaneseTextEntry,
  JapaneseText,
  FetchTextResult,
} from "../types/types";

// 英語テキスト
import { englishBeginnerTexts } from "./texts/english/beginner";
import { englishIntermediateTexts } from "./texts/english/intermediate";
import { englishAdvancedTexts } from "./texts/english/advanced";

// 日本語テキスト
import { japaneseBeginnerTexts } from "./texts/japanese/beginner";
import { japaneseIntermediateTexts } from "./texts/japanese/intermediate";
import { japaneseAdvancedTexts } from "./texts/japanese/advanced";

const englishTextMap: Record<Difficulty, EnglishTextEntry[]> = {
  beginner: englishBeginnerTexts,
  intermediate: englishIntermediateTexts,
  advanced: englishAdvancedTexts,
};

const japaneseTextMap: Record<Difficulty, JapaneseTextEntry[]> = {
  beginner: japaneseBeginnerTexts,
  intermediate: japaneseIntermediateTexts,
  advanced: japaneseAdvancedTexts,
};

/**
 * 配列をシャッフルする（Fisher-Yates）
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * ランダムなテキストを取得する（使用済みIDを除外）
 */
export function getRandomText(
  language: Language,
  difficulty: Difficulty,
  excludeIds: string[] = []
): FetchTextResult & { id: string } {
  if (language === "japanese") {
    const pool = japaneseTextMap[difficulty].filter(
      (t) => !excludeIds.includes(t.id)
    );

    // 全て使用済みの場合はリセットして全プールから選択
    const candidates = pool.length > 0 ? pool : japaneseTextMap[difficulty];
    const shuffled = shuffleArray(candidates);
    const entry = shuffled[0];

    const japaneseText: JapaneseText = {
      display: entry.display,
      reading: entry.reading,
      romaji: entry.romaji,
      romajiVariants: entry.romajiVariants,
    };

    return {
      id: entry.id,
      text: entry.romaji,
      textVariants: entry.romajiVariants,
      japaneseText,
    };
  } else {
    const pool = englishTextMap[difficulty].filter(
      (t) => !excludeIds.includes(t.id)
    );

    const candidates = pool.length > 0 ? pool : englishTextMap[difficulty];
    const shuffled = shuffleArray(candidates);
    const entry = shuffled[0];

    return {
      id: entry.id,
      text: entry.text,
      textVariants: [entry.text],
      japaneseText: null,
    };
  }
}

/**
 * 難易度オプションの一覧を返す
 */
export function getDifficultyOptions() {
  return [
    { value: "beginner" as Difficulty, label: "初級" },
    { value: "intermediate" as Difficulty, label: "中級" },
    { value: "advanced" as Difficulty, label: "上級" },
  ];
}
