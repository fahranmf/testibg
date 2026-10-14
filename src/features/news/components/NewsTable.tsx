"use client";

import Image from "next/image";

import { EyeIcon } from "@/icons";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  SortableHeader,
  EmptyState,
  EmptyStateIcon,
  ActionButton,
} from "@/components/ui/table";

import { NEWS_CATEGORY_LABELS } from "../news.types";
import type { News, NewsListParams } from "../news.types";
import NewsStatusBadge from "./NewsStatusBadge";

interface NewsTableProps {
  news: News[];
  isLoading: boolean;
  onView: (item: News) => void;
  sortBy?: NewsListParams["sortBy"];
  sortOrder?: NewsListParams["sortOrder"];
  onSort: (sortBy: NonNullable<NewsListParams["sortBy"]>) => void;
}

type SortField = NonNullable<NewsListParams["sortBy"]>;

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

function LoadingState() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Berita",
              "Kategori",
              "Status",
              "Tanggal Publikasi",
              "Dibuat",
              "Aksi",
            ].map((heading, index) => (
              <TableCell
                key={heading}
                isHeader
                className={index === 5 ? "text-center" : ""}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-[76px] shrink-0 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />

                  <div className="min-w-0 space-y-2">
                    <div className="h-3.5 w-52 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                    <div className="h-2.5 w-32 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="h-3 w-24 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="h-3 w-28 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="h-3 w-28 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <div className="size-8 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function NewsTable({
  news,
  isLoading,
  onView,
  sortBy,
  sortOrder,
  onSort,
}: NewsTableProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (news.length === 0) {
    return (
      <EmptyState
        icon={<EmptyStateIcon />}
        title="Belum ada berita"
        description="Berita yang sudah dibuat akan muncul di daftar ini."
      />
    );
  }

  const handleSort = (field: string) => onSort(field as SortField);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader
              label="Berita"
              field="title"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <SortableHeader
              label="Kategori"
              field="category"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <TableCell isHeader>Status</TableCell>

            <SortableHeader
              label="Tanggal Publikasi"
              field="publishedAt"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <SortableHeader
              label="Dibuat"
              field="createdAt"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <TableCell isHeader className="w-[100px] text-center">
              Aksi
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {news.map((item) => (
            <TableRow
              key={item.newsId}
              className="group transition-colors duration-150 hover:bg-gray-50/60 dark:hover:bg-white/2.5"
            >
              <TableCell>
                <div className="flex items-center gap-3.5">
                  <div className="relative h-[52px] w-[78px] shrink-0 overflow-hidden rounded-lg border border-gray-200/80 bg-gray-100 dark:border-white/[0.07] dark:bg-white/4">
                    {item.thumbnail ? (
                      <>
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="78px"
                          className="object-contain transition-transform duration-500 ease-out"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-black/3 transition-colors group-hover:bg-transparent" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                        <svg
                          className="size-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <rect
                            x="3.5"
                            y="4"
                            width="17"
                            height="16"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />

                          <path
                            d="m5.5 16 4-4 2.5 2.5L15.5 11l3 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="max-w-40 py-0.5">
                    <p
                      className="truncate text-sm font-semibold leading-5 tracking-[-0.01em] text-gray-800 dark:text-white/90"
                      title={item.title}
                    >
                      {item.title}
                    </p>

                    <p
                      className="mt-1 truncate font-mono text-xs text-gray-400 dark:text-gray-600"
                      title={`/${item.slug}`}
                    >
                      /{item.slug}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center rounded-md bg-gray-100/80 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400">
                  {NEWS_CATEGORY_LABELS[item.category]}
                </span>
              </TableCell>

              <TableCell>
                <NewsStatusBadge status={item.status} />
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.publishedAt
                    ? dateFormatter.format(new Date(item.publishedAt))
                    : "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {dateFormatter.format(new Date(item.createdAt))}
                </span>
              </TableCell>

              <TableCell className="text-center">
                <ActionButton
                  label={`Lihat ${item.title}`}
                  onClick={() => onView(item)}
                >
                  <EyeIcon className="size-5" />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
