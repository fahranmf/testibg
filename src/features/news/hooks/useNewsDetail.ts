import { useQuery } from "@tanstack/react-query";

import { newsService } from "../services/news.service";

export function useNewsDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["news", "detail", id],
    queryFn: () => newsService.detail(id as string),
    enabled: !!id,
  });
}