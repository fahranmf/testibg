// features/auth/services/auth.service.ts

import { api } from "@/lib/axios";

import type {
  AuthUser,
  LoginPayload,
  LoginResult,
} from "../auth.types";

export const authService = {
  login: (payload: LoginPayload) =>
    api
      .post<{ data: LoginResult }>(
        "/auth/login",
        payload,
      )
      .then((res) => res.data.data),

  logout: () =>
    api.post("/auth/logout"),

  me: () =>
    api
      .get<{ data: AuthUser }>("/auth/me")
      .then((res) => res.data.data),
};