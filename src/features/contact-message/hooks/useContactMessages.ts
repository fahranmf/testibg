import { useQuery } from "@tanstack/react-query";

import { contactMessageService } from "../services/contact-message.service";
import { ContactMessageListParams } from "../contact-message.types";

export function useContactMessages(params: ContactMessageListParams) {
  return useQuery({
    queryKey: ["contact-messages", params],
    queryFn: () => contactMessageService.list(params),
    placeholderData: (prev) => prev,
  });
}
