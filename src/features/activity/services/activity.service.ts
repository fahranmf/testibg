import { api } from "@/lib/axios";

import {
  ActivityDetail,
  ActivityListParams,
  ActivityListResponse,
  CreateActivityPayload,
  UpdateActivityPayload,
} from "../activity.types";

interface ActivityMutationResponse {
  success: boolean;
  code: number;
  message: string;
  data: ActivityDetail;
}

interface ActivityDeleteResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

const BASE_URL = "/admin/activity";

export const activityService = {
  list: (params: ActivityListParams) =>
    api
      .get<{ data: ActivityListResponse }>(BASE_URL, {
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
      .get<{ data: ActivityDetail }>(`${BASE_URL}/${id}`)
      .then((r) => r.data.data),

  create: (payload: CreateActivityPayload) =>
    api.post<ActivityMutationResponse>(BASE_URL, payload).then((r) => r.data),

  update: (id: string, payload: UpdateActivityPayload) =>
    api
      .patch<ActivityMutationResponse>(`${BASE_URL}/${id}`, payload)
      .then((r) => r.data),

  publish: (id: string) =>
    api
      .patch<ActivityMutationResponse>(`${BASE_URL}/${id}/publish`)
      .then((r) => r.data),

  archive: (id: string) =>
    api
      .patch<ActivityMutationResponse>(`${BASE_URL}/${id}/archive`)
      .then((r) => r.data),

  remove: (id: string) =>
    api.delete<ActivityDeleteResponse>(`${BASE_URL}/${id}`).then((r) => r.data),
};
