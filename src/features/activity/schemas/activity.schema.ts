import { z } from "zod";

export const activityFormSchema = z.object({
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
    .min(1, "Deskripsi wajib diisi")
    .max(10000, "Deskripsi maksimal 10000 karakter"),

  eventDate: z.string().trim().min(1, "Tanggal kegiatan wajib diisi"),

  location: z.string().trim().max(200, "Lokasi maksimal 200 karakter").optional(),

  thumbnailKey: z.string().trim().optional(),

 images: z.array(
    z.object({
      _tempId: z.string(),
      imageKey: z.string(),
      imageUrl: z.string().optional(),
      sortOrder: z.number(),
      caption: z.string().optional(),
    })
  ),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}