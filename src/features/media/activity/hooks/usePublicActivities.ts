import { useQuery } from "@tanstack/react-query";

import { PublicActivityListParams } from "../activity.types";
import { publicActivityService } from "../services/public-activity.service";

export function usePublicActivities(params: PublicActivityListParams) {
  return useQuery({
    queryKey: ["public-activities", params],
    queryFn: () => publicActivityService.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function usePublicActivityDetail(slug: string) {
  return useQuery({
    queryKey: ["public-activities", "detail", slug],
    queryFn: () => publicActivityService.detail(slug),
    enabled: Boolean(slug),
  });
}
