import { api } from "@/lib/axios";

import {
  PublicDonorEvent,
  PublicDonorEventDetail,
} from "../donor-event.types";

interface PublicDonorEventResponse {
  success: boolean;
  code: number;
  message: string;
  data: PublicDonorEvent[];
}

interface PublicDonorEventDetailResponse {
  success: boolean;
  code: number;
  message: string;
  data: PublicDonorEventDetail;
}

export const donorEventPublicService = {
  listUpcoming: () =>
    api
      .get<PublicDonorEventResponse>("/donor-event")
      .then((r) => r.data.data),

  detail: (slug: string) =>
    api
      .get<PublicDonorEventDetailResponse>(`/donor-event/${slug}`)
      .then((r) => r.data.data),
};
