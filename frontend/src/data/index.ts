import type {
  Difficulty,
  JapaneseTextEntry,
  JapaneseText,
  FetchTextResult,
} from "../types/types";

// 日本語テキスト
import { japaneseBeginnerTexts } from "./texts/japanese/beginner";
import { japaneseIntermediateTexts } from "./texts/japanese/intermediate";

const japaneseTextMap: Record<Difficulty, JapaneseTextEntry[]> = {
  beginner: japaneseBeginnerTexts,
  intermediate: japaneseIntermediateTexts,
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
  difficulty: Difficulty,
  excludeIds: string[] = []
): FetchTextResult & { id: string } {
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
}

/**
 * 難易度オプションの一覧を返す
 */
export function getDifficultyOptions() {
  return [
    { value: "beginner" as Difficulty, label: "初級" },
    { value: "intermediate" as Difficulty, label: "中級" },
  ];
}
