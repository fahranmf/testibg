export type NewsCategory =
  | "DONOR_DARAH"
  | "KEMANUSIAAN"
  | "KEBENCANAAN"
  | "RELAWAN"
  | "EDUKASI";

export type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  DONOR_DARAH: "Donor Darah",
  KEMANUSIAAN: "Kemanusiaan",
  KEBENCANAAN: "Kebencanaan",
  RELAWAN: "Relawan",
  EDUKASI: "Edukasi",
};

export const NEWS_STATUS_LABELS: Record<NewsStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

// Shape returned by newsMapper (list rows) — field names match news.mapper.js persis
export interface News {
  newsId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null; // full public URL, udah di-resolve di backend
  category: NewsCategory;
  status: NewsStatus;
  publishedAt: string | null;
  createdAt: string;
}

// Shape returned by newsDetailMapper
export interface NewsDetail extends News {
  content: string;
  updatedAt: string;
  createdBy: { userId: string; name: string } | null;
  updatedBy: { userId: string; name: string } | null;
}

export interface NewsListParams {
  page: number;
  limit: number;
  search?: string;
  status?: NewsStatus | "all";
  category?: NewsCategory | "all";
  sortBy?: "title" | "category" | "publishedAt" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface NewsListResponse {
  news: News[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateNewsPayload {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  thumbnailKey?: string;
  category: NewsCategory;
}

export type UpdateNewsPayload = Partial<CreateNewsPayload>;