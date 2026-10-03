import { api } from "@/lib/axios";

import {
  GalleryDetail,
  GalleryListParams,
  GalleryListResponse,
  CreateGalleryPayload,
  UpdateGalleryPayload,
} from "../gallery.types";

interface GalleryMutationResponse {
  success: boolean;
  code: number;
  message: string;
  data: GalleryDetail;
}

interface GalleryDeleteResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

const BASE_URL = "/admin/galleries";

export const galleryService = {
  list: (params: GalleryListParams) =>
    api
      .get<{ data: GalleryListResponse }>(BASE_URL, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
        },
      })
      .then((r) => r.data.data),

  detail: (id: string) =>
    api
      .get<{ data: GalleryDetail }>(`${BASE_URL}/${id}`)
      .then((r) => r.data.data),

  create: (payload: CreateGalleryPayload) =>
    api.post<GalleryMutationResponse>(BASE_URL, payload).then((r) => r.data),

  update: (id: string, payload: UpdateGalleryPayload) =>
    api
      .patch<GalleryMutationResponse>(`${BASE_URL}/${id}`, payload)
      .then((r) => r.data),

  remove: (id: string) =>
    api.delete<GalleryDeleteResponse>(`${BASE_URL}/${id}`).then((r) => r.data),
};
