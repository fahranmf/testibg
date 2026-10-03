import { z } from "zod";

export const galleryFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul wajib diisi")
    .max(200, "Judul maksimal 200 karakter"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .max(200, "Slug maksimal 200 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format slug tidak valid"),

  description: z
    .string()
    .trim()
    .max(5000, "Deskripsi maksimal 5000 karakter")
    .optional(),

  eventDate: z.string().trim().optional(),

  coverImageKey: z.string().trim().optional(),

  images: z.array(
    z.object({
      _tempId: z.string(),
      imageKey: z.string(),
      caption: z.string().optional(),
      sortOrder: z.number(),
    }),
  ),
});

export type GalleryFormValues = z.infer<typeof galleryFormSchema>;

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
