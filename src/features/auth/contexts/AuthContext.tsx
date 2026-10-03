"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import type {
  AuthUser,
  LoginPayload,
} from "../auth.types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;

  login: (payload: LoginPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(initialUser);

  const [isLoading, setIsLoading] =
    useState(true);

  const queryClient = useQueryClient();

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.me();

      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialUser) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, [initialUser, refreshUser]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);

      try {
        const result = await authService.login(payload);

        setUser(result.user);
        return result.user;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      queryClient.clear();
    }
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth harus dipakai di dalam <AuthProvider>",
    );
  }

  return context;
}
