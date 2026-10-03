import { api } from "@/lib/axios";

import type {
  UserListParams,
  UserListResponse,
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from "../user.types";

export const userService = {
  list: (params: UserListParams) =>
    api
      .get<{ data: UserListResponse }>("/admin/users", {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
          role: params.role && params.role !== "all" ? params.role : undefined,
        },
      })
      .then((r) => r.data.data),

  detail: (id: string) =>
    api.get<{ data: User }>(`/admin/users/${id}`).then((r) => r.data.data),

  create: (payload: CreateUserPayload) =>
    api
      .post<{ data: User; message: string }>("/admin/users", payload)
      .then((r) => r.data),

  update: (id: string, payload: UpdateUserPayload) =>
    api
      .put<{ data: User; message: string }>(`/admin/users/${id}`, payload)
      .then((r) => r.data),

  toggleActive: (id: string) =>
    api
      .patch<{ data: User; message: string }>(`/admin/users/${id}/toggle-active`)
      .then((r) => r.data),

  remove: (id: string) =>
    api
      .delete<{ message: string }>(`/admin/users/${id}`)
      .then((r) => r.data),
};
