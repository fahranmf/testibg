import { useQuery } from "@tanstack/react-query";

import { PublicNewsListParams } from "../news.types";
import { publicNewsService } from "../services/public-news.service";

export function usePublicNews(params: PublicNewsListParams) {
  return useQuery({
    queryKey: ["public-news", params],
    queryFn: () => publicNewsService.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function usePublicNewsDetail(slug: string) {
  return useQuery({
    queryKey: ["public-news", "detail", slug],
    queryFn: () => publicNewsService.detail(slug),
    enabled: Boolean(slug),
  });
}
