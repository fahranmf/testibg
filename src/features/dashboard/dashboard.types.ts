export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface StatusSummary {
  total: number;
  draft: number;
  published: number;
  archived: number;
}

export interface RecentNewsItem {
  newsId: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  category: string;
  status: ContentStatus;
  publishedAt: string | null;
}

export interface UpcomingDonorEvent {
  donorEventId: string;
  title: string;
  slug: string;
  startAt: string;
  endAt: string;
  location: string;
}

export interface RecentActivityItem {
  activityId: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  status: ContentStatus;
  eventDate: string;
}

export type BloodType = "A" | "B" | "AB" | "O";
export type Rhesus = "POSITIVE" | "NEGATIVE";

export interface BloodStockItem {
  bloodType: BloodType;
  rhesus: Rhesus;
  stock: number;
}

export interface DashboardData {
  summary: {
    news: StatusSummary;
    activities: StatusSummary;
    donorEvents: { upcoming: number };
    contactMessages: { unread: number };
  };
  recentNews: RecentNewsItem[];
  recentActivities: RecentActivityItem[];
  upcomingDonorEvents: UpcomingDonorEvent[];
  bloodStock: BloodStockItem[];
}

export const STATUS_LABELS: Record<ContentStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export const RHESUS_LABELS: Record<Rhesus, string> = {
  POSITIVE: "Rh+",
  NEGATIVE: "Rh-",
};
