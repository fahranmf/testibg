"use client";

import { EyeIcon } from "@/icons";
// import { MapPin } from "lucide-react";

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

import DonorEventStatusBadge from "./DonorEventStatusBadge";

import type { DonorEvent, DonorEventListParams } from "../donor-event.types";

interface Props {
  events: DonorEvent[];
  isLoading: boolean;
  onView: (item: DonorEvent) => void;
  sortBy?: DonorEventListParams["sortBy"];
  sortOrder?: DonorEventListParams["sortOrder"];
  onSort: (sortBy: NonNullable<DonorEventListParams["sortBy"]>) => void;
}

type SortField = NonNullable<DonorEventListParams["sortBy"]>;

const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "short" });
const dayFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("id-ID", { timeStyle: "short" });
const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

const SORT_HEADINGS = [
  "Waktu",
  "Judul",
  "Lokasi",
  "Status",
  "Tanggal Publikasi",
  "Aksi",
];

function LoadingState() {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            {SORT_HEADINGS.map((heading, index) => (
              <TableCell
                key={heading}
                isHeader
                className={
                  index === 0 ? "min-w-[180px]" : index === 5 ? "text-center" : ""
                }
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="min-w-[180px]">
                <div className="flex items-center gap-3">
                  <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-gray-100 py-1.5 dark:bg-white/5">
                    <div className="h-2 w-6 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                    <div className="mt-0.5 h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                  </div>
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-2">
                  <div className="h-3.5 w-48 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                  <div className="h-2.5 w-32 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                </div>
              </TableCell>

              <TableCell>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />
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

export default function DonorEventTable({
  events,
  isLoading,
  onView,
  sortBy,
  sortOrder,
  onSort,
}: Props) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (events.length === 0) {
    return (
      <EmptyState
        icon={<EmptyStateIcon />}
        title="Belum ada donor event"
        description="Donor event yang sudah dibuat akan muncul di daftar ini."
      />
    );
  }

  const handleSort = (field: string) => onSort(field as SortField);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <SortableHeader
              label="Waktu"
              field="startAt"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              className="min-w-[180px]"
            />

            <SortableHeader
              label="Judul"
              field="title"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <TableCell isHeader>Lokasi</TableCell>

            <TableCell isHeader>Status</TableCell>

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
          {events.map((item) => {
            const startDate = new Date(item.startAt);
            const endDate = new Date(item.endAt);

            return (
              <TableRow
                key={item.id}
                className="group transition-colors duration-150 hover:bg-gray-50/60 dark:hover:bg-white/2.5"
              >
                <TableCell className="min-w-[180px]">
                  <div className="flex items-center gap-3">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-gray-200/80 bg-gray-50 py-1.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                        {monthFormatter.format(startDate)}
                      </span>
                      <span className="text-base font-bold leading-tight text-gray-900 dark:text-white">
                        {dayFormatter.format(startDate)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {dateFormatter.format(startDate)}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        {timeFormatter.format(startDate)} —{" "}
                        {timeFormatter.format(endDate)}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="max-w-48 py-0.5">
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
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    {/* <MapPin className="size-3.5 shrink-0" /> */}
                    <span className="max-w-[160px] truncate text-sm">
                      {item.location}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <DonorEventStatusBadge status={item.status} />
                </TableCell>

                <TableCell>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
