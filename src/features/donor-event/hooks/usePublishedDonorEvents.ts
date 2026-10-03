import { useQuery } from "@tanstack/react-query";

import { donorEventPublicService } from "../services/donor-event-public.service";

export function usePublishedDonorEvents() {
  return useQuery({
    queryKey: ["donor-events", "published"],
    queryFn: () => donorEventPublicService.listUpcoming(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublishedDonorEventDetail(slug: string) {
  return useQuery({
    queryKey: ["donor-events", "published", slug],
    queryFn: () => donorEventPublicService.detail(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}
