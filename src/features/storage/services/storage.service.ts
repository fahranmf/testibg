import { api } from "@/lib/axios";

// Harus sama persis dengan ALLOWED_FOLDERS di backend (storage.service.js)
export type StorageFolder =
  | "news"
  | "activities"
  | "activity-images"
  | "galleries"
  | "gallery-images"
  | "donor-events";

export interface UploadFileResult {
  key: string;
}

export const storageService = {
  upload: (file: File, folder: StorageFolder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return api
      .post<{ data: UploadFileResult }>("/storage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data.data);
  },

  delete: (key: string) =>
    api.delete("/storage", { data: { key } }).then(() => undefined),
};

/**
 * Bangun URL publik buat nampilin file dari storage key.
 * Sesuaikan NEXT_PUBLIC_STORAGE_BASE_URL di .env dengan public URL bucket R2 lu
 * (misal custom domain R2 atau endpoint publik R2.dev).
 */
export function getStorageUrl(key: string | null | undefined) {
  if (!key) return null;
  const base = process.env.NEXT_PUBLIC_STORAGE_BASE_URL ?? "";
  return `${base.replace(/\/$/, "")}/${key}`;
}