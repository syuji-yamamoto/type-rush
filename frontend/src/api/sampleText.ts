import apiClient from "./client";
import type { JapaneseText } from "../types/types";
import fallbackTextsData from "../config/fallbackTexts.json";

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

// フォールバック用のローカルテキスト（外部設定ファイルから読み込み）
const fallbackJapaneseTexts: JapaneseText[] = fallbackTextsData.japanese;
const fallbackEnglishTexts: string[] = fallbackTextsData.english;

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
  difficulty: Difficulty,
  excludedIds: number[] = []
): Promise<FetchTextResult & { id?: number }> => {
  try {
    // 除外IDリストがある場合は複数件取得して除外処理
    if (excludedIds.length > 0) {
      const listResponse = await getRandomSampleTextList(
        language,
        difficulty,
        Math.max(20, excludedIds.length + 10)
      );

      // 除外されていないテキストを探す
      const availableText = listResponse.data.find(
        (item) => !excludedIds.includes(item.id)
      );

      if (availableText) {
        if (language === "japanese") {
          const japaneseText: JapaneseText = {
            display: availableText.display_text || "",
            reading: availableText.reading || "",
            romaji: availableText.text,
          };
          return {
            id: availableText.id,
            text: availableText.text,
            japaneseText,
          };
        } else {
          return {
            id: availableText.id,
            text: availableText.text,
            japaneseText: null,
          };
        }
      }
    }

    // 除外IDがない場合、または除外後に該当するテキストがない場合は通常取得
    const response = await getRandomSampleText(language, difficulty);

    if (language === "japanese") {
      const japaneseText: JapaneseText = {
        display: response.display_text || "",
        reading: response.reading || "",
        romaji: response.text,
      };
      return {
        id: response.id,
        text: response.text,
        japaneseText,
      };
    } else {
      return {
        id: response.id,
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
