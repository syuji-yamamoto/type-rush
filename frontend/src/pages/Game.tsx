import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAudioContext } from "../contexts/AudioContext";
import { GameHeader } from "../components/game/GameHeader";
import { GameSetup } from "../components/game/GameSetup";
import { GameStats } from "../components/game/GameStats";
import { TypingArea } from "../components/game/TypingArea";
import { IMEWarning } from "../components/game/IMEWarning";
import { GameResult } from "../components/game/GameResult";
import { useGameLogic } from "../hooks/useGameLogic";
import { useScoreSave } from "../hooks/useScoreSave";
import {
  getDifficultyLabel,
  calculateWPM,
  calculateAccuracy,
  getAvailableDifficulties,
} from "../utils/gameUtils";

/**
 * タイピングゲームのメインコンポーネント
 * ゲームの状態管理、UI表示、ユーザー操作の処理を担当します
 */
function Game() {
  const { isAuthenticated } = useAuth();
  const { playMenuBGM, stopBGM } = useAudioContext();

  // ゲームロジックのフック
  const { state, actions } = useGameLogic();

  // スコア保存のフック
  const { scoreSaved, isSaving, handleSaveScore, resetScoreSaveState } =
    useScoreSave();

  /**
   * ページマウント時の処理
   * メニューBGMを再生し、アンマウント時に停止します
   */
  useEffect(() => {
    playMenuBGM();
    return () => {
      stopBGM();
    };
  }, [playMenuBGM, stopBGM]);

  /**
   * スコアを保存する処理
   */
  const onSaveScore = async () => {
    try {
      await handleSaveScore(
        {
          wpm: calculateWPM(state.correctChars, state.timeLeft, state.language),
          accuracy: calculateAccuracy(state.correctChars, state.totalChars),
          correctChars: state.correctChars,
          wordsCompleted: state.wordsCompleted,
          language: state.language,
          difficulty: state.difficulty,
        },
        {
          isAuthenticated,
          difficulty: state.difficulty,
          currentSessionId: state.currentSessionId,
        }
      );
    } catch (error) {
      // エラーはuseScoreSaveフック内でログに記録されているため、
      // ここでは特に何もしない（UIへのエラー表示などを追加する場合はここで実装）
      console.error("スコア保存処理でエラーが発生しました:", error);
    }
  };

  /**
   * ゲームを再開する処理
   */
  const onRestart = () => {
    resetScoreSaveState();
    actions.startGame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GameHeader />

      <div className="w-full max-w-2xl">
        {/* ゲーム準備画面 */}
        {state.status === "ready" && (
          <GameSetup
            language={state.language}
            difficulty={state.difficulty}
            isLoading={state.isLoading}
            isAuthenticated={isAuthenticated}
            availableDifficulties={getAvailableDifficulties(isAuthenticated)}
            onLanguageChange={actions.setLanguage}
            onDifficultyChange={actions.setDifficulty}
            onStart={actions.startGame}
            getDifficultyLabel={getDifficultyLabel}
          />
        )}

        {/* ゲームプレイ画面 */}
        {state.status === "playing" && (
          <div>
            <GameStats
              timeLeft={state.timeLeft}
              wpm={calculateWPM(
                state.correctChars,
                state.timeLeft,
                state.language
              )}
              wordsCompleted={state.wordsCompleted}
              difficulty={state.difficulty}
              getDifficultyLabel={getDifficultyLabel}
            />

            <TypingArea
              isLoading={state.isLoading}
              language={state.language}
              currentJapaneseText={state.currentJapaneseText}
              currentText={state.currentText}
              userInput={state.userInput}
            />

            <IMEWarning show={state.imeWarning} />

            {/* 入力フィールド */}
            <input
              ref={actions.inputRef}
              type="text"
              value={state.userInput}
              onChange={actions.handleInput}
              onCompositionStart={actions.handleCompositionStart}
              onCompositionEnd={actions.handleCompositionEnd}
              className="w-full bg-slate-700 text-white text-xl p-4 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={
                state.language === "japanese"
                  ? "ローマ字で入力..."
                  : "ここに入力..."
              }
              autoFocus
              disabled={state.isLoading}
            />
          </div>
        )}

        {/* ゲーム結果画面 */}
        {state.status === "finished" && (
          <GameResult
            wpm={calculateWPM(
              state.correctChars,
              state.timeLeft,
              state.language
            )}
            accuracy={calculateAccuracy(state.correctChars, state.totalChars)}
            wordsCompleted={state.wordsCompleted}
            correctChars={state.correctChars}
            language={state.language}
            difficulty={state.difficulty}
            isAuthenticated={isAuthenticated}
            scoreSaved={scoreSaved}
            isSaving={isSaving}
            onSaveScore={onSaveScore}
            onRestart={onRestart}
            getDifficultyLabel={getDifficultyLabel}
          />
        )}
      </div>
    </div>
  );
}

export default Game;
