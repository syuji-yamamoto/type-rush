import apiClient from "./client";
import type { Difficulty, Language } from "../types/types";

export interface Score {
  id: number;
  wpm: number;
  accuracy: number;
  correct_chars: number;
  words_completed: number;
  language: Language;
  difficulty: Difficulty;
  played_at: string;
}

export interface ScoreStats {
  best_wpm: number;
  avg_wpm: number;
  avg_accuracy: number;
  total_games: number;
}

export interface SaveScoreRequest {
  wpm: number;
  accuracy: number;
  correct_chars: number;
  words_completed: number;
  language: Language;
  difficulty: Difficulty;
}

export interface SaveScoreResponse {
  message: string;
  score: Score;
}

export interface ScoreHistoryResponse {
  data: Score[];
  total: number;
}

/**
 * スコアを保存
 */
export const saveScore = async (
  data: SaveScoreRequest
): Promise<SaveScoreResponse> => {
  const response = await apiClient.post<SaveScoreResponse>("/scores", data);
  return response.data;
};

/**
 * ユーザーのスコア統計を取得
 */
export const getScoreStats = async (): Promise<ScoreStats> => {
  const response = await apiClient.get<ScoreStats>("/scores/stats");
  return response.data;
};

/**
 * ユーザーのスコア履歴を取得
 */
export const getScoreHistory = async (
  limit: number = 20
): Promise<ScoreHistoryResponse> => {
  const response = await apiClient.get<ScoreHistoryResponse>(
    "/scores/history",
    {
      params: { limit },
    }
  );
  return response.data;
};
