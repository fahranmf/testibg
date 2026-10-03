import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import type { UserListParams } from "../user.types";

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.list(params),
    placeholderData: (prev) => prev,
  });
}
