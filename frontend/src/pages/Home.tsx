import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AudioControl } from "../components/AudioControl";
import { BGMManager } from "../components/BGMManager";
import { Footer } from "../components/Footer";

function Home() {
  const { user, isAuthenticated, isLoading, logout, guestLogin } = useAuth();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    try {
      await guestLogin();
    } catch (error) {
      console.error("ゲストログインに失敗しました", error);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* BGM自動管理 */}
      <BGMManager />

      {/* 音量コントロール */}
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>

      <div className="text-center">
        {/* ログイン中のユーザー表示 */}
        {isAuthenticated && user && (
          <div className="mb-6">
            <p className="text-xl text-cyan-400">ようこそ、{user.name}さん</p>
          </div>
        )}

        <h1 className="text-6xl font-bold text-white mb-4">
          Type<span className="text-cyan-400">Rush</span>
        </h1>
        <p className="text-gray-300 text-xl mb-2">
          1分間のタイピングチャレンジ
        </p>

        <div className="space-y-4">
          <Link
            to="/game"
            className="block w-64 mx-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            ゲームを始める
          </Link>

          <Link
            to="/results"
            className="block w-64 mx-auto bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            スコア履歴
          </Link>

          <div className="flex justify-center gap-4 mt-8">
            {isLoading ? (
              <span className="text-gray-500">読み込み中...</span>
            ) : isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                ログアウト
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleGuestLogin}
                  disabled={isGuestLoading}
                  className="block w-64 mx-auto bg-green-500 hover:bg-green-600 disabled:bg-green-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  {isGuestLoading ? "ログイン中..." : "ゲストとしてプレイ"}
                </button>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    ログイン
                  </Link>
                  <span className="text-gray-500">|</span>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    新規登録
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* このアプリについてリンク */}
          <div className="mt-8">
            <Link
              to="/about"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              このアプリについて
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
