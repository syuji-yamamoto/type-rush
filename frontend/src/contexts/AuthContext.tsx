import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/interfaces";
import {
  login as apiLogin,
  register as apiRegister,
  guestLogin as apiGuestLogin,
  logout as apiLogout,
  getUser,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (name: string, password: string) => Promise<void>;
  register: (
    name: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch {
          localStorage.removeItem("auth_token");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (name: string, password: string) => {
    const response = await apiLogin(name, password);
    localStorage.setItem("auth_token", response.token);
    setUser(response.user);
  };

  const register = async (
    name: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const response = await apiRegister(name, password, passwordConfirmation);
    localStorage.setItem("auth_token", response.token);
    setUser(response.user);
  };

  const guestLogin = async () => {
    const response = await apiGuestLogin();
    localStorage.setItem("auth_token", response.token);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        guestLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
