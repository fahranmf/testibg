export interface PublicActivityImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}

export interface PublicActivity {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  eventDate: string;
  thumbnail: string | null;
  publishedAt: string | null;
  images: PublicActivityImage[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicActivitySummary {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  eventDate: string;
  thumbnail: string | null;
  publishedAt: string | null;
  createdAt: string;
}

export interface PublicActivityListParams {
  page: number;
  limit: number;
}

export interface PublicActivityListResponse {
  activities: PublicActivitySummary[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
