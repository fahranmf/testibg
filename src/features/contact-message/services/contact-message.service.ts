import { api } from "@/lib/axios";

import {
  ContactMessageDetail,
  ContactMessageListParams,
  ContactMessageListResponse,
  CreateContactMessagePayload,
} from "../contact-message.types";

interface MutationResponse {
  success: boolean;
  code: number;
  message: string;
  data: ContactMessageDetail;
}

interface DeleteResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

const BASE_URL = "/admin/contact-message";

export const contactMessageService = {
  create: (payload: CreateContactMessagePayload) =>
    api
      .post<MutationResponse>("/contact-message", payload)
      .then((r) => r.data),

  list: (params: ContactMessageListParams) =>
    api
      .get<{ data: ContactMessageListResponse }>(BASE_URL, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
          status:
            params.status && params.status !== "all"
              ? params.status.toLowerCase()
              : undefined,
        },
      })
      .then((r) => r.data.data),

  detail: (id: string) =>
    api
      .get<{ data: ContactMessageDetail }>(`${BASE_URL}/${id}`)
      .then((r) => r.data.data),

  markRead: (id: string) =>
    api
      .patch<MutationResponse>(`${BASE_URL}/${id}/read`)
      .then((r) => r.data),

  markUnread: (id: string) =>
    api
      .patch<MutationResponse>(`${BASE_URL}/${id}/unread`)
      .then((r) => r.data),

  remove: (id: string) =>
    api
      .delete<DeleteResponse>(`${BASE_URL}/${id}`)
      .then((r) => r.data),
};
