export interface PublicGalleryImage {
  id: string;
  image: string;
  caption: string | null;
  sortOrder: number;
}

export interface PublicGallery {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  eventDate: string | null;
  coverImage: string | null;
  images: PublicGalleryImage[];
  createdAt: string;
  updatedAt: string;
}
