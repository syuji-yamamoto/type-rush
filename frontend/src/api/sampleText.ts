import apiClient from "./client";

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
