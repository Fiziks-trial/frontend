"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_BASE_URL, api } from "./api";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (provider: "google" | "github") => void;
  logout: () => Promise<void>;
  setTokensFromCallback: (accessToken: string, refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "fiziks_auth";

function saveTokensToStorage(accessToken: string, refreshToken: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      TOKEN_STORAGE_KEY,
      JSON.stringify({ accessToken, refreshToken }),
    );
  }
}

function getTokensFromStorage(): {
  accessToken: string;
  refreshToken: string;
} | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function clearTokensFromStorage() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const { data, error } = await api.getMe();
    if (data && !error) {
      setUser(data);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const tokens = getTokensFromStorage();
    if (tokens) {
      api.setTokens(tokens.accessToken, tokens.refreshToken);
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = (provider: "google" | "github") => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  const logout = async () => {
    await api.logout();
    clearTokensFromStorage();
    setUser(null);
  };

  const setTokensFromCallback = (accessToken: string, refreshToken: string) => {
    api.setTokens(accessToken, refreshToken);
    saveTokensToStorage(accessToken, refreshToken);
    fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setTokensFromCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
