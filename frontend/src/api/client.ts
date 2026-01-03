import axios from "axios";
import { API_BASE_URL } from "../config/env";

// axiosインスタンスの作成（使い回し用）
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// リクエストインターセプター：トークンを自動で付与
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター：401エラー時の処理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 401エラー時にトークンを削除
      localStorage.removeItem("auth_token");

      // 既にログインページやレジスター画面にいる場合はリダイレクトしない（無限ループ防止）
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
