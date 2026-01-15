import apiClient from "./client";
import type { JapaneseText } from "../types/types";

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Language = "english" | "japanese";

export interface SampleText {
  id: number;
  text: string;
  display_text: string | null;
  reading: string | null;
  language: Language;
  difficulty: Difficulty;
}

export interface DifficultyOption {
  value: Difficulty;
  label: string;
}

export interface GetRandomResponse {
  id: number;
  text: string;
  display_text: string | null;
  reading: string | null;
  language: Language;
  difficulty: Difficulty;
}

export interface GetRandomListResponse {
  data: SampleText[];
  total: number;
}

export interface GetDifficultiesResponse {
  difficulties: DifficultyOption[];
}

export interface FetchTextResult {
  text: string;
  japaneseText: JapaneseText | null;
}

// フォールバック用のローカルテキスト（API障害時用）
const fallbackJapaneseTexts: JapaneseText[] = [
  {
    display: "今日はいい天気ですね",
    reading: "きょうはいいてんきですね",
    romaji: "kyouhaiitenkindesune",
  },
  {
    display: "プログラミングは楽しい",
    reading: "ぷろぐらみんぐはたのしい",
    romaji: "puroguraminguhatanoshii",
  },
];

const fallbackEnglishTexts = [
  "the quick brown fox jumps over the lazy dog",
  "programming is the art of telling a computer what to do",
];

/**
 * ランダムなサンプルテキストを1件取得
 */
export const getRandomSampleText = async (
  language: Language,
  difficulty: Difficulty
): Promise<GetRandomResponse> => {
  const response = await apiClient.get<GetRandomResponse>(
    "/sample-texts/random",
    {
      params: { language, difficulty },
    }
  );
  return response.data;
};

/**
 * ランダムなサンプルテキストを複数件取得
 */
export const getRandomSampleTextList = async (
  language: Language,
  difficulty: Difficulty,
  limit: number = 10
): Promise<GetRandomListResponse> => {
  const response = await apiClient.get<GetRandomListResponse>(
    "/sample-texts/random-list",
    {
      params: { language, difficulty, limit },
    }
  );
  return response.data;
};

/**
 * 利用可能な難易度リストを取得
 */
export const getDifficulties = async (): Promise<GetDifficultiesResponse> => {
  const response = await apiClient.get<GetDifficultiesResponse>(
    "/sample-texts/difficulties"
  );
  return response.data;
};

/**
 * ランダムなフォールバックテキストを選択する共通ヘルパー関数
 */
const selectRandomFallbackText = (language: Language): FetchTextResult => {
  if (language === "japanese") {
    const text =
      fallbackJapaneseTexts[
        Math.floor(Math.random() * fallbackJapaneseTexts.length)
      ];
    return {
      text: text.romaji,
      japaneseText: text,
    };
  } else {
    const text =
      fallbackEnglishTexts[
        Math.floor(Math.random() * fallbackEnglishTexts.length)
      ];
    return {
      text,
      japaneseText: null,
    };
  }
};

/**
 * ランダムなサンプルテキストを取得し、フォールバック処理も含む
 */
export const fetchRandomTextWithFallback = async (
  language: Language,
  difficulty: Difficulty
): Promise<FetchTextResult> => {
  try {
    const response = await getRandomSampleText(language, difficulty);

    if (language === "japanese") {
      const japaneseText: JapaneseText = {
        display: response.display_text || "",
        reading: response.reading || "",
        romaji: response.text,
      };
      return {
        text: response.text,
        japaneseText,
      };
    } else {
      return {
        text: response.text,
        japaneseText: null,
      };
    }
  } catch (error) {
    console.error("サンプルテキストの取得に失敗しました:", error);
    // フォールバック：ローカルテキストを使用
    return selectRandomFallbackText(language);
  }
};

/**
 * フォールバック用のテキストを取得（想定外のエラー発生時）
 */
export const getFallbackText = (language: Language): FetchTextResult => {
  return selectRandomFallbackText(language);
};
