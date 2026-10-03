export interface GalleryImage {
  id: string;
  imageKey: string;
  image: string;
  caption: string | null;
  sortOrder: number;
}

export interface GalleryPerson {
  id: string;
  name: string;
}

export interface Gallery {
  id: string;
  title: string;
  slug: string;
  eventDate: string | null;
  coverImage: string | null;
  createdAt: string;
  createdBy: GalleryPerson | null;
  updatedBy: GalleryPerson | null;
}

export interface GalleryDetail extends Gallery {
  description: string | null;
  coverImageKey: string | null;
  images: GalleryImage[];
  updatedAt: string;
}

export interface GalleryListParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: "title" | "eventDate" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface GalleryListResponse {
  galleries: Gallery[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GalleryImagePayload {
  imageKey: string;
  caption?: string;
  sortOrder: number;
}

export interface CreateGalleryPayload {
  title: string;
  slug: string;
  description?: string;
  eventDate?: string;
  coverImageKey?: string;
  images: GalleryImagePayload[];
}

export type UpdateGalleryPayload = Partial<CreateGalleryPayload>;
