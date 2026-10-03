import { api } from "@/lib/axios";

import {
  CreateNewsPayload,
  NewsDetail,
  NewsListParams,
  NewsListResponse,
  UpdateNewsPayload,
} from "../news.types";

interface NewsMutationResponse {
  data: NewsDetail;
  message: string;
}

export const newsService = {
  list: (params: NewsListParams) =>
    api
      .get<{ data: NewsListResponse }>("/admin/news", {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
          status:
            params.status && params.status !== "all"
              ? params.status
              : undefined,
          category:
            params.category && params.category !== "all"
              ? params.category
              : undefined,
          sortBy: params.sortBy || undefined,
          sortOrder: params.sortOrder || undefined,
        },
      })
      .then((r) => r.data.data),

  detail: (id: string) =>
    api
      .get<{ data: NewsDetail }>(`/admin/news/${id}`)
      .then((r) => r.data.data),

  create: (payload: CreateNewsPayload) =>
    api
      .post<NewsMutationResponse>("/admin/news", payload)
      .then((r) => r.data),

  update: (id: string, payload: UpdateNewsPayload) => {
    return api
      .patch<NewsMutationResponse>(
        `/admin/news/${id}`,
        payload,
      )
      .then((r) => r.data);
  },

  publish: (id: string) =>
    api
      .patch<NewsMutationResponse>(
        `/admin/news/${id}/publish`,
      )
      .then((r) => r.data),

  archive: (id: string) =>
    api
      .patch<NewsMutationResponse>(
        `/admin/news/${id}/archive`,
      )
      .then((r) => r.data),

  remove: (id: string) =>
    api
      .delete<{ message: string }>(`/admin/news/${id}`)
      .then((r) => r.data),
};
