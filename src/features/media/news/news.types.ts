export type PublicNewsCategory =
  | "DONOR_DARAH"
  | "KEMANUSIAAN"
  | "KEBENCANAAN"
  | "RELAWAN"
  | "EDUKASI";

export const PUBLIC_NEWS_CATEGORY_LABELS: Record<
  PublicNewsCategory,
  string
> = {
  DONOR_DARAH: "Donor Darah",
  KEMANUSIAAN: "Kemanusiaan",
  KEBENCANAAN: "Kebencanaan",
  RELAWAN: "Relawan",
  EDUKASI: "Edukasi",
};

export interface PublicNews {
  newsId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  category: PublicNewsCategory;
  publishedAt: string;
}

export interface PublicNewsDetail extends PublicNews {
  content: string;
  updatedAt: string;
}

export interface PublicNewsListResponse {
  news: PublicNews[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PublicNewsListParams {
  page: number;
  limit: number;
  category?: PublicNewsCategory;
}
