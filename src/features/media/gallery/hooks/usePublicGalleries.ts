import { useQuery } from "@tanstack/react-query";

import { publicGalleryService } from "../services/public-gallery.service";

export function usePublicGalleries() {
  return useQuery({
    queryKey: ["public-galleries"],
    queryFn: publicGalleryService.list,
  });
}

export function usePublicGalleryDetail(slug: string) {
  return useQuery({
    queryKey: ["public-galleries", slug],
    queryFn: () => publicGalleryService.detail(slug),
    enabled: Boolean(slug),
  });
}
