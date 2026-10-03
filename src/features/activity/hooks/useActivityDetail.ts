import { useQuery } from "@tanstack/react-query";

import { activityService } from "../services/activity.service";

export function useActivityDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["activities", "detail", id],
    queryFn: () => activityService.detail(id as string),
    enabled: !!id,
  });
}