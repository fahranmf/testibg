export type ContactMessageStatus = "READ" | "UNREAD";

export const CONTACT_MESSAGE_STATUS_LABELS: Record<
  ContactMessageStatus,
  string
> = {
  UNREAD: "Belum Dibaca",
  READ: "Dibaca",
};

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  excerpt: string | null;
  status: ContactMessageStatus;
  createdAt: string;
}

export interface ContactMessageDetail extends ContactMessage {
  message: string;
  updatedAt: string;
}

export interface CreateContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactMessageListParams {
  page: number;
  limit: number;
  search?: string;
  status?: ContactMessageStatus | "all";
}

export interface ContactMessageListResponse {
  messages: ContactMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
