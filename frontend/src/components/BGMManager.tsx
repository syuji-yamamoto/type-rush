import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAudioContext, BGMScene } from "../contexts/AudioContext";

/**
 * ゲーム状態を受け取るためのPropsインターフェース
 * ゲームページ以外では渡す必要なし
 */
interface BGMManagerProps {
  /** ゲームの状態（ゲームページでのみ使用） */
  gameStatus?: "ready" | "playing" | "finished";
  /** 難易度（ゲームプレイ中のみ使用） */
  difficulty?: "beginner" | "intermediate" | "advanced";
}

/**
 * ルーティングとゲーム状態に基づいてBGMを自動管理するコンポーネント
 *
 * 機能:
 * - /home, /login, /register, /results: メニューBGM
 * - /game 準備画面: メニューBGM
 * - /game プレイ中: 難易度に応じたBGM
 * - /game 終了画面: BGMなし（サイレント）
 *
 * 使用方法:
 * - 基本的な使用: <BGMManager />
 * - ゲームページ: <BGMManager gameStatus={status} difficulty={difficulty} />
 */
export const BGMManager: React.FC<BGMManagerProps> = ({
  gameStatus,
  difficulty,
}) => {
  const location = useLocation();
  const { setBGMScene, playResultSE } = useAudioContext();
  const previousStatusRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const pathname = location.pathname;
    let scene: BGMScene = "menu";

    // ゲームページの場合
    if (pathname === "/game") {
      switch (gameStatus) {
        case "ready":
          // 準備画面: メニューBGM
          scene = "menu";
          break;
        case "playing":
          // ゲーム中: 難易度に応じたBGM
          if (difficulty) {
            scene = `game-${difficulty}` as BGMScene;
          }
          break;
        case "finished":
          // 終了画面: BGMなし、終了SEを一度だけ再生
          scene = "silent";
          // 前の状態がplayingだった場合のみ終了SEを再生
          if (previousStatusRef.current === "playing") {
            playResultSE();
          }
          break;
        default:
          scene = "menu";
      }
    } else {
      // その他のページ: メニューBGM
      // /home, /login, /register, /results
      scene = "menu";
    }

    setBGMScene(scene);
    previousStatusRef.current = gameStatus;
  }, [location.pathname, gameStatus, difficulty, setBGMScene, playResultSE]);

  return null; // このコンポーネントはUIを持たない
};

export default BGMManager;
