import apiClient from "./client";
import { User, AuthResponse } from "../types/interfaces";

// 新規登録（ニックネーム認証）
export const register = async (
  name: string,
  password: string,
  password_confirmation: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/register", {
    name,
    password,
    password_confirmation,
  });
  return response.data;
};

// ログイン（ニックネーム認証）
export const login = async (
  name: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/login", {
    name,
    password,
  });
  return response.data;
};

// ゲストログイン
export const guestLogin = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/guest-login");
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
