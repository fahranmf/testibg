import { useQuery } from "@tanstack/react-query";

import { donorEventService } from "../services/donor-event.service";

export function useDonorEventDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["donor-events", "detail", id],
    queryFn: () => donorEventService.detail(id as string),
    enabled: !!id,
  });
}
