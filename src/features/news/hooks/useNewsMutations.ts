import { useMutation, useQueryClient } from "@tanstack/react-query";

import { newsService } from "../services/news.service";
import { CreateNewsPayload, UpdateNewsPayload } from "../news.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNewsPayload) =>
      newsService.create(payload),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateNewsPayload;
    }) => newsService.update(id, payload),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });

      queryClient.invalidateQueries({
        queryKey: ["news", "detail", variables.id],
      });

      toastBridge().success(res.message);
    },
  });
}

export function usePublishNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      newsService.publish(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useArchiveNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      newsService.archive(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      newsService.remove(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });

      toastBridge().success(res.message);
    },
  });
}