import { api } from "@/lib/axios";

import {
  PublicNewsDetail,
  PublicNewsListParams,
  PublicNewsListResponse,
} from "../news.types";

export const publicNewsService = {
  list: (params: PublicNewsListParams) =>
    api
      .get<{ data: PublicNewsListResponse }>("/news", {
        params: {
          page: params.page,
          limit: params.limit,
          category: params.category,
        },
      })
      .then((response) => response.data.data),

  detail: (slug: string) =>
    api
      .get<{ data: PublicNewsDetail }>(`/news/${slug}`)
      .then((response) => response.data.data),
};
