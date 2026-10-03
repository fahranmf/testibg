export function formatGalleryDate(date: string | null) {
  if (!date) {
    return "Dokumentasi UDD PMI Depok";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
