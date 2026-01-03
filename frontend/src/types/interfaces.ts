// ユーザー関連の型定義
export interface User {
  id: number;
  name: string;
  email: string;
}

// 認証レスポンスの型定義
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// APIエラーの型定義
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
