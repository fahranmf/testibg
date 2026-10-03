import { useQuery } from "@tanstack/react-query";

import { contactMessageService } from "../services/contact-message.service";

export function useContactMessageDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["contact-messages", "detail", id],
    queryFn: () => contactMessageService.detail(id as string),
    enabled: !!id,
  });
}
