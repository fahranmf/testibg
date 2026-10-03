import { ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../../icons";
import Badge from "../badge/Badge";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  trend?: { direction: "up" | "down"; label: string };
  helperText?: string;
}

export default function MetricCard({
  icon,
  label,
  value,
  trend,
  helperText,
}: MetricCardProps) {
  const isPositive = trend?.direction === "up";

  return (
    <div
      className="
        group relative rounded-xl
        border border-gray-200 bg-white
        px-5 py-5
        transition-colors duration-200
        hover:border-brand-200
        dark:border-gray-800
        dark:bg-white/[0.03]
        dark:hover:border-brand-500/30
        md:px-6 md:py-5
      "
    >
      {/* Subtle decorative glow */}
      <div
        className="
          pointer-events-none absolute -right-10 -top-10
          h-28 w-28 rounded-full
          bg-brand-500/[0.06] blur-2xl
          transition-all duration-300
          group-hover:bg-brand-500/[0.1]
        "
      />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-gray-100
            bg-gray-50
            text-gray-600
            shadow-sm
            transition-all duration-300
            group-hover:scale-105
            group-hover:border-brand-100
            group-hover:bg-brand-50
            group-hover:text-brand-600
            dark:border-gray-800
            dark:bg-gray-800/80
            dark:text-gray-300
            dark:group-hover:border-brand-500/20
            dark:group-hover:bg-brand-500/10
            dark:group-hover:text-brand-400
          "
        >
          {icon}
        </div>

        {trend && (
          <Badge color={isPositive ? "success" : "error"}>
            <span className="flex items-center gap-1">
              {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {trend.label}
            </span>
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="relative mt-5">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <div className="mt-1 flex min-w-0 items-end justify-between gap-3">
          <h4
            className="
              min-w-0 truncate
              text-2xl font-bold tracking-tight
              text-gray-900
              dark:text-white
              md:text-[26px]
            "
            title={typeof value === "string" ? value : undefined}
          >
            {value}
          </h4>

          {!trend && helperText && (
            <span className="shrink-0 pb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              {helperText}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="
          pointer-events-none absolute bottom-0 left-5 right-5
          h-px bg-gradient-to-r
          from-transparent via-gray-100 to-transparent
          dark:via-gray-800
        "
      />
    </div>
  );
}
