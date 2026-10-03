import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageList(current: number, total: number): (number | "...")[] {
  if (total <= 0) return [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 4) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (current < total - 3) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pages = getPageList(currentPage, totalPages);

  const goToPage = (nextPage: number) => {
    if (!Number.isInteger(nextPage)) return;
    if (nextPage < 1 || nextPage > totalPages) return;
    if (nextPage === currentPage) return;

    onPageChange(nextPage);
  };

  return (
    <nav aria-label="Pagination" className="flex items-center">
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label="Halaman sebelumnya"
        className="
          flex h-8 w-8
          items-center justify-center
          rounded-md
          text-gray-400
          transition-all duration-150
          hover:bg-gray-100
          hover:text-gray-900
          disabled:pointer-events-none
          disabled:opacity-30
          dark:text-gray-500
          dark:hover:bg-white/[0.06]
          dark:hover:text-white
        "
      >
        <ChevronLeft
          className="h-4 w-4"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {/* Pages */}
      <div className="mx-1 flex items-center gap-0.5">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-8 w-6 items-center justify-center text-[11px] font-medium text-gray-400 dark:text-gray-600"
                aria-hidden="true"
              >
                ···
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              onClick={() => goToPage(item)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Halaman ${item}`}
              className={`
                flex h-8 min-w-8
                items-center justify-center
                rounded-md
                px-2
                text-xs
                font-medium
                transition-all duration-150
                ${
                  isActive
                    ? "bg-brand-500 text-white shadow-sm shadow-brand-500/20"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        aria-label="Halaman berikutnya"
        className="
          flex h-8 w-8
          items-center justify-center
          rounded-md
          text-gray-400
          transition-all duration-150
          hover:bg-gray-100
          hover:text-gray-900
          disabled:pointer-events-none
          disabled:opacity-30
          dark:text-gray-500
          dark:hover:bg-white/[0.06]
          dark:hover:text-white
        "
      >
        <ChevronRight
          className="h-4 w-4"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}
