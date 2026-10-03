import { useQuery } from "@tanstack/react-query";

import { galleryService } from "../services/gallery.service";
import { GalleryListParams } from "../gallery.types";

export function useGalleries(params: GalleryListParams) {
  return useQuery({
    queryKey: ["galleries", params],
    queryFn: () => galleryService.list(params),
    placeholderData: (prev) => prev,
  });
}
