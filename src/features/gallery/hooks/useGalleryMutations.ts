import { useMutation, useQueryClient } from "@tanstack/react-query";

import { galleryService } from "../services/gallery.service";
import {
  CreateGalleryPayload,
  UpdateGalleryPayload,
} from "../gallery.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGalleryPayload) =>
      galleryService.create(payload),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["galleries"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useUpdateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateGalleryPayload;
    }) => galleryService.update(id, payload),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["galleries"],
      });

      queryClient.invalidateQueries({
        queryKey: ["galleries", "detail", variables.id],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useDeleteGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      galleryService.remove(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["galleries"],
      });

      toastBridge().success(res.message);
    },
  });
}
