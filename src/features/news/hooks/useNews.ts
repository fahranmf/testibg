import { useQuery } from "@tanstack/react-query";

import { newsService } from "../services/news.service";
import { NewsListParams } from "../news.types";

export function useNews(params: NewsListParams) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => newsService.list(params),
    placeholderData: (prev) => prev, // biar gak flash empty pas ganti page/filter
  });
}