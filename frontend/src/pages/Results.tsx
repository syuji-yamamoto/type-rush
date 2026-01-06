import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getScoreStats,
  getScoreHistory,
  type Score,
  type ScoreStats,
} from "../api/score";

function Results() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ScoreStats | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 認証チェック
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);
      try {
        const [statsData, historyData] = await Promise.all([
          getScoreStats(),
          getScoreHistory(20),
        ]);
        setStats(statsData);
        setScores(historyData.data);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
        setError("データの取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, authLoading, navigate]);

  // 認証確認中
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    );
  }

  // 未認証時はリダイレクト
  if (!isAuthenticated) {
    return null;
  }

  // エラー表示
  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="mb-8">
          <Link to="/" className="text-gray-300 hover:text-white">
            ← ホームに戻る
          </Link>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  // スコアがない場合
  if (scores.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="mb-8">
          <Link to="/" className="text-gray-300 hover:text-white">
            ← ホームに戻る
          </Link>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-8">スコア履歴</h1>
          <div className="bg-slate-800 rounded-lg p-8">
            <p className="text-gray-400 text-xl mb-4">まだスコアがありません</p>
            <p className="text-gray-500 mb-6">
              上級モードをクリアするとスコアが保存されます
            </p>
            <Link
              to="/game"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              練習を始める
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* ヘッダー */}
      <div className="mb-8">
        <Link to="/" className="text-gray-300 hover:text-white">
          ← ホームに戻る
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          スコア履歴
        </h1>

        {/* 統計サマリー */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-2">最高WPM</p>
              <p className="text-4xl font-bold text-cyan-400">
                {stats.best_wpm}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-2">平均WPM</p>
              <p className="text-4xl font-bold text-purple-400">
                {stats.avg_wpm}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-2">平均精度</p>
              <p className="text-4xl font-bold text-green-400">
                {stats.avg_accuracy}%
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-2">総プレイ数</p>
              <p className="text-4xl font-bold text-yellow-400">
                {stats.total_games}
              </p>
            </div>
          </div>
        )}

        {/* 履歴テーブル */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left text-gray-300 p-4">日時</th>
                <th className="text-center text-gray-300 p-4">WPM</th>
                <th className="text-center text-gray-300 p-4">精度</th>
                <th className="text-center text-gray-300 p-4">言語</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score.id} className="border-t border-slate-700">
                  <td className="text-gray-300 p-4">{score.played_at}</td>
                  <td className="text-center p-4">
                    <span
                      className={`font-bold ${
                        stats && score.wpm === stats.best_wpm
                          ? "text-cyan-400"
                          : "text-white"
                      }`}
                    >
                      {score.wpm}
                    </span>
                  </td>
                  <td className="text-center p-4">
                    <span
                      className={`${
                        score.accuracy >= 95
                          ? "text-green-400"
                          : score.accuracy >= 90
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {score.accuracy}%
                    </span>
                  </td>
                  <td className="text-center p-4 text-gray-400">
                    {score.language === "english" ? "EN" : "JP"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 練習開始ボタン */}
        <div className="text-center mt-8">
          <Link
            to="/game"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            練習を始める
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
