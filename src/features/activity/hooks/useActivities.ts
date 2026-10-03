import { useQuery } from "@tanstack/react-query";

import { activityService } from "../services/activity.service";
import { ActivityListParams } from "../activity.types";

export function useActivities(params: ActivityListParams) {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => activityService.list(params),
    placeholderData: (prev) => prev,
  });
}