"use client";

import { useState } from "react";
import { Minus, Plus, Loader2, AlertCircle, RotateCcw } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

import { useUpdateBloodStock } from "../hooks/useBloodStockMutations";
import { BloodStock } from "../blood-stock.types";

interface EditStockModalProps {
  stock: BloodStock | null;
  onClose: () => void;
}

function EditStockForm({
  stock,
  onClose,
}: {
  stock: BloodStock;
  onClose: () => void;
}) {
  const updateMutation = useUpdateBloodStock();
  const [value, setValue] = useState<number>(stock.stock);
  const [delta, setDelta] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const isValid = Number.isInteger(value) && value >= 0;
  const deltaValid = Number.isInteger(delta) && delta > 0;
  const isUnchanged = value === stock.stock;
  const isPending = updateMutation.isPending;

  const diff = Number.isNaN(value) ? 0 : value - stock.stock;

  const readAmount = (raw: string): number | null => {
    if (raw === "" || raw.trim() === "") return null;
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  };

  const handleValueChange = (raw: string) => {
    const num = readAmount(raw);
    setValue(num ?? NaN);
    setError(null);
  };

  const handleDeltaChange = (raw: string) => {
    const num = readAmount(raw);
    setDelta(num ?? NaN);
  };

  const applyDelta = (dir: 1 | -1) => {
    if (!deltaValid || isPending) return;
    setValue((prev) => {
      const current = Number.isNaN(prev) ? 0 : prev;
      return Math.max(0, current + dir * delta);
    });
    setError(null);
  };

  const reset = () => {
    setValue(stock.stock);
    setDelta(1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setError(
        Number.isNaN(value)
          ? "Jumlah stok wajib diisi"
          : "Jumlah harus berupa bilangan bulat positif"
      );
      return;
    }
    if (isUnchanged) {
      onClose();
      return;
    }
    try {
      await updateMutation.mutateAsync({
        id: stock.bloodStockId,
        stock: value,
      });
      onClose();
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? "Gagal memperbarui stok";
      setError(message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-200/80 bg-brand-50/80 font-mono text-base font-black text-brand-600 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400">
            {stock.bloodType}
            {stock.rhesus === "POSITIVE" ? "+" : "−"}
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Stok Golongan {stock.bloodType}
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Stok awal: <span className="font-mono font-semibold text-gray-600 dark:text-gray-300">{stock.stock}</span> kantong
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        {/* Total Input (Display Hero with Inline Reset) */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="stock-total"
              className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
            >
              Total Stok Baru
            </label>

            {/* Quick Reset Label/Link */}
            {!isUnchanged && (
              <button
                type="button"
                onClick={reset}
                disabled={isPending}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                <RotateCcw className="size-3" />
                Reset Awal
              </button>
            )}
          </div>

          <div className="relative flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/10 dark:border-white/10 dark:bg-gray-800/40 dark:focus-within:border-brand-500 dark:focus-within:bg-gray-800/80">
            <input
              id="stock-total"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              value={Number.isNaN(value) ? "" : value}
              onChange={(e) => handleValueChange(e.target.value)}
              disabled={isPending}
              aria-label="Jumlah stok kantong darah baru"
              placeholder="0"
              className="w-full min-w-0 bg-transparent font-mono text-2xl font-black tracking-tight text-gray-900 outline-none placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-600"
            />

            <div className="flex shrink-0 items-center gap-2 pl-3">
              <span className="text-sm font-medium text-gray-400">kantong</span>
              
              {/* Diff Indicator Badge */}
              {diff !== 0 && !Number.isNaN(value) && (
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-xs font-bold ${
                    diff > 0
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400"
                  }`}
                >
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stepper Control */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ubah Bertahap
            </span>
            <span className="text-xs text-gray-400">Per klik</span>
          </div>

          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-gray-800/40">
            <button
              type="button"
              onClick={() => applyDelta(-1)}
              disabled={isPending || !deltaValid}
              aria-label="Kurangi stok"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-error-600 disabled:pointer-events-none disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-error-400"
            >
              <Minus className="size-4" />
            </button>

            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={Number.isNaN(delta) ? "" : delta}
              onChange={(e) => handleDeltaChange(e.target.value)}
              disabled={isPending}
              aria-label="Jumlah perubahan stok per klik"
              className="w-full bg-transparent text-center font-mono text-sm font-bold text-gray-900 outline-none dark:text-white"
            />

            <button
              type="button"
              onClick={() => applyDelta(1)}
              disabled={isPending || !deltaValid}
              aria-label="Tambah stok"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-brand-600 disabled:pointer-events-none disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-brand-400"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-error-500/20 bg-error-50/60 p-3 text-sm font-medium text-error-600 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50/50 px-6 py-3.5 dark:border-white/5 dark:bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border-gray-200 text-sm font-semibold dark:border-white/10"
          >
            Batal
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={isPending || !isValid || isUnchanged}
            className="rounded-lg text-sm font-semibold shadow-sm"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                Menyimpan...
              </span>
            ) : (
              "Simpan Stok"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EditStockModal({
  stock,
  onClose,
}: EditStockModalProps) {
  return (
    <Modal
      isOpen={!!stock}
      onClose={onClose}
      className="w-full max-w-[340px] overflow-hidden rounded-xl p-0"
    >
      {stock && (
        <EditStockForm key={stock.bloodStockId} stock={stock} onClose={onClose} />
      )}
    </Modal>
  );
}
