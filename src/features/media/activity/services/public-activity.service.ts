import { api } from "@/lib/axios";

import {
  PublicActivity,
  PublicActivityListParams,
  PublicActivityListResponse,
} from "../activity.types";

export const publicActivityService = {
  list: (params: PublicActivityListParams) =>
    api
      .get<{ data: PublicActivityListResponse }>("/activity", { params })
      .then((response) => response.data.data),

  detail: (slug: string) =>
    api
      .get<{ data: PublicActivity }>(`/activity/${slug}`)
      .then((response) => response.data.data),
};
