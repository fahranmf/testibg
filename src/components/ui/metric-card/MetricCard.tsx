import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  trend?: {
    direction: "up" | "down";
    label: string;
  };
  helperText?: string;
}

export default function MetricCard({
  icon,
  label,
  value,
  trend,
  helperText,
}: MetricCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        px-5
        py-5
        transition-colors
        duration-200
        hover:border-brand-200
        dark:border-gray-800
        dark:bg-white/[0.03]
        dark:hover:border-brand-800
      "
    >
      {/* Header */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-brand-50
            text-brand-600
            dark:bg-brand-950/60
            dark:text-brand-400
          "
        >
          {icon}
        </div>

        <p
          className="
            min-w-0
            truncate
            text-sm
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {label}
        </p>

        {/* Trend */}
        {trend && (
          <span
            className={`
              ml-auto
              shrink-0
              text-xs
              font-semibold
              tabular-nums
              ${
                trend.direction === "up"
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gray-500 dark:text-gray-400"
              }
            `}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.label}
          </span>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_130px] items-end gap-4">
        {/* Value */}
        <div className="min-w-0">
          <h4
            className="
              truncate
              text-[28px]
              font-semibold
              leading-none
              tracking-tight
              text-gray-950
              dark:text-white
            "
            title={typeof value === "string" ? value : undefined}
          >
            {value}
          </h4>
        </div>

        {/* Helper */}
        <p
          className="
            pb-1
            text-right
            text-xs
            font-medium
            text-gray-500
            dark:text-gray-400
          "
        >
          {helperText ?? "28 hari terakhir"}
        </p>
      </div>
    </div>
  );
}
