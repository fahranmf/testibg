export type ActivityStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export interface ActivityImage {
  id: string;
  imageKey: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}

export interface ActivityPerson {
  id: string;
  name: string;
}

// Shape shared oleh list row & detail (list-nya udah lengkap semua field
// kecuali `description` & `updatedAt`, beda dari News yang list-nya ringkas)
export interface Activity {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  eventDate: string;
  thumbnail: string | null;
  publishedAt: string | null;
  images: ActivityImage[];
  createdAt: string;
  status: ActivityStatus;
  createdBy: ActivityPerson | null;
  updatedBy: ActivityPerson | null;
}

export interface ActivityDetail extends Activity {
  description: string;
  updatedAt: string;
}

export interface ActivityListParams {
  page: number;
  limit: number;
  search?: string;
  status?: ActivityStatus | "all";
  sortBy?: "title" | "eventDate" | "publishedAt" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ActivityListResponse {
  activities: Activity[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ActivityImagePayload {
  imageKey: string;
  caption?: string;
  sortOrder: number;
}

export interface CreateActivityPayload {
  title: string;
  slug: string;
  description: string;
  location?: string;
  eventDate: string;
  thumbnailKey?: string;
  status?: ActivityStatus;
  images: ActivityImagePayload[];
}

export type UpdateActivityPayload = Partial<CreateActivityPayload>;