import { ArrowRight } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import Pagination from "./Pagination";
import PageSizeSelect from "./PageSizeSelect";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TablePaginationProps {
  pagination: PaginationMeta;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  pageSizeOptions?: number[];
}

export default function TablePagination({
  pagination,
  limit,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [5, 10, 20, 50],
}: TablePaginationProps) {
  const [inputValue, setInputValue] = useState("");

  const start = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);

  const showJumpTo = pagination.totalPages >= 10;

  const submitPage = () => {
    if (!inputValue.trim()) return;

    const nextPage = Number(inputValue);

    if (!Number.isInteger(nextPage)) return;
    if (nextPage < 1 || nextPage > pagination.totalPages) return;

    if (nextPage === pagination.page) {
      setInputValue("");
      return;
    }

    onPageChange(nextPage);
    setInputValue("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitPage();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setInputValue("");
      event.currentTarget.blur();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Rows + Range */}
        <div className="flex items-center gap-3">
          <PageSizeSelect value={limit} onChange={onLimitChange} options={pageSizeOptions} />

          <span className="h-4 w-px bg-gray-200 dark:bg-gray-800" aria-hidden="true" />

          <p className="whitespace-nowrap text-theme-xs font-normal text-gray-400 dark:text-gray-500">
            {pagination.total === 0 ? (
              "No results"
            ) : (
              <>
                <span className="font-medium text-gray-600 dark:text-gray-300">{start}</span>
                <span className="mx-1">–</span>
                <span className="font-medium text-gray-600 dark:text-gray-300">{end}</span>
                <span className="mx-1">of</span>
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {pagination.total}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Right: Pagination + Jump to */}
        {pagination.totalPages > 1 && (
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />

            {showJumpTo && (
              <>
                <span
                  className="hidden h-4 w-px bg-gray-200 sm:block dark:bg-gray-800"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-1.5">
                  <span className="hidden text-theme-xs font-medium text-gray-400 sm:inline dark:text-gray-500">
                    Jump to
                  </span>

                  <div
                    className="
                      flex h-8
                      overflow-hidden
                      rounded-md
                      border border-gray-200
                      bg-white
                      transition-all duration-150
                      focus-within:border-brand-500
                      focus-within:ring-2
                      focus-within:ring-brand-500/10
                      dark:border-gray-800
                      dark:bg-white/[0.03]
                      dark:focus-within:border-brand-500
                    "
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={inputValue}
                      onChange={(event) => {
                        setInputValue(event.target.value.replace(/\D/g, ""));
                      }}
                      onKeyDown={handleInputKeyDown}
                      onBlur={submitPage}
                      placeholder={String(pagination.page)}
                      aria-label="Nomor halaman tujuan"
                      className="
                        h-full w-9
                        bg-transparent
                        px-1
                        text-center
                        text-xs
                        font-semibold
                        text-gray-700
                        outline-none
                        placeholder:text-gray-400
                        dark:text-gray-200
                        dark:placeholder:text-gray-600
                      "
                    />

                    <button
                      type="button"
                      onClick={submitPage}
                      disabled={!inputValue.trim()}
                      aria-label="Pindah ke halaman"
                      className="
                        flex h-full w-8
                        items-center justify-center
                        border-l border-gray-200
                        text-gray-400
                        transition-colors duration-150
                        hover:bg-gray-50
                        hover:text-brand-500
                        disabled:pointer-events-none
                        disabled:opacity-30
                        dark:border-gray-800
                        dark:hover:bg-white/[0.04]
                        dark:hover:text-brand-400
                      "
                    >
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}