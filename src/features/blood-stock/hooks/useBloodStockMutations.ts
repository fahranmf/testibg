import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bloodStockService } from "../services/blood-stock.service";
import { toastBridge } from "@/lib/toastBridge";

export function useUpdateBloodStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      stock,
    }: {
      id: string;
      stock: number;
    }) => bloodStockService.update(id, stock),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["blood-stock"],
      });

      toastBridge().success(res.message);
    },
  });
}
