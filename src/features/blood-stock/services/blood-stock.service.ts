import { api } from "@/lib/axios";

import { BloodStock, BloodStockListParams } from "../blood-stock.types";

interface MutationResponse {
  message: string;
}

type PublicBloodStock = Pick<
  BloodStock,
  "bloodStockId" | "bloodType" | "rhesus" | "stock" | "updatedAt"
>;

export const bloodStockService = {
  listPublic: () =>
    api
      .get<{ data: PublicBloodStock[] }>("/blood-stock")
      .then((r) => r.data.data),

  update: (id: string, stock: number) =>
    api
      .patch<{ data: BloodStock } & MutationResponse>(
        `/admin/blood-stock/${id}`,
        { stock },
      )
      .then((r) => r.data),

  list: (params: BloodStockListParams) =>
    api
      .get<{ data: BloodStock[] }>("/admin/blood-stock", {
        params: {
          type:
            params.type && params.type !== "all"
              ? params.type
              : undefined,
          rhesus:
            params.rhesus && params.rhesus !== "all"
              ? params.rhesus
              : undefined,
          sortOrder: params.sortOrder || undefined,
        },
      })
      .then((r) => r.data.data),
};
