import { useQuery } from "@tanstack/react-query";

import { donorEventService } from "../services/donor-event.service";
import { DonorEventListParams } from "../donor-event.types";

export function useDonorEvents(params: DonorEventListParams) {
  return useQuery({
    queryKey: ["donor-events", params],
    queryFn: () => donorEventService.list(params),
    placeholderData: (prev) => prev,
  });
}
