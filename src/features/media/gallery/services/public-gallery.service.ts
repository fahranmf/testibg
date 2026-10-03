import { api } from "@/lib/axios";

import { PublicGallery } from "../gallery.types";

export const publicGalleryService = {
  list: () =>
    api
      .get<{ data: PublicGallery[] }>("/galleries")
      .then((response) => response.data.data),

  detail: (slug: string) =>
    api
      .get<{ data: PublicGallery }>(`/galleries/${slug}`)
      .then((response) => response.data.data),
};
