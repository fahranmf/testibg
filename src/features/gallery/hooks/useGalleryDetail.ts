import { useQuery } from "@tanstack/react-query";

import { galleryService } from "../services/gallery.service";

export function useGalleryDetail(id: string) {
  return useQuery({
    queryKey: ["galleries", "detail", id],
    queryFn: () => galleryService.detail(id),
    enabled: !!id,
  });
}
