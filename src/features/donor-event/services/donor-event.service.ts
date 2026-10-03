import { api } from "@/lib/axios";

import {
  DonorEventDetail,
  DonorEventListParams,
  DonorEventListResponse,
  CreateDonorEventPayload,
  UpdateDonorEventPayload,
} from "../donor-event.types";

interface DonorEventMutationResponse {
  success: boolean;
  code: number;
  message: string;
  data: DonorEventDetail;
}

interface DonorEventDeleteResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

const BASE_URL = "/admin/donor-event";

export const donorEventService = {
  list: (params: DonorEventListParams) =>
    api
      .get<{ data: DonorEventListResponse }>(BASE_URL, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
          status:
            params.status && params.status !== "all"
              ? params.status
              : undefined,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
        },
      })
      .then((r) => r.data.data),

  detail: (id: string) =>
    api
      .get<{ data: DonorEventDetail }>(`${BASE_URL}/${id}`)
      .then((r) => r.data.data),

  create: (payload: CreateDonorEventPayload) =>
    api
      .post<DonorEventMutationResponse>(BASE_URL, payload)
      .then((r) => r.data),

  update: (id: string, payload: UpdateDonorEventPayload) =>
    api
      .patch<DonorEventMutationResponse>(`${BASE_URL}/${id}`, payload)
      .then((r) => r.data),

  publish: (id: string) =>
    api
      .patch<DonorEventMutationResponse>(`${BASE_URL}/${id}/publish`)
      .then((r) => r.data),

  archive: (id: string) =>
    api
      .patch<DonorEventMutationResponse>(`${BASE_URL}/${id}/archive`)
      .then((r) => r.data),

  remove: (id: string) =>
    api
      .delete<DonorEventDeleteResponse>(`${BASE_URL}/${id}`)
      .then((r) => r.data),
};
