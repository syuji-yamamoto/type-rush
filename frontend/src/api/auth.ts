import axios from "axios";

// TODO: 本番とローカルで切り分け。環境変数から取得するように変更
const API_URL = "http://localhost:8000/api";

// TODO: axiosのインスタンスを使い回すように修正
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// リクエストインターセプター：トークンを自動で付与
api.interceptors.request.use(
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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// 新規登録
export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  return response.data;
};

// ログイン
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/login", {
    email,
    password,
  });
  return response.data;
};

// ログアウト
export const logout = async (): Promise<void> => {
  await api.post("/logout");
};

// ユーザー情報取得
export const getUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>("/user");
  return response.data.user;
};

export default api;
