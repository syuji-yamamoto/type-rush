import { useState } from "react";
import { saveScore } from "../api/score";
import type { Language, Difficulty } from "../types/types";

/**
 * スコア保存状態のインターフェース
 */
export interface ScoreSaveState {
  /** スコアが保存済みかどうか */
  scoreSaved: boolean;
  /** 保存処理中かどうか */
  isSaving: boolean;
}

/**
 * スコア保存のパラメータ
 */
export interface SaveScoreParams {
  kpm: number;
  accuracy: number;
  correctChars: number;
  wordsCompleted: number;
  language: Language;
  difficulty: Difficulty;
}

/**
 * スコア保存の条件
 */
export interface SaveScoreConditions {
  isAuthenticated: boolean;
  difficulty: Difficulty;
  currentSessionId: string | null;
}

/**
 * スコア保存機能を管理するカスタムフック
 */
export const useScoreSave = () => {
  const [scoreSaved, setScoreSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * スコアを保存（ログイン済みなら全難易度で保存可能）
   * @param params スコア情報
   * @param conditions 保存条件
   */
  const handleSaveScore = async (
    params: SaveScoreParams,
    conditions: SaveScoreConditions
  ) => {
    const { isAuthenticated, currentSessionId } = conditions;

    // 保存条件のチェック
    if (!isAuthenticated || scoreSaved || !currentSessionId) {
      return;
    }

    setIsSaving(true);
    try {
      await saveScore({
        kpm: params.kpm,
        accuracy: params.accuracy,
        correct_chars: params.correctChars,
        words_completed: params.wordsCompleted,
        language: params.language,
        difficulty: params.difficulty,
      });
      setScoreSaved(true);
    } catch (error) {
      console.error("スコアの保存に失敗しました:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * スコア保存状態をリセット
   */
  const resetScoreSaveState = () => {
    setScoreSaved(false);
    setIsSaving(false);
  };

  return {
    scoreSaved,
    isSaving,
    handleSaveScore,
    resetScoreSaveState,
  };
};
