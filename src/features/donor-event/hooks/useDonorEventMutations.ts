import { useMutation, useQueryClient } from "@tanstack/react-query";

import { donorEventService } from "../services/donor-event.service";
import {
  CreateDonorEventPayload,
  UpdateDonorEventPayload,
} from "../donor-event.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateDonorEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDonorEventPayload) =>
      donorEventService.create(payload),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["donor-events"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useUpdateDonorEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateDonorEventPayload;
    }) => donorEventService.update(id, payload),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["donor-events"],
      });

      queryClient.invalidateQueries({
        queryKey: ["donor-events", "detail", variables.id],
      });

      toastBridge().success(res.message);
    },
  });
}

export function usePublishDonorEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => donorEventService.publish(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["donor-events"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useArchiveDonorEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => donorEventService.archive(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["donor-events"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useDeleteDonorEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => donorEventService.remove(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["donor-events"],
      });

      toastBridge().success(res.message);
    },
  });
}
