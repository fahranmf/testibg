"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { X, RotateCcw, Loader2 } from "lucide-react";

import PageHeader from "@/components/ui/page-header/PageHeader";
import SegmentedControl from "@/components/ui/segmented-control";

import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";

import { useBloodStock } from "../hooks/useBloodStock";
import BloodStockTable from "../components/BloodStockTable";
import EditStockModal from "../components/EditStockModal";
import {
  BloodType,
  Rhesus,
  BloodStock,
  BLOOD_TYPE_LABELS,
} from "../blood-stock.types";

const TYPE_OPTIONS: BloodType[] = ["A", "B", "AB", "O"];

const RHESUS_FILTERS: { label: string; value: Rhesus | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Rh+", value: "POSITIVE" },
  { label: "Rh-", value: "NEGATIVE" },
];

export default function BloodStockListPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type");
  const type =
    typeParam === "all" || TYPE_OPTIONS.includes(typeParam as BloodType)
      ? (typeParam as BloodType | "all")
      : "all";
  const rhesusParam = searchParams.get("rhesus");
  const rhesus = RHESUS_FILTERS.some((filter) => filter.value === rhesusParam)
    ? (rhesusParam as Rhesus | "all")
    : "all";
  const sortOrderParam = searchParams.get("sortOrder");
  const sortOrder =
    sortOrderParam === "asc" || sortOrderParam === "desc"
      ? sortOrderParam
      : undefined;

  const { data, isLoading, isFetching } = useBloodStock({
    type,
    rhesus,
    sortOrder,
  });

  const canUpdate = useHasPermission(PERMISSIONS.BLOOD_STOCK_UPDATE);

  const [editingStock, setEditingStock] = useState<BloodStock | null>(null);

  const hasActiveFilters = type !== "all" || rhesus !== "all";

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    const query = nextParams.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const handleToggleSort = () => {
    if (!sortOrder) {
      updateSearchParams({ sortOrder: "asc" });
      return;
    }
    if (sortOrder === "asc") {
      updateSearchParams({ sortOrder: "desc" });
      return;
    }
    updateSearchParams({ sortOrder: null });
  };

  const resetFilters = () => {
    updateSearchParams({ type: null, rhesus: null, sortOrder: null });
  };

  return (
    <main className="mx-auto w-full space-y-6">
      {/* Header Bar */}
      <PageHeader
        eyebrow="Stock Management"
        title="Stok Darah"
      />

      {/* Content Container */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
        {/* Controls Bar */}
        <div className="border-b border-gray-200 dark:border-white/[0.07]">
          <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {/* Golongan darah filter */}
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) =>
                    updateSearchParams({
                      type: e.target.value === "all" ? null : e.target.value,
                    })
                  }
                  className="h-9 min-w-[160px] appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-xs font-medium text-gray-600 outline-none transition hover:border-gray-300 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-white/[0.14]"
                >
                  <option
                    value="all"
                    className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  >
                    Semua golongan
                  </option>

                  {TYPE_OPTIONS.map((value) => (
                    <option
                      key={value}
                      value={value}
                      className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    >
                      Golongan {BLOOD_TYPE_LABELS[value]}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <SegmentedControl
                options={RHESUS_FILTERS}
                value={rhesus}
                onChange={(value) =>
                  updateSearchParams({
                    rhesus: value === "all" ? null : value,
                  })
                }
              />

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-4 py-2.5 dark:border-white/5">
              <span className="text-[11px] font-medium text-gray-400">
                Filter aktif:
              </span>

              {type !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  Golongan {BLOOD_TYPE_LABELS[type]}
                  <button
                    type="button"
                    onClick={() => updateSearchParams({ type: null })}
                    className="hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {rhesus !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  {rhesus === "POSITIVE" ? "Rh+" : "Rh-"}
                  <button
                    type="button"
                    onClick={() => updateSearchParams({ rhesus: null })}
                    className="hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table & Floating Refetch State */}
        <div className="relative">
          <BloodStockTable
            stocks={data ?? []}
            isLoading={isLoading}
            sortOrder={sortOrder}
            onToggleSort={handleToggleSort}
            onEdit={canUpdate ? setEditingStock : undefined}
          />

          {isFetching && !isLoading && (
            <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-brand-200/50 bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-600 shadow-sm backdrop-blur-md dark:border-brand-500/20 dark:bg-gray-900/90 dark:text-brand-300">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Memperbarui...
            </div>
          )}
        </div>
      </section>

      <EditStockModal
        stock={editingStock}
        onClose={() => setEditingStock(null)}
      />
    </main>
  );
}
