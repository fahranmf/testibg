
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityService } from "../services/activity.service";
import {
  CreateActivityPayload,
  UpdateActivityPayload,
} from "../activity.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateActivityPayload) =>
      activityService.create(payload),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateActivityPayload;
    }) => activityService.update(id, payload),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["activities", "detail", variables.id],
      });

      toastBridge().success(res.message);
    },
  });
}

export function usePublishActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      activityService.publish(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useArchiveActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      activityService.archive(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      activityService.remove(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      toastBridge().success(res.message);
    },
  });
}
