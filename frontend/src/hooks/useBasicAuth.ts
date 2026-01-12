import { useState, useEffect } from "react";

const AUTH_KEY = "basic_auth_timestamp";
const AUTH_CHECK_INTERVAL = 60 * 1000; // 1分（ミリ秒）
const AUTH_DURATION = 60 * AUTH_CHECK_INTERVAL; // 1時間（ミリ秒）
const CORRECT_USERNAME = "admin";
const CORRECT_PASSWORD = "type-rush";

interface AuthState {
  isAuthenticated: boolean;
  showAuthDialog: boolean;
}

export const useBasicAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    showAuthDialog: false,
  });

  // 認証状態のチェック
  const checkAuth = () => {
    const authTimestamp = sessionStorage.getItem(AUTH_KEY);

    if (!authTimestamp) {
      return false;
    }

    const timestamp = parseInt(authTimestamp, 10);
    const currentTime = Date.now();
    const elapsed = currentTime - timestamp;

    // 1時間経過していないかチェック
    if (elapsed < AUTH_DURATION) {
      return true;
    } else {
      // 期限切れの場合はセッションストレージをクリア
      sessionStorage.removeItem(AUTH_KEY);
      return false;
    }
  };

  // 認証を実行
  const authenticate = (username: string, password: string): boolean => {
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      // 認証成功時に現在のタイムスタンプを保存
      sessionStorage.setItem(AUTH_KEY, Date.now().toString());
      setAuthState({
        isAuthenticated: true,
        showAuthDialog: false,
      });
      return true;
    }
    return false;
  };

  // ログアウト
  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthState({
      isAuthenticated: false,
      showAuthDialog: true,
    });
  };

  // 初回マウント時と定期的に認証状態をチェック
  useEffect(() => {
    const isAuth = checkAuth();
    setAuthState({
      isAuthenticated: isAuth,
      showAuthDialog: !isAuth,
    });

    // 1分ごとに認証状態をチェック
    const interval = setInterval(() => {
      const isAuth = checkAuth();
      if (!isAuth && authState.isAuthenticated) {
        setAuthState({
          isAuthenticated: false,
          showAuthDialog: true,
        });
      }
    }, AUTH_CHECK_INTERVAL); // 1分ごとにチェック

    return () => clearInterval(interval);
  }, []);

  return {
    ...authState,
    authenticate,
    logout,
  };
};
