import { useAuth } from "../contexts/AuthContext";
import { GameHeader } from "../components/game/GameHeader";
import { GameSetup } from "../components/game/GameSetup";
import { GameStats } from "../components/game/GameStats";
import { TypingArea } from "../components/game/TypingArea";
import { ComboDisplay } from "../components/game/ComboDisplay";
import { IMEWarning } from "../components/game/IMEWarning";
import { GameResult } from "../components/game/GameResult";
import { useGameLogic } from "../hooks/useGameLogic";
import { useScoreSave } from "../hooks/useScoreSave";
import {
  getDifficultyLabel,
  calculateKPM,
  calculateAccuracy,
  getAvailableDifficulties,
} from "../utils/gameUtils";

/**
 * タイピングゲームのメインコンポーネント
 */
function Game() {
  const { isAuthenticated } = useAuth();
  const { state, actions } = useGameLogic();
  const { scoreSaved, isSaving, handleSaveScore, resetScoreSaveState } =
    useScoreSave();

  const onSaveScore = async () => {
    try {
      await handleSaveScore(
        {
          kpm: calculateKPM(state.correctChars, state.timeLeft),
          accuracy: calculateAccuracy(state.correctChars, state.totalChars),
          correctChars: state.correctChars,
          wordsCompleted: state.wordsCompleted,
          language: "japanese",
          difficulty: state.difficulty,
        },
        {
          isAuthenticated,
          difficulty: state.difficulty,
          currentSessionId: state.currentSessionId,
        }
      );
    } catch (error) {
      console.error("スコア保存処理でエラーが発生しました:", error);
    }
  };

  const onRestart = () => {
    resetScoreSaveState();
    actions.startGame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GameHeader />

      <div className="w-full max-w-3xl">
        {/* ゲーム準備画面 */}
        {state.status === "ready" && (
          <GameSetup
            difficulty={state.difficulty}
            isLoading={state.isLoading}
            isAuthenticated={isAuthenticated}
            availableDifficulties={getAvailableDifficulties()}
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
              kpm={calculateKPM(state.correctChars, state.timeLeft)}
              wordsCompleted={state.wordsCompleted}
              difficulty={state.difficulty}
              getDifficultyLabel={getDifficultyLabel}
            />

            <TypingArea
              isLoading={state.isLoading}
              currentJapaneseText={state.currentJapaneseText}
              currentText={state.currentText}
              userInput={state.userInput}
              lastInputCorrect={state.lastInputCorrect}
            />

            <ComboDisplay combo={state.combo} />
            <IMEWarning show={state.imeWarning} />

            {/* 入力フィールド */}
            <input
              ref={actions.inputRef}
              type="text"
              value={state.userInput}
              onChange={actions.handleInput}
              onCompositionStart={actions.handleCompositionStart}
              onCompositionEnd={actions.handleCompositionEnd}
              className="w-full bg-slate-700 text-white text-2xl p-5 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow"
              placeholder="ローマ字で入力..."
              autoFocus
              disabled={state.isLoading}
            />
          </div>
        )}

        {/* ゲーム結果画面 */}
        {state.status === "finished" && (
          <GameResult
            kpm={calculateKPM(state.correctChars, state.timeLeft)}
            accuracy={calculateAccuracy(state.correctChars, state.totalChars)}
            wordsCompleted={state.wordsCompleted}
            correctChars={state.correctChars}
            maxCombo={state.maxCombo}
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
