// 環境変数からAPIのベースURLを取得
// 本番環境では VITE_API_BASE_URL を設定し、ローカル開発では未設定の場合デフォルト値を使用
const isDevelopment = import.meta.env.DEV;
const defaultLocalUrl = "http://localhost:8000/api";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 本番環境で VITE_API_BASE_URL が未設定の場合はエラーを投げる
if (!isDevelopment && !apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL must be set in production environment. " +
      "Please set this environment variable before building."
  );
}

export const API_BASE_URL = apiBaseUrl || defaultLocalUrl;
