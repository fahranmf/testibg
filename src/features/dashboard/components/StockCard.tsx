import { Droplet } from "lucide-react";

import type { BloodStockItem } from "../dashboard.types";
import { RHESUS_LABELS } from "../dashboard.types";

export default function StockCard({
  bloodStock,
}: {
  bloodStock: BloodStockItem[];
}) {
  const total = bloodStock.reduce((sum, item) => sum + item.stock, 0);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Droplet className="size-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              Stok Darah
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ketersediaan kantong saat ini
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {total}
          </p>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
        {bloodStock.map((item) => {
          const empty = item.stock === 0;

          return (
            <div
              key={`${item.bloodType}-${item.rhesus}`}
              className={`relative overflow-hidden rounded-lg border px-3.5 py-3 transition-colors ${
                empty
                  ? "border-gray-200 bg-gray-50/60 dark:border-white/[0.06] dark:bg-white/[0.02]"
                  : "border-brand-100 bg-brand-50/50 dark:border-brand-500/15 dark:bg-brand-500/[0.06]"
              }`}
            >
              <div className="flex items-baseline gap-0.5">
                <span
                  className={`text-lg font-bold tracking-tight ${
                    empty
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-brand-600 dark:text-brand-400"
                  }`}
                >
                  {item.bloodType}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    empty
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-brand-400 dark:text-brand-500"
                  }`}
                >
                  {RHESUS_LABELS[item.rhesus]}
                </span>
              </div>

              <p
                className={`mt-1 text-sm font-semibold ${
                  empty
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {item.stock}
                <span className="ml-1 text-xs font-medium text-gray-400">
                  kantong
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
