import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactMessageService } from "../services/contact-message.service";
import { CreateContactMessagePayload } from "../contact-message.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: (payload: CreateContactMessagePayload) =>
      contactMessageService.create(payload),
  });
}

export function useMarkContactMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactMessageService.markRead(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["contact-messages"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useMarkContactMessageUnread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactMessageService.markUnread(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["contact-messages"],
      });

      toastBridge().success(res.message);
    },
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactMessageService.remove(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["contact-messages"],
      });

      toastBridge().success(res.message);
    },
  });
}
