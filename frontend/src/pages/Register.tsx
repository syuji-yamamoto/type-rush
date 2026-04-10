import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AudioControl } from "../components/AudioControl";
import { AxiosError } from "axios";
import { ApiError } from "../types/interfaces";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("パスワードが一致しません");
      return;
    }

    setIsLoading(true);

    try {
      await register(name, password, passwordConfirmation);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setError(errorMessages.join("\n"));
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("登録に失敗しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 音量コントロール */}
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          新規登録
        </h1>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8">
          {error && (
            <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 whitespace-pre-line">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">ニックネーム</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="ニックネーム（1〜20文字）"
              required
              maxLength={20}
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="4文字以上"
              required
              minLength={4}
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              パスワード（確認）
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full bg-slate-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="もう一度入力"
              required
              minLength={4}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            {isLoading ? "登録中..." : "登録"}
          </button>

          <p className="text-gray-400 text-sm text-center mt-4">
            メールアドレスは不要です。ニックネームとパスワードだけで登録できます。
          </p>

          <p className="text-gray-400 text-center mt-4">
            すでにアカウントをお持ちの方は{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              ログイン
            </Link>
          </p>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
