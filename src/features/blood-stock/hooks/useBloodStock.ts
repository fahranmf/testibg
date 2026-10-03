import { useQuery } from "@tanstack/react-query";

import { bloodStockService } from "../services/blood-stock.service";
import { BloodStockListParams } from "../blood-stock.types";

export function usePublicBloodStock() {
  return useQuery({
    queryKey: ["blood-stock", "public"],
    queryFn: bloodStockService.listPublic,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBloodStock(params: BloodStockListParams) {
  return useQuery({
    queryKey: ["blood-stock", params],
    queryFn: () => bloodStockService.list(params),
    placeholderData: (prev) => prev,
  });
}
