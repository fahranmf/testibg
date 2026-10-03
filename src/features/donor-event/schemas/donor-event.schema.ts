import { z } from "zod";

export const donorEventFormSchema = z
  .object({
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

    eventDate: z.string().trim().min(1, "Tanggal pelaksanaan wajib diisi"),

    startTime: z.string().trim().min(1, "Jam mulai wajib diisi"),

    endTime: z.string().trim().min(1, "Jam selesai wajib diisi"),

    location: z
      .string()
      .trim()
      .min(1, "Lokasi wajib diisi")
      .max(200, "Lokasi maksimal 200 karakter"),

    address: z
      .string()
      .trim()
      .max(500, "Alamat maksimal 500 karakter")
      .optional(),

    contactInfo: z
      .string()
      .trim()
      .max(200, "Informasi kontak maksimal 200 karakter")
      .optional(),

    registrationUrl: z
      .string()
      .trim()
      .url("Format URL tidak valid")
      .max(500, "URL maksimal 500 karakter")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.eventDate) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(data.eventDate + "T00:00:00") >= today;
    },
    {
      message: "Tanggal pelaksanaan tidak boleh di masa lalu",
      path: ["eventDate"],
    },
  )
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return data.endTime > data.startTime;
    },
    {
      message: "Jam selesai harus setelah jam mulai",
      path: ["endTime"],
    },
  );

export type DonorEventFormValues = z.infer<typeof donorEventFormSchema>;

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function combineToISO(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function isoToDate(iso: string) {
  return iso.slice(0, 10);
}

export function isoToTime(iso: string) {
  return iso.slice(11, 16);
}
