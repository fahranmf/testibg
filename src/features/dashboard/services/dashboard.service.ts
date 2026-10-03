import { api } from "@/lib/axios";

import type { DashboardData } from "../dashboard.types";

export const dashboardService = {
  get: () =>
    api
      .get<{ data: DashboardData }>("/admin/dashboard")
      .then((r) => r.data.data),
};
