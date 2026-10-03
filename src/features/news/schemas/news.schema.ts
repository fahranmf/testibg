import { z } from "zod";

const newsCategorySchema = z.enum([
  "DONOR_DARAH",
  "KEMANUSIAAN",
  "KEBENCANAAN",
  "RELAWAN",
  "EDUKASI",
]);

export const newsFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul wajib diisi")
    .max(200, "Judul maksimal 200 karakter"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .max(250, "Slug maksimal 250 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format slug tidak valid"),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt maksimal 500 karakter")
    .optional()
    .or(z.literal("")),

  content: z.string().trim().min(1, "Konten wajib diisi"),

  thumbnailKey: z.string().trim().optional().or(z.literal("")),

  category: newsCategorySchema,
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

// Slug auto-generator dipakai di form — bukan bagian skema, tapi helper
// yang natural ditaruh bareng.
export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}