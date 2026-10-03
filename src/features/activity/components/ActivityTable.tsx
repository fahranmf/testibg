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

import ActivityStatusBadge from "./ActivityStatusBadge";

import type { Activity, ActivityListParams } from "../activity.types";

interface Props {
  activities: Activity[];
  isLoading: boolean;
  onView: (item: Activity) => void;
  sortBy?: ActivityListParams["sortBy"];
  sortOrder?: ActivityListParams["sortOrder"];
  onSort: (sortBy: NonNullable<ActivityListParams["sortBy"]>) => void;
}

type SortField = NonNullable<ActivityListParams["sortBy"]>;

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

const SORT_HEADINGS = [
  "Kegiatan",
  "Lokasi",
  "Status",
  "Tanggal Kegiatan",
  "Tanggal Publikasi",
  "Aksi",
];

function LoadingState() {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[950px]">
        <TableHeader>
          <TableRow>
            {SORT_HEADINGS.map((heading, index) => (
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

export default function ActivityTable({
  activities,
  isLoading,
  onView,
  sortBy,
  sortOrder,
  onSort,
}: Props) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (activities.length === 0) {
    return (
      <EmptyState
        icon={<EmptyStateIcon />}
        title="Belum ada kegiatan"
        description="Kegiatan yang sudah dibuat akan muncul di daftar ini."
      />
    );
  }

  const handleSort = (field: string) => onSort(field as SortField);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[950px]">
        <TableHeader>
          <TableRow>
            <SortableHeader
              label="Kegiatan"
              field="title"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <TableCell isHeader>Lokasi</TableCell>

            <TableCell isHeader>Status</TableCell>

            <SortableHeader
              label="Tanggal Kegiatan"
              field="eventDate"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <SortableHeader
              label="Tanggal Publikasi"
              field="publishedAt"
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
          {activities.map((item) => (
            <TableRow
              key={item.id}
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
                          className="object-contain"
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
                      className="truncate text-[13px] font-semibold leading-5 tracking-[-0.01em] text-gray-800 dark:text-white/90"
                      title={item.title}
                    >
                      {item.title}
                    </p>

                    <p
                      className="mt-1 truncate font-mono text-[10px] text-gray-400 dark:text-gray-600"
                      title={`/${item.slug}`}
                    >
                      /{item.slug}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-[13px] text-gray-600 dark:text-gray-300">
                  {item.location || "—"}
                </span>
              </TableCell>

              <TableCell>
                <ActivityStatusBadge status={item.status} />
              </TableCell>

              <TableCell>
                <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">
                  {item.eventDate
                    ? dateFormatter.format(new Date(item.eventDate))
                    : "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">
                  {item.publishedAt
                    ? dateFormatter.format(new Date(item.publishedAt))
                    : "—"}
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
