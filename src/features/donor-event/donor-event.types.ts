export type DonorEventStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export const DONOR_EVENT_STATUS_LABELS: Record<DonorEventStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export interface DonorEventPerson {
  id: string;
  name: string;
}

export interface DonorEvent {
  id: string;
  title: string;
  slug: string;
  startAt: string;
  endAt: string;
  location: string;
  address: string | null;
  contactInfo: string | null;
  status: DonorEventStatus;
  publishedAt: string | null;
  createdAt: string;
}

export interface DonorEventDetail extends DonorEvent {
  description: string | null;
  registrationUrl: string | null;
  updatedAt: string;
  createdBy: DonorEventPerson | null;
  updatedBy: DonorEventPerson | null;
}

export interface PublicDonorEvent {
  id: string;
  title: string;
  slug: string;
  startAt: string;
  endAt: string;
  location: string;
  address: string | null;
  contactInfo: string | null;
  status: DonorEventStatus;
  publishedAt: string | null;
}

export interface PublicDonorEventDetail extends PublicDonorEvent {
  description: string | null;
  registrationUrl: string | null;
}

export interface DonorEventListParams {
  page: number;
  limit: number;
  search?: string;
  status?: DonorEventStatus | "all";
  sortBy?: "title" | "startAt" | "createdAt" | "publishedAt";
  sortOrder?: "asc" | "desc";
}

export interface DonorEventListResponse {
  donorEvents: DonorEvent[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateDonorEventPayload {
  title: string;
  slug: string;
  description?: string;
  startAt: string;
  endAt: string;
  location: string;
  address?: string;
  contactInfo?: string;
  registrationUrl?: string;
}

export type UpdateDonorEventPayload = Partial<CreateDonorEventPayload>;
