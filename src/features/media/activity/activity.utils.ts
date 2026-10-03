export function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatActivityDateParts(value: string) {
  const date = new Date(value);

  return {
    day: new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("id-ID", { month: "short" })
      .format(date)
      .toUpperCase(),
  };
}

export function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "gap"> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("gap");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("gap");
  pages.push(totalPages);

  return pages;
}
