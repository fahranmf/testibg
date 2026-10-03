import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import type { CreateUserPayload, UpdateUserPayload } from "../user.types";
import { toastBridge } from "@/lib/toastBridge";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => userService.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastBridge().success(res.message);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserPayload;
    }) => userService.update(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastBridge().success(res.message);
    },
  });
}

export function useToggleUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.toggleActive(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastBridge().success(res.message);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.remove(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastBridge().success(res.message);
    },
  });
}
