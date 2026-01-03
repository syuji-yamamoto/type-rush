import apiClient from "./client";
import { User, AuthResponse } from "../types/interfaces";

// 新規登録
export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/register", {
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
  const response = await apiClient.post<AuthResponse>("/login", {
    email,
    password,
  });
  return response.data;
};

// ログアウト
export const logout = async (): Promise<void> => {
  await apiClient.post("/logout");
};

// ユーザー情報取得
export const getUser = async (): Promise<User> => {
  const response = await apiClient.get<{ user: User }>("/user");
  return response.data.user;
};

export default apiClient;
