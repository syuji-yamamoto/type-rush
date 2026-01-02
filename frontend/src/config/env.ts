// 環境変数からAPIのベースURLを取得
// 本番環境では VITE_API_BASE_URL を設定し、ローカル開発では未設定の場合デフォルト値を使用
const isDevelopment = import.meta.env.DEV;
const defaultLocalUrl = "http://localhost:8000/api";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || (isDevelopment ? defaultLocalUrl : "");
