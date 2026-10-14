"use client";

import { PencilIcon } from "@/icons";

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

import { BloodStock, RHESUS_LABELS } from "../blood-stock.types";

interface BloodStockTableProps {
  stocks: BloodStock[];
  isLoading: boolean;
  sortOrder?: "asc" | "desc";
  onToggleSort: () => void;
  onEdit?: (stock: BloodStock) => void;
}

const HEADINGS = ["Golongan", "Rhesus", "Stok", "Terakhir Diperbarui"];

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

function LoadingState({ showActions }: { showActions: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {HEADINGS.map((heading) => (
              <TableCell isHeader key={heading}>
                {heading}
              </TableCell>
            ))}

            {showActions && (
              <TableCell isHeader className="w-[100px] text-center">
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-7 w-9 animate-pulse rounded-md bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="h-5 w-16 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="h-3.5 w-28 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100 dark:bg-white/5" />
                </div>
              </TableCell>

              {showActions && (
                <TableCell>
                  <div className="flex justify-center">
                    <div className="size-8 animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function BloodStockTable({
  stocks,
  isLoading,
  sortOrder,
  onToggleSort,
  onEdit,
}: BloodStockTableProps) {
  const showActions = !!onEdit;

  if (isLoading) {
    return <LoadingState showActions={showActions} />;
  }

  if (stocks.length === 0) {
    return (
      <EmptyState
        icon={<EmptyStateIcon />}
        title="Tidak ada data stok"
        description="Coba ubah filter golongan darah atau rhesus."
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Golongan Darah</TableCell>
            <TableCell isHeader>Rhesus</TableCell>

            <SortableHeader
              label="Stok"
              field="stock"
              sortBy={sortOrder ? "stock" : null}
              sortOrder={sortOrder}
              onSort={onToggleSort}
            />

            <TableCell isHeader>Terakhir Diperbarui</TableCell>

            {showActions && (
              <TableCell isHeader className="w-[100px] text-center">
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {stocks.map((item) => {
            const isOut = item.stock === 0;
            const isLow = item.stock > 0 && item.stock < 10;
            return (
              <TableRow
                key={item.bloodStockId}
                className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.02]"
              >
                {/* Golongan Badge */}
                <TableCell>
                  <div className="inline-flex h-9 items-center justify-center rounded-lg border border-brand-200 bg-brand-50 px-3 font-mono text-sm font-bold text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-400">
                    {item.bloodType}
                  </div>
                </TableCell>

                {/* Rhesus */}
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded border px-2.5 py-1 font-mono text-xs font-medium ${
                      item.rhesus === "POSITIVE"
                        ? "border-brand-200 bg-brand-50/50 text-brand-600 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400"
                        : "border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                    }`}
                  >
                    {RHESUS_LABELS[item.rhesus]}
                  </span>
                </TableCell>

                {/* Stok Count + Indicator */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.stock}
                    </span>
                    <span className="text-xs text-gray-400">kantong</span>

                    {/* Status Pill */}
                    {isOut && (
                      <span className="rounded border border-error-500/20 bg-error-50 px-2 py-0.5 text-xs font-semibold text-error-600 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
                        Habis
                      </span>
                    )}
                    {isLow && (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                        Menipis
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Date & Updater */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dateTimeFormatter.format(new Date(item.updatedAt))}
                    </span>
                    {item.updatedby && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        oleh {item.updatedby.name}
                      </span>
                    )}
                  </div>
                </TableCell>

                {showActions && (
                  <TableCell className="text-center">
                    <ActionButton
                      label={`Perbarui stok golongan ${item.bloodType}`}
                      onClick={() => onEdit?.(item)}
                    >
                      <PencilIcon className="size-5" />
                    </ActionButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
